const resolve = require('../../functions/resolvers/resolveuser.js')
const {PermissionsBitField} = require('discord.js')

module.exports = {
  name: 'validate',
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return message.reply("You do not have permission to do that.")
    let target = args[0]
    let issuer = message.author.id
    if (!target) return message.reply({ content: "Erm, you forgot to target the user you want to accept their application tho- :eyes:" })
    let repuser = await resolve.execute(message, target)
    if (repuser == 'undefined') return message.reply("Invalid user! It should be a mention or an ID.")
    if (repuser == issuer) return message.reply("ehh, why you using it on yourself?")

    try {
      await message.guild.members.fetch(`${repuser}`)
    } catch (err) {
      await message.reply("No user found! You sure it's still in the guild?")
      return
    }
    let confirm = await message.guild.members.fetch(`${repuser}`)
    if (confirm) {
      const member = message.guild.members.cache.get(`${repuser}`)
      if (member.roles.cache.some(role => role.id == "MEMBER")) return message.reply("This user already has been verified-")
      const logit = message.client.channels.cache.find(c => c.id === 'APPLOGS')

      try {
        await confirm.roles.remove('SILENCED')
        await message.reply("User has been validated and moved back to Phase 01.")
        await confirm.send({ content: "You have been validated to proceed with Verification. To begin, press the button in the `verify here` channel and I will start making your verification request for FurDevs." }).catch(() => message.reply("I couldn't DM the user, action is performed regardless."))
        await logit.send({ content: `User <@${repuser}> has been removed from Quarantine Mode through 'k.validate' by <@${message.author.id}>` })
      } catch (err) {
        await message.reply("Something went wrong. Inform Kigu ASAP!" + `Error: ${err}`)
        return
      }
    }
  }
}