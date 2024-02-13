const config = require("./../../config/config.json");

module.exports = (client) => {
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`,
      );
      return;
    }

    if (config.settings.maintenance) {
      if (!config.settings.admin.includes(interaction.user.id))
        return interaction.reply(
          `**Bot Is Under Maintenance. Please Try Again Leter**`,
        );
    }

    await interaction.deferReply();

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(`Error executing ${interaction.commandName}`);
      console.error(error);
      await interaction.editReply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  });
};
