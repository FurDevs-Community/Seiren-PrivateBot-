const { EmbedBuilder, TextInputBuilder, ModalBuilder, ActionRowBuilder, PermissionsBitField, ChannelType, TextInputStyle } = require('discord.js')
const imgur = require('../canvacreate.js')
const Database = require("@replit/database")
const db = new Database()

module.exports = {
  name: 'verification',
  async execute(interaction) {

    let mahdude = await interaction.customId.split('-')[0]
    let dbID = await interaction.customId.split('-')[1]

    try {
      db.get(dbID)
    } catch (err) {
      interaction.reply({ content: "I have an error with the database!\n\n" + `error: ${err}` })
    }

    let gagu = await db.get(`${dbID}`)

    if (gagu) {
      let hulda = interaction.channel
      let records = await JSON.parse(gagu.responses)


      const welcomer = interaction.client.channels.cache.find(c => c.id === "GENERALCHAT")
      const tubaba = interaction.client.channels.cache.find(c => c.id == 'APP_LOG')

      let okayme = new EmbedBuilder()
        .setAuthor({name:gagu.name, iconURL:gagu.revimgsearch})
        .setTitle('Click here to reverse image search!')
        .setURL(`https://www.google.com/searchbyimage?&image_url=${gagu.revimgsearch}`)
        .setColor('#e0b0ff')
        .setThumbnail(`${gagu.revimgsearch}`)
        .addFields([
          {name:"Applicant Name", value:gagu.name},
          {name:"Applicant ID", value:gagu.id},
          {name:"Where did I come from?", value:"Answer: " + records[0]},
          {name:"Am I 13 and up?", value:"Answer: " + records[1]},
          {name:"Why am I here?", value:"Answer: " + records[2]},
          {name:"2 rules that FDevs is enforcing", value:"Answer: " + records[3]},
          {name:"Date Submitted", value:gagu.date}
        ])
        .setFooter({text:`date handled: ${new Date()}`})

      let hithere = await interaction.channel.messages.fetch(`${gagu.ogmessage}`)

      if (mahdude == 'approve') {

        try {
          await interaction.guild.members.fetch(`${gagu.id}`)
        } catch (err) {
          await hulda.send({ content: "I had an issue with fetching the member." })
          await interaction.update({ content: "User is not in guild. Action Suspended.", embeds:[], components: [] })
          console.log(err)
          await db.delete(`${dbID}`)
          return
        }
        let humaygahd = await interaction.guild.members.cache.get(gagu.id)
        if (humaygahd) {
          console.log(humaygahd)
        }

        try {
          await humaygahd.roles.remove('UNVERIFIED')
        } catch (err) {
          await hithere.edit({ content: "This person isn't in the guild!", embeds:[], components:[] });
          await hulda.send("Alert! user is not in the guild. Action suspended!")
          await db.delete(`${dbID}`)
          return
        }
        await humaygahd.roles.add('VERIFIED')
        await hithere.delete()
        await humaygahd.send({ content: `Your application to ${interaction.guild.name} has been accepted! We hope you enjoy your stay in our server!` }).catch(() => interaction.channel.send("User is unaccessible! Resolving promise and proceeding with available action."))
        let atta = await imgur.execute(humaygahd)
        const welcomeEmbed = new EmbedBuilder()
          .setAuthor({name:interaction.client.user.username, iconURL:interaction.client.user.avatarURL()})
          .setColor('#e0b0ff')
          .setTitle("FurDevs - Welcome!")
          .setThumbnail(gagu.revimgsearch)
          .setDescription("The roles are in <#ROLEMENU>.\n\nIf you have any questions or concerns about the server, You can approach any available staff or access ASFDevs using `/support` or `k.support`.\n\nRemember to abide to our in-server guidelines and we hope you enjoy your time at this hour!")
          .setImage(`attachment://${atta.name}`)
          .setTimestamp()
          .setFooter({text:"FurDevs - Welcome!", iconURL:interaction.client.user.avatarURL()})
        welcomer.send({ content: `Welcome <@${gagu.id}> to FurDevs! <@&WELCOMERS> Please welcome our new member to the server!`, embeds: [welcomeEmbed], files: [atta] })
        await tubaba.send({ content: `User approved by ${interaction.user.username}#${interaction.user.discriminator}`, embeds: [okayme] })
        await db.delete(`${dbID}`)
      }

      if (mahdude == 'deny') {
        const aeiou = new ActionRowBuilder()
          .addComponents(
            new TextInputBuilder()
              .setCustomId('reasonz')
              .setLabel('Please insert reason for Rejection.')
              .setStyle(TextInputStyle.Paragraph)
              .setMinLength(1)
              .setMaxLength(2000)
              .setPlaceholder('I do not think "N/A" is a good reason, bud.')
              .setRequired(true),
          )
        const questionnaire = new ModalBuilder()
          .setTitle('Rejection Reason')
          .setCustomId('denyem')
          .addComponents([aeiou])
        await interaction.showModal(questionnaire)
        let hmm = 'todeny-' + interaction.user.id
        let kakagura = {}
        kakagura['usertodeny'] = `${dbID}`
        await db.set(hmm, kakagura)
      }

      if (mahdude == 'question') {

        try {
          await interaction.guild.members.fetch(`${gagu.id}`)
        } catch (err) {
          await hulda.send({ content: "I had an issue with fetching the member." })
          await interaction.update({ content: "User is not in guild. Action Suspended.", embeds:[], components: [] })
          console.log(err)
          await db.delete(`${dbID}`)
          return
        }
        let humaygahd = await interaction.guild.members.cache.get(gagu.id)
        if (humaygahd) {
          console.log(humaygahd)
        }

        await hithere.delete()
        await humaygahd.send({ content: "You have been summoned for further questioning. Please check the server!" }).catch(() => hulda.send("User is unaccessible or is not in Guild! Resolving promise and proceeding with available action."))
        try {
          interaction.guild.channels.create({
            name:`qna-${gagu.id}`,
            type: ChannelType.GuildText,
          }).then(async channel => {
            await channel.setParent('VERIFYCATEGORY')
            await channel.permissionOverwrites.create(gagu.id, {
              ViewChannel: true,
              SendMessages: true,
            })
            channel.send({ content: `Good day <@${gagu.id}> ! Please answer the questions that will be posed by staff shortly.` })
            await tubaba.send({ content: `User being interrogated by ${interaction.user.username}#${interaction.user.discriminator}`, embeds: [okayme] })
            await db.delete(`${dbID}`)
          })
        } catch (err) {
          console.log(err)
          await hithere.edit({ content: "This person isn't in the guild!", embeds:[], components: [] })
          await hulda.send("Error! This person is not in the guild. Action suspended!")
          await db.delete(`${dbID}`)
          console.log(err)
        }
      }
      if (mahdude == 'kicku') {

        const aaaaaaaa = new ActionRowBuilder()
          .addComponents(
            new TextInputBuilder()
              .setCustomId('reasonx')
              .setLabel('Please insert reason for Kick.')
              .setStyle(TextInputStyle.Paragraph)
              .setMinLength(1)
              .setMaxLength(2000)
              .setPlaceholder('I do not think "N/A" is a good reason, bud.')
              .setRequired(true),
          )

        const questionnaire = new ModalBuilder()
          .setTitle('Kick Reason')
          .setCustomId('kickem')
          .addComponents([aaaaaaaa])
        await interaction.showModal(questionnaire)
        let hmm = 'tokic-' + interaction.user.id
        let kakagura = {}
        kakagura['usertokick'] = `${dbID}`
        await db.set(hmm, kakagura)
      }
      if (mahdude == 'yeet') {

        const bbbbbb = new ActionRowBuilder()
          .addComponents(
            new TextInputBuilder()
              .setCustomId('reasony')
              .setLabel('Please insert reason for Ban.')
              .setStyle(TextInputStyle.Paragraph)
              .setMinLength(1)
              .setMaxLength(2000)
              .setPlaceholder('I do not think "N/A" is a good reason, bud.')
              .setRequired(true),
          )
        const questionnaire = new ModalBuilder()
          .setTitle('Ban Reason')
          .setCustomId('banem')
          .addComponents([bbbbbb])
        await interaction.showModal(questionnaire)
        let hmm = 'toba-' + interaction.user.id
        let kakagura = {}
        kakagura['usertoban'] = `${dbID}`
        await db.set(hmm, kakagura)
      }
    }
  }
}