import React, { useState, useMemo } from 'react';
import { RefreshCcw, Info, Settings2 } from 'lucide-react';
import { cn } from '../../lib/utils';

type WafqSize = 3 | 4 | 5;

const gridToLogical3x3 = [4, 9, 2, 3, 5, 7, 8, 1, 6];
const gridToLogical4x4 = [8, 11, 14, 1, 13, 2, 7, 12, 3, 16, 9, 6, 10, 5, 4, 15];
// Standard 5x5 layout (Mukhammas)
const gridToLogical5x5 = [
  11, 24, 7, 20, 3,
  4, 12, 25, 8, 16,
  17, 5, 13, 21, 9,
  10, 18, 1, 14, 22,
  23, 6, 19, 2, 15
];

export function AdvancedWafqGenerator() {
  const [target, setTarget] = useState<number | ''>('');
  const [size, setSize] = useState<WafqSize>(3);

  const minTarget = useMemo(() => {
    if (size === 3) return 15;
    if (size === 4) return 34;
    return 65; // for 5x5
  }, [size]);

  const wafqData = useMemo(() => {
    if (typeof target !== 'number' || target < minTarget) return null;

    let base = 0;
    let remainder = 0;
    let totalCells = size * size;
    let magicConstantSum = 0;
    let extraPoint = 0; // The cell index where remainder is added
    let gridToLogical: number[] = [];

    if (size === 3) {
      remainder = (target - 12) % 3;
      base = Math.floor((target - 12) / 3);
      extraPoint = 7;
      gridToLogical = gridToLogical3x3;
    } else if (size === 4) {
      remainder = (target - 30) % 4;
      base = Math.floor((target - 30) / 4);
      extraPoint = 13;
      gridToLogical = gridToLogical4x4;
    } else if (size === 5) {
      remainder = (target - 60) % 5;
      base = Math.floor((target - 60) / 5);
      extraPoint = 21; // Rule of thumb for 5x5 jabr usually varies, often applied at cell 21
      gridToLogical = gridToLogical5x5;
    }

    const cellValues: Record<number, number> = {};
    for (let i = 1; i <= totalCells; i++) {
      let val = base + (i - 1);
      if (i >= extraPoint) {
        val += remainder;
      }
      cellValues[i] = val;
    }

    const grid = gridToLogical.map(logical => cellValues[logical]);

    return { base, remainder, extraPoint, grid };
  }, [target, size, minTarget]);

  return (
    <div className="flex flex-col gap-8 bg-white dark:bg-obsidian-900 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
      
      {/* Settings */}
      <div className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 dark:bg-obsidian-950 rounded-xl border border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2 text-gold-600 dark:text-gold-500 mb-2 sm:mb-0">
          <Settings2 className="w-5 h-5" />
          <span className="font-semibold text-sm">Options Wafq</span>
        </div>
        <div className="flex gap-2">
          {[3, 4, 5].map(s => (
            <button
              key={s}
              onClick={() => { setSize(s as WafqSize); setTarget(''); }}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                size === s 
                  ? "bg-gold-500 text-obsidian-950" 
                  : "bg-white dark:bg-obsidian-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-gold-500"
              )}
            >
              {s}x{s}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="flex flex-col gap-3">
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Nombre cible (العدد المطلوب)
        </label>
        <input
          type="number"
          min={minTarget}
          value={target}
          onChange={(e) => setTarget(e.target.value ? parseInt(e.target.value, 10) : '')}
          placeholder={`Ex: 66, minimum: ${minTarget}`}
          className="w-full p-4 text-xl font-mono bg-gray-50 dark:bg-obsidian-950 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-gold-500 focus:outline-none text-gray-900 dark:text-white"
        />
      </div>

      {/* Grid */}
      {wafqData ? (
        <div className="flex flex-col items-center gap-6">
          <div className={cn(
            "grid gap-2 sm:gap-3 p-4 sm:p-6 bg-gold-50 dark:bg-gold-900/10 rounded-2xl border border-gold-200 dark:border-gold-800/30",
            size === 3 ? "grid-cols-3" : size === 4 ? "grid-cols-4" : "grid-cols-5"
          )}>
            {wafqData.grid.map((val, idx) => (
              <div 
                key={idx}
                className={cn(
                  "flex items-center justify-center bg-white dark:bg-obsidian-900 border-2 border-gold-300 dark:border-gold-700/50 rounded-xl shadow-sm transition-all duration-300",
                  size === 5 ? "w-10 h-10 sm:w-14 sm:h-14 text-sm sm:text-lg" : "w-14 h-14 sm:w-20 sm:h-20 text-lg sm:text-2xl"
                )}
              >
                <span className="font-bold font-mono text-gray-900 dark:text-gold-400">
                  {val}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-obsidian-950 px-6 py-3 rounded-lg border border-gray-200 dark:border-gray-800">
            <div><strong>Miftah (Base):</strong> {wafqData.base}</div>
            {wafqData.remainder > 0 && (
              <div className="text-orange-600 dark:text-orange-400">
                <strong>Kasr (Reste):</strong> {wafqData.remainder} (au rang {wafqData.extraPoint})
              </div>
            )}
            <div><strong>Somme:</strong> {target}</div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-gray-400 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl">
          <p>Entrez un nombre cible (min: {minTarget}) pour générer le Wafq {size}x{size}.</p>
        </div>
      )}
    </div>
  );
}
