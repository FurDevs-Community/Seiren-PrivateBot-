const appbuttonmanager = require('../functions/staffapps/buttonmanager.js')//FDevSAE Buttons
const appmanager = require('../functions/staffapps/processor.js') //FDevSAE app manager
const asfdevsbutton = require('../functions/supportsys/supportmanager.js')//ASFDevs Buttons
const modalfix = require('../functions/supportsys/supportmodal.js') //ASFDevs Modals
const staffassist = require('../functions/staffpanel/helpmanager.js') //FDevStaffTeam buttons (help)
const decideforme = require('../functions/verification/verification.js') //FDevs Security
const lemodal = require('../functions/verification/verifymodal.js') //FDevs Security modal (verify button)
const reasoning = require('../functions/verification/reasonyeet.js')//FDevs Security Reason updates
const finishdis = require('../functions/verification/wrapup.js') //Wrap it up! FDevs Security

const { InteractionType } = require('discord.js')

module.exports = {
  name: "interactionCreate",
  async execute(interaction) {

    if (interaction.isButton()) {
      //check if it is for verification purposes
      if(interaction.customId == 'beginverify'){
        await lemodal.execute(interaction)
      }
      //check if is FDevSAE
      let stafap = new Array('beginapps', 'beginap01', 'beginap02', 'beginap03', 'beginap04', 'cancelap', 'submitap', 'iquit', 'lesgoo', 'holdon', 'submitnow')
      let stafapcheck = stafap.includes(interaction.customId)
      if (stafapcheck) {
        await appbuttonmanager.execute(interaction)
      }
      //check if it is ASFDevs
      let punyeta = new Array('partnership', 'affiliate', 'report', 'instructorApp', 'custom', 'appeal', 'cancelsupport')
      let supportcheck = punyeta.includes(interaction.customId)
      if(supportcheck){
        await asfdevsbutton.execute(interaction)
      }
      //check if it is Staff Panel Assist
      let growlithe = new Array('cancelhelp', 'tickethelp', 'verificationhelp', 'moderationhelp', 'policyhelp')
      let arcanine = growlithe.includes(interaction.customId)
      if(arcanine){
        staffassist.execute(interaction)
      } else {
        decideforme.execute(interaction)
      }
    }

    if (interaction.type === InteractionType.ModalSubmit) {
      //check if it is a new application
      if(interaction.customId == 'appfirstset'){
        await finishdis.execute(interaction)
      }
      //check if it is FDevs Security wanting to ban
      let verban = new Array('kickem', 'banem', 'denyem')
      let vibecheck = verban.includes(interaction.customId)
      if (vibecheck) {
        reasoning.execute(interaction)
      }
      //check if it is ASFDevs
      let ohai = new Array ('AffiliateRequest', 'PartnerRequest', 'CustomQuery')
      let iaoh = ohai.includes(interaction.customId)
      if(iaoh){
        await modalfix.execute(interaction)
      } else {
        await appmanager.execute(interaction)
      }
    }
    if (interaction.type !== InteractionType.ApplicationCommand) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'There was an error while executing this command! If this persists, please contact any available staff.', ephemeral: true });
    }
  }
}