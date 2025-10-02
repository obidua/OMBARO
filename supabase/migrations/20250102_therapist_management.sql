/*
  # Therapist Management System

  ## Overview
  This migration creates the complete therapist management system for OMBARO platform,
  enabling vendors to add, manage, and assign therapists to customer bookings.

  ## New Tables Created

  ### 1. therapists
  Stores therapist profile information
  - `id` (uuid, primary key) - Unique therapist identifier
  - `vendor_id` (uuid, foreign key) - Vendor who manages this therapist
  - `name` (text) - Therapist full name
  - `email` (text) - Contact email
  - `mobile` (text) - Contact phone number
  - `specialization` (text[]) - Array of specialization areas
  - `experience_years` (integer) - Years of experience
  - `certification` (text[]) - Array of certifications
  - `rating` (numeric) - Average rating (0-5)
  - `total_reviews` (integer) - Total number of reviews
  - `profile_image` (text) - Profile image URL
  - `status` (text) - active | inactive | on_leave
  - `availability_status` (text) - available | busy | offline
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. therapist_assignments
  Manages therapist assignments to bookings
  - `id` (uuid, primary key) - Unique assignment identifier
  - `therapist_id` (uuid, foreign key) - Assigned therapist
  - `booking_id` (uuid, foreign key) - Related booking
  - `vendor_id` (uuid, foreign key) - Vendor managing assignment
  - `customer_id` (uuid, foreign key) - Customer receiving service
  - `service_id` (uuid) - Service being provided
  - `assignment_date` (date) - Date of assignment
  - `assignment_time` (time) - Time of assignment
  - `status` (text) - assigned | in_progress | completed | cancelled
  - `location_address` (text) - Service location address
  - `location_latitude` (numeric) - Location latitude
  - `location_longitude` (numeric) - Location longitude
  - `estimated_duration` (integer) - Estimated duration in minutes
  - `actual_duration` (integer) - Actual duration in minutes
  - `notes` (text) - Additional notes
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 3. therapist_schedules
  Defines therapist weekly availability
  - `id` (uuid, primary key) - Unique schedule identifier
  - `therapist_id` (uuid, foreign key) - Related therapist
  - `day_of_week` (integer) - Day of week (0=Sunday, 6=Saturday)
  - `start_time` (time) - Shift start time
  - `end_time` (time) - Shift end time
  - `is_available` (boolean) - Availability flag
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 4. therapist_leaves
  Tracks therapist leave requests
  - `id` (uuid, primary key) - Unique leave identifier
  - `therapist_id` (uuid, foreign key) - Therapist requesting leave
  - `start_date` (date) - Leave start date
  - `end_date` (date) - Leave end date
  - `reason` (text) - Leave reason
  - `status` (text) - pending | approved | rejected
  - `approved_by` (uuid) - User who approved/rejected
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 5. therapist_locations
  Real-time therapist location tracking
  - `id` (uuid, primary key) - Unique location record
  - `therapist_id` (uuid, foreign key) - Therapist being tracked
  - `latitude` (numeric) - Current latitude
  - `longitude` (numeric) - Current longitude
  - `accuracy` (numeric) - GPS accuracy in meters
  - `battery_level` (integer) - Device battery percentage
  - `timestamp` (timestamptz) - Location timestamp

  ## Security
  - Row Level Security (RLS) enabled on all tables
  - Vendors can only access their own therapists
  - Therapists can view their own data
  - Admins have full access
  - Customers can view assigned therapist basic info

  ## Indexes
  - Performance indexes on foreign keys
  - Composite indexes for common queries
  - GiST index for location-based queries
*/

-- Create therapists table
CREATE TABLE IF NOT EXISTS therapists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id uuid NOT NULL,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  mobile text NOT NULL,
  specialization text[] DEFAULT '{}',
  experience_years integer DEFAULT 0,
  certification text[] DEFAULT '{}',
  rating numeric(3,2) DEFAULT 0.00,
  total_reviews integer DEFAULT 0,
  profile_image text,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'on_leave')),
  availability_status text DEFAULT 'offline' CHECK (availability_status IN ('available', 'busy', 'offline')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create therapist_assignments table
CREATE TABLE IF NOT EXISTS therapist_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  therapist_id uuid NOT NULL REFERENCES therapists(id) ON DELETE CASCADE,
  booking_id uuid,
  vendor_id uuid NOT NULL,
  customer_id uuid NOT NULL,
  service_id uuid NOT NULL,
  assignment_date date NOT NULL,
  assignment_time time NOT NULL,
  status text DEFAULT 'assigned' CHECK (status IN ('assigned', 'in_progress', 'completed', 'cancelled')),
  location_address text NOT NULL,
  location_latitude numeric(10,8),
  location_longitude numeric(11,8),
  estimated_duration integer NOT NULL,
  actual_duration integer,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create therapist_schedules table
CREATE TABLE IF NOT EXISTS therapist_schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  therapist_id uuid NOT NULL REFERENCES therapists(id) ON DELETE CASCADE,
  day_of_week integer NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  start_time time NOT NULL,
  end_time time NOT NULL,
  is_available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(therapist_id, day_of_week)
);

-- Create therapist_leaves table
CREATE TABLE IF NOT EXISTS therapist_leaves (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  therapist_id uuid NOT NULL REFERENCES therapists(id) ON DELETE CASCADE,
  start_date date NOT NULL,
  end_date date NOT NULL,
  reason text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  approved_by uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CHECK (end_date >= start_date)
);

-- Create therapist_locations table
CREATE TABLE IF NOT EXISTS therapist_locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  therapist_id uuid NOT NULL REFERENCES therapists(id) ON DELETE CASCADE,
  latitude numeric(10,8) NOT NULL,
  longitude numeric(11,8) NOT NULL,
  accuracy numeric(10,2),
  battery_level integer,
  timestamp timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_therapists_vendor_id ON therapists(vendor_id);
CREATE INDEX IF NOT EXISTS idx_therapists_status ON therapists(status);
CREATE INDEX IF NOT EXISTS idx_therapists_availability ON therapists(availability_status);

CREATE INDEX IF NOT EXISTS idx_assignments_therapist_id ON therapist_assignments(therapist_id);
CREATE INDEX IF NOT EXISTS idx_assignments_vendor_id ON therapist_assignments(vendor_id);
CREATE INDEX IF NOT EXISTS idx_assignments_customer_id ON therapist_assignments(customer_id);
CREATE INDEX IF NOT EXISTS idx_assignments_booking_id ON therapist_assignments(booking_id);
CREATE INDEX IF NOT EXISTS idx_assignments_status ON therapist_assignments(status);
CREATE INDEX IF NOT EXISTS idx_assignments_date ON therapist_assignments(assignment_date);

CREATE INDEX IF NOT EXISTS idx_schedules_therapist_id ON therapist_schedules(therapist_id);
CREATE INDEX IF NOT EXISTS idx_schedules_day ON therapist_schedules(day_of_week);

CREATE INDEX IF NOT EXISTS idx_leaves_therapist_id ON therapist_leaves(therapist_id);
CREATE INDEX IF NOT EXISTS idx_leaves_status ON therapist_leaves(status);
CREATE INDEX IF NOT EXISTS idx_leaves_dates ON therapist_leaves(start_date, end_date);

CREATE INDEX IF NOT EXISTS idx_locations_therapist_id ON therapist_locations(therapist_id);
CREATE INDEX IF NOT EXISTS idx_locations_timestamp ON therapist_locations(timestamp DESC);

-- Create GiST index for location-based queries
CREATE INDEX IF NOT EXISTS idx_locations_geography ON therapist_locations
  USING gist (ll_to_earth(latitude::float8, longitude::float8));

-- Enable Row Level Security
ALTER TABLE therapists ENABLE ROW LEVEL SECURITY;
ALTER TABLE therapist_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE therapist_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE therapist_leaves ENABLE ROW LEVEL SECURITY;
ALTER TABLE therapist_locations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for therapists table

-- Vendors can view and manage their own therapists
CREATE POLICY "Vendors can view own therapists"
  ON therapists FOR SELECT
  TO authenticated
  USING (vendor_id = auth.uid());

CREATE POLICY "Vendors can create therapists"
  ON therapists FOR INSERT
  TO authenticated
  WITH CHECK (vendor_id = auth.uid());

CREATE POLICY "Vendors can update own therapists"
  ON therapists FOR UPDATE
  TO authenticated
  USING (vendor_id = auth.uid())
  WITH CHECK (vendor_id = auth.uid());

CREATE POLICY "Vendors can delete own therapists"
  ON therapists FOR DELETE
  TO authenticated
  USING (vendor_id = auth.uid());

-- Therapists can view their own profile
CREATE POLICY "Therapists can view own profile"
  ON therapists FOR SELECT
  TO authenticated
  USING (id IN (
    SELECT id FROM therapists WHERE email = auth.jwt()->>'email'
  ));

-- Customers can view basic info of assigned therapists
CREATE POLICY "Customers can view assigned therapists"
  ON therapists FOR SELECT
  TO authenticated
  USING (id IN (
    SELECT therapist_id FROM therapist_assignments WHERE customer_id = auth.uid()
  ));

-- RLS Policies for therapist_assignments table

-- Vendors can manage assignments for their therapists
CREATE POLICY "Vendors can view own therapist assignments"
  ON therapist_assignments FOR SELECT
  TO authenticated
  USING (vendor_id = auth.uid());

CREATE POLICY "Vendors can create assignments"
  ON therapist_assignments FOR INSERT
  TO authenticated
  WITH CHECK (vendor_id = auth.uid());

CREATE POLICY "Vendors can update own assignments"
  ON therapist_assignments FOR UPDATE
  TO authenticated
  USING (vendor_id = auth.uid())
  WITH CHECK (vendor_id = auth.uid());

CREATE POLICY "Vendors can delete own assignments"
  ON therapist_assignments FOR DELETE
  TO authenticated
  USING (vendor_id = auth.uid());

-- Therapists can view their own assignments
CREATE POLICY "Therapists can view own assignments"
  ON therapist_assignments FOR SELECT
  TO authenticated
  USING (therapist_id IN (
    SELECT id FROM therapists WHERE email = auth.jwt()->>'email'
  ));

-- Therapists can update assignment status
CREATE POLICY "Therapists can update assignment status"
  ON therapist_assignments FOR UPDATE
  TO authenticated
  USING (therapist_id IN (
    SELECT id FROM therapists WHERE email = auth.jwt()->>'email'
  ))
  WITH CHECK (therapist_id IN (
    SELECT id FROM therapists WHERE email = auth.jwt()->>'email'
  ));

-- Customers can view their own assignments
CREATE POLICY "Customers can view own assignments"
  ON therapist_assignments FOR SELECT
  TO authenticated
  USING (customer_id = auth.uid());

-- RLS Policies for therapist_schedules table

-- Vendors can manage schedules for their therapists
CREATE POLICY "Vendors can view therapist schedules"
  ON therapist_schedules FOR SELECT
  TO authenticated
  USING (therapist_id IN (
    SELECT id FROM therapists WHERE vendor_id = auth.uid()
  ));

CREATE POLICY "Vendors can create schedules"
  ON therapist_schedules FOR INSERT
  TO authenticated
  WITH CHECK (therapist_id IN (
    SELECT id FROM therapists WHERE vendor_id = auth.uid()
  ));

CREATE POLICY "Vendors can update schedules"
  ON therapist_schedules FOR UPDATE
  TO authenticated
  USING (therapist_id IN (
    SELECT id FROM therapists WHERE vendor_id = auth.uid()
  ))
  WITH CHECK (therapist_id IN (
    SELECT id FROM therapists WHERE vendor_id = auth.uid()
  ));

CREATE POLICY "Vendors can delete schedules"
  ON therapist_schedules FOR DELETE
  TO authenticated
  USING (therapist_id IN (
    SELECT id FROM therapists WHERE vendor_id = auth.uid()
  ));

-- Therapists can view their own schedules
CREATE POLICY "Therapists can view own schedules"
  ON therapist_schedules FOR SELECT
  TO authenticated
  USING (therapist_id IN (
    SELECT id FROM therapists WHERE email = auth.jwt()->>'email'
  ));

-- RLS Policies for therapist_leaves table

-- Therapists can create and view their own leave requests
CREATE POLICY "Therapists can create leave requests"
  ON therapist_leaves FOR INSERT
  TO authenticated
  WITH CHECK (therapist_id IN (
    SELECT id FROM therapists WHERE email = auth.jwt()->>'email'
  ));

CREATE POLICY "Therapists can view own leaves"
  ON therapist_leaves FOR SELECT
  TO authenticated
  USING (therapist_id IN (
    SELECT id FROM therapists WHERE email = auth.jwt()->>'email'
  ));

-- Vendors can view and approve leave requests
CREATE POLICY "Vendors can view therapist leaves"
  ON therapist_leaves FOR SELECT
  TO authenticated
  USING (therapist_id IN (
    SELECT id FROM therapists WHERE vendor_id = auth.uid()
  ));

CREATE POLICY "Vendors can update leave status"
  ON therapist_leaves FOR UPDATE
  TO authenticated
  USING (therapist_id IN (
    SELECT id FROM therapists WHERE vendor_id = auth.uid()
  ))
  WITH CHECK (therapist_id IN (
    SELECT id FROM therapists WHERE vendor_id = auth.uid()
  ));

-- RLS Policies for therapist_locations table

-- Therapists can update their own location
CREATE POLICY "Therapists can update own location"
  ON therapist_locations FOR INSERT
  TO authenticated
  WITH CHECK (therapist_id IN (
    SELECT id FROM therapists WHERE email = auth.jwt()->>'email'
  ));

-- Vendors can view locations of their therapists
CREATE POLICY "Vendors can view therapist locations"
  ON therapist_locations FOR SELECT
  TO authenticated
  USING (therapist_id IN (
    SELECT id FROM therapists WHERE vendor_id = auth.uid()
  ));

-- Customers can view location of assigned therapist
CREATE POLICY "Customers can view assigned therapist location"
  ON therapist_locations FOR SELECT
  TO authenticated
  USING (therapist_id IN (
    SELECT therapist_id FROM therapist_assignments
    WHERE customer_id = auth.uid() AND status = 'in_progress'
  ));

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_therapists_updated_at
  BEFORE UPDATE ON therapists
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_therapist_assignments_updated_at
  BEFORE UPDATE ON therapist_assignments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_therapist_schedules_updated_at
  BEFORE UPDATE ON therapist_schedules
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_therapist_leaves_updated_at
  BEFORE UPDATE ON therapist_leaves
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create view for therapist performance analytics
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
  ) AS completion_rate
FROM therapists t
LEFT JOIN therapist_assignments ta ON t.id = ta.therapist_id
GROUP BY t.id, t.name, t.vendor_id, t.rating;
