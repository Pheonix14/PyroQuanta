const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const config = require("./../../config/config.json");
const model = require("./../model/gemini.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("caption-writer")
    .setDescription("Write a caption for your social post")
    .addStringOption((option) =>
      option
        .setName("about")
        .setDescription(
          "about your post, eg. photo of my self front of ram mandir",
        )
        .setRequired(true),
    ),
  async execute(interaction, client) {
    const about = interaction.options.getString("about");

    try {
      const result = await model.generateContent(`write a caption for social post about: ${about}`);
      const response = await result.response;
      const text = response.text();

      const embed = new EmbedBuilder()
        .setTitle(`**Caption Writer AI**`)
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
