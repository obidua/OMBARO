# Quick Start Guide - OMBARO Platform

## Login Credentials (All use password: 1234)

| User Type | Username | Dashboard Access |
|-----------|----------|------------------|
| Admin | `admin321` | Full system administration |
| Employee | `employee321` | Employee operations & approvals |
| Vendor | `vendor321` | Vendor portal (demo account) |
| Super Admin | `super_admin321` | Enhanced admin features |

## Quick Login Steps

### 1. Login as Admin
```
1. Open app → Click "Admin" → Enter:
   Username: admin321
   Password: 1234
2. Access Admin Dashboard
3. Click "Vendor Approvals" to see applications
```

### 2. Register New Vendor (Self-Service)
```
1. Click "Become a Partner"
2. Fill form with:
   - Business details
   - Contact information
   - Set YOUR OWN password (e.g., Test@1234)
3. Submit application
4. Note your application number
```

### 3. Track Vendor Application
```
1. Go to Vendor Login
2. Enter mobile number from registration
3. Enter password you set
4. See VendorApplicantPortal
5. Track approval progress through 5 stages
```

### 4. Approve Vendor Application (as Admin)
```
1. Login as admin321
2. Go to "Vendor Approvals"
3. Find your application
4. Click "View Details"
5. Click "Approve"
6. After 5 approvals, vendor account activated
```

## Database Setup

Run migrations to create default users:
```bash
cd supabase
supabase db push
```

Or manually run:
```bash
npm run supabase:migrate
```

## All System Users (Username Format: {role}321)

- `admin321` - Admin
- `employee321` - Employee  
- `vendor321` - Vendor
- `super_admin321` - Super Admin
- `accounts_department321` - Accounts
- `marketing_department321` - Marketing
- `finance_department321` - Finance
- `legal_department321` - Legal
- `customer_care321` - Customer Care
- `hr_department321` - HR
- `it_department321` - IT
- `fo_department321` - Field Officer

**All passwords: 1234**

## Key Features

✅ Dynamic database-driven authentication
✅ Role-based access control
✅ Vendor self-registration with password
✅ Real-time application tracking
✅ 5-level approval workflow
✅ Automatic vendor account activation
✅ No demo/hardcoded credentials

## Support

Check these files for detailed info:
- `DYNAMIC_LOGIN_SYSTEM.md` - Full authentication docs
- `IMPLEMENTATION_SUMMARY.md` - Complete feature list
- `VENDOR_ONBOARDING_APPROVAL_SYSTEM.md` - Approval process

## Troubleshooting

**Can't login?**
- Check username format: `{role}321`
- Password is `1234` for all system users
- Ensure user exists in database

**Vendor registration fails?**
- Password must meet requirements (8+ chars, uppercase, lowercase, number, special)
- Mobile number must be unique
- Fill all required fields

**Application not showing?**
- Check if migrations ran successfully
- Verify user has proper role in database
- Check browser console for errors

## Next Steps

1. Apply database migrations
2. Test admin login
3. Register a test vendor
4. Approve the application
5. Login as approved vendor
