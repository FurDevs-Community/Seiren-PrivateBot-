const transcript = require('../../functions/qnatranscript')
const resolve = require('../../functions/resolvers/resolveuser.js')
const { PermissionsBitField } = require('discord.js')

module.exports = {
  name: 'decline',
  aliases: ['deny', 'reject'],
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return message.reply("You do not have permission to do that.")
    if (args.length < 2) return message.reply("You need the user to deny entry and the reason for rejection >w<;;\n(Format: `k.deny <user> <reason>)`")
    let target = args[0]
    let issuer = message.author.id
    if (!target) return message.reply({ content: "Erm, you forgot to target the user you want to accept their application tho- :eyes:" })
    let repuser = await resolve.execute(message, target)
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

      message.reply({ content: "User denied entry!" })

      if (message.channel.name.includes('qna-')) {
        message.channel.send("QnA Ticket detected. Closing ticket and transcripting messages!")
        const channel = message.channel
        let nameda = message.channel.name
        var messages = await channel.messages.fetch({ limit: '100' });
        transcript.execute(message, messages, nameda)
      }

      const logit = message.client.channels.cache.find(c => c.id === 'APPLOGS')
      let reason = args.slice(1).join(" ")

      confirm.send({ content: "Hey there! Unfortunately I regret to inform you that your application to enter FurDevs has been formally rejected by assigned staff. You will have to refile your verification form once more to appeal. Sorry about that! QwQ\n\n> " + `**Reason for rejection:** ${reason}` }).catch(() => message.reply("I couldn't DM the user, action is completed."))
      await logit.send({ content: `User <@${repuser}> has been manually denied through 'k.decline' by <@${message.author.id}> for reason: "${reason}"` })
    }
  }
}