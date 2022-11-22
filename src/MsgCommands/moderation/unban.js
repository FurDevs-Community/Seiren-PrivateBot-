const resolve = require('../../functions/resolvers/resolveuser.js')
const { EmbedBuilder, PermissionsBitField } = require('discord.js')

module.exports = {
  name: "unban",
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return message.reply("You do not have permission to do that.");
    if (args.length < 2) return message.reply("You're missing some args. Required: User (mention), reason")
    const target = args[0]
    const repuser = await resolve.execute(message, target)
    console.log(repuser)
    let issuer = message.author.id
    if (repuser == 'undefined') return message.reply("Invalid user! It should be a mention or an ID. *I don't accept names because I dun wanna unban wrong person qwq*")
    if (repuser == issuer) return message.reply("y u wan unban yourself? I won't allow it QwQ");
    const reason = args.slice(1).join(" ") + " | FurDevs"

    var Logging = message.client.channels.cache.find(c => c.id === "STAFFLOG")
    var UnbanLog = new EmbedBuilder()
      .setAuthor({ name: message.client.user.username, iconURL: message.client.user.avatarURL() })
      .setColor('#7cf16f')
      .setTitle('Report Log - FurDevs')
      .setDescription("An action has been taken by this bot in FurDevs.")
      .addFields([
        { name: "Action type:", value: "Unban" },
        { name: "target:", value: `<@${repuser}> ` + `(${repuser})` },
        { name: "Reason:", value: reason },
        { name: "Action made by:", value: `${message.author.username}#${message.author.discriminator} ` + `(UID: ${message.author.id})` }
      ])
      .setTimestamp()
      .setFooter({ text: 'Staff Team - FurDevs', iconURL: message.client.user.avatarURL() });

    try {
      await message.guild.bans.remove(`${repuser}`, reason)
      await Logging.send({ embeds: [UnbanLog] })
      await message.reply("Punishment submitted. Check the logs for copy!(unban)")
    } catch (err) {
      await message.reply("Something went wrong. Inform Kigu ASAP!\n\n" + `Error: ${err}`)
      return
    }
  }
}