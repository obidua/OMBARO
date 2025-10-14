export interface User {
  id?: string;
  name?: string;
  email?: string;
  mobile?: string;
  gender?: 'male' | 'female' | 'other';
  dateOfBirth?: string;
  isVerified?: boolean;
  role?: UserRole;
}

export type UserRole =
  | 'customer'
  | 'employee'
  | 'vendor'
  | 'vendor_applicant'
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
  user: Partial<User>;
  userType?: UserRole;
  isLoading: boolean;
  error: string | null;
  selectedEntity?: any;
  currentStep?: string;
}
