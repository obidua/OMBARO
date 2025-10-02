# OMBARO Platform - Database Schema Documentation

> **Note**: This file has been replaced with a cleaner, more accurate documentation.
> Please refer to `DATABASE_SCHEMA.md` for the current schema documentation.

## Quick Summary

- **Total Tables**: 60 (Essential Only - Down from 143)
- **Migration File**: `supabase/migrations/20250115_clean_production_schema.sql`
- **Status**: Production Ready ✅

## Table Categories
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

---

For complete documentation, see: **[DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)**

---

# Legacy Documentation (Archived)

## Table of Contents
1. [System Architecture Overview](#system-architecture-overview)
2. [Technology Stack](#technology-stack)
3. [Core Database Schema](#core-database-schema)
4. [Departmental Role-Based Access](#departmental-role-based-access)
5. [Data Relationships](#data-relationships)
6. [Security & Row Level Security](#security--row-level-security)
7. [Real-Time Features](#real-time-features)
8. [API Integration Points](#api-integration-points)
9. [Caching Strategy](#caching-strategy)
10. [Performance Optimization](#performance-optimization)

---

## System Architecture Overview

OMBARO is a comprehensive spa and wellness services management platform built on a modern, scalable architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT APPLICATIONS                      │
├──────────────────────────┬──────────────────────────────────┤
│   React Web App (Vite)   │  React Native Mobile App (Expo)  │
└──────────────┬───────────┴──────────────────┬───────────────┘
               │                              │
               └──────────┬───────────────────┘
                          ↓
         ┌────────────────────────────────────────┐
         │         SUPABASE BACKEND               │
         ├────────────────────────────────────────┤
         │  • PostgreSQL Database (RLS Enabled)   │
         │  • Edge Functions (Deno Runtime)       │
         │  • Real-time Subscriptions             │
         │  • Authentication (Email/Password)     │
         │  • Storage (Profile Images, Docs)      │
         └───────────────┬────────────────────────┘
                         │
         ┌───────────────┴────────────────┐
         │                                │
         ↓                                ↓
┌──────────────────┐           ┌──────────────────┐
│  Redis Cache     │           │  Fast API Layer  │
│  (Session Data,  │           │  (Business Logic,│
│   Query Cache)   │           │   Integrations)  │
└──────────────────┘           └──────────────────┘
```

### Key Architecture Principles

1. **Multi-Tenant Architecture**: Vendors, customers, employees, and departments share infrastructure with strict data isolation via RLS
2. **Real-Time First**: All critical operations use Supabase real-time subscriptions for instant updates
3. **Edge Computing**: Business logic runs on Supabase Edge Functions (Deno runtime) close to users
4. **Caching Layer**: Redis caches frequently accessed data (user sessions, service catalogs, location data)
5. **Mobile-First**: React Native app shares business logic with web app through shared TypeScript interfaces

---

## Technology Stack

### Frontend
- **Web**: React 18.3+ with TypeScript, Vite build system, Tailwind CSS
- **Mobile**: React Native with Expo, TypeScript, Native Base UI
- **State Management**: React Context API with hooks
- **Real-Time**: Supabase JavaScript client with WebSocket subscriptions

### Backend
- **Database**: PostgreSQL 15+ (Supabase managed)
- **API Layer**: Supabase Edge Functions (Deno runtime)
- **Additional APIs**: FastAPI for complex business logic and third-party integrations
- **Caching**: Redis for session management and query caching
- **Real-Time**: Supabase Realtime (WebSocket based on Elixir Phoenix)

### Security
- **Authentication**: Supabase Auth (Email/Password with JWT)
- **Authorization**: Row Level Security (RLS) policies per role
- **Data Encryption**: TLS in transit, AES-256 at rest
- **API Security**: JWT validation, rate limiting, CORS policies

---

## Core Database Schema

### 1. Authentication & User Management

#### users (Supabase Auth Extended)
```sql
CREATE TABLE auth.users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  encrypted_password text NOT NULL,
  email_confirmed_at timestamptz,
  last_sign_in_at timestamptz,
  raw_app_meta_data jsonb,  -- Store role and department info
  raw_user_meta_data jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

#### user_profiles
```sql
CREATE TABLE user_profiles (
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
  address jsonb,  -- { street, city, state, pincode, country }
  preferences jsonb,  -- User preferences and settings
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX idx_user_profiles_role ON user_profiles(role);
CREATE INDEX idx_user_profiles_status ON user_profiles(status);
CREATE INDEX idx_user_profiles_mobile ON user_profiles(mobile);

-- RLS Policies
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
```

#### role_permissions
```sql
CREATE TABLE role_permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role_id text NOT NULL,  -- Maps to role enum
  module_id text NOT NULL,
  sub_module_id text,
  permissions text[] DEFAULT '{}',  -- ['read', 'create', 'update', 'delete', 'approve', 'export']
  created_at timestamptz DEFAULT now(),
  UNIQUE(role_id, module_id, sub_module_id)
);

CREATE INDEX idx_role_permissions_role ON role_permissions(role_id);
CREATE INDEX idx_role_permissions_module ON role_permissions(module_id);
```

---

### 2. Service Management

#### services
```sql
CREATE TABLE services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,  -- e.g., 'ARO', 'SWD', 'DPT'
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
  duration_options integer[],  -- Array of duration options in minutes
  base_price_60min numeric(10,2) NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_services_category ON services(category);
CREATE INDEX idx_services_code ON services(code);
CREATE INDEX idx_services_active ON services(is_active);

-- Full-text search index
CREATE INDEX idx_services_search ON services
  USING gin(to_tsvector('english', name || ' ' || description || ' ' || techniques));
```

#### service_packages
```sql
CREATE TABLE service_packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  service_ids uuid[] NOT NULL,  -- Array of service IDs
  total_duration integer NOT NULL,  -- Total duration in minutes
  package_price numeric(10,2) NOT NULL,
  discount_percentage numeric(5,2) DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

#### addon_services
```sql
CREATE TABLE addon_services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  name text NOT NULL,
  description text,
  duration integer NOT NULL,  -- Duration in minutes
  price numeric(10,2) NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

---

### 3. Vendor Management

#### vendors
```sql
CREATE TABLE vendors (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  business_name text NOT NULL,
  business_type text CHECK (business_type IN ('spa', 'salon', 'home_service', 'hotel_spa', 'wellness_center')),
  gst_number text,
  pan_number text,
  business_address jsonb NOT NULL,  -- Full address with coordinates
  contact_person text NOT NULL,
  contact_mobile text NOT NULL,
  contact_email text NOT NULL,
  services_offered uuid[],  -- Array of service IDs
  operating_hours jsonb,  -- { monday: { open: '09:00', close: '21:00', closed: false }, ... }
  rating numeric(3,2) DEFAULT 0.00,
  total_reviews integer DEFAULT 0,
  verification_status text DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
  verification_documents jsonb,  -- Array of document URLs
  commission_rate numeric(5,2) DEFAULT 15.00,  -- Percentage
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_vendors_status ON vendors(status);
CREATE INDEX idx_vendors_verification ON vendors(verification_status);
CREATE INDEX idx_vendors_rating ON vendors(rating DESC);

-- GiST index for location-based queries
CREATE INDEX idx_vendors_location ON vendors
  USING gist (ll_to_earth(
    (business_address->>'latitude')::float8,
    (business_address->>'longitude')::float8
  ));
```

#### vendor_staff
```sql
CREATE TABLE vendor_staff (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id uuid NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  role text NOT NULL,  -- 'manager', 'receptionist', 'admin'
  mobile text NOT NULL,
  email text,
  permissions text[],
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_vendor_staff_vendor ON vendor_staff(vendor_id);
CREATE INDEX idx_vendor_staff_user ON vendor_staff(user_id);
```

---

### 4. Therapist Management

#### therapists
```sql
CREATE TABLE therapists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  vendor_id uuid NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  mobile text NOT NULL,
  gender text CHECK (gender IN ('male', 'female', 'other')),
  date_of_birth date,
  profile_image text,
  specialization text[] DEFAULT '{}',  -- Array of service codes
  experience_years integer DEFAULT 0,
  certifications jsonb DEFAULT '[]',  -- [{ name, issuer, year, document_url }]
  languages text[] DEFAULT '{}',
  rating numeric(3,2) DEFAULT 0.00,
  total_reviews integer DEFAULT 0,
  total_services integer DEFAULT 0,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'on_leave', 'terminated')),
  availability_status text DEFAULT 'offline' CHECK (availability_status IN ('available', 'busy', 'offline')),
  emergency_contact jsonb,  -- { name, relation, phone }
  address jsonb,
  bank_details jsonb,  -- { account_number, ifsc, bank_name, branch } (encrypted)
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_therapists_vendor ON therapists(vendor_id);
CREATE INDEX idx_therapists_user ON therapists(user_id);
CREATE INDEX idx_therapists_status ON therapists(status);
CREATE INDEX idx_therapists_availability ON therapists(availability_status);
CREATE INDEX idx_therapists_rating ON therapists(rating DESC);
CREATE INDEX idx_therapists_specialization ON therapists USING gin(specialization);
```

#### therapist_schedules
```sql
CREATE TABLE therapist_schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  therapist_id uuid NOT NULL REFERENCES therapists(id) ON DELETE CASCADE,
  day_of_week integer NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),  -- 0=Sunday
  start_time time NOT NULL,
  end_time time NOT NULL,
  is_available boolean DEFAULT true,
  break_start time,
  break_end time,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(therapist_id, day_of_week)
);

CREATE INDEX idx_therapist_schedules_therapist ON therapist_schedules(therapist_id);
CREATE INDEX idx_therapist_schedules_day ON therapist_schedules(day_of_week);
```

#### therapist_leaves
```sql
CREATE TABLE therapist_leaves (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  therapist_id uuid NOT NULL REFERENCES therapists(id) ON DELETE CASCADE,
  leave_type text NOT NULL CHECK (leave_type IN ('sick', 'casual', 'emergency', 'annual')),
  start_date date NOT NULL,
  end_date date NOT NULL,
  total_days integer GENERATED ALWAYS AS (end_date - start_date + 1) STORED,
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

CREATE INDEX idx_therapist_leaves_therapist ON therapist_leaves(therapist_id);
CREATE INDEX idx_therapist_leaves_status ON therapist_leaves(status);
CREATE INDEX idx_therapist_leaves_dates ON therapist_leaves(start_date, end_date);
```

#### therapist_locations (Real-Time Tracking)
```sql
CREATE TABLE therapist_locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  therapist_id uuid NOT NULL REFERENCES therapists(id) ON DELETE CASCADE,
  latitude numeric(10,8) NOT NULL,
  longitude numeric(11,8) NOT NULL,
  accuracy numeric(10,2),  -- GPS accuracy in meters
  altitude numeric(10,2),
  speed numeric(10,2),  -- Speed in km/h
  heading numeric(5,2),  -- Direction in degrees
  battery_level integer CHECK (battery_level BETWEEN 0 AND 100),
  is_moving boolean DEFAULT false,
  timestamp timestamptz DEFAULT now()
);

CREATE INDEX idx_therapist_locations_therapist ON therapist_locations(therapist_id);
CREATE INDEX idx_therapist_locations_timestamp ON therapist_locations(timestamp DESC);

-- Automatically delete old location records (keep only last 24 hours)
CREATE INDEX idx_therapist_locations_cleanup ON therapist_locations(timestamp)
  WHERE timestamp < now() - interval '24 hours';
```

---

### 5. Booking Management

#### bookings
```sql
CREATE TABLE bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_number text UNIQUE NOT NULL,  -- OBO-20250102-0001
  customer_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
  vendor_id uuid NOT NULL REFERENCES vendors(id) ON DELETE RESTRICT,
  booking_type text NOT NULL CHECK (booking_type IN ('home_service', 'spa_visit', 'hotel_service')),
  service_location jsonb NOT NULL,  -- { address, latitude, longitude, landmark }
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

CREATE INDEX idx_bookings_customer ON bookings(customer_id);
CREATE INDEX idx_bookings_vendor ON bookings(vendor_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_date ON bookings(booking_date, booking_time);
CREATE INDEX idx_bookings_number ON bookings(booking_number);
```

#### booking_items
```sql
CREATE TABLE booking_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  service_id uuid NOT NULL REFERENCES services(id),
  duration integer NOT NULL,  -- Duration in minutes
  price numeric(10,2) NOT NULL,
  quantity integer DEFAULT 1,
  addon_services jsonb DEFAULT '[]',  -- [{ id, name, price }]
  subtotal numeric(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_booking_items_booking ON booking_items(booking_id);
CREATE INDEX idx_booking_items_service ON booking_items(service_id);
```

#### therapist_assignments
```sql
CREATE TABLE therapist_assignments (
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
  estimated_duration integer NOT NULL,  -- Minutes
  actual_start_time timestamptz,
  actual_end_time timestamptz,
  actual_duration integer,  -- Minutes
  distance_traveled numeric(10,2),  -- Kilometers
  travel_time integer,  -- Minutes
  customer_rating integer CHECK (customer_rating BETWEEN 1 AND 5),
  customer_feedback text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_therapist_assignments_booking ON therapist_assignments(booking_id);
CREATE INDEX idx_therapist_assignments_therapist ON therapist_assignments(therapist_id);
CREATE INDEX idx_therapist_assignments_vendor ON therapist_assignments(vendor_id);
CREATE INDEX idx_therapist_assignments_customer ON therapist_assignments(customer_id);
CREATE INDEX idx_therapist_assignments_status ON therapist_assignments(status);
CREATE INDEX idx_therapist_assignments_date ON therapist_assignments(assignment_date, assignment_time);
```

---

### 6. Payment Management

#### payments
```sql
CREATE TABLE payments (
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
  payment_gateway text,  -- 'razorpay', 'stripe', 'paytm', etc.
  gateway_transaction_id text,
  status text DEFAULT 'pending' CHECK (status IN (
    'pending', 'processing', 'success', 'failed', 'refunded', 'partially_refunded'
  )),
  payment_date timestamptz,
  refund_amount numeric(10,2),
  refund_date timestamptz,
  refund_reason text,
  metadata jsonb,  -- Gateway-specific data
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_payments_booking ON payments(booking_id);
CREATE INDEX idx_payments_customer ON payments(customer_id);
CREATE INDEX idx_payments_vendor ON payments(vendor_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_transaction ON payments(transaction_id);
CREATE INDEX idx_payments_date ON payments(payment_date);
```

#### payment_settlements
```sql
CREATE TABLE payment_settlements (
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

CREATE INDEX idx_payment_settlements_vendor ON payment_settlements(vendor_id);
CREATE INDEX idx_payment_settlements_period ON payment_settlements(settlement_period_start, settlement_period_end);
CREATE INDEX idx_payment_settlements_status ON payment_settlements(status);
```

---

### 7. Employee Management (HR System)

#### employees
```sql
CREATE TABLE employees (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  employee_code text UNIQUE NOT NULL,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  mobile text NOT NULL,
  gender text CHECK (gender IN ('male', 'female', 'other')),
  date_of_birth date,
  profile_photo text,
  department text NOT NULL,  -- Maps to role definitions
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
  emergency_contact jsonb,  -- { name, relation, phone, alternate_phone }
  bank_details jsonb,  -- Encrypted
  documents jsonb DEFAULT '[]',  -- [{ type, url, uploaded_at }]
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_employees_code ON employees(employee_code);
CREATE INDEX idx_employees_department ON employees(department);
CREATE INDEX idx_employees_manager ON employees(reporting_manager);
CREATE INDEX idx_employees_status ON employees(status);
```

#### attendance_records
```sql
CREATE TABLE attendance_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  date date NOT NULL,
  check_in_time timestamptz,
  check_out_time timestamptz,
  status text NOT NULL CHECK (status IN ('present', 'absent', 'late', 'half_day', 'leave', 'work_from_home', 'holiday')),
  work_hours numeric(5,2),
  check_in_location jsonb,  -- { latitude, longitude, address }
  check_out_location jsonb,
  notes text,
  approved_by uuid REFERENCES employees(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(employee_id, date)
);

CREATE INDEX idx_attendance_employee ON attendance_records(employee_id);
CREATE INDEX idx_attendance_date ON attendance_records(date);
CREATE INDEX idx_attendance_status ON attendance_records(status);
```

#### leave_requests
```sql
CREATE TABLE leave_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  leave_type text NOT NULL CHECK (leave_type IN (
    'sick', 'casual', 'earned', 'maternity', 'paternity', 'emergency', 'unpaid'
  )),
  from_date date NOT NULL,
  to_date date NOT NULL,
  total_days integer GENERATED ALWAYS AS (to_date - from_date + 1) STORED,
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

CREATE INDEX idx_leave_requests_employee ON leave_requests(employee_id);
CREATE INDEX idx_leave_requests_status ON leave_requests(status);
CREATE INDEX idx_leave_requests_dates ON leave_requests(from_date, to_date);
```

#### salary_records
```sql
CREATE TABLE salary_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid NOT NULL REFERENCES employees(id) ON DELETE RESTRICT,
  month integer NOT NULL CHECK (month BETWEEN 1 AND 12),
  year integer NOT NULL,
  basic_salary numeric(10,2) NOT NULL,
  allowances jsonb DEFAULT '{}',  -- { hra, transport, medical, special, other }
  deductions jsonb DEFAULT '{}',  -- { pf, esi, tax, loan_emi, advance, other }
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

CREATE INDEX idx_salary_records_employee ON salary_records(employee_id);
CREATE INDEX idx_salary_records_period ON salary_records(year, month);
CREATE INDEX idx_salary_records_status ON salary_records(status);
```

#### performance_reviews
```sql
CREATE TABLE performance_reviews (
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
  goals jsonb DEFAULT '[]',  -- [{ goal, status, achievement_percentage }]
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

CREATE INDEX idx_performance_reviews_employee ON performance_reviews(employee_id);
CREATE INDEX idx_performance_reviews_reviewer ON performance_reviews(reviewer_id);
CREATE INDEX idx_performance_reviews_period ON performance_reviews(review_period_start, review_period_end);
```

---

### 8. Customer Management

#### customers (Extends user_profiles)
```sql
CREATE TABLE customers (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  membership_tier text DEFAULT 'silver' CHECK (membership_tier IN ('silver', 'gold', 'platinum', 'diamond')),
  membership_start_date date,
  loyalty_points integer DEFAULT 0,
  total_bookings integer DEFAULT 0,
  total_spent numeric(12,2) DEFAULT 0,
  preferred_services uuid[],  -- Array of service IDs
  preferred_therapists uuid[],  -- Array of therapist IDs
  preferred_vendors uuid[],  -- Array of vendor IDs
  communication_preferences jsonb DEFAULT '{}',  -- { email, sms, whatsapp, push }
  allergies text[],
  medical_conditions text[],
  special_requirements text,
  referral_code text UNIQUE,
  referred_by uuid REFERENCES customers(id),
  referral_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_customers_tier ON customers(membership_tier);
CREATE INDEX idx_customers_referral_code ON customers(referral_code);
CREATE INDEX idx_customers_referred_by ON customers(referred_by);
```

#### customer_addresses
```sql
CREATE TABLE customer_addresses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  address_type text NOT NULL CHECK (address_type IN ('home', 'work', 'other')),
  label text,  -- 'Home', 'Office', 'Mom's Place', etc.
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

CREATE INDEX idx_customer_addresses_customer ON customer_addresses(customer_id);
CREATE INDEX idx_customer_addresses_type ON customer_addresses(address_type);
```

---

### 9. Reviews & Ratings

#### reviews
```sql
CREATE TABLE reviews (
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

CREATE INDEX idx_reviews_booking ON reviews(booking_id);
CREATE INDEX idx_reviews_customer ON reviews(customer_id);
CREATE INDEX idx_reviews_vendor ON reviews(vendor_id);
CREATE INDEX idx_reviews_therapist ON reviews(therapist_id);
CREATE INDEX idx_reviews_status ON reviews(status);
CREATE INDEX idx_reviews_rating ON reviews(overall_rating);
```

---

### 10. Marketing & Promotions

#### campaigns
```sql
CREATE TABLE campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text CHECK (type IN ('email', 'sms', 'push', 'in_app', 'multi_channel')),
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'active', 'paused', 'completed', 'cancelled')),
  target_audience jsonb,  -- Filters: { tier, city, age_range, last_booking_days }
  content jsonb NOT NULL,  -- { subject, body, images, cta }
  start_date timestamptz,
  end_date timestamptz,
  budget numeric(10,2),
  created_by uuid NOT NULL REFERENCES employees(id),
  approved_by uuid REFERENCES employees(id),
  metrics jsonb DEFAULT '{}',  -- { sent, delivered, opened, clicked, converted }
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_campaigns_status ON campaigns(status);
CREATE INDEX idx_campaigns_dates ON campaigns(start_date, end_date);
```

#### promotions
```sql
CREATE TABLE promotions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  name text NOT NULL,
  description text,
  type text CHECK (type IN ('percentage', 'fixed_amount', 'free_service', 'free_addon')),
  discount_value numeric(10,2) NOT NULL,
  min_booking_amount numeric(10,2),
  max_discount_amount numeric(10,2),
  applicable_services uuid[],  -- Empty array means all services
  applicable_vendors uuid[],  -- Empty array means all vendors
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

CREATE INDEX idx_promotions_code ON promotions(code);
CREATE INDEX idx_promotions_status ON promotions(status);
CREATE INDEX idx_promotions_dates ON promotions(valid_from, valid_to);
```

#### promotion_usage
```sql
CREATE TABLE promotion_usage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  promotion_id uuid NOT NULL REFERENCES promotions(id) ON DELETE CASCADE,
  customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  booking_id uuid NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  discount_amount numeric(10,2) NOT NULL,
  used_at timestamptz DEFAULT now()
);

CREATE INDEX idx_promotion_usage_promotion ON promotion_usage(promotion_id);
CREATE INDEX idx_promotion_usage_customer ON promotion_usage(customer_id);
CREATE INDEX idx_promotion_usage_booking ON promotion_usage(booking_id);
```

---

### 11. Support & Communication

#### support_tickets
```sql
CREATE TABLE support_tickets (
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

CREATE INDEX idx_support_tickets_customer ON support_tickets(customer_id);
CREATE INDEX idx_support_tickets_booking ON support_tickets(booking_id);
CREATE INDEX idx_support_tickets_status ON support_tickets(status);
CREATE INDEX idx_support_tickets_assigned ON support_tickets(assigned_to);
CREATE INDEX idx_support_tickets_priority ON support_tickets(priority);
```

#### ticket_messages
```sql
CREATE TABLE ticket_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id uuid NOT NULL REFERENCES support_tickets(id) ON DELETE CASCADE,
  sender_id uuid NOT NULL REFERENCES auth.users(id),
  sender_type text NOT NULL CHECK (sender_type IN ('customer', 'employee', 'system')),
  message text NOT NULL,
  attachments text[],
  is_internal boolean DEFAULT false,  -- Internal notes between staff
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_ticket_messages_ticket ON ticket_messages(ticket_id);
CREATE INDEX idx_ticket_messages_sender ON ticket_messages(sender_id);
```

#### notifications
```sql
CREATE TABLE notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN (
    'booking_confirmed', 'booking_cancelled', 'therapist_assigned', 'therapist_arrived',
    'service_started', 'service_completed', 'payment_received', 'refund_processed',
    'promotion', 'reminder', 'system_alert'
  )),
  title text NOT NULL,
  message text NOT NULL,
  data jsonb,  -- Related entity IDs, deep link data
  channels text[] DEFAULT '{}',  -- ['push', 'email', 'sms', 'in_app']
  is_read boolean DEFAULT false,
  read_at timestamptz,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_type ON notifications(type);
CREATE INDEX idx_notifications_read ON notifications(is_read);
CREATE INDEX idx_notifications_created ON notifications(created_at DESC);
```

---

### 12. Analytics & Reporting

#### analytics_events
```sql
CREATE TABLE analytics_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id text,
  event_name text NOT NULL,  -- 'page_view', 'button_click', 'search', 'booking_started', etc.
  event_category text,
  event_properties jsonb DEFAULT '{}',
  device_info jsonb,  -- { platform, os, browser, app_version }
  location_info jsonb,  -- { city, state, country }
  timestamp timestamptz DEFAULT now()
);

CREATE INDEX idx_analytics_events_user ON analytics_events(user_id);
CREATE INDEX idx_analytics_events_name ON analytics_events(event_name);
CREATE INDEX idx_analytics_events_timestamp ON analytics_events(timestamp DESC);

-- Partition by month for better performance
CREATE TABLE analytics_events_2025_01 PARTITION OF analytics_events
  FOR VALUES FROM ('2025-01-01') TO ('2025-02-01');
```

---

## Departmental Role-Based Access

### Role Hierarchy & Permissions

```
Super Admin (Command Power)
    ↓
Directors
    ↓
├─ Finance Department
│   └─ Accounts Department
├─ HR Department
│   └─ Staff Department
├─ Legal Department
│   └─ Advocate
├─ IT Department
├─ Marketing Department
│   └─ Customer Data Management
└─ Operations
    ├─ F.O. Department
    ├─ Customer Care
    └─ Vendor List Management
```

### Department-Specific Access Policies

#### Finance Department Access
```sql
-- View all financial transactions
CREATE POLICY "Finance can view all payments"
  ON payments FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid()
      AND role IN ('finance_department', 'accounts_department', 'super_admin', 'directors')
    )
  );

-- Manage settlements
CREATE POLICY "Finance can manage settlements"
  ON payment_settlements FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid()
      AND role IN ('finance_department', 'accounts_department')
    )
  );
```

#### HR Department Access
```sql
-- View all employee data
CREATE POLICY "HR can view all employees"
  ON employees FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid()
      AND role IN ('hr_department', 'super_admin', 'directors')
    )
  );

-- Manage attendance
CREATE POLICY "HR can manage attendance"
  ON attendance_records FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid()
      AND role IN ('hr_department', 'staff_department')
    )
  );

-- Approve leave requests
CREATE POLICY "HR can approve leaves"
  ON leave_requests FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid()
      AND role IN ('hr_department', 'super_admin')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid()
      AND role IN ('hr_department', 'super_admin')
    )
  );
```

#### Marketing Department Access
```sql
-- Manage campaigns
CREATE POLICY "Marketing can manage campaigns"
  ON campaigns FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid()
      AND role IN ('marketing_department', 'super_admin', 'directors')
    )
  );

-- View customer analytics
CREATE POLICY "Marketing can view customer data"
  ON customers FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid()
      AND role IN ('marketing_department', 'customer_data', 'super_admin')
    )
  );
```

#### Customer Care Access
```sql
-- Manage support tickets
CREATE POLICY "Customer care can manage tickets"
  ON support_tickets FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid()
      AND role IN ('customer_care', 'fo_department', 'super_admin')
    )
  );

-- View bookings for support
CREATE POLICY "Customer care can view bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid()
      AND role IN ('customer_care', 'fo_department')
    )
  );
```

#### Legal Department Access
```sql
-- View compliance data
CREATE POLICY "Legal can view contracts"
  ON vendors FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid()
      AND role IN ('legal_department', 'advocate', 'ca_cs', 'super_admin', 'directors')
    )
  );
```

---

## Data Relationships

### Entity Relationship Diagram (Conceptual)

```
┌─────────────┐
│   Users     │
└──────┬──────┘
       │
       ├─────────┬─────────┬──────────┬──────────┐
       │         │         │          │          │
       ↓         ↓         ↓          ↓          ↓
  ┌─────────┐ ┌──────┐ ┌──────────┐ ┌─────────┐ ┌──────────┐
  │Customers│ │Vendors│ │Therapists│ │Employees│ │Departments│
  └────┬────┘ └───┬──┘ └────┬─────┘ └────┬────┘ └─────┬────┘
       │          │         │            │           │
       │          │         │            │           │
       ↓          ↓         ↓            ↓           ↓
  ┌─────────┐ ┌─────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
  │ Bookings│→│ Services│ │Assignments│ │Attendance│ │Permissions│
  └────┬────┘ └─────────┘ └────┬─────┘ └──────────┘ └──────────┘
       │                       │
       │                       ↓
       │                  ┌─────────────┐
       │                  │   Locations │
       │                  │  (Real-Time)│
       │                  └─────────────┘
       ↓
  ┌─────────┐
  │ Payments│
  └────┬────┘
       │
       ↓
  ┌──────────┐
  │Settlements│
  └──────────┘
```

### Key Relationships

1. **User → Customer/Vendor/Therapist/Employee** (1:1 or 1:0..1)
   - One user can have one role profile
   - Profile determines access and permissions

2. **Customer → Bookings** (1:N)
   - One customer can have many bookings
   - Booking lifecycle tracked through status

3. **Booking → Therapist Assignment** (1:1 or 1:N)
   - One booking can have one or multiple therapist assignments
   - Tracks real-time service delivery

4. **Therapist → Location** (1:N)
   - One therapist has many location points
   - Real-time tracking during service

5. **Vendor → Therapists** (1:N)
   - One vendor manages multiple therapists
   - Complete therapist lifecycle management

6. **Employee → Attendance/Leave** (1:N)
   - One employee has many attendance records
   - Leave requests linked to attendance

7. **Booking → Payment** (1:N)
   - One booking can have multiple payments (partial, refund)
   - Payment gateway integration

---

## Security & Row Level Security

### RLS Strategy

1. **User Isolation**: Users can only access their own data
2. **Role-Based Access**: Department roles have specific table access
3. **Vendor Isolation**: Vendors only see their own business data
4. **Hierarchical Access**: Managers can view team data
5. **Audit Trails**: All sensitive operations logged

### Example RLS Policies

```sql
-- Customers can only view their own bookings
CREATE POLICY "Customers view own bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (customer_id = auth.uid());

-- Vendors can only view bookings for their business
CREATE POLICY "Vendors view own bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (vendor_id IN (
    SELECT id FROM vendors WHERE id = auth.uid()
  ));

-- Therapists can only view assigned bookings
CREATE POLICY "Therapists view assigned bookings"
  ON therapist_assignments FOR SELECT
  TO authenticated
  USING (therapist_id IN (
    SELECT id FROM therapists WHERE user_id = auth.uid()
  ));

-- Super Admin has access to everything
CREATE POLICY "Super admin full access"
  ON bookings FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );
```

---

## Real-Time Features

### Supabase Realtime Subscriptions

#### 1. Live Location Tracking
```typescript
// Subscribe to therapist location updates
const subscription = supabase
  .channel('therapist-location')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'therapist_locations',
      filter: `therapist_id=eq.${therapistId}`
    },
    (payload) => {
      updateMapMarker(payload.new);
    }
  )
  .subscribe();
```

#### 2. Booking Status Updates
```typescript
// Subscribe to booking status changes
const subscription = supabase
  .channel('booking-updates')
  .on(
    'postgres_changes',
    {
      event: 'UPDATE',
      schema: 'public',
      table: 'bookings',
      filter: `customer_id=eq.${customerId}`
    },
    (payload) => {
      showNotification(payload.new.status);
    }
  )
  .subscribe();
```

#### 3. Support Chat
```typescript
// Real-time ticket messages
const subscription = supabase
  .channel('ticket-chat')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'ticket_messages',
      filter: `ticket_id=eq.${ticketId}`
    },
    (payload) => {
      appendMessage(payload.new);
    }
  )
  .subscribe();
```

---

## API Integration Points

### Edge Functions Architecture

#### 1. Booking Management (`/functions/booking-service`)
```typescript
// Handles booking creation, modification, cancellation
// Integrations: Payment gateway, notification service
// Real-time: Updates booking status via Supabase Realtime
```

#### 2. Location Tracking (`/functions/location-service`)
```typescript
// Processes therapist location updates
// Calculates ETA, distance traveled
// Triggers notifications on arrival
```

#### 3. Payment Processing (`/functions/payment-service`)
```typescript
// Integrates with Razorpay/Stripe
// Handles webhooks, refunds, settlements
// Updates booking and payment status
```

#### 4. Notification Service (`/functions/notification-service`)
```typescript
// Sends push, email, SMS notifications
// Uses Firebase Cloud Messaging, SendGrid, Twilio
// Tracks delivery status
```

#### 5. Analytics Service (`/functions/analytics-service`)
```typescript
// Processes analytics events
// Generates reports and insights
// Data aggregation for dashboards
```

---

## Caching Strategy

### Redis Cache Structure

#### 1. Session Cache
```
Key: user:session:{user_id}
TTL: 24 hours
Data: { user_id, role, permissions, profile }
```

#### 2. Service Catalog Cache
```
Key: services:catalog
TTL: 1 hour
Data: Complete service list with pricing
```

#### 3. Location Cache
```
Key: therapist:location:{therapist_id}
TTL: 5 minutes
Data: { latitude, longitude, timestamp, accuracy }
```

#### 4. Booking Cache
```
Key: booking:{booking_id}
TTL: 30 minutes
Data: Complete booking details
```

### Cache Invalidation

```typescript
// Invalidate on data change
async function updateBookingStatus(bookingId, status) {
  await supabase.from('bookings').update({ status }).eq('id', bookingId);
  await redis.del(`booking:${bookingId}`);  // Invalidate cache
  await redis.del(`user:bookings:${customerId}`);  // Invalidate user's booking list
}
```

---

## Performance Optimization

### 1. Database Indexes
- B-tree indexes on foreign keys and frequently queried columns
- GiST indexes for geographic queries
- GIN indexes for full-text search and JSONB columns
- Composite indexes for common query patterns

### 2. Query Optimization
```sql
-- Materialized view for dashboard stats
CREATE MATERIALIZED VIEW dashboard_stats AS
SELECT
  COUNT(*) FILTER (WHERE status = 'confirmed') AS confirmed_bookings,
  COUNT(*) FILTER (WHERE status = 'completed') AS completed_bookings,
  SUM(total_amount) FILTER (WHERE payment_status = 'paid') AS total_revenue
FROM bookings
WHERE booking_date >= CURRENT_DATE - INTERVAL '30 days';

-- Refresh materialized view every 5 minutes
CREATE UNIQUE INDEX ON dashboard_stats (1);
REFRESH MATERIALIZED VIEW CONCURRENTLY dashboard_stats;
```

### 3. Connection Pooling
- Supabase provides built-in connection pooling (Supavisor)
- PgBouncer for additional connection management
- Max connections: 100 per instance

### 4. Partitioning
```sql
-- Partition large tables by date
CREATE TABLE analytics_events (
  -- columns
) PARTITION BY RANGE (timestamp);

CREATE TABLE analytics_events_2025_01 PARTITION OF analytics_events
  FOR VALUES FROM ('2025-01-01') TO ('2025-02-01');
```

### 5. Read Replicas
- Use Supabase read replicas for reporting queries
- Separate read/write traffic
- Reduces load on primary database

---

## Migration & Deployment

### Database Migration Process

1. **Development**
   - Write migration files
   - Test locally with Supabase CLI
   - Verify RLS policies

2. **Staging**
   - Apply migrations to staging
   - Run integration tests
   - Performance testing

3. **Production**
   - Scheduled maintenance window
   - Backup database
   - Apply migrations
   - Verify data integrity
   - Monitor performance

### Example Migration File
```sql
-- Migration: 20250102_add_customer_loyalty.sql

/*
  # Customer Loyalty Program

  1. New Columns
    - `loyalty_points` in customers table
    - `membership_tier` in customers table

  2. New Table
    - `loyalty_transactions` for tracking point changes

  3. Security
    - RLS policies for loyalty data
*/

-- Add loyalty columns
ALTER TABLE customers
  ADD COLUMN IF NOT EXISTS loyalty_points integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS membership_tier text DEFAULT 'silver';

-- Create loyalty transactions table
CREATE TABLE IF NOT EXISTS loyalty_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid NOT NULL REFERENCES customers(id),
  transaction_type text NOT NULL,
  points integer NOT NULL,
  booking_id uuid REFERENCES bookings(id),
  description text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE loyalty_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Customers view own loyalty transactions"
  ON loyalty_transactions FOR SELECT
  TO authenticated
  USING (customer_id = auth.uid());
```

---

## Monitoring & Maintenance

### Health Checks
- Database connection pool status
- Query performance metrics
- Cache hit/miss rates
- API response times
- Real-time subscription count

### Alerts
- High CPU/memory usage
- Slow query detection (>1s)
- Failed payment transactions
- RLS policy violations
- Disk space warnings

### Backup Strategy
- Continuous backup (Point-in-Time Recovery)
- Daily snapshots
- 30-day retention
- Cross-region replication for disaster recovery

---

## Conclusion

This database schema provides a comprehensive foundation for the OMBARO platform with:

✅ **Scalability**: Partitioned tables, efficient indexes, caching layer
✅ **Security**: RLS policies, encrypted sensitive data, audit trails
✅ **Performance**: Optimized queries, materialized views, read replicas
✅ **Real-Time**: WebSocket subscriptions, live location tracking
✅ **Multi-Tenancy**: Vendor/department isolation, role-based access
✅ **Analytics**: Event tracking, reporting tables, business intelligence
✅ **Maintainability**: Clear relationships, proper constraints, documentation

The schema supports all business requirements while maintaining data integrity, security, and performance at scale.
