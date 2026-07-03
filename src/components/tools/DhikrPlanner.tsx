import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calculator } from 'lucide-react';

export function DhikrPlanner() {
  const { t } = useTranslation();
  const [abjadValue, setAbjadValue] = useState<number | ''>('');

  const renderPlan = () => {
    if (typeof abjadValue !== 'number' || abjadValue <= 0) return null;

    // A common planner logic: total value is split into 7 days
    const dailyTarget = Math.ceil(abjadValue / 7);
    const remainder = abjadValue % 7;

    return (
      <div className="flex flex-col gap-6 mt-6">
        <h3 className="font-bold text-lg text-amber-800 dark:text-amber-400">Plan de 7 Jours</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="flex flex-col p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-xl">
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">Jour {i + 1}</span>
              <span className="text-2xl font-bold text-amber-600 dark:text-amber-500">
                {i === 6 && remainder !== 0 ? dailyTarget - (7 - remainder) : dailyTarget}
              </span>
            </div>
          ))}
        </div>
        
        <div className="p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm text-gray-600 dark:text-gray-400">
          <p>Multiplicateurs Spirituels :</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Petit cycle (Asghar) : {abjadValue}</li>
            <li>Moyen cycle (Akbar) : {abjadValue * 10}</li>
            <li>Grand cycle (A'dham) : {abjadValue * 100}</li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-8 bg-white dark:bg-gray-950 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
      
      <div className="flex flex-col gap-3">
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Valeur Abjad du Nom (قيمة الاسم)
        </label>
        <input
          type="number"
          min="1"
          value={abjadValue}
          onChange={(e) => setAbjadValue(e.target.value ? parseInt(e.target.value, 10) : '')}
          placeholder="Ex: 66 (Allah), 129 (Latif)..."
          className="w-full p-4 text-xl font-mono bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
        />
      </div>

      {abjadValue ? (
        renderPlan()
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-gray-400 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl">
          <Calculator className="w-12 h-12 mb-4 opacity-50" />
          <p>Entrez une valeur d'Abjad pour générer un plan.</p>
        </div>
      )}
    </div>
  );
}
