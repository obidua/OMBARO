import React, { useState, useEffect } from 'react';
import { Database, Table, Key, Shield, Users, Calendar, FileText, DollarSign, Building, UserCog, Settings, TrendingUp, Package, BarChart3, Bell, HelpCircle, AlertTriangle, Search } from 'lucide-react';

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

    // Departments & Roles
    { name: 'departments', category: 'organization', description: 'All 18 departments with hierarchy and budget allocation', icon: Building, color: 'purple' },
    { name: 'department_hierarchy', category: 'organization', description: 'Complex organizational structure relationships', icon: Building, color: 'purple' },
    { name: 'roles', category: 'organization', description: 'Role definitions with permissions and categories', icon: UserCog, color: 'purple' },
    { name: 'permission_modules', category: 'organization', description: 'Granular permission modules and actions', icon: Shield, color: 'purple' },
    { name: 'role_assignment_history', category: 'organization', description: 'Audit trail of role assignments', icon: FileText, color: 'purple' },
    { name: 'delegation_history', category: 'organization', description: 'Temporary role delegation tracking', icon: Users, color: 'purple' },

    // Employees & HR
    { name: 'employees', category: 'hr', description: 'Employee records extending user profiles', icon: Users, color: 'green' },
    { name: 'attendance_records', category: 'hr', description: 'Daily attendance with check-in/out and location', icon: Calendar, color: 'green' },
    { name: 'leave_requests', category: 'hr', description: 'Leave applications and approval workflow', icon: Calendar, color: 'green' },
    { name: 'leave_balances', category: 'hr', description: 'Available leave balances per employee', icon: Calendar, color: 'green' },
    { name: 'salary_records', category: 'hr', description: 'Monthly salary processing records', icon: DollarSign, color: 'green' },
    { name: 'performance_reviews', category: 'hr', description: 'Employee performance evaluations', icon: TrendingUp, color: 'green' },

    // Vendors & Therapists
    { name: 'vendors', category: 'vendors', description: 'Spa/salon vendor profiles and business details', icon: Building, color: 'orange' },
    { name: 'vendor_applications', category: 'vendors', description: 'Vendor self-signup applications', icon: FileText, color: 'orange' },
    { name: 'vendor_application_history', category: 'vendors', description: 'Application status change history', icon: FileText, color: 'orange' },
    { name: 'vendor_staff', category: 'vendors', description: 'Staff members of vendor businesses', icon: Users, color: 'orange' },
    { name: 'therapists', category: 'therapists', description: 'Therapist profiles with certifications and ratings', icon: Users, color: 'teal' },
    { name: 'therapist_schedules', category: 'therapists', description: 'Weekly availability schedules', icon: Calendar, color: 'teal' },
    { name: 'therapist_leaves', category: 'therapists', description: 'Therapist leave management', icon: Calendar, color: 'teal' },
    { name: 'therapist_locations', category: 'therapists', description: 'Real-time GPS location tracking', icon: Building, color: 'teal' },
    { name: 'therapist_assignments', category: 'therapists', description: 'Service assignments to therapists', icon: Users, color: 'teal' },

    // Services
    { name: 'services', category: 'services', description: '25+ massage and spa services catalog', icon: Package, color: 'pink' },
    { name: 'service_packages', category: 'services', description: 'Bundled service packages with discounts', icon: Package, color: 'pink' },
    { name: 'addon_services', category: 'services', description: 'Additional services and enhancements', icon: Package, color: 'pink' },

    // Bookings
    { name: 'bookings', category: 'bookings', description: 'Customer service bookings', icon: Calendar, color: 'indigo' },
    { name: 'booking_items', category: 'bookings', description: 'Services included in each booking', icon: Package, color: 'indigo' },

    // Payments
    { name: 'payments', category: 'finance', description: 'Payment transactions with gateway integration', icon: DollarSign, color: 'emerald' },
    { name: 'payment_settlements', category: 'finance', description: 'Vendor payment settlements', icon: DollarSign, color: 'emerald' },

    // Customers
    { name: 'customers', category: 'customers', description: 'Customer profiles with loyalty and preferences', icon: Users, color: 'cyan' },
    { name: 'customer_addresses', category: 'customers', description: 'Saved customer addresses', icon: Building, color: 'cyan' },

    // Marketing
    { name: 'campaigns', category: 'marketing', description: 'Marketing campaigns and analytics', icon: TrendingUp, color: 'rose' },
    { name: 'promotions', category: 'marketing', description: 'Discount codes and promotional offers', icon: TrendingUp, color: 'rose' },
    { name: 'promotion_usage', category: 'marketing', description: 'Promo code usage tracking', icon: BarChart3, color: 'rose' },

    // Support
    { name: 'support_tickets', category: 'support', description: 'Customer support tickets', icon: HelpCircle, color: 'yellow' },
    { name: 'ticket_messages', category: 'support', description: 'Ticket conversation messages', icon: FileText, color: 'yellow' },
    { name: 'notifications', category: 'support', description: 'Push, email, and SMS notifications', icon: Bell, color: 'yellow' },

    // Analytics
    { name: 'analytics_events', category: 'analytics', description: 'User behavior tracking events', icon: BarChart3, color: 'violet' },

    // System
    { name: 'system_settings', category: 'system', description: 'Dynamic system configuration', icon: Settings, color: 'gray' },
    { name: 'feature_flags', category: 'system', description: 'Feature rollout management', icon: Settings, color: 'gray' },
    { name: 'app_versions', category: 'system', description: 'Application version tracking', icon: Package, color: 'gray' },
    { name: 'audit_logs', category: 'system', description: 'System-wide audit trail', icon: FileText, color: 'gray' },
    { name: 'error_logs', category: 'system', description: 'Application error tracking', icon: AlertTriangle, color: 'gray' },
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
    { id: 'analytics', name: 'Analytics', count: tables.filter(t => t.category === 'analytics').length, color: 'violet' },
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
            <p className="text-neutral-600">Complete PostgreSQL database structure with 50+ tables</p>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTables.map((table) => {
          const Icon = table.icon;
          const colors = getColorClasses(table.color);

          return (
            <div key={table.name} className={`card p-6 border-l-4 ${colors.border} hover:shadow-lg transition-shadow`}>
              <div className="flex items-start space-x-3 mb-4">
                <div className={`w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-5 h-5 ${colors.text}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-mono text-sm font-bold text-neutral-900 mb-1 break-all">
                    {table.name}
                  </h3>
                  <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded ${colors.bg} ${colors.text}`}>
                    {table.category}
                  </span>
                </div>
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed">
                {table.description}
              </p>
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
              <p className="text-sm text-neutral-600 mt-1">Core tables for all departments and roles</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">Applied</span>
          </div>
        </div>
      </section>
    </div>
  );
};
