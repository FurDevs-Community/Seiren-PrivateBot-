const { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js')

module.exports = {
  name: 'firststep',
  async execute(interaction) {

    console.log(interaction)

    const int01 = new ActionRowBuilder()
      .addComponents(
        new TextInputBuilder()
          .setCustomId('pu01')
          .setLabel('Experience in Moderation')
          .setStyle(TextInputStyle.Paragraph)
          .setMinLength(1)
          .setMaxLength(500)
          .setPlaceholder('Do you have experience? Please detail!')
          .setRequired(true),
      )

    const int02 = new ActionRowBuilder()
      .addComponents(
        new TextInputBuilder()
          .setCustomId('pu02')
          .setLabel('Do you have any mental health concerns?')
          .setStyle(TextInputStyle.Paragraph)
          .setMinLength(1)
          .setMaxLength(500)
          .setPlaceholder('Type N/A if you wish not to disclose/do not have.')
          .setRequired(true),
      )

    const int03 = new ActionRowBuilder()
      .addComponents(
        new TextInputBuilder()
          .setCustomId('pu03')
          .setLabel('How long have you been in FurDevs?')
          .setStyle(TextInputStyle.Paragraph)
          .setMinLength(1)
          .setMaxLength(500)
          .setPlaceholder('Tell us your experience in the server!')
          .setRequired(true),
      )

    const int04 = new ActionRowBuilder()
      .addComponents(
        new TextInputBuilder()
          .setCustomId('pu04')
          .setLabel('Are you able to speak in English?')
          .setStyle(TextInputStyle.Short)
          .setMinLength(2)
          .setMaxLength(3)
          .setPlaceholder('YES/NO')
          .setRequired(true),
      )
    const int05 = new ActionRowBuilder()
      .addComponents(
        new TextInputBuilder()
          .setCustomId('pu05')
          .setLabel('Do you need additional Training?')
          .setStyle(TextInputStyle.Short)
          .setMinLength(2)
          .setMaxLength(3)
          .setPlaceholder('YES/NO')
          .setRequired(true)
      )

    const questionnaire = new ModalBuilder()
      .setTitle('FDevSAE - Interview')
      .setCustomId('staffapp02')
      .addComponents([int01,
        int02,
        int03,
        int04,
        int05])
    await interaction.showModal(questionnaire)
  },
};
