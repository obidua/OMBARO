# Dynamic Login System - OMBARO Platform

## Overview

The OMBARO platform now uses a fully dynamic authentication system that connects to Supabase database for user authentication. All demo credentials have been removed and replaced with a flexible, role-based login system.

## Default Login Credentials

All system users follow the pattern: **{role}321** with password **1234**

### Available Login Credentials

| Role | Username | Password | Access Level |
|------|----------|----------|--------------|
| Admin | admin321 | 1234 | Full system admin access |
| Super Admin | super_admin321 | 1234 | Enhanced admin dashboard |
| Employee | employee321 | 1234 | Employee dashboard with approvals |
| Vendor | vendor321 | 1234 | Vendor dashboard with services |
| Accounts Department | accounts_department321 | 1234 | Accounts department dashboard |
| Marketing Department | marketing_department321 | 1234 | Marketing department dashboard |
| Finance Department | finance_department321 | 1234 | Finance department dashboard |
| Legal Department | legal_department321 | 1234 | Legal department dashboard |
| Customer Care | customer_care321 | 1234 | Customer care dashboard |
| HR Department | hr_department321 | 1234 | HR department dashboard |
| IT Department | it_department321 | 1234 | IT department dashboard |
| Field Officer | fo_department321 | 1234 | Field officer dashboard |

## How It Works

### 1. **Authentication Flow**

```typescript
User enters credentials → AuthService.login() → 
Check user_profiles table → Verify role matches → 
Authenticate with Supabase Auth → Return user data → 
Navigate to appropriate dashboard
```

### 2. **AuthService**

Located at: `src/services/auth.service.ts`

**Key Methods:**
- `login(credentials)` - Authenticate user with username/password
- `logout()` - Sign out current user
- `getCurrentUser()` - Get authenticated user details
- `checkUserExists()` - Verify if user exists with specific role

### 3. **Database Integration**

**user_profiles table:**
- Stores all user information
- `role` column determines user type
- `mobile` can be used as username
- `email` alternative login method

**Authentication Logic:**
1. Check if user exists in `user_profiles` with specified role
2. Try Supabase Auth login (phone or email)
3. Fallback to legacy check: username matches `{role}321` format with password `1234`
4. Return user data and navigate to appropriate dashboard

### 4. **Vendor Self-Registration**

Vendors who register through the onboarding form:
- Set their own password during registration
- Create Supabase Auth account with phone number
- Role set to `vendor_applicant` initially
- After approval, role changes to `vendor`
- Can login with mobile number + password

## Login Screens

All login screens have been updated:
- ✅ AuthLoginScreen - Dynamic for all user types
- ✅ TherapistLoginScreen - Dynamic authentication
- ✅ BeauticianLoginScreen - Dynamic authentication
- ✅ Demo credentials removed from all screens

## Testing the Login System

### Test Admin Login:
1. Go to Welcome screen
2. Select "Admin" login option
3. Enter username: `admin321`
4. Enter password: `1234`
5. You'll be redirected to Admin Dashboard

### Test Vendor Self-Registration:
1. Navigate to "Become a Partner" page
2. Fill vendor onboarding form
3. Set your own password (must meet requirements)
4. Submit application
5. Login with mobile number + your password
6. See VendorApplicantPortal with application tracking
7. After admin approval, get full vendor portal access

### Test Employee Login:
1. Select "Employee" login option
2. Enter username: `employee321`
3. Enter password: `1234`
4. Access Employee Dashboard with approval capabilities

## Migration Files

### Default Users Seeded:
Location: `supabase/migrations/20251014090000_seed_default_users.sql`

This migration creates all default users with:
- Standardized username format
- Associated employee/vendor records
- Proper role assignments
- Active status

## Security Notes

### Development vs Production:
- **Development:** Simple `{role}321` / `1234` credentials allowed
- **Production:** Should enforce stronger passwords
- **Vendor Registration:** Always requires strong password (enforced)

### Password Requirements (for vendor self-registration):
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character

## Database Schema

### user_profiles
```sql
- id: uuid (primary key)
- name: text
- email: text
- mobile: text (unique, can be used as username)
- role: text (determines user type)
- status: text (active/inactive/suspended)
```

### employees
```sql
- user_id: uuid (references user_profiles)
- employee_id: text
- hierarchy_level: integer (1-5 for approval workflow)
- can_approve_vendors: boolean
```

### vendors
```sql
- user_id: uuid (references user_profiles)
- application_id: uuid (references vendor_applications)
- business_name: text
- is_active: boolean
- onboarding_completed: boolean
```

## Troubleshooting

### Login fails with "Invalid credentials":
1. Check if user exists in user_profiles table
2. Verify role matches the login type selected
3. Ensure username format is correct: `{role}321`
4. Password should be `1234` for system users

### Vendor can't login after registration:
1. Check if user was created in Supabase Auth
2. Verify user_profiles record exists
3. Check application status in vendor_applications table
4. Ensure password was correctly hashed during signup

### Role-based access not working:
1. Verify user's role in user_profiles table
2. Check if role matches expected UserRole type
3. Ensure navigation logic in useAuth handles the role

## API Endpoints

### Supabase Queries Used:

**Check user by username and role:**
```typescript
supabase
  .from('user_profiles')
  .select('*')
  .or(`mobile.eq.${username},email.eq.${username}`)
  .eq('role', userType)
  .maybeSingle()
```

**Authenticate with phone:**
```typescript
supabase.auth.signInWithPassword({
  phone: username,
  password: password
})
```

**Authenticate with email:**
```typescript
supabase.auth.signInWithPassword({
  email: email,
  password: password
})
```

## Benefits of Dynamic System

1. **Database-Driven:** All users stored in Supabase
2. **Role-Based Access:** Automatic routing based on user role
3. **Flexible Authentication:** Username or mobile number login
4. **Vendor Self-Service:** Complete registration and login workflow
5. **Secure:** Leverages Supabase Auth for password management
6. **Scalable:** Easy to add new roles and users
7. **Auditable:** All login attempts tracked by Supabase

## Next Steps

To add a new user type:
1. Add role to `UserRole` type in `src/types/auth.ts`
2. Create user in `user_profiles` table with username `{role}321`
3. Add navigation case in `useAuth.ts` `loginUser()` method
4. Create corresponding dashboard component
5. User can login with `{role}321` / `1234`

## Support

For authentication issues, check:
- Browser console for error messages
- Supabase dashboard for auth logs
- user_profiles table for user data
- Network tab for API call failures
