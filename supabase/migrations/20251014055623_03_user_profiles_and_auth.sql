/*
  # User Profiles and Authentication Tables
  
  Creates user profiles, sessions, documents, preferences, and employee tables
*/

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

CREATE INDEX idx_user_profiles_role ON user_profiles(role);
CREATE INDEX idx_user_profiles_mobile ON user_profiles(mobile);
CREATE INDEX idx_user_profiles_status ON user_profiles(status);
CREATE INDEX idx_user_profiles_department ON user_profiles(department_id);

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

CREATE INDEX idx_user_sessions_user ON user_sessions(user_id);
CREATE INDEX idx_user_sessions_token ON user_sessions(session_token);
CREATE INDEX idx_user_sessions_active ON user_sessions(user_id, status) WHERE status = 'active';

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

CREATE INDEX idx_user_documents_user ON user_documents(user_id);
CREATE INDEX idx_user_documents_type ON user_documents(document_type);

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

CREATE INDEX idx_user_preferences_user ON user_preferences(user_id);

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

CREATE INDEX idx_user_kyc_user ON user_kyc_verification(user_id);
CREATE INDEX idx_user_kyc_status ON user_kyc_verification(verification_status);

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

CREATE INDEX idx_user_bank_user ON user_bank_details(user_id);

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

CREATE INDEX idx_emergency_contacts_user ON emergency_contacts(user_id);

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

CREATE INDEX idx_employees_code ON employees(employee_code);
CREATE INDEX idx_employees_status ON employees(status);
CREATE INDEX idx_employees_manager ON employees(reporting_manager_id);