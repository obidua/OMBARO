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
  profile_image?: string;
  status: 'active' | 'inactive' | 'on_leave';
  availability_status: 'available' | 'busy' | 'offline';
  created_at: string;
  updated_at: string;
}

export interface TherapistAssignment {
  id: string;
  therapist_id: string;
  booking_id: string;
  vendor_id: string;
  customer_id: string;
  service_id: string;
  assignment_date: string;
  assignment_time: string;
  status: 'assigned' | 'in_progress' | 'completed' | 'cancelled';
  location: {
    address: string;
    latitude: number;
    longitude: number;
  };
  estimated_duration: number;
  actual_duration?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface TherapistSchedule {
  id: string;
  therapist_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

export interface TherapistLeave {
  id: string;
  therapist_id: string;
  start_date: string;
  end_date: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  approved_by?: string;
  created_at: string;
  updated_at: string;
}

export interface TherapistPerformance {
  therapist_id: string;
  total_assignments: number;
  completed_assignments: number;
  cancelled_assignments: number;
  average_rating: number;
  total_earnings: number;
  completion_rate: number;
  customer_satisfaction: number;
}

export interface TherapistLocation {
  therapist_id: string;
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: string;
  battery_level?: number;
}
