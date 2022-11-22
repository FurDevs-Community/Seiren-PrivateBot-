const { EmbedBuilder } = require('discord.js')
const resolve = require('../../functions/resolvers/resolveuser.js')

module.exports = {
  name: 'avatar',
  async execute(message, args) {
    if (args.length < 1) return message.reply("you need an input. (User ID or User Mention)")
    let target = args[0]
    let repuser = await resolve.execute(message, target)
    if (repuser == 'undefined') return message.reply("Invalid user! It should be a mention or a user ID.")

    try {
      await message.guild.members.fetch(`${repuser}`)
    } catch (err) {
      await message.reply("Huh, that user is not in the guild.")
      return
    }

    let member = await message.guild.members.fetch(`${repuser}`)
    if (member) {
      var avatarEmbed = new EmbedBuilder()
        .setTitle(`${member.user.username}'s avatar'`)
        .setColor('#e0b0ff')
        .setImage(member.displayAvatarURL({ size: 1024 }))
        .setFooter({text:'You better not be stealing avatars smh', iconURL:message.client.user.avatarURL()})
      message.channel.send({ embeds: [avatarEmbed] })
    }
  }
}
