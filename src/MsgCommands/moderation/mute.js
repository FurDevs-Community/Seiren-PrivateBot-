const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField } = require('discord.js')
const resolve = require('../../functions/resolvers/resolveuser.js')
const ms = require('ms')

module.exports = {
  name: "mute",
  aliases: ['timeout', 'chill'],
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) return message.reply("You do not have permission to do that.");
    if (args.length < 3) return message.reply("You're missing some args. Required: User, Duration (max of 27 days), reason")
    const target = args[0]
    const repuser = await resolve.execute(message, target)
    console.log(repuser)
    let issuer = message.author.id
    if (repuser == 'undefined') return message.reply("Invalid user! It should be a mention or an ID. *I don't accept names because I dun wanna mute wrong person qwq*")
    if (repuser == issuer) return message.reply("y u wan mute yourself? I won't allow it QwQ");
    const duration = args[1]
    const reason = args.slice(2).join(" ") + " | FurDevs"
    var Logging = message.client.channels.cache.find(c => c.id === "STAFFLOG")

    var BanMessage = new EmbedBuilder()
      .setAuthor({ name: message.client.user.username, iconURL: message.client.user.avatarURL() })
      .setColor('#4585ed')
      .setTitle('Penalty Notice - FurDevs')
      .setDescription("Your punishment has been updated in FurDevs.")
      .addFields([
        { name: "Punishment Type:", value: "Mute/Timeout" },
        { name: "Reason:", value: reason },
        { name: "Duration:", value: `${duration}` }
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
      .setColor('#4585ed')
      .setTitle('Report Log - FurDevs')
      .setDescription("An action has been taken by this bot in FurDevs.")
      .addFields([
        { name: "Punishment Type:", value: "Mute/Timeout" },
        { name: "Target:", value: `<@${repuser}> ` + `(UID: ${repuser})` },
        { name: "Reason:", value: reason },
        { name: "Duration:", value: `${duration}` },
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
      if (rolecheck.roles.cache.some(r => r.id == "STAFFROLE")) return message.reply("You wouldn't wanna mute a fellow colleage, OP.")
      if (inserver.isCommunicationDisabled == true) return message.reply("Huh? This user is already muted!")
      await inserver.send({ embeds: [BanMessage], components: [Appeal] }).catch(() => message.reply("User cannot be DMed, proceeding with action."))
      try {
        inserver.timeout(ms(duration), reason)
        await message.reply("Punishment delivered. Check logs for copy! (timeout)")
        await Logging.send({ embeds: [Log] })
      } catch (err) {
        await message.reply("Something went wrong. Inform Kigu ASAP!\n\n" + `Error: ${err}`)
        console.log(err)
        return
      }
    }
  }
}