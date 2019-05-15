const Telegraf = require('telegraf')

let lastWord

const russianVowels = [
  'а',
  'и',
  'о',
  'э',
  'у',
  'я',
  'ы',
  'ё',
  'e',
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
      return 'Хуэ'
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

const makeHui = string => string
  .split(' ')
  .map(convertWord)
  .join(' ')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start(({ reply }) => reply('Hi'))
bot.hears(/^/, ({ message }) => {
  lastWord = message
})
bot.command('hui', ({ reply }) => lastWord && reply(makeHui(lastWord)))
bot.launch() 
