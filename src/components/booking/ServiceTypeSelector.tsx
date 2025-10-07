import React from 'react';
import { Home, Building2, CheckCircle } from 'lucide-react';

export type ServiceType = 'at_home' | 'visit_spa';

interface ServiceTypeSelectorProps {
  selectedType: ServiceType | null;
  onSelect: (type: ServiceType) => void;
  vendorName?: string;
}

export const ServiceTypeSelector: React.FC<ServiceTypeSelectorProps> = ({
  selectedType,
  onSelect,
  vendorName = 'this location'
}) => {
  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Choose Service Type</h2>
        <p className="text-sm text-gray-600">How would you like to receive your service?</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => onSelect('at_home')}
          className={`relative p-6 rounded-2xl border-2 transition-all ${
            selectedType === 'at_home'
              ? 'border-blue-500 bg-blue-50 shadow-md'
              : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm'
          }`}
        >
          {selectedType === 'at_home' && (
            <div className="absolute top-3 right-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
            </div>
          )}

          <div className="flex flex-col items-center text-center space-y-3">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
              selectedType === 'at_home' ? 'bg-blue-500' : 'bg-blue-100'
            }`}>
              <Home className={`w-8 h-8 ${
                selectedType === 'at_home' ? 'text-white' : 'text-blue-600'
              }`} />
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-1">At Home Service</h3>
              <p className="text-sm text-gray-600">
                Professional comes to your location
              </p>
            </div>

            <div className="pt-2 space-y-1 text-xs text-gray-600">
              <div className="flex items-center justify-center space-x-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                <span>Convenient & Comfortable</span>
              </div>
              <div className="flex items-center justify-center space-x-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                <span>No travel required</span>
              </div>
              <div className="flex items-center justify-center space-x-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                <span>Personalized experience</span>
              </div>
            </div>
          </div>
        </button>

        <button
          onClick={() => onSelect('visit_spa')}
          className={`relative p-6 rounded-2xl border-2 transition-all ${
            selectedType === 'visit_spa'
              ? 'border-pink-500 bg-pink-50 shadow-md'
              : 'border-gray-200 bg-white hover:border-pink-300 hover:shadow-sm'
          }`}
        >
          {selectedType === 'visit_spa' && (
            <div className="absolute top-3 right-3">
              <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
            </div>
          )}

          <div className="flex flex-col items-center text-center space-y-3">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
              selectedType === 'visit_spa' ? 'bg-pink-500' : 'bg-pink-100'
            }`}>
              <Building2 className={`w-8 h-8 ${
                selectedType === 'visit_spa' ? 'text-white' : 'text-pink-600'
              }`} />
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-1">Visit Spa/Salon</h3>
              <p className="text-sm text-gray-600">
                Visit {vendorName} in person
              </p>
            </div>

            <div className="pt-2 space-y-1 text-xs text-gray-600">
              <div className="flex items-center justify-center space-x-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                <span>Premium spa ambiance</span>
              </div>
              <div className="flex items-center justify-center space-x-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                <span>Full facility access</span>
              </div>
              <div className="flex items-center justify-center space-x-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                <span>Professional equipment</span>
              </div>
            </div>
          </div>
        </button>
      </div>

      {selectedType && (
        <div className={`mt-4 p-4 rounded-xl ${
          selectedType === 'at_home' ? 'bg-blue-50 border border-blue-200' : 'bg-pink-50 border border-pink-200'
        }`}>
          <p className="text-sm text-gray-700">
            {selectedType === 'at_home'
              ? '✓ A professional therapist/beautician will be assigned to visit your location'
              : '✓ Visit the spa/salon at your scheduled appointment time'
            }
          </p>
        </div>
      )}
    </div>
  );
};
