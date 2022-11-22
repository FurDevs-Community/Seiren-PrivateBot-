const Database = require('@replit/database')
const db = new Database()
const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle } = require('discord.js')

module.exports = {
  name: 'reasonyeet',
  async execute(interaction) {

    var Logging = interaction.client.channels.cache.find(c => c.id === "STAFF_LOG")
    const tubaba = interaction.client.channels.cache.find(c => c.id == 'APP_LOGS')
    let hulda = interaction.channel

    var appeal = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setStyle(ButtonStyle.Link)
          .setURL('https://tripetto.app/run/JQLIZESAA9')
          .setLabel('Appeal Here!')
      )

    if (interaction.customId == 'kickem') {
      console.log('active.')
      let namekick = 'tokic-' + interaction.user.id
      console.log(namekick)
      try {
        await db.get(namekick)
      } catch (err) {
        await interaction.reply({ content: `Ack, an error!\n\n${err}` })
        return
      }

      let despacito = await db.get(namekick)

      if (despacito) {
        console.log(despacito)
        let dbID = despacito.usertokick

        let nocnoc = await db.get(`${dbID}`)
        if (nocnoc) {
          console.log(nocnoc)
          let user = nocnoc.id
          console.log(nocnoc.id)

          let hh = await JSON.parse(nocnoc.responses)

          let okayme = new EmbedBuilder()
            .setAuthor({name:nocnoc.name, iconURL:nocnoc.revimgsearch})
            .setTitle('Click here to reverse image search!')
            .setURL(`https://www.google.com/searchbyimage?&image_url=${nocnoc.revimgsearch}`)
            .setColor('#e0b0ff')
            .setThumbnail(`${nocnoc.revimgsearch}`)
            .addFields([
              {name:"Applicant Name", value:"Answer: " + nocnoc.name},
              {name:"Applicant ID", value:"Answer: " + nocnoc.id},
              {name:"Where did I come from?", value:"Answer: " + hh[0]},
              {name:"am I 13 and up?", value:"Answer: " + hh[1]},
              {name:"Why am I here?", value:"Answer: " + hh[2]},
              {name:"2 rules in my own words", value:"Answer: " + hh[3]},
              {name:"Date Submitted", value:nocnoc.date}
            ])
            .setFooter({text:`date handled: ${new Date()}`})

          let mensahekainis = await interaction.channel.messages.fetch(`${nocnoc.ogmessage}`)

          try {
            await interaction.guild.members.fetch(user)
          } catch (err) {
            await hulda.send({ content: "I had an issue with fetching the member." })
            await interaction.update({ content: "User is not in guild. Action Suspended.", embeds:[], components: [] })
            console.log(err)
            await db.delete(`${dbID}`)
          }

          let nociscute = await interaction.guild.members.cache.get(user)

          if (nociscute) {
            console.log(nociscute)
            let mmmyes = await interaction.fields.getTextInputValue('reasonx')
            let kickreason = mmmyes + ' | FurDevs'

            var whoopsie = new EmbedBuilder()
              .setAuthor({name:interaction.client.user.username, iconURL:interaction.client.user.avatarURL()})
              .setColor('#f8ac3a')
              .setTitle('Penalty Notice - FurDevs')
              .setDescription("Your punishment has been updated in FurDevs.")
              .addFields([
                {name: "Punishment type:", value: "Kick"},
                {name: "Reason:", value: mmmyes}
              ])
              .setTimestamp()
              .setFooter({text:'Staff Team - FurDevs', iconURL:interaction.client.user.avatarURL()});

            var Log = new EmbedBuilder()
              .setAuthor({name:interaction.client.user.username, iconURL:interaction.client.user.avatarURL()})
              .setColor('#f8ac3a')
              .setTitle('Report Log - FurDevs')
              .setDescription("An action has been taken by this bot in FurDevs.")
              .addFields([
                {name: "Punishment type:", value: "Kick"},
                {name:"target:", value:`<@${user}> ` + `(UID: ${user})`},
                {name: "Reason:", value: mmmyes},
                {name:"Action made by:", value:`${interaction.user.username}#${interaction.user.discriminator} ` + `(UID: ${interaction.user.id})`},
              ])
              .setTimestamp()
              .setFooter({text:'Staff Team - FurDevs', iconURL:interaction.client.user.avatarURL()});

            await nociscute.send({ embeds: [whoopsie], components: [appeal] }).catch(() => hulda.send("User is unaccessible or is not in Guild! Resolving promise and proceeding with available action."))
            await interaction.reply({ content: "Punishment for the user has been delivered successfully!", ephemeral: true }).catch(() => { console.log() })
            try {
              await nociscute.kick(kickreason)
              await db.delete(`${dbID}`)
              await tubaba.send({ content: `User kicked by ${interaction.user.username}#${interaction.user.discriminator} for "${mmmyes}"`, embeds: [okayme] })
              await Logging.send({ embeds: [Log] })
              await db.delete(`${namekick}`)
              await mensahekainis.delete()
            } catch (err) {
              await mensahekainis.edit({ content: "This person isn't in the guild!", embeds:[], components: [] });
              await hulda.send("Alert! user is not in the guild. Action suspended!")
              console.log(err)
              await db.delete(`${dbID}`)
              await db.delete(`${namekick}`)
              return
            }
          }
        }
      }
    } else
      if (interaction.customId == 'banem') {
        console.log('active.')
        let nameban = 'toba-' + interaction.user.id
        console.log(nameban)
        try {
          await db.get(nameban)
        } catch (err) {
          await interaction.reply({ content: `Ack, an error!\n\n${err}` })
          return
        }

        let despacito = await db.get(nameban)

        if (despacito) {
          console.log(despacito)
          let dbID = despacito.usertoban

          let nocnoc2 = await db.get(`${dbID}`)
          if (nocnoc2) {
            console.log(nocnoc2)
            let user = nocnoc2.id
            console.log(nocnoc2.id)

            let hh2 = await JSON.parse(nocnoc2.responses)

            let okayme2 = new EmbedBuilder()
            .setAuthor({name:nocnoc2.name, iconURL:nocnoc2.revimgsearch})
            .setTitle('Click here to reverse image search!')
            .setURL(`https://www.google.com/searchbyimage?&image_url=${nocnoc2.revimgsearch}`)
            .setColor('#e0b0ff')
            .setThumbnail(`${nocnoc2.revimgsearch}`)
            .addFields([
              {name:"Applicant Name", value:nocnoc2.name},
              {name:"Applicant ID", value:nocnoc2.id},
              {name:"Where did I come from?", value:"Answer: " + hh2[0]},
              {name:"Am I 13 and up?", value:"Answer: " + hh2[1]},
              {name:"Why am I here?", value:"Answer: " + hh2[2]},
              {name:"2 rules in my own words", value:"Answer: " + hh2[3]},
              {name:"Date Submitted", value:nocnoc2.date}
            ])
            .setFooter({text:`date handled: ${new Date()}`})

            let mmmyes2 = await interaction.fields.getTextInputValue('reasony')
            let kickreason2 = mmmyes2 + ' | FurDevs'

            var whoopsie2 = new EmbedBuilder()
              .setAuthor({name:interaction.client.user.username, iconURL:interaction.client.user.avatarURL()})
              .setColor('#be1919')
              .setTitle('Penalty Notice - FurDevs')
              .setDescription("Your punishment has been updated in FurDevs.")
              .addFields([
                {name: "Punishment type:", value: "Ban"},
                {name: "Reason:", value: mmmyes2}
              ])
              .setTimestamp()
              .setFooter({text:'Staff Team - FurDevs', iconURL:interaction.client.user.avatarURL()});

            var Log2 = new EmbedBuilder()
              .setAuthor({name:interaction.client.user.username, iconURL:interaction.client.user.avatarURL()})
              .setColor('#be1919')
              .setTitle('Report Log - FurDevs')
              .setDescription("An action has been taken by this bot in FurDevs.")
              .addFields([
                {name: "Punishment type:", value: "Ban"},
                {name:"target:", value:`<@${nocnoc2.id}> ` + `(UID: ${nocnoc2.id})`},
                {name: "Reason:", value: mmmyes2},
                {name:"Action made by:", value:`${interaction.user.username}#${interaction.user.discriminator} ` + `(UID: ${interaction.user.id})`},
              ])
              .setTimestamp()
              .setFooter({text:'Staff Team - FurDevs', iconURL:interaction.client.user.avatarURL()});


            let mensahekainis2 = await interaction.channel.messages.fetch(`${nocnoc2.ogmessage}`)
            try {
              await interaction.guild.members.fetch(user)
            } catch (err) {
              await interaction.guild.bans.create(`${nocnoc2.id}`, { reason: kickreason2 })
              await tubaba.send({ content: `User Banned by ${interaction.user.username}#${interaction.user.discriminator} for "${mmmyes2}"`, embeds: [okayme2] })
              await mensahekainis2.delete()
              await Logging.send({ embeds: [Log2] })
              await db.delete(`${dbID}`)
              await db.delete(`${nameban}`)
              await interaction.reply({ content: "Punishment for the user has been delivered successfully!", ephemeral: true }).catch(() => { console.log() })
              return;
            }

            let nociscute2 = await interaction.guild.members.cache.get(user)

            if (nociscute2) {
              console.log(nociscute2)
              await nociscute2.send({ embeds: [whoopsie2], components: [appeal] }).catch(() => hulda.send("User is unaccessible or is not in Guild! Resolving promise and proceeding with available action."))
              await interaction.reply({ content: "Punishment for the user has been delivered successfully!", ephemeral: true }).catch(() => { console.log() })
              try {
                await nociscute2.ban({ reason: kickreason2 })
                await db.delete(`${dbID}`)
                await tubaba.send({ content: `User Banned by ${interaction.user.username}#${interaction.user.discriminator} for "${mmmyes2}"`, embeds: [okayme2] })
                await Logging.send({ embeds: [Log2] })
                await db.delete(`${nameban}`)
                await mensahekainis2.delete()
              } catch (err) {
                await mensahekainis2.edit({ content: "This person isn't in the guild!", embeds:[], components: [] });
                await hulda.send("Alert! user is not in the guild. Action suspended!")
                console.log(err)
                await db.delete(`${dbID}`)
                await db.delete(`${nameban}`)
                return
              }
            }
          }
        }
      } else
        if (interaction.customId == 'denyem') {
          console.log('active.')
          let namedeny = 'todeny-' + interaction.user.id
          console.log(namedeny)
          try {
            await db.get(namedeny)
          } catch (err) {
            await interaction.reply({ content: `Ack, an error!\n\n${err}` })
            return
          }

          let despacito = await db.get(namedeny)

          if (despacito) {
            console.log(despacito)
            let dbID = despacito.usertodeny

            let nocnoc3 = await db.get(`${dbID}`)
            if (nocnoc3) {
              console.log(nocnoc3)
              let user = nocnoc3.id
              console.log(nocnoc3.id)

              let hh3 = await JSON.parse(nocnoc3.responses)

              let okayme3 = new EmbedBuilder()
                .setAuthor({name:nocnoc3.name, iconURL:nocnoc3.revimgsearch})
            .setTitle('Click here to reverse image search!')
            .setURL(`https://www.google.com/searchbyimage?&image_url=${nocnoc3.revimgsearch}`)
            .setColor('#e0b0ff')
            .setThumbnail(`${nocnoc3.revimgsearch}`)
            .addFields([
              {name:"Applicant Name", value:nocnoc3.name},
              {name:"Applicant ID", value:nocnoc3.id},
              {name:"Where did I come from?", value:"Answer: " + hh3[0]},
              {name:"Am I 13 and up?", value:"Answer: " + hh3[1]},
              {name:"Why am I here?", value:"Answer: " + hh3[2]},
              {name:"2 rules in my own words", value:"Answer: " + hh3[3]},
              {name:"Date Submitted", value:nocnoc3.date}
            ])
            .setFooter({text:`date handled: ${new Date()}`})

              let mensahekainis3 = await interaction.channel.messages.fetch(`${nocnoc3.ogmessage}`)

              try {
                await interaction.guild.members.fetch(user)
              } catch (err) {
                await hulda.send({ content: "I had an issue with fetching the member." })
                await mensahekainis3.edit({ content: "User is not in guild. Action Suspended.", embeds:[], components: [] })
                console.log(err)
                await db.delete(`${dbID}`)
              }

              let nociscute3 = await interaction.guild.members.cache.get(user)

              if (nociscute3) {
                console.log(nociscute3)
                let mmmyes3 = await interaction.fields.getTextInputValue('reasonz')

                await nociscute3.send({ content: "Hey there! Unfortunately I regret to inform you that your application to enter FurDevs has been formally denied by assigned staff. You will have to refile your verification form once more to appeal. Sorry about that! QwQ\n\n> " + `**Reason for rejection:** ${mmmyes3}` }).catch(() => hulda.send("User Unaccessible, Action complete!"))
                await interaction.reply({ content: "Denial of application complete!!", ephemeral: true }).catch(() => { console.log() })
                try {
                  await db.delete(`${dbID}`)
                  await tubaba.send({ content: `User Application denied by ${interaction.user.username}#${interaction.user.discriminator} for "${mmmyes3}"`, embeds: [okayme3] })
                  await db.delete(`${namedeny}`)
                  await mensahekainis3.delete()
                } catch (err) {
                  await mensahekainis3.edit({ content: "This person isn't in the guild!", embeds:[], components: [] });
                  await hulda.send("Alert! user is not in the guild. Action suspended!")
                  console.log(err)
                  await db.delete(`${dbID}`)
                  await db.delete(`${namedeny}`)
                  return
                }
              }
            }
          }
        }
  }
}