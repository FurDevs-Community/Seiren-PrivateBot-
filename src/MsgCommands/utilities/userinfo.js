const { EmbedBuilder } = require('discord.js')
const moment = require('moment')
const resolve = require('../../functions/resolvers/resolveuser.js')

module.exports = {
  name: "userinfo",
  aliases: ['whois', 'user'],
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

    let target2 = await message.guild.members.fetch(`${repuser}`)
    let member = message.guild.members.cache.get(`${repuser}`)

    await member.user.fetch()

    const joinDate = await member.joinedAt;
    const createdDate = await target2.user.createdAt;

    var uinfo = new EmbedBuilder()
      .setTitle(`${target2.user.username}'s Information'`)
      .setColor('#e0b0ff')
      .setDescription("This is the user's info.")
      .setThumbnail(target2.user.displayAvatarURL())
      .addFields([
        {name:"User's Nickname:", value:`${member.nickname}`, inline: true},
        {name:"User's tag:", value:`${target2.user.tag}`, inline: true},
        {name:"User's ID:", value:`${repuser}`, inline: true},
        {name:"Highest role:", value:`${member.roles.highest}`},
        {name:"Account Registered at:", value:`${moment(createdDate).format('LLLL')} (${moment(createdDate).fromNow()})`},
        {name:"User Joined this Guild at:", value:`${moment(joinDate).format('LLLL')} (${moment(joinDate).fromNow()})`},
      ])
      .setImage(target2.user.bannerURL({ size: 1024 }))

    message.channel.send({ embeds: [uinfo] })
  }
}