import React, { useEffect, useState } from 'react';
import { MapPin, Navigation, Zap } from 'lucide-react';
import { Location, ServiceProvider } from '../../types/booking';

interface MapProps {
  userLocation: Location | null;
  providers: ServiceProvider[];
  selectedProvider: ServiceProvider | null;
  onProviderSelect: (provider: ServiceProvider) => void;
  className?: string;
}

export const Map: React.FC<MapProps> = ({
  userLocation,
  providers,
  selectedProvider,
  onProviderSelect,
  className = ''
}) => {
  const [mapCenter, setMapCenter] = useState({ lat: 12.9716, lng: 77.5946 }); // Bangalore

  useEffect(() => {
    if (userLocation) {
      setMapCenter({ lat: userLocation.latitude, lng: userLocation.longitude });
    }
  }, [userLocation]);

  return (
    <div className={`relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl overflow-hidden ${className}`}>
      {/* Map Container */}
      <div className="h-full min-h-[300px] relative">
        {/* Simulated Map Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-blue-100 to-purple-100">
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="grid grid-cols-8 grid-rows-8 h-full">
              {Array.from({ length: 64 }).map((_, i) => (
                <div key={i} className="border border-gray-300"></div>
              ))}
            </div>
          </div>
        </div>

        {/* User Location */}
        {userLocation && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="relative">
              <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
              <div className="absolute inset-0 w-4 h-4 bg-blue-400 rounded-full animate-ping"></div>
            </div>
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded-lg shadow-md text-xs font-medium text-gray-700 whitespace-nowrap">
              You are here
            </div>
          </div>
        )}

        {/* Provider Locations */}
        {providers.map((provider, index) => {
          const isSelected = selectedProvider?.id === provider.id;
          const positions = [
            { top: '25%', left: '30%' },
            { top: '40%', left: '70%' },
            { top: '60%', left: '25%' },
            { top: '35%', left: '80%' },
            { top: '70%', left: '60%' },
            { top: '20%', left: '75%' }
          ];
          const position = positions[index % positions.length];

          return (
            <button
              key={provider.id}
              onClick={() => onProviderSelect(provider)}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-200 ${
                isSelected ? 'scale-110' : 'hover:scale-105'
              }`}
              style={{ top: position.top, left: position.left }}
            >
              <div className={`relative ${isSelected ? 'animate-bounce' : ''}`}>
                <div className={`w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${
                  isSelected ? 'bg-purple-600' : provider.isAvailable ? 'bg-green-500' : 'bg-gray-400'
                }`}>
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                {provider.isAvailable && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border border-white"></div>
                )}
              </div>
              
              {isSelected && (
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white px-3 py-2 rounded-lg shadow-lg border min-w-[120px]">
                  <p className="text-xs font-semibold text-gray-900">{provider.name}</p>
                  <p className="text-xs text-gray-600">{provider.distance}km away</p>
                  <div className="flex items-center justify-center mt-1">
                    <span className="text-xs text-yellow-600">★ {provider.rating}</span>
                  </div>
                </div>
              )}
            </button>
          );
        })}

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <button 
            aria-label="Get directions to current location"
            className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:shadow-lg transition-shadow"
          >
            <Navigation className="w-5 h-5 text-gray-600" />
          </button>
          <button 
            aria-label="Center map on my location"
            className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:shadow-lg transition-shadow"
          >
            <Zap className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Distance Indicator */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md">
          <p className="text-xs text-gray-600">
            Showing {providers.length} providers within 5km
          </p>
        </div>
      </div>
    </div>
  );
};