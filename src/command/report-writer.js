const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const config = require("./../../config/config.json");
const model = require("./../model/gemini-pro.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("report-writer")
    .setDescription("Generate a professional report")
    .addStringOption((option) =>
      option
        .setName("type")
        .setDescription("type of report, eg. Weekly Report")
        .setRequired(true)
        .addChoices(
          { name: "Report", value: "report" },
          { name: "Weekly Report", value: "weekly report" },
          { name: "SWOT Analysis", value: "SWOT Analysis" },
          { name: "Work Progress Report", value: "work progress report" },
        ),
    )
    .addStringOption((option) =>
      option
        .setName("prompt")
        .setDescription(
          "prompt to write report, eg. ai revolution in the year 2023",
        )
        .setRequired(true),
    ),
  async execute(interaction, client) {
    const prompt = interaction.options.getString("prompt");
    const type = interaction.options.getString("type");

    try {
      const result = await model.generateContent(
        `write a ${type} on ${prompt}`,
      );
      const response = await result.response;
      const text = response.text();

      const embed = new EmbedBuilder()
        .setTitle(`**AI Report Writer**`)
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
