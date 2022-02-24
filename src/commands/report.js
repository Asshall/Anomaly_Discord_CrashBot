const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');
const { getLogs, isLog, fetchAttachment } = require("../utils.js")
const { genMessage } = require("../logtypes/crash.js")
const nconf = require("nconf")

module.exports = {
  data: new SlashCommandBuilder()
	.setName('report')
	.setDescription('Report a log that broke me'),
  async execute(interaction) {
	/* If the bot response is an actual response you can actually report a bug for the person who actually send the first log */
	const userId = nconf.get("messageAsResponse") ? interaction.message.mentions.repliedUser.id : interaction.user.id
	const messages = await interaction.channel.messages.fetch({limit: nconf.get("fetchDepthLimit")})
	let culprit
	let logs = []
	// Get the last message of the user that has a log as attachement
	for (const i of messages) {
	  const currMsg = i[1] // First el is message id
	  const attachments = currMsg.attachments
	  if (currMsg.author.id == userId && attachments.size > 0){
		attachments.map(a => {
		  if(isLog(a)) logs.push(a);
		})
		if (logs !== []){
		  culprit = currMsg
		  break
		}
	  }
	}
	if (!culprit){
	  await interaction.reply({ content: nconf.get("reportFailFetch").replace("@", nconf.get("fetchDepthLimit")), ephemeral: true });
	  console.error("Reported log couldn't be found")
	  return
	}
	const reportChannel = await client.channels.fetch(nconf.get("reportChannelId"));
	if(!reportChannel)
	  throw new Error("Couldn't find the report channel")
	const embeds = interaction.message.embeds
	let error = ''
	for (let i=0; i < logs.length; i++) {
	  if (embeds.length == 0) // Means there was an error
		error = await genMessage(await fetchAttachment(logs[i]), true)
	  const msg = {
		content: nconf.get("reportMsg") + `\`\`\`\n${error.stack}\`\`\``,
		embeds: embeds,
		files: [logs[i]]
	  }
	  reportChannel.send(msg)
	}
	interaction.update({content: nconf.get("reportButtonClicked"), components: []})
  },
};
