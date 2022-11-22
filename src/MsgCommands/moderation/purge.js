const resolve = require('../../functions/resolvers/channelresolve.js')
const { EmbedBuilder, PermissionsBitField } = require('discord.js')

module.exports = {
  name: 'purge',
  aliases: ['prune', 'mass-delete'],
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return message.reply("You do not have permission to do that.");
    if (args.length < 2) return message.reply("You do not have enough arguments. Usage: `<prefix>purge <channel> <amt (1-100)>`")

    let target = args[0]
    let repuser = await resolve.execute(message, target)
    if (repuser == 'undefined') return message.reply("Invalid channel! Should be a mention or an ID.")
    let amount = args[1]

    var Logging = message.client.channels.cache.find(c => c.id === "STAFFLOGS")

    var logembed = new EmbedBuilder()
      .setAuthor({ name: message.client.user.username, iconURL: message.client.user.avatarURL() })
      .setColor('#4585ed')
      .setTitle('Report Log - FurDevs')
      .setDescription("An action has been taken by this bot in FurDevs.")
      .addFields([
        { name: "Action Type:", value: "purge/mass delete" },
        { name: "Target Channel:", value: `<#${repuser}> ` + `(ID: ${repuser})` },
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
    await message.delete()

    let channel = await message.guild.channels.fetch(`${repuser}`)

    if (channel) {
      try {
        if (amount > 100) return message.channel.send("a bit too big there bud, maximum is 100 messages.")
        var messages = await channel.messages.fetch({ limit: amount });
        channel.bulkDelete(messages, { filterOld: true })
        await message.channel.send(`Purged ${amount} messages from <#${repuser}> ! Action has been logged accordingly!`)
        await Logging.send({ embeds: [logembed] })
      } catch (err) {
        await message.channel.send(`Error received! Error: ${err}\n\nIf it's an error that is not about the bot not able to delete messages beyond 14 days, please inform kigu asap.`)
        console.log(err)
        return
      }
    }
  }
}