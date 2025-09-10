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

export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number;
  description: string;
  category: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  discount: number;
  validUntil: string;
  image: string;
  salonId: string;
}