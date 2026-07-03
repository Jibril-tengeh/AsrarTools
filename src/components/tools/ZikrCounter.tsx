import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { RotateCcw, Target, Vibrate } from 'lucide-react';
import { cn } from '../../lib/utils';

export function ZikrCounter() {
  const { t } = useTranslation();
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState<number | ''>(100);
  const [hapticsEnabled, setHapticsEnabled] = useState(true);

  // Trigger haptic feedback safely
  const triggerHaptic = useCallback((pattern: number | number[] = 50) => {
    if (hapticsEnabled && 'vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch (e) {
        // Ignored
      }
    }
  }, [hapticsEnabled]);

  const handleTap = () => {
    setCount(prev => {
      const next = prev + 1;
      if (typeof target === 'number' && next === target) {
        // Long vibration when target reached
        triggerHaptic([100, 50, 100, 50, 200]);
      } else {
        // Short vibration for normal tap
        triggerHaptic(30);
      }
      return next;
    });
  };

  const handleReset = () => {
    if (window.confirm(t('ResetConfirm'))) {
      setCount(0);
      triggerHaptic(50);
    }
  };

  // Keyboard support for tap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        handleTap();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleTap]);

  const progress = typeof target === 'number' && target > 0 ? Math.min((count / target) * 100, 100) : 0;
  const isCompleted = typeof target === 'number' && count >= target;

  return (
    <div className="flex flex-col gap-6 max-w-md mx-auto w-full">
      
      {/* Controls */}
      <div className="flex items-center justify-between bg-white dark:bg-gray-950 p-4 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3 w-1/2">
          <Target className="w-5 h-5 text-gray-400" />
          <input 
            type="number" 
            value={target}
            onChange={(e) => setTarget(e.target.value ? parseInt(e.target.value, 10) : '')}
            placeholder={t('TargetPlaceholder')}
            className="w-full bg-transparent border-none focus:ring-0 text-lg font-bold text-gray-900 dark:text-white"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setHapticsEnabled(!hapticsEnabled)}
            className={cn(
              "p-2.5 rounded-xl transition-colors",
              hapticsEnabled 
                ? "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400" 
                : "bg-gray-100 dark:bg-gray-800 text-gray-400"
            )}
            title="Vibrations"
          >
            <Vibrate className="w-5 h-5" />
          </button>
          <button 
            onClick={handleReset}
            className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-red-100 hover:text-red-600 transition-colors"
            title="Réinitialiser"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tap Area */}
      <button
        onClick={handleTap}
        className={cn(
          "relative w-full aspect-square flex flex-col items-center justify-center rounded-full border-8 transition-all active:scale-95 touch-manipulation select-none overflow-hidden",
          isCompleted
            ? "bg-amber-600 border-amber-500 text-white shadow-xl shadow-amber-600/20"
            : "bg-white dark:bg-gray-950 border-gray-100 dark:border-gray-900 shadow-xl shadow-gray-200/50 dark:shadow-none"
        )}
      >
        {/* Progress Background */}
        {!isCompleted && typeof target === 'number' && target > 0 && (
          <div 
            className="absolute bottom-0 left-0 w-full bg-amber-50 dark:bg-amber-900/10 transition-all duration-300 ease-out"
            style={{ height: `${progress}%` }}
          />
        )}

        <div className="relative z-10 flex flex-col items-center">
          <span className={cn(
            "text-7xl sm:text-8xl font-bold tracking-tighter mb-2",
            isCompleted ? "text-white" : "text-gray-900 dark:text-white"
          )}>
            {count}
          </span>
          {typeof target === 'number' && target > 0 && (
            <span className={cn(
              "text-lg font-medium",
              isCompleted ? "text-amber-100" : "text-gray-400"
            )}>
              / {target}
            </span>
          )}
        </div>
      </button>

      {isCompleted && (
        <div className="text-center text-amber-600 dark:text-amber-400 font-bold animate-pulse">
          {t('TargetReached')}
        </div>
      )}

    </div>
  );
}
