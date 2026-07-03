import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Grid3x3, Hash, Calculator, ChevronRight, BookOpen, LayoutGrid, Activity, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { categories, mockTools } from '../../data/toolsData';
import { AsrarTool } from '../../types';
import { cn } from '../../lib/utils';

const iconMap: Record<string, React.ElementType> = {
  Grid3x3,
  Hash,
  Calculator,
  BookOpen,
  LayoutGrid,
  Activity,
  Calendar
};

export function UserDashboard() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  // Group tools by category
  const toolsByCategory = categories.map(cat => ({
    ...cat,
    tools: mockTools.filter(tool => {
      if (tool.categoryId !== cat.id) return false;
      const name = t(tool.nameKey).toLowerCase();
      const desc = t(tool.descriptionKey).toLowerCase();
      const query = searchQuery.toLowerCase();
      return name.includes(query) || desc.includes(query);
    })
  })).filter(cat => cat.tools.length > 0);

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
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
          />
        </div>
      </div>

      <div className="flex flex-col gap-8 max-w-2xl mx-auto w-full">
        {toolsByCategory.map((category) => (
          <div key={category.id} className="flex flex-col gap-3 sm:gap-4">
            <h2 className="text-lg font-bold text-emerald-800 dark:text-emerald-400 border-b border-emerald-100 dark:border-emerald-900/50 pb-2">
              {t(category.nameKey)}
            </h2>
            {category.tools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ))}
        {toolsByCategory.length === 0 && (
          <div className="text-center text-gray-500 py-10">
            Aucun outil trouvé pour cette recherche.
          </div>
        )}
      </div>
    </div>
  );
}

function ToolCard({ tool }: { tool: AsrarTool }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const Icon = iconMap[tool.iconName] || BookOpen;
  
  const isActive = tool.status === 'active';

  const handleClick = () => {
    if (isActive) {
      navigate(`/tool/${tool.id}`);
    }
  };

  return (
    <div 
      onClick={handleClick}
      className={cn(
      "relative flex items-center p-3 sm:p-4 rounded-xl border bg-white dark:bg-gray-900 shadow-sm transition-all duration-200 overflow-hidden group",
      isActive 
        ? "border-emerald-200/60 dark:border-emerald-800/60 hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-md cursor-pointer" 
        : "opacity-60 grayscale cursor-not-allowed"
    )}>
      {/* Left accent bar */}
      <div className={cn(
        "absolute left-0 top-3 bottom-3 w-1.5 rounded-r-md transition-colors",
        isActive ? "bg-emerald-600 dark:bg-emerald-500 group-hover:bg-emerald-400" : "bg-gray-400"
      )} />

      <div className="flex w-full items-center gap-3 sm:gap-4 pl-2">
        {/* Icon container */}
        <div className={cn(
          "shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center border transition-all duration-300",
          isActive 
            ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200/60 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400 group-hover:scale-110" 
            : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500"
        )}>
          {/* Zoom animation is applied specifically to the active icons */}
          <Icon className={cn("w-6 h-6 sm:w-7 sm:h-7 stroke-[1.5]", isActive && "animate-zoom-in-out")} />
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
            "shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center border transition-all duration-300",
            isActive 
              ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200/60 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-800/40 group-hover:translate-x-1" 
              : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400 cursor-not-allowed"
          )}
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5]" />
        </button>
      </div>
    </div>
  );
}
