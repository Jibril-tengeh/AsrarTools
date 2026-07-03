import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronLeft } from 'lucide-react';
import { mockTools } from '../../data/toolsData';

// Generic Components
import { GenericAbjadCalculator } from '../../components/tools/GenericAbjadCalculator';

import { GenericWafqGenerator } from '../../components/tools/GenericWafqGenerator';
import { PlanetaryHoursGenerator } from '../../components/tools/PlanetaryHoursGenerator';
import { ElementalTextAnalyzer } from '../../components/tools/ElementalTextAnalyzer';
import { BastGenerator } from '../../components/tools/BastGenerator';
import { ZikrTool } from '../../components/tools/ZikrTool';
import { JafrAnalyzer } from '../../components/tools/JafrAnalyzer';
import { GeomancyCaster } from '../../components/tools/GeomancyCaster';
import { IstikharahTool } from '../../components/tools/IstikharahTool';
import { AngelicTool } from '../../components/tools/AngelicTool';
import { MaterialsTool } from '../../components/tools/MaterialsTool';
import { CyclesTool } from '../../components/tools/CyclesTool';
import { DiagnosticHub } from '../../components/tools/DiagnosticHub';

// Fallback legacy imports
import { DhikrPlanner } from '../../components/tools/DhikrPlanner';
import { Mod9Diagnostic } from '../../components/tools/Mod9Diagnostic';

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
    // ABJAD TOOLS (1-15)
    if (tool.id.startsWith('abjad-')) {
      const methodMap: Record<string, any> = {
        'abjad-kabir': 'kabir',
        'abjad-saghir': 'saghir',
        'abjad-wasat': 'wasat',
        'abjad-maghribi': 'maghribi',
        'abjad-mashriqi': 'mashriqi',
        'abjad-theosophic': 'kabir', // needs custom component if filtering
        'abjad-consonants': 'kabir', // needs custom logic
        'abjad-inverse': 'inverse',
        'abjad-diacritics': 'diacritics',
        'abjad-pronouns': 'pronouns',
        'abjad-position': 'position',
        'abjad-palindrome': 'palindrome',
        'abjad-muqattaat': 'muqattaat',
        'abjad-mother': 'mother',
        'abjad-synonym': 'synonym',
      };
      
      const method = methodMap[tool.id];
      if (method) {
         return <GenericAbjadCalculator method={method} titleKey={tool.nameKey} />;
      }
    }

    // WAFQ TOOLS
    if (tool.id.startsWith('wafq-') && tool.id.includes('x')) {
      const order = parseInt(tool.id.split('-')[1].split('x')[0]);
      if (!isNaN(order)) {
        return <GenericWafqGenerator order={order} titleKey={tool.nameKey} />;
      }
    }

    switch (tool.id) {
      case 'astro-hours-day':
      case 'astro-hours-night':
      case 'astro-faraq-hours':
        return <PlanetaryHoursGenerator />;
      case 'tabai-text':
      case 'tabai-personal':
        return <ElementalTextAnalyzer />;
      case 'huruf-bast-harfi':
      case 'huruf-bast-adadi':
      case 'huruf-bast-mixed':
        return <BastGenerator />;
      case 'ritual-counter':
        return <ZikrTool />;
      case 'ritual-planner':
        return <DhikrPlanner />;
      case 'jafr-jami':
      case 'jafr-natiq':
      case 'jafr-ihaatah':
        return <JafrAnalyzer />;
      case 'geomancy-mizan':
      case 'geomancy-abjad':
      case 'geomancy-theme':
        return <GeomancyCaster />;
      case 'istikharah-subhah':
      case 'istikharah-quran':
      case 'istikharah-sharik':
        return <IstikharahTool />;
      case 'angelic-birhatiah':
      case 'angelic-malaikah':
      case 'angelic-seal':
        return <AngelicTool />;
      case 'materials-alwah':
      case 'materials-hibr':
      case 'materials-purification':
        return <MaterialsTool />;
      case 'cycles-vulnerability':
      case 'cycles-biorhythm':
      case 'cycles-ghayb':
        return <CyclesTool />;
      
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


      case 'tabai-couple':
      case 'tabai-balance':
      case 'tabai-thermal':
      case 'tabai-compass':
      case 'tabai-day':
      case 'tabai-conflict':
      case 'tabai-synergy':
      case 'tabai-neutralize':
        return <DiagnosticHub initialToolId={tool.id} />;


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

      
      case 'wafq-10x10':
      case 'wafq-combined':
      case 'wafq-hollow':
      case 'wafq-literal':
      case 'wafq-moon':
      case 'wafq-rotation':
      case 'wafq-sun':
      case 'wafq-validator':
      case 'wafq-4x4':
      case 'wafq-6x6':
      case 'wafq-8x8':
        return <DiagnosticHub initialToolId={tool.id} />;


      case 'jafr-miftah':
        return <DiagnosticHub initialToolId={tool.id} />;

      
      case 'huruf-zairja':
        return <DiagnosticHub initialToolId={tool.id} />;

      case 'diag-mod9':
        return <Mod9Diagnostic />;
      case 'diag-mod12':
      case 'diag-elemental-dysfunction':
      case 'diag-suhuf':
      case 'diag-temporal':
      case 'diag-fengshui':
      case 'diag-rizq':
      case 'diag-dreams':
      case 'diag-night-third':
      case 'diag-property-harmony':
      case 'diag-seasonal':
      case 'diag-hijama':
      case 'diag-bukhoor':
      case 'diag-aptitude':
      case 'diag-georesonance':
      case 'diag-niyyah':
      case 'diag-eclipse':
        return <DiagnosticHub initialToolId={tool.id} />;
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
          <h1 className="text-[21px] font-bold text-gray-900 dark:text-white">
            {t(tool.nameKey)}
          </h1>
          <p className="text-[11px] text-gray-600 dark:text-gray-400">
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
