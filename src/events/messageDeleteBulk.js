const moment = require('moment')
const { EmbedBuilder } = require('discord.js')

module.exports = {
  name: "messageDeleteBulk",
  async execute(messages) {
    let data = "";
    const embed = new EmbedBuilder()
      .setTitle("Transcript Alert!")
      .setDescription(`Transcripted ${messages.size} messages from ${messages.first().channel.toString()}`)
      .setColor("#be1919")
      .setTimestamp()
      .setFooter({text:`Channel ID: ${messages.first().channel.id}`});
    const Blep = messages.first().client.channels.cache.find(c => c.id === "731523599332147211")

    messages.toJSON().map(async (message) => {
      data += `+++Message by ${message.author.username}#${message.author.discriminator} (${message.author.id}), ID ${message.id}, channel ${message.channel.name}+++\n`;
      data += `-Time: ${moment(message.createdAt).format()}\n`;
      message.attachments.toJSON().map((attachment) => {
        data += `-Attachment: ${attachment.url}\n`;
      });
      message.embeds.forEach((embed) => {
        data += `-Embed: ${JSON.stringify(embed)}\n`;
      });
      // Write the clean version of the message content
      data += `${message.cleanContent}\n\n\n`;
    })
    // Create a buffer with the data
    let buffer = Buffer.from(data, "utf-8");
    Blep.send({ content: "Someone purged some things, here's the transcript~!", embeds: [embed], files: [{ attachment: buffer, name: `transcript_${moment().valueOf()}.txt` }] })
  }
}