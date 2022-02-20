const Discord = require("discord.js");
const JSP = require("jspaste");
const fatalPaste = require("../pastes/fatal.js");
const nconf = require("nconf");
let { lexer, grammar } = require("../lexers/crashlogs.js")
const vanillaBuild = "build 8028";

module.exports = async (client, text, message) => {
  let data = parseCrashlog(text);
  //var possiblefix = possiblefixes(data, text);
  let defaults = {
	"CPU" : ["No CPU info"],
	"GPU" : ["No GPU info"],
	"Build": ["No build info"],
	"Dx": ["No DirectX info"],
	"Fatal": ["No fatal error"]
  }
  for (let k of Object.keys(defaults)){
	data[k] = data[k] === undefined ? defaults[k] : data[k]
  }
  // const pasteResponse = await JSP.publish(fatalPaste(data));
  const embed = new Discord.MessageEmbed();
  embed.setTitle("Crash report");
  //embed.addField("Description: ", data.description, true);
  embed.addField("Hardware: ",`CPU: ${data.CPU[data.CPU.length-1]}\nGPU: ${data.GPU[data.GPU.length-1]}`, true);
  embed.addField("Build type: ",data.Build[data.Build.length-1], true);
  embed.addField("DirectX version: ",data.Dx[data.Dx.length-1], true);
  embed.addField("Fatal error: ",data.Fatal[data.Fatal.length-1], false);
  // embed.addField("For further investigating: ",pasteResponse.url, false);
  //embed.addField("Possible fix: ", possiblefix, false);
  embed.setTimestamp();
  message.reply({ content: nconf.get("crash-reply"), embeds: [embed]});
}

function addUnique(arr, el){
	if (arr === undefined) { arr = [] }
	if (!arr.includes(el)) {
		arr.push(el)
	}
	return arr
}

function parseCrashlog(crashlog) {

  let ret = {};

  lexer.reset(crashlog);
  for (let token of lexer) {
	let rule = grammar[token.type]
	if (rule === undefined){continue}
	let check = 'precond' in rule ? rule.precond() : true
	if (check) {
		let val = 'functor' in rule ? rule.functor(lexer) : token.value === undefined ? rule.default : token.value
	  ret[token.type] = addUnique(ret[token.type], val)
	}
  }
  // Bot's not working but this is debug
  // for (let token of lexer) {
  //   if (!["LexError", "WS", "Newline", "Ignore"].includes(token.type)) {console.log(token.type + " : " + token.value)}
  // }
  console.log(ret)
  return ret;
}
