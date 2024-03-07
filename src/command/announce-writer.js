const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const config = require("./../../config/config.json");
const model = require("./../model/gemini-pro.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("announce-writer")
    .setDescription("Write a cool announcement for your server")
    .addStringOption((option) =>
      option
        .setName("topic")
        .setDescription("topic of your announcement, eg. PyroQuanta is just released")
        .setRequired(true),
    ),
  async execute(interaction, client) {
    const topic = interaction.options.getString("topic");

    try {
      const result = await model.generateContent(
        `Write a brief announcement. The topic is ${topic}`,
      );
      const response = await result.response;
      const text = response.text();

      const embed = new EmbedBuilder()
        .setTitle(`**AI Announcement Writer**`)
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
