const Telegraf = require('telegraf')

const russianVowels = [
  'а',
  'и',
  'о',
  'э',
  'у',
  'я',
  'ы',
  'ё',
  'е',
  'ю',
]

const convertVowel = vowel => {
  switch (vowel) {
    case 'а':
      return 'Хуя'
    case 'о':
      return 'Хуё'
    case 'э':
      return 'Хуэ'
    case 'у':
      return 'Хую'
    default:
      return `Ху${vowel}`
  }
}

const convertWord = word => {
  const vowelNum = word
    .toLowerCase()
    .split('')
    .findIndex(elem => russianVowels.includes(elem))
  if (vowelNum !== -1) {
    const convertedVowel = convertVowel(word.toLowerCase().charAt(vowelNum))
    const removedFirst = word.slice(vowelNum + 1)
    return convertedVowel + removedFirst
  } else {
    return `Ху${word.toLowerCase()}`
  }
}

const makeHui = string => {
  const sentence = string.split(' ')
  const lastWord = sentence[sentence.length - 1]
  return convertWord(lastWord)
}

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