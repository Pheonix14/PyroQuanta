const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const config = require("./../../config/config.json");
const model = require("./../model/gemini.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("simplify")
    .setDescription("Generate a simplify version of the prompt")
    .addStringOption((option) =>
      option
        .setName("type")
        .setDescription("type of prompt, eg. Code")
        .setRequired(true)
        .addChoices(
          { name: "Code", value: "code" },
          { name: "Text", value: "text" },
          { name: "Complex Idea", value: "complex idea" },
        ),
    )
    .addStringOption((option) =>
      option
        .setName("prompt")
        .setDescription("prompt to simplify, eg. your code")
        .setRequired(true),
    ),
  async execute(interaction, client) {
    const prompt = interaction.options.getString("prompt");
    const type = interaction.options.getString("type");

    try {
      const result = await model.generateContent(
        `simplify the ${type}: "${prompt}"`,
      );
      const response = await result.response;
      const text = response.text();

      const embed = new EmbedBuilder()
        .setTitle(`**Simplify AI**`)
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
