import React, { useState } from 'react';
import { Search, Filter, List, MapIcon } from 'lucide-react';
import { Map } from '../ui/Map';
import { CategoryCard } from '../common/CategoryCard';
import { SalonCard } from '../common/SalonCard';
import { Category, Salon, Offer } from '../../types/app';
import { User } from '../../types/auth';
import { ServiceProvider, Location } from '../../types/booking';
import { MASSAGE_CATALOG, ADD_ON_SERVICES } from '../../types/services';

interface HomeScreenProps {
  user: Partial<User>;
  onLogout: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ user, onLogout, onNavigate }) => {
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null);
  const [featuredViewMode, setFeaturedViewMode] = useState<'list' | 'map'>('list');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock user location (Bangalore)
  const userLocation: Location = {
    latitude: 12.9716,
    longitude: 77.5946,
    address: 'Bangalore, Karnataka'
  };

  // Helper function to convert MassageService to BookingService
  const mapMassageServiceToBookingService = (massageService: any) => {
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
  const generateCompleteServiceList = () => {
    const massageServices = MASSAGE_CATALOG.map(mapMassageServiceToBookingService);
    
    // Add popular add-on services as standalone bookable services
    const addOnServices = [
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

  // Mock data for categories
  const categories: Category[] = [
    { id: '1', name: 'Spa', icon: 'sparkles', color: 'bg-purple-100 text-purple-600' },
    { id: '2', name: 'Salon', icon: 'scissors', color: 'bg-pink-100 text-pink-600' },
    { id: '3', name: 'Beauty Parlour', icon: 'heart', color: 'bg-green-100 text-green-600' },
  ];

  // Mock data for onboarded spas (simulating spas added by employees/admins)
  const onboardedSpas: Salon[] = [
    {
      id: '1',
      name: 'Serenity Spa & Wellness',
      address: 'MG Road, Bangalore',
      latitude: 12.9716,
      longitude: 77.5946,
      distance: 0.8,
      rating: 4.8,
      reviewCount: 324,
      image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=400',
      isOpen: true,
      specialties: ['Deep Tissue Massage', 'Aromatherapy', 'Hot Stone', 'Swedish Massage'],
      priceRange: 'premium'
    },
    {
      id: '2',
      name: 'Bliss Body Spa',
      address: 'Koramangala, Bangalore',
      latitude: 12.9352,
      longitude: 77.6245,
      distance: 1.2,
      rating: 4.6,
      reviewCount: 189,
      image: 'https://images.pexels.com/photos/3738673/pexels-photo-3738673.jpeg?auto=compress&cs=tinysrgb&w=400',
      isOpen: true,
      specialties: ['Hot Stone Massage', 'Reflexology', 'Body Wraps', 'Ayurvedic Treatments'],
      priceRange: 'mid'
    },
    {
      id: '3',
      name: 'Ayurvedic Wellness Center',
      address: 'Indiranagar, Bangalore',
      latitude: 12.9719,
      longitude: 77.6412,
      distance: 2.1,
      rating: 4.9,
      reviewCount: 456,
      image: 'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=400',
      isOpen: true,
      specialties: ['Ayurvedic Massage', 'Panchakarma', 'Herbal Treatments', 'Shirodhara'],
      priceRange: 'premium'
    },
    {
      id: '4',
      name: 'Urban Wellness Spa',
      address: 'Electronic City, Bangalore',
      latitude: 12.8456,
      longitude: 77.6632,
      distance: 2.8,
      rating: 4.5,
      reviewCount: 203,
      image: 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=400',
      isOpen: true,
      specialties: ['Body Treatments', 'Facials', 'Therapeutic Massage', 'Couples Massage'],
      priceRange: 'mid'
    },
    {
      id: '5',
      name: 'Luxury Spa & Wellness',
      address: 'Whitefield, Bangalore',
      latitude: 12.9698,
      longitude: 77.7500,
      distance: 3.2,
      rating: 4.7,
      reviewCount: 278,
      image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=400',
      isOpen: true,
      specialties: ['Premium Massage', 'Spa Packages', 'Wellness Therapy', 'Detox Treatments'],
      priceRange: 'premium'
    },
    {
      id: '6',
      name: 'Tranquil Touch Spa',
      address: 'HSR Layout, Bangalore',
      latitude: 12.9082,
      longitude: 77.6476,
      distance: 1.8,
      rating: 4.4,
      reviewCount: 167,
      image: 'https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=400',
      isOpen: true,
      specialties: ['Relaxation Massage', 'Stress Relief', 'Aromatherapy', 'Deep Tissue'],
      priceRange: 'mid'
    },
    {
      id: '7',
      name: 'Rejuvenate Wellness Center',
      address: 'Jayanagar, Bangalore',
      latitude: 12.9279,
      longitude: 77.5937,
      distance: 1.5,
      rating: 4.6,
      reviewCount: 234,
      image: 'https://images.pexels.com/photos/3738673/pexels-photo-3738673.jpeg?auto=compress&cs=tinysrgb&w=400',
      isOpen: true,
      specialties: ['Holistic Healing', 'Traditional Massage', 'Wellness Packages', 'Cupping Therapy'],
      priceRange: 'premium'
    },
    {
      id: '8',
      name: 'Zen Garden Spa',
      address: 'Malleshwaram, Bangalore',
      latitude: 13.0067,
      longitude: 77.5667,
      distance: 2.3,
      rating: 4.3,
      reviewCount: 145,
      image: 'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=400',
      isOpen: true,
      specialties: ['Zen Therapy', 'Meditation Massage', 'Mindfulness Treatments', 'Energy Healing'],
      priceRange: 'mid'
    }
  ];

  // Mock data for offers
  const mapSalonToServiceProvider = (salon: Salon): ServiceProvider => {
    return {
      id: salon.id,
      name: salon.name,
      rating: salon.rating,
      reviewCount: salon.reviewCount,
      distance: salon.distance,
      location: {
        latitude: salon.latitude,
        longitude: salon.longitude,
        address: salon.address
      },
      image: salon.image,
      isAvailable: salon.isOpen,
      specialties: salon.specialties,
      priceRange: salon.priceRange,
      services: completeServiceList // Full service catalog for each spa
    };
  };

  const onboardedProviders = onboardedSpas.map(mapSalonToServiceProvider);

  const handleMapProviderSelect = (provider: ServiceProvider) => {
    setSelectedProvider(provider);
    // Navigate to mapView with the selected provider
    onNavigate('mapView', { initialSelectedProviderId: provider.id });
  };

  const handleCategoryPress = (category: Category) => {
    console.log('Category selected:', category);
    onNavigate('categoryServices', category);
  };

  const handleSalonPress = (salon: Salon) => {
    console.log('Salon selected:', salon);
    // Navigate to salon detail screen
    onNavigate('salonDetail', salon);
  };

  const handleOfferPress = (offer: Offer) => {
    console.log('Offer selected:', offer);
    onNavigate('offerDetail', offer);
  };

  const handleSearch = () => {
    console.log('Search query:', searchQuery);
    // Navigate to search results or filter current view
  };

  return (
    <div className="min-h-screen content-area pt-[70px] pb-[70px]">
      <div className="px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6 space-y-4 sm:space-y-6 md:space-y-8">
        {/* Categories */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900">Categories</h2>
            <button
              onClick={() => onNavigate('categoryServices')}
              aria-label="View all service categories"
              className="text-primary-600 font-medium text-xs sm:text-sm hover:text-primary-700 transition-colors"
            >
              View All
            </button>
          </div>
          <div className="flex space-x-2 sm:space-x-3 md:space-x-4 overflow-x-auto pb-3 scrollbar-hide">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onPress={handleCategoryPress}
              />
            ))}
          </div>
        </div>

        {/* Featured Salons */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900">Featured Near You</h2>
            <button 
              onClick={() => onNavigate('mapView')}
              aria-label="View all featured spas"
              className="text-primary-600 font-medium text-xs sm:text-sm hover:text-primary-700 transition-colors"
            >
              View All
            </button>
          </div>
          
          {/* View Toggle */}
          <div className="flex bg-neutral-100 rounded-xl p-1 mb-4 sm:mb-6">
            <button
              onClick={() => setFeaturedViewMode('list')}
              aria-label="Switch to list view"
              aria-pressed={featuredViewMode === 'list'}
              className={`flex-1 py-2 sm:py-3 px-2 sm:px-4 rounded-lg font-medium text-xs sm:text-sm transition-all duration-200 flex items-center justify-center space-x-1 sm:space-x-2 ${
                featuredViewMode === 'list' ? 'bg-white text-primary-600 shadow-soft' : 'text-neutral-600'
              }`}
            >
              <List className="w-4 h-4" />
              <span className="hidden sm:inline">List View</span>
              <span className="sm:hidden">List</span>
            </button>
            <button
              onClick={() => setFeaturedViewMode('map')}
              aria-label="Switch to map view"
              aria-pressed={featuredViewMode === 'map'}
              className={`flex-1 py-2 sm:py-3 px-2 sm:px-4 rounded-lg font-medium text-xs sm:text-sm transition-all duration-200 flex items-center justify-center space-x-1 sm:space-x-2 ${
                featuredViewMode === 'map' ? 'bg-white text-primary-600 shadow-soft' : 'text-neutral-600'
              }`}
            >
              <MapIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Map View</span>
              <span className="sm:hidden">Map</span>
            </button>
          </div>

          {/* Conditional Rendering */}
          {featuredViewMode === 'list' ? (
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              {onboardedSpas.map((salon) => (
                <SalonCard
                  key={salon.id}
                  salon={salon}
                  onPress={handleSalonPress}
                  showAddToCart={false}
                />
              ))}
            </div>
          ) : (
            <div className="card p-2 sm:p-3 md:p-4">
              <Map
                userLocation={userLocation}
                providers={onboardedProviders}
                selectedProvider={selectedProvider}
                onProviderSelect={handleMapProviderSelect}
                className="h-48 sm:h-56 md:h-64 rounded-lg sm:rounded-xl"
              />
              <div className="mt-2 sm:mt-3 md:mt-4 text-center">
                <p className="text-xs sm:text-sm text-neutral-600">
                  Tap on markers to view spa details • {onboardedSpas.length} verified locations
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};