var transcript = require('../../functions/transcript')
const { ButtonBuilder, ActionRowBuilder, ButtonStyle, EmbedBuilder, PermissionsBitField, ComponentType } = require('discord.js')

module.exports = {
  name: "ticket-close",
  aliases: "close-ticket",

  async execute(message) {
    if (!message.channel.name.includes('ticket-')) return message.channel.send(`Not the right channel ${message.author}. Only do these in tickets =w=`)
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return message.reply("You do not have permission to do that.");

    let maygahd = await message.channel.name.split('-')
    let ownerticket = maygahd[1]

    try {
      await message.guild.members.fetch(ownerticket)
    } catch (err) {
      await message.reply("uhh, the Ticket owner is missing-")
      console.log()
      return
    }

    let memberping = await message.guild.members.cache.get(ownerticket)

    var arejuusure = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('cancel')
          .setStyle(ButtonStyle.Danger)
          .setLabel('Cancel'),
        new ButtonBuilder()
          .setCustomId('delete')
          .setStyle(ButtonStyle.Success)
          .setLabel('Delete Ticket')
      )
    var waitEmbed = new EmbedBuilder()
      .setAuthor({name:message.client.user.username, iconURL:message.client.user.avatarURL()})
      .setColor('#ffe014')
      .setTitle('Ticket Delete prompt - FurDevs')
      .setDescription("To staff: Do you want this ticket to be removed?")
      .addFields([
        {name:"Instruction:", value:`Please select a button. You must make a selection within one (1) minute.`},
        {name:"Important note:", value:"Make sure you have stored all information necessary for logs if really needed! This operation cannot be reversed!!"}
      ])
      .setTimestamp()
      .setFooter({text:'ASFDevs - FurDevs', iconURL:message.client.user.avatarURL()});
    message.channel.send({ content: "Awaiting Staff for confirmation: Shall we delete this ticket?", embeds: [waitEmbed], components: [arejuusure] })
    let filter = i => i.member.permissions.has(PermissionsBitField.Flags.ManageMessages)
    var collector = message.channel.createMessageComponentCollector({ componentType: ComponentType.Button, filter: filter, max: 1, idle: 1 * 60000, time: 1 * 60000, errors: ['time'] })
    if (collector) {
      collector.on('collect', async i => {
        if (i) {
          await i.deferUpdate();
          if (i.customId == 'cancel') {
            i.editReply({ content: `Operations cancelled by staff! Give them time, ${message.author}!!`, components: [] })
          } else if (i.customId == 'delete') {
            i.editReply({ content: `${message.author}, this ticket is now closed! This channel will be deleted in 10 seconds.`, components: [] })
            const channel = message.channel
            let nameda = message.channel.name
            var messages = await channel.messages.fetch({ limit: '100' });
            await memberping.send("Heya! Just to inform you that your ticket has now been closed. Ciao!")
            transcript.execute(message, messages, nameda)
          }
        }
      });
      collector.on('end', collected => {
        if (collector.endReason != "limit") {
          message.channel.send({ content: `Looks like they didn't answer on time, ${message.author}`, components: [] })
        }
      })
    }

  }
}