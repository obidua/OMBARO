import React from 'react';
import { Clock, Star, Plus, Minus } from 'lucide-react';
import { Button } from '../ui/Button';
import { Service } from '../../types/app';

interface ServiceCardProps {
  service: Service;
  onAddToCart: (service: Service) => void;
  onUpdateQuantity: (serviceId: string, quantity: number) => void;
  quantity: number;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ 
  service, 
  onAddToCart, 
  onUpdateQuantity, 
  quantity 
}) => {
  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-lg mb-1">{service.name}</h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-3">{service.description}</p>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{formatDuration(service.duration)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span>4.8</span>
            </div>
          </div>
        </div>
        
        <div className="text-right ml-4">
          <p className="text-2xl font-bold text-purple-600">₹{service.price}</p>
          <p className="text-xs text-gray-500">per session</p>
        </div>
      </div>

      {quantity === 0 ? (
        <Button
          onClick={() => onAddToCart(service)}
          size="sm"
          className="w-full"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onUpdateQuantity(service.id, Math.max(0, quantity - 1))}
              className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <Minus className="w-4 h-4 text-gray-600" />
            </button>
            <span className="font-semibold text-gray-900 min-w-[20px] text-center">
              {quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(service.id, quantity + 1)}
              className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center hover:bg-purple-700 transition-colors"
            >
              <Plus className="w-4 h-4 text-white" />
            </button>
          </div>
          <span className="font-semibold text-purple-600">₹{service.price * quantity}</span>
        </div>
      )}
    </div>
  );
};