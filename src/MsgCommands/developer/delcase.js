const { EmbedBuilder } = require('discord.js')
const Database = require("@replit/database")
const db = new Database()
require('dotenv').config()
module.exports = {
  name: 'delcase',
  async execute(message, args) {
    let botDev = process.env.BOT_OWNER
    if (message.author.id !== botDev) return message.reply("https://tenor.com/view/rohan-jjba-daga-kotowaru-i-refuse-refuse-gif-7385649\n\nI refuse! You're not my developer!")

    if (args.length < 1) return message.reply("Kigu, you forgot to tell me which ID to delete.")

    let caseID = args.slice(0).join(" ");
    var Logging = message.client.channels.cache.find(c => c.id === "STAFFLOGS")

    let intel = await db.get(`${caseID}`)
    if(!intel) return message.reply("Invalid case ID ;-;")

    if (intel) {
      let caseinfo = new EmbedBuilder()
        .setAuthor({ name: message.client.user.username, iconURL: message.client.user.avatarURL() })
        .setColor('#4585ed')
        .setTitle(`Case Information: Case # ${caseID}`)
        .setDescription("Information on the case number.")
        .addFields([
          { name: "Issuer:", value: `${intel.issuer}` },
          { name: "Target:", value: `<@${intel.target}> (UID: ${intel.target})` },
          { name: "Reason:", value: `${intel.reason}` },
          { name: "Date and Time Issued:", value: `${intel.date}` }
        ])
        .setTimestamp()
        .setFooter({ text: 'Staff Team - FurDevs', iconURL: message.client.user.avatarURL() });

      await message.reply("Deleting case! A repost of the case will be sent to my logs shortly.")
      await db.delete(`${caseID}`)
      await Logging.send({ content: "Repost submitted as this case is dropped from database.\nReason: Saving space for any upcoming citations.", embeds: [caseinfo] })
    }
  }
}