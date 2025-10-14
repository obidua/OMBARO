/*
  # Seed Default System Users (Simplified)
  
  Creates user_profiles for all default system users without auth.users dependency.
  These users authenticate using the fallback mechanism in AuthService.
  
  1. System Users (7 users)
    - admin321, super_admin321, employee321, vendor321
    - customer321, therapist321, beautician321
  
  2. Department Users (16 users)
    - All departments follow pattern: {department}_321
  
  3. Authentication
    - Login: {role}321 / Password: 1234
    - Uses fallback auth (no Supabase auth required)
*/

-- Drop the FK constraint temporarily
ALTER TABLE user_profiles DROP CONSTRAINT IF EXISTS user_profiles_id_fkey;

-- Insert all default users in one statement
INSERT INTO user_profiles (id, name, mobile, email, role, status, mobile_verified, profile_completed)
VALUES 
  -- System Users
  (gen_random_uuid(), 'System Admin', 'admin321', 'admin@ombaro.com', 'admin', 'active', true, true),
  (gen_random_uuid(), 'Super Admin', 'super_admin321', 'superadmin@ombaro.com', 'super_admin', 'active', true, true),
  (gen_random_uuid(), 'Default Employee', 'employee321', 'employee@ombaro.com', 'employee', 'active', true, true),
  (gen_random_uuid(), 'Demo Vendor', 'vendor321', 'vendor@ombaro.com', 'vendor', 'active', true, true),
  (gen_random_uuid(), 'Demo Customer', 'customer321', 'customer@ombaro.com', 'customer', 'active', true, true),
  (gen_random_uuid(), 'Demo Therapist', 'therapist321', 'therapist@ombaro.com', 'therapist', 'active', true, true),
  (gen_random_uuid(), 'Demo Beautician', 'beautician321', 'beautician@ombaro.com', 'beautician', 'active', true, true),
  -- Department Users
  (gen_random_uuid(), 'Accounts Department', 'accounts_department321', 'accounts@ombaro.com', 'accounts_department', 'active', true, true),
  (gen_random_uuid(), 'Marketing Department', 'marketing_department321', 'marketing@ombaro.com', 'marketing_department', 'active', true, true),
  (gen_random_uuid(), 'Finance Department', 'finance_department321', 'finance@ombaro.com', 'finance_department', 'active', true, true),
  (gen_random_uuid(), 'Legal Department', 'legal_department321', 'legal@ombaro.com', 'legal_department', 'active', true, true),
  (gen_random_uuid(), 'Customer Care', 'customer_care321', 'customercare@ombaro.com', 'customer_care', 'active', true, true),
  (gen_random_uuid(), 'HR Department', 'hr_department321', 'hr@ombaro.com', 'hr_department', 'active', true, true),
  (gen_random_uuid(), 'IT Department', 'it_department321', 'it@ombaro.com', 'it_department', 'active', true, true),
  (gen_random_uuid(), 'Field Officer', 'fo_department321', 'fo@ombaro.com', 'fo_department', 'active', true, true),
  (gen_random_uuid(), 'Staff Department', 'staff_department321', 'staff@ombaro.com', 'staff_department', 'active', true, true),
  (gen_random_uuid(), 'Vendor List Dept', 'vendor_list321', 'vendorlist@ombaro.com', 'vendor_list_department', 'active', true, true),
  (gen_random_uuid(), 'Customer Data Dept', 'customer_data321', 'customerdata@ombaro.com', 'customer_data_department', 'active', true, true),
  (gen_random_uuid(), 'HO Details', 'ho_details321', 'hodetails@ombaro.com', 'ho_details', 'active', true, true),
  (gen_random_uuid(), 'Corporate Office', 'corporate_office321', 'corporate@ombaro.com', 'corporate_office', 'active', true, true),
  (gen_random_uuid(), 'Advocate', 'advocate321', 'advocate@ombaro.com', 'advocate', 'active', true, true),
  (gen_random_uuid(), 'CA/CS Department', 'ca_cs321', 'cacs@ombaro.com', 'ca_cs_department', 'active', true, true),
  (gen_random_uuid(), 'Directors', 'directors321', 'directors@ombaro.com', 'directors', 'active', true, true)
ON CONFLICT (mobile) DO NOTHING;
