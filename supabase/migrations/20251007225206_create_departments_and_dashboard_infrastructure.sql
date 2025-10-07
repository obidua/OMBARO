/*
  # Departments and Dashboard Infrastructure

  ## Overview
  Creates the complete infrastructure for department management and department-specific
  dashboards with role-based access control, module permissions, and customizable widgets.

  ## New Tables
  1. `departments` - Core department information and hierarchy
  2. `department_user_assignments` - Links users to departments with roles
  3. `department_modules` - Defines available modules per department
  4. `department_widgets` - User-specific widget preferences
  5. `department_settings` - Department-level configurations
  6. `department_activity_logs` - Audit trail for department actions

  ## Security
  - Row Level Security enabled on all tables
  - Users can only access their assigned departments
  - Department heads have elevated permissions
  - Admins have full access to all departments
*/

-- ============================================================================
-- DEPARTMENTS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS departments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  code text UNIQUE NOT NULL,
  description text,
  parent_department_id uuid REFERENCES departments(id) ON DELETE SET NULL,
  head_user_id uuid,
  department_type text DEFAULT 'operational' CHECK (department_type IN ('executive', 'operational', 'support', 'administrative')),
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'restructuring')),
  email text,
  phone text,
  location text,
  budget_allocated numeric(15,2) DEFAULT 0,
  employee_count integer DEFAULT 0,
  settings jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_departments_code ON departments(code);
CREATE INDEX IF NOT EXISTS idx_departments_parent ON departments(parent_department_id);
CREATE INDEX IF NOT EXISTS idx_departments_status ON departments(status) WHERE status = 'active';
CREATE INDEX IF NOT EXISTS idx_departments_head ON departments(head_user_id);

ALTER TABLE departments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all departments"
  ON departments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Department heads can update their department"
  ON departments FOR UPDATE
  TO authenticated
  USING (auth.uid() = head_user_id)
  WITH CHECK (auth.uid() = head_user_id);

-- ============================================================================
-- DEPARTMENT USER ASSIGNMENTS
-- ============================================================================

CREATE TABLE IF NOT EXISTS department_user_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  department_id uuid NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
  role_id uuid,
  assignment_type text DEFAULT 'member' CHECK (assignment_type IN ('head', 'member', 'deputy', 'viewer')),
  is_primary boolean DEFAULT false,
  assigned_by uuid,
  assigned_at timestamptz DEFAULT now(),
  valid_from timestamptz DEFAULT now(),
  valid_until timestamptz,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_dept_assignments_user ON department_user_assignments(user_id);
CREATE INDEX IF NOT EXISTS idx_dept_assignments_dept ON department_user_assignments(department_id);
CREATE INDEX IF NOT EXISTS idx_dept_assignments_status ON department_user_assignments(status) WHERE status = 'active';
CREATE INDEX IF NOT EXISTS idx_dept_assignments_primary ON department_user_assignments(user_id, is_primary) WHERE is_primary = true;

ALTER TABLE department_user_assignments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own department assignments"
  ON department_user_assignments FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id OR
    auth.uid() IN (
      SELECT user_id FROM department_user_assignments dua 
      WHERE dua.department_id = department_user_assignments.department_id 
      AND dua.assignment_type = 'head'
    )
  );

-- ============================================================================
-- DEPARTMENT MODULES
-- ============================================================================

CREATE TABLE IF NOT EXISTS department_modules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  department_id uuid NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
  module_key text NOT NULL,
  module_name text NOT NULL,
  description text,
  icon text DEFAULT 'Folder',
  display_order integer DEFAULT 0,
  is_enabled boolean DEFAULT true,
  parent_module_id uuid REFERENCES department_modules(id) ON DELETE CASCADE,
  required_permissions text[] DEFAULT '{}',
  settings jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(department_id, module_key)
);

CREATE INDEX IF NOT EXISTS idx_dept_modules_dept ON department_modules(department_id);
CREATE INDEX IF NOT EXISTS idx_dept_modules_parent ON department_modules(parent_module_id);
CREATE INDEX IF NOT EXISTS idx_dept_modules_enabled ON department_modules(department_id, is_enabled) WHERE is_enabled = true;
CREATE INDEX IF NOT EXISTS idx_dept_modules_order ON department_modules(department_id, display_order);

ALTER TABLE department_modules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view modules for their departments"
  ON department_modules FOR SELECT
  TO authenticated
  USING (
    department_id IN (
      SELECT department_id FROM department_user_assignments 
      WHERE user_id = auth.uid() AND status = 'active'
    )
  );

-- ============================================================================
-- DEPARTMENT WIDGETS
-- ============================================================================

CREATE TABLE IF NOT EXISTS department_widgets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  department_id uuid NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
  widget_type text NOT NULL CHECK (widget_type IN ('stat', 'chart', 'list', 'table', 'calendar', 'activity', 'quick_action')),
  widget_key text NOT NULL,
  title text NOT NULL,
  configuration jsonb DEFAULT '{}',
  position jsonb DEFAULT '{"x": 0, "y": 0, "width": 1, "height": 1}',
  is_visible boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, department_id, widget_key)
);

CREATE INDEX IF NOT EXISTS idx_dept_widgets_user ON department_widgets(user_id);
CREATE INDEX IF NOT EXISTS idx_dept_widgets_dept ON department_widgets(department_id);
CREATE INDEX IF NOT EXISTS idx_dept_widgets_visible ON department_widgets(user_id, department_id, is_visible) WHERE is_visible = true;

ALTER TABLE department_widgets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own widgets"
  ON department_widgets FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- DEPARTMENT SETTINGS
-- ============================================================================

CREATE TABLE IF NOT EXISTS department_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  department_id uuid NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
  setting_key text NOT NULL,
  setting_value jsonb NOT NULL,
  setting_type text DEFAULT 'general' CHECK (setting_type IN ('general', 'theme', 'feature', 'notification', 'security')),
  description text,
  is_public boolean DEFAULT false,
  updated_by uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(department_id, setting_key)
);

CREATE INDEX IF NOT EXISTS idx_dept_settings_dept ON department_settings(department_id);
CREATE INDEX IF NOT EXISTS idx_dept_settings_type ON department_settings(department_id, setting_type);

ALTER TABLE department_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view settings for their departments"
  ON department_settings FOR SELECT
  TO authenticated
  USING (
    department_id IN (
      SELECT department_id FROM department_user_assignments 
      WHERE user_id = auth.uid() AND status = 'active'
    ) OR is_public = true
  );

-- ============================================================================
-- DEPARTMENT ACTIVITY LOGS
-- ============================================================================

CREATE TABLE IF NOT EXISTS department_activity_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  department_id uuid NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  action text NOT NULL,
  module_key text,
  resource_type text,
  resource_id uuid,
  description text,
  metadata jsonb DEFAULT '{}',
  ip_address inet,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_dept_activity_dept ON department_activity_logs(department_id);
CREATE INDEX IF NOT EXISTS idx_dept_activity_user ON department_activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_dept_activity_created ON department_activity_logs(created_at DESC);

ALTER TABLE department_activity_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view activity logs for their departments"
  ON department_activity_logs FOR SELECT
  TO authenticated
  USING (
    department_id IN (
      SELECT department_id FROM department_user_assignments 
      WHERE user_id = auth.uid() AND status = 'active'
    )
  );

-- ============================================================================
-- INSERT DEFAULT DEPARTMENTS
-- ============================================================================

INSERT INTO departments (name, code, description, department_type, status) VALUES
  ('Finance Department', 'FINANCE', 'Financial planning and analysis', 'operational', 'active'),
  ('Accounts Department', 'ACCOUNTS', 'Financial accounting and bookkeeping', 'operational', 'active'),
  ('Marketing Department', 'MARKETING', 'Brand promotion and customer acquisition', 'operational', 'active'),
  ('HR Department', 'HR', 'Human resources and employee management', 'support', 'active'),
  ('IT Department', 'IT', 'Technology infrastructure and support', 'support', 'active'),
  ('Legal Department', 'LEGAL', 'Legal affairs and compliance', 'support', 'active'),
  ('Customer Care', 'CUSTOMER_CARE', 'Customer support and service', 'operational', 'active'),
  ('Staff Department', 'STAFF', 'Staff management and coordination', 'support', 'active'),
  ('F.O. Department', 'FO', 'Front office operations', 'operational', 'active'),
  ('Vendor List', 'VENDOR_LIST', 'Vendor database management', 'operational', 'active'),
  ('Customer Data', 'CUSTOMER_DATA', 'Customer information management', 'operational', 'active'),
  ('Advocate', 'ADVOCATE', 'Legal representation and advice', 'support', 'active'),
  ('CA & CS', 'CA_CS', 'Chartered Accountant & Company Secretary', 'support', 'active'),
  ('Directors', 'DIRECTORS', 'Board of directors and executive management', 'executive', 'active'),
  ('H.O. Details', 'HO', 'Head office administration', 'administrative', 'active'),
  ('Corporate Office', 'CORPORATE', 'Corporate office management', 'administrative', 'active')
ON CONFLICT (code) DO NOTHING;

-- ============================================================================
-- INSERT DEFAULT MODULES FOR EACH DEPARTMENT
-- ============================================================================

DO $$
DECLARE
  dept_id uuid;
BEGIN
  -- Finance Department Modules
  SELECT id INTO dept_id FROM departments WHERE code = 'FINANCE';
  IF dept_id IS NOT NULL THEN
    INSERT INTO department_modules (department_id, module_key, module_name, description, icon, display_order)
    VALUES 
      (dept_id, 'overview', 'Dashboard Overview', 'Main dashboard with key metrics', 'LayoutDashboard', 0),
      (dept_id, 'budgets', 'Budget Management', 'Create and manage departmental budgets', 'PieChart', 1),
      (dept_id, 'forecasting', 'Financial Forecasting', 'Revenue and expense projections', 'TrendingUp', 2),
      (dept_id, 'reports', 'Financial Reports', 'Generate comprehensive financial reports', 'FileText', 3),
      (dept_id, 'analytics', 'Financial Analytics', 'Analyze financial data and trends', 'BarChart3', 4)
    ON CONFLICT (department_id, module_key) DO NOTHING;
  END IF;

  -- Accounts Department Modules
  SELECT id INTO dept_id FROM departments WHERE code = 'ACCOUNTS';
  IF dept_id IS NOT NULL THEN
    INSERT INTO department_modules (department_id, module_key, module_name, description, icon, display_order)
    VALUES 
      (dept_id, 'overview', 'Dashboard Overview', 'Main dashboard with key metrics', 'LayoutDashboard', 0),
      (dept_id, 'invoices', 'Invoice Management', 'Create, send, and track invoices', 'FileText', 1),
      (dept_id, 'payments', 'Payment Processing', 'Process payments and refunds', 'CreditCard', 2),
      (dept_id, 'reconciliation', 'Account Reconciliation', 'Reconcile bank accounts', 'CheckCircle', 3),
      (dept_id, 'ledger', 'General Ledger', 'View and manage general ledger', 'Book', 4)
    ON CONFLICT (department_id, module_key) DO NOTHING;
  END IF;

  -- Marketing Department Modules
  SELECT id INTO dept_id FROM departments WHERE code = 'MARKETING';
  IF dept_id IS NOT NULL THEN
    INSERT INTO department_modules (department_id, module_key, module_name, description, icon, display_order)
    VALUES 
      (dept_id, 'overview', 'Dashboard Overview', 'Main dashboard with key metrics', 'LayoutDashboard', 0),
      (dept_id, 'campaigns', 'Campaign Manager', 'Create and manage marketing campaigns', 'Megaphone', 1),
      (dept_id, 'analytics', 'Marketing Analytics', 'Track campaign performance metrics', 'BarChart3', 2),
      (dept_id, 'content', 'Content Library', 'Manage marketing content assets', 'Image', 3),
      (dept_id, 'social', 'Social Media', 'Social media management tools', 'Share2', 4)
    ON CONFLICT (department_id, module_key) DO NOTHING;
  END IF;

  -- HR Department Modules
  SELECT id INTO dept_id FROM departments WHERE code = 'HR';
  IF dept_id IS NOT NULL THEN
    INSERT INTO department_modules (department_id, module_key, module_name, description, icon, display_order)
    VALUES 
      (dept_id, 'overview', 'Dashboard Overview', 'Main dashboard with key metrics', 'LayoutDashboard', 0),
      (dept_id, 'employees', 'Employee Directory', 'Manage employee records', 'Users', 1),
      (dept_id, 'recruitment', 'Recruitment Pipeline', 'Hiring and onboarding processes', 'UserPlus', 2),
      (dept_id, 'payroll', 'Payroll System', 'Salary and benefits administration', 'DollarSign', 3),
      (dept_id, 'performance', 'Performance Tracking', 'Employee evaluations and reviews', 'TrendingUp', 4),
      (dept_id, 'leave', 'Leave Management', 'Track and approve leave requests', 'Calendar', 5)
    ON CONFLICT (department_id, module_key) DO NOTHING;
  END IF;

  -- IT Department Modules
  SELECT id INTO dept_id FROM departments WHERE code = 'IT';
  IF dept_id IS NOT NULL THEN
    INSERT INTO department_modules (department_id, module_key, module_name, description, icon, display_order)
    VALUES 
      (dept_id, 'overview', 'Dashboard Overview', 'Main dashboard with key metrics', 'LayoutDashboard', 0),
      (dept_id, 'monitoring', 'System Monitoring', 'Monitor system health and uptime', 'Activity', 1),
      (dept_id, 'tickets', 'Support Tickets', 'IT support ticket management', 'MessageSquare', 2),
      (dept_id, 'infrastructure', 'Infrastructure', 'Server and network management', 'Server', 3),
      (dept_id, 'security', 'Security Dashboard', 'Security monitoring and alerts', 'Shield', 4),
      (dept_id, 'assets', 'Asset Management', 'Track IT assets and inventory', 'Package', 5)
    ON CONFLICT (department_id, module_key) DO NOTHING;
  END IF;

  -- Legal Department Modules
  SELECT id INTO dept_id FROM departments WHERE code = 'LEGAL';
  IF dept_id IS NOT NULL THEN
    INSERT INTO department_modules (department_id, module_key, module_name, description, icon, display_order)
    VALUES 
      (dept_id, 'overview', 'Dashboard Overview', 'Main dashboard with key metrics', 'LayoutDashboard', 0),
      (dept_id, 'cases', 'Case Management', 'Track legal cases and proceedings', 'Briefcase', 1),
      (dept_id, 'contracts', 'Contract Repository', 'Manage legal contracts', 'FileText', 2),
      (dept_id, 'compliance', 'Compliance Tracker', 'Regulatory compliance monitoring', 'Shield', 3),
      (dept_id, 'documents', 'Document Management', 'Legal document library', 'FolderOpen', 4)
    ON CONFLICT (department_id, module_key) DO NOTHING;
  END IF;

  -- Customer Care Modules
  SELECT id INTO dept_id FROM departments WHERE code = 'CUSTOMER_CARE';
  IF dept_id IS NOT NULL THEN
    INSERT INTO department_modules (department_id, module_key, module_name, description, icon, display_order)
    VALUES 
      (dept_id, 'overview', 'Dashboard Overview', 'Main dashboard with key metrics', 'LayoutDashboard', 0),
      (dept_id, 'tickets', 'Support Tickets', 'Customer support ticket system', 'MessageSquare', 1),
      (dept_id, 'live_chat', 'Live Chat', 'Real-time customer support chat', 'MessageCircle', 2),
      (dept_id, 'feedback', 'Customer Feedback', 'Collect and analyze feedback', 'Star', 3),
      (dept_id, 'knowledge_base', 'Knowledge Base', 'Help articles and FAQs', 'BookOpen', 4)
    ON CONFLICT (department_id, module_key) DO NOTHING;
  END IF;

  -- Staff Department Modules
  SELECT id INTO dept_id FROM departments WHERE code = 'STAFF';
  IF dept_id IS NOT NULL THEN
    INSERT INTO department_modules (department_id, module_key, module_name, description, icon, display_order)
    VALUES 
      (dept_id, 'overview', 'Dashboard Overview', 'Main dashboard with key metrics', 'LayoutDashboard', 0),
      (dept_id, 'directory', 'Staff Directory', 'Staff member information', 'Users', 1),
      (dept_id, 'attendance', 'Attendance Tracker', 'Track staff attendance', 'Clock', 2),
      (dept_id, 'scheduling', 'Shift Scheduling', 'Manage staff schedules', 'Calendar', 3),
      (dept_id, 'performance', 'Performance Reports', 'Staff performance metrics', 'TrendingUp', 4)
    ON CONFLICT (department_id, module_key) DO NOTHING;
  END IF;

  -- Add modules for remaining departments with basic overview
  FOR dept_id IN 
    SELECT id FROM departments WHERE code IN ('FO', 'VENDOR_LIST', 'CUSTOMER_DATA', 'ADVOCATE', 'CA_CS', 'DIRECTORS', 'HO', 'CORPORATE')
  LOOP
    INSERT INTO department_modules (department_id, module_key, module_name, description, icon, display_order)
    VALUES (dept_id, 'overview', 'Dashboard Overview', 'Main dashboard with key metrics', 'LayoutDashboard', 0)
    ON CONFLICT (department_id, module_key) DO NOTHING;
  END LOOP;
END $$;
