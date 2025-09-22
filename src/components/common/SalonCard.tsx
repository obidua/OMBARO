import React from 'react';
import { MapPin, Star, Clock, Heart, ShoppingCart } from 'lucide-react';
import { Button } from '../ui/Button';
import { Salon } from '../../types/app';

interface SalonCardProps {
  salon: Salon;
  onPress: (salon: Salon) => void;
  showAddToCart?: boolean;
  onAddToCart?: (salon: Salon) => void;
}

export const SalonCard: React.FC<SalonCardProps> = ({ salon, onPress, showAddToCart = false, onAddToCart }) => {
  const getPriceRangeText = (range: string) => {
    switch (range) {
      case 'budget': return 'Budget';
      case 'mid': return 'Mid-range';
      case 'premium': return 'Premium';
      default: return 'Mid-range';
    }
  };

  const getPriceRangeColor = (range: string) => {
    switch (range) {
      case 'budget': return 'text-green-600';
      case 'mid': return 'text-yellow-600';
      case 'premium': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <button
      onClick={() => onPress(salon)}
      aria-label={`View details for ${salon.name}, rated ${salon.rating} stars, ${salon.distance}km away`}
      className="card card-hover group w-full overflow-hidden"
    >
      {/* Image */}
      <div className="relative h-24 sm:h-32 bg-gradient-to-br from-primary-100 to-secondary-100 overflow-hidden">
        <img
          src={salon.image}
          alt={salon.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
          <button 
            aria-label={`Add ${salon.name} to favorites`}
            className="w-6 sm:w-8 h-6 sm:h-8 glass rounded-full flex items-center justify-center shadow-soft hover:bg-white transition-colors duration-200"
            onClick={(e) => {
              e.stopPropagation();
              // Handle favorite action
            }}
          >
            <Heart className="w-3 sm:w-4 h-3 sm:h-4 text-neutral-600" />
          </button>
        </div>
        <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3">
          <span 
            className={`px-2 py-1 rounded-full text-xs font-semibold ${salon.isOpen ? 'bg-success-100 text-success-700' : 'bg-error-100 text-error-700'}`}
            aria-label={`Salon is currently ${salon.isOpen ? 'open' : 'closed'}`}
          >
            {salon.isOpen ? 'Open' : 'Closed'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-sm sm:text-base text-neutral-900 text-left group-hover:text-primary-700 transition-colors duration-200 line-clamp-1 flex-1 mr-2">
            {salon.name}
          </h3>
          <span className={`text-xs sm:text-sm font-bold ${getPriceRangeColor(salon.priceRange)} flex-shrink-0`}>
            {getPriceRangeText(salon.priceRange)}
          </span>
        </div>

        <div className="flex items-center space-x-1 mb-2 min-w-0">
          <MapPin className="w-3 h-3 text-neutral-400" />
          <span className="text-xs sm:text-sm text-neutral-600 truncate flex-1">{salon.address}</span>
          <span className="text-xs sm:text-sm text-neutral-400">•</span>
          <span className="text-xs sm:text-sm text-neutral-600 flex-shrink-0">{salon.distance}km</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-xs sm:text-sm font-medium text-neutral-700">{salon.rating}</span>
            <span className="text-xs text-neutral-500">({salon.reviewCount})</span>
          </div>
          <div className="flex items-center space-x-1 text-neutral-500">
            <Clock className="w-3 h-3" />
            <span className="text-xs">30 min</span>
          </div>
        </div>

        {/* Specialties */}
        <div className="flex flex-wrap gap-1 mt-2 sm:mt-3">
          {salon.specialties.slice(0, 2).map((specialty, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-lg font-medium line-clamp-1"
            >
              {specialty}
            </span>
          ))}
          {salon.specialties.length > 2 && (
            <span className="px-2 py-1 bg-neutral-50 text-neutral-600 text-xs rounded-lg flex-shrink-0">
              +{salon.specialties.length - 2}
            </span>
          )}
        </div>
      </div>
    </button>
  );
};