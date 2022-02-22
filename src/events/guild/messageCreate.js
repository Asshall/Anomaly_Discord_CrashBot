const Discord = require("discord.js");
const { MessageActionRow, MessageButton } = require('discord.js');
const fs = require("fs");
const fetch = require('node-fetch');
const nconf = require('nconf');

module.exports = async (message, bot) => {
  // for testing pruposes
  //if (message.channelId != "886698565315989524") return;

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  // If the bot gets pinged
  const content = message.content
  if (content.match(`<@!${nconf.get("clientId")}`)) {
		//require(`../.././pings/${content.split(' ')[1]}`)						
		message.reply({content:"Stop pinging me <:angerycat:864618091874353172>"})
  }
				
  // For logs
  const file = message.attachments.first();
  if (!file || !file.name.includes(".log")) return;
  try {
    const response = await fetch(file.url);
    if (!response.ok)
      return message.channel.send(
        "Couldn\'t get your log because:",
        response.statusText,
      );
    const text = await response.text();
    if (text) {
	  let { genMessage } = require(`../../logtypes/crash.js`)
	  genMessage(bot, text, message);
    }
  } catch (error) {
    console.log(error);
  }
}
