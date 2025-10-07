import { supabase } from '../lib/supabase';

export interface Department {
  id: string;
  name: string;
  code: string;
  description: string;
  parent_department_id?: string;
  head_user_id?: string;
  department_type: 'executive' | 'operational' | 'support' | 'administrative';
  status: 'active' | 'inactive' | 'restructuring';
  email?: string;
  phone?: string;
  location?: string;
  budget_allocated?: number;
  employee_count?: number;
  settings?: any;
  created_at?: string;
  updated_at?: string;
}

export interface DepartmentModule {
  id: string;
  department_id: string;
  module_key: string;
  module_name: string;
  description?: string;
  icon: string;
  display_order: number;
  is_enabled: boolean;
  parent_module_id?: string;
  required_permissions: string[];
  settings?: any;
  subModules?: DepartmentModule[];
}

export interface DepartmentUserAssignment {
  id: string;
  user_id: string;
  department_id: string;
  role_id?: string;
  assignment_type: 'head' | 'member' | 'deputy' | 'viewer';
  is_primary: boolean;
  status: 'active' | 'inactive' | 'suspended';
  assigned_at: string;
  valid_from: string;
  valid_until?: string;
}

export interface DepartmentWidget {
  id: string;
  user_id: string;
  department_id: string;
  widget_type: 'stat' | 'chart' | 'list' | 'table' | 'calendar' | 'activity' | 'quick_action';
  widget_key: string;
  title: string;
  configuration: any;
  position: any;
  is_visible: boolean;
  display_order: number;
}

export interface DepartmentActivityLog {
  id: string;
  department_id: string;
  user_id: string;
  action: string;
  module_key?: string;
  resource_type?: string;
  resource_id?: string;
  description?: string;
  metadata?: any;
  created_at: string;
}

class DepartmentService {
  async getDepartments(): Promise<Department[]> {
    const { data, error } = await supabase
      .from('departments')
      .select('*')
      .eq('status', 'active')
      .order('name');

    if (error) throw error;
    return data || [];
  }

  async getDepartmentByCode(code: string): Promise<Department | null> {
    const { data, error } = await supabase
      .from('departments')
      .select('*')
      .eq('code', code)
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  async getDepartmentById(id: string): Promise<Department | null> {
    const { data, error } = await supabase
      .from('departments')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  async getDepartmentModules(departmentId: string): Promise<DepartmentModule[]> {
    const { data, error } = await supabase
      .from('department_modules')
      .select('*')
      .eq('department_id', departmentId)
      .eq('is_enabled', true)
      .order('display_order');

    if (error) throw error;

    const modules = data || [];
    const parentModules = modules.filter(m => !m.parent_module_id);

    return parentModules.map(parent => ({
      ...parent,
      subModules: modules.filter(m => m.parent_module_id === parent.id)
    }));
  }

  async getUserDepartmentAssignments(userId: string): Promise<DepartmentUserAssignment[]> {
    const { data, error } = await supabase
      .from('department_user_assignments')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')
      .order('is_primary', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getUserPrimaryDepartment(userId: string): Promise<Department | null> {
    const { data: assignment, error: assignmentError } = await supabase
      .from('department_user_assignments')
      .select('department_id')
      .eq('user_id', userId)
      .eq('status', 'active')
      .eq('is_primary', true)
      .maybeSingle();

    if (assignmentError || !assignment) return null;

    return this.getDepartmentById(assignment.department_id);
  }

  async assignUserToDepartment(
    userId: string,
    departmentId: string,
    assignmentType: 'head' | 'member' | 'deputy' | 'viewer' = 'member',
    isPrimary: boolean = false
  ): Promise<DepartmentUserAssignment> {
    const { data, error } = await supabase
      .from('department_user_assignments')
      .insert({
        user_id: userId,
        department_id: departmentId,
        assignment_type: assignmentType,
        is_primary: isPrimary,
        status: 'active'
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getUserWidgets(userId: string, departmentId: string): Promise<DepartmentWidget[]> {
    const { data, error } = await supabase
      .from('department_widgets')
      .select('*')
      .eq('user_id', userId)
      .eq('department_id', departmentId)
      .eq('is_visible', true)
      .order('display_order');

    if (error) throw error;
    return data || [];
  }

  async saveUserWidget(widget: Partial<DepartmentWidget>): Promise<DepartmentWidget> {
    const { data, error } = await supabase
      .from('department_widgets')
      .upsert(widget)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteUserWidget(widgetId: string): Promise<void> {
    const { error } = await supabase
      .from('department_widgets')
      .delete()
      .eq('id', widgetId);

    if (error) throw error;
  }

  async getDepartmentSettings(departmentId: string): Promise<any> {
    const { data, error } = await supabase
      .from('department_settings')
      .select('*')
      .eq('department_id', departmentId);

    if (error) throw error;

    const settings: any = {};
    (data || []).forEach(setting => {
      settings[setting.setting_key] = setting.setting_value;
    });

    return settings;
  }

  async updateDepartmentSetting(
    departmentId: string,
    settingKey: string,
    settingValue: any,
    settingType: 'general' | 'theme' | 'feature' | 'notification' | 'security' = 'general'
  ): Promise<void> {
    const { error } = await supabase
      .from('department_settings')
      .upsert({
        department_id: departmentId,
        setting_key: settingKey,
        setting_value: settingValue,
        setting_type: settingType
      });

    if (error) throw error;
  }

  async logActivity(
    departmentId: string,
    userId: string,
    action: string,
    options?: {
      moduleKey?: string;
      resourceType?: string;
      resourceId?: string;
      description?: string;
      metadata?: any;
    }
  ): Promise<void> {
    const { error } = await supabase
      .from('department_activity_logs')
      .insert({
        department_id: departmentId,
        user_id: userId,
        action,
        ...options
      });

    if (error) throw error;
  }

  async getDepartmentActivityLogs(
    departmentId: string,
    limit: number = 50
  ): Promise<DepartmentActivityLog[]> {
    const { data, error } = await supabase
      .from('department_activity_logs')
      .select('*')
      .eq('department_id', departmentId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  async updateDepartment(
    departmentId: string,
    updates: Partial<Department>
  ): Promise<Department> {
    const { data, error } = await supabase
      .from('departments')
      .update(updates)
      .eq('id', departmentId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async checkUserDepartmentAccess(userId: string, departmentId: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('department_user_assignments')
      .select('id')
      .eq('user_id', userId)
      .eq('department_id', departmentId)
      .eq('status', 'active')
      .maybeSingle();

    if (error) return false;
    return !!data;
  }

  async getUserDepartmentRole(
    userId: string,
    departmentId: string
  ): Promise<'head' | 'member' | 'deputy' | 'viewer' | null> {
    const { data, error } = await supabase
      .from('department_user_assignments')
      .select('assignment_type')
      .eq('user_id', userId)
      .eq('department_id', departmentId)
      .eq('status', 'active')
      .order('assignment_type')
      .limit(1)
      .maybeSingle();

    if (error || !data) return null;
    return data.assignment_type;
  }
}

export const departmentService = new DepartmentService();
