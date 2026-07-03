const fs = require('fs');
let content = fs.readFileSync('build_all.cjs', 'utf8');

// Replace any occurrence of " (Some Text)" inside the category keys
content = content.replace(/:\s*"([^"]*?)\s+\([^)]+\)"/g, ': "$1"');
content = content.replace(/=\s*"([^"]*?)\s+\([^)]+\)"/g, '= "$1"');

fs.writeFileSync('build_all.cjs', content);
