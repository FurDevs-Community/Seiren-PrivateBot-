const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
const fs = require('fs');
require('dotenv').config()

const commands = [];
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

// Place your client and guild ids here
const clientId = process.env.clientID;
const guildId = process.env.guildID;
const token = process.env.BOT_TOKEN

console.log('token', token.split('').map(() => '*').join(''))

for (const file of commandFiles) {
  const command = require(`./src/commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();