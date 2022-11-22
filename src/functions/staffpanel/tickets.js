const { EmbedBuilder } = require('discord.js')

module.exports = {
  name: 'staffpanel',
  async execute(interaction) {
    const genhelp = new EmbedBuilder()
      .setAuthor({ name: interaction.client.user.username, iconURL: interaction.client.user.avatarURL() })
      .setColor('#E0B0FF')
      .setTitle("Handbook - Ticket Commands")
      .setDescription("This will be the official list of commands for the bot's Ticket module, ASFDevs.\n\n`user` argument is always either in mention or in user ID. Please run the commands inside tickets.")
      .setThumbnail(interaction.client.user.avatarURL())
      .addFields([
        { name: "Close Ticket `k.ticket-close`", value: "No arguments needed; closes the ticket." },
        { name: "Add users `k.ticket-add`", value: "requires `user` argument. Adds a user to the ticket." },
        { name: "Remove users `k.ticket-remove`", value: "requires `user` argument. Removes a user from the ticket." },
      ])
      .setTimestamp()
      .setFooter({ text: "Staff Handbook - CH", iconURL: interaction.client.user.avatarURL() })

    await interaction.user.send({ embeds: [genhelp] }).catch(() => interaction.update({ content: "Your DMs are closed! Please keep them open so i can send you the commands.", embeds: [], components: [] }))
    await interaction.update({ content: "Handbook on ASFDevs has been sent to your DMs~!", embeds: [], components: [] })
  }
}