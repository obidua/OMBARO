import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';

export interface StatCard {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  changeValue?: string;
}

interface DashboardStatsGridProps {
  stats: StatCard[];
  columns?: 2 | 3 | 4;
}

export const DashboardStatsGrid: React.FC<DashboardStatsGridProps> = ({
  stats,
  columns = 4
}) => {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
  };

  const getTrendIcon = (trend?: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend?: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-4 mb-6`}>
      {stats.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              {stat.trend && (
                <div className={`flex items-center space-x-1 ${getTrendColor(stat.trend)}`}>
                  {getTrendIcon(stat.trend)}
                  {stat.changeValue && (
                    <span className="text-sm font-semibold">{stat.changeValue}</span>
                  )}
                </div>
              )}
            </div>

            <div>
              <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">
                {stat.label}
              </p>
              <p className="text-3xl font-bold text-gray-900 mb-1">
                {stat.value}
              </p>
              {stat.change && (
                <p className="text-xs text-gray-500">
                  {stat.change}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
