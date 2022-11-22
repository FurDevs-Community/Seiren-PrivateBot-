const { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js')

module.exports = {
  name: 'nextmodal',
  async execute(interaction) {

    console.log(interaction)

    const in01 = new ActionRowBuilder()
      .addComponents(
        new TextInputBuilder()
          .setCustomId('in01')
          .setLabel('Nickname to use')
          .setStyle(TextInputStyle.Short)
          .setMinLength(1)
          .setMaxLength(20)
          .setPlaceholder('Simple. And easily recognized.')
          .setRequired(true),
      )
    const in02 = new ActionRowBuilder()
      .addComponents(
        new TextInputBuilder()
          .setCustomId('in02')
          .setLabel('Position you wanted')
          .setStyle(TextInputStyle.Short)
          .setMinLength(1)
          .setMaxLength(5)
          .setPlaceholder('this system only supports Mod/Admin.')
          .setRequired(true),
      )
    const in03 = new ActionRowBuilder()
      .addComponents(
        new TextInputBuilder()
          .setCustomId('in03')
          .setLabel('Your Bio')
          .setStyle(TextInputStyle.Paragraph)
          .setMinLength(1)
          .setMaxLength(100)
          .setPlaceholder('Tell us about yourself!')
          .setRequired(true)
      )

    const questionnaire = new ModalBuilder()
      .setTitle('FDevSAE - Primary Info')
      .setCustomId('staffapp01')
      .addComponents([in01,
        in02,
        in03])
    await interaction.showModal(questionnaire)
  },
};
