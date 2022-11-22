const resolve = require('../../functions/resolvers/channelresolve.js')
const { EmbedBuilder, PermissionsBitField } = require('discord.js')

module.exports = {
  name: "unlock",
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return message.reply("You do not have permission to do that.");
    if (args.length < 2) return message.reply("you can't lock a channel without a reason. Required: `channel (mention), reason`")
    let target = args[0]
    let repuser = await resolve.execute(message, target)
    if (repuser == 'undefined') return message.reply("Invalid channel! Should be a mention or an ID.")
    let reason = args.slice(1).join(" ");
    var Logging = message.client.channels.cache.find(c => c.id === "STAFFLOG")

    var successEmbed = new EmbedBuilder()
      .setColor('#7cf16f')
      .setAuthor({ name: message.client.user.username, iconURL: message.client.user.avatarURL() })
      .setTitle('Channel Lock - FurDevs')
      .setDescription("This channel is unlocked. Please check the details below.")
      .addFields([
        { name: "Action Type:", value: "Channel Unlock" },
        { name: "Reason:", value: reason }
      ])
      .setTimestamp()
      .setFooter({ text: 'Staff Team - FurDevs', iconURL: message.client.user.avatarURL() });

    var logembed = new EmbedBuilder()
      .setColor('#7cf16f')
      .setAuthor({ name: message.client.user.username, iconURL: message.client.user.avatarURL() })
      .setTitle('Report Log - FurDevs')
      .setDescription("An action has been taken by this bot in FurDevs.")
      .addFields([
        { name: "Action type:", value: "Channel Unlock" },
        { name: "target:", value: `<#${repuser}> ` + `(ID: ${repuser})` },
        { name: "Reason:", value: reason },
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
      channel.permissionOverwrites.edit(message.guild.id, { SendMessages: null });
      channel.send({ embeds: [successEmbed] })
      message.channel.send("Channel unlocked. Report submitted successfully!")
      Logging.send({ embeds: [logembed] })
    }
  }
}