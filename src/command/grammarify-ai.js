const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const config = require("./../../config/config.json");
const model = require("./../model/gemini.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("grammarify-ai")
    .setDescription("Fix grammar mistakes in your text and make it more readable")
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("text to fix grammar, eg. Um a good boy")
        .setRequired(true),
    ),
  async execute(interaction, client) {
    const GramText = interaction.options.getString("text");

    try {
      const result = await model.generateContent(
        `fix grammar of given text and make it more readable
        text: "${GramText}"`,
      );
      const response = await result.response;
      const text = response.text();

      const embed = new EmbedBuilder()
        .setTitle(`**Grammarify AI**`)
        .setDescription(`${text}`)
        .setFooter({ text: `Powered by Google's Gemini AI` })
        .setTimestamp();

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      await interaction.editReply(
        "Your request is rejected, please be civil and friendly.",
      );
    }
  },
};
