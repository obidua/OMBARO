# OMBARO Database Migration Guide

**Complete guide to database schema migrations and version control**

---

## Overview

The OMBARO platform uses Supabase (PostgreSQL 15+) with a structured migration system to manage database schema changes. This guide documents all migrations, their purposes, execution order, and maintenance procedures.

### Migration Statistics

| Metric | Value |
|--------|-------|
| **Total Migration Files** | 9 |
| **Total Tables** | 60 |
| **Base Schema Tables** | 60 |
| **Additional Extensions** | 9 (vendor onboarding, notifications, beauticians) |
| **Schema Version** | 1.0 (Production Ready) |
| **Last Updated** | January 15, 2025 |

---

## Migration Files

### 1. Base Production Schema

**File**: `20250115_clean_production_schema.sql`
**Size**: 64 KB
**Tables Created**: 60
**Status**: ✅ Applied

#### Purpose
Creates the complete production-ready database schema with all essential tables for the OMBARO spa and wellness booking platform.

#### Table Categories

1. **System & Configuration** (6 tables)
   - `system_settings` - Dynamic system configuration
   - `feature_flags` - Feature rollout management
   - `audit_logs` - System-wide audit trail
   - `error_logs` - Application error tracking
   - `user_activity_log` - User activity analytics
   - `notifications` - Multi-channel notifications

2. **Location & Geography** (5 tables)
   - `countries` - Country master data
   - `states` - State/province data
   - `cities` - City master data
   - `zones` - Service zones
   - `pincode_master` - Postal code serviceability

3. **Departments & Roles** (5 tables)
   - `departments` - Organizational structure
   - `roles` - Role definitions
   - `permissions` - Granular permissions
   - `role_permissions` - Role-permission mapping
   - `user_roles` - User role assignments

4. **Users & Authentication** (8 tables)
   - `user_profiles` - Extended user profiles
   - `user_sessions` - Active sessions
   - `user_documents` - User document uploads
   - `user_preferences` - User preferences
   - `user_kyc_verification` - KYC status
   - `user_bank_details` - Banking information
   - `emergency_contacts` - Emergency contacts
   - `employees` - Employee records

5. **Vendors** (8 tables)
   - `vendors` - Vendor profiles
   - `vendor_documents` - Business documents
   - `vendor_services` - Services offered
   - `vendor_staff` - Staff management
   - `vendor_payouts` - Payment settlements
   - `vendor_reviews` - Customer reviews
   - `vendor_applications` - New vendor signups
   - `vendor_availability` - Operating hours

6. **Therapists** (6 tables)
   - `therapists` - Therapist profiles
   - `therapist_schedules` - Weekly schedules
   - `therapist_leaves` - Leave management
   - `therapist_locations` - Real-time GPS tracking
   - `therapist_assignments` - Service assignments
   - `therapist_performance` - Performance metrics

7. **Services** (5 tables)
   - `service_categories` - Service categorization
   - `services` - Service catalog
   - `addon_services` - Optional add-ons
   - `service_packages` - Bundled packages
   - `reviews` - Multi-purpose review system

8. **Customers** (4 tables)
   - `customers` - Customer profiles
   - `customer_addresses` - Multiple addresses
   - `customer_referrals` - Referral tracking
   - `loyalty_points_transactions` - Points history

9. **Bookings** (6 tables)
   - `bookings` - Main booking records
   - `booking_items` - Booked services
   - `booking_status_history` - Status audit trail
   - `booking_notes` - Multi-party notes
   - `booking_cancellations` - Cancellation records
   - `booking_reschedules` - Reschedule requests

10. **Payments** (5 tables)
    - `payment_methods` - Saved payment methods
    - `payments` - Payment transactions
    - `refunds` - Refund requests
    - `wallet_transactions` - Wallet history
    - `commission_records` - Commission tracking

11. **Support** (2 tables)
    - `support_tickets` - Support ticket system
    - `ticket_messages` - Ticket conversations

#### Key Features
- Row Level Security (RLS) enabled on all user-facing tables
- Optimized indexes for high performance
- Foreign key constraints for data integrity
- Default data population (countries, departments, roles, service categories)
- Performance statistics for query optimization

---

### 2. Vendor Onboarding Core Tables

**File**: `20251007210243_01_vendor_onboarding_core_tables.sql`
**Size**: 9.7 KB
**Status**: ✅ Applied

#### Purpose
Enhances vendor onboarding with additional tables for categories, onboarding workflows, and vendor categorization.

#### Tables Modified/Added
- Extends vendor-related functionality
- Adds vendor category support
- Implements onboarding workflow tables

#### Features
- Multi-step vendor application process
- Document verification workflows
- Category-based vendor classification

---

### 3. Automated Notification Triggers

**File**: `20251007210817_02_automated_notification_triggers.sql`
**Size**: 7.6 KB
**Status**: ✅ Applied

#### Purpose
Implements automated notification triggers for key booking and assignment events.

#### Triggers Created
- Booking confirmation notifications
- Therapist assignment alerts
- Status change notifications
- Payment receipt notifications
- Real-time event notifications

#### Features
- Automatic notification generation
- Multi-channel delivery (push, SMS, email)
- Event-driven architecture
- Reduced manual notification management

---

### 4. Vendor Categories Table

**File**: `20251007214414_create_vendor_categories_table.sql`
**Size**: 2.4 KB
**Status**: ✅ Applied

#### Purpose
Creates dedicated vendor categories table for better classification and filtering.

#### Tables Created
- `vendor_categories` - Vendor category master table

#### Features
- Hierarchical category structure
- Icon and image support
- Display ordering
- Active/inactive status

---

### 5. Vendor Category Columns

**File**: `20251007214446_add_vendor_category_columns.sql`
**Size**: 1.1 KB
**Status**: ✅ Applied

#### Purpose
Adds category reference columns to existing vendor tables for integration.

#### Changes
- Links vendors to categories
- Supports multiple category assignment
- Backward compatible

---

### 6. Vendor Onboarding Support Tables

**File**: `20251007214624_vendor_onboarding_support_tables.sql`
**Size**: 6.4 KB
**Status**: ✅ Applied

#### Purpose
Additional support tables for complete vendor onboarding workflow.

#### Tables Added
- Onboarding step tracking
- Document checklist management
- Verification status tracking
- Approval workflow tables

---

### 7. Vendor Social Auth and OTP

**File**: `20251007220000_vendor_social_auth_and_otp.sql`
**Size**: 8.4 KB
**Status**: ✅ Applied

#### Purpose
Implements social authentication and OTP-based login for vendors.

#### Features
- Google OAuth integration
- Facebook authentication support
- OTP generation and verification
- Mobile number verification
- Social profile linking

#### Tables Added
- `vendor_otp_codes` - OTP storage and verification
- `vendor_social_auth` - Social login credentials
- OTP expiry management

---

### 8. Departments and Dashboard Infrastructure

**File**: `20251007225206_create_departments_and_dashboard_infrastructure.sql`
**Size**: 19 KB
**Status**: ✅ Applied

#### Purpose
Creates comprehensive departmental structure and dashboard data infrastructure.

#### Features
- Department-specific dashboards
- Role-based dashboard access
- Dashboard widget configuration
- Analytics and reporting tables
- KPI tracking

#### Tables Added
- `dashboard_widgets` - Widget definitions
- `department_dashboards` - Dashboard configurations
- `dashboard_data` - Cached dashboard data
- Performance metric tables

---

### 9. Beauticians Portal

**File**: `20251007230000_create_beauticians_portal.sql`
**Size**: 13 KB
**Status**: ✅ Applied

#### Purpose
Adds beautician-specific features and portal separate from therapist functionality.

#### Features
- Beautician profiles and specializations
- Salon-based assignments
- Service scheduling for beauticians
- Performance tracking
- Rating and review system

#### Tables Added
- `beauticians` - Beautician profiles
- `beautician_services` - Service specializations
- `beautician_schedules` - Availability management
- `beautician_assignments` - Service bookings
- `beautician_performance` - Monthly metrics

---

## Migration Execution Order

Migrations must be executed in the following strict order:

```
1. 20250115_clean_production_schema.sql          [Base Schema - Required]
2. 20251007210243_01_vendor_onboarding_core_tables.sql
3. 20251007210817_02_automated_notification_triggers.sql
4. 20251007214414_create_vendor_categories_table.sql
5. 20251007214446_add_vendor_category_columns.sql
6. 20251007214624_vendor_onboarding_support_tables.sql
7. 20251007220000_vendor_social_auth_and_otp.sql
8. 20251007225206_create_departments_and_dashboard_infrastructure.sql
9. 20251007230000_create_beauticians_portal.sql
```

---

## Applying Migrations

### Using Supabase Dashboard

1. **Navigate to SQL Editor**
   ```
   Supabase Dashboard → SQL Editor → New Query
   ```

2. **Copy Migration Content**
   - Open migration file from `supabase/migrations/`
   - Copy entire SQL content

3. **Execute Migration**
   - Paste SQL into editor
   - Click "Run" or press `Ctrl+Enter`
   - Wait for completion message

4. **Verify Execution**
   ```sql
   -- Check tables created
   SELECT COUNT(*) FROM information_schema.tables
   WHERE table_schema = 'public';

   -- Should return 60+ tables
   ```

### Using Supabase CLI

```bash
# Apply all migrations
supabase db push

# Apply specific migration
supabase db push --migrations 20250115_clean_production_schema.sql

# Check migration status
supabase migration list
```

### Using psql (Direct Connection)

```bash
# Connect to database
psql postgresql://user:password@host:port/database

# Execute migration file
\i supabase/migrations/20250115_clean_production_schema.sql

# Verify
\dt
\d+ user_profiles
```

---

## Rollback Procedures

### Emergency Rollback

If a migration causes issues:

```sql
-- 1. Backup current state
pg_dump -U user -d database -F c -f backup_before_rollback.dump

-- 2. Drop problematic objects
DROP TABLE IF EXISTS new_table CASCADE;

-- 3. Restore from backup if needed
pg_restore -U user -d database -c backup_before_rollback.dump
```

### Controlled Rollback

Create rollback migration files:

```sql
-- File: rollback_20251007230000_create_beauticians_portal.sql

-- Remove tables added by migration
DROP TABLE IF EXISTS beautician_performance CASCADE;
DROP TABLE IF EXISTS beautician_assignments CASCADE;
DROP TABLE IF EXISTS beautician_schedules CASCADE;
DROP TABLE IF EXISTS beautician_services CASCADE;
DROP TABLE IF EXISTS beauticians CASCADE;

-- Restore previous state if needed
-- (Add any restore logic here)
```

---

## Migration Best Practices

### Before Migration

1. **Backup Database**
   ```bash
   # Supabase backup
   supabase db dump -f backup_$(date +%Y%m%d_%H%M%S).sql

   # Direct PostgreSQL backup
   pg_dump -U postgres -F c -f backup.dump database_name
   ```

2. **Test in Development**
   - Apply migration to dev database
   - Run application tests
   - Verify data integrity
   - Check performance impact

3. **Review Migration**
   - Check for destructive operations
   - Verify foreign key constraints
   - Ensure RLS policies are correct
   - Validate default data

### During Migration

1. **Monitor Performance**
   ```sql
   -- Check active queries
   SELECT pid, query, state, query_start
   FROM pg_stat_activity
   WHERE state != 'idle';
   ```

2. **Watch for Locks**
   ```sql
   -- Check table locks
   SELECT relation::regclass, mode, granted
   FROM pg_locks
   WHERE relation IS NOT NULL;
   ```

3. **Track Progress**
   - Monitor migration execution time
   - Check for errors in logs
   - Verify table creation

### After Migration

1. **Verify Schema**
   ```sql
   -- Count tables
   SELECT COUNT(*) FROM information_schema.tables
   WHERE table_schema = 'public';

   -- Check RLS status
   SELECT tablename, rowsecurity
   FROM pg_tables
   WHERE schemaname = 'public';

   -- Verify indexes
   SELECT indexname, tablename
   FROM pg_indexes
   WHERE schemaname = 'public'
   ORDER BY tablename;
   ```

2. **Test Application**
   - Run integration tests
   - Check all user portals
   - Verify authentication flows
   - Test booking workflow

3. **Update Documentation**
   - Update schema documentation
   - Document new features
   - Update API documentation
   - Create user guides

---

## Troubleshooting

### Common Issues

#### Migration Fails with Constraint Violation

```sql
-- Check existing data
SELECT * FROM table_name WHERE column IS NULL;

-- Fix data before re-running migration
UPDATE table_name SET column = 'default_value' WHERE column IS NULL;
```

#### Foreign Key Errors

```sql
-- Check referenced table exists
SELECT tablename FROM pg_tables WHERE tablename = 'referenced_table';

-- Verify referenced records exist
SELECT id FROM referenced_table WHERE id = 'specific_id';
```

#### RLS Policy Conflicts

```sql
-- Drop existing policies
DROP POLICY IF EXISTS "policy_name" ON table_name;

-- Recreate with correct logic
CREATE POLICY "policy_name"
  ON table_name
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());
```

#### Index Creation Failures

```sql
-- Check if index already exists
SELECT indexname FROM pg_indexes
WHERE tablename = 'your_table' AND indexname = 'your_index';

-- Drop and recreate
DROP INDEX IF EXISTS your_index;
CREATE INDEX your_index ON your_table(column_name);
```

---

## Schema Version Tracking

### Current Version

```
Schema Version: 1.0
Migration Date: January 15, 2025
Total Tables: 60+ (base) + extensions
Status: Production Ready
```

### Version History

| Version | Date | Migration | Changes |
|---------|------|-----------|---------|
| 1.0 | 2025-01-15 | Base Schema | Initial 60 tables |
| 1.1 | 2025-10-07 | Vendor Onboarding | Vendor category system |
| 1.2 | 2025-10-07 | Notifications | Auto-notification triggers |
| 1.3 | 2025-10-07 | Vendor Categories | Category tables |
| 1.4 | 2025-10-07 | Vendor Support | Onboarding workflow |
| 1.5 | 2025-10-07 | Social Auth | OAuth & OTP for vendors |
| 1.6 | 2025-10-07 | Dashboards | Department dashboards |
| 1.7 | 2025-10-07 | Beauticians | Beautician portal |

---

## Performance Optimization

### Post-Migration Optimization

```sql
-- Update statistics
ANALYZE;

-- Vacuum tables
VACUUM ANALYZE;

-- Reindex if needed
REINDEX DATABASE CONCURRENTLY database_name;

-- Check table bloat
SELECT schemaname, tablename,
       pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

### Index Monitoring

```sql
-- Check index usage
SELECT schemaname, tablename, indexname, idx_scan, idx_tup_read, idx_tup_fetch
FROM pg_stat_user_indexes
WHERE schemaname = 'public'
ORDER BY idx_scan ASC;

-- Identify unused indexes
SELECT schemaname, tablename, indexname
FROM pg_stat_user_indexes
WHERE idx_scan = 0 AND schemaname = 'public';
```

---

## Data Migration

### Migrating Existing Data

If you have existing data to migrate:

```sql
-- 1. Export data from old schema
COPY old_table TO '/tmp/old_data.csv' CSV HEADER;

-- 2. Transform data (if needed)
-- Use external tools or SQL functions

-- 3. Import to new schema
COPY new_table FROM '/tmp/new_data.csv' CSV HEADER;

-- 4. Verify data integrity
SELECT COUNT(*) FROM old_table;
SELECT COUNT(*) FROM new_table;
```

### Data Validation

```sql
-- Check for orphaned records
SELECT * FROM child_table c
WHERE NOT EXISTS (
  SELECT 1 FROM parent_table p
  WHERE p.id = c.parent_id
);

-- Validate required fields
SELECT * FROM bookings WHERE customer_id IS NULL;

-- Check date ranges
SELECT * FROM therapist_leaves WHERE end_date < start_date;
```

---

## Maintenance Schedule

### Daily Tasks
- Monitor migration status
- Check error logs
- Review failed transactions

### Weekly Tasks
- Run VACUUM ANALYZE
- Review slow query log
- Check index usage
- Update statistics

### Monthly Tasks
- Full database backup
- Review schema changes
- Archive old data
- Performance audit
- Update documentation

---

## Emergency Contacts

For migration issues:
- **Database Admin**: dba@ombaro.com
- **DevOps Team**: devops@ombaro.com
- **Emergency Hotline**: +91-XXXX-XXXXXX

---

## Additional Resources

- [Supabase Migrations Documentation](https://supabase.com/docs/guides/cli/local-development#database-migrations)
- [PostgreSQL Migration Best Practices](https://www.postgresql.org/docs/current/ddl.html)
- [OMBARO Database Schema Documentation](./DATABASE_SCHEMA.md)
- [OMBARO Technical Implementation Guide](./TECHNICAL_IMPLEMENTATION_GUIDE.md)

---

**Version**: 1.0
**Last Updated**: October 7, 2025
**Maintained By**: OMBARO Development Team
**Status**: Production Ready ✅
