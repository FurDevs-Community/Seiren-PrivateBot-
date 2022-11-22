const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const moment = require('moment')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('fetch info about the server.'),
  async execute(interaction) {

    await interaction.guild.fetch()
    let chanum = await interaction.guild.channels.fetch()
    let rolum = await interaction.guild.roles.fetch()
    let banum = await interaction.guild.bans.fetch()

    const createdDate = interaction.guild.createdAt;

    var serverinfo = new EmbedBuilder()
      .setTitle(`${interaction.guild.name} Information`)
      .setColor('#e0b0ff')
      .setDescription("This is the server's info.")
      .setThumbnail(interaction.guild.iconURL())
      .addFields([
        {name:"Number of members:", value:`${interaction.guild.memberCount}`, inline: true},
        {name:"Server Owner:", value:`<@${interaction.guild.ownerId}>`, inline: true},
        {name:"Guild ID:", value:`${interaction.guild.id}`, inline: true},
        {name:"Number of roles:", value:`${rolum.size}`, inline: true},
        {name:"Number of Channels:", value:`${chanum.size}`, inline: true},
        {name:"Number of bans:", value:`${banum.size}`, inline: true},
        {name:"Required MFA Level:", value:`${interaction.guild.mfaLevel}`, inline: true},
        {name:"Verification Level:", value:`${interaction.guild.verificationLevel}`, inline: true},
        {name:"NSFW Level:", value:`${interaction.guild.nsfwLevel}`, inline: true},
        {name:"ECF Level (discord automod):", value:`${interaction.guild.explicitContentFilter}, inline: true`},
        {name:"Number of boosts:", value:`${interaction.guild.premiumSubscriptionCount}`},
        {name:"Boost Tier Level:", value:`${interaction.guild.premiumTier}`},
        {name:"Guild Creation Date:", value:`${moment(createdDate).format('LLLL')} (${moment(createdDate).fromNow()})`},
      ])

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setStyle(ButtonStyle.Link)
          .setURL('https://twitter.com/FurDevs_Discord')
          .setLabel('Server Twitter'),
        )

    await interaction.reply({ embeds: [serverinfo], components: [row] })
  },
};