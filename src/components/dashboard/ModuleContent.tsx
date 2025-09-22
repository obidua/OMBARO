import React from 'react';
import { BarChart3, Users, DollarSign, FileText, TrendingUp, AlertTriangle, CheckCircle, Clock, Star, Package, Calendar, Shield, Database, MessageSquare } from 'lucide-react';
import { Button } from '../ui/Button';
import { UserRole } from '../../types/auth';
import { ROLE_DEFINITIONS } from '../../types/roles';

interface ModuleContentProps {
  userRole: UserRole;
  activeModule: string;
  user: any;
}

export const ModuleContent: React.FC<ModuleContentProps> = ({
  userRole,
  activeModule,
  user
}) => {
  const roleDefinition = ROLE_DEFINITIONS.find(role => role.id === userRole);

  const getModuleStats = (moduleId: string, role: UserRole) => {
    const statsMap: { [key: string]: { [key: string]: any[] } } = {
      financial_management: {
        accounts_department: [
          { label: 'Monthly Revenue', value: '₹8.4L', icon: DollarSign, color: 'bg-green-100 text-green-600', change: '+12% this month' },
          { label: 'Pending Invoices', value: '23', icon: FileText, color: 'bg-yellow-100 text-yellow-600', change: '5 overdue' },
          { label: 'Processed Payments', value: '156', icon: CheckCircle, color: 'bg-blue-100 text-blue-600', change: '+8 today' },
          { label: 'Account Balance', value: '₹2.1L', icon: TrendingUp, color: 'bg-purple-100 text-purple-600', change: '+5% growth' }
        ],
        finance_department: [
          { label: 'Budget Allocated', value: '₹15L', icon: DollarSign, color: 'bg-blue-100 text-blue-600', change: '85% utilized' },
          { label: 'ROI Analysis', value: '24%', icon: TrendingUp, color: 'bg-green-100 text-green-600', change: '+3% this quarter' },
          { label: 'Cost Centers', value: '8', icon: BarChart3, color: 'bg-purple-100 text-purple-600', change: '2 new added' },
          { label: 'Financial Reports', value: '45', icon: FileText, color: 'bg-yellow-100 text-yellow-600', change: '12 pending review' }
        ],
        ca_cs: [
          { label: 'Audit Reports', value: '12', icon: FileText, color: 'bg-blue-100 text-blue-600', change: '3 pending' },
          { label: 'Compliance Score', value: '98%', icon: Shield, color: 'bg-green-100 text-green-600', change: '+2% improvement' },
          { label: 'Tax Filings', value: '24', icon: Calendar, color: 'bg-yellow-100 text-yellow-600', change: '2 due this month' },
          { label: 'Financial Health', value: 'A+', icon: TrendingUp, color: 'bg-purple-100 text-purple-600', change: 'Excellent rating' }
        ]
      },
      marketing: {
        marketing_department: [
          { label: 'Active Campaigns', value: '12', icon: TrendingUp, color: 'bg-pink-100 text-pink-600', change: '3 new this week' },
          { label: 'Lead Generation', value: '234', icon: Users, color: 'bg-blue-100 text-blue-600', change: '+18% this month' },
          { label: 'Conversion Rate', value: '12.5%', icon: BarChart3, color: 'bg-green-100 text-green-600', change: '+2.3% improvement' },
          { label: 'Social Reach', value: '45K', icon: Star, color: 'bg-purple-100 text-purple-600', change: '+5K followers' }
        ],
        customer_data: [
          { label: 'Total Customers', value: '2,847', icon: Users, color: 'bg-blue-100 text-blue-600', change: '+234 this month' },
          { label: 'Active Users', value: '1,456', icon: CheckCircle, color: 'bg-green-100 text-green-600', change: '89% retention' },
          { label: 'Customer Segments', value: '8', icon: Database, color: 'bg-purple-100 text-purple-600', change: '2 new segments' },
          { label: 'Data Quality', value: '94%', icon: Star, color: 'bg-yellow-100 text-yellow-600', change: '+3% improvement' }
        ]
      },
      customer_support: {
        customer_care: [
          { label: 'Active Tickets', value: '34', icon: MessageSquare, color: 'bg-emerald-100 text-emerald-600', change: '8 urgent' },
          { label: 'Resolved Today', value: '28', icon: CheckCircle, color: 'bg-green-100 text-green-600', change: '95% satisfaction' },
          { label: 'Avg Response Time', value: '2.3h', icon: Clock, color: 'bg-blue-100 text-blue-600', change: '-30min improvement' },
          { label: 'Customer Rating', value: '4.8', icon: Star, color: 'bg-yellow-100 text-yellow-600', change: '+0.2 this month' }
        ]
      },
      hr_management: {
        hr_department: [
          { label: 'Total Employees', value: '156', icon: Users, color: 'bg-purple-100 text-purple-600', change: '+12 this month' },
          { label: 'Attendance Rate', value: '94%', icon: CheckCircle, color: 'bg-green-100 text-green-600', change: '+2% improvement' },
          { label: 'Open Positions', value: '8', icon: AlertTriangle, color: 'bg-yellow-100 text-yellow-600', change: '3 urgent' },
          { label: 'Employee Satisfaction', value: '4.6', icon: Star, color: 'bg-blue-100 text-blue-600', change: '+0.3 this quarter' }
        ],
        staff_department: [
          { label: 'Active Staff', value: '89', icon: Users, color: 'bg-orange-100 text-orange-600', change: '+5 this week' },
          { label: 'Scheduled Shifts', value: '234', icon: Calendar, color: 'bg-blue-100 text-blue-600', change: '12 pending' },
          { label: 'Overtime Hours', value: '45', icon: Clock, color: 'bg-yellow-100 text-yellow-600', change: '-8 hours' },
          { label: 'Staff Efficiency', value: '92%', icon: TrendingUp, color: 'bg-green-100 text-green-600', change: '+3% improvement' }
        ]
      },
      operations: {
        fo_department: [
          { label: 'Daily Visitors', value: '145', icon: Users, color: 'bg-yellow-100 text-yellow-600', change: '+23 today' },
          { label: 'Active Bookings', value: '67', icon: Calendar, color: 'bg-blue-100 text-blue-600', change: '12 pending' },
          { label: 'Customer Satisfaction', value: '4.7', icon: Star, color: 'bg-green-100 text-green-600', change: '+0.2 this week' },
          { label: 'Front Desk Efficiency', value: '96%', icon: TrendingUp, color: 'bg-purple-100 text-purple-600', change: '+4% improvement' }
        ]
      },
      system_admin: {
        super_admin: [
          { label: 'Total Users', value: '2,847', icon: Users, color: 'bg-blue-100 text-blue-600', change: '+234 this month' },
          { label: 'System Health', value: '99.9%', icon: Shield, color: 'bg-green-100 text-green-600', change: 'Excellent uptime' },
          { label: 'Active Sessions', value: '456', icon: Clock, color: 'bg-purple-100 text-purple-600', change: 'Peak: 678' },
          { label: 'Security Score', value: 'A+', icon: CheckCircle, color: 'bg-yellow-100 text-yellow-600', change: 'No threats detected' }
        ],
        it_department: [
          { label: 'System Uptime', value: '99.8%', icon: Shield, color: 'bg-green-100 text-green-600', change: '24/7 monitoring' },
          { label: 'Active Servers', value: '12', icon: Database, color: 'bg-blue-100 text-blue-600', change: 'All operational' },
          { label: 'Support Tickets', value: '18', icon: MessageSquare, color: 'bg-yellow-100 text-yellow-600', change: '5 critical' },
          { label: 'Security Patches', value: '8', icon: CheckCircle, color: 'bg-purple-100 text-purple-600', change: 'Up to date' }
        ]
      }
    };

    const moduleStats = statsMap[activeModule]?.[role] || [];
    return moduleStats;
  };

  const getModuleActions = (moduleId: string, role: UserRole) => {
    const actionsMap: { [key: string]: { [key: string]: any[] } } = {
      financial_management: {
        accounts_department: [
          { id: 'create_invoice', title: 'Create Invoice', subtitle: 'Generate new customer invoice', icon: FileText },
          { id: 'process_payment', title: 'Process Payment', subtitle: 'Handle payment transactions', icon: DollarSign },
          { id: 'reconcile_accounts', title: 'Reconcile Accounts', subtitle: 'Match bank statements', icon: CheckCircle },
          { id: 'generate_reports', title: 'Financial Reports', subtitle: 'Generate accounting reports', icon: BarChart3 }
        ],
        finance_department: [
          { id: 'budget_planning', title: 'Budget Planning', subtitle: 'Create and manage budgets', icon: DollarSign },
          { id: 'financial_analysis', title: 'Financial Analysis', subtitle: 'Analyze financial performance', icon: TrendingUp },
          { id: 'investment_review', title: 'Investment Review', subtitle: 'Review investment opportunities', icon: BarChart3 },
          { id: 'cost_optimization', title: 'Cost Optimization', subtitle: 'Identify cost-saving opportunities', icon: Package }
        ]
      },
      marketing: {
        marketing_department: [
          { id: 'create_campaign', title: 'Create Campaign', subtitle: 'Launch new marketing campaign', icon: TrendingUp },
          { id: 'analyze_performance', title: 'Campaign Analytics', subtitle: 'Track campaign performance', icon: BarChart3 },
          { id: 'manage_content', title: 'Content Management', subtitle: 'Create and manage content', icon: FileText },
          { id: 'social_media', title: 'Social Media', subtitle: 'Manage social presence', icon: Star }
        ]
      },
      customer_support: {
        customer_care: [
          { id: 'view_tickets', title: 'Support Tickets', subtitle: 'Manage customer inquiries', icon: MessageSquare },
          { id: 'live_chat', title: 'Live Chat', subtitle: 'Real-time customer support', icon: Users },
          { id: 'feedback_review', title: 'Customer Feedback', subtitle: 'Review and respond to feedback', icon: Star },
          { id: 'escalate_issues', title: 'Escalate Issues', subtitle: 'Handle complex problems', icon: AlertTriangle }
        ]
      },
      hr_management: {
        hr_department: [
          { id: 'employee_records', title: 'Employee Records', subtitle: 'Manage employee information', icon: Users },
          { id: 'recruitment', title: 'Recruitment', subtitle: 'Hire new employees', icon: Users },
          { id: 'payroll', title: 'Payroll Management', subtitle: 'Process employee salaries', icon: DollarSign },
          { id: 'performance_review', title: 'Performance Reviews', subtitle: 'Conduct employee evaluations', icon: TrendingUp }
        ],
        staff_department: [
          { id: 'schedule_staff', title: 'Staff Scheduling', subtitle: 'Create work schedules', icon: Calendar },
          { id: 'track_attendance', title: 'Attendance Tracking', subtitle: 'Monitor staff attendance', icon: Clock },
          { id: 'manage_leaves', title: 'Leave Management', subtitle: 'Approve leave requests', icon: Calendar },
          { id: 'staff_reports', title: 'Staff Reports', subtitle: 'Generate staff reports', icon: FileText }
        ]
      },
      system_admin: {
        super_admin: [
          { id: 'user_management', title: 'User Management', subtitle: 'Manage all system users', icon: Users },
          { id: 'role_management', title: 'Role Management', subtitle: 'Create and assign roles', icon: Shield },
          { id: 'system_settings', title: 'System Settings', subtitle: 'Configure system parameters', icon: Package },
          { id: 'security_center', title: 'Security Center', subtitle: 'Monitor system security', icon: Shield },
          { id: 'analytics_dashboard', title: 'System Analytics', subtitle: 'Platform-wide analytics', icon: BarChart3 },
          { id: 'data_management', title: 'Data Management', subtitle: 'Backup and recovery', icon: Database }
        ]
      }
    };

    return actionsMap[moduleId]?.[role] || [];
  };

  const stats = getModuleStats(activeModule, userRole);
  const actions = getModuleActions(activeModule, userRole);

  const getRecentActivity = (role: UserRole) => {
    const activityMap: { [key: string]: any[] } = {
      accounts_department: [
        { id: 1, type: 'Invoice Created', description: 'Invoice #INV-2025-001 created for Serenity Spa', time: '2 hours ago', status: 'success' },
        { id: 2, type: 'Payment Processed', description: 'Payment of ₹25,000 processed successfully', time: '4 hours ago', status: 'success' },
        { id: 3, type: 'Account Reconciled', description: 'Bank account reconciliation completed', time: '1 day ago', status: 'success' }
      ],
      marketing_department: [
        { id: 1, type: 'Campaign Launched', description: 'New Year Wellness campaign went live', time: '1 hour ago', status: 'success' },
        { id: 2, type: 'Content Published', description: 'Blog post about spa benefits published', time: '3 hours ago', status: 'success' },
        { id: 3, type: 'Analytics Report', description: 'Monthly marketing report generated', time: '1 day ago', status: 'info' }
      ],
      customer_care: [
        { id: 1, type: 'Ticket Resolved', description: 'Customer complaint about booking resolved', time: '30 min ago', status: 'success' },
        { id: 2, type: 'Escalation Handled', description: 'High-priority issue escalated to manager', time: '2 hours ago', status: 'warning' },
        { id: 3, type: 'Feedback Received', description: 'Positive feedback from customer survey', time: '4 hours ago', status: 'success' }
      ],
      hr_department: [
        { id: 1, type: 'Employee Onboarded', description: 'New therapist Priya Sharma joined', time: '1 hour ago', status: 'success' },
        { id: 2, type: 'Leave Approved', description: 'Casual leave approved for Rahul Kumar', time: '3 hours ago', status: 'info' },
        { id: 3, type: 'Performance Review', description: 'Quarterly review completed for 5 employees', time: '1 day ago', status: 'success' }
      ],
      super_admin: [
        { id: 1, type: 'System Backup', description: 'Daily system backup completed successfully', time: '1 hour ago', status: 'success' },
        { id: 2, type: 'Security Scan', description: 'Weekly security scan - no threats detected', time: '2 hours ago', status: 'success' },
        { id: 3, type: 'User Role Updated', description: 'New role assigned to marketing team member', time: '4 hours ago', status: 'info' }
      ]
    };

    return activityMap[role] || [];
  };

  const recentActivity = getRecentActivity(userRole);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-700';
      case 'warning': return 'bg-yellow-100 text-yellow-700';
      case 'error': return 'bg-red-100 text-red-700';
      case 'info': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (!activeModule || activeModule === 'overview') {
    return (
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome to {roleDefinition?.name}
          </h2>
          <p className="text-gray-600">{roleDefinition?.description}</p>
        </div>

        {/* Quick Stats */}
        {stats.length > 0 && (
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
        )}

        {/* Quick Actions */}
        {actions.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {actions.map((action) => (
                <Button
                  key={action.id}
                  onClick={() => console.log(`Action: ${action.id}`)}
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
        )}

        {/* Recent Activity */}
        {recentActivity.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusColor(activity.status)}`}>
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.type}</p>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Module-specific content
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {activeModule.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} Module
        </h2>
        <p className="text-gray-600">Module-specific functionality and data</p>
      </div>

      {/* Module Stats */}
      {stats.length > 0 && (
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
      )}

      {/* Module Actions */}
      {actions.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {actions.map((action) => (
              <Button
                key={action.id}
                onClick={() => console.log(`Module Action: ${action.id}`)}
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
      )}
    </div>
  );
};