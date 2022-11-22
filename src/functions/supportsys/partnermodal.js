const { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js')

module.exports = {
  name: 'partnermodal',
  async execute(interaction) {

    console.log(interaction)

    const in01 = new ActionRowBuilder()
      .addComponents(
        new TextInputBuilder()
          .setCustomId('in01')
          .setLabel('Server Name')
          .setStyle(TextInputStyle.Short)
          .setMinLength(1)
          .setMaxLength(100)
          .setPlaceholder('Simple. And easily recognized.')
          .setRequired(true),
      )
    const in02 = new ActionRowBuilder()
      .addComponents(
        new TextInputBuilder()
          .setCustomId('in02')
          .setLabel('Server Invite')
          .setStyle(TextInputStyle.Short)
          .setMinLength(1)
          .setMaxLength(50)
          .setPlaceholder('https://discord.gg/<code>')//not a real like reeee just a template
          .setRequired(true),
      )

    const in03 = new ActionRowBuilder()
      .addComponents(
        new TextInputBuilder()
          .setCustomId('in03')
          .setLabel('About the Server')
          .setStyle(TextInputStyle.Paragraph)
          .setMinLength(1)
          .setMaxLength(500)
          .setPlaceholder('Tell us something about the server!')
          .setRequired(true)
      )

    const in04 = new ActionRowBuilder()
      .addComponents(
        new TextInputBuilder()
          .setCustomId('in04')
          .setLabel('Reason for Partnership')
          .setStyle(TextInputStyle.Paragraph)
          .setMinLength(1)
          .setMaxLength(500)
          .setPlaceholder('What brought you to partner with us?')
          .setRequired(true)
      )

    const questionnaire = new ModalBuilder()
      .setTitle('ASFDevs - Partner Info')
      .setCustomId('PartnerRequest')
      .addComponents([in01,
        in02,
        in03,
        in04])
    await interaction.showModal(questionnaire)
  },
};
