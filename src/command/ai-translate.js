const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const config = require("./../../config/config.json");
const model = require("./../model/gemini.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ai-translate")
    .setDescription("Translate text to another language")
    .addStringOption((option) =>
      option
        .setName("from")
        .setDescription("laguange to translate from, eg. English")
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("text to translate, eg. Hello World")
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("to")
        .setDescription("laguange to translate to, eg. Hindi")
        .setRequired(true),
    ),
  async execute(interaction, client) {
    const fromLang = interaction.options.getString("from");
    const transText = interaction.options.getString("text");
    const toLang = interaction.options.getString("to");

    try {
      const result = await model.generateContent(
        `translate the text: "${transText}", from: ${fromLang} to: ${toLang}`,
      );
      const response = await result.response;
      const text = response.text();

      const embed = new EmbedBuilder()
        .setTitle(`**AI Translate**`)
        .setDescription(`${text}`)
        .setFooter({ text: `Powered by Google's Gemini AI` })
        .setTimestamp();

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      await interaction.editReply(
        "Your request is rejected, maybe given language is not supported.",
      );
    }
  },
};
