import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { Moon, Sun, Globe, User } from 'lucide-react';
import { cn } from '../lib/utils';

export function Header() {
  const { i18n } = useTranslation();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 h-16 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
          AsrarTools
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Language Selector */}
        <div className="relative flex items-center">
          <Globe className="w-5 h-5 text-gray-500 dark:text-gray-400 absolute left-2 pointer-events-none" />
          <select 
            value={i18n.language} 
            onChange={changeLanguage}
            className="pl-8 pr-4 py-1.5 bg-gray-100 dark:bg-gray-800 border-none rounded-md text-sm text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
            aria-label="Language selector"
          >
            <option value="fr">FR - Français</option>
            <option value="en">EN - English</option>
            <option value="ha">HA - Hausa</option>
            <option value="ar">AR - العربية</option>
          </select>
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
          aria-label="Toggle dark mode"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Profile Picture */}
        <button 
          className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center border border-indigo-200 dark:border-indigo-800 hover:opacity-80 transition-opacity"
          aria-label="Profile"
        >
          <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        </button>
      </div>
    </header>
  );
}
