import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshCcw, Settings2 } from 'lucide-react';
import { cn } from '../../lib/utils';

type AbjadSystem = 'mashriqi' | 'maghribi';
type AbjadMode = 'kabir' | 'saghir' | 'wasat';

const abjadMashriqiMap: Record<string, number> = {
  'ا': 1, 'أ': 1, 'إ': 1, 'آ': 1, 'ء': 1,
  'ب': 2, 'ج': 3, 'د': 4, 'ه': 5, 'ة': 5,
  'و': 6, 'ؤ': 6, 'ز': 7, 'ح': 8, 'ط': 9,
  'ي': 10, 'ئ': 10, 'ى': 10,
  'ك': 20, 'ل': 30, 'م': 40, 'ن': 50, 'س': 60, 'ع': 70, 'ف': 80, 'ص': 90,
  'ق': 100, 'ر': 200, 'ش': 300, 'ت': 400, 'ث': 500, 'خ': 600, 'ذ': 700, 'ض': 800, 'ظ': 900, 'غ': 1000
};

// Maghribi difference: S=300, Sh=1000, D=90, Z=800, Gh=900
const abjadMaghribiMap: Record<string, number> = {
  ...abjadMashriqiMap,
  'س': 300, 'ش': 1000, 'ص': 60, 'ض': 90, 'ظ': 800, 'غ': 900
};

export function AdvancedAbjadCalculator() {
  const { t } = useTranslation();
  const [inputText, setInputText] = useState('');
  const [system, setSystem] = useState<AbjadSystem>('mashriqi');
  const [mode, setMode] = useState<AbjadMode>('kabir');
  const [ignoreSpaces, setIgnoreSpaces] = useState(true);

  const { total, breakdown } = useMemo(() => {
    let currentTotal = 0;
    const currentBreakdown: { char: string; value: number }[] = [];
    const baseMap = system === 'mashriqi' ? abjadMashriqiMap : abjadMaghribiMap;

    for (const char of inputText) {
      if (ignoreSpaces && char === ' ') continue;
      
      let val = baseMap[char];
      if (val !== undefined) {
        if (mode === 'saghir') {
          val = val % 9 === 0 ? 9 : val % 9;
        } else if (mode === 'wasat') {
          if (val >= 10 && val < 100) val = val / 10;
          else if (val >= 100 && val < 1000) val = val / 100;
          else if (val === 1000) val = 10;
        }
        currentTotal += val;
        currentBreakdown.push({ char, value: val });
      } else if (char !== ' ') {
        currentBreakdown.push({ char, value: 0 });
      }
    }

    return { total: currentTotal, breakdown: currentBreakdown };
  }, [inputText, system, mode, ignoreSpaces]);

  return (
    <div className="flex flex-col gap-8 bg-white dark:bg-obsidian-900 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
      
      {/* Settings Panel */}
      <div className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 dark:bg-obsidian-950 rounded-xl border border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2 text-gold-600 dark:text-gold-500 mb-2 sm:mb-0">
          <Settings2 className="w-5 h-5" />
          <span className="font-semibold text-sm">Options</span>
        </div>
        
        <div className="flex flex-wrap gap-4 flex-1">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">Système</label>
            <select 
              value={system} 
              onChange={(e) => setSystem(e.target.value as AbjadSystem)}
              className="text-sm bg-white dark:bg-obsidian-900 border-gray-200 dark:border-gray-700 rounded-lg p-1.5 focus:ring-gold-500"
            >
              <option value="mashriqi">Mashriqi (Oriental)</option>
              <option value="maghribi">Maghribi (Occidental)</option>
            </select>
          </div>
          
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">Mode</label>
            <select 
              value={mode} 
              onChange={(e) => setMode(e.target.value as AbjadMode)}
              className="text-sm bg-white dark:bg-obsidian-900 border-gray-200 dark:border-gray-700 rounded-lg p-1.5 focus:ring-gold-500"
            >
              <option value="kabir">Kabir (Grand)</option>
              <option value="saghir">Saghir (Petit / Mod 9)</option>
              <option value="wasat">Wasat (Moyen)</option>
            </select>
          </div>

          <div className="flex items-center gap-2 mt-auto mb-1">
            <input 
              type="checkbox" 
              id="ignoreSpaces"
              checked={ignoreSpaces}
              onChange={(e) => setIgnoreSpaces(e.target.checked)}
              className="rounded border-gray-300 text-gold-500 focus:ring-gold-500 dark:border-gray-700 dark:bg-obsidian-900"
            />
            <label htmlFor="ignoreSpaces" className="text-xs text-gray-600 dark:text-gray-400 cursor-pointer">
              Ignorer les espaces
            </label>
          </div>
        </div>
      </div>

      {/* Input Section */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Texte en Arabe
          </label>
          <button 
            onClick={() => setInputText('')}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gold-500 transition-colors"
          >
            <RefreshCcw className="w-3.5 h-3.5" /> Effacer
          </button>
        </div>
        
        <textarea
          dir="rtl"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="اكتب هنا..."
          className="w-full min-h-[120px] p-4 text-2xl leading-relaxed bg-gray-50 dark:bg-obsidian-950 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-gold-500 focus:outline-none resize-y text-gray-900 dark:text-white"
        />
      </div>

      {/* Result Section */}
      <div className="flex flex-col items-center justify-center bg-gold-50 dark:bg-gold-900/10 py-8 rounded-xl border border-gold-200 dark:border-gold-800/30">
        <div className="text-sm text-gold-800 dark:text-gold-400 font-medium mb-2 uppercase tracking-wider">
          Valeur Abjad Totale
        </div>
        <div className="text-6xl font-bold text-gold-600 dark:text-gold-500 font-mono tracking-tighter">
          {total}
        </div>
      </div>

      {/* Breakdown Section */}
      {breakdown.length > 0 && (
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 border-b dark:border-gray-800 pb-2">
            Analyse Détaillée (تفصيل الحروف)
          </h3>
          <div className="flex flex-wrap gap-3" dir="rtl">
            {breakdown.map((item, idx) => (
              item.value > 0 && (
                <div key={idx} className="flex flex-col items-center justify-center min-w-[3rem] p-2 bg-gray-50 dark:bg-obsidian-950 border border-gray-200 dark:border-gray-800 rounded-lg group hover:border-gold-500 transition-colors">
                  <span className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-gold-500 transition-colors">
                    {item.char}
                  </span>
                  <span className="text-xs font-mono text-gold-600 dark:text-gold-400">
                    {item.value}
                  </span>
                </div>
              )
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
