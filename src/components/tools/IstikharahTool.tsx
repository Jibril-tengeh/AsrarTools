import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshCcw, HelpCircle, Book, CircleDot, UserPlus } from 'lucide-react';

export function IstikharahTool() {
  const { t } = useTranslation();
  const [method, setMethod] = useState<'subhah' | 'quran' | 'sharik'>('subhah');
  const [result, setResult] = useState<string | null>(null);

  const castSubhah = () => {
    // In actual Subhah Istikharah, one grabs a random amount of beads
    // and counts them by a certain modulo (e.g. 3)
    const randomBeads = Math.floor(Math.random() * 50) + 20; // 20 to 70 beads
    const remainder = randomBeads % 3;
    
    if (remainder === 1) setResult('Favorable (1) - L\'action est conseillée et porte bénédiction.');
    else if (remainder === 2) setResult('Défavorable (2) - L\'action est déconseillée, évitez-la.');
    else setResult('Neutre (0/3) - Vous avez le choix, mais la patience est recommandée.');
  };

  const castQuran = () => {
    // Opening Quran randomly (Faal)
    // We simulate finding a verse
    const types = [
      'Verset de Miséricorde (Rahma) - Favorable, lancez-vous avec confiance.',
      'Verset de Châtiment (Adhab) - Défavorable, abstenez-vous.',
      'Verset Neutre (Ahkam/Histoires) - Patientez ou consultez à nouveau ultérieurement.'
    ];
    setResult(types[Math.floor(Math.random() * types.length)]);
  };

  const calculateSharik = () => {
    // For partnership: Name 1 + Name 2 / modulo etc.
    setResult('Le calcul de compatibilité pour le partenariat nécessite les noms des deux personnes (à implémenter via Abjad).');
  };

  const clear = () => setResult(null);

  return (
    <div className="flex flex-col gap-8 bg-white dark:bg-gray-950 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 max-w-2xl mx-auto w-full">
      <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-900 pb-4">
         <h2 className="text-lg font-bold flex items-center gap-2 text-sky-700 dark:text-sky-500">
            <HelpCircle className="w-5 h-5" />
            {t('IstikharahTools', 'Outils d\'Istikharah')}
         </h2>
         <button 
           onClick={clear}
           className="p-2 text-gray-400 hover:text-sky-600 rounded-full transition-colors"
         >
           <RefreshCcw className="w-5 h-5" />
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button 
          onClick={() => setMethod('subhah')}
          className={`p-4 flex flex-col items-center gap-3 rounded-xl border transition-all ${
            method === 'subhah' 
              ? 'bg-sky-50 border-sky-200 text-sky-700 dark:bg-sky-900/20 dark:border-sky-800 dark:text-sky-400' 
              : 'border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-400 dark:hover:bg-gray-900'
          }`}
        >
          <CircleDot className="w-8 h-8" />
          <span className="font-bold text-sm">Chapelet (Subhah)</span>
        </button>

        <button 
          onClick={() => setMethod('quran')}
          className={`p-4 flex flex-col items-center gap-3 rounded-xl border transition-all ${
            method === 'quran' 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-400' 
              : 'border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-400 dark:hover:bg-gray-900'
          }`}
        >
          <Book className="w-8 h-8" />
          <span className="font-bold text-sm">Coran (Faal)</span>
        </button>

        <button 
          onClick={() => setMethod('sharik')}
          className={`p-4 flex flex-col items-center gap-3 rounded-xl border transition-all ${
            method === 'sharik' 
              ? 'bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-900/20 dark:border-indigo-800 dark:text-indigo-400' 
              : 'border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-400 dark:hover:bg-gray-900'
          }`}
        >
          <UserPlus className="w-8 h-8" />
          <span className="font-bold text-sm">Partenariat (Sharik)</span>
        </button>
      </div>

      <div className="flex flex-col items-center justify-center py-8">
         {result ? (
           <div className="p-6 rounded-xl border bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-center w-full">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Résultat de la consultation</h3>
              <p className="text-xl font-medium leading-relaxed">{result}</p>
              
              <button 
                onClick={clear}
                className="mt-6 px-6 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Nouvelle Consultation
              </button>
           </div>
         ) : (
           <div className="flex flex-col items-center text-center max-w-sm gap-4">
              <p className="text-gray-500">
                {method === 'subhah' && "Concentrez-vous sur votre intention (Niyyah), puis cliquez ci-dessous pour simuler le tirage au chapelet."}
                {method === 'quran' && "Formulez votre intention (Niyyah), puis cliquez pour simuler l'ouverture du Livre."}
                {method === 'sharik' && "Calculez la compatibilité spirituelle entre deux personnes pour un projet ou un partenariat."}
              </p>
              
              <button 
                onClick={() => {
                  if (method === 'subhah') castSubhah();
                  if (method === 'quran') castQuran();
                  if (method === 'sharik') calculateSharik();
                }}
                className="px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white dark:bg-gray-100 dark:hover:bg-white dark:text-gray-900 rounded-xl font-bold shadow-lg transition-all active:scale-95"
              >
                Procéder
              </button>
           </div>
         )}
      </div>
    </div>
  );
}
