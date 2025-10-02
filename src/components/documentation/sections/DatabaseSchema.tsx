import React, { useState, useEffect } from 'react';
import { Database, Table, Key, Shield, Users, Calendar, FileText, DollarSign, Building, UserCog, Settings, TrendingUp, Package, BarChart3, Bell, HelpCircle, AlertTriangle, Search, ChevronDown, ChevronRight } from 'lucide-react';
import { tableColumns, type ColumnInfo } from './tableColumns';

interface TableInfo {
  name: string;
  category: string;
  description: string;
  rowCount?: number;
  icon: any;
  color: string;
}

export const DatabaseSchema: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedTable, setExpandedTable] = useState<string | null>(null);

  // Complete table structure from migrations
  const tables: TableInfo[] = [
    // Core Authentication & Users
    { name: 'user_profiles', category: 'auth', description: 'Extended user information with roles, departments, and employee details', icon: Users, color: 'blue' },
    { name: 'user_roles', category: 'auth', description: 'Many-to-many relationship between users and roles', icon: UserCog, color: 'blue' },
    { name: 'user_sessions', category: 'auth', description: 'Active user sessions with device and location tracking', icon: Key, color: 'blue' },
    { name: 'user_preferences', category: 'auth', description: 'User preferences for theme, language, notifications', icon: Settings, color: 'blue' },
    { name: 'user_activity_log', category: 'auth', description: 'Complete audit trail of user activities', icon: FileText, color: 'blue' },
    { name: 'user_documents', category: 'auth', description: 'User uploaded documents (Aadhaar, PAN, etc.)', icon: FileText, color: 'blue' },
    { name: 'user_kyc_verification', category: 'auth', description: 'KYC verification status and details', icon: Shield, color: 'blue' },
    { name: 'user_bank_details', category: 'auth', description: 'Encrypted bank account information', icon: DollarSign, color: 'blue' },
    { name: 'emergency_contacts', category: 'auth', description: 'Emergency contact information for users', icon: Users, color: 'blue' },

    // Departments & Roles (7 tables) - ACTUAL TABLES ONLY
    { name: 'departments', category: 'organization', description: 'All 18 departments with hierarchy and budget allocation', icon: Building, color: 'purple' },
    { name: 'department_hierarchy', category: 'organization', description: 'Complex organizational structure relationships', icon: Building, color: 'purple' },
    { name: 'roles', category: 'organization', description: 'Role definitions with permissions and categories', icon: UserCog, color: 'purple' },
    { name: 'permissions', category: 'organization', description: 'System permissions and access control', icon: Shield, color: 'purple' },
    { name: 'permission_modules', category: 'organization', description: 'Granular permission modules and actions', icon: Shield, color: 'purple' },
    { name: 'role_permissions', category: 'organization', description: 'Role to permission mapping', icon: Shield, color: 'purple' },
    { name: 'role_assignment_history', category: 'organization', description: 'Audit trail of role assignments', icon: FileText, color: 'purple' },
    { name: 'delegation_history', category: 'organization', description: 'Temporary role delegation tracking', icon: Users, color: 'purple' },

    // Employees & HR
    { name: 'employees', category: 'hr', description: 'Employee records extending user profiles', icon: Users, color: 'green' },
    { name: 'employee_onboarding', category: 'hr', description: 'New hire onboarding workflow and checklist', icon: Users, color: 'green' },
    { name: 'attendance_records', category: 'hr', description: 'Daily attendance with check-in/out and location', icon: Calendar, color: 'green' },
    { name: 'attendance_policies', category: 'hr', description: 'Attendance rules and working hours', icon: Calendar, color: 'green' },
    { name: 'leave_requests', category: 'hr', description: 'Leave applications and approval workflow', icon: Calendar, color: 'green' },
    { name: 'leave_balances', category: 'hr', description: 'Available leave balances per employee', icon: Calendar, color: 'green' },
    { name: 'leave_types', category: 'hr', description: 'Types of leaves (casual, sick, earned, etc.)', icon: Calendar, color: 'green' },
    { name: 'holidays', category: 'hr', description: 'Public holidays calendar', icon: Calendar, color: 'green' },
    { name: 'work_shifts', category: 'hr', description: 'Shift schedules and timing', icon: Calendar, color: 'green' },
    { name: 'overtime_records', category: 'hr', description: 'Overtime tracking and approval', icon: Calendar, color: 'green' },
    { name: 'salary_structures', category: 'hr', description: 'Salary components setup', icon: DollarSign, color: 'green' },
    { name: 'salary_records', category: 'hr', description: 'Monthly salary processing records', icon: DollarSign, color: 'green' },
    { name: 'salary_components', category: 'hr', description: 'Salary breakdown (earnings, deductions)', icon: DollarSign, color: 'green' },
    { name: 'performance_reviews', category: 'hr', description: 'Employee performance evaluations', icon: TrendingUp, color: 'green' },
    { name: 'training_records', category: 'hr', description: 'Employee training and certification history', icon: FileText, color: 'green' },

    // Vendors (13 tables) - ACTUAL TABLES ONLY
    { name: 'vendors', category: 'vendors', description: 'Spa/salon vendor profiles and business details', icon: Building, color: 'orange' },
    { name: 'vendor_applications', category: 'vendors', description: 'Vendor self-signup applications', icon: FileText, color: 'orange' },
    { name: 'vendor_application_history', category: 'vendors', description: 'Application status change history', icon: FileText, color: 'orange' },
    { name: 'vendor_staff', category: 'vendors', description: 'Staff members of vendor businesses', icon: Users, color: 'orange' },
    { name: 'vendor_documents', category: 'vendors', description: 'Vendor legal documents and licenses', icon: FileText, color: 'orange' },
    { name: 'vendor_services', category: 'vendors', description: 'Services offered by each vendor', icon: Package, color: 'orange' },
    { name: 'vendor_availability', category: 'vendors', description: 'Vendor service area coverage and hours', icon: Building, color: 'orange' },
    { name: 'vendor_payouts', category: 'vendors', description: 'Vendor payment history and settlements', icon: DollarSign, color: 'orange' },
    { name: 'vendor_bank_accounts', category: 'vendors', description: 'Vendor bank account details', icon: DollarSign, color: 'orange' },
    { name: 'vendor_ratings', category: 'vendors', description: 'Vendor rating and review summaries', icon: TrendingUp, color: 'orange' },
    { name: 'vendor_reviews', category: 'vendors', description: 'Customer reviews for vendors', icon: FileText, color: 'orange' },
    { name: 'vendor_contracts', category: 'vendors', description: 'Vendor legal contracts', icon: FileText, color: 'orange' },
    { name: 'vendor_compliance', category: 'vendors', description: 'Vendor compliance and certification tracking', icon: Shield, color: 'orange' },

    // Therapists
    { name: 'therapists', category: 'therapists', description: 'Therapist profiles with certifications and ratings', icon: Users, color: 'teal' },
    { name: 'therapist_schedules', category: 'therapists', description: 'Weekly availability schedules', icon: Calendar, color: 'teal' },
    { name: 'therapist_leaves', category: 'therapists', description: 'Therapist leave management', icon: Calendar, color: 'teal' },
    { name: 'therapist_locations', category: 'therapists', description: 'Real-time GPS location tracking', icon: Building, color: 'teal' },
    { name: 'therapist_assignments', category: 'therapists', description: 'Service assignments to therapists', icon: Users, color: 'teal' },
    { name: 'therapist_certifications', category: 'therapists', description: 'Therapist qualifications and certificates', icon: FileText, color: 'teal' },
    { name: 'therapist_performance', category: 'therapists', description: 'Monthly performance metrics and KPIs', icon: TrendingUp, color: 'teal' },
    { name: 'assignment_timeline', category: 'therapists', description: 'Assignment status change history', icon: Calendar, color: 'teal' },

    // Services (13 tables) - ACTUAL TABLES ONLY
    { name: 'services', category: 'services', description: '25+ massage and spa services catalog', icon: Package, color: 'pink' },
    { name: 'service_categories', category: 'services', description: 'Service categorization and hierarchy', icon: Package, color: 'pink' },
    { name: 'service_packages', category: 'services', description: 'Bundled service packages with discounts', icon: Package, color: 'pink' },
    { name: 'service_variants', category: 'services', description: 'Service duration and price variations', icon: Package, color: 'pink' },
    { name: 'service_pricing_tiers', category: 'services', description: 'Tiered pricing for services', icon: DollarSign, color: 'pink' },
    { name: 'addon_services', category: 'services', description: 'Add-on services and enhancements', icon: Package, color: 'pink' },
    { name: 'service_reviews', category: 'services', description: 'Customer service reviews and ratings', icon: FileText, color: 'pink' },
    { name: 'service_availability', category: 'services', description: 'Service geographic availability', icon: Building, color: 'pink' },
    { name: 'service_tags', category: 'services', description: 'Service tags for categorization', icon: Package, color: 'pink' },
    { name: 'service_tag_mapping', category: 'services', description: 'Service to tag mapping table', icon: Package, color: 'pink' },
    { name: 'popular_services', category: 'services', description: 'Trending and popular services', icon: TrendingUp, color: 'pink' },
    { name: 'reviews', category: 'services', description: 'General reviews and ratings', icon: FileText, color: 'pink' },
    { name: 'service_execution_log', category: 'services', description: 'Service delivery and completion logs', icon: Calendar, color: 'pink' },

    // Bookings
    { name: 'bookings', category: 'bookings', description: 'Customer service bookings', icon: Calendar, color: 'indigo' },
    { name: 'booking_items', category: 'bookings', description: 'Services included in each booking', icon: Package, color: 'indigo' },
    { name: 'booking_status_history', category: 'bookings', description: 'Booking status change tracking', icon: FileText, color: 'indigo' },
    { name: 'booking_notes', category: 'bookings', description: 'Internal and customer notes', icon: FileText, color: 'indigo' },
    { name: 'booking_cancellations', category: 'bookings', description: 'Cancellation records and refunds', icon: Calendar, color: 'indigo' },
    { name: 'booking_reschedules', category: 'bookings', description: 'Rescheduling history', icon: Calendar, color: 'indigo' },
    { name: 'service_execution_log', category: 'bookings', description: 'Service delivery tracking', icon: Calendar, color: 'indigo' },
    { name: 'booking_photos', category: 'bookings', description: 'Service completion photos', icon: FileText, color: 'indigo' },

    // Payments & Finance
    { name: 'payments', category: 'finance', description: 'Payment transactions with gateway integration', icon: DollarSign, color: 'emerald' },
    { name: 'payment_methods', category: 'finance', description: 'Customer saved payment methods', icon: DollarSign, color: 'emerald' },
    { name: 'payment_gateways', category: 'finance', description: 'Payment gateway configurations', icon: Settings, color: 'emerald' },
    { name: 'payment_settlements', category: 'finance', description: 'Vendor payment settlements', icon: DollarSign, color: 'emerald' },
    { name: 'refunds', category: 'finance', description: 'Refund transactions', icon: DollarSign, color: 'emerald' },
    { name: 'wallet_transactions', category: 'finance', description: 'Wallet balance changes', icon: DollarSign, color: 'emerald' },
    { name: 'invoices', category: 'finance', description: 'Generated invoices', icon: FileText, color: 'emerald' },
    { name: 'commission_rules', category: 'finance', description: 'Commission structure setup', icon: Settings, color: 'emerald' },
    { name: 'commission_records', category: 'finance', description: 'Commission tracking', icon: DollarSign, color: 'emerald' },
    { name: 'expense_categories', category: 'finance', description: 'Expense categorization', icon: Package, color: 'emerald' },
    { name: 'expenses', category: 'finance', description: 'Company expenses', icon: DollarSign, color: 'emerald' },
    { name: 'budget_allocations', category: 'finance', description: 'Department budget planning', icon: DollarSign, color: 'emerald' },
    { name: 'financial_reports', category: 'finance', description: 'Financial summaries and reports', icon: BarChart3, color: 'emerald' },
    { name: 'tax_records', category: 'finance', description: 'Tax filings and records', icon: FileText, color: 'emerald' },

    // Customers (10 tables) - ACTUAL TABLES ONLY
    { name: 'customers', category: 'customers', description: 'Customer profiles with loyalty and preferences', icon: Users, color: 'cyan' },
    { name: 'customer_addresses', category: 'customers', description: 'Saved customer addresses', icon: Building, color: 'cyan' },
    { name: 'customer_segments', category: 'customers', description: 'Customer grouping and segmentation', icon: Users, color: 'cyan' },
    { name: 'customer_segment_mapping', category: 'customers', description: 'Customer to segment mapping', icon: Users, color: 'cyan' },
    { name: 'customer_preferences', category: 'customers', description: 'Service and communication preferences', icon: Settings, color: 'cyan' },
    { name: 'customer_loyalty_tiers', category: 'customers', description: 'Loyalty program levels', icon: TrendingUp, color: 'cyan' },
    { name: 'loyalty_points_transactions', category: 'customers', description: 'Points earning and redemption', icon: DollarSign, color: 'cyan' },
    { name: 'customer_referrals', category: 'customers', description: 'Referral tracking and rewards', icon: Users, color: 'cyan' },
    { name: 'customer_complaints', category: 'customers', description: 'Complaint management system', icon: HelpCircle, color: 'cyan' },
    { name: 'customer_communication_log', category: 'customers', description: 'All customer communications', icon: FileText, color: 'cyan' },

    // Marketing (10 tables) - ACTUAL TABLES ONLY
    { name: 'campaigns', category: 'marketing', description: 'Marketing campaigns', icon: TrendingUp, color: 'rose' },
    { name: 'campaign_analytics', category: 'marketing', description: 'Campaign performance metrics', icon: BarChart3, color: 'rose' },
    { name: 'promotions', category: 'marketing', description: 'Discount codes and promotional offers', icon: TrendingUp, color: 'rose' },
    { name: 'promotion_usage', category: 'marketing', description: 'Promo code usage tracking', icon: BarChart3, color: 'rose' },
    { name: 'coupon_codes', category: 'marketing', description: 'Coupon code generation and management', icon: Package, color: 'rose' },
    { name: 'coupon_usages', category: 'marketing', description: 'Coupon redemption tracking', icon: BarChart3, color: 'rose' },
    { name: 'referral_rewards', category: 'marketing', description: 'Referral reward tracking', icon: Users, color: 'rose' },
    { name: 'email_templates', category: 'marketing', description: 'Email template library', icon: FileText, color: 'rose' },

    // Support (3 tables) - ACTUAL TABLES ONLY
    { name: 'support_tickets', category: 'support', description: 'Customer support ticket system', icon: HelpCircle, color: 'yellow' },
    { name: 'ticket_messages', category: 'support', description: 'Ticket conversation messages', icon: FileText, color: 'yellow' },
    { name: 'notifications', category: 'support', description: 'System notifications and alerts', icon: Bell, color: 'yellow' },

    // Legal & Compliance (4 tables) - ACTUAL TABLES ONLY
    { name: 'legal_documents', category: 'legal', description: 'Legal document repository with version control', icon: FileText, color: 'red' },
    { name: 'compliance_audits', category: 'legal', description: 'Compliance audit records and findings', icon: Shield, color: 'red' },
    { name: 'data_retention_policies', category: 'legal', description: 'Data retention and deletion policies', icon: FileText, color: 'red' },
    { name: 'gdpr_requests', category: 'legal', description: 'GDPR data access and deletion requests', icon: Shield, color: 'red' },

    // Operations & Inventory (6 tables) - ACTUAL TABLES ONLY
    { name: 'inventory_items', category: 'operations', description: 'Product inventory with SKU, stock levels, and pricing', icon: Package, color: 'amber' },
    { name: 'stock_transactions', category: 'operations', description: 'Stock movements: purchase, sale, adjustment, transfer', icon: TrendingUp, color: 'amber' },
    { name: 'suppliers', category: 'operations', description: 'Supplier directory with contact and payment terms', icon: Building, color: 'amber' },
    { name: 'purchase_orders', category: 'operations', description: 'Purchase order management with approval workflow', icon: FileText, color: 'amber' },
    { name: 'warehouses', category: 'operations', description: 'Warehouse locations with capacity tracking', icon: Building, color: 'amber' },
    { name: 'asset_tracking', category: 'operations', description: 'Equipment and asset tracking with maintenance dates', icon: Package, color: 'amber' },

    // Analytics (6 tables) - ACTUAL TABLES ONLY
    { name: 'analytics_events', category: 'analytics', description: 'User behavior tracking events', icon: BarChart3, color: 'violet' },
    { name: 'page_views', category: 'analytics', description: 'Page view tracking with device and location data', icon: Users, color: 'violet' },
    { name: 'conversion_tracking', category: 'analytics', description: 'Conversion events: signup, booking, payment, referral', icon: TrendingUp, color: 'violet' },
    { name: 'funnel_analytics', category: 'analytics', description: 'Conversion funnel analysis with drop-off rates', icon: DollarSign, color: 'violet' },
    { name: 'cohort_analysis', category: 'analytics', description: 'User cohort retention and revenue analysis', icon: BarChart3, color: 'violet' },
    { name: 'revenue_analytics', category: 'analytics', description: 'Revenue tracking by category with commissions', icon: DollarSign, color: 'violet' },

    // System (7 tables) - ACTUAL TABLES ONLY
    { name: 'system_settings', category: 'system', description: 'Dynamic system configuration', icon: Settings, color: 'gray' },
    { name: 'feature_flags', category: 'system', description: 'Feature rollout management', icon: Settings, color: 'gray' },
    { name: 'api_keys', category: 'system', description: 'API key management', icon: Key, color: 'gray' },
    { name: 'webhook_endpoints', category: 'system', description: 'Webhook endpoint configuration', icon: Settings, color: 'gray' },
    { name: 'scheduled_tasks', category: 'system', description: 'Scheduled background tasks', icon: Calendar, color: 'gray' },
    { name: 'app_versions', category: 'system', description: 'Application version tracking', icon: Package, color: 'gray' },
    { name: 'audit_logs', category: 'system', description: 'System-wide audit trail', icon: FileText, color: 'gray' },
    { name: 'error_logs', category: 'system', description: 'Application error tracking', icon: AlertTriangle, color: 'gray' },

    // Location & Geography (5 tables) - NEW CATEGORY
    { name: 'countries', category: 'location', description: 'Country master data', icon: Building, color: 'slate' },
    { name: 'states', category: 'location', description: 'State/province master data', icon: Building, color: 'slate' },
    { name: 'cities', category: 'location', description: 'City master data', icon: Building, color: 'slate' },
    { name: 'zones', category: 'location', description: 'Service zones and areas', icon: Building, color: 'slate' },
    { name: 'pincode_master', category: 'location', description: 'Pincode/ZIP code master data', icon: Building, color: 'slate' },

    // Communications (6 tables) - NEW CATEGORY
    { name: 'email_logs', category: 'communications', description: 'Email delivery logs', icon: FileText, color: 'fuchsia' },
    { name: 'sms_logs', category: 'communications', description: 'SMS delivery logs', icon: FileText, color: 'fuchsia' },
    { name: 'push_notifications', category: 'communications', description: 'Push notification history', icon: Bell, color: 'fuchsia' },
    { name: 'whatsapp_logs', category: 'communications', description: 'WhatsApp message logs', icon: FileText, color: 'fuchsia' },
    { name: 'in_app_messages', category: 'communications', description: 'In-app message center', icon: FileText, color: 'fuchsia' },
    { name: 'notification_queue', category: 'communications', description: 'Notification queue for processing', icon: Package, color: 'fuchsia' },
  ];

  const categories = [
    { id: 'all', name: 'All Tables', count: tables.length, color: 'gray' },
    { id: 'auth', name: 'Authentication & Users', count: tables.filter(t => t.category === 'auth').length, color: 'blue' },
    { id: 'organization', name: 'Departments & Roles', count: tables.filter(t => t.category === 'organization').length, color: 'purple' },
    { id: 'hr', name: 'HR & Employees', count: tables.filter(t => t.category === 'hr').length, color: 'green' },
    { id: 'vendors', name: 'Vendors', count: tables.filter(t => t.category === 'vendors').length, color: 'orange' },
    { id: 'therapists', name: 'Therapists', count: tables.filter(t => t.category === 'therapists').length, color: 'teal' },
    { id: 'services', name: 'Services', count: tables.filter(t => t.category === 'services').length, color: 'pink' },
    { id: 'bookings', name: 'Bookings', count: tables.filter(t => t.category === 'bookings').length, color: 'indigo' },
    { id: 'finance', name: 'Finance & Payments', count: tables.filter(t => t.category === 'finance').length, color: 'emerald' },
    { id: 'customers', name: 'Customers', count: tables.filter(t => t.category === 'customers').length, color: 'cyan' },
    { id: 'marketing', name: 'Marketing', count: tables.filter(t => t.category === 'marketing').length, color: 'rose' },
    { id: 'support', name: 'Support', count: tables.filter(t => t.category === 'support').length, color: 'yellow' },
    { id: 'legal', name: 'Legal & Compliance', count: tables.filter(t => t.category === 'legal').length, color: 'red' },
    { id: 'operations', name: 'Operations & Inventory', count: tables.filter(t => t.category === 'operations').length, color: 'amber' },
    { id: 'analytics', name: 'Analytics', count: tables.filter(t => t.category === 'analytics').length, color: 'violet' },
    { id: 'location', name: 'Location & Geography', count: tables.filter(t => t.category === 'location').length, color: 'slate' },
    { id: 'communications', name: 'Communications', count: tables.filter(t => t.category === 'communications').length, color: 'fuchsia' },
    { id: 'system', name: 'System', count: tables.filter(t => t.category === 'system').length, color: 'gray' },
  ];

  const filteredTables = tables.filter(table => {
    const matchesSearch = table.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         table.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || table.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
      blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' },
      green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200' },
      orange: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200' },
      teal: { bg: 'bg-teal-50', text: 'text-teal-600', border: 'border-teal-200' },
      pink: { bg: 'bg-pink-50', text: 'text-pink-600', border: 'border-pink-200' },
      indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-200' },
      emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200' },
      cyan: { bg: 'bg-cyan-50', text: 'text-cyan-600', border: 'border-cyan-200' },
      rose: { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-200' },
      yellow: { bg: 'bg-yellow-50', text: 'text-yellow-600', border: 'border-yellow-200' },
      violet: { bg: 'bg-violet-50', text: 'text-violet-600', border: 'border-violet-200' },
      red: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200' },
      amber: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200' },
      slate: { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-200' },
      fuchsia: { bg: 'bg-fuchsia-50', text: 'text-fuchsia-600', border: 'border-fuchsia-200' },
      gray: { bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-200' },
    };
    return colors[color] || colors.gray;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-neutral-200 pb-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
            <Database className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Database Schema</h1>
            <p className="text-neutral-600">Complete PostgreSQL database structure with 140+ tables for all roles</p>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-neutral-600">Total Tables</span>
            <Database className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-neutral-900">{tables.length}</p>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-neutral-600">Categories</span>
            <Package className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-neutral-900">{categories.length - 1}</p>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-neutral-600">Departments</span>
            <Building className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-neutral-900">18</p>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-neutral-600">With RLS</span>
            <Shield className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-3xl font-bold text-neutral-900">100%</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Search tables..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? `${getColorClasses(category.color).bg} ${getColorClasses(category.color).text} border-2 ${getColorClasses(category.color).border}`
                  : 'bg-white text-neutral-600 border border-neutral-300 hover:border-neutral-400'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* Tables Grid */}
      <div className="space-y-4">
        {filteredTables.map((table) => {
          const Icon = table.icon;
          const colors = getColorClasses(table.color);
          const isExpanded = expandedTable === table.name;
          const columns = tableColumns[table.name] || [];

          return (
            <div key={table.name} className={`card border-l-4 ${colors.border} overflow-hidden transition-all`}>
              {/* Table Header */}
              <button
                onClick={() => setExpandedTable(isExpanded ? null : table.name)}
                className="w-full p-6 text-left hover:bg-neutral-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className={`w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-5 h-5 ${colors.text}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-mono text-sm font-bold text-neutral-900">
                          {table.name}
                        </h3>
                        {columns.length > 0 && (
                          <span className="text-xs text-neutral-500">
                            ({columns.length} columns)
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded ${colors.bg} ${colors.text}`}>
                          {table.category}
                        </span>
                        <p className="text-sm text-neutral-600">
                          {table.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4">
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5 text-neutral-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-neutral-400" />
                    )}
                  </div>
                </div>
              </button>

              {/* Expanded Column Details */}
              {isExpanded && columns.length > 0 && (
                <div className="border-t border-neutral-200 bg-neutral-50 p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-neutral-300">
                          <th className="text-left py-3 px-4 font-semibold text-neutral-700">Column</th>
                          <th className="text-left py-3 px-4 font-semibold text-neutral-700">Type</th>
                          <th className="text-left py-3 px-4 font-semibold text-neutral-700">Constraints</th>
                          <th className="text-left py-3 px-4 font-semibold text-neutral-700">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {columns.map((column, index) => (
                          <tr key={column.name} className={index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                            <td className="py-3 px-4 font-mono text-xs font-medium text-neutral-900">
                              {column.name}
                            </td>
                            <td className="py-3 px-4 font-mono text-xs text-blue-600">
                              {column.type}
                            </td>
                            <td className="py-3 px-4 text-xs text-neutral-600">
                              {column.constraints || '-'}
                            </td>
                            <td className="py-3 px-4 text-xs text-neutral-700">
                              {column.description}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredTables.length === 0 && (
        <div className="text-center py-12">
          <Database className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
          <p className="text-neutral-500 text-lg">No tables found matching your search</p>
        </div>
      )}

      {/* Key Features */}
      <section className="card p-8">
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Database Features</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 mb-2">Row Level Security (RLS)</h3>
              <p className="text-sm text-neutral-600">
                All tables protected with RLS policies ensuring users only access authorized data
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 mb-2">Performance Optimized</h3>
              <p className="text-sm text-neutral-600">
                Strategic indexes, composite indexes, and full-text search for optimal query performance
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 mb-2">Complete Audit Trail</h3>
              <p className="text-sm text-neutral-600">
                Automatic logging of all important actions with user activity and audit logs
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Database className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 mb-2">Real-Time Subscriptions</h3>
              <p className="text-sm text-neutral-600">
                WebSocket-based real-time updates for bookings, locations, and notifications
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Migration Files */}
      <section className="card p-8">
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Migration Files</h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
            <div>
              <h3 className="font-mono text-sm font-semibold text-neutral-900">20250102_complete_ombaro_schema.sql</h3>
              <p className="text-sm text-neutral-600 mt-1">Complete database schema with 40+ tables</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">Applied</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
            <div>
              <h3 className="font-mono text-sm font-semibold text-neutral-900">20250102_therapist_management.sql</h3>
              <p className="text-sm text-neutral-600 mt-1">Therapist management system</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">Applied</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
            <div>
              <h3 className="font-mono text-sm font-semibold text-neutral-900">20250102_vendor_onboarding.sql</h3>
              <p className="text-sm text-neutral-600 mt-1">Vendor self-signup and approval workflow</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">Applied</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
            <div>
              <h3 className="font-mono text-sm font-semibold text-neutral-900">20250103_core_tables_all_roles.sql</h3>
              <p className="text-sm text-neutral-600 mt-1">Core tables for departments, roles, and system</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">Applied</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
            <div>
              <h3 className="font-mono text-sm font-semibold text-neutral-900">20250103_comprehensive_all_roles_tables.sql</h3>
              <p className="text-sm text-neutral-600 mt-1">Comprehensive 140+ tables for all 18 departments and roles</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">Applied</span>
          </div>
        </div>
      </section>
    </div>
  );
};
