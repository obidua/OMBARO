import React from 'react';
import { Plus, Minus, Clock, Star } from 'lucide-react';
import { BookingService, ServiceProvider } from '../../types/booking';
import { Button } from './Button';

interface ServiceSelectorProps {
  services: BookingService[];
  provider: ServiceProvider;
  selectedServices: { [serviceId: string]: number };
  onServiceAdd: (service: BookingService, provider: ServiceProvider) => void;
  onServiceRemove: (serviceId: string) => void;
  singleServiceMode?: boolean;
  className?: string;
}

export const ServiceSelector: React.FC<ServiceSelectorProps> = ({
  services,
  provider,
  selectedServices,
  onServiceAdd,
  onServiceRemove,
  singleServiceMode = false,
  className = ''
}) => {
  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'massage': 'bg-purple-100 text-purple-700',
      'spa': 'bg-pink-100 text-pink-700',
      'facial': 'bg-green-100 text-green-700',
      'body-treatment': 'bg-blue-100 text-blue-700'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {services.map((service) => {
        const quantity = selectedServices[service.id] || 0;
        
        return (
          <div key={service.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex space-x-4">
              {/* Service Image */}
              <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Service Details */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{service.name}</h3>
                    <span className={`inline-block px-2 py-1 rounded-lg text-xs font-medium ${getCategoryColor(service.category)}`}>
                      {service.category.replace('-', ' ')}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-purple-600">₹{service.price}</p>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-3 leading-relaxed">{service.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{formatDuration(service.duration)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>{service.rating}</span>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-3">
                    {quantity > 0 ? (
                      singleServiceMode ? (
                        <Button
                          onClick={() => onServiceRemove(service.id)}
                          variant="outline"
                          size="sm"
                          className="px-4"
                        >
                          Remove
                        </Button>
                      ) : (
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => onServiceRemove(service.id)}
                          aria-label={`Remove one ${service.name} from cart`}
                          className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                        >
                          <Minus className="w-4 h-4 text-gray-600" />
                        </button>
                        <span className="font-semibold text-gray-900 min-w-[20px] text-center">{quantity}</span>
                        <button
                          onClick={() => onServiceAdd(service, provider)}
                          aria-label={`Add another ${service.name} to cart`}
                          className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center hover:bg-purple-700 transition-colors"
                        >
                          <Plus className="w-4 h-4 text-white" />
                        </button>
                      </div>
                      )
                    ) : (
                      <Button
                        onClick={() => {
                          if (singleServiceMode && Object.keys(selectedServices).length > 0) {
                            alert('Please remove the current service before adding a new one');
                            return;
                          }
                          onServiceAdd(service, provider);
                        }}
                        aria-label={`Add ${service.name} to cart for ₹${service.price}`}
                        size="sm"
                        className="px-4"
                        disabled={singleServiceMode && Object.keys(selectedServices).length > 0}
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};