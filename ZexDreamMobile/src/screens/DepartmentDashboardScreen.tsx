```typescript
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';
import { colors, spacing, typography, borderRadius, shadows } from '../constants/theme';
import { UserRole } from '../types/auth';
import { ROLE_DEFINITIONS, MODULES, Module, SubModule } from '../types/roles';

// Import icons (using emojis for simplicity, replace with actual icon components if available)
import {
  Users, Building, DollarSign, Scale, HeadphonesIcon, UserCheck, List, Database, Briefcase, Monitor, Crown, MapPin, Gavel, Calculator, UserCog, Heart,
  LogOut, Menu, X, Bell, Search, Filter, ChevronDown, ChevronRight, BarChart3, FileText, TrendingUp, AlertTriangle, CheckCircle, Clock, Package, Calendar, Shield, MessageSquare,
} from 'lucide-react-native';

type DepartmentDashboardScreenNavigationProp = StackNavigationProp<any, 'DepartmentDashboard'>;

interface Props {
  navigation: DepartmentDashboardScreenNavigationProp;
}

// Helper to get Lucide icon component
const getLucideIcon = (iconName: string, size: number = 24, color: string = colors.gray[700]) => {
  const IconComponent = {
    Users, Building, DollarSign, Scale, HeadphonesIcon, UserCheck, List, Database, Briefcase, Monitor, Crown, MapPin, Gavel, Calculator, UserCog, Heart,
    LogOut, Menu, X, Bell, Search, Filter, ChevronDown, ChevronRight, BarChart3, FileText, TrendingUp, AlertTriangle, CheckCircle, Clock, Package, Calendar, Shield, MessageSquare,
  }[iconName];
  return IconComponent ? <IconComponent size={size} color={color} /> : <Text style={{ fontSize: size, color }}>?</Text>;
};

// --- ModuleContent Component (Ported from Web) ---
interface ModuleContentProps {
  userRole: UserRole;
  activeModule: string;
  user: any;
}

const ModuleContent: React.FC<ModuleContentProps> = ({
  userRole,
  activeModule,
  user
}) => {
  const roleDefinition = ROLE_DEFINITIONS.find(role => role.id === userRole);

  const getModuleStats = (moduleId: string, role: UserRole) => {
    const statsMap: { [key: string]: { [key: string]: any[] } } = {
      financial_management: {
        accounts_department: [
          { label: 'Monthly Revenue', value: '₹8.4L', icon: DollarSign, color: colors.success[100], textColor: colors.success[600], change: '+12% this month' },
          { label: 'Pending Invoices', value: '23', icon: FileText, color: colors.warning[100], textColor: colors.warning[600], change: '5 overdue' },
          { label: 'Processed Payments', value: '156', icon: CheckCircle, color: colors.primary[100], textColor: colors.primary[600], change: '+8 today' },
          { label: 'Account Balance', value: '₹2.1L', icon: TrendingUp, color: colors.secondary[100], textColor: colors.secondary[600], change: '+5% growth' }
        ],
        finance_department: [
          { label: 'Budget Allocated', value: '₹15L', icon: DollarSign, color: colors.primary[100], textColor: colors.primary[600], change: '85% utilized' },
          { label: 'ROI Analysis', value: '24%', icon: TrendingUp, color: colors.success[100], textColor: colors.success[600], change: '+3% this quarter' },
          { label: 'Cost Centers', value: '8', icon: BarChart3, color: colors.secondary[100], textColor: colors.secondary[600], change: '2 new added' },
          { label: 'Financial Reports', value: '45', icon: FileText, color: colors.warning[100], textColor: colors.warning[600], change: '12 pending review' }
        ],
        ca_cs: [
          { label: 'Audit Reports', value: '12', icon: FileText, color: colors.primary[100], textColor: colors.primary[600], change: '3 pending' },
          { label: 'Compliance Score', value: '98%', icon: Shield, color: colors.success[100], textColor: colors.success[600], change: '+2% improvement' },
          { label: 'Tax Filings', value: '24', icon: Calendar, color: colors.warning[100], textColor: colors.warning[600], change: '2 due this month' },
          { label: 'Financial Health', value: 'A+', icon: TrendingUp, color: colors.secondary[100], textColor: colors.secondary[600], change: 'Excellent rating' }
        ]
      },
      marketing: {
        marketing_department: [
          { label: 'Active Campaigns', value: '12', icon: TrendingUp, color: colors.secondary[100], textColor: colors.secondary[600], change: '3 new this week' },
          { label: 'Lead Generation', value: '234', icon: Users, color: colors.primary[100], textColor: colors.primary[600], change: '+18% this month' },
          { label: 'Conversion Rate', value: '12.5%', icon: BarChart3, color: colors.success[100], textColor: colors.success[600], change: '+2.3% improvement' },
          { label: 'Social Reach', value: '45K', icon: Star, color: colors.warning[100], textColor: colors.warning[600], change: '+5K followers' }
        ],
        customer_data: [
          { label: 'Total Customers', value: '2,847', icon: Users, color: colors.primary[100], textColor: colors.primary[600], change: '+234 this month' },
          { label: 'Active Users', value: '1,456', icon: CheckCircle, color: colors.success[100], textColor: colors.success[600], change: '89% retention' },
          { label: 'Customer Segments', value: '8', icon: Database, color: colors.secondary[100], textColor: colors.secondary[600], change: '2 new segments' },
          { label: 'Data Quality', value: '94%', icon: Star, color: colors.warning[100], textColor: colors.warning[600], change: '+3% improvement' }
        ]
      },
      customer_support: {
        customer_care: [
          { label: 'Active Tickets', value: '34', icon: MessageSquare, color: colors.success[100], textColor: colors.success[600], change: '8 urgent' },
          { label: 'Resolved Today', value: '28', icon: CheckCircle, color: colors.success[100], textColor: colors.success[600], change: '95% satisfaction' },
          { label: 'Avg Response Time', value: '2.3h', icon: Clock, color: colors.primary[100], textColor: colors.primary[600], change: '-30min improvement' },
          { label: 'Customer Rating', value: '4.8', icon: Star, color: colors.warning[100], textColor: colors.warning[600], change: '+0.2 this month' }
        ]
      },
      hr_management: {
        hr_department: [
          { label: 'Total Employees', value: '156', icon: Users, color: colors.secondary[100], textColor: colors.secondary[600], change: '+12 this month' },
          { label: 'Attendance Rate', value: '94%', icon: CheckCircle, color: colors.success[100], textColor: colors.success[600], change: '+2% improvement' },
          { label: 'Open Positions', value: '8', icon: AlertTriangle, color: colors.warning[100], textColor: colors.warning[600], change: '3 urgent' },
          { label: 'Employee Satisfaction', value: '4.6', icon: Star, color: colors.primary[100], textColor: colors.primary[600], change: '+0.3 this quarter' }
        ],
        staff_department: [
          { label: 'Active Staff', value: '89', icon: Users, color: colors.warning[100], textColor: colors.warning[600], change: '+5 this week' },
          { label: 'Scheduled Shifts', value: '234', icon: Calendar, color: colors.primary[100], textColor: colors.primary[600], change: '12 pending' },
          { label: 'Overtime Hours', value: '45', icon: Clock, color: colors.warning[100], textColor: colors.warning[600], change: '-8 hours' },
          { label: 'Staff Efficiency', value: '92%', icon: TrendingUp, color: colors.success[100], textColor: colors.success[600], change: '+3% improvement' }
        ]
      },
      operations: {
        fo_department: [
          { label: 'Daily Visitors', value: '145', icon: Users, color: colors.warning[100], textColor: colors.warning[600], change: '+23 today' },
          { label: 'Active Bookings', value: '67', icon: Calendar, color: colors.primary[100], textColor: colors.primary[600], change: '12 pending' },
          { label: 'Customer Satisfaction', value: '4.7', icon: Star, color: colors.success[100], textColor: colors.success[600], change: '+0.2 this week' },
          { label: 'Front Desk Efficiency', value: '96%', icon: TrendingUp, color: colors.secondary[100], textColor: colors.secondary[600], change: '+4% improvement' }
        ]
      },
      system_admin: {
        super_admin: [
          { label: 'Total Users', value: '2,847', icon: Users, color: colors.primary[100], textColor: colors.primary[600], change: '+234 this month' },
          { label: 'System Health', value: '99.9%', icon: Shield, color: colors.success[100], textColor: colors.success[600], change: 'Excellent uptime' },
          { label: 'Active Sessions', value: '456', icon: Clock, color: colors.secondary[100], textColor: colors.secondary[600], change: 'Peak: 678' },
          { label: 'Security Score', value: 'A+', icon: CheckCircle, color: colors.warning[100], textColor: colors.warning[600], change: 'No threats detected' }
        ],
        it_department: [
          { label: 'System Uptime', value: '99.8%', icon: Shield, color: colors.success[100], textColor: colors.success[600], change: '24/7 monitoring' },
          { label: 'Active Servers', value: '12', icon: Database, color: colors.primary[100], textColor: colors.primary[600], change: 'All operational' },
          { label: 'Support Tickets', value: '18', icon: MessageSquare, color: colors.warning[100], textColor: colors.warning[600], change: '5 critical' },
          { label: 'Security Patches', value: '8', icon: CheckCircle, color: colors.secondary[100], textColor: colors.secondary[600], change: 'Up to date' }
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
        { id: '1', type: 'Invoice Created', description: 'Invoice #INV-2025-001 created for Serenity Spa', time: '2 hours ago', status: 'success' },
        { id: '2', type: 'Payment Processed', description: 'Payment of ₹25,000 processed successfully', time: '4 hours ago', status: 'success' },
        { id: '3', type: 'Account Reconciled', description: 'Bank account reconciliation completed', time: '1 day ago', status: 'success' }
      ],
      marketing_department: [
        { id: '1', type: 'Campaign Launched', description: 'New Year Wellness campaign went live', time: '1 hour ago', status: 'success' },
        { id: '2', type: 'Content Published', description: 'Blog post about spa benefits published', time: '3 hours ago', status: 'success' },
        { id: '3', type: 'Analytics Report', description: 'Monthly marketing report generated', time: '1 day ago', status: 'info' }
      ],
      customer_care: [
        { id: '1', type: 'Ticket Resolved', description: 'Customer complaint about booking resolved', time: '30 min ago', status: 'success' },
        { id: '2', type: 'Escalation Handled', description: 'High-priority issue escalated to manager', time: '2 hours ago', status: 'warning' },
        { id: '3', type: 'Feedback Received', description: 'Positive feedback from customer survey', time: '4 hours ago', status: 'success' }
      ],
      hr_department: [
        { id: '1', type: 'Employee Onboarded', description: 'New therapist Priya Sharma joined', time: '1 hour ago', status: 'success' },
        { id: '2', type: 'Leave Approved', description: 'Casual leave approved for Rahul Kumar', time: '3 hours ago', status: 'info' },
        { id: '3', type: 'Performance Review', description: 'Quarterly review completed for 5 employees', time: '1 day ago', status: 'success' }
      ],
      super_admin: [
        { id: '1', type: 'System Backup', description: 'Daily system backup completed successfully', time: '1 hour ago', status: 'success' },
        { id: '2', type: 'Security Scan', description: 'Weekly security scan - no threats detected', time: '2 hours ago', status: 'success' },
        { id: '3', type: 'User Role Updated', description: 'New role assigned to marketing team member', time: '4 hours ago', status: 'info' }
      ]
    };

    return activityMap[role] || [];
  };

  const recentActivity = getRecentActivity(userRole);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return { backgroundColor: colors.success[100], color: colors.success[700] };
      case 'warning': return { backgroundColor: colors.warning[100], color: colors.warning[700] };
      case 'error': return { backgroundColor: colors.error[100], color: colors.error[700] };
      case 'info': return { backgroundColor: colors.primary[100], color: colors.primary[700] };
      default: return { backgroundColor: colors.gray[100], color: colors.gray[700] };
    }
  };

  if (!activeModule || activeModule === 'overview') {
    return (
      <ScrollView style={styles.moduleContentScrollView}>
        <View style={styles.moduleContentContainer}>
          {/* Welcome Section */}
          <View style={styles.card}>
            <Text style={styles.cardTitleLarge}>
              Welcome to {roleDefinition?.name}
            </Text>
            <Text style={styles.cardDescription}>{roleDefinition?.description}</Text>
          </View>

          {/* Quick Stats */}
          {stats.length > 0 && (
            <View style={styles.statsGrid}>
              {stats.map((stat, index) => (
                <View key={index} style={styles.statCard}>
                  <View style={[styles.statIconContainer, { backgroundColor: stat.color }]}>
                    {getLucideIcon(stat.icon.name, 24, stat.textColor)}
                  </View>
                  <View style={styles.statTextContent}>
                    <Text style={styles.statValue}>{stat.value}</Text>
                    <Text style={styles.statLabel}>{stat.label}</Text>
                  </View>
                  <Text style={styles.statChange}>{stat.change}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Quick Actions */}
          {actions.length > 0 && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Quick Actions</Text>
              <View style={styles.actionsGrid}>
                {actions.map((action) => (
                  <TouchableOpacity
                    key={action.id}
                    style={styles.actionButton}
                    onPress={() => console.log(`Action: ${action.id}`)}
                  >
                    {getLucideIcon(action.icon.name, 24, colors.primary[600])}
                    <View style={styles.actionButtonTextContent}>
                      <Text style={styles.actionButtonTitle}>{action.title}</Text>
                      <Text style={styles.actionButtonSubtitle}>{action.subtitle}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Recent Activity */}
          {recentActivity.length > 0 && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Recent Activity</Text>
              <View style={styles.activityList}>
                {recentActivity.map((activity) => (
                  <View key={activity.id} style={styles.activityItem}>
                    <View style={[styles.activityIconContainer, getStatusColor(activity.status)]}>
                      {getLucideIcon('CheckCircle', 20, getStatusColor(activity.status).color)}
                    </View>
                    <View style={styles.activityTextContent}>
                      <Text style={styles.activityTitle}>{activity.type}</Text>
                      <Text style={styles.activityDescription}>{activity.description}</Text>
                    </View>
                    <Text style={styles.activityTime}>{activity.time}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    );
  }

  // Module-specific content
  return (
    <ScrollView style={styles.moduleContentScrollView}>
      <View style={styles.moduleContentContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitleLarge}>
            {MODULES.find(m => m.id === activeModule)?.name || 'Module'}
          </Text>
          <Text style={styles.cardDescription}>
            {MODULES.find(m => m.id === activeModule)?.description || 'Module-specific functionality and data'}
          </Text>
        </View>

        {/* Module Stats */}
        {stats.length > 0 && (
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <View style={[styles.statIconContainer, { backgroundColor: stat.color }]}>
                  {getLucideIcon(stat.icon.name, 24, stat.textColor)}
                </View>
                <View style={styles.statTextContent}>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
                <Text style={styles.statChange}>{stat.change}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Module Actions */}
        {actions.length > 0 && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Available Actions</Text>
            <View style={styles.actionsGrid}>
              {actions.map((action) => (
                <TouchableOpacity
                  key={action.id}
                  style={styles.actionButton}
                  onPress={() => console.log(`Module Action: ${action.id}`)}
                >
                  {getLucideIcon(action.icon.name, 24, colors.primary[600])}
                  <View style={styles.actionButtonTextContent}>
                    <Text style={styles.actionButtonTitle}>{action.title}</Text>
                    <Text style={styles.actionButtonSubtitle}>{action.subtitle}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

// --- ReportingSystem Component (Ported from Web) ---
interface ReportingSystemProps {
  userRole: UserRole;
  user: any;
}

const ReportingSystem: React.FC<ReportingSystemProps> = ({
  userRole,
  user
}) => {
  const [selectedReportType, setSelectedReportType] = useState<string>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('monthly'); // Not used in mock, but kept for UI

  const roleDefinition = ROLE_DEFINITIONS.find(role => role.id === userRole);
  const reportingHierarchy = ROLE_DEFINITIONS.find(hierarchy => hierarchy.id === userRole); // Using ROLE_DEFINITIONS for simplicity

  // Mock reports data based on role
  const getAvailableReports = (role: UserRole): any[] => {
    const baseReports = [
      {
        id: 'financial_summary',
        title: 'Financial Summary Report',
        description: 'Comprehensive financial overview with revenue, expenses, and profit analysis',
        type: 'financial',
        frequency: 'monthly',
        lastGenerated: '2025-01-10',
        status: 'current',
        accessLevel: ['finance_department', 'accounts_department', 'directors', 'super_admin'],
        generatedBy: 'Finance Department'
      },
      {
        id: 'customer_analytics',
        title: 'Customer Analytics Report',
        description: 'Customer behavior, acquisition, and retention metrics',
        type: 'marketing',
        frequency: 'weekly',
        lastGenerated: '2025-01-08',
        status: 'current',
        accessLevel: ['marketing_department', 'customer_data', 'directors', 'super_admin'],
        generatedBy: 'Marketing Department'
      },
      {
        id: 'operational_performance',
        title: 'Operational Performance Report',
        description: 'Spa operations, booking rates, and service quality metrics',
        type: 'operational',
        frequency: 'weekly',
        lastGenerated: '2025-01-09',
        status: 'current',
        accessLevel: ['fo_department', 'staff_department', 'directors', 'super_admin'],
        generatedBy: 'Operations Team'
      },
      {
        id: 'hr_dashboard',
        title: 'HR Dashboard Report',
        description: 'Employee metrics, attendance, performance, and satisfaction',
        type: 'hr',
        frequency: 'monthly',
        lastGenerated: '2025-01-05',
        status: 'current',
        accessLevel: ['hr_department', 'staff_department', 'directors', 'super_admin'],
        generatedBy: 'HR Department'
      },
      {
        id: 'legal_compliance',
        title: 'Legal Compliance Report',
        description: 'Regulatory compliance status and legal risk assessment',
        type: 'legal',
        frequency: 'quarterly',
        lastGenerated: '2024-12-31',
        status: 'current',
        accessLevel: ['legal_department', 'advocate', 'ca_cs', 'directors', 'super_admin'],
        generatedBy: 'Legal Department'
      },
      {
        id: 'system_health',
        title: 'System Health Report',
        description: 'IT infrastructure, security, and performance monitoring',
        type: 'system',
        frequency: 'daily',
        lastGenerated: '2025-01-11',
        status: 'current',
        accessLevel: ['it_department', 'super_admin'],
        generatedBy: 'IT Department'
      },
      {
        id: 'vendor_performance',
        title: 'Vendor Performance Report',
        description: 'Vendor ratings, service quality, and partnership metrics',
        type: 'operational',
        frequency: 'monthly',
        lastGenerated: '2025-01-07',
        status: 'current',
        accessLevel: ['vendor_list', 'fo_department', 'directors', 'super_admin'],
        generatedBy: 'Vendor Management'
      },
      {
        id: 'customer_support_metrics',
        title: 'Customer Support Metrics',
        description: 'Support ticket resolution, response times, and satisfaction',
        type: 'operational',
        frequency: 'weekly',
        lastGenerated: '2025-01-09',
        status: 'current',
        accessLevel: ['customer_care', 'fo_department', 'directors', 'super_admin'],
        generatedBy: 'Customer Care'
      }
    ];

    // Filter reports based on role access
    return baseReports.filter(report =>
      report.accessLevel.includes(role) ||
      role === 'super_admin' ||
      (role === 'directors' && report.accessLevel.includes('directors'))
    );
  };

  const availableReports = getAvailableReports(userRole);

  const filteredReports = availableReports.filter(report =>
    selectedReportType === 'all' || report.type === selectedReportType
  );

  const getReportTypeColor = (type: string) => {
    switch (type) {
      case 'financial': return { backgroundColor: colors.success[100], color: colors.success[700] };
      case 'operational': return { backgroundColor: colors.primary[100], color: colors.primary[700] };
      case 'hr': return { backgroundColor: colors.secondary[100], color: colors.secondary[700] };
      case 'marketing': return { backgroundColor: colors.secondary[100], color: colors.secondary[700] };
      case 'legal': return { backgroundColor: colors.error[100], color: colors.error[700] };
      case 'system': return { backgroundColor: colors.primary[100], color: colors.primary[700] };
      default: return { backgroundColor: colors.gray[100], color: colors.gray[700] };
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current': return { backgroundColor: colors.success[100], color: colors.success[700] };
      case 'pending': return { backgroundColor: colors.warning[100], color: colors.warning[700] };
      case 'overdue': return { backgroundColor: colors.error[100], color: colors.error[700] };
      default: return { backgroundColor: colors.gray[100], color: colors.gray[700] };
    }
  };

  return (
    <ScrollView style={styles.moduleContentScrollView}>
      <View style={styles.moduleContentContainer}>
        {/* Header */}
        <View style={styles.card}>
          <View style={styles.reportHeaderControls}>
            <Text style={styles.cardTitleLarge}>Reporting Dashboard</Text>
            <View style={styles.reportFilterControls}>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedReportType}
                  onValueChange={(itemValue) => setSelectedReportType(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="All Reports" value="all" />
                  <Picker.Item label="Financial" value="financial" />
                  <Picker.Item label="Operational" value="operational" />
                  <Picker.Item label="HR" value="hr" />
                  <Picker.Item label="Marketing" value="marketing" />
                  <Picker.Item label="Legal" value="legal" />
                  <Picker.Item label="System" value="system" />
                </Picker>
              </View>
              <TouchableOpacity style={styles.filterButton}>
                {getLucideIcon('Filter', 20, colors.primary[600])}
              </TouchableOpacity>
            </View>
          </View>

          {/* Reporting Hierarchy Info */}
          {reportingHierarchy && (
            <View style={styles.hierarchyCard}>
              <Text style={styles.hierarchyTitle}>Your Reporting Structure</Text>
              <View style={styles.hierarchyGrid}>
                {reportingHierarchy.reportsTo && reportingHierarchy.reportsTo.length > 0 && (
                  <View style={styles.hierarchyItem}>
                    <Text style={styles.hierarchyLabel}>Reports To:</Text>
                    {reportingHierarchy.reportsTo.map(role => (
                      <Text key={role} style={styles.hierarchyValue}>• {ROLE_DEFINITIONS.find(r => r.id === role)?.name}</Text>
                    ))}
                  </View>
                )}
                {reportingHierarchy.canManage && reportingHierarchy.canManage.length > 0 && (
                  <View style={styles.hierarchyItem}>
                    <Text style={styles.hierarchyLabel}>Manages:</Text>
                    {reportingHierarchy.canManage.map(role => (
                      <Text key={role} style={styles.hierarchyValue}>• {ROLE_DEFINITIONS.find(r => r.id === role)?.name || role}</Text>
                    ))}
                  </View>
                )}
                {reportingHierarchy.permissions && reportingHierarchy.permissions.length > 0 && (
                  <View style={styles.hierarchyItem}>
                    <Text style={styles.hierarchyLabel}>Key Permissions:</Text>
                    {reportingHierarchy.permissions.slice(0, 3).map(perm => ( // Show top 3 permissions
                      <Text key={perm} style={styles.hierarchyValue}>• {perm.replace(/_/g, ' ').replace(/:/g, ': ')}</Text>
                    ))}
                    {reportingHierarchy.permissions.length > 3 && (
                      <Text style={styles.hierarchyValue}>...and more</Text>
                    )}
                  </View>
                )}
              </View>
            </View>
          )}
        </View>

        {/* Reports Grid */}
        <View style={styles.reportsGrid}>
          {filteredReports.map((report) => (
            <View key={report.id} style={styles.reportCard}>
              <View style={styles.reportHeader}>
                <View style={styles.reportBadges}>
                  <View style={[styles.reportBadge, getReportTypeColor(report.type)]}>
                    <Text style={[styles.reportBadgeText, { color: getReportTypeColor(report.type).color }]}>
                      {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                    </Text>
                  </View>
                  <View style={[styles.reportBadge, getStatusColor(report.status)]}>
                    <Text style={[styles.reportBadgeText, { color: getStatusColor(report.status).color }]}>
                      {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                    </Text>
                  </View>
                </View>
                <Text style={styles.reportTitle}>{report.title}</Text>
                <Text style={styles.reportDescription}>{report.description}</Text>
                <View style={styles.reportMeta}>
                  <Text style={styles.reportMetaText}>Generated by: {report.generatedBy}</Text>
                  <Text style={styles.reportMetaText}>Last updated: {new Date(report.lastGenerated).toLocaleDateString()}</Text>
                  <Text style={styles.reportMetaText}>Frequency: {report.frequency}</Text>
                </View>
              </View>

              <View style={styles.reportActions}>
                <TouchableOpacity style={styles.reportActionButton}>
                  {getLucideIcon('Eye', 20, colors.primary[600])}
                  <Text style={styles.reportActionButtonText}>View</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.reportActionButton}>
                  {getLucideIcon('Download', 20, colors.primary[600])}
                  <Text style={styles.reportActionButtonText}>Export</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Generate New Report */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Generate Custom Report</Text>
          <View style={styles.generateReportForm}>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedReportType}
                onValueChange={(itemValue) => setSelectedReportType(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Select Report Type" value="" />
                <Picker.Item label="Financial Report" value="financial" />
                <Picker.Item label="Operational Report" value="operational" />
                <Picker.Item label="HR Report" value="hr" />
                <Picker.Item label="Marketing Report" value="marketing" />
              </Picker>
            </View>
            <TextInput
              placeholder="Start Date"
              style={styles.dateInput}
              onFocus={() => console.log('Open date picker')}
            />
            <TextInput
              placeholder="End Date"
              style={styles.dateInput}
              onFocus={() => console.log('Open date picker')}
            />
            <TouchableOpacity style={styles.generateButton}>
              {getLucideIcon('BarChart3', 20, colors.white)}
              <Text style={styles.generateButtonText}>Generate Report</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

// --- Main DepartmentDashboardScreen Component ---
const DepartmentDashboardScreen: React.FC<Props> = ({ navigation }) => {
  const { authState, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeModule, setActiveModule] = useState('overview');
  const [activeView, setActiveView] = useState<'dashboard' | 'reports'>('dashboard');
  const [expandedModules, setExpandedModules] = useState<string[]>([]);

  const userRole = authState.userType!;
  const roleDefinition = ROLE_DEFINITIONS.find(role => role.id === userRole);
  const availableModules = MODULES.filter(module =>
    roleDefinition?.modules.includes(module.id) || roleDefinition?.permissions.includes('*')
  );

  const toggleModuleExpansion = (moduleId: string) => {
    setExpandedModules(prev =>
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const handleSubModuleClick = (subModuleId: string) => {
    setActiveModule(subModuleId);
    setSidebarOpen(false);
  };

  const handleModuleClick = (moduleId: string) => {
    setActiveModule(moduleId);
    setSidebarOpen(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={[roleDefinition?.color || colors.primary[500], colors.primary[700]]}
        style={styles.header}
      >
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setSidebarOpen(true)}
        >
          {getLucideIcon('Menu', 24, colors.white)}
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>{roleDefinition?.name || 'Dashboard'}</Text>
          <Text style={styles.headerSubtitle}>{roleDefinition?.description || 'Departmental Overview'}</Text>
        </View>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={logout}
        >
          {getLucideIcon('LogOut', 24, colors.white)}
        </TouchableOpacity>
      </LinearGradient>

      {/* Main Content Area */}
      <View style={styles.mainContent}>
        {/* View Toggle (Dashboard / Reports) */}
        <View style={styles.viewToggleContainer}>
          <TouchableOpacity
            style={[styles.viewToggleButton, activeView === 'dashboard' && styles.viewToggleButtonActive]}
            onPress={() => setActiveView('dashboard')}
          >
            <Text style={[styles.viewToggleButtonText, activeView === 'dashboard' && styles.viewToggleButtonTextActive]}>Dashboard</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.viewToggleButton, activeView === 'reports' && styles.viewToggleButtonActive]}
            onPress={() => setActiveView('reports')}
          >
            <Text style={[styles.viewToggleButtonText, activeView === 'reports' && styles.viewToggleButtonTextActive]}>Reports</Text>
          </TouchableOpacity>
        </View>

        {/* Render Module Content or Reporting System */}
        {activeView === 'dashboard' ? (
          <ModuleContent userRole={userRole} activeModule={activeModule} user={authState.user} />
        ) : (
          <ReportingSystem userRole={userRole} user={authState.user} />
        )}
      </View>

      {/* Sidebar Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={sidebarOpen}
        onRequestClose={() => setSidebarOpen(false)}
      >
        <View style={styles.sidebarOverlay}>
          <View style={styles.sidebar}>
            {/* Sidebar Header */}
            <LinearGradient
              colors={[roleDefinition?.color || colors.primary[500], colors.primary[700]]}
              style={styles.sidebarHeader}
            >
              <View style={styles.sidebarHeaderContent}>
                <View style={[styles.sidebarIconContainer, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                  {getLucideIcon(roleDefinition?.icon || 'Users', 24, colors.white)}
                </View>
                <View>
                  <Text style={styles.sidebarRoleName}>{roleDefinition?.name}</Text>
                  <Text style={styles.sidebarUserId}>ID: {authState.user.mobile}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => setSidebarOpen(false)} style={styles.sidebarCloseButton}>
                {getLucideIcon('X', 24, colors.white)}
              </TouchableOpacity>
            </LinearGradient>

            {/* Sidebar Navigation */}
            <ScrollView style={styles.sidebarNavScrollView}>
              <View style={styles.sidebarNav}>
                <TouchableOpacity
                  style={[styles.navItem, activeModule === 'overview' && styles.navItemActive]}
                  onPress={() => handleModuleClick('overview')}
                >
                  {getLucideIcon('BarChart3', 24, activeModule === 'overview' ? colors.primary[700] : colors.gray[700])}
                  <Text style={[styles.navItemText, activeModule === 'overview' && styles.navItemTextActive]}>Overview</Text>
                </TouchableOpacity>
                {availableModules.map((module) => {
                  const isExpanded = expandedModules.includes(module.id);
                  const hasSubModules = module.subModules.length > 0;

                  return (
                    <View key={module.id}>
                      <TouchableOpacity
                        style={[styles.navItem, activeModule === module.id && styles.navItemActive]}
                        onPress={() => {
                          if (hasSubModules) {
                            toggleModuleExpansion(module.id);
                          } else {
                            handleModuleClick(module.id);
                          }
                        }}
                      >
                        {getLucideIcon(module.icon, 24, activeModule === module.id ? colors.primary[700] : colors.gray[700])}
                        <Text style={[styles.navItemText, activeModule === module.id && styles.navItemTextActive]}>{module.name}</Text>
                        {hasSubModules && (
                          <View style={styles.chevronIcon}>
                            {isExpanded ? getLucideIcon('ChevronDown', 20, colors.gray[600]) : getLucideIcon('ChevronRight', 20, colors.gray[600])}
                          </View>
                        )}
                      </TouchableOpacity>

                      {hasSubModules && isExpanded && (
                        <View style={styles.subNav}>
                          {module.subModules.map((subModule) => (
                            <TouchableOpacity
                              key={subModule.id}
                              style={[styles.subNavItem, activeModule === subModule.id && styles.subNavItemActive]}
                              onPress={() => handleSubModuleClick(subModule.id)}
                            >
                              {getLucideIcon(subModule.icon, 20, activeModule === subModule.id ? colors.primary[600] : colors.gray[600])}
                              <Text style={[styles.subNavItemText, activeModule === subModule.id && styles.subNavItemTextActive]}>{subModule.name}</Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      )}
                    </View>
                  );
                })}
              </View>
            </ScrollView>

            {/* Sidebar Footer */}
            <View style={styles.sidebarFooter}>
              <TouchableOpacity style={styles.logoutButtonSidebar} onPress={logout}>
                {getLucideIcon('LogOut', 24, colors.error[600])}
                <Text style={styles.logoutButtonSidebarText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    paddingTop: spacing['3xl'], // Adjust for SafeAreaView
  },
  menuButton: {
    padding: spacing.sm,
  },
  headerTitleContainer: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: typography.lg,
    fontWeight: '600',
    color: colors.white,
  },
  headerSubtitle: {
    fontSize: typography.sm,
    color: 'rgba(255,255,255,0.8)',
  },
  logoutButton: {
    padding: spacing.sm,
  },
  mainContent: {
    flex: 1,
    padding: spacing.lg,
  },
  viewToggleContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.xs,
    marginBottom: spacing.lg,
    ...shadows.sm,
  },
  viewToggleButton: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
    borderRadius: borderRadius.lg,
  },
  viewToggleButtonActive: {
    backgroundColor: colors.primary[500],
    ...shadows.sm,
  },
  viewToggleButtonText: {
    fontSize: typography.sm,
    fontWeight: '500',
    color: colors.gray[600],
  },
  viewToggleButtonTextActive: {
    color: colors.white,
  },

  // Module Content Styles
  moduleContentScrollView: {
    flex: 1,
  },
  moduleContentContainer: {
    paddingBottom: spacing.lg, // Add padding for scrollable content
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.sm,
  },
  cardTitleLarge: {
    fontSize: typography.xl,
    fontWeight: 'bold',
    color: colors.gray[900],
    marginBottom: spacing.sm,
  },
  cardTitle: {
    fontSize: typography.lg,
    fontWeight: '600',
    color: colors.gray[900],
    marginBottom: spacing.lg,
  },
  cardDescription: {
    fontSize: typography.base,
    color: colors.gray[600],
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  statCard: {
    width: '48%', // Adjust for spacing
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.gray[100],
    ...shadows.sm,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  statTextContent: {
    marginBottom: spacing.xs,
  },
  statValue: {
    fontSize: typography['2xl'],
    fontWeight: 'bold',
    color: colors.gray[900],
  },
  statLabel: {
    fontSize: typography.sm,
    color: colors.gray[600],
  },
  statChange: {
    fontSize: typography.xs,
    color: colors.gray[500],
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%', // Adjust for spacing
    backgroundColor: colors.gray[50],
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.gray[100],
    alignItems: 'flex-start',
  },
  actionButtonTextContent: {
    marginTop: spacing.sm,
  },
  actionButtonTitle: {
    fontSize: typography.base,
    fontWeight: '600',
    color: colors.gray[900],
  },
  actionButtonSubtitle: {
    fontSize: typography.sm,
    color: colors.gray[600],
  },
  activityList: {},
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
  },
  activityIconContainer: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  activityTextContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: typography.base,
    fontWeight: '500',
    color: colors.gray[900],
  },
  activityDescription: {
    fontSize: typography.sm,
    color: colors.gray[600],
  },
  activityTime: {
    fontSize: typography.xs,
    color: colors.gray[500],
  },

  // Reporting System Styles
  reportHeaderControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  pickerContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginRight: spacing.sm,
  },
  picker: {
    height: 40,
    width: '100%',
    color: colors.gray[700],
  },
  filterButton: {
    padding: spacing.sm,
    backgroundColor: colors.gray[100],
    borderRadius: borderRadius.lg,
  },
  hierarchyCard: {
    backgroundColor: colors.primary[50],
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.primary[200],
    marginBottom: spacing.lg,
  },
  hierarchyTitle: {
    fontSize: typography.base,
    fontWeight: '600',
    color: colors.primary[900],
    marginBottom: spacing.md,
  },
  hierarchyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  hierarchyItem: {
    width: '48%',
    marginBottom: spacing.sm,
  },
  hierarchyLabel: {
    fontSize: typography.sm,
    color: colors.primary[700],
    fontWeight: '500',
  },
  hierarchyValue: {
    fontSize: typography.sm,
    color: colors.primary[800],
  },
  reportsGrid: {
    marginBottom: spacing.lg,
  },
  reportCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.gray[100],
    ...shadows.sm,
  },
  reportHeader: {
    marginBottom: spacing.md,
  },
  reportBadges: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  reportBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
    marginRight: spacing.xs,
  },
  reportBadgeText: {
    fontSize: typography.xs,
    fontWeight: '600',
  },
  reportTitle: {
    fontSize: typography.base,
    fontWeight: '600',
    color: colors.gray[900],
    marginBottom: spacing.xs,
  },
  reportDescription: {
    fontSize: typography.sm,
    color: colors.gray[600],
    marginBottom: spacing.sm,
  },
  reportMeta: {},
  reportMetaText: {
    fontSize: typography.xs,
    color: colors.gray[500],
  },
  reportActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reportActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.primary[200],
  },
  reportActionButtonText: {
    fontSize: typography.sm,
    color: colors.primary[600],
    marginLeft: spacing.xs,
  },
  generateReportForm: {
    // Styles for form elements
  },
  dateInput: {
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary[500],
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
  },
  generateButtonText: {
    color: colors.white,
    fontSize: typography.base,
    fontWeight: '600',
    marginLeft: spacing.xs,
  },

  // Sidebar Styles
  sidebarOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  sidebar: {
    width: '80%', // Adjust width as needed
    height: '100%',
    backgroundColor: colors.white,
    ...shadows.lg,
  },
  sidebarHeader: {
    padding: spacing.lg,
    paddingTop: spacing['3xl'], // Adjust for SafeAreaView
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sidebarHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sidebarIconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  sidebarRoleName: {
    fontSize: typography.lg,
    fontWeight: '600',
    color: colors.white,
  },
  sidebarUserId: {
    fontSize: typography.sm,
    color: 'rgba(255,255,255,0.8)',
  },
  sidebarCloseButton: {
    padding: spacing.sm,
  },
  sidebarNavScrollView: {
    flex: 1,
  },
  sidebarNav: {
    padding: spacing.lg,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.xs,
  },
  navItemActive: {
    backgroundColor: colors.primary[50],
  },
  navItemText: {
    fontSize: typography.base,
    marginLeft: spacing.md,
    fontWeight: '500',
    color: colors.gray[700],
  },
  navItemTextActive: {
    color: colors.primary[700],
  },
  chevronIcon: {
    marginLeft: 'auto',
  },
  subNav: {
    marginLeft: spacing['3xl'],
    borderLeftWidth: 1,
    borderLeftColor: colors.gray[200],
    paddingLeft: spacing.md,
    marginBottom: spacing.xs,
  },
  subNavItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.md,
    marginBottom: spacing.xs,
  },
  subNavItemActive: {
    backgroundColor: colors.primary[100],
  },
  subNavItemText: {
    fontSize: typography.sm,
    marginLeft: spacing.md,
    fontWeight: '500',
    color: colors.gray[600],
  },
  subNavItemTextActive: {
    color: colors.primary[600],
  },
  sidebarFooter: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.gray[100],
  },
  logoutButtonSidebar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.error[200],
  },
  logoutButtonSidebarText: {
    fontSize: typography.base,
    fontWeight: '600',
    color: colors.error[600],
    marginLeft: spacing.sm,
  },
});

export default DepartmentDashboardScreen;
```