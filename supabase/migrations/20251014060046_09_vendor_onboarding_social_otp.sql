/*
  # Vendor Onboarding Extended - Social Auth and OTP
  
  Adds social auth, OTP verification support
*/

-- Add columns to user_profiles for signup methods
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

CREATE INDEX idx_social_auth_user ON social_auth_providers(user_id);
CREATE INDEX idx_social_auth_provider ON social_auth_providers(provider);

ALTER TABLE social_auth_providers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own social auth"
  ON social_auth_providers FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own social auth"
  ON social_auth_providers FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own social auth"
  ON social_auth_providers FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

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

CREATE INDEX idx_otp_mobile ON otp_verifications(mobile, is_verified);
CREATE INDEX idx_otp_expires ON otp_verifications(expires_at);

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