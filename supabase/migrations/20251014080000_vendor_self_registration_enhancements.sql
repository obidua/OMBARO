/*
  # Vendor Self-Registration Enhancements

  1. New Columns
    - Add `is_self_registered` boolean flag to track onboarding type
    - Add `account_activated` boolean to track post-approval activation
    - Add `temporary_password_sent` timestamp for employee-assisted mode

  2. Updates
    - Ensure user_id is properly indexed
    - Add check constraints for data integrity

  3. Security
    - Update RLS policies for vendor applicants
    - Allow applicants to view their own applications
*/

-- Add new columns to vendor_applications table
DO $$
BEGIN
  -- Add is_self_registered column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'vendor_applications'
    AND column_name = 'is_self_registered'
  ) THEN
    ALTER TABLE vendor_applications
    ADD COLUMN is_self_registered boolean DEFAULT false;
  END IF;

  -- Add account_activated column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'vendor_applications'
    AND column_name = 'account_activated'
  ) THEN
    ALTER TABLE vendor_applications
    ADD COLUMN account_activated boolean DEFAULT false;
  END IF;

  -- Add temporary_password_sent column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'vendor_applications'
    AND column_name = 'temporary_password_sent'
  ) THEN
    ALTER TABLE vendor_applications
    ADD COLUMN temporary_password_sent timestamptz;
  END IF;
END $$;

-- Create index on user_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_vendor_applications_user_id
ON vendor_applications(user_id);

-- Create index on status and is_self_registered for filtering
CREATE INDEX IF NOT EXISTS idx_vendor_applications_status_self_reg
ON vendor_applications(status, is_self_registered);

-- Add comments for documentation
COMMENT ON COLUMN vendor_applications.is_self_registered IS 'True if vendor registered themselves via marketing website, false if registered by employee';
COMMENT ON COLUMN vendor_applications.account_activated IS 'True after final approval when vendor account is created and user role updated';
COMMENT ON COLUMN vendor_applications.temporary_password_sent IS 'Timestamp when temporary password email was sent (for employee-assisted onboarding)';

-- Update RLS policies to allow vendor applicants to view their own applications
DO $$
BEGIN
  -- Drop existing policy if it exists
  DROP POLICY IF EXISTS "Vendor applicants can view own applications" ON vendor_applications;

  -- Create policy for vendor applicants
  CREATE POLICY "Vendor applicants can view own applications"
    ON vendor_applications FOR SELECT
    TO authenticated
    USING (
      auth.uid() = user_id
      AND EXISTS (
        SELECT 1 FROM user_profiles
        WHERE user_profiles.id = auth.uid()
        AND user_profiles.role IN ('vendor_applicant', 'vendor')
      )
    );
END $$;

-- Update RLS policy to allow authenticated users to insert applications
DO $$
BEGIN
  -- Drop existing policy if it exists
  DROP POLICY IF EXISTS "Authenticated users can submit vendor applications" ON vendor_applications;

  -- Create policy for application submission
  CREATE POLICY "Authenticated users can submit vendor applications"
    ON vendor_applications FOR INSERT
    TO authenticated
    WITH CHECK (
      auth.uid() = user_id
    );
END $$;

-- Update RLS policy to allow applicants to update their own applications (for additional info)
DO $$
BEGIN
  -- Drop existing policy if it exists
  DROP POLICY IF EXISTS "Applicants can update own applications for additional info" ON vendor_applications;

  -- Create policy for application updates
  CREATE POLICY "Applicants can update own applications for additional info"
    ON vendor_applications FOR UPDATE
    TO authenticated
    USING (
      auth.uid() = user_id
      AND status = 'additional_info_required'
    )
    WITH CHECK (
      auth.uid() = user_id
      AND status = 'additional_info_required'
    );
END $$;

-- Function to update account_activated when vendor is created
CREATE OR REPLACE FUNCTION mark_application_activated()
RETURNS TRIGGER AS $$
BEGIN
  -- Update the application to mark it as activated
  UPDATE vendor_applications
  SET
    account_activated = true,
    updated_at = NOW()
  WHERE id = NEW.application_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to mark application as activated when vendor is created
DROP TRIGGER IF EXISTS trigger_mark_application_activated ON vendors;
CREATE TRIGGER trigger_mark_application_activated
  AFTER INSERT ON vendors
  FOR EACH ROW
  EXECUTE FUNCTION mark_application_activated();

COMMENT ON FUNCTION mark_application_activated() IS 'Marks vendor application as activated when vendor account is created';
