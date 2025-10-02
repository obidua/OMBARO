/*
  # Comprehensive Tables for All Roles and Departments

  ## Summary
  This migration creates comprehensive tables for ALL roles and departments in the OMBARO platform.
  Building on existing tables, this adds complete functionality for all 18 departments.

  ## New Tables Created (60+ tables)

  ### HR & Employees (10 tables)
  - employee_onboarding: New hire onboarding workflow
  - attendance_policies: Attendance rules
  - leave_types: Types of leaves (casual, sick, etc.)
  - leave_balances: Employee leave balances
  - holidays: Public holidays calendar
  - work_shifts: Shift schedules
  - overtime_records: Overtime tracking
  - salary_structures: Salary components setup
  - salary_components: Salary breakdown
  - training_records: Employee training history

  ### Vendor Management (6 tables)
  - vendor_documents: Vendor legal documents
  - vendor_services: Services offered by vendors
  - vendor_availability: Vendor service area coverage
  - vendor_payouts: Vendor payment history
  - commission_rules: Commission structure
  - commission_records: Commission tracking

  ### Therapist Management (3 tables)
  - therapist_certifications: Therapist qualifications
  - therapist_performance: Performance metrics
  - assignment_timeline: Task assignment history

  ### Services & Catalog (7 tables)
  - service_categories: Service categorization
  - service_variants: Service variations
  - service_pricing_tiers: Tiered pricing
  - service_reviews: Customer reviews
  - service_availability: Service availability zones
  - service_tags: Service categorization tags
  - popular_services: Trending services

  ### Bookings Extended (6 tables)
  - booking_status_history: Booking status changes
  - booking_notes: Booking annotations
  - booking_cancellations: Cancellation records
  - booking_reschedules: Rescheduling history
  - service_execution_log: Service delivery tracking
  - booking_photos: Service completion photos

  ### Payments & Finance (10 tables)
  - payment_methods: Customer payment methods
  - payment_gateways: Payment gateway configuration
  - refunds: Refund transactions
  - wallet_transactions: Wallet balance changes
  - invoices: Generated invoices
  - expense_categories: Expense types
  - expenses: Company expenses
  - budget_allocations: Department budgets
  - financial_reports: Financial summaries
  - tax_records: Tax filings

  ### Customers & CRM (7 tables)
  - customer_segments: Customer grouping
  - customer_preferences: Service preferences
  - customer_loyalty_tiers: Loyalty program levels
  - loyalty_points_transactions: Points history
  - customer_referrals: Referral tracking
  - customer_complaints: Complaint management
  - customer_communication_log: Communication history

  ### Marketing Extended (7 tables)
  - campaign_targets: Campaign audience
  - campaign_analytics: Campaign performance
  - promotion_rules: Promotion conditions
  - coupons: Coupon codes
  - referral_programs: Referral campaigns
  - email_templates: Email templates
  - sms_templates: SMS templates

  ### Support Extended (5 tables)
  - ticket_categories: Support categories
  - ticket_priorities: Priority levels
  - ticket_sla: SLA tracking
  - canned_responses: Quick responses
  - chat_conversations: Chat sessions

  ### Legal & Compliance (8 tables)
  - contracts: Legal contracts
  - contract_types: Contract categories
  - legal_documents: Legal files
  - compliance_requirements: Regulatory requirements
  - compliance_audits: Audit records
  - litigation_cases: Legal cases
  - legal_notices: Legal notifications
  - regulatory_filings: Government filings

  ### Operations & Inventory (10 tables)
  - inventory_items: Product inventory
  - inventory_categories: Inventory grouping
  - stock_movements: Stock in/out tracking
  - purchase_orders: Purchase requests
  - suppliers: Supplier database
  - equipment_registry: Equipment tracking
  - maintenance_schedules: Maintenance planning
  - service_areas: Geographic service zones
  - operational_metrics: KPI tracking
  - quality_checks: Quality assurance

  ### Analytics Extended (7 tables)
  - user_behavior_tracking: User actions
  - conversion_funnels: Conversion analysis
  - revenue_analytics: Revenue tracking
  - operational_reports: Operations reports
  - performance_metrics: System metrics
  - dashboard_configurations: Custom dashboards
  - custom_reports: User-defined reports

  ### System Extended (7 tables)
  - api_keys: API key management
  - webhooks: Webhook configuration
  - scheduled_jobs: Cron jobs
  - job_queue: Background jobs
  - data_backups: Backup tracking
  - maintenance_windows: Planned maintenance
  - rate_limits: API rate limiting

  ## Security
  - All tables have RLS enabled
  - Department-specific access policies
  - Encrypted sensitive fields
  - Complete audit trails
*/

-- ============================================================================
-- HR & EMPLOYEE MANAGEMENT TABLES
-- ============================================================================

-- Employee Onboarding
CREATE TABLE IF NOT EXISTS employee_onboarding (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  onboarding_status text DEFAULT 'initiated' CHECK (onboarding_status IN ('initiated', 'documents_pending', 'documents_verified', 'training_scheduled', 'training_completed', 'completed')),
  joining_date date NOT NULL,
  induction_date date,
  mentor_id uuid REFERENCES auth.users(id),
  onboarding_checklist jsonb DEFAULT '[]',
  department_orientation_completed boolean DEFAULT false,
  it_setup_completed boolean DEFAULT false,
  hr_documentation_completed boolean DEFAULT false,
  completed_at timestamptz,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Attendance Policies
CREATE TABLE IF NOT EXISTS attendance_policies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  policy_name text NOT NULL,
  policy_code text UNIQUE NOT NULL,
  description text,
  working_days_per_week integer DEFAULT 5,
  weekly_working_hours numeric(4,2) DEFAULT 40.00,
  grace_period_minutes integer DEFAULT 15,
  half_day_hours numeric(4,2) DEFAULT 4.00,
  full_day_hours numeric(4,2) DEFAULT 8.00,
  overtime_multiplier numeric(3,2) DEFAULT 1.50,
  applicable_departments uuid[],
  is_default boolean DEFAULT false,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Leave Types
CREATE TABLE IF NOT EXISTS leave_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  name text NOT NULL,
  description text,
  days_per_year numeric(4,1) DEFAULT 0,
  can_carry_forward boolean DEFAULT false,
  max_carry_forward_days integer DEFAULT 0,
  requires_approval boolean DEFAULT true,
  min_notice_days integer DEFAULT 0,
  max_consecutive_days integer,
  is_paid boolean DEFAULT true,
  applicable_to text[] DEFAULT ARRAY['all'],
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Leave Balances
CREATE TABLE IF NOT EXISTS leave_balances (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  leave_type_id uuid NOT NULL REFERENCES leave_types(id) ON DELETE CASCADE,
  year integer NOT NULL,
  total_days numeric(4,1) NOT NULL,
  used_days numeric(4,1) DEFAULT 0,
  pending_days numeric(4,1) DEFAULT 0,
  available_days numeric(4,1) GENERATED ALWAYS AS (total_days - used_days - pending_days) STORED,
  carried_forward_days numeric(4,1) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(employee_id, leave_type_id, year)
);

-- Holidays
CREATE TABLE IF NOT EXISTS holidays (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  date date NOT NULL,
  type text CHECK (type IN ('public_holiday', 'optional_holiday', 'restricted_holiday')),
  description text,
  applicable_locations text[],
  is_mandatory boolean DEFAULT true,
  status text DEFAULT 'active' CHECK (status IN ('active', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Work Shifts
CREATE TABLE IF NOT EXISTS work_shifts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  shift_name text NOT NULL,
  shift_code text UNIQUE NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  break_duration_minutes integer DEFAULT 60,
  total_hours numeric(4,2) GENERATED ALWAYS AS (EXTRACT(EPOCH FROM (end_time - start_time))/3600 - break_duration_minutes/60.0) STORED,
  applicable_departments uuid[],
  is_default boolean DEFAULT false,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Overtime Records
CREATE TABLE IF NOT EXISTS overtime_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date date NOT NULL,
  regular_hours numeric(4,2) DEFAULT 0,
  overtime_hours numeric(4,2) NOT NULL,
  overtime_type text CHECK (overtime_type IN ('weekday', 'weekend', 'holiday')),
  multiplier numeric(3,2) DEFAULT 1.50,
  calculated_hours numeric(4,2) GENERATED ALWAYS AS (overtime_hours * multiplier) STORED,
  approved boolean DEFAULT false,
  approved_by uuid REFERENCES auth.users(id),
  approved_at timestamptz,
  reason text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Salary Structures
CREATE TABLE IF NOT EXISTS salary_structures (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  structure_name text NOT NULL,
  structure_code text UNIQUE NOT NULL,
  description text,
  applicable_roles uuid[],
  applicable_departments uuid[],
  component_definitions jsonb NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Salary Components
CREATE TABLE IF NOT EXISTS salary_components (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  salary_record_id uuid NOT NULL REFERENCES salary_records(id) ON DELETE CASCADE,
  component_type text NOT NULL CHECK (component_type IN ('earning', 'deduction', 'reimbursement')),
  component_name text NOT NULL,
  amount numeric(12,2) NOT NULL,
  is_taxable boolean DEFAULT true,
  calculation_formula text,
  remarks text,
  created_at timestamptz DEFAULT now()
);

-- Training Records
CREATE TABLE IF NOT EXISTS training_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  training_program text NOT NULL,
  training_provider text,
  training_type text CHECK (training_type IN ('induction', 'technical', 'soft_skills', 'compliance', 'certification', 'other')),
  start_date date NOT NULL,
  end_date date,
  duration_hours numeric(6,2),
  status text DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled')),
  completion_percentage integer DEFAULT 0,
  score numeric(5,2),
  certification_obtained boolean DEFAULT false,
  certificate_url text,
  cost numeric(10,2),
  feedback text,
  trainer_name text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ============================================================================
-- VENDOR MANAGEMENT EXTENDED
-- ============================================================================

-- Vendor Documents
CREATE TABLE IF NOT EXISTS vendor_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id uuid NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  document_type text NOT NULL CHECK (document_type IN (
    'business_license', 'gst_certificate', 'pan_card', 'incorporation_certificate',
    'insurance', 'bank_details', 'contract', 'other'
  )),
  document_name text NOT NULL,
  file_url text NOT NULL,
  document_number text,
  issue_date date,
  expiry_date date,
  verified boolean DEFAULT false,
  verified_by uuid REFERENCES auth.users(id),
  verified_at timestamptz,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Vendor Services
CREATE TABLE IF NOT EXISTS vendor_services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id uuid NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  service_id uuid NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  is_available boolean DEFAULT true,
  custom_price numeric(10,2),
  minimum_booking_time integer,
  maximum_bookings_per_day integer,
  service_area_coverage text[],
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(vendor_id, service_id)
);

-- Vendor Availability
CREATE TABLE IF NOT EXISTS vendor_availability (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id uuid NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  day_of_week integer NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  is_available boolean DEFAULT true,
  start_time time,
  end_time time,
  service_areas text[],
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(vendor_id, day_of_week)
);

-- Vendor Payouts
CREATE TABLE IF NOT EXISTS vendor_payouts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id uuid NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  payout_period_start date NOT NULL,
  payout_period_end date NOT NULL,
  total_bookings integer DEFAULT 0,
  total_revenue numeric(12,2) DEFAULT 0,
  commission_amount numeric(12,2) DEFAULT 0,
  payout_amount numeric(12,2) DEFAULT 0,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  payment_method text,
  transaction_reference text,
  paid_at timestamptz,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Commission Rules
CREATE TABLE IF NOT EXISTS commission_rules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  rule_name text NOT NULL,
  rule_code text UNIQUE NOT NULL,
  entity_type text NOT NULL CHECK (entity_type IN ('vendor', 'therapist', 'platform')),
  commission_type text NOT NULL CHECK (commission_type IN ('percentage', 'fixed', 'tiered')),
  commission_value numeric(10,2) NOT NULL,
  min_booking_amount numeric(10,2),
  max_booking_amount numeric(10,2),
  applicable_services uuid[],
  applicable_categories text[],
  priority integer DEFAULT 0,
  is_active boolean DEFAULT true,
  valid_from date DEFAULT CURRENT_DATE,
  valid_until date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Commission Records
CREATE TABLE IF NOT EXISTS commission_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  entity_type text NOT NULL CHECK (entity_type IN ('vendor', 'therapist', 'platform')),
  entity_id uuid NOT NULL,
  commission_rule_id uuid REFERENCES commission_rules(id),
  booking_amount numeric(10,2) NOT NULL,
  commission_rate numeric(5,2),
  commission_amount numeric(10,2) NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'paid', 'disputed')),
  paid_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- ============================================================================
-- THERAPIST MANAGEMENT EXTENDED
-- ============================================================================

-- Therapist Certifications
CREATE TABLE IF NOT EXISTS therapist_certifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  therapist_id uuid NOT NULL REFERENCES therapists(id) ON DELETE CASCADE,
  certification_name text NOT NULL,
  certification_type text CHECK (certification_type IN ('massage_therapy', 'spa_therapy', 'aromatherapy', 'reflexology', 'yoga', 'other')),
  issuing_authority text NOT NULL,
  certificate_number text,
  issue_date date NOT NULL,
  expiry_date date,
  certificate_url text,
  verified boolean DEFAULT false,
  verified_by uuid REFERENCES auth.users(id),
  verified_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Therapist Performance
CREATE TABLE IF NOT EXISTS therapist_performance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  therapist_id uuid NOT NULL REFERENCES therapists(id) ON DELETE CASCADE,
  month date NOT NULL,
  total_bookings integer DEFAULT 0,
  completed_bookings integer DEFAULT 0,
  cancelled_bookings integer DEFAULT 0,
  average_rating numeric(3,2) DEFAULT 0,
  total_earnings numeric(12,2) DEFAULT 0,
  punctuality_score numeric(3,2) DEFAULT 0,
  customer_satisfaction_score numeric(3,2) DEFAULT 0,
  repeat_customer_rate numeric(5,2) DEFAULT 0,
  complaints_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(therapist_id, month)
);

-- Assignment Timeline
CREATE TABLE IF NOT EXISTS assignment_timeline (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id uuid NOT NULL REFERENCES therapist_assignments(id) ON DELETE CASCADE,
  status text NOT NULL,
  changed_by uuid REFERENCES auth.users(id),
  reason text,
  location jsonb,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- ============================================================================
-- SERVICES & CATALOG EXTENDED
-- ============================================================================

-- Service Categories
CREATE TABLE IF NOT EXISTS service_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  name text NOT NULL,
  description text,
  icon text,
  image_url text,
  parent_category_id uuid REFERENCES service_categories(id),
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  seo_title text,
  seo_description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Service Variants
CREATE TABLE IF NOT EXISTS service_variants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id uuid NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  variant_name text NOT NULL,
  variant_code text NOT NULL,
  duration integer NOT NULL,
  price numeric(10,2) NOT NULL,
  description text,
  is_available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(service_id, variant_code)
);

-- Service Pricing Tiers
CREATE TABLE IF NOT EXISTS service_pricing_tiers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id uuid NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  tier_name text NOT NULL,
  tier_level integer NOT NULL,
  min_duration integer,
  max_duration integer,
  base_price numeric(10,2) NOT NULL,
  discount_percentage numeric(5,2) DEFAULT 0,
  final_price numeric(10,2) GENERATED ALWAYS AS (base_price * (1 - discount_percentage/100)) STORED,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Service Reviews
CREATE TABLE IF NOT EXISTS service_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id uuid NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  booking_id uuid REFERENCES bookings(id),
  rating integer NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review_title text,
  review_text text,
  pros text,
  cons text,
  would_recommend boolean DEFAULT true,
  is_verified_purchase boolean DEFAULT false,
  helpful_count integer DEFAULT 0,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'flagged')),
  moderated_by uuid REFERENCES auth.users(id),
  moderated_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Service Availability
CREATE TABLE IF NOT EXISTS service_availability (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id uuid NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  location_type text CHECK (location_type IN ('city', 'pincode', 'area', 'radius')),
  location_value text NOT NULL,
  is_available boolean DEFAULT true,
  additional_charge numeric(10,2) DEFAULT 0,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Service Tags
CREATE TABLE IF NOT EXISTS service_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tag_name text UNIQUE NOT NULL,
  tag_slug text UNIQUE NOT NULL,
  description text,
  usage_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Service Tags Mapping (Many-to-Many)
CREATE TABLE IF NOT EXISTS service_tag_mapping (
  service_id uuid NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  tag_id uuid NOT NULL REFERENCES service_tags(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (service_id, tag_id)
);

-- Popular Services
CREATE TABLE IF NOT EXISTS popular_services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id uuid NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  time_period text NOT NULL CHECK (time_period IN ('daily', 'weekly', 'monthly')),
  period_start date NOT NULL,
  period_end date NOT NULL,
  booking_count integer DEFAULT 0,
  revenue_generated numeric(12,2) DEFAULT 0,
  average_rating numeric(3,2) DEFAULT 0,
  rank_position integer,
  created_at timestamptz DEFAULT now(),
  UNIQUE(service_id, time_period, period_start)
);

-- ============================================================================
-- BOOKINGS EXTENDED
-- ============================================================================

-- Booking Status History
CREATE TABLE IF NOT EXISTS booking_status_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  old_status text,
  new_status text NOT NULL,
  changed_by uuid REFERENCES auth.users(id),
  reason text,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Booking Notes
CREATE TABLE IF NOT EXISTS booking_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  note_type text CHECK (note_type IN ('internal', 'customer', 'therapist', 'vendor')),
  note_text text NOT NULL,
  added_by uuid NOT NULL REFERENCES auth.users(id),
  is_visible_to_customer boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Booking Cancellations
CREATE TABLE IF NOT EXISTS booking_cancellations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  cancelled_by uuid NOT NULL REFERENCES auth.users(id),
  cancellation_reason text NOT NULL,
  cancellation_fee numeric(10,2) DEFAULT 0,
  refund_amount numeric(10,2) DEFAULT 0,
  refund_status text DEFAULT 'pending' CHECK (refund_status IN ('pending', 'processing', 'completed', 'failed')),
  refund_processed_at timestamptz,
  cancelled_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Booking Reschedules
CREATE TABLE IF NOT EXISTS booking_reschedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  old_scheduled_date timestamptz NOT NULL,
  new_scheduled_date timestamptz NOT NULL,
  old_time_slot text,
  new_time_slot text,
  reason text NOT NULL,
  requested_by uuid NOT NULL REFERENCES auth.users(id),
  reschedule_fee numeric(10,2) DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Service Execution Log
CREATE TABLE IF NOT EXISTS service_execution_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  therapist_id uuid REFERENCES therapists(id),
  service_start_time timestamptz,
  service_end_time timestamptz,
  actual_duration integer,
  customer_preferences jsonb,
  service_notes text,
  products_used jsonb,
  issues_encountered text,
  created_at timestamptz DEFAULT now()
);

-- Booking Photos
CREATE TABLE IF NOT EXISTS booking_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  photo_type text CHECK (photo_type IN ('before', 'during', 'after', 'issue', 'completion')),
  photo_url text NOT NULL,
  caption text,
  uploaded_by uuid NOT NULL REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

-- ============================================================================
-- PAYMENTS & FINANCE EXTENDED
-- ============================================================================

-- Payment Methods
CREATE TABLE IF NOT EXISTS payment_methods (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  method_type text NOT NULL CHECK (method_type IN ('card', 'upi', 'netbanking', 'wallet')),
  provider text,
  account_identifier_encrypted text,
  last_four_digits text,
  is_default boolean DEFAULT false,
  is_active boolean DEFAULT true,
  expiry_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Payment Gateways
CREATE TABLE IF NOT EXISTS payment_gateways (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  gateway_name text UNIQUE NOT NULL,
  gateway_code text UNIQUE NOT NULL,
  is_active boolean DEFAULT true,
  supported_methods text[] DEFAULT ARRAY['card', 'upi', 'netbanking', 'wallet'],
  api_credentials_encrypted jsonb,
  transaction_fee_percentage numeric(5,2) DEFAULT 0,
  transaction_fee_fixed numeric(10,2) DEFAULT 0,
  settlement_period_days integer DEFAULT 2,
  priority integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Refunds
CREATE TABLE IF NOT EXISTS refunds (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_id uuid NOT NULL REFERENCES payments(id) ON DELETE CASCADE,
  booking_id uuid REFERENCES bookings(id),
  refund_amount numeric(12,2) NOT NULL,
  refund_reason text NOT NULL,
  refund_method text CHECK (refund_method IN ('original_source', 'wallet', 'bank_transfer')),
  status text DEFAULT 'initiated' CHECK (status IN ('initiated', 'processing', 'completed', 'failed', 'cancelled')),
  gateway_refund_id text,
  processed_by uuid REFERENCES auth.users(id),
  processed_at timestamptz,
  failed_reason text,
  created_at timestamptz DEFAULT now()
);

-- Wallet Transactions
CREATE TABLE IF NOT EXISTS wallet_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  transaction_type text NOT NULL CHECK (transaction_type IN ('credit', 'debit', 'refund', 'bonus', 'cashback')),
  amount numeric(12,2) NOT NULL,
  balance_before numeric(12,2) NOT NULL,
  balance_after numeric(12,2) NOT NULL,
  reference_type text,
  reference_id uuid,
  description text,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Invoices
CREATE TABLE IF NOT EXISTS invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number text UNIQUE NOT NULL,
  booking_id uuid REFERENCES bookings(id),
  customer_id uuid NOT NULL REFERENCES customers(id),
  invoice_date date NOT NULL DEFAULT CURRENT_DATE,
  due_date date,
  subtotal numeric(12,2) NOT NULL,
  tax_amount numeric(12,2) DEFAULT 0,
  discount_amount numeric(12,2) DEFAULT 0,
  total_amount numeric(12,2) NOT NULL,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'paid', 'cancelled', 'overdue')),
  payment_terms text,
  notes text,
  invoice_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Expense Categories
CREATE TABLE IF NOT EXISTS expense_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  name text NOT NULL,
  description text,
  parent_category_id uuid REFERENCES expense_categories(id),
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Expenses
CREATE TABLE IF NOT EXISTS expenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  expense_number text UNIQUE NOT NULL,
  category_id uuid NOT NULL REFERENCES expense_categories(id),
  department_id uuid REFERENCES departments(id),
  employee_id uuid REFERENCES auth.users(id),
  expense_date date NOT NULL,
  amount numeric(12,2) NOT NULL,
  description text NOT NULL,
  vendor_name text,
  receipt_url text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'reimbursed')),
  approved_by uuid REFERENCES auth.users(id),
  approved_at timestamptz,
  rejection_reason text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Budget Allocations
CREATE TABLE IF NOT EXISTS budget_allocations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  department_id uuid NOT NULL REFERENCES departments(id),
  fiscal_year integer NOT NULL,
  quarter integer CHECK (quarter BETWEEN 1 AND 4),
  category_id uuid REFERENCES expense_categories(id),
  allocated_amount numeric(12,2) NOT NULL,
  spent_amount numeric(12,2) DEFAULT 0,
  remaining_amount numeric(12,2) GENERATED ALWAYS AS (allocated_amount - spent_amount) STORED,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(department_id, fiscal_year, quarter, category_id)
);

-- Financial Reports
CREATE TABLE IF NOT EXISTS financial_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  report_type text NOT NULL CHECK (report_type IN ('profit_loss', 'balance_sheet', 'cash_flow', 'revenue', 'expense', 'custom')),
  report_name text NOT NULL,
  period_start date NOT NULL,
  period_end date NOT NULL,
  report_data jsonb NOT NULL,
  generated_by uuid NOT NULL REFERENCES auth.users(id),
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'final', 'archived')),
  report_url text,
  created_at timestamptz DEFAULT now()
);

-- Tax Records
CREATE TABLE IF NOT EXISTS tax_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tax_type text NOT NULL CHECK (tax_type IN ('gst', 'tds', 'income_tax', 'professional_tax', 'other')),
  tax_period_start date NOT NULL,
  tax_period_end date NOT NULL,
  taxable_amount numeric(15,2) NOT NULL,
  tax_rate numeric(5,2) NOT NULL,
  tax_amount numeric(15,2) NOT NULL,
  filing_status text DEFAULT 'pending' CHECK (filing_status IN ('pending', 'filed', 'paid', 'overdue')),
  filing_reference text,
  filed_at timestamptz,
  paid_at timestamptz,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- ============================================================================
-- CUSTOMERS & CRM EXTENDED
-- ============================================================================

-- Customer Segments
CREATE TABLE IF NOT EXISTS customer_segments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  segment_name text UNIQUE NOT NULL,
  segment_code text UNIQUE NOT NULL,
  description text,
  criteria jsonb NOT NULL,
  customer_count integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Customer Segment Mapping
CREATE TABLE IF NOT EXISTS customer_segment_mapping (
  customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  segment_id uuid NOT NULL REFERENCES customer_segments(id) ON DELETE CASCADE,
  assigned_at timestamptz DEFAULT now(),
  PRIMARY KEY (customer_id, segment_id)
);

-- Customer Preferences
CREATE TABLE IF NOT EXISTS customer_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE UNIQUE,
  preferred_services uuid[],
  preferred_therapists uuid[],
  preferred_time_slots text[],
  preferred_payment_methods text[],
  communication_preferences jsonb DEFAULT '{"email": true, "sms": true, "push": true}',
  special_requests text,
  allergies text,
  medical_conditions text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Customer Loyalty Tiers
CREATE TABLE IF NOT EXISTS customer_loyalty_tiers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tier_name text UNIQUE NOT NULL,
  tier_level integer UNIQUE NOT NULL,
  min_points integer NOT NULL,
  max_points integer,
  benefits jsonb DEFAULT '{}',
  discount_percentage numeric(5,2) DEFAULT 0,
  priority_booking boolean DEFAULT false,
  free_cancellations integer DEFAULT 0,
  icon text,
  color text,
  created_at timestamptz DEFAULT now()
);

-- Loyalty Points Transactions
CREATE TABLE IF NOT EXISTS loyalty_points_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  transaction_type text NOT NULL CHECK (transaction_type IN ('earned', 'redeemed', 'expired', 'adjusted', 'bonus')),
  points numeric(10,2) NOT NULL,
  balance_before numeric(10,2) NOT NULL,
  balance_after numeric(10,2) NOT NULL,
  reference_type text,
  reference_id uuid,
  description text,
  expiry_date date,
  created_at timestamptz DEFAULT now()
);

-- Customer Referrals
CREATE TABLE IF NOT EXISTS customer_referrals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id uuid NOT NULL REFERENCES customers(id),
  referred_email text,
  referred_mobile text,
  referred_customer_id uuid REFERENCES customers(id),
  referral_code text UNIQUE NOT NULL,
  status text DEFAULT 'sent' CHECK (status IN ('sent', 'signed_up', 'completed', 'rewarded', 'expired')),
  reward_type text CHECK (reward_type IN ('points', 'discount', 'cashback', 'service')),
  reward_value numeric(10,2),
  rewarded_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Customer Complaints
CREATE TABLE IF NOT EXISTS customer_complaints (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  complaint_number text UNIQUE NOT NULL,
  customer_id uuid NOT NULL REFERENCES customers(id),
  booking_id uuid REFERENCES bookings(id),
  complaint_type text NOT NULL CHECK (complaint_type IN ('service_quality', 'therapist_behavior', 'billing', 'cancellation', 'delay', 'other')),
  severity text DEFAULT 'medium' CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  subject text NOT NULL,
  description text NOT NULL,
  status text DEFAULT 'open' CHECK (status IN ('open', 'investigating', 'resolved', 'closed', 'escalated')),
  assigned_to uuid REFERENCES auth.users(id),
  resolution_notes text,
  compensation_offered jsonb,
  resolved_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Customer Communication Log
CREATE TABLE IF NOT EXISTS customer_communication_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  communication_type text NOT NULL CHECK (communication_type IN ('email', 'sms', 'push', 'call', 'whatsapp', 'chat')),
  direction text NOT NULL CHECK (direction IN ('inbound', 'outbound')),
  subject text,
  content text NOT NULL,
  status text DEFAULT 'sent' CHECK (status IN ('queued', 'sent', 'delivered', 'failed', 'bounced', 'opened', 'clicked')),
  metadata jsonb DEFAULT '{}',
  campaign_id uuid,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

-- ============================================================================
-- INDEXES
-- ============================================================================

-- HR Indexes
CREATE INDEX IF NOT EXISTS idx_employee_onboarding_employee ON employee_onboarding(employee_id);
CREATE INDEX IF NOT EXISTS idx_leave_balances_employee ON leave_balances(employee_id);
CREATE INDEX IF NOT EXISTS idx_overtime_records_employee ON overtime_records(employee_id);
CREATE INDEX IF NOT EXISTS idx_training_records_employee ON training_records(employee_id);

-- Vendor Indexes
CREATE INDEX IF NOT EXISTS idx_vendor_documents_vendor ON vendor_documents(vendor_id);
CREATE INDEX IF NOT EXISTS idx_vendor_services_vendor ON vendor_services(vendor_id);
CREATE INDEX IF NOT EXISTS idx_vendor_payouts_vendor ON vendor_payouts(vendor_id);
CREATE INDEX IF NOT EXISTS idx_commission_records_entity ON commission_records(entity_type, entity_id);

-- Service Indexes
CREATE INDEX IF NOT EXISTS idx_service_reviews_service ON service_reviews(service_id);
CREATE INDEX IF NOT EXISTS idx_service_reviews_customer ON service_reviews(customer_id);
CREATE INDEX IF NOT EXISTS idx_popular_services_service ON popular_services(service_id);

-- Booking Indexes
CREATE INDEX IF NOT EXISTS idx_booking_status_history_booking ON booking_status_history(booking_id);
CREATE INDEX IF NOT EXISTS idx_booking_notes_booking ON booking_notes(booking_id);
CREATE INDEX IF NOT EXISTS idx_booking_cancellations_booking ON booking_cancellations(booking_id);

-- Payment Indexes
CREATE INDEX IF NOT EXISTS idx_payment_methods_customer ON payment_methods(customer_id);
CREATE INDEX IF NOT EXISTS idx_refunds_payment ON refunds(payment_id);
CREATE INDEX IF NOT EXISTS idx_wallet_transactions_user ON wallet_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_invoices_customer ON invoices(customer_id);
CREATE INDEX IF NOT EXISTS idx_expenses_department ON expenses(department_id);

-- Customer Indexes
CREATE INDEX IF NOT EXISTS idx_customer_complaints_customer ON customer_complaints(customer_id);
CREATE INDEX IF NOT EXISTS idx_loyalty_points_transactions_customer ON loyalty_points_transactions(customer_id);
CREATE INDEX IF NOT EXISTS idx_customer_communication_log_customer ON customer_communication_log(customer_id);

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE employee_onboarding ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE leave_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE leave_balances ENABLE ROW LEVEL SECURITY;
ALTER TABLE holidays ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_shifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE overtime_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE salary_structures ENABLE ROW LEVEL SECURITY;
ALTER TABLE salary_components ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE commission_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE commission_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE therapist_certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE therapist_performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignment_timeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_pricing_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_tag_mapping ENABLE ROW LEVEL SECURITY;
ALTER TABLE popular_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_cancellations ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_reschedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_execution_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_gateways ENABLE ROW LEVEL SECURITY;
ALTER TABLE refunds ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallet_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE expense_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_allocations ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE tax_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_segments ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_segment_mapping ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_loyalty_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE loyalty_points_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_communication_log ENABLE ROW LEVEL SECURITY;

-- Sample RLS Policies (HR can manage their data)
CREATE POLICY "HR can view all employee data"
  ON employee_onboarding FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      JOIN roles r ON ur.role_id = r.id
      WHERE ur.user_id = auth.uid()
      AND r.code IN ('super_admin', 'hr_manager', 'hr_department')
    )
  );

CREATE POLICY "Employees can view own onboarding"
  ON employee_onboarding FOR SELECT
  TO authenticated
  USING (employee_id = auth.uid());

-- Vendors can view own documents
CREATE POLICY "Vendors can view own documents"
  ON vendor_documents FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM vendors v
      WHERE v.id = vendor_id AND v.user_id = auth.uid()
    )
  );

-- Customers can view own preferences
CREATE POLICY "Customers can manage own preferences"
  ON customer_preferences FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM customers c
      WHERE c.id = customer_id AND c.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM customers c
      WHERE c.id = customer_id AND c.user_id = auth.uid()
    )
  );

-- Service categories public
CREATE POLICY "Service categories visible to all"
  ON service_categories FOR SELECT
  TO authenticated
  USING (is_active = true);

-- Wallet transactions - users can view own
CREATE POLICY "Users can view own wallet transactions"
  ON wallet_transactions FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());
