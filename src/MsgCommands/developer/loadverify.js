const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js')

module.exports = {
  name: 'loadverify',
  async execute(message) {

    let types = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setStyle(ButtonStyle.Success)
          .setCustomId('beginverify')
          .setLabel('Start Verification!'),
      )

    var mensahe = new EmbedBuilder()
      .setAuthor({ name: message.client.user.username, iconURL: message.client.user.avatarURL() })
      .setColor('#4B589C')
      .setTitle('Welcome to FurDevs!')
      .setDescription("We are pleased to have you here. You'll be answering a couple of questions to make sure you're not a troll or part of a raid or a threat to the server. This should only take less than 5 minutes of your time and it'll help us out by making sure you didn't come to cause trouble.")
      .addFields([
        { name: "Take note!", value: `- You may not DM any Staff Members Related to Verification ***unless*** there are issues in trying to verify.\n- After you post your verification, please wait for a staff member to approve you.\n- **Please do not put "Website" or "Friend" (or even Google) if asked where you found FurDevs.** Please be specific for which website and state the discord tag of the user if you were invited by a friend.` }
      ])
      .setTimestamp()
      .setFooter({ text: 'Verification System - FurDevs', iconURL: message.client.user.avatarURL() });

    const feck = message.guild.channels.cache.find(c => c.id === "VERIFYHERECHNL")
    feck.send({embeds:[mensahe], components:[types]})

    await message.reply("Verification Button has been loaded!")
  }
}