const resolve = require('../../functions/resolvers/resolveuser.js')
const {PermissionsBitField, ChannelType} = require('discord.js')

module.exports = {
  name: 'question',
  aliases: ['interrogate'],
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
      await message.channel.send("No user found! You sure it's still in the guild?")
      return
    }

    let confirm = await message.guild.members.fetch(`${repuser}`)
    if (confirm) {
      const member = message.guild.members.cache.get(`${repuser}`)
      if (member.roles.cache.some(role => role.id === 'SILENCED')) return message.reply({ content: "Denied. User is a new account and is not allowed to bypass validation. Make sure they passed through the first phase (removing the silenced role) then use it once their application arrived at the applications channel." })
      if (member.roles.cache.some(role => role.id == "MEMBER")) return message.reply("This user already has been verified-")

      message.channel.send("Generating a ticket! Please wait.")
      await message.guild.channels.create(
        {name:`qna-${repuser}`,
         type: ChannelType.GuildText,
      }).then(async channel => {
        await channel.setParent('APPCATEGORY')
        await channel.permissionOverwrites.create(`${repuser}`, {
          ViewChannel: true,
          SendMessages: true
        })
        channel.send({ content: `Good day <@${repuser}> ! Please answer the questions that will be posed by staff shortly.` })
      })
      confirm.send({ content: `Your presence is now needed for additional security questions. Please check back into ${message.guild.name}!` })

      const logit = message.client.channels.cache.find(c => c.id === 'APPLOGS')
      logit.send({ content: `User <@${repuser}> has been manually questioned through 'k.question' by <@${message.author.id}>` })
    }

  }
}