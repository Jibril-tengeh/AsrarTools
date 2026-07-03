const fs = require('fs');

const categories = [
  { id: 'cat-abjad', nameKey: 'CatAbjad', descriptionKey: 'CatAbjadDesc', iconName: 'Hash' },
  { id: 'cat-wafq', nameKey: 'CatWafq', descriptionKey: 'CatWafqDesc', iconName: 'Grid3x3' },
  { id: 'cat-astrology', nameKey: 'CatAstrology', descriptionKey: 'CatAstrologyDesc', iconName: 'Compass' },
  { id: 'cat-tabai', nameKey: 'CatTabai', descriptionKey: 'CatTabaiDesc', iconName: 'Flame' },
  { id: 'cat-huruf', nameKey: 'CatHuruf', descriptionKey: 'CatHurufDesc', iconName: 'Type' },
  { id: 'cat-rituals', nameKey: 'CatRituals', descriptionKey: 'CatRitualsDesc', iconName: 'Activity' },
  { id: 'cat-diag', nameKey: 'CatDiag', descriptionKey: 'CatDiagDesc', iconName: 'Shield' }
];

const rawTools = [
  { id: 'abjad-kabir', cat: 'cat-abjad', icon: 'Calculator', fr: ['Calculateur d\'Abjad Kabir', 'Convertit le texte arabe avec le barème standard (1 à 1000).'] },
  { id: 'abjad-saghir', cat: 'cat-abjad', icon: 'Minimize2', fr: ['Calculateur d\'Abjad Saghir', 'Valeurs réduites par modulo 9 ou 12.'] },
  { id: 'abjad-wasat', cat: 'cat-abjad', icon: 'Scale', fr: ['Calculateur d\'Abjad Wasat', 'Système de calcul intermédiaire par paliers.'] },
  { id: 'abjad-maghribi', cat: 'cat-abjad', icon: 'Calculator', fr: ['Calculateur d\'Abjad Maghribi', 'Ordre d\'Afrique du Nord (Sad, Dad différents).'] },
  { id: 'abjad-mashriqi', cat: 'cat-abjad', icon: 'Calculator', fr: ['Calculateur d\'Abjad Mashriqi', 'Ordre standard du Proche-Orient.'] },
  { id: 'abjad-theosophic', cat: 'cat-abjad', icon: 'Hash', fr: ['Réduction Théosophique', 'Réduit le grand nombre à un chiffre (1-9).'] },
  { id: 'abjad-consonants', cat: 'cat-abjad', icon: 'Filter', fr: ['Extracteur de Consonnes Pures', 'Ignore les voyelles de prolongement.'] },
  { id: 'abjad-inverse', cat: 'cat-abjad', icon: 'RefreshCcw', fr: ['Abjad Inversé (Ma\'koos)', 'Valeur de l\'alphabet inversée.'] },
  { id: 'abjad-diacritics', cat: 'cat-abjad', icon: 'MoreHorizontal', fr: ['Convertisseur de Points', 'Calcule selon le nombre de points diacritiques.'] },
  { id: 'abjad-pronouns', cat: 'cat-abjad', icon: 'UserMinus', fr: ['Abjad des Pronoms', 'Exclut/inclut sélectivement les pronoms personnels.'] },
  { id: 'abjad-position', cat: 'cat-abjad', icon: 'ListOrdered', fr: ['Pondérateur de Position', 'Multiplie la valeur par l\'index de la lettre.'] },
  { id: 'abjad-palindrome', cat: 'cat-abjad', icon: 'ArrowLeftRight', fr: ['Palindromes Numériques', 'Vérifie la symétrie numérique gauche/droite.'] },
  { id: 'abjad-muqattaat', cat: 'cat-abjad', icon: 'Book', fr: ['Lettres Isolées (Muqatta\'at)', 'Calcul pour les 14 lettres mystérieuses du Coran.'] },
  { id: 'abjad-mother', cat: 'cat-abjad', icon: 'Users', fr: ['Nom de la Mère (Ism al-Umm)', 'Empreinte spirituelle avec le nom de la mère.'] },
  { id: 'abjad-synonym', cat: 'cat-abjad', icon: 'CheckDouble', fr: ['Synonymie Numérique', 'Vérifie si deux textes ont la même valeur.'] },

  { id: 'wafq-3x3', cat: 'cat-wafq', icon: 'Grid3x3', fr: ['Wafq Muthallath (3x3)', 'Grille magique à 9 cases.'] },
  { id: 'wafq-4x4', cat: 'cat-wafq', icon: 'Grid', fr: ['Wafq Murabba\'a (4x4)', 'Grille magique à 16 cases.'] },
  { id: 'wafq-5x5', cat: 'cat-wafq', icon: 'Grid', fr: ['Wafq Mukhammas (5x5)', 'Grille magique à 25 cases.'] },
  { id: 'wafq-6x6', cat: 'cat-wafq', icon: 'Grid', fr: ['Wafq Musaddas (6x6)', 'Grille magique à 36 cases.'] },
  { id: 'wafq-7x7', cat: 'cat-wafq', icon: 'Grid', fr: ['Wafq Musabba\'a (7x7)', 'Grille magique à 49 cases (7 planètes).'] },
  { id: 'wafq-8x8', cat: 'cat-wafq', icon: 'Grid', fr: ['Wafq Muthamman (8x8)', 'Grille magique à 64 cases.'] },
  { id: 'wafq-9x9', cat: 'cat-wafq', icon: 'Grid', fr: ['Wafq Mutassa\'a (9x9)', 'Grille magique à 81 cases.'] },
  { id: 'wafq-10x10', cat: 'cat-wafq', icon: 'Grid', fr: ['Wafq Mu\'ashar (10x10)', 'Grille magique à 100 cases.'] },
  { id: 'wafq-hollow', cat: 'cat-wafq', icon: 'Square', fr: ['Khali al-Wast (Cœur vide)', 'Carré avec centre vide pour un nom.'] },
  { id: 'wafq-sun', cat: 'cat-wafq', icon: 'Sun', fr: ['Wafq du Soleil (Shamsi)', 'Optimisé pour la sphère solaire.'] },
  { id: 'wafq-moon', cat: 'cat-wafq', icon: 'Moon', fr: ['Wafq de la Lune (Qamari)', 'Calibré selon les cycles lunaires.'] },
  { id: 'wafq-validator', cat: 'cat-wafq', icon: 'CheckSquare', fr: ['Correcteur de Grille', 'Vérifie la validité d\'un carré magique.'] },
  { id: 'wafq-literal', cat: 'cat-wafq', icon: 'Type', fr: ['Wafq Littéral', 'Remplace les chiffres par des lettres.'] },
  { id: 'wafq-combined', cat: 'cat-wafq', icon: 'Layers', fr: ['Wafq Combiné', 'Fusionne un Nom Divin et un verset.'] },
  { id: 'wafq-rotation', cat: 'cat-wafq', icon: 'RotateCw', fr: ['Rotation de Wafq', 'Réorganise l\'ordre d\'entrée selon les cardinaux.'] },

  { id: 'astro-hours-day', cat: 'cat-astrology', icon: 'Sun', fr: ['Heures Planétaires Diurnes', '12 heures inégales du jour.'] },
  { id: 'astro-hours-night', cat: 'cat-astrology', icon: 'Moon', fr: ['Heures Planétaires Nocturnes', '12 heures inégales de la nuit.'] },
  { id: 'astro-planet-day', cat: 'cat-astrology', icon: 'Globe', fr: ['Planète du Jour', 'Planète dominante du jour de la semaine.'] },
  { id: 'astro-lunar-mansions', cat: 'cat-astrology', icon: 'Moon', fr: ['28 Demeures Lunaires', 'Position actuelle dans les Manazil.'] },
  { id: 'astro-ascendant', cat: 'cat-astrology', icon: 'ArrowUpCircle', fr: ['Ascendant (Tali\')', 'Estime l\'ascendant astrologique local.'] },
  { id: 'astro-fullmoon', cat: 'cat-astrology', icon: 'Circle', fr: ['Opposition Lumineuse', 'Moments exacts de la Pleine Lune.'] },
  { id: 'astro-conjunctions', cat: 'cat-astrology', icon: 'Link', fr: ['Conjonctions Planétaires', 'Alignement apparent entre planètes.'] },
  { id: 'astro-void-moon', cat: 'cat-astrology', icon: 'CircleDashed', fr: ['Lune Hors Course', 'Périodes sans aspect majeur de la lune.'] },
  { id: 'astro-zodiac-entry', cat: 'cat-astrology', icon: 'Sun', fr: ['Entrée Solaire (Buruj)', 'Passage du Soleil dans un signe.'] },
  { id: 'astro-lunar-element', cat: 'cat-astrology', icon: 'Flame', fr: ['Transit Lunaire par Élément', 'Signe élémentaire actuel de la Lune.'] },
  { id: 'astro-12-houses', cat: 'cat-astrology', icon: 'PieChart', fr: ['Horloge des 12 Maisons', 'Maisons astrologiques traditionnelles.'] },
  { id: 'astro-decans', cat: 'cat-astrology', icon: 'Divide', fr: ['Calculateur des Décans', 'Division en décans de 10 degrés.'] },
  { id: 'astro-faraq-hours', cat: 'cat-astrology', icon: 'Clock', fr: ['Heures de Faraq', 'Périodes neutres ou vides.'] },
  { id: 'astro-mercury-retrograde', cat: 'cat-astrology', icon: 'RotateCcw', fr: ['Rétrogradation de Mercure', 'Mouvement rétrograde d\'Utarid.'] },
  { id: 'astro-lunar-azimuth', cat: 'cat-astrology', icon: 'Compass', fr: ['Azimut Lunaire', 'Direction boussole de la Lune.'] },

  { id: 'tabai-text', cat: 'cat-tabai', icon: 'Flame', fr: ['Analyseur Élémentaire', 'Pourcentage Feu, Terre, Air, Eau.'] },
  { id: 'tabai-personal', cat: 'cat-tabai', icon: 'User', fr: ['Dominance Personnelle', 'Élément dominant (Nom + Mère).'] },
  { id: 'tabai-couple', cat: 'cat-tabai', icon: 'Heart', fr: ['Harmonie Élémentaire', 'Compatibilité entre deux personnes.'] },
  { id: 'tabai-balance', cat: 'cat-tabai', icon: 'Scale', fr: ['Équilibrage Élémentaire', 'Suggère des lettres pour équilibrer.'] },
  { id: 'tabai-thermal', cat: 'cat-tabai', icon: 'Thermometer', fr: ['Classificateur Thermique', 'Chaudes, Froides, Sèches, Humides.'] },
  { id: 'tabai-compass', cat: 'cat-tabai', icon: 'Compass', fr: ['Boussole Élémentaire', 'Direction géographique selon l\'élément.'] },
  { id: 'tabai-day', cat: 'cat-tabai', icon: 'Calendar', fr: ['Élément du Jour', 'Élément prédominant de la date.'] },
  { id: 'tabai-conflict', cat: 'cat-tabai', icon: 'AlertTriangle', fr: ['Détecteur de Conflits', 'Incompatibilités élémentaires.'] },
  { id: 'tabai-synergy', cat: 'cat-tabai', icon: 'Zap', fr: ['Synergie Nom-Projet', 'Ajustements pour accords élémentaires.'] },
  { id: 'tabai-neutralize', cat: 'cat-tabai', icon: 'Shield', fr: ['Filtre de Neutralisation', 'Apaise un excès d\'élément.'] },

  { id: 'huruf-bast-harfi', cat: 'cat-huruf', icon: 'Type', fr: ['Bast al-Harfi', 'Décomposition littérale phonétique.'] },
  { id: 'huruf-bast-adadi', cat: 'cat-huruf', icon: 'Hash', fr: ['Bast al-Adadi', 'Décomposition numérique.'] },
  { id: 'huruf-bast-mixed', cat: 'cat-huruf', icon: 'Shuffle', fr: ['Bast Mixte', 'Alterne étalement littéral et numérique.'] },
  { id: 'huruf-takseer', cat: 'cat-huruf', icon: 'Repeat', fr: ['Takseer (Permutation)', 'Mélange circulaire des lettres.'] },
  { id: 'huruf-nuraniyyah', cat: 'cat-huruf', icon: 'Sun', fr: ['Lettres Lumineuses', 'Filtre des 14 lettres Nuraniyyah.'] },
  { id: 'huruf-zulmaniyyah', cat: 'cat-huruf', icon: 'Moon', fr: ['Lettres Sombres', 'Filtre des 14 lettres Zulmaniyyah.'] },
  { id: 'huruf-roots', cat: 'cat-huruf', icon: 'Code', fr: ['Racines Littérales', 'Racine consonantique étymologique.'] },
  { id: 'huruf-seal', cat: 'cat-huruf', icon: 'Circle', fr: ['Sceau de Lettres', 'Symbole géométrique en cercle.'] },
  { id: 'huruf-imtizaj', cat: 'cat-huruf', icon: 'Merge', fr: ['Fusion Littérale (Imtizaj)', 'Entrelace deux mots lettre par lettre.'] },
  { id: 'huruf-dominant', cat: 'cat-huruf', icon: 'BarChart2', fr: ['Lettre Dominante', 'Fréquence et signification ésotérique.'] },
  { id: 'huruf-secret-value', cat: 'cat-huruf', icon: 'Lock', fr: ['Valeur Secrète', 'Multiplication par la longueur du nom.'] },
  { id: 'huruf-zairja', cat: 'cat-huruf', icon: 'Key', fr: ['Cryptographe (Zairja)', 'Chiffre par décalage d\'Abjad.'] },
  { id: 'huruf-golden-ratio', cat: 'cat-huruf', icon: 'Percent', fr: ['Proportion d\'Or Littérale', 'Évalue la répartition du nombre d\'or.'] },
  { id: 'huruf-shape', cat: 'cat-huruf', icon: 'PenTool', fr: ['Analyseur de Forme', 'Classe selon boucle, verticale, horizontale.'] },
  { id: 'huruf-anagram', cat: 'cat-huruf', icon: 'Scissors', fr: ['Anagrammes Sacrés', 'Recherche des combinaisons de mots.'] },

  { id: 'ritual-planner', cat: 'cat-rituals', icon: 'Calendar', fr: ['Planificateur de Dhikr', 'Calcul de répétitions selon le prénom.'] },
  { id: 'ritual-counter', cat: 'cat-rituals', icon: 'Activity', fr: ['Compteur Intelligent', 'Chapelet avec alerte au nombre précis.'] },
  { id: 'ritual-multipliers', cat: 'cat-rituals', icon: 'X', fr: ['Multiplicateurs Spirituels', 'Coefficients traditionnels (x10, x100).'] },
  { id: 'ritual-weekly', cat: 'cat-rituals', icon: 'CalendarDays', fr: ['Récitation Hebdomadaire', 'Divise un grand calcul sur 7 jours.'] },
  { id: 'ritual-zakat', cat: 'cat-rituals', icon: 'Coins', fr: ['Zakat du Nom', 'Aumône spirituelle accompagnant le calcul.'] },
  { id: 'ritual-fasting', cat: 'cat-rituals', icon: 'Clock', fr: ['Jeûne Temporel', 'Dates idéales pour retraite spirituelle.'] },
  { id: 'ritual-verse-timing', cat: 'cat-rituals', icon: 'Hourglass', fr: ['Timing de Versets', 'Heure de plus forte résonance.'] },
  { id: 'ritual-inqadh', cat: 'cat-rituals', icon: 'AlertOctagon', fr: ['Salat al-Inqadh', 'Distribution horaire d\'urgence.'] },
  { id: 'ritual-separator', cat: 'cat-rituals', icon: 'SplitSquareHorizontal', fr: ['Séparateur de Texte', 'Divise en sections de valeur égale.'] },
  { id: 'ritual-tracker', cat: 'cat-rituals', icon: 'TrendingUp', fr: ['Traqueur de Constance', 'Progression des récitations.'] },
  { id: 'ritual-salawat', cat: 'cat-rituals', icon: 'Heart', fr: ['Salawat Personnalisée', 'Prières harmonisées avec l\'Abjad.'] },
  { id: 'ritual-istighfar', cat: 'cat-rituals', icon: 'RefreshCw', fr: ['Istighfar Compensateur', 'Contrebalance un calcul défavorable.'] },
  { id: 'ritual-ruqyah', cat: 'cat-rituals', icon: 'Shield', fr: ['Répétitions Ruqyah', 'Nombre de lectures pour le soin.'] },
  { id: 'ritual-hissn', cat: 'cat-rituals', icon: 'ShieldAlert', fr: ['Protection (Hissn)', 'Moments de renouvellement énergétique.'] },
  { id: 'ritual-group', cat: 'cat-rituals', icon: 'Users', fr: ['Dhikr de Groupe', 'Cible unifiée pour plusieurs personnes.'] },

  { id: 'diag-mod9', cat: 'cat-diag', icon: 'Activity', fr: ['Diagnostic Reste 9', 'État de santé spirituelle (Modulo 9).'] },
  { id: 'diag-mod12', cat: 'cat-diag', icon: 'Activity', fr: ['Diagnostic Reste 12', 'Maison astrologique de blocage (Modulo 12).'] },
  { id: 'diag-elemental-dysfunction', cat: 'cat-diag', icon: 'Flame', fr: ['Dysfonctionnement Élémentaire', 'Perturbation (Modulo 4).'] },
  { id: 'diag-suhuf', cat: 'cat-diag', icon: 'FileText', fr: ['Recommandation d\'Écritures', 'Textes à écrire selon diagnostic.'] },
  { id: 'diag-temporal', cat: 'cat-diag', icon: 'Clock', fr: ['Influences Temporelles', 'Coïncidence avec heures d\'affliction.'] },
  { id: 'diag-fengshui', cat: 'cat-diag', icon: 'Compass', fr: ['Orientation Spatiale', 'Direction pour méditation (Jihat).'] },
  { id: 'diag-rizq', cat: 'cat-diag', icon: 'Briefcase', fr: ['Rizq Commercial', 'Potentiel d\'attraction du nom d\'entreprise.'] },
  { id: 'diag-dreams', cat: 'cat-diag', icon: 'CloudMoon', fr: ['Décodeur de Rêves', 'Interprétation via l\'Abjad des mots-clés.'] },
  { id: 'diag-night-third', cat: 'cat-diag', icon: 'Moon', fr: ['Tiers de la Nuit', 'Heure du dernier tiers de la nuit.'] },
  { id: 'diag-property-harmony', cat: 'cat-diag', icon: 'Home', fr: ['Harmonie de Biens', 'Compatibilité avec adresse/immatriculation.'] },
  { id: 'diag-seasonal', cat: 'cat-diag', icon: 'CloudRain', fr: ['Impact Saisonnier', 'Effet des saisons sur le tempérament.'] },
  { id: 'diag-hijama', cat: 'cat-diag', icon: 'Droplet', fr: ['Calendrier Hijama', 'Jours optimaux du mois lunaire.'] },
  { id: 'diag-bukhoor', cat: 'cat-diag', icon: 'Wind', fr: ['Encens (Bukhoor)', 'Encens selon la planète de l\'heure.'] },
  { id: 'diag-aptitude', cat: 'cat-diag', icon: 'Star', fr: ['Aptitude Spirituelle', 'Affinité avec les sciences (Qabiliyyah).'] },
  { id: 'diag-georesonance', cat: 'cat-diag', icon: 'MapPin', fr: ['Résonance Géographique', 'Abjad de la ville vs prénom.'] },
  { id: 'diag-niyyah', cat: 'cat-diag', icon: 'Target', fr: ['Intentions (Niyyah)', 'Formulation harmonieuse.'] },
  { id: 'diag-eclipse', cat: 'cat-diag', icon: 'EyeOff', fr: ['Impact d\'Éclipse', 'Impact sur les rituels en cours.'] }
];

// Helper to translate to basic English
function translateToEN(frText) {
  let en = frText
    .replace(/Calculateur d'Abjad/g, 'Abjad Calculator')
    .replace(/Calculateur/g, 'Calculator')
    .replace(/Générateur/g, 'Generator')
    .replace(/Convertisseur/g, 'Converter')
    .replace(/Détecteur/g, 'Detector')
    .replace(/Analyseur/g, 'Analyzer')
    .replace(/Planificateur/g, 'Planner')
    .replace(/Compteur/g, 'Counter')
    .replace(/Traqueur/g, 'Tracker')
    .replace(/Filtre/g, 'Filter')
    .replace(/Grille magique/g, 'Magic grid')
    .replace(/cases/g, 'cells');
  return en;
}

function translateToAR(frText) {
  let ar = frText
    .replace(/Calculateur/g, 'حاسبة')
    .replace(/Générateur/g, 'مولد')
    .replace(/Abjad/g, 'أبجد');
  return ar + ' (AR)';
}

function translateToHA(frText) {
  let ha = frText
    .replace(/Calculateur/g, 'Injin Lissafi')
    .replace(/Abjad/g, 'Abjad');
  return ha + ' (HA)';
}

// Build toolsData.ts
let toolsDataContent = `import { AsrarTool, ToolCategory } from '../types';

export const categories: ToolCategory[] = [
  { id: 'cat-abjad', nameKey: 'CatAbjad', descriptionKey: 'CatAbjadDesc', iconName: 'Hash' },
  { id: 'cat-wafq', nameKey: 'CatWafq', descriptionKey: 'CatWafqDesc', iconName: 'Grid3x3' },
  { id: 'cat-astrology', nameKey: 'CatAstrology', descriptionKey: 'CatAstrologyDesc', iconName: 'Compass' },
  { id: 'cat-tabai', nameKey: 'CatTabai', descriptionKey: 'CatTabaiDesc', iconName: 'Flame' },
  { id: 'cat-huruf', nameKey: 'CatHuruf', descriptionKey: 'CatHurufDesc', iconName: 'Type' },
  { id: 'cat-rituals', nameKey: 'CatRituals', descriptionKey: 'CatRitualsDesc', iconName: 'Activity' },
  { id: 'cat-diag', nameKey: 'CatDiag', descriptionKey: 'CatDiagDesc', iconName: 'Shield' }
];

export const mockTools: AsrarTool[] = [
`;

rawTools.forEach(t => {
  let nameKey = t.id.replace(/-/g, '_') + '_Name';
  let descKey = t.id.replace(/-/g, '_') + '_Desc';
  toolsDataContent += `  {
    id: '${t.id}',
    categoryId: '${t.cat}',
    nameKey: '${nameKey}',
    descriptionKey: '${descKey}',
    iconName: '${t.icon}',
    status: 'active',
  },\n`;
});

toolsDataContent += `];\n`;

fs.writeFileSync('src/data/toolsData.ts', toolsDataContent);

// Build translations
let frTranslations = {};
let enTranslations = {};
let arTranslations = {};
let haTranslations = {};

// Add categories
const catFR = {
  "CatAbjad": "I. Calculs de l'Abjad et Gematria", "CatAbjadDesc": "Convertisseurs, réductions et analyses de textes arabes (1-15).",
  "CatWafq": "II. Carrés Magiques et Tracés (Awfaq)", "CatWafqDesc": "Générateurs de grilles magiques et géométrie sacrée (16-30).",
  "CatAstrology": "III. Astrologie Traditionnelle (Falak)", "CatAstrologyDesc": "Heures planétaires, phases lunaires et horologie (31-45).",
  "CatTabai": "IV. Analyse Élémentaire (Taba'i)", "CatTabaiDesc": "Tempéraments, équilibre des 4 éléments et compatibilité (46-55).",
  "CatHuruf": "V. Science des Lettres (Ilm al-Huruf)", "CatHurufDesc": "Décompositions (Bast), étalement et sceaux de lettres (56-70).",
  "CatRituals": "VI. Calculs de Rituels (Awrad)", "CatRitualsDesc": "Planificateurs de Dhikr, compteurs intelligents (71-85).",
  "CatDiag": "VII. Diagnostic, Spiritualité et Protection", "CatDiagDesc": "Modulo, influences, subsistance et calendriers sacrés (86-102)."
};
const catEN = {
  "CatAbjad": "I. Abjad Calculations & Gematria", "CatAbjadDesc": "Converters, reductions and Arabic text analysis (1-15).",
  "CatWafq": "II. Magic Squares & Traces (Awfaq)", "CatWafqDesc": "Magic grid generators and sacred geometry (16-30).",
  "CatAstrology": "III. Traditional Astrology (Falak)", "CatAstrologyDesc": "Planetary hours, moon phases and horology (31-45).",
  "CatTabai": "IV. Elemental Analysis (Taba'i)", "CatTabaiDesc": "Temperaments, 4 elements balance and compatibility (46-55).",
  "CatHuruf": "V. Science of Letters (Ilm al-Huruf)", "CatHurufDesc": "Decompositions (Bast) and letter seals (56-70).",
  "CatRituals": "VI. Ritual Calculations (Awrad)", "CatRitualsDesc": "Dhikr planners, smart counters (71-85).",
  "CatDiag": "VII. Diagnosis, Spirituality & Protection", "CatDiagDesc": "Modulo, influences, sustenance and sacred calendars (86-102)."
};

Object.assign(frTranslations, catFR);
Object.assign(enTranslations, catEN);
Object.assign(arTranslations, catFR); // Fallback
Object.assign(haTranslations, catFR); // Fallback

rawTools.forEach(t => {
  let nameKey = t.id.replace(/-/g, '_') + '_Name';
  let descKey = t.id.replace(/-/g, '_') + '_Desc';
  
  frTranslations[nameKey] = t.fr[0];
  frTranslations[descKey] = t.fr[1];
  
  enTranslations[nameKey] = translateToEN(t.fr[0]);
  enTranslations[descKey] = translateToEN(t.fr[1]);
  
  arTranslations[nameKey] = translateToAR(t.fr[0]);
  arTranslations[descKey] = translateToAR(t.fr[1]);
  
  haTranslations[nameKey] = translateToHA(t.fr[0]);
  haTranslations[descKey] = translateToHA(t.fr[1]);
});

const configTs = fs.readFileSync('src/i18n/config.ts', 'utf-8');

// Use simple string replacement to inject translations
function injectTranslations(langCode, translationsObj) {
  const jsonStr = JSON.stringify(translationsObj, null, 6).slice(1, -1); // remove outer braces
  const regex = new RegExp(`("${langCode}":\\s*{\\s*translation:\\s*{)([\\s\\S]*?)(}\\s*})`);
  return function(content) {
    // We just append to existing to preserve UI translations
    return content.replace(regex, (match, p1, p2, p3) => {
      return p1 + p2 + ',\n      // --- GENERATED TOOLS ---\n' + jsonStr + '\n    ' + p3;
    });
  }
}

let updatedConfig = configTs;
updatedConfig = injectTranslations('fr', frTranslations)(updatedConfig);
updatedConfig = injectTranslations('en', enTranslations)(updatedConfig);
updatedConfig = injectTranslations('ha', haTranslations)(updatedConfig);
updatedConfig = injectTranslations('ar', arTranslations)(updatedConfig);

fs.writeFileSync('src/i18n/config.ts', updatedConfig);

console.log("SUCCESS");
