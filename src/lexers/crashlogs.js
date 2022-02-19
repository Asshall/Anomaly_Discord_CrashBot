const moo = require("moo")
const fs = require("fs")

const errPre = "^! ?";
const repIden = " \\[\\d+\\]" // For repeated message, in the logs they appear like "msg [number]"
const nl = "\r\n"; // Windows carriage return before newline... Cause windows is "different"
const traceIden = "~ -{72}"
// c:\path!/aha-you_mad.script or ... script.name
const path = "(?:[a-z]:\\/|\\\.{3} ?)(?:[\\d\\w\\.!-]+[\\/\\\\]?)+" /* Fucken windows path */
const linenum = {match: /(?:\(line:|[:\(]) ?\d+[\):]/, value: x => x.match(/\d+/)[0]}
// This is so that errors are individual lines
const errorToken = {
  match: new RegExp(`.+?${nl}`),
  error: true
}

let mainState = {
  CPU: {
	match: /\* Detected CPU.*/,
	value: x => x.split(/:|APU|CPU|Processor/)[2],
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
	match: new RegExp(`FATAL ERROR${nl}+`),
	push: "fatal"
  },
  Newline: {match: nl, linebreaks: true},
  LexError: errorToken
}
lexer = moo.states({
  main: mainState,
  lua: {
	WS: " ",
	Ignore: "SCRIPT RUNTIME ERROR",
	Class: /[A-Z][\d\w]+/,
	Level: /\d : \[[\w ]+\]/,
	Path: new RegExp(path),
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
	Path: {match: new RegExp(path), },//value: x => x.replace('... ','')},
	Function: {
	  match: new RegExp(`['<]?(?:[\\d\\w]+|${path})(?::\\d+)?['>]`),
	  value: x => x.substr(1, x.length-2)
	},
	Linenum: linenum,
	Ignore: "in function",
	TraceDelim: {match: new RegExp(traceIden), pop: 1},
	LexError: errorToken
  },
  fatal: {
	ErrIden: /\[error\]/,
	Name: {match: /\w+ +: /, value: x => x.split(' ')[0]},
	EOF: {match: new RegExp(` (?:${nl}){2}stack trace:(?:${nl}){2}`), pop:1},
	Newline: {match: nl, lineBreaks: true},
	Value: /.+/,
  }
})

module.exports = lexer
