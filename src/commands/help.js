const { EmbedBuilder, SlashCommandBuilder, PermissionsBitField, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Generates a command list. Sweet~!')
    .addSubcommand(subcommand =>
      subcommand
        .setName('general')
        .setDescription('List of General Commands')
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('moderation')
        .setDescription('List of Commands, FurDevs Staff Team')),

  async execute(interaction) {

    const genhelp = new EmbedBuilder()
      .setAuthor({ name: interaction.client.user.username, iconURL: interaction.client.user.avatarURL() })
      .setTitle("SeirenAI Help Tab")
      .setDescription("General Commands List for SeirenAI")
      .setColor('#e0b0ff')
      .addFields([
        { name: "Server Information Tab `serverinfo`", value: "pulls up the information about the server. Alises: `server`" },
        { name: "User Information `userinfo`", value: "pulls up the information about a user. Alises: `user`, `whois`" },
        { name: "User Avatar `avatar`", value: "pulls up the user's avatar." },
        { name: "Request assistance `support`", value: "Noticed anything unusual, wanting to partner up, or a private feedback? open up a ticket on the spot. Aliases: `ticket-open`, `report`" },
        { name: "Status Checker `ping`", value: "Just making sure to see if I continue to respond." },
        { name: "Apply for Staff `apply`", value: "Opens the Heights Staff Applications Evaluation System, for requirements and the application panel. Aliases: `modapps`, `staffapps`" },
        { name: "About me `info`", value: "Learn about what am I and who made me! Aliases: `about`" },
      ])
      .setTimestamp()
      .setFooter({ text: "FurDevs - General Commands List", iconURL: interaction.client.user.avatarURL() })

    let configModule = new EmbedBuilder()
      .setAuthor({ name: interaction.client.user.username, iconURL: interaction.client.user.avatarURL() })
      .setColor('#e0b0ff')
      .setTitle("FurDevs - Staff Handbook")
      .setDescription("Assistance Panel for FurDevs Staff. Not sure how to use the bot and new to the team? Select a button below and it will take you to a simple guide to navigate your way around the server team!")
      .setTimestamp()
      .setFooter({ text: "FurDevs - Staff Handbook", iconURL: interaction.client.user.avatarURL() })

    let h = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('policyhelp')
          .setStyle(ButtonStyle.Primary)
          .setLabel("FurDevs Staff Policy"),

        new ButtonBuilder()
          .setCustomId('moderationhelp')
          .setStyle(ButtonStyle.Primary)
          .setLabel("Moderation Commands"),

        new ButtonBuilder()
          .setCustomId('verificationhelp')
          .setStyle(ButtonStyle.Primary)
          .setLabel("FurDevs Security Info and Commands"),

        new ButtonBuilder()
          .setCustomId('tickethelp')
          .setStyle(ButtonStyle.Primary)
          .setLabel("ASFDevs Ticket Commands"),

        new ButtonBuilder()
          .setCustomId('cancelhelp')
          .setStyle(ButtonStyle.Danger)
          .setLabel("Close the Help Panel (Staff)"),
      )

    if (interaction.options.getSubcommand() == 'general') {

      await interaction.reply({ content: "Looking for the commands? Let me help you out on that~" })
      await interaction.user.send({ embeds: [genhelp] }).catch(() => interaction.followUp({ content: "Erm, I can't access DMs. Check your privacy settings first before trying again!", ephemeral: true }))

    } else if (interaction.options.getSubcommand() == 'moderation') {

       if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return interaction.reply({content:"Access Denied (You do not have permission.)", ephemeral: true})
          await interaction.reply({ embeds: [configModule], components: [h], ephemeral: true})
    }


  },
};