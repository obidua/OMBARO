# Database Connection Guide

## Step 1: Get Database Password from Supabase

1. Go to: https://supabase.com/dashboard/project/vspkiuissuuesjsnnpqr/settings/database
2. Scroll down to "Connection string" section
3. Click "Show" to reveal your database password
4. Copy the password (it will look something like: `your-secure-password-here`)

## Step 2: Update Backend .env File

Open `backend/.env` and replace `[YOUR-DB-PASSWORD]` with your actual database password in these two lines:

```env
DATABASE_URL=postgresql://postgres.vspkiuissuuesjsnnpqr:[YOUR-DB-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:5432/postgres
ASYNC_DATABASE_URL=postgresql+asyncpg://postgres.vspkiuissuuesjsnnpqr:[YOUR-DB-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

**Note**: The connection string format may vary by region. If the above doesn't work, copy the exact connection string from Supabase Dashboard and:
- For `DATABASE_URL`: Use the direct connection (port 5432)
- For `ASYNC_DATABASE_URL`: Use the pooled connection (port 6543) and add `+asyncpg` after `postgresql`

## Step 3: Execute Database Migrations

### 3.1 Open Supabase SQL Editor
Go to: https://supabase.com/dashboard/project/vspkiuissuuesjsnnpqr/sql

### 3.2 Run Main Production Schema (REQUIRED)
1. Open file: `supabase/migrations/20250115_clean_production_schema.sql`
2. Copy the entire contents
3. Paste into Supabase SQL Editor
4. Click "Run" button
5. Wait for completion (takes ~5 seconds)
6. Verify: You should see "Success. No rows returned"

This creates all 60 core tables including:
- System settings and logs
- Departments, roles, and permissions
- User profiles and authentication
- Vendors, therapists, and customers
- Services and bookings
- Payments and support tickets

### 3.3 Run Additional Migrations (In Order)

Execute these in the SQL Editor one by one:

1. **Departments & Dashboard Infrastructure**
   - File: `supabase/migrations/20251007225206_create_departments_and_dashboard_infrastructure.sql`
   - Creates: department modules, widgets, settings, user assignments

2. **Vendor Onboarding**
   - File: `supabase/migrations/20251007210243_01_vendor_onboarding_core_tables.sql`
   - Creates: vendor categories, onboarding workflow

3. **Notification System**
   - File: `supabase/migrations/20251007210817_02_automated_notification_triggers.sql`
   - Creates: automated notification triggers

4. **Beautician Portal** (Optional)
   - File: `supabase/migrations/20251007230000_create_beauticians_portal.sql`
   - Creates: beautician-specific tables and features

## Step 4: Verify Database Setup

Run this query in SQL Editor to check table count:

```sql
SELECT COUNT(*) as table_count
FROM information_schema.tables
WHERE table_schema = 'public';
```

Expected result: Around 60-70 tables

## Step 5: Check Row Level Security

Run this query to verify RLS is enabled:

```sql
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public' AND rowsecurity = true;
```

Expected: Most user-facing tables should show `rowsecurity = true`

## Step 6: Insert Default Data

The main migration already includes default data for:
- ✅ Countries (India)
- ✅ Departments (Admin, HR, Operations, Finance, IT, Marketing, Customer Care)
- ✅ Roles (Super Admin, Admin, Customer, Vendor, Therapist, Employee)
- ✅ Service Categories

## Step 7: Test Connection

### Frontend Test
```bash
npm run dev
```

The console should show: "Initializing Supabase client with URL: https://vspkiuissuuesjsnnpqr.supabase.co"

### Backend Test
```bash
cd backend
python -m uvicorn app.main:app --reload
```

Visit: http://localhost:8000/health

Expected response:
```json
{
  "status": "healthy",
  "database": "connected",
  "redis": "disconnected"
}
```

## Troubleshooting

### Error: "password authentication failed"
- Double-check the database password in `backend/.env`
- Ensure there are no spaces or special characters that need escaping
- Try copying the connection string directly from Supabase Dashboard

### Error: "could not connect to server"
- Verify your IP is allowed in Supabase Dashboard → Settings → Database → Connection Pooling
- Check if you're using the correct region in the connection string
- Try using the direct connection string from Supabase Dashboard

### Error: "relation does not exist"
- You haven't run the migrations yet
- Go back to Step 3 and execute all migrations

### Error: "RLS policy violation"
- Row Level Security is working correctly!
- You need to authenticate first before accessing protected tables
- Use the service role key for backend operations

## Next Steps

After successful connection:
1. ✅ Frontend can now query Supabase tables directly
2. ✅ Backend can perform complex database operations
3. ✅ Both share the same authentication system
4. ✅ Ready to implement booking, vendor, and therapist features

## Important Notes

- **Never commit** your database password or service role key to version control
- Use `.env` files which are gitignored
- The anon key is safe for frontend use (it respects RLS policies)
- The service role key **bypasses RLS** - only use in backend
- Always use connection pooling (port 6543) for production applications
