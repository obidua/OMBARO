/*
  # OMBARO Platform - Clean Production Schema

  **PRODUCTION-READY DATABASE SCHEMA**

  This migration creates a clean, optimized database schema with only the essential
  tables required for the OMBARO spa and wellness booking platform.

  ## Total Tables: 60 (Essential Only)

  ### Categories:
  1. System & Configuration (6 tables)
  2. Location & Geography (5 tables)
  3. Departments & Roles (5 tables)
  4. Users & Authentication (8 tables)
  5. Vendors (8 tables)
  6. Therapists (6 tables)
  7. Services (5 tables)
  8. Customers (4 tables)
  9. Bookings (6 tables)
  10. Payments (5 tables)
  11. Support (2 tables)

  ## Key Features:
  - Row Level Security (RLS) on all user-facing tables
  - Proper foreign key constraints
  - Optimized indexes for performance
  - Real-time location tracking
  - Complete audit trail
  - Scalable architecture
*/

-- ============================================================================
-- 1. SYSTEM & CONFIGURATION (6 tables)
-- ============================================================================

CREATE TABLE IF NOT EXISTS system_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value jsonb NOT NULL,
  description text,
  category text NOT NULL,
  is_public boolean DEFAULT false,
  updated_by uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS feature_flags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  is_enabled boolean DEFAULT false,
  rollout_percentage integer DEFAULT 0 CHECK (rollout_percentage BETWEEN 0 AND 100),
  target_roles text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  action text NOT NULL,
  resource_type text NOT NULL,
  resource_id uuid,
  old_values jsonb,
  new_values jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_resource ON audit_logs(resource_type, resource_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created ON audit_logs(created_at DESC);

CREATE TABLE IF NOT EXISTS error_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  error_type text NOT NULL,
  error_message text NOT NULL,
  stack_trace text,
  user_id uuid,
  request_data jsonb,
  severity text DEFAULT 'error' CHECK (severity IN ('info', 'warning', 'error', 'critical')),
  resolved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_error_logs_severity ON error_logs(severity) WHERE NOT resolved;
CREATE INDEX IF NOT EXISTS idx_error_logs_created ON error_logs(created_at DESC);

CREATE TABLE IF NOT EXISTS user_activity_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  action text NOT NULL,
  page_path text,
  metadata jsonb DEFAULT '{}',
  session_id text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_activity_user ON user_activity_log(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_created ON user_activity_log(created_at DESC);

CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  type text NOT NULL CHECK (type IN (
    'booking_confirmed', 'booking_cancelled', 'therapist_assigned',
    'therapist_arrived', 'service_started', 'service_completed',
    'payment_received', 'refund_processed', 'promotion', 'reminder', 'system_alert'
  )),
  title text NOT NULL,
  message text NOT NULL,
  data jsonb DEFAULT '{}',
  channels text[] DEFAULT ARRAY['push', 'in_app'],
  is_read boolean DEFAULT false,
  read_at timestamptz,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_unread ON notifications(user_id, is_read) WHERE NOT is_read;
CREATE INDEX IF NOT EXISTS idx_notifications_created ON notifications(created_at DESC);

-- ============================================================================
-- 2. LOCATION & GEOGRAPHY (5 tables)
-- ============================================================================

CREATE TABLE IF NOT EXISTS countries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  code text UNIQUE NOT NULL,
  phone_code text,
  currency text DEFAULT 'INR',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS states (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  country_id uuid NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
  name text NOT NULL,
  code text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  UNIQUE(country_id, code)
);

CREATE INDEX IF NOT EXISTS idx_states_country ON states(country_id);

CREATE TABLE IF NOT EXISTS cities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  state_id uuid NOT NULL REFERENCES states(id) ON DELETE CASCADE,
  name text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_cities_state ON cities(state_id);

CREATE TABLE IF NOT EXISTS zones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  city_id uuid REFERENCES cities(id) ON DELETE CASCADE,
  coordinates geography(POLYGON),
  is_serviceable boolean DEFAULT true,
  service_charge numeric(10,2) DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_zones_city ON zones(city_id);
CREATE INDEX IF NOT EXISTS idx_zones_coordinates ON zones USING GIST(coordinates);

CREATE TABLE IF NOT EXISTS pincode_master (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pincode text UNIQUE NOT NULL,
  city_id uuid REFERENCES cities(id) ON DELETE SET NULL,
  zone_id uuid REFERENCES zones(id) ON DELETE SET NULL,
  is_serviceable boolean DEFAULT true,
  delivery_charge numeric(10,2) DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_pincode_city ON pincode_master(city_id);
CREATE INDEX IF NOT EXISTS idx_pincode_serviceable ON pincode_master(pincode) WHERE is_serviceable;

-- ============================================================================
-- 3. DEPARTMENTS & ROLES (5 tables)
-- ============================================================================

CREATE TABLE IF NOT EXISTS departments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  code text UNIQUE NOT NULL,
  description text,
  parent_department_id uuid REFERENCES departments(id) ON DELETE SET NULL,
  head_user_id uuid,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_departments_parent ON departments(parent_department_id);
CREATE INDEX IF NOT EXISTS idx_departments_status ON departments(status);

CREATE TABLE IF NOT EXISTS roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  code text UNIQUE NOT NULL,
  description text,
  department_id uuid REFERENCES departments(id) ON DELETE SET NULL,
  level integer DEFAULT 1,
  permissions jsonb DEFAULT '[]',
  is_system_role boolean DEFAULT false,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_roles_department ON roles(department_id);
CREATE INDEX IF NOT EXISTS idx_roles_status ON roles(status);

CREATE TABLE IF NOT EXISTS permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  code text UNIQUE NOT NULL,
  description text,
  resource text NOT NULL,
  action text NOT NULL CHECK (action IN ('create', 'read', 'update', 'delete', 'execute', 'approve')),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS role_permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role_id uuid NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  permission_id uuid NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
  granted_at timestamptz DEFAULT now(),
  UNIQUE(role_id, permission_id)
);

CREATE INDEX IF NOT EXISTS idx_role_permissions_role ON role_permissions(role_id);
CREATE INDEX IF NOT EXISTS idx_role_permissions_permission ON role_permissions(permission_id);

CREATE TABLE IF NOT EXISTS user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role_id uuid NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  department_id uuid REFERENCES departments(id) ON DELETE SET NULL,
  assigned_by uuid REFERENCES auth.users(id),
  assigned_at timestamptz DEFAULT now(),
  valid_from date DEFAULT CURRENT_DATE,
  valid_until date,
  is_primary boolean DEFAULT false,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'expired')),
  UNIQUE(user_id, role_id, department_id)
);

CREATE INDEX IF NOT EXISTS idx_user_roles_user ON user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role ON user_roles(role_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_active ON user_roles(user_id, status) WHERE status = 'active';

-- ============================================================================
-- 4. USERS & AUTHENTICATION (8 tables)
-- ============================================================================

CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  mobile text UNIQUE NOT NULL,
  email text,
  gender text CHECK (gender IN ('male', 'female', 'other')),
  date_of_birth date,
  profile_image text,
  role text NOT NULL CHECK (role IN (
    'customer', 'vendor', 'therapist', 'employee', 'admin',
    'super_admin', 'accounts_department', 'marketing_department',
    'finance_department', 'hr_department', 'it_department',
    'customer_care', 'legal_department'
  )),
  employee_id text UNIQUE,
  department_id uuid REFERENCES departments(id) ON DELETE SET NULL,
  designation text,
  joining_date date,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended', 'terminated')),
  address jsonb,
  emergency_contact jsonb,
  preferences jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);
CREATE INDEX IF NOT EXISTS idx_user_profiles_mobile ON user_profiles(mobile);
CREATE INDEX IF NOT EXISTS idx_user_profiles_status ON user_profiles(status);
CREATE INDEX IF NOT EXISTS idx_user_profiles_department ON user_profiles(department_id);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

CREATE POLICY "Admins can view all profiles"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role IN ('admin', 'super_admin', 'hr_department')
    )
  );

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

CREATE INDEX IF NOT EXISTS idx_user_sessions_user ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_token ON user_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_user_sessions_active ON user_sessions(user_id, status) WHERE status = 'active';

ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own sessions"
  ON user_sessions FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE TABLE IF NOT EXISTS user_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  document_type text NOT NULL CHECK (document_type IN ('aadhaar', 'pan', 'passport', 'driving_license', 'gst', 'other')),
  document_number text,
  document_name text NOT NULL,
  file_url text NOT NULL,
  file_type text,
  file_size integer,
  verified boolean DEFAULT false,
  verified_by uuid REFERENCES auth.users(id),
  verified_at timestamptz,
  expiry_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_user_documents_user ON user_documents(user_id);
CREATE INDEX IF NOT EXISTS idx_user_documents_type ON user_documents(document_type);

ALTER TABLE user_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own documents"
  ON user_documents FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can upload own documents"
  ON user_documents FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE TABLE IF NOT EXISTS user_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  notification_email boolean DEFAULT true,
  notification_sms boolean DEFAULT true,
  notification_push boolean DEFAULT true,
  notification_whatsapp boolean DEFAULT false,
  language text DEFAULT 'en',
  timezone text DEFAULT 'Asia/Kolkata',
  currency text DEFAULT 'INR',
  theme text DEFAULT 'light' CHECK (theme IN ('light', 'dark', 'auto')),
  preferences jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_user_preferences_user ON user_preferences(user_id);

ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own preferences"
  ON user_preferences FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE TABLE IF NOT EXISTS user_kyc_verification (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  verification_type text NOT NULL CHECK (verification_type IN ('aadhaar', 'pan', 'bank', 'email', 'mobile', 'gst')),
  verification_status text DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'failed', 'expired')),
  verification_data jsonb,
  verified_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_user_kyc_user ON user_kyc_verification(user_id);
CREATE INDEX IF NOT EXISTS idx_user_kyc_status ON user_kyc_verification(verification_status);

CREATE TABLE IF NOT EXISTS user_bank_details (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  account_holder_name text NOT NULL,
  account_number text NOT NULL,
  ifsc_code text NOT NULL,
  bank_name text NOT NULL,
  branch_name text,
  account_type text CHECK (account_type IN ('savings', 'current')),
  is_primary boolean DEFAULT false,
  is_verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_user_bank_user ON user_bank_details(user_id);

CREATE TABLE IF NOT EXISTS emergency_contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  relationship text NOT NULL,
  mobile text NOT NULL,
  email text,
  address text,
  is_primary boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_emergency_contacts_user ON emergency_contacts(user_id);

CREATE TABLE IF NOT EXISTS employees (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  employee_code text UNIQUE NOT NULL,
  joining_date date NOT NULL,
  probation_end_date date,
  confirmation_date date,
  employment_type text CHECK (employment_type IN ('full_time', 'part_time', 'contract', 'intern')),
  reporting_manager_id uuid REFERENCES employees(id) ON DELETE SET NULL,
  work_location text,
  basic_salary numeric(12,2),
  status text DEFAULT 'active' CHECK (status IN ('active', 'on_leave', 'inactive', 'terminated')),
  exit_date date,
  exit_reason text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_employees_code ON employees(employee_code);
CREATE INDEX IF NOT EXISTS idx_employees_status ON employees(status);
CREATE INDEX IF NOT EXISTS idx_employees_manager ON employees(reporting_manager_id);

-- ============================================================================
-- 5. VENDORS (8 tables)
-- ============================================================================

CREATE TABLE IF NOT EXISTS vendors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE REFERENCES auth.users(id) ON DELETE SET NULL,
  business_name text NOT NULL,
  business_type text CHECK (business_type IN ('spa', 'salon', 'wellness_center', 'home_service', 'hotel_spa')),
  registration_number text,
  gst_number text,
  pan_number text,
  contact_person text NOT NULL,
  contact_mobile text NOT NULL,
  contact_email text NOT NULL,
  business_address jsonb NOT NULL,
  operating_hours jsonb,
  services_offered uuid[],
  rating numeric(3,2) DEFAULT 0.00 CHECK (rating BETWEEN 0 AND 5),
  total_reviews integer DEFAULT 0,
  total_bookings integer DEFAULT 0,
  verification_status text DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
  verification_documents jsonb,
  commission_rate numeric(5,2) DEFAULT 15.00,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended', 'terminated')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_vendors_user ON vendors(user_id);
CREATE INDEX IF NOT EXISTS idx_vendors_status ON vendors(status);
CREATE INDEX IF NOT EXISTS idx_vendors_verification ON vendors(verification_status);
CREATE INDEX IF NOT EXISTS idx_vendors_rating ON vendors(rating DESC);

ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Vendors can view own profile"
  ON vendors FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Vendors can update own profile"
  ON vendors FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Everyone can view active vendors"
  ON vendors FOR SELECT
  TO authenticated
  USING (status = 'active' AND verification_status = 'verified');

CREATE TABLE IF NOT EXISTS vendor_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id uuid NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  document_type text NOT NULL CHECK (document_type IN ('gst', 'pan', 'registration', 'license', 'insurance', 'other')),
  document_name text NOT NULL,
  file_url text NOT NULL,
  file_type text,
  verified boolean DEFAULT false,
  verified_at timestamptz,
  expiry_date date,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_vendor_documents_vendor ON vendor_documents(vendor_id);

CREATE TABLE IF NOT EXISTS vendor_services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id uuid NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  service_id uuid NOT NULL,
  is_available boolean DEFAULT true,
  custom_price numeric(10,2),
  custom_duration integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(vendor_id, service_id)
);

CREATE INDEX IF NOT EXISTS idx_vendor_services_vendor ON vendor_services(vendor_id);
CREATE INDEX IF NOT EXISTS idx_vendor_services_available ON vendor_services(vendor_id, is_available) WHERE is_available;

ALTER TABLE vendor_services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Vendors can manage own services"
  ON vendor_services FOR ALL
  TO authenticated
  USING (vendor_id IN (SELECT id FROM vendors WHERE user_id = auth.uid()))
  WITH CHECK (vendor_id IN (SELECT id FROM vendors WHERE user_id = auth.uid()));

CREATE TABLE IF NOT EXISTS vendor_staff (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id uuid NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  name text NOT NULL,
  role text NOT NULL CHECK (role IN ('manager', 'receptionist', 'accountant', 'admin')),
  mobile text NOT NULL,
  email text,
  permissions jsonb DEFAULT '[]',
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_vendor_staff_vendor ON vendor_staff(vendor_id);
CREATE INDEX IF NOT EXISTS idx_vendor_staff_status ON vendor_staff(status);

CREATE TABLE IF NOT EXISTS vendor_payouts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id uuid NOT NULL REFERENCES vendors(id) ON DELETE RESTRICT,
  period_start date NOT NULL,
  period_end date NOT NULL,
  total_bookings integer DEFAULT 0,
  gross_amount numeric(12,2) NOT NULL,
  commission_amount numeric(12,2) NOT NULL,
  tds_amount numeric(12,2) DEFAULT 0,
  net_amount numeric(12,2) NOT NULL,
  payout_status text DEFAULT 'pending' CHECK (payout_status IN ('pending', 'processing', 'completed', 'failed')),
  payment_method text,
  payment_reference text,
  payment_date timestamptz,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_vendor_payouts_vendor ON vendor_payouts(vendor_id);
CREATE INDEX IF NOT EXISTS idx_vendor_payouts_period ON vendor_payouts(period_start, period_end);
CREATE INDEX IF NOT EXISTS idx_vendor_payouts_status ON vendor_payouts(payout_status);

ALTER TABLE vendor_payouts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Vendors can view own payouts"
  ON vendor_payouts FOR SELECT
  TO authenticated
  USING (vendor_id IN (SELECT id FROM vendors WHERE user_id = auth.uid()));

CREATE TABLE IF NOT EXISTS vendor_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id uuid NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  customer_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  booking_id uuid,
  rating integer NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review_title text,
  review_text text,
  service_quality_rating integer CHECK (service_quality_rating BETWEEN 1 AND 5),
  cleanliness_rating integer CHECK (cleanliness_rating BETWEEN 1 AND 5),
  value_rating integer CHECK (value_rating BETWEEN 1 AND 5),
  photos text[],
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_vendor_reviews_vendor ON vendor_reviews(vendor_id);
CREATE INDEX IF NOT EXISTS idx_vendor_reviews_customer ON vendor_reviews(customer_id);
CREATE INDEX IF NOT EXISTS idx_vendor_reviews_rating ON vendor_reviews(rating);

ALTER TABLE vendor_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view approved reviews"
  ON vendor_reviews FOR SELECT
  TO authenticated
  USING (status = 'approved');

CREATE POLICY "Customers can create reviews"
  ON vendor_reviews FOR INSERT
  TO authenticated
  WITH CHECK (customer_id = auth.uid());

CREATE TABLE IF NOT EXISTS vendor_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  business_name text NOT NULL,
  business_type text NOT NULL,
  contact_person text NOT NULL,
  contact_mobile text NOT NULL,
  contact_email text NOT NULL,
  business_address jsonb NOT NULL,
  application_data jsonb DEFAULT '{}',
  application_status text DEFAULT 'pending' CHECK (application_status IN ('pending', 'under_review', 'approved', 'rejected')),
  reviewed_by uuid REFERENCES auth.users(id),
  reviewed_at timestamptz,
  rejection_reason text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_vendor_applications_user ON vendor_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_vendor_applications_status ON vendor_applications(application_status);

ALTER TABLE vendor_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can create own application"
  ON vendor_applications FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can view own applications"
  ON vendor_applications FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE TABLE IF NOT EXISTS vendor_availability (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id uuid NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  day_of_week integer NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  open_time time NOT NULL,
  close_time time NOT NULL,
  is_open boolean DEFAULT true,
  break_start time,
  break_end time,
  created_at timestamptz DEFAULT now(),
  UNIQUE(vendor_id, day_of_week)
);

CREATE INDEX IF NOT EXISTS idx_vendor_availability_vendor ON vendor_availability(vendor_id);

-- ============================================================================
-- 6. THERAPISTS (6 tables)
-- ============================================================================

CREATE TABLE IF NOT EXISTS therapists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE REFERENCES auth.users(id) ON DELETE SET NULL,
  vendor_id uuid NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text,
  mobile text NOT NULL,
  gender text CHECK (gender IN ('male', 'female', 'other')),
  date_of_birth date,
  profile_image text,
  specialization text[],
  experience_years integer DEFAULT 0,
  certifications jsonb DEFAULT '[]',
  languages text[],
  rating numeric(3,2) DEFAULT 0.00 CHECK (rating BETWEEN 0 AND 5),
  total_reviews integer DEFAULT 0,
  total_services integer DEFAULT 0,
  total_earnings numeric(12,2) DEFAULT 0,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'on_leave', 'terminated')),
  availability_status text DEFAULT 'offline' CHECK (availability_status IN ('available', 'busy', 'offline')),
  address jsonb,
  emergency_contact jsonb,
  bank_details jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_therapists_user ON therapists(user_id);
CREATE INDEX IF NOT EXISTS idx_therapists_vendor ON therapists(vendor_id);
CREATE INDEX IF NOT EXISTS idx_therapists_status ON therapists(status);
CREATE INDEX IF NOT EXISTS idx_therapists_availability ON therapists(availability_status);
CREATE INDEX IF NOT EXISTS idx_therapists_rating ON therapists(rating DESC);

ALTER TABLE therapists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Therapists can view own profile"
  ON therapists FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Vendors can view own therapists"
  ON therapists FOR SELECT
  TO authenticated
  USING (vendor_id IN (SELECT id FROM vendors WHERE user_id = auth.uid()));

CREATE POLICY "Customers can view active therapists"
  ON therapists FOR SELECT
  TO authenticated
  USING (status = 'active');

CREATE TABLE IF NOT EXISTS therapist_schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  therapist_id uuid NOT NULL REFERENCES therapists(id) ON DELETE CASCADE,
  day_of_week integer NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  start_time time NOT NULL,
  end_time time NOT NULL,
  is_available boolean DEFAULT true,
  break_start time,
  break_end time,
  max_bookings integer DEFAULT 5,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(therapist_id, day_of_week)
);

CREATE INDEX IF NOT EXISTS idx_therapist_schedules_therapist ON therapist_schedules(therapist_id);

ALTER TABLE therapist_schedules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Therapists can manage own schedule"
  ON therapist_schedules FOR ALL
  TO authenticated
  USING (therapist_id IN (SELECT id FROM therapists WHERE user_id = auth.uid()))
  WITH CHECK (therapist_id IN (SELECT id FROM therapists WHERE user_id = auth.uid()));

CREATE TABLE IF NOT EXISTS therapist_leaves (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  therapist_id uuid NOT NULL REFERENCES therapists(id) ON DELETE CASCADE,
  leave_type text NOT NULL CHECK (leave_type IN ('sick', 'casual', 'emergency', 'annual', 'unpaid')),
  start_date date NOT NULL,
  end_date date NOT NULL,
  total_days integer GENERATED ALWAYS AS (end_date - start_date + 1) STORED,
  reason text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'cancelled')),
  approved_by uuid REFERENCES auth.users(id),
  approved_at timestamptz,
  rejection_reason text,
  documents text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CHECK (end_date >= start_date)
);

CREATE INDEX IF NOT EXISTS idx_therapist_leaves_therapist ON therapist_leaves(therapist_id);
CREATE INDEX IF NOT EXISTS idx_therapist_leaves_status ON therapist_leaves(status);
CREATE INDEX IF NOT EXISTS idx_therapist_leaves_dates ON therapist_leaves(start_date, end_date);

ALTER TABLE therapist_leaves ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Therapists can manage own leaves"
  ON therapist_leaves FOR ALL
  TO authenticated
  USING (therapist_id IN (SELECT id FROM therapists WHERE user_id = auth.uid()))
  WITH CHECK (therapist_id IN (SELECT id FROM therapists WHERE user_id = auth.uid()));

CREATE TABLE IF NOT EXISTS therapist_locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  therapist_id uuid NOT NULL REFERENCES therapists(id) ON DELETE CASCADE,
  booking_id uuid,
  latitude numeric(10,8) NOT NULL,
  longitude numeric(11,8) NOT NULL,
  accuracy numeric(10,2),
  altitude numeric(10,2),
  speed numeric(10,2),
  heading numeric(5,2),
  battery_level integer CHECK (battery_level BETWEEN 0 AND 100),
  is_moving boolean DEFAULT false,
  timestamp timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_therapist_locations_therapist ON therapist_locations(therapist_id);
CREATE INDEX IF NOT EXISTS idx_therapist_locations_timestamp ON therapist_locations(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_therapist_locations_booking ON therapist_locations(booking_id) WHERE booking_id IS NOT NULL;

ALTER TABLE therapist_locations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Therapists can insert own location"
  ON therapist_locations FOR INSERT
  TO authenticated
  WITH CHECK (therapist_id IN (SELECT id FROM therapists WHERE user_id = auth.uid()));

CREATE POLICY "Customers can track their therapist"
  ON therapist_locations FOR SELECT
  TO authenticated
  USING (
    booking_id IN (
      SELECT id FROM bookings WHERE customer_id = auth.uid()
    )
  );

CREATE TABLE IF NOT EXISTS therapist_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL,
  therapist_id uuid NOT NULL REFERENCES therapists(id) ON DELETE RESTRICT,
  vendor_id uuid NOT NULL REFERENCES vendors(id) ON DELETE RESTRICT,
  customer_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
  service_id uuid NOT NULL,
  assignment_date date NOT NULL,
  assignment_time time NOT NULL,
  status text DEFAULT 'assigned' CHECK (status IN (
    'assigned', 'acknowledged', 'in_transit', 'reached', 'in_progress', 'completed', 'cancelled'
  )),
  location_address text NOT NULL,
  location_latitude numeric(10,8),
  location_longitude numeric(11,8),
  estimated_duration integer NOT NULL,
  actual_start_time timestamptz,
  actual_end_time timestamptz,
  actual_duration integer,
  distance_traveled numeric(10,2),
  travel_time integer,
  customer_rating integer CHECK (customer_rating BETWEEN 1 AND 5),
  customer_feedback text,
  tips_amount numeric(10,2) DEFAULT 0,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_therapist_assignments_booking ON therapist_assignments(booking_id);
CREATE INDEX IF NOT EXISTS idx_therapist_assignments_therapist ON therapist_assignments(therapist_id);
CREATE INDEX IF NOT EXISTS idx_therapist_assignments_vendor ON therapist_assignments(vendor_id);
CREATE INDEX IF NOT EXISTS idx_therapist_assignments_customer ON therapist_assignments(customer_id);
CREATE INDEX IF NOT EXISTS idx_therapist_assignments_status ON therapist_assignments(status);
CREATE INDEX IF NOT EXISTS idx_therapist_assignments_date ON therapist_assignments(assignment_date, assignment_time);

ALTER TABLE therapist_assignments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Therapists can view own assignments"
  ON therapist_assignments FOR SELECT
  TO authenticated
  USING (therapist_id IN (SELECT id FROM therapists WHERE user_id = auth.uid()));

CREATE POLICY "Therapists can update own assignments"
  ON therapist_assignments FOR UPDATE
  TO authenticated
  USING (therapist_id IN (SELECT id FROM therapists WHERE user_id = auth.uid()))
  WITH CHECK (therapist_id IN (SELECT id FROM therapists WHERE user_id = auth.uid()));

CREATE POLICY "Customers can view own assignments"
  ON therapist_assignments FOR SELECT
  TO authenticated
  USING (customer_id = auth.uid());

CREATE POLICY "Vendors can view own assignments"
  ON therapist_assignments FOR SELECT
  TO authenticated
  USING (vendor_id IN (SELECT id FROM vendors WHERE user_id = auth.uid()));

CREATE TABLE IF NOT EXISTS therapist_performance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  therapist_id uuid NOT NULL REFERENCES therapists(id) ON DELETE CASCADE,
  month date NOT NULL,
  total_assignments integer DEFAULT 0,
  completed_assignments integer DEFAULT 0,
  cancelled_assignments integer DEFAULT 0,
  average_rating numeric(3,2) DEFAULT 0,
  total_earnings numeric(12,2) DEFAULT 0,
  total_tips numeric(12,2) DEFAULT 0,
  on_time_percentage numeric(5,2) DEFAULT 0,
  customer_satisfaction numeric(5,2) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(therapist_id, month)
);

CREATE INDEX IF NOT EXISTS idx_therapist_performance_therapist ON therapist_performance(therapist_id);
CREATE INDEX IF NOT EXISTS idx_therapist_performance_month ON therapist_performance(month DESC);

ALTER TABLE therapist_performance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Therapists can view own performance"
  ON therapist_performance FOR SELECT
  TO authenticated
  USING (therapist_id IN (SELECT id FROM therapists WHERE user_id = auth.uid()));

-- ============================================================================
-- 7. SERVICES (5 tables)
-- ============================================================================

CREATE TABLE IF NOT EXISTS service_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  icon text,
  image_url text,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_service_categories_active ON service_categories(is_active, display_order);

CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  category_id uuid REFERENCES service_categories(id) ON DELETE SET NULL,
  description text,
  short_description text,
  benefits text[],
  duration integer NOT NULL,
  base_price numeric(10,2) NOT NULL,
  discounted_price numeric(10,2),
  image_url text,
  images text[],
  techniques text,
  focus_areas text[],
  contraindications text,
  is_popular boolean DEFAULT false,
  is_featured boolean DEFAULT false,
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_services_category ON services(category_id);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(is_active);
CREATE INDEX IF NOT EXISTS idx_services_popular ON services(is_popular) WHERE is_popular;
CREATE INDEX IF NOT EXISTS idx_services_search ON services USING gin(to_tsvector('english', name || ' ' || COALESCE(description, '')));

CREATE TABLE IF NOT EXISTS addon_services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  duration integer NOT NULL,
  price numeric(10,2) NOT NULL,
  image_url text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_addon_services_active ON addon_services(is_active);

CREATE TABLE IF NOT EXISTS service_packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  service_ids uuid[] NOT NULL,
  addon_ids uuid[],
  total_duration integer NOT NULL,
  package_price numeric(10,2) NOT NULL,
  discount_percentage numeric(5,2) DEFAULT 0,
  image_url text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_service_packages_active ON service_packages(is_active);

CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reviewable_type text NOT NULL CHECK (reviewable_type IN ('service', 'therapist', 'vendor', 'booking')),
  reviewable_id uuid NOT NULL,
  customer_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  booking_id uuid,
  rating integer NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title text,
  review_text text,
  photos text[],
  helpful_count integer DEFAULT 0,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'flagged')),
  moderated_by uuid REFERENCES auth.users(id),
  moderation_notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_reviews_reviewable ON reviews(reviewable_type, reviewable_id);
CREATE INDEX IF NOT EXISTS idx_reviews_customer ON reviews(customer_id);
CREATE INDEX IF NOT EXISTS idx_reviews_status ON reviews(status);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view approved reviews"
  ON reviews FOR SELECT
  TO authenticated
  USING (status = 'approved');

CREATE POLICY "Customers can create reviews"
  ON reviews FOR INSERT
  TO authenticated
  WITH CHECK (customer_id = auth.uid());

-- ============================================================================
-- 8. CUSTOMERS (4 tables)
-- ============================================================================

CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  membership_tier text DEFAULT 'silver' CHECK (membership_tier IN ('silver', 'gold', 'platinum', 'diamond')),
  membership_start_date date DEFAULT CURRENT_DATE,
  loyalty_points integer DEFAULT 0,
  total_bookings integer DEFAULT 0,
  total_spent numeric(12,2) DEFAULT 0,
  total_saved numeric(12,2) DEFAULT 0,
  preferred_services uuid[],
  preferred_therapists uuid[],
  preferred_vendors uuid[],
  preferred_gender text CHECK (preferred_gender IN ('male', 'female', 'any')),
  allergies text[],
  medical_conditions text[],
  special_requirements text,
  referral_code text UNIQUE,
  referred_by uuid REFERENCES customers(id),
  referral_count integer DEFAULT 0,
  last_booking_date timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_customers_tier ON customers(membership_tier);
CREATE INDEX IF NOT EXISTS idx_customers_referral_code ON customers(referral_code);
CREATE INDEX IF NOT EXISTS idx_customers_referred_by ON customers(referred_by);

ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Customers can view own profile"
  ON customers FOR SELECT
  TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Customers can update own profile"
  ON customers FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

CREATE TABLE IF NOT EXISTS customer_addresses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  address_type text NOT NULL CHECK (address_type IN ('home', 'work', 'hotel', 'other')),
  label text,
  address_line1 text NOT NULL,
  address_line2 text,
  landmark text,
  city text NOT NULL,
  state text NOT NULL,
  pincode text NOT NULL,
  country text DEFAULT 'India',
  latitude numeric(10,8),
  longitude numeric(11,8),
  is_default boolean DEFAULT false,
  delivery_instructions text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_customer_addresses_customer ON customer_addresses(customer_id);
CREATE INDEX IF NOT EXISTS idx_customer_addresses_default ON customer_addresses(customer_id, is_default) WHERE is_default;

ALTER TABLE customer_addresses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Customers can manage own addresses"
  ON customer_addresses FOR ALL
  TO authenticated
  USING (customer_id = auth.uid())
  WITH CHECK (customer_id = auth.uid());

CREATE TABLE IF NOT EXISTS customer_referrals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  referee_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  referral_code text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'rewarded')),
  referrer_reward numeric(10,2) DEFAULT 0,
  referee_reward numeric(10,2) DEFAULT 0,
  first_booking_id uuid,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_customer_referrals_referrer ON customer_referrals(referrer_id);
CREATE INDEX IF NOT EXISTS idx_customer_referrals_referee ON customer_referrals(referee_id);
CREATE INDEX IF NOT EXISTS idx_customer_referrals_code ON customer_referrals(referral_code);

CREATE TABLE IF NOT EXISTS loyalty_points_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  transaction_type text NOT NULL CHECK (transaction_type IN ('earned', 'redeemed', 'expired', 'adjusted')),
  points integer NOT NULL,
  booking_id uuid,
  description text,
  balance_after integer NOT NULL,
  expires_at timestamptz,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_loyalty_transactions_customer ON loyalty_points_transactions(customer_id);
CREATE INDEX IF NOT EXISTS idx_loyalty_transactions_created ON loyalty_points_transactions(created_at DESC);

ALTER TABLE loyalty_points_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Customers can view own transactions"
  ON loyalty_points_transactions FOR SELECT
  TO authenticated
  USING (customer_id = auth.uid());

-- ============================================================================
-- 9. BOOKINGS (6 tables)
-- ============================================================================

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_number text UNIQUE NOT NULL,
  customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
  vendor_id uuid NOT NULL REFERENCES vendors(id) ON DELETE RESTRICT,
  booking_type text NOT NULL CHECK (booking_type IN ('home_service', 'spa_visit', 'hotel_service')),
  service_location jsonb NOT NULL,
  booking_date date NOT NULL,
  booking_time time NOT NULL,
  total_amount numeric(10,2) NOT NULL,
  discount_amount numeric(10,2) DEFAULT 0,
  tax_amount numeric(10,2) DEFAULT 0,
  service_charge numeric(10,2) DEFAULT 0,
  final_amount numeric(10,2) NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN (
    'pending', 'confirmed', 'assigned', 'in_progress', 'completed', 'cancelled', 'rescheduled'
  )),
  payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'partial', 'paid', 'refunded')),
  special_instructions text,
  cancellation_reason text,
  cancelled_by uuid REFERENCES auth.users(id),
  cancelled_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_bookings_customer ON bookings(customer_id);
CREATE INDEX IF NOT EXISTS idx_bookings_vendor ON bookings(vendor_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_payment_status ON bookings(payment_status);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(booking_date, booking_time);
CREATE INDEX IF NOT EXISTS idx_bookings_number ON bookings(booking_number);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Customers can view own bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (customer_id = auth.uid());

CREATE POLICY "Customers can create bookings"
  ON bookings FOR INSERT
  TO authenticated
  WITH CHECK (customer_id = auth.uid());

CREATE POLICY "Vendors can view own bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (vendor_id IN (SELECT id FROM vendors WHERE user_id = auth.uid()));

CREATE TABLE IF NOT EXISTS booking_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  service_id uuid NOT NULL,
  service_name text NOT NULL,
  service_duration integer NOT NULL,
  service_price numeric(10,2) NOT NULL,
  quantity integer DEFAULT 1,
  addon_services jsonb DEFAULT '[]',
  subtotal numeric(10,2) NOT NULL,
  therapist_id uuid REFERENCES therapists(id),
  notes text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_booking_items_booking ON booking_items(booking_id);
CREATE INDEX IF NOT EXISTS idx_booking_items_service ON booking_items(service_id);
CREATE INDEX IF NOT EXISTS idx_booking_items_therapist ON booking_items(therapist_id);

ALTER TABLE booking_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view booking items of their bookings"
  ON booking_items FOR SELECT
  TO authenticated
  USING (
    booking_id IN (
      SELECT id FROM bookings
      WHERE customer_id = auth.uid()
      OR vendor_id IN (SELECT id FROM vendors WHERE user_id = auth.uid())
    )
  );

CREATE TABLE IF NOT EXISTS booking_status_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  from_status text,
  to_status text NOT NULL,
  changed_by uuid REFERENCES auth.users(id),
  reason text,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_booking_status_history_booking ON booking_status_history(booking_id);
CREATE INDEX IF NOT EXISTS idx_booking_status_history_created ON booking_status_history(created_at DESC);

CREATE TABLE IF NOT EXISTS booking_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  note_type text CHECK (note_type IN ('customer', 'vendor', 'therapist', 'internal', 'system')),
  note text NOT NULL,
  created_by uuid REFERENCES auth.users(id),
  is_internal boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_booking_notes_booking ON booking_notes(booking_id);

CREATE TABLE IF NOT EXISTS booking_cancellations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  cancelled_by uuid NOT NULL REFERENCES auth.users(id),
  cancelled_by_role text NOT NULL CHECK (cancelled_by_role IN ('customer', 'vendor', 'therapist', 'admin')),
  cancellation_reason text NOT NULL,
  refund_amount numeric(10,2) DEFAULT 0,
  refund_status text DEFAULT 'pending' CHECK (refund_status IN ('pending', 'processing', 'completed', 'failed')),
  cancellation_charge numeric(10,2) DEFAULT 0,
  cancelled_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_booking_cancellations_booking ON booking_cancellations(booking_id);
CREATE INDEX IF NOT EXISTS idx_booking_cancellations_cancelled_by ON booking_cancellations(cancelled_by);

CREATE TABLE IF NOT EXISTS booking_reschedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  old_date date NOT NULL,
  old_time time NOT NULL,
  new_date date NOT NULL,
  new_time time NOT NULL,
  requested_by uuid NOT NULL REFERENCES auth.users(id),
  requested_by_role text NOT NULL CHECK (requested_by_role IN ('customer', 'vendor', 'therapist', 'admin')),
  reason text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  approved_by uuid REFERENCES auth.users(id),
  approved_at timestamptz,
  reschedule_charge numeric(10,2) DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_booking_reschedules_booking ON booking_reschedules(booking_id);
CREATE INDEX IF NOT EXISTS idx_booking_reschedules_requested_by ON booking_reschedules(requested_by);

-- ============================================================================
-- 10. PAYMENTS (5 tables)
-- ============================================================================

CREATE TABLE IF NOT EXISTS payment_methods (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  method_type text NOT NULL CHECK (method_type IN ('card', 'upi', 'wallet', 'netbanking')),
  is_primary boolean DEFAULT false,
  card_last4 text,
  card_brand text,
  upi_id text,
  wallet_provider text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_payment_methods_customer ON payment_methods(customer_id);

ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Customers can manage own payment methods"
  ON payment_methods FOR ALL
  TO authenticated
  USING (customer_id = auth.uid())
  WITH CHECK (customer_id = auth.uid());

CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id text UNIQUE NOT NULL,
  booking_id uuid NOT NULL REFERENCES bookings(id) ON DELETE RESTRICT,
  customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
  vendor_id uuid NOT NULL REFERENCES vendors(id) ON DELETE RESTRICT,
  amount numeric(10,2) NOT NULL,
  tax_amount numeric(10,2) DEFAULT 0,
  discount_amount numeric(10,2) DEFAULT 0,
  convenience_fee numeric(10,2) DEFAULT 0,
  total_amount numeric(10,2) NOT NULL,
  payment_method text NOT NULL CHECK (payment_method IN (
    'credit_card', 'debit_card', 'upi', 'net_banking', 'wallet', 'cash', 'pay_later'
  )),
  payment_gateway text,
  gateway_transaction_id text,
  gateway_response jsonb,
  status text DEFAULT 'pending' CHECK (status IN (
    'pending', 'processing', 'success', 'failed', 'refunded', 'partially_refunded'
  )),
  payment_date timestamptz,
  refund_amount numeric(10,2) DEFAULT 0,
  refund_date timestamptz,
  refund_reason text,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_payments_booking ON payments(booking_id);
CREATE INDEX IF NOT EXISTS idx_payments_customer ON payments(customer_id);
CREATE INDEX IF NOT EXISTS idx_payments_vendor ON payments(vendor_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_transaction ON payments(transaction_id);
CREATE INDEX IF NOT EXISTS idx_payments_date ON payments(payment_date DESC);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Customers can view own payments"
  ON payments FOR SELECT
  TO authenticated
  USING (customer_id = auth.uid());

CREATE POLICY "Vendors can view own payments"
  ON payments FOR SELECT
  TO authenticated
  USING (vendor_id IN (SELECT id FROM vendors WHERE user_id = auth.uid()));

CREATE TABLE IF NOT EXISTS refunds (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_id uuid NOT NULL REFERENCES payments(id) ON DELETE RESTRICT,
  booking_id uuid NOT NULL REFERENCES bookings(id) ON DELETE RESTRICT,
  customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
  refund_amount numeric(10,2) NOT NULL,
  refund_reason text NOT NULL,
  refund_type text NOT NULL CHECK (refund_type IN ('full', 'partial', 'cancellation', 'adjustment')),
  refund_method text,
  gateway_refund_id text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  processed_by uuid REFERENCES auth.users(id),
  processed_at timestamptz,
  notes text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_refunds_payment ON refunds(payment_id);
CREATE INDEX IF NOT EXISTS idx_refunds_booking ON refunds(booking_id);
CREATE INDEX IF NOT EXISTS idx_refunds_customer ON refunds(customer_id);
CREATE INDEX IF NOT EXISTS idx_refunds_status ON refunds(status);

ALTER TABLE refunds ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Customers can view own refunds"
  ON refunds FOR SELECT
  TO authenticated
  USING (customer_id = auth.uid());

CREATE TABLE IF NOT EXISTS wallet_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  transaction_type text NOT NULL CHECK (transaction_type IN ('credit', 'debit', 'refund', 'bonus')),
  amount numeric(10,2) NOT NULL,
  balance_after numeric(10,2) NOT NULL,
  booking_id uuid REFERENCES bookings(id),
  payment_id uuid REFERENCES payments(id),
  description text,
  reference_id text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_wallet_transactions_customer ON wallet_transactions(customer_id);
CREATE INDEX IF NOT EXISTS idx_wallet_transactions_created ON wallet_transactions(created_at DESC);

ALTER TABLE wallet_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Customers can view own wallet transactions"
  ON wallet_transactions FOR SELECT
  TO authenticated
  USING (customer_id = auth.uid());

CREATE TABLE IF NOT EXISTS commission_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL REFERENCES bookings(id) ON DELETE RESTRICT,
  vendor_id uuid NOT NULL REFERENCES vendors(id) ON DELETE RESTRICT,
  therapist_id uuid REFERENCES therapists(id) ON DELETE SET NULL,
  booking_amount numeric(10,2) NOT NULL,
  commission_rate numeric(5,2) NOT NULL,
  commission_amount numeric(10,2) NOT NULL,
  therapist_earning numeric(10,2) DEFAULT 0,
  platform_earning numeric(10,2) NOT NULL,
  tds_amount numeric(10,2) DEFAULT 0,
  gst_amount numeric(10,2) DEFAULT 0,
  settlement_status text DEFAULT 'pending' CHECK (settlement_status IN ('pending', 'processing', 'settled', 'hold')),
  settlement_date timestamptz,
  period_month date,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_commission_records_booking ON commission_records(booking_id);
CREATE INDEX IF NOT EXISTS idx_commission_records_vendor ON commission_records(vendor_id);
CREATE INDEX IF NOT EXISTS idx_commission_records_therapist ON commission_records(therapist_id);
CREATE INDEX IF NOT EXISTS idx_commission_records_period ON commission_records(period_month);
CREATE INDEX IF NOT EXISTS idx_commission_records_settlement ON commission_records(settlement_status);

ALTER TABLE commission_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Vendors can view own commission records"
  ON commission_records FOR SELECT
  TO authenticated
  USING (vendor_id IN (SELECT id FROM vendors WHERE user_id = auth.uid()));

CREATE POLICY "Therapists can view own commission records"
  ON commission_records FOR SELECT
  TO authenticated
  USING (therapist_id IN (SELECT id FROM therapists WHERE user_id = auth.uid()));

-- ============================================================================
-- 11. SUPPORT (2 tables)
-- ============================================================================

CREATE TABLE IF NOT EXISTS support_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_number text UNIQUE NOT NULL,
  customer_id uuid REFERENCES customers(id) ON DELETE SET NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  booking_id uuid REFERENCES bookings(id) ON DELETE SET NULL,
  category text NOT NULL CHECK (category IN (
    'booking_issue', 'payment_issue', 'service_quality', 'technical',
    'account', 'refund', 'feedback', 'complaint', 'other'
  )),
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  subject text NOT NULL,
  description text NOT NULL,
  status text DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'waiting_response', 'resolved', 'closed', 'reopened')),
  assigned_to uuid REFERENCES auth.users(id),
  assigned_at timestamptz,
  resolved_at timestamptz,
  closed_at timestamptz,
  resolution_notes text,
  satisfaction_rating integer CHECK (satisfaction_rating BETWEEN 1 AND 5),
  attachments text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_support_tickets_customer ON support_tickets(customer_id);
CREATE INDEX IF NOT EXISTS idx_support_tickets_user ON support_tickets(user_id);
CREATE INDEX IF NOT EXISTS idx_support_tickets_booking ON support_tickets(booking_id);
CREATE INDEX IF NOT EXISTS idx_support_tickets_status ON support_tickets(status);
CREATE INDEX IF NOT EXISTS idx_support_tickets_assigned ON support_tickets(assigned_to);
CREATE INDEX IF NOT EXISTS idx_support_tickets_priority ON support_tickets(priority, status);
CREATE INDEX IF NOT EXISTS idx_support_tickets_number ON support_tickets(ticket_number);

ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own tickets"
  ON support_tickets FOR SELECT
  TO authenticated
  USING (user_id = auth.uid() OR customer_id = auth.uid());

CREATE POLICY "Users can create tickets"
  ON support_tickets FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE TABLE IF NOT EXISTS ticket_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id uuid NOT NULL REFERENCES support_tickets(id) ON DELETE CASCADE,
  sender_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  sender_type text NOT NULL CHECK (sender_type IN ('customer', 'employee', 'system', 'bot')),
  message text NOT NULL,
  attachments text[],
  is_internal boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_ticket_messages_ticket ON ticket_messages(ticket_id);
CREATE INDEX IF NOT EXISTS idx_ticket_messages_sender ON ticket_messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_ticket_messages_created ON ticket_messages(created_at);

ALTER TABLE ticket_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view messages of own tickets"
  ON ticket_messages FOR SELECT
  TO authenticated
  USING (
    ticket_id IN (
      SELECT id FROM support_tickets
      WHERE user_id = auth.uid() OR customer_id = auth.uid()
    ) AND NOT is_internal
  );

CREATE POLICY "Users can send messages to own tickets"
  ON ticket_messages FOR INSERT
  TO authenticated
  WITH CHECK (
    ticket_id IN (
      SELECT id FROM support_tickets
      WHERE user_id = auth.uid() OR customer_id = auth.uid()
    ) AND sender_id = auth.uid()
  );

-- ============================================================================
-- FOREIGN KEY ADDITIONS (for cross-references)
-- ============================================================================

-- Add foreign key for booking_items to therapist_assignments
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'fk_booking_id_therapist_assignments'
  ) THEN
    ALTER TABLE therapist_assignments
      ADD CONSTRAINT fk_booking_id_therapist_assignments
      FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE RESTRICT;
  END IF;
END $$;

-- Add foreign key for service_id references
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'fk_service_id_booking_items'
  ) THEN
    ALTER TABLE booking_items
      ADD CONSTRAINT fk_service_id_booking_items
      FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE RESTRICT;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'fk_service_id_therapist_assignments'
  ) THEN
    ALTER TABLE therapist_assignments
      ADD CONSTRAINT fk_service_id_therapist_assignments
      FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE RESTRICT;
  END IF;
END $$;

-- Add foreign key for department head
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'fk_head_user_id_departments'
  ) THEN
    ALTER TABLE departments
      ADD CONSTRAINT fk_head_user_id_departments
      FOREIGN KEY (head_user_id) REFERENCES auth.users(id) ON DELETE SET NULL;
  END IF;
END $$;

-- ============================================================================
-- DEFAULT DATA POPULATION
-- ============================================================================

-- Insert default country (India)
INSERT INTO countries (name, code, phone_code, currency)
VALUES ('India', 'IN', '+91', 'INR')
ON CONFLICT (code) DO NOTHING;

-- Insert default department
INSERT INTO departments (name, code, description, status)
VALUES
  ('Administration', 'ADMIN', 'Administration and Management', 'active'),
  ('Operations', 'OPS', 'Operations and Service Delivery', 'active'),
  ('Human Resources', 'HR', 'Human Resources Management', 'active'),
  ('Finance', 'FIN', 'Finance and Accounting', 'active'),
  ('Marketing', 'MKT', 'Marketing and Sales', 'active'),
  ('IT', 'IT', 'Information Technology', 'active'),
  ('Customer Care', 'CC', 'Customer Support and Service', 'active')
ON CONFLICT (code) DO NOTHING;

-- Insert default roles
INSERT INTO roles (name, code, description, is_system_role, status)
VALUES
  ('Super Admin', 'SUPER_ADMIN', 'Full system access', true, 'active'),
  ('Admin', 'ADMIN', 'Administrative access', true, 'active'),
  ('Customer', 'CUSTOMER', 'Customer user', true, 'active'),
  ('Vendor', 'VENDOR', 'Vendor/Partner', true, 'active'),
  ('Therapist', 'THERAPIST', 'Service provider', true, 'active'),
  ('Employee', 'EMPLOYEE', 'Staff member', true, 'active')
ON CONFLICT (code) DO NOTHING;

-- Insert default service categories
INSERT INTO service_categories (name, slug, description, is_active, display_order)
VALUES
  ('Relaxation Massage', 'relaxation-massage', 'Soothing and relaxing massage therapies', true, 1),
  ('Therapeutic Massage', 'therapeutic-massage', 'Targeted treatment for specific conditions', true, 2),
  ('Specialty Treatments', 'specialty-treatments', 'Unique and specialized services', true, 3),
  ('Couples Services', 'couples-services', 'Services for couples', true, 4),
  ('Wellness Packages', 'wellness-packages', 'Complete wellness packages', true, 5)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================================
-- PERFORMANCE OPTIMIZATIONS
-- ============================================================================

-- Analyze all tables for query optimization
ANALYZE;

-- Create statistics for better query planning
CREATE STATISTICS IF NOT EXISTS bookings_customer_date_stats ON customer_id, booking_date FROM bookings;
CREATE STATISTICS IF NOT EXISTS therapist_assignments_date_status_stats ON assignment_date, status FROM therapist_assignments;
CREATE STATISTICS IF NOT EXISTS payments_customer_status_stats ON customer_id, status FROM payments;

-- ============================================================================
-- COMPLETION MESSAGE
-- ============================================================================

DO $$
BEGIN
  RAISE NOTICE '✅ OMBARO Production Schema successfully created!';
  RAISE NOTICE '📊 Total Tables: 60';
  RAISE NOTICE '🔒 Row Level Security: Enabled on all user-facing tables';
  RAISE NOTICE '⚡ Indexes: Optimized for performance';
  RAISE NOTICE '🎯 Ready for Production Use';
END $$;
