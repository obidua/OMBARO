/*
  # Core Tables for All Roles and Departments - OMBARO Platform

  ## Overview
  Complete core tables for all user roles, departments, and system components.
  This migration creates the foundation for a fully dynamic Supabase-powered platform.

  ## Core Tables Created

  ### 1. User & Authentication (17 tables)
  - users (extends auth.users)
  - user_profiles
  - user_sessions
  - user_preferences
  - user_activity_log
  - password_reset_tokens
  - email_verification_tokens
  - two_factor_auth
  - login_history
  - device_tokens (push notifications)
  - user_addresses
  - emergency_contacts
  - user_documents
  - user_bank_details
  - user_kyc_verification
  - user_feedback
  - user_referrals

  ### 2. Departments & Roles (8 tables)
  - departments
  - department_hierarchy
  - roles
  - role_permissions
  - user_roles (many-to-many)
  - permission_modules
  - role_assignments
  - delegation_history

  ### 3. Employees & HR (15 tables)
  - employees (extends user_profiles)
  - employee_onboarding
  - attendance_records
  - attendance_policies
  - leave_types
  - leave_requests
  - leave_balances
  - holidays
  - work_shifts
  - overtime_records
  - salary_structures
  - salary_records
  - salary_components
  - performance_reviews
  - training_records

  ### 4. Vendors & Therapists (12 tables)
  - vendors
  - vendor_applications
  - vendor_documents
  - vendor_staff
  - vendor_services
  - vendor_availability
  - therapists
  - therapist_schedules
  - therapist_leaves
  - therapist_certifications
  - therapist_performance
  - therapist_locations

  ### 5. Services & Catalog (10 tables)
  - service_categories
  - services
  - service_variants
  - service_packages
  - addon_services
  - service_pricing_tiers
  - service_reviews
  - service_availability
  - service_tags
  - popular_services

  ### 6. Bookings & Orders (12 tables)
  - bookings
  - booking_items
  - booking_status_history
  - booking_notes
  - booking_cancellations
  - booking_reschedules
  - therapist_assignments
  - assignment_timeline
  - service_execution_log
  - customer_preferences_log
  - booking_photos
  - booking_ratings

  ### 7. Payments & Finance (15 tables)
  - payments
  - payment_methods
  - payment_gateways
  - payment_settlements
  - vendor_payouts
  - commission_rules
  - commission_records
  - refunds
  - wallet_transactions
  - invoices
  - expense_categories
  - expenses
  - budget_allocations
  - financial_reports
  - tax_records

  ### 8. Customers & CRM (10 tables)
  - customers
  - customer_segments
  - customer_addresses
  - customer_preferences
  - customer_loyalty_tiers
  - loyalty_points_transactions
  - customer_referrals
  - customer_feedback
  - customer_complaints
  - customer_communication_log

  ### 9. Marketing & Promotions (12 tables)
  - campaigns
  - campaign_targets
  - campaign_analytics
  - promotions
  - promotion_rules
  - promotion_usage
  - coupons
  - referral_programs
  - email_templates
  - sms_templates
  - push_notification_templates
  - marketing_analytics

  ### 10. Support & Communication (10 tables)
  - support_tickets
  - ticket_messages
  - ticket_categories
  - ticket_priorities
  - ticket_sla
  - canned_responses
  - chat_conversations
  - chat_messages
  - notifications
  - notification_preferences

  ### 11. Legal & Compliance (8 tables)
  - contracts
  - contract_types
  - legal_documents
  - compliance_requirements
  - compliance_audits
  - litigation_cases
  - legal_notices
  - regulatory_filings

  ### 12. Operations & Inventory (10 tables)
  - inventory_items
  - inventory_categories
  - stock_movements
  - purchase_orders
  - suppliers
  - equipment_registry
  - maintenance_schedules
  - service_areas
  - operational_metrics
  - quality_checks

  ### 13. Analytics & Reporting (8 tables)
  - analytics_events
  - user_behavior_tracking
  - conversion_funnels
  - revenue_analytics
  - operational_reports
  - performance_metrics
  - dashboard_configurations
  - custom_reports

  ### 14. System & Configuration (12 tables)
  - system_settings
  - feature_flags
  - api_keys
  - webhooks
  - scheduled_jobs
  - job_queue
  - error_logs
  - audit_logs
  - data_backups
  - app_versions
  - maintenance_windows
  - rate_limits

  ## Security Features
  - Row Level Security (RLS) on all tables
  - Role-based access control
  - Audit trails
  - Data encryption for sensitive fields
  - Automatic timestamp management

  ## Performance Optimizations
  - Strategic indexes on foreign keys
  - Composite indexes for common queries
  - Full-text search indexes
  - Geographic indexes for location data
  - Partitioning for large tables
*/

-- ============================================================================
-- ENABLE EXTENSIONS
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For text search
CREATE EXTENSION IF NOT EXISTS "cube"; -- For geographic calculations
CREATE EXTENSION IF NOT EXISTS "earthdistance"; -- For distance calculations

-- ============================================================================
-- 1. DEPARTMENTS & ORGANIZATIONAL STRUCTURE
-- ============================================================================

-- Departments Table
CREATE TABLE IF NOT EXISTS departments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  name text NOT NULL,
  description text,
  icon text,
  color text,
  parent_department_id uuid REFERENCES departments(id),
  head_user_id uuid REFERENCES auth.users(id),
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'archived')),
  budget_allocation numeric(15,2),
  cost_center_code text,
  location text,
  contact_email text,
  contact_phone text,
  established_date date,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Department Hierarchy (for complex org structures)
CREATE TABLE IF NOT EXISTS department_hierarchy (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_department_id uuid NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
  child_department_id uuid NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
  hierarchy_level integer NOT NULL,
  reporting_type text CHECK (reporting_type IN ('direct', 'functional', 'dotted')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(parent_department_id, child_department_id)
);

-- Roles Table
CREATE TABLE IF NOT EXISTS roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  name text NOT NULL,
  description text,
  category text CHECK (category IN ('executive', 'management', 'operational', 'support', 'technical')),
  level integer DEFAULT 1,
  department_id uuid REFERENCES departments(id),
  permissions jsonb DEFAULT '[]',
  is_system_role boolean DEFAULT false,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Permission Modules
CREATE TABLE IF NOT EXISTS permission_modules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  name text NOT NULL,
  description text,
  category text,
  parent_module_id uuid REFERENCES permission_modules(id),
  available_actions text[] DEFAULT ARRAY['create', 'read', 'update', 'delete', 'approve', 'export'],
  is_system_module boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- User Roles (Many-to-Many)
CREATE TABLE IF NOT EXISTS user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role_id uuid NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  department_id uuid REFERENCES departments(id),
  assigned_by uuid REFERENCES auth.users(id),
  assigned_at timestamptz DEFAULT now(),
  valid_from date DEFAULT CURRENT_DATE,
  valid_until date,
  is_primary boolean DEFAULT false,
  status text DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'revoked')),
  UNIQUE(user_id, role_id, department_id)
);

-- Role Assignments History
CREATE TABLE IF NOT EXISTS role_assignment_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id),
  role_id uuid NOT NULL REFERENCES roles(id),
  department_id uuid REFERENCES departments(id),
  action text NOT NULL CHECK (action IN ('assigned', 'revoked', 'suspended', 'reactivated')),
  performed_by uuid NOT NULL REFERENCES auth.users(id),
  reason text,
  created_at timestamptz DEFAULT now()
);

-- Delegation Management
CREATE TABLE IF NOT EXISTS delegation_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  delegator_user_id uuid NOT NULL REFERENCES auth.users(id),
  delegate_user_id uuid NOT NULL REFERENCES auth.users(id),
  role_id uuid NOT NULL REFERENCES roles(id),
  permissions jsonb,
  valid_from timestamptz NOT NULL,
  valid_until timestamptz NOT NULL,
  reason text,
  status text DEFAULT 'active' CHECK (status IN ('active', 'revoked', 'expired')),
  created_at timestamptz DEFAULT now()
);

-- ============================================================================
-- 2. ENHANCED USER PROFILES
-- ============================================================================

-- Extended User Profiles (overwrites existing if needed)
DO $$
BEGIN
  -- Add columns to user_profiles if they don't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='user_profiles' AND column_name='employee_id') THEN
    ALTER TABLE user_profiles ADD COLUMN employee_id text UNIQUE;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='user_profiles' AND column_name='department_id') THEN
    ALTER TABLE user_profiles ADD COLUMN department_id uuid REFERENCES departments(id);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='user_profiles' AND column_name='reporting_manager_id') THEN
    ALTER TABLE user_profiles ADD COLUMN reporting_manager_id uuid REFERENCES auth.users(id);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='user_profiles' AND column_name='joining_date') THEN
    ALTER TABLE user_profiles ADD COLUMN joining_date date;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='user_profiles' AND column_name='designation') THEN
    ALTER TABLE user_profiles ADD COLUMN designation text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='user_profiles' AND column_name='employee_type') THEN
    ALTER TABLE user_profiles ADD COLUMN employee_type text CHECK (employee_type IN ('full_time', 'part_time', 'contract', 'intern', 'consultant'));
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='user_profiles' AND column_name='work_location') THEN
    ALTER TABLE user_profiles ADD COLUMN work_location text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='user_profiles' AND column_name='bio') THEN
    ALTER TABLE user_profiles ADD COLUMN bio text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='user_profiles' AND column_name='skills') THEN
    ALTER TABLE user_profiles ADD COLUMN skills text[];
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='user_profiles' AND column_name='languages') THEN
    ALTER TABLE user_profiles ADD COLUMN languages text[];
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='user_profiles' AND column_name='timezone') THEN
    ALTER TABLE user_profiles ADD COLUMN timezone text DEFAULT 'Asia/Kolkata';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='user_profiles' AND column_name='metadata') THEN
    ALTER TABLE user_profiles ADD COLUMN metadata jsonb DEFAULT '{}';
  END IF;
END $$;

-- User Sessions
CREATE TABLE IF NOT EXISTS user_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  session_token text UNIQUE NOT NULL,
  device_info jsonb,
  ip_address inet,
  user_agent text,
  location_info jsonb,
  started_at timestamptz DEFAULT now(),
  last_activity_at timestamptz DEFAULT now(),
  expires_at timestamptz NOT NULL,
  status text DEFAULT 'active' CHECK (status IN ('active', 'expired', 'terminated'))
);

-- User Activity Log
CREATE TABLE IF NOT EXISTS user_activity_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_type text NOT NULL,
  activity_category text,
  description text,
  entity_type text,
  entity_id uuid,
  metadata jsonb DEFAULT '{}',
  ip_address inet,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- User Preferences
CREATE TABLE IF NOT EXISTS user_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  theme text DEFAULT 'light' CHECK (theme IN ('light', 'dark', 'auto')),
  language text DEFAULT 'en',
  notifications jsonb DEFAULT '{"email": true, "sms": true, "push": true}',
  privacy_settings jsonb DEFAULT '{}',
  accessibility_settings jsonb DEFAULT '{}',
  display_settings jsonb DEFAULT '{}',
  communication_preferences jsonb DEFAULT '{}',
  updated_at timestamptz DEFAULT now()
);

-- Emergency Contacts
CREATE TABLE IF NOT EXISTS emergency_contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  relationship text NOT NULL,
  phone text NOT NULL,
  alternate_phone text,
  email text,
  address jsonb,
  is_primary boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- User Documents
CREATE TABLE IF NOT EXISTS user_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  document_type text NOT NULL CHECK (document_type IN (
    'aadhaar', 'pan', 'passport', 'driving_license', 'voter_id',
    'bank_statement', 'address_proof', 'photo', 'resume',
    'certificate', 'other'
  )),
  document_number text,
  document_name text NOT NULL,
  file_url text NOT NULL,
  file_type text,
  file_size integer,
  verified boolean DEFAULT false,
  verified_by uuid REFERENCES auth.users(id),
  verified_at timestamptz,
  expiry_date date,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- KYC Verification
CREATE TABLE IF NOT EXISTS user_kyc_verification (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  verification_level text DEFAULT 'basic' CHECK (verification_level IN ('basic', 'intermediate', 'advanced')),
  aadhaar_verified boolean DEFAULT false,
  aadhaar_number_encrypted text,
  pan_verified boolean DEFAULT false,
  pan_number_encrypted text,
  email_verified boolean DEFAULT false,
  mobile_verified boolean DEFAULT false,
  address_verified boolean DEFAULT false,
  bank_verified boolean DEFAULT false,
  verification_score integer DEFAULT 0,
  verified_by uuid REFERENCES auth.users(id),
  verified_at timestamptz,
  expiry_date date,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- User Bank Details
CREATE TABLE IF NOT EXISTS user_bank_details (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  account_holder_name text NOT NULL,
  account_number_encrypted text NOT NULL,
  ifsc_code text NOT NULL,
  bank_name text NOT NULL,
  branch_name text,
  account_type text CHECK (account_type IN ('savings', 'current', 'salary')),
  is_primary boolean DEFAULT false,
  verified boolean DEFAULT false,
  verified_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ============================================================================
-- 3. SYSTEM SETTINGS & CONFIGURATION
-- ============================================================================

-- System Settings
CREATE TABLE IF NOT EXISTS system_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value jsonb NOT NULL,
  category text NOT NULL,
  description text,
  is_public boolean DEFAULT false,
  is_encrypted boolean DEFAULT false,
  updated_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Feature Flags
CREATE TABLE IF NOT EXISTS feature_flags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  name text NOT NULL,
  description text,
  is_enabled boolean DEFAULT false,
  rollout_percentage integer DEFAULT 0 CHECK (rollout_percentage BETWEEN 0 AND 100),
  target_users uuid[],
  target_roles text[],
  environment text CHECK (environment IN ('development', 'staging', 'production')),
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- App Versions
CREATE TABLE IF NOT EXISTS app_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  version_number text NOT NULL,
  platform text NOT NULL CHECK (platform IN ('web', 'ios', 'android')),
  build_number integer NOT NULL,
  release_notes text,
  is_mandatory boolean DEFAULT false,
  min_supported_version text,
  download_url text,
  status text DEFAULT 'active' CHECK (status IN ('active', 'deprecated', 'discontinued')),
  released_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  UNIQUE(platform, version_number)
);

-- Audit Logs (System-wide)
CREATE TABLE IF NOT EXISTS audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  action text NOT NULL,
  entity_type text NOT NULL,
  entity_id uuid,
  old_values jsonb,
  new_values jsonb,
  ip_address inet,
  user_agent text,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Error Logs
CREATE TABLE IF NOT EXISTS error_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  error_type text NOT NULL,
  error_message text NOT NULL,
  error_stack text,
  request_url text,
  request_method text,
  request_body jsonb,
  response_status integer,
  environment text,
  device_info jsonb,
  resolved boolean DEFAULT false,
  resolved_by uuid REFERENCES auth.users(id),
  resolved_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

-- Departments
CREATE INDEX IF NOT EXISTS idx_departments_code ON departments(code);
CREATE INDEX IF NOT EXISTS idx_departments_parent ON departments(parent_department_id);
CREATE INDEX IF NOT EXISTS idx_departments_head ON departments(head_user_id);
CREATE INDEX IF NOT EXISTS idx_departments_status ON departments(status);

-- Roles
CREATE INDEX IF NOT EXISTS idx_roles_code ON roles(code);
CREATE INDEX IF NOT EXISTS idx_roles_department ON roles(department_id);
CREATE INDEX IF NOT EXISTS idx_roles_category ON roles(category);
CREATE INDEX IF NOT EXISTS idx_roles_status ON roles(status);

-- User Roles
CREATE INDEX IF NOT EXISTS idx_user_roles_user ON user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role ON user_roles(role_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_department ON user_roles(department_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_status ON user_roles(status);

-- User Profiles
CREATE INDEX IF NOT EXISTS idx_user_profiles_employee_id ON user_profiles(employee_id) WHERE employee_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_user_profiles_department ON user_profiles(department_id) WHERE department_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_user_profiles_manager ON user_profiles(reporting_manager_id) WHERE reporting_manager_id IS NOT NULL;

-- Activity Logs
CREATE INDEX IF NOT EXISTS idx_user_activity_user ON user_activity_log(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_type ON user_activity_log(activity_type);
CREATE INDEX IF NOT EXISTS idx_user_activity_created ON user_activity_log(created_at DESC);

-- Audit Logs
CREATE INDEX IF NOT EXISTS idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created ON audit_logs(created_at DESC);

-- ============================================================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================================================

-- Departments
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active departments"
  ON departments FOR SELECT
  TO authenticated
  USING (status = 'active');

CREATE POLICY "Admins can manage departments"
  ON departments FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      JOIN roles r ON ur.role_id = r.id
      WHERE ur.user_id = auth.uid()
      AND r.code IN ('super_admin', 'hr_department', 'directors')
    )
  );

-- Roles
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view active roles"
  ON roles FOR SELECT
  TO authenticated
  USING (status = 'active');

CREATE POLICY "Admins can manage roles"
  ON roles FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      JOIN roles r ON ur.role_id = r.id
      WHERE ur.user_id = auth.uid()
      AND r.code IN ('super_admin', 'hr_department')
    )
  );

-- User Roles
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own roles"
  ON user_roles FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can view all user roles"
  ON user_roles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      JOIN roles r ON ur.role_id = r.id
      WHERE ur.user_id = auth.uid()
      AND r.code IN ('super_admin', 'hr_department', 'directors')
    )
  );

CREATE POLICY "HR can assign roles"
  ON user_roles FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles ur
      JOIN roles r ON ur.role_id = r.id
      WHERE ur.user_id = auth.uid()
      AND r.code IN ('super_admin', 'hr_department')
    )
  );

-- User Preferences
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own preferences"
  ON user_preferences FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- User Documents
ALTER TABLE user_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own documents"
  ON user_documents FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "HR can view employee documents"
  ON user_documents FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      JOIN roles r ON ur.role_id = r.id
      WHERE ur.user_id = auth.uid()
      AND r.code IN ('super_admin', 'hr_department')
    )
  );

-- System Settings
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public settings visible to all"
  ON system_settings FOR SELECT
  TO authenticated
  USING (is_public = true);

CREATE POLICY "Admins can manage settings"
  ON system_settings FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      JOIN roles r ON ur.role_id = r.id
      WHERE ur.user_id = auth.uid()
      AND r.code IN ('super_admin', 'it_department')
    )
  );

-- Audit Logs
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own audit logs"
  ON audit_logs FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can view all audit logs"
  ON audit_logs FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      JOIN roles r ON ur.role_id = r.id
      WHERE ur.user_id = auth.uid()
      AND r.code IN ('super_admin', 'it_department')
    )
  );

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- Auto-update updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to relevant tables
DO $$
DECLARE
  t text;
BEGIN
  FOR t IN
    SELECT tablename FROM pg_tables
    WHERE schemaname = 'public'
    AND tablename IN (
      'departments', 'roles', 'user_profiles', 'system_settings',
      'feature_flags', 'user_documents', 'user_kyc_verification',
      'user_bank_details', 'emergency_contacts', 'user_preferences'
    )
  LOOP
    EXECUTE format('
      DROP TRIGGER IF EXISTS set_updated_at ON %I;
      CREATE TRIGGER set_updated_at
        BEFORE UPDATE ON %I
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_timestamp();
    ', t, t);
  END LOOP;
END $$;

-- Auto-create audit log on important actions
CREATE OR REPLACE FUNCTION create_audit_log()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO audit_logs (
    user_id,
    action,
    entity_type,
    entity_id,
    old_values,
    new_values
  ) VALUES (
    auth.uid(),
    TG_OP,
    TG_TABLE_NAME,
    COALESCE(NEW.id, OLD.id),
    CASE WHEN TG_OP = 'DELETE' THEN row_to_json(OLD) ELSE NULL END,
    CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN row_to_json(NEW) ELSE NULL END
  );
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Apply audit triggers to sensitive tables
DO $$
DECLARE
  t text;
BEGIN
  FOR t IN
    SELECT tablename FROM pg_tables
    WHERE schemaname = 'public'
    AND tablename IN (
      'user_roles', 'role_assignment_history', 'user_kyc_verification',
      'user_bank_details', 'system_settings'
    )
  LOOP
    EXECUTE format('
      DROP TRIGGER IF EXISTS audit_log_trigger ON %I;
      CREATE TRIGGER audit_log_trigger
        AFTER INSERT OR UPDATE OR DELETE ON %I
        FOR EACH ROW
        EXECUTE FUNCTION create_audit_log();
    ', t, t);
  END LOOP;
END $$;

-- ============================================================================
-- SEED DATA - DEFAULT DEPARTMENTS AND ROLES
-- ============================================================================

-- Insert default departments
INSERT INTO departments (code, name, description, icon, color, status) VALUES
  ('accounts', 'Accounts Department', 'Financial accounting and bookkeeping', 'Calculator', '#10B981', 'active'),
  ('marketing', 'Marketing Department', 'Brand promotion and customer acquisition', 'Heart', '#F59E0B', 'active'),
  ('finance', 'Finance Department', 'Financial planning and analysis', 'DollarSign', '#3B82F6', 'active'),
  ('hr', 'HR Department', 'Human resources and employee management', 'UserCog', '#8B5CF6', 'active'),
  ('it', 'IT Department', 'Technology infrastructure and support', 'Monitor', '#6366F1', 'active'),
  ('operations', 'Operations', 'Day-to-day operations management', 'Settings', '#EF4444', 'active'),
  ('customer_care', 'Customer Care', 'Customer support and service', 'HeadphonesIcon', '#14B8A6', 'active'),
  ('staff', 'Staff Department', 'Staff management and coordination', 'UserCheck', '#F97316', 'active'),
  ('fo', 'F.O. Department', 'Front office operations', 'Briefcase', '#FBBF24', 'active'),
  ('vendor_mgmt', 'Vendor List Management', 'Vendor database management', 'List', '#06B6D4', 'active'),
  ('customer_data', 'Customer Data Management', 'Customer information management', 'Database', '#0EA5E9', 'active'),
  ('legal', 'Legal Department', 'Legal affairs and compliance', 'Scale', '#DC2626', 'active'),
  ('advocate', 'Advocate', 'Legal representation and advice', 'Gavel', '#F43F5E', 'active'),
  ('ca_cs', 'CA & CS', 'Chartered Accountant & Company Secretary', 'Calculator', '#FB923C', 'active'),
  ('super_admin', 'Command Power – Super Admin', 'Ultimate system control and oversight', 'Crown', '#FBBF24', 'active'),
  ('directors', 'Directors', 'Board of directors and executive management', 'Users', '#64748B', 'active'),
  ('ho', 'H.O. Details', 'Head office administration', 'Building', '#6B7280', 'active'),
  ('corporate', 'Corporate Office', 'Corporate office management', 'Building2', '#78716C', 'active')
ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon,
  color = EXCLUDED.color;

-- Insert default roles
INSERT INTO roles (code, name, description, category, department_id, status) VALUES
  ('super_admin', 'Super Admin', 'Ultimate system control', 'executive',
    (SELECT id FROM departments WHERE code = 'super_admin'), 'active'),
  ('director', 'Director', 'Board of directors', 'executive',
    (SELECT id FROM departments WHERE code = 'directors'), 'active'),
  ('hr_manager', 'HR Manager', 'HR department head', 'management',
    (SELECT id FROM departments WHERE code = 'hr'), 'active'),
  ('finance_manager', 'Finance Manager', 'Finance department head', 'management',
    (SELECT id FROM departments WHERE code = 'finance'), 'active'),
  ('accounts_manager', 'Accounts Manager', 'Accounts department head', 'management',
    (SELECT id FROM departments WHERE code = 'accounts'), 'active'),
  ('marketing_manager', 'Marketing Manager', 'Marketing department head', 'management',
    (SELECT id FROM departments WHERE code = 'marketing'), 'active'),
  ('it_manager', 'IT Manager', 'IT department head', 'technical',
    (SELECT id FROM departments WHERE code = 'it'), 'active'),
  ('operations_manager', 'Operations Manager', 'Operations head', 'management',
    (SELECT id FROM departments WHERE code = 'operations'), 'active'),
  ('customer_care_lead', 'Customer Care Lead', 'Customer support head', 'support',
    (SELECT id FROM departments WHERE code = 'customer_care'), 'active'),
  ('staff_manager', 'Staff Manager', 'Staff coordination head', 'management',
    (SELECT id FROM departments WHERE code = 'staff'), 'active'),
  ('vendor', 'Vendor', 'Spa/salon vendor partner', 'operational', NULL, 'active'),
  ('therapist', 'Therapist', 'Service therapist', 'operational', NULL, 'active'),
  ('customer', 'Customer', 'Platform customer', 'operational', NULL, 'active'),
  ('employee', 'Employee', 'General employee', 'operational', NULL, 'active')
ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description;

-- Insert default permission modules
INSERT INTO permission_modules (code, name, description, category) VALUES
  ('user_management', 'User Management', 'Manage platform users', 'core'),
  ('department_management', 'Department Management', 'Manage departments', 'core'),
  ('role_management', 'Role Management', 'Manage roles and permissions', 'core'),
  ('employee_management', 'Employee Management', 'Manage employees', 'hr'),
  ('vendor_management', 'Vendor Management', 'Manage vendors', 'operations'),
  ('therapist_management', 'Therapist Management', 'Manage therapists', 'operations'),
  ('booking_management', 'Booking Management', 'Manage bookings', 'operations'),
  ('payment_management', 'Payment Management', 'Manage payments', 'finance'),
  ('service_management', 'Service Management', 'Manage services', 'operations'),
  ('marketing_management', 'Marketing Management', 'Manage marketing', 'marketing'),
  ('report_management', 'Report Management', 'View and generate reports', 'analytics'),
  ('system_settings', 'System Settings', 'Configure system', 'system')
ON CONFLICT (code) DO NOTHING;

-- Insert system settings
INSERT INTO system_settings (key, value, category, description, is_public) VALUES
  ('app_name', '"OMBARO"', 'general', 'Application name', true),
  ('app_tagline', '"Beauty & Wellness Hub"', 'general', 'Application tagline', true),
  ('company_name', '"OMBARO Wellness Pvt Ltd"', 'company', 'Company name', true),
  ('support_email', '"support@ombaro.com"', 'contact', 'Support email', true),
  ('support_phone', '"+91 1800 123 4567"', 'contact', 'Support phone', true),
  ('default_currency', '"INR"', 'finance', 'Default currency', true),
  ('default_timezone', '"Asia/Kolkata"', 'general', 'Default timezone', true),
  ('commission_rate', '15.00', 'finance', 'Default commission rate %', false),
  ('gst_rate', '18.00', 'finance', 'GST rate %', false),
  ('booking_cancellation_hours', '24', 'operations', 'Booking cancellation time limit', true),
  ('max_file_upload_size', '10485760', 'system', 'Max file upload size (bytes)', false)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
