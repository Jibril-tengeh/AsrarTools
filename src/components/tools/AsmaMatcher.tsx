import React, { useState, useMemo } from 'react';
import { asmaAlHusna } from '../../data/asmaData';

export function AsmaMatcher() {
  const [target, setTarget] = useState<number | ''>('');

  const matches = useMemo(() => {
    if (typeof target !== 'number' || target <= 0) return [];
    
    // Simple matching: find names where Abjad == target
    // Or combinations of 2 names that equal target
    const exact = asmaAlHusna.filter(a => a.abjad === target);
    
    const pairs: Array<{ name1: string, name2: string, sum: number }> = [];
    if (exact.length === 0 && target > 20) {
      for (let i = 0; i < asmaAlHusna.length; i++) {
        for (let j = i + 1; j < asmaAlHusna.length; j++) {
          if (asmaAlHusna[i].abjad + asmaAlHusna[j].abjad === target) {
            pairs.push({
              name1: asmaAlHusna[i].arabic,
              name2: asmaAlHusna[j].arabic,
              sum: target
            });
          }
        }
      }
    }

    return { exact, pairs };
  }, [target]);

  return (
    <div className="flex flex-col gap-6 bg-white dark:bg-obsidian-900 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
      
      <div className="flex flex-col gap-3">
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Valeur Abjad Cible
        </label>
        <input
          type="number"
          min="1"
          value={target}
          onChange={(e) => setTarget(e.target.value ? parseInt(e.target.value, 10) : '')}
          placeholder="Ex: 66, 129, 313..."
          className="w-full p-4 text-xl font-mono bg-gray-50 dark:bg-obsidian-950 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-gold-500 focus:outline-none text-gray-900 dark:text-white"
        />
      </div>

      {typeof target === 'number' && target > 0 && (
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-gold-600 dark:text-gold-500">Résultats de correspondance</h3>
          
          {matches.exact.length > 0 ? (
            <div className="flex flex-col gap-2">
              <h4 className="text-sm text-gray-500">Correspondances exactes :</h4>
              {matches.exact.map(a => (
                <div key={a.id} className="p-4 bg-gray-50 dark:bg-obsidian-950 rounded-xl border border-gray-200 dark:border-gray-800 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-lg dark:text-white">{a.arabic}</div>
                    <div className="text-sm text-gray-500">{a.transliteration} - {a.meaning}</div>
                  </div>
                  <div className="font-mono text-gold-500">{a.abjad}</div>
                </div>
              ))}
            </div>
          ) : matches.pairs.length > 0 ? (
            <div className="flex flex-col gap-2">
              <h4 className="text-sm text-gray-500">Combinaisons de 2 Noms :</h4>
              {matches.pairs.slice(0, 10).map((p, idx) => (
                <div key={idx} className="p-4 bg-gray-50 dark:bg-obsidian-950 rounded-xl border border-gray-200 dark:border-gray-800 flex justify-between items-center">
                  <div className="font-bold text-lg dark:text-white" dir="rtl">{p.name1} + {p.name2}</div>
                  <div className="font-mono text-gold-500">{p.sum}</div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Aucune correspondance simple trouvée pour ce nombre.</p>
          )}
        </div>
      )}
    </div>
  );
}
