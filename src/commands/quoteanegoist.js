const { SlashCommandBuilder } = require("@discordjs/builders");
const { exec } = require("child_process");
const nconf = require("nconf");

module.exports = {
  data: new SlashCommandBuilder()
	.setName("quoteanegoist")
	.setDescription(nconf.get("qaeCmdDesc")),
  async execute(interaction) {

    out = await (() => new Promise((resolve,reject) =>  exec("/usr/games/fortune anarchism", (err, stdout, stderr) => resolve(stdout))))();
	await interaction.reply(out);
  },
};
