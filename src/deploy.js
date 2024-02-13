const { REST, Routes } = require("discord.js");
const config = require("./../config/config.json");
const fs = require("node:fs");

const commands = [];

const commandFiles = fs
  .readdirSync("./src/command")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./command/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(config.bot.token);

(async () => {
  try {
    console.log(
      `Started Refreshing ${commands.length} Application (/) Commands...`,
    );

    if (config.settings.globalCommands) {
      const data = await rest.put(
        Routes.applicationCommands(config.bot.clientId),
        { body: commands },
      );

      console.log(
        `➥ Successfully Reloaded ${data.length} Application (/) Commands.`,
      );
    } else {
      const data = await rest.put(
        Routes.applicationGuildCommands(
          config.bot.clientId,
          config.bot.guildId,
        ),
        { body: commands },
      );

      console.log(
        `➥ Successfully Reloaded ${data.length} Application (/) Commands.`,
      );
    }
  } catch (error) {
    console.error(error);
  }
})();
