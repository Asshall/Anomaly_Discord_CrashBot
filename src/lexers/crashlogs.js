const moo = require("moo")
const fs = require("fs")
const vScripts = require("./vanillaScripts.js")
const errPre = "^! ?";
const repIden = " \\[\\d+\\]" // For repeated message, in the logs they appear like "msg [number]"
const nl = "\r\n"; // Windows carriage return before newline... Cause windows is "different"
const traceIden = "~ -{72}"
// c:\path!/aha-you_mad.script or ... script.name or ...script.name or ..\script.name
const path = "(?:[a-z]:|\\\.{2,3} ?)\\\\?(?:[\\d\\w\.!-]+[\\/\\\\]?)+" /* Fucken windows path */
function baseName(p){
  if (p.match(path)){
	// Uses the path regex execpt it makes the last \ or / mandatory so you get the basename
	return p.replace(new RegExp(path.substr(0,path.length-3) + ")+"), '')
  } else { return p }
}
const linenum = {match: /(?:\(line:|[:\(]) ?\d+[\):]/, value: x => x.match(/\d+/)[0]}
// This is so that errors are individual lines
const errorToken = {
  match: new RegExp(`.+?${nl}`),
  error: true
}

let mainState = {
  CPU: {
	match: /\* Detected CPU.*/,
	value: x => x.split(/:|APU|CPU|Processor/)[2].trim(),
	lineBreaks: true
  },
  GPU: {
	match: /\* GPU \[vendor:[\dA-Z]+\]-\[device:[\dA-Z]+\]:.*/,
	value: x => {let s = x.split(':')[3]; return s[s.length-1]}
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
	match: new RegExp(`${errPre}(?:Missing|Invalid).*`)
  },
  LUAError: {
	match: new RegExp(`${errPre}\\[(?:LUA|SCRIPT ERROR)\\]`),
	push: "lua"
  },
  EngineError: {
	match: new RegExp(`${errPre}ERROR:?`),
	push: "engine"
  },
  RenderError: {
	match: new RegExp(`${errPre}error.*`),
	value: x => x.replace(new RegExp(`${errPre}|${repIden}`),'')
  },
  Traceback: {
	match: new RegExp(`${traceIden}${nl}~ STACK TRACEBACK:${nl} ${nl}`),
	push: "trace"
  },
  Fatal: {
	match: new RegExp(`FATAL ERROR+`),
	push: "fatal"
  },
  Newline: {match: nl, linebreaks: true},
  LexError: errorToken
}
lexer = moo.states({
  main: mainState,
  lua: {
	WS: " ",
	StartMarker: "SCRIPT RUNTIME ERROR",
	Class: /[A-Z][\d\w]+/,
	Level: /\d : \[[\w ]+\]/,
	Path: {match: new RegExp(path), value: baseName},
	Linenum: linenum,
	Method: {match: /:{2}[\d\w]+/, value: x => x.slice(1)},
	Sep: ":",
	Desc: /.+/,
	Newline: {match: nl, lineBreaks: true, pop:1},
  },
  engine: {
	WS: " ",
	Function: {match: /[\w\d]+ \|/, value: x => x.split(" ")[0]},
	Desc: /.+/,
	Newline: {match: nl, lineBreaks: true, pop:1},
  },
  trace: {
	WS: {match: /\s/, lineBreaks: true},
	Newline: {match: nl, lineBreaks: true},
	Path: {match: new RegExp(path),value: baseName},
	Function: {
	  match: new RegExp(`['<]?(?:[\\d\\w]+|${path})(?::\\d+)?['>]`),
	  value: x => x.substr(1, x.length-2)
	},
	Linenum: linenum,
	Ignore: "in function",
	EOT: {match: new RegExp(traceIden), pop: 1},
	LexError: errorToken,
  },
  fatal: {
	Ignore: {match: new RegExp(`\\[error\\]|${nl}| `), lineBreaks: true},
	Name: {match: /\w+ +: /, value: x => x.split(' ')[0]},
	EOF: {match: /stack trace:/, pop:1},
	Value: {match: /.+/, value: baseName},
	LexError: errorToken,
  }
})

function itrUntil(lexer, token, skip){
  let next = lexer.next()
  let ret = []
  let ignores = ["LexError", "Newline", "Ignore", skip]
  while (next.type !== token || next === undefined) {
	if (ignores.includes(next.type)){next = lexer.next();continue}
	ret.push(next)
	next = lexer.next()
  }
  return ret
}

let grammar = {
  "CPU" : {"default": "No CPU info"},
  "GPU" : {"default": "No GPU info"},
  "Build" : {"default": "No build info"},
  "Dx" : {"default": "No DirectX info"},
  "Warning" : {"default": "No Warnings"},
  "Script" : {"precond" : vScripts.includes, "default": "No non-vanilla scripts"},
  "Fatal" : {"default": "No fatal error", "functor": l => {
	  let bufferFatal = itrUntil(l, "EOF")
	  let fatal = []
	  for (let i=1; i < bufferFatal.length; i+=2){
		fatal[bufferFatal[i-1].value] = bufferFatal[i].value
	  }
	  if (fatal.Arguments !== undefined && fatal.Arguments.split(":")[0] == "LUA error") {
		return baseName(fatal.Arguments.split(":")[1])
	  }
	  return `${fatal.Function} : ${fatal.Expression} in ${fatal.File} (${fatal.Line})\n${fatal.Description}`
	}
  },
}

module.exports = { lexer, grammar }
