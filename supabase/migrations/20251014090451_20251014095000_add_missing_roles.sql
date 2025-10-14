/*
  # Add Missing Role Types
  
  Updates the user_profiles role check constraint to include all department and system roles.
  
  1. Changes
    - Drops existing role check constraint
    - Creates new constraint with all 22+ role types
  
  2. New Roles Added
    - beautician, vendor_applicant
    - staff_department, vendor_list_department, customer_data_department
    - fo_department, ho_details, corporate_office
    - advocate, ca_cs_department, directors
*/

-- Drop existing role check constraint
ALTER TABLE user_profiles DROP CONSTRAINT IF EXISTS user_profiles_role_check;

-- Add new comprehensive role check constraint
ALTER TABLE user_profiles ADD CONSTRAINT user_profiles_role_check 
CHECK (role = ANY (ARRAY[
  'customer'::text,
  'vendor'::text,
  'vendor_applicant'::text,
  'therapist'::text,
  'beautician'::text,
  'employee'::text,
  'admin'::text,
  'super_admin'::text,
  'accounts_department'::text,
  'marketing_department'::text,
  'finance_department'::text,
  'hr_department'::text,
  'it_department'::text,
  'customer_care'::text,
  'legal_department'::text,
  'staff_department'::text,
  'vendor_list_department'::text,
  'customer_data_department'::text,
  'fo_department'::text,
  'ho_details'::text,
  'corporate_office'::text,
  'advocate'::text,
  'ca_cs_department'::text,
  'directors'::text
]));
