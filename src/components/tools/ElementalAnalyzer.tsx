import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const elementMap: Record<string, string> = {
  'ا': 'Feu', 'ه': 'Feu', 'ط': 'Feu', 'م': 'Feu', 'ف': 'Feu', 'ش': 'Feu', 'ذ': 'Feu',
  'ب': 'Terre', 'و': 'Terre', 'ي': 'Terre', 'ن': 'Terre', 'ص': 'Terre', 'ت': 'Terre', 'ض': 'Terre',
  'ج': 'Air', 'ز': 'Air', 'ك': 'Air', 'س': 'Air', 'ق': 'Air', 'ث': 'Air', 'ظ': 'Air',
  'د': 'Eau', 'ح': 'Eau', 'ل': 'Eau', 'ع': 'Eau', 'ر': 'Eau', 'خ': 'Eau', 'غ': 'Eau',
  // normalized variants
  'أ': 'Feu', 'إ': 'Feu', 'آ': 'Feu', 'ة': 'Feu', 'ؤ': 'Terre', 'ئ': 'Terre', 'ى': 'Terre'
};

const COLORS = {
  'Feu': '#ef4444',   // red
  'Terre': '#8b5cf6', // purple or brown
  'Air': '#f59e0b',   // amber
  'Eau': '#3b82f6'    // blue
};

export function ElementalAnalyzer() {
  const [inputText, setInputText] = useState('');

  const data = useMemo(() => {
    const counts = { 'Feu': 0, 'Terre': 0, 'Air': 0, 'Eau': 0 };
    let total = 0;
    for (const char of inputText) {
      const el = elementMap[char];
      if (el) {
        counts[el as keyof typeof counts]++;
        total++;
      }
    }

    if (total === 0) return [];

    return Object.entries(counts)
      .filter(([_, count]) => count > 0)
      .map(([name, value]) => ({ name, value }));
  }, [inputText]);

  return (
    <div className="flex flex-col gap-6 bg-white dark:bg-obsidian-900 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
      <div className="flex flex-col gap-3">
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Texte à analyser (Taba'i)
        </label>
        <input
          dir="rtl"
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Entrez un nom ou un texte..."
          className="w-full p-4 text-xl font-mono bg-gray-50 dark:bg-obsidian-950 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-gold-500 focus:outline-none text-gray-900 dark:text-white"
        />
      </div>

      {data.length > 0 ? (
        <div className="h-64 w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#050608', borderColor: '#333', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex items-center justify-center py-12 text-gray-400 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl">
          <p>Entrez un texte en arabe pour voir l'analyse élémentaire.</p>
        </div>
      )}
    </div>
  );
}
