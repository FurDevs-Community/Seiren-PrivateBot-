const { EmbedBuilder, SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Fetch those avatars! Ya better not be stealing smh')
    .addUserOption(option => option.setName('target').setDescription('Needed someone elses avatar?')),
  async execute(interaction) {

    var member = interaction.options.getUser('target')

    if (member) {
      var avatarEmbed = new EmbedBuilder()
        .setTitle(`${member.username}'s avatar'`)
        .setColor('#e0b0ff')
        .setImage(member.displayAvatarURL({ size: 1024 }))
        .setFooter({text:'You better not be stealing avatars smh', iconURL:interaction.client.user.avatarURL()})

      await interaction.reply({ embeds: [avatarEmbed] });
    } else {
      var ownEmbed = new EmbedBuilder()
        .setTitle(`${interaction.user.username}'s avatar'`)
        .setColor('#e0b0ff')
        .setImage(interaction.user.displayAvatarURL({ size: 1024 }))
        .setFooter({text:'You better not be stealing avatars smh', iconURL:interaction.client.user.avatarURL()})

      await interaction.reply({ embeds: [ownEmbed] })
    }
  },
};