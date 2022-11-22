const Database = require("@replit/database")
const db = new Database()

module.exports = {
  name: 'processor.js',
  async execute(interaction) {

    if (interaction.customId == 'staffapp01') {

      let ina1 = await interaction.fields.getTextInputValue('in01')
      let ina2 = await interaction.fields.getTextInputValue('in02')
      let ina3 = await interaction.fields.getTextInputValue('in03')

      let idreg = 'app01-' + interaction.user.id

      let mucacha = {}
      mucacha['name'] = interaction.user.username + '#' + interaction.user.discriminator
      mucacha['id'] = interaction.user.id
      mucacha['app01a1'] = ina1
      mucacha['app01a2'] = ina2
      mucacha['app01a3'] = ina3

      await db.delete(idreg)
      await db.set(idreg, mucacha)
      await interaction.reply({ content: "Congrats! Your Part 01 is now saved. Please answer the remaining parts." })
      return
    }

    if (interaction.customId == 'staffapp02') {

      let pua1 = await interaction.fields.getTextInputValue('pu01')
      let pua2 = await interaction.fields.getTextInputValue('pu02')
      let pua3 = await interaction.fields.getTextInputValue('pu03')
      let pua4 = await interaction.fields.getTextInputValue('pu04')
      let pua5 = await interaction.fields.getTextInputValue('pu05')

      let idreg2 = 'app02-' + interaction.user.id

      let mucacha2 = {}
      mucacha2['name'] = interaction.user.username + '#' + interaction.user.discriminator
      mucacha2['id'] = interaction.user.id
      mucacha2['app02a1'] = pua1
      mucacha2['app02a2'] = pua2
      mucacha2['app02a3'] = pua3
      mucacha2['app02a4'] = pua4
      mucacha2['app02a5'] = pua5

      await db.delete(idreg2)
      await db.set(idreg2, mucacha2)
      await interaction.reply({ content: "Congrats! Your Part 02 is now saved. Please answer the remaining parts." })
      return
    }

    if (interaction.customId == 'staffapp03') {

      let mia1 = await interaction.fields.getTextInputValue('an01')
      let mia2 = await interaction.fields.getTextInputValue('an02')
      let mia3 = await interaction.fields.getTextInputValue('an03')
      let mia4 = await interaction.fields.getTextInputValue('an04')
      let mia5 = await interaction.fields.getTextInputValue('an05')

      let idreg3 = 'app03-' + interaction.user.id

      let mucacha3 = {}
      mucacha3['name'] = interaction.user.username + '#' + interaction.user.discriminator
      mucacha3['id'] = interaction.user.id
      mucacha3['app03a1'] = mia1
      mucacha3['app03a2'] = mia2
      mucacha3['app03a3'] = mia3
      mucacha3['app03a4'] = mia4
      mucacha3['app03a5'] = mia5

      //break;
      await db.delete(idreg3)
      await db.set(idreg3, mucacha3)
      await interaction.reply({ content: "Congrats! Your Part 03 is now saved. Please answer the remaining parts." })
      return
    }

    if (interaction.customId == 'staffapp04') {

      let apa1 = await interaction.fields.getTextInputValue('essay')
      let apa2 = await interaction.fields.getTextInputValue('optionalinfo')

      let idreg4 = 'app04-' + interaction.user.id

      let mucacha4 = {}
      mucacha4['name'] = interaction.user.username + '#' + interaction.user.discriminator
      mucacha4['id'] = interaction.user.id
      mucacha4['app04a1'] = apa1
      mucacha4['app04a2'] = apa2

      await db.delete(idreg4)
      await db.set(idreg4, mucacha4)
      await interaction.reply({ content: "Congrats! Your Part 04 is now saved. Please answer the remaining parts." })
      return
    }
  }
}