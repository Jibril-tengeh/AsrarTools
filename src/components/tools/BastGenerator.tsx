import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshCcw, Type } from 'lucide-react';
import { abjadKabirMap } from '../../lib/abjad';

export function BastGenerator() {
  const { t } = useTranslation();
  const [inputText, setInputText] = useState('');

  // Example basic Bast (Expansion) implementation
  // Bast Harfi: Spelling out letters (e.g., Alif -> Alif Lam Fa)
  const bastHarfiMap: Record<string, string> = {
    'ا': 'الف', 'ب': 'با', 'ج': 'جيم', 'د': 'دال', 'ه': 'ها',
    'و': 'واو', 'ز': 'زا', 'ح': 'حا', 'ط': 'طا', 'ي': 'يا',
    'ك': 'كاف', 'ل': 'لام', 'م': 'ميم', 'ن': 'نون', 'س': 'سين',
    'ع': 'عين', 'ف': 'فا', 'ص': 'صاد', 'ق': 'قاف', 'ر': 'را',
    'ش': 'شين', 'ت': 'تا', 'ث': 'ثا', 'خ': 'خا', 'ذ': 'ذال',
    'ض': 'ضاد', 'ظ': 'ظا', 'غ': 'غين'
  };

  const generateBast = () => {
    let harfi = '';
    let adadi = 0;
    
    for (const char of inputText) {
      if (char === ' ') {
         harfi += ' ';
         continue;
      }
      
      if (bastHarfiMap[char]) {
        harfi += bastHarfiMap[char] + ' ';
        // Calculate Adadi based on expanded string
        for (const expandedChar of bastHarfiMap[char]) {
           adadi += abjadKabirMap[expandedChar] || 0;
        }
      } else {
        harfi += char;
        adadi += abjadKabirMap[char] || 0;
      }
    }
    
    return { harfi: harfi.trim(), adadi };
  };

  const result = inputText.length > 0 ? generateBast() : null;

  return (
    <div className="flex flex-col gap-8 bg-white dark:bg-gray-950 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
      
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            {t('ArabicText')} - {t('BastAnalysis')}
          </label>
          <button 
            onClick={() => setInputText('')}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-indigo-600 transition-colors"
          >
            <RefreshCcw className="w-3.5 h-3.5" /> {t('Clear')}
          </button>
        </div>
        
        <textarea
          dir="rtl"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="اكتب هنا..."
          className="w-full min-h-[120px] p-4 text-2xl leading-relaxed bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-y"
        />
      </div>

      {result ? (
        <div className="flex flex-col gap-4">
          <div className="p-4 rounded-xl border bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-900/50">
             <h3 className="text-sm font-semibold text-indigo-800 dark:text-indigo-400 mb-2">Bast Harfi (Expansion Littérale)</h3>
             <p className="text-xl font-mono text-gray-900 dark:text-white leading-relaxed" dir="rtl">{result.harfi}</p>
          </div>
          
          <div className="p-4 rounded-xl border bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-900/50">
             <h3 className="text-sm font-semibold text-purple-800 dark:text-purple-400 mb-2">Bast Adadi (Expansion Numérique)</h3>
             <p className="text-3xl font-mono text-gray-900 dark:text-white">{result.adadi}</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
          <Type className="w-12 h-12 mb-4 opacity-50" />
          <p>Saisissez du texte pour voir l'expansion (Bast)</p>
        </div>
      )}
    </div>
  );
}
