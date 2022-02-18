const Discord = require("discord.js");

module.exports = (client, text, message) => {
  message.reply({content:`Your log either is not a crash log or isn't full`});
}
