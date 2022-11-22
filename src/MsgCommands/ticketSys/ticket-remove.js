const resolve = require('../../functions/resolvers/resolveuser.js')
const {PermissionsBitField} = require('discord.js')

module.exports = {
  name: 'ticket-remove',
  aliases: ['remove-from-ticket', 'user-remove', 'member-remove'],
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return message.reply("You do not have permission to do that.");
    if(args.length == 0) return message.reply("erm, who are you going to remove?")
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
      await message.channel.permissionOverwrites.delete(`${repuser}`);
      await message.channel.send(`member has been removed from ticket!`)
    }
  }
}