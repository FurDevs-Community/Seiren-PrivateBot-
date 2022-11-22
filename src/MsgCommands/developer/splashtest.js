const imgur = require('../../functions/canvacreate.js')

module.exports = {
  name: 'splashtest',
  async execute(message) {
    let botDev = process.env.BOT_OWNER
    if (message.author.id !== botDev) return

    let member = await message.guild.members.cache.get(`${botDev}`)
    let atta = await imgur.execute(member)
    await message.reply({ content: 'Welcome Splash test!', files: [atta] })
  }
}