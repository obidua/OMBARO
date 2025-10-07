/*
  # Hierarchical Vendor Onboarding System - Core Tables
  
  Creates essential tables for vendor onboarding with hierarchical approval workflow
*/

-- User profiles table (without auth dependency for now)
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  mobile text UNIQUE NOT NULL,
  role text NOT NULL DEFAULT 'customer',
  department text,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  profile_image text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Employee hierarchy table (5 levels: FO → Manager → Director → VP → Admin)
CREATE TABLE IF NOT EXISTS employees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE REFERENCES user_profiles(id) ON DELETE CASCADE,
  employee_id text UNIQUE NOT NULL,
  name text NOT NULL,
  email text,
  mobile text NOT NULL,
  department text NOT NULL,
  designation text NOT NULL,
  hierarchy_level integer NOT NULL CHECK (hierarchy_level BETWEEN 1 AND 5),
  reports_to uuid REFERENCES employees(id),
  can_approve_vendors boolean DEFAULT false,
  approval_limit numeric(12,2),
  is_active boolean DEFAULT true,
  joining_date date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

COMMENT ON COLUMN employees.hierarchy_level IS '1=FO, 2=Manager, 3=Director, 4=VP, 5=Admin';

ALTER TABLE employees ENABLE ROW LEVEL SECURITY;

-- Partner types: Franchise, Association, Aggregator, Independent
CREATE TABLE IF NOT EXISTS partner_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type_code text UNIQUE NOT NULL,
  type_name text NOT NULL,
  description text,
  commission_rate numeric(5,2) DEFAULT 0.00,
  requires_franchise_fee boolean DEFAULT false,
  franchise_fee_amount numeric(12,2),
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

INSERT INTO partner_types (type_code, type_name, description, commission_rate, requires_franchise_fee, franchise_fee_amount) VALUES
('FRANCHISE', 'Franchise Partner', 'Full franchise model with brand rights', 15.00, true, 500000.00),
('ASSOCIATION', 'Association Partner', 'Partnership with existing spa/salon', 20.00, false, NULL),
('AGGREGATOR', 'Aggregator', 'Multi-vendor aggregation platform', 25.00, false, NULL),
('INDEPENDENT', 'Independent Vendor', 'Individual service provider', 30.00, false, NULL)
ON CONFLICT (type_code) DO NOTHING;

-- Vendor applications with multi-stage approval
CREATE TABLE IF NOT EXISTS vendor_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_number text UNIQUE NOT NULL,
  user_id uuid REFERENCES user_profiles(id),
  partner_type text NOT NULL REFERENCES partner_types(type_code),
  business_name text NOT NULL,
  business_type text NOT NULL,
  contact_person text NOT NULL,
  contact_mobile text NOT NULL,
  contact_email text NOT NULL,
  address_line1 text NOT NULL,
  address_line2 text,
  city text NOT NULL,
  state text NOT NULL,
  pincode text NOT NULL,
  latitude numeric(10, 8),
  longitude numeric(11, 8),
  gst_number text,
  pan_number text,
  years_in_business integer,
  number_of_staff integer,
  description text,
  franchise_fee_paid boolean DEFAULT false,
  franchise_payment_reference text,
  franchise_agreement_signed boolean DEFAULT false,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'fo_review', 'manager_review', 'director_review', 'admin_review', 'approved', 'rejected', 'on_hold', 'additional_info_required')),
  current_approval_stage integer DEFAULT 1,
  applied_date timestamptz DEFAULT now(),
  reviewed_by uuid,
  review_notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_vendor_applications_status ON vendor_applications(status);
CREATE INDEX IF NOT EXISTS idx_vendor_applications_partner_type ON vendor_applications(partner_type);
CREATE INDEX IF NOT EXISTS idx_vendor_applications_created ON vendor_applications(created_at DESC);

ALTER TABLE vendor_applications ENABLE ROW LEVEL SECURITY;

-- Approval history for audit trail
CREATE TABLE IF NOT EXISTS vendor_approval_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid NOT NULL REFERENCES vendor_applications(id) ON DELETE CASCADE,
  approved_by uuid NOT NULL REFERENCES employees(id),
  approval_stage integer NOT NULL,
  action text NOT NULL CHECK (action IN ('approved', 'rejected', 'on_hold', 'info_requested')),
  comments text,
  documents_verified jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_approval_history_application ON vendor_approval_history(application_id);

ALTER TABLE vendor_approval_history ENABLE ROW LEVEL SECURITY;

-- Vendors table (created after full approval)
CREATE TABLE IF NOT EXISTS vendors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE REFERENCES user_profiles(id) ON DELETE CASCADE,
  application_id uuid UNIQUE REFERENCES vendor_applications(id),
  partner_type text NOT NULL,
  business_name text NOT NULL,
  business_type text NOT NULL,
  contact_person text NOT NULL,
  contact_mobile text NOT NULL,
  contact_email text NOT NULL,
  address_line1 text NOT NULL,
  address_line2 text,
  city text NOT NULL,
  state text NOT NULL,
  pincode text NOT NULL,
  latitude numeric(10, 8),
  longitude numeric(11, 8),
  gst_number text,
  pan_number text,
  is_active boolean DEFAULT true,
  verification_status text DEFAULT 'verified',
  onboarding_completed boolean DEFAULT true,
  commission_rate numeric(5,2) DEFAULT 20.00,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text NOT NULL,
  type text NOT NULL,
  priority text DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  is_read boolean DEFAULT false,
  action_url text,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id, is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created ON notifications(created_at DESC);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Supporting tables for metrics
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_number text UNIQUE NOT NULL,
  customer_id uuid REFERENCES user_profiles(id),
  vendor_id uuid REFERENCES vendors(id),
  booking_date date NOT NULL,
  booking_status text DEFAULT 'pending',
  total_amount numeric(10,2) DEFAULT 0.00,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings(id),
  payment_method text NOT NULL,
  total_amount numeric(10,2) NOT NULL,
  payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS therapists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE REFERENCES user_profiles(id),
  vendor_id uuid REFERENCES vendors(id),
  name text NOT NULL,
  mobile text NOT NULL,
  is_active boolean DEFAULT true,
  verification_status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE therapists ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS refunds (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings(id),
  refund_amount numeric(10,2) NOT NULL,
  refund_status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS commission_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id uuid REFERENCES vendors(id),
  booking_id uuid REFERENCES bookings(id),
  commission_amount numeric(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS support_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id),
  status text DEFAULT 'open',
  priority text DEFAULT 'normal',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ticket_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id uuid REFERENCES support_tickets(id),
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  action text NOT NULL,
  resource_type text,
  resource_id uuid,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS error_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  error_type text NOT NULL,
  error_message text NOT NULL,
  severity text DEFAULT 'error',
  resolved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS therapist_leaves (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  therapist_id uuid REFERENCES therapists(id),
  approval_status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Function to generate application number
CREATE OR REPLACE FUNCTION generate_application_number()
RETURNS text AS $$
DECLARE
  next_num integer;
  app_number text;
BEGIN
  SELECT COALESCE(MAX(CAST(SUBSTRING(application_number FROM 4) AS integer)), 0) + 1
  INTO next_num
  FROM vendor_applications;
  
  app_number := 'APP' || LPAD(next_num::text, 6, '0');
  RETURN app_number;
END;
$$ LANGUAGE plpgsql;
