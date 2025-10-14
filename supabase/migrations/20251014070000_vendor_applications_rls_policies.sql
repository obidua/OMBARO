/*
  # Vendor Applications RLS Policies

  This migration adds comprehensive Row Level Security policies for vendor applications
  and approval workflow tables to ensure proper data access control.

  ## Security Rules

  1. **vendor_applications**
     - Applicants can view their own applications
     - Employees with approval permissions can view applications at their level
     - Admins can view all applications
     - Applicants can create new applications
     - Only employees can update application status

  2. **vendor_approval_history**
     - Employees can view approval history for applications they can access
     - Employees can insert approval records
     - Admins can view all approval history

  3. **notifications**
     - Users can view their own notifications
     - Users can update their own notifications (mark as read)
     - System can insert notifications for any user

  4. **employees**
     - Employees can view their own record
     - Admins can view all employees
     - System updates only
*/

-- RLS Policies for vendor_applications table

CREATE POLICY "Users can view their own vendor applications"
  ON vendor_applications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Field Officers can view pending and fo_review applications"
  ON vendor_applications FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM employees
      WHERE employees.user_id = auth.uid()
        AND employees.hierarchy_level = 1
        AND employees.can_approve_vendors = true
        AND employees.is_active = true
    )
    AND status IN ('pending', 'fo_review')
  );

CREATE POLICY "Managers can view manager_review applications"
  ON vendor_applications FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM employees
      WHERE employees.user_id = auth.uid()
        AND employees.hierarchy_level = 2
        AND employees.can_approve_vendors = true
        AND employees.is_active = true
    )
    AND status IN ('manager_review', 'fo_review', 'pending')
  );

CREATE POLICY "Directors can view director_review applications"
  ON vendor_applications FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM employees
      WHERE employees.user_id = auth.uid()
        AND employees.hierarchy_level = 3
        AND employees.can_approve_vendors = true
        AND employees.is_active = true
    )
    AND status IN ('director_review', 'manager_review', 'fo_review', 'pending')
  );

CREATE POLICY "Admins can view all applications"
  ON vendor_applications FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM employees
      WHERE employees.user_id = auth.uid()
        AND employees.hierarchy_level >= 4
        AND employees.is_active = true
    )
  );

CREATE POLICY "Authenticated users can create vendor applications"
  ON vendor_applications FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Field Officers can update applications at their level"
  ON vendor_applications FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM employees
      WHERE employees.user_id = auth.uid()
        AND employees.hierarchy_level = 1
        AND employees.can_approve_vendors = true
        AND employees.is_active = true
    )
    AND status IN ('pending', 'fo_review')
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM employees
      WHERE employees.user_id = auth.uid()
        AND employees.hierarchy_level = 1
        AND employees.can_approve_vendors = true
        AND employees.is_active = true
    )
  );

CREATE POLICY "Managers can update applications at their level"
  ON vendor_applications FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM employees
      WHERE employees.user_id = auth.uid()
        AND employees.hierarchy_level = 2
        AND employees.can_approve_vendors = true
        AND employees.is_active = true
    )
    AND status IN ('manager_review', 'fo_review')
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM employees
      WHERE employees.user_id = auth.uid()
        AND employees.hierarchy_level = 2
        AND employees.can_approve_vendors = true
        AND employees.is_active = true
    )
  );

CREATE POLICY "Directors can update applications at their level"
  ON vendor_applications FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM employees
      WHERE employees.user_id = auth.uid()
        AND employees.hierarchy_level = 3
        AND employees.can_approve_vendors = true
        AND employees.is_active = true
    )
    AND status IN ('director_review', 'manager_review')
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM employees
      WHERE employees.user_id = auth.uid()
        AND employees.hierarchy_level = 3
        AND employees.can_approve_vendors = true
        AND employees.is_active = true
    )
  );

CREATE POLICY "Admins can update any application"
  ON vendor_applications FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM employees
      WHERE employees.user_id = auth.uid()
        AND employees.hierarchy_level >= 4
        AND employees.is_active = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM employees
      WHERE employees.user_id = auth.uid()
        AND employees.hierarchy_level >= 4
        AND employees.is_active = true
    )
  );

-- RLS Policies for vendor_approval_history table

CREATE POLICY "Employees can view approval history"
  ON vendor_approval_history FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM employees
      WHERE employees.user_id = auth.uid()
        AND employees.is_active = true
    )
  );

CREATE POLICY "Employees can insert approval records"
  ON vendor_approval_history FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM employees
      WHERE employees.id = approved_by
        AND employees.user_id = auth.uid()
        AND employees.can_approve_vendors = true
        AND employees.is_active = true
    )
  );

-- RLS Policies for notifications table

CREATE POLICY "Users can view their own notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications"
  ON notifications FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "System can create notifications for any user"
  ON notifications FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- RLS Policies for employees table

CREATE POLICY "Employees can view their own record"
  ON employees FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all employees"
  ON employees FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM employees e
      WHERE e.user_id = auth.uid()
        AND e.hierarchy_level >= 4
        AND e.is_active = true
    )
  );

-- RLS Policies for vendors table

CREATE POLICY "Vendors can view their own record"
  ON vendors FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all vendors"
  ON vendors FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM employees
      WHERE employees.user_id = auth.uid()
        AND employees.hierarchy_level >= 4
        AND employees.is_active = true
    )
  );

CREATE POLICY "Admins can create vendor records"
  ON vendors FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM employees
      WHERE employees.user_id = auth.uid()
        AND employees.hierarchy_level >= 4
        AND employees.is_active = true
    )
  );

CREATE POLICY "Vendors can update their own record"
  ON vendors FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for user_profiles table

CREATE POLICY "Users can view their own profile"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Authenticated users can create their own profile"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Employees can view other user profiles"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM employees
      WHERE employees.user_id = auth.uid()
        AND employees.is_active = true
    )
  );
