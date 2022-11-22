const { AuditLogEvent, EmbedBuilder } = require('discord.js')
module.exports = {
  name: 'messageDelete',
  async execute(message) {
    if (message.author.bot) return;
    let messageLogsChannel = await message.guild.channels.cache.find(c => c.id == "MSG_LOGS_CHNL") //logs channel for messages
    setTimeout(async () => {
      const fetchedLogs = await message.guild.fetchAuditLogs({
        limit: 5,
        type: AuditLogEvent.MessageDelete,
      });
      const auditLog = fetchedLogs.entries.find((entry) => entry.target.id === message.id);

      let holdup = new Array('EXEMPTED_CHANNELS') //exempt channels go here
      let checkit = holdup.includes(message.channel.id)
      if (checkit) return;

      // Create an embed for the event log channel
      const display = new EmbedBuilder()
        .setTitle("A message was deleted")
        .setDescription(`A message in <#${message.channel.id}> has been deleted.\n\n**deleted message:**\n${message.content ? message.content : "none"}`.slice(0, 4096))
        .setAuthor({name:`${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}`})
        .setColor("#be1919")
        .setTimestamp()
        .setFooter({text:`Channel ID: ${message.channel.id} | Message ID: ${message.id}`});

      if (message.attachments.size >= 1) {
        display.addFields([{name:`attachments:`, value:`${message.attachments.map(a => a.url)}`,inline: true}])
      }
      if (auditLog) {
        display.setFooter({text:
          `Deleted by ${auditLog.executor.tag} | User ID: ${auditLog.executor.id} | Message ID: ${message.id}`, iconURL:
          `${auditLog.executor.displayAvatarURL()}`
        });
      }
      await messageLogsChannel.send({ embeds: [display] });
    }, 1000);
  }
}