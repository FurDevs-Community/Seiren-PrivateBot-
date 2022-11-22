const resolve = require('../../functions/resolvers/resolveuser.js')
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField } = require('discord.js')

module.exports = {
  name: 'kick',
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return message.reply("You do not have permission to do that.");
    if (args.length < 2) return message.reply("You're missing some args. Required: User (mention), reason")
    const target = args[0]
    const repuser = await resolve.execute(message, target)
    console.log(repuser)
    let issuer = message.author.id
    if (repuser == 'undefined') return message.reply("Invalid user! It should be a mention or an ID. *I don't accept names because I dun wanna kick wrong person qwq*")
    if (repuser == issuer) return message.reply("y u wan kick yourself? I won't allow it QwQ");
    const reason = args.slice(1).join(" ") + " | FurDevs"
    var Logging = message.client.channels.cache.find(c => c.id === "STAFFLOGS")

    var BanMessage = new EmbedBuilder()
      .setAuthor({ name: message.client.user.username, iconURL: message.client.user.avatarURL() })
      .setColor('#f8ac3a')
      .setTitle('Penalty Notice - FurDevs')
      .setDescription("Your punishment has been updated in FurDevs.")
      .addFields([
        { name: "Punishment type:", value: "Kick" },
        { name: "Reason:", value: reason }
      ])
      .setTimestamp()
      .setFooter({ text: 'Staff Team - FurDevs', iconURL: message.client.user.avatarURL() });

    var Appeal = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setStyle(ButtonStyle.Link)
          .setURL('https://tripetto.app/run/JQLIZESAA9')
          .setLabel('You can appeal this case here!')
      )

    var Log = new EmbedBuilder()
      .setAuthor({ name: message.client.user.username, iconURL: message.client.user.avatarURL() })
      .setColor('#f8ac3a')
      .setTitle('Report Log - FurDevs')
      .setDescription("An action has been taken by this bot in FurDevs.")
      .addFields([
        { name: "Punishment type:", value: "Kick" },
        { name: "target:", value: `<@${repuser}> ` + `(UID: ${repuser})` },
        { name: "Reason:", value: reason },
        { name: "Action made by:", value: `${message.author.username}#${message.author.discriminator} ` + `(UID: ${message.author.id})` }
      ])
      .setTimestamp()
      .setFooter({ text: 'Staff Team - FurDevs', iconURL: message.client.user.avatarURL() });

    try {
      await message.guild.members.fetch(`${repuser}`)
    } catch (err) {
      await message.reply("User Invalid! You sure the user is still in the guild?")
      return
    }

    let inserver = await message.guild.members.fetch(`${repuser}`)
    if (inserver) {
      let rolecheck = message.guild.members.cache.get(`${repuser}`)
      if (rolecheck.roles.cache.some(r => r.id == "STAFFROLE")) return message.reply("You wouldn't wanna kick a fellow colleage, OP.")
      await inserver.send({ embeds: [BanMessage], components: [Appeal] }).catch(() => message.reply("User cannot be DMed, proceeding with action."))
      try {
        await message.guild.members.kick(inserver, reason)
        await message.reply("Punishment delivered. Check logs for copy! (Kick)")
        await Logging.send({ embeds: [Log] })
      } catch (err) {
        await message.reply("Something went wrong. Inform Kigu ASAP!\n\n" + `Error: ${err}`)
        console.log(err)
        return
      }
    }
  }
}