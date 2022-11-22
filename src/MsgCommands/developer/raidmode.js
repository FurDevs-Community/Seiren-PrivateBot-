const Database = require('@replit/database')
const db = new Database()

module.exports = {
  name: 'raidmode',
  async execute(message, args) {
    let botDev = process.env.BOT_OWNER
    if (message.author.id !== botDev) return

    let status = args[0]

    if (status == "true") {
      await message.reply('Raid Mode is active! Autobanning accounts whose creation date is less than 3 days!')
      let dbstatus = {}
      dbstatus['status'] = status
      await db.set('raidmode', dbstatus)
    } else
      if (status == "false") {
        await message.reply('Raid Mode is disabled! Have an awesome day!')
        let dbstatus = {}
        dbstatus['status'] = status
        await db.set('raidmode', dbstatus)
      } else {
        let hija = await db.get('raidmode')
        await message.reply(`Raid Mode status is: ${hija.status}`)
      }
  }
}