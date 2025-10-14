/*
  # Therapists Tables
  
  Creates therapists, schedules, leaves, locations, assignments, and performance tracking
*/

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

CREATE INDEX idx_therapists_user ON therapists(user_id);
CREATE INDEX idx_therapists_vendor ON therapists(vendor_id);
CREATE INDEX idx_therapists_status ON therapists(status);
CREATE INDEX idx_therapists_availability ON therapists(availability_status);
CREATE INDEX idx_therapists_rating ON therapists(rating DESC);

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

CREATE INDEX idx_therapist_schedules_therapist ON therapist_schedules(therapist_id);

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

CREATE INDEX idx_therapist_leaves_therapist ON therapist_leaves(therapist_id);
CREATE INDEX idx_therapist_leaves_status ON therapist_leaves(status);
CREATE INDEX idx_therapist_leaves_dates ON therapist_leaves(start_date, end_date);

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

CREATE INDEX idx_therapist_locations_therapist ON therapist_locations(therapist_id);
CREATE INDEX idx_therapist_locations_timestamp ON therapist_locations(timestamp DESC);
CREATE INDEX idx_therapist_locations_booking ON therapist_locations(booking_id) WHERE booking_id IS NOT NULL;

ALTER TABLE therapist_locations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Therapists can insert own location"
  ON therapist_locations FOR INSERT
  TO authenticated
  WITH CHECK (therapist_id IN (SELECT id FROM therapists WHERE user_id = auth.uid()));

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

CREATE INDEX idx_therapist_assignments_booking ON therapist_assignments(booking_id);
CREATE INDEX idx_therapist_assignments_therapist ON therapist_assignments(therapist_id);
CREATE INDEX idx_therapist_assignments_vendor ON therapist_assignments(vendor_id);
CREATE INDEX idx_therapist_assignments_customer ON therapist_assignments(customer_id);
CREATE INDEX idx_therapist_assignments_status ON therapist_assignments(status);
CREATE INDEX idx_therapist_assignments_date ON therapist_assignments(assignment_date, assignment_time);

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

CREATE INDEX idx_therapist_performance_therapist ON therapist_performance(therapist_id);
CREATE INDEX idx_therapist_performance_month ON therapist_performance(month DESC);

ALTER TABLE therapist_performance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Therapists can view own performance"
  ON therapist_performance FOR SELECT
  TO authenticated
  USING (therapist_id IN (SELECT id FROM therapists WHERE user_id = auth.uid()));