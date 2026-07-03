import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshCcw } from 'lucide-react';
import { calculateAbjad, AbjadMethod } from '../../lib/abjad';

interface Props {
  method: AbjadMethod;
  titleKey: string;
}

export function GenericAbjadCalculator({ method, titleKey }: Props) {
  const { t } = useTranslation();
  const [inputText, setInputText] = useState('');

  const { total, breakdown } = useMemo(() => {
    return calculateAbjad(inputText, method);
  }, [inputText, method]);

  return (
    <div className="flex flex-col gap-8 bg-white dark:bg-gray-950 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
      
      {/* Input Section */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            {t('ArabicText')} - {t(titleKey)}
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

      {/* Result Section */}
      <div className="flex flex-col items-center justify-center bg-amber-50 dark:bg-amber-900/20 py-8 rounded-xl border border-amber-200 dark:border-amber-800/50">
        <div className="text-sm text-amber-800 dark:text-amber-400 font-medium mb-2 uppercase tracking-wider">
          {t('TotalAbjadValue')}
        </div>
        <div className="text-6xl font-bold text-amber-600 dark:text-amber-400 font-mono tracking-tighter">
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
                  <span className="text-xs font-mono text-amber-600 dark:text-amber-400">
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
