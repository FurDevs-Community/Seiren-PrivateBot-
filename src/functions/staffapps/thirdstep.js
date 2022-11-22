const { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js')

module.exports = {
  name: 'firststep',
  async execute(interaction) {

    console.log(interaction)

    const ana01 = new ActionRowBuilder()
      .addComponents(
        new TextInputBuilder()
          .setCustomId('an01')
          .setLabel('Case 01: Raiding')
          .setStyle(TextInputStyle.Paragraph)
          .setMinLength(50)
          .setMaxLength(500)
          .setPlaceholder('A person entered the server to raid.')
          .setRequired(true),
      )

    const ana02 = new ActionRowBuilder()
      .addComponents(
        new TextInputBuilder()
          .setCustomId('an02')
          .setLabel('Case 02: Inappropriate content')
          .setStyle(TextInputStyle.Paragraph)
          .setMinLength(50)
          .setMaxLength(500)
          .setPlaceholder('Someone entered to post inappropriate content.')
          .setRequired(true),
      )

    const ana03 = new ActionRowBuilder()
      .addComponents(
        new TextInputBuilder()
          .setCustomId('an03')
          .setLabel('Case 03: Delinquent Users')
          .setStyle(TextInputStyle.Paragraph)
          .setMinLength(50)
          .setMaxLength(500)
          .setPlaceholder('Someone is a constant rule breaker.')
          .setRequired(true),
      )

    const ana04 = new ActionRowBuilder()
      .addComponents(
        new TextInputBuilder()
          .setCustomId('an04')
          .setLabel('Case 04: Staff Abuse of Power')
          .setStyle(TextInputStyle.Paragraph)
          .setMinLength(50)
          .setMaxLength(500)
          .setPlaceholder('A fellow colleague is abusing their power.')
          .setRequired(true),
      )
    const ana05 = new ActionRowBuilder()
      .addComponents(
        new TextInputBuilder()
          .setCustomId('an05')
          .setLabel('Case 05: Channel Misuse')
          .setStyle(TextInputStyle.Paragraph)
          .setMinLength(50)
          .setMaxLength(500)
          .setPlaceholder('Someone is posting memes in the Main Chat.')
          .setRequired(true)
      )

    const questionnaire = new ModalBuilder()
      .setTitle('FDevSAE - Situation Analysis')
      .setCustomId('staffapp03')
      .addComponents([ana01,
        ana02,
        ana03,
        ana04,
        ana05])
    await interaction.showModal(questionnaire)
  },
};
