const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const Database = require('@replit/database')
const db = new Database()

module.exports = {
  name: "apply",
  aliases: ['staffapps', 'modapps'],
  async execute(message) {
    const button = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('beginapps')
          .setStyle(ButtonStyle.Success)
          .setLabel('Start Application!')
      )

    const button2 = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('B')
          .setStyle(ButtonStyle.Success)
          .setLabel('Applications Closed!')
          .setDisabled(true)
      )

    const embed = new EmbedBuilder()
      .setColor('#e0b0ff')
      .setAuthor({name:message.client.user.username, iconURL:message.client.user.avatarURL()})
      .setTitle("FDevsSAE Application System")
      .setDescription('Welcome to the FurDevs Staff Application Evaluation System, otherwise known as FDevSAE. To apply, you must have at least all the requirements from each position.')
      .addFields([
        {name:'General Requirements', value:'You must have the following requirements:\n-is trustworthy\n-has no violations from past 1-6 months\n-fluent in english\n-age is at least 16+.'},
        {name:'Position 01: Moderator', value:'Must be an active member of this server.'},
        {name:'Position 02: Administrator', value:'Age req: 18+. Must have experience of being a moderator.'},
        {name:'"What if I do not meet the requirements?"', value:"Applicants who do not meet the requirements may still apply, but may not be guaranteed a position within the Staff Team. A factor that the Team is looking for as well is proper decorum, a key aspect that is being observed in any applicant.\n\nApplicants who cannot meet the requirements, but still have a proper decorum or behavior may be considered, but not guaranteed as such. This mainly applies in the event when there are multiple applicants within the Applications System."}
      ])
      .setTimestamp()
      .setFooter({text:"FurDevs - FDevsSAE", iconURL:message.client.user.avatarURL()})
    message.reply("You seem to be a brave user. I have sent the requirements of staffs and the link to the applications in DMs.")

    let statuschec = await db.get('staffappstatus')

    if (statuschec.status == 'true') {
      message.author.send({ content: "> Pro tip: kept forgetting the commands? Use Slash Commands!", embeds: [embed], components: [button] }).catch(() => message.channel.send({ content: "Erm, I can't access DMs. Check your privacy settings first before trying again!" }))
    }
    if (statuschec.status == 'false') {
      message.author.send({ content: "> Pro tip: kept forgetting the commands? Use Slash Commands!", embeds: [embed], components: [button2] }).catch(() => message.channel.send({ content: "Erm, I can't access DMs. Check your privacy settings first before trying again!" }))
    }
  }
}