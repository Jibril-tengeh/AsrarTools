import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshCcw, Flame, Droplet, Wind, Square } from 'lucide-react';

const ELEMENTS: Record<string, { name: string, chars: string[], color: string, bg: string, icon: React.ReactNode }> = {
  fire: {
    name: 'Fire',
    chars: ['ا', 'ه', 'ط', 'م', 'ف', 'ش', 'ذ'],
    color: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900/50',
    icon: <Flame className="w-5 h-5 text-red-500" />
  },
  earth: {
    name: 'Earth',
    chars: ['ب', 'و', 'ي', 'ن', 'ص', 'ت', 'ض'],
    color: 'text-amber-700 dark:text-amber-500',
    bg: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-900/50',
    icon: <Square className="w-5 h-5 text-amber-600" />
  },
  air: {
    name: 'Air',
    chars: ['ج', 'ز', 'ك', 'س', 'ق', 'ث', 'ظ'],
    color: 'text-sky-600 dark:text-sky-400',
    bg: 'bg-sky-50 dark:bg-sky-900/20 border-sky-200 dark:border-sky-900/50',
    icon: <Wind className="w-5 h-5 text-sky-500" />
  },
  water: {
    name: 'Water',
    chars: ['د', 'ح', 'ل', 'ع', 'ر', 'خ', 'غ'],
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-900/50',
    icon: <Droplet className="w-5 h-5 text-blue-500" />
  }
};

export function ElementalTextAnalyzer() {
  const { t } = useTranslation();
  const [inputText, setInputText] = useState('');

  const analysis = useMemo(() => {
    const counts = { fire: 0, earth: 0, air: 0, water: 0 };
    let total = 0;

    for (const char of inputText) {
      if (char === ' ') continue;
      
      let found = false;
      for (const [key, element] of Object.entries(ELEMENTS)) {
        if (element.chars.includes(char)) {
          counts[key as keyof typeof counts]++;
          total++;
          found = true;
          break;
        }
      }
      // If we want to map standard aleph variants to fire
      if (!found) {
         if (['أ','إ','آ','ء'].includes(char)) { counts.fire++; total++; }
         else if (['ة'].includes(char)) { counts.fire++; total++; } // ha
         else if (['ى','ئ','ؤ'].includes(char)) { counts.earth++; total++; } // ya/waw variants
      }
    }

    return { counts, total };
  }, [inputText]);

  return (
    <div className="flex flex-col gap-8 bg-white dark:bg-gray-950 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
      
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            {t('ArabicText')} - {t('ElementalAnalysis')}
          </label>
          <button 
            onClick={() => setInputText('')}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-amber-600 transition-colors"
          >
            <RefreshCcw className="w-3.5 h-3.5" /> {t('Clear')}
          </button>
        </div>
        
        <textarea
          dir="rtl"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="اكتب هنا..."
          className="w-full min-h-[120px] p-4 text-2xl leading-relaxed bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none resize-y"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(ELEMENTS).map(([key, config]) => {
           const count = analysis.counts[key as keyof typeof analysis.counts];
           const percentage = analysis.total > 0 ? Math.round((count / analysis.total) * 100) : 0;
           
           return (
             <div key={key} className={`flex flex-col gap-3 p-4 rounded-xl border ${config.bg}`}>
                <div className="flex items-center gap-2">
                   {config.icon}
                   <h3 className={`font-bold ${config.color}`}>{t(`Element${config.name}`)}</h3>
                </div>
                <div className="flex items-end justify-between">
                   <span className="text-3xl font-bold text-gray-900 dark:text-white font-mono">
                     {count}
                   </span>
                   <span className="text-sm font-medium text-gray-500">
                     {percentage}%
                   </span>
                </div>
                {/* Progress bar */}
                <div className="w-full bg-white/50 dark:bg-black/20 rounded-full h-1.5 mt-2">
                   <div 
                     className="h-1.5 rounded-full bg-current transition-all duration-500" 
                     style={{ width: `${percentage}%`, color: 'inherit' }}
                   />
                </div>
             </div>
           );
        })}
      </div>
    </div>
  );
}
