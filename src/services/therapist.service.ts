import { supabase } from '../lib/supabase';

export interface Therapist {
  id: string;
  user_id: string;
  vendor_id?: string;
  full_name: string;
  phone: string;
  email?: string;
  date_of_birth?: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  city: string;
  state: string;
  pincode: string;
  specializations: string[];
  experience_years: number;
  certifications?: string[];
  languages_spoken: string[];
  rating?: number;
  total_reviews?: number;
  profile_image?: string;
  aadhar_number?: string;
  pan_number?: string;
  bank_account_number?: string;
  ifsc_code?: string;
  is_verified: boolean;
  verification_status: 'pending' | 'approved' | 'rejected';
  employment_type: 'full_time' | 'part_time' | 'contract' | 'freelance';
  status: 'active' | 'inactive' | 'on_leave' | 'suspended';
  created_at?: string;
  updated_at?: string;
}

export interface TherapistSchedule {
  id: string;
  therapist_id: string;
  day_of_week: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  start_time: string;
  end_time: string;
  is_available: boolean;
  max_bookings?: number;
}

export interface TherapistLeave {
  id: string;
  therapist_id: string;
  leave_type: 'sick' | 'casual' | 'emergency' | 'vacation';
  start_date: string;
  end_date: string;
  reason?: string;
  status: 'pending' | 'approved' | 'rejected';
  approved_by?: string;
  created_at?: string;
}

export interface TherapistLocation {
  id: string;
  therapist_id: string;
  booking_id?: string;
  latitude: number;
  longitude: number;
  accuracy?: number;
  speed?: number;
  heading?: number;
  battery_level?: number;
  is_moving: boolean;
  timestamp: string;
}

export interface TherapistAssignment {
  id: string;
  booking_id: string;
  booking_item_id: string;
  therapist_id: string;
  vendor_id: string;
  service_id: string;
  assignment_date: string;
  start_time?: string;
  end_time?: string;
  status: 'assigned' | 'en_route' | 'in_progress' | 'completed' | 'cancelled';
  customer_rating?: number;
  customer_feedback?: string;
  created_at?: string;
  updated_at?: string;
}

class TherapistService {
  async getTherapistProfile(therapistId: string): Promise<Therapist | null> {
    const { data, error } = await supabase
      .from('therapists')
      .select('*')
      .eq('id', therapistId)
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  async getTherapistByUserId(userId: string): Promise<Therapist | null> {
    const { data, error } = await supabase
      .from('therapists')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  async updateTherapistProfile(
    therapistId: string,
    updates: Partial<Therapist>
  ): Promise<Therapist> {
    const { data, error } = await supabase
      .from('therapists')
      .update(updates)
      .eq('id', therapistId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getTherapistSchedule(therapistId: string): Promise<TherapistSchedule[]> {
    const { data, error } = await supabase
      .from('therapist_schedules')
      .select('*')
      .eq('therapist_id', therapistId)
      .order('day_of_week');

    if (error) throw error;
    return data || [];
  }

  async updateTherapistSchedule(
    scheduleId: string,
    updates: Partial<TherapistSchedule>
  ): Promise<TherapistSchedule> {
    const { data, error } = await supabase
      .from('therapist_schedules')
      .update(updates)
      .eq('id', scheduleId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async createTherapistSchedule(
    schedule: Partial<TherapistSchedule>
  ): Promise<TherapistSchedule> {
    const { data, error } = await supabase
      .from('therapist_schedules')
      .insert(schedule)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getTherapistLeaves(therapistId: string): Promise<TherapistLeave[]> {
    const { data, error } = await supabase
      .from('therapist_leaves')
      .select('*')
      .eq('therapist_id', therapistId)
      .order('start_date', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async applyLeave(leave: Partial<TherapistLeave>): Promise<TherapistLeave> {
    const { data, error } = await supabase
      .from('therapist_leaves')
      .insert(leave)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getTherapistAssignments(
    therapistId: string,
    status?: string
  ): Promise<TherapistAssignment[]> {
    let query = supabase
      .from('therapist_assignments')
      .select(`
        *,
        booking:bookings(*),
        service:services(*),
        vendor:vendors(*)
      `)
      .eq('therapist_id', therapistId)
      .order('assignment_date', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  }

  async updateAssignmentStatus(
    assignmentId: string,
    status: TherapistAssignment['status']
  ): Promise<TherapistAssignment> {
    const { data, error } = await supabase
      .from('therapist_assignments')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', assignmentId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateTherapistLocation(location: Partial<TherapistLocation>): Promise<TherapistLocation> {
    const { data, error } = await supabase
      .from('therapist_locations')
      .insert({
        ...location,
        timestamp: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getTherapistCurrentLocation(therapistId: string): Promise<TherapistLocation | null> {
    const { data, error } = await supabase
      .from('therapist_locations')
      .select('*')
      .eq('therapist_id', therapistId)
      .order('timestamp', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  async subscribeToLocationUpdates(
    therapistId: string,
    callback: (location: TherapistLocation) => void
  ) {
    const channel = supabase
      .channel(`therapist-location-${therapistId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'therapist_locations',
          filter: `therapist_id=eq.${therapistId}`
        },
        (payload) => {
          callback(payload.new as TherapistLocation);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }

  async getTherapistEarnings(
    therapistId: string,
    startDate?: string,
    endDate?: string
  ): Promise<any> {
    let query = supabase
      .from('commission_records')
      .select('*')
      .eq('therapist_id', therapistId)
      .eq('entity_type', 'therapist');

    if (startDate) {
      query = query.gte('created_at', startDate);
    }
    if (endDate) {
      query = query.lte('created_at', endDate);
    }

    const { data, error } = await query;

    if (error) throw error;

    const totalEarnings = data?.reduce((sum, record) => sum + (record.therapist_amount || 0), 0) || 0;

    return {
      totalEarnings,
      records: data || []
    };
  }

  async getTherapistPerformance(therapistId: string, month: string): Promise<any> {
    const { data, error } = await supabase
      .from('therapist_performance')
      .select('*')
      .eq('therapist_id', therapistId)
      .eq('month', month)
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  async searchAvailableTherapists(filters: {
    city?: string;
    specializations?: string[];
    date?: string;
    minRating?: number;
  }): Promise<Therapist[]> {
    let query = supabase
      .from('therapists')
      .select('*')
      .eq('status', 'active')
      .eq('is_verified', true);

    if (filters.city) {
      query = query.eq('city', filters.city);
    }

    if (filters.minRating) {
      query = query.gte('rating', filters.minRating);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  }
}

export const therapistService = new TherapistService();
