const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const config = require("./../../config/config.json");
const model = require("./../model/gemini-pro.js");
const embeds = require("./../../config/embeds.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("email-writer")
    .setDescription("Genrate emails.")
    .addStringOption((option) =>
      option
        .setName("to")
        .setDescription("person to email, eg. sir, headmaster")
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("subject")
        .setDescription("subject of email, eg. leave application")
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("from")
        .setDescription("your name, eg. Pheonix")
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("details")
        .setDescription(
          "explain some details, eg. im sorry i didnt get your leave",
        ),
    ),

  async execute(interaction, client) {
    const to = interaction.options.getString("to");
    const subject = interaction.options.getString("subject");
    const details = interaction.options.getString("subject") || "";
    const from = interaction.options.getString("from");

    try {
      const result = await model.generateContent(
        `write a email to ${to} with subject ${subject} and include details "${details}" from ${from}`,
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
