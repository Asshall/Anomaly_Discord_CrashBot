const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton } = require("discord.js");
const { getLogs, isLog, fetchAttachment } = require("../utils.js");
const { genMessage } = require("../logtypes/crash.js");
const nconf = require("nconf");

module.exports = {
  data: new SlashCommandBuilder()
	.setName("report")
	.setDescription(nconf.get("reportCmdDesc")),
  async execute(interaction) {
	/* If the bot response is an actual response you can actually report a bug for the person who actually send the first log */
	const user = interaction.user;
	const message = await interaction.channel.messages.fetch(interaction.message.reference.messageId)
	  ?? (() => { throw new Error("Referenced message was not found") });
	const logName = interaction.message.content.split(':')[1].trim()

	let culprit;
	for (let id of message.attachments){
	  const att = id[1]
	  if (att.name == logName) {
		culprit = att;
		break;
	  }
	}

	if (!culprit)
	  throw new Error("Reported log couldn't be found");

	const log = {
	  content: await fetchAttachment(culprit),
	  title: culprit.name
	}
	// Had to wrap the throw into a lambda cause is was throwing a syntax error...
	const reportChannel = await client.channels.fetch(nconf.get("reportChannelId")) ?? (() => {throw new Error("Couldn't find the report channel")})();

	const embeds = interaction.message.embeds;
	const mdCodeBlock = "\`".repeat(3)
	const error = !embeds.length ? `${mdCodeBlock}${await genMessage(log, true)}${mdCodeBlock}` : ''
	reportChannel.send({
	  content: `${user.toString()} ${nconf.get("reportMsg")}${error}`,
	  embeds,
	  files: [culprit]
	});
	interaction.update({content: nconf.get("reportButtonClicked"), components: []})
  },
};
