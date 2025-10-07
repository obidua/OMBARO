/*
  # Add Vendor Category Columns to vendor_applications
  
  Adds vendor category tracking columns to support the vendor onboarding flow.
  
  1. Schema Updates
    - Add vendor_category column to vendor_applications table
    - Add signup_type column to vendor_applications table
  
  2. Notes
    - Uses IF NOT EXISTS pattern to safely add columns
    - vendor_category stores the selected business category code
    - signup_type tracks whether vendor used quick or detailed signup
*/

-- Add vendor_category column to vendor_applications
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'vendor_applications' AND column_name = 'vendor_category'
  ) THEN
    ALTER TABLE vendor_applications ADD COLUMN vendor_category text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'vendor_applications' AND column_name = 'signup_type'
  ) THEN
    ALTER TABLE vendor_applications ADD COLUMN signup_type text DEFAULT 'detailed' CHECK (signup_type IN ('quick', 'detailed'));
  END IF;
END $$;