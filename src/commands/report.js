const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton } = require("discord.js");
const { getLogs, isLog, fetchAttachment } = require("../utils.js");
const { genMessage } = require("../logtypes/crash.js");
const nconf = require("nconf");

module.exports = {
  data: new SlashCommandBuilder()
	.setName("report")
	.setDescription("Report a log that broke me"),
  async execute(interaction) {
	/* If the bot response is an actual response you can actually report a bug for the person who actually send the first log */
	const user = nconf.get("messageAsResponse") ? interaction.message.mentions.repliedUser : interaction.user;
	const messages = await interaction.channel.messages.fetch({limit: nconf.get("fetchDepthLimit")});

	let culprit
	let logs = []
	// Get the last message of the user that has a log as attachement
	for (const i of messages) {
	  const currMsg = i[1]; // First el is message id
	  const attachments = currMsg.attachments;
	  (currMsg.author.id == user.id) && attachments.map
		(a => isLog(a) && logs.push(a));
		if (logs.length) {
		  culprit = currMsg; break;
		}
	}
	if (!culprit){
	  await interaction.reply({ content: nconf.get("reportFailFetch").replace("@", nconf.get("fetchDepthLimit")), ephemeral: true });
		throw new Error("Reported log couldn't be found");
	}
	// Had to wrap the throw into a lambda cause is was throwing a syntax error...
	const reportChannel = await client.channels.fetch(nconf.get("reportChannelId")) ?? (() => {throw new Error("Couldn't find the report channel")})();
		
	const embeds = interaction.message.embeds;
	for (let i=0; i < logs.length; i++) {
	  const mdCodeBlock = "\`".repeat(3)
	  const error = !embeds.length ? `${mdCodeBlock}${await genMessage(await fetchAttachment(logs[i]), true)}${mdCodeBlock}` : ''
	  reportChannel.send({
		content: `${user.toString()} ${nconf.get("reportMsg")}${error}`,
		embeds,
		files: [logs[i]]
	  });
	  // Temporary fix... See events/guild/messageCreate.js
	  break;
	}
	interaction.update({content: nconf.get("reportButtonClicked"), components: []})
  },
};
