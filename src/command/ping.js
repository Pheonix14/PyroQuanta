const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Check bot's latency"),
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setTitle(`**PyroQuanta Latency:**`)
      .addFields({
        name: "Gateway Latency:",
        value: `${interaction.client.ws.ping}ms`,
        inline: false,
      })
      .setFooter({ text: `PyroQuanta` })
      .setTimestamp();
    interaction.editReply({ embeds: [embed] });
  },
};
