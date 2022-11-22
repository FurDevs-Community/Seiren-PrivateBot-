const { EmbedBuilder, SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Use to see if I still can reply~!'),
  async execute(interaction) {

    const loreresp = ["Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "nakakapagpabagabag!", "I feel sleepy...", "ヤイヤイと人人人の目がキミを追う, ヤイヤイと人人人の目がキミを見る (Big Brother, Crusher Remix [KakuP-Model]", "Running Seiren.sys...complete. Entering OA Space...", 'No, I will NOT say the full name of the chemical "Titin"!', "I won't crash. this is definitely me when am not lying, right?", "\*is watching Kigu suffer while doing maintenance on me*"]
    const reply = loreresp[Math.floor(Math.random() * loreresp.length)]

    const embedping = new EmbedBuilder()
      .setColor('#e0b0ff')
      .setAuthor({name:'Ping!', iconURL:interaction.client.user.avatarURL()})
      .setTitle(`:bell: Latency is ${Date.now() - interaction.createdTimestamp}ms. API Latency is ${Math.round(interaction.client.ws.ping)}ms :bell:`)
      .setDescription(reply)
      .setThumbnail(interaction.client.user.displayAvatarURL())
      .setTimestamp()
      .setFooter({text:"Seiren Latency Tool - FurDevs", iconURL:interaction.client.user.avatarURL()})

    await interaction.reply({ content: 'Am still awake >w<', embeds: [embedping] });
  },
};