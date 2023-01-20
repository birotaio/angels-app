const fs = require('fs');
const locales = require('../src/assets/locales/fr.json');

const keys = Object.keys(locales);
var exportString = 'export type TranslateKeyProps =\n';

keys.forEach(key => {
  exportString += `  | '${key}'\n`;
});

fs.writeFileSync('src/assets/locales/locale.ts', exportString);
