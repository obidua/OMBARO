import React, { useState, useMemo } from 'react';
import { Search, Filter, Clock, Star, Info, Plus, Minus } from 'lucide-react';
import { Input } from './Input';
import { Button } from './Button';
import { MASSAGE_CATALOG, ADD_ON_SERVICES, SERVICE_CATEGORIES, MassageService, AddOnService } from '../../types/services';

interface ServiceCatalogProps {
  selectedServices: string[];
  onServiceToggle: (serviceCode: string) => void;
  onServiceSelect?: (service: MassageService) => void;
  mode?: 'selection' | 'display';
  showPricing?: boolean;
  className?: string;
}

export const ServiceCatalog: React.FC<ServiceCatalogProps> = ({
  selectedServices,
  onServiceToggle,
  onServiceSelect,
  mode = 'selection',
  showPricing = true,
  className = ''
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [pressureFilter, setPressureFilter] = useState<string>('all');
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const filteredServices = useMemo(() => {
    return MASSAGE_CATALOG.filter(service => {
      const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           service.techniques.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           service.primaryBenefits.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
      
      const matchesPressure = pressureFilter === 'all' || 
                             (pressureFilter === 'light' && service.pressure <= 2) ||
                             (pressureFilter === 'medium' && service.pressure === 3) ||
                             (pressureFilter === 'firm' && service.pressure >= 4);
      
      return matchesSearch && matchesCategory && matchesPressure;
    });
  }, [searchQuery, selectedCategory, pressureFilter]);

  const getPressureText = (pressure: number) => {
    if (pressure <= 2) return 'Light';
    if (pressure === 3) return 'Medium';
    return 'Firm';
  };

  const getPressureColor = (pressure: number) => {
    if (pressure <= 2) return 'bg-green-100 text-green-700';
    if (pressure === 3) return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  const formatPrice = (basePrice: number, duration: number) => {
    const pricePerMinute = basePrice / 60;
    return Math.round(pricePerMinute * duration);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Input
            placeholder="Search services, techniques, or benefits..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search className="w-5 h-5 text-gray-400" />}
          />
        </div>

        <div className="flex flex-wrap gap-3">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            {SERVICE_CATEGORIES.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          {/* Pressure Filter */}
          <select
            value={pressureFilter}
            onChange={(e) => setPressureFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Pressures</option>
            <option value="light">Light (1-2)</option>
            <option value="medium">Medium (3)</option>
            <option value="firm">Firm (4-5)</option>
          </select>
        </div>
      </div>

      {/* Service Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredServices.map((service) => {
          const isSelected = selectedServices.includes(service.code);
          const isExpanded = expandedService === service.code;
          
          return (
            <div
              key={service.code}
              className={`bg-white rounded-2xl p-4 shadow-sm border-2 transition-all duration-200 ${
                isSelected ? 'border-purple-500 bg-purple-50' : 'border-gray-100 hover:border-gray-200'
              }`}
            >
              {/* Service Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">
                      {service.code}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-lg font-medium ${getPressureColor(service.pressure)}`}>
                      {getPressureText(service.pressure)}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">
                    {service.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{service.style}</p>
                </div>
                
                {mode === 'selection' && (
                  <button
                    onClick={() => onServiceToggle(service.code)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                      isSelected 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {isSelected ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </button>
                )}
              </div>

              {/* Duration Options & Pricing */}
              {showPricing && (
                <div className="mb-3">
                  <div className="flex flex-wrap gap-2">
                    {service.durationOptions.map((duration) => (
                      <div
                        key={duration}
                        className="bg-gray-50 px-2 py-1 rounded-lg text-xs"
                      >
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3 text-gray-500" />
                          <span>{duration}min</span>
                        </div>
                        <div className="font-semibold text-purple-600">
                          ₹{formatPrice(service.basePrice60min, duration)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Primary Benefits */}
              <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                {service.primaryBenefits}
              </p>

              {/* Category Badge */}
              <div className="flex items-center justify-between">
                <span className={`text-xs px-2 py-1 rounded-lg font-medium ${
                  SERVICE_CATEGORIES.find(cat => cat.id === service.category)?.color || 'bg-gray-100 text-gray-700'
                }`}>
                  {SERVICE_CATEGORIES.find(cat => cat.id === service.category)?.name}
                </span>
                
                <button
                  onClick={() => setExpandedService(isExpanded ? null : service.code)}
                  className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center space-x-1"
                >
                  <Info className="w-4 h-4" />
                  <span>{isExpanded ? 'Less' : 'More'}</span>
                </button>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm mb-1">Techniques</h4>
                    <p className="text-xs text-gray-600">{service.techniques}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm mb-1">Focus Areas</h4>
                    <p className="text-xs text-gray-600">{service.focusAreas}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm mb-1">Contraindications</h4>
                    <p className="text-xs text-red-600">{service.contraindications}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm mb-1">Recommended Add-ons</h4>
                    <p className="text-xs text-purple-600">{service.recommendedAddOns}</p>
                  </div>

                  {mode === 'display' && onServiceSelect && (
                    <Button
                      onClick={() => onServiceSelect(service)}
                      size="sm"
                      className="w-full mt-3"
                    >
                      Select Service
                    </Button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No services found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Add-on Services */}
      {mode === 'selection' && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add-on Services</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {ADD_ON_SERVICES.map((addon) => (
              <div
                key={addon.code}
                className="bg-gray-50 rounded-xl p-3 flex items-center justify-between"
              >
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">{addon.name}</h4>
                  <p className="text-xs text-gray-600">{addon.description}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-gray-500">{addon.duration}min</span>
                    <span className="text-sm font-semibold text-purple-600">₹{addon.price}</span>
                  </div>
                </div>
                <button
                  onClick={() => onServiceToggle(addon.code)}
                  className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                    selectedServices.includes(addon.code)
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                >
                  {selectedServices.includes(addon.code) ? 
                    <Minus className="w-3 h-3" /> : 
                    <Plus className="w-3 h-3" />
                  }
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};