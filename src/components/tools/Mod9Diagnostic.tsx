import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshCcw, Shield, CheckCircle2, AlertTriangle, Info } from 'lucide-react';
import { abjadKabirMap } from '../../lib/abjad';

export function Mod9Diagnostic() {
  const { t } = useTranslation();
  const [personName, setPersonName] = useState('');
  const [motherName, setMotherName] = useState('');

  const calculateAdadi = (text: string) => {
    let total = 0;
    for (const char of text) {
      if (abjadKabirMap[char]) {
        total += abjadKabirMap[char];
      }
    }
    return total;
  };

  const getDiagnostic = () => {
    if (!personName || !motherName) return null;

    const val1 = calculateAdadi(personName);
    const val2 = calculateAdadi(motherName);
    const sum = val1 + val2;
    const mod = sum % 9 || 9; // If 0, it means 9

    // Traditional Mod 9 diagnostic interpretations (example mapping)
    const interpretations: Record<number, { title: string, desc: string, type: 'good' | 'warning' | 'neutral' }> = {
      1: { title: 'Déséquilibre Spirituel', desc: 'Indique une possible affection spirituelle nécessitant une purification.', type: 'warning' },
      2: { title: 'Harmonie Naturelle', desc: 'État spirituel stable, aucune influence externe majeure détectée.', type: 'good' },
      3: { title: 'Blocage Énergétique', desc: 'Présence de nœuds énergétiques affectant la vitalité.', type: 'warning' },
      4: { title: 'Protection Forte', desc: 'Bonne protection naturelle, barrières spirituelles intactes.', type: 'good' },
      5: { title: 'Influence Temporelle', desc: 'Perturbations liées aux cycles lunaires ou planétaires.', type: 'neutral' },
      6: { title: 'Équilibre Parfait', desc: 'Excellente constitution spirituelle et mentale.', type: 'good' },
      7: { title: 'Vulnérabilité Émotionnelle', desc: 'Sensibilité accrue aux énergies environnantes.', type: 'neutral' },
      8: { title: 'Interférence Externe', desc: 'Possibilité d\'énergies intrusives (Ayn, Hasad).', type: 'warning' },
      9: { title: 'Renouvellement Nécessaire', desc: 'Fin de cycle, besoin de se recentrer spirituellement.', type: 'neutral' }
    };

    return { val1, val2, sum, mod, interpretation: interpretations[mod] };
  };

  const result = getDiagnostic();

  return (
    <div className="flex flex-col gap-8 bg-white dark:bg-gray-950 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 max-w-xl mx-auto w-full">
      <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-900 pb-4">
         <h2 className="text-lg font-bold flex items-center gap-2 text-rose-700 dark:text-rose-500">
            <Shield className="w-5 h-5" />
            {t('Mod9Diagnostic')}
         </h2>
         <button 
           onClick={() => { setPersonName(''); setMotherName(''); }}
           className="p-2 text-gray-400 hover:text-rose-600 rounded-full transition-colors"
         >
           <RefreshCcw className="w-5 h-5" />
         </button>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
           <label className="text-sm font-semibold">{t('PersonName')}</label>
           <input 
             dir="rtl"
             type="text" 
             value={personName} 
             onChange={e => setPersonName(e.target.value)} 
             className="p-3 border rounded-xl dark:bg-gray-900 dark:border-gray-800 focus:ring-2 focus:ring-rose-500 outline-none text-xl" 
           />
        </div>
        <div className="flex flex-col gap-2">
           <label className="text-sm font-semibold">{t('MotherName')}</label>
           <input 
             dir="rtl"
             type="text" 
             value={motherName} 
             onChange={e => setMotherName(e.target.value)} 
             className="p-3 border rounded-xl dark:bg-gray-900 dark:border-gray-800 focus:ring-2 focus:ring-rose-500 outline-none text-xl" 
           />
        </div>
      </div>

      {result && (
        <div className="mt-4 flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-2 text-center">
             <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg border border-gray-100 dark:border-gray-800">
               <div className="text-xs text-gray-500 uppercase">{t('PersonValue')}</div>
               <div className="font-bold text-xl">{result.val1}</div>
             </div>
             <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg border border-gray-100 dark:border-gray-800">
               <div className="text-xs text-gray-500 uppercase">{t('MotherValue')}</div>
               <div className="font-bold text-xl">{result.val2}</div>
             </div>
             <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg border border-gray-100 dark:border-gray-800">
               <div className="text-xs text-gray-500 uppercase">{t('TotalSum')}</div>
               <div className="font-bold text-xl">{result.sum}</div>
             </div>
          </div>

          <div className={`p-6 rounded-xl border ${
            result.interpretation.type === 'good' ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800/50' :
            result.interpretation.type === 'warning' ? 'bg-rose-50 border-rose-200 dark:bg-rose-900/20 dark:border-rose-800/50' :
            'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800/50'
          }`}>
             <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 flex items-center justify-center rounded-full text-2xl font-black ${
                  result.interpretation.type === 'good' ? 'bg-emerald-200 text-emerald-800' :
                  result.interpretation.type === 'warning' ? 'bg-rose-200 text-rose-800' :
                  'bg-blue-200 text-blue-800'
                }`}>
                  {result.mod}
                </div>
                <div>
                   <div className="text-xs font-bold uppercase opacity-60">Résultat Modulo 9</div>
                   <h3 className="font-bold text-lg">{result.interpretation.title}</h3>
                </div>
             </div>
             <p className="opacity-90 leading-relaxed">
               {result.interpretation.desc}
             </p>
          </div>
        </div>
      )}
    </div>
  );
}
