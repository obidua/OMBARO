import React, { useState } from 'react';
import { LogOut, Users, BarChart3, Settings, FileText, DollarSign, TrendingUp, Calendar, Clock, AlertTriangle, CheckCircle, Eye, Edit, Download, Upload, Search, Filter, Plus, Building, Phone, Mail, MapPin, Globe, Shield, Monitor, HeadphonesIcon, UserCheck, List, Database, Briefcase, Scale, Gavel, Calculator, Crown, Building2, UserCog, Heart } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { UserRole } from '../../types/auth';

interface DepartmentDashboardScreenProps {
  userRole: UserRole;
  user: any;
  onLogout: () => void;
}

export const DepartmentDashboardScreen: React.FC<DepartmentDashboardScreenProps> = ({
  userRole,
  user,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const getRoleInfo = (role: UserRole) => {
    const roleMap = {
      accounts_department: {
        title: 'Accounts Department',
        subtitle: 'Financial Accounting & Bookkeeping',
        icon: Calculator,
        color: 'from-green-600 to-emerald-600',
        description: 'Manage financial transactions, invoicing, and accounting records'
      },
      marketing_department: {
        title: 'Marketing Department',
        subtitle: 'Brand Promotion & Customer Acquisition',
        icon: Heart,
        color: 'from-pink-600 to-rose-600',
        description: 'Handle marketing campaigns, brand management, and customer outreach'
      },
      finance_department: {
        title: 'Finance Department',
        subtitle: 'Financial Planning & Analysis',
        icon: DollarSign,
        color: 'from-blue-600 to-cyan-600',
        description: 'Oversee financial planning, budgeting, and investment decisions'
      },
      legal_department: {
        title: 'Legal Department',
        subtitle: 'Legal Affairs & Compliance',
        icon: Scale,
        color: 'from-red-600 to-pink-600',
        description: 'Handle legal matters, contracts, and regulatory compliance'
      },
      customer_care: {
        title: 'Customer Care',
        subtitle: 'Customer Support & Service',
        icon: HeadphonesIcon,
        color: 'from-emerald-600 to-teal-600',
        description: 'Provide customer support and resolve service issues'
      },
      staff_department: {
        title: 'Staff Department',
        subtitle: 'Staff Management & Coordination',
        icon: UserCheck,
        color: 'from-orange-600 to-amber-600',
        description: 'Manage staff scheduling, coordination, and operations'
      },
      vendor_list: {
        title: 'Vendor List Management',
        subtitle: 'Vendor Database & Relations',
        icon: List,
        color: 'from-teal-600 to-cyan-600',
        description: 'Maintain vendor database and manage vendor relationships'
      },
      customer_data: {
        title: 'Customer Data Management',
        subtitle: 'Customer Information & Analytics',
        icon: Database,
        color: 'from-cyan-600 to-blue-600',
        description: 'Manage customer data, analytics, and insights'
      },
      fo_department: {
        title: 'F.O. Department',
        subtitle: 'Front Office Operations',
        icon: Briefcase,
        color: 'from-yellow-600 to-orange-600',
        description: 'Handle front office operations and customer interactions'
      },
      it_department: {
        title: 'IT Department',
        subtitle: 'Technology Infrastructure & Support',
        icon: Monitor,
        color: 'from-indigo-600 to-purple-600',
        description: 'Manage IT infrastructure, systems, and technical support'
      },
      super_admin: {
        title: 'Command Power – Super Admin',
        subtitle: 'Ultimate System Control',
        icon: Crown,
        color: 'from-yellow-500 to-orange-500',
        description: 'Complete system access and administrative control'
      },
      ho_details: {
        title: 'H.O. Details',
        subtitle: 'Head Office Administration',
        icon: Building,
        color: 'from-gray-600 to-slate-600',
        description: 'Head office administration and management'
      },
      corporate_office: {
        title: 'Corporate Office Details',
        subtitle: 'Corporate Office Management',
        icon: Building2,
        color: 'from-stone-600 to-gray-600',
        description: 'Corporate office operations and management'
      },
      advocate: {
        title: 'Advocate',
        subtitle: 'Legal Representation & Advice',
        icon: Gavel,
        color: 'from-rose-600 to-red-600',
        description: 'Legal representation and advisory services'
      },
      ca_cs: {
        title: 'CA & CS',
        subtitle: 'Chartered Accountant & Company Secretary',
        icon: Calculator,
        color: 'from-amber-600 to-yellow-600',
        description: 'Professional accounting and secretarial services'
      },
      directors: {
        title: 'Directors\' Details',
        subtitle: 'Board of Directors & Executive Management',
        icon: Users,
        color: 'from-slate-600 to-gray-600',
        description: 'Executive leadership and board management'
      },
      hr_department: {
        title: 'HR Department',
        subtitle: 'Human Resources Management',
        icon: UserCog,
        color: 'from-purple-600 to-indigo-600',
        description: 'Employee relations, recruitment, and HR policies'
      }
    };

    return roleMap[role] || {
      title: 'Unknown Role',
      subtitle: 'Role not configured',
      icon: Users,
      color: 'from-gray-600 to-slate-600',
      description: 'This role is not yet configured'
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <button
          onClick={onBack}
          aria-label="Go back to welcome screen"
          className="w-10 h-10 rounded-xl bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <div className="text-center">
          <h1 className="text-lg font-semibold text-gray-900">Select Your Role</h1>
          <p className="text-sm text-gray-600">Choose your department or position</p>
        </div>
        <div className="w-10" />
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pb-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {roleCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">{category.title}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.roles.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className={`p-4 rounded-2xl border-2 transition-all duration-200 text-left ${
                      selectedRole === role.id
                        ? 'border-purple-500 bg-purple-50 shadow-md'
                        : 'border-gray-200 bg-white/70 hover:border-gray-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${role.color}`}>
                        <role.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{role.name}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{role.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Action */}
      <div className="px-6 pb-8">
        <div className="max-w-md mx-auto">
          <Button
            onClick={() => selectedRole && onRoleSelect(selectedRole)}
            disabled={!selectedRole}
            loading={isLoading}
            size="lg"
            className="w-full"
          >
            Continue as {selectedRole ? roleCategories.flatMap(cat => cat.roles).find(r => r.id === selectedRole)?.name : 'Selected Role'}
          </Button>
          
          {selectedRole && (
            <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-blue-800 text-sm text-center">
                <strong>Demo Mode:</strong> Password: 1234 for all roles
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DepartmentDashboard: React.FC<{ userRole: UserRole; user: any; onLogout: () => void }> = ({
  userRole,
  user,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const getRoleInfo = (role: UserRole) => {
    const roleMap = {
      accounts_department: {
        title: 'Accounts Department',
        subtitle: 'Financial Accounting & Bookkeeping',
        icon: Calculator,
        color: 'from-green-600 to-emerald-600',
        description: 'Manage financial transactions, invoicing, and accounting records'
      },
      marketing_department: {
        title: 'Marketing Department',
        subtitle: 'Brand Promotion & Customer Acquisition',
        icon: Heart,
        color: 'from-pink-600 to-rose-600',
        description: 'Handle marketing campaigns, brand management, and customer outreach'
      },
      finance_department: {
        title: 'Finance Department',
        subtitle: 'Financial Planning & Analysis',
        icon: DollarSign,
        color: 'from-blue-600 to-cyan-600',
        description: 'Oversee financial planning, budgeting, and investment decisions'
      },
      legal_department: {
        title: 'Legal Department',
        subtitle: 'Legal Affairs & Compliance',
        icon: Scale,
        color: 'from-red-600 to-pink-600',
        description: 'Handle legal matters, contracts, and regulatory compliance'
      },
      customer_care: {
        title: 'Customer Care',
        subtitle: 'Customer Support & Service',
        icon: HeadphonesIcon,
        color: 'from-emerald-600 to-teal-600',
        description: 'Provide customer support and resolve service issues'
      },
      staff_department: {
        title: 'Staff Department',
        subtitle: 'Staff Management & Coordination',
        icon: UserCheck,
        color: 'from-orange-600 to-amber-600',
        description: 'Manage staff scheduling, coordination, and operations'
      },
      vendor_list: {
        title: 'Vendor List Management',
        subtitle: 'Vendor Database & Relations',
        icon: List,
        color: 'from-teal-600 to-cyan-600',
        description: 'Maintain vendor database and manage vendor relationships'
      },
      customer_data: {
        title: 'Customer Data Management',
        subtitle: 'Customer Information & Analytics',
        icon: Database,
        color: 'from-cyan-600 to-blue-600',
        description: 'Manage customer data, analytics, and insights'
      },
      fo_department: {
        title: 'F.O. Department',
        subtitle: 'Front Office Operations',
        icon: Briefcase,
        color: 'from-yellow-600 to-orange-600',
        description: 'Handle front office operations and customer interactions'
      },
      it_department: {
        title: 'IT Department',
        subtitle: 'Technology Infrastructure & Support',
        icon: Monitor,
        color: 'from-indigo-600 to-purple-600',
        description: 'Manage IT infrastructure, systems, and technical support'
      },
      super_admin: {
        title: 'Command Power – Super Admin',
        subtitle: 'Ultimate System Control',
        icon: Crown,
        color: 'from-yellow-500 to-orange-500',
        description: 'Complete system access and administrative control'
      },
      ho_details: {
        title: 'H.O. Details',
        subtitle: 'Head Office Administration',
        icon: Building,
        color: 'from-gray-600 to-slate-600',
        description: 'Head office administration and management'
      },
      corporate_office: {
        title: 'Corporate Office Details',
        subtitle: 'Corporate Office Management',
        icon: Building2,
        color: 'from-stone-600 to-gray-600',
        description: 'Corporate office operations and management'
      },
      advocate: {
        title: 'Advocate',
        subtitle: 'Legal Representation & Advice',
        icon: Gavel,
        color: 'from-rose-600 to-red-600',
        description: 'Legal representation and advisory services'
      },
      ca_cs: {
        title: 'CA & CS',
        subtitle: 'Chartered Accountant & Company Secretary',
        icon: Calculator,
        color: 'from-amber-600 to-yellow-600',
        description: 'Professional accounting and secretarial services'
      },
      directors: {
        title: 'Directors\' Details',
        subtitle: 'Board of Directors & Executive Management',
        icon: Users,
        color: 'from-slate-600 to-gray-600',
        description: 'Executive leadership and board management'
      },
      hr_department: {
        title: 'HR Department',
        subtitle: 'Human Resources Management',
        icon: UserCog,
        color: 'from-purple-600 to-indigo-600',
        description: 'Employee relations, recruitment, and HR policies'
      }
    };

    return roleMap[role] || {
      title: 'Department Dashboard',
      subtitle: 'Department Operations',
      icon: Users,
      color: 'from-gray-600 to-slate-600',
      description: 'Department-specific operations and management'
    };
  };

  const roleInfo = getRoleInfo(userRole);

  const getDepartmentStats = (role: UserRole) => {
    const statsMap = {
      accounts_department: [
        { label: 'Monthly Revenue', value: '₹8.4L', icon: DollarSign, color: 'bg-green-100 text-green-600', change: '+12% this month' },
        { label: 'Pending Invoices', value: '23', icon: FileText, color: 'bg-yellow-100 text-yellow-600', change: '5 overdue' },
        { label: 'Processed Payments', value: '156', icon: CheckCircle, color: 'bg-blue-100 text-blue-600', change: '+8 today' },
        { label: 'Account Balance', value: '₹2.1L', icon: TrendingUp, color: 'bg-purple-100 text-purple-600', change: '+5% growth' }
      ],
      marketing_department: [
        { label: 'Active Campaigns', value: '12', icon: Heart, color: 'bg-pink-100 text-pink-600', change: '3 new this week' },
        { label: 'Lead Generation', value: '234', icon: TrendingUp, color: 'bg-blue-100 text-blue-600', change: '+18% this month' },
        { label: 'Conversion Rate', value: '12.5%', icon: BarChart3, color: 'bg-green-100 text-green-600', change: '+2.3% improvement' },
        { label: 'Social Reach', value: '45K', icon: Users, color: 'bg-purple-100 text-purple-600', change: '+5K followers' }
      ],
      finance_department: [
        { label: 'Budget Allocated', value: '₹15L', icon: DollarSign, color: 'bg-blue-100 text-blue-600', change: '85% utilized' },
        { label: 'ROI Analysis', value: '24%', icon: TrendingUp, color: 'bg-green-100 text-green-600', change: '+3% this quarter' },
        { label: 'Cost Centers', value: '8', icon: BarChart3, color: 'bg-purple-100 text-purple-600', change: '2 new added' },
        { label: 'Financial Reports', value: '45', icon: FileText, color: 'bg-yellow-100 text-yellow-600', change: '12 pending review' }
      ],
      customer_care: [
        { label: 'Active Tickets', value: '34', icon: HeadphonesIcon, color: 'bg-emerald-100 text-emerald-600', change: '8 urgent' },
        { label: 'Resolved Today', value: '28', icon: CheckCircle, color: 'bg-green-100 text-green-600', change: '95% satisfaction' },
        { label: 'Avg Response Time', value: '2.3h', icon: Clock, color: 'bg-blue-100 text-blue-600', change: '-30min improvement' },
        { label: 'Customer Rating', value: '4.8', icon: Users, color: 'bg-yellow-100 text-yellow-600', change: '+0.2 this month' }
      ],
      super_admin: [
        { label: 'Total Users', value: '2,847', icon: Users, color: 'bg-blue-100 text-blue-600', change: '+234 this month' },
        { label: 'System Health', value: '99.9%', icon: Monitor, color: 'bg-green-100 text-green-600', change: 'Excellent uptime' },
        { label: 'Active Sessions', value: '456', icon: Clock, color: 'bg-purple-100 text-purple-600', change: 'Peak: 678' },
        { label: 'Security Score', value: 'A+', icon: Shield, color: 'bg-yellow-100 text-yellow-600', change: 'No threats detected' }
      ]
    };

    return statsMap[role] || [
      { label: 'Department Metrics', value: '0', icon: BarChart3, color: 'bg-gray-100 text-gray-600', change: 'No data available' }
    ];
  };

  const stats = getDepartmentStats(userRole);

  const getDepartmentActions = (role: UserRole) => {
    const actionsMap = {
      accounts_department: [
        { id: 'invoices', title: 'Manage Invoices', subtitle: 'Create and track invoices', icon: FileText },
        { id: 'payments', title: 'Payment Processing', subtitle: 'Process and verify payments', icon: DollarSign },
        { id: 'reports', title: 'Financial Reports', subtitle: 'Generate accounting reports', icon: BarChart3 },
        { id: 'reconciliation', title: 'Account Reconciliation', subtitle: 'Reconcile bank accounts', icon: CheckCircle }
      ],
      marketing_department: [
        { id: 'campaigns', title: 'Marketing Campaigns', subtitle: 'Create and manage campaigns', icon: Heart },
        { id: 'analytics', title: 'Marketing Analytics', subtitle: 'Track campaign performance', icon: BarChart3 },
        { id: 'content', title: 'Content Management', subtitle: 'Manage marketing content', icon: FileText },
        { id: 'social', title: 'Social Media', subtitle: 'Manage social presence', icon: Users }
      ],
      customer_care: [
        { id: 'tickets', title: 'Support Tickets', subtitle: 'Manage customer inquiries', icon: HeadphonesIcon },
        { id: 'chat', title: 'Live Chat', subtitle: 'Real-time customer support', icon: Users },
        { id: 'feedback', title: 'Customer Feedback', subtitle: 'Review and respond to feedback', icon: FileText },
        { id: 'escalations', title: 'Escalations', subtitle: 'Handle escalated issues', icon: AlertTriangle }
      ],
      super_admin: [
        { id: 'users', title: 'User Management', subtitle: 'Manage all system users', icon: Users },
        { id: 'roles', title: 'Role Management', subtitle: 'Create and assign roles', icon: UserCog },
        { id: 'system', title: 'System Settings', subtitle: 'Configure system parameters', icon: Settings },
        { id: 'security', title: 'Security Center', subtitle: 'Monitor system security', icon: Shield },
        { id: 'analytics', title: 'System Analytics', subtitle: 'Platform-wide analytics', icon: BarChart3 },
        { id: 'backup', title: 'Data Management', subtitle: 'Backup and recovery', icon: Database }
      ]
    };

    return actionsMap[role] || [
      { id: 'overview', title: 'Department Overview', subtitle: 'View department summary', icon: BarChart3 },
      { id: 'reports', title: 'Reports', subtitle: 'Generate department reports', icon: FileText },
      { id: 'settings', title: 'Settings', subtitle: 'Department preferences', icon: Settings }
    ];
  };

  const actions = getDepartmentActions(userRole);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className={`bg-gradient-to-r ${roleInfo.color} pt-12 pb-6 px-6`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">{roleInfo.title}</h1>
            <p className="text-white/90">{roleInfo.subtitle} • ID: {user.mobile}</p>
          </div>
          <button
            onClick={onLogout}
            aria-label="Logout from department portal"
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <LogOut className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Input
            placeholder={`Search ${roleInfo.title.toLowerCase()} data...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search className="w-5 h-5 text-gray-400" />}
            className="bg-white/95 backdrop-blur-sm border-0 shadow-lg"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <Filter className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Department Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Department Actions</h3>
            <p className="text-gray-600">{roleInfo.description}</p>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {actions.map((action) => (
                <Button
                  key={action.id}
                  onClick={() => console.log(`Navigate to ${action.id}`)}
                  variant="outline"
                  size="lg"
                  className="w-full justify-start h-16"
                >
                  <action.icon className="w-6 h-6 mr-3" />
                  <div className="text-left">
                    <p className="font-semibold">{action.title}</p>
                    <p className="text-sm opacity-70">{action.subtitle}</p>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Task completed successfully</p>
                <p className="text-sm text-gray-600">Department operation completed without issues</p>
              </div>
              <span className="text-xs text-gray-500">2 hours ago</span>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Report generated</p>
                <p className="text-sm text-gray-600">Monthly department report has been created</p>
              </div>
              <span className="text-xs text-gray-500">1 day ago</span>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Team meeting scheduled</p>
                <p className="text-sm text-gray-600">Weekly department sync meeting arranged</p>
              </div>
              <span className="text-xs text-gray-500">3 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { DepartmentDashboard };