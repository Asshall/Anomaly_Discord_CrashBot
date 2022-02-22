const moo = require("moo")
const { vScripts, efpScripts } = require("./vanillaScripts.js")

// This needs refactoring so hard, all theses backslashes make the regex unreadable
const errPre = "^! ?";
const luaPre = `${errPre}\\\[LUA\\\]`
const repIden = " \\[\\d+\\]" // For repeated message, in the logs they appear like "msg [number]"
const nl = "\r\n"; // Windows carriage return before newline... Cause windows is "different"
const traceIden = "~ -{72}"

// c:\path!/aha-you_mad.script or ... script.name or ...script.name or ..\script.name
const path = "(?:[a-z]:|\\\.{2,3} ?)(?:\\\\|\\/)?(?:[\\d\\w.! -]+[\\/\\\\]?)+" /* Fucken windows path */
function baseName(p){
  if (p.match(path)){
	s = p.split(/\/|\\/)
	return s[s.length-1].replace(/\.{3}/, '').trim()
  }
  return p
}
const linenum = {
  match: /(?:\(line:|[:\(]) ?\d+\)?/,
	value: x => x.match(/\d+/)[0]
}
// This is so that errors are individual lines
const errorToken = {
  match: /\S*[\s\t]/,
  error: true,
}

let mainState = {
  /* Would need to tokenize depending on the brand's
  naming convention... Not gonna do that */
  CPU: {
	match: /\* Detected CPU.*/,
	value: x => x.split(/:|APU|CPU|Processor|with/)[2],
	lineBreaks: true
  },
  GPU: {
	match: /\* GPU \[vendor:[\dA-Z]+\]-\[device:[\dA-Z]+\]:.*/,
	value: x => x.split(':')[3]
  },
  Build: {
	match: /'xrCore'.*/,
	value: x => x.match(/build \d{4}/)[0],
	lineBreaks: true
  },
  Dx: {
	match: /command line.*/,
	value: x => x.match(/dx\d{1,2}/)[0].toUpperCase()
  },
  Script: {
	match: /\* loading script.*/,
	value: x => {let s = x.split(" "); return s[s.length-1]}
  },
  Warning: {
	match: new RegExp(`${errPre}(?:Missing|Invalid).*`),
	value: x => x.replace(new RegExp(errPre), '').replace(new RegExp(repIden), ''),
  },
  LUAStack: {
	match: new RegExp(`${luaPre} (?: 0 : \\[C  \\] execute|SCRIPT RUNTIME ERROR)`),
	push: "lua"
  },
  LUAError: {
	match: new RegExp(`${luaPre} .*`),
	value: x => baseName(x.replace(new RegExp(errPre), '').replace(new RegExp(repIden), '')),
  },
  EngineError: {
	match: new RegExp(`${errPre}ERROR:?`),
	push: "engine"
  },
  ModelError: {
	match: new RegExp(`${errPre}error.*`),
	value: x => baseName(x.replace(new RegExp(errPre), '').replace(new RegExp(repIden), '')),
  },
  Traceback: {
	match: new RegExp(traceIden),
	push: "trace"
  },
  Fatal: {
	match: new RegExp(`FATAL ERROR+`),
	push: "fatal"
  },
  Newline: {match: nl, lineBreaks: true},
  LexError: errorToken
}

lexer = moo.states({
  main: mainState,
  lua: {
	Pre: new RegExp(luaPre),
	Level: /  \d : \[[\w ]+\]/,
	Path: {match: new RegExp(path), value: baseName},
	Linenum: linenum,
	EOL: {match: new RegExp(`${errPre} \\[SCRIPT ERROR\\]`), pop: 1},
	Desc: {match: new RegExp(`: [^:${nl}]*`), value: x => x.substr(2)},
	LexError: errorToken
  },
  engine: {
	WS: " ",
	Function: {
	  match: /[\w\d\. ]* ?(?:\||:)/,
	  value: x => x.split(/\||:/)[0]
	},
	Desc: {match: /.+/, value: x => x.replace(new RegExp(repIden),'')},

	Newline: {
	  match: nl,
	  lineBreaks: true,
	  pop:1
	},
  },
  trace: {
	Path: {match: new RegExp(path),value: baseName},
	Function: {
	  match: new RegExp(`['<](?:[\\d\\w]+|${path})(?::\\d+)?['>]`),
	  value: x => x.match("<") ? x.match(/\d+/)[0] : x.substr(1,x.length-2)
	},
	Linenum: linenum,
	Ignore: "in function",
	EOT: {
	  match: new RegExp(`${traceIden}(?!${repIden})`),
	  pop: 1
	},
	LexError: errorToken,
  },
  fatal: {
	Ignore: {
	  match: new RegExp(`\\[error\\]|${nl}| `),
	  lineBreaks: true
	},
	Name: {
	  match: /\w+ +: /,
	  value: x => x.split(' ')[0]
	},
	EOF: {
	  match: /stack trace:/,
	  pop:1
	},
	Value: {
	  match: /.+/,
	  value: baseName
	},
	LexError: errorToken,
  }
})

function itrUntil(lexer, token, skip){
  if (token === undefined){return}
  let next = lexer.next()
  let ret = []
  let ignores = ["LexError", "Ignore", skip].flat()
  while (next !== undefined && next.type !== token) {
	if (ignores.includes(next.type)){next = lexer.next();continue}
	ret.push(next)
	next = lexer.next()
  }
  return ret
}

let grammar = {
  CPU : {pdefault: "Couldn't parse the cpu info"},
  GPU : {pdefault: "Couldn't parse the gpu info"},
  Build : {pdefault: "Couldn't parse build info"},
  Dx : {pdefault: "Couldn't parse DirectX info"},
  Warning : {pdefault: "Couldn't parse this warning"},
  ModelError : {pdefault: "Couldn't parse this model error"},
  LUAError: {pdefault: "Couldn't parse this lua error"},
  // This needs to be more efficient...
  Script : {"precond" : s => !([vScripts, efpScripts].flat().includes(s.toLowerCase())), "pdefault": "No non-vanilla scripts"},
  Fatal : {pdefault: "Couldn't parse the fatal error", functor: l => {
	  let bufferFatal = itrUntil(l, "EOF", "Newline")
	  let fatal = []
	  for (let i=1; i < bufferFatal.length; i+=2){
		fatal[bufferFatal[i-1].value] = bufferFatal[i].value
	  }
	  if (fatal.Function == "CScriptEngine::lua_error") {
		args = 'Arguments' in fatal ? baseName(fatal.Arguments).split(":") : []
		return `LUA Error: \"${args[2].trim()}\" in file ${args[0].trim()} line ${args[1].trim()}`
	  }
	  return `${fatal.Function} : ${fatal.Expression} in file ${fatal.File} (${fatal.Line})\n${fatal.Description}`
	}
  },
  EngineError: {pdefault : "Couldn't parse this engine error", functor: l => {
	  let bufferEngine = itrUntil(l, "Newline", "WS")
	  let desc = bufferEngine[0]
	  let fun = bufferEngine[1]
	  if (fun === undefined) {
		return desc
	  } else {
		return `${bufferEngine[1].value} in ${bufferEngine[0].value}`
	  }
	}},
  Traceback: {pdefault: "Couldn't parse this stack trace", functor: l => {
	  let bufferStack = itrUntil(l,"EOT", "WS")
	  let stack = []
	  let tokPerObj = 3
	  // maybe have a modulo op to check for missing tokens
	  for (let i=2; i < bufferStack.length; i+=3){
		stack.push({
		  file: bufferStack[i-2].value,
		  line: bufferStack[i-1].value,
		  func: bufferStack[i].value
		})
	  }
	  let ret = []
	  for (let i of stack){
		i.func = i.func.match(/\d+/) ? `line ${i.func}` : `function ${i.func}`
		ret.push(`File ${i.file} line ${i.line} in ${i.func}`)
	  }
	  return ret
  }},
  LUAStack: {pdefault: "Couldn't parse this lua stack trace", functor: l => {
	let bufferLua = itrUntil(l, "EOL",  ["Pre", "Level"])
	let stack = []
	let tokPerObj = 3
	// maybe have a modulo op to check for missing tokens
	for (let i=0; i < bufferLua.length; i+=tokPerObj){
	  stack.push({
		file: bufferLua[i],
		line: bufferLua[i+1],
		desc: bufferLua[i+2]
	  })
	}
	let ret = []
	for (let i of stack){
	  i.desc = i.desc == "" ? "No description" : i.desc

	  ret.push(`File ${i.file} line ${i.line} : ${i.desc}`)
	}
	return ret
  }},
}
// For testing purposes
// const fs = require("fs")
// let file = fs.readFileSync("xray__1.log", "utf8")
// lexer.reset(file)
// lexer.reset(`! error in stalker with visual actors\\stalker_neutral\\stalker_neutral_a.ogf [44]`)
// for (let t of lexer){ if(true
//   // t.type != "LexError"
// ) {console.log(t)}}
module.exports = { lexer, grammar }
