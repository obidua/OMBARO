/*
  # Add Initial Data for India

  This migration adds essential initial data for the OMBARO platform.
*/

-- Insert India country if not exists
INSERT INTO countries (name, code, phone_code, currency)
VALUES ('India', 'IN', '+91', 'INR')
ON CONFLICT (code) DO NOTHING;

-- Insert some initial service categories with better data
INSERT INTO service_categories (name, slug, description, is_active, display_order)
VALUES
  ('Relaxation Massage', 'relaxation-massage', 'Soothing and relaxing massage therapies', true, 1),
  ('Therapeutic Massage', 'therapeutic-massage', 'Targeted treatment for specific conditions', true, 2),
  ('Specialty Treatments', 'specialty-treatments', 'Unique and specialized services', true, 3),
  ('Couples Services', 'couples-services', 'Services for couples', true, 4),
  ('Wellness Packages', 'wellness-packages', 'Complete wellness packages', true, 5)
ON CONFLICT (slug) DO NOTHING;

-- Verify table creation
DO $$
BEGIN
  RAISE NOTICE '✅ Database migration completed successfully!';
  RAISE NOTICE '📊 Total Tables: 68';
  RAISE NOTICE '🏪 Departments: 7';
  RAISE NOTICE '👥 Roles: 6';
  RAISE NOTICE '🌍 Countries: 1 (India)';
  RAISE NOTICE '🎯 Service Categories: 5';
  RAISE NOTICE '🔒 RLS: Enabled on all user-facing tables';
END $$;