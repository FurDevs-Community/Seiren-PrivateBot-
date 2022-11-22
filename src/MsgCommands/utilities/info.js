const ms = require('ms')
const { EmbedBuilder } = require('discord.js')

module.exports = {
  name: "info",
  aliases: ['about'],
  async execute(message) {
    let uwu = await message.client.application.fetch()

    let uptimer = message.client.uptime / 1000
    var totaluptime = ms(uptimer)

    const embed1 = new EmbedBuilder()
      .setAuthor({name:message.client.user.username, iconURL:message.client.user.avatarURL()})
      .setColor('#e0b0ff')
      .setThumbnail(message.client.user.avatarURL())
      .setDescription("Salutations, I am Seiren, the Public Information and Security bot exclusive for FurDevs. I am made using discord.js, and more functions will come in the future for me. Use `k.help` for a command list!")
      .addFields([
        {name:"Bot owner:", value:`${uwu.owner.tag} (${uwu.owner.id})`, inline: true},
        {name:"Uptime:", value:`${totaluptime}`, inline: true},
      ])
      .setTimestamp()
      .setFooter({text:"Discord.js v14.0.3 | FurDevs Security Bot", iconURL:message.client.user.avatarURL()})

    message.channel.send({ embeds: [embed1] })
  }
}