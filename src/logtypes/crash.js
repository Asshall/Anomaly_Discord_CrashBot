const Discord = require("discord.js");
const JSP = require("jspaste");
const nconf = require("nconf");

const { vanillaPaste, decorateTrace }  = require("../pastes/efp-vanilla.js");
let { lexer, grammar } = require("../lexers/efp-logs.js")
const { getReportButton } = require("../utils.js")

// Consts, found in /config.yml
const fallbacks = nconf.get("fallbacks")
const vanillaBuild = nconf.get("vanillaBuild")
const trunkIden = nconf.get("trunkIden") + '\n'
const discordMaxLength =  nconf.get("discordMaxLength")
const phoneMaxLength = nconf.get("phoneMaxLength")
const maxLength = (discordMaxLength > phoneMaxLength ? phoneMaxLength : discordMaxLength) - trunkIden.length
const systemDetailsDefaults = nconf.get("systemDetailsDefaults")
const noProbCauseLines = nconf.get("noProbCauseLines")

// For testing purposes
// const fs = require("fs")
// fs.readdir("../lexers/logs", (err,files) => {
//   if (err) {
//     console.log( err)
//   } else {
//     files.forEach(fileName => {
//       console.log(fileName + " :\n\n")
	  // let file = fs.readFileSync("../lexers/xray_sky.log" , "utf8")
	  // parseCrashlog(file)
//     })
//   }
// })

async function genMessage (text, err) {
  if (!text.content)
	return { content: nconf.get("emptyLogMsg") }
  // Why doesn't this work...
  // text ?? (() => {return { content: nconf.get("emptyLogMsg") }})();
  try {
	const data = parseCrashlog(text.content);
	for (let k of Object.keys(systemDetailsDefaults))
	  data[k] = getLast(data[k])?.value ?? systemDetailsDefaults[k];

	const hardware = {
	  name: nconf.get("embedHardware"),
	  value: `__CPU__: ${data.CPU}\n__GPU__: ${data.GPU}`,
	  inline: true
	};
	const build = {
	  name: nconf.get("embedBuild"),
	  value: data.Build,
	  inline: true
	};
	const dx = {
	  name: nconf.get("embedDx"),
	  value: data.Dx,
	  inline: true
	};

	let fatal
	if (!data.Fatal) {
	  const probCause = fallbacks.map(f => {
	  const currTok = data?.[f]
	  if (currTok)
		for (let i = currTok.length-1; i>=0; i--)
		  if (currTok[i]?.value && currTok[i]?.line !== undefined)
			return currTok[i]
	  }).sort((a,b) => b.line - a.line)[0]?.value ?? (() => text.content.match(new RegExp(`(?:[^\n]*\n){${noProbCauseLines}}$`, 'g'))[0]
		// let currCharN = text.length-1;
		// let line = 0;
		// let probCause = "";
		// // Get the ${noProbCauseLines} last line of the file
		// while (currCharN >= 0) {
		//   let currChar = text.charAt(currCharN);
		//   if (currChar == '\n') {
		//     // Ignore empty lines
		//     if (text.charAt(currCharN-1).match(/\s/)){
		//       currChar --;
		//       continue;
		//     }
		//     line++;
		//   }
		//   [> Since we encounter the newline before the line
		//      we do +1 to get the correct number of lines */
		//   if (line >= noProbCauseLines + 1) break;
		//   probCause = currChar + probCause;
		//   currCharN--;
		// }
		// // Hack to reverse the string
		// // probCause = probCause.split("").reverse().join("");
	  )();
	  fatal = {
		name: nconf.get("embedNoFatal"),
		value: trunkIfNeeded(decorateTrace(probCause)) + '\n'
	  };
  	} else {
	  fatal = {
		name: nconf.get("embedFatal"),
		value: `>>> ${data.Fatal[0].value}`
	  };
	}
	/* Lua stacktrace.
	  Appears if the fatal error is lua related.
	  if the lua stacktrace only has one entry it means
	  the rest of the trace was formated as a non-fatal
	  trace which are stored in Traceback.
	  So we concat the two to get the full trace
	*/
	// Is there a &&+ ?
	let luastack
	// Checking for nullish value is a fix for C++ exception lua stacktrace
	if (data.LUAStack && data.LUAStack.value) {
	  trace = getLast(data.LUAStack).value
	  trace = trace.length == 1 ? [trace, getLast(data.Traceback)?.value].flat() : trace
	  luastack = {
		name: nconf.get("embedLua"),
		value: trunkIfNeeded(decorateTrace(trace))
	  };
	}

	const pasteResponse = await JSP.publish(vanillaPaste(data));
	const pasteUrl = {
	  name: nconf.get("embedPaste"),
	  value: pasteResponse.url
	}

	const embed = new Discord.MessageEmbed()
	  .setColor(nconf.get("embedColor"))
	  .setTitle(nconf.get("embedTitle"))
	  .setFooter({ text: nconf.get("embedFooter")})
	embed.fields = [hardware, build, dx, fatal]
	luastack && embed.addFields(new Object(luastack))
	embed.addFields(new Object(pasteUrl))
	return { content: nconf.get("crash-reply") + text.title, embeds: [embed], components: [getReportButton()]}

  } catch(e) {

	console.error(e)
	if (err) return e.toString()
	return { content: nconf.get("genErrorMessage") + text.title, components: [getReportButton()]}
	}
}

function getLast(obj){
  if (Array.isArray(obj)){ return obj[obj.length-1] }
  return obj
}

function trunkIfNeeded(v){
  // Could it be done in one step with regex ?
  if (v.length > maxLength) {
	ret = v.slice(-maxLength)
	v = trunkIden + ret.substr(ret.indexOf('\n') + 1)
  }
  return v
}

function addUnique(arr, el){
  arr ??= [];
  let isPresent = false
  for (let i = arr.length-1; i >= 0; i--)
	if (arr[i]?.value && el?.value
	  && arr[i].value.toString() == el.value.toString())
	  isPresent = true

  !isPresent && arr.push(el)
  return arr
}

class parsingException {
  constructor(message) {
	this.message = message;
  }

  toString() {
	return `parsing error:\n${this.message}`
  }
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
	  const rule = grammar?.[token.type];
	  if(!rule) continue;

	  if (rule.precond?.(token.value) ?? true) {
		const value = rule.functor?.(lexer) ?? token.value ?? rule.pdefault;

		ret[token.type] = addUnique(ret[token.type], {
		  line: token.line,
		  value
		});
	  }
	} catch (e) {
	  throw new parsingException(`This token caused the following error: ${token} (${token.line}) =>\n${e.stack}`);
	}
  }
// console.log(ret)
return ret;
}
module.exports = { genMessage, decorateTrace }
