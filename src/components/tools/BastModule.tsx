import React, { useState, useMemo } from 'react';

const bastHarfiMap: Record<string, string> = {
  'ا': 'الف', 'ب': 'با', 'ج': 'جيم', 'د': 'دال', 'ه': 'ها', 'و': 'واو', 'ز': 'زا', 'ح': 'حا', 'ط': 'طا',
  'ي': 'يا', 'ك': 'كاف', 'ل': 'لام', 'م': 'ميم', 'ن': 'نون', 'س': 'سين', 'ع': 'عين', 'ف': 'فا', 'ص': 'صاد',
  'ق': 'قاف', 'ر': 'را', 'ش': 'شين', 'ت': 'تا', 'ث': 'ثا', 'خ': 'خا', 'ذ': 'ذال', 'ض': 'ضاد', 'ظ': 'ظا', 'غ': 'غين'
};

export function BastModule() {
  const [inputText, setInputText] = useState('');

  const result = useMemo(() => {
    if (!inputText) return '';
    let res = '';
    for (const char of inputText) {
      if (char === ' ') res += ' ';
      else if (bastHarfiMap[char]) res += bastHarfiMap[char] + ' ';
      else res += char;
    }
    return res.trim();
  }, [inputText]);

  return (
    <div className="flex flex-col gap-6 bg-white dark:bg-obsidian-900 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
      <div className="flex flex-col gap-3">
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Texte à décomposer (Bast Harfi)
        </label>
        <input
          dir="rtl"
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Entrez un mot..."
          className="w-full p-4 text-xl font-mono bg-gray-50 dark:bg-obsidian-950 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-gold-500 focus:outline-none text-gray-900 dark:text-white"
        />
      </div>

      {result && (
        <div className="p-6 bg-gold-50 dark:bg-gold-900/10 border border-gold-200 dark:border-gold-800/30 rounded-xl text-center">
          <div className="text-sm text-gold-600 dark:text-gold-500 mb-2 font-semibold">Décomposition :</div>
          <div className="text-3xl font-bold font-mono text-gray-900 dark:text-white" dir="rtl">
            {result}
          </div>
        </div>
      )}
    </div>
  );
}
