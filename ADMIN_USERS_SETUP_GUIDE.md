# Admin Users Setup Guide

## Issue Identified

Your vendor application submission works correctly, but the data isn't visible in admin/employee portals because:

1. **No Auth Users Exist**: The `auth.users` table is empty - no users can log in
2. **User Profiles Exist**: The `user_profiles` table has admin records, but they're not linked to auth accounts
3. **RLS Policies Work**: The policies check `user_profiles.role` correctly, but require authenticated users

## Root Cause

The database has user profiles for admins but no corresponding authentication accounts. This means:
- Admins cannot log in to the system
- RLS policies cannot authenticate users
- Vendor applications remain invisible even though they're stored correctly

## Solution: Create Admin Authentication Accounts

You need to create admin users through Supabase's authentication system. Here are three methods:

### Method 1: Using Supabase Dashboard (RECOMMENDED)

1. Go to your Supabase project: https://vspkiuissuuesjsnnpqr.supabase.co
2. Navigate to **Authentication** > **Users**
3. Click **Add User** and create:

   **Admin Account:**
   - Email: `admin@ombaro.com`
   - Password: `Admin@123456` (change after first login)
   - Auto-confirm: Yes

   **Super Admin Account:**
   - Email: `superadmin@ombaro.com`
   - Password: `SuperAdmin@123456` (change after first login)
   - Auto-confirm: Yes

4. After creating each user, note their UUID
5. Update the `user_profiles` table to link existing profiles:

```sql
-- Update user_profiles with the new auth user IDs
-- Replace {NEW_ADMIN_UUID} with the actual UUID from auth.users

UPDATE user_profiles
SET id = '{NEW_ADMIN_UUID}'
WHERE email = 'admin@ombaro.com';

UPDATE user_profiles
SET id = '{NEW_SUPER_ADMIN_UUID}'
WHERE email = 'superadmin@ombaro.com';
```

### Method 2: Using Application Signup Flow

You can use the vendor signup form to create an admin account:

1. Go to your application: https://ombaro.com/app
2. Navigate to the vendor signup
3. Fill in the form with admin email (`admin@ombaro.com`)
4. After signup, update the user's role in `user_profiles`:

```sql
UPDATE user_profiles
SET role = 'admin'
WHERE email = 'admin@ombaro.com';
```

### Method 3: Using Supabase Client Library

Create a simple script to sign up admin users:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://vspkiuissuuesjsnnpqr.supabase.co',
  'YOUR_SERVICE_ROLE_KEY' // Use service role key, not anon key
)

async function createAdminUser() {
  const { data, error } = await supabase.auth.admin.createUser({
    email: 'admin@ombaro.com',
    password: 'Admin@123456',
    email_confirm: true,
    user_metadata: {
      name: 'System Admin',
      role: 'admin'
    }
  })

  if (error) {
    console.error('Error:', error)
    return
  }

  // Update user_profiles with the new user ID
  await supabase
    .from('user_profiles')
    .update({ id: data.user.id })
    .eq('email', 'admin@ombaro.com')

  console.log('Admin user created:', data.user)
}

createAdminUser()
```

## Verification Steps

After creating admin users:

1. **Test Login**:
   - Go to your app login page
   - Try logging in with the admin credentials
   - Verify you can access the admin dashboard

2. **Test Vendor Application Visibility**:
   - Submit a test vendor application
   - Log in as admin
   - Navigate to vendor applications screen
   - Verify you can see the submitted application

3. **Check RLS Policies**:
```sql
-- Verify admin user exists and has correct role
SELECT u.id, u.email, p.role, p.status
FROM auth.users u
JOIN user_profiles p ON p.id = u.id
WHERE p.role IN ('admin', 'super_admin');
```

## Login Credentials (After Setup)

- **Admin**: admin@ombaro.com / Admin@123456
- **Super Admin**: superadmin@ombaro.com / SuperAdmin@123456
- **Employee**: employee@ombaro.com / Employee@123456

**IMPORTANT**: Change these passwords immediately after first login!

## What I've Fixed

1. ✅ Updated `VendorApprovalService` to properly map JSONB fields
2. ✅ Fixed `VendorApprovalScreen` to access nested data correctly
3. ✅ Fixed `VendorApprovalDashboard` for employee access
4. ✅ Added missing service methods (`getApplicationsForLevel`, `getApprovalHistory`, `requestAdditionalInfo`)
5. ✅ Verified `VendorOnboardingForm` inserts data correctly
6. ✅ Confirmed RLS policies are properly configured

## Current Status

- ✅ Database schema is correct (uses JSONB structure)
- ✅ Application form works correctly
- ✅ Admin/Employee dashboards are fixed
- ⚠️ **Admin users need to be created in auth.users**
- ⚠️ Once admins can log in, everything will work

## Next Steps

1. Create admin users using one of the methods above
2. Test login with admin credentials
3. Submit a vendor application
4. Verify it appears in the admin dashboard
5. Change default passwords for security
