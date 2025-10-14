/*
  # Departments & Roles Tables
  
  Creates department hierarchy, roles, permissions, and user role assignments
*/

CREATE TABLE IF NOT EXISTS departments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  code text UNIQUE NOT NULL,
  description text,
  parent_department_id uuid REFERENCES departments(id) ON DELETE SET NULL,
  head_user_id uuid,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_departments_parent ON departments(parent_department_id);
CREATE INDEX idx_departments_status ON departments(status);

CREATE TABLE IF NOT EXISTS roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  code text UNIQUE NOT NULL,
  description text,
  department_id uuid REFERENCES departments(id) ON DELETE SET NULL,
  level integer DEFAULT 1,
  permissions jsonb DEFAULT '[]',
  is_system_role boolean DEFAULT false,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_roles_department ON roles(department_id);
CREATE INDEX idx_roles_status ON roles(status);

CREATE TABLE IF NOT EXISTS permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  code text UNIQUE NOT NULL,
  description text,
  resource text NOT NULL,
  action text NOT NULL CHECK (action IN ('create', 'read', 'update', 'delete', 'execute', 'approve')),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS role_permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role_id uuid NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  permission_id uuid NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
  granted_at timestamptz DEFAULT now(),
  UNIQUE(role_id, permission_id)
);

CREATE INDEX idx_role_permissions_role ON role_permissions(role_id);
CREATE INDEX idx_role_permissions_permission ON role_permissions(permission_id);

CREATE TABLE IF NOT EXISTS user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role_id uuid NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  department_id uuid REFERENCES departments(id) ON DELETE SET NULL,
  assigned_by uuid REFERENCES auth.users(id),
  assigned_at timestamptz DEFAULT now(),
  valid_from date DEFAULT CURRENT_DATE,
  valid_until date,
  is_primary boolean DEFAULT false,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'expired')),
  UNIQUE(user_id, role_id, department_id)
);

CREATE INDEX idx_user_roles_user ON user_roles(user_id);
CREATE INDEX idx_user_roles_role ON user_roles(role_id);
CREATE INDEX idx_user_roles_active ON user_roles(user_id, status) WHERE status = 'active';

-- Insert default departments
INSERT INTO departments (name, code, description, status)
VALUES
  ('Administration', 'ADMIN', 'Administration and Management', 'active'),
  ('Operations', 'OPS', 'Operations and Service Delivery', 'active'),
  ('Human Resources', 'HR', 'Human Resources Management', 'active'),
  ('Finance', 'FIN', 'Finance and Accounting', 'active'),
  ('Marketing', 'MKT', 'Marketing and Sales', 'active'),
  ('IT', 'IT', 'Information Technology', 'active'),
  ('Customer Care', 'CC', 'Customer Support and Service', 'active')
ON CONFLICT (code) DO NOTHING;

-- Insert default roles
INSERT INTO roles (name, code, description, is_system_role, status)
VALUES
  ('Super Admin', 'SUPER_ADMIN', 'Full system access', true, 'active'),
  ('Admin', 'ADMIN', 'Administrative access', true, 'active'),
  ('Customer', 'CUSTOMER', 'Customer user', true, 'active'),
  ('Vendor', 'VENDOR', 'Vendor/Partner', true, 'active'),
  ('Therapist', 'THERAPIST', 'Service provider', true, 'active'),
  ('Employee', 'EMPLOYEE', 'Staff member', true, 'active')
ON CONFLICT (code) DO NOTHING;