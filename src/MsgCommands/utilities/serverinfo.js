const moment = require('moment')
const { ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
  name: "serverinfo",
  aliases: ['server'],
  async execute(message) {
    let guild = message.guild

    await message.guild.fetch()
    let chanum = await message.guild.channels.fetch()
    let rolum = await message.guild.roles.fetch()
    let banum = await message.guild.bans.fetch()
    const createdDate = message.guild.createdAt;

    var serverinfo = new EmbedBuilder()
      .setTitle(`${guild.name} Information`)
      .setColor('#e0b0ff')
      .setDescription("This is the server's info.")
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .addFields([
        {name:"Number of members:", value:`${guild.memberCount}`, inline: true},
        {name:"Server Owner:", value:`<@${guild.ownerId}>`, inline: true},
        {name:"Guild ID:", value:`${guild.id}`, inline: true},
        {name:"Number of roles:", value:`${rolum.size}`, inline: true},
        {name:"Number of Channels:", value:`${chanum.size}`, inline: true},
        {name:"Number of bans:", value:`${banum.size}`, inline: true},
        {name:"Required MFA Level:", value:`${guild.mfaLevel}`, inline: true},
        {name:"Verification Level:", value:`${guild.verificationLevel}`, inline: true},
        {name:"NSFW Level:", value:`${guild.nsfwLevel}`, inline: true},
        {name:"ECF Level (discord automod):", value:`${guild.explicitContentFilter}, inline: true`},
        {name:"Number of boosts:", value:`${guild.premiumSubscriptionCount}`},
        {name:"Boost Tier Level:", value:`${guild.premiumTier}`},
        {name:"Guild Creation Date:", value:`${moment(createdDate).format('LLLL')} (${moment(createdDate).fromNow()})`},
      ])

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setStyle(ButtonStyle.Link)
          .setURL('https://twitter.com/FurDevs_Discord')
          .setLabel('Server Twitter'),
      )

    message.channel.send({ embeds: [serverinfo], components: [row] })
  }
}