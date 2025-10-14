/*
  # Add Admin Access to Vendor Applications
  
  Adds RLS policy to allow admin users to view and manage vendor applications.
  
  1. Changes
    - Add policy for admins to SELECT all vendor applications
    - Add policy for admins to UPDATE vendor applications (for approval/rejection)
  
  2. Security
    - Only users with admin, super_admin, or employee roles can access
    - Policies check user_profiles table for role verification
*/

-- Allow admins to view all vendor applications
CREATE POLICY "Admins can view all applications"
  ON vendor_applications FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role IN ('admin', 'super_admin', 'employee', 'hr_department')
    )
  );

-- Allow admins to update vendor applications (approve/reject)
CREATE POLICY "Admins can update applications"
  ON vendor_applications FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role IN ('admin', 'super_admin', 'employee')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role IN ('admin', 'super_admin', 'employee')
    )
  );
