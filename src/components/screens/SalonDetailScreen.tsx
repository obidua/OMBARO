import React, { useState } from 'react';
import { ArrowLeft, MapPin, Clock, Star, Phone, Heart, Share2, Camera, MessageCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Tabs } from '../ui/Tabs';
import { ServiceCard } from '../common/ServiceCard';
import { Cart } from '../ui/Cart';
import { Salon, Service } from '../../types/app';
import { CartItem, BookingService } from '../../types/booking';

interface SalonDetailScreenProps {
  salon: Salon;
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

export const SalonDetailScreen: React.FC<SalonDetailScreenProps> = ({
  salon,
  onBack = () => {},
  onNavigate
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartMinimized, setIsCartMinimized] = useState(true);

  // Mock services data
  const services: Service[] = [
    {
      id: '1',
      name: 'Hair Cut & Styling',
      price: 1200,
      duration: 60,
      description: 'Professional haircut with styling and blow-dry. Includes consultation.',
      category: 'hair'
    },
    {
      id: '2',
      name: 'Hair Color & Highlights',
      price: 3500,
      duration: 180,
      description: 'Premium hair coloring with highlights. Includes hair treatment and styling.',
      category: 'hair'
    },
    {
      id: '3',
      name: 'Deep Cleansing Facial',
      price: 2200,
      duration: 90,
      description: 'Rejuvenating facial with deep cleansing, exfoliation, and moisturizing.',
      category: 'skin'
    },
    {
      id: '4',
      name: 'Relaxing Body Massage',
      price: 2800,
      duration: 120,
      description: 'Full body relaxing massage with aromatic oils and stress relief techniques.',
      category: 'spa'
    },
    {
      id: '5',
      name: 'Manicure & Pedicure',
      price: 1800,
      duration: 75,
      description: 'Complete nail care with cuticle treatment, shaping, and polish application.',
      category: 'nails'
    },
    {
      id: '6',
      name: 'Bridal Makeup Package',
      price: 8500,
      duration: 240,
      description: 'Complete bridal makeover with HD makeup, hair styling, and draping assistance.',
      category: 'makeup'
    },
    {
      id: '7',
      name: 'Full Body Waxing',
      price: 3200,
      duration: 150,
      description: 'Complete body hair removal with premium wax and post-care treatment.',
      category: 'waxing'
    },
    {
      id: '8',
      name: 'Eyebrow Threading & Shaping',
      price: 450,
      duration: 30,
      description: 'Precise eyebrow shaping and threading for perfect arch definition.',
      category: 'threading'
    },
    {
      id: '9',
      name: 'Anti-Aging Facial',
      price: 3800,
      duration: 120,
      description: 'Advanced anti-aging treatment with collagen mask and vitamin C serum.',
      category: 'skin'
    },
    {
      id: '10',
      name: 'Hot Stone Therapy',
      price: 4200,
      duration: 150,
      description: 'Therapeutic massage using heated volcanic stones for deep muscle relaxation.',
      category: 'spa'
    },
    {
      id: '11',
      name: 'Keratin Hair Treatment',
      price: 5500,
      duration: 210,
      description: 'Professional keratin treatment for smooth, frizz-free hair lasting 3-4 months.',
      category: 'hair'
    },
    {
      id: '12',
      name: 'Party Makeup',
      price: 2800,
      duration: 90,
      description: 'Glamorous party makeup with contouring, highlighting, and long-lasting finish.',
      category: 'makeup'
    }
  ];

  // Mock photos data
  const photos = [
    'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/3738673/pexels-photo-3738673.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=400'
  ];

  // Mock reviews data
  const reviews = [
    {
      id: '1',
      name: 'Priya Sharma',
      rating: 5,
      comment: 'Amazing service! The staff is very professional and the ambiance is perfect. Highly recommended!',
      date: '2 days ago',
      avatar: 'PS'
    },
    {
      id: '2',
      name: 'Rahul Kumar',
      rating: 4,
      comment: 'Great experience overall. The haircut was exactly what I wanted. Will definitely come back.',
      date: '1 week ago',
      avatar: 'RK'
    },
    {
      id: '3',
      name: 'Anita Desai',
      rating: 5,
      comment: 'Best spa experience in Bangalore! The massage was incredibly relaxing and rejuvenating.',
      date: '2 weeks ago',
      avatar: 'AD'
    }
  ];

  // Convert Service to BookingService
  const convertToBookingService = (service: Service): BookingService => {
    const categoryMap: { [key: string]: 'massage' | 'spa' | 'facial' | 'body-treatment' } = {
      'hair': 'spa',
      'skin': 'facial',
      'spa': 'massage',
      'nails': 'body-treatment',
      'makeup': 'facial',
      'waxing': 'body-treatment',
      'threading': 'facial'
    };

    return {
      id: service.id,
      name: service.name,
      description: service.description,
      price: service.price,
      duration: service.duration,
      category: categoryMap[service.category] || 'spa',
      image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=200',
      rating: 4.8
    };
  };

  const handleServiceAdd = (service: Service) => {
    const bookingService = convertToBookingService(service);
    const salonAsProvider = {
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
      services: []
    };

    setCartItems(prev => {
      const existingItem = prev.find(item => item.service.id === service.id);
      if (existingItem) {
        return prev.map(item =>
          item.service.id === service.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { service: bookingService, provider: salonAsProvider, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (serviceId: string, quantity: number) => {
    if (quantity === 0) {
      setCartItems(prev => prev.filter(item => item.service.id !== serviceId));
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

  const handleRemoveItem = (serviceId: string) => {
    setCartItems(prev => prev.filter(item => item.service.id !== serviceId));
  };

  const handleCheckout = () => {
    onNavigate('booking', { cartItems, selectedProvider: salon });
  };

  const getServiceQuantity = (serviceId: string) => {
    const item = cartItems.find(item => item.service.id === serviceId);
    return item ? item.quantity : 0;
  };

  const handleCall = () => {
    console.log('Calling salon:', salon.name);
  };

  const handleShare = () => {
    console.log('Sharing salon:', salon.name);
  };

  const handleFavorite = () => {
    console.log('Adding to favorites:', salon.name);
  };

  const tabs = [
    {
      id: 'services',
      label: 'Services',
      content: (
        <div className="space-y-4">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onAddToCart={handleServiceAdd}
              onUpdateQuantity={handleUpdateQuantity}
              quantity={getServiceQuantity(service.id)}
            />
          ))}
        </div>
      )
    },
    {
      id: 'photos',
      label: 'Photos',
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {photos.map((photo, index) => (
            <div key={index} className="relative aspect-square rounded-xl overflow-hidden group">
              <img
                src={photo}
                alt={`${salon.name} photo ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'reviews',
      label: 'Reviews',
      content: (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">{review.avatar}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{review.name}</h4>
                    <span className="text-xs text-gray-500">{review.date}</span>
                  </div>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
                </div>
              </div>
            </div>
          ))}
          <Button variant="outline" className="w-full">
            <MessageCircle className="w-4 h-4 mr-2" />
            Write a Review
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-[70px]">
      {/* Header Image */}
      <div className="relative h-64 bg-gradient-to-br from-purple-100 to-pink-100">
        <img
          src={salon.image}
          alt={salon.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Header Controls */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-6 pt-12">
          <button
            onClick={onBack}
            aria-label="Go back to previous screen"
            className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleShare}
              aria-label={`Share ${salon.name}`}
              className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg"
            >
              <Share2 className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={handleFavorite}
              aria-label={`Add ${salon.name} to favorites`}
              className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg"
            >
              <Heart className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Status Badge */}
        <div className="absolute bottom-4 left-6">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${salon.isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {salon.isOpen ? 'Open Now' : 'Closed'}
          </span>
        </div>
      </div>

      {/* Salon Info */}
      <div className="bg-white rounded-t-3xl -mt-6 relative z-10 px-6 pt-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{salon.name}</h1>
            <div className="flex items-center space-x-1 mb-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">{salon.address}</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600">{salon.distance}km away</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="font-semibold text-gray-700">{salon.rating}</span>
                <span className="text-gray-500">({salon.reviewCount} reviews)</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-500">
                <Clock className="w-4 h-4" />
                <span className="text-sm">9:00 AM - 9:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Specialties */}
        <div className="flex flex-wrap gap-2 mb-6">
          {salon.specialties.map((specialty, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-purple-50 text-purple-700 text-sm rounded-lg font-medium"
            >
              {specialty}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 mb-8">
          <Button
            onClick={handleCall}
            variant="outline"
            className="flex-1"
          >
            <Phone className="w-4 h-4 mr-2" />
            Call Now
          </Button>
          <Button
            onClick={() => onNavigate('booking', { salon })}
            className="flex-1"
          >
            Book Appointment
          </Button>
        </div>

        {/* Tabs */}
        <div className={cartItems.length > 0 ? 'pb-[220px]' : ''}>
          <Tabs tabs={tabs} defaultTab="services" />
        </div>

        {/* Floating Cart */}
        {cartItems.length > 0 && (
          <div className="fixed bottom-[70px] left-0 right-0 z-50 px-2">
            <Cart
              items={cartItems}
              onRemoveItem={handleRemoveItem}
              onUpdateQuantity={handleUpdateQuantity}
              onCheckout={handleCheckout}
              isMinimized={isCartMinimized}
              onToggleMinimize={() => setIsCartMinimized(prev => !prev)}
              className="shadow-2xl"
            />
          </div>
        )}
      </div>
    </div>
  );
};