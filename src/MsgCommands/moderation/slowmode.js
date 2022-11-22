const resolve = require('../../functions/resolvers/channelresolve.js')
const { EmbedBuilder, PermissionsBitField } = require('discord.js')
const ms = require('ms')

module.exports = {
  name: "slowmode",
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return message.reply("You do not have permission to do that.");
    if (args.length < 3) return message.reply("you can't slowmode a channel without a reason. Required: `channel (mention), reason`")
    let target = args[0]
    let repuser = await resolve.execute(message, target)
    if (repuser == 'undefined') return message.reply("Invalid channel! Should be a mention or an ID.")
    let duration = args[1]
    let reason = args.slice(2).join(" ");
    var Logging = message.client.channels.cache.find(c => c.id === "STAFFLOG")

    var successEmbed = new EmbedBuilder()
      .setColor('#4585ed')
      .setAuthor({ name: message.client.user.username, iconURL: message.client.user.avatarURL() })
      .setTitle('Channel Update - FurDevs')
      .setDescription("This channel has been updated. Please check the details below.")
      .addFields([
        { name: "Action Type:", value: "Channel Slowmode" },
        { name: "Reason:", value: reason },
        { name: "Duration Interval:", value: duration }
      ])
      .setTimestamp()
      .setFooter({ text: 'Staff Team - FurDevs', iconURL: message.client.user.avatarURL() });

    var logembed = new EmbedBuilder()
      .setColor('#4585ed')
      .setAuthor({ name: message.client.user.username, iconURL: message.client.user.avatarURL() })
      .setTitle('Report Log - FurDevs')
      .setDescription("An action has been taken by this bot in FurDevs.")
      .addFields([
        { name: "Action Type:", value: "Channel Slowmode" },
        { name: "target:", value: `<#${repuser}> ` + `(ID: ${repuser})` },
        { name: "Reason:", value: reason },
        { name: "Duration Interval:", value: duration },
        { name: "Action made by:", value: `${message.author.username}#${message.author.discriminator} ` + `(UID: ${message.author.id})` }
      ])
      .setTimestamp()
      .setFooter({ text: 'Staff Team - FurDevs', iconURL: message.client.user.avatarURL() });

    try {
      await message.guild.channels.fetch(`${repuser}`)
    } catch (err) {
      message.reply("Invalid channel! You sure that channel exists?")
      return
    }
    let channel = await message.guild.channels.fetch(`${repuser}`)
    if (channel) {
      if (duration == "disable") {
        channel.setRateLimitPerUser(0, reason)
        channel.send({ embeds: [successEmbed] })
        message.channel.send("Channel updated. Report submitted successfully!")
        Logging.send({ embeds: [logembed] })
        return
      }
      let trueDuration = ms(duration) / 1000
      if (trueDuration > 21600) return message.reply("Too big bud, max is 21600 seconds/6hrs (Discord Limitations, somehow).")
      channel.setRateLimitPerUser(trueDuration, reason);
      channel.send({ embeds: [successEmbed] })
      message.channel.send("Channel updated. Report submitted successfully!")
      Logging.send({ embeds: [logembed] })
    }
  }
}
