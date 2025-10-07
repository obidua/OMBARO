export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  description?: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
  image: string;
  rating?: number;
  reviews?: number;
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
  openTime?: string;
  closeTime?: string;
  specialties: string[];
  priceRange: 'budget' | 'mid' | 'premium';
  services?: Service[];
  amenities?: string[];
  phone?: string;
  email?: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  discount: number;
  validUntil: string;
  image?: string;
  termsAndConditions?: string;
  category?: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userPhoto?: string;
  rating: number;
  comment: string;
  date: string;
  serviceId?: string;
  salonId?: string;
  therapistId?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
}
