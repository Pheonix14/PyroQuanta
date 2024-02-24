const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const config = require("./../../config/config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("eval")
    .setDescription("Evaluate javascript code dynamically")
    .addStringOption((option) =>
      option
        .setName("eval")
        .setDescription("Javascript code to eval")
        .setRequired(true),
    ),
  async execute(interaction, client) {
    if (!config.settings.admin.includes(interaction.user.id))
      return interaction.reply(`This command is only for developers`);

    const code = interaction.options.getString("eval");
    try {
      const result = eval(code);
      interaction.editReply(`Result: \`\`\`js\n${result}\`\`\``);
    } catch (error) {
      interaction.editReply(`Error: \`\`\`bash\n${error}\`\`\``);
    }
  },
};
