import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshCcw, Info } from 'lucide-react';

// Standard 3x3 Ghazali layout (Batad Zahwaj Wah)
// 4 9 2
// 3 5 7
// 8 1 6
// Mapping visual grid (0-8) to logical cell numbers (1-9)
const gridToLogical = [
  4, 9, 2,
  3, 5, 7,
  8, 1, 6
];

export function WafqGenerator() {
  const { t } = useTranslation();
  const [target, setTarget] = useState<number | ''>('');

  const wafqData = useMemo(() => {
    if (typeof target !== 'number' || target < 15) return null;

    const remainder = (target - 12) % 3;
    const base = Math.floor((target - 12) / 3);

    // Calculate values for logical cells 1 to 9
    const cellValues: Record<number, number> = {};
    for (let i = 1; i <= 9; i++) {
      let val = base + (i - 1);
      // Add remainder to the 7th cell and onwards (Jabr)
      if (i >= 7) {
        val += remainder;
      }
      cellValues[i] = val;
    }

    // Map to visual grid
    const grid = gridToLogical.map(logical => cellValues[logical]);

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
          min="15"
          value={target}
          onChange={(e) => setTarget(e.target.value ? parseInt(e.target.value, 10) : '')}
          placeholder="Ex: 66, 313..."
          className="w-full p-4 text-xl font-mono bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
          <Info className="w-4 h-4" /> {t('WafqMinWarn')}
        </p>
      </div>

      {/* Grid Display */}
      {wafqData ? (
        <div className="flex flex-col items-center gap-6">
          <div className="grid grid-cols-3 gap-2 sm:gap-4 p-4 sm:p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-200 dark:border-emerald-800/50">
            {wafqData.grid.map((val, idx) => (
              <div 
                key={idx}
                className="w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center bg-white dark:bg-gray-900 border-2 border-emerald-300 dark:border-emerald-700 rounded-xl shadow-sm"
              >
                <span className="text-xl sm:text-3xl font-bold font-mono text-gray-900 dark:text-white">
                  {val}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 px-6 py-3 rounded-lg border border-gray-200 dark:border-gray-800">
            <div><strong>{t('Base')}:</strong> {wafqData.base}</div>
            {wafqData.remainder > 0 && (
              <div className="text-amber-600 dark:text-amber-400">
                <strong>{t('Remainder')}:</strong> {wafqData.remainder} {t('AddedToRank')}
              </div>
            )}
            <div><strong>{t('Sum')}:</strong> {target}</div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-gray-400 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl">
          <Grid3x3Icon className="w-12 h-12 mb-4 opacity-50" />
          <p>{t('EnterTargetWafq')}</p>
        </div>
      )}

    </div>
  );
}

function Grid3x3Icon(props: any) {
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
      <path d="M3 15h18" />
      <path d="M9 3v18" />
      <path d="M15 3v18" />
    </svg>
  );
}
