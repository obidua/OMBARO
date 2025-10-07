export interface Therapist {
  id: string;
  vendor_id: string;
  name: string;
  email: string;
  mobile: string;
  specialization: string[];
  experience_years: number;
  certification: string[];
  rating: number;
  total_reviews: number;
  status: 'active' | 'inactive' | 'on-leave';
  availability_status: 'available' | 'busy' | 'offline';
  profile_photo?: string;
  address?: string;
  date_of_birth?: string;
  gender?: 'male' | 'female' | 'other';
  emergency_contact?: string;
  created_at: string;
  updated_at: string;
}

export interface TherapistAssignment {
  id: string;
  therapist_id: string;
  vendor_id: string;
  customer_id: string;
  service_id: string;
  assignment_date: string;
  assignment_time: string;
  status: 'assigned' | 'in_progress' | 'completed' | 'cancelled';
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  service_type?: 'at_home' | 'visit_spa';
  customer_name?: string;
  service_name?: string;
  estimated_duration?: number;
  notes?: string;
  therapist_name?: string;
  therapist_photo?: string;
  customer_mobile?: string;
  service_duration?: number;
  scheduled_date?: string;
  scheduled_time?: string;
  payment_amount?: number;
  payment_status?: 'pending' | 'paid' | 'refunded';
  created_at?: string;
  updated_at?: string;
}

export interface TherapistPerformance {
  therapist_id: string;
  period: 'daily' | 'weekly' | 'monthly';
  total_assignments: number;
  completed_assignments: number;
  cancelled_assignments: number;
  total_revenue: number;
  average_rating: number;
  total_reviews: number;
  on_time_percentage: number;
  customer_satisfaction: number;
}

export interface TherapistSchedule {
  therapist_id: string;
  date: string;
  available: boolean;
  slots: {
    time: string;
    status: 'available' | 'booked' | 'blocked';
    assignment_id?: string;
  }[];
}

export interface TherapistLeave {
  id: string;
  therapist_id: string;
  start_date: string;
  end_date: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  applied_at: string;
  reviewed_at?: string;
  reviewed_by?: string;
}

export interface TherapistEarnings {
  therapist_id: string;
  period: string;
  total_earnings: number;
  completed_bookings: number;
  pending_amount: number;
  paid_amount: number;
  deductions: number;
  bonuses: number;
  breakdown: {
    date: string;
    booking_id: string;
    service_name: string;
    amount: number;
    status: 'paid' | 'pending';
  }[];
}
