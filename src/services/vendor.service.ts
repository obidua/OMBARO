import { supabase } from '../lib/supabase';

export interface VendorData {
  business_name: string;
  owner_name: string;
  mobile: string;
  email?: string;
  business_type?: string;
  gst_number?: string;
  pan_number?: string;
  address: any;
  location?: any;
}

export interface VendorService {
  service_id: string;
  price: number;
  duration: number;
  is_available: boolean;
}

export class VendorServiceClass {
  async createVendor(userId: string, data: VendorData) {
    const { data: vendor, error } = await supabase
      .from('vendors')
      .insert({
        user_id: userId,
        ...data,
        status: 'pending_approval',
        verification_status: 'unverified',
        rating: 0,
        total_reviews: 0,
        total_bookings: 0
      })
      .select()
      .single();

    if (error) throw error;
    return vendor;
  }

  async getVendorById(vendorId: string) {
    const { data, error } = await supabase
      .from('vendors')
      .select('*')
      .eq('id', vendorId)
      .single();

    if (error) throw error;
    return data;
  }

  async getVendorByUserId(userId: string) {
    const { data, error } = await supabase
      .from('vendors')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async updateVendor(vendorId: string, updates: Partial<VendorData>) {
    const { data, error } = await supabase
      .from('vendors')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', vendorId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getAllVendors(filters?: { status?: string; location?: any }) {
    let query = supabase.from('vendors').select('*');

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async approveVendor(vendorId: string) {
    const { data, error } = await supabase
      .from('vendors')
      .update({
        status: 'approved',
        verification_status: 'verified',
        verified_at: new Date().toISOString()
      })
      .eq('id', vendorId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async rejectVendor(vendorId: string, reason: string) {
    const { data, error } = await supabase
      .from('vendors')
      .update({ status: 'rejected' })
      .eq('id', vendorId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async addVendorService(vendorId: string, serviceData: VendorService) {
    const { data, error } = await supabase
      .from('vendor_services')
      .insert({
        vendor_id: vendorId,
        ...serviceData
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getVendorServices(vendorId: string) {
    const { data, error } = await supabase
      .from('vendor_services')
      .select(`
        *,
        service:services(*)
      `)
      .eq('vendor_id', vendorId);

    if (error) throw error;
    return data;
  }

  async updateVendorService(serviceId: string, updates: Partial<VendorService>) {
    const { data, error } = await supabase
      .from('vendor_services')
      .update(updates)
      .eq('id', serviceId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteVendorService(serviceId: string) {
    const { error } = await supabase
      .from('vendor_services')
      .delete()
      .eq('id', serviceId);

    if (error) throw error;
  }

  async getVendorPayouts(vendorId: string) {
    const { data, error } = await supabase
      .from('vendor_payouts')
      .select('*')
      .eq('vendor_id', vendorId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async getVendorReviews(vendorId: string) {
    const { data, error } = await supabase
      .from('vendor_reviews')
      .select(`
        *,
        customer:customers(name, profile_image)
      `)
      .eq('vendor_id', vendorId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
}

export const vendorService = new VendorServiceClass();
