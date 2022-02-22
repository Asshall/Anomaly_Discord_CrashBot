const Discord = require('discord.js'),
  client = new Discord.Client({
    intents: [
      Discord.Intents.FLAGS.GUILDS,
      Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
      Discord.Intents.FLAGS.GUILD_MESSAGES,
      Discord.Intents.FLAGS.DIRECT_MESSAGES,
      Discord.Intents.FLAGS.GUILD_PRESENCES,
      Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING,
      Discord.Intents.FLAGS.GUILD_MEMBERS
    ]
  });

const keepAlive = require('./server.js');

// Configs
const nconf = require('nconf');
nconf.env()
  .file({ file: 'secret.json' });
nconf.argv()
  .env()
  .file({ file: 'config.json' });
nconf.defaults({
  "crash-reply": "So..."
});

const Token = nconf.get('token');
client.login(Token);

["event_handler"].forEach(handlers => {
  require(`./handlers/${handlers}.js`)(client);
});
keepAlive();
