import { supabase } from '../lib/supabase';

export interface Booking {
  id: string;
  customer_id: string;
  vendor_id: string;
  booking_number: string;
  booking_type: 'home_service' | 'at_center' | 'video_consultation';
  service_date: string;
  service_time: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  total_amount: number;
  discount_amount?: number;
  tax_amount?: number;
  final_amount: number;
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  booking_status: 'pending' | 'confirmed' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
  special_instructions?: string;
  created_at?: string;
  updated_at?: string;
}

export interface BookingItem {
  id: string;
  booking_id: string;
  service_id: string;
  therapist_id?: string;
  service_name: string;
  duration_minutes: number;
  price: number;
  quantity: number;
  subtotal: number;
  status: 'pending' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
}

export interface Payment {
  id: string;
  booking_id: string;
  customer_id: string;
  amount: number;
  payment_method: 'cash' | 'card' | 'upi' | 'wallet' | 'net_banking';
  payment_gateway?: string;
  transaction_id?: string;
  status: 'pending' | 'success' | 'failed' | 'refunded';
  payment_date?: string;
  created_at?: string;
}

class BookingService {
  async createBooking(booking: Partial<Booking>, items: Partial<BookingItem>[]): Promise<Booking> {
    const bookingNumber = `BK${Date.now()}`;

    const { data: bookingData, error: bookingError } = await supabase
      .from('bookings')
      .insert({
        ...booking,
        booking_number: bookingNumber,
        booking_status: 'pending',
        payment_status: 'pending'
      })
      .select()
      .single();

    if (bookingError) throw bookingError;

    const bookingItemsWithId = items.map(item => ({
      ...item,
      booking_id: bookingData.id,
      status: 'pending'
    }));

    const { error: itemsError } = await supabase
      .from('booking_items')
      .insert(bookingItemsWithId);

    if (itemsError) throw itemsError;

    await this.logBookingStatus(bookingData.id, 'pending', 'Booking created');

    return bookingData;
  }

  async getBooking(bookingId: string): Promise<any> {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        customer:customers(*),
        vendor:vendors(*),
        booking_items(
          *,
          service:services(*),
          therapist:therapists(*)
        ),
        payments(*)
      `)
      .eq('id', bookingId)
      .single();

    if (error) throw error;
    return data;
  }

  async getCustomerBookings(customerId: string, status?: string): Promise<Booking[]> {
    let query = supabase
      .from('bookings')
      .select(`
        *,
        vendor:vendors(*),
        booking_items(
          *,
          service:services(*),
          therapist:therapists(*)
        )
      `)
      .eq('customer_id', customerId)
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('booking_status', status);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  }

  async updateBookingStatus(
    bookingId: string,
    status: Booking['booking_status'],
    notes?: string
  ): Promise<Booking> {
    const { data, error } = await supabase
      .from('bookings')
      .update({
        booking_status: status,
        updated_at: new Date().toISOString()
      })
      .eq('id', bookingId)
      .select()
      .single();

    if (error) throw error;

    await this.logBookingStatus(bookingId, status, notes);

    return data;
  }

  async cancelBooking(bookingId: string, reason: string): Promise<void> {
    const { error } = await supabase
      .from('booking_cancellations')
      .insert({
        booking_id: bookingId,
        cancelled_by: 'customer',
        cancellation_reason: reason,
        cancellation_date: new Date().toISOString()
      });

    if (error) throw error;

    await this.updateBookingStatus(bookingId, 'cancelled', reason);
  }

  async rescheduleBooking(
    bookingId: string,
    newDate: string,
    newTime: string,
    reason?: string
  ): Promise<void> {
    const { error } = await supabase
      .from('booking_reschedules')
      .insert({
        booking_id: bookingId,
        old_service_date: (await this.getBooking(bookingId)).service_date,
        new_service_date: newDate,
        new_service_time: newTime,
        reason: reason,
        status: 'pending'
      });

    if (error) throw error;
  }

  async createPayment(payment: Partial<Payment>): Promise<Payment> {
    const { data, error } = await supabase
      .from('payments')
      .insert(payment)
      .select()
      .single();

    if (error) throw error;

    if (payment.status === 'success') {
      await supabase
        .from('bookings')
        .update({ payment_status: 'paid' })
        .eq('id', payment.booking_id);
    }

    return data;
  }

  async getPaymentsByBooking(bookingId: string): Promise<Payment[]> {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('booking_id', bookingId);

    if (error) throw error;
    return data || [];
  }

  async assignTherapistToBookingItem(
    bookingItemId: string,
    therapistId: string
  ): Promise<void> {
    const { error } = await supabase
      .from('booking_items')
      .update({
        therapist_id: therapistId,
        status: 'assigned'
      })
      .eq('id', bookingItemId);

    if (error) throw error;
  }

  async getBookingNotes(bookingId: string): Promise<any[]> {
    const { data, error } = await supabase
      .from('booking_notes')
      .select('*')
      .eq('booking_id', bookingId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async addBookingNote(note: { booking_id: string; note: string; noted_by: string }): Promise<void> {
    const { error } = await supabase
      .from('booking_notes')
      .insert(note);

    if (error) throw error;
  }

  async getBookingStatusHistory(bookingId: string): Promise<any[]> {
    const { data, error } = await supabase
      .from('booking_status_history')
      .select('*')
      .eq('booking_id', bookingId)
      .order('changed_at', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  private async logBookingStatus(
    bookingId: string,
    status: string,
    notes?: string
  ): Promise<void> {
    const { error } = await supabase
      .from('booking_status_history')
      .insert({
        booking_id: bookingId,
        old_status: null,
        new_status: status,
        notes: notes,
        changed_at: new Date().toISOString()
      });

    if (error) console.error('Failed to log booking status:', error);
  }

  async subscribeToBookingUpdates(
    bookingId: string,
    callback: (booking: Booking) => void
  ) {
    const channel = supabase
      .channel(`booking-${bookingId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'bookings',
          filter: `id=eq.${bookingId}`
        },
        (payload) => {
          callback(payload.new as Booking);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }

  async getUpcomingBookings(customerId: string): Promise<Booking[]> {
    const today = new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        vendor:vendors(*),
        booking_items(
          *,
          service:services(*),
          therapist:therapists(*)
        )
      `)
      .eq('customer_id', customerId)
      .gte('service_date', today)
      .in('booking_status', ['pending', 'confirmed', 'assigned'])
      .order('service_date', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  async getPastBookings(customerId: string): Promise<Booking[]> {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        vendor:vendors(*),
        booking_items(
          *,
          service:services(*),
          therapist:therapists(*)
        )
      `)
      .eq('customer_id', customerId)
      .in('booking_status', ['completed', 'cancelled'])
      .order('service_date', { ascending: false });

    if (error) throw error;
    return data || [];
  }
}

export const bookingService = new BookingService();
