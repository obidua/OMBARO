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

  // Production database tables (60 essential tables)
  const tables: TableInfo[] = [
    // System & Configuration (6 tables)
    { name: 'system_settings', category: 'system', description: 'Dynamic system configuration with categories and encryption', icon: Settings, color: 'gray' },
    { name: 'feature_flags', category: 'system', description: 'Feature rollout management with percentage-based deployment', icon: Settings, color: 'gray' },
    { name: 'audit_logs', category: 'system', description: 'Complete system-wide audit trail of all actions', icon: FileText, color: 'gray' },
    { name: 'error_logs', category: 'system', description: 'Application error tracking with severity levels', icon: AlertTriangle, color: 'gray' },
    { name: 'user_activity_log', category: 'system', description: 'User activity tracking for analytics and debugging', icon: BarChart3, color: 'gray' },
    { name: 'notifications', category: 'system', description: 'Multi-channel notification system (push, SMS, email)', icon: Bell, color: 'gray' },

    // Location & Geography (5 tables)
    { name: 'countries', category: 'location', description: 'Country master data with currency and phone codes', icon: Building, color: 'slate' },
    { name: 'states', category: 'location', description: 'State/province master data linked to countries', icon: Building, color: 'slate' },
    { name: 'cities', category: 'location', description: 'City master data linked to states', icon: Building, color: 'slate' },
    { name: 'zones', category: 'location', description: 'Service zones with geographic coordinates and charges', icon: Building, color: 'slate' },
    { name: 'pincode_master', category: 'location', description: 'Pincode/ZIP code data with serviceability status', icon: Building, color: 'slate' },

    // Departments & Roles (5 tables)
    { name: 'departments', category: 'organization', description: 'Organizational departments with hierarchy', icon: Building, color: 'purple' },
    { name: 'roles', category: 'organization', description: 'Role definitions with permissions and hierarchy levels', icon: UserCog, color: 'purple' },
    { name: 'permissions', category: 'organization', description: 'Granular system permissions for access control', icon: Shield, color: 'purple' },
    { name: 'role_permissions', category: 'organization', description: 'Many-to-many mapping of roles to permissions', icon: Shield, color: 'purple' },
    { name: 'user_roles', category: 'organization', description: 'User role assignments with validity periods', icon: UserCog, color: 'purple' },

    // Users & Authentication (8 tables)
    { name: 'user_profiles', category: 'auth', description: 'Extended user profiles with role and department info', icon: Users, color: 'blue' },
    { name: 'user_sessions', category: 'auth', description: 'Active user sessions with device and location tracking', icon: Key, color: 'blue' },
    { name: 'user_documents', category: 'auth', description: 'User documents (Aadhaar, PAN, etc.) with verification', icon: FileText, color: 'blue' },
    { name: 'user_preferences', category: 'auth', description: 'User preferences for notifications, language, theme', icon: Settings, color: 'blue' },
    { name: 'user_kyc_verification', category: 'auth', description: 'KYC verification tracking for compliance', icon: Shield, color: 'blue' },
    { name: 'user_bank_details', category: 'auth', description: 'Encrypted bank account information', icon: DollarSign, color: 'blue' },
    { name: 'emergency_contacts', category: 'auth', description: 'Emergency contact information for users', icon: Users, color: 'blue' },
    { name: 'employees', category: 'auth', description: 'Employee records with employment details', icon: Users, color: 'blue' },

    // Vendors (8 tables)
    { name: 'vendors', category: 'vendors', description: 'Spa/salon vendor profiles with ratings and verification', icon: Building, color: 'orange' },
    { name: 'vendor_applications', category: 'vendors', description: 'Vendor self-signup applications with approval workflow', icon: FileText, color: 'orange' },
    { name: 'vendor_documents', category: 'vendors', description: 'Vendor legal documents and licenses', icon: FileText, color: 'orange' },
    { name: 'vendor_services', category: 'vendors', description: 'Services offered by vendors with custom pricing', icon: Package, color: 'orange' },
    { name: 'vendor_staff', category: 'vendors', description: 'Vendor staff members with roles and permissions', icon: Users, color: 'orange' },
    { name: 'vendor_payouts', category: 'vendors', description: 'Vendor payment settlements with commission tracking', icon: DollarSign, color: 'orange' },
    { name: 'vendor_reviews', category: 'vendors', description: 'Customer reviews and ratings for vendors', icon: TrendingUp, color: 'orange' },
    { name: 'vendor_availability', category: 'vendors', description: 'Vendor operating hours by day of week', icon: Calendar, color: 'orange' },

    // Therapists (6 tables)
    { name: 'therapists', category: 'therapists', description: 'Therapist profiles with certifications and ratings', icon: Users, color: 'teal' },
    { name: 'therapist_schedules', category: 'therapists', description: 'Weekly availability schedules with break times', icon: Calendar, color: 'teal' },
    { name: 'therapist_leaves', category: 'therapists', description: 'Leave management with approval workflow', icon: Calendar, color: 'teal' },
    { name: 'therapist_locations', category: 'therapists', description: 'Real-time GPS location tracking during service', icon: Building, color: 'teal' },
    { name: 'therapist_assignments', category: 'therapists', description: 'Service assignments with status tracking', icon: Users, color: 'teal' },
    { name: 'therapist_performance', category: 'therapists', description: 'Monthly performance metrics and KPIs', icon: TrendingUp, color: 'teal' },

    // Services (5 tables)
    { name: 'service_categories', category: 'services', description: 'Service categorization with icons and images', icon: Package, color: 'pink' },
    { name: 'services', category: 'services', description: 'Complete service catalog with pricing and benefits', icon: Package, color: 'pink' },
    { name: 'addon_services', category: 'services', description: 'Add-on services and enhancements', icon: Package, color: 'pink' },
    { name: 'service_packages', category: 'services', description: 'Bundled service packages with discounts', icon: Package, color: 'pink' },
    { name: 'reviews', category: 'services', description: 'Multi-purpose review system for services, therapists, vendors', icon: FileText, color: 'pink' },

    // Customers (4 tables)
    { name: 'customers', category: 'customers', description: 'Customer profiles with loyalty tiers and preferences', icon: Users, color: 'cyan' },
    { name: 'customer_addresses', category: 'customers', description: 'Saved customer addresses with GPS coordinates', icon: Building, color: 'cyan' },
    { name: 'customer_referrals', category: 'customers', description: 'Referral tracking with rewards system', icon: Users, color: 'cyan' },
    { name: 'loyalty_points_transactions', category: 'customers', description: 'Loyalty points earning and redemption history', icon: DollarSign, color: 'cyan' },

    // Bookings (6 tables)
    { name: 'bookings', category: 'bookings', description: 'Customer service bookings with status tracking', icon: Calendar, color: 'indigo' },
    { name: 'booking_items', category: 'bookings', description: 'Individual services within each booking', icon: Package, color: 'indigo' },
    { name: 'booking_status_history', category: 'bookings', description: 'Complete booking status change audit trail', icon: FileText, color: 'indigo' },
    { name: 'booking_notes', category: 'bookings', description: 'Notes from customers, vendors, therapists, and staff', icon: FileText, color: 'indigo' },
    { name: 'booking_cancellations', category: 'bookings', description: 'Cancellation records with refund processing', icon: Calendar, color: 'indigo' },
    { name: 'booking_reschedules', category: 'bookings', description: 'Rescheduling requests with approval workflow', icon: Calendar, color: 'indigo' },

    // Payments & Finance (5 tables)
    { name: 'payment_methods', category: 'finance', description: 'Saved payment methods (cards, UPI, wallets)', icon: DollarSign, color: 'emerald' },
    { name: 'payments', category: 'finance', description: 'Payment transactions with gateway integration', icon: DollarSign, color: 'emerald' },
    { name: 'refunds', category: 'finance', description: 'Refund processing with status tracking', icon: DollarSign, color: 'emerald' },
    { name: 'wallet_transactions', category: 'finance', description: 'Customer wallet balance transactions', icon: DollarSign, color: 'emerald' },
    { name: 'commission_records', category: 'finance', description: 'Commission tracking for vendors and therapists', icon: DollarSign, color: 'emerald' },

    // Support (2 tables)
    { name: 'support_tickets', category: 'support', description: 'Customer support ticket system with priority levels', icon: HelpCircle, color: 'yellow' },
    { name: 'ticket_messages', category: 'support', description: 'Ticket conversation thread with attachments', icon: FileText, color: 'yellow' },
  ];

  const categories = [
    { id: 'all', name: 'All Tables', count: tables.length, color: 'gray' },
    { id: 'system', name: 'System & Configuration', count: tables.filter(t => t.category === 'system').length, color: 'gray' },
    { id: 'location', name: 'Location & Geography', count: tables.filter(t => t.category === 'location').length, color: 'slate' },
    { id: 'organization', name: 'Departments & Roles', count: tables.filter(t => t.category === 'organization').length, color: 'purple' },
    { id: 'auth', name: 'Users & Authentication', count: tables.filter(t => t.category === 'auth').length, color: 'blue' },
    { id: 'vendors', name: 'Vendors', count: tables.filter(t => t.category === 'vendors').length, color: 'orange' },
    { id: 'therapists', name: 'Therapists', count: tables.filter(t => t.category === 'therapists').length, color: 'teal' },
    { id: 'services', name: 'Services', count: tables.filter(t => t.category === 'services').length, color: 'pink' },
    { id: 'customers', name: 'Customers', count: tables.filter(t => t.category === 'customers').length, color: 'cyan' },
    { id: 'bookings', name: 'Bookings', count: tables.filter(t => t.category === 'bookings').length, color: 'indigo' },
    { id: 'finance', name: 'Payments & Finance', count: tables.filter(t => t.category === 'finance').length, color: 'emerald' },
    { id: 'support', name: 'Support', count: tables.filter(t => t.category === 'support').length, color: 'yellow' },
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
            <p className="text-neutral-600">Production-ready PostgreSQL schema with 60 essential tables</p>
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
          <p className="text-3xl font-bold text-neutral-900">11</p>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-neutral-600">Core Entities</span>
            <Building className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-neutral-900">10</p>
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
              <h3 className="font-mono text-sm font-semibold text-neutral-900">20250115_clean_production_schema.sql</h3>
              <p className="text-sm text-neutral-600 mt-1">Production-ready clean schema with 60 essential tables for all core features</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">Applied</span>
          </div>

          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="text-sm font-semibold text-blue-900 mb-2">Schema Highlights</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• System & Configuration (6 tables) - Settings, feature flags, audit logs</li>
              <li>• Location & Geography (5 tables) - Country, state, city, zones, pincodes</li>
              <li>• Departments & Roles (5 tables) - RBAC with granular permissions</li>
              <li>• Users & Authentication (8 tables) - Complete user management with KYC</li>
              <li>• Vendors (8 tables) - Vendor onboarding and management</li>
              <li>• Therapists (6 tables) - Therapist profiles, scheduling, performance tracking</li>
              <li>• Services (5 tables) - Service catalog with packages and reviews</li>
              <li>• Customers (4 tables) - Customer profiles, addresses, loyalty program</li>
              <li>• Bookings (6 tables) - Complete booking lifecycle management</li>
              <li>• Payments (5 tables) - Payment processing, refunds, commissions</li>
              <li>• Support (2 tables) - Ticket system with messaging</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};
