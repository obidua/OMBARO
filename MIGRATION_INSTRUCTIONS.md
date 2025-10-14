# Database Migration Instructions

## Complete Migration from Old to New Supabase Database

This guide provides step-by-step instructions to migrate all tables and data from your old Supabase database (vspkiuissuuesjsnnpqr) to the new database (yjdjujhtpuzyhvicivyi).

---

## Overview

**Old Database**: vspkiuissuuesjsnnpqr (71 tables)
**New Database**: yjdjujhtpuzyhvicivyi (currently empty)

**Migration Strategy**:
1. Apply schema migrations to new database
2. Export data from old database
3. Import data to new database
4. Verify migration
5. Update application configuration

---

## Prerequisites

- Access to both Supabase dashboard accounts
- PostgreSQL client (psql) or pgAdmin (optional but recommended)
- Backup of old database (highly recommended)

---

## Step 1: Backup Old Database

**IMPORTANT**: Always backup before migration!

### Using Supabase Dashboard:
1. Go to old project: https://supabase.com/dashboard/project/vspkiuissuuesjsnnpqr
2. Navigate to Database → Backups
3. Click "Download Backup" or create a manual backup point

### Using psql:
```bash
pg_dump "postgresql://postgres:[PASSWORD]@db.vspkiuissuuesjsnnpqr.supabase.co:5432/postgres" \
  -F c -f ombaro_backup_$(date +%Y%m%d).dump
```

---

## Step 2: Apply Schema Migrations to New Database

### Option A: Using Supabase Dashboard (Recommended)

1. Go to new project: https://supabase.com/dashboard/project/yjdjujhtpuzyhvicivyi
2. Navigate to SQL Editor
3. Create a new query
4. Copy the contents of `supabase/migrations/20250115_clean_production_schema.sql`
5. Paste and click "Run" or press Ctrl+Enter
6. Wait for completion (should take ~5-10 seconds)
7. Verify success by checking Tables in the Table Editor

### Option B: Using psql

```bash
psql "postgresql://postgres:[PASSWORD]@db.yjdjujhtpuzyhvicivyi.supabase.co:5432/postgres" \
  -f supabase/migrations/20250115_clean_production_schema.sql
```

### Verify Schema Creation:

Run this query in the SQL Editor:

```sql
SELECT COUNT(*) as table_count
FROM information_schema.tables
WHERE table_schema = 'public';
```

**Expected Result**: Should return 60+ tables

---

## Step 3: Export Data from Old Database

### Method 1: Using pg_dump (Recommended for All Data)

Export all data in custom format:

```bash
pg_dump "postgresql://postgres:[PASSWORD]@db.vspkiuissuuesjsnnpqr.supabase.co:5432/postgres" \
  -F c \
  --data-only \
  --no-owner \
  --no-privileges \
  -f ombaro_data_export.dump
```

Or export as SQL file:

```bash
pg_dump "postgresql://postgres:[PASSWORD]@db.vspkiuissuuesjsnnpqr.supabase.co:5432/postgres" \
  --data-only \
  --no-owner \
  --no-privileges \
  --column-inserts \
  -f ombaro_data_export.sql
```

### Method 2: Export Specific Tables as CSV

If you want more control, export each table:

```bash
# Connect to old database
psql "postgresql://postgres:[PASSWORD]@db.vspkiuissuuesjsnnpqr.supabase.co:5432/postgres"

# Export tables one by one
\copy countries TO 'data/countries.csv' CSV HEADER;
\copy states TO 'data/states.csv' CSV HEADER;
\copy cities TO 'data/cities.csv' CSV HEADER;
# ... repeat for other tables
```

### Method 3: Using Python Script

Use the provided `migrate_database.py` script:

1. Update database credentials in the script
2. Install required package: `pip install psycopg2-binary`
3. Run: `python3 migrate_database.py`

---

## Step 4: Import Data to New Database

### Using pg_restore (if you used pg_dump):

```bash
pg_restore "postgresql://postgres:[PASSWORD]@db.yjdjujhtpuzyhvicivyi.supabase.co:5432/postgres" \
  --data-only \
  --no-owner \
  --no-privileges \
  --disable-triggers \
  ombaro_data_export.dump
```

### Using psql (if you exported as SQL):

```bash
psql "postgresql://postgres:[PASSWORD]@db.yjdjujhtpuzyhvicivyi.supabase.co:5432/postgres" \
  -f ombaro_data_export.sql
```

### Using CSV Import:

For each CSV file:

```bash
psql "postgresql://postgres:[PASSWORD]@db.yjdjujhtpuzyhvicivyi.supabase.co:5432/postgres"

# Import CSVs in dependency order
\copy countries FROM 'data/countries.csv' CSV HEADER;
\copy states FROM 'data/states.csv' CSV HEADER;
\copy cities FROM 'data/cities.csv' CSV HEADER;
# ... repeat for other tables
```

---

## Step 5: Verify Migration

Run these verification queries in the new database:

### Check Table Counts:

```sql
SELECT
  table_name,
  (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as column_count
FROM information_schema.tables t
WHERE table_schema = 'public'
AND table_type = 'BASE TABLE'
ORDER BY table_name;
```

### Compare Row Counts:

For each important table, verify row counts match:

```sql
-- Run in OLD database
SELECT COUNT(*) FROM customers;
SELECT COUNT(*) FROM vendors;
SELECT COUNT(*) FROM bookings;
SELECT COUNT(*) FROM therapists;

-- Run in NEW database (should match)
SELECT COUNT(*) FROM customers;
SELECT COUNT(*) FROM vendors;
SELECT COUNT(*) FROM bookings;
SELECT COUNT(*) FROM therapists;
```

### Check Data Integrity:

```sql
-- Verify foreign key relationships
SELECT COUNT(*) FROM bookings WHERE customer_id NOT IN (SELECT id FROM customers);
-- Should return 0

-- Verify RLS is enabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
AND rowsecurity = true;
-- Should show all user-facing tables
```

---

## Step 6: Update Environment Variables

Update your `.env` file with new database credentials:

### Before:
```env
VITE_SUPABASE_URL=https://vspkiuissuuesjsnnpqr.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### After:
```env
VITE_SUPABASE_URL=https://yjdjujhtpuzyhvicivyi.supabase.co
VITE_SUPABASE_ANON_KEY=[YOUR-NEW-ANON-KEY]
```

Get your new anon key from:
- Supabase Dashboard → Project Settings → API → `anon` `public`

---

## Step 7: Test Application

1. **Test Authentication**:
   - Try logging in with existing credentials
   - Create a new test account
   - Reset password flow

2. **Test Core Features**:
   - Customer booking flow
   - Vendor dashboard access
   - Therapist assignments
   - Payment processing (use test mode)

3. **Test Data Access**:
   - Verify all existing data is visible
   - Check user profiles load correctly
   - Confirm bookings history displays

4. **Test Real-time Features**:
   - Location tracking
   - Notifications
   - Live updates

---

## Step 8: Post-Migration Optimization

Run these optimization queries on the new database:

```sql
-- Update statistics for query optimization
ANALYZE;

-- Vacuum tables
VACUUM ANALYZE;

-- Reindex if needed
REINDEX DATABASE CONCURRENTLY postgres;
```

---

## Troubleshooting

### Issue: Foreign Key Violations During Import

**Solution**: Import tables in correct dependency order:
1. Countries, States, Cities
2. Departments, Roles, Permissions
3. User profiles
4. Vendors, Therapists
5. Services
6. Customers
7. Bookings
8. Payments

Or temporarily disable triggers:
```sql
ALTER TABLE table_name DISABLE TRIGGER ALL;
-- Import data
ALTER TABLE table_name ENABLE TRIGGER ALL;
```

### Issue: Duplicate Key Errors

**Solution**: Use `ON CONFLICT DO NOTHING` or `ON CONFLICT DO UPDATE`:

```sql
INSERT INTO table_name (columns...)
VALUES (...)
ON CONFLICT (id) DO NOTHING;
```

### Issue: Data Type Mismatches

**Solution**: Cast data types during import:
```sql
INSERT INTO table_name (uuid_column)
VALUES ('string-value'::uuid);
```

### Issue: Missing PostGIS Extension

**Solution**: Enable before importing geographic data:
```sql
CREATE EXTENSION IF NOT EXISTS postgis;
```

---

## Rollback Plan

If migration fails or issues are discovered:

1. **Keep old database active** (don't delete until confident)
2. **Point application back to old database** (revert `.env` changes)
3. **Drop tables from new database if needed**:
   ```sql
   DROP SCHEMA public CASCADE;
   CREATE SCHEMA public;
   ```
4. **Restart migration process**

---

## Migration Checklist

- [ ] Backup old database
- [ ] Apply schema migrations to new database
- [ ] Verify all 60+ tables created
- [ ] Export data from old database
- [ ] Import data to new database
- [ ] Verify row counts match
- [ ] Check foreign key integrity
- [ ] Verify RLS policies active
- [ ] Update `.env` file
- [ ] Test authentication
- [ ] Test core features
- [ ] Test real-time features
- [ ] Run optimization queries
- [ ] Monitor for errors (24-48 hours)
- [ ] Archive old database (don't delete immediately)

---

## Estimated Timeline

- Schema Migration: 5-10 minutes
- Data Export: 10-30 minutes (depends on data size)
- Data Import: 15-45 minutes (depends on data size)
- Verification: 15-30 minutes
- Testing: 1-2 hours
- **Total: 2-4 hours**

---

## Support

If you encounter issues:

1. Check error logs in Supabase Dashboard → Logs
2. Review PostgreSQL logs for detailed error messages
3. Verify network connectivity to both databases
4. Ensure user has proper permissions
5. Check for table locks or active connections

---

## Quick Reference Commands

### Get table list:
```sql
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public' ORDER BY table_name;
```

### Get row count for all tables:
```sql
SELECT
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

### Check active connections:
```sql
SELECT * FROM pg_stat_activity
WHERE datname = 'postgres';
```

---

**Version**: 1.0
**Last Updated**: October 14, 2025
**Status**: Ready for Production Migration
