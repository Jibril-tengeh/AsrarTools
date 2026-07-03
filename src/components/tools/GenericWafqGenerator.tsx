import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshCcw, Grid3x3 } from 'lucide-react';
import { generateWafq } from '../../lib/wafq';

interface Props {
  order: number;
  titleKey: string;
}

export function GenericWafqGenerator({ order, titleKey }: Props) {
  const { t } = useTranslation();
  const [targetSumStr, setTargetSumStr] = useState('');

  const wafqMatrix = useMemo(() => {
    const targetSum = parseInt(targetSumStr) || 0;
    return generateWafq(order, targetSum);
  }, [order, targetSumStr]);

  return (
    <div className="flex flex-col gap-8 bg-white dark:bg-gray-950 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
      
      {/* Input Section */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            {t('TargetSum')} - {t(titleKey)} ({order}x{order})
          </label>
          <button 
            onClick={() => setTargetSumStr('')}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-amber-600 transition-colors"
          >
            <RefreshCcw className="w-3.5 h-3.5" /> {t('Clear')}
          </button>
        </div>
        
        <input
          type="number"
          value={targetSumStr}
          onChange={(e) => setTargetSumStr(e.target.value)}
          placeholder={t('EnterDesiredSum')}
          className="w-full p-4 text-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400">
           {t('LeaveEmptyForStandard')}
        </p>
      </div>

      {/* Result Section */}
      {wafqMatrix && wafqMatrix.length > 0 ? (
        <div className="flex flex-col items-center justify-center p-6 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800/50">
           <div 
             className="grid gap-2" 
             style={{ gridTemplateColumns: `repeat(${order}, minmax(0, 1fr))` }}
             dir="rtl"
           >
             {wafqMatrix.map((row, rIndex) => (
                row.map((cell, cIndex) => (
                  <div 
                    key={`${rIndex}-${cIndex}`}
                    className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-white dark:bg-gray-900 border border-amber-200 dark:border-amber-700 rounded-md shadow-sm text-lg sm:text-2xl font-bold text-amber-700 dark:text-amber-400 font-mono"
                  >
                    {cell}
                  </div>
                ))
             ))}
           </div>
        </div>
      ) : (
         <div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
            <Grid3x3 className="w-12 h-12 mb-4 opacity-50" />
            <p>{t('WafqGenerationNotSupportedForEvenCurrently')}</p>
         </div>
      )}
    </div>
  );
}
