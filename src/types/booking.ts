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

export interface BookingOrder {
  id: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  customerLocation: Location;
  providerLocation: Location;
  scheduledDateTime: string;
  customerName: string;
  customerMobile: string;
  therapistInfo?: {
    name: string;
    photo: string;
    phone: string;
    currentLocation?: Location;
    estimatedArrival?: string;
  };
  paymentStatus: 'pending' | 'paid' | 'failed';
  createdAt: string;
}

export interface MapState {
  userLocation: Location | null;
  nearbyProviders: ServiceProvider[];
  selectedProvider: ServiceProvider | null;
  isLoading: boolean;
}