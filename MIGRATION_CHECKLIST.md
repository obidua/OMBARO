# Database Migration Checklist

Use this checklist to ensure you complete all steps of the migration successfully.

---

## Pre-Migration Phase

### Documentation Review
- [ ] Read START_HERE.md
- [ ] Read QUICK_MIGRATION_GUIDE.md (or MIGRATION_INSTRUCTIONS.md)
- [ ] Understand which migration method to use (Option 1, 2, or 3)
- [ ] Review rollback plan

### Preparation
- [ ] Backup old database (CRITICAL!)
- [ ] Get old database password
- [ ] Get new database password
- [ ] Get new database anon key
- [ ] Install required tools (psql, Python, etc.)
- [ ] Close all active database connections
- [ ] Inform team about maintenance window
- [ ] Set maintenance mode on application (optional)

---

## Phase 1: Schema Migration

### Apply Schema to New Database
- [ ] Open Supabase Dashboard for new project
- [ ] Navigate to SQL Editor
- [ ] Copy content from `20250115_clean_production_schema.sql`
- [ ] Paste into SQL Editor
- [ ] Execute the migration
- [ ] Wait for completion message
- [ ] Check for any error messages

### Verify Schema Creation
- [ ] Go to Table Editor in Supabase Dashboard
- [ ] Verify 60+ tables are visible
- [ ] Check a few tables (departments, roles, service_categories)
- [ ] Run: `SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';`
- [ ] Result should be 60+

---

## Phase 2: Data Migration

### Export Data from Old Database
- [ ] Choose export method (pg_dump, CSV, or Python script)
- [ ] Export all table data
- [ ] Verify export completed successfully
- [ ] Check export file size is reasonable
- [ ] Keep export file as backup

### Import Data to New Database
- [ ] Import data using chosen method
- [ ] Monitor for errors during import
- [ ] Note any tables that failed to import
- [ ] Retry failed tables if necessary
- [ ] Verify import completed

---

## Phase 3: Data Verification

### Table Count Verification
- [ ] Compare table counts between old and new
- [ ] Old database: `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;`
- [ ] New database: Same query
- [ ] Verify both lists match

### Row Count Verification
For each important table:
- [ ] customers: `SELECT COUNT(*) FROM customers;`
- [ ] vendors: `SELECT COUNT(*) FROM vendors;`
- [ ] therapists: `SELECT COUNT(*) FROM therapists;`
- [ ] bookings: `SELECT COUNT(*) FROM bookings;`
- [ ] payments: `SELECT COUNT(*) FROM payments;`
- [ ] services: `SELECT COUNT(*) FROM services;`
- [ ] user_profiles: `SELECT COUNT(*) FROM user_profiles;`
- [ ] service_categories: `SELECT COUNT(*) FROM service_categories;`
- [ ] departments: `SELECT COUNT(*) FROM departments;`
- [ ] roles: `SELECT COUNT(*) FROM roles;`

Compare counts:
| Table | Old Count | New Count | Match? |
|-------|-----------|-----------|--------|
| customers | ____ | ____ | ⬜ |
| vendors | ____ | ____ | ⬜ |
| therapists | ____ | ____ | ⬜ |
| bookings | ____ | ____ | ⬜ |
| payments | ____ | ____ | ⬜ |
| services | ____ | ____ | ⬜ |
| user_profiles | ____ | ____ | ⬜ |

### Data Integrity Checks
- [ ] Check foreign key relationships: `SELECT COUNT(*) FROM bookings WHERE customer_id NOT IN (SELECT id FROM customers);` (should be 0)
- [ ] Check RLS enabled: `SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public';`
- [ ] Verify indexes created: `SELECT indexname, tablename FROM pg_indexes WHERE schemaname = 'public' ORDER BY tablename;`
- [ ] Check constraints: `SELECT conname, contype FROM pg_constraint WHERE connamespace = 'public'::regnamespace;`

---

## Phase 4: Application Update

### Update Configuration Files
- [ ] Open `.env` file
- [ ] Update `VITE_SUPABASE_URL` to new database URL
- [ ] Update `VITE_SUPABASE_ANON_KEY` to new anon key
- [ ] Save changes
- [ ] Commit changes to version control (optional)

### Test Build
- [ ] Run `npm install` (if needed)
- [ ] Run `npm run build`
- [ ] Verify build completes without errors
- [ ] Check for any TypeScript errors

---

## Phase 5: Application Testing

### Basic Functionality
- [ ] Start development server: `npm run dev`
- [ ] Application loads without errors
- [ ] No console errors in browser
- [ ] Homepage renders correctly

### Authentication Testing
- [ ] Can access login page
- [ ] Can log in with existing user credentials
- [ ] Login redirects to correct dashboard
- [ ] User session persists on page refresh
- [ ] Can log out successfully
- [ ] Can access forgot password flow

### Customer Dashboard
- [ ] Customer can log in
- [ ] Profile information displays correctly
- [ ] Booking history loads
- [ ] Can view booking details
- [ ] Address list shows correctly
- [ ] Loyalty points display
- [ ] Can create new booking

### Vendor Portal
- [ ] Vendor can log in
- [ ] Business profile displays
- [ ] Can view bookings
- [ ] Therapist list loads
- [ ] Services list displays
- [ ] Can manage availability
- [ ] Dashboard statistics show

### Therapist Features
- [ ] Therapist can log in
- [ ] Profile displays correctly
- [ ] Schedule visible
- [ ] Assignments list loads
- [ ] Can update location (test mode)
- [ ] Performance metrics show
- [ ] Can request leaves

### Booking Flow
- [ ] Can browse services
- [ ] Can select service
- [ ] Can choose date/time
- [ ] Can add to cart
- [ ] Checkout flow works
- [ ] Payment processes (test mode)
- [ ] Booking confirmation received

### Admin Features
- [ ] Admin can log in
- [ ] Dashboard loads all data
- [ ] Can view all users
- [ ] Can manage vendors
- [ ] Can view reports
- [ ] Can access all departments

---

## Phase 6: Advanced Testing

### Real-time Features
- [ ] Notifications work
- [ ] Location tracking updates
- [ ] Live booking status updates
- [ ] Real-time chat (if applicable)

### Performance Testing
- [ ] Page load times acceptable
- [ ] Database queries fast
- [ ] No timeout errors
- [ ] Images load correctly

### Error Handling
- [ ] Invalid login shows error
- [ ] Missing data shows proper message
- [ ] Network errors handled gracefully
- [ ] Database errors logged

---

## Phase 7: Post-Migration

### Monitoring (First 24 Hours)
- [ ] Check Supabase logs every 2 hours
- [ ] Monitor application error logs
- [ ] Watch for user-reported issues
- [ ] Verify all cron jobs still work
- [ ] Check email notifications sending

### Documentation
- [ ] Update team wiki with new database info
- [ ] Document any issues encountered
- [ ] Update deployment documentation
- [ ] Share new database credentials with team (securely)

### Optimization
- [ ] Run ANALYZE on database
- [ ] Run VACUUM ANALYZE
- [ ] Update database statistics
- [ ] Review slow query log
- [ ] Optimize indexes if needed

### Cleanup (After 1 Week)
- [ ] Confirm no issues reported
- [ ] Archive old database (don't delete!)
- [ ] Update backup procedures
- [ ] Remove migration scripts from production
- [ ] Document lessons learned

---

## Rollback Checklist

If you need to rollback:

- [ ] Stop application
- [ ] Revert `.env` file to old database credentials
- [ ] Restart application
- [ ] Verify application works with old database
- [ ] Review error logs to understand what went wrong
- [ ] Fix issues before attempting migration again

---

## Emergency Contacts

Document who to contact if issues arise:

- Database Admin: _______________
- DevOps Lead: _______________
- Technical Lead: _______________
- Supabase Support: support@supabase.com

---

## Sign-Off

### Pre-Migration Approval
- [ ] Backup confirmed complete
- [ ] Team notified
- [ ] Maintenance window scheduled
- [ ] Approved by: _______________ Date: _______________

### Post-Migration Approval
- [ ] All tests passed
- [ ] No critical errors
- [ ] Performance acceptable
- [ ] Approved by: _______________ Date: _______________

### Production Release
- [ ] Monitoring confirmed
- [ ] Team trained on new setup
- [ ] Documentation updated
- [ ] Approved by: _______________ Date: _______________

---

## Migration Timeline

| Phase | Estimated Time | Actual Time | Status |
|-------|----------------|-------------|--------|
| Pre-Migration | 30 min | ______ | ⬜ |
| Schema Migration | 10 min | ______ | ⬜ |
| Data Migration | 30-60 min | ______ | ⬜ |
| Verification | 20 min | ______ | ⬜ |
| Application Update | 10 min | ______ | ⬜ |
| Testing | 60 min | ______ | ⬜ |
| Post-Migration | 30 min | ______ | ⬜ |
| **TOTAL** | **3-4 hours** | ______ | ⬜ |

---

## Notes

Use this space to document any issues, observations, or important details:

```
Date: _______________
Migration Started: _______________
Migration Completed: _______________

Issues Encountered:
1.
2.
3.

Resolutions:
1.
2.
3.

Lessons Learned:
1.
2.
3.
```

---

## Success Criteria

Migration is successful when ALL of these are true:

✅ New database has 60+ tables
✅ All row counts match old database
✅ Application connects successfully
✅ Users can log in
✅ All core features work
✅ No errors in logs for 24 hours
✅ Performance is acceptable
✅ Team is trained and comfortable

---

**Status**: ⬜ Not Started | ⬜ In Progress | ⬜ Completed

**Final Sign-Off**:

Name: _______________
Role: _______________
Date: _______________
Signature: _______________

---

Print this checklist and check off items as you complete them!
