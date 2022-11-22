const { EmbedBuilder } = require('discord.js')
const Database = require("@replit/database")
const db = new Database()

module.exports = {
  name: 'finisher',
  async execute(interaction) {

    let app01id = 'app01-' + interaction.user.id
    let app02id = 'app02-' + interaction.user.id
    let app03id = 'app03-' + interaction.user.id
    let app04id = 'app04-' + interaction.user.id

    let check01 = await db.get(app01id)
    if (!check01) return interaction.reply({ content: "Step 01 is not saved. Please finish Step 01 before submission." })

    let check02 = await db.get(app02id)
    if (!check02) return interaction.reply({ content: "Step 02 is not saved. Please finish Step 02 before submission." })

    let check03 = await db.get(app03id)
    if (!check03) return interaction.reply({ content: "Step 03 is not saved. Please finish Step 03 before submission." })

    let check04 = await db.get(app04id)
    if (!check04) return interaction.reply({ content: "Step 04 is not saved. Please finish Step 04 before submission." })

    const response01 = new Array(check01.app01a1, check01.app01a2, check01.app01a3)


    const embed01 = new EmbedBuilder()
      .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL() })
      .setColor('#e0b0ff')
      .setTitle("In-Server Application System")
      .setThumbnail(interaction.user.displayAvatarURL())
      .setDescription(`User ${interaction.user.username}#${interaction.user.discriminator} Has applied.`)
      .addFields([
        { name: "Discord Tag:", value: `${interaction.user.username}#${interaction.user.discriminator}` },
        { name: "User ID:", value: `${interaction.user.id}` },
        { name: "Nickname:", value: response01[0] },
        { name: "Applied For:", value: response01[1] },
        { name: "About me:", value: response01[2] },
      ])
      .setTimestamp()
      .setFooter({ text: 'Part 01: Primary Information', iconURL: interaction.client.user.avatarURL() })

    const response02 = new Array(check02.app02a1, check02.app02a2, check02.app02a3, check02.app02a4, check02.app02a5)
    const embed02 = new EmbedBuilder()
      .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL() })
      .setColor('#e0b0ff')
      .setTitle("Interview")
      .setDescription(`User ${interaction.user.username}#${interaction.user.discriminator} Has applied.`)
      .addFields([
        { name: "Experience in Moderation:", value: response02[0] },
        { name: "Mental Health Concerns:", value: response02[1] },
        { name: "How long have I been in FurDevs:", value: response02[2] },
        { name: "Can speak in ENG:", value: response02[3] },
        { name: "Needs Training:", value: response02[4] },
      ])
      .setTimestamp()
      .setFooter({ text: 'Part 02: Interview', iconURL: interaction.client.user.avatarURL() })

    const response03 = new Array(check03.app03a1, check03.app03a2, check03.app03a3, check03.app03a4, check03.app03a5)

    const embed03 = new EmbedBuilder()
      .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL() })
      .setColor('#e0b0ff')
      .setTitle("Situational Analysis")
      .setDescription(`User ${interaction.user.username}#${interaction.user.discriminator} Has applied.`)
      .addFields([
        { name: "Case 01 - Raider:", value: response03[0] },
        { name: "Case 02 - Inappropriate content:", value: response03[1] },
        { name: "Case 03 - Delinquent Users:", value: response03[2] },
        { name: "Case 04 - Staff Abuse of Power:", value: response03[3] },
        { name: "Case 05 - Channel Misuse:", value: response03[4] },
      ])
      .setTimestamp()
      .setFooter({ text: 'Part 03: Situational Analysis', iconURL: interaction.client.user.avatarURL() })


    const response04 = new Array(check04.app04a1, check04.app04a2)
    const embed04 = new EmbedBuilder()
      .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL() })
      .setColor('#e0b0ff')
      .setTitle("Essay")
      .setDescription(`User ${interaction.user.username}#${interaction.user.discriminator} Has applied.`)
      .addFields([
        { name: "What can I offer for FurDevs and what it means to me:", value: response04[0] },
        { name: "Why I chose to be staff in FurDevs:", value: response04[1] },
      ])
      .setTimestamp()
      .setFooter({ text: 'Part 04: Essay', iconURL: interaction.client.user.avatarURL() })

    var kaki = interaction.client.guilds.resolve('GUILD_ID')
    kaki.channels.create({ name: `app-${interaction.user.id}` }).then(async channel => {
      channel.setParent('STAFFCATEGORY')
      channel.permissionOverwrites.edit('STAFF_ROLE', {SendMessages: false})
      channel.send({ content: "New Application!", embeds: [embed01, embed02, embed03, embed04] })
    })
    await interaction.update({ content: "Congrats! You have finally submitted your application. Please await a message that confirms that your submission has been received in full. Thank you!", embeds: [], components: [] })
    await db.delete(app01id)
    await db.delete(app02id)
    await db.delete(app03id)
    await db.delete(app04id)
  }
}