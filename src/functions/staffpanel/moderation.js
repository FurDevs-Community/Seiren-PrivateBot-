const { EmbedBuilder } = require('discord.js')

module.exports = {
  name: 'staffpanel',
  async execute(interaction) {
    const genhelp = new EmbedBuilder()
      .setAuthor({ name: interaction.client.user.username, iconURL: interaction.client.user.avatarURL() })
      .setColor('#E0B0FF')
      .setTitle("Handbook - Moderation Commands")
      .setDescription("This will be the official list of commands for the bot's moderation module.\n\n**note:** Duration must be in this format: `30s`, `5min`, `1hr`, `7d`. The `user` and/or `channel` argument is either mention or user ID unless explicitly noted.")
      .setThumbnail(interaction.client.user.avatarURL())
      .addFields([
        { name: "Ban users `k.ban`", value: "requires `user` and `reason` argument. Restricted to `Administrator and up`." },
        { name: "Unban users `k.unban`", value: "requires `User ID` and `reason` argument. Restricted to `Administrator` and up." },
        { name: "Kick users `k.kick`", value: "requires `user` and `reason` argument. Restricted to `Moderator` and up." },
        { name: "Mute users `k.mute`", value: "requires `user`, `duration`, and `reason` argument. Restricted to `Helper` and up." },
        { name: "Unmute users `k.unmute`", value: "requires `user` and `reason` argument. Restricted to `Helper` and up." },
        { name: "Warn users `k.warn`", value: "requires `user` and `reason` argument.Restricted to `Helper` and up." },
        { name: "Pardon warn case `k.pardon`", value: "requires `user`, `case ID`, and `reason` argument. Restricted to `Helper` and up." },
        { name: "list warn cases `k.caselist`", value: "Has an optional `user ID` argument for searching cases. Restricted to `Helper` and up." },
        { name: "view warn case `k.caseview`", value: "requires `Case ID` argument. Restricted to `Helper` and up." },
        { name: "Purge Messages `k.purge`", value: "requires `channel` and `amt (1-100)` argument. Restricted to `Helper` and up." },
        { name: "Put channels on slowmode `k.slowmode`", value: "requires `channel`, `duration`, and `reason` argument. Restricted to `Administrator` and up." },
        { name: "Lock channels `k.lock`", value: "requires `channel` and `reason` argument. Restricted to `Administrator` and up." },
        { name: "Unlock channels `k.unlock`", value: "requires `channel` and `reason` argument. Restricted to `Administrator` and up." },
      ])
      .setTimestamp()
      .setFooter({ text: "Staff Handbook - FurDevs", iconURL: interaction.client.user.avatarURL() })

    await interaction.user.send({ embeds: [genhelp] }).catch(() => interaction.update({ content: "Your DMs are closed! Please keep them open so i can send you the commands.", embeds: [], components: [] }))
    await interaction.update({ content: "Handbook on Moderation has been sent to your DMs~!", embeds: [], components: [] })
  }
}