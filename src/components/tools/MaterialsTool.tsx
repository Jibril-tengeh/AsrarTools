import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshCcw, Droplet, Paintbrush, ShieldCheck } from 'lucide-react';

export function MaterialsTool() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'hibr' | 'alwah' | 'purification'>('hibr');

  return (
    <div className="flex flex-col gap-8 bg-white dark:bg-gray-950 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 max-w-4xl mx-auto w-full">
      <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-900 pb-4">
         <h2 className="text-lg font-bold flex items-center gap-2 text-orange-700 dark:text-orange-500">
            <Droplet className="w-5 h-5" />
            Matériaux et Préparations
         </h2>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        <button 
          onClick={() => setActiveTab('hibr')}
          className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
            activeTab === 'hibr' 
              ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' 
              : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-900'
          }`}
        >
          <Paintbrush className="w-4 h-4 inline-block mr-2" />
          Encre Spirituelle (Hibr)
        </button>
        <button 
          onClick={() => setActiveTab('alwah')}
          className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
            activeTab === 'alwah' 
              ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' 
              : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-900'
          }`}
        >
          <Droplet className="w-4 h-4 inline-block mr-2" />
          Supports (Alwah)
        </button>
        <button 
          onClick={() => setActiveTab('purification')}
          className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
            activeTab === 'purification' 
              ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' 
              : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-900'
          }`}
        >
          <ShieldCheck className="w-4 h-4 inline-block mr-2" />
          Purification (Taharah)
        </button>
      </div>

      <div className="min-h-[300px]">
        {activeTab === 'hibr' && (
          <div className="flex flex-col gap-6">
             <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-900/50">
               <h3 className="font-bold text-orange-800 dark:text-orange-400 mb-2">Recette Traditionnelle du Hibr Ruhani (Encre Spirituelle)</h3>
               <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                 <li>Safran pur (Za'faran) - Pour l'énergie solaire et l'illumination.</li>
                 <li>Musc (Misk) - Pour l'attraction et la pureté.</li>
                 <li>Eau de Rose (Ma' Ward) - Comme solvant principal.</li>
                 <li>Eau de Zamzam (optionnel) - Pour la bénédiction suprême.</li>
               </ul>
             </div>
             
             <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl">
               <h3 className="font-bold text-gray-800 dark:text-gray-300 mb-2">Instructions de préparation</h3>
               <p className="text-gray-600 dark:text-gray-400">
                 Mélangez le safran et le musc dans un récipient en verre pur. Ajoutez l'eau de rose progressivement jusqu'à obtenir la consistance désirée. Lisez la Fatiha 7 fois, le verset du Trône (Ayat al-Kursi) 3 fois, et soufflez sur le mélange. Conservez à l'abri de la lumière directe.
               </p>
             </div>
          </div>
        )}

        {activeTab === 'alwah' && (
          <div className="flex flex-col gap-4">
             <p className="text-gray-600 dark:text-gray-400">
               Le choix du support (Lawh) dépend de l'objectif (Feu, Terre, Air, Eau) et de la planète dominante.
             </p>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl">
                 <h4 className="font-bold text-amber-600 mb-1">Soleil (Dimanche)</h4>
                 <p className="text-sm text-gray-500">Support : Or ou parchemin jaune.</p>
               </div>
               <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl">
                 <h4 className="font-bold text-slate-400 mb-1">Lune (Lundi)</h4>
                 <p className="text-sm text-gray-500">Support : Argent ou parchemin blanc.</p>
               </div>
               <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl">
                 <h4 className="font-bold text-red-500 mb-1">Mars (Mardi)</h4>
                 <p className="text-sm text-gray-500">Support : Fer ou parchemin rouge.</p>
               </div>
               <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl">
                 <h4 className="font-bold text-emerald-500 mb-1">Vénus (Vendredi)</h4>
                 <p className="text-sm text-gray-500">Support : Cuivre ou parchemin vert.</p>
               </div>
             </div>
          </div>
        )}

        {activeTab === 'purification' && (
          <div className="flex flex-col gap-6">
             <div className="flex items-start gap-4 p-4 border-l-4 border-emerald-500 bg-emerald-50 dark:bg-emerald-900/10 rounded-r-xl">
                <ShieldCheck className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                <div>
                   <h3 className="font-bold text-emerald-800 dark:text-emerald-400 mb-1">Taharah (Purification)</h3>
                   <p className="text-gray-600 dark:text-gray-400 text-sm">
                     La purification du corps, des vêtements et du lieu est obligatoire avant toute écriture ou invocation.
                   </p>
                </div>
             </div>
             
             <div className="grid gap-4">
                <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl">
                   <h4 className="font-bold mb-2">1. Wudu ou Ghusl</h4>
                   <p className="text-sm text-gray-500">Ablutions mineures ou majeures selon l'état.</p>
                </div>
                <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl">
                   <h4 className="font-bold mb-2">2. Lieu de retraite (Khalwa)</h4>
                   <p className="text-sm text-gray-500">Endroit propre, calme, parfumé avec l'encens correspondant à la planète.</p>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
