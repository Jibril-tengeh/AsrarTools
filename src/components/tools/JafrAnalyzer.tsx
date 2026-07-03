import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshCcw, Eye, Search } from 'lucide-react';
import { abjadKabirMap } from '../../lib/abjad';

export function JafrAnalyzer() {
  const { t } = useTranslation();
  const [question, setQuestion] = useState('');

  // Example basic Jafr Jami logic (simplified)
  const analyzeJafr = () => {
    let adadi = 0;
    let stripped = '';
    
    // 1. Strip spaces and calculate base value
    for (const char of question) {
      if (char !== ' ' && abjadKabirMap[char]) {
         adadi += abjadKabirMap[char];
         stripped += char;
      }
    }

    if (!stripped) return null;

    // 2. Takseer (breaking down) - very simplified for UI demo
    // Usually involves complex matrix operations (Taksir Muakhar/Muqaddam)
    const reversed = stripped.split('').reverse().join('');
    
    // 3. Istintaq (Making it speak) - finding letters corresponding to value
    let istintaqChars = [];
    let remaining = adadi;
    const units = remaining % 10;
    remaining -= units;
    const tens = remaining % 100;
    remaining -= tens;
    const hundreds = remaining % 1000;
    remaining -= hundreds;
    const thousands = remaining;

    // We'd map these back to letters in a real implementation
    // For demo, we just show the breakdown
    
    return {
       adadi,
       letters: stripped.length,
       reversed,
       breakdown: { units, tens, hundreds, thousands }
    };
  };

  const result = analyzeJafr();

  return (
    <div className="flex flex-col gap-8 bg-white dark:bg-gray-950 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
      
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            {t('JafrQuestion')} - {t('JafrAnalysis')}
          </label>
          <button 
            onClick={() => setQuestion('')}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-cyan-600 transition-colors"
          >
            <RefreshCcw className="w-3.5 h-3.5" /> {t('Clear')}
          </button>
        </div>
        
        <textarea
          dir="rtl"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="اطرح سؤالك هنا..."
          className="w-full min-h-[120px] p-4 text-2xl leading-relaxed bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:outline-none resize-y"
        />
      </div>

      {result ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-900/50 flex flex-col gap-2">
             <h3 className="text-sm font-semibold text-cyan-800 dark:text-cyan-400">Asas (Base Numérique)</h3>
             <div className="text-3xl font-mono text-gray-900 dark:text-white font-bold">{result.adadi}</div>
             <div className="text-sm text-cyan-700 dark:text-cyan-500 mt-2">Décomposition : {result.breakdown.thousands} + {result.breakdown.hundreds} + {result.breakdown.tens} + {result.breakdown.units}</div>
          </div>
          
          <div className="p-4 rounded-xl border bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-900/50 flex flex-col gap-2">
             <h3 className="text-sm font-semibold text-teal-800 dark:text-teal-400">Takseer (Inversion)</h3>
             <div className="text-2xl font-mono text-gray-900 dark:text-white leading-relaxed" dir="rtl">{result.reversed}</div>
             <div className="text-sm text-teal-700 dark:text-teal-500 mt-2">Nombre de lettres : {result.letters}</div>
          </div>
          
          <div className="md:col-span-2 p-4 rounded-xl border bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800">
             <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-400 mb-2">Istintaq (Prononciation)</h3>
             <p className="text-gray-600 dark:text-gray-400 text-sm">
                Dans la science du Jafr, l'Istintaq consiste à transformer la valeur numérique finale en lettres pour extraire la réponse (Natiq). L'algorithme complet requiert des tables d'équivalences astrologiques et élémentaires.
             </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
          <Eye className="w-12 h-12 mb-4 opacity-50" />
          <p>Posez une question claire pour démarrer l'analyse Jafr</p>
        </div>
      )}
    </div>
  );
}
