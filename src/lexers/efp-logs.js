const moo = require("moo")
const { vScripts } = require("./vanillaScripts.js")
const nconf = require("nconf")

// This needs refactoring so hard, all theses backslashes make the regex unreadable
const errPre = "^! ?";
const luaPre = `${errPre}\\\[LUA\\\]`
const repIden = " \\[\\d+\\]" // For repeated message, in the logs they appear like "msg [number]"
const nl = "\r\n"; // Windows carriage return before newline... Cause windows is "different"
const traceIden = "~ -{72}"
// c:\path!/aha-you_mad.script or ... script.name or ...script.name or ..\script.name
const path = "(?:[a-z]:|\\\.{2,3} ?)(?:\\\\|\\/)?(?:[\\d\\w\\.! -]+[\\/\\\\]?)+" /* Fucken windows path */

const baseName = function(p){
  !p.match(path) ?? (p => { return p })();

  s = p.split(/\/|\\/);
  return s[s.length-1].replace(/\.{3}/, '').trim();
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

const mainState = {
  /* Would need to tokenize depending on the brand's
	 cpu naming convention... Not gonna do that */
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
	Path: {
	  match: new RegExp(path),
	  value: baseName
	},
	Function: {
	  match: new RegExp(`['<](?:[\\d\\w]+|${path})(?::\\d+)?['>]`),
	  value: x => x.match("<") ? x.match(/\d+/)[0] : x.substr(1,x.length-2)
	},
	Linenum: linenum,
	Ignore: /(?:in function|\[[A-Z]\]:[^\n]*\n)/,
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

const itrUntil = function(lexer, token, skip){
  if (!token) return;
  const ignores = ["LexError", "Ignore", skip].flat();
  let next = lexer.next();
  let ret = [];
  while (next && next.type !== token) {
	if (ignores.includes(next.type)){next = lexer.next();continue;}
	ret.push(next);
	next = lexer.next();
  }
  return ret;
}

const grammar = {
  CPU : {pdefault: nconf.get("cpuParseErr")},
  GPU : {pdefault: nconf.get("gpuParseErr")},
  Build : {pdefault: nconf.get("buildParseErr")},
  Dx : {pdefault: nconf.get("dxParseErr")},
  Warning : {pdefault: nconf.get("warnParseErr")},
  ModelError : {pdefault: nconf.get("merrorParseErr")},
  LUAError: {pdefault: nconf.get("lerrorParseErr")},
  // This needs to be more efficient...
  Script : {"pdefault": nconf.get("scriptParseErr"), "precond" : s => !vScripts.includes(s.toLowerCase())},
  Fatal : {pdefault: nconf.get("fatalParseErr"), functor: l => {

	  const bufferFatal = itrUntil(l, "EOF", "Newline");
	  let fatal = [];
	  for (let i=1; i < bufferFatal.length; i+=2){
		fatal[bufferFatal[i-1].value] = bufferFatal[i].value;
	  }
	  if (fatal.Function == "CScriptEngine::lua_error") {
		args = baseName(fatal?.Arguments) ?? (() => { throw new Error("Fatal lua error arguments couldn't be parsed") })();
		// Not always the same format...
		// return `LUA Error: \"${args[2].trim()}\" in file ${args[0].trim()} line ${args[1].trim()}`;
		return args
	  }
	  return `${fatal.Function} : ${fatal.Expression} in file ${fatal.File} (${fatal.Line})\nDescription: ${fatal.Description}`;
	}
  },
  EngineError: {pdefault : nconf.get("eerrorParseError"), functor: l => {

	  const  bufferEngine = itrUntil(l, "Newline", "WS");
	  const desc = bufferEngine[0];
	  const fun = bufferEngine[1];
	  !fun && (() => {return desc})();
	  return `${bufferEngine[1].value} in ${bufferEngine[0].value}`
	}
  },
  Traceback: {pdefault: nconf.get("stackParseErr"), functor: l => {

	  const bufferStack = itrUntil(l,"EOT", "WS");
	  let stack = [];
	  const tokPerObj = 3;

	  // This check will not always work... If the traceback is missing enough tokens, the length could still be a multiple of 3
	  if (bufferStack.length % tokPerObj != 0)
		throw new Error("Traceback has missing tokens");

	  for (let i=2; i < bufferStack.length; i+=tokPerObj){
		stack.push({
		  file: bufferStack[i-2].value,
		  line: bufferStack[i-1].value,
		  func: bufferStack[i].value
		})
	  }
	  let ret = [];
	  for (let i of stack){
		i.func = i.func.match(/\d+/) ? `line ${i.func}` : `function ${i.func}`;
		ret.push(`File ${i.file} line ${i.line} in ${i.func}`);
	  }
	  return ret;
  }},
  LUAStack: {pdefault: nconf.get("lstackParseErr"), functor: l => {
	const bufferLua = itrUntil(l, "EOL",  ["Pre", "Level"]);
	let stack = [];
	const tokPerObj = 3;

	if (bufferLua.length % tokPerObj != 0)
	  throw new Error("LUATraceback has missing tokens");
	for (let i=0; i < bufferLua.length; i+=tokPerObj){
	  stack.push({
		file: bufferLua[i],
		line: bufferLua[i+1],
		desc: bufferLua[i+2]
	  })
	}
	let ret = [];
	for (let i of stack){
	  i.desc = i.desc == "" ? "No description" : i.desc;

	  ret.push(`File ${i.file} line ${i.line} : ${i.desc}`);
	}
	return ret;
  }},
}
// For testing purposes
// const fs = require("fs")
// let file = fs.readFileSync("log", "utf8")
// lexer.reset(file)
// lexer.reset(`~ ------------------------------------------------------------------------
// ~ STACK TRACEBACK:
//  
//     g:/stalker efp/efp\\gamedata\\scripts\\_g.script (line: 2160) in function 'alife_release'
//     g:/stalker efp/efp\\gamedata\\scripts\\haru_skills.script (line: 173) in function <g:/stalker efp/efp\\gamedata\\scripts\\haru_skills.script:168>
//     [C]: in function 'iterate_inventory'
//     g:/stalker efp/efp\\gamedata\\scripts\\haru_skills.script (line: 176) in function 'scavanger_effect'
//     g:/stalker efp/efp\\gamedata\\scripts\\haru_skills.script (line: 145) in function 'f'
//     g:/stalker efp/efp\\gamedata\\scripts\\_g.script (line: 370) in function 'functor_a'
//     g:/stalker efp/efp\\gamedata\\scripts\\_g.script (line: 458) in function <g:/stalker efp/efp\\gamedata\\scripts\\_g.script:453>
// ~ ------------------------------------------------------------------------`)
// for (let t of lexer){ if(true
//   // t.type != "LexError"
// ) {console.log(t)}}
module.exports = { lexer, grammar }
