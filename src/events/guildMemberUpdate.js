const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const Database = require("@replit/database")
const db = new Database()

module.exports = {
  name: "guildMemberUpdate",
  async execute(member) {
    //Comply with gate by Discord
    if (member.pending === true) {

      const role1 = member.guild.roles.cache.find(r => r.id === "SILENCED"); //quarantine role
      const role2 = member.guild.roles.cache.find(r => r.id === "UNVERIFIED"); //Unverified role
      const silenced = member.guild.channels.cache.find(c => c.id === "MUTE_SIL_AREA") //QUARANTINE CHANNEL
      const errorLog = member.guild.channels.cache.find(c => c.id === "ERR_LOG_CHNL") //If something went wrong
      var Logging = member.client.channels.cache.find(c => c.id === "STAFF_LOG_CHNL") //Logs bans

      var ono = new EmbedBuilder()
        .setAuthor({ name: member.client.user.username, iconURL: member.client.user.avatarURL() })
        .setColor('#be1919')
        .setTitle('Penalty Notice - FurDevs')
        .setDescription("Your punishment has been updated in FurDevs.")
        .addFields([
          { name: "Punishment type:", value: "Ban" },
          { name: "Reason:", value: "[Automod] Account age is too recent (precautionary)! If you think this is a mistake, please contact us as soon as possible so we can work it out immediately." },
        ])
        .setTimestamp()
        .setFooter({ text: 'Staff Team - FurDevs', iconURL: member.client.user.avatarURL() });

      var Appeal = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setURL('https://tripetto.app/run/JQLIZESAA9') //Official Appeal form. If you are looking at our repo and wanted to appeal, go here.
            .setLabel('You can appeal this case here!')
        )

      var Log = new EmbedBuilder()
        .setAuthor({ name: member.client.user.username, iconURL: member.client.user.avatarURL() })
        .setColor('#be1919')
        .setTitle('Report Log - FurDevs')
        .setDescription("An action has been taken by this bot in FurDevs.")
        .addFields([
          { name: "Punishment type:", value: "Ban" },
          { name: "target:", value: `${member.user.username}#${member.user.discriminator} ` + `(UID: ${member.id})` },
          { name: "Reason:", value: "[Automod] Account age below danger threshold (3 days). User can appeal when mistake has occured." },
          { name: "Action made by:", value: `${member.client.user.username}#${member.client.user.discriminator} ` + `(UID: ${member.client.user.id})` },
        ])
        .setTimestamp()
        .setFooter({ text: 'Staff Team - FurDevs', iconURL: member.client.user.avatarURL() });

      let banReason = "[Automod] Account made too recently. (precautionary) | FurDevs"

      const accAge = Date.now() - member.user.createdAt

      //check raidMode

      let isRaidMode = await db.get('raidmode')
      if (isRaidMode == 'true') {
        if (accAge < 1000 * 60 * 60 * 24 * 03) {

          let hmmcheck = 'ps-' + member.id
          //check if user is exempted by the passport system
          let okaycheck = await db.get(`${hmmcheck}`)

          if (!okaycheck) {
            await member.send({ embeds: [ono], components: [Appeal] }).catch(() => errorLog.send("Alert! User account is below the danger threshold and cannot be DMed. Resolving promise and proceeding with available action."))
            await member.ban({ reason: banReason })
            await Logging.send({ embeds: [Log] })
            return;
          }

          var UnbanLog = new EmbedBuilder()
            .setAuthor({ name: member.client.user.username, iconURL: member.client.user.avatarURL() })
            .setColor('#ffe014')
            .setTitle('Report Log - FurDevs')
            .setDescription("An action has been taken by this bot in FurDevs.")
            .addFields([
              { name: "Action type:", value: "Remove from Passport System" },
              { name: "Passport ID:", value: `${hmmcheck}` },
              { name: "Reason:", value: "[PassportSys] User is exempted. Their information will now be wiped from the passport database." },
              { name: "Action made by:", value: `${member.client.user.username}#${member.client.user.discriminator} ` + `(UID: ${member.client.user.id})` },
            ])
            .setTimestamp()
            .setFooter({ text: 'PassPort System - FurDevs', iconURL: member.client.user.avatarURL() });

          try {
            await member.roles.add(role1);
            await member.roles.add(role2);
            await silenced.send({ content: `Good day, <@${member.user.id}> ! Your account has been quarantined due to being made too recently. Here is the question I would like to ask you while we wait for staff:\n\n> What is a fandom, and what does one usually do in a fandom? (3-5 sentences)` });
            db.delete(`${hmmcheck}`)
            Logging.send({ embeds: [UnbanLog] })
            return;
          } catch (err) {
            errorLog.send("Fatal Error: Member not Found... it could either be that the member left the guild, or I just can't find it. Likely the first one. If that's not the case and the issue persists, please contact Onekiguwolf#4859 ASAP.")
            return;
          }
        }
        if (accAge >= 1000 * 60 * 60 * 24 * 03 && accAge < 1000 * 60 * 60 * 24 * 10) {
          try {
            await member.roles.add(role1);
            await member.roles.add(role2);
            silenced.send({ content: `Good day, <@${member.user.id}> ! Your account has been quarantined due to being made too recently. Here is the question I would like to ask you while we wait for staff:\n\n> What is a fandom, and what does one usually do in a fandom? (3-5 sentences)` });
            silenced.send({ content: "Do answer the said questions and wait for further notice. We thank you for your patience!" })
            return
          } catch (err) {
            await errorLog.send("Red flag! I can't add roles to a user that isn't there. If the user *is* there somehow, and this error keeps happening, notify Kigu ASAP.")
            return
          }
        }
      }

      try {
        await member.roles.add(role2);
        return
      } catch (err) {
        errorLog.send("Red flag! I can't add roles to a user that isn't there. If the user *is* there somehow, and this error keeps happening, notify Kigu ASAP.")
        return
      }
    }
  }
}