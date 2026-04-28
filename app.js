const path = require('path');

const { readFile } = require('./reader');
const { getWords, getFrequency, getTop10 } = require('./analyzer');
const { cleanText } = require('./utils');
const fs = require('fs/promises');

const inputPath = path.join(__dirname, 'quijote.txt');
const outputPath = path.join(__dirname, 'resultado.txt');

async function appendResult(content) {
  await fs.appendFile(outputPath, content + '\n', 'utf-8');
}

async function main() {
  try {
    const rawText = await readFile(inputPath);

    // 📌 Limpieza global (para mostrar en resultados)
    const cleanedText = cleanText(rawText);

    const words = getWords(rawText);
    const freq = getFrequency(words);
    const top10 = getTop10(freq);

    const now = new Date().toLocaleString();

    let result = `\n=== RESULTADO ${now} ===\n`;
    result += `\nTEXTO LIMPIO:\n${cleanedText.slice(0, 200)}...\n`;
    result += `\nTOTAL PALABRAS (>4 letras): ${words.length}\n`;
    result += `\nTOP 10 PALABRAS:\n`;

    top10.forEach(([word, count]) => {
      result += `- ${word}: ${count}\n`;
    });

    await appendResult(result);

    console.log('✔ Resultado guardado en archivo');
  } catch (err) {
    console.error('Error:', err.message);
  }
}

main();
