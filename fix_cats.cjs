const fs = require('fs');
let content = fs.readFileSync('src/i18n/config.ts', 'utf8');

// Replace everything between parentheses for lines that start with "Cat" but not "Cat*Desc"
content = content.replace(/"(Cat(?!.*Desc)[a-zA-Z0-9_]+)":\s*"([^"]*)\s+\([^)]+\)"/g, '"$1": "$3"');

fs.writeFileSync('src/i18n/config.ts', content);
