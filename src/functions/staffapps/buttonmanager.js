const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js')
const app01 = require('./firststep.js')
const app02 = require('./secondstep.js')
const app03 = require('./thirdstep.js')
const app04 = require('./essay.js')
const wraptime = require('./finisher.js')
const Database = require('@replit/database')
const db = new Database()

module.exports = {
  name: 'buttonmanager',
  async execute(interaction) {

    let blacklist = ['BLACKLISTED_USERS_HERE']
    let blacklistcheck = blacklist.includes(interaction.user.id)
    if(blacklistcheck) return interaction.reply({content: "I'm sorry! You appear to be ineligible for FDevSAE from our records. To appeal, you may DM the incumbent owner ***only if*** they are available. Thank you.", ephemeral: true})

    const wilkomen = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('cancelap')
          .setStyle(ButtonStyle.Danger)
          .setLabel('Cancel Applications'),

        new ButtonBuilder()
          .setCustomId('beginap01')
          .setStyle(ButtonStyle.Primary)
          .setLabel('Part 01 - Primary information'),

        new ButtonBuilder()
          .setCustomId('beginap02')
          .setStyle(ButtonStyle.Primary)
          .setLabel('Part 02 - Interview'),

        new ButtonBuilder()
          .setCustomId('beginap03')
          .setStyle(ButtonStyle.Primary)
          .setLabel('Part 03 - Situation Analysis'),

        new ButtonBuilder()
          .setCustomId('beginap04')
          .setStyle(ButtonStyle.Primary)
          .setLabel('Part 04 - Essay'),
      )
    const wilkomen02 = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('submitap')
          .setStyle(ButtonStyle.Success)
          .setLabel("Submit Application")
      )
    const finality = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('iquit')
          .setStyle(ButtonStyle.Danger)
          .setLabel('Confirm cancellation'),

        new ButtonBuilder()
          .setCustomId('lesgoo')
          .setStyle(ButtonStyle.Success)
          .setLabel("Continue with Application")
      )

    const letsfinalize = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('holdon')
          .setStyle(ButtonStyle.Danger)
          .setLabel('Revise App!'),

        new ButtonBuilder()
          .setCustomId('submitnow')
          .setStyle(ButtonStyle.Success)
          .setLabel('Submit Now!')
      )

    const embed = new EmbedBuilder()
      .setAuthor({name:interaction.client.user.username, iconURL:interaction.client.user.avatarURL()})
      .setColor('#e0b0ff')
      .setTitle("FDevSAE - Application Panel")
      .setDescription('Welcome to FDevSAE Applications Panel! Please read carefully for the instructions.')
      .addFields([
        {name:"Instructions", value: "Each of the buttons in blue have a separate modal for you to answer. Please press a button to answer the forms. To cancel, press the red button, and to submit, press the green button."},
        {name:'"I want to edit my answer!"', value:"To edit your answer, please run the button again, editing the answers on your modal, then submit so that the bot will overwrite your previous attempt."},
        {name:'**NOTE: Please answer directly.**', value:"Make sure your answers are straight to the point. Submitting false information can be grounds for disqualification. Once submitted, revisions are no longer permitted. **Please also have a copy of your answers in case of issues during the process!**"},
      ])
      .setTimestamp()
      .setFooter({ text: 'FDevSAE - Application Panel', iconURL: interaction.client.user.avatarURL() })

    if (interaction.customId == 'beginapps') {
      interaction.update({ content: "In-server System Activated!! Please check the embeds for the main instructions and how to use me!", embeds: [embed], components: [wilkomen, wilkomen02] })
    }

    if (interaction.customId == 'beginap01') {
      await app01.execute(interaction)
    }

    if (interaction.customId == 'beginap02') {
      await app02.execute(interaction)
    }

    if (interaction.customId == 'beginap03') {
      await app03.execute(interaction)
    }

    if (interaction.customId == 'beginap04') {
      await app04.execute(interaction)
    }

    if (interaction.customId == 'cancelap') {
      await interaction.update({ content: "You have chosen to cancel your application. Do you wish to cancel the application?", components: [finality] })
    }

    if (interaction.customId == 'iquit') {
      let yeet01 = 'app01-' + interaction.user.id
      let yeet02 = 'app02-' + interaction.user.id
      let yeet03 = 'app03-' + interaction.user.id
      let yeet04 = 'app04-' + interaction.user.id
      await db.delete(yeet01)
      await db.delete(yeet02)
      await db.delete(yeet03)
      await db.delete(yeet04)
      await interaction.update({ content: "Aww, it's sad to see you stop. Don't worry! Just give me a holler if you want to try again.", embeds: [], components: [] })
    }

    if (interaction.customId == "lesgoo") {
      await interaction.update({ content: "Alright, let's continue where we left off then!", embeds: [embed], components: [wilkomen, wilkomen02] })
    }

    if (interaction.customId == 'submitap') {
      await interaction.update({ content: "Make sure to review your answers upon submission. Do you wish to submit your application?", embeds: [embed], components: [letsfinalize] })
    }

    if (interaction.customId == 'holdon') {
      await interaction.update({ content: "Alright, let's continue where we left off then!", embeds: [embed], components: [wilkomen, wilkomen02] })
    }

    if (interaction.customId == 'submitnow') {
      let app01id = 'app01-' + interaction.user.id
      let app02id = 'app02-' + interaction.user.id
      let app03id = 'app03-' + interaction.user.id
      let app04id = 'app04-' + interaction.user.id

      let check01 = await db.get(app01id)
      if (!check01) return interaction.update({ content: "Your Step 01 is not saved yet! Please finish that part first before submission!", embeds: [embed], components: [wilkomen, wilkomen02] })

      let check02 = await db.get(app02id)
      if (!check02) return interaction.reply({ content: "Your Step 02 is not saved yet! Please finish that part first before submission!", embeds: [embed], components: [wilkomen, wilkomen02] })

      let check03 = await db.get(app03id)
      if (!check03) return interaction.reply({ content: "Your Step 03 is not saved yet! Please finish that part first before submission!", embeds: [embed], components: [wilkomen, wilkomen02] })

      let check04 = await db.get(app04id)
      if (!check04) return interaction.reply({ content: "Your Step 04 is not saved yet! Please finish that part first before submission!", embeds: [embed], components: [wilkomen, wilkomen02] })
      else
        await wraptime.execute(interaction)
    }
  }
}