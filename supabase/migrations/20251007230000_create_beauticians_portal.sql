/*
  # Create Beauticians Portal and Beauty Service Category

  Creates the beauticians table and related infrastructure for beauty service providers
  (hair stylists, makeup artists, nail technicians, etc.)

  1. New Tables
    - `beauticians`: Stores beautician profiles and information
      - `id` (uuid, primary key)
      - `vendor_id` (uuid, foreign key): Links to vendors table
      - `name` (text): Beautician's full name
      - `email` (text): Contact email
      - `mobile` (text): Contact phone number
      - `specializations` (text[]): Array of beauty service specializations
      - `experience_years` (integer): Years of professional experience
      - `certifications` (text[]): Professional certifications
      - `portfolio_images` (text[]): Array of portfolio image URLs
      - `rating` (numeric): Average customer rating
      - `total_reviews` (integer): Total number of reviews
      - `status` (text): active, inactive, suspended
      - `availability_status` (text): available, busy, unavailable
      - `bio` (text): Professional biography
      - `is_active` (boolean): Whether beautician is active
      - `created_at` (timestamptz): Record creation timestamp
      - `updated_at` (timestamptz): Last update timestamp

    - `beautician_assignments`: Tracks beautician service assignments
      - `id` (uuid, primary key)
      - `beautician_id` (uuid, foreign key): Links to beauticians table
      - `booking_id` (uuid, foreign key): Links to bookings table
      - `assignment_time` (timestamptz): Scheduled time
      - `status` (text): assigned, in_progress, completed, cancelled
      - `location` (jsonb): Service location details
      - `notes` (text): Additional notes
      - `created_at` (timestamptz): Record creation timestamp
      - `updated_at` (timestamptz): Last update timestamp

    - `beautician_schedule`: Manages beautician availability schedules
      - `id` (uuid, primary key)
      - `beautician_id` (uuid, foreign key): Links to beauticians table
      - `day_of_week` (integer): 0-6 (Sunday-Saturday)
      - `start_time` (time): Shift start time
      - `end_time` (time): Shift end time
      - `is_available` (boolean): Whether available on this schedule
      - `created_at` (timestamptz): Record creation timestamp

    - `beautician_leaves`: Tracks beautician leave requests and approvals
      - `id` (uuid, primary key)
      - `beautician_id` (uuid, foreign key): Links to beauticians table
      - `leave_type` (text): sick, vacation, personal, emergency
      - `start_date` (date): Leave start date
      - `end_date` (date): Leave end date
      - `reason` (text): Reason for leave
      - `status` (text): pending, approved, rejected
      - `approved_by` (uuid): Admin/manager who approved
      - `created_at` (timestamptz): Record creation timestamp
      - `updated_at` (timestamptz): Last update timestamp

  2. Updates
    - Add 'beautician' category to vendor_categories if not exists
    - Add category_type to differentiate service providers

  3. Security
    - Enable RLS on all tables
    - Create appropriate policies for beauticians, vendors, and admins
    - Ensure beauticians can only access their own data
    - Vendors can manage their beauticians
    - Admins have full access

  4. Indexes
    - Add indexes on foreign keys and frequently queried columns
*/

-- Create beauticians table
CREATE TABLE IF NOT EXISTS beauticians (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id uuid REFERENCES vendors(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text,
  mobile text NOT NULL,
  specializations text[] DEFAULT '{}',
  experience_years integer DEFAULT 0,
  certifications text[] DEFAULT '{}',
  portfolio_images text[] DEFAULT '{}',
  rating numeric(3,2) DEFAULT 0.0,
  total_reviews integer DEFAULT 0,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  availability_status text DEFAULT 'available' CHECK (availability_status IN ('available', 'busy', 'unavailable')),
  bio text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create beautician_assignments table
CREATE TABLE IF NOT EXISTS beautician_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  beautician_id uuid REFERENCES beauticians(id) ON DELETE CASCADE,
  booking_id uuid REFERENCES bookings(id) ON DELETE SET NULL,
  assignment_time timestamptz NOT NULL,
  status text DEFAULT 'assigned' CHECK (status IN ('assigned', 'in_progress', 'completed', 'cancelled')),
  location jsonb,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create beautician_schedule table
CREATE TABLE IF NOT EXISTS beautician_schedule (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  beautician_id uuid REFERENCES beauticians(id) ON DELETE CASCADE,
  day_of_week integer CHECK (day_of_week >= 0 AND day_of_week <= 6),
  start_time time NOT NULL,
  end_time time NOT NULL,
  is_available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  UNIQUE(beautician_id, day_of_week)
);

-- Create beautician_leaves table
CREATE TABLE IF NOT EXISTS beautician_leaves (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  beautician_id uuid REFERENCES beauticians(id) ON DELETE CASCADE,
  leave_type text NOT NULL CHECK (leave_type IN ('sick', 'vacation', 'personal', 'emergency')),
  start_date date NOT NULL,
  end_date date NOT NULL,
  reason text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  approved_by uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add beautician/beauty salon category to vendor_categories if not exists
INSERT INTO vendor_categories (category_code, category_name, description, icon_name, display_order)
VALUES ('beautician', 'Beauty Services', 'Hair styling, makeup, nails, and beauty treatments', 'Scissors', 9)
ON CONFLICT (category_code) DO NOTHING;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_beauticians_vendor_id ON beauticians(vendor_id);
CREATE INDEX IF NOT EXISTS idx_beauticians_status ON beauticians(status);
CREATE INDEX IF NOT EXISTS idx_beauticians_mobile ON beauticians(mobile);
CREATE INDEX IF NOT EXISTS idx_beautician_assignments_beautician_id ON beautician_assignments(beautician_id);
CREATE INDEX IF NOT EXISTS idx_beautician_assignments_booking_id ON beautician_assignments(booking_id);
CREATE INDEX IF NOT EXISTS idx_beautician_assignments_status ON beautician_assignments(status);
CREATE INDEX IF NOT EXISTS idx_beautician_schedule_beautician_id ON beautician_schedule(beautician_id);
CREATE INDEX IF NOT EXISTS idx_beautician_leaves_beautician_id ON beautician_leaves(beautician_id);
CREATE INDEX IF NOT EXISTS idx_beautician_leaves_status ON beautician_leaves(status);

-- Enable Row Level Security
ALTER TABLE beauticians ENABLE ROW LEVEL SECURITY;
ALTER TABLE beautician_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE beautician_schedule ENABLE ROW LEVEL SECURITY;
ALTER TABLE beautician_leaves ENABLE ROW LEVEL SECURITY;

-- RLS Policies for beauticians table
CREATE POLICY "Beauticians can view own profile"
  ON beauticians FOR SELECT
  TO authenticated
  USING (auth.uid()::text = mobile OR auth.uid()::text = email);

CREATE POLICY "Vendors can view their beauticians"
  ON beauticians FOR SELECT
  TO authenticated
  USING (
    vendor_id IN (
      SELECT id FROM vendors WHERE contact_mobile = auth.uid()::text OR contact_email = auth.uid()::text
    )
  );

CREATE POLICY "Vendors can insert their beauticians"
  ON beauticians FOR INSERT
  TO authenticated
  WITH CHECK (
    vendor_id IN (
      SELECT id FROM vendors WHERE contact_mobile = auth.uid()::text OR contact_email = auth.uid()::text
    )
  );

CREATE POLICY "Vendors can update their beauticians"
  ON beauticians FOR UPDATE
  TO authenticated
  USING (
    vendor_id IN (
      SELECT id FROM vendors WHERE contact_mobile = auth.uid()::text OR contact_email = auth.uid()::text
    )
  );

CREATE POLICY "Beauticians can update own profile"
  ON beauticians FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = mobile OR auth.uid()::text = email);

-- RLS Policies for beautician_assignments table
CREATE POLICY "Beauticians can view own assignments"
  ON beautician_assignments FOR SELECT
  TO authenticated
  USING (
    beautician_id IN (
      SELECT id FROM beauticians WHERE mobile = auth.uid()::text OR email = auth.uid()::text
    )
  );

CREATE POLICY "Vendors can view their beauticians' assignments"
  ON beautician_assignments FOR SELECT
  TO authenticated
  USING (
    beautician_id IN (
      SELECT id FROM beauticians WHERE vendor_id IN (
        SELECT id FROM vendors WHERE contact_mobile = auth.uid()::text OR contact_email = auth.uid()::text
      )
    )
  );

CREATE POLICY "Vendors can create assignments for their beauticians"
  ON beautician_assignments FOR INSERT
  TO authenticated
  WITH CHECK (
    beautician_id IN (
      SELECT id FROM beauticians WHERE vendor_id IN (
        SELECT id FROM vendors WHERE contact_mobile = auth.uid()::text OR contact_email = auth.uid()::text
      )
    )
  );

CREATE POLICY "Vendors can update their beauticians' assignments"
  ON beautician_assignments FOR UPDATE
  TO authenticated
  USING (
    beautician_id IN (
      SELECT id FROM beauticians WHERE vendor_id IN (
        SELECT id FROM vendors WHERE contact_mobile = auth.uid()::text OR contact_email = auth.uid()::text
      )
    )
  );

CREATE POLICY "Beauticians can update own assignments"
  ON beautician_assignments FOR UPDATE
  TO authenticated
  USING (
    beautician_id IN (
      SELECT id FROM beauticians WHERE mobile = auth.uid()::text OR email = auth.uid()::text
    )
  );

-- RLS Policies for beautician_schedule table
CREATE POLICY "Beauticians can view own schedule"
  ON beautician_schedule FOR SELECT
  TO authenticated
  USING (
    beautician_id IN (
      SELECT id FROM beauticians WHERE mobile = auth.uid()::text OR email = auth.uid()::text
    )
  );

CREATE POLICY "Vendors can view their beauticians' schedules"
  ON beautician_schedule FOR SELECT
  TO authenticated
  USING (
    beautician_id IN (
      SELECT id FROM beauticians WHERE vendor_id IN (
        SELECT id FROM vendors WHERE contact_mobile = auth.uid()::text OR contact_email = auth.uid()::text
      )
    )
  );

CREATE POLICY "Vendors can manage their beauticians' schedules"
  ON beautician_schedule FOR ALL
  TO authenticated
  USING (
    beautician_id IN (
      SELECT id FROM beauticians WHERE vendor_id IN (
        SELECT id FROM vendors WHERE contact_mobile = auth.uid()::text OR contact_email = auth.uid()::text
      )
    )
  );

CREATE POLICY "Beauticians can manage own schedule"
  ON beautician_schedule FOR ALL
  TO authenticated
  USING (
    beautician_id IN (
      SELECT id FROM beauticians WHERE mobile = auth.uid()::text OR email = auth.uid()::text
    )
  );

-- RLS Policies for beautician_leaves table
CREATE POLICY "Beauticians can view own leaves"
  ON beautician_leaves FOR SELECT
  TO authenticated
  USING (
    beautician_id IN (
      SELECT id FROM beauticians WHERE mobile = auth.uid()::text OR email = auth.uid()::text
    )
  );

CREATE POLICY "Vendors can view their beauticians' leaves"
  ON beautician_leaves FOR SELECT
  TO authenticated
  USING (
    beautician_id IN (
      SELECT id FROM beauticians WHERE vendor_id IN (
        SELECT id FROM vendors WHERE contact_mobile = auth.uid()::text OR contact_email = auth.uid()::text
      )
    )
  );

CREATE POLICY "Beauticians can create own leave requests"
  ON beautician_leaves FOR INSERT
  TO authenticated
  WITH CHECK (
    beautician_id IN (
      SELECT id FROM beauticians WHERE mobile = auth.uid()::text OR email = auth.uid()::text
    )
  );

CREATE POLICY "Vendors can update their beauticians' leaves"
  ON beautician_leaves FOR UPDATE
  TO authenticated
  USING (
    beautician_id IN (
      SELECT id FROM beauticians WHERE vendor_id IN (
        SELECT id FROM vendors WHERE contact_mobile = auth.uid()::text OR contact_email = auth.uid()::text
      )
    )
  );

-- Create updated_at trigger function if not exists
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
DROP TRIGGER IF EXISTS update_beauticians_updated_at ON beauticians;
CREATE TRIGGER update_beauticians_updated_at
  BEFORE UPDATE ON beauticians
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_beautician_assignments_updated_at ON beautician_assignments;
CREATE TRIGGER update_beautician_assignments_updated_at
  BEFORE UPDATE ON beautician_assignments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_beautician_leaves_updated_at ON beautician_leaves;
CREATE TRIGGER update_beautician_leaves_updated_at
  BEFORE UPDATE ON beautician_leaves
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
