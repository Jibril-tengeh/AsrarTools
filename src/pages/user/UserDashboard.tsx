import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Grid3x3, Hash, Calculator, PenTool, ChevronRight, BookOpen } from 'lucide-react';
import { mockTools } from '../../data/mockTools';
import { AsrarTool } from '../../types';
import { cn } from '../../lib/utils';

const iconMap: Record<string, React.ElementType> = {
  Grid3x3,
  Hash,
  Calculator,
  PenTool,
  BookOpen,
};

export function UserDashboard() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = mockTools.filter((tool) => {
    const name = t(tool.nameKey).toLowerCase();
    const desc = t(tool.descriptionKey).toLowerCase();
    const query = searchQuery.toLowerCase();
    return name.includes(query) || desc.includes(query);
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('UserDashboardTitle')}
        </h1>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={t('SearchTools')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:gap-4 max-w-2xl mx-auto w-full">
        {filteredTools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  );
}

function ToolCard({ tool }: { tool: AsrarTool }) {
  const { t } = useTranslation();
  const Icon = iconMap[tool.iconName] || BookOpen;
  
  const isActive = tool.status === 'active';

  return (
    <div className={cn(
      "relative flex items-center p-3 sm:p-4 rounded-xl border bg-white dark:bg-gray-900 shadow-sm transition-all duration-200 overflow-hidden cursor-pointer",
      isActive 
        ? "border-emerald-200/60 dark:border-emerald-800/60 hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-md" 
        : "opacity-60 grayscale cursor-not-allowed"
    )}>
      {/* Left accent bar */}
      <div className={cn(
        "absolute left-0 top-3 bottom-3 w-1.5 rounded-r-md",
        isActive ? "bg-emerald-600 dark:bg-emerald-500" : "bg-gray-400"
      )} />

      <div className="flex w-full items-center gap-3 sm:gap-4 pl-2">
        {/* Icon container - styled like the image */}
        <div className={cn(
          "shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center border",
          isActive 
            ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200/60 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400" 
            : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500"
        )}>
          <Icon className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.5]" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white truncate">
            {t(tool.nameKey)}
          </h3>
          <p className="text-sm text-emerald-800/80 dark:text-emerald-200/70 truncate mt-0.5" dir="auto">
            {t(tool.descriptionKey)}
          </p>
        </div>

        {/* Chevron Action */}
        <button 
          disabled={!isActive}
          className={cn(
            "shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center border transition-colors",
            isActive 
              ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200/60 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-800/40" 
              : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400 cursor-not-allowed"
          )}
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5]" />
        </button>
      </div>
    </div>
  );
}
