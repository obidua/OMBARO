import { supabase } from '../lib/supabase';

export interface VendorApplication {
  id: string;
  application_number: string;
  user_id?: string;
  partner_type: string;
  business_name: string;
  business_type: string;
  contact_person: string;
  contact_mobile: string;
  contact_email: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  pincode: string;
  latitude?: number;
  longitude?: number;
  gst_number?: string;
  pan_number?: string;
  years_in_business?: number;
  number_of_staff?: number;
  description?: string;
  franchise_fee_paid: boolean;
  franchise_payment_reference?: string;
  franchise_agreement_signed: boolean;
  status: 'pending' | 'fo_review' | 'manager_review' | 'director_review' | 'admin_review' | 'approved' | 'rejected' | 'on_hold' | 'additional_info_required';
  current_approval_stage: number;
  applied_date: string;
  reviewed_by?: string;
  review_notes?: string;
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

      // Generate application number
      const appNumber = 'APP' + Date.now().toString().slice(-8);

      const { data, error } = await supabase
        .from('vendor_applications')
        .insert({
          application_number: appNumber,
          user_id: user.id,
          ...applicationData,
          status: 'pending',
          current_approval_stage: 1,
          franchise_fee_paid: applicationData.franchise_fee_paid || false,
          franchise_agreement_signed: false
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
   * Get applications for a specific approval level
   */
  static async getApplicationsForLevel(hierarchyLevel: number): Promise<{ success: boolean; data?: VendorApplication[]; error?: string }> {
    try {
      let statusFilter: string[] = [];

      switch (hierarchyLevel) {
        case 1: // Field Officer
          statusFilter = ['pending', 'fo_review'];
          break;
        case 2: // Manager
          statusFilter = ['manager_review'];
          break;
        case 3: // Director
          statusFilter = ['director_review'];
          break;
        case 4: // Admin/VP
        case 5:
          statusFilter = ['admin_review', 'pending', 'fo_review', 'manager_review', 'director_review'];
          break;
        default:
          return { success: false, error: 'Invalid hierarchy level' };
      }

      const { data, error } = await supabase
        .from('vendor_applications')
        .select('*')
        .in('status', statusFilter)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching applications:', error);
        return { success: false, error: error.message };
      }

      return { success: true, data: data as VendorApplication[] };
    } catch (error: any) {
      console.error('Error in getApplicationsForLevel:', error);
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
   * Approve application and forward to next level
   */
  static async approveApplication(
    applicationId: string,
    employeeId: string,
    comments?: string,
    documentsVerified?: Record<string, boolean>
  ): Promise<{ success: boolean; error?: string }> {
    try {
      // Get current application
      const { data: application, error: fetchError } = await supabase
        .from('vendor_applications')
        .select('*')
        .eq('id', applicationId)
        .single();

      if (fetchError || !application) {
        return { success: false, error: 'Application not found' };
      }

      const currentStage = application.current_approval_stage;
      let nextStatus: string;
      let nextStage: number;

      // Determine next stage based on current stage
      switch (currentStage) {
        case 1: // FO → Manager
          nextStatus = 'manager_review';
          nextStage = 2;
          break;
        case 2: // Manager → Director
          nextStatus = 'director_review';
          nextStage = 3;
          break;
        case 3: // Director → Admin
          nextStatus = 'admin_review';
          nextStage = 4;
          break;
        case 4: // Admin → Approved (create vendor)
          nextStatus = 'approved';
          nextStage = 5;
          break;
        default:
          return { success: false, error: 'Invalid approval stage' };
      }

      // Update application status
      const { error: updateError } = await supabase
        .from('vendor_applications')
        .update({
          status: nextStatus,
          current_approval_stage: nextStage,
          reviewed_by: employeeId,
          review_notes: comments,
          updated_at: new Date().toISOString()
        })
        .eq('id', applicationId);

      if (updateError) {
        return { success: false, error: updateError.message };
      }

      // Record approval in history
      const { error: historyError } = await supabase
        .from('vendor_approval_history')
        .insert({
          application_id: applicationId,
          approved_by: employeeId,
          approval_stage: currentStage,
          action: 'approved',
          comments: comments,
          documents_verified: documentsVerified || {}
        });

      if (historyError) {
        console.error('Error recording approval history:', historyError);
      }

      // If final approval, create vendor account
      if (nextStatus === 'approved') {
        await this.createVendorAccount(application);
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
    employeeId: string,
    reason: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      // Get current application
      const { data: application, error: fetchError } = await supabase
        .from('vendor_applications')
        .select('*')
        .eq('id', applicationId)
        .single();

      if (fetchError || !application) {
        return { success: false, error: 'Application not found' };
      }

      // Update application status
      const { error: updateError } = await supabase
        .from('vendor_applications')
        .update({
          status: 'rejected',
          reviewed_by: employeeId,
          review_notes: reason,
          updated_at: new Date().toISOString()
        })
        .eq('id', applicationId);

      if (updateError) {
        return { success: false, error: updateError.message };
      }

      // Record rejection in history
      const { error: historyError } = await supabase
        .from('vendor_approval_history')
        .insert({
          application_id: applicationId,
          approved_by: employeeId,
          approval_stage: application.current_approval_stage,
          action: 'rejected',
          comments: reason
        });

      if (historyError) {
        console.error('Error recording rejection history:', historyError);
      }

      return { success: true };
    } catch (error: any) {
      console.error('Error in rejectApplication:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Request additional information
   */
  static async requestAdditionalInfo(
    applicationId: string,
    employeeId: string,
    infoRequired: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      // Get current application
      const { data: application, error: fetchError } = await supabase
        .from('vendor_applications')
        .select('*')
        .eq('id', applicationId)
        .single();

      if (fetchError || !application) {
        return { success: false, error: 'Application not found' };
      }

      // Update application status
      const { error: updateError } = await supabase
        .from('vendor_applications')
        .update({
          status: 'additional_info_required',
          reviewed_by: employeeId,
          review_notes: infoRequired,
          updated_at: new Date().toISOString()
        })
        .eq('id', applicationId);

      if (updateError) {
        return { success: false, error: updateError.message };
      }

      // Record in history
      const { error: historyError } = await supabase
        .from('vendor_approval_history')
        .insert({
          application_id: applicationId,
          approved_by: employeeId,
          approval_stage: application.current_approval_stage,
          action: 'info_requested',
          comments: infoRequired
        });

      if (historyError) {
        console.error('Error recording info request history:', historyError);
      }

      return { success: true };
    } catch (error: any) {
      console.error('Error in requestAdditionalInfo:', error);
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
        .select(`
          *,
          approver:employees!vendor_approval_history_approved_by_fkey(name, designation, department)
        `)
        .eq('application_id', applicationId)
        .order('created_at', { ascending: false });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: data as ApprovalHistoryRecord[] };
    } catch (error: any) {
      console.error('Error in getApprovalHistory:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Create vendor account after final approval
   */
  private static async createVendorAccount(application: VendorApplication): Promise<void> {
    try {
      // Get commission rate based on partner type
      const { data: partnerType } = await supabase
        .from('partner_types')
        .select('commission_rate')
        .eq('type_code', application.partner_type)
        .single();

      const commissionRate = partnerType?.commission_rate || 20.0;

      // Create vendor record
      const { error: vendorError } = await supabase
        .from('vendors')
        .insert({
          user_id: application.user_id,
          application_id: application.id,
          partner_type: application.partner_type,
          business_name: application.business_name,
          business_type: application.business_type,
          contact_person: application.contact_person,
          contact_mobile: application.contact_mobile,
          contact_email: application.contact_email,
          address_line1: application.address_line1,
          address_line2: application.address_line2,
          city: application.city,
          state: application.state,
          pincode: application.pincode,
          latitude: application.latitude,
          longitude: application.longitude,
          gst_number: application.gst_number,
          pan_number: application.pan_number,
          is_active: true,
          verification_status: 'verified',
          onboarding_completed: true,
          commission_rate: commissionRate
        });

      if (vendorError) {
        console.error('Error creating vendor account:', vendorError);
        throw vendorError;
      }

      // Update user role to vendor
      if (application.user_id) {
        const { error: roleError } = await supabase
          .from('user_profiles')
          .update({ role: 'vendor' })
          .eq('id', application.user_id);

        if (roleError) {
          console.error('Error updating user role:', roleError);
        }
      }
    } catch (error) {
      console.error('Error in createVendorAccount:', error);
      throw error;
    }
  }

  /**
   * Get employee details by user ID
   */
  static async getEmployeeByUserId(userId: string): Promise<{ success: boolean; data?: Employee; error?: string }> {
    try {
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: data as Employee };
    } catch (error: any) {
      console.error('Error in getEmployeeByUserId:', error);
      return { success: false, error: error.message };
    }
  }
}
