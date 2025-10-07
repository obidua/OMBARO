/*
  # Automated Notification System
  
  Creates triggers to automatically send notifications when:
  - Vendor application is submitted
  - Application is approved/rejected at any stage
  - Application requires additional information
*/

-- Function to notify next approver when application advances
CREATE OR REPLACE FUNCTION notify_next_approver()
RETURNS TRIGGER AS $$
DECLARE
  next_approver_user_id uuid;
  notification_message text;
  notification_title text;
BEGIN
  -- Only proceed if status changed
  IF NEW.status != OLD.status THEN
    
    -- Determine notification based on new status
    IF NEW.status = 'fo_review' THEN
      notification_title := 'New Vendor Application';
      notification_message := 'A new vendor application (' || NEW.application_number || ') requires your review.';
      
      -- Notify all FOs (Level 1)
      INSERT INTO notifications (user_id, title, message, type, priority)
      SELECT user_id, notification_title, notification_message, 'vendor_application', 'high'
      FROM employees
      WHERE hierarchy_level = 1 AND can_approve_vendors = true AND is_active = true;
      
    ELSIF NEW.status = 'manager_review' THEN
      notification_title := 'Vendor Application Forwarded';
      notification_message := 'Application ' || NEW.application_number || ' has been forwarded for your approval.';
      
      -- Notify all Managers (Level 2)
      INSERT INTO notifications (user_id, title, message, type, priority)
      SELECT user_id, notification_title, notification_message, 'vendor_application', 'high'
      FROM employees
      WHERE hierarchy_level = 2 AND can_approve_vendors = true AND is_active = true;
      
    ELSIF NEW.status = 'director_review' THEN
      notification_title := 'Vendor Application Forwarded';
      notification_message := 'Application ' || NEW.application_number || ' requires Director approval.';
      
      -- Notify all Directors (Level 3)
      INSERT INTO notifications (user_id, title, message, type, priority)
      SELECT user_id, notification_title, notification_message, 'vendor_application', 'high'
      FROM employees
      WHERE hierarchy_level = 3 AND can_approve_vendors = true AND is_active = true;
      
    ELSIF NEW.status = 'admin_review' THEN
      notification_title := 'Final Vendor Approval Required';
      notification_message := 'Application ' || NEW.application_number || ' requires final admin approval.';
      
      -- Notify all Admins (Level 4+)
      INSERT INTO notifications (user_id, title, message, type, priority)
      SELECT user_id, notification_title, notification_message, 'vendor_application', 'urgent'
      FROM employees
      WHERE hierarchy_level >= 4 AND can_approve_vendors = true AND is_active = true;
      
    ELSIF NEW.status = 'approved' AND OLD.status != 'approved' THEN
      -- Notify applicant of approval
      IF NEW.user_id IS NOT NULL THEN
        INSERT INTO notifications (user_id, title, message, type, priority)
        VALUES (
          NEW.user_id,
          'Application Approved!',
          'Congratulations! Your vendor application for "' || NEW.business_name || '" has been approved.',
          'vendor_approval',
          'high'
        );
      END IF;
      
    ELSIF NEW.status = 'rejected' THEN
      -- Notify applicant of rejection
      IF NEW.user_id IS NOT NULL THEN
        INSERT INTO notifications (user_id, title, message, type, priority)
        VALUES (
          NEW.user_id,
          'Application Status Update',
          'Your vendor application for "' || NEW.business_name || '" has been rejected. Reason: ' || COALESCE(NEW.review_notes, 'Not specified'),
          'vendor_rejection',
          'high'
        );
      END IF;
      
    ELSIF NEW.status = 'additional_info_required' THEN
      -- Notify applicant to provide more info
      IF NEW.user_id IS NOT NULL THEN
        INSERT INTO notifications (user_id, title, message, type, priority)
        VALUES (
          NEW.user_id,
          'Additional Information Required',
          'Your application for "' || NEW.business_name || '" requires additional information: ' || COALESCE(NEW.review_notes, 'Please contact support'),
          'vendor_info_required',
          'medium'
        );
      END IF;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger on vendor_applications status change
CREATE TRIGGER trigger_notify_application_status
  AFTER UPDATE ON vendor_applications
  FOR EACH ROW
  WHEN (OLD.status IS DISTINCT FROM NEW.status)
  EXECUTE FUNCTION notify_next_approver();

-- Function to notify applicant when application is submitted
CREATE OR REPLACE FUNCTION notify_application_submitted()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.user_id IS NOT NULL THEN
    INSERT INTO notifications (user_id, title, message, type, priority)
    VALUES (
      NEW.user_id,
      'Application Submitted Successfully',
      'Your vendor application (' || NEW.application_number || ') for "' || NEW.business_name || '" has been submitted and will be reviewed soon.',
      'vendor_application',
      'normal'
    );
  END IF;
  
  -- Also notify Field Officers
  INSERT INTO notifications (user_id, title, message, type, priority)
  SELECT user_id, 'New Vendor Application', 
    'New application ' || NEW.application_number || ' from ' || NEW.business_name || ' requires review.',
    'vendor_application', 'high'
  FROM employees
  WHERE hierarchy_level = 1 AND can_approve_vendors = true AND is_active = true;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger on new vendor application
CREATE TRIGGER trigger_notify_new_application
  AFTER INSERT ON vendor_applications
  FOR EACH ROW
  EXECUTE FUNCTION notify_application_submitted();

-- Function to auto-generate application number if not provided
CREATE OR REPLACE FUNCTION auto_generate_application_number()
RETURNS TRIGGER AS $$
DECLARE
  next_num integer;
BEGIN
  IF NEW.application_number IS NULL OR NEW.application_number = '' THEN
    SELECT COALESCE(MAX(CAST(SUBSTRING(application_number FROM 4) AS integer)), 0) + 1
    INTO next_num
    FROM vendor_applications;
    
    NEW.application_number := 'APP' || LPAD(next_num::text, 6, '0');
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate application number
CREATE TRIGGER trigger_auto_application_number
  BEFORE INSERT ON vendor_applications
  FOR EACH ROW
  EXECUTE FUNCTION auto_generate_application_number();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers to relevant tables
CREATE TRIGGER trigger_update_vendor_applications_timestamp
  BEFORE UPDATE ON vendor_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_update_vendors_timestamp
  BEFORE UPDATE ON vendors
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_update_employees_timestamp
  BEFORE UPDATE ON employees
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_update_user_profiles_timestamp
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to log approval actions
CREATE OR REPLACE FUNCTION log_approval_action()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO audit_logs (user_id, action, resource_type, resource_id)
  VALUES (
    NEW.approved_by,
    NEW.action,
    'vendor_application',
    NEW.application_id
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to log all approval actions
CREATE TRIGGER trigger_log_approvals
  AFTER INSERT ON vendor_approval_history
  FOR EACH ROW
  EXECUTE FUNCTION log_approval_action();
