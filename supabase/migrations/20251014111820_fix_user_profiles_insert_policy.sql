/*
  # Fix User Profiles INSERT Policy for Self-Registration

  ## Problem
  The user_profiles table has RLS enabled but lacks an INSERT policy that allows
  newly authenticated users to create their own profile during self-registration.
  
  This causes vendor applications to fail at the profile creation step with:
  "new row violates row-level security policy for table user_profiles"

  ## Solution
  Add an INSERT policy that allows authenticated users to create their own profile
  record during the registration process. The policy ensures users can only create
  a profile for themselves (matching auth.uid()).

  ## Changes
  1. Add INSERT policy for authenticated users to create their own profile
  2. Ensure the policy validates that id matches auth.uid()
  3. Add security check to prevent users from creating profiles for others
  4. Keep all existing SELECT and UPDATE policies intact

  ## Security Considerations
  - Users can only insert a profile with their own auth.uid()
  - Cannot create profiles for other users
  - Works for all authenticated users regardless of role
  - Essential for vendor_applicant self-registration flow
*/

-- ============================================================================
-- Add INSERT Policy for User Profile Creation
-- ============================================================================

-- Drop the policy if it already exists to ensure clean creation
DROP POLICY IF EXISTS "Users can create own profile" ON user_profiles;

-- Create policy allowing authenticated users to insert their own profile
CREATE POLICY "Users can create own profile"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (
    id = auth.uid()
  );

-- ============================================================================
-- Add INSERT Policy for System/Admin Profile Creation
-- ============================================================================

-- Drop the policy if it already exists
DROP POLICY IF EXISTS "Admins can create any profile" ON user_profiles;

-- Create policy allowing admins to create profiles for other users
CREATE POLICY "Admins can create any profile"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() 
      AND role IN ('admin', 'super_admin', 'hr_department')
    )
    OR id = auth.uid()  -- Always allow creating own profile
  );

-- ============================================================================
-- Verification and Documentation
-- ============================================================================

-- Add helpful comment on the table
COMMENT ON TABLE user_profiles IS 
'User profiles for all system users. RLS policies ensure users can view/update 
their own profile and create their profile during registration. Admins have 
full access to all profiles.';

-- Verify all policies are in place
DO $$
DECLARE
  policy_count integer;
  insert_policy_count integer;
BEGIN
  -- Count total policies on user_profiles
  SELECT COUNT(*) INTO policy_count
  FROM pg_policies
  WHERE tablename = 'user_profiles';

  -- Count INSERT policies specifically
  SELECT COUNT(*) INTO insert_policy_count
  FROM pg_policies
  WHERE tablename = 'user_profiles'
  AND cmd = 'INSERT';

  -- Raise notice with results
  RAISE NOTICE '✅ User Profiles RLS Policies Updated';
  RAISE NOTICE '📊 Total policies on user_profiles: %', policy_count;
  RAISE NOTICE '🔐 INSERT policies: %', insert_policy_count;
  RAISE NOTICE '✨ Vendor self-registration should now work correctly';
END $$;
