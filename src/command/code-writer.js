const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const config = require("./../../config/config.json");
const model = require("./../model/gemini-pro.js");
const embeds = require("./../../config/embeds.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("code-writer")
    .setDescription("Write code for your project")
    .addStringOption((option) =>
      option
        .setName("project")
        .setDescription("project to write code for, eg. discord bot")
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("coding-lang")
        .setDescription("programming language, eg. python")
        .setRequired(true),
    ),
  async execute(interaction, client) {
    const project = interaction.options.getString("project");
    const codingLang = interaction.options.getString("coding-lang");

    try {
      const result = await model.generateContent(
        `write code for ${project} in ${codingLang}`,
      );
      const response = await result.response;
      const text = response.text();

      const embed = new EmbedBuilder()
        .setColor(embeds.color)
        .setTitle(`**PyroQuanta**`)
        .setDescription(`${text}`)
        .setFooter({ text: `Powered by Google's Gemini AI` })
        .setTimestamp();

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      await interaction.editReply(
        "Your request is rejected, please be civil and friendly",
      );
    }
  },
};
