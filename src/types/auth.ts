export interface User {
  id?: string;
  name?: string;
  email?: string;
  mobile: string;
  gender?: 'male' | 'female' | 'other';
  dateOfBirth?: string;
  isVerified: boolean;
}

export interface AuthState {
  currentStep: 'welcome' | 'mobile' | 'otp' | 'profile' | 'complete' | 'home' | 'salonDetail' | 'mapView' | 'booking' | 'payment' | 'orderTracking' | 'bookings' | 'employeeLogin' | 'employeeDashboard' | 'spaOnboarding' | 'vendorLogin' | 'vendorDashboard' | 'adminLogin' | 'adminDashboard' | 'categoryServices' | 'offerDetail' | 'reviewScreen' | 'rescheduleBooking' | 'chat';
  user: Partial<User>;
  userType?: 'customer' | 'employee' | 'vendor' | 'admin';
  isLoading: boolean;
  error: string | null;
  selectedEntity?: any;
}