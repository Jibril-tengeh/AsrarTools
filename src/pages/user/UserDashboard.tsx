import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Icons from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { categories, mockTools } from '../../data/toolsData';
import { AsrarTool, ToolCategory } from '../../types';
import { cn } from '../../lib/utils';
import { DashboardHeaderWidget } from '../../components/tools/DashboardHeaderWidget';

// Map string icon names to Lucide components dynamically
const getIcon = (iconName: string): React.ElementType => {
  const Icon = (Icons as any)[iconName];
  return Icon || Icons.Box; // Fallback to Box if icon not found
};

export function UserDashboard() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const isSearching = searchQuery.trim().length > 0;

  // Group tools by category based on search
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

  const selectedCategoryData = categories.find(c => c.id === selectedCategoryId);

  return (
    <div className="flex flex-col gap-6">
      <DashboardHeaderWidget />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {selectedCategoryId && !isSearching && (
            <button 
              onClick={() => setSelectedCategoryId(null)}
              className="p-2 -ml-2 text-gray-500 hover:text-amber-600 transition-colors"
              title="Retour aux catégories"
            >
              <Icons.ArrowLeft className="w-6 h-6" />
            </button>
          )}
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {selectedCategoryId && !isSearching && selectedCategoryData 
              ? t(selectedCategoryData.nameKey) 
              : t('UserDashboardTitle')}
          </h1>
        </div>
        
        <div className="relative w-full md:w-72">
          <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={t('SearchTools')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
          />
        </div>
      </div>

      <div className="flex flex-col gap-8 max-w-5xl mx-auto w-full">
        {!isSearching && !selectedCategoryId ? (
          // VIEW 1: Categories Grid
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map((category) => (
              <CategoryCard 
                key={category.id} 
                category={category} 
                onClick={() => setSelectedCategoryId(category.id)}
                toolsCount={mockTools.filter(t => t.categoryId === category.id).length}
              />
            ))}
          </div>
        ) : !isSearching && selectedCategoryId ? (
          // VIEW 2: Tools for Selected Category
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockTools
              .filter(tool => tool.categoryId === selectedCategoryId)
              .map(tool => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
          </div>
        ) : (
          // VIEW 3: Search Results Grouped by Category
          toolsByCategory.map((category) => (
            <div key={category.id} className="flex flex-col gap-3 sm:gap-4">
              <h2 className="text-lg font-bold text-amber-800 dark:text-amber-400 border-b border-amber-100 dark:border-amber-900/50 pb-2">
                {t(category.nameKey)}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.tools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </div>
          ))
        )}
        
        {isSearching && toolsByCategory.length === 0 && (
          <div className="text-center text-gray-500 py-10">
            Aucun outil trouvé pour cette recherche.
          </div>
        )}
      </div>
    </div>
  );
}

function CategoryCard({ category, onClick, toolsCount }: { key?: string | number; category: ToolCategory; onClick: () => void; toolsCount: number }) {
  const { t } = useTranslation();
  const Icon = getIcon(category.iconName);

  return (
    <div 
      onClick={onClick}
      className="relative flex items-center p-4 sm:p-5 rounded-2xl border border-amber-200/50 dark:border-amber-900/30 bg-gradient-to-br from-white to-amber-50/30 dark:from-gray-900 dark:to-gray-800/50 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group"
    >
      <div className="flex w-full items-center gap-4">
        {/* Icon container */}
        <div className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-amber-100/50 dark:bg-amber-900/20 flex items-center justify-center border border-amber-200/50 dark:border-amber-800/50 transition-transform duration-300 group-hover:scale-110">
          <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-amber-600 dark:text-amber-400 stroke-[1.5]" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <div className="flex items-center gap-2">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white truncate">
              {t(category.nameKey)}
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 text-xs font-semibold">
              {toolsCount} {t('Tools').toLowerCase()}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
            {t(category.descriptionKey)}
          </p>
        </div>

        {/* Chevron */}
        <div className="shrink-0 w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center text-amber-500 group-hover:translate-x-1 group-hover:bg-amber-50 dark:group-hover:bg-amber-900/30 transition-all duration-300">
          <Icons.ChevronRight className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}

function ToolCard({ tool }: { key?: string | number; tool: AsrarTool }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const Icon = getIcon(tool.iconName);
  
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
        ? "border-amber-200/60 dark:border-amber-800/60 hover:border-amber-400 dark:hover:border-amber-600 hover:shadow-md cursor-pointer" 
        : "opacity-60 grayscale cursor-not-allowed"
    )}>
      {/* Left accent bar */}
      <div className={cn(
        "absolute left-0 top-3 bottom-3 w-1.5 rounded-r-md transition-colors",
        isActive ? "bg-amber-600 dark:bg-amber-500 group-hover:bg-amber-400" : "bg-gray-400"
      )} />

      <div className="flex w-full items-center gap-3 sm:gap-4 pl-2">
        {/* Icon container */}
        <div className={cn(
          "shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center border transition-all duration-300",
          isActive 
            ? "bg-amber-50 dark:bg-amber-900/20 border-amber-200/60 dark:border-amber-800/60 text-amber-700 dark:text-amber-400 group-hover:scale-110" 
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
          <p className="text-sm text-amber-800/80 dark:text-amber-200/70 truncate mt-0.5" dir="auto">
            {t(tool.descriptionKey)}
          </p>
        </div>

        {/* Chevron Action */}
        <button 
          disabled={!isActive}
          className={cn(
            "shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center border transition-all duration-300",
            isActive 
              ? "bg-amber-50 dark:bg-amber-900/20 border-amber-200/60 dark:border-amber-800/60 text-amber-700 dark:text-amber-400 group-hover:bg-amber-100 dark:group-hover:bg-amber-800/40 group-hover:translate-x-1" 
              : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400 cursor-not-allowed"
          )}
        >
          <Icons.ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5]" />
        </button>
      </div>
    </div>
  );
}
