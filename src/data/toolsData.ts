import { AsrarTool, ToolCategory } from '../types';

export const categories: ToolCategory[] = [
  { id: 'cat-abjad', nameKey: 'CatAbjad', descriptionKey: 'CatAbjadDesc', iconName: 'Hash' },
  { id: 'cat-wafq', nameKey: 'CatWafq', descriptionKey: 'CatWafqDesc', iconName: 'Grid3x3' },
  { id: 'cat-astrology', nameKey: 'CatAstrology', descriptionKey: 'CatAstrologyDesc', iconName: 'Compass' },
  { id: 'cat-asma', nameKey: 'CatAsma', descriptionKey: 'CatAsmaDesc', iconName: 'BookOpen' },
  { id: 'cat-rituals', nameKey: 'CatRituals', descriptionKey: 'CatRitualsDesc', iconName: 'Activity' },
  { id: 'cat-geomancy', nameKey: 'CatGeomancy', descriptionKey: 'CatGeomancyDesc', iconName: 'LayoutGrid' },
];

export const mockTools: AsrarTool[] = [
  // Cat 1: Abjad
  {
    id: 'abjad-kabir',
    categoryId: 'cat-abjad',
    nameKey: 'AbjadKabirName',
    descriptionKey: 'AbjadKabirDesc',
    iconName: 'Calculator',
    status: 'active',
  },
  {
    id: 'abjad-advanced',
    categoryId: 'cat-abjad',
    nameKey: 'AbjadAdvancedName',
    descriptionKey: 'AbjadAdvancedDesc',
    iconName: 'Settings2',
    status: 'active',
  },
  {
    id: 'abjad-saghir',
    categoryId: 'cat-abjad',
    nameKey: 'AbjadSaghirName',
    descriptionKey: 'AbjadSaghirDesc',
    iconName: 'Minimize2',
    status: 'active',
  },
  {
    id: 'abjad-wasat',
    categoryId: 'cat-abjad',
    nameKey: 'AbjadWasatName',
    descriptionKey: 'AbjadWasatDesc',
    iconName: 'Scale',
    status: 'active',
  },
  
  // Cat 2: Wafq
  {
    id: 'wafq-advanced',
    categoryId: 'cat-wafq',
    nameKey: 'WafqAdvancedName',
    descriptionKey: 'WafqAdvancedDesc',
    iconName: 'Blocks',
    status: 'active',
  },
  {
    id: 'wafq-muthallath',
    categoryId: 'cat-wafq',
    nameKey: 'Wafq3x3Name',
    descriptionKey: 'Wafq3x3Desc',
    iconName: 'Grid3x3',
    status: 'active',
  },
  {
    id: 'wafq-murabba',
    categoryId: 'cat-wafq',
    nameKey: 'Wafq4x4Name',
    descriptionKey: 'Wafq4x4Desc',
    iconName: 'LayoutGrid',
    status: 'active',
  },

  // Cat 3: Astrologie & Éléments
  {
    id: 'astrology-planetary-hours',
    categoryId: 'cat-astrology',
    nameKey: 'PlanetaryHoursName',
    descriptionKey: 'PlanetaryHoursDesc',
    iconName: 'Compass',
    status: 'active',
  },
  {
    id: 'elemental-analyzer',
    categoryId: 'cat-astrology',
    nameKey: 'ElementalAnalyzerName',
    descriptionKey: 'ElementalAnalyzerDesc',
    iconName: 'Flame',
    status: 'active',
  },
  
  // Cat 4: Asma & Bast
  {
    id: 'asma-matcher',
    categoryId: 'cat-asma',
    nameKey: 'AsmaMatcherName',
    descriptionKey: 'AsmaMatcherDesc',
    iconName: 'BookOpen',
    status: 'active',
  },
  {
    id: 'bast-module',
    categoryId: 'cat-asma',
    nameKey: 'BastModuleName',
    descriptionKey: 'BastModuleDesc',
    iconName: 'AlignRight',
    status: 'active',
  },

  {
    id: 'geomancy-cast',
    categoryId: 'cat-geomancy',
    nameKey: 'GeomancyCastName',
    descriptionKey: 'GeomancyCastDesc',
    iconName: 'Hash',
    status: 'disabled',
  },

  // Cat 5: Rituals
  {
    id: 'zikr-counter',
    categoryId: 'cat-rituals',
    nameKey: 'ZikrCounterName',
    descriptionKey: 'ZikrCounterDesc',
    iconName: 'Activity',
    status: 'active',
  },
  {
    id: 'dhikr-planner',
    categoryId: 'cat-rituals',
    nameKey: 'DhikrPlannerName',
    descriptionKey: 'DhikrPlannerDesc',
    iconName: 'Calendar',
    status: 'active',
  }
];
