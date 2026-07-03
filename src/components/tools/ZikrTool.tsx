import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshCcw, Activity, Play, Square, Settings2 } from 'lucide-react';

export function ZikrTool() {
  const { t } = useTranslation();
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(100);
  const [isPlaying, setIsPlaying] = useState(false);

  // Using an interval to auto increment if needed, or manual
  // For standard spiritual counters, user clicks or uses spacebar

  const increment = () => {
    setCount(prev => (prev < target ? prev + 1 : prev));
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !isPlaying) {
        e.preventDefault();
        increment();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [target, isPlaying]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying && count < target) {
       interval = setInterval(() => {
         setCount(prev => {
            if (prev + 1 >= target) setIsPlaying(false);
            return prev + 1;
         });
       }, 1000); // Auto increment every second
    }
    return () => clearInterval(interval);
  }, [isPlaying, count, target]);

  const percentage = Math.min(100, Math.round((count / target) * 100)) || 0;

  return (
    <div className="flex flex-col gap-8 bg-white dark:bg-gray-950 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 max-w-md mx-auto w-full">
      <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-900 pb-4">
         <h2 className="text-lg font-bold flex items-center gap-2 text-emerald-700 dark:text-emerald-500">
            <Activity className="w-5 h-5" />
            {t('RitualCounter')}
         </h2>
         <button 
           onClick={() => setCount(0)}
           className="p-2 text-gray-400 hover:text-emerald-600 rounded-full transition-colors"
         >
           <RefreshCcw className="w-5 h-5" />
         </button>
      </div>

      <div className="flex flex-col items-center justify-center gap-8">
        
        {/* Progress Ring */}
        <div className="relative w-64 h-64 flex items-center justify-center">
           <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
             <circle 
               cx="50" cy="50" r="45" 
               className="fill-none stroke-gray-100 dark:stroke-gray-900" 
               strokeWidth="8"
             />
             <circle 
               cx="50" cy="50" r="45" 
               className="fill-none stroke-emerald-500 transition-all duration-300 ease-out" 
               strokeWidth="8"
               strokeLinecap="round"
               strokeDasharray="283"
               strokeDashoffset={283 - (283 * percentage) / 100}
             />
           </svg>
           <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
             <span className="text-6xl font-bold text-gray-900 dark:text-white font-mono tracking-tighter">
               {count}
             </span>
             <span className="text-sm font-medium text-gray-500">
               / {target}
             </span>
           </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 w-full">
           <button
             onClick={() => setIsPlaying(!isPlaying)}
             className={`p-4 rounded-xl flex-1 flex items-center justify-center gap-2 transition-all font-bold ${
               isPlaying 
                 ? 'bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400' 
                 : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400'
             }`}
           >
              {isPlaying ? <><Square className="w-5 h-5 fill-current" /> {t('Pause')}</> : <><Play className="w-5 h-5 fill-current" /> {t('Auto')}</>}
           </button>
        </div>
        
        <div className="w-full">
           <button
             onClick={increment}
             disabled={count >= target || isPlaying}
             className="w-full py-8 bg-gray-900 hover:bg-gray-800 disabled:opacity-50 dark:bg-gray-800 dark:hover:bg-gray-700 text-white rounded-2xl text-2xl font-bold shadow-xl active:scale-95 transition-all"
           >
              {t('TapToCount')}
           </button>
           <p className="text-center text-xs text-gray-400 mt-3">{t('PressSpacebarToCount')}</p>
        </div>

        {/* Target Settings */}
        <div className="flex items-center gap-3 w-full bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
           <Settings2 className="w-5 h-5 text-gray-400" />
           <div className="flex-1">
             <label className="text-xs font-semibold text-gray-500 block mb-1">{t('TargetAmount')}</label>
             <input 
               type="number" 
               value={target}
               onChange={(e) => setTarget(parseInt(e.target.value) || 0)}
               className="w-full bg-transparent border-none p-0 focus:ring-0 text-lg font-bold"
             />
           </div>
        </div>
        
      </div>
    </div>
  );
}
