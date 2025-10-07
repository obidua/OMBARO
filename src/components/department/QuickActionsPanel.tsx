import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from '../ui/Button';

export interface QuickAction {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  color?: string;
}

interface QuickActionsPanelProps {
  actions: QuickAction[];
  title?: string;
  columns?: 2 | 3 | 4;
}

export const QuickActionsPanel: React.FC<QuickActionsPanelProps> = ({
  actions,
  title = 'Quick Actions',
  columns = 3
}) => {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>
      <div className={`grid ${gridCols[columns]} gap-4`}>
        {actions.map((action, index) => {
          const Icon = action.icon;
          const isPrimary = action.variant === 'primary' || index === 0;

          return (
            <button
              key={index}
              onClick={action.onClick}
              className={`group relative overflow-hidden rounded-xl p-4 text-left transition-all duration-200 ${
                isPrimary
                  ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md hover:shadow-lg'
                  : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                    isPrimary
                      ? 'bg-white/20'
                      : action.color || 'bg-blue-100'
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 ${
                      isPrimary ? 'text-white' : 'text-blue-600'
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4
                    className={`font-semibold mb-1 ${
                      isPrimary ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {action.title}
                  </h4>
                  <p
                    className={`text-sm ${
                      isPrimary ? 'text-white/90' : 'text-gray-600'
                    }`}
                  >
                    {action.description}
                  </p>
                </div>
              </div>
              <div
                className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-300 ${
                  isPrimary ? 'bg-white/30' : 'bg-blue-500'
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};
