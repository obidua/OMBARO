# Quick Start Guide - OMBARO Platform

## What You Have Now

Your OMBARO platform is now fully configured with:
- **143 database tables** across 17 categories
- **4 service layers** for database operations
- **5 application portals** (Customer, Vendor, Therapist, Employee, Admin)
- **Dynamic routing** based on user roles
- **Row Level Security** protecting all data
- **Supabase integration** for real-time features

## Step 1: Apply Database Migration (2 minutes)

### Option A: Using Supabase Dashboard
1. Go to [your Supabase dashboard](https://supabase.com/dashboard)
2. Select your project
3. Click "SQL Editor" in the left sidebar
4. Click "New Query"
5. Open file: `supabase/migrations/20250110_consolidated_143_tables.sql`
6. Copy all contents and paste into SQL Editor
7. Click "Run" button
8. Wait for success message

### Option B: Using Supabase CLI (if installed)
```bash
supabase db push
```

### Verify Migration Success
Run this query in SQL Editor:
```sql
SELECT COUNT(*) as total_tables
FROM information_schema.tables
WHERE table_schema = 'public';
```
Should return: **143 tables**

## Step 2: Verify Environment Variables (30 seconds)

Check your `.env` file has:
```env
VITE_SUPABASE_URL=https://0ec90b57d6e95fcbda19832f.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

These are already configured. No changes needed.

## Step 3: Install Dependencies (if not already done)

```bash
npm install
```

Package `@supabase/supabase-js` is already installed.

## Step 4: Start Development Server

```bash
npm run dev
```

Your app will start at: `http://localhost:5173`

## Step 5: Test Database Connection

### Using Database Example Component

Create a test file or add to existing component:

```typescript
import { DatabaseExample } from './components/examples/DatabaseExample';

// Use in your app
<DatabaseExample />
```

This will show:
- ✅ Database connection status
- 📊 143 tables confirmation
- 🚪 All 5 portal types

### Using Service Layer Directly

```typescript
import { authService } from './services';

// Test connection
const testConnection = async () => {
  try {
    const user = await authService.getCurrentUser();
    console.log('Database connected!', user);
  } catch (error) {
    console.error('Connection failed:', error);
  }
};

testConnection();
```

## Step 6: Create Test Users

### Create Admin User (via Supabase Dashboard)

1. Go to Supabase Dashboard → Authentication → Users
2. Click "Add User"
3. Email: `admin@ombaro.com`
4. Password: `admin123`
5. Auto-confirm user: ✅ Yes

Then run in SQL Editor:
```sql
INSERT INTO user_profiles (id, name, mobile, role, status)
VALUES (
  'USER_UUID_FROM_AUTH_TABLE',
  'Admin User',
  '+1234567890',
  'admin',
  'active'
);
```

### Create Customer User

```typescript
import { authService } from './services';

const createCustomer = async () => {
  const user = await authService.signUp({
    mobile: '+1234567890',
    password: 'customer123',
    name: 'John Customer',
    role: 'customer'
  });
  console.log('Customer created:', user);
};
```

### Create Vendor User

```typescript
const createVendor = async () => {
  const user = await authService.signUp({
    mobile: '+1234567891',
    password: 'vendor123',
    name: 'Vendor Business',
    role: 'vendor'
  });
  console.log('Vendor created:', user);
};
```

## Step 7: Test Portal Routing

### Test Different User Roles

1. **Login as Customer**
   - Go to login screen
   - Enter customer credentials
   - Should see: Home screen with services

2. **Login as Vendor**
   - Go to login screen
   - Enter vendor credentials
   - Should see: Vendor dashboard

3. **Login as Admin**
   - Go to login screen
   - Enter admin credentials
   - Should see: Admin dashboard

### Portal Context Usage

```typescript
import { usePortal } from './context/PortalContext';

function MyComponent() {
  const { currentPortal, userProfile, isAuthenticated } = usePortal();

  return (
    <div>
      <p>Current Portal: {currentPortal}</p>
      <p>User: {userProfile?.name}</p>
      <p>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</p>
    </div>
  );
}
```

## Step 8: Create Sample Data

### Add Services

```sql
-- Add service categories
INSERT INTO service_categories (name, code, description, is_active)
VALUES
  ('Massage', 'MASSAGE', 'Various massage services', true),
  ('Spa', 'SPA', 'Spa treatments', true);

-- Add services
INSERT INTO services (code, name, category_id, description, duration_minutes, base_price, is_active)
VALUES
  ('SWE-60', 'Swedish Massage', 'CATEGORY_UUID', 'Relaxing full body massage', 60, 80.00, true),
  ('DEEP-60', 'Deep Tissue', 'CATEGORY_UUID', 'Intense muscle therapy', 60, 100.00, true);
```

### Add Locations

```sql
-- Add country
INSERT INTO countries (name, code, phone_code, currency, is_active)
VALUES ('United States', 'US', '+1', 'USD', true);

-- Add state
INSERT INTO states (country_id, name, code, is_active)
VALUES ('COUNTRY_UUID', 'California', 'CA', true);

-- Add city
INSERT INTO cities (state_id, name, is_active)
VALUES ('STATE_UUID', 'Los Angeles', true);
```

## Step 9: Make Your First Booking

```typescript
import { bookingService } from './services';

const createTestBooking = async () => {
  const booking = await bookingService.createBooking({
    customer_id: 'CUSTOMER_UUID',
    vendor_id: 'VENDOR_UUID',
    customer_address_id: 'ADDRESS_UUID',
    booking_date: '2025-10-15',
    booking_time: '14:00',
    services: [
      {
        service_id: 'SERVICE_UUID',
        service_name: 'Swedish Massage',
        duration_minutes: 60,
        price: 80.00,
        quantity: 1
      }
    ],
    subtotal: 80.00,
    tax_amount: 6.40,
    total_amount: 86.40
  });

  console.log('Booking created:', booking);
};
```

## Step 10: Build for Production

```bash
npm run build
```

Output will be in `/dist` folder.

## Common Operations

### Check Current User

```typescript
import { authService } from './services';

const user = await authService.getCurrentUser();
console.log(user);
```

### Get User Profile

```typescript
const profile = await authService.getUserProfile(user.id);
console.log(profile);
```

### Create Vendor

```typescript
import { vendorService } from './services';

const vendor = await vendorService.createVendor(userId, {
  business_name: 'Spa Paradise',
  owner_name: 'Jane Smith',
  mobile: '+1234567892',
  email: 'contact@spaparadise.com',
  address: { street: '123 Main St', city: 'LA', state: 'CA', zip: '90001' }
});
```

### Create Therapist

```typescript
import { therapistService } from './services';

const therapist = await therapistService.createTherapist(vendorId, userId, {
  name: 'Sarah Therapist',
  mobile: '+1234567893',
  email: 'sarah@example.com',
  gender: 'female',
  experience_years: 5,
  specializations: ['Swedish', 'Deep Tissue'],
  languages: ['English', 'Spanish']
});
```

### Get Vendor Bookings

```typescript
const bookings = await bookingService.getVendorBookings(vendorId);
console.log(`${bookings.length} bookings found`);
```

## Troubleshooting

### Database Connection Error

**Error**: "Database connection failed"

**Solution**:
1. Check `.env` file has correct Supabase URL and key
2. Verify Supabase project is active
3. Check network connection
4. Verify migration was applied successfully

### RLS Policy Error

**Error**: "Row level security policy violation"

**Solution**:
1. Make sure user is authenticated
2. Check user has correct role in `user_profiles` table
3. Verify RLS policies in Supabase dashboard

### Service Not Found

**Error**: "Table does not exist"

**Solution**:
1. Verify migration was applied: `SELECT COUNT(*) FROM services;`
2. Check table name is correct (case-sensitive)
3. Re-run migration if tables are missing

### Build Errors

**Error**: TypeScript errors

**Solution**:
```bash
# Clear cache
rm -rf node_modules dist
npm install
npm run build
```

## Next Steps

1. **Seed More Data**: Add categories, services, locations
2. **Build Features**: Implement specific portal features
3. **Add Real-time**: Enable Supabase real-time subscriptions
4. **Testing**: Write tests for services
5. **Deploy**: Deploy to production (Netlify, Vercel, etc.)

## Useful SQL Queries

### Check All Tables
```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;
```

### Check RLS Status
```sql
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public';
```

### Count Records
```sql
SELECT
  (SELECT COUNT(*) FROM user_profiles) as users,
  (SELECT COUNT(*) FROM vendors) as vendors,
  (SELECT COUNT(*) FROM therapists) as therapists,
  (SELECT COUNT(*) FROM bookings) as bookings,
  (SELECT COUNT(*) FROM services) as services;
```

### Recent Bookings
```sql
SELECT
  b.booking_number,
  up.name as customer_name,
  v.business_name as vendor_name,
  b.booking_status,
  b.total_amount,
  b.created_at
FROM bookings b
JOIN customers c ON b.customer_id = c.id
JOIN user_profiles up ON c.user_id = up.id
JOIN vendors v ON b.vendor_id = v.id
ORDER BY b.created_at DESC
LIMIT 10;
```

## Support

- **Database Documentation**: See `DATABASE_IMPLEMENTATION.md`
- **Full Implementation**: See `IMPLEMENTATION_SUMMARY.md`
- **Service Layer**: Check `src/services/*.ts` files
- **Portal System**: Check `src/context/PortalContext.tsx`

## Success Checklist

- ✅ Migration applied (143 tables)
- ✅ Environment variables set
- ✅ Dependencies installed
- ✅ Dev server running
- ✅ Database connection tested
- ✅ Test users created
- ✅ Portal routing working
- ✅ Build successful

**You're ready to start building features!**

---

**Quick Reference**:
- Tables: 143
- Services: 4 (auth, booking, vendor, therapist)
- Portals: 5 (customer, vendor, therapist, employee, admin)
- Security: RLS enabled on all tables
- Build: ✅ Successful
