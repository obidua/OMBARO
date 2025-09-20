export interface User {
  id?: string;
  name?: string;
  email?: string;
  mobile?: string;
  gender?: 'male' | 'female' | 'other';
  dateOfBirth?: string;
  isVerified?: boolean;
}

export interface Location {
  latitude: number;
  longitude: number;
  address: string;
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

export interface CartItem {
  service: BookingService;
  provider: ServiceProvider;
  quantity: number;
  selectedDate?: string;
  selectedTime?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Salon {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  distance: number;
  rating: number;
  reviewCount: number;
  image: string;
  isOpen: boolean;
  specialties: string[];
  priceRange: 'budget' | 'mid' | 'premium';
}