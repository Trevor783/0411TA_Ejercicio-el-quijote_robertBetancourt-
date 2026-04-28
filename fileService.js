const fs = require('fs/promises');

async function readFileContent(path) {
  return await fs.readFile(path, 'utf-8');
}

function countCharacters(text) {
  return text.length;
}

// 🔤 Contar palabras
function getWords(text) {
  const cleaned = cleanText(text);

  return cleaned
    .split(/\s+/)
    .filter(word => word.length > 4);
}

// 🚫 Stopwords básicas
const stopwords = new Set([
  'el','la','los','las','de','del','y','a','en','que','un','una','unos','unas',
  'con','por','para','es','al','lo','como','más','pero','sus','le','ya','o',
  'este','sí','porque','esta','entre','cuando','muy','sin','sobre','también',
  'me','hasta','hay','donde','quien','desde','todo','nos','durante','todos',
  'uno','les','ni','contra','otros','ese','eso','ante','ellos','e','esto',
  'mí','antes','algunos','qué','unos','yo','otro','otras','otra','él','tanto',
  'esa','estos','mucho','quienes','nada','muchos','cual','poco','ella','estar',
  'estas','algunas','algo','nosotros','mi','mis','tú','te','ti','tu','tus'
]);

// 📊 Contar frecuencia
function getWordFrequency(words) {
  const freq = {};

  for (const word of words) {
    if (!stopwords.has(word)) {
      freq[word] = (freq[word] || 0) + 1;
    }
  }

  return freq;
}

// 🏆 Top 10
function getTopWords(freq, limit = 10) {
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit);
}

// 📝 Append (NO sobreescribe)
async function appendResult(path, content) {
  await fs.appendFile(path, content + '\n', 'utf-8');
}

module.exports = {
  readFileContent,
  countCharacters,
  getWords,
  getWordFrequency,
  getTopWords,
  appendResult
};
