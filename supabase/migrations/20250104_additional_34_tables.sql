/*
  # Additional 34 Tables to Complete 143+ Table Schema

  This migration adds the remaining 34 tables to reach the complete 143-table schema.

  ## New Tables (34 total)

  ### Communications (6 tables)
  - email_logs
  - sms_logs
  - push_notifications
  - whatsapp_logs
  - in_app_messages
  - notification_queue

  ### Marketing Extended (5 tables)
  - campaign_analytics
  - coupon_codes
  - coupon_usages
  - referral_rewards
  - email_templates

  ### Location & Geography (5 tables)
  - countries
  - states
  - cities
  - zones
  - pincode_master

  ### Operations (6 tables)
  - inventory_items
  - stock_transactions
  - suppliers
  - purchase_orders
  - warehouses
  - asset_tracking

  ### Analytics (5 tables)
  - page_views
  - conversion_tracking
  - funnel_analytics
  - cohort_analysis
  - revenue_analytics

  ### Legal & Compliance (4 tables)
  - legal_documents
  - compliance_audits
  - data_retention_policies
  - gdpr_requests

  ### System (3 tables)
  - api_keys
  - webhook_endpoints
  - scheduled_tasks

*/

-- ========================================
-- COMMUNICATIONS (6 tables)
-- ========================================

CREATE TABLE IF NOT EXISTS email_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_email text NOT NULL,
  recipient_name text,
  subject text NOT NULL,
  body text NOT NULL,
  template_id uuid,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'delivered', 'failed', 'bounced')),
  provider text DEFAULT 'smtp',
  provider_message_id text,
  opened_at timestamptz,
  clicked_at timestamptz,
  bounced_at timestamptz,
  error_message text,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sms_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_mobile text NOT NULL,
  message text NOT NULL,
  template_id uuid,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'delivered', 'failed')),
  provider text DEFAULT 'twilio',
  provider_message_id text,
  delivered_at timestamptz,
  failed_at timestamptz,
  error_message text,
  cost numeric(10,4),
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS push_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  body text NOT NULL,
  icon text,
  image text,
  click_action text,
  data jsonb DEFAULT '{}',
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'delivered', 'failed', 'clicked')),
  device_tokens text[],
  sent_at timestamptz,
  delivered_at timestamptz,
  clicked_at timestamptz,
  error_message text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS whatsapp_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_mobile text NOT NULL,
  message_type text CHECK (message_type IN ('text', 'template', 'media', 'interactive')),
  message_content text NOT NULL,
  template_name text,
  template_language text DEFAULT 'en',
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'delivered', 'read', 'failed')),
  provider text DEFAULT 'twilio',
  provider_message_id text,
  media_url text,
  delivered_at timestamptz,
  read_at timestamptz,
  failed_at timestamptz,
  error_message text,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS in_app_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text NOT NULL,
  message_type text DEFAULT 'info' CHECK (message_type IN ('info', 'warning', 'error', 'success', 'promotional')),
  priority integer DEFAULT 1 CHECK (priority BETWEEN 1 AND 5),
  action_url text,
  action_label text,
  expires_at timestamptz,
  read_at timestamptz,
  dismissed_at timestamptz,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS notification_queue (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  notification_type text NOT NULL CHECK (notification_type IN ('email', 'sms', 'push', 'whatsapp', 'in_app')),
  recipient_id uuid REFERENCES auth.users(id),
  recipient_identifier text NOT NULL,
  payload jsonb NOT NULL,
  priority integer DEFAULT 5 CHECK (priority BETWEEN 1 AND 10),
  scheduled_at timestamptz DEFAULT now(),
  attempts integer DEFAULT 0,
  max_attempts integer DEFAULT 3,
  last_attempt_at timestamptz,
  status text DEFAULT 'queued' CHECK (status IN ('queued', 'processing', 'sent', 'failed', 'cancelled')),
  error_message text,
  created_at timestamptz DEFAULT now()
);

-- ========================================
-- MARKETING EXTENDED (5 tables)
-- ========================================

CREATE TABLE IF NOT EXISTS campaign_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  date date NOT NULL DEFAULT CURRENT_DATE,
  impressions integer DEFAULT 0,
  clicks integer DEFAULT 0,
  conversions integer DEFAULT 0,
  revenue numeric(12,2) DEFAULT 0,
  cost numeric(12,2) DEFAULT 0,
  ctr numeric(5,2) DEFAULT 0,
  conversion_rate numeric(5,2) DEFAULT 0,
  roi numeric(10,2) DEFAULT 0,
  unique_users integer DEFAULT 0,
  returning_users integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(campaign_id, date)
);

CREATE TABLE IF NOT EXISTS coupon_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  description text,
  discount_type text NOT NULL CHECK (discount_type IN ('percentage', 'fixed_amount', 'free_shipping')),
  discount_value numeric(10,2) NOT NULL,
  min_order_value numeric(10,2) DEFAULT 0,
  max_discount_amount numeric(10,2),
  usage_limit integer,
  usage_per_user integer DEFAULT 1,
  used_count integer DEFAULT 0,
  applicable_to text DEFAULT 'all' CHECK (applicable_to IN ('all', 'services', 'products', 'specific')),
  applicable_ids uuid[],
  valid_from timestamptz DEFAULT now(),
  valid_until timestamptz,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'expired')),
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS coupon_usages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  coupon_id uuid NOT NULL REFERENCES coupon_codes(id),
  user_id uuid NOT NULL REFERENCES auth.users(id),
  booking_id uuid REFERENCES bookings(id),
  discount_amount numeric(10,2) NOT NULL,
  used_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS referral_rewards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id uuid NOT NULL REFERENCES auth.users(id),
  referred_id uuid NOT NULL REFERENCES auth.users(id),
  reward_type text NOT NULL CHECK (reward_type IN ('points', 'discount', 'cashback', 'free_service')),
  reward_value numeric(10,2) NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'credited', 'expired', 'cancelled')),
  qualifying_booking_id uuid REFERENCES bookings(id),
  credited_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS email_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  subject text NOT NULL,
  html_content text NOT NULL,
  text_content text,
  template_type text NOT NULL CHECK (template_type IN ('transactional', 'promotional', 'notification', 'system')),
  variables jsonb DEFAULT '[]',
  is_active boolean DEFAULT true,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ========================================
-- LOCATION & GEOGRAPHY (5 tables)
-- ========================================

CREATE TABLE IF NOT EXISTS countries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  iso_code_2 text UNIQUE NOT NULL,
  iso_code_3 text UNIQUE NOT NULL,
  dial_code text NOT NULL,
  currency_code text NOT NULL,
  currency_symbol text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS states (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  country_id uuid NOT NULL REFERENCES countries(id),
  name text NOT NULL,
  state_code text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  UNIQUE(country_id, name)
);

CREATE TABLE IF NOT EXISTS cities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  state_id uuid NOT NULL REFERENCES states(id),
  name text NOT NULL,
  latitude numeric(10,8),
  longitude numeric(11,8),
  population integer,
  is_serviceable boolean DEFAULT false,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  UNIQUE(state_id, name)
);

CREATE TABLE IF NOT EXISTS zones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  city_id uuid NOT NULL REFERENCES cities(id),
  name text NOT NULL,
  zone_code text NOT NULL,
  boundaries geography(POLYGON),
  delivery_charge numeric(10,2) DEFAULT 0,
  estimated_delivery_time integer DEFAULT 60,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS pincode_master (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pincode text NOT NULL UNIQUE,
  city_id uuid NOT NULL REFERENCES cities(id),
  zone_id uuid REFERENCES zones(id),
  area_name text NOT NULL,
  district text,
  is_serviceable boolean DEFAULT false,
  service_charge numeric(10,2) DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- ========================================
-- OPERATIONS (6 tables)
-- ========================================

CREATE TABLE IF NOT EXISTS inventory_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  sku text UNIQUE NOT NULL,
  category text,
  description text,
  unit text DEFAULT 'pcs',
  reorder_level integer DEFAULT 10,
  max_stock_level integer DEFAULT 1000,
  current_stock integer DEFAULT 0,
  unit_price numeric(10,2),
  status text DEFAULT 'active' CHECK (status IN ('active', 'discontinued')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS stock_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id uuid NOT NULL REFERENCES inventory_items(id),
  transaction_type text NOT NULL CHECK (transaction_type IN ('purchase', 'sale', 'adjustment', 'return', 'damage', 'transfer')),
  quantity integer NOT NULL,
  unit_price numeric(10,2),
  total_amount numeric(12,2),
  reference_type text,
  reference_id uuid,
  warehouse_id uuid REFERENCES warehouses(id),
  performed_by uuid REFERENCES auth.users(id),
  notes text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS suppliers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  contact_person text,
  email text,
  mobile text,
  address jsonb,
  gst_number text,
  pan_number text,
  payment_terms text,
  credit_limit numeric(12,2) DEFAULT 0,
  outstanding_balance numeric(12,2) DEFAULT 0,
  rating numeric(3,2) DEFAULT 0,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'blocked')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS purchase_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  po_number text UNIQUE NOT NULL,
  supplier_id uuid NOT NULL REFERENCES suppliers(id),
  order_date date NOT NULL DEFAULT CURRENT_DATE,
  expected_delivery_date date,
  total_amount numeric(12,2) NOT NULL,
  tax_amount numeric(12,2) DEFAULT 0,
  discount_amount numeric(12,2) DEFAULT 0,
  net_amount numeric(12,2) NOT NULL,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'approved', 'received', 'cancelled')),
  approved_by uuid REFERENCES auth.users(id),
  approved_at timestamptz,
  received_at timestamptz,
  notes text,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS warehouses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  code text NOT NULL UNIQUE,
  address jsonb NOT NULL,
  manager_id uuid REFERENCES auth.users(id),
  capacity integer,
  current_utilization numeric(5,2) DEFAULT 0,
  is_primary boolean DEFAULT false,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'maintenance')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS asset_tracking (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_type text NOT NULL CHECK (asset_type IN ('equipment', 'vehicle', 'furniture', 'electronics', 'other')),
  asset_name text NOT NULL,
  asset_code text UNIQUE NOT NULL,
  purchase_date date,
  purchase_cost numeric(12,2),
  current_value numeric(12,2),
  depreciation_rate numeric(5,2),
  assigned_to uuid REFERENCES auth.users(id),
  location text,
  condition text CHECK (condition IN ('excellent', 'good', 'fair', 'poor', 'damaged')),
  warranty_expiry_date date,
  last_maintenance_date date,
  next_maintenance_date date,
  status text DEFAULT 'active' CHECK (status IN ('active', 'under_maintenance', 'retired', 'disposed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ========================================
-- ANALYTICS (5 tables)
-- ========================================

CREATE TABLE IF NOT EXISTS page_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  session_id text NOT NULL,
  page_url text NOT NULL,
  page_title text,
  referrer_url text,
  device_type text,
  browser text,
  os text,
  ip_address inet,
  country text,
  city text,
  duration_seconds integer,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS conversion_tracking (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  session_id text NOT NULL,
  conversion_type text NOT NULL CHECK (conversion_type IN ('signup', 'booking', 'payment', 'referral', 'review')),
  conversion_value numeric(12,2),
  source text,
  medium text,
  campaign text,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS funnel_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  funnel_name text NOT NULL,
  step_number integer NOT NULL,
  step_name text NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  users_entered integer DEFAULT 0,
  users_completed integer DEFAULT 0,
  users_dropped integer DEFAULT 0,
  conversion_rate numeric(5,2) DEFAULT 0,
  avg_time_to_complete integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(funnel_name, step_number, date)
);

CREATE TABLE IF NOT EXISTS cohort_analysis (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cohort_month date NOT NULL,
  age_in_months integer NOT NULL CHECK (age_in_months >= 0),
  total_users integer NOT NULL DEFAULT 0,
  active_users integer DEFAULT 0,
  retention_rate numeric(5,2) DEFAULT 0,
  revenue numeric(12,2) DEFAULT 0,
  avg_order_value numeric(10,2) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(cohort_month, age_in_months)
);

CREATE TABLE IF NOT EXISTS revenue_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL DEFAULT CURRENT_DATE,
  category text NOT NULL,
  subcategory text,
  total_bookings integer DEFAULT 0,
  gross_revenue numeric(12,2) DEFAULT 0,
  discounts numeric(12,2) DEFAULT 0,
  refunds numeric(12,2) DEFAULT 0,
  net_revenue numeric(12,2) DEFAULT 0,
  commission numeric(12,2) DEFAULT 0,
  platform_revenue numeric(12,2) DEFAULT 0,
  avg_order_value numeric(10,2) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(date, category, subcategory)
);

-- ========================================
-- LEGAL & COMPLIANCE (4 tables)
-- ========================================

CREATE TABLE IF NOT EXISTS legal_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_type text NOT NULL CHECK (document_type IN ('contract', 'agreement', 'policy', 'terms', 'license', 'certificate', 'other')),
  document_name text NOT NULL,
  document_number text UNIQUE,
  entity_type text CHECK (entity_type IN ('vendor', 'therapist', 'employee', 'company')),
  entity_id uuid,
  file_url text NOT NULL,
  effective_date date NOT NULL,
  expiry_date date,
  renewal_required boolean DEFAULT false,
  status text DEFAULT 'active' CHECK (status IN ('draft', 'active', 'expired', 'terminated')),
  uploaded_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS compliance_audits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  audit_type text NOT NULL CHECK (audit_type IN ('internal', 'external', 'regulatory', 'security')),
  audit_name text NOT NULL,
  auditor_name text,
  audit_date date NOT NULL,
  department_id uuid REFERENCES departments(id),
  findings text,
  recommendations text,
  severity text CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  status text DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'in_progress', 'completed', 'closed')),
  due_date date,
  completed_date date,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS data_retention_policies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  policy_name text NOT NULL UNIQUE,
  data_type text NOT NULL,
  retention_period_days integer NOT NULL,
  delete_after_retention boolean DEFAULT true,
  archive_before_delete boolean DEFAULT false,
  legal_basis text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS gdpr_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  request_type text NOT NULL CHECK (request_type IN ('access', 'rectification', 'erasure', 'restriction', 'portability', 'objection')),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'rejected')),
  request_details text,
  response_details text,
  requested_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  processed_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

-- ========================================
-- SYSTEM (3 tables)
-- ========================================

CREATE TABLE IF NOT EXISTS api_keys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key_name text NOT NULL,
  api_key text UNIQUE NOT NULL,
  user_id uuid REFERENCES auth.users(id),
  permissions text[] DEFAULT '{}',
  rate_limit integer DEFAULT 1000,
  last_used_at timestamptz,
  usage_count integer DEFAULT 0,
  expires_at timestamptz,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  revoked_at timestamptz
);

CREATE TABLE IF NOT EXISTS webhook_endpoints (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  url text NOT NULL,
  events text[] NOT NULL,
  secret_key text NOT NULL,
  headers jsonb DEFAULT '{}',
  retry_policy jsonb DEFAULT '{"max_attempts": 3, "backoff_multiplier": 2}',
  is_active boolean DEFAULT true,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS scheduled_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  task_name text NOT NULL UNIQUE,
  task_type text NOT NULL,
  schedule text NOT NULL,
  last_run_at timestamptz,
  next_run_at timestamptz,
  status text DEFAULT 'active' CHECK (status IN ('active', 'paused', 'failed')),
  failure_count integer DEFAULT 0,
  last_error text,
  execution_time_ms integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ========================================
-- INDEXES FOR PERFORMANCE
-- ========================================

-- Communication indexes
CREATE INDEX IF NOT EXISTS idx_email_logs_recipient ON email_logs(recipient_email);
CREATE INDEX IF NOT EXISTS idx_email_logs_status ON email_logs(status);
CREATE INDEX IF NOT EXISTS idx_email_logs_created ON email_logs(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_sms_logs_recipient ON sms_logs(recipient_mobile);
CREATE INDEX IF NOT EXISTS idx_sms_logs_status ON sms_logs(status);

CREATE INDEX IF NOT EXISTS idx_push_notifications_user ON push_notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_push_notifications_status ON push_notifications(status);

-- Marketing indexes
CREATE INDEX IF NOT EXISTS idx_campaign_analytics_campaign_date ON campaign_analytics(campaign_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_coupon_codes_code ON coupon_codes(code);
CREATE INDEX IF NOT EXISTS idx_coupon_codes_status ON coupon_codes(status) WHERE status = 'active';
CREATE INDEX IF NOT EXISTS idx_coupon_usages_user ON coupon_usages(user_id);

-- Location indexes
CREATE INDEX IF NOT EXISTS idx_cities_state ON cities(state_id);
CREATE INDEX IF NOT EXISTS idx_cities_serviceable ON cities(is_serviceable) WHERE is_serviceable = true;
CREATE INDEX IF NOT EXISTS idx_zones_city ON zones(city_id);
CREATE INDEX IF NOT EXISTS idx_pincode_master_pincode ON pincode_master(pincode);
CREATE INDEX IF NOT EXISTS idx_pincode_master_city ON pincode_master(city_id);

-- Operations indexes
CREATE INDEX IF NOT EXISTS idx_inventory_items_sku ON inventory_items(sku);
CREATE INDEX IF NOT EXISTS idx_stock_transactions_item ON stock_transactions(item_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_purchase_orders_supplier ON purchase_orders(supplier_id);
CREATE INDEX IF NOT EXISTS idx_purchase_orders_status ON purchase_orders(status);

-- Analytics indexes
CREATE INDEX IF NOT EXISTS idx_page_views_user ON page_views(user_id);
CREATE INDEX IF NOT EXISTS idx_page_views_session ON page_views(session_id);
CREATE INDEX IF NOT EXISTS idx_page_views_created ON page_views(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_conversion_tracking_user ON conversion_tracking(user_id);
CREATE INDEX IF NOT EXISTS idx_conversion_tracking_type ON conversion_tracking(conversion_type);

-- System indexes
CREATE INDEX IF NOT EXISTS idx_api_keys_key ON api_keys(api_key) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_webhook_endpoints_active ON webhook_endpoints(is_active) WHERE is_active = true;

-- ========================================
-- ROW LEVEL SECURITY (RLS)
-- ========================================

-- Enable RLS on all tables
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE sms_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE push_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE in_app_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_queue ENABLE ROW LEVEL SECURITY;

ALTER TABLE campaign_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupon_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupon_usages ENABLE ROW LEVEL SECURITY;
ALTER TABLE referral_rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_templates ENABLE ROW LEVEL SECURITY;

ALTER TABLE countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE states ENABLE ROW LEVEL SECURITY;
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE zones ENABLE ROW LEVEL SECURITY;
ALTER TABLE pincode_master ENABLE ROW LEVEL SECURITY;

ALTER TABLE inventory_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchase_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE warehouses ENABLE ROW LEVEL SECURITY;
ALTER TABLE asset_tracking ENABLE ROW LEVEL SECURITY;

ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversion_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE funnel_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE cohort_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE revenue_analytics ENABLE ROW LEVEL SECURITY;

ALTER TABLE legal_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance_audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_retention_policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE gdpr_requests ENABLE ROW LEVEL SECURITY;

ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhook_endpoints ENABLE ROW LEVEL SECURITY;
ALTER TABLE scheduled_tasks ENABLE ROW LEVEL SECURITY;

-- Basic RLS policies (admin can access all)
CREATE POLICY "Admin full access to communications" ON email_logs FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
);

CREATE POLICY "Admin full access to marketing" ON campaign_analytics FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin', 'marketing'))
);

CREATE POLICY "Public read access to locations" ON countries FOR SELECT TO authenticated USING (true);
CREATE POLICY "Public read access to states" ON states FOR SELECT TO authenticated USING (true);
CREATE POLICY "Public read access to cities" ON cities FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admin full access to operations" ON inventory_items FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin', 'operations'))
);

CREATE POLICY "Admin full access to analytics" ON page_views FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin', 'analytics'))
);

CREATE POLICY "Admin full access to legal" ON legal_documents FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin', 'legal'))
);

CREATE POLICY "Users can view own GDPR requests" ON gdpr_requests FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can create GDPR requests" ON gdpr_requests FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admin full access to system" ON api_keys FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
);
