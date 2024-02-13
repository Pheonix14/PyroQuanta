const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const embeds = require("./../../config/embeds.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("check bot's latency"),
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setColor(embeds.color)
      .setTitle(`**PyroQuanta Latency:**`)
      .addFields({
        name: "Gateway Latency:",
        value: `${interaction.client.ws.ping}ms`,
        inline: true,
      })
      .setFooter({ text: `${embeds.footer}` })
      .setTimestamp();
    interaction.editReply({ embeds: [embed] });
  },
};
