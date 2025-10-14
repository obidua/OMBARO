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
  // Computed fields for easier access
  application_number?: string;
  partner_type?: string;
  city?: string;
  state?: string;
  pincode?: string;
  address_line1?: string;
  address_line2?: string;
  gst_number?: string;
  pan_number?: string;
  years_in_business?: number;
  number_of_staff?: number;
  description?: string;
  current_approval_stage?: number;
  applied_date?: string;
  latitude?: number;
  longitude?: number;
  status?: string;
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

      // Map JSONB fields to flat structure
      const mappedData = data?.map(app => ({
        ...app,
        application_number: app.application_data?.application_number || 'N/A',
        partner_type: app.application_data?.partner_type || 'N/A',
        city: app.business_address?.city || 'N/A',
        state: app.business_address?.state || 'N/A',
        pincode: app.business_address?.pincode || 'N/A',
        address_line1: app.business_address?.line1 || 'N/A',
        address_line2: app.business_address?.line2 || '',
        gst_number: app.application_data?.gst_number,
        pan_number: app.application_data?.pan_number,
        years_in_business: app.application_data?.years_in_business,
        number_of_staff: app.application_data?.number_of_staff,
        description: app.application_data?.description,
        current_approval_stage: 1,
        applied_date: app.created_at,
        status: app.application_status
      })) || [];

      return { success: true, data: mappedData as VendorApplication[] };
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

      // Map JSONB fields to flat structure for easier access
      const mappedData = data?.map(app => ({
        ...app,
        application_number: app.application_data?.application_number || 'N/A',
        partner_type: app.application_data?.partner_type || 'N/A',
        city: app.business_address?.city || 'N/A',
        state: app.business_address?.state || 'N/A',
        pincode: app.business_address?.pincode || 'N/A',
        address_line1: app.business_address?.line1 || 'N/A',
        address_line2: app.business_address?.line2 || '',
        gst_number: app.application_data?.gst_number,
        pan_number: app.application_data?.pan_number,
        years_in_business: app.application_data?.years_in_business,
        number_of_staff: app.application_data?.number_of_staff,
        description: app.application_data?.description,
        current_approval_stage: 1,
        applied_date: app.created_at,
        status: app.application_status
      })) || [];

      return { success: true, data: mappedData as VendorApplication[] };
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

      // Map JSONB fields to flat structure
      const mappedData = data?.map(app => ({
        ...app,
        application_number: app.application_data?.application_number || 'N/A',
        partner_type: app.application_data?.partner_type || 'N/A',
        city: app.business_address?.city || 'N/A',
        state: app.business_address?.state || 'N/A',
        pincode: app.business_address?.pincode || 'N/A',
        address_line1: app.business_address?.line1 || 'N/A',
        address_line2: app.business_address?.line2 || '',
        gst_number: app.application_data?.gst_number,
        pan_number: app.application_data?.pan_number,
        years_in_business: app.application_data?.years_in_business,
        number_of_staff: app.application_data?.number_of_staff,
        description: app.application_data?.description,
        current_approval_stage: 1,
        applied_date: app.created_at,
        status: app.application_status
      })) || [];

      return { success: true, data: mappedData as VendorApplication[] };
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

  /**
   * Get applications for specific hierarchy level
   */
  static async getApplicationsForLevel(hierarchyLevel: number): Promise<{ success: boolean; data?: VendorApplication[]; error?: string }> {
    try {
      // For now, return all pending/under_review applications
      // In production, this would filter based on approval stage
      const { data, error } = await supabase
        .from('vendor_applications')
        .select('*')
        .in('application_status', ['pending', 'under_review'])
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching applications for level:', error);
        return { success: false, error: error.message };
      }

      // Map JSONB fields to flat structure
      const mappedData = data?.map(app => ({
        ...app,
        application_number: app.application_data?.application_number || 'N/A',
        partner_type: app.application_data?.partner_type || 'N/A',
        city: app.business_address?.city || 'N/A',
        state: app.business_address?.state || 'N/A',
        pincode: app.business_address?.pincode || 'N/A',
        address_line1: app.business_address?.line1 || 'N/A',
        address_line2: app.business_address?.line2 || '',
        gst_number: app.application_data?.gst_number,
        pan_number: app.application_data?.pan_number,
        years_in_business: app.application_data?.years_in_business,
        number_of_staff: app.application_data?.number_of_staff,
        description: app.application_data?.description,
        current_approval_stage: 1,
        applied_date: app.created_at,
        status: app.application_status
      })) || [];

      return { success: true, data: mappedData as VendorApplication[] };
    } catch (error: any) {
      console.error('Error in getApplicationsForLevel:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Get approval history for an application
   */
  static async getApprovalHistory(applicationId: string): Promise<{ success: boolean; data?: ApprovalHistoryRecord[]; error?: string }> {
    try {
      const { data, error } = await supabase
        .from('vendor_approval_history')
        .select('*')
        .eq('application_id', applicationId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching approval history:', error);
        return { success: false, error: error.message };
      }

      return { success: true, data: data as ApprovalHistoryRecord[] };
    } catch (error: any) {
      console.error('Error in getApprovalHistory:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Request additional information
   */
  static async requestAdditionalInfo(
    applicationId: string,
    userId: string,
    note: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const { error: updateError } = await supabase
        .from('vendor_applications')
        .update({
          application_status: 'additional_info_required',
          reviewed_by: userId,
          reviewed_at: new Date().toISOString(),
          rejection_reason: note
        })
        .eq('id', applicationId);

      if (updateError) {
        return { success: false, error: updateError.message };
      }

      return { success: true };
    } catch (error: any) {
      console.error('Error in requestAdditionalInfo:', error);
      return { success: false, error: error.message };
    }
  }

}
