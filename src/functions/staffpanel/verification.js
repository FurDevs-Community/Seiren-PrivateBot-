const { EmbedBuilder } = require('discord.js')

module.exports = {
  name: 'staffpanel',
  async execute(interaction) {
    const process = new EmbedBuilder()
      .setAuthor({ name: interaction.client.user.username, iconURL: interaction.client.user.avatarURL() })
      .setColor('#E0B0FF')
      .setTitle("Handbook - FDevs Security")
      .setDescription("Welcome to FDevs Security! This guide will help you understand the Verification system of the server.")
      .setThumbnail(interaction.client.user.displayAvatarURL())
      .addFields([
        { name: "Age Gate System (or RaidMode)", value: "Accounts made within 1-3 days are by default banned by the Sentry, and those within 4-10 days are subjected to questioning. This can be bypassed by the Whitelist/passport System if the banned user was using a genuine account. Users can be validated with the `validate` command to allow them to apply once found OK to go." },
        { name: "Verification Proper", value: "Users will now file an application for admission into FurDevs. As staff, you are tasked to make sure that each user that is applying into the server is safe and not a troll-like submission (ex: wrong password = no entry). Approval and Rejection commands are at the last page if you have chosen to question them (using the blue button)." },
      ])
      .setTimestamp()
      .setFooter({ text: "Staff Handbook - FurDevs", iconURL: interaction.client.user.avatarURL() })

    const cmds = new EmbedBuilder()
      .setAuthor({ name: interaction.client.user.username, iconURL: interaction.client.user.avatarURL() })
      .setColor('#E0B0FF')
      .setTitle("Handbook - Verification Commands")
      .setDescription("This will be the official list of commands for the bot's Verification module, FDevs Security.\n\n*The `user` argument is either mention or user ID.")
      .setThumbnail(interaction.client.user.displayAvatarURL())
      .addFields([
        { name: "Admit users `k.accept/k.approve`", value: "requires `user` argument. Grants admission of users to the server. **use in `qna-` channels if the user has one.**" },
        { name: "Deny entry `k.decline/k.reject`", value: "requires `User` and `reason` argument. Denies entry to the user. **use in `qna-` channels if the user has one.**" },
        { name: "Interrogate users `k.question`", value: "requires `user` argument. Creates a `qna-` channel for the user on the grounds of interrogation." },
        { name: "validate accounts `k.validate`", value: "requires `user` argument. Validates a recently made account to allow them to apply through FDevs Security." },
        { name: "whitelist users `k.passport`", value: "Opens the PassPort System, a special system that grants bypass from the security's Age Gating system (for genuine accounts made too recently)" },
      ])
      .setTimestamp()
      .setFooter({ text: "Staff Handbook - FurDevs", iconURL: interaction.client.user.avatarURL() })

    await interaction.user.send({ embeds: [process, cmds] }).catch(() => interaction.update({ content: "Your DMs are closed! Please keep them open so i can send you the commands.", embeds: [], components: [] }))
    await interaction.update({ content: "Handbook on FDevs Security has been sent to your DMs~!", embeds: [], components: [] })
  }
}