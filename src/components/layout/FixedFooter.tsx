import React from 'react';
import { Calendar, MapPin, Home, User } from 'lucide-react';

interface FixedFooterProps {
  onNavigate: (screen: string, data?: any) => void;
}

export const FixedFooter: React.FC<FixedFooterProps> = ({ onNavigate }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg border-t border-gray-100">
      <div className="grid grid-cols-4 gap-1 p-3">
        <button
          onClick={() => onNavigate('home')}
          aria-label="Go to home screen"
          className="flex items-center justify-center py-3 px-3 rounded-lg hover:bg-gray-50 transition-colors active:bg-gray-100"
        >
          <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
            <Home className="w-5 h-5 text-indigo-600" />
          </div>
        </button>

        <button
          onClick={() => onNavigate('bookings')}
          aria-label="View my bookings and appointments"
          className="flex items-center justify-center py-3 px-3 rounded-lg hover:bg-gray-50 transition-colors active:bg-gray-100"
        >
          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
            <Calendar className="w-5 h-5 text-purple-600" />
          </div>
        </button>

        <button
          onClick={() => onNavigate('mapView')}
          aria-label="Find spa centers near my location"
          className="flex items-center justify-center py-3 px-3 rounded-lg hover:bg-gray-50 transition-colors active:bg-gray-100"
        >
          <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
            <MapPin className="w-5 h-5 text-pink-600" />
          </div>
        </button>

        <button
          onClick={() => onNavigate('profile')}
          aria-label="View my profile and account settings"
          className="flex items-center justify-center py-3 px-3 rounded-lg hover:bg-gray-50 transition-colors active:bg-gray-100"
        >
          <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
            <User className="w-5 h-5 text-indigo-600" />
          </div>
        </button>
      </div>
    </div>
  );
};