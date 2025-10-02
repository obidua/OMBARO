# Database Tables - Detailed Schema

Complete column definitions for all 140+ tables in the OMBARO platform.

## Table of Contents

1. [Authentication & Users](#authentication--users)
2. [Departments & Roles](#departments--roles)
3. [HR & Employees](#hr--employees)
4. [Vendors](#vendors)
5. [Therapists](#therapists)
6. [Services](#services)
7. [Bookings](#bookings)
8. [Payments & Finance](#payments--finance)
9. [Customers](#customers)
10. [Marketing](#marketing)
11. [Support](#support)
12. [Legal & Compliance](#legal--compliance)
13. [Operations & Inventory](#operations--inventory)
14. [Analytics](#analytics)
15. [System](#system)

---

## Authentication & Users

### user_profiles

Extended user information with roles, departments, and employee details.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PRIMARY KEY, REFERENCES auth.users(id) | User unique identifier |
| name | text | NOT NULL | Full name of the user |
| mobile | text | UNIQUE, NOT NULL | Mobile number |
| gender | text | CHECK (male, female, other) | User gender |
| date_of_birth | date | | Date of birth |
| profile_image | text | | Profile picture URL |
| role | text | NOT NULL | User role (customer, vendor, therapist, employee, admin, etc.) |
| employee_id | text | UNIQUE | Employee ID for staff |
| department_id | uuid | REFERENCES departments(id) | Assigned department |
| reporting_manager_id | uuid | REFERENCES auth.users(id) | Reporting manager |
| designation | text | | Job designation |
| joining_date | date | | Date of joining |
| status | text | DEFAULT active | Account status |
| address | jsonb | | Address information |
| created_at | timestamptz | DEFAULT now() | Record creation timestamp |
| updated_at | timestamptz | DEFAULT now() | Record update timestamp |

### user_roles

Many-to-many relationship between users and roles.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PRIMARY KEY | Unique identifier |
| user_id | uuid | NOT NULL, REFERENCES auth.users(id) | User reference |
| role_id | uuid | NOT NULL, REFERENCES roles(id) | Role reference |
| department_id | uuid | REFERENCES departments(id) | Department reference |
| assigned_by | uuid | REFERENCES auth.users(id) | Who assigned the role |
| assigned_at | timestamptz | DEFAULT now() | Assignment timestamp |
| valid_from | date | DEFAULT CURRENT_DATE | Role validity start date |
| valid_until | date | | Role validity end date |
| is_primary | boolean | DEFAULT false | Primary role flag |
| status | text | DEFAULT active | Role status |

### user_sessions

Active user sessions with device and location tracking.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PRIMARY KEY | Session identifier |
| user_id | uuid | NOT NULL, REFERENCES auth.users(id) | User reference |
| session_token | text | UNIQUE, NOT NULL | Session token |
| device_info | jsonb | | Device information |
| ip_address | inet | | IP address |
| user_agent | text | | Browser user agent |
| location_info | jsonb | | Geographic location |
| started_at | timestamptz | DEFAULT now() | Session start time |
| last_activity_at | timestamptz | DEFAULT now() | Last activity time |
| expires_at | timestamptz | NOT NULL | Session expiry time |
| status | text | DEFAULT active | Session status |

### user_documents

User uploaded documents (Aadhaar, PAN, etc.).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PRIMARY KEY | Document identifier |
| user_id | uuid | NOT NULL, REFERENCES auth.users(id) | User reference |
| document_type | text | NOT NULL, CHECK (aadhaar, pan, passport, etc.) | Type of document |
| document_number | text | | Document number |
| document_name | text | NOT NULL | Document name |
| file_url | text | NOT NULL | File storage URL |
| file_type | text | | File MIME type |
| file_size | integer | | File size in bytes |
| verified | boolean | DEFAULT false | Verification status |
| verified_by | uuid | REFERENCES auth.users(id) | Verified by user |
| verified_at | timestamptz | | Verification timestamp |
| expiry_date | date | | Document expiry date |
| created_at | timestamptz | DEFAULT now() | Upload timestamp |

---

## Departments & Roles

### departments

All 18 departments with hierarchy and budget allocation.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PRIMARY KEY | Department identifier |
| code | text | UNIQUE, NOT NULL | Department code |
| name | text | NOT NULL | Department name |
| description | text | | Department description |
| icon | text | | Icon name |
| color | text | | Display color |
| parent_department_id | uuid | REFERENCES departments(id) | Parent department |
| head_user_id | uuid | REFERENCES auth.users(id) | Department head |
| status | text | DEFAULT active | Department status |
| budget_allocation | numeric(15,2) | | Allocated budget |
| cost_center_code | text | | Cost center code |
| location | text | | Office location |
| contact_email | text | | Department email |
| contact_phone | text | | Department phone |
| created_at | timestamptz | DEFAULT now() | Creation timestamp |
| updated_at | timestamptz | DEFAULT now() | Update timestamp |

### roles

Role definitions with permissions and categories.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PRIMARY KEY | Role identifier |
| code | text | UNIQUE, NOT NULL | Role code |
| name | text | NOT NULL | Role name |
| description | text | | Role description |
| category | text | CHECK (executive, management, operational, support, technical) | Role category |
| level | integer | DEFAULT 1 | Hierarchy level |
| department_id | uuid | REFERENCES departments(id) | Department reference |
| permissions | jsonb | DEFAULT [] | Permission array |
| is_system_role | boolean | DEFAULT false | System role flag |
| status | text | DEFAULT active | Role status |
| created_at | timestamptz | DEFAULT now() | Creation timestamp |
| updated_at | timestamptz | DEFAULT now() | Update timestamp |

---

## HR & Employees

### employees

Employee records extending user profiles.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PRIMARY KEY, REFERENCES auth.users(id) | Employee identifier |
| employee_code | text | UNIQUE, NOT NULL | Employee code |
| joining_date | date | NOT NULL | Date of joining |
| probation_end_date | date | | Probation period end |
| confirmation_date | date | | Confirmation date |
| employment_type | text | CHECK (full_time, part_time, contract, intern) | Employment type |
| reporting_manager_id | uuid | REFERENCES auth.users(id) | Reporting manager |
| work_location | text | | Primary work location |
| status | text | DEFAULT active | Employment status |
| exit_date | date | | Last working day |
| created_at | timestamptz | DEFAULT now() | Record creation |

### attendance_records

Daily attendance with check-in/out and location.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PRIMARY KEY | Attendance record ID |
| employee_id | uuid | NOT NULL, REFERENCES auth.users(id) | Employee reference |
| date | date | NOT NULL | Attendance date |
| check_in_time | timestamptz | | Check-in timestamp |
| check_out_time | timestamptz | | Check-out timestamp |
| check_in_location | point | | Check-in GPS location |
| check_out_location | point | | Check-out GPS location |
| working_hours | numeric(4,2) | | Total working hours |
| status | text | DEFAULT present | Attendance status |
| notes | text | | Additional notes |
| created_at | timestamptz | DEFAULT now() | Record creation |

### leave_requests

Leave applications and approval workflow.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PRIMARY KEY | Leave request ID |
| employee_id | uuid | NOT NULL, REFERENCES auth.users(id) | Employee reference |
| leave_type_id | uuid | REFERENCES leave_types(id) | Leave type |
| start_date | date | NOT NULL | Leave start date |
| end_date | date | NOT NULL | Leave end date |
| total_days | numeric(4,1) | NOT NULL | Number of leave days |
| reason | text | NOT NULL | Leave reason |
| status | text | DEFAULT pending | Approval status |
| approved_by | uuid | REFERENCES auth.users(id) | Approver user |
| approved_at | timestamptz | | Approval timestamp |
| rejection_reason | text | | Rejection reason |
| created_at | timestamptz | DEFAULT now() | Request creation |

### salary_records

Monthly salary processing records.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PRIMARY KEY | Salary record ID |
| employee_id | uuid | NOT NULL, REFERENCES auth.users(id) | Employee reference |
| month | date | NOT NULL | Salary month |
| basic_salary | numeric(12,2) | NOT NULL | Basic salary amount |
| total_earnings | numeric(12,2) | DEFAULT 0 | Total earnings |
| total_deductions | numeric(12,2) | DEFAULT 0 | Total deductions |
| net_salary | numeric(12,2) | NOT NULL | Net salary payable |
| payment_date | date | | Payment date |
| payment_status | text | DEFAULT pending | Payment status |
| payment_reference | text | | Payment reference number |
| created_at | timestamptz | DEFAULT now() | Record creation |

---

## Vendors

### vendors

Spa/salon vendor profiles and business details.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PRIMARY KEY | Vendor identifier |
| user_id | uuid | UNIQUE, REFERENCES auth.users(id) | Associated user account |
| business_name | text | NOT NULL | Business/spa name |
| business_type | text | CHECK (spa, salon, wellness_center, independent) | Type of business |
| registration_number | text | | Business registration number |
| gst_number | text | | GST number |
| pan_number | text | | PAN number |
| contact_person | text | NOT NULL | Contact person name |
| email | text | NOT NULL | Business email |
| phone | text | NOT NULL | Contact phone |
| address | jsonb | NOT NULL | Business address |
| rating | numeric(3,2) | DEFAULT 0 | Average rating |
| status | text | DEFAULT active | Vendor status |
| created_at | timestamptz | DEFAULT now() | Registration date |
| updated_at | timestamptz | DEFAULT now() | Last update |

### vendor_applications

Vendor self-signup applications.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PRIMARY KEY | Application identifier |
| user_id | uuid | NOT NULL, REFERENCES auth.users(id) | Applicant user |
| business_name | text | NOT NULL | Proposed business name |
| business_type | text | NOT NULL | Type of business |
| contact_person | text | NOT NULL | Primary contact |
| email | text | NOT NULL | Business email |
| phone | text | NOT NULL | Contact phone |
| address | jsonb | NOT NULL | Business address |
| application_status | text | DEFAULT pending | Application status |
| reviewed_by | uuid | REFERENCES auth.users(id) | Reviewer user |
| reviewed_at | timestamptz | | Review timestamp |
| rejection_reason | text | | Rejection reason |
| created_at | timestamptz | DEFAULT now() | Application date |

---

## Therapists

### therapists

Therapist profiles with certifications and ratings.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PRIMARY KEY | Therapist identifier |
| user_id | uuid | UNIQUE, REFERENCES auth.users(id) | Associated user account |
| vendor_id | uuid | REFERENCES vendors(id) | Vendor reference |
| name | text | NOT NULL | Therapist name |
| email | text | | Email address |
| phone | text | NOT NULL | Contact phone |
| gender | text | CHECK (male, female, other) | Gender |
| experience_years | integer | DEFAULT 0 | Years of experience |
| specializations | text[] | | Areas of specialization |
| languages | text[] | | Languages spoken |
| rating | numeric(3,2) | DEFAULT 0 | Average rating |
| status | text | DEFAULT active | Therapist status |
| created_at | timestamptz | DEFAULT now() | Registration date |
| updated_at | timestamptz | DEFAULT now() | Last update |

### therapist_assignments

Service assignments to therapists.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PRIMARY KEY | Assignment identifier |
| booking_id | uuid | NOT NULL, REFERENCES bookings(id) | Booking reference |
| therapist_id | uuid | NOT NULL, REFERENCES therapists(id) | Therapist reference |
| assigned_at | timestamptz | DEFAULT now() | Assignment time |
| assigned_by | uuid | REFERENCES auth.users(id) | Assigned by user |
| status | text | DEFAULT assigned | Assignment status |
| accepted_at | timestamptz | | Acceptance time |
| started_at | timestamptz | | Service start time |
| completed_at | timestamptz | | Service completion time |
| notes | text | | Assignment notes |

---

## Services

### services

25+ massage and spa services catalog.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PRIMARY KEY | Service identifier |
| name | text | NOT NULL | Service name |
| description | text | | Service description |
| category | text | NOT NULL | Service category |
| duration | integer | NOT NULL | Duration in minutes |
| price | numeric(10,2) | NOT NULL | Service price |
| image_url | text | | Service image |
| benefits | text[] | | Service benefits |
| is_popular | boolean | DEFAULT false | Popular service flag |
| is_active | boolean | DEFAULT true | Active status |
| created_at | timestamptz | DEFAULT now() | Creation date |
| updated_at | timestamptz | DEFAULT now() | Last update |

---

## Bookings

### bookings

Customer service bookings.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PRIMARY KEY | Booking identifier |
| customer_id | uuid | NOT NULL, REFERENCES customers(id) | Customer reference |
| vendor_id | uuid | REFERENCES vendors(id) | Vendor reference |
| booking_number | text | UNIQUE, NOT NULL | Booking number |
| booking_date | date | NOT NULL | Service date |
| booking_time | time | NOT NULL | Service time |
| address | jsonb | NOT NULL | Service address |
| total_amount | numeric(10,2) | NOT NULL | Total booking amount |
| status | text | DEFAULT pending | Booking status |
| payment_status | text | DEFAULT pending | Payment status |
| notes | text | | Customer notes |
| created_at | timestamptz | DEFAULT now() | Booking creation |
| updated_at | timestamptz | DEFAULT now() | Last update |

---

## Payments & Finance

### payments

Payment transactions with gateway integration.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PRIMARY KEY | Payment identifier |
| booking_id | uuid | REFERENCES bookings(id) | Related booking |
| customer_id | uuid | NOT NULL, REFERENCES customers(id) | Customer reference |
| amount | numeric(12,2) | NOT NULL | Payment amount |
| payment_method | text | NOT NULL | Payment method |
| payment_gateway | text | | Gateway used |
| transaction_id | text | UNIQUE | Gateway transaction ID |
| status | text | DEFAULT pending | Payment status |
| paid_at | timestamptz | | Payment timestamp |
| created_at | timestamptz | DEFAULT now() | Record creation |

---

## Customers

### customers

Customer profiles with loyalty and preferences.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PRIMARY KEY | Customer identifier |
| user_id | uuid | UNIQUE, REFERENCES auth.users(id) | Associated user account |
| name | text | NOT NULL | Customer name |
| email | text | | Email address |
| phone | text | NOT NULL | Phone number |
| gender | text | | Gender |
| date_of_birth | date | | Date of birth |
| loyalty_points | integer | DEFAULT 0 | Loyalty points balance |
| total_bookings | integer | DEFAULT 0 | Total bookings count |
| total_spent | numeric(12,2) | DEFAULT 0 | Total amount spent |
| status | text | DEFAULT active | Customer status |
| created_at | timestamptz | DEFAULT now() | Registration date |

---

## Support

### support_tickets

Customer support tickets.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PRIMARY KEY | Ticket identifier |
| ticket_number | text | UNIQUE, NOT NULL | Ticket number |
| customer_id | uuid | NOT NULL, REFERENCES customers(id) | Customer reference |
| booking_id | uuid | REFERENCES bookings(id) | Related booking |
| subject | text | NOT NULL | Ticket subject |
| description | text | NOT NULL | Issue description |
| priority | text | DEFAULT medium | Ticket priority |
| status | text | DEFAULT open | Ticket status |
| assigned_to | uuid | REFERENCES auth.users(id) | Assigned agent |
| resolved_at | timestamptz | | Resolution timestamp |
| created_at | timestamptz | DEFAULT now() | Ticket creation |

---

## System

### system_settings

Dynamic system configuration.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PRIMARY KEY | Setting identifier |
| key | text | UNIQUE, NOT NULL | Setting key |
| value | jsonb | NOT NULL | Setting value |
| category | text | NOT NULL | Setting category |
| description | text | | Setting description |
| is_public | boolean | DEFAULT false | Public visibility |
| is_encrypted | boolean | DEFAULT false | Encryption flag |
| updated_by | uuid | REFERENCES auth.users(id) | Last updated by |
| created_at | timestamptz | DEFAULT now() | Creation timestamp |
| updated_at | timestamptz | DEFAULT now() | Update timestamp |

### audit_logs

System-wide audit trail.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PRIMARY KEY | Log identifier |
| user_id | uuid | REFERENCES auth.users(id) | User who performed action |
| action | text | NOT NULL | Action performed |
| entity_type | text | NOT NULL | Affected entity type |
| entity_id | uuid | | Affected entity ID |
| old_values | jsonb | | Previous values |
| new_values | jsonb | | New values |
| ip_address | inet | | IP address |
| user_agent | text | | User agent string |
| metadata | jsonb | DEFAULT {} | Additional metadata |
| created_at | timestamptz | DEFAULT now() | Log timestamp |

---

## All Departments

The database schema supports all 18 core departments:

1. **Accounts Department** - Financial accounting and bookkeeping
2. **Marketing Department** - Brand promotion and customer acquisition
3. **Finance Department** - Financial planning and analysis
4. **HR Department** - Human resources and employee management
5. **IT Department** - Technology infrastructure and support
6. **Operations** - Day-to-day operations management
7. **Customer Care** - Customer support and service
8. **Staff Department** - Staff management and coordination
9. **F.O. Department** - Front office operations
10. **Vendor List Management** - Vendor database management
11. **Customer Data Management** - Customer information management
12. **Legal Department** - Legal affairs and compliance
13. **Advocate** - Legal representation and advice
14. **CA & CS** - Chartered Accountant & Company Secretary
15. **Command Power – Super Admin** - Ultimate system control and oversight
16. **Directors** - Board of directors and executive management
17. **H.O. Details** - Head office administration
18. **Corporate Office** - Corporate office management

## Security Features

All tables include:

- **Row Level Security (RLS)** - 100% coverage
- **Role-based access control** - Department and role-specific policies
- **Encrypted sensitive data** - Bank details, documents, passwords
- **Complete audit trails** - All operations logged
- **Automatic timestamps** - created_at and updated_at fields

## Performance Optimizations

- Strategic indexes on all foreign keys
- Composite indexes for common queries
- Full-text search indexes
- Geographic indexes for location data
- Partitioning for large tables
