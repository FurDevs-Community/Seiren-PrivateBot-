const { ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const Database = require("@replit/database")
const db = new Database()

module.exports = {
  name: 'wrapup',
  async execute(interaction) {

    let databaseID = 'dbx' + interaction.user.id

    const chooser = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId("approve-" + databaseID)
          .setLabel('Approve')
          .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
          .setCustomId("deny-" + databaseID)
          .setLabel('Deny')
          .setStyle(ButtonStyle.Danger),
        new ButtonBuilder()
          .setCustomId("question-" + databaseID)
          .setLabel('Question')
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId("kicku-" + databaseID)
          .setLabel('Kick')
          .setStyle(ButtonStyle.Danger),
        new ButtonBuilder()
          .setCustomId("yeet-" + databaseID)
          .setLabel('Ban')
          .setStyle(ButtonStyle.Danger)
      )

    let a = await interaction.fields.getTextInputValue('Q1')
    let b = await interaction.fields.getTextInputValue('Q2')
    let c = await interaction.fields.getTextInputValue('Q3')
    let d = await interaction.fields.getTextInputValue('Q4')

      const embeds = new EmbedBuilder()
        .setAuthor({name:interaction.user.username + `#` + interaction.user.discriminator, iconURL:interaction.user.displayAvatarURL()})
        .setTitle('Click here to reverse image search!')
        .setURL(`https://www.google.com/searchbyimage?&image_url=${interaction.user.displayAvatarURL()}`)
        .setColor('#e0b0ff')
        .setThumbnail(interaction.user.displayAvatarURL())
        .addFields([
          {name:"Where did I come from?", value:"Answer: " + a},
          {name:"Am I 13 and up?", value:"Answer: " +  b},
          {name:"Why am I here?", value:"Answer: " +  c},
          {name:"2 rules in my own words:", value:"Answer: " + d},
          {name:"instructions:", value:"Select a button to determine action."}
        ])
        .setFooter({text:`date submitted: ${new Date()}`})

      const topush = new Array(a, b, c, d)
      console.log(topush)


      const sender = await interaction.client.channels.cache.find(c => c.id == 'PENDINGLOGS')

      await sender.send({ embeds: [embeds], components: [chooser] }).then(async message => {
        let eee = {}
        eee['ogmessage'] = message.id
        eee['name'] = interaction.user.username + '#' + interaction.user.discriminator
        eee['id'] = interaction.user.id
        eee['revimgsearch'] = interaction.user.displayAvatarURL()
        eee['responses'] = JSON.stringify(topush)
        eee['date'] = new Date()

        try {
          await db.set(databaseID, eee)
          await interaction.reply({ content: "I have submitted your verification successfully! Please wait for further notice from me in regards to your app.", ephemeral: true })
        } catch (err) {
          console.log(err)
          await interaction.reply({ content: "I have received a fatal err, please contact staff.", ephemeral: true })
          return
        }
      })
  }
}