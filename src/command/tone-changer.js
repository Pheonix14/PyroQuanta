const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const config = require("./../../config/config.json");
const model = require("./../model/gemini-pro.js");
const embeds = require("./../../config/embeds.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tone-changer")
    .setDescription("Change tone of your text")
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("text to change tone, eg. Im a good employee")
        .setRequired(true),
    )
  .addStringOption((option) =>
      option
        .setName("tone")
        .setDescription("type of tone, eg. Professional")
        .setRequired(true)
        .addChoices(
				{ name: 'Funny', value: 'funny' },
				{ name: 'Professional', value: 'professional' },
				{ name: 'Casual', value: 'casual' },
        { name: 'Friendly', value: 'friendly' },
        { name: 'Media Post', value: 'media post' },
        { name: 'Sarcastic', value: 'sarcastic' },
        { name: 'Introvert', value: 'introvert' },
			),
    ),
  async execute(interaction, client) {
    const ToneText = interaction.options.getString("text");
    const tone = interaction.options.getString("tone");

    try {
      const result = await model.generateContent(
        `change tone of the text: "${ToneText}" to ${tone} style tone.`,
      );
      const response = await result.response;
      const text = response.text();

      const embed = new EmbedBuilder()
        .setColor(embeds.color)
        .setTitle(`**AI Tone Changer**`)
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
