const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const config = require("./../../config/config.json");
const model = require("./../model/gemini-pro.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("travel-planner")
    .setDescription("make a travel plan for your trip")
    .addStringOption((option) =>
      option
        .setName("destination")
        .setDescription("your trip destination, eg. Ayodhya")
        .setRequired(true),
    )
    .addNumberOption((option) =>
      option
        .setName("stay")
        .setDescription("how many days to stay, eg. 7 days")
        .setRequired(true),
    ),
  async execute(interaction, client) {
    const destination = interaction.options.getString("destination");
    const stay = interaction.options.getNumber("stay");

    try {
      const result = await model.generateContent(
        `plan a trip to: ${destination} for ${stay} days`,
      );
      const response = await result.response;
      const text = response.text();

      const embed = new EmbedBuilder()
        .setTitle(`**Travel Planner AI**`)
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
