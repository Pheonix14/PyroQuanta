const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const config = require("./../../config/config.json");
const model = require("./../model/gemini-pro.js");
const embeds = require("./../../config/embeds.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("error-fixer")
    .setDescription("Find errors in your code and fix it")
    .addStringOption((option) =>
      option
        .setName("error")
        .setDescription("code's error message, eg. PyroQuanta is not defined")
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("code")
        .setDescription("code that have error, eg. console.log(PyroQuanta)")
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("coding-lang")
        .setDescription("programming language, eg. javascript")
        .setRequired(true),
    ),
  async execute(interaction, client) {
    const errorMsg = interaction.options.getString("error");
    const code = interaction.options.getString("code");
    const codingLang = interaction.options.getString("coding-lang");

    try {
      const result = await model.generateContent(
        `find the error: "${errorMsg}",
        
        from the code: "${code}
        
        in: "${codingLang} programming language"`,
      );
      const response = await result.response;
      const text = response.text();

      const embed = new EmbedBuilder()
        .setColor(embeds.color)
        .setTitle(`**AI Error Finder**`)
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
