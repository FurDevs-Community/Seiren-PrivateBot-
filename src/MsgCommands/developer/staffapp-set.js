const Database = require('@replit/database')
const db = new Database()

module.exports = {
  name: 'staffapp-set',
  async execute(message, args) {
    let botDev = process.env.BOT_OWNER
    if (message.author.id !== botDev) return

    let status = args[0]

    if (status == "true") {
      await message.reply('Staff Apps are activated! (in-server System)')
      let dbstatus = {}
      dbstatus['status'] = status
      await db.set('staffappstatus', dbstatus)
    } else
      if (status == "false") {
        await message.reply('Staff Apps are deactivated! (in-server System)')
        let dbstatus = {}
        dbstatus['status'] = status
        await db.set('staffappstatus', dbstatus)
      } else {
        let hija = await db.get('staffappstatus')
        await message.reply(`The status of the In-server Staff Apps System is: ${hija.status}`)
      }
  }
}