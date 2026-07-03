import { AsrarTool, ToolCategory } from '../types';

export const categories: ToolCategory[] = [
  { id: 'cat-abjad', nameKey: 'CatAbjad' },
  { id: 'cat-wafq', nameKey: 'CatWafq' },
  { id: 'cat-astrology', nameKey: 'CatAstrology' },
  { id: 'cat-rituals', nameKey: 'CatRituals' },
  { id: 'cat-geomancy', nameKey: 'CatGeomancy' },
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
    id: 'abjad-saghir',
    categoryId: 'cat-abjad',
    nameKey: 'AbjadSaghirName',
    descriptionKey: 'AbjadSaghirDesc',
    iconName: 'Hash',
    status: 'active',
  },
  
  // Cat 2: Wafq
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
    status: 'disabled', // Placeholder
  },

  // Cat 4: Rituals
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
    status: 'disabled', // Placeholder
  }
];
