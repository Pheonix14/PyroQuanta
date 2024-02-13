const { Client, GatewayIntentBits, Collection, Events } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");
const config = require("./../config/config.json");

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

// Events Loader
const eventsPath = path.join(__dirname, "event");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));
console.log(`Loading Events...`);

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
  console.log(`➥ Loaded ${event.name} Event`);
}

// Commands Loader
client.commands = new Collection();

console.log(`Loading Commands...`);

const commandsPath = path.join(__dirname, "command");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
  console.log(`➥ Loaded ${command.data.name} Command`);
}

console.log(`Loading Handlers...`);
["command", config.settings.antiCrash ? "antiCrash" : null]
  .filter(Boolean)
  .forEach((h) => {
    require(`./handler/${h}`)(client);
    console.log(`➥ Loaded ${h} Handler`);
  });

console.log(`Logging Into To The Bot...`);

client.login(config.bot.token);
