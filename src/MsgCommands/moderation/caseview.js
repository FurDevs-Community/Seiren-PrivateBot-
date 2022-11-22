const { EmbedBuilder, PermissionsBitField } = require('discord.js')
const Database = require("@replit/database")
const db = new Database()
module.exports = {
  name: "caseview",
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return message.reply("You do not have permission to do that.");
    if (args.length == 0) return message.reply("you can't warn someone without a reason. Required: `User (mention), reason`")
    
    const caseId = args[0]

    let intel = await db.get(`${caseId}`)
    if(!intel) return message.reply("That case is not on my database!")

    if (intel) {
      let caseinfo = new EmbedBuilder()
        .setAuthor({ name: message.client.user.username, iconURL: message.client.user.avatarURL() })
        .setColor('#4585ed')
        .setTitle(`Case Information: Case # ${caseId}`)
        .setDescription("Information on the case number. This only logs warn incidents.")
        .addFields([
          { name: "Issuer:", value: `${intel.issuer}` },
          { name: "Target:", value: `<@${intel.target}> (UID: ${intel.target})` },
          { name: "Reason:", value: `${intel.reason}` },
          { name: "Date and Time Issued:", value: `${intel.date}` }
        ])
        .setTimestamp()
        .setFooter({ text: 'Staff Team - FurDevs', iconURL: message.client.user.avatarURL() });

      message.reply({ content: "Here's the case that you want to view!", embeds: [caseinfo] })
    }
  }
}