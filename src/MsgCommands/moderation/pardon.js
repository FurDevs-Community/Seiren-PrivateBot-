const resolve = require('../../functions/resolvers/resolveuser.js')
const { EmbedBuilder, PermissionsBitField } = require('discord.js')
const Database = require("@replit/database")
const db = new Database()
module.exports = {
  name: "pardon",
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return message.reply("You do not have permission to do that.");
    if (args.length < 3) return message.reply("you can't warn someone without a reason. Required: `User, CaseID, reason`")
    const target = args[0]
    const caseId = args[1]
    const repuser = await resolve.execute(message, target)
    console.log(repuser)
    let issuer = message.author.id
    if (repuser == 'undefined') return message.reply("Invalid user! It should be a mention or an ID.")
    if (repuser == issuer) return message.reply("breh, y u use it on yourself-");
    const reason = args.slice(2).join(" ") + " | FurDevs"
    var Logging = message.client.channels.cache.find(c => c.id === "STAFFLOGS")

    try {
      await message.guild.members.fetch(`${repuser}`)
    } catch (err) {
      await message.reply("User Invalid! You sure the user is still in the guild?")
      return
    }

    try {
      await db.get(`${caseId}`)
    } catch (err) {
      await message.reply("Invalid case ID. I advise to run `k.caselist` to view all existing cases.")
    }

    let inserver = await message.guild.members.fetch(`${repuser}`)

    let check = await db.get(`${caseId}`)
    if(!check) return message.reply("Invalid case ID! Please check `k.caselist` to view all existing cases.")
    let isityou = check.target

    if (isityou !== target) return message.reply("This case does not belong to the user.")

    if (inserver) {
      let rolecheck = message.guild.members.cache.get(`${repuser}`)
      if (rolecheck.roles.cache.some(r => r.id == "STAFFROLE")) return message.reply("wut.")

      var BanMessage = new EmbedBuilder()
        .setColor('#7cf16f')
        .setAuthor({ name: message.client.user.username, iconURL: message.client.user.avatarURL() })
        .setTitle('Penalty Notice - FurDevs')
        .setDescription("Your punishment has been updated in FurDevs.")
        .addFields([
          { name: "Action Type:", value: "Pardon" },
          { name: "Case ID Pardoned:", value: `${caseId}` },
          { name: "reason", value: reason },
        ])
        .setTimestamp()
        .setFooter({ text: 'Staff Team - FurDevs', iconURL: message.client.user.avatarURL() });

      var Log = new EmbedBuilder()
        .setColor('#7cf16f')
        .setAuthor({ name: message.client.user.username, iconURL: message.client.user.avatarURL() })
        .setTitle('Report Log - FurDevs')
        .setDescription("An action has been taken by this bot in FurDevs.")
        .addFields([
          { name: "Action Type:", value: "Pardon" },
          { name: "Case ID Pardoned:", value: `${caseId}` },
          { name: "target", value: `<@${repuser}> ` + `(UID: ${repuser})` },
          { name: "reason", value: reason },
          { name: "Action made by:", value: `${message.author.username}#${message.author.discriminator} ` + `(UID: ${message.author.id})` }
        ])
        .setTimestamp()
        .setFooter({ text: 'Staff Team - FurDevs', iconURL: message.client.user.avatarURL() });

      await inserver.send({ embeds: [BanMessage] }).catch(() => message.reply("User cannot be DMed, proceeding with action."))
      try {
        await Logging.send({ embeds: [Log] })
        await db.delete(`${caseId}`)
        await message.reply("Case pardoned. Check logs for copy!")
      } catch (err) {
        await message.reply("Something went wrong. Inform Kigu ASAP!\n\n" + `Error: ${err}`)
        console.log(err)
        return
      }
    }
  }
}