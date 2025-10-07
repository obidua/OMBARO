import { supabase } from '../lib/supabase';

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
  joining_date: string;
  created_at: string;
  updated_at: string;
}

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
  gst_number?: string;
  pan_number?: string;
  years_in_business?: number;
  number_of_staff?: number;
  description?: string;
  status: string;
  current_approval_stage: number;
  applied_date: string;
  reviewed_by?: string;
  review_notes?: string;
  created_at: string;
  updated_at: string;
}

class EmployeeService {
  async getEmployeeByUserId(userId: string): Promise<Employee | null> {
    try {
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching employee:', error);
      return null;
    }
  }

  async getEmployeeById(employeeId: string): Promise<Employee | null> {
    try {
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .eq('id', employeeId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching employee:', error);
      return null;
    }
  }

  async getTeamMembers(managerId: string): Promise<Employee[]> {
    try {
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .eq('reports_to', managerId)
        .eq('is_active', true);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching team members:', error);
      return [];
    }
  }

  async getApplicationsForApproval(
    hierarchyLevel: number,
    status?: string
  ): Promise<VendorApplication[]> {
    try {
      const statusMap: Record<number, string[]> = {
        1: ['pending'],
        2: ['fo_review'],
        3: ['manager_review'],
        4: ['director_review', 'admin_review']
      };

      const allowedStatuses = status ? [status] : statusMap[hierarchyLevel] || [];

      const { data, error } = await supabase
        .from('vendor_applications')
        .select('*')
        .in('status', allowedStatuses)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching applications:', error);
      return [];
    }
  }

  async approveApplication(
    applicationId: string,
    employeeId: string,
    comments?: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const { data: application, error: appError } = await supabase
        .from('vendor_applications')
        .select('*, current_approval_stage')
        .eq('id', applicationId)
        .single();

      if (appError || !application) {
        throw new Error('Application not found');
      }

      const currentStage = application.current_approval_stage;
      const nextStage = currentStage + 1;

      const statusMap: Record<number, string> = {
        1: 'fo_review',
        2: 'manager_review',
        3: 'director_review',
        4: 'approved'
      };

      const newStatus = statusMap[nextStage] || 'approved';
      const isFullyApproved = nextStage >= 4;

      const { error: updateError } = await supabase
        .from('vendor_applications')
        .update({
          status: newStatus,
          current_approval_stage: nextStage,
          updated_at: new Date().toISOString()
        })
        .eq('id', applicationId);

      if (updateError) throw updateError;

      await supabase
        .from('vendor_approval_history')
        .insert({
          application_id: applicationId,
          approved_by: employeeId,
          approval_stage: currentStage,
          action: 'approved',
          comments: comments || 'Approved'
        });

      if (isFullyApproved) {
        await this.createVendorFromApplication(applicationId);
      }

      await this.sendNotification(
        application.user_id,
        'Application Update',
        `Your application has been ${isFullyApproved ? 'approved' : 'forwarded for review'}.`,
        'vendor_approval'
      );

      return { success: true };
    } catch (error) {
      console.error('Error approving application:', error);
      return { success: false, error: (error as Error).message };
    }
  }

  async rejectApplication(
    applicationId: string,
    employeeId: string,
    reason: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const { data: application } = await supabase
        .from('vendor_applications')
        .select('user_id, current_approval_stage')
        .eq('id', applicationId)
        .single();

      const { error: updateError } = await supabase
        .from('vendor_applications')
        .update({
          status: 'rejected',
          review_notes: reason,
          updated_at: new Date().toISOString()
        })
        .eq('id', applicationId);

      if (updateError) throw updateError;

      await supabase
        .from('vendor_approval_history')
        .insert({
          application_id: applicationId,
          approved_by: employeeId,
          approval_stage: application?.current_approval_stage || 1,
          action: 'rejected',
          comments: reason
        });

      if (application?.user_id) {
        await this.sendNotification(
          application.user_id,
          'Application Rejected',
          `Your vendor application has been rejected. Reason: ${reason}`,
          'vendor_rejection'
        );
      }

      return { success: true };
    } catch (error) {
      console.error('Error rejecting application:', error);
      return { success: false, error: (error as Error).message };
    }
  }

  async requestAdditionalInfo(
    applicationId: string,
    employeeId: string,
    infoRequired: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const { data: application } = await supabase
        .from('vendor_applications')
        .select('user_id, current_approval_stage')
        .eq('id', applicationId)
        .single();

      const { error: updateError } = await supabase
        .from('vendor_applications')
        .update({
          status: 'additional_info_required',
          review_notes: infoRequired,
          updated_at: new Date().toISOString()
        })
        .eq('id', applicationId);

      if (updateError) throw updateError;

      await supabase
        .from('vendor_approval_history')
        .insert({
          application_id: applicationId,
          approved_by: employeeId,
          approval_stage: application?.current_approval_stage || 1,
          action: 'info_requested',
          comments: infoRequired
        });

      if (application?.user_id) {
        await this.sendNotification(
          application.user_id,
          'Additional Information Required',
          infoRequired,
          'vendor_info_required'
        );
      }

      return { success: true };
    } catch (error) {
      console.error('Error requesting info:', error);
      return { success: false, error: (error as Error).message };
    }
  }

  private async createVendorFromApplication(applicationId: string): Promise<void> {
    try {
      const { data: application, error: appError } = await supabase
        .from('vendor_applications')
        .select('*')
        .eq('id', applicationId)
        .single();

      if (appError || !application) return;

      const { data: partnerType } = await supabase
        .from('partner_types')
        .select('commission_rate')
        .eq('type_code', application.partner_type)
        .single();

      await supabase
        .from('vendors')
        .insert({
          user_id: application.user_id,
          application_id: applicationId,
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
          commission_rate: partnerType?.commission_rate || 20.00
        });

      if (application.user_id) {
        await supabase
          .from('user_profiles')
          .update({ role: 'vendor' })
          .eq('id', application.user_id);
      }
    } catch (error) {
      console.error('Error creating vendor:', error);
    }
  }

  private async sendNotification(
    userId: string,
    title: string,
    message: string,
    type: string
  ): Promise<void> {
    try {
      await supabase
        .from('notifications')
        .insert({
          user_id: userId,
          title,
          message,
          type,
          priority: 'normal',
          is_read: false
        });
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  }

  async getApprovalHistory(applicationId: string) {
    try {
      const { data, error } = await supabase
        .from('vendor_approval_history')
        .select(`
          *,
          approved_by_employee:employees!vendor_approval_history_approved_by_fkey(
            name,
            designation
          )
        `)
        .eq('application_id', applicationId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching approval history:', error);
      return [];
    }
  }

  async getEmployeeStats(employeeId: string) {
    try {
      const { count: approvedCount } = await supabase
        .from('vendor_approval_history')
        .select('*', { count: 'exact', head: true })
        .eq('approved_by', employeeId)
        .eq('action', 'approved');

      const { count: rejectedCount } = await supabase
        .from('vendor_approval_history')
        .select('*', { count: 'exact', head: true })
        .eq('approved_by', employeeId)
        .eq('action', 'rejected');

      const { count: pendingCount } = await supabase
        .from('vendor_applications')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      return {
        approved: approvedCount || 0,
        rejected: rejectedCount || 0,
        pending: pendingCount || 0,
        total: (approvedCount || 0) + (rejectedCount || 0)
      };
    } catch (error) {
      console.error('Error fetching employee stats:', error);
      return { approved: 0, rejected: 0, pending: 0, total: 0 };
    }
  }
}

export const employeeService = new EmployeeService();
