import { supabase } from '../lib/supabase';

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
  status: string;
  availability_status: string;
}

export const therapistService = {
  async getTherapistsByVendor(vendorId: string) {
    try {
      const { data, error } = await supabase
        .from('therapists')
        .select('*')
        .eq('vendor_id', vendorId)
        .eq('status', 'active');

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  },

  async getTherapistById(therapistId: string) {
    try {
      const { data, error } = await supabase
        .from('therapists')
        .select('*')
        .eq('id', therapistId)
        .maybeSingle();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  },

  async getAvailableTherapists(vendorId: string, date: string, time: string) {
    try {
      const { data, error } = await supabase.rpc('get_available_therapists', {
        p_vendor_id: vendorId,
        p_date: date,
        p_time: time,
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  },

  async updateTherapistLocation(therapistId: string, latitude: number, longitude: number) {
    try {
      const { data, error } = await supabase
        .from('therapist_locations')
        .upsert({
          therapist_id: therapistId,
          latitude,
          longitude,
          last_updated: new Date().toISOString(),
        });

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  },

  async getTherapistAssignments(therapistId: string) {
    try {
      const { data, error } = await supabase
        .from('therapist_assignments')
        .select('*, bookings(*)')
        .eq('therapist_id', therapistId)
        .order('assignment_date', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  },
};
