const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Discord = require("discord.js");
const cpuStat = require("cpu-stat");
const os = require("node:os");
const ms = require("ms");
const config = require("./../../config/config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("system-info")
    .setDescription("Check bot's system info"),
  async execute(interaction, client) {
    if (!config.settings.admin.includes(interaction.user.id))
      return interaction.reply(`This command is only for developers`);
    try {
    cpuStat.usagePercent(function (err, percent) {
      if (err) {
        return console.log(err);
      }

      const totalMemory = os.totalmem();

      const usedMemory = totalMemory - os.freemem();

      const totalMemoryMB = (totalMemory / (1024 * 1024)).toFixed(2);
      const usedMemoryMB = (usedMemory / (1024 * 1024)).toFixed(2);

      const SYSuptime = os.uptime();

      let SYSuptimeString = ms(SYSuptime * 1000, { long: true });

      const Botuptime = interaction.client.uptime;

      let BOTuptimeString = ms(Botuptime);

      const embed = new EmbedBuilder()
        .setTitle(`**System Info:**`)
        .addFields(
          {
            name: "Gateway Latency:",
            value: `${interaction.client.ws.ping}ms`,
            inline: false,
          },
          {
            name: "CPU:",
            value: `${os.cpus()[0].model}`,
            inline: false,
          },
          {
            name: "CPU Arch:",
            value: `${os.arch()}`,
            inline: false,
          },
          {
            name: "CPU Usage:",
            value: `${percent.toFixed(2)}%`,
            inline: false,
          },
          {
            name: "RAM Usage:",
            value: `${usedMemoryMB}MB / ${totalMemoryMB}MB`,
            inline: false,
          },
          {
            name: "OS Platform:",
            value: `${os.platform()}`,
            inline: false,
          },
          {
            name: "NodeJS:",
            value: `${process.version}`,
            inline: false,
          },
          {
            name: "Discord.js:",
            value: `v${Discord.version}`,
            inline: false,
          },
          {
            name: "Bot Uptime:",
            value: BOTuptimeString,
            inline: false,
          },
          {
            name: "System Uptime:",
            value: SYSuptimeString,
            inline: false,
          },
        )
        .setFooter({ text: `PyroQuanta` })
        .setTimestamp();
      interaction.editReply({ embeds: [embed] });
    });
      } catch (error) {
       interaaction.editReply({ content: "An error occurred while executing this command." });
      consolo.error(error);
    }
  },
};
