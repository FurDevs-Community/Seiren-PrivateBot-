const transcript = require('../../functions/qnatranscript')
const resolve = require('../../functions/resolvers/resolveuser.js')
const { EmbedBuilder, PermissionsBitField } = require('discord.js')
const imgur = require('../../functions/canvacreate.js')

module.exports = {
  name: 'accept',
  aliases: ['approve', 'verify'],
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return message.reply("You do not have permission to do that.")
    let target = args[0]
    console.log(target)
    let issuer = message.author.id
    if (!target) return message.reply({ content: "Erm, you forgot to target the user you want to accept their application tho- :eyes:" })
    let repuser = await resolve.execute(message, target)
    console.log(repuser)
    if (repuser == 'undefined') return message.reply("Invalid user! It should be a mention or an ID.")
    if (repuser == issuer) return message.reply("ehh, why you using it on yourself?")

    try {
      await message.guild.members.fetch(`${repuser}`)
    } catch (err) {
      await message.channel.send("No user found! You sure it's still in the guild?")
      return
    }
    let confirm = await message.guild.members.fetch(`${repuser}`)
    if (confirm) {
      const member = message.guild.members.cache.get(`${repuser}`)
      if (member.roles.cache.some(role => role.id === 'SILENCED')) return message.reply({ content: "Denied. User is a new account and is not allowed to bypass validation. Make sure they passed through the first phase (removing the silenced role) then use it once their application arrived at the applications channel." })

      if (member.roles.cache.some(role => role.id == "MEMBER")) return message.reply("This user already has been verified-")

      const logit = message.client.channels.cache.find(c => c.id === 'APPLOGS')
      const welcomer = message.client.channels.cache.find(c => c.id === "GENERALCHAT")
      message.reply({ content: "User has been notified and moved to the server proper." })

      if (message.channel.name.includes('qna-')) {
        message.channel.send("QnA Ticket detected. Closing ticket and transcripting messages!")
        const channel = message.channel
        let nameda = message.channel.name
        var messages = await channel.messages.fetch({ limit: '100' });
        transcript.execute(message, messages, nameda)
      }
      const atta = await imgur.execute(member)

      confirm.roles.remove('UNVERIFIED')
      confirm.roles.add('MEMBER')
      confirm.send({ content: `Your application to ${message.guild.name} has been accepted. Welcome to the Server!` }).catch(() => message.reply("I couldn't reach the user in DMs! performing available actions."))
      const welcomeEmbed = new EmbedBuilder()
        .setAuthor({name:message.client.user.username, iconURL:message.client.user.avatarURL()})
        .setColor('#e0b0ff')
        .setTitle("FurDevs - Welcome!")
        .setThumbnail(confirm.user.displayAvatarURL())
        .setDescription("The roles are in <#ROLEMENU>.\n\nIf you have any questions or concerns about the server, You can approach any available staff or access ASFDevs using `/support` or `k.support`.\n\nRemember to abide to our in-server guidelines and we hope you enjoy your time at this hour!")
        .setImage(`attachment://${atta.name}`)
        .setTimestamp()
        .setFooter({text:"FurDevs - Welcome!", iconURL:message.client.user.avatarURL()})

      welcomer.send({ content: `Welcome <@${repuser}> to FurDevs! <@&WELCOMER> Please welcome our new member to the server!`, embeds: [welcomeEmbed], files: [atta] })

      await logit.send({ content: `User <@${repuser}> has been manually verified through 'k.approve' by <@${message.author.id}>` })
    }
  }
}