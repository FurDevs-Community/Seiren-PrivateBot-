//FURDEVS MODERATION. PROGRAM BY ONEKIGUWOLF#4859. FOR SUPPORT, PLEASE SEE US AT FURDEVS DISCORD!
//NOTE: THIS IS RAN ON REPLIT. 

require('dotenv').config()
const fs = require('fs')
const { Client, GatewayIntentBits, Collection } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers, GatewayIntentBits.DirectMessages, GatewayIntentBits.MessageContent] });

var http = require('http');
http.createServer(function(req, res) {
  res.write("I'm Alive");
  res.end();
}).listen(8080); //originally 8080

//detect midway ratelimit that lasts to infinity
client.rest.on("rateLimited", ({ timeToReset, global }) => {
  if (timeToReset > 10000 && !global) {
    console.log("Rate limit: restarting");
    process.kill(1);
  }
})
//Bot login
client.login(process.env.BOT_TOKEN);

//determine if bot has failed to launch within 10 seconds.
setTimeout(async () => {
  console.log(client.isReady())
  if (client.isReady() == false) {
    console.log("Seiren touched 429. Switching containers.")
    process.kill(1)
  } else {
    console.log("Seiren has logged in, OK.")
  }
}, 10000);


client.commands = new Collection();
client.commands2 = new Collection();
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
const commandFolders = fs.readdirSync('./src/MsgCommands');

for (const folder of commandFolders) {
  const commandFiles2 = fs.readdirSync(`./src/MsgCommands/${folder}`).filter(file => file.endsWith('.js'));
  for (const file of commandFiles2) {
    const command2 = require(`./src/MsgCommands/${folder}/${file}`);
    client.commands2.set(command2.name, command2);
  }
}
const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const event = require(`./src/events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

for (const file of commandFiles) {
  const command = require(`./src/commands/${file}`);
  client.commands.set(command.data.name, command);
}

process.on('uncaughtException', function(err) {
  console.log(`Caught exception: ${err.stack}`);
  let alert2 = client.channels.cache.find(c => c.id == 'ERR_LOG_CHANNEL') //Channel ID of seiren's error logs channel.
  alert2.send({ content: "Found an Error! inform kigu as soon as possible if it still exists!\n\n" + "```" + `${err.stack}` + "```" })
});