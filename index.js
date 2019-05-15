const Telegraf = require('telegraf')

/* bot.context.db = {
  getJokeBySender: sender => `${(sender === 'Neksus_5' ? 'ТЫ' : 'МАКСИМ')} ПАНК`
} */

const bot = new Telegraf(process.env.BOT_TOKEN)
//bot.command('joke', ({ reply }) => reply('МАКСИМ ПАНК'))
bot.hears(new RegExp('[\\?&]' + 'Максим' + '=([^&#]*)', 'i'), ({reply}) => reply('ПАНК'))
bot.launch()