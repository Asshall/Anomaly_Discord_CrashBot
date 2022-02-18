const Discord = require("discord.js");
const JSP = require("jspaste");
const fatalPaste = require("../pastes/fatal.js")
module.exports = async (client, text, message) => {
  var data = parseCrashlog(text);
  //var possiblefix = possiblefixes(data, text);

  const pasteResponse = await JSP.publish(fatalPaste(data));
  const embed = new Discord.MessageEmbed()
  embed.setTitle("Crash report");
  //embed.addField("Description: ", data.description, true);
  embed.addField("Hardware: ",`CPU: ${data.systemDetails.cpu}\nGPU: ${data.systemDetails.gpu}`, true);
  embed.addField("Build type: ",data.build, true);
  embed.addField("Fatal error: ",data.fatal, false);
  embed.addField("For further investigating: ",pasteResponse.url, false);
  //embed.addField("Possible fix: ", possiblefix, false);
  embed.setTimestamp();
  message.reply({ content: "So...", embeds: [embed]})
}

const vanillaBuild = "build 8028, Jan 29 2021";
const prepend = "^! ";
const regex = {
	SYS_DETAILS_CPU: "\\* Detected CPU: ",
	SYS_DETAILS_GPU: /\* GPU \[vendor:[\dA-Z]+\]-\[device:[\dA-Z]+\]: /,
	BUILD: "\'xrCore\' ",
	SCRIPT: "\\* loading script ",
	TRACEBACK: /~ -{72}/,
	LUAERROR: `${prepend}\\[LUA\\]`,
	ERROR: `${prepend}(error|ERROR)`,
	WARNING: `${prepend}(Missing|Invalid)`,
	FATAL: "(FATAL ERROR|stack trace:)",
	REP: / \[\d+\]\r$/, // For repeated message, in the logs they appear like "msg [number]\r"
}

function addUnique(arr, el){
	el = el.replace(regex.REP) // Removing the repeteat patern
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
		build: "",
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
		if (line.match(regex.TRACEBACK)) {
			multiline = !multiline
			if (!multiline) {
				ret.tracebacks = addUnique(ret.tracebacks, multiline_str)
			}
			multiline_str = ""
		} else if (line.match(regex.FATAL)) {
			multiline = !multiline
			if (!multiline) {
				ret.fatal = multiline_str
			}
			multiline_str = ""
		} else if (multiline) {
			multiline_str += line.replace(/\r/,'\n')
		} else if (line.match(regex.WARNING)) {
			ret.warnings = addUnique(ret.warnings, line)
		} else if (line.match(regex.BUILD)) {
			let out = line.substring(regex.BUILD.length-1)
			if (!out.match(vanillaBuild)) {
				ret.build = `Non-vanilla : ${out}`
			} else {
				ret.build = "Vanilla"
			}
		} else if (line.match(regex.SCRIPT)) {
			let out = line.substring(regex.SCRIPT.length-1)
			ret.scripts = addUnique(ret.scripts, out)
		} else if (line.match(regex.LUAERROR)) {
			ret.luaErrors = addUnique(ret.luaErrors, line)
		} else if (line.match(regex.ERROR)) {
			ret.errors = addUnique(ret.errors, line)
		} else if (line.match(regex.SYS_DETAILS_GPU)) {
			let out = line.split(':')
			ret.systemDetails.gpu = out[out.length-1]
		} else if (line.match(regex.SYS_DETAILS_CPU)) {
			let out = line.substring(regex.SYS_DETAILS_CPU.length-1).split(/(CPU|APU|Processor)/)[0];
			ret.systemDetails.cpu = out
		}
	})
  return ret;
}
