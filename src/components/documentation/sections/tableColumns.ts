// Complete column definitions for all database tables

export interface ColumnInfo {
  name: string;
  type: string;
  constraints: string;
  description: string;
}

export const tableColumns: Record<string, ColumnInfo[]> = {
  // ============================================================================
  // AUTHENTICATION & USERS
  // ============================================================================

  user_profiles: [
    { name: 'id', type: 'uuid', constraints: 'PRIMARY KEY, REFERENCES auth.users(id)', description: 'User unique identifier' },
    { name: 'name', type: 'text', constraints: 'NOT NULL', description: 'Full name of the user' },
    { name: 'mobile', type: 'text', constraints: 'UNIQUE, NOT NULL', description: 'Mobile number' },
    { name: 'gender', type: 'text', constraints: 'CHECK (male, female, other)', description: 'User gender' },
    { name: 'date_of_birth', type: 'date', constraints: '', description: 'Date of birth' },
    { name: 'profile_image', type: 'text', constraints: '', description: 'Profile picture URL' },
    { name: 'role', type: 'text', constraints: 'NOT NULL', description: 'User role (customer, vendor, therapist, employee, admin, etc.)' },
    { name: 'employee_id', type: 'text', constraints: 'UNIQUE', description: 'Employee ID for staff' },
    { name: 'department_id', type: 'uuid', constraints: 'REFERENCES departments(id)', description: 'Assigned department' },
    { name: 'reporting_manager_id', type: 'uuid', constraints: 'REFERENCES auth.users(id)', description: 'Reporting manager' },
    { name: 'designation', type: 'text', constraints: '', description: 'Job designation' },
    { name: 'joining_date', type: 'date', constraints: '', description: 'Date of joining' },
    { name: 'status', type: 'text', constraints: 'DEFAULT active', description: 'Account status' },
    { name: 'address', type: 'jsonb', constraints: '', description: 'Address information' },
    { name: 'created_at', type: 'timestamptz', constraints: 'DEFAULT now()', description: 'Record creation timestamp' },
    { name: 'updated_at', type: 'timestamptz', constraints: 'DEFAULT now()', description: 'Record update timestamp' },
  ],

  user_roles: [
    { name: 'id', type: 'uuid', constraints: 'PRIMARY KEY', description: 'Unique identifier' },
    { name: 'user_id', type: 'uuid', constraints: 'NOT NULL, REFERENCES auth.users(id)', description: 'User reference' },
    { name: 'role_id', type: 'uuid', constraints: 'NOT NULL, REFERENCES roles(id)', description: 'Role reference' },
    { name: 'department_id', type: 'uuid', constraints: 'REFERENCES departments(id)', description: 'Department reference' },
    { name: 'assigned_by', type: 'uuid', constraints: 'REFERENCES auth.users(id)', description: 'Who assigned the role' },
    { name: 'assigned_at', type: 'timestamptz', constraints: 'DEFAULT now()', description: 'Assignment timestamp' },
    { name: 'valid_from', type: 'date', constraints: 'DEFAULT CURRENT_DATE', description: 'Role validity start date' },
    { name: 'valid_until', type: 'date', constraints: '', description: 'Role validity end date' },
    { name: 'is_primary', type: 'boolean', constraints: 'DEFAULT false', description: 'Primary role flag' },
    { name: 'status', type: 'text', constraints: 'DEFAULT active', description: 'Role status' },
  ],

  user_sessions: [
    { name: 'id', type: 'uuid', constraints: 'PRIMARY KEY', description: 'Session identifier' },
    { name: 'user_id', type: 'uuid', constraints: 'NOT NULL, REFERENCES auth.users(id)', description: 'User reference' },
    { name: 'session_token', type: 'text', constraints: 'UNIQUE, NOT NULL', description: 'Session token' },
    { name: 'device_info', type: 'jsonb', constraints: '', description: 'Device information' },
    { name: 'ip_address', type: 'inet', constraints: '', description: 'IP address' },
    { name: 'user_agent', type: 'text', constraints: '', description: 'Browser user agent' },
    { name: 'location_info', type: 'jsonb', constraints: '', description: 'Geographic location' },
    { name: 'started_at', type: 'timestamptz', constraints: 'DEFAULT now()', description: 'Session start time' },
    { name: 'last_activity_at', type: 'timestamptz', constraints: 'DEFAULT now()', description: 'Last activity time' },
    { name: 'expires_at', type: 'timestamptz', constraints: 'NOT NULL', description: 'Session expiry time' },
    { name: 'status', type: 'text', constraints: 'DEFAULT active', description: 'Session status' },
  ],

  user_documents: [
    { name: 'id', type: 'uuid', constraints: 'PRIMARY KEY', description: 'Document identifier' },
    { name: 'user_id', type: 'uuid', constraints: 'NOT NULL, REFERENCES auth.users(id)', description: 'User reference' },
    { name: 'document_type', type: 'text', constraints: 'NOT NULL, CHECK (aadhaar, pan, passport, etc.)', description: 'Type of document' },
    { name: 'document_number', type: 'text', constraints: '', description: 'Document number' },
    { name: 'document_name', type: 'text', constraints: 'NOT NULL', description: 'Document name' },
    { name: 'file_url', type: 'text', constraints: 'NOT NULL', description: 'File storage URL' },
    { name: 'file_type', type: 'text', constraints: '', description: 'File MIME type' },
    { name: 'file_size', type: 'integer', constraints: '', description: 'File size in bytes' },
    { name: 'verified', type: 'boolean', constraints: 'DEFAULT false', description: 'Verification status' },
    { name: 'verified_by', type: 'uuid', constraints: 'REFERENCES auth.users(id)', description: 'Verified by user' },
    { name: 'verified_at', type: 'timestamptz', constraints: '', description: 'Verification timestamp' },
    { name: 'expiry_date', type: 'date', constraints: '', description: 'Document expiry date' },
    { name: 'created_at', type: 'timestamptz', constraints: 'DEFAULT now()', description: 'Upload timestamp' },
  ],

  // ============================================================================
  // DEPARTMENTS & ROLES
  // ============================================================================

  departments: [
    { name: 'id', type: 'uuid', constraints: 'PRIMARY KEY', description: 'Department identifier' },
    { name: 'code', type: 'text', constraints: 'UNIQUE, NOT NULL', description: 'Department code' },
    { name: 'name', type: 'text', constraints: 'NOT NULL', description: 'Department name' },
    { name: 'description', type: 'text', constraints: '', description: 'Department description' },
    { name: 'icon', type: 'text', constraints: '', description: 'Icon name' },
    { name: 'color', type: 'text', constraints: '', description: 'Display color' },
    { name: 'parent_department_id', type: 'uuid', constraints: 'REFERENCES departments(id)', description: 'Parent department' },
    { name: 'head_user_id', type: 'uuid', constraints: 'REFERENCES auth.users(id)', description: 'Department head' },
    { name: 'status', type: 'text', constraints: 'DEFAULT active', description: 'Department status' },
    { name: 'budget_allocation', type: 'numeric(15,2)', constraints: '', description: 'Allocated budget' },
    { name: 'cost_center_code', type: 'text', constraints: '', description: 'Cost center code' },
    { name: 'location', type: 'text', constraints: '', description: 'Office location' },
    { name: 'contact_email', type: 'text', constraints: '', description: 'Department email' },
    { name: 'contact_phone', type: 'text', constraints: '', description: 'Department phone' },
    { name: 'created_at', type: 'timestamptz', constraints: 'DEFAULT now()', description: 'Creation timestamp' },
    { name: 'updated_at', type: 'timestamptz', constraints: 'DEFAULT now()', description: 'Update timestamp' },
  ],

  roles: [
    { name: 'id', type: 'uuid', constraints: 'PRIMARY KEY', description: 'Role identifier' },
    { name: 'code', type: 'text', constraints: 'UNIQUE, NOT NULL', description: 'Role code' },
    { name: 'name', type: 'text', constraints: 'NOT NULL', description: 'Role name' },
    { name: 'description', type: 'text', constraints: '', description: 'Role description' },
    { name: 'category', type: 'text', constraints: 'CHECK (executive, management, operational, support, technical)', description: 'Role category' },
    { name: 'level', type: 'integer', constraints: 'DEFAULT 1', description: 'Hierarchy level' },
    { name: 'department_id', type: 'uuid', constraints: 'REFERENCES departments(id)', description: 'Department reference' },
    { name: 'permissions', type: 'jsonb', constraints: 'DEFAULT []', description: 'Permission array' },
    { name: 'is_system_role', type: 'boolean', constraints: 'DEFAULT false', description: 'System role flag' },
    { name: 'status', type: 'text', constraints: 'DEFAULT active', description: 'Role status' },
    { name: 'created_at', type: 'timestamptz', constraints: 'DEFAULT now()', description: 'Creation timestamp' },
    { name: 'updated_at', type: 'timestamptz', constraints: 'DEFAULT now()', description: 'Update timestamp' },
  ],

  // ============================================================================
  // HR & EMPLOYEES
  // ============================================================================

  employees: [
    { name: 'id', type: 'uuid', constraints: 'PRIMARY KEY, REFERENCES auth.users(id)', description: 'Employee identifier' },
    { name: 'employee_code', type: 'text', constraints: 'UNIQUE, NOT NULL', description: 'Employee code' },
    { name: 'joining_date', type: 'date', constraints: 'NOT NULL', description: 'Date of joining' },
    { name: 'probation_end_date', type: 'date', constraints: '', description: 'Probation period end' },
    { name: 'confirmation_date', type: 'date', constraints: '', description: 'Confirmation date' },
    { name: 'employment_type', type: 'text', constraints: 'CHECK (full_time, part_time, contract, intern)', description: 'Employment type' },
    { name: 'reporting_manager_id', type: 'uuid', constraints: 'REFERENCES auth.users(id)', description: 'Reporting manager' },
    { name: 'work_location', type: 'text', constraints: '', description: 'Primary work location' },
    { name: 'status', type: 'text', constraints: 'DEFAULT active', description: 'Employment status' },
    { name: 'exit_date', type: 'date', constraints: '', description: 'Last working day' },
    { name: 'created_at', type: 'timestamptz', constraints: 'DEFAULT now()', description: 'Record creation' },
  ],

  attendance_records: [
    { name: 'id', type: 'uuid', constraints: 'PRIMARY KEY', description: 'Attendance record ID' },
    { name: 'employee_id', type: 'uuid', constraints: 'NOT NULL, REFERENCES auth.users(id)', description: 'Employee reference' },
    { name: 'date', type: 'date', constraints: 'NOT NULL', description: 'Attendance date' },
    { name: 'check_in_time', type: 'timestamptz', constraints: '', description: 'Check-in timestamp' },
    { name: 'check_out_time', type: 'timestamptz', constraints: '', description: 'Check-out timestamp' },
    { name: 'check_in_location', type: 'point', constraints: '', description: 'Check-in GPS location' },
    { name: 'check_out_location', type: 'point', constraints: '', description: 'Check-out GPS location' },
    { name: 'working_hours', type: 'numeric(4,2)', constraints: '', description: 'Total working hours' },
    { name: 'status', type: 'text', constraints: 'DEFAULT present', description: 'Attendance status' },
    { name: 'notes', type: 'text', constraints: '', description: 'Additional notes' },
    { name: 'created_at', type: 'timestamptz', constraints: 'DEFAULT now()', description: 'Record creation' },
  ],

  leave_requests: [
    { name: 'id', type: 'uuid', constraints: 'PRIMARY KEY', description: 'Leave request ID' },
    { name: 'employee_id', type: 'uuid', constraints: 'NOT NULL, REFERENCES auth.users(id)', description: 'Employee reference' },
    { name: 'leave_type_id', type: 'uuid', constraints: 'REFERENCES leave_types(id)', description: 'Leave type' },
    { name: 'start_date', type: 'date', constraints: 'NOT NULL', description: 'Leave start date' },
    { name: 'end_date', type: 'date', constraints: 'NOT NULL', description: 'Leave end date' },
    { name: 'total_days', type: 'numeric(4,1)', constraints: 'NOT NULL', description: 'Number of leave days' },
    { name: 'reason', type: 'text', constraints: 'NOT NULL', description: 'Leave reason' },
    { name: 'status', type: 'text', constraints: 'DEFAULT pending', description: 'Approval status' },
    { name: 'approved_by', type: 'uuid', constraints: 'REFERENCES auth.users(id)', description: 'Approver user' },
    { name: 'approved_at', type: 'timestamptz', constraints: '', description: 'Approval timestamp' },
    { name: 'rejection_reason', type: 'text', constraints: '', description: 'Rejection reason' },
    { name: 'created_at', type: 'timestamptz', constraints: 'DEFAULT now()', description: 'Request creation' },
  ],

  salary_records: [
    { name: 'id', type: 'uuid', constraints: 'PRIMARY KEY', description: 'Salary record ID' },
    { name: 'employee_id', type: 'uuid', constraints: 'NOT NULL, REFERENCES auth.users(id)', description: 'Employee reference' },
    { name: 'month', type: 'date', constraints: 'NOT NULL', description: 'Salary month' },
    { name: 'basic_salary', type: 'numeric(12,2)', constraints: 'NOT NULL', description: 'Basic salary amount' },
    { name: 'total_earnings', type: 'numeric(12,2)', constraints: 'DEFAULT 0', description: 'Total earnings' },
    { name: 'total_deductions', type: 'numeric(12,2)', constraints: 'DEFAULT 0', description: 'Total deductions' },
    { name: 'net_salary', type: 'numeric(12,2)', constraints: 'NOT NULL', description: 'Net salary payable' },
    { name: 'payment_date', type: 'date', constraints: '', description: 'Payment date' },
    { name: 'payment_status', type: 'text', constraints: 'DEFAULT pending', description: 'Payment status' },
    { name: 'payment_reference', type: 'text', constraints: '', description: 'Payment reference number' },
    { name: 'created_at', type: 'timestamptz', constraints: 'DEFAULT now()', description: 'Record creation' },
  ],

  // ============================================================================
  // VENDORS
  // ============================================================================

  vendors: [
    { name: 'id', type: 'uuid', constraints: 'PRIMARY KEY', description: 'Vendor identifier' },
    { name: 'user_id', type: 'uuid', constraints: 'UNIQUE, REFERENCES auth.users(id)', description: 'Associated user account' },
    { name: 'business_name', type: 'text', constraints: 'NOT NULL', description: 'Business/spa name' },
    { name: 'business_type', type: 'text', constraints: 'CHECK (spa, salon, wellness_center, independent)', description: 'Type of business' },
    { name: 'registration_number', type: 'text', constraints: '', description: 'Business registration number' },
    { name: 'gst_number', type: 'text', constraints: '', description: 'GST number' },
    { name: 'pan_number', type: 'text', constraints: '', description: 'PAN number' },
    { name: 'contact_person', type: 'text', constraints: 'NOT NULL', description: 'Contact person name' },
    { name: 'email', type: 'text', constraints: 'NOT NULL', description: 'Business email' },
    { name: 'phone', type: 'text', constraints: 'NOT NULL', description: 'Contact phone' },
    { name: 'address', type: 'jsonb', constraints: 'NOT NULL', description: 'Business address' },
    { name: 'rating', type: 'numeric(3,2)', constraints: 'DEFAULT 0', description: 'Average rating' },
    { name: 'status', type: 'text', constraints: 'DEFAULT active', description: 'Vendor status' },
    { name: 'created_at', type: 'timestamptz', constraints: 'DEFAULT now()', description: 'Registration date' },
    { name: 'updated_at', type: 'timestamptz', constraints: 'DEFAULT now()', description: 'Last update' },
  ],

  vendor_applications: [
    { name: 'id', type: 'uuid', constraints: 'PRIMARY KEY', description: 'Application identifier' },
    { name: 'user_id', type: 'uuid', constraints: 'NOT NULL, REFERENCES auth.users(id)', description: 'Applicant user' },
    { name: 'business_name', type: 'text', constraints: 'NOT NULL', description: 'Proposed business name' },
    { name: 'business_type', type: 'text', constraints: 'NOT NULL', description: 'Type of business' },
    { name: 'contact_person', type: 'text', constraints: 'NOT NULL', description: 'Primary contact' },
    { name: 'email', type: 'text', constraints: 'NOT NULL', description: 'Business email' },
    { name: 'phone', type: 'text', constraints: 'NOT NULL', description: 'Contact phone' },
    { name: 'address', type: 'jsonb', constraints: 'NOT NULL', description: 'Business address' },
    { name: 'application_status', type: 'text', constraints: 'DEFAULT pending', description: 'Application status' },
    { name: 'reviewed_by', type: 'uuid', constraints: 'REFERENCES auth.users(id)', description: 'Reviewer user' },
    { name: 'reviewed_at', type: 'timestamptz', constraints: '', description: 'Review timestamp' },
    { name: 'rejection_reason', type: 'text', constraints: '', description: 'Rejection reason' },
    { name: 'created_at', type: 'timestamptz', constraints: 'DEFAULT now()', description: 'Application date' },
  ],

  // ============================================================================
  // THERAPISTS
  // ============================================================================

  therapists: [
    { name: 'id', type: 'uuid', constraints: 'PRIMARY KEY', description: 'Therapist identifier' },
    { name: 'user_id', type: 'uuid', constraints: 'UNIQUE, REFERENCES auth.users(id)', description: 'Associated user account' },
    { name: 'vendor_id', type: 'uuid', constraints: 'REFERENCES vendors(id)', description: 'Vendor reference' },
    { name: 'name', type: 'text', constraints: 'NOT NULL', description: 'Therapist name' },
    { name: 'email', type: 'text', constraints: '', description: 'Email address' },
    { name: 'phone', type: 'text', constraints: 'NOT NULL', description: 'Contact phone' },
    { name: 'gender', type: 'text', constraints: 'CHECK (male, female, other)', description: 'Gender' },
    { name: 'experience_years', type: 'integer', constraints: 'DEFAULT 0', description: 'Years of experience' },
    { name: 'specializations', type: 'text[]', constraints: '', description: 'Areas of specialization' },
    { name: 'languages', type: 'text[]', constraints: '', description: 'Languages spoken' },
    { name: 'rating', type: 'numeric(3,2)', constraints: 'DEFAULT 0', description: 'Average rating' },
    { name: 'status', type: 'text', constraints: 'DEFAULT active', description: 'Therapist status' },
    { name: 'created_at', type: 'timestamptz', constraints: 'DEFAULT now()', description: 'Registration date' },
    { name: 'updated_at', type: 'timestamptz', constraints: 'DEFAULT now()', description: 'Last update' },
  ],

  therapist_assignments: [
    { name: 'id', type: 'uuid', constraints: 'PRIMARY KEY', description: 'Assignment identifier' },
    { name: 'booking_id', type: 'uuid', constraints: 'NOT NULL, REFERENCES bookings(id)', description: 'Booking reference' },
    { name: 'therapist_id', type: 'uuid', constraints: 'NOT NULL, REFERENCES therapists(id)', description: 'Therapist reference' },
    { name: 'assigned_at', type: 'timestamptz', constraints: 'DEFAULT now()', description: 'Assignment time' },
    { name: 'assigned_by', type: 'uuid', constraints: 'REFERENCES auth.users(id)', description: 'Assigned by user' },
    { name: 'status', type: 'text', constraints: 'DEFAULT assigned', description: 'Assignment status' },
    { name: 'accepted_at', type: 'timestamptz', constraints: '', description: 'Acceptance time' },
    { name: 'started_at', type: 'timestamptz', constraints: '', description: 'Service start time' },
    { name: 'completed_at', type: 'timestamptz', constraints: '', description: 'Service completion time' },
    { name: 'notes', type: 'text', constraints: '', description: 'Assignment notes' },
  ],

  // ============================================================================
  // SERVICES
  // ============================================================================

  services: [
    { name: 'id', type: 'uuid', constraints: 'PRIMARY KEY', description: 'Service identifier' },
    { name: 'name', type: 'text', constraints: 'NOT NULL', description: 'Service name' },
    { name: 'description', type: 'text', constraints: '', description: 'Service description' },
    { name: 'category', type: 'text', constraints: 'NOT NULL', description: 'Service category' },
    { name: 'duration', type: 'integer', constraints: 'NOT NULL', description: 'Duration in minutes' },
    { name: 'price', type: 'numeric(10,2)', constraints: 'NOT NULL', description: 'Service price' },
    { name: 'image_url', type: 'text', constraints: '', description: 'Service image' },
    { name: 'benefits', type: 'text[]', constraints: '', description: 'Service benefits' },
    { name: 'is_popular', type: 'boolean', constraints: 'DEFAULT false', description: 'Popular service flag' },
    { name: 'is_active', type: 'boolean', constraints: 'DEFAULT true', description: 'Active status' },
    { name: 'created_at', type: 'timestamptz', constraints: 'DEFAULT now()', description: 'Creation date' },
    { name: 'updated_at', type: 'timestamptz', constraints: 'DEFAULT now()', description: 'Last update' },
  ],

  // ============================================================================
  // BOOKINGS
  // ============================================================================

  bookings: [
    { name: 'id', type: 'uuid', constraints: 'PRIMARY KEY', description: 'Booking identifier' },
    { name: 'customer_id', type: 'uuid', constraints: 'NOT NULL, REFERENCES customers(id)', description: 'Customer reference' },
    { name: 'vendor_id', type: 'uuid', constraints: 'REFERENCES vendors(id)', description: 'Vendor reference' },
    { name: 'booking_number', type: 'text', constraints: 'UNIQUE, NOT NULL', description: 'Booking number' },
    { name: 'booking_date', type: 'date', constraints: 'NOT NULL', description: 'Service date' },
    { name: 'booking_time', type: 'time', constraints: 'NOT NULL', description: 'Service time' },
    { name: 'address', type: 'jsonb', constraints: 'NOT NULL', description: 'Service address' },
    { name: 'total_amount', type: 'numeric(10,2)', constraints: 'NOT NULL', description: 'Total booking amount' },
    { name: 'status', type: 'text', constraints: 'DEFAULT pending', description: 'Booking status' },
    { name: 'payment_status', type: 'text', constraints: 'DEFAULT pending', description: 'Payment status' },
    { name: 'notes', type: 'text', constraints: '', description: 'Customer notes' },
    { name: 'created_at', type: 'timestamptz', constraints: 'DEFAULT now()', description: 'Booking creation' },
    { name: 'updated_at', type: 'timestamptz', constraints: 'DEFAULT now()', description: 'Last update' },
  ],

  // ============================================================================
  // PAYMENTS
  // ============================================================================

  payments: [
    { name: 'id', type: 'uuid', constraints: 'PRIMARY KEY', description: 'Payment identifier' },
    { name: 'booking_id', type: 'uuid', constraints: 'REFERENCES bookings(id)', description: 'Related booking' },
    { name: 'customer_id', type: 'uuid', constraints: 'NOT NULL, REFERENCES customers(id)', description: 'Customer reference' },
    { name: 'amount', type: 'numeric(12,2)', constraints: 'NOT NULL', description: 'Payment amount' },
    { name: 'payment_method', type: 'text', constraints: 'NOT NULL', description: 'Payment method' },
    { name: 'payment_gateway', type: 'text', constraints: '', description: 'Gateway used' },
    { name: 'transaction_id', type: 'text', constraints: 'UNIQUE', description: 'Gateway transaction ID' },
    { name: 'status', type: 'text', constraints: 'DEFAULT pending', description: 'Payment status' },
    { name: 'paid_at', type: 'timestamptz', constraints: '', description: 'Payment timestamp' },
    { name: 'created_at', type: 'timestamptz', constraints: 'DEFAULT now()', description: 'Record creation' },
  ],

  // ============================================================================
  // CUSTOMERS
  // ============================================================================

  customers: [
    { name: 'id', type: 'uuid', constraints: 'PRIMARY KEY', description: 'Customer identifier' },
    { name: 'user_id', type: 'uuid', constraints: 'UNIQUE, REFERENCES auth.users(id)', description: 'Associated user account' },
    { name: 'name', type: 'text', constraints: 'NOT NULL', description: 'Customer name' },
    { name: 'email', type: 'text', constraints: '', description: 'Email address' },
    { name: 'phone', type: 'text', constraints: 'NOT NULL', description: 'Phone number' },
    { name: 'gender', type: 'text', constraints: '', description: 'Gender' },
    { name: 'date_of_birth', type: 'date', constraints: '', description: 'Date of birth' },
    { name: 'loyalty_points', type: 'integer', constraints: 'DEFAULT 0', description: 'Loyalty points balance' },
    { name: 'total_bookings', type: 'integer', constraints: 'DEFAULT 0', description: 'Total bookings count' },
    { name: 'total_spent', type: 'numeric(12,2)', constraints: 'DEFAULT 0', description: 'Total amount spent' },
    { name: 'status', type: 'text', constraints: 'DEFAULT active', description: 'Customer status' },
    { name: 'created_at', type: 'timestamptz', constraints: 'DEFAULT now()', description: 'Registration date' },
  ],

  // ============================================================================
  // SUPPORT
  // ============================================================================

  support_tickets: [
    { name: 'id', type: 'uuid', constraints: 'PRIMARY KEY', description: 'Ticket identifier' },
    { name: 'ticket_number', type: 'text', constraints: 'UNIQUE, NOT NULL', description: 'Ticket number' },
    { name: 'customer_id', type: 'uuid', constraints: 'NOT NULL, REFERENCES customers(id)', description: 'Customer reference' },
    { name: 'booking_id', type: 'uuid', constraints: 'REFERENCES bookings(id)', description: 'Related booking' },
    { name: 'subject', type: 'text', constraints: 'NOT NULL', description: 'Ticket subject' },
    { name: 'description', type: 'text', constraints: 'NOT NULL', description: 'Issue description' },
    { name: 'priority', type: 'text', constraints: 'DEFAULT medium', description: 'Ticket priority' },
    { name: 'status', type: 'text', constraints: 'DEFAULT open', description: 'Ticket status' },
    { name: 'assigned_to', type: 'uuid', constraints: 'REFERENCES auth.users(id)', description: 'Assigned agent' },
    { name: 'resolved_at', type: 'timestamptz', constraints: '', description: 'Resolution timestamp' },
    { name: 'created_at', type: 'timestamptz', constraints: 'DEFAULT now()', description: 'Ticket creation' },
  ],

  // ============================================================================
  // SYSTEM
  // ============================================================================

  system_settings: [
    { name: 'id', type: 'uuid', constraints: 'PRIMARY KEY', description: 'Setting identifier' },
    { name: 'key', type: 'text', constraints: 'UNIQUE, NOT NULL', description: 'Setting key' },
    { name: 'value', type: 'jsonb', constraints: 'NOT NULL', description: 'Setting value' },
    { name: 'category', type: 'text', constraints: 'NOT NULL', description: 'Setting category' },
    { name: 'description', type: 'text', constraints: '', description: 'Setting description' },
    { name: 'is_public', type: 'boolean', constraints: 'DEFAULT false', description: 'Public visibility' },
    { name: 'is_encrypted', type: 'boolean', constraints: 'DEFAULT false', description: 'Encryption flag' },
    { name: 'updated_by', type: 'uuid', constraints: 'REFERENCES auth.users(id)', description: 'Last updated by' },
    { name: 'created_at', type: 'timestamptz', constraints: 'DEFAULT now()', description: 'Creation timestamp' },
    { name: 'updated_at', type: 'timestamptz', constraints: 'DEFAULT now()', description: 'Update timestamp' },
  ],

  audit_logs: [
    { name: 'id', type: 'uuid', constraints: 'PRIMARY KEY', description: 'Log identifier' },
    { name: 'user_id', type: 'uuid', constraints: 'REFERENCES auth.users(id)', description: 'User who performed action' },
    { name: 'action', type: 'text', constraints: 'NOT NULL', description: 'Action performed' },
    { name: 'entity_type', type: 'text', constraints: 'NOT NULL', description: 'Affected entity type' },
    { name: 'entity_id', type: 'uuid', constraints: '', description: 'Affected entity ID' },
    { name: 'old_values', type: 'jsonb', constraints: '', description: 'Previous values' },
    { name: 'new_values', type: 'jsonb', constraints: '', description: 'New values' },
    { name: 'ip_address', type: 'inet', constraints: '', description: 'IP address' },
    { name: 'user_agent', type: 'text', constraints: '', description: 'User agent string' },
    { name: 'metadata', type: 'jsonb', constraints: 'DEFAULT {}', description: 'Additional metadata' },
    { name: 'created_at', type: 'timestamptz', constraints: 'DEFAULT now()', description: 'Log timestamp' },
  ],
};
