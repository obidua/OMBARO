import { supabase } from '../lib/supabase';

export interface Vendor {
  id: string;
  user_id: string;
  business_name: string;
  business_type: 'spa' | 'salon' | 'clinic' | 'wellness_center' | 'freelancer';
  registration_number?: string;
  gst_number?: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  latitude?: number;
  longitude?: number;
  contact_person: string;
  contact_phone: string;
  contact_email: string;
  operating_hours?: any;
  services_offered: string[];
  amenities?: string[];
  rating?: number;
  total_reviews?: number;
  is_verified: boolean;
  verification_status: 'pending' | 'approved' | 'rejected' | 'suspended';
  commission_percentage?: number;
  status: 'active' | 'inactive' | 'suspended';
  created_at?: string;
  updated_at?: string;
}

export interface VendorService {
  id: string;
  vendor_id: string;
  service_id: string;
  custom_name?: string;
  custom_price?: number;
  duration_minutes?: number;
  is_available: boolean;
  created_at?: string;
}

export interface VendorStaff {
  id: string;
  vendor_id: string;
  therapist_id: string;
  role: 'therapist' | 'beautician' | 'manager' | 'receptionist';
  employment_type: 'full_time' | 'part_time' | 'contract' | 'freelance';
  joining_date: string;
  status: 'active' | 'inactive' | 'on_leave';
  created_at?: string;
}

class VendorService {
  async getVendorProfile(vendorId: string): Promise<Vendor | null> {
    const { data, error } = await supabase
      .from('vendors')
      .select('*')
      .eq('id', vendorId)
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  async getVendorByUserId(userId: string): Promise<Vendor | null> {
    const { data, error } = await supabase
      .from('vendors')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  async updateVendorProfile(vendorId: string, updates: Partial<Vendor>): Promise<Vendor> {
    const { data, error } = await supabase
      .from('vendors')
      .update(updates)
      .eq('id', vendorId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getVendorServices(vendorId: string): Promise<VendorService[]> {
    const { data, error } = await supabase
      .from('vendor_services')
      .select(`
        *,
        service:services(*)
      `)
      .eq('vendor_id', vendorId)
      .eq('is_available', true);

    if (error) throw error;
    return data || [];
  }

  async addVendorService(vendorService: Partial<VendorService>): Promise<VendorService> {
    const { data, error } = await supabase
      .from('vendor_services')
      .insert(vendorService)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateVendorService(
    serviceId: string,
    updates: Partial<VendorService>
  ): Promise<VendorService> {
    const { data, error } = await supabase
      .from('vendor_services')
      .update(updates)
      .eq('id', serviceId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteVendorService(serviceId: string): Promise<void> {
    const { error } = await supabase
      .from('vendor_services')
      .delete()
      .eq('id', serviceId);

    if (error) throw error;
  }

  async getVendorStaff(vendorId: string): Promise<VendorStaff[]> {
    const { data, error } = await supabase
      .from('vendor_staff')
      .select(`
        *,
        therapist:therapists(*)
      `)
      .eq('vendor_id', vendorId)
      .eq('status', 'active');

    if (error) throw error;
    return data || [];
  }

  async addVendorStaff(staff: Partial<VendorStaff>): Promise<VendorStaff> {
    const { data, error } = await supabase
      .from('vendor_staff')
      .insert(staff)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateVendorStaff(staffId: string, updates: Partial<VendorStaff>): Promise<VendorStaff> {
    const { data, error } = await supabase
      .from('vendor_staff')
      .update(updates)
      .eq('id', staffId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getVendorBookings(vendorId: string, status?: string): Promise<any[]> {
    let query = supabase
      .from('bookings')
      .select(`
        *,
        customer:customers(*),
        booking_items(
          *,
          service:services(*),
          therapist:therapists(*)
        )
      `)
      .eq('vendor_id', vendorId)
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  }

  async getVendorEarnings(vendorId: string, startDate?: string, endDate?: string): Promise<any> {
    let query = supabase
      .from('vendor_payouts')
      .select('*')
      .eq('vendor_id', vendorId);

    if (startDate) {
      query = query.gte('payout_date', startDate);
    }
    if (endDate) {
      query = query.lte('payout_date', endDate);
    }

    const { data, error } = await query;

    if (error) throw error;

    const totalEarnings = data?.reduce((sum, payout) => sum + (payout.amount || 0), 0) || 0;
    const pendingAmount = data?.filter(p => p.status === 'pending')
      .reduce((sum, payout) => sum + (payout.amount || 0), 0) || 0;

    return {
      totalEarnings,
      pendingAmount,
      payouts: data || []
    };
  }

  async getVendorReviews(vendorId: string): Promise<any[]> {
    const { data, error } = await supabase
      .from('vendor_reviews')
      .select(`
        *,
        customer:customers(*)
      `)
      .eq('vendor_id', vendorId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async searchVendors(filters: {
    city?: string;
    business_type?: string;
    services?: string[];
    rating?: number;
  }): Promise<Vendor[]> {
    let query = supabase
      .from('vendors')
      .select('*')
      .eq('status', 'active')
      .eq('is_verified', true);

    if (filters.city) {
      query = query.eq('city', filters.city);
    }

    if (filters.business_type) {
      query = query.eq('business_type', filters.business_type);
    }

    if (filters.rating) {
      query = query.gte('rating', filters.rating);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  }
}

export const vendorService = new VendorService();
