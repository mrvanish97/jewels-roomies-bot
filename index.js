const Telegraf = require('telegraf')
const { makeHui } = require('./make-hui.js')

const bot = new Telegraf(process.env.BOT_TOKEN)

const lastWordByChat = {}

bot.context.db = {
  getLastMessageTextByChatId: id => lastWordByChat[id],
  setLastMessageTextByChatId: (id, text) => lastWordByChat[id] = text
}

bot.start(({ reply }) => reply('Hi'))

bot.command('hui', async ({ reply, db, message }) => {
    reply(makeHui(db.getLastMessageTextByChatId(message.chat.id) || 'й'))
})

/* bot.hears(/^/, ({ message }) => {
  lastWord = message.text
  console.log(lastWord)
}) */

bot.on('text', async ({ message, db }) => {
  db.setLastMessageTextByChatId(message.chat.id, message.text)
})

bot.launch()


//console.log(makeHui('Привет сосать'))