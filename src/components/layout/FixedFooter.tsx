import React from 'react';
import { Calendar, MapPin, Home, User } from 'lucide-react';

interface FixedFooterProps {
  onNavigate: (screen: string, data?: any) => void;
}

export const FixedFooter: React.FC<FixedFooterProps> = ({ onNavigate }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-strong border-t border-neutral-200">
      <div className="grid grid-cols-4 gap-1 p-3">
        <button
          onClick={() => onNavigate('home')}
          aria-label="Go to home screen"
          className="flex items-center justify-center py-3 px-3 rounded-xl hover:bg-neutral-50 transition-colors active:bg-neutral-100"
        >
          <div className="w-8 h-8 bg-primary-100 rounded-xl flex items-center justify-center">
            <Home className="w-5 h-5 text-primary-600" />
          </div>
        </button>

        <button
          onClick={() => onNavigate('bookings')}
          aria-label="View my bookings and appointments"
          className="flex items-center justify-center py-3 px-3 rounded-xl hover:bg-neutral-50 transition-colors active:bg-neutral-100"
        >
          <div className="w-8 h-8 bg-secondary-100 rounded-xl flex items-center justify-center">
            <Calendar className="w-5 h-5 text-secondary-600" />
          </div>
        </button>

        <button
          onClick={() => onNavigate('mapView')}
          aria-label="Find spa centers near my location"
          className="flex items-center justify-center py-3 px-3 rounded-xl hover:bg-neutral-50 transition-colors active:bg-neutral-100"
        >
          <div className="w-8 h-8 bg-accent-100 rounded-xl flex items-center justify-center">
            <MapPin className="w-5 h-5 text-accent-600" />
          </div>
        </button>

        <button
          onClick={() => onNavigate('profile')}
          aria-label="View my profile and account settings"
          className="flex items-center justify-center py-3 px-3 rounded-xl hover:bg-neutral-50 transition-colors active:bg-neutral-100"
        >
          <div className="w-8 h-8 bg-primary-100 rounded-xl flex items-center justify-center">
            <User className="w-5 h-5 text-primary-600" />
          </div>
        </button>
      </div>
    </div>
  );
};