const Discord = require("discord.js");
const JSP = require("jspaste");
const { vanillaPaste, decorateTrace }  = require("../pastes/efp-vanilla.js");
const nconf = require("nconf");
let { lexer, grammar } = require("../lexers/efp-logs.js")
const fallbacks = nconf.get("fallbacks")
const messageAsResponse = nconf.get("messageAsResponse")
const errorMessage = nconf.get("errorMessage")
const vanillaBuild = nconf.get("vanillaBuild")
const trunkIden = nconf.get("trunkIden") + '\n'
const discordMaxLength =  nconf.get("discordMaxLength")
const phoneMaxLength = nconf.get("phoneMaxLength") // This is to keep the readability on phones
const maxLength = trunkIden.length + discordMaxLength + phoneMaxLength
// Defaulting for system details
const systemDetailsDefaults = nconf.get("systemDetailsDefaults")
/* Number of lines from the end of the log to display if
  fatal error is null and no other cause is found */
const noProbCauseLines = nconf.get("noProbCauseLines")

// For testing purposes
// const fs = require("fs")
// fs.readdir("../lexers/logs", (err,files) => {
//   if (err) {
//     console.log( err)
//   } else {
//     files.forEach(fileName => {
//       console.log(fileName + " :\n\n")
//       let file = fs.readFileSync("../lexers/logs/" + fileName, "utf8")
//       parseCrashlog(file)
//     })
//   }
// })

async function genMessage (client, text, message) {
  try {
	let data = parseCrashlog(text);

	for (let k of Object.keys(systemDetailsDefaults)){
	  data[k] = getLast(data[k]) // Getting the last element of the array
	  // Defaulting undefined values
	  data[k] = data[k] === undefined || data[k].value === undefined ? systemDetailsDefaults[k] : data[k].value
	}
	let hardware = { name: "Hardware:", value: `__CPU__: ${data.CPU}\n__GPU__: ${data.GPU}`, inline: true }
	let build = { name: "Build:", value: data.Build, inline: true }
	let dx = { name: "DirectX version:", value: data.Dx, inline: true }

	let fatal
	// Look behind when no fatal error is found
	if (data.Fatal === undefined) {
	  let probCauseList = []
	  let probCause
	  for (let i of fallbacks){
		let type = data[i]
		if (type !== undefined){
		  probCauseList.push(type.reverse().find(
			el => (el === undefined || el.value === undefined ? false : true) && el.line !== undefined
		  ))
		}
	  }
	  if (probCauseList.length > 0) {
		probCause = probCauseList.sort((a,b) => b.line - a.line)[0].value // Get's the last token in the log from the probable causes list
	  } else {
		let currCharN = text.length-1
		let line = 0
		probCause = ""
		// If no token contained in the fallbacks list is encountered
		// Get the ${noProbCauseLines} last line of the file
		while (currCharN >= 0) {
		  let currChar = text.charAt(currCharN)
		  if (currChar == '\n') {
			// Ignore empty lines
			if (text.charAt(currCharN-1) == ''){
			  currChar --
			  continue
			}
			line++
		  }
		  /* Since we encounter the newline before the line
			 we do +1 to get the correct number of lines */
		  if (line >= noProbCauseLines + 1) {break}
		  probCause += currChar
		  currCharN--
		}
		// Hack to reverse the string
		probCause = probCause.split("").reverse().join("")
	  }
	  fatal = { name: "No Fatal error, is this related ? :", value: `${trunkIfNeeded(decorateTrace(probCause))}\n` }
	} else {
	  fatal = { name: "Fatal error:", value: `>>> ${data.Fatal[0].value}` }
	}
	/* Lua stacktrace.
	  Appears if the fatal error is lua related.
	  if the lua stacktrace only has one entry it means
	  the rest of the trace was formated as a non-fatal
	  trace which are stored in Traceback.
	  So we concat the two to get the full trace
	*/
	let luastack
	if (data.LUAStack !== undefined && data.Fatal !== undefined) {
	  // If there is only 1 or 0 entry in the lua stack, attach the last traceback to it
	  if (getLast(data.LUAStack).value.length < 2 && data.Traceback !== undefined) {
		trace = [getLast(data.LUAStack).value, getLast(data.Traceback).value].flat()
	  } else {
		trace = getLast(data.LUAStack).value
	  }
	 luastack = { name: "LUA Stack trace: ", value: trunkIfNeeded(decorateTrace(trace)) }
	}
	const pasteResponse = await JSP.publish(vanillaPaste(data));
	let pasteUrl = { name: "For further investigating: ", value: pasteResponse.url }

	const embed = new Discord.MessageEmbed()
	  .setColor('#0099ff')
	  .setTitle("Crash report")
	  .setFooter({ text: "This is a beta version of gimmelogs. Dm it logs that break it\nCode lives here: https://github.com/Asshall/Anomaly_Discord_CrashBot"})
	  .addFields(
		new Object(hardware),
		new Object(build),
		new Object(dx),
		new Object(fatal)
	  )
	  if (luastack !== undefined){
		embed.addFields(new Object(luastack))
	  }
	  embed.addFields(new Object(pasteUrl))

	  let msg = { content: nconf.get("crash-reply"), embeds: [embed] }
	  if (messageAsResponse) {
		message.reply(msg)
	  } else {
		message.channel.send(msg)
	  }
	} catch(e) {
	  console.error(e)
	  let msg = { content: `${errorMessage}\n` + e}
	  if (messageAsResponse) {
		message.reply(msg)
	  } else {
		message.channel.send(msg)
	  }
	}
}

function getLast(obj){
  if (Array.isArray(obj)){ return obj[obj.length-1] }
  return obj
}

function trunkIfNeeded(v){
  if (v.length > discordMaxLength) {
	v = v.substr(v.length - discordMaxLength + phoneMaxLength)
	v = trunkIden + v.substr(v.indexOf('\n'))
  }
	return v
}

function addUnique(arr, el){
  if (arr === undefined) { arr = [] }
  let isPresent = false
  for (let i = arr.length-1; i >= 0; i--) {
	if (arr[i].value !== undefined &&
	  el.value !== undefined &&
	  arr[i].value.toString() == el.value.toString()){
	  isPresent = true
	}
  }
  if (!isPresent) {
	arr.push(el)
  }
  return arr
}

function parsingException(message) {
  this.message = message
}
parsingException.prototype.toString = function() {
  return `parsing error: ${this.message}`
}

function parseCrashlog(crashlog) {

  let ret = {};

  lexer.reset(crashlog);
  // For debug purposes
  // for (let token of lexer) {
  //   if (!["WS", "Newline", "Ignore"].includes(token.type)) {console.log(token.type + " : " + token.value)}
  // }
  for (let token of lexer) {
	try {
	  let rule = grammar[token.type]
	  if (rule === undefined){continue}

	  let check = 'precond' in rule ? rule.precond(token.value) : true
	  if (check) {
		  let val = 'functor' in rule ? rule.functor(lexer) : token.value === undefined ? rule.pdefault : token.value
		ret[token.type] = addUnique(ret[token.type], {
		  line: token.line,
		  value : val
		})
	  }
	} catch (e) {
	  throw new parsingException(`This token caused the following error ${token}, => ${e}`)
	}
  }
// console.log(ret)
return ret;
}
module.exports = { genMessage, decorateTrace }
