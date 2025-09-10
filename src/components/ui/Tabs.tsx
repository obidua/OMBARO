import React, { useState } from 'react';

interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  defaultTab?: string;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, defaultTab, className = '' }) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content;
  const tabsId = `tabs-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`w-full ${className}`}>
      {/* Tab Headers */}
      <div 
        role="tablist" 
        aria-label="Content sections"
        className="flex bg-gray-100 rounded-xl p-1 mb-4 sm:mb-6 overflow-x-auto scrollbar-hide"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            id={`${tabsId}-tab-${tab.id}`}
            aria-selected={activeTab === tab.id}
            aria-controls={`${tabsId}-panel-${tab.id}`}
            tabIndex={activeTab === tab.id ? 0 : -1}
            onClick={() => setActiveTab(tab.id)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                e.preventDefault();
                const currentIndex = tabs.findIndex(t => t.id === activeTab);
                const nextIndex = e.key === 'ArrowLeft' 
                  ? (currentIndex - 1 + tabs.length) % tabs.length
                  : (currentIndex + 1) % tabs.length;
                setActiveTab(tabs[nextIndex].id);
              }
            }}
            className={`
              flex-shrink-0 py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-medium text-xs sm:text-sm transition-all duration-200 whitespace-nowrap
              ${activeTab === tab.id
                ? 'bg-white text-purple-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
              }
              focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div 
        role="tabpanel"
        id={`${tabsId}-panel-${activeTab}`}
        aria-labelledby={`${tabsId}-tab-${activeTab}`}
        className="min-h-[150px] sm:min-h-[200px]"
        tabIndex={0}
      >
        {activeTabContent}
      </div>
    </div>
  );
};