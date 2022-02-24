const { SlashCommandBuilder } = require('@discordjs/builders');
const { exec } = require("child_process");

module.exports = {
  data: new SlashCommandBuilder()
	.setName('quoteanegoist')
	.setDescription('Give you output from fortune anarchism'),
  async execute(interaction) {

    out = await (() => new Promise((resolve,reject) =>  exec('/usr/games/fortune anarchism', (err, stdout, stderr) => resolve(stdout))))();
	await interaction.reply(out);
  },
};
