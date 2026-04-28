const fs = require('fs/promises');

async function readFile(path) {
  return await fs.readFile(path, 'utf-8');
}

module.exports = {
  readFile
};
