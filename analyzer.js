const { cleanText } = require('./utils');

function getWords(text) {
  const cleaned = cleanText(text);

  return cleaned
    .split(' ')
    .filter(word => word.length > 4);
}

function getFrequency(words) {
  const freq = {};

  for (const word of words) {
    freq[word] = (freq[word] || 0) + 1;
  }

  return freq;
}

function getTop10(freq) {
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
}

module.exports = {
  getWords,
  getFrequency,
  getTop10
};
