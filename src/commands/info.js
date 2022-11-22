const { EmbedBuilder, SlashCommandBuilder } = require('discord.js')
const ms = require('ms')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('Check who I am? Who am I, anyway?'),
  async execute(interaction) {

    let uwu = await interaction.client.application.fetch()

    let uptimer = interaction.client.uptime / 1000
    var totaluptime = ms(uptimer)

    const embed1 = new EmbedBuilder()
      .setAuthor({name:interaction.client.user.username, iconURL:interaction.client.user.avatarURL()})
      .setColor('#e0b0ff')
      .setThumbnail(interaction.client.user.avatarURL())
      .setDescription("Salutations, I am Seiren, the Public Information and Security bot exclusive for FurDevs. I am made using discord.js, and more functions will come in the future for me. Use `k.help` for a command list!")
      .addFields([
        {name:"Bot owner:", value:`${uwu.owner.tag} (${uwu.owner.id})`, inline: true},
        {name:"Uptime:", value:`${totaluptime}`, inline: true},
      ])
      .setTimestamp()
      .setFooter({text:"Discord.js v14.0.3 | FurDevs Security Bot", iconURL:interaction.client.user.avatarURL()})

    await interaction.reply({ embeds: [embed1] });
  },
};