const fs = require('fs');

const file = 'src/pages/user/ToolPage.tsx';
let content = fs.readFileSync(file, 'utf8');

// The new cases to add to DiagnosticHub
const toAddDiagHub = [
  'diag-mod12',
  'diag-elemental-dysfunction',
  'diag-suhuf',
  'diag-temporal',
  'diag-fengshui',
  'diag-rizq',
  'diag-dreams',
  'diag-night-third',
  'diag-property-harmony',
  'diag-seasonal',
  'diag-hijama',
  'diag-bukhoor',
  'diag-aptitude',
  'diag-georesonance',
  'diag-niyyah',
  'diag-eclipse'
];

// Actually they are already added to DiagHub. Let's add remaining to placeholder or Generic categories.
const astroCases = `
      case 'astro-planet-day':
      case 'astro-lunar-mansions':
      case 'astro-ascendant':
      case 'astro-fullmoon':
      case 'astro-conjunctions':
      case 'astro-void-moon':
      case 'astro-zodiac-entry':
      case 'astro-lunar-element':
      case 'astro-12-houses':
      case 'astro-decans':
      case 'astro-mercury-retrograde':
      case 'astro-lunar-azimuth':
        return <DiagnosticHub initialToolId={tool.id} />;
`;

const tabaiCases = `
      case 'tabai-couple':
      case 'tabai-balance':
      case 'tabai-thermal':
      case 'tabai-compass':
      case 'tabai-day':
      case 'tabai-conflict':
      case 'tabai-synergy':
      case 'tabai-neutralize':
        return <DiagnosticHub initialToolId={tool.id} />;
`;

const hurufCases = `
      case 'huruf-takseer':
      case 'huruf-nuraniyyah':
      case 'huruf-zulmaniyyah':
      case 'huruf-roots':
      case 'huruf-seal':
      case 'huruf-imtizaj':
      case 'huruf-dominant':
      case 'huruf-secret-value':
      case 'huruf-zairjah':
      case 'huruf-golden-ratio':
      case 'huruf-shape':
      case 'huruf-anagram':
        return <DiagnosticHub initialToolId={tool.id} />;
`;

const ritualCases = `
      case 'ritual-multipliers':
      case 'ritual-weekly':
      case 'ritual-zakat':
      case 'ritual-fasting':
      case 'ritual-verse-timing':
      case 'ritual-inqadh':
      case 'ritual-separator':
      case 'ritual-tracker':
      case 'ritual-salawat':
      case 'ritual-istighfar':
      case 'ritual-ruqyah':
      case 'ritual-hissn':
      case 'ritual-group':
        return <DiagnosticHub initialToolId={tool.id} />;
`;

content = content.replace(
  "case 'diag-mod9':",
  `${astroCases}\n${tabaiCases}\n${hurufCases}\n${ritualCases}\n      case 'diag-mod9':`
);

fs.writeFileSync(file, content);
