const resolve = require('../../functions/resolvers/resolveuser.js')
const { PermissionsBitField } = require('discord.js')

module.exports = {
  name: 'ticket-add',
  aliases: ['add-to-ticket', 'user-add', 'member-add'],
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return message.reply("You do not have permission to do that.");
    if(args.length == 0) return message.reply("erm, who are you going to add-")
    const target = args[0]
    let issuer = message.author.id
    let repuser = await resolve.execute(message, target)
    if (repuser == 'undefined') return message.reply("Invalid user! It should be a mention or an ID.")
    if (repuser == issuer) return message.reply("*growls* don't play tricks on me, OP!");

    try {
      await message.guild.members.fetch(`${repuser}`)
    } catch (err) {
      await message.channel.send("No user found! You sure it's still in the guild?")
      return
    }

    let member = await message.guild.members.fetch(`${repuser}`)
    if (member) {
      await message.channel.permissionOverwrites.edit(`${repuser}`, { ViewChannel: true, SendMessages: true });
      await message.channel.send(`member has been added to the ticket. Hey there <@${repuser}>!`)
    }
  }
}