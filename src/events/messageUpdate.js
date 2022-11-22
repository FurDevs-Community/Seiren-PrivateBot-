const { EmbedBuilder } = require('discord.js')
module.exports = {
  name: 'messageUpdate',
  async execute(oldMessage, newMessage) {
    console.log('active.')
    if (oldMessage.author.bot) return;
    if (!oldMessage.guild) return;

    let holdup = new Array('EXEMPTED_CHANNELS') //exempted channels go here
      let checkit = holdup.includes(oldMessage.channel.id)
      if (checkit) return;

    const count = 1950;

    const Original = oldMessage.content.slice(0, count) + (oldMessage.content.length > 1950 ? " ..." : "");
    const Edited = newMessage.content.slice(0, count) + (newMessage.content.length > 1950 ? " ..." : "")

    const display = new EmbedBuilder()
      .setColor('#4585ed')
      .setAuthor({name:`${newMessage.author.tag}`, iconURL: `${newMessage.author.displayAvatarURL()}`})
      .setTitle("**Message Edited**")
      .setDescription(`A [message](${newMessage.url}) was edited in ${newMessage.channel}.\n\n**BEFORE:**\n${Original}\n\n**AFTER:**\n${Edited}`.slice(0, 4096))
      .setFooter({text:`Channel ID: ${newMessage.channel.id} | Message ID: ${newMessage.id}`});

    if (oldMessage.attachments.size >= 1) {
      display.addFields({name:`old attachments:`, value:`${oldMessage.attachments.map(a => a.url)}`,inline: true})
    }
    if (newMessage.attachments.size >= 1) {
      display.addFields({name:`new attachments:`, value:`${newMessage.attachments.map(a => a.url)}`,inline: true})
    }
    let messageLogsChannel = await oldMessage.guild.channels.cache.find(c => c.id == "MSG_CHNL_LOGS") //logs go here
    await messageLogsChannel.send({ embeds: [display] })
    return
  }
}