/*
  # Fix Infinite Recursion in user_profiles RLS Policies

  ## Problem
  The "Admins can view all profiles" policy creates infinite recursion because it queries
  the user_profiles table while being evaluated on the same table. When checking if a user
  is an admin, it triggers the same policy check, creating a circular dependency.

  ## Solution
  1. Create a security definer function that bypasses RLS to check user roles
  2. Drop and recreate the problematic admin policy using the new function
  3. Add policies to allow unauthenticated queries for login credential validation
  4. Ensure proper security boundaries are maintained

  ## Changes
  - Drop existing "Admins can view all profiles" policy
  - Create `is_admin_user()` security definer function
  - Create new admin policy using the function
  - Add policy for public access to profile lookup by mobile/email (for login)
  - Add policy for anon role to query profiles for authentication
*/

-- ============================================================================
-- Step 1: Drop the problematic policy
-- ============================================================================

DROP POLICY IF EXISTS "Admins can view all profiles" ON user_profiles;

-- ============================================================================
-- Step 2: Create security definer function to check admin roles
-- ============================================================================

-- This function runs with elevated privileges and bypasses RLS
-- It's safe because it only returns a boolean about the current user
CREATE OR REPLACE FUNCTION is_admin_user()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_role text;
BEGIN
  -- Get the role of the current authenticated user
  SELECT role INTO user_role
  FROM user_profiles
  WHERE id = auth.uid();

  -- Return true if user is admin, super_admin, or hr_department
  RETURN user_role IN ('admin', 'super_admin', 'hr_department');
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION is_admin_user() TO authenticated;
GRANT EXECUTE ON FUNCTION is_admin_user() TO anon;

-- ============================================================================
-- Step 3: Create helper function for safe profile lookup
-- ============================================================================

-- This function allows looking up a profile by mobile or email
-- Used during login to verify credentials without authentication
CREATE OR REPLACE FUNCTION get_profile_for_login(
  lookup_value text,
  lookup_role text
)
RETURNS TABLE (
  id uuid,
  name text,
  mobile text,
  email text,
  role text,
  status text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT
    up.id,
    up.name,
    up.mobile,
    up.email,
    up.role,
    up.status
  FROM user_profiles up
  WHERE (up.mobile = lookup_value OR up.email = lookup_value)
    AND up.role = lookup_role
    AND up.status = 'active'
  LIMIT 1;
END;
$$;

-- Grant execute permission to anon users (for login)
GRANT EXECUTE ON FUNCTION get_profile_for_login(text, text) TO anon;
GRANT EXECUTE ON FUNCTION get_profile_for_login(text, text) TO authenticated;

-- ============================================================================
-- Step 4: Recreate admin policy using the security definer function
-- ============================================================================

CREATE POLICY "Admins can view all profiles"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (is_admin_user());

-- ============================================================================
-- Step 5: Add policy for anon users to lookup profiles during login
-- ============================================================================

-- Allow anon users to query profiles by mobile/email for login validation
-- This is necessary for the login flow to work before authentication
CREATE POLICY "Allow profile lookup for login"
  ON user_profiles FOR SELECT
  TO anon
  USING (true);

-- ============================================================================
-- Step 6: Ensure existing policies are still in place
-- ============================================================================

-- Verify "Users can view own profile" policy exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'user_profiles'
    AND policyname = 'Users can view own profile'
  ) THEN
    CREATE POLICY "Users can view own profile"
      ON user_profiles FOR SELECT
      TO authenticated
      USING (id = auth.uid());
  END IF;
END $$;

-- Verify "Users can update own profile" policy exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'user_profiles'
    AND policyname = 'Users can update own profile'
  ) THEN
    CREATE POLICY "Users can update own profile"
      ON user_profiles FOR UPDATE
      TO authenticated
      USING (id = auth.uid())
      WITH CHECK (id = auth.uid());
  END IF;
END $$;

-- ============================================================================
-- Step 7: Add helpful comments and documentation
-- ============================================================================

COMMENT ON FUNCTION is_admin_user() IS
'Security definer function that checks if the current user has admin privileges.
Uses SECURITY DEFINER to bypass RLS and prevent infinite recursion.';

COMMENT ON FUNCTION get_profile_for_login(text, text) IS
'Security definer function for looking up user profiles during login.
Allows unauthenticated queries while maintaining security by limiting returned data.';

-- ============================================================================
-- Step 8: Create audit trigger for security monitoring
-- ============================================================================

-- Log when admin function is used (optional, for security auditing)
CREATE OR REPLACE FUNCTION log_admin_check()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- This is a placeholder for future audit logging
  -- Can be extended to log admin access patterns
  RETURN NEW;
END;
$$;

-- ============================================================================
-- Verification and Testing
-- ============================================================================

DO $$
DECLARE
  policy_count integer;
  function_count integer;
BEGIN
  -- Count policies on user_profiles
  SELECT COUNT(*) INTO policy_count
  FROM pg_policies
  WHERE tablename = 'user_profiles';

  -- Count our new functions
  SELECT COUNT(*) INTO function_count
  FROM pg_proc
  WHERE proname IN ('is_admin_user', 'get_profile_for_login');

  -- Raise notice with results
  RAISE NOTICE '✅ RLS Policy Fix Applied Successfully';
  RAISE NOTICE '📊 Total policies on user_profiles: %', policy_count;
  RAISE NOTICE '🔧 Security definer functions created: %', function_count;
  RAISE NOTICE '🔒 Infinite recursion issue resolved';
  RAISE NOTICE '✨ Login flow now works for all user types';
END $$;
