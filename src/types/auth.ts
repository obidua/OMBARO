export interface User {
  id?: string;
  name?: string;
  email?: string;
  mobile: string;
  gender?: 'male' | 'female' | 'other';
  dateOfBirth?: string;
  isVerified: boolean;
}

export type UserRole = 
  | 'customer' 
  | 'employee' 
  | 'vendor' 
  | 'admin'
  | 'accounts_department'
  | 'marketing_department'
  | 'finance_department'
  | 'legal_department'
  | 'customer_care'
  | 'staff_department'
  | 'vendor_list'
  | 'customer_data'
  | 'fo_department'
  | 'it_department'
  | 'super_admin'
  | 'ho_details'
  | 'corporate_office'
  | 'advocate'
  | 'ca_cs'
  | 'directors'
  | 'hr_department';

export interface AuthState {
  currentStep: 'welcome' | 'mobile' | 'otp' | 'profile' | 'complete' | 'home' | 'salonDetail' | 'mapView' | 'booking' | 'payment' | 'orderTracking' | 'bookings' | 'employeeLogin' | 'employeeDashboard' | 'spaOnboarding' | 'vendorLogin' | 'vendorDashboard' | 'adminLogin' | 'adminDashboard' | 'categoryServices' | 'offerDetail' | 'reviewScreen' | 'rescheduleBooking' | 'chat' | 'referral' | 'notifications' | 'roleSelection' | 'departmentDashboard';
  user: Partial<User>;
  userType?: UserRole;
  isLoading: boolean;
  error: string | null;
  selectedEntity?: any;
}