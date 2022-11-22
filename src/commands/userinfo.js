const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const moment = require('moment')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('fetch info about a user.')
    .addUserOption(option => option.setName('target').setDescription('Needed someone elses info?')),
  async execute(interaction) {

    var member = interaction.options.getUser('target')

    if (member) {

      let memberr = interaction.guild.members.cache.get(member.id)

      await member.fetch()

      const joinDate = await memberr.joinedAt;
      const createdDate = await member.createdAt;

      var uinfo = new EmbedBuilder()
        .setTitle(`${member.username}'s Information'`)
        .setColor('#e0b0ff')
        .setDescription("This is the user's info.")
        .setThumbnail(member.displayAvatarURL())
        .addFields([
        {name:"User's Nickname:", value:`${memberr.nickname}`, inline: true},
        {name:"User's tag:", value:`${member.tag}`, inline: true},
        {name:"User's ID:", value:`${member.id}`, inline: true},
        {name:"Highest role:", value:`${memberr.roles.highest}`},
        {name:"Account Registered at:", value:`${moment(createdDate).format('LLLL')} (${moment(createdDate).fromNow()})`},
        {name:"User Joined this Guild at:", value:`${moment(joinDate).format('LLLL')} (${moment(joinDate).fromNow()})`},
      ])
        .setImage(member.bannerURL({ size: 1024 }))
      await interaction.reply({ embeds: [uinfo] });
    } else {

      let hihi = interaction.guild.members.cache.get(interaction.user.id)
      const joinDate2 = await hihi.joinedAt;
      const createdDate2 = await interaction.user.createdAt;
      await interaction.user.fetch()

      var owninfo = new EmbedBuilder()
        .setTitle(`${interaction.user.username}'s Information'`)
        .setColor('#e0b0ff')
        .setDescription("This is the user's info.")
        .setThumbnail(interaction.user.displayAvatarURL())
        .addFields([
        {name:"User's Nickname:", value:`${hihi.nickname}`, inline: true},
        {name:"User's tag:", value:`${interaction.user.tag}`, inline: true},
        {name:"User's ID:", value:`${interaction.user.id}`, inline: true},
        {name:"Highest role:", value:`${hihi.roles.highest}`},
        {name:"Account Registered at:", value:`${moment(createdDate2).format('LLLL')} (${moment(createdDate2).fromNow()})`},
        {name:"User Joined this Guild at:", value:`${moment(joinDate2).format('LLLL')} (${moment(joinDate2).fromNow()})`},
      ])
        .setImage(interaction.user.bannerURL({ size: 1024 }))

      await interaction.reply({ embeds: [owninfo] })
    }
  },
};