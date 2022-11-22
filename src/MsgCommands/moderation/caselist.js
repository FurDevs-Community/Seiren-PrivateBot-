const { EmbedBuilder, PermissionsBitField } = require('discord.js')
const Database = require("@replit/database")
const db = new Database()
module.exports = {
  name: "caselist",
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return message.reply("You do not have permission to do that.");

    if (args.length == 0) {
        db.list('cs').then(keys => {
          if(keys.length == 0) return message.reply("No cases logged!")
          let grr = keys.join('\n');

          const list = new EmbedBuilder()
            .setAuthor({ name: message.client.user.username, iconURL: message.client.user.avatarURL() })
            .setColor('#4585ed')
            .setTitle(`List of violation Case IDs`)
            .setDescription(grr)
            .setTimestamp()
            .setFooter({ text: 'Staff Team - FurDevs', iconURL: message.client.user.avatarURL() });

          message.reply({ embeds: [list] })
        })
    } else
      if (args.length == 1) {
          db.list(`cs${args[0]}`).then(keys => {
            if(keys.length == 0) return message.reply(`There's no logged cases for <@${args[0]}> !`)
            let grr = keys.join('\n');

            const list = new EmbedBuilder()
              .setAuthor({ name: message.client.user.username, iconURL: message.client.user.avatarURL() })
              .setColor('#4585ed')
              .setTitle(`List of violation Case IDs for ${args[0]}`)
              .setDescription(grr)
              .setTimestamp()
              .setFooter({ text: 'Staff Team - FurDevs', iconURL: message.client.user.avatarURL() });

            message.reply({ embeds: [list] })

          })
      } else return message.reply("h-hey! Slow down with me! (To list all cases, only use `k.caselist`. Otherwise, to search for an ID, use `k.caselist <user id>`. I can't accept mentions at this time, sorry! I'll learn more of it soon!")
  }
}