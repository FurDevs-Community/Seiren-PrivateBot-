const { EmbedBuilder } = require('discord.js')

module.exports = {
  name: 'staffpanel',
  async execute(interaction) {
    const genhelp = new EmbedBuilder()
      .setAuthor({ name: interaction.client.user.username, iconURL: interaction.client.user.avatarURL() })
      .setColor('#E0B0FF')
      .setTitle("Handbook - Staff Policies")
      .setDescription("Welcome to the FurDevs Staff Team! As staff, the management of FurDevs lies on your very hands. I am here to tell you about simple concepts to learn your way around the place!")
      .addFields([
        { name: "With power comes responsibility.", value: "As a staff member, the policy indicates no clear course of action for every scenario. Each staff member are at their liberty to take the most appropriate response to any request, be it anyone violating the rules. When taking action, it is asked that you are to make a quick log of your actions so we can keep track of what is happening and if there are slight misfires that are needed to address. This also applies in understanding information, and in checking which information must not be disclosed.\n\nServer Members and other staff have the right to report any malicious activity within the staff team directly to the Managers." },
        { name: "Unity is key.", value: "Staff are not expected to be always active, and your health matters above all. If you needed a break, please inform us in the staff chats so we know that you needed space to focus on what matters for you. Members may take a break as long as we are informed on when they would come back to service or have a justifiable reason. Furthermore, boundaries are needed to prevent any sort of bias from happening between your friends and your profession as staff." },
        { name: "Lastly, uphold honor and respect.", value: "Not everyone came from the same world as we are. As staff, it is expected that you must make a clear understanding of the situation, assess proper action with respect to the standings of both parties, and make a path moving forward. Everyone has the right to be respected, regardless of origin." },
      ])
      .setTimestamp()
      .setFooter({ text: "Staff Handbook - FurDevs", iconURL: interaction.client.user.avatarURL() })

    await interaction.user.send({ embeds: [genhelp] }).catch(() => interaction.update({ content: "Your DMs are closed! Please keep them open so i can send you the details.", embeds: [], components: [] }))
    await interaction.update({ content: "Handbook on Consortium Policies has been sent to your DMs~!", embeds: [], components: [] })
  }
}