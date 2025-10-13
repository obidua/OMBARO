import React, { useState, useEffect } from 'react';
import { ArrowLeft, Filter, List, MapIcon, Navigation2 } from 'lucide-react';
import { Map } from '../ui/Map';
import { ServiceSelector } from '../ui/ServiceSelector';
import { Cart } from '../ui/Cart';
import { Button } from '../ui/Button';
import { MASSAGE_CATALOG, ADD_ON_SERVICES } from '../../types/services';
import { ServiceProvider, BookingService, CartItem, Location } from '../../types/booking';

interface MapViewScreenProps {
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
  initialSelectedProviderId?: string;
  singleServiceMode?: boolean;
}

export const MapViewScreen: React.FC<MapViewScreenProps> = ({ 
  onBack, 
  onNavigate, 
  initialSelectedProviderId,
  singleServiceMode = false 
}) => {
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

  // Auto-select provider if initialSelectedProviderId is provided
  useEffect(() => {
    if (initialSelectedProviderId && nearbyProviders.length > 0) {
      const provider = nearbyProviders.find(p => p.id === initialSelectedProviderId);
      if (provider) {
        setSelectedProvider(provider);
      }
    }
  }, [initialSelectedProviderId]);

  // Helper function to convert MassageService to BookingService
  const mapMassageServiceToBookingService = (massageService: any): BookingService => {
    return {
      id: massageService.id,
      name: massageService.name,
      description: massageService.description,
      price: massageService.price,
      duration: massageService.duration,
      category: massageService.category || 'massage',
      image: massageService.image || 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=200',
      rating: 4.8
    };
  };

  // Generate complete service list from catalog
  const generateCompleteServiceList = (): BookingService[] => {
    const massageServices = MASSAGE_CATALOG.map(mapMassageServiceToBookingService);
    
    // Add some popular add-on services as standalone bookable services
    const addOnServices: BookingService[] = [
      {
        id: 'CUP',
        name: 'Cupping Therapy',
        description: 'Silicone/glass cups for myofascial release and improved circulation',
        price: 800,
        duration: 30,
        category: 'massage',
        image: 'https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=200',
        rating: 4.6
      },
      {
        id: 'GST',
        name: 'Gua Sha Treatment',
        description: 'Scraping tool therapy along fascia for trigger point relief',
        price: 600,
        duration: 30,
        category: 'massage',
        image: 'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=200',
        rating: 4.5
      },
      {
        id: 'FSC',
        name: 'Luxury Foot Scrub',
        description: 'Exfoliating foot treatment with moisturizing therapy',
        price: 700,
        duration: 30,
        category: 'body-treatment',
        image: 'https://images.pexels.com/photos/3738673/pexels-photo-3738673.jpeg?auto=compress&cs=tinysrgb&w=200',
        rating: 4.4
      },
      {
        id: 'PAR',
        name: 'Paraffin Hand & Foot Wrap',
        description: 'Moisturizing paraffin treatment for soft, supple skin',
        price: 900,
        duration: 45,
        category: 'body-treatment',
        image: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=200',
        rating: 4.3
      }
    ];
    
    return [...massageServices, ...addOnServices];
  };

  const completeServiceList = generateCompleteServiceList();

  // Mock user location (Bangalore)
  useEffect(() => {
    setUserLocation({
      latitude: 12.9716,
      longitude: 77.5946,
      address: 'Bangalore, Karnataka'
    });
  }, []);

  // Mock nearby spa providers
  const nearbyProviders: ServiceProvider[] = [
    {
      id: '1',
      name: 'Serenity Spa & Wellness',
      rating: 4.8,
      reviewCount: 324,
      distance: 0.8,
      location: { latitude: 12.9716, longitude: 77.5946, address: 'MG Road, Bangalore' },
      image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=400',
      isAvailable: true,
      specialties: ['Deep Tissue Massage', 'Aromatherapy', 'Hot Stone'],
      priceRange: 'premium',
      services: completeServiceList
    },
    {
      id: '2',
      name: 'Bliss Body Spa',
      rating: 4.6,
      reviewCount: 189,
      distance: 1.2,
      location: { latitude: 12.9716, longitude: 77.5946, address: 'Koramangala, Bangalore' },
      image: 'https://images.pexels.com/photos/3738673/pexels-photo-3738673.jpeg?auto=compress&cs=tinysrgb&w=400',
      isAvailable: true,
      specialties: ['Hot Stone Massage', 'Reflexology', 'Body Wraps'],
      priceRange: 'mid',
      services: completeServiceList
    },
    {
      id: '3',
      name: 'Ayurvedic Wellness Center',
      rating: 4.9,
      reviewCount: 456,
      distance: 2.1,
      location: { latitude: 12.9716, longitude: 77.5946, address: 'Indiranagar, Bangalore' },
      image: 'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=400',
      isAvailable: true,
      specialties: ['Ayurvedic Massage', 'Panchakarma', 'Herbal Treatments'],
      priceRange: 'premium',
      services: completeServiceList
    },
    {
      id: '4',
      name: 'Glamour Beauty Studio',
      rating: 4.7,
      reviewCount: 278,
      distance: 1.5,
      location: { latitude: 12.9716, longitude: 77.5946, address: 'Brigade Road, Bangalore' },
      image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=400',
      isAvailable: true,
      specialties: ['Bridal Makeup', 'Hair Styling', 'Nail Art'],
      priceRange: 'premium',
      services: completeServiceList
    },
    {
      id: '5',
      name: 'Urban Wellness Spa',
      rating: 4.5,
      reviewCount: 203,
      distance: 2.8,
      location: { latitude: 12.9716, longitude: 77.5946, address: 'Electronic City, Bangalore' },
      image: 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=400',
      isAvailable: true,
      specialties: ['Body Treatments', 'Facials', 'Waxing'],
      priceRange: 'mid',
      services: completeServiceList
    }
  ];

  const handleProviderSelect = (provider: ServiceProvider) => {
    setSelectedProvider(provider);
  };

  const handleServiceAdd = (service: BookingService, provider: ServiceProvider) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.service.id === service.id);
      if (existingItem) {
        return prev.map(item =>
          item.service.id === service.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { service, provider, quantity: 1 }];
    });
  };

  const handleServiceRemove = (serviceId: string) => {
    setCartItems(prev => {
      return prev.map(item =>
        item.service.id === serviceId
          ? { ...item, quantity: Math.max(0, item.quantity - 1) }
          : item
      ).filter(item => item.quantity > 0);
    });
  };

  const handleUpdateQuantity = (serviceId: string, quantity: number) => {
    if (quantity === 0) {
      handleServiceRemove(serviceId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.service.id === serviceId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleCheckout = () => {
    onNavigate('booking', { cartItems, selectedProvider });
  };

  const selectedServices = cartItems.reduce((acc, item) => {
    acc[item.service.id] = item.quantity;
    return acc;
  }, {} as { [serviceId: string]: number });

  return (
    <div className="min-h-screen bg-gray-50 pt-[70px] pb-[70px]">
      {/* Header with Back Button */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={onBack}
            aria-label="Go back to previous screen"
            className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Find Spas Near You</h1>
          <div className="w-10" />
        </div>
      </div>

      {/* View Toggle */}
      <div className="px-3 sm:px-4 md:px-6 pb-3 sm:pb-4">
        <div className="flex bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => setViewMode('map')}
            aria-label="Switch to map view"
            aria-pressed={viewMode === 'map'}
            className={`flex-1 py-2 sm:py-3 px-2 sm:px-4 rounded-lg font-medium text-xs sm:text-sm transition-all duration-200 flex items-center justify-center space-x-1 sm:space-x-2 ${
              viewMode === 'map' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-600'
            }`}
          >
            <MapIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Map View</span>
            <span className="sm:hidden">Map</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            aria-label="Switch to list view"
            aria-pressed={viewMode === 'list'}
            className={`flex-1 py-2 sm:py-3 px-2 sm:px-4 rounded-lg font-medium text-xs sm:text-sm transition-all duration-200 flex items-center justify-center space-x-1 sm:space-x-2 ${
              viewMode === 'list' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-600'
            }`}
          >
            <List className="w-4 h-4" />
            <span className="hidden sm:inline">List View</span>
            <span className="sm:hidden">List</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-140px)]">
        {/* Map/List View */}
        <div className="flex-1 px-3 sm:px-4 md:px-6 pb-4">
          {viewMode === 'map' ? (
            <Map
              userLocation={userLocation}
              providers={nearbyProviders}
              selectedProvider={selectedProvider}
              onProviderSelect={handleProviderSelect}
              className="h-full"
            />
          ) : (
            <div className="space-y-2 sm:space-y-3 md:space-y-4 h-full overflow-y-auto">
              {nearbyProviders.map((provider) => (
                <button
                  key={provider.id}
                  onClick={() => handleProviderSelect(provider)}
                  className={`w-full bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm border transition-all duration-200 ${
                    selectedProvider?.id === provider.id
                      ? 'border-purple-500 shadow-md'
                      : 'border-gray-100 hover:shadow-md'
                  }`}
                >
                  <div className="flex space-x-3 sm:space-x-4">
                    <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-lg sm:rounded-xl overflow-hidden flex-shrink-0">
                      <img src={provider.image} alt={provider.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-semibold text-sm sm:text-base text-gray-900 line-clamp-1">{provider.name}</h3>
                      <p className="text-xs sm:text-sm text-gray-600 line-clamp-1">{provider.location.address}</p>
                      <div className="flex items-center space-x-1 sm:space-x-2 mt-1">
                        <span className="text-xs sm:text-sm text-yellow-600">★ {provider.rating}</span>
                        <span className="text-xs sm:text-sm text-gray-500">({provider.reviewCount})</span>
                        <span className="text-xs sm:text-sm text-gray-500">• {provider.distance}km</span>
                      </div>
                    </div>
                    {provider.isAvailable && (
                      <div className="flex items-center flex-shrink-0">
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-lg font-medium whitespace-nowrap">
                          Available
                        </span>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Services Panel */}
        {selectedProvider && (
          <div className="w-full lg:w-96 xl:w-[400px] bg-white border-t lg:border-t-0 lg:border-l border-gray-100 flex flex-col max-h-[calc(100vh-140px)]">
            <div className="p-3 sm:p-4 border-b border-gray-100">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-1">{selectedProvider.name}</h2>
              <p className="text-xs sm:text-sm text-gray-600 line-clamp-1">{selectedProvider.location.address}</p>
            </div>
            
            <div className={`flex-1 overflow-y-auto p-3 sm:p-4 ${cartItems.length > 0 ? 'pb-[220px]' : 'pb-4'}`}>
              <ServiceSelector
                services={selectedProvider.services}
                provider={selectedProvider}
                selectedServices={selectedServices}
                onServiceAdd={handleServiceAdd}
                onServiceRemove={handleServiceRemove}
                singleServiceMode={singleServiceMode}
              />
            </div>
          </div>
        )}
      </div>

      {/* Floating Cart */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-[70px] left-0 right-0 z-50 px-2">
          <Cart
            items={cartItems}
            onRemoveItem={handleServiceRemove}
            onUpdateQuantity={handleUpdateQuantity}
            onCheckout={handleCheckout}
            className="shadow-2xl max-h-[200px]"
          />
        </div>
      )}
    </div>
  );
};