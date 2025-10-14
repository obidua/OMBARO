/*
  # Services and Customers Tables
  
  Creates service categories, services, addons, packages, reviews, customers, and loyalty
*/

-- Services Tables
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

CREATE INDEX idx_service_categories_active ON service_categories(is_active, display_order);

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

CREATE INDEX idx_services_category ON services(category_id);
CREATE INDEX idx_services_active ON services(is_active);
CREATE INDEX idx_services_popular ON services(is_popular) WHERE is_popular;
CREATE INDEX idx_services_search ON services USING gin(to_tsvector('english', name || ' ' || COALESCE(description, '')));

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

CREATE INDEX idx_addon_services_active ON addon_services(is_active);

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

CREATE INDEX idx_service_packages_active ON service_packages(is_active);

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

CREATE INDEX idx_reviews_reviewable ON reviews(reviewable_type, reviewable_id);
CREATE INDEX idx_reviews_customer ON reviews(customer_id);
CREATE INDEX idx_reviews_status ON reviews(status);
CREATE INDEX idx_reviews_rating ON reviews(rating);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view approved reviews"
  ON reviews FOR SELECT
  TO authenticated
  USING (status = 'approved');

CREATE POLICY "Customers can create reviews"
  ON reviews FOR INSERT
  TO authenticated
  WITH CHECK (customer_id = auth.uid());

-- Customers Tables
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

CREATE INDEX idx_customers_tier ON customers(membership_tier);
CREATE INDEX idx_customers_referral_code ON customers(referral_code);
CREATE INDEX idx_customers_referred_by ON customers(referred_by);

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

CREATE INDEX idx_customer_addresses_customer ON customer_addresses(customer_id);
CREATE INDEX idx_customer_addresses_default ON customer_addresses(customer_id, is_default) WHERE is_default;

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

CREATE INDEX idx_customer_referrals_referrer ON customer_referrals(referrer_id);
CREATE INDEX idx_customer_referrals_referee ON customer_referrals(referee_id);
CREATE INDEX idx_customer_referrals_code ON customer_referrals(referral_code);

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

CREATE INDEX idx_loyalty_transactions_customer ON loyalty_points_transactions(customer_id);
CREATE INDEX idx_loyalty_transactions_created ON loyalty_points_transactions(created_at DESC);

ALTER TABLE loyalty_points_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Customers can view own transactions"
  ON loyalty_points_transactions FOR SELECT
  TO authenticated
  USING (customer_id = auth.uid());

-- Insert default service categories
INSERT INTO service_categories (name, slug, description, is_active, display_order)
VALUES
  ('Relaxation Massage', 'relaxation-massage', 'Soothing and relaxing massage therapies', true, 1),
  ('Therapeutic Massage', 'therapeutic-massage', 'Targeted treatment for specific conditions', true, 2),
  ('Specialty Treatments', 'specialty-treatments', 'Unique and specialized services', true, 3),
  ('Couples Services', 'couples-services', 'Services for couples', true, 4),
  ('Wellness Packages', 'wellness-packages', 'Complete wellness packages', true, 5)
ON CONFLICT (slug) DO NOTHING;