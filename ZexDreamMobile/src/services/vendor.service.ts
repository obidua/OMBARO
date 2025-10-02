import { supabase } from '../lib/supabase';

export interface Vendor {
  id: string;
  business_name: string;
  owner_name: string;
  email: string;
  mobile: string;
  location: any;
  rating: number;
  status: string;
}

export const vendorService = {
  async getVendors() {
    try {
      const { data, error } = await supabase
        .from('vendors')
        .select('*')
        .eq('status', 'active')
        .order('rating', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  },

  async getVendorById(vendorId: string) {
    try {
      const { data, error } = await supabase
        .from('vendors')
        .select('*')
        .eq('id', vendorId)
        .maybeSingle();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  },

  async getVendorServices(vendorId: string) {
    try {
      const { data, error } = await supabase
        .from('vendor_services')
        .select('*')
        .eq('vendor_id', vendorId)
        .eq('is_active', true);

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  },

  async getNearbyVendors(latitude: number, longitude: number, radiusKm: number = 10) {
    try {
      const { data, error } = await supabase.rpc('get_nearby_vendors', {
        lat: latitude,
        lng: longitude,
        radius_km: radiusKm,
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  },
};
