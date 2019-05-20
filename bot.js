const token = process.env.BOT_TOKEN

const Bot = require('telegraf')
const { makeHui } = require('./make-hui')
let bot

if(process.env.NODE_ENV === 'production') {
  bot = new Bot(token)
  bot.telegram.setWebhook(process.env.HEROKU_URL + bot.token)
}
else {
  bot = new Bot(token, { polling: true })
}

console.log('Bot server started in the ' + process.env.NODE_ENV + ' mode')

let lastWordByChat = {}

bot.context.db = {
  getLastMessageTextByChatId: id => lastWordByChat[id],
  setLastMessageTextByChatId: (id, text) => lastWordByChat[id] = text
}

bot.start(({ reply }) => reply('Hi'))

/* bot.on('inline_query', ctx => {
  const query = ctx.update.inline_query.query
}) */

bot.command('hui', async ({ reply, db, message }) => {
  reply(makeHui(db.getLastMessageTextByChatId(message.chat.id)))
})
bot.hears(/максим/i, ({ reply }) => reply('ПАНК'))


bot.on('text', async ({ message, db }) => {
  db.setLastMessageTextByChatId(message.chat.id, message.text)
})

bot.launch()

module.exports = {
  bot
}
