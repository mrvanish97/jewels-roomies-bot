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

exports.makeHui = makeHui