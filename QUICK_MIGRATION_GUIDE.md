# Quick Migration Guide

## Migrate Database from Old to New Supabase Instance

This is a simplified, step-by-step guide to migrate your database.

---

## Current Situation

- **Old Database** (vspkiuissuuesjsnnpqr): 71 tables with all your production data
- **New Database** (yjdjujhtpuzyhvicivyi): Empty (0 tables)
- **Goal**: Move everything from old to new database

---

## Option 1: Using Supabase Dashboard (Easiest)

### Step 1: Apply Schema to New Database

1. Open new Supabase project: https://supabase.com/dashboard/project/yjdjujhtpuzyhvicivyi
2. Go to **SQL Editor**
3. Click **"New Query"**
4. Open file: `supabase/migrations/20250115_clean_production_schema.sql`
5. Copy ALL content and paste into SQL Editor
6. Click **"Run"** (or press Ctrl+Enter)
7. Wait 5-10 seconds for completion
8. Go to **Table Editor** and verify you now have 60+ tables

### Step 2: Export Data from Old Database

1. Open old Supabase project: https://supabase.com/dashboard/project/vspkiuissuuesjsnnpqr
2. Go to **Database** → **Backups**
3. Click **"Create Backup"** or **"Download Latest Backup"**
4. Download the backup file (.sql or .dump format)

### Step 3: Import Data to New Database

1. Go back to new project SQL Editor
2. If backup is .sql format:
   - Open the backup file
   - Copy sections related to `INSERT` statements
   - Paste and run in SQL Editor (in small batches if needed)

3. If backup is .dump format, you'll need psql (see Option 2)

### Step 4: Update Your Application

1. Open `.env` file in project root
2. Update these lines:
   ```env
   VITE_SUPABASE_URL=https://yjdjujhtpuzyhvicivyi.supabase.co
   VITE_SUPABASE_ANON_KEY=[GET THIS FROM NEW PROJECT SETTINGS]
   ```
3. Get the anon key from: New Project → Settings → API → Copy "anon public" key

4. Save the file

5. Test your application:
   ```bash
   npm run dev
   ```

---

## Option 2: Using Command Line (Most Reliable)

### Prerequisites
- PostgreSQL client tools installed (`psql`, `pg_dump`, `pg_restore`)
- Database passwords for both old and new databases

### Step 1: Get Database Passwords

**Old Database**:
1. Go to https://supabase.com/dashboard/project/vspkiuissuuesjsnnpqr
2. Settings → Database → Connection String → Transaction mode
3. Copy the password (or reset it)

**New Database**:
1. Go to https://supabase.com/dashboard/project/yjdjujhtpuzyhvicivyi
2. Settings → Database → Connection String → Transaction mode
3. Copy the password (or reset it)

### Step 2: Apply Schema

```bash
# Navigate to project directory
cd /path/to/ombaro-project

# Apply schema migration
psql "postgresql://postgres:[NEW-PASSWORD]@db.yjdjujhtpuzyhvicivyi.supabase.co:5432/postgres" \
  -f supabase/migrations/20250115_clean_production_schema.sql
```

### Step 3: Export Data

```bash
# Export all data from old database
pg_dump "postgresql://postgres:[OLD-PASSWORD]@db.vspkiuissuuesjsnnpqr.supabase.co:5432/postgres" \
  --data-only \
  --no-owner \
  --no-privileges \
  --column-inserts \
  -f ombaro_data_backup.sql
```

### Step 4: Import Data

```bash
# Import data to new database
psql "postgresql://postgres:[NEW-PASSWORD]@db.yjdjujhtpuzyhvicivyi.supabase.co:5432/postgres" \
  -f ombaro_data_backup.sql
```

### Step 5: Verify

```bash
# Check table counts in new database
psql "postgresql://postgres:[NEW-PASSWORD]@db.yjdjujhtpuzyhvicivyi.supabase.co:5432/postgres" \
  -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';"

# Check some data
psql "postgresql://postgres:[NEW-PASSWORD]@db.yjdjujhtpuzyhvicivyi.supabase.co:5432/postgres" \
  -c "SELECT COUNT(*) FROM customers;"
psql "postgresql://postgres:[NEW-PASSWORD]@db.yjdjujhtpuzyhvicivyi.supabase.co:5432/postgres" \
  -c "SELECT COUNT(*) FROM vendors;"
psql "postgresql://postgres:[NEW-PASSWORD]@db.yjdjujhtpuzyhvicivyi.supabase.co:5432/postgres" \
  -c "SELECT COUNT(*) FROM bookings;"
```

### Step 6: Update Application

Update `.env` file as described in Option 1, Step 4.

---

## Option 3: Using Python Script (Automated)

### Prerequisites
- Python 3.7+ installed
- pip package manager

### Step 1: Install Dependencies

```bash
pip install psycopg2-binary
```

### Step 2: Update Migration Script

Edit `migrate_database.py` and replace placeholders:

```python
OLD_DB = "postgresql://postgres:[OLD-PASSWORD]@db.vspkiuissuuesjsnnpqr.supabase.co:5432/postgres"
NEW_DB = "postgresql://postgres:[NEW-PASSWORD]@db.yjdjujhtpuzyhvicivyi.supabase.co:5432/postgres"
```

### Step 3: Run Migration

```bash
python3 migrate_database.py
```

The script will:
- ✓ Connect to both databases
- ✓ Apply schema migrations
- ✓ Copy all data table by table
- ✓ Verify row counts
- ✓ Show detailed progress

### Step 4: Update Application

Update `.env` file as described in Option 1, Step 4.

---

## Verification Checklist

After migration, verify these things work:

### In Supabase Dashboard (New Database):

- [ ] Table Editor shows 60+ tables
- [ ] Tables contain data (check a few like customers, vendors, bookings)
- [ ] No error messages in Logs section

### In Your Application:

- [ ] Application starts without errors (`npm run dev`)
- [ ] Can log in with existing user credentials
- [ ] Customer dashboard loads correctly
- [ ] Vendor dashboard shows their data
- [ ] Therapist assignments display properly
- [ ] Bookings history is visible
- [ ] All images/files load correctly

---

## Common Issues & Solutions

### Issue: "No tables in new database"

**Solution**: The schema migration didn't run. Go back to Step 1 and apply the migration file.

### Issue: "Foreign key constraint violation"

**Solution**: Tables were imported in wrong order. Drop all data and reimport:

```sql
TRUNCATE TABLE [tablename] CASCADE;
-- Then reimport in correct order
```

### Issue: "Connection refused" or "Password authentication failed"

**Solution**:
1. Check your database password
2. Make sure you're using the correct connection string
3. Try resetting the database password in Supabase Dashboard

### Issue: "Data is there but application shows empty"

**Solution**: Check RLS (Row Level Security) policies:

```sql
-- Verify RLS is enabled
SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public';

-- If needed, you can temporarily disable for testing (NOT for production!)
ALTER TABLE tablename DISABLE ROW LEVEL SECURITY;
```

---

## Important Notes

1. **Don't Delete Old Database Yet**: Keep it running for at least 1 week after migration as backup
2. **Test Thoroughly**: Spend time testing all features before going live
3. **Monitor Errors**: Check Supabase logs regularly for first few days
4. **Keep Backup**: Always have a backup of your data before migration

---

## Need Help?

If you get stuck:

1. Check the detailed guide: `MIGRATION_INSTRUCTIONS.md`
2. Review Supabase logs in Dashboard → Logs
3. Check PostgreSQL error messages for clues
4. Verify your connection strings are correct

---

## Success Criteria

Migration is successful when:

✓ New database has same number of tables as old (60+)
✓ Row counts match between old and new databases
✓ Application connects and works with new database
✓ All user authentication works
✓ All features function correctly
✓ No errors in logs after 24 hours of use

---

**Estimated Time**: 30 minutes - 2 hours (depending on data size and method chosen)

**Recommended Option**: Option 2 (Command Line) for reliability, or Option 3 (Python) for automation
