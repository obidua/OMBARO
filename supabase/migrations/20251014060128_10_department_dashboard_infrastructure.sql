/*
  # Department Dashboard Infrastructure
  
  Adds department user assignments, modules, widgets, settings, and activity logs
*/

-- Add extra columns to departments table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'departments' AND column_name = 'department_type'
  ) THEN
    ALTER TABLE departments ADD COLUMN department_type text DEFAULT 'operational' CHECK (department_type IN ('executive', 'operational', 'support', 'administrative'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'departments' AND column_name = 'email'
  ) THEN
    ALTER TABLE departments ADD COLUMN email text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'departments' AND column_name = 'phone'
  ) THEN
    ALTER TABLE departments ADD COLUMN phone text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'departments' AND column_name = 'location'
  ) THEN
    ALTER TABLE departments ADD COLUMN location text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'departments' AND column_name = 'budget_allocated'
  ) THEN
    ALTER TABLE departments ADD COLUMN budget_allocated numeric(15,2) DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'departments' AND column_name = 'employee_count'
  ) THEN
    ALTER TABLE departments ADD COLUMN employee_count integer DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'departments' AND column_name = 'settings'
  ) THEN
    ALTER TABLE departments ADD COLUMN settings jsonb DEFAULT '{}';
  END IF;
END $$;

-- Department user assignments
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

CREATE INDEX idx_dept_assignments_user ON department_user_assignments(user_id);
CREATE INDEX idx_dept_assignments_dept ON department_user_assignments(department_id);
CREATE INDEX idx_dept_assignments_status ON department_user_assignments(status) WHERE status = 'active';
CREATE INDEX idx_dept_assignments_primary ON department_user_assignments(user_id, is_primary) WHERE is_primary = true;

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

-- Department modules
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

CREATE INDEX idx_dept_modules_dept ON department_modules(department_id);
CREATE INDEX idx_dept_modules_parent ON department_modules(parent_module_id);
CREATE INDEX idx_dept_modules_enabled ON department_modules(department_id, is_enabled) WHERE is_enabled = true;
CREATE INDEX idx_dept_modules_order ON department_modules(department_id, display_order);

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

-- Department widgets
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

CREATE INDEX idx_dept_widgets_user ON department_widgets(user_id);
CREATE INDEX idx_dept_widgets_dept ON department_widgets(department_id);
CREATE INDEX idx_dept_widgets_visible ON department_widgets(user_id, department_id, is_visible) WHERE is_visible = true;

ALTER TABLE department_widgets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own widgets"
  ON department_widgets FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Department settings
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

CREATE INDEX idx_dept_settings_dept ON department_settings(department_id);
CREATE INDEX idx_dept_settings_type ON department_settings(department_id, setting_type);

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

-- Department activity logs
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

CREATE INDEX idx_dept_activity_dept ON department_activity_logs(department_id);
CREATE INDEX idx_dept_activity_user ON department_activity_logs(user_id);
CREATE INDEX idx_dept_activity_created ON department_activity_logs(created_at DESC);

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