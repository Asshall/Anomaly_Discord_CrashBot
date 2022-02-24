const { Client, Collection, Intents } = require("discord.js")
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");;
const keepAlive = require("./server.js")
const fs = require("fs");
const yaml = require('js-yaml');

// Configs
const nconf = require("nconf");
nconf.env()
  .file("secrets", "secrets.json")
  .file("config",{ file: "config.yml", format: {
	parse: yaml.load,
	stringify: yaml.safeDump
	}
  })
  .required(['token', 'guildId' ])
// nconf.defaults({
//   "crash-reply": "So..."
// });

// Registering Client
const token = nconf.get("token");
client = new Client({
  intents: [
	Intents.FLAGS.GUILDS,
	Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
	Intents.FLAGS.GUILD_MESSAGES,
	Intents.FLAGS.DIRECT_MESSAGES,
	Intents.FLAGS.GUILD_PRESENCES,
	Intents.FLAGS.DIRECT_MESSAGE_TYPING,
	Intents.FLAGS.GUILD_MEMBERS
  ]
});
client.login(token);

// Registering Commands
client.commands = new Collection();
const commands = [];
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// commands.push(command.data.toJSON());
	client.commands.set(command.data.name, command);
}
const rest = new REST({ version: '9' }).setToken(token);
(async () => {
	try {

		await rest.put(
			Routes.applicationGuildCommands(nconf.get("clientId"), nconf.get("guildId")),
			{ body: Array.from(client.commands.values())
			  .filter(x => !nconf.get("noAdvertiseCommands").includes(x.data.name))
			  .map(cmd => cmd.data.toJSON()) },
		);

		console.log("Successfully reloaded application (/) commands.");
	} catch (error) {
		console.error(error);
	}
})();

// Registering Events
const load_dir = (dirs) => {
	const event_files = fs.readdirSync(`./events/${dirs}`).filter(file => file.endsWith(".js"));
	for (const file of event_files) {
		const event = require(`./events/${dirs}/${file}`);
		const event_name = file.split(".")[0];
		client.on(event_name, (...args) => event(...args, client));
	}
}
["guild", "client"].forEach(e => load_dir(e));

keepAlive();
