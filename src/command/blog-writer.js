const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const config = require("./../../config/config.json");
const model = require("./../model/gemini.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("blog-writer")
    .setDescription("Write a blog post for your blog")
    .addStringOption((option) =>
      option
        .setName("topic")
        .setDescription("topic of your blog post, eg. the best way to make money")
        .setRequired(true),
    ),
  async execute(interaction, client) {
    const topic = interaction.options.getString("topic");

    try {
      const result = await model.generateContent(
        `Write a brief and SEO-optimized blog post. The topic is ${topic}`,
      );
      const response = await result.response;
      const text = response.text();

      const embed = new EmbedBuilder()
        .setTitle(`**AI Blog Writer**`)
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
