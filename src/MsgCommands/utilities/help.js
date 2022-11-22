const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField } = require('discord.js')

module.exports = {
  name: 'help',
  aliases: ['cmdlist', 'commands'],

  async execute(message, args) {

    const genhelp = new EmbedBuilder()
      .setAuthor({ name: message.client.user.username, iconURL: message.client.user.avatarURL() })
      .setColor('#e0b0ff')
      .setTitle("SeirenAI Help Tab")
      .setDescription("General Commands List for SeirenAI")
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
      .setFooter({ text: "FurDevs - General Commands List", iconURL: message.client.user.avatarURL() })

    let configModule = new EmbedBuilder()
      .setAuthor({ name: message.client.user.username, iconURL: message.client.user.avatarURL() })
      .setColor('#e0b0ff')
      .setTitle("FurDevs - Staff Handbook")
      .setDescription("Assistance Panel for FurDevs Staff. Not sure how to use the bot and new to the team? Select a button below and it will take you to a simple guide to navigate your way around the server team!")
      .setTimestamp()
      .setFooter({ text: "FurDevs - Staff Handbook", iconURL: message.client.user.avatarURL() })

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

    let puta = args[0]

    if (!puta) {
      message.reply("Please indicate if this is mainly general help (`k.help general`), or assistance with Moderation (`k.help moderation`).")
      return
    } else
      if (puta == "general") {
        message.reply("Alrighty, I'll send it to you in DMs! (General Assistance)")
        message.author.send({
          content: "> Pro tip: kept forgetting the commands? Use Slash Commands!", embeds: [genhelp]
        }).catch(() => message.channel.send({ content: "Erm, I can't access DMs. Check your privacy settings first before trying again!" }))
      } else
          if (puta == "moderation") {
            if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return message.reply("Access Denied (You do not have permission.)")
            message.reply("Alrighty, I'll send it to you in DMs! (Staff Commands List)")
            message.author.send({
              content: "> Pro tip: kept forgetting the commands? Use Slash Commands!", embeds: [configModule], components: [h]
            }).catch(() => message.channel.send({ content: "Erm, I can't access DMs. Check your privacy settings first before trying again!" }))
          } else
            await message.reply("Please indicate if this is mainly general help (`k.help general`), or assistance with Moderation (`k.help moderation`).\n\n**Note: `comprojmod` and `comprojmain` is currently under maintenance. Thanks for your patience with me!**")
  }
}