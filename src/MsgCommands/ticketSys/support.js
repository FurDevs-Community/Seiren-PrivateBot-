const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle } = require('discord.js')

module.exports = {
  name: "support",
  aliases: ['report, ticket-open'],
  async execute(message) {

    if (message.guild.channels.cache.find(c => c.name === `ticket-${message.author.id}`)) {
      return message.reply('you already have a ticket, please handle your current ticket first before opening another request!!!');
    }

    let types = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setStyle(ButtonStyle.Primary)
          .setCustomId('partnership')
          .setLabel('Partnership Request/inquiry'),

        new ButtonBuilder()
          .setStyle(ButtonStyle.Primary)
          .setCustomId('affiliate')
          .setLabel('Affiliate Request/inquiry'),

        new ButtonBuilder()
          .setStyle(ButtonStyle.Primary)
          .setCustomId('report')
          .setLabel('Report a member (member Report)'),

        new ButtonBuilder()
          .setStyle(ButtonStyle.Primary)
          .setCustomId('instructorApp')
          .setLabel('Application for DevInstructor (Coming soon!)')
          .setDisabled(true),

        new ButtonBuilder()
          .setStyle(ButtonStyle.Primary)
          .setCustomId('appeal')
          .setLabel('Server Case Appeals'),
      )

    const type2 = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setStyle(ButtonStyle.Primary)
          .setCustomId('custom')
          .setLabel('Other Inquiries'),

        new ButtonBuilder()
          .setStyle(ButtonStyle.Danger)
          .setCustomId('cancelsupport')
          .setLabel('Close Support Prompt')
      )

    const embed = new EmbedBuilder()
      .setAuthor({ name: message.client.user.username, iconURL: message.client.user.avatarURL() })
      .setColor('#e0b0ff')
      .setTitle("ASFDevs - Support Menu")
      .setDescription('Welcome to the FurDevs Assistance System! Please select a category that aligns with your Inquiry. Depending on the type of support needed, you may be prompted to additional questions. Please make sure your discord app is up-to-date to access modals!')
      .setTimestamp()
      .setFooter({ text: 'ASFDevs - Welcome', iconURL: message.client.user.avatarURL() })

    message.author.send({ content: "Please select the category of your inquiry.", embeds: [embed], components: [types, type2] }).catch(() => {
      message.reply("Erm, your DMs are closed. Please check your privacy settings, then try again!")
      return
    })
    message.reply("Sliding into your DMs for the matter!")
  }
}