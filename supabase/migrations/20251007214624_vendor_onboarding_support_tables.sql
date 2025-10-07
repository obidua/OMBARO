/*
  # Vendor Onboarding Support Tables
  
  Creates additional tables to support vendor quick signup and social authentication flows.
  
  1. New Tables
    - `social_auth_providers`: Links user profiles to OAuth providers
    - `otp_verifications`: Stores OTP codes for mobile verification
    - `quick_signup_profiles`: Tracks incomplete vendor profiles from quick signup
  
  2. Schema Updates
    - Add signup_method to user_profiles
    - Add mobile_verified flag to user_profiles
    - Add social_provider to user_profiles
    - Add profile_completed to user_profiles
  
  3. Security
    - Enable RLS on all new tables
    - Add policies for authenticated users to manage their own data
    - Allow anonymous users to create and verify OTPs
*/

-- Add new columns to user_profiles
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_profiles' AND column_name = 'signup_method'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN signup_method text DEFAULT 'standard' CHECK (signup_method IN ('standard', 'quick', 'social'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_profiles' AND column_name = 'mobile_verified'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN mobile_verified boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_profiles' AND column_name = 'social_provider'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN social_provider text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_profiles' AND column_name = 'profile_completed'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN profile_completed boolean DEFAULT true;
  END IF;
END $$;

-- Social auth providers table
CREATE TABLE IF NOT EXISTS social_auth_providers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  provider text NOT NULL CHECK (provider IN ('google', 'facebook', 'instagram')),
  provider_user_id text NOT NULL,
  provider_email text,
  provider_name text,
  provider_picture text,
  access_token text,
  refresh_token text,
  token_expires_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(provider, provider_user_id)
);

CREATE INDEX IF NOT EXISTS idx_social_auth_user ON social_auth_providers(user_id);
CREATE INDEX IF NOT EXISTS idx_social_auth_provider ON social_auth_providers(provider);

ALTER TABLE social_auth_providers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own social auth"
  ON social_auth_providers FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own social auth"
  ON social_auth_providers FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own social auth"
  ON social_auth_providers FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- OTP verifications table
CREATE TABLE IF NOT EXISTS otp_verifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mobile text NOT NULL,
  otp_code text NOT NULL,
  is_verified boolean DEFAULT false,
  attempt_count integer DEFAULT 0,
  expires_at timestamptz NOT NULL,
  verified_at timestamptz,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_otp_mobile ON otp_verifications(mobile, is_verified);
CREATE INDEX IF NOT EXISTS idx_otp_expires ON otp_verifications(expires_at);

ALTER TABLE otp_verifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert OTP"
  ON otp_verifications FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can view own OTP"
  ON otp_verifications FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can update own OTP"
  ON otp_verifications FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Quick signup profiles for incomplete registrations
CREATE TABLE IF NOT EXISTS quick_signup_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE REFERENCES user_profiles(id) ON DELETE CASCADE,
  vendor_category text,
  partner_type text DEFAULT 'INDEPENDENT',
  mobile text NOT NULL,
  mobile_verified boolean DEFAULT false,
  completion_reminder_sent boolean DEFAULT false,
  completion_reminder_count integer DEFAULT 0,
  last_reminder_sent_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_quick_signup_user ON quick_signup_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_quick_signup_mobile ON quick_signup_profiles(mobile);

ALTER TABLE quick_signup_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own quick signup profile"
  ON quick_signup_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own quick signup profile"
  ON quick_signup_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own quick signup profile"
  ON quick_signup_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Function to cleanup expired OTPs
CREATE OR REPLACE FUNCTION cleanup_expired_otps()
RETURNS void AS $$
BEGIN
  DELETE FROM otp_verifications
  WHERE expires_at < now() AND is_verified = false;
END;
$$ LANGUAGE plpgsql;

-- Function to generate OTP
CREATE OR REPLACE FUNCTION generate_otp_code()
RETURNS text AS $$
BEGIN
  RETURN LPAD(FLOOR(RANDOM() * 10000)::text, 4, '0');
END;
$$ LANGUAGE plpgsql;

-- Function to verify OTP
CREATE OR REPLACE FUNCTION verify_otp(p_mobile text, p_otp_code text)
RETURNS boolean AS $$
DECLARE
  v_otp_record RECORD;
BEGIN
  SELECT * INTO v_otp_record
  FROM otp_verifications
  WHERE mobile = p_mobile
    AND otp_code = p_otp_code
    AND is_verified = false
    AND expires_at > now()
  ORDER BY created_at DESC
  LIMIT 1;

  IF v_otp_record.id IS NOT NULL THEN
    UPDATE otp_verifications
    SET is_verified = true,
        verified_at = now()
    WHERE id = v_otp_record.id;

    RETURN true;
  ELSE
    UPDATE otp_verifications
    SET attempt_count = attempt_count + 1
    WHERE mobile = p_mobile
      AND is_verified = false
      AND expires_at > now();

    RETURN false;
  END IF;
END;
$$ LANGUAGE plpgsql;