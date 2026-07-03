import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshCcw, Clock, Moon, ShieldAlert, Zap } from 'lucide-react';

export function CyclesTool() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'vulnerability' | 'biorhythm' | 'ghayb'>('vulnerability');

  return (
    <div className="flex flex-col gap-8 bg-white dark:bg-gray-950 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 max-w-4xl mx-auto w-full">
      <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-900 pb-4">
         <h2 className="text-lg font-bold flex items-center gap-2 text-indigo-700 dark:text-indigo-500">
            <Clock className="w-5 h-5" />
            Cycles et Périodes
         </h2>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        <button 
          onClick={() => setActiveTab('vulnerability')}
          className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
            activeTab === 'vulnerability' 
              ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300' 
              : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-900'
          }`}
        >
          <ShieldAlert className="w-4 h-4 inline-block mr-2" />
          Heures de Vulnérabilité (Nahs)
        </button>
        <button 
          onClick={() => setActiveTab('biorhythm')}
          className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
            activeTab === 'biorhythm' 
              ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300' 
              : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-900'
          }`}
        >
          <Zap className="w-4 h-4 inline-block mr-2" />
          Biorhythme Spirituel
        </button>
        <button 
          onClick={() => setActiveTab('ghayb')}
          className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
            activeTab === 'ghayb' 
              ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300' 
              : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-900'
          }`}
        >
          <Moon className="w-4 h-4 inline-block mr-2" />
          Rijal al-Ghayb (Directions)
        </button>
      </div>

      <div className="min-h-[300px]">
        {activeTab === 'vulnerability' && (
          <div className="flex flex-col gap-6">
             <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-xl border border-rose-200 dark:border-rose-900/50">
               <h3 className="font-bold text-rose-800 dark:text-rose-400 mb-2">Périodes Néfastes (Sa'at al-Nahs)</h3>
               <p className="text-gray-700 dark:text-gray-300">
                 Certaines heures sont considérées comme propices à la vulnérabilité spirituelle ou aux attaques. Il est déconseillé d'y entamer des rituels positifs.
               </p>
             </div>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl">
                 <h4 className="font-bold mb-1">Heure de Saturne (Zuhal)</h4>
                 <p className="text-sm text-gray-500">Heure de contraction et de restriction. Associée à la mélancolie.</p>
               </div>
               <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl">
                 <h4 className="font-bold mb-1">Heure de Mars (Mirrikh)</h4>
                 <p className="text-sm text-gray-500">Heure de conflit, de colère et de chaleur excessive.</p>
               </div>
             </div>
             <p className="text-sm text-gray-500 italic mt-4">
                Utilisez l'outil "Heures Planétaires" dans la section Astrologie pour déterminer exactement quand tombent ces heures aujourd'hui.
             </p>
          </div>
        )}

        {activeTab === 'biorhythm' && (
          <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
             <div className="w-full max-w-md h-32 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 flex items-center justify-center overflow-hidden relative">
               <svg viewBox="0 0 400 100" className="w-full h-full opacity-50">
                 <path d="M0,50 Q100,10 200,50 T400,50" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-500" />
                 <path d="M0,50 Q100,90 200,50 T400,50" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-500" />
                 <path d="M0,50 Q50,0 100,50 T200,50 T300,50 T400,50" fill="none" stroke="currentColor" strokeWidth="2" className="text-rose-500" />
               </svg>
             </div>
             <p className="text-gray-500 max-w-md">
                Le Biorhythme Spirituel croise votre date de naissance avec les cycles lunaires (28 jours) pour déterminer vos pics de réceptivité (Ruhaniyyah).
             </p>
             <button className="px-6 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg text-sm font-semibold transition-colors mt-4">
               Entrer Date de Naissance
             </button>
          </div>
        )}

        {activeTab === 'ghayb' && (
          <div className="flex flex-col gap-6">
             <div className="flex items-start gap-4 p-4 border-l-4 border-indigo-500 bg-indigo-50 dark:bg-indigo-900/10 rounded-r-xl">
                <Moon className="w-8 h-8 text-indigo-500 flex-shrink-0" />
                <div>
                   <h3 className="font-bold text-indigo-800 dark:text-indigo-400 mb-1">Direction des Rijal al-Ghayb</h3>
                   <p className="text-gray-600 dark:text-gray-400 text-sm">
                     La tradition stipule que la direction des "Hommes de l'Invisible" change chaque jour du mois lunaire. Il convient de ne pas leur tourner le dos lors des invocations.
                   </p>
                </div>
             </div>
             
             <div className="grid gap-4">
                <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl flex justify-between items-center">
                   <div>
                     <h4 className="font-bold mb-1">Aujourd'hui (Ex: 14 du mois lunaire)</h4>
                     <p className="text-sm text-gray-500">Ils se trouvent en direction de l'Ouest.</p>
                   </div>
                   <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 font-bold">
                     W
                   </div>
                </div>
             </div>
             
             <p className="text-xs text-gray-400 text-center">
                (Nécessite la synchronisation avec le calendrier lunaire Hijri - À intégrer via API)
             </p>
          </div>
        )}
      </div>
    </div>
  );
}
