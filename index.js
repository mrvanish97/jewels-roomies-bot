const Telegraf = require('telegraf')
const { makeHui } = require('./make-hui.js')

const bot = new Telegraf(process.env.BOT_TOKEN)

let lastWordByChat = {}

bot.context.db = {
  getLastMessageTextByChatId: id => lastWordByChat[id],
  setLastMessageTextByChatId: (id, text) => lastWordByChat[id] = text
}

bot.start(({ reply }) => reply('Hi'))

bot.on('inline_query', ctx => {
  const query = ctx.update.inline_query.query
  
})

bot.command('hui', async ({ reply, db, message }) => {
  reply(makeHui(db.getLastMessageTextByChatId(message.chat.id)))
})
bot.hears(/максим/i, ({ reply }) => reply('ПАНК'))


bot.on('text', async ({ message, db }) => {
  db.setLastMessageTextByChatId(message.chat.id, message.text)
})

bot.launch()


//console.log(makeHui('Привет сосать'))