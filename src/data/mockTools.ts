import { AsrarTool } from '../types';

export const mockTools: AsrarTool[] = [
  {
    id: 'khatim-generator',
    nameKey: 'KhatimGenName',
    descriptionKey: 'KhatimGenDesc',
    iconName: 'Grid3x3',
    status: 'active',
  },
  {
    id: 'zikr-counter',
    nameKey: 'ZikrCounterName',
    descriptionKey: 'ZikrCounterDesc',
    iconName: 'Hash',
    status: 'active',
  },
  {
    id: 'abjad-calculator',
    nameKey: 'AbjadCalcName',
    descriptionKey: 'AbjadCalcDesc',
    iconName: 'Calculator',
    status: 'maintenance',
  },
  {
    id: 'talsam-builder',
    nameKey: 'TalsamBuilderName',
    descriptionKey: 'TalsamBuilderDesc',
    iconName: 'PenTool',
    status: 'active',
  }
];
