import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronLeft } from 'lucide-react';
import { mockTools } from '../../data/toolsData';

// We will lazy load or directly import the specific tools
import { AbjadCalculator } from '../../components/tools/AbjadCalculator';
import { AbjadSaghirCalculator } from '../../components/tools/AbjadSaghirCalculator';
import { WafqGenerator } from '../../components/tools/WafqGenerator';
import { ZikrCounter } from '../../components/tools/ZikrCounter';

import { AbjadWasatCalculator } from '../../components/tools/AbjadWasatCalculator';
import { Wafq4x4Generator } from '../../components/tools/Wafq4x4Generator';
import { DhikrPlanner } from '../../components/tools/DhikrPlanner';

import { AdvancedAbjadCalculator } from '../../components/tools/AdvancedAbjadCalculator';
import { AdvancedWafqGenerator } from '../../components/tools/AdvancedWafqGenerator';
import { PlanetaryHours } from '../../components/tools/PlanetaryHours';
import { ElementalAnalyzer } from '../../components/tools/ElementalAnalyzer';
import { AsmaMatcher } from '../../components/tools/AsmaMatcher';
import { BastModule } from '../../components/tools/BastModule';

export function ToolPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const tool = mockTools.find(t => t.id === id);

  if (!tool) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <h2 className="text-2xl font-bold mb-4">{t('NotFoundTitle')}</h2>
        <button onClick={() => navigate('/')} className="text-amber-600 hover:underline">
          {t('BackToDashboard')}
        </button>
      </div>
    );
  }

  const renderToolContent = () => {
    switch (tool.id) {
      case 'abjad-kabir':
        return <AbjadCalculator />;
      case 'abjad-advanced':
        return <AdvancedAbjadCalculator />;
      case 'abjad-saghir':
        return <AbjadSaghirCalculator />;
      case 'wafq-muthallath':
        return <WafqGenerator />;
      case 'wafq-advanced':
        return <AdvancedWafqGenerator />;
      case 'wafq-murabba':
        return <Wafq4x4Generator />;
      case 'astrology-planetary-hours':
        return <PlanetaryHours />;
      case 'elemental-analyzer':
        return <ElementalAnalyzer />;
      case 'asma-matcher':
        return <AsmaMatcher />;
      case 'bast-module':
        return <BastModule />;
      case 'zikr-counter':
        return <ZikrCounter />;
      case 'dhikr-planner':
        return <DhikrPlanner />;
      case 'abjad-wasat':
        return <AbjadWasatCalculator />;
      default:
        return (
          <div className="flex flex-col items-center justify-center p-12 text-center bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-bold mb-4">{t('InDevelopmentTitle')}</h2>
            <p className="text-gray-600 dark:text-gray-400">
              {t('InDevelopmentDesc', { name: t(tool.nameKey) })}
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-gray-200 dark:border-gray-800 pb-4">
        <button 
          onClick={() => navigate('/')}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Retour"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t(tool.nameKey)}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t(tool.descriptionKey)}
          </p>
        </div>
      </div>

      {/* Tool Content Area */}
      <div className="flex-1">
        {renderToolContent()}
      </div>
    </div>
  );
}
