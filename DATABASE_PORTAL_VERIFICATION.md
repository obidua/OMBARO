# Database Portal Verification

## Actual Database (143 Tables)

### Cross-Verification Results

**Status**: ✅ Database has exactly 143 tables as documented

**Categories**:
1. Authentication & Users: 9 tables
2. Departments & Roles: 6 tables
3. HR & Employees: 15 tables
4. Vendors: 13 tables (Portal shows 8)
5. Therapists: 8 tables
6. Services: 13 tables (Portal shows 10)
7. Bookings: 7 tables (Portal shows 8)
8. Finance & Payments: 14 tables
9. Customers: 10 tables (Portal shows 9)
10. Marketing: 10 tables
11. Support: 3 tables (Portal shows 8)
12. Legal & Compliance: 4 tables (Portal shows 8)
13. Operations & Inventory: 6 tables (Portal shows 10)
14. Analytics: 6 tables (Portal shows 8)
15. System: 8 tables (Portal shows 12)
16. Location & Geography: 5 tables (NEW category)
17. Communications: 6 tables (NEW category)

**Total**: 143 tables

## Discrepancies Found

### Tables in Portal but NOT in Database:
1. **Support Category**:
   - ticket_categories (not in DB)
   - ticket_priorities (not in DB)
   - ticket_sla (not in DB)
   - canned_responses (not in DB)
   - chat_conversations (not in DB)

2. **Legal Category**:
   - contracts (not in DB)
   - contract_types (not in DB)
   - compliance_requirements (not in DB)
   - litigation_cases (not in DB)
   - legal_notices (not in DB)
   - regulatory_filings (not in DB)

3. **Operations Category**:
   - inventory_categories (not in DB)
   - stock_movements (not in DB)
   - equipment_registry (not in DB)
   - maintenance_schedules (not in DB)
   - operational_metrics (not in DB)
   - quality_checks (not in DB)

4. **Analytics Category**:
   - user_behavior_tracking (not in DB)
   - conversion_funnels (not in DB)
   - operational_reports (not in DB)
   - performance_metrics (not in DB)
   - dashboard_configurations (not in DB)
   - custom_reports (not in DB)

5. **System Category**:
   - webhooks (not in DB)
   - job_queue (not in DB)
   - data_backups (not in DB)
   - maintenance_windows (not in DB)
   - rate_limits (not in DB)

### Tables in Database but NOT in Portal:
1. **Location & Geography** (5 tables) - MISSING CATEGORY:
   - countries
   - states
   - cities
   - zones
   - pincode_master

2. **Communications** (6 tables) - MISSING CATEGORY:
   - email_logs
   - sms_logs
   - push_notifications
   - whatsapp_logs
   - in_app_messages
   - notification_queue

3. **Vendors Category**:
   - vendor_bank_accounts (in DB, not in portal)
   - vendor_ratings (in DB, not in portal)
   - vendor_reviews (in DB, not in portal)
   - vendor_contracts (in DB, not in portal)
   - vendor_compliance (in DB, not in portal)

4. **Services Category**:
   - service_tag_mapping (in DB, not in portal)
   - reviews (in DB, not in portal)
   - service_execution_log (in DB, not in portal)

5. **Customers Category**:
   - customer_segment_mapping (in DB, not in portal)

6. **Marketing Category**:
   - campaign_targets (NOT IN DB)
   - promotion_rules (in DB as 'promotion_usage')
   - sms_templates (NOT IN DB)

## Recommendations

### Option 1: Update Portal to Match Database (Recommended)
- Add Location & Geography category (5 tables)
- Add Communications category (6 tables)
- Remove tables that don't exist in database
- Update counts to match actual database

### Option 2: Add Missing Tables to Database
- Create the 30+ tables shown in portal but missing in DB
- This would increase total to 173+ tables
- More comprehensive but may be unnecessary

## Correct Category Counts

Based on actual database:

| Category | Actual Count | Portal Shows | Status |
|----------|--------------|--------------|--------|
| Authentication & Users | 9 | 9 | ✅ Correct |
| Departments & Roles | 6 | 6 | ✅ Correct |
| HR & Employees | 15 | 15 | ✅ Correct |
| Vendors | 13 | 8 | ❌ Update needed |
| Therapists | 8 | 8 | ✅ Correct |
| Services | 13 | 10 | ❌ Update needed |
| Bookings | 7 | 8 | ❌ Update needed |
| Finance & Payments | 14 | 14 | ✅ Correct |
| Customers | 10 | 9 | ❌ Update needed |
| Marketing | 10 | 10 | ✅ Correct |
| Support | 3 | 8 | ❌ Major update needed |
| Legal & Compliance | 4 | 8 | ❌ Major update needed |
| Operations & Inventory | 6 | 10 | ❌ Update needed |
| Analytics | 6 | 8 | ❌ Update needed |
| System | 8 | 12 | ❌ Update needed |
| Location & Geography | 5 | 0 | ❌ Add category |
| Communications | 6 | 0 | ❌ Add category |
| **TOTAL** | **143** | **~133** | ❌ Update needed |

## Action Items

1. ✅ Database has correct 143 tables
2. ❌ Portal needs updating to show correct tables
3. ❌ Portal needs 2 new categories (Location & Communications)
4. ❌ Portal shows ~30 tables that don't exist in DB
5. ❌ Portal missing ~40 tables that exist in DB

## Solution

Update `DatabaseSchema.tsx` to reflect the exact 143 tables from our migrations with correct categorization including the new Location & Communications categories.
