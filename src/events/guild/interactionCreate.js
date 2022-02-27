const nconf = require("nconf")

module.exports = async interaction => {
	if (!(interaction.isCommand() || interaction.isButton()) ) return;

	const commandName = interaction.isCommand() ? interaction.commandName : interaction.customId
	const command = client.commands.get(commandName);

	if (!command) return;

	// await command.execute(interaction);
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: nconf.get("interErr"), ephemeral: true });
	}
}
