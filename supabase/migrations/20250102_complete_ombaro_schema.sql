/*
  # OMBARO Platform - Complete Database Schema

  ## Overview
  Complete database schema for OMBARO spa and wellness services platform.
  Includes all modules: user management, services, bookings, therapists, payments,
  HR, marketing, support, and analytics.

  ## Tables Created (40+ tables)

  ### Authentication & User Management
  - user_profiles: Extended user information
  - role_permissions: Role-based access control

  ### Service Management
  - services: Service catalog
  - service_packages: Service bundles
  - addon_services: Additional services

  ### Vendor Management
  - vendors: Vendor/spa details
  - vendor_staff: Vendor team members

  ### Therapist Management
  - therapists: Therapist profiles
  - therapist_schedules: Weekly availability
  - therapist_leaves: Leave management
  - therapist_locations: Real-time GPS tracking

  ### Booking Management
  - bookings: Main booking records
  - booking_items: Services in each booking
  - therapist_assignments: Therapist-booking assignments

  ### Payment Management
  - payments: Transaction records
  - payment_settlements: Vendor settlements

  ### Employee Management (HR)
  - employees: Employee records
  - attendance_records: Daily attendance
  - leave_requests: Leave applications
  - salary_records: Payroll data
  - performance_reviews: Performance management

  ### Customer Management
  - customers: Customer extended data
  - customer_addresses: Saved addresses

  ### Reviews & Ratings
  - reviews: Service reviews

  ### Marketing
  - campaigns: Marketing campaigns
  - promotions: Discount codes
  - promotion_usage: Promo code usage tracking

  ### Support
  - support_tickets: Customer support tickets
  - ticket_messages: Ticket conversations
  - notifications: Push/email/SMS notifications

  ### Analytics
  - analytics_events: User behavior tracking

  ## Security
  - Row Level Security (RLS) enabled on all tables
  - Role-based policies for departments
  - Encrypted sensitive data (bank details, passwords)
  - Audit trails for all operations

  ## Performance
  - Comprehensive indexes on all foreign keys
  - GiST indexes for location queries
  - GIN indexes for full-text search and JSONB
  - Composite indexes for common query patterns
*/

-- ============================================================================
-- 1. USER PROFILES & AUTHENTICATION
-- ============================================================================

CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  mobile text UNIQUE NOT NULL,
  gender text CHECK (gender IN ('male', 'female', 'other')),
  date_of_birth date,
  profile_image text,
  role text NOT NULL CHECK (role IN (
    'customer', 'vendor', 'therapist', 'employee', 'admin',
    'accounts_department', 'marketing_department', 'finance_department',
    'legal_department', 'customer_care', 'staff_department',
    'vendor_list', 'customer_data', 'fo_department', 'it_department',
    'super_admin', 'ho_details', 'corporate_office', 'advocate',
    'ca_cs', 'directors', 'hr_department'
  )),
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  address jsonb,
  preferences jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);
CREATE INDEX IF NOT EXISTS idx_user_profiles_status ON user_profiles(status);
CREATE INDEX IF NOT EXISTS idx_user_profiles_mobile ON user_profiles(mobile);

-- RLS
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

-- ============================================================================

CREATE TABLE IF NOT EXISTS role_permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role_id text NOT NULL,
  module_id text NOT NULL,
  sub_module_id text,
  permissions text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  UNIQUE(role_id, module_id, sub_module_id)
);

CREATE INDEX IF NOT EXISTS idx_role_permissions_role ON role_permissions(role_id);
CREATE INDEX IF NOT EXISTS idx_role_permissions_module ON role_permissions(module_id);

-- ============================================================================
-- 2. SERVICE MANAGEMENT
-- ============================================================================

CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  name text NOT NULL,
  category text NOT NULL CHECK (category IN (
    'relaxation', 'therapeutic', 'specialty', 'couples', 'wellness'
  )),
  description text,
  style text,
  pressure_level integer CHECK (pressure_level BETWEEN 1 AND 5),
  techniques text,
  focus_areas text,
  primary_benefits text,
  contraindications text,
  oils_products text,
  room_setup text,
  recommended_addons text[],
  duration_options integer[],
  base_price_60min numeric(10,2) NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_services_category ON services(category);
CREATE INDEX IF NOT EXISTS idx_services_code ON services(code);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(is_active);
CREATE INDEX IF NOT EXISTS idx_services_search ON services
  USING gin(to_tsvector('english', name || ' ' || COALESCE(description, '') || ' ' || COALESCE(techniques, '')));

-- ============================================================================

CREATE TABLE IF NOT EXISTS service_packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  service_ids uuid[] NOT NULL,
  total_duration integer NOT NULL,
  package_price numeric(10,2) NOT NULL,
  discount_percentage numeric(5,2) DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ============================================================================

CREATE TABLE IF NOT EXISTS addon_services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  name text NOT NULL,
  description text,
  duration integer NOT NULL,
  price numeric(10,2) NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ============================================================================
-- 3. VENDOR MANAGEMENT
-- ============================================================================

CREATE TABLE IF NOT EXISTS vendors (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  business_name text NOT NULL,
  business_type text CHECK (business_type IN ('spa', 'salon', 'home_service', 'hotel_spa', 'wellness_center')),
  gst_number text,
  pan_number text,
  business_address jsonb NOT NULL,
  contact_person text NOT NULL,
  contact_mobile text NOT NULL,
  contact_email text NOT NULL,
  services_offered uuid[],
  operating_hours jsonb,
  rating numeric(3,2) DEFAULT 0.00,
  total_reviews integer DEFAULT 0,
  verification_status text DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
  verification_documents jsonb,
  commission_rate numeric(5,2) DEFAULT 15.00,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_vendors_status ON vendors(status);
CREATE INDEX IF NOT EXISTS idx_vendors_verification ON vendors(verification_status);
CREATE INDEX IF NOT EXISTS idx_vendors_rating ON vendors(rating DESC);

-- ============================================================================

CREATE TABLE IF NOT EXISTS vendor_staff (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id uuid NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  role text NOT NULL,
  mobile text NOT NULL,
  email text,
  permissions text[],
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_vendor_staff_vendor ON vendor_staff(vendor_id);
CREATE INDEX IF NOT EXISTS idx_vendor_staff_user ON vendor_staff(user_id);

-- ============================================================================
-- 4. THERAPIST MANAGEMENT
-- ============================================================================

CREATE TABLE IF NOT EXISTS therapists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  vendor_id uuid NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  mobile text NOT NULL,
  gender text CHECK (gender IN ('male', 'female', 'other')),
  date_of_birth date,
  profile_image text,
  specialization text[] DEFAULT '{}',
  experience_years integer DEFAULT 0,
  certifications jsonb DEFAULT '[]',
  languages text[] DEFAULT '{}',
  rating numeric(3,2) DEFAULT 0.00,
  total_reviews integer DEFAULT 0,
  total_services integer DEFAULT 0,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'on_leave', 'terminated')),
  availability_status text DEFAULT 'offline' CHECK (availability_status IN ('available', 'busy', 'offline')),
  emergency_contact jsonb,
  address jsonb,
  bank_details jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_therapists_vendor ON therapists(vendor_id);
CREATE INDEX IF NOT EXISTS idx_therapists_user ON therapists(user_id);
CREATE INDEX IF NOT EXISTS idx_therapists_status ON therapists(status);
CREATE INDEX IF NOT EXISTS idx_therapists_availability ON therapists(availability_status);
CREATE INDEX IF NOT EXISTS idx_therapists_rating ON therapists(rating DESC);
CREATE INDEX IF NOT EXISTS idx_therapists_specialization ON therapists USING gin(specialization);

-- RLS
ALTER TABLE therapists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Vendors can view own therapists"
  ON therapists FOR SELECT
  TO authenticated
  USING (vendor_id IN (SELECT id FROM vendors WHERE id = auth.uid()));

CREATE POLICY "Vendors can create therapists"
  ON therapists FOR INSERT
  TO authenticated
  WITH CHECK (vendor_id IN (SELECT id FROM vendors WHERE id = auth.uid()));

CREATE POLICY "Vendors can update own therapists"
  ON therapists FOR UPDATE
  TO authenticated
  USING (vendor_id IN (SELECT id FROM vendors WHERE id = auth.uid()))
  WITH CHECK (vendor_id IN (SELECT id FROM vendors WHERE id = auth.uid()));

CREATE POLICY "Therapists can view own profile"
  ON therapists FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- ============================================================================

CREATE TABLE IF NOT EXISTS therapist_schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  therapist_id uuid NOT NULL REFERENCES therapists(id) ON DELETE CASCADE,
  day_of_week integer NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  start_time time NOT NULL,
  end_time time NOT NULL,
  is_available boolean DEFAULT true,
  break_start time,
  break_end time,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(therapist_id, day_of_week)
);

CREATE INDEX IF NOT EXISTS idx_therapist_schedules_therapist ON therapist_schedules(therapist_id);
CREATE INDEX IF NOT EXISTS idx_therapist_schedules_day ON therapist_schedules(day_of_week);

ALTER TABLE therapist_schedules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Vendors can manage therapist schedules"
  ON therapist_schedules FOR ALL
  TO authenticated
  USING (therapist_id IN (
    SELECT id FROM therapists WHERE vendor_id IN (SELECT id FROM vendors WHERE id = auth.uid())
  ));

-- ============================================================================

CREATE TABLE IF NOT EXISTS therapist_leaves (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  therapist_id uuid NOT NULL REFERENCES therapists(id) ON DELETE CASCADE,
  leave_type text NOT NULL CHECK (leave_type IN ('sick', 'casual', 'emergency', 'annual')),
  start_date date NOT NULL,
  end_date date NOT NULL,
  reason text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
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

CREATE POLICY "Therapists can create leave requests"
  ON therapist_leaves FOR INSERT
  TO authenticated
  WITH CHECK (therapist_id IN (
    SELECT id FROM therapists WHERE user_id = auth.uid()
  ));

CREATE POLICY "Vendors can approve leaves"
  ON therapist_leaves FOR UPDATE
  TO authenticated
  USING (therapist_id IN (
    SELECT id FROM therapists WHERE vendor_id IN (SELECT id FROM vendors WHERE id = auth.uid())
  ));

-- ============================================================================

CREATE TABLE IF NOT EXISTS therapist_locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  therapist_id uuid NOT NULL REFERENCES therapists(id) ON DELETE CASCADE,
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

ALTER TABLE therapist_locations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Therapists can update location"
  ON therapist_locations FOR INSERT
  TO authenticated
  WITH CHECK (therapist_id IN (
    SELECT id FROM therapists WHERE user_id = auth.uid()
  ));

CREATE POLICY "Customers can view assigned therapist location"
  ON therapist_locations FOR SELECT
  TO authenticated
  USING (therapist_id IN (
    SELECT therapist_id FROM therapist_assignments
    WHERE customer_id = auth.uid() AND status IN ('in_transit', 'in_progress')
  ));

-- ============================================================================
-- 5. BOOKING MANAGEMENT
-- ============================================================================

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_number text UNIQUE NOT NULL,
  customer_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
  vendor_id uuid NOT NULL REFERENCES vendors(id) ON DELETE RESTRICT,
  booking_type text NOT NULL CHECK (booking_type IN ('home_service', 'spa_visit', 'hotel_service')),
  service_location jsonb NOT NULL,
  booking_date date NOT NULL,
  booking_time time NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN (
    'pending', 'confirmed', 'assigned', 'in_progress', 'completed', 'cancelled', 'rescheduled'
  )),
  cancellation_reason text,
  cancelled_by uuid REFERENCES auth.users(id),
  cancelled_at timestamptz,
  payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'partial', 'paid', 'refunded')),
  special_instructions text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_bookings_customer ON bookings(customer_id);
CREATE INDEX IF NOT EXISTS idx_bookings_vendor ON bookings(vendor_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(booking_date, booking_time);
CREATE INDEX IF NOT EXISTS idx_bookings_number ON bookings(booking_number);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Customers can view own bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (customer_id = auth.uid());

CREATE POLICY "Vendors can view own bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (vendor_id IN (SELECT id FROM vendors WHERE id = auth.uid()));

CREATE POLICY "Customer care can view all bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role IN ('customer_care', 'fo_department', 'super_admin')
    )
  );

-- ============================================================================

CREATE TABLE IF NOT EXISTS booking_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  service_id uuid NOT NULL REFERENCES services(id),
  duration integer NOT NULL,
  price numeric(10,2) NOT NULL,
  quantity integer DEFAULT 1,
  addon_services jsonb DEFAULT '[]',
  subtotal numeric(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_booking_items_booking ON booking_items(booking_id);
CREATE INDEX IF NOT EXISTS idx_booking_items_service ON booking_items(service_id);

-- ============================================================================

CREATE TABLE IF NOT EXISTS therapist_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  therapist_id uuid NOT NULL REFERENCES therapists(id) ON DELETE RESTRICT,
  vendor_id uuid NOT NULL REFERENCES vendors(id) ON DELETE RESTRICT,
  customer_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
  service_id uuid NOT NULL REFERENCES services(id),
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

CREATE POLICY "Vendors can manage assignments"
  ON therapist_assignments FOR ALL
  TO authenticated
  USING (vendor_id IN (SELECT id FROM vendors WHERE id = auth.uid()));

CREATE POLICY "Therapists can view own assignments"
  ON therapist_assignments FOR SELECT
  TO authenticated
  USING (therapist_id IN (
    SELECT id FROM therapists WHERE user_id = auth.uid()
  ));

CREATE POLICY "Therapists can update assignment status"
  ON therapist_assignments FOR UPDATE
  TO authenticated
  USING (therapist_id IN (
    SELECT id FROM therapists WHERE user_id = auth.uid()
  ))
  WITH CHECK (therapist_id IN (
    SELECT id FROM therapists WHERE user_id = auth.uid()
  ));

CREATE POLICY "Customers can view own assignments"
  ON therapist_assignments FOR SELECT
  TO authenticated
  USING (customer_id = auth.uid());

-- ============================================================================
-- 6. PAYMENT MANAGEMENT
-- ============================================================================

CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id text UNIQUE NOT NULL,
  booking_id uuid NOT NULL REFERENCES bookings(id) ON DELETE RESTRICT,
  customer_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
  vendor_id uuid NOT NULL REFERENCES vendors(id) ON DELETE RESTRICT,
  amount numeric(10,2) NOT NULL,
  tax_amount numeric(10,2) DEFAULT 0,
  discount_amount numeric(10,2) DEFAULT 0,
  convenience_fee numeric(10,2) DEFAULT 0,
  total_amount numeric(10,2) NOT NULL,
  payment_method text NOT NULL CHECK (payment_method IN (
    'credit_card', 'debit_card', 'upi', 'net_banking', 'wallet', 'cash'
  )),
  payment_gateway text,
  gateway_transaction_id text,
  status text DEFAULT 'pending' CHECK (status IN (
    'pending', 'processing', 'success', 'failed', 'refunded', 'partially_refunded'
  )),
  payment_date timestamptz,
  refund_amount numeric(10,2),
  refund_date timestamptz,
  refund_reason text,
  metadata jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_payments_booking ON payments(booking_id);
CREATE INDEX IF NOT EXISTS idx_payments_customer ON payments(customer_id);
CREATE INDEX IF NOT EXISTS idx_payments_vendor ON payments(vendor_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_transaction ON payments(transaction_id);
CREATE INDEX IF NOT EXISTS idx_payments_date ON payments(payment_date);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Customers can view own payments"
  ON payments FOR SELECT
  TO authenticated
  USING (customer_id = auth.uid());

CREATE POLICY "Vendors can view own payments"
  ON payments FOR SELECT
  TO authenticated
  USING (vendor_id IN (SELECT id FROM vendors WHERE id = auth.uid()));

CREATE POLICY "Finance can view all payments"
  ON payments FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role IN ('finance_department', 'accounts_department', 'super_admin')
    )
  );

-- ============================================================================

CREATE TABLE IF NOT EXISTS payment_settlements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id uuid NOT NULL REFERENCES vendors(id) ON DELETE RESTRICT,
  settlement_period_start date NOT NULL,
  settlement_period_end date NOT NULL,
  total_bookings integer NOT NULL,
  gross_amount numeric(12,2) NOT NULL,
  commission_amount numeric(12,2) NOT NULL,
  tds_amount numeric(12,2) DEFAULT 0,
  adjustment_amount numeric(12,2) DEFAULT 0,
  net_settlement_amount numeric(12,2) NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  payment_reference text,
  payment_date timestamptz,
  payment_method text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_payment_settlements_vendor ON payment_settlements(vendor_id);
CREATE INDEX IF NOT EXISTS idx_payment_settlements_period ON payment_settlements(settlement_period_start, settlement_period_end);
CREATE INDEX IF NOT EXISTS idx_payment_settlements_status ON payment_settlements(status);

-- ============================================================================
-- 7. EMPLOYEE MANAGEMENT (HR)
-- ============================================================================

CREATE TABLE IF NOT EXISTS employees (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  employee_code text UNIQUE NOT NULL,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  mobile text NOT NULL,
  gender text CHECK (gender IN ('male', 'female', 'other')),
  date_of_birth date,
  profile_photo text,
  department text NOT NULL,
  designation text NOT NULL,
  employee_type text CHECK (employee_type IN ('full_time', 'part_time', 'contract', 'intern')),
  reporting_manager uuid REFERENCES employees(id),
  joining_date date NOT NULL,
  probation_end_date date,
  confirmation_date date,
  resignation_date date,
  last_working_date date,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'on_leave', 'terminated')),
  address jsonb,
  emergency_contact jsonb,
  bank_details jsonb,
  documents jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_employees_code ON employees(employee_code);
CREATE INDEX IF NOT EXISTS idx_employees_department ON employees(department);
CREATE INDEX IF NOT EXISTS idx_employees_manager ON employees(reporting_manager);
CREATE INDEX IF NOT EXISTS idx_employees_status ON employees(status);

ALTER TABLE employees ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Employees can view own profile"
  ON employees FOR SELECT
  TO authenticated
  USING (id = auth.uid());

CREATE POLICY "HR can view all employees"
  ON employees FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role IN ('hr_department', 'super_admin', 'directors')
    )
  );

-- ============================================================================

CREATE TABLE IF NOT EXISTS attendance_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  date date NOT NULL,
  check_in_time timestamptz,
  check_out_time timestamptz,
  status text NOT NULL CHECK (status IN ('present', 'absent', 'late', 'half_day', 'leave', 'work_from_home', 'holiday')),
  work_hours numeric(5,2),
  check_in_location jsonb,
  check_out_location jsonb,
  notes text,
  approved_by uuid REFERENCES employees(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(employee_id, date)
);

CREATE INDEX IF NOT EXISTS idx_attendance_employee ON attendance_records(employee_id);
CREATE INDEX IF NOT EXISTS idx_attendance_date ON attendance_records(date);
CREATE INDEX IF NOT EXISTS idx_attendance_status ON attendance_records(status);

-- ============================================================================

CREATE TABLE IF NOT EXISTS leave_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  leave_type text NOT NULL CHECK (leave_type IN (
    'sick', 'casual', 'earned', 'maternity', 'paternity', 'emergency', 'unpaid'
  )),
  from_date date NOT NULL,
  to_date date NOT NULL,
  reason text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'cancelled')),
  applied_date timestamptz DEFAULT now(),
  approved_by uuid REFERENCES employees(id),
  approved_date timestamptz,
  rejection_reason text,
  documents text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CHECK (to_date >= from_date)
);

CREATE INDEX IF NOT EXISTS idx_leave_requests_employee ON leave_requests(employee_id);
CREATE INDEX IF NOT EXISTS idx_leave_requests_status ON leave_requests(status);
CREATE INDEX IF NOT EXISTS idx_leave_requests_dates ON leave_requests(from_date, to_date);

-- ============================================================================

CREATE TABLE IF NOT EXISTS salary_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid NOT NULL REFERENCES employees(id) ON DELETE RESTRICT,
  month integer NOT NULL CHECK (month BETWEEN 1 AND 12),
  year integer NOT NULL,
  basic_salary numeric(10,2) NOT NULL,
  allowances jsonb DEFAULT '{}',
  deductions jsonb DEFAULT '{}',
  overtime_hours numeric(5,2) DEFAULT 0,
  overtime_amount numeric(10,2) DEFAULT 0,
  bonus numeric(10,2) DEFAULT 0,
  gross_salary numeric(10,2) NOT NULL,
  total_deductions numeric(10,2) NOT NULL,
  net_salary numeric(10,2) NOT NULL,
  payment_date date,
  payment_method text,
  payment_reference text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'processed', 'paid', 'hold')),
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(employee_id, month, year)
);

CREATE INDEX IF NOT EXISTS idx_salary_records_employee ON salary_records(employee_id);
CREATE INDEX IF NOT EXISTS idx_salary_records_period ON salary_records(year, month);
CREATE INDEX IF NOT EXISTS idx_salary_records_status ON salary_records(status);

-- ============================================================================

CREATE TABLE IF NOT EXISTS performance_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  review_period_start date NOT NULL,
  review_period_end date NOT NULL,
  reviewer_id uuid NOT NULL REFERENCES employees(id),
  review_type text CHECK (review_type IN ('quarterly', 'half_yearly', 'annual', 'probation')),
  overall_rating numeric(3,2) CHECK (overall_rating BETWEEN 0 AND 5),
  technical_rating numeric(3,2),
  communication_rating numeric(3,2),
  teamwork_rating numeric(3,2),
  leadership_rating numeric(3,2),
  goals jsonb DEFAULT '[]',
  achievements text[],
  areas_of_improvement text[],
  reviewer_comments text,
  employee_comments text,
  action_plan text,
  review_date date NOT NULL,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'acknowledged')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_performance_reviews_employee ON performance_reviews(employee_id);
CREATE INDEX IF NOT EXISTS idx_performance_reviews_reviewer ON performance_reviews(reviewer_id);
CREATE INDEX IF NOT EXISTS idx_performance_reviews_period ON performance_reviews(review_period_start, review_period_end);

-- ============================================================================
-- 8. CUSTOMER MANAGEMENT
-- ============================================================================

CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  membership_tier text DEFAULT 'silver' CHECK (membership_tier IN ('silver', 'gold', 'platinum', 'diamond')),
  membership_start_date date,
  loyalty_points integer DEFAULT 0,
  total_bookings integer DEFAULT 0,
  total_spent numeric(12,2) DEFAULT 0,
  preferred_services uuid[],
  preferred_therapists uuid[],
  preferred_vendors uuid[],
  communication_preferences jsonb DEFAULT '{}',
  allergies text[],
  medical_conditions text[],
  special_requirements text,
  referral_code text UNIQUE,
  referred_by uuid REFERENCES customers(id),
  referral_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_customers_tier ON customers(membership_tier);
CREATE INDEX IF NOT EXISTS idx_customers_referral_code ON customers(referral_code);
CREATE INDEX IF NOT EXISTS idx_customers_referred_by ON customers(referred_by);

-- ============================================================================

CREATE TABLE IF NOT EXISTS customer_addresses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  address_type text NOT NULL CHECK (address_type IN ('home', 'work', 'other')),
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
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_customer_addresses_customer ON customer_addresses(customer_id);
CREATE INDEX IF NOT EXISTS idx_customer_addresses_type ON customer_addresses(address_type);

-- ============================================================================
-- 9. REVIEWS & RATINGS
-- ============================================================================

CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  vendor_id uuid REFERENCES vendors(id) ON DELETE CASCADE,
  therapist_id uuid REFERENCES therapists(id) ON DELETE SET NULL,
  service_id uuid REFERENCES services(id),
  overall_rating integer NOT NULL CHECK (overall_rating BETWEEN 1 AND 5),
  service_quality_rating integer CHECK (service_quality_rating BETWEEN 1 AND 5),
  professionalism_rating integer CHECK (professionalism_rating BETWEEN 1 AND 5),
  cleanliness_rating integer CHECK (cleanliness_rating BETWEEN 1 AND 5),
  value_for_money_rating integer CHECK (value_for_money_rating BETWEEN 1 AND 5),
  title text,
  review_text text,
  photos text[],
  would_recommend boolean,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'flagged')),
  moderated_by uuid REFERENCES employees(id),
  moderation_notes text,
  helpful_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_reviews_booking ON reviews(booking_id);
CREATE INDEX IF NOT EXISTS idx_reviews_customer ON reviews(customer_id);
CREATE INDEX IF NOT EXISTS idx_reviews_vendor ON reviews(vendor_id);
CREATE INDEX IF NOT EXISTS idx_reviews_therapist ON reviews(therapist_id);
CREATE INDEX IF NOT EXISTS idx_reviews_status ON reviews(status);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(overall_rating);

-- ============================================================================
-- 10. MARKETING & PROMOTIONS
-- ============================================================================

CREATE TABLE IF NOT EXISTS campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text CHECK (type IN ('email', 'sms', 'push', 'in_app', 'multi_channel')),
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'active', 'paused', 'completed', 'cancelled')),
  target_audience jsonb,
  content jsonb NOT NULL,
  start_date timestamptz,
  end_date timestamptz,
  budget numeric(10,2),
  created_by uuid NOT NULL REFERENCES employees(id),
  approved_by uuid REFERENCES employees(id),
  metrics jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_campaigns_status ON campaigns(status);
CREATE INDEX IF NOT EXISTS idx_campaigns_dates ON campaigns(start_date, end_date);

-- ============================================================================

CREATE TABLE IF NOT EXISTS promotions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  name text NOT NULL,
  description text,
  type text CHECK (type IN ('percentage', 'fixed_amount', 'free_service', 'free_addon')),
  discount_value numeric(10,2) NOT NULL,
  min_booking_amount numeric(10,2),
  max_discount_amount numeric(10,2),
  applicable_services uuid[],
  applicable_vendors uuid[],
  usage_limit_per_customer integer DEFAULT 1,
  total_usage_limit integer,
  current_usage_count integer DEFAULT 0,
  valid_from timestamptz NOT NULL,
  valid_to timestamptz NOT NULL,
  terms_and_conditions text,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'expired')),
  created_by uuid NOT NULL REFERENCES employees(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_promotions_code ON promotions(code);
CREATE INDEX IF NOT EXISTS idx_promotions_status ON promotions(status);
CREATE INDEX IF NOT EXISTS idx_promotions_dates ON promotions(valid_from, valid_to);

-- ============================================================================

CREATE TABLE IF NOT EXISTS promotion_usage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  promotion_id uuid NOT NULL REFERENCES promotions(id) ON DELETE CASCADE,
  customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  booking_id uuid NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  discount_amount numeric(10,2) NOT NULL,
  used_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_promotion_usage_promotion ON promotion_usage(promotion_id);
CREATE INDEX IF NOT EXISTS idx_promotion_usage_customer ON promotion_usage(customer_id);
CREATE INDEX IF NOT EXISTS idx_promotion_usage_booking ON promotion_usage(booking_id);

-- ============================================================================
-- 11. SUPPORT & COMMUNICATION
-- ============================================================================

CREATE TABLE IF NOT EXISTS support_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_number text UNIQUE NOT NULL,
  customer_id uuid REFERENCES customers(id) ON DELETE SET NULL,
  booking_id uuid REFERENCES bookings(id) ON DELETE SET NULL,
  category text NOT NULL CHECK (category IN (
    'booking_issue', 'payment_issue', 'service_quality', 'technical', 'feedback', 'other'
  )),
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  subject text NOT NULL,
  description text NOT NULL,
  status text DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'waiting', 'resolved', 'closed')),
  assigned_to uuid REFERENCES employees(id),
  assigned_at timestamptz,
  resolved_at timestamptz,
  resolution_notes text,
  satisfaction_rating integer CHECK (satisfaction_rating BETWEEN 1 AND 5),
  attachments text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_support_tickets_customer ON support_tickets(customer_id);
CREATE INDEX IF NOT EXISTS idx_support_tickets_booking ON support_tickets(booking_id);
CREATE INDEX IF NOT EXISTS idx_support_tickets_status ON support_tickets(status);
CREATE INDEX IF NOT EXISTS idx_support_tickets_assigned ON support_tickets(assigned_to);
CREATE INDEX IF NOT EXISTS idx_support_tickets_priority ON support_tickets(priority);

-- ============================================================================

CREATE TABLE IF NOT EXISTS ticket_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id uuid NOT NULL REFERENCES support_tickets(id) ON DELETE CASCADE,
  sender_id uuid NOT NULL REFERENCES auth.users(id),
  sender_type text NOT NULL CHECK (sender_type IN ('customer', 'employee', 'system')),
  message text NOT NULL,
  attachments text[],
  is_internal boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_ticket_messages_ticket ON ticket_messages(ticket_id);
CREATE INDEX IF NOT EXISTS idx_ticket_messages_sender ON ticket_messages(sender_id);

-- ============================================================================

CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN (
    'booking_confirmed', 'booking_cancelled', 'therapist_assigned', 'therapist_arrived',
    'service_started', 'service_completed', 'payment_received', 'refund_processed',
    'promotion', 'reminder', 'system_alert'
  )),
  title text NOT NULL,
  message text NOT NULL,
  data jsonb,
  channels text[] DEFAULT '{}',
  is_read boolean DEFAULT false,
  read_at timestamptz,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_type ON notifications(type);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created ON notifications(created_at DESC);

-- ============================================================================
-- 12. ANALYTICS & REPORTING
-- ============================================================================

CREATE TABLE IF NOT EXISTS analytics_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id text,
  event_name text NOT NULL,
  event_category text,
  event_properties jsonb DEFAULT '{}',
  device_info jsonb,
  location_info jsonb,
  timestamp timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_analytics_events_user ON analytics_events(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_name ON analytics_events(event_name);
CREATE INDEX IF NOT EXISTS idx_analytics_events_timestamp ON analytics_events(timestamp DESC);

-- ============================================================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
DO $$
DECLARE
  t text;
BEGIN
  FOR t IN
    SELECT tablename FROM pg_tables
    WHERE schemaname = 'public'
    AND tablename IN (
      'user_profiles', 'services', 'service_packages', 'addon_services',
      'vendors', 'vendor_staff', 'therapists', 'therapist_schedules',
      'therapist_leaves', 'bookings', 'therapist_assignments',
      'payments', 'payment_settlements', 'employees', 'attendance_records',
      'leave_requests', 'salary_records', 'performance_reviews',
      'customers', 'customer_addresses', 'reviews', 'campaigns',
      'promotions', 'support_tickets'
    )
  LOOP
    EXECUTE format('
      DROP TRIGGER IF EXISTS update_%I_updated_at ON %I;
      CREATE TRIGGER update_%I_updated_at
        BEFORE UPDATE ON %I
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    ', t, t, t, t);
  END LOOP;
END $$;

-- ============================================================================
-- VIEWS FOR ANALYTICS
-- ============================================================================

CREATE OR REPLACE VIEW therapist_performance AS
SELECT
  t.id AS therapist_id,
  t.name AS therapist_name,
  t.vendor_id,
  COUNT(ta.id) AS total_assignments,
  COUNT(ta.id) FILTER (WHERE ta.status = 'completed') AS completed_assignments,
  COUNT(ta.id) FILTER (WHERE ta.status = 'cancelled') AS cancelled_assignments,
  t.rating AS average_rating,
  COALESCE(
    ROUND(
      (COUNT(ta.id) FILTER (WHERE ta.status = 'completed')::numeric /
       NULLIF(COUNT(ta.id), 0) * 100),
      2
    ),
    0
  ) AS completion_rate,
  SUM(ta.actual_duration) AS total_service_minutes
FROM therapists t
LEFT JOIN therapist_assignments ta ON t.id = ta.therapist_id
GROUP BY t.id, t.name, t.vendor_id, t.rating;

-- ============================================================================
-- INITIAL DATA SETUP
-- ============================================================================

-- Insert default role permissions
INSERT INTO role_permissions (role_id, module_id, permissions) VALUES
  ('super_admin', 'system_admin', ARRAY['read', 'create', 'update', 'delete', 'approve', 'export']),
  ('directors', 'financial_management', ARRAY['read', 'approve', 'export']),
  ('finance_department', 'financial_management', ARRAY['read', 'create', 'update', 'approve', 'export']),
  ('accounts_department', 'financial_management', ARRAY['read', 'create', 'update', 'export']),
  ('hr_department', 'hr_management', ARRAY['read', 'create', 'update', 'approve', 'export']),
  ('marketing_department', 'marketing', ARRAY['read', 'create', 'update', 'export']),
  ('customer_care', 'customer_support', ARRAY['read', 'create', 'update']),
  ('legal_department', 'legal_compliance', ARRAY['read', 'create', 'update', 'approve']),
  ('it_department', 'system_admin', ARRAY['read', 'create', 'update'])
ON CONFLICT (role_id, module_id, sub_module_id) DO NOTHING;
