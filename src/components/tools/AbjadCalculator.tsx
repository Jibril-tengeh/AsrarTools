import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshCcw } from 'lucide-react';

// Abjad Kabir standard table
const abjadMap: Record<string, number> = {
  'ا': 1, 'أ': 1, 'إ': 1, 'آ': 1, 'ء': 1,
  'ب': 2,
  'ج': 3,
  'د': 4,
  'ه': 5, 'ة': 5,
  'و': 6, 'ؤ': 6,
  'ز': 7,
  'ح': 8,
  'ط': 9,
  'ي': 10, 'ئ': 10, 'ى': 10,
  'ك': 20,
  'ل': 30,
  'م': 40,
  'ن': 50,
  'س': 60,
  'ع': 70,
  'ف': 80,
  'ص': 90,
  'ق': 100,
  'ر': 200,
  'ش': 300,
  'ت': 400,
  'ث': 500,
  'خ': 600,
  'ذ': 700,
  'ض': 800,
  'ظ': 900,
  'غ': 1000
};

export function AbjadCalculator() {
  const { t } = useTranslation();
  const [inputText, setInputText] = useState('');

  const { total, breakdown } = useMemo(() => {
    let currentTotal = 0;
    const currentBreakdown: { char: string; value: number }[] = [];

    // Filter to only Arabic letters (and handle spaces visually if needed, but we'll map only valid chars)
    for (const char of inputText) {
      if (char === ' ') continue;
      const val = abjadMap[char];
      if (val !== undefined) {
        currentTotal += val;
        currentBreakdown.push({ char, value: val });
      } else {
        // Unknown chars get 0 or skipped
        currentBreakdown.push({ char, value: 0 });
      }
    }

    return { total: currentTotal, breakdown: currentBreakdown };
  }, [inputText]);

  return (
    <div className="flex flex-col gap-8 bg-white dark:bg-gray-950 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
      
      {/* Input Section */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            {t('ArabicText')}
          </label>
          <button 
            onClick={() => setInputText('')}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-emerald-600 transition-colors"
          >
            <RefreshCcw className="w-3.5 h-3.5" /> {t('Clear')}
          </button>
        </div>
        
        <textarea
          dir="rtl"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="اكتب هنا..."
          className="w-full min-h-[120px] p-4 text-2xl leading-relaxed bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-y"
        />
      </div>

      {/* Result Section */}
      <div className="flex flex-col items-center justify-center bg-emerald-50 dark:bg-emerald-900/20 py-8 rounded-xl border border-emerald-200 dark:border-emerald-800/50">
        <div className="text-sm text-emerald-800 dark:text-emerald-400 font-medium mb-2 uppercase tracking-wider">
          {t('TotalAbjadValue')}
        </div>
        <div className="text-6xl font-bold text-emerald-600 dark:text-emerald-400 font-mono tracking-tighter">
          {total}
        </div>
      </div>

      {/* Breakdown Section */}
      {breakdown.length > 0 && (
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 border-b pb-2">
            {t('DetailedAnalysis')}
          </h3>
          <div className="flex flex-wrap gap-3" dir="rtl">
            {breakdown.map((item, idx) => (
              item.value > 0 && (
                <div key={idx} className="flex flex-col items-center justify-center min-w-[3rem] p-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg">
                  <span className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {item.char}
                  </span>
                  <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400">
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
