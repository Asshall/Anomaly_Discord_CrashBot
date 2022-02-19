const Discord = require("discord.js");
const JSP = require("jspaste");
const fatalPaste = require("../pastes/fatal.js");
const nconf = require("nconf");
let lexer = require("../lexers/crashlogs.js")
const vScripts = require("../lexers/vanillaScripts.js")
const vanillaBuild = "build 8028";

module.exports = async (client, text, message) => {
  let data = parseCrashlog(text);
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

  lexer.reset(crashlog);
  // Bot's not working but this is debug
  for (let token of lexer) {
	if (!["LexError", "WS", "Newlines", "Ignore"].includes(token.type)) {console.log(token)}
  }
  return ret;
}
