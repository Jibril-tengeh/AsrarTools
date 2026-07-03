import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshCcw, Activity, ShieldAlert, BookOpen, Flame, Compass, Star, Eye } from 'lucide-react';
import { mockTools } from '../../data/toolsData';

export function DiagnosticHub({ initialToolId }: { initialToolId: string }) {
  const { t } = useTranslation();
  const initialTool = mockTools.find(tool => tool.id === initialToolId);
  
  // This is a generic hub for diagnostic tools not covered by Mod9
  
  const getIcon = (id: string) => {
    if (id.includes('elemental')) return <Flame className="w-6 h-6" />;
    if (id.includes('suhuf')) return <BookOpen className="w-6 h-6" />;
    if (id.includes('fengshui') || id.includes('geo')) return <Compass className="w-6 h-6" />;
    if (id.includes('eclipse') || id.includes('night') || id.includes('seasonal')) return <Star className="w-6 h-6" />;
    return <Eye className="w-6 h-6" />;
  };

  return (
    <div className="flex flex-col gap-8 bg-white dark:bg-gray-950 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 max-w-3xl mx-auto w-full">
      <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-900 pb-4">
         <h2 className="text-lg font-bold flex items-center gap-2 text-cyan-700 dark:text-cyan-500">
            <Activity className="w-5 h-5" />
            {initialTool ? t(initialTool.nameKey) : 'Diagnostic'}
         </h2>
      </div>

      <div className="flex flex-col items-center justify-center py-12 text-center gap-6">
         <div className="p-6 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-500 rounded-full">
            {getIcon(initialToolId)}
         </div>
         <p className="text-gray-600 dark:text-gray-400 max-w-md">
            L'outil <strong>{initialTool ? t(initialTool.nameKey) : ''}</strong> fait partie de la suite diagnostique étendue. Ce module est actuellement en phase de modélisation mathématique et énergétique.
         </p>
         
         <div className="p-4 border border-cyan-200 dark:border-cyan-900 bg-cyan-50/50 dark:bg-cyan-900/10 rounded-xl w-full text-left">
            <h3 className="font-bold text-cyan-800 dark:text-cyan-400 flex items-center gap-2 mb-2">
              <ShieldAlert className="w-4 h-4" /> En cours d'intégration
            </h3>
            <p className="text-sm text-cyan-700/80 dark:text-cyan-300/80">
              Les algorithmes de corrélation pour les diagnostics complexes (Suhuf, géobiologie, éléments) nécessitent des matrices de données précises (Tableaux de correspondances astronomiques et littérales) qui seront déployées dans les prochaines mises à jour.
            </p>
         </div>

         <button className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl font-bold shadow-lg shadow-cyan-200 dark:shadow-none transition-all mt-4">
            Me notifier lors du déploiement
         </button>
      </div>
    </div>
  );
}
