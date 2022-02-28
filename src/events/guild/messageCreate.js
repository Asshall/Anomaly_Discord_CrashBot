const fs = require("fs");
const { getLogs } = require("../../utils.js");
const { genMessage } = require(`../../logtypes/crash.js`)
const nconf = require("nconf")

module.exports = async (message, bot) => {

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  // If the bot gets pinged
  const content = message.content
  if (content.match(`<@!${nconf.get("clientId")}`)) {
	const responses = require("../../pings/basic.js")
	const reply = responses[Math.floor(Math.random() * responses.length)];
	message.reply({content: reply})
  } else if (content.match(/anarchis(?:me?|te?)/)) {
	message.reply({content: "You better not be saying anything bad <:realsquid:910247033468764220>"})
  }
  if (!message.attachments.size) return;
  const logs = await getLogs(message)
  for (let i=0; i < logs?.length; i++) {
	const msg = await genMessage(logs[i]);
	if (nconf.get("messageAsResponse")) {
	  message.reply(msg)
	} else {
	  message.channel.send(msg)
	}
  }
}
