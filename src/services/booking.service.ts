import { supabase } from '../lib/supabase';

export interface CreateBookingData {
  customer_id: string;
  vendor_id: string;
  customer_address_id: string;
  customer_name: string;
  customer_mobile: string;
  booking_date: string;
  booking_time: string;
  services: Array<{
    service_id: string;
    service_name: string;
    duration_minutes: number;
    price: number;
    quantity: number;
  }>;
  subtotal: number;
  discount_amount?: number;
  tax_amount?: number;
  total_amount: number;
}

export interface Booking {
  id: string;
  booking_number: string;
  customer_id: string;
  vendor_id: string;
  customer_name: string;
  customer_mobile: string;
  booking_date: string;
  booking_time: string;
  scheduled_at: string;
  total_amount: number;
  payment_status: string;
  booking_status: string;
  created_at: string;
}

export class BookingService {
  async createBooking(data: CreateBookingData) {
    const bookingNumber = `BK${Date.now()}`;
    const scheduledAt = new Date(`${data.booking_date}T${data.booking_time}`).toISOString();

    const totalDuration = data.services.reduce((sum, service) => sum + service.duration_minutes, 0);

    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .insert({
        booking_number: bookingNumber,
        customer_id: data.customer_id,
        vendor_id: data.vendor_id,
        customer_address_id: data.customer_address_id,
        customer_name: data.customer_name,
        customer_mobile: data.customer_mobile,
        booking_date: data.booking_date,
        booking_time: data.booking_time,
        scheduled_at: scheduledAt,
        total_duration: totalDuration,
        subtotal: data.subtotal,
        discount_amount: data.discount_amount || 0,
        tax_amount: data.tax_amount || 0,
        total_amount: data.total_amount,
        payment_status: 'pending',
        booking_status: 'pending'
      })
      .select()
      .single();

    if (bookingError) throw bookingError;

    const bookingItems = data.services.map(service => ({
      booking_id: booking.id,
      service_id: service.service_id,
      service_name: service.service_name,
      duration_minutes: service.duration_minutes,
      price: service.price,
      quantity: service.quantity,
      subtotal: service.price * service.quantity
    }));

    const { error: itemsError } = await supabase
      .from('booking_items')
      .insert(bookingItems);

    if (itemsError) throw itemsError;

    return booking;
  }

  async getBookingById(bookingId: string) {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        booking_items(*),
        customer:customers(*),
        vendor:vendors(*)
      `)
      .eq('id', bookingId)
      .single();

    if (error) throw error;
    return data;
  }

  async getCustomerBookings(customerId: string) {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        booking_items(*),
        vendor:vendors(business_name, rating)
      `)
      .eq('customer_id', customerId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async getVendorBookings(vendorId: string) {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        booking_items(*),
        customer:customers(name, mobile)
      `)
      .eq('vendor_id', vendorId)
      .order('scheduled_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async updateBookingStatus(bookingId: string, status: string) {
    const { data, error } = await supabase
      .from('bookings')
      .update({ booking_status: status, updated_at: new Date().toISOString() })
      .eq('id', bookingId)
      .select()
      .single();

    if (error) throw error;

    await supabase.from('booking_status_history').insert({
      booking_id: bookingId,
      new_status: status,
      created_at: new Date().toISOString()
    });

    return data;
  }

  async cancelBooking(bookingId: string, reason: string, cancelledBy: string) {
    const { data, error } = await supabase
      .from('bookings')
      .update({
        booking_status: 'cancelled',
        cancellation_reason: reason,
        cancelled_at: new Date().toISOString()
      })
      .eq('id', bookingId)
      .select()
      .single();

    if (error) throw error;

    await supabase.from('booking_cancellations').insert({
      booking_id: bookingId,
      cancelled_by: cancelledBy,
      reason: reason,
      cancelled_at: new Date().toISOString()
    });

    return data;
  }

  async rescheduleBooking(bookingId: string, newDate: string, newTime: string, reason: string) {
    const booking = await this.getBookingById(bookingId);
    const oldScheduledAt = booking.scheduled_at;
    const newScheduledAt = new Date(`${newDate}T${newTime}`).toISOString();

    const { data, error } = await supabase
      .from('bookings')
      .update({
        booking_date: newDate,
        booking_time: newTime,
        scheduled_at: newScheduledAt,
        updated_at: new Date().toISOString()
      })
      .eq('id', bookingId)
      .select()
      .single();

    if (error) throw error;

    await supabase.from('booking_reschedules').insert({
      booking_id: bookingId,
      old_scheduled_at: oldScheduledAt,
      new_scheduled_at: newScheduledAt,
      reason: reason,
      rescheduled_at: new Date().toISOString()
    });

    return data;
  }
}

export const bookingService = new BookingService();
