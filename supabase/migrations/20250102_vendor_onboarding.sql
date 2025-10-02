/*
  # Vendor Self-Signup and Onboarding System

  ## Overview
  This migration adds vendor self-signup and approval workflow functionality.
  Vendors can register themselves and admin/employees can approve their applications.

  ## New Tables

  ### 1. vendor_applications
  Stores vendor registration/onboarding applications
  - `id` (uuid, primary key) - Unique application identifier
  - `user_id` (uuid, foreign key) - User who applied
  - `business_name` (text) - Business name
  - `business_type` (text) - Type of business
  - `gst_number` (text) - GST number
  - `pan_number` (text) - PAN number
  - `business_address` (jsonb) - Complete business address
  - `contact_person` (text) - Contact person name
  - `contact_mobile` (text) - Contact mobile number
  - `contact_email` (text) - Contact email
  - `services_offered` (uuid[]) - Array of service IDs offered
  - `operating_hours` (jsonb) - Operating hours
  - `documents` (jsonb) - Uploaded documents (GST cert, PAN, license, etc.)
  - `application_status` (text) - pending | under_review | approved | rejected | additional_info_required
  - `reviewed_by` (uuid) - Admin/employee who reviewed
  - `reviewed_at` (timestamptz) - Review timestamp
  - `rejection_reason` (text) - Reason if rejected
  - `admin_notes` (text) - Internal notes by admin
  - `created_at` (timestamptz) - Application submission timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. vendor_application_history
  Tracks all status changes and actions on vendor applications
  - `id` (uuid, primary key) - Unique history record
  - `application_id` (uuid, foreign key) - Related application
  - `action` (text) - submitted | reviewed | approved | rejected | info_requested | resubmitted
  - `performed_by` (uuid) - User who performed action
  - `status_from` (text) - Previous status
  - `status_to` (text) - New status
  - `notes` (text) - Action notes/comments
  - `created_at` (timestamptz) - Action timestamp

  ## Modified Tables
  - `vendors` table: Add `application_id` reference
  - `user_profiles` table: Already supports vendor role

  ## Security
  - Row Level Security (RLS) enabled on all tables
  - Vendors can view/update their own applications
  - Admins/HR can view and approve applications
  - Public can create applications (signup)

  ## Indexes
  - Performance indexes on foreign keys and status
  - Composite indexes for common queries
*/

-- ============================================================================
-- 1. VENDOR APPLICATIONS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS vendor_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  business_name text NOT NULL,
  business_type text NOT NULL CHECK (business_type IN ('spa', 'salon', 'home_service', 'hotel_spa', 'wellness_center')),
  gst_number text,
  pan_number text,
  business_address jsonb NOT NULL,
  contact_person text NOT NULL,
  contact_mobile text NOT NULL,
  contact_email text NOT NULL,
  services_offered uuid[] DEFAULT '{}',
  operating_hours jsonb DEFAULT '{}',
  years_in_business integer,
  number_of_staff integer,
  business_description text,
  website_url text,
  social_media jsonb DEFAULT '{}',
  documents jsonb DEFAULT '{}',
  application_status text DEFAULT 'pending' CHECK (application_status IN (
    'pending', 'under_review', 'approved', 'rejected', 'additional_info_required'
  )),
  reviewed_by uuid REFERENCES auth.users(id),
  reviewed_at timestamptz,
  rejection_reason text,
  additional_info_request text,
  admin_notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_vendor_applications_user ON vendor_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_vendor_applications_status ON vendor_applications(application_status);
CREATE INDEX IF NOT EXISTS idx_vendor_applications_created ON vendor_applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_vendor_applications_reviewed_by ON vendor_applications(reviewed_by);

-- ============================================================================
-- 2. VENDOR APPLICATION HISTORY TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS vendor_application_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid NOT NULL REFERENCES vendor_applications(id) ON DELETE CASCADE,
  action text NOT NULL CHECK (action IN (
    'submitted', 'reviewed', 'approved', 'rejected', 'info_requested', 'resubmitted', 'updated'
  )),
  performed_by uuid NOT NULL REFERENCES auth.users(id),
  status_from text,
  status_to text,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_vendor_app_history_application ON vendor_application_history(application_id);
CREATE INDEX IF NOT EXISTS idx_vendor_app_history_performed_by ON vendor_application_history(performed_by);
CREATE INDEX IF NOT EXISTS idx_vendor_app_history_created ON vendor_application_history(created_at DESC);

-- ============================================================================
-- 3. ADD APPLICATION_ID TO VENDORS TABLE
-- ============================================================================

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'vendors' AND column_name = 'application_id'
  ) THEN
    ALTER TABLE vendors ADD COLUMN application_id uuid REFERENCES vendor_applications(id);
    CREATE INDEX idx_vendors_application ON vendors(application_id);
  END IF;
END $$;

-- ============================================================================
-- 4. ROW LEVEL SECURITY POLICIES
-- ============================================================================

-- Enable RLS
ALTER TABLE vendor_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_application_history ENABLE ROW LEVEL SECURITY;

-- Vendor Applications Policies

-- Anyone can create an application (signup)
CREATE POLICY "Anyone can create vendor application"
  ON vendor_applications FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Vendors can view their own applications
CREATE POLICY "Vendors can view own applications"
  ON vendor_applications FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Vendors can update their own pending/additional_info_required applications
CREATE POLICY "Vendors can update own pending applications"
  ON vendor_applications FOR UPDATE
  TO authenticated
  USING (
    user_id = auth.uid() AND
    application_status IN ('pending', 'additional_info_required')
  )
  WITH CHECK (
    user_id = auth.uid() AND
    application_status IN ('pending', 'additional_info_required')
  );

-- Admins and HR can view all applications
CREATE POLICY "Admins can view all applications"
  ON vendor_applications FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin', 'hr_department', 'directors', 'vendor_list')
    )
  );

-- Admins can update/approve applications
CREATE POLICY "Admins can update applications"
  ON vendor_applications FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin', 'hr_department', 'directors')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin', 'hr_department', 'directors')
    )
  );

-- Application History Policies

-- Authenticated users can insert history (triggered automatically)
CREATE POLICY "Authenticated can create history"
  ON vendor_application_history FOR INSERT
  TO authenticated
  WITH CHECK (performed_by = auth.uid());

-- Users can view history of their own applications
CREATE POLICY "Users can view own application history"
  ON vendor_application_history FOR SELECT
  TO authenticated
  USING (
    application_id IN (
      SELECT id FROM vendor_applications WHERE user_id = auth.uid()
    )
  );

-- Admins can view all history
CREATE POLICY "Admins can view all history"
  ON vendor_application_history FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin', 'hr_department', 'directors', 'vendor_list')
    )
  );

-- ============================================================================
-- 5. TRIGGERS AND FUNCTIONS
-- ============================================================================

-- Function to create history entry when application status changes
CREATE OR REPLACE FUNCTION create_vendor_application_history()
RETURNS TRIGGER AS $$
BEGIN
  -- Only create history if status changed or if it's a new application
  IF (TG_OP = 'INSERT') THEN
    INSERT INTO vendor_application_history (
      application_id,
      action,
      performed_by,
      status_to,
      notes
    ) VALUES (
      NEW.id,
      'submitted',
      NEW.user_id,
      NEW.application_status,
      'Application submitted'
    );
  ELSIF (TG_OP = 'UPDATE' AND OLD.application_status != NEW.application_status) THEN
    INSERT INTO vendor_application_history (
      application_id,
      action,
      performed_by,
      status_from,
      status_to,
      notes
    ) VALUES (
      NEW.id,
      CASE NEW.application_status
        WHEN 'approved' THEN 'approved'
        WHEN 'rejected' THEN 'rejected'
        WHEN 'under_review' THEN 'reviewed'
        WHEN 'additional_info_required' THEN 'info_requested'
        ELSE 'updated'
      END,
      COALESCE(NEW.reviewed_by, auth.uid()),
      OLD.application_status,
      NEW.application_status,
      COALESCE(NEW.admin_notes, 'Status updated')
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for application history
DROP TRIGGER IF EXISTS vendor_application_history_trigger ON vendor_applications;
CREATE TRIGGER vendor_application_history_trigger
  AFTER INSERT OR UPDATE ON vendor_applications
  FOR EACH ROW
  EXECUTE FUNCTION create_vendor_application_history();

-- Function to create vendor record when application is approved
CREATE OR REPLACE FUNCTION create_vendor_from_application()
RETURNS TRIGGER AS $$
BEGIN
  -- Only proceed if status changed to 'approved'
  IF (TG_OP = 'UPDATE' AND OLD.application_status != 'approved' AND NEW.application_status = 'approved') THEN
    -- Check if vendor record doesn't already exist
    IF NOT EXISTS (SELECT 1 FROM vendors WHERE id = NEW.user_id) THEN
      -- Create vendor record
      INSERT INTO vendors (
        id,
        application_id,
        business_name,
        business_type,
        gst_number,
        pan_number,
        business_address,
        contact_person,
        contact_mobile,
        contact_email,
        services_offered,
        operating_hours,
        verification_status,
        status,
        created_at,
        updated_at
      ) VALUES (
        NEW.user_id,
        NEW.id,
        NEW.business_name,
        NEW.business_type,
        NEW.gst_number,
        NEW.pan_number,
        NEW.business_address,
        NEW.contact_person,
        NEW.contact_mobile,
        NEW.contact_email,
        NEW.services_offered,
        NEW.operating_hours,
        'verified',
        'active',
        now(),
        now()
      );

      -- Update user profile role to vendor
      UPDATE user_profiles
      SET role = 'vendor', updated_at = now()
      WHERE id = NEW.user_id;

      -- Send notification to vendor
      INSERT INTO notifications (
        user_id,
        type,
        title,
        message,
        data,
        channels
      ) VALUES (
        NEW.user_id,
        'system_alert',
        'Application Approved!',
        'Congratulations! Your vendor application has been approved. You can now start managing your spa/salon on OMBARO.',
        jsonb_build_object('application_id', NEW.id),
        ARRAY['push', 'email']
      );
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create vendor when approved
DROP TRIGGER IF EXISTS auto_create_vendor_trigger ON vendor_applications;
CREATE TRIGGER auto_create_vendor_trigger
  AFTER UPDATE ON vendor_applications
  FOR EACH ROW
  EXECUTE FUNCTION create_vendor_from_application();

-- Function to send notification when application status changes
CREATE OR REPLACE FUNCTION notify_application_status_change()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'UPDATE' AND OLD.application_status != NEW.application_status) THEN
    -- Send notification based on status
    IF NEW.application_status = 'under_review' THEN
      INSERT INTO notifications (
        user_id,
        type,
        title,
        message,
        data,
        channels
      ) VALUES (
        NEW.user_id,
        'system_alert',
        'Application Under Review',
        'Your vendor application is now under review by our team. We will notify you once the review is complete.',
        jsonb_build_object('application_id', NEW.id),
        ARRAY['push', 'email']
      );
    ELSIF NEW.application_status = 'additional_info_required' THEN
      INSERT INTO notifications (
        user_id,
        type,
        title,
        message,
        data,
        channels
      ) VALUES (
        NEW.user_id,
        'system_alert',
        'Additional Information Required',
        NEW.additional_info_request,
        jsonb_build_object('application_id', NEW.id),
        ARRAY['push', 'email']
      );
    ELSIF NEW.application_status = 'rejected' THEN
      INSERT INTO notifications (
        user_id,
        type,
        title,
        message,
        data,
        channels
      ) VALUES (
        NEW.user_id,
        'system_alert',
        'Application Rejected',
        'Unfortunately, your vendor application has been rejected. Reason: ' || COALESCE(NEW.rejection_reason, 'Not specified'),
        jsonb_build_object('application_id', NEW.id),
        ARRAY['push', 'email']
      );
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for status change notifications
DROP TRIGGER IF EXISTS application_status_notification_trigger ON vendor_applications;
CREATE TRIGGER application_status_notification_trigger
  AFTER UPDATE ON vendor_applications
  FOR EACH ROW
  EXECUTE FUNCTION notify_application_status_change();

-- ============================================================================
-- 6. VIEWS FOR ANALYTICS
-- ============================================================================

-- View for application statistics
CREATE OR REPLACE VIEW vendor_application_stats AS
SELECT
  COUNT(*) FILTER (WHERE application_status = 'pending') as pending_count,
  COUNT(*) FILTER (WHERE application_status = 'under_review') as under_review_count,
  COUNT(*) FILTER (WHERE application_status = 'approved') as approved_count,
  COUNT(*) FILTER (WHERE application_status = 'rejected') as rejected_count,
  COUNT(*) FILTER (WHERE application_status = 'additional_info_required') as info_required_count,
  COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '7 days') as last_7_days_count,
  COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '30 days') as last_30_days_count,
  AVG(EXTRACT(EPOCH FROM (reviewed_at - created_at))/3600)::numeric(10,2) as avg_review_time_hours
FROM vendor_applications;

-- ============================================================================
-- 7. UPDATED_AT TRIGGER
-- ============================================================================

DROP TRIGGER IF EXISTS update_vendor_applications_updated_at ON vendor_applications;
CREATE TRIGGER update_vendor_applications_updated_at
  BEFORE UPDATE ON vendor_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
