import { supabase } from '../lib/supabase';

export interface TherapistData {
  name: string;
  mobile: string;
  email?: string;
  gender?: string;
  date_of_birth?: string;
  experience_years?: number;
  specializations?: string[];
  languages?: string[];
  profile_image?: string;
}

export interface TherapistSchedule {
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_available: boolean;
}

export interface TherapistLeave {
  start_date: string;
  end_date: string;
  reason?: string;
}

export class TherapistServiceClass {
  async createTherapist(vendorId: string, userId: string | null, data: TherapistData) {
    const { data: therapist, error } = await supabase
      .from('therapists')
      .insert({
        vendor_id: vendorId,
        user_id: userId,
        ...data,
        status: 'active',
        rating: 0,
        total_reviews: 0,
        total_bookings: 0,
        is_verified: false
      })
      .select()
      .single();

    if (error) throw error;
    return therapist;
  }

  async getTherapistById(therapistId: string) {
    const { data, error } = await supabase
      .from('therapists')
      .select(`
        *,
        vendor:vendors(business_name),
        therapist_certifications(*),
        therapist_schedules(*)
      `)
      .eq('id', therapistId)
      .single();

    if (error) throw error;
    return data;
  }

  async getTherapistByUserId(userId: string) {
    const { data, error } = await supabase
      .from('therapists')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async getVendorTherapists(vendorId: string) {
    const { data, error } = await supabase
      .from('therapists')
      .select(`
        *,
        therapist_certifications(*),
        therapist_schedules(*)
      `)
      .eq('vendor_id', vendorId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async updateTherapist(therapistId: string, updates: Partial<TherapistData>) {
    const { data, error } = await supabase
      .from('therapists')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', therapistId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteTherapist(therapistId: string) {
    const { error } = await supabase
      .from('therapists')
      .update({ status: 'terminated' })
      .eq('id', therapistId);

    if (error) throw error;
  }

  async setTherapistSchedule(therapistId: string, schedules: TherapistSchedule[]) {
    await supabase
      .from('therapist_schedules')
      .delete()
      .eq('therapist_id', therapistId);

    const schedulesWithTherapistId = schedules.map(schedule => ({
      therapist_id: therapistId,
      ...schedule
    }));

    const { data, error } = await supabase
      .from('therapist_schedules')
      .insert(schedulesWithTherapistId)
      .select();

    if (error) throw error;
    return data;
  }

  async getTherapistSchedule(therapistId: string) {
    const { data, error } = await supabase
      .from('therapist_schedules')
      .select('*')
      .eq('therapist_id', therapistId)
      .order('day_of_week');

    if (error) throw error;
    return data;
  }

  async requestLeave(therapistId: string, leaveData: TherapistLeave) {
    const { data, error } = await supabase
      .from('therapist_leaves')
      .insert({
        therapist_id: therapistId,
        ...leaveData,
        status: 'pending'
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getTherapistLeaves(therapistId: string) {
    const { data, error } = await supabase
      .from('therapist_leaves')
      .select('*')
      .eq('therapist_id', therapistId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async updateLeaveStatus(leaveId: string, status: string, approvedBy?: string) {
    const { data, error } = await supabase
      .from('therapist_leaves')
      .update({
        status,
        approved_by: approvedBy,
        approved_at: status === 'approved' ? new Date().toISOString() : null
      })
      .eq('id', leaveId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getTherapistAssignments(therapistId: string) {
    const { data, error } = await supabase
      .from('therapist_assignments')
      .select(`
        *,
        booking:bookings(
          *,
          customer:customers(name, mobile),
          booking_items(*)
        )
      `)
      .eq('therapist_id', therapistId)
      .order('assigned_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async assignTherapistToBooking(therapistId: string, bookingId: string, assignedBy: string) {
    const { data, error } = await supabase
      .from('therapist_assignments')
      .insert({
        therapist_id: therapistId,
        booking_id: bookingId,
        assigned_by: assignedBy,
        status: 'assigned'
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateAssignmentStatus(assignmentId: string, status: string, rejectedReason?: string) {
    const updates: any = {
      status,
      updated_at: new Date().toISOString()
    };

    if (status === 'accepted') {
      updates.accepted_at = new Date().toISOString();
    } else if (status === 'rejected' && rejectedReason) {
      updates.rejected_reason = rejectedReason;
    } else if (status === 'completed') {
      updates.completed_at = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from('therapist_assignments')
      .update(updates)
      .eq('id', assignmentId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async trackTherapistLocation(therapistId: string, location: any, bookingId?: string) {
    const { data, error } = await supabase
      .from('therapist_locations')
      .insert({
        therapist_id: therapistId,
        location: location,
        booking_id: bookingId,
        recorded_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getTherapistPerformance(therapistId: string, month?: string) {
    let query = supabase
      .from('therapist_performance')
      .select('*')
      .eq('therapist_id', therapistId);

    if (month) {
      query = query.eq('month', month);
    }

    const { data, error } = await query.order('month', { ascending: false });

    if (error) throw error;
    return data;
  }

  async getTherapistEarnings(therapistId: string, startDate?: string, endDate?: string) {
    let query = supabase
      .from('commission_records')
      .select(`
        *,
        booking:bookings(booking_number, total_amount, booking_date)
      `)
      .eq('therapist_id', therapistId);

    if (startDate) {
      query = query.gte('created_at', startDate);
    }

    if (endDate) {
      query = query.lte('created_at', endDate);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
}

export const therapistService = new TherapistServiceClass();
