import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Activity, BookOpen, Flame, Compass, Star, Eye, Send } from 'lucide-react';
import { mockTools } from '../../data/toolsData';

export function DiagnosticHub({ initialToolId }: { initialToolId: string }) {
  const { t } = useTranslation();
  const initialTool = mockTools.find(tool => tool.id === initialToolId);
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  
  const getIcon = (id: string) => {
    if (id.includes('elemental')) return <Flame className="w-6 h-6" />;
    if (id.includes('suhuf')) return <BookOpen className="w-6 h-6" />;
    if (id.includes('fengshui') || id.includes('geo')) return <Compass className="w-6 h-6" />;
    if (id.includes('eclipse') || id.includes('night') || id.includes('seasonal')) return <Star className="w-6 h-6" />;
    return <Eye className="w-6 h-6" />;
  };

  const handleCalculate = () => {
    if (!input.trim()) return;
    // Simple pseudo-calculation for the visual effect of a functioning tool
    const hash = Array.from(input).reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const elements = ['Feu (Nari)', 'Terre (Turabi)', 'Air (Hawai)', 'Eau (Mai)'];
    const element = elements[hash % 4];
    const strength = (hash % 100) + 1;
    
    setResult(`Analyse complétée. Valeur résonnante : ${hash}. Élément dominant : ${element}. Intensité : ${strength}%.`);
  };

  return (
    <div className="flex flex-col gap-6 bg-white dark:bg-gray-950 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 max-w-2xl mx-auto w-full">
      <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-900 pb-4">
         <h2 className="text-lg font-bold flex items-center gap-2 text-cyan-700 dark:text-cyan-500">
            <Activity className="w-5 h-5" />
            {initialTool ? t(initialTool.nameKey) : 'Diagnostic'}
         </h2>
      </div>

      <div className="flex flex-col gap-6">
         <div className="flex items-center gap-4 p-4 bg-cyan-50 dark:bg-cyan-900/10 rounded-xl border border-cyan-100 dark:border-cyan-900/30">
            <div className="p-3 bg-white dark:bg-cyan-950 text-cyan-500 rounded-lg shadow-sm animate-zoom-in-out">
               {getIcon(initialToolId)}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
               {initialTool ? t(initialTool.descriptionKey) : 'Entrez vos paramètres pour lancer le diagnostic.'}
            </p>
         </div>
         
         <div className="flex flex-col gap-3">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
               Paramètre d'entrée
            </label>
            <div className="flex gap-3">
               <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ex: nom, date ou mot-clé..."
                  className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
               />
               <button 
                  onClick={handleCalculate}
                  disabled={!input.trim()}
                  className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-bold shadow-md shadow-cyan-200 dark:shadow-none transition-all flex items-center gap-2"
               >
                  <Send className="w-4 h-4" />
                  Analyser
               </button>
            </div>
         </div>

         {result && (
            <div className="mt-4 p-5 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl animate-in fade-in duration-300">
               <h3 className="font-bold text-gray-900 dark:text-white mb-2 border-b border-gray-200 dark:border-gray-700 pb-2">
                  Résultat du Diagnostic
               </h3>
               <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                  {result}
               </p>
            </div>
         )}
      </div>
    </div>
  );
}
