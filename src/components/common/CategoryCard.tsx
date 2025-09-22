import React from 'react';
import { Scissors, Sparkles, Heart, Palette, Leaf } from 'lucide-react';
import { Category } from '../../types/app';

interface CategoryCardProps {
  category: Category;
  onPress: (category: Category) => void;
}

const getCategoryIcon = (iconName: string) => {
  const iconMap = {
    'scissors': Scissors,
    'sparkles': Sparkles,
    'heart': Heart,
    'palette': Palette,
    'leaf': Leaf,
  };
  
  const IconComponent = iconMap[iconName as keyof typeof iconMap] || Sparkles;
  return <IconComponent className="w-6 h-6" />;
};

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onPress }) => {
  return (
    <button
      onClick={() => onPress(category)}
      aria-label={`View ${category.name} services`}
      className="flex-shrink-0 w-16 sm:w-20 h-16 sm:h-20 card card-hover group flex flex-col items-center justify-center space-y-1"
    >
      <div className={`w-8 sm:w-10 h-8 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center ${category.color} group-hover:scale-110 transition-transform duration-200`} aria-hidden="true">
        {getCategoryIcon(category.icon)}
      </div>
      <span className="text-xs font-medium text-neutral-700 text-center leading-tight px-1">
        {category.name}
      </span>
    </button>
  );
};