const { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js')
const Database = require("@replit/database")
const db = new Database()

module.exports = {
  name:'verifymodal',
  async execute(interaction){
    let checkId = 'dbx' + interaction.user.id
    let check = await db.get(checkId)
    if (check) return interaction.reply({ content: "You have already submitted an application! Please do not access the system while we process the application.", ephemeral: true })

    const firstQ = new ActionRowBuilder()
      .addComponents(
        new TextInputBuilder()
          .setCustomId('Q1')
          .setLabel('Where did you find us?')
          .setStyle(TextInputStyle.Short)
          .setMinLength(1)
          .setMaxLength(20)
          .setRequired(true),
      )
    const secondQ = new ActionRowBuilder()
      .addComponents(
        new TextInputBuilder()
          .setCustomId('Q2')
          .setLabel('Are you 13 and up?')
          .setStyle(TextInputStyle.Short)
          .setMinLength(2)
          .setMaxLength(3)
          .setPlaceholder('YES/NO. Please be honest.')
          .setRequired(true),
      )
    const thirdQ = new ActionRowBuilder()
      .addComponents(
        new TextInputBuilder()
          .setCustomId('Q3')
          .setLabel('What brings you to join us?')
          .setStyle(TextInputStyle.Paragraph)
          .setMinLength(1)
          .setMaxLength(500)
          .setRequired(true),
      )
    const fourthQ = new ActionRowBuilder()
      .addComponents(
        new TextInputBuilder()
          .setCustomId('Q4')
          .setLabel('2 rules that we enforce')
          .setStyle(TextInputStyle.Paragraph)
          .setMinLength(1)
          .setMaxLength(500)
          .setPlaceholder('In your own words, give 2 rules that we enforce.')
          .setRequired(true),
      )

    const questionnaire = new ModalBuilder()
      .setTitle('Verification Form - FurDevs')
      .setCustomId('appfirstset')
      .addComponents([firstQ,
        secondQ,
        thirdQ,
        fourthQ])
    await interaction.showModal(questionnaire)
    await interaction.followUp({ content: "Verification process started via Modal! If you can't see the modal, try restarting the discord app or update it to the latest version. Thanks!", ephemeral: true })
  }
}