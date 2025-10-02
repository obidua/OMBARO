import { supabase } from '../lib/supabase';

export interface Booking {
  id: string;
  customer_id: string;
  vendor_id: string;
  service_id: string;
  therapist_id?: string;
  booking_date: string;
  booking_time: string;
  status: string;
  total_amount: number;
  payment_status: string;
}

export const bookingService = {
  async createBooking(bookingData: Partial<Booking>) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert(bookingData)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  },

  async getBookings(customerId: string) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('customer_id', customerId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  },

  async getBookingById(bookingId: string) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('id', bookingId)
        .maybeSingle();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  },

  async updateBooking(bookingId: string, updates: Partial<Booking>) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .update(updates)
        .eq('id', bookingId)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  },

  async cancelBooking(bookingId: string) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', bookingId)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  },
};
