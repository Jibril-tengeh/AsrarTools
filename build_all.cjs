const fs = require('fs');

const rawCategories = [
  { id: 'cat-abjad', nameKey: 'CatAbjad', descriptionKey: 'CatAbjadDesc', iconName: 'Hash' },
  { id: 'cat-wafq', nameKey: 'CatWafq', descriptionKey: 'CatWafqDesc', iconName: 'Grid3x3' },
  { id: 'cat-astrology', nameKey: 'CatAstrology', descriptionKey: 'CatAstrologyDesc', iconName: 'Compass' },
  { id: 'cat-tabai', nameKey: 'CatTabai', descriptionKey: 'CatTabaiDesc', iconName: 'Flame' },
  { id: 'cat-huruf', nameKey: 'CatHuruf', descriptionKey: 'CatHurufDesc', iconName: 'Type' },
  { id: 'cat-rituals', nameKey: 'CatRituals', descriptionKey: 'CatRitualsDesc', iconName: 'Activity' },
  { id: 'cat-diag', nameKey: 'CatDiag', descriptionKey: 'CatDiagDesc', iconName: 'Shield' },
  { id: 'cat-jafr', nameKey: 'CatJafr', descriptionKey: 'CatJafrDesc', iconName: 'Eye' },
  { id: 'cat-geomancy2', nameKey: 'CatGeomancy2', descriptionKey: 'CatGeomancy2Desc', iconName: 'LayoutGrid' },
  { id: 'cat-materials', nameKey: 'CatMaterials', descriptionKey: 'CatMaterialsDesc', iconName: 'Droplet' },
  { id: 'cat-istikharah', nameKey: 'CatIstikharah', descriptionKey: 'CatIstikharahDesc', iconName: 'HelpCircle' },
  { id: 'cat-angelic', nameKey: 'CatAngelic', descriptionKey: 'CatAngelicDesc', iconName: 'Feather' },
  { id: 'cat-cycles', nameKey: 'CatCycles', descriptionKey: 'CatCyclesDesc', iconName: 'Clock' }
];

const catFR = {
  "CatAbjad": "Calculs de l'Abjad et Gematria", "CatAbjadDesc": "Conversion des lettres en valeurs numériques, incluant l'Abjad Kabir, Saghir et avancé.",
  "CatWafq": "Carrés Magiques et Tracés (Awfaq)", "CatWafqDesc": "Création et gestion des grilles magiques comme le Muthallath et le Murabba'a.",
  "CatAstrology": "Astrologie Traditionnelle et Horologie (Falak)", "CatAstrologyDesc": "Heures planétaires, phases lunaires, et analyse des 4 éléments.",
  "CatTabai": "Analyse Élémentaire et Tempéraments (Taba'i)", "CatTabaiDesc": "Tempéraments, équilibre des 4 éléments et compatibilité.",
  "CatHuruf": "Science des Lettres et Décompositions (Ilm al-Huruf)", "CatHurufDesc": "Décompositions (Bast), étalement et sceaux de lettres.",
  "CatRituals": "Calculs de Rituels (Awrad et Dhikr)", "CatRitualsDesc": "Compteurs intelligents et planificateurs pour le Dhikr et les prières.",
  "CatDiag": "Diagnostic, Spiritualité et Protection", "CatDiagDesc": "Modulo, influences, subsistance et calendriers sacrés.",
  "CatJafr": "La Science du Jafr et de la Zairja (Calculs Divinatoires)", "CatJafrDesc": "Méthode de calcul hautement technique pour extraire des réponses et des prévisions.",
  "CatGeomancy2": "La Géomancie Traditionnelle (Khatt al-Raml)", "CatGeomancy2Desc": "Analyse basée sur la génération de figures composées de points et de traits.",
  "CatMaterials": "Science des Supports et des Encres (Al-Alwah wa al-Ahbar)", "CatMaterialsDesc": "Choix des matériaux physiques (métaux, encres, parfums) déterminés par des calculs.",
  "CatIstikharah": "Méthodes d'Istikharah (Consultation Spirituelle)", "CatIstikharahDesc": "Istikharah numérique utilisant le calcul pour obtenir une orientation.",
  "CatAngelic": "Les Lettres Angéliques et Styles d'Écriture Anciens (Khatt al-Tilasim)", "CatAngelicDesc": "Alphabets cryptés ou sacrés pour la rédaction de formules de protection.",
  "CatCycles": "Cycles Temporels Individuels et Vulnérabilité", "CatCyclesDesc": "Calculs des variations énergétiques d'un individu sur l'année."
};

const rawTools = [
  // 1-15
  { id: 'abjad-kabir', cat: 'cat-abjad', icon: 'Calculator', fr: ['Calculateur d\'Abjad Kabir (Grand Abjad)', 'Convertit le texte arabe avec le barème standard (1 à 1000).'] },
  { id: 'abjad-saghir', cat: 'cat-abjad', icon: 'Minimize2', fr: ['Calculateur d\'Abjad Saghir (Petit Abjad)', 'Valeurs réduites par modulo 9 ou 12.'] },
  { id: 'abjad-wasat', cat: 'cat-abjad', icon: 'Scale', fr: ['Calculateur d\'Abjad Wasat (Moyen Abjad)', 'Système de calcul intermédiaire par paliers.'] },
  { id: 'abjad-maghribi', cat: 'cat-abjad', icon: 'Calculator', fr: ['Calculateur d\'Abjad Maghribi', 'Ordre d\'Afrique du Nord (Sad, Dad différents).'] },
  { id: 'abjad-mashriqi', cat: 'cat-abjad', icon: 'Calculator', fr: ['Calculateur d\'Abjad Mashriqi', 'Ordre standard du Proche-Orient.'] },
  { id: 'abjad-theosophic', cat: 'cat-abjad', icon: 'Hash', fr: ['Filtre de Réduction Théosophique', 'Réduit le grand nombre à un chiffre (1-9).'] },
  { id: 'abjad-consonants', cat: 'cat-abjad', icon: 'Filter', fr: ['Extracteur de Consonnes Pures', 'Ignore les voyelles de prolongement.'] },
  { id: 'abjad-inverse', cat: 'cat-abjad', icon: 'RefreshCcw', fr: ['Calculateur d\'Abjad Inversé (Abjad Ma\'koos)', 'Valeur de l\'alphabet inversée.'] },
  { id: 'abjad-diacritics', cat: 'cat-abjad', icon: 'MoreHorizontal', fr: ['Convertisseur de Points Diacritiques', 'Calcule selon le nombre de points diacritiques.'] },
  { id: 'abjad-pronouns', cat: 'cat-abjad', icon: 'UserMinus', fr: ['Calculateur d\'Abjad des Pronoms', 'Exclut/inclut sélectivement les pronoms personnels.'] },
  { id: 'abjad-position', cat: 'cat-abjad', icon: 'ListOrdered', fr: ['Pondérateur de Position Litérale', 'Multiplie la valeur par l\'index de la lettre.'] },
  { id: 'abjad-palindrome', cat: 'cat-abjad', icon: 'ArrowLeftRight', fr: ['Détecteur de Palindromes Numériques', 'Vérifie la symétrie numérique gauche/droite.'] },
  { id: 'abjad-muqattaat', cat: 'cat-abjad', icon: 'Book', fr: ['Calculateur des Lettres Isolées (Al-Muqatta\'at)', 'Calcul pour les 14 lettres mystérieuses du Coran.'] },
  { id: 'abjad-mother', cat: 'cat-abjad', icon: 'Users', fr: ['Calculateur du Nom de la Mère (Ism al-Umm)', 'Empreinte spirituelle avec le nom de la mère.'] },
  { id: 'abjad-synonym', cat: 'cat-abjad', icon: 'CheckDouble', fr: ['Comparateur de Synonymie Numérique', 'Vérifie si deux textes ont la même valeur.'] },

  // 16-30
  { id: 'wafq-3x3', cat: 'cat-wafq', icon: 'Grid3x3', fr: ['Générateur de Wafq Muthallath (3x3)', 'Calcule et génère la grille à 9 cases pour un nombre cible donné.'] },
  { id: 'wafq-4x4', cat: 'cat-wafq', icon: 'Grid', fr: ['Générateur de Wafq Murabba\'a (4x4)', 'Calcule et génère la grille à 16 cases en répartissant les valeurs.'] },
  { id: 'wafq-5x5', cat: 'cat-wafq', icon: 'Grid', fr: ['Générateur de Wafq Mukhammas (5x5)', 'Génère la grille à 25 cases avec un calcul équilibré.'] },
  { id: 'wafq-6x6', cat: 'cat-wafq', icon: 'Grid', fr: ['Générateur de Wafq Musaddas (6x6)', 'Génère la grille complexe à 36 cases avec gestion des sous-sections.'] },
  { id: 'wafq-7x7', cat: 'cat-wafq', icon: 'Grid', fr: ['Générateur de Wafq Musabba\'a (7x7)', 'Génère la grille à 49 cases associée aux sept planètes.'] },
  { id: 'wafq-8x8', cat: 'cat-wafq', icon: 'Grid', fr: ['Générateur de Wafq Muthamman (8x8)', 'Génère la grille à 64 cases utilisée pour les formules de protection.'] },
  { id: 'wafq-9x9', cat: 'cat-wafq', icon: 'Grid', fr: ['Générateur de Wafq Mutassa\'a (9x9)', 'Calcule et génère la grande grille à 81 cases.'] },
  { id: 'wafq-10x10', cat: 'cat-wafq', icon: 'Grid', fr: ['Générateur de Wafq Mu\'ashar (10x10)', 'Calcule la grille maximale à 100 cases pour les calculs de synthèse.'] },
  { id: 'wafq-hollow', cat: 'cat-wafq', icon: 'Square', fr: ['Générateur de Wafq Khali al-Wast (À cœur vide)', 'Construit un carré magique où la case centrale reste vide.'] },
  { id: 'wafq-sun', cat: 'cat-wafq', icon: 'Sun', fr: ['Wafq du Soleil (Shamsi)', 'Générateur de carrés magiques optimisés pour la sphère solaire.'] },
  { id: 'wafq-moon', cat: 'cat-wafq', icon: 'Moon', fr: ['Wafq de la Lune (Qamari)', 'Générateur de carrés magiques calibrés selon la Lune.'] },
  { id: 'wafq-validator', cat: 'cat-wafq', icon: 'CheckSquare', fr: ['Correcteur de Grille (Wafq Validator)', 'Analyse un tableau de chiffres pour vérifier sa validité.'] },
  { id: 'wafq-literal', cat: 'cat-wafq', icon: 'Type', fr: ['Générateur de Wafq Littéral (Wafq al-Huruf)', 'Remplace les chiffres par leurs équivalents en lettres arabes.'] },
  { id: 'wafq-combined', cat: 'cat-wafq', icon: 'Layers', fr: ['Générateur de Wafq Combiné (Noms + Versets)', 'Fusionne les valeurs d\'un Nom Divin et d\'un verset.'] },
  { id: 'wafq-rotation', cat: 'cat-wafq', icon: 'RotateCw', fr: ['Simulateur de Rotation de Wafq', 'Réorganise l\'ordre d\'entrée du carré magique selon l\'intention.'] },

  // 31-45
  { id: 'astro-hours-day', cat: 'cat-astrology', icon: 'Sun', fr: ['Calculateur des Heures Planétaires Diurnes', 'Calcule les 12 heures inégales de la journée.'] },
  { id: 'astro-hours-night', cat: 'cat-astrology', icon: 'Moon', fr: ['Calculateur des Heures Planétaires Nocturnes', 'Calcule les 12 heures inégales de la nuit.'] },
  { id: 'astro-planet-day', cat: 'cat-astrology', icon: 'Globe', fr: ['Indicateur de la Planète du Jour', 'Détermine la planète dominante pour chaque jour de la semaine.'] },
  { id: 'astro-lunar-mansions', cat: 'cat-astrology', icon: 'Moon', fr: ['Traqueur des 28 Demeures Lunaires (Manazil)', 'Indique en temps réel la demeure lunaire actuelle.'] },
  { id: 'astro-ascendant', cat: 'cat-astrology', icon: 'ArrowUpCircle', fr: ['Calculateur de l\'Ascendant Traditionnel (Tali\')', 'Estime l\'ascendant astrologique local.'] },
  { id: 'astro-fullmoon', cat: 'cat-astrology', icon: 'Circle', fr: ['Calculateur d\'Opposition Lumineuse', 'Identifie les moments exacts de la Pleine Lune.'] },
  { id: 'astro-conjunctions', cat: 'cat-astrology', icon: 'Link', fr: ['Détecteur de Conjonctions Planétaires', 'Calcule l\'alignement apparent entre planètes.'] },
  { id: 'astro-void-moon', cat: 'cat-astrology', icon: 'CircleDashed', fr: ['Indicateur de Lune Hors Course (Void of Course)', 'Signale les périodes où la Lune ne forme aucun aspect majeur.'] },
  { id: 'astro-zodiac-entry', cat: 'cat-astrology', icon: 'Sun', fr: ['Calculateur de l\'Entrée Solaire (Buruj)', 'Indique le moment exact du passage du Soleil dans un nouveau signe.'] },
  { id: 'astro-lunar-element', cat: 'cat-astrology', icon: 'Flame', fr: ['Analyseur de Transit Lunaire par Élément', 'Indique si la Lune traverse un signe de Feu, Terre, Air ou Eau.'] },
  { id: 'astro-12-houses', cat: 'cat-astrology', icon: 'PieChart', fr: ['Horloge Astrologique des 12 Maisons', 'Représentation graphique des douze maisons astrologiques.'] },
  { id: 'astro-decans', cat: 'cat-astrology', icon: 'Divide', fr: ['Calculateur des Décans (Chou\'ba)', 'Divise chaque signe du zodiaque en trois décans de 10 degrés.'] },
  { id: 'astro-faraq-hours', cat: 'cat-astrology', icon: 'Clock', fr: ['Calculateur des Heures de Faraq (Heures vides)', 'Identifie les périodes neutres ou inefficaces de la journée.'] },
  { id: 'astro-mercury-retrograde', cat: 'cat-astrology', icon: 'RotateCcw', fr: ['Traqueur de Rétrogradation de Mercure (Utarid)', 'Signale les périodes de mouvement rétrograde de Mercure.'] },
  { id: 'astro-lunar-azimuth', cat: 'cat-astrology', icon: 'Compass', fr: ['Calculateur d\'Azimut Lunaire', 'Indique la direction physique (boussole) de la Lune.'] },

  // 46-55
  { id: 'tabai-text', cat: 'cat-tabai', icon: 'Flame', fr: ['Analyseur Élémentaire de Texte', 'Calcule le pourcentage Feu, Terre, Air, Eau dans un texte.'] },
  { id: 'tabai-personal', cat: 'cat-tabai', icon: 'User', fr: ['Détecteur de Dominance Élémentaire Personnelle', 'Détermine l\'élément dominant (Nom + Mère).'] },
  { id: 'tabai-couple', cat: 'cat-tabai', icon: 'Heart', fr: ['Comparateur d\'Harmonie Élémentaire (Couple)', 'Évalue la compatibilité entre deux personnes.'] },
  { id: 'tabai-balance', cat: 'cat-tabai', icon: 'Scale', fr: ['Calculateur d\'Équilibrage Élémentaire', 'Suggère des lettres pour équilibrer un élément en déficit.'] },
  { id: 'tabai-thermal', cat: 'cat-tabai', icon: 'Thermometer', fr: ['Classificateur thermique des lettres', 'Sépare en Chaudes, Froides, Sèches et Humides.'] },
  { id: 'tabai-compass', cat: 'cat-tabai', icon: 'Compass', fr: ['Boussole Élémentaire', 'Direction géographique selon le profil d\'un mot.'] },
  { id: 'tabai-day', cat: 'cat-tabai', icon: 'Calendar', fr: ['Calculateur de l\'Élément du Jour', 'Détermine l\'élément prédominant d\'une date spécifique.'] },
  { id: 'tabai-conflict', cat: 'cat-tabai', icon: 'AlertTriangle', fr: ['Détecteur de Conflits Élémentaires', 'Signale les incompatibilités élémentaires.'] },
  { id: 'tabai-synergy', cat: 'cat-tabai', icon: 'Zap', fr: ['Générateur de Synergie Nom-Projet', 'Ajustements pour l\'accord élémentaire d\'un projet.'] },
  { id: 'tabai-neutralize', cat: 'cat-tabai', icon: 'Shield', fr: ['Filtre de Neutralisation Élémentaire', 'Calcule pour apaiser un excès d\'élément (Feu ou Eau).'] },

  // 56-70
  { id: 'huruf-bast-harfi', cat: 'cat-huruf', icon: 'Type', fr: ['Module de Bast al-Harfi (Étalement Littéral)', 'Décomposition littérale phonétique complète.'] },
  { id: 'huruf-bast-adadi', cat: 'cat-huruf', icon: 'Hash', fr: ['Module de Bast al-Adadi (Étalement Numérique)', 'Décomposition numérique écrite en lettres.'] },
  { id: 'huruf-bast-mixed', cat: 'cat-huruf', icon: 'Shuffle', fr: ['Module de Bast Mixte', 'Alterne étalement littéral et numérique.'] },
  { id: 'huruf-takseer', cat: 'cat-huruf', icon: 'Repeat', fr: ['Générateur de Takseer (Permutation Circulaire)', 'Mélange circulaire des lettres d\'une ligne.'] },
  { id: 'huruf-nuraniyyah', cat: 'cat-huruf', icon: 'Sun', fr: ['Filtre des Lettres Lumineuses (Nuraniyyah)', 'Isole et calcule les 14 lettres lumineuses.'] },
  { id: 'huruf-zulmaniyyah', cat: 'cat-huruf', icon: 'Moon', fr: ['Filtre des Lettres Sombres (Zulmaniyyah)', 'Isole et calcule les 14 lettres sombres.'] },
  { id: 'huruf-roots', cat: 'cat-huruf', icon: 'Code', fr: ['Extracteur de Racines Littérales', 'Identifie la racine consonantique d\'un mot arabe.'] },
  { id: 'huruf-seal', cat: 'cat-huruf', icon: 'Circle', fr: ['Générateur de Sceau de Lettres (Khatim al-Huruf)', 'Crée un symbole géométrique en reliant les lettres en cercle.'] },
  { id: 'huruf-imtizaj', cat: 'cat-huruf', icon: 'Merge', fr: ['Outil de Fusion Littérale (Imtizaj)', 'Entrelace deux mots ou phrases lettre par lettre.'] },
  { id: 'huruf-dominant', cat: 'cat-huruf', icon: 'BarChart2', fr: ['Analyseur de Lettre Dominante', 'Fréquence et signification ésotérique de la lettre dominante.'] },
  { id: 'huruf-secret-value', cat: 'cat-huruf', icon: 'Lock', fr: ['Calculateur de la Valeur Secrète des Lettres', 'Multiplication par la longueur du nom de la lettre.'] },
  { id: 'huruf-zairja', cat: 'cat-huruf', icon: 'Key', fr: ['Cryptographe par Décalage d\'Abjad (Zairja Crypt)', 'Chiffre par décalage d\'Abjad.'] },
  { id: 'huruf-golden-ratio', cat: 'cat-huruf', icon: 'Percent', fr: ['Analyseur de Proportion d\'Or Littérale', 'Évalue la répartition du nombre d\'or dans les lettres.'] },
  { id: 'huruf-shape', cat: 'cat-huruf', icon: 'PenTool', fr: ['Analyseur de la Forme des Lettres', 'Classe les lettres selon leur forme physique (boucles, verticales...).'] },
  { id: 'huruf-anagram', cat: 'cat-huruf', icon: 'Scissors', fr: ['Générateur d\'Anagrammes Sacrés', 'Recherche toutes les combinaisons formées par les mêmes lettres.'] },

  // 71-85
  { id: 'ritual-planner', cat: 'cat-rituals', icon: 'Calendar', fr: ['Planificateur de Dhikr Personnalisé', 'Calcule les répétitions selon le prénom de l\'utilisateur.'] },
  { id: 'ritual-counter', cat: 'cat-rituals', icon: 'Activity', fr: ['Compteur de Dhikr Intelligent', 'Chapelet avec alerte au nombre précis du calcul.'] },
  { id: 'ritual-multipliers', cat: 'cat-rituals', icon: 'X', fr: ['Calculateur de Multiplicateurs Spirituels', 'Coefficients traditionnels (x10, x100, etc).'] },
  { id: 'ritual-weekly', cat: 'cat-rituals', icon: 'CalendarDays', fr: ['Planificateur de Récitation Hebdomadaire', 'Divise un grand calcul sur 7 jours de la semaine.'] },
  { id: 'ritual-zakat', cat: 'cat-rituals', icon: 'Coins', fr: ['Calculateur de la Zakat du Nom (Aumône Spirituelle)', 'Aumône spirituelle accompagnant le cycle de récitation.'] },
  { id: 'ritual-fasting', cat: 'cat-rituals', icon: 'Clock', fr: ['Planificateur de Jeûne Temporel (Riyadah/Khalwah)', 'Dates idéales pour commencer une retraite spirituelle.'] },
  { id: 'ritual-verse-timing', cat: 'cat-rituals', icon: 'Hourglass', fr: ['Calculateur de Timing de Versets', 'Heure de plus forte résonance pour un verset.'] },
  { id: 'ritual-inqadh', cat: 'cat-rituals', icon: 'AlertOctagon', fr: ['Calculateur de Répartition de Salat al-Inqadh', 'Distribution horaire des prières en situation d\'urgence.'] },
  { id: 'ritual-separator', cat: 'cat-rituals', icon: 'SplitSquareHorizontal', fr: ['Séparateur de Texte Sacré', 'Divise en sections de valeur égale pour une lecture équilibrée.'] },
  { id: 'ritual-tracker', cat: 'cat-rituals', icon: 'TrendingUp', fr: ['Traqueur de Constance Numérique', 'Enregistre la progression des récitations quotidiennes.'] },
  { id: 'ritual-salawat', cat: 'cat-rituals', icon: 'Heart', fr: ['Générateur de Salawat Personnalisée', 'Prières sur le Prophète harmonisées avec l\'Abjad.'] },
  { id: 'ritual-istighfar', cat: 'cat-rituals', icon: 'RefreshCw', fr: ['Calculateur d\'Istighfar Compensateur', 'Contrebalance un calcul numérique défavorable.'] },
  { id: 'ritual-ruqyah', cat: 'cat-rituals', icon: 'Shield', fr: ['Calculateur de Répétitions pour la Ruqyah', 'Nombre de lectures pour l\'eau ou l\'huile de soin.'] },
  { id: 'ritual-hissn', cat: 'cat-rituals', icon: 'ShieldAlert', fr: ['Planificateur de Rituels de Protection (Hissn)', 'Moments où la protection doit être renouvelée.'] },
  { id: 'ritual-group', cat: 'cat-rituals', icon: 'Users', fr: ['Calculateur de Dhikr de Groupe (Congrégational)', 'Cible de récitation collective unifiée (plusieurs noms).'] },

  // 86-102
  { id: 'diag-mod9', cat: 'cat-diag', icon: 'Activity', fr: ['Calculateur de Diagnostic par le Reste (Modulo 9)', 'État de santé ou blocage spirituel par le reste de 9.'] },
  { id: 'diag-mod12', cat: 'cat-diag', icon: 'Activity', fr: ['Calculateur de Diagnostic par le Reste (Modulo 12)', 'Identifie la maison astrologique de blocage.'] },
  { id: 'diag-elemental-dysfunction', cat: 'cat-diag', icon: 'Flame', fr: ['Analyseur de Dysfonctionnement Élémentaire', 'Identifie l\'élément biologique perturbé (Modulo 4).'] },
  { id: 'diag-suhuf', cat: 'cat-diag', icon: 'FileText', fr: ['Générateur de Recommandation d\'Écritures (Suhuf)', 'Portions de textes à écrire sur papier ou argile.'] },
  { id: 'diag-temporal', cat: 'cat-diag', icon: 'Clock', fr: ['Détecteur d\'Influences Temporelles', 'Coïncidence des troubles avec transits/heures d\'affliction.'] },
  { id: 'diag-fengshui', cat: 'cat-diag', icon: 'Compass', fr: ['Calculateur d\'Orientation Spatiale (Feng Shui Traditionnel / Jihat)', 'Direction cardinale idéale pour la prière ou méditation.'] },
  { id: 'diag-rizq', cat: 'cat-diag', icon: 'Briefcase', fr: ['Calculateur de Rizq (Subsistance) Commerciale', 'Mesure le potentiel d\'attraction commerciale d\'un projet.'] },
  { id: 'diag-dreams', cat: 'cat-diag', icon: 'CloudMoon', fr: ['Décodeur de Rêves par l\'Abjad', 'Associe les mots clés du rêve à une catégorie d\'interprétation.'] },
  { id: 'diag-night-third', cat: 'cat-diag', icon: 'Moon', fr: ['Calculateur du Tiers de la Nuit', 'Heure exacte du début du dernier tiers de la nuit.'] },
  { id: 'diag-property-harmony', cat: 'cat-diag', icon: 'Home', fr: ['Calculateur d\'Harmonie de Biens (Achat Immobilier/Véhicule)', 'Harmonie vibratoire avec adresse ou immatriculation.'] },
  { id: 'diag-seasonal', cat: 'cat-diag', icon: 'CloudRain', fr: ['Calculateur d\'Impact Saisonnier', 'Effet des saisons sur le tempérament élémentaire.'] },
  { id: 'diag-hijama', cat: 'cat-diag', icon: 'Droplet', fr: ['Calendrier de Hijama', 'Indique les jours optimaux du mois lunaire pour la saignée.'] },
  { id: 'diag-bukhoor', cat: 'cat-diag', icon: 'Wind', fr: ['Guide d\'Utilisation des Encens (Bukhoor)', 'Recommande l\'encens selon la planète de l\'heure.'] },
  { id: 'diag-aptitude', cat: 'cat-diag', icon: 'Star', fr: ['Calculateur d\'Aptitude Spirituelle (Qabiliyyah)', 'Potentiel d\'affinité avec les sciences secrètes.'] },
  { id: 'diag-georesonance', cat: 'cat-diag', icon: 'MapPin', fr: ['Analyseur de Résonance Géographique', 'Abjad de la ville vs prénom pour voyage/déménagement.'] },
  { id: 'diag-niyyah', cat: 'cat-diag', icon: 'Target', fr: ['Générateur d\'Intentions Symboliques (Niyyah)', 'Formulation claire pour valeurs numériques harmonieuses.'] },
  { id: 'diag-eclipse', cat: 'cat-diag', icon: 'EyeOff', fr: ['Traqueur d\'Impact d\'Éclipse', 'Impact potentiel sur les formules de protection en cours.'] },

  // NEW CATEGORY 8: Jafr
  { id: 'jafr-jami', cat: 'cat-jafr', icon: 'Grid', fr: ['Le Tableau du Jafr Al-Jami\' (La Table Universelle)', 'Table de 28x28 cases (784 cases) contenant des combinaisons de lettres.'] },
  { id: 'jafr-natiq', cat: 'cat-jafr', icon: 'MessageSquare', fr: ['L\'Extracteur de la "Lettre Parlante" (Harf al-Natiq)', 'Détermine la lettre à prononcer/écrire pour former une réponse.'] },
  { id: 'jafr-ihaatah', cat: 'cat-jafr', icon: 'Circle', fr: ['Le Générateur du Cercle d\'Ihaatah (Dairat al-Ihaatah)', 'Disposition circulaire pour décrypter les messages cachés.'] },
  { id: 'jafr-miftah', cat: 'cat-jafr', icon: 'Key', fr: ['Le Calculateur de la Clé de la Question (Miftah al-Su\'al)', 'Génère une clé de décryptage à partir de la question, de l\'heure et de la lune.'] },

  // NEW CATEGORY 9: Geomancy2
  { id: 'geomancy-theme', cat: 'cat-geomancy2', icon: 'LayoutGrid', fr: ['Le Générateur de Thème Géomantique', 'Génère les 16 maisons géomantiques par tapotement ou aléatoire.'] },
  { id: 'geomancy-mizan', cat: 'cat-geomancy2', icon: 'Scale', fr: ['L\'Interpréteur de la Balance du Thème (Mizan al-Raml)', 'Rapports de force entre le demandeur (M1) et sa demande (M7/15).'] },
  { id: 'geomancy-abjad', cat: 'cat-geomancy2', icon: 'Hash', fr: ['Le Convertisseur de Géomancie en Abjad', 'Convertit les 16 figures en valeurs d\'Abjad.'] },

  // NEW CATEGORY 10: Materials
  { id: 'materials-alwah', cat: 'cat-materials', icon: 'Square', fr: ['Le Calculateur de Support Métallique (Alwah Selector)', 'Indique le métal à utiliser comme support (Or, Argent, Cuivre, etc).'] },
  { id: 'materials-hibr', cat: 'cat-materials', icon: 'Droplet', fr: ['Le Proportionneur d\'Encre Spirituelle (Mizan al-Hibr)', 'Proportions d\'ingrédients naturels pour fabriquer l\'encre d\'écriture.'] },
  { id: 'materials-purification', cat: 'cat-materials', icon: 'Wind', fr: ['L\'Indicateur de Purification des Supports', 'Méthode et temps de purification (terre, air, eau ou feu).'] },

  // NEW CATEGORY 11: Istikharah
  { id: 'istikharah-subhah', cat: 'cat-istikharah', icon: 'Activity', fr: ['Le Calculateur d\'Istikharah par le Chapelet (Subhah)', 'Simule le tirage traditionnel des perles d\'un chapelet (modulo 2 ou 3).'] },
  { id: 'istikharah-quran', cat: 'cat-istikharah', icon: 'BookOpen', fr: ['L\'Istikharah Coranique Numérique', 'Calcule la valeur des première et dernière lettres d\'une page.'] },
  { id: 'istikharah-sharik', cat: 'cat-istikharah', icon: 'Users', fr: ['Le Calculateur de Compatibilité d\'Association (Mizan al-Sharik)', 'Compare l\'Abjad de deux futurs associés.'] },

  // NEW CATEGORY 12: Angelic
  { id: 'angelic-birhatiah', cat: 'cat-angelic', icon: 'Type', fr: ['Le Traducteur en Alphabet Birhatiah', 'Convertit le texte en caractères de l\'alphabet traditionnel de la Birhatiah.'] },
  { id: 'angelic-malaikah', cat: 'cat-angelic', icon: 'Feather', fr: ['Le Générateur d\'Écritures Angéliques (Khatt al-Mala\'ikah)', 'Traduit en symboles lunettes pour talismans de protection.'] },
  { id: 'angelic-seal', cat: 'cat-angelic', icon: 'PenTool', fr: ['Le Détecteur de Sceaux d\'Anges', 'Calcule le nom de l\'ange gardien de l\'heure et génère son sceau géométrique.'] },

  // NEW CATEGORY 13: Cycles
  { id: 'cycles-vulnerability', cat: 'cat-cycles', icon: 'CalendarDays', fr: ['Le Calculateur du Jour de Vulnérabilité Personnel (Yawm al-Nahs al-Khass)', 'Identifie le jour lunaire de plus basse énergie.'] },
  { id: 'cycles-biorhythm', cat: 'cat-cycles', icon: 'Activity', fr: ['La Courbe de Biorythme des Lettres', 'Représente la fluctuation énergétique d\'une personne.'] },
  { id: 'cycles-ghayb', cat: 'cat-cycles', icon: 'Clock', fr: ['Le Calculateur de l\'Heure de l\'Invisible (Sa\'at al-Ghayb)', 'Temps le plus propice pour formuler des demandes silencieuses.'] }
];

// Helper to translate to basic English
function translateToEN(frText) {
  let en = frText
    .replace(/Le Calculateur d'Abjad/g, 'The Abjad Calculator')
    .replace(/Calculateur d'Abjad/g, 'Abjad Calculator')
    .replace(/Le Calculateur/g, 'The Calculator')
    .replace(/Calculateur/g, 'Calculator')
    .replace(/Le Générateur/g, 'The Generator')
    .replace(/Générateur/g, 'Generator')
    .replace(/Le Convertisseur/g, 'The Converter')
    .replace(/Convertisseur/g, 'Converter')
    .replace(/Le Détecteur/g, 'The Detector')
    .replace(/Détecteur/g, 'Detector')
    .replace(/L'Analyseur/g, 'The Analyzer')
    .replace(/Analyseur/g, 'Analyzer')
    .replace(/Le Planificateur/g, 'The Planner')
    .replace(/Planificateur/g, 'Planner')
    .replace(/Le Compteur/g, 'The Counter')
    .replace(/Compteur/g, 'Counter')
    .replace(/Le Traqueur/g, 'The Tracker')
    .replace(/Traqueur/g, 'Tracker')
    .replace(/Le Filtre/g, 'The Filter')
    .replace(/Filtre/g, 'Filter')
    .replace(/Grille magique/g, 'Magic grid')
    .replace(/cases/g, 'cells');
  return en;
}

let frTranslations = {};
let enTranslations = {};

Object.assign(frTranslations, catFR);
for (let key in catFR) {
  enTranslations[key] = catFR[key]; // Copying for now
}
enTranslations["CatAbjad"] = "Abjad Calculations & Gematria";
enTranslations["CatWafq"] = "Magic Squares & Traces (Awfaq)";
enTranslations["CatAstrology"] = "Traditional Astrology & Horology (Falak)";
enTranslations["CatTabai"] = "Elemental Analysis & Temperaments (Taba'i)";
enTranslations["CatHuruf"] = "Science of Letters & Decompositions (Ilm al-Huruf)";
enTranslations["CatRituals"] = "Ritual Calculations (Awrad & Dhikr)";
enTranslations["CatDiag"] = "Diagnosis, Spirituality & Protection";
enTranslations["CatJafr"] = "The Science of Jafr and Zairja (Divinatory Calculations)";
enTranslations["CatGeomancy2"] = "Traditional Geomancy (Khatt al-Raml)";
enTranslations["CatMaterials"] = "Science of Materials and Inks (Al-Alwah wa al-Ahbar)";
enTranslations["CatIstikharah"] = "Methods of Istikharah (Spiritual Consultation)";
enTranslations["CatAngelic"] = "Angelic Letters and Ancient Writing Styles (Khatt al-Tilasim)";
enTranslations["CatCycles"] = "Individual Time Cycles and Vulnerability";

rawTools.forEach(t => {
  let nameKey = t.id.replace(/-/g, '_') + '_Name';
  let descKey = t.id.replace(/-/g, '_') + '_Desc';
  
  frTranslations[nameKey] = t.fr[0];
  frTranslations[descKey] = t.fr[1];
  
  enTranslations[nameKey] = translateToEN(t.fr[0]);
  enTranslations[descKey] = translateToEN(t.fr[1]);
});

// Write to toolsData.ts
let toolsDataContent = `import { AsrarTool, ToolCategory } from '../types';

export const categories: ToolCategory[] = [\n`;
rawCategories.forEach(cat => {
  toolsDataContent += `  { id: '${cat.id}', nameKey: '${cat.nameKey}', descriptionKey: '${cat.descriptionKey}', iconName: '${cat.iconName}' },\n`;
});
toolsDataContent += `];

export const mockTools: AsrarTool[] = [\n`;

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

// Write to config.ts
function buildTranslationBlock(lang, translations) {
  let entries = Object.entries(translations).map(([k, v]) => `      "${k}": ${JSON.stringify(v)}`).join(',\n');
  return `  ${lang}: {\n    translation: {\n      "Welcome": "Bienvenue",\n      "WelcomeMessage": "Initialisé.",\n      "InstructionMessage": "Taper USER ou ADMIN",\n      "Profile": "Profil",\n      "DarkMode": "Mode Sombre",\n      "Language": "Langue",\n      "Tools": "Outils",\n      "Settings": "Paramètres",\n      "UserDashboardTitle": "Annuaire des Outils d'Asrar",\n      "SearchTools": "Rechercher un outil...",\n      "StatusActive": "Actif",\n      "StatusMaintenance": "En maintenance",\n      "StatusDisabled": "Premium / À venir",\n      "AccessTool": "Accéder",\n      "NotFoundTitle": "Outil non trouvé",\n      "BackToDashboard": "Retour au tableau de bord",\n      "InDevelopmentTitle": "Outil en cours de développement",\n      "InDevelopmentDesc": "L'outil {{name}} est actuellement en cours de finalisation.",\n${entries}\n    }\n  }`;
}

const fullConfig = `import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
${buildTranslationBlock('fr', frTranslations)},
${buildTranslationBlock('en', enTranslations)}
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "fr",
    fallbackLng: "fr",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
`;

fs.writeFileSync('src/i18n/config.ts', fullConfig);
console.log("SUCCESS");
