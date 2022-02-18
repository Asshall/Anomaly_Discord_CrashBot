const Discord = require("discord.js");
const JSP = require("jspaste");
const fatalPaste = require("../pastes/fatal.js");
const nconf = require("nconf");

module.exports = async (client, text, message) => {
  var data = parseCrashlog(text);
  //var possiblefix = possiblefixes(data, text);

  const pasteResponse = await JSP.publish(fatalPaste(data));
  const embed = new Discord.MessageEmbed();
  embed.setTitle("Crash report");
  //embed.addField("Description: ", data.description, true);
  embed.addField("Hardware: ",`CPU: ${data.systemDetails.cpu}\nGPU: ${data.systemDetails.gpu}`, true);
  embed.addField("Build type: ",data.build, true);
  embed.addField("DirectX version: ",data.dx, true);
  embed.addField("Fatal error: ",data.fatal, false);
  embed.addField("For further investigating: ",pasteResponse.url, false);
  //embed.addField("Possible fix: ", possiblefix, false);
  embed.setTimestamp();
  message.reply({ content: nconf.get("crash-reply"), embeds: [embed]});
}

const vanillaBuild = "build 8028, Jan 29 2021";
const prepend = "^! ";
const tokens = { // Theses are the regex from which we know what line to keep
  SYS_DETAILS_CPU: "\\* Detected CPU: ",
  SYS_DETAILS_GPU: /\* GPU \[vendor:[\dA-Z]+\]-\[device:[\dA-Z]+\]: /,
  BUILD: "\'xrCore\' ",
  DX: "command line",
  SCRIPT: "\\* loading script ",
  TRACEBACK: /~ -{72}/,
  LUAERROR: `${prepend}\\[LUA\\]`,
  ERROR: `${prepend}(error|ERROR)`,
  WARNING: `${prepend}(Missing|Invalid)`,
  FATAL: "(FATAL ERROR|stack trace:)",
  REP: / \[\d+\]\r$/, // For repeated message, in the logs they appear like "msg [number]\r"
}

function addUnique(arr, el){
	el = el.replace(tokens.REP) // Removing the repeteat patern
	if (!arr.includes(el)) {
		arr.push(el)
	}
	return arr
}

function parseCrashlog(crashlog) {

  const lines = crashlog.split("\n");
  if (lines.length < 1 ) {
    throw new Error("Invalid crashlog");
  }

  let ret = {
		systemDetails: {},
		build: "Unknown",
		dx: "Unknown",
		scripts: [],
		tracebacks: [],
		luaErrors: [],
		errors: [],
		warnings: [],
		fatal: "",
	};

	let multiline = false
	let multiline_str = ""
	lines.forEach(line => {
		if (line.match(tokens.TRACEBACK)) {
			multiline = !multiline
			if (!multiline) {
				ret.tracebacks = addUnique(ret.tracebacks, multiline_str)
			}
			multiline_str = ""
		} else if (line.match(tokens.FATAL)) {
			multiline = !multiline
			if (!multiline) {
				ret.fatal = multiline_str
			}
			multiline_str = ""
		} else if (multiline) {
			multiline_str += line.replace(/\r/,'\n')
		} else if (line.match(tokens.WARNING)) {
			ret.warnings = addUnique(ret.warnings, line)
		} else if (line.match(tokens.DX)) {
			let out = line.match(/dx\d+/)[0]
			ret.dx = out.toUpperCase()
		} else if (line.match(tokens.BUILD)) {
			let out = line.substring(tokens.BUILD.length-1)
			if (!out.match(vanillaBuild)) {
				ret.build = `Non-vanilla : ${out}`
			} else {
				ret.build = "Vanilla"
			}
		} else if (line.match(tokens.SCRIPT)) {
			let out = line.substring(tokens.SCRIPT.length-1)
			ret.scripts = addUnique(ret.scripts, out)
		} else if (line.match(tokens.LUAERROR)) {
			ret.luaErrors = addUnique(ret.luaErrors, line)
		} else if (line.match(tokens.ERROR)) {
			ret.errors = addUnique(ret.errors, line)
		} else if (line.match(tokens.SYS_DETAILS_GPU)) {
			let out = line.split(':')
			ret.systemDetails.gpu = out[out.length-1]
		} else if (line.match(tokens.SYS_DETAILS_CPU)) {
			let out = line.substring(tokens.SYS_DETAILS_CPU.length-1).split(/(CPU|APU|Processor)/)[0];
			ret.systemDetails.cpu = out
		}
	})
  return ret;
}
