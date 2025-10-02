# All 143 Database Tables - Complete Reference

This document lists all 143 tables in the OMBARO platform database (alphabetically sorted).

## Complete Table List

| # | Table Name | Category |
|---|------------|----------|
| 1 | addon_services | Services |
| 2 | analytics_events | Analytics |
| 3 | api_keys | System |
| 4 | app_versions | System |
| 5 | asset_tracking | Operations |
| 6 | assignment_timeline | Therapists |
| 7 | attendance_policies | HR |
| 8 | attendance_records | HR |
| 9 | audit_logs | System |
| 10 | booking_cancellations | Bookings |
| 11 | booking_items | Bookings |
| 12 | booking_notes | Bookings |
| 13 | booking_photos | Bookings |
| 14 | booking_reschedules | Bookings |
| 15 | booking_status_history | Bookings |
| 16 | bookings | Bookings |
| 17 | budget_allocations | Finance |
| 18 | campaign_analytics | Marketing |
| 19 | campaigns | Marketing |
| 20 | cities | Location |
| 21 | cohort_analysis | Analytics |
| 22 | commission_records | Finance |
| 23 | commission_rules | Finance |
| 24 | compliance_audits | Legal |
| 25 | conversion_tracking | Analytics |
| 26 | countries | Location |
| 27 | coupon_codes | Marketing |
| 28 | coupon_usages | Marketing |
| 29 | customer_addresses | Customers |
| 30 | customer_communication_log | Customers |
| 31 | customer_complaints | Customers |
| 32 | customer_loyalty_tiers | Customers |
| 33 | customer_preferences | Customers |
| 34 | customer_referrals | Customers |
| 35 | customer_segment_mapping | Customers |
| 36 | customer_segments | Customers |
| 37 | customers | Customers |
| 38 | data_retention_policies | Legal |
| 39 | delegation_history | Roles |
| 40 | department_hierarchy | Departments |
| 41 | departments | Departments |
| 42 | email_logs | Communications |
| 43 | email_templates | Marketing |
| 44 | emergency_contacts | Users |
| 45 | employee_onboarding | HR |
| 46 | employees | HR |
| 47 | error_logs | System |
| 48 | expense_categories | Finance |
| 49 | expenses | Finance |
| 50 | feature_flags | System |
| 51 | financial_reports | Finance |
| 52 | funnel_analytics | Analytics |
| 53 | gdpr_requests | Legal |
| 54 | holidays | HR |
| 55 | in_app_messages | Communications |
| 56 | inventory_items | Operations |
| 57 | invoices | Finance |
| 58 | leave_balances | HR |
| 59 | leave_requests | HR |
| 60 | leave_types | HR |
| 61 | legal_documents | Legal |
| 62 | loyalty_points_transactions | Customers |
| 63 | notification_queue | Communications |
| 64 | notifications | Communications |
| 65 | overtime_records | HR |
| 66 | page_views | Analytics |
| 67 | payment_gateways | Payments |
| 68 | payment_methods | Payments |
| 69 | payment_settlements | Payments |
| 70 | payments | Payments |
| 71 | performance_reviews | HR |
| 72 | permission_modules | Roles |
| 73 | permissions | Roles |
| 74 | pincode_master | Location |
| 75 | popular_services | Services |
| 76 | promotion_usage | Marketing |
| 77 | promotions | Marketing |
| 78 | purchase_orders | Operations |
| 79 | push_notifications | Communications |
| 80 | referral_rewards | Marketing |
| 81 | refunds | Payments |
| 82 | revenue_analytics | Analytics |
| 83 | reviews | Services |
| 84 | role_assignment_history | Roles |
| 85 | role_permissions | Roles |
| 86 | roles | Roles |
| 87 | salary_components | HR |
| 88 | salary_records | HR |
| 89 | salary_structures | HR |
| 90 | scheduled_tasks | System |
| 91 | service_availability | Services |
| 92 | service_categories | Services |
| 93 | service_execution_log | Services |
| 94 | service_packages | Services |
| 95 | service_pricing_tiers | Services |
| 96 | service_reviews | Services |
| 97 | service_tag_mapping | Services |
| 98 | service_tags | Services |
| 99 | service_variants | Services |
| 100 | services | Services |
| 101 | sms_logs | Communications |
| 102 | states | Location |
| 103 | stock_transactions | Operations |
| 104 | suppliers | Operations |
| 105 | support_tickets | Support |
| 106 | system_settings | System |
| 107 | tax_records | Finance |
| 108 | therapist_assignments | Therapists |
| 109 | therapist_certifications | Therapists |
| 110 | therapist_leaves | Therapists |
| 111 | therapist_locations | Therapists |
| 112 | therapist_performance | Therapists |
| 113 | therapist_schedules | Therapists |
| 114 | therapists | Therapists |
| 115 | ticket_messages | Support |
| 116 | training_records | HR |
| 117 | user_activity_log | Users |
| 118 | user_bank_details | Users |
| 119 | user_documents | Users |
| 120 | user_kyc_verification | Users |
| 121 | user_preferences | Users |
| 122 | user_profiles | Users |
| 123 | user_roles | Roles |
| 124 | user_sessions | Users |
| 125 | vendor_application_history | Vendors |
| 126 | vendor_applications | Vendors |
| 127 | vendor_availability | Vendors |
| 128 | vendor_bank_accounts | Vendors |
| 129 | vendor_compliance | Vendors |
| 130 | vendor_contracts | Vendors |
| 131 | vendor_documents | Vendors |
| 132 | vendor_payouts | Vendors |
| 133 | vendor_ratings | Vendors |
| 134 | vendor_reviews | Vendors |
| 135 | vendor_services | Vendors |
| 136 | vendor_staff | Vendors |
| 137 | vendors | Vendors |
| 138 | wallet_transactions | Payments |
| 139 | warehouses | Operations |
| 140 | webhook_endpoints | System |
| 141 | whatsapp_logs | Communications |
| 142 | work_shifts | HR |
| 143 | zones | Location |

## Tables by Category

### Users (8 tables)
- emergency_contacts
- user_activity_log
- user_bank_details
- user_documents
- user_kyc_verification
- user_preferences
- user_profiles
- user_sessions

### Roles & Permissions (6 tables)
- delegation_history
- permission_modules
- permissions
- role_assignment_history
- role_permissions
- roles
- user_roles

### Departments (2 tables)
- department_hierarchy
- departments

### Vendors (13 tables)
- vendor_application_history
- vendor_applications
- vendor_availability
- vendor_bank_accounts
- vendor_compliance
- vendor_contracts
- vendor_documents
- vendor_payouts
- vendor_ratings
- vendor_reviews
- vendor_services
- vendor_staff
- vendors

### Therapists (7 tables)
- assignment_timeline
- therapist_assignments
- therapist_certifications
- therapist_leaves
- therapist_locations
- therapist_performance
- therapist_schedules
- therapists

### Services (14 tables)
- addon_services
- popular_services
- reviews
- service_availability
- service_categories
- service_execution_log
- service_packages
- service_pricing_tiers
- service_reviews
- service_tag_mapping
- service_tags
- service_variants
- services

### Bookings (7 tables)
- booking_cancellations
- booking_items
- booking_notes
- booking_photos
- booking_reschedules
- booking_status_history
- bookings

### Payments & Finance (15 tables)
- budget_allocations
- commission_records
- commission_rules
- expense_categories
- expenses
- financial_reports
- invoices
- payment_gateways
- payment_methods
- payment_settlements
- payments
- refunds
- tax_records
- wallet_transactions

### Customers (9 tables)
- customer_addresses
- customer_communication_log
- customer_complaints
- customer_loyalty_tiers
- customer_preferences
- customer_referrals
- customer_segment_mapping
- customer_segments
- customers
- loyalty_points_transactions

### HR & Employees (14 tables)
- attendance_policies
- attendance_records
- employee_onboarding
- employees
- holidays
- leave_balances
- leave_requests
- leave_types
- overtime_records
- performance_reviews
- salary_components
- salary_records
- salary_structures
- training_records
- work_shifts

### Marketing (9 tables)
- campaign_analytics
- campaigns
- coupon_codes
- coupon_usages
- email_templates
- promotion_usage
- promotions
- referral_rewards

### Communications (7 tables)
- email_logs
- in_app_messages
- notification_queue
- notifications
- push_notifications
- sms_logs
- whatsapp_logs

### Support (2 tables)
- support_tickets
- ticket_messages

### Legal & Compliance (4 tables)
- compliance_audits
- data_retention_policies
- gdpr_requests
- legal_documents

### Operations & Inventory (6 tables)
- asset_tracking
- inventory_items
- purchase_orders
- stock_transactions
- suppliers
- warehouses

### Location & Geography (5 tables)
- cities
- countries
- pincode_master
- states
- zones

### Analytics (6 tables)
- analytics_events
- cohort_analysis
- conversion_tracking
- funnel_analytics
- page_views
- revenue_analytics

### System & Configuration (8 tables)
- api_keys
- app_versions
- audit_logs
- error_logs
- feature_flags
- scheduled_tasks
- system_settings
- webhook_endpoints

## Total: 143 Tables

All tables include:
- Primary keys
- Foreign key constraints
- Row Level Security (RLS)
- Appropriate indexes
- Timestamps (created_at, updated_at)
- Status/state management where applicable

## Migration Files

The complete schema is distributed across these migration files:

1. `20250102_complete_ombaro_schema.sql` - Core tables
2. `20250102_therapist_management.sql` - Therapist-specific tables
3. `20250102_vendor_onboarding.sql` - Vendor-specific tables
4. `20250103_comprehensive_all_roles_tables.sql` - Role-based tables
5. `20250103_core_tables_all_roles.sql` - Additional core tables
6. `20250104_additional_34_tables.sql` - Communications, Marketing, Location, Operations, Analytics, Legal, System tables

## Database Features

- **Row Level Security**: All tables have RLS enabled
- **Audit Logging**: Sensitive operations are logged
- **Soft Deletes**: Important tables use status flags instead of hard deletes
- **Versioning**: Key tables maintain history
- **Full-Text Search**: Enabled on text-heavy tables
- **Geospatial Support**: Location tables use PostGIS
- **JSON Support**: Flexible data stored in JSONB columns
- **Constraints**: Data integrity enforced at database level

## Performance Optimizations

- **Indexes**: 300+ indexes for optimal query performance
- **Partitioning**: Large tables partitioned by date
- **Materialized Views**: For complex analytics queries
- **Connection Pooling**: Configured for high concurrency
- **Query Optimization**: Common queries optimized with explain plans

## Backup Strategy

- **Full Backup**: Daily at 2 AM
- **Incremental Backup**: Every 6 hours
- **Point-in-Time Recovery**: Enabled
- **Retention**: 30 days
- **Disaster Recovery**: Multi-region replication
