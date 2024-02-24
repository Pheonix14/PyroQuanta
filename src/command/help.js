const {
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  SlashCommandBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Check command list of the bot"),
  async execute(interaction, client) {
    const row = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId("help_select")
        .setPlaceholder("Select Command List ")
        .addOptions([
          {
            label: "Info",
            emoji: "📄",
            description: "Info commands list",
            value: "help_info",
          },
          {
            label: "Generative AI",
            emoji: "✨",
            description: "Generative AI commands list",
            value: "help_genAI",
          },
          {
            label: "Developer Only",
            emoji: "🔌",
            description: "Developer Only commands list",
            value: "help_dev",
          },
        ]),
    );

    const embed = new EmbedBuilder()
      .setTitle(`**Welcome To PyroQuanta!**`)
      .setDescription(
        `

    __**🔑 Key Features:**__

     - **✨ AI Code Writer:** Generate code magic from your words!
     - **💠 AI Translator:** Speak any language fluently with my help.
    - **🔠 Grammarify AI:** Say goodbye to typos and awkward phrasing.
     

    __**📊  My Stats:**__
    > **🚉 ${interaction.client.guilds.cache.size} Servers**
    > **🙋 ${interaction.client.users.cache.size} Users**
    > **#️⃣ ${interaction.client.channels.cache.size} Channels**

    __**🦊 Don't forget:**__
     Check the menu for a full list of commands!

    __**📌 Links:**__
    [Website](https://phoenixopentech.netlify.app/)
    [Support](https://dsc.gg/phoenixopentech)
    [Invite Me](https://discord.com/api/oauth2/authorize?client_id=1160118611021672448&permissions=964220475456&scope=bot)
  `,
      )
      .setFooter({ text: 'PyroQuanta' })
      .setTimestamp();

    interaction.editReply({ embeds: [embed], components: [row] });

    const InfoEmbed = new EmbedBuilder()
      .setTitle(`**PyroQuanta's Commands**`)
      .setDescription("**📄 Info:**")
      .addFields(
        { name: "/ping", value: "- Check bot's latency", inline: false },
        {
          name: "/help",
          value: "- Check command list for the bot",
          inline: false,
        },
      )
      .setFooter({ text: `PyroQuanta` })
      .setTimestamp();

    const GenAiEmbed = new EmbedBuilder()
      .setTitle(`**PyroQuanta's Commands**`)
      .setDescription("**✨ Generative AI:**")
      .addFields(
        {
          name: "/ask-pyroquanta",
          value: "- Ask questions to PyroQuanta.",
          inline: false,
        },
        {
          name: "/code-write",
          value: "- Write code for your project",
          inline: false,
        },
        {
          name: "/email-write",
          value: "- Write emails for you",
          inline: false,
        },
        {
          name: "/grammarify-ai",
          value:
            "- Fix grammar mistakes in your text and make it more readable",
          inline: false,
        },
        {
          name: "/ai-translate",
          value: "- Translate text to another language",
          inline: false,
        },
        {
          name: "/error-fixer",
          value: "- Find errors in your code and fix it",
          inline: false,
        },
        {
          name: "/tone-changer",
          value: "- Change tone of your text",
          inline: false,
        },
      )
      .setFooter({ text: `PyroQuanta` })
      .setTimestamp();

    const DevEmbed = new EmbedBuilder()
      .setColor(embeds.color)
      .setTitle(`**PyroQuanta's Commands**`)
      .setDescription("**🔌 Developer Only:**")
      .addFields(
        { name: "/eval", value: "- Evaluate javascript code dynamically", inline: false },
        {
          name: "/system-info",
          value: "- Check bot's system info",
          inline: false,
        },
      )
      .setFooter({ text: `PyroQuanta` })
      .setTimestamp();
    
    const collector = interaction.channel.createMessageComponentCollector({
      ComponentType: "SELECT_MENU",
      customId: "help_select",
      time: "60000",
    });

    collector.on("collect", async (collected) => {
      const value = collected.values[0];

      if (value === "help_info") {
        collected.reply({ embeds: [InfoEmbed] });
      }

      if (value === "help_genAI") {
        collected.reply({ embeds: [GenAiEmbed] });
      }

      if (value === "help_dev") {
        collected.reply({ embeds: [DevEmbed] });
      }
    });

    collector.on("end", (collected) =>
      console.log(`Collected ${collected.size} items`),
    );
  },
};
