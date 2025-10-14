# 🚀 START HERE - Database Migration

## You Need to Migrate Your Database

Your old Supabase database (**vspkiuissuuesjsnnpqr**) has 71 tables with all your data.
Your new Supabase database (**yjdjujhtpuzyhvicivyi**) is empty.

**This guide will help you move everything to the new database.**

---

## 📋 What You Have

I've prepared everything you need:

### ✅ Migration Files
1. **20250115_clean_production_schema.sql** - Creates all 60 tables
2. **migrate_database.py** - Automated Python script
3. **QUICK_MIGRATION_GUIDE.md** - Step-by-step instructions
4. **MIGRATION_INSTRUCTIONS.md** - Detailed technical guide
5. **MIGRATION_SUMMARY.md** - Overview and planning

### ✅ Your Data
- 71 tables in old database
- All customers, vendors, therapists, bookings, payments, etc.
- Everything ready to be copied to new database

---

## 🎯 Choose Your Path

### Path A: I Want to Do It Myself
**Time**: 1-2 hours
**Difficulty**: ⭐⭐⭐

1. Read: **QUICK_MIGRATION_GUIDE.md**
2. Follow Option 2 (Command Line) or Option 3 (Python)
3. Test your application
4. Done! ✅

### Path B: I Want Maximum Detail
**Time**: 2-3 hours
**Difficulty**: ⭐⭐⭐⭐

1. Read: **MIGRATION_INSTRUCTIONS.md**
2. Follow comprehensive steps
3. Understand every detail
4. Done! ✅

### Path C: I Want It Automated
**Time**: 30 minutes
**Difficulty**: ⭐⭐

1. Install Python: `pip install psycopg2-binary`
2. Get database passwords from Supabase Dashboard
3. Edit **migrate_database.py** with passwords
4. Run: `python3 migrate_database.py`
5. Update `.env` file
6. Done! ✅

---

## ⚡ Quick Start (3 Steps)

### Step 1: Apply Schema to New Database

```bash
# Option A: Using psql
psql "postgresql://postgres:[PASSWORD]@db.yjdjujhtpuzyhvicivyi.supabase.co:5432/postgres" \
  -f supabase/migrations/20250115_clean_production_schema.sql

# Option B: Using Supabase Dashboard
# 1. Go to SQL Editor
# 2. Copy/paste entire file content
# 3. Click Run
```

### Step 2: Copy Data

```bash
# Export from old
pg_dump "postgresql://postgres:[OLD-PASSWORD]@db.vspkiuissuuesjsnnpqr.supabase.co:5432/postgres" \
  --data-only --column-inserts -f data.sql

# Import to new
psql "postgresql://postgres:[NEW-PASSWORD]@db.yjdjujhtpuzyhvicivyi.supabase.co:5432/postgres" \
  -f data.sql
```

### Step 3: Update Application

Edit `.env`:
```env
VITE_SUPABASE_URL=https://yjdjujhtpuzyhvicivyi.supabase.co
VITE_SUPABASE_ANON_KEY=[GET FROM NEW PROJECT SETTINGS]
```

---

## 🔍 What Gets Migrated

### All Your Tables (71 total):
- ✅ **Users**: Profiles, sessions, documents, preferences
- ✅ **Customers**: Addresses, referrals, loyalty points
- ✅ **Vendors**: Business info, documents, services, staff
- ✅ **Therapists**: Profiles, schedules, leaves, assignments
- ✅ **Bookings**: Full booking history, items, status, notes
- ✅ **Payments**: Transactions, refunds, commissions, wallets
- ✅ **Services**: Categories, packages, addons
- ✅ **Support**: Tickets and messages
- ✅ **System**: Settings, logs, notifications
- ✅ **Geography**: Countries, states, cities, zones

### All Your Data:
- Every customer record
- Every vendor profile
- Every therapist
- Every booking ever made
- Every payment transaction
- All settings and configuration

### All Security:
- Row Level Security (RLS) policies
- Foreign key constraints
- Indexes for performance
- Audit logging

---

## ⚠️ Before You Start

### CRITICAL - DO THIS FIRST:
```bash
# Backup old database
pg_dump "postgresql://postgres:[OLD-PASSWORD]@db.vspkiuissuuesjsnnpqr.supabase.co:5432/postgres" \
  -F c -f ombaro_backup_$(date +%Y%m%d).dump
```

### Get Your Passwords:

**Old Database Password**:
1. Go to: https://supabase.com/dashboard/project/vspkiuissuuesjsnnpqr
2. Settings → Database → Connection String → Copy password

**New Database Password**:
1. Go to: https://supabase.com/dashboard/project/yjdjujhtpuzyhvicivyi
2. Settings → Database → Connection String → Copy password

**New Anon Key**:
1. Same new project
2. Settings → API → Copy "anon public" key

---

## ✅ Verify Migration Success

After migration, check these:

### In Supabase Dashboard:
```
1. Go to Table Editor
2. Should see 60+ tables
3. Click on "customers" - should see your customer data
4. Click on "bookings" - should see your booking history
5. Check "vendors" and "therapists" too
```

### In Your Application:
```bash
# Start app
npm run dev

# Test:
✅ Can login with existing account
✅ See customer dashboard
✅ View booking history
✅ Access vendor portal
✅ Therapist assignments visible
```

---

## 🆘 Having Issues?

### "No tables in new database"
→ Schema didn't apply. Re-run Step 1.

### "Can't connect to database"
→ Check password is correct.

### "Foreign key violation"
→ Data imported in wrong order. See MIGRATION_INSTRUCTIONS.md

### "Application shows empty data"
→ Check RLS policies. See troubleshooting section.

---

## 📚 Documentation Files

| File | Purpose | When to Use |
|------|---------|-------------|
| **START_HERE.md** | This file - Quick overview | First time reading |
| **QUICK_MIGRATION_GUIDE.md** | Simple step-by-step | Ready to migrate |
| **MIGRATION_INSTRUCTIONS.md** | Complete technical guide | Need details |
| **MIGRATION_SUMMARY.md** | Overview and planning | Understanding scope |
| **migrate_database.py** | Automated script | Want automation |

---

## 🎉 Success Looks Like

After successful migration:

✅ New database shows 60+ tables in Supabase Dashboard
✅ All table row counts match old database
✅ Application connects to new database
✅ Users can log in
✅ All features work normally
✅ No errors in logs

---

## 📞 Need Help?

1. **Check logs**: Supabase Dashboard → Logs
2. **Read guides**: See documentation files above
3. **Verify connections**: Test database passwords
4. **Review errors**: PostgreSQL error messages are detailed

---

## ⏱️ Time Estimate

- **Reading this guide**: 5 minutes
- **Backing up**: 5-10 minutes
- **Schema migration**: 5-10 minutes
- **Data migration**: 15-45 minutes
- **Verification**: 10-15 minutes
- **Testing**: 30-60 minutes

**Total**: 1-3 hours depending on data size

---

## 🚦 Ready to Start?

### Yes, let's do this! →

1. **Backup** old database (5 min)
2. **Read** QUICK_MIGRATION_GUIDE.md (10 min)
3. **Choose** your method (Option 2 or 3 recommended)
4. **Follow** the steps exactly
5. **Verify** everything works
6. **Celebrate** 🎉

### Not sure yet? →

1. **Read** MIGRATION_SUMMARY.md for overview
2. **Review** MIGRATION_INSTRUCTIONS.md for details
3. **Understand** what will happen
4. **Then** come back here and start

---

## 🔒 Safety Notes

- ✅ Old database stays untouched (safe backup)
- ✅ Can rollback anytime by reverting .env
- ✅ Test thoroughly before going live
- ✅ Keep old database for 1-2 weeks minimum
- ✅ All data integrity checks included

---

**You're ready! Pick a guide and start migrating.** 🚀

**Recommended**: Start with **QUICK_MIGRATION_GUIDE.md** → Option 2 or 3
