const { ModalBuilder, ActionRowBuilder, TextInputBuilder, ButtonBuilder, ButtonStyle, TextInputStyle } = require('discord.js')
const partnerreq = require('./partnermodal.js')
const affiliatereq = require('./affiliatemodal.js')

module.exports = {
  name: 'supportmanager',
  async execute(interaction) {
    console.log('Support System Active.')
    var kaki = interaction.client.guilds.resolve('GUILD_ID')

    if (interaction.customId == 'partnership') {
      await partnerreq.execute(interaction)
    }
    if (interaction.customId == 'affiliate') {
      await affiliatereq.execute(interaction)
    }
    if (interaction.customId == 'report') {
      kaki.channels.create({name:`ticket-${interaction.user.id}`}).then(async channel => {
       await channel.setParent('TICKET_CATEGORY')
        await channel.permissionOverwrites.create(interaction.user.id, {ViewChannel: true, SendMessages: true})
        channel.send(`Hey there <@${interaction.user.id}>! A member of the FurDevs Staff Team will tend to you shortly for Moderation Assistance. Please lay out the details of your member report and the evidences for validating the claim while we take a gander about this. Thank you for reaching out and helping us keep FurDevs safe for everyone!\n\n> **Subject:** Reporting a user (Member Report)`)
        interaction.update({ content: `You have selected **Member Report**! Please take a look at your ticket back at FurDevs. Thank you! ( <#${channel.id}> )`, embeds: [], components: [] })
      })
      return
    }
    if (interaction.customId == 'instructorApp') {
      kaki.channels.create({name:`ticket-${interaction.user.id}`}).then(async channel => {
       await channel.setParent('TICKET_CATEGORY')
        await channel.permissionOverwrites.create(interaction.user.id, {ViewChannel: true, SendMessages: true})
        channel.send(`Hey there <@${interaction.user.id}>! A member of the FurDevs Staff Team will tend to you shortly for Dev Instructor Application. Thanks!\n\n> **Subject:** Application for the FurDevs Instructor Team`)
        interaction.update({ content: `You have selected **DevInstructor Application**! Please take a look at your ticket back at FurDevs. Thank you! ( <#${channel.id}> )`, embeds: [], components: [] })
      })
      return
    }
    if (interaction.customId == 'custom') {
      const nanio = new ActionRowBuilder()
        .addComponents(
          new TextInputBuilder()
            .setCustomId('customquestion')
            .setLabel('Create Inquiry')
            .setStyle(TextInputStyle.Paragraph)
            .setMinLength(1)
            .setMaxLength(100)
            .setPlaceholder('What is your inquiry about? write it here!')
            .setRequired(true),
        )
      const questionnaire2 = new ModalBuilder()
        .setTitle('ASFDevs - Custom Inquiry')
        .setCustomId('CustomQuery')
        .addComponents([nanio])
      await interaction.showModal(questionnaire2)
    }

    if (interaction.customId == 'appeal') {
      const button = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setURL('https://tripetto.app/run/JQLIZESAA9')
            .setLabel('Appeal here!')
        )
      interaction.update({ content: "You have chosen **Server Appeal**! To head to the FurDevs Appeal System, please press the button below. Thank you!", embeds: [], components: [button] })
    }
    if (interaction.customId == 'cancelsupport') return interaction.update({ content: 'Alright, I have cancelled your Inquiry!', embeds: [], components: [] })
  }
}