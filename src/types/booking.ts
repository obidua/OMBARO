export interface Location {
  latitude: number;
  longitude: number;
  address: string;
}

export interface BookingService {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: 'massage' | 'spa' | 'facial' | 'body-treatment';
  image: string;
  rating: number;
}

export interface ServiceProvider {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  distance: number;
  location: Location;
  image: string;
  isAvailable: boolean;
  specialties: string[];
  priceRange: 'budget' | 'mid' | 'premium';
  services: BookingService[];
}

export interface CartItem {
  service: BookingService;
  provider: ServiceProvider;
  quantity: number;
  selectedDate?: string;
  selectedTime?: string;
}
