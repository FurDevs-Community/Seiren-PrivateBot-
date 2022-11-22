const { SlashCommandBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('support')
    .setDescription('Access the FurDevs Assistance System (ASFDevs).'),
  async execute(interaction) {

    if (interaction.guild.channels.cache.find(channel => channel.name === `ticket-${interaction.user.id}`)) {
      return interaction.reply({ content: 'you already have a ticket, please handle your current ticket first before opening another request!!!', ephemeral: true });
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
          .setLabel('Affiliate Request/Inquiry'),

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
      .setAuthor({name:interaction.client.user.username, iconURL:interaction.client.user.avatarURL()})
      .setColor('#e0b0ff')
      .setTitle("ASFDevs - Support Menu")
      .setDescription('Welcome to the FurDevs Assistance System! Please select a category that aligns with your Inquiry. Depending on the type of support needed, you may be prompted to additional questions. Please make sure your discord app is up-to-date to access modals!')
      .setTimestamp()
      .setFooter({ text: 'ASFDevs - Welcome', iconURL: interaction.client.user.avatarURL() })
    await interaction.reply({ content: "Please select the category of your inquiry.", embeds: [embed], components: [types, type2], ephemeral: true })
  },
};