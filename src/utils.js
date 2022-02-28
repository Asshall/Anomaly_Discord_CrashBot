const nconf = require("nconf")
const fetch = require("node-fetch")
const { MessageActionRow, MessageButton } = require('discord.js');

function isLog(attachment) {
	if (!attachment) return false
	const s = attachment.name.split(".")
	if (!attachment || !nconf.get("logExtensions").includes(s[s.length-1])) return false;
	return true
}

async function fetchAttachment(attachment) {
  try {
	const response = await fetch(attachment.url);
	if (!response.ok)
	  return message.channel.send(nconf.get("fetchErrMessage"),
		response.statusText,
	  );
	const text = await response.text();
	if (text) {
	  return text
	}
  } catch (error) {
	console.log(error);
  }
}

async function getLogs(message) {
  const files = message.attachments;
  const ret = [];
  for (let file of files){
	file = file[1];
	if (!isLog(file)) return;
	ret.push({
	  content: await fetchAttachment(file),
	  title: file.name
	});
  }
  return ret;
}

function getReportButton() {
  return new MessageActionRow()
	.addComponents(
	  new MessageButton()
		.setCustomId("report") // Has to be the same name as the interaction
		.setLabel(nconf.get("reportButtonText"))
		.setStyle('SECONDARY'),
  )
}

module.exports = { getLogs, isLog, fetchAttachment, getReportButton }
