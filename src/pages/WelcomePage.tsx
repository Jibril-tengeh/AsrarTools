import React from 'react';
import { useTranslation } from 'react-i18next';
import { KeyRound, ShieldAlert } from 'lucide-react';

export function WelcomePage() {
  const { t } = useTranslation();

  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-white dark:bg-gray-950 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
      <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6">
        <KeyRound className="w-10 h-10 text-blue-600 dark:text-blue-400" />
      </div>
      
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
        {t('Welcome')}
      </h1>
      
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mb-8">
        {t('WelcomeMessage')}
      </p>

      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-xl p-6 flex flex-col items-center max-w-lg">
        <ShieldAlert className="w-8 h-8 text-amber-500 mb-3" />
        <p className="text-amber-800 dark:text-amber-200 font-medium">
          {t('InstructionMessage')}
        </p>
      </div>
    </div>
  );
}
