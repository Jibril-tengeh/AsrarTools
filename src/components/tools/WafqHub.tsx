import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Layers, RotateCw, Type, CheckSquare, Sun, Moon, Square, Send } from 'lucide-react';
import { mockTools } from '../../data/toolsData';

export function WafqHub({ initialToolId }: { initialToolId: string }) {
  const { t } = useTranslation();
  const initialTool = mockTools.find(tool => tool.id === initialToolId);
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  
  const getIcon = (id: string) => {
    if (id.includes('sun')) return <Sun className="w-6 h-6" />;
    if (id.includes('moon')) return <Moon className="w-6 h-6" />;
    if (id.includes('hollow')) return <Square className="w-6 h-6" />;
    if (id.includes('literal')) return <Type className="w-6 h-6" />;
    if (id.includes('validator')) return <CheckSquare className="w-6 h-6" />;
    if (id.includes('combined')) return <Layers className="w-6 h-6" />;
    if (id.includes('rotation')) return <RotateCw className="w-6 h-6" />;
    return <Grid className="w-6 h-6" />;
  };

  const handleCalculate = () => {
    if (!input.trim()) return;
    // Simple pseudo-calculation for the visual effect
    const hash = Array.from(input).reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const properties = ['Harmonieux', 'Équilibré', 'Actif', 'Réceptif', 'Neutre'];
    const prop = properties[hash % properties.length];
    
    setResult(`Opération magique effectuée. La structure associée à "${input}" révèle une disposition de nature ${prop} avec une fréquence vibratoire de ${hash * 3}.`);
  };

  return (
    <div className="flex flex-col gap-6 bg-white dark:bg-gray-950 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 max-w-2xl mx-auto w-full">
      <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-900 pb-4">
         <h2 className="text-lg font-bold flex items-center gap-2 text-amber-700 dark:text-amber-500">
            {getIcon(initialToolId)}
            {initialTool ? t(initialTool.nameKey) : 'Carré Magique Spécial'}
         </h2>
      </div>

      <div className="flex flex-col gap-6">
         <div className="flex items-center gap-4 p-4 bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-100 dark:border-amber-900/30">
            <div className="p-3 bg-white dark:bg-amber-950 text-amber-500 rounded-lg shadow-sm animate-zoom-in-out">
               {getIcon(initialToolId)}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
               {initialTool ? t(initialTool.descriptionKey) : 'Entrez la valeur ou le nom pour configurer le carré magique.'}
            </p>
         </div>
         
         <div className="flex flex-col gap-3">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
               Valeur cible ou nom
            </label>
            <div className="flex gap-3">
               <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Entrez une valeur numérique ou un nom..."
                  className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
               />
               <button 
                  onClick={handleCalculate}
                  disabled={!input.trim()}
                  className="px-6 py-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-bold shadow-md shadow-amber-200 dark:shadow-none transition-all flex items-center gap-2"
               >
                  <Send className="w-4 h-4" />
                  Calculer
               </button>
            </div>
         </div>

         {result && (
            <div className="mt-4 p-5 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 border border-amber-200 dark:border-amber-800 rounded-xl animate-in fade-in duration-300">
               <h3 className="font-bold text-amber-900 dark:text-amber-100 mb-2 border-b border-amber-200 dark:border-amber-800 pb-2">
                  Résultat
               </h3>
               <p className="text-amber-800 dark:text-amber-200 leading-relaxed text-sm">
                  {result}
               </p>
            </div>
         )}
      </div>
    </div>
  );
}
