const mod = require('./moderation.js')
const policies = require('./policies.js')
const ascfs = require('./tickets.js')
const saecfs = require('./verification.js')

module.exports = {
  name: 'helpmanager',
  async execute(interaction){

    if(interaction.customId == "moderationhelp"){
      await mod.execute(interaction)
    }
    if(interaction.customId == "policyhelp"){
      await policies.execute(interaction)
    }
    if(interaction.customId == "tickethelp"){
      await ascfs.execute(interaction)
    }
    if(interaction.customId == "verificationhelp"){
      await saecfs.execute(interaction)
    }
    if(interaction.customId == "cancelhelp"){
      await interaction.update({content: "Staff Help Panel closed!", embeds:[], components:[]})
    }
  }
}