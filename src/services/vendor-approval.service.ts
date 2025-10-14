import { supabase } from '../lib/supabase';

export interface VendorApplication {
  id: string;
  user_id: string;
  business_name: string;
  business_type: string;
  contact_person: string;
  contact_mobile: string;
  contact_email: string;
  business_address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    pincode: string;
  };
  application_data?: {
    application_number?: string;
    partner_type?: string;
    gst_number?: string;
    pan_number?: string;
    years_in_business?: number;
    number_of_staff?: number;
    description?: string;
    franchise_fee_paid?: boolean;
    franchise_payment_reference?: string;
    is_self_registered?: boolean;
  };
  application_status: string;
  reviewed_by?: string;
  reviewed_at?: string;
  rejection_reason?: string;
  created_at: string;
  updated_at: string;
}

export interface ApprovalHistoryRecord {
  id: string;
  application_id: string;
  approved_by: string;
  approval_stage: number;
  action: 'approved' | 'rejected' | 'on_hold' | 'info_requested';
  comments?: string;
  documents_verified?: Record<string, boolean>;
  created_at: string;
}

export interface Employee {
  id: string;
  user_id: string;
  employee_id: string;
  name: string;
  email?: string;
  mobile: string;
  department: string;
  designation: string;
  hierarchy_level: number;
  reports_to?: string;
  can_approve_vendors: boolean;
  approval_limit?: number;
  is_active: boolean;
}

export class VendorApprovalService {
  /**
   * Submit a new vendor application
   */
  static async submitApplication(applicationData: Partial<VendorApplication>): Promise<{ success: boolean; data?: VendorApplication; error?: string }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        return { success: false, error: 'User not authenticated' };
      }

      const { data, error } = await supabase
        .from('vendor_applications')
        .insert({
          user_id: user.id,
          ...applicationData,
          application_status: 'pending'
        })
        .select()
        .single();

      if (error) {
        console.error('Error submitting application:', error);
        return { success: false, error: error.message };
      }

      return { success: true, data: data as VendorApplication };
    } catch (error: any) {
      console.error('Error in submitApplication:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Get applications by status
   */
  static async getApplicationsByStatus(status?: string): Promise<{ success: boolean; data?: VendorApplication[]; error?: string }> {
    try {
      let query = supabase
        .from('vendor_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (status && status !== 'all') {
        query = query.eq('application_status', status);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching applications:', error);
        return { success: false, error: error.message };
      }

      return { success: true, data: data as VendorApplication[] };
    } catch (error: any) {
      console.error('Error in getApplicationsByStatus:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Get all applications (for admins)
   */
  static async getAllApplications(): Promise<{ success: boolean; data?: VendorApplication[]; error?: string }> {
    try {
      const { data, error } = await supabase
        .from('vendor_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching all applications:', error);
        return { success: false, error: error.message };
      }

      return { success: true, data: data as VendorApplication[] };
    } catch (error: any) {
      console.error('Error in getAllApplications:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Get user's own applications
   */
  static async getMyApplications(): Promise<{ success: boolean; data?: VendorApplication[]; error?: string }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        return { success: false, error: 'User not authenticated' };
      }

      const { data, error } = await supabase
        .from('vendor_applications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching my applications:', error);
        return { success: false, error: error.message };
      }

      return { success: true, data: data as VendorApplication[] };
    } catch (error: any) {
      console.error('Error in getMyApplications:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Approve application
   */
  static async approveApplication(
    applicationId: string,
    userId: string,
    comments?: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const { error: updateError } = await supabase
        .from('vendor_applications')
        .update({
          application_status: 'approved',
          reviewed_by: userId,
          reviewed_at: new Date().toISOString()
        })
        .eq('id', applicationId);

      if (updateError) {
        return { success: false, error: updateError.message };
      }

      return { success: true };
    } catch (error: any) {
      console.error('Error in approveApplication:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Reject application
   */
  static async rejectApplication(
    applicationId: string,
    userId: string,
    reason: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const { error: updateError } = await supabase
        .from('vendor_applications')
        .update({
          application_status: 'rejected',
          reviewed_by: userId,
          reviewed_at: new Date().toISOString(),
          rejection_reason: reason
        })
        .eq('id', applicationId);

      if (updateError) {
        return { success: false, error: updateError.message };
      }

      return { success: true };
    } catch (error: any) {
      console.error('Error in rejectApplication:', error);
      return { success: false, error: error.message };
    }
  }

}
