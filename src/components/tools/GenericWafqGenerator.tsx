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
    <div className="flex flex-col gap-6 bg-white dark:bg-gray-950 p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
      
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
          className="w-full p-3 sm:p-4 text-base sm:text-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400">
           {t('LeaveEmptyForStandard')}
        </p>
      </div>

      {/* Result Section */}
      {wafqMatrix && wafqMatrix.length > 0 ? (
        <div className="flex flex-col items-center justify-center p-2 sm:p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800/50 w-full overflow-x-auto">
           <div 
             className="grid gap-1 sm:gap-1.5 min-w-max py-2 px-1" 
             style={{ gridTemplateColumns: `repeat(${order}, minmax(0, 1fr))` }}
             dir="rtl"
           >
             {wafqMatrix.map((row, rIndex) => (
                row.map((cell, cIndex) => {
                  const cellStr = cell.toString();
                  
                  // Dynamic sizing based on grid order
                  let cellSize = "w-10 h-10 sm:w-12 sm:h-12";
                  let textSize = "text-[12px] sm:text-sm";
                  
                  if (order <= 4) {
                    cellSize = "w-14 h-14 sm:w-16 sm:h-16";
                    textSize = "text-lg sm:text-xl";
                  } else if (order <= 6) {
                    cellSize = "w-12 h-12 sm:w-14 sm:h-14";
                    textSize = "text-sm sm:text-base";
                  } else if (order >= 9) {
                    cellSize = "w-8 h-8 sm:w-10 sm:h-10";
                    textSize = "text-[10px] sm:text-[11px]";
                  }

                  // Force text smaller if digits are too many
                  if (cellStr.length > 5) {
                    textSize = "text-[8px] sm:text-[9px]";
                  } else if (cellStr.length > 4) {
                    textSize = "text-[9px] sm:text-[10px]";
                  } else if (cellStr.length > 3) {
                    textSize = "text-[10px] sm:text-[11px]";
                  }

                  return (
                    <div 
                      key={`${rIndex}-${cIndex}`}
                      className={`flex items-center justify-center ${cellSize} bg-white dark:bg-gray-900 border border-amber-200 dark:border-amber-700 rounded-md shadow-sm font-bold text-amber-700 dark:text-amber-400 font-mono ${textSize} overflow-hidden px-0.5`}
                      title={cellStr}
                    >
                      {cellStr}
                    </div>
                  );
                })
             ))}
           </div>
        </div>
      ) : null}
    </div>
  );
}
