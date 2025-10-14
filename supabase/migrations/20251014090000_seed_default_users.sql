/*
  # Seed Default System Users
  
  Creates default users for testing and initial system access:
  - admin321 (password: 1234) - System Administrator
  - employee321 (password: 1234) - Default Employee
  - vendor321 (password: 1234) - Demo Vendor
  
  All users use format: {role}321 with password 1234
*/

-- Insert default admin user
INSERT INTO user_profiles (name, mobile, email, role, status)
VALUES ('System Admin', 'admin321', 'admin@ombaro.com', 'admin', 'active')
ON CONFLICT (mobile) DO NOTHING;

-- Insert default employee user
INSERT INTO user_profiles (name, mobile, email, role, status)
VALUES ('Default Employee', 'employee321', 'employee@ombaro.com', 'employee', 'active')
ON CONFLICT (mobile) DO NOTHING;

-- Insert default vendor user  
INSERT INTO user_profiles (name, mobile, email, role, status)
VALUES ('Demo Vendor', 'vendor321', 'vendor@ombaro.com', 'vendor', 'active')
ON CONFLICT (mobile) DO NOTHING;

-- Insert super admin user
INSERT INTO user_profiles (name, mobile, email, role, status)
VALUES ('Super Admin', 'super_admin321', 'superadmin@ombaro.com', 'super_admin', 'active')
ON CONFLICT (mobile) DO NOTHING;

-- Insert department users
INSERT INTO user_profiles (name, mobile, email, role, status)
VALUES 
  ('Accounts Department', 'accounts_department321', 'accounts@ombaro.com', 'accounts_department', 'active'),
  ('Marketing Department', 'marketing_department321', 'marketing@ombaro.com', 'marketing_department', 'active'),
  ('Finance Department', 'finance_department321', 'finance@ombaro.com', 'finance_department', 'active'),
  ('Legal Department', 'legal_department321', 'legal@ombaro.com', 'legal_department', 'active'),
  ('Customer Care', 'customer_care321', 'customercare@ombaro.com', 'customer_care', 'active'),
  ('HR Department', 'hr_department321', 'hr@ombaro.com', 'hr_department', 'active'),
  ('IT Department', 'it_department321', 'it@ombaro.com', 'it_department', 'active'),
  ('Field Officer', 'fo_department321', 'fo@ombaro.com', 'fo_department', 'active')
ON CONFLICT (mobile) DO NOTHING;

-- Create default employee record for employee321
DO $$
DECLARE
  v_user_id uuid;
BEGIN
  -- Get user_id for employee321
  SELECT id INTO v_user_id FROM user_profiles WHERE mobile = 'employee321';
  
  IF v_user_id IS NOT NULL THEN
    -- Insert into employees table if doesn't exist
    INSERT INTO employees (
      user_id,
      employee_id,
      name,
      mobile,
      email,
      department,
      designation,
      hierarchy_level,
      can_approve_vendors,
      is_active
    )
    VALUES (
      v_user_id,
      'EMP001',
      'Default Employee',
      'employee321',
      'employee@ombaro.com',
      'Operations',
      'Manager',
      2,
      true,
      true
    )
    ON CONFLICT (user_id) DO NOTHING;
  END IF;
END $$;

-- Create default vendor record for vendor321
DO $$
DECLARE
  v_user_id uuid;
BEGIN
  SELECT id INTO v_user_id FROM user_profiles WHERE mobile = 'vendor321';
  
  IF v_user_id IS NOT NULL THEN
    INSERT INTO vendors (
      user_id,
      partner_type,
      business_name,
      business_type,
      contact_person,
      contact_mobile,
      contact_email,
      address_line1,
      city,
      state,
      pincode,
      is_active,
      verification_status,
      onboarding_completed,
      commission_rate
    )
    VALUES (
      v_user_id,
      'INDEPENDENT',
      'Demo Spa & Wellness',
      'spa',
      'Demo Vendor',
      'vendor321',
      'vendor@ombaro.com',
      '123 Demo Street',
      'Bangalore',
      'Karnataka',
      '560001',
      true,
      'verified',
      true,
      20.00
    )
    ON CONFLICT (user_id) DO NOTHING;
  END IF;
END $$;

COMMENT ON TABLE user_profiles IS 'All default users have username format: {role}321 with password: 1234';
