const Database = require("@replit/database")
const db = new Database()
const { EmbedBuilder, PermissionsBitField } = require('discord.js')

module.exports = {
  name: "passport",
  aliases: ['ps', 'exempt'],
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return message.reply("You do not have permission to do that.");
    var Logging = message.client.channels.cache.find(c => c.id === "STAFFLOG")

    let type = args[0];

    if (type == "add") {
      if (args.length < 3) return message.reply("You do not have enough arguments.\n\n**usage:** `k.passport add <User ID> <reason>`")
      let uid = args[1];
      let reason = args.slice(2).join(" ")
      let finialID = 'ps-' + uid

      let check = await db.get(`${finialID}`)

      if (check) return message.reply("This user already exists in the passport system.")

      let details = {}
      details["issuer"] = message.author.tag
      details["target"] = uid
      details["reason"] = reason
      details["date"] = new Date()
      db.set(finialID, details)
      await message.reply('target added to the list of exemptions.')

      var UnbanLog = new EmbedBuilder()
        .setAuthor({ name: message.client.user.username, iconURL: message.client.user.avatarURL() })
        .setColor('#7cf16f')
        .setTitle('Report Log - FurDevs')
        .setDescription("An action has been taken by this bot in FurDevs.")
        .addFields([
          { name: "Action type:", value: "Add to Passport System" },
          { name: "target:", value: `<@${uid}> ` + `(${uid})` },
          { name: "Reason:", value: reason },
          { name: "Action made by:", value: `${message.author.username}#${message.author.discriminator} ` + `(UID: ${message.author.id})` },
        ])
        .setTimestamp()
        .setFooter({ text: 'Staff Team - FurDevs', iconURL: message.client.user.avatarURL() });
      await Logging.send({ embeds: [UnbanLog] })
    } else
      if (type == "list") {
        try {
          await db.list('ps-').then(keys => {
            let grr = keys.join('\n');

            const list = new EmbedBuilder()
              .setAuthor({ name: message.client.user.username, iconURL: message.client.user.avatarURL() })
              .setColor('#4585ed')
              .setTitle(`List of Passport IDs`)
              .setDescription(grr)
              .setTimestamp()
              .setFooter({ text: 'Passport System - FurDevs', iconURL: message.client.user.avatarURL() });

            message.reply({ embeds: [list] })
          })
        } catch (err) {
          await message.reply("there's no one in the system added!")
          return
        }
      } else
        if (type == "view") {
          if (args.length < 2) return message.reply("you do not have enough arguments.\n\n**usage:** `k.passport view <passport ID ('ps-uid')>`")
          let search = args[1]

          try {
            db.get(search)
          } catch (err) {
            message.reply("The Passport ID that you are looking for does not exist in the database.")
            return
          }
          let hi = await db.get(search)

          if (hi) {
            let caseinfo = new EmbedBuilder()
              .setAuthor({ name: message.client.user.username, iconURL: message.client.user.avatarURL() })
              .setColor('#4585ed')
              .setTitle(`Passport Information: ID # ${search}`)
              .setDescription("Information for the exemption.")
              .addFields([
                { name: "Issuer:", value: `${hi.issuer}` },
                { name: "Target:", value: `<@${hi.target}> (UID: ${hi.target})` },
                { name: "Reason:", value: `${hi.reason}` },
                { name: "Date and Time Issued:", value: `${hi.date}` },
              ])
              .setTimestamp()
              .setFooter({ text: 'Passport Info - FurDevs', iconURL: message.client.user.avatarURL() });
            await message.reply({ embeds: [caseinfo] })
          }
        } else
          if (type == "remove") {
            if (args.length < 3) return message.reply("You do not have enough arguments.\n\n**usage:** `k.passport view <passport ID ('ps-uid')> <reason>`")
            let psid = args[1];
            let reason = args.slice(2).join(" ")

            try {
              db.get(psid)
            } catch (err) {
              await message.reply("The passport you are trying to remove does not exist.")
              return
            }
            let okay = await db.get(psid)
            if (okay) {
              await message.reply("User removed from passport system.")
              var UnbanLog = new EmbedBuilder()
                .setAuthor({ name: message.client.user.username, iconURL: message.client.user.avatarURL() })
                .setColor('#ffe014')
                .setTitle('Report Log - FurDevs')
                .setDescription("An action has been taken by this bot in FurDevs.")
                .addFields([
                  { name: "Action type:", value: "Remove from Passport System" },
                  { name: "Passport ID:", value: `${psid}` },
                  { name: "Reason:", value: reason },
                  { name: "Action made by:", value: `${message.author.username}#${message.author.discriminator} ` + `(UID: ${message.author.id})` },
                ])
                .setTimestamp()
                    .setFooter({ text: 'Staff Team - FurDevs', iconURL: message.client.user.avatarURL() });
              await Logging.send({ embeds: [UnbanLog] })
              await db.delete(`${psid}`)
            }
          }
          else {
            let ayuda = new EmbedBuilder()
              .setAuthor({ name: message.client.user.username, iconURL: message.client.user.avatarURL() })
              .setColor('#4585ed')
              .setTitle('Instructions - PassPort System')
              .setDescription("This command manages the passports, a system that bypasses the anti-raider system which bans users whose account age is below 3 days from joining.\n\n**Aliases:** `ps`, `exempt`")
              .addFields([
                {name:"Type 01: Add", value:"`k.ps add <uid> <reason>` | Adds a user to the passport. Automatically deletes itself when the user has been bypassed **once.**"},
                {name:"Type 02: List", value:"`k.ps list` | Lists all the passports created."},
                {name:"Type 03: View", value:"`k.ps view <passport ID>` | Views a specific passport ID."},
                {name:"Type 04: Remove", value:"`k.ps remove <passport ID> <reason>` | Removes a user from the Passport System."},
              ])
              .setTimestamp()
              .setFooter({ text: 'Staff Team - FurDevs', iconURL: message.client.user.avatarURL() });

            await message.reply({ embeds: [ayuda] })
          }
  }
}