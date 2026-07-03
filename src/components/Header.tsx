import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { Moon, Sun, Languages, User, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

export function Header() {
  const { i18n } = useTranslation();
  const { theme, setTheme } = useTheme();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const changeLanguage = (newLang: string) => {
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    setIsLangOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languages = [
    { code: 'fr', label: 'FR FRANÇAIS' },
    { code: 'en', label: 'EN ENGLISH' },
    { code: 'ha', label: 'HA HAUSA' },
    { code: 'ar', label: 'AR العربية' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 h-16 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
          AsrarTools
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Language Selector */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center gap-1.5 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition-colors"
          >
            <Languages className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <span className="font-semibold text-sm uppercase">{i18n.language}</span>
          </button>
          
          {isLangOpen && (
            <div className="absolute right-0 mt-2 py-1 w-36 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={cn(
                    "w-full text-left px-4 py-2 text-sm transition-colors",
                    i18n.language === lang.code 
                      ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold" 
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  )}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          )}
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
