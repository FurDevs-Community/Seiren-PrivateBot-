const { EmbedBuilder } = require('discord.js')

module.exports = {
  name: 'supportmodal',
  async execute(interaction) {

    var kaki = interaction.client.guilds.resolve('731520035717251142')

    if (interaction.customId == 'CustomQuery') {
      let query = await interaction.fields.getTextInputValue('customquestion')
      kaki.channels.create({ name: `ticket-${interaction.user.id}` }).then(async channel => {
        await channel.setParent('TICKET_CATEGORY')
        await channel.permissionOverwrites.create(interaction.user.id, { ViewChannel: true, SendMessages: true })
        channel.send(`Hey there <@${interaction.user.id}>! A member of the FurDevs Staff Team will tend to you shortly. Thank you!\n\n> **Subject:** ${query}`)
        interaction.update({ content: `You have selected **Custom Inquiry**! Please take a look at your ticket back at FurDevs. Thank you! ( <#${channel.id}> )`, embeds: [], components: [] })
      })
      return
    }
    if (interaction.customId == 'PartnerRequest') {
      let ina1 = await interaction.fields.getTextInputValue('in01')
      let ina2 = await interaction.fields.getTextInputValue('in02')
      let ina3 = await interaction.fields.getTextInputValue('in03')
      let ina4 = await interaction.fields.getTextInputValue('in04')

      let madamosel = new EmbedBuilder()
        .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL() })
        .setColor('D5CAF6')
        .setTitle("Partner Information")
        .setDescription('This is the details of the partner request.')
        .addFields([
          { name: 'Server Name:', value: `answer: ${ina1}` },
          { name: 'Server Invite:', value: `answer: ${ina2}` },
          { name: 'Server Description:', value: `answer: ${ina3}` },
          { name: 'Reason for Partnering:', value: `answer: ${ina4}` },
        ])
        .setTimestamp()
        .setFooter({ text: "ASFDevs - Partner Info", iconURL: interaction.client.user.avatarURL() })

      kaki.channels.create({ name: `ticket-${interaction.user.id}` }).then(async channel => {
        await channel.setParent('TICKET_CATEGORY')
        await channel.permissionOverwrites.create(interaction.user.id, { ViewChannel: true, SendMessages: true })
        channel.send({ content: `Hey there <@${interaction.user.id}>! Please wait for an assigned staff member to review your request for partnership. Thank you!\n\n> **Subject:** Partnership Request`, embeds: [madamosel] })
        interaction.update({ content: `You have selected **Partnership Request/Inquiries**! Please take a look at your ticket back at FurDevs. Thank you! ( <#${channel.id}> )`, embeds: [], components: [] })
      })
      return
    }
    if (interaction.customId == 'AffiliateRequest') {
      let ina1 = await interaction.fields.getTextInputValue('in01')
      let ina2 = await interaction.fields.getTextInputValue('in02')
      let ina3 = await interaction.fields.getTextInputValue('in03')
      let ina4 = await interaction.fields.getTextInputValue('in04')
      let ina5 = await interaction.fields.getTextInputValue('in05')

      let madamosel = new EmbedBuilder()
        .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL() })
        .setColor('D5CAF6')
        .setTitle("Affiliate Details")
        .setDescription('This is the details of the affiliate request.')
        .addFields([
          { name: 'Server Name:', value: `answer: ${ina1}` },
          { name: 'Server Invite:', value: `answer: ${ina2}` },
          { name: 'Member Count:', value: `answer: ${ina3}` },
          { name: 'About the Server:', value: `answer: ${ina4}` },
          { name: 'Reason for Affiliation:', value: `answer: ${ina5}` },
        ])
        .setTimestamp()
        .setFooter({ text: "ASFDevs - Affiliate Info", iconURL: interaction.client.user.avatarURL() })

      kaki.channels.create({ name: `ticket-${interaction.user.id}` }).then(async channel => {
        await channel.setParent('TICKET_CATEGORY')
        await channel.permissionOverwrites.create(interaction.user.id, { ViewChannel: true, SendMessages: true })
        channel.send({ content: `Hey there <@${interaction.user.id}>! Please wait for an assigned staff member to review your request for affiliation. Thank you!\n\n> **Subject:** Affiliate Request`, embeds: [madamosel] })
        interaction.update({ content: `You have selected **Affiliate Request/Inquiries**! Please take a look at your ticket back at FurDevs. Thank you! ( <#${channel.id}> )`, embeds: [], components: [] })
      })
      return
    }
  }
}
