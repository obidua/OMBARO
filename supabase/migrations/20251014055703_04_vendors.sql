/*
  # Vendors Tables
  
  Creates vendors, documents, services, staff, payouts, reviews, applications, and availability
*/

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

CREATE INDEX idx_vendors_user ON vendors(user_id);
CREATE INDEX idx_vendors_status ON vendors(status);
CREATE INDEX idx_vendors_verification ON vendors(verification_status);
CREATE INDEX idx_vendors_rating ON vendors(rating DESC);

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

CREATE INDEX idx_vendor_documents_vendor ON vendor_documents(vendor_id);

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

CREATE INDEX idx_vendor_services_vendor ON vendor_services(vendor_id);
CREATE INDEX idx_vendor_services_available ON vendor_services(vendor_id, is_available) WHERE is_available;

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

CREATE INDEX idx_vendor_staff_vendor ON vendor_staff(vendor_id);
CREATE INDEX idx_vendor_staff_status ON vendor_staff(status);

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

CREATE INDEX idx_vendor_payouts_vendor ON vendor_payouts(vendor_id);
CREATE INDEX idx_vendor_payouts_period ON vendor_payouts(period_start, period_end);
CREATE INDEX idx_vendor_payouts_status ON vendor_payouts(payout_status);

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

CREATE INDEX idx_vendor_reviews_vendor ON vendor_reviews(vendor_id);
CREATE INDEX idx_vendor_reviews_customer ON vendor_reviews(customer_id);
CREATE INDEX idx_vendor_reviews_rating ON vendor_reviews(rating);

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

CREATE INDEX idx_vendor_applications_user ON vendor_applications(user_id);
CREATE INDEX idx_vendor_applications_status ON vendor_applications(application_status);

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

CREATE INDEX idx_vendor_availability_vendor ON vendor_availability(vendor_id);