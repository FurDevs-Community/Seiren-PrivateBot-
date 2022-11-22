const { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js')

module.exports = {
  name: 'essay',
  async execute(interaction) {

    const firstQ = new ActionRowBuilder()
      .addComponents(
        new TextInputBuilder()
          .setCustomId('essay')
          .setLabel('What can you offer for FurDevs?')
          .setStyle(TextInputStyle.Paragraph)
          .setMinLength(1)
          .setMaxLength(500)
          .setPlaceholder('What can I offer, and what does it mean to me?')
          .setRequired(true),
      )

    const secondQ = new ActionRowBuilder()
      .addComponents(
        new TextInputBuilder()
          .setCustomId('optionalinfo')
          .setLabel('Why you want to be staff')
          .setStyle(TextInputStyle.Paragraph)
          .setMinLength(1)
          .setMaxLength(500)
          .setPlaceholder('What got you to apply for FurDevs Staff?')
          .setRequired(true),
      )

    const questionnaire = new ModalBuilder()
      .setTitle('FDevSAE - Essay')
      .setCustomId('staffapp04')
      .addComponents([firstQ,
        secondQ])
    await interaction.showModal(questionnaire)
  },
};