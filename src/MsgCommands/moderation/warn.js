const resolve = require('../../functions/resolvers/resolveuser.js')
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, PermissionsBitField, ButtonStyle } = require('discord.js')
const Database = require("@replit/database")
const db = new Database()
module.exports = {
  name: "warn",
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return message.reply("You do not have permission to do that.");
    if (args.length < 2) return message.reply("you can't warn someone without a reason. Required: `User (mention), reason`")
    const target = args[0]
    const repuser = await resolve.execute(message, target)
    console.log(repuser)
    let issuer = message.author.id
    if (repuser == 'undefined') return message.reply("Invalid user! It should be a mention or an ID. *I don't accept names because I dun wanna citate wrong person qwq*")
    if (repuser == issuer) return message.reply("y u wan warn yourself? I won't allow it QwQ");
    const reason = args.slice(1).join(" ") + " | FurDevs"
    var Logging = message.client.channels.cache.find(c => c.id === "STAFFLOG")

    try {
      await message.guild.members.fetch(`${repuser}`)
    } catch (err) {
      await message.reply("User Invalid! You sure the user is still in the guild?")
      return
    }

    let inserver = await message.guild.members.fetch(`${repuser}`)

    if (inserver) {
      let rolecheck = message.guild.members.cache.get(`${repuser}`)
      if (rolecheck.roles.cache.some(r => r.id == "STAFFROLE")) return message.reply("You wouldn't wanna warn a fellow colleage, OP.")

      function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }
      let rngid = getRandomInt(100000) + 100000

      var caseId = 'cs' + repuser + '-' + rngid


      var Appeal = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setURL('https://tripetto.app/run/JQLIZESAA9')
            .setLabel('You can appeal this case here!')
        )
      var BanMessage = new EmbedBuilder()
        .setColor('#ffe014')
        .setAuthor({ name: message.client.user.username, iconURL: message.client.user.avatarURL() })
        .setTitle('Penalty Notice - FurDevs')
        .setDescription("Your punishment has been updated in FurDevs.")
        .addFields([
          { name: "Case Id:", value: `${caseId}` },
          { name: "Punishment type:", value: "warn"},
          { name: "Reason:", value: reason }
        ])
        .setTimestamp()
        .setFooter({ text: 'Staff Team - FurDevs', iconURL: message.client.user.avatarURL() });

      var Log = new EmbedBuilder()
        .setColor('#ffe014')
        .setAuthor({ name: message.client.user.username, iconURL: message.client.user.avatarURL() })
        .setTitle('Report Log - FurDevs')
        .setDescription("An action has been taken by this bot in FurDevs.")
        .addFields([
          { name: "Case Id:", value: `${caseId}` },
          { name: "Punishment type:", value: "Warn" },
          { name: "target:", value: `<@${repuser}> ` + `(UID: ${repuser})` },
          { name: "Reason:", value: reason },
          { name: "Action made by:", value: `${message.author.username}#${message.author.discriminator} ` + `(UID: ${message.author.id})` }
        ])
        .setTimestamp()
        .setFooter({ text: 'Staff Team - FurDevs', iconURL: message.client.user.avatarURL() });

      await inserver.send({ embeds: [BanMessage], components: [Appeal] }).catch(() => message.reply("User cannot be DMed, proceeding with action."))
      try {
        await Logging.send({ embeds: [Log] })
        const caseDetails = {}
        caseDetails["issuer"] = message.author.tag,
          caseDetails["target"] = `${repuser}`,
          caseDetails["reason"] = reason,
          caseDetails["date"] = new Date()
        db.set(caseId, caseDetails)
        await message.reply("Punishment delivered. Check logs for copy! (Warn/Citation)")
      } catch (err) {
        await message.reply("Something went wrong. Inform Kigu ASAP!\n\n" + `Error: ${err}`)
        console.log(err)
        return
      }
    }
  }
}