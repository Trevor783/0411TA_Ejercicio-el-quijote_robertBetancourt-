function cleanText(text) {
  return text
    .toLowerCase()
    .replace(/[^\wáéíóúüñ\s]/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
}

module.exports = {
  cleanText
};
