import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshCcw, Feather, Sparkles, ScrollText, Star } from 'lucide-react';

export function AngelicTool() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'birhatiah' | 'malaikah' | 'seal'>('birhatiah');

  return (
    <div className="flex flex-col gap-8 bg-white dark:bg-gray-950 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 max-w-4xl mx-auto w-full">
      <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-900 pb-4">
         <h2 className="text-lg font-bold flex items-center gap-2 text-fuchsia-700 dark:text-fuchsia-500">
            <Feather className="w-5 h-5" />
            Noms Angéliques et Invocations
         </h2>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        <button 
          onClick={() => setActiveTab('birhatiah')}
          className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
            activeTab === 'birhatiah' 
              ? 'bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900/30 dark:text-fuchsia-300' 
              : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-900'
          }`}
        >
          <Sparkles className="w-4 h-4 inline-block mr-2" />
          Al-Birhatiah
        </button>
        <button 
          onClick={() => setActiveTab('malaikah')}
          className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
            activeTab === 'malaikah' 
              ? 'bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900/30 dark:text-fuchsia-300' 
              : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-900'
          }`}
        >
          <ScrollText className="w-4 h-4 inline-block mr-2" />
          Anges des Jours/Planètes
        </button>
        <button 
          onClick={() => setActiveTab('seal')}
          className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
            activeTab === 'seal' 
              ? 'bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900/30 dark:text-fuchsia-300' 
              : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-900'
          }`}
        >
          <Star className="w-4 h-4 inline-block mr-2" />
          Génération de Sceaux (Khatam)
        </button>
      </div>

      <div className="min-h-[300px]">
        {activeTab === 'birhatiah' && (
          <div className="flex flex-col gap-4">
             <p className="text-gray-600 dark:text-gray-400">
               Le serment de la Birhatiah (البرهتية) est composé de 28 noms syriaques anciens correspondant aux 28 lettres de l'alphabet arabe et aux 28 mansions lunaires.
             </p>
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-4">
               {['Birhatiah (برهتية) - Alif', 'Karir (كرير) - Ba', 'Tatliyah (تتليه) - Jim', 'Touran (طوران) - Dal'].map((name, i) => (
                 <div key={i} className="p-3 border border-fuchsia-100 dark:border-fuchsia-900/30 bg-fuchsia-50/50 dark:bg-fuchsia-900/10 rounded-lg text-center font-medium">
                   {name}
                 </div>
               ))}
               <div className="p-3 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-center text-gray-500 flex items-center justify-center">
                 + 24 autres noms (Base de données en cours)
               </div>
             </div>
          </div>
        )}

        {activeTab === 'malaikah' && (
          <div className="flex flex-col gap-4">
             <p className="text-gray-600 dark:text-gray-400">
               Correspondances des Anges gouverneurs selon les jours de la semaine et les planètes.
             </p>
             <div className="overflow-x-auto">
               <table className="w-full text-left text-sm text-gray-600 dark:text-gray-400">
                 <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400 border-b dark:border-gray-800">
                   <tr>
                     <th className="px-6 py-3">Jour</th>
                     <th className="px-6 py-3">Planète</th>
                     <th className="px-6 py-3">Ange Supérieur (Malaikah)</th>
                     <th className="px-6 py-3">Ange Inférieur (Ruhani)</th>
                   </tr>
                 </thead>
                 <tbody>
                   <tr className="border-b dark:border-gray-800">
                     <td className="px-6 py-4 font-medium">Dimanche</td>
                     <td className="px-6 py-4 text-amber-500 font-bold">Soleil</td>
                     <td className="px-6 py-4">Rougayail (روقيائيل)</td>
                     <td className="px-6 py-4">Mudhib (مذهب)</td>
                   </tr>
                   <tr className="border-b dark:border-gray-800">
                     <td className="px-6 py-4 font-medium">Lundi</td>
                     <td className="px-6 py-4 text-slate-400 font-bold">Lune</td>
                     <td className="px-6 py-4">Jibrail (جبرائيل)</td>
                     <td className="px-6 py-4">Murrah (مرة)</td>
                   </tr>
                   <tr>
                     <td className="px-6 py-4 text-center text-gray-400" colSpan={4}>... Suite de la table ...</td>
                   </tr>
                 </tbody>
               </table>
             </div>
          </div>
        )}

        {activeTab === 'seal' && (
          <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
             <div className="w-32 h-32 border-4 border-fuchsia-500 rounded-full flex flex-col items-center justify-center relative">
                <Star className="w-16 h-16 text-fuchsia-300 absolute" />
                <span className="font-bold text-fuchsia-700 dark:text-fuchsia-400 z-10 text-xl">يا الله</span>
             </div>
             <p className="text-gray-500 max-w-md">
                Générateur de sceaux angéliques (Khatam). Cet outil construira des symboles géométriques basés sur la valeur Abjad des noms divins ou angéliques saisis.
             </p>
             <button className="px-6 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg text-sm font-semibold transition-colors mt-4">
               Activer le moteur géométrique
             </button>
          </div>
        )}
      </div>
    </div>
  );
}
