import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshCcw, Info } from 'lucide-react';

// Standard 4x4 layout (Musaddar)
// Common magic square of order 4 logic
// 8 11 14 1
// 13 2 7 12
// 3 16 9 6
// 10 5 4 15
const gridToLogical4x4 = [
  8, 11, 14, 1,
  13, 2, 7, 12,
  3, 16, 9, 6,
  10, 5, 4, 15
];

export function Wafq4x4Generator() {
  const { t } = useTranslation();
  const [target, setTarget] = useState<number | ''>('');

  const wafqData = useMemo(() => {
    if (typeof target !== 'number' || target < 34) return null;

    const remainder = (target - 30) % 4;
    const base = Math.floor((target - 30) / 4);

    // Calculate values for logical cells 1 to 16
    const cellValues: Record<number, number> = {};
    for (let i = 1; i <= 16; i++) {
      let val = base + (i - 1);
      // Add remainder to the 13th cell and onwards (Jabr)
      if (i >= 13) {
        val += remainder;
      }
      cellValues[i] = val;
    }

    // Map to visual grid
    const grid = gridToLogical4x4.map(logical => cellValues[logical]);

    return { base, remainder, grid };
  }, [target]);

  return (
    <div className="flex flex-col gap-8 bg-white dark:bg-gray-950 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
      
      {/* Input Section */}
      <div className="flex flex-col gap-3">
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          {t('TargetNumber')}
        </label>
        <input
          type="number"
          min="34"
          value={target}
          onChange={(e) => setTarget(e.target.value ? parseInt(e.target.value, 10) : '')}
          placeholder="Ex: 66, 313..."
          className="w-full p-4 text-xl font-mono bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
          <Info className="w-4 h-4" /> La valeur minimum pour un Wafq 4x4 classique est de 34.
        </p>
      </div>

      {/* Grid Display */}
      {wafqData ? (
        <div className="flex flex-col items-center gap-6">
          <div className="grid grid-cols-4 gap-2 sm:gap-3 p-4 sm:p-6 bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-200 dark:border-amber-800/50">
            {wafqData.grid.map((val, idx) => (
              <div 
                key={idx}
                className="w-14 h-14 sm:w-20 sm:h-20 flex items-center justify-center bg-white dark:bg-gray-900 border-2 border-amber-300 dark:border-amber-700 rounded-xl shadow-sm"
              >
                <span className="text-lg sm:text-2xl font-bold font-mono text-gray-900 dark:text-white">
                  {val}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 px-6 py-3 rounded-lg border border-gray-200 dark:border-gray-800">
            <div><strong>{t('Base')}:</strong> {wafqData.base}</div>
            {wafqData.remainder > 0 && (
              <div className="text-orange-600 dark:text-orange-400">
                <strong>{t('Remainder')}:</strong> {wafqData.remainder} (ajouté au rang 13)
              </div>
            )}
            <div><strong>{t('Sum')}:</strong> {target}</div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-gray-400 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl">
          <LayoutGridIcon className="w-12 h-12 mb-4 opacity-50" />
          <p>{t('EnterTargetWafq')}</p>
        </div>
      )}

    </div>
  );
}

function LayoutGridIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 21V9" />
      <path d="M15 21V9" />
    </svg>
  );
}
