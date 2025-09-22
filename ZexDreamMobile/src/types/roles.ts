```typescript
export interface Permission {
  id: string;
  name: string;
  description: string;
  module: string;
  action: 'create' | 'read' | 'update' | 'delete' | 'approve' | 'export';
}

export interface Module {
  id: string;
  name: string;
  description: string;
  icon: string;
  subModules: SubModule[];
  permissions: string[];
}

export interface SubModule {
  id: string;
  name: string;
  description: string;
  icon: string;
  permissions: string[];
  reportingTo?: string[];
}

export interface RoleDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  modules: string[];
  permissions: string[];
  reportsTo?: string[];
  canManage?: string[];
}

export interface DashboardWidget {
  id: string;
  title: string;
  type: 'stat' | 'chart' | 'list' | 'table' | 'alert';
  data: any;
  permissions: string[];
}

export interface ReportingHierarchy {
  roleId: string;
  reportsTo: string[];
  manages: string[];
  canViewReports: string[];
  canApprove: string[];
}

// Define all modules
export const MODULES: Module[] = [
  {
    id: 'user_management',
    name: 'User Management',
    description: 'Manage all platform users',
    icon: 'Users',
    subModules: [
      {
        id: 'customer_management',
        name: 'Customer Management',
        description: 'Manage customer accounts and data',
        icon: 'User',
        permissions: ['customers:read', 'customers:update', 'customers:export']
      },
      {
        id: 'employee_management',
        name: 'Employee Management',
        description: 'Manage employee records and access',
        icon: 'UserCheck',
        permissions: ['employees:read', 'employees:create', 'employees:update', 'employees:delete']
      },
      {
        id: 'vendor_management',
        name: 'Vendor Management',
        description: 'Manage vendor partnerships',
        icon: 'Building',
        permissions: ['vendors:read', 'vendors:create', 'vendors:update', 'vendors:approve']
      }
    ],
    permissions: ['users:read', 'users:create', 'users:update', 'users:delete', 'users:export']
  },
  {
    id: 'financial_management',
    name: 'Financial Management',
    description: 'Financial operations and reporting',
    icon: 'DollarSign',
    subModules: [
      {
        id: 'accounting',
        name: 'Accounting',
        description: 'Bookkeeping and financial records',
        icon: 'Calculator',
        permissions: ['accounts:read', 'accounts:create', 'accounts:update', 'invoices:create']
      },
      {
        id: 'payments',
        name: 'Payment Processing',
        description: 'Process and track payments',
        icon: 'CreditCard',
        permissions: ['payments:read', 'payments:process', 'payments:refund']
      },
      {
        id: 'budgeting',
        name: 'Budget Management',
        description: 'Budget planning and allocation',
        icon: 'PieChart',
        permissions: ['budgets:read', 'budgets:create', 'budgets:approve']
      }
    ],
    permissions: ['finance:read', 'finance:create', 'finance:update', 'finance:export']
  },
  {
    id: 'operations',
    name: 'Operations Management',
    description: 'Day-to-day operations',
    icon: 'Settings',
    subModules: [
      {
        id: 'spa_operations',
        name: 'Spa Operations',
        description: 'Manage spa services and bookings',
        icon: 'MapPin',
        permissions: ['spas:read', 'spas:update', 'bookings:read', 'bookings:manage']
      },
      {
        id: 'staff_scheduling',
        name: 'Staff Scheduling',
        description: 'Manage staff schedules and assignments',
        icon: 'Calendar',
        permissions: ['schedules:read', 'schedules:create', 'schedules:update']
      },
      {
        id: 'inventory',
        name: 'Inventory Management',
        description: 'Track supplies and equipment',
        icon: 'Package',
        permissions: ['inventory:read', 'inventory:update', 'inventory:order']
      }
    ],
    permissions: ['operations:read', 'operations:manage', 'operations:export']
  },
  {
    id: 'marketing',
    name: 'Marketing & Promotions',
    description: 'Marketing campaigns and customer acquisition',
    icon: 'Heart',
    subModules: [
      {
        id: 'campaigns',
        name: 'Campaign Management',
        description: 'Create and manage marketing campaigns',
        icon: 'Megaphone',
        permissions: ['campaigns:read', 'campaigns:create', 'campaigns:update']
      },
      {
        id: 'analytics',
        name: 'Marketing Analytics',
        description: 'Track campaign performance',
        icon: 'BarChart3',
        permissions: ['analytics:read', 'analytics:export']
      },
      {
        id: 'content',
        name: 'Content Management',
        description: 'Manage marketing content and assets',
        icon: 'FileText',
        permissions: ['content:read', 'content:create', 'content:update']
      }
    ],
    permissions: ['marketing:read', 'marketing:create', 'marketing:update', 'marketing:export']
  },
  {
    id: 'legal_compliance',
    name: 'Legal & Compliance',
    description: 'Legal affairs and regulatory compliance',
    icon: 'Scale',
    subModules: [
      {
        id: 'contracts',
        name: 'Contract Management',
        description: 'Manage legal contracts and agreements',
        icon: 'FileText',
        permissions: ['contracts:read', 'contracts:create', 'contracts:update']
      },
      {
        id: 'compliance',
        name: 'Regulatory Compliance',
        description: 'Ensure regulatory compliance',
        icon: 'Shield',
        permissions: ['compliance:read', 'compliance:audit', 'compliance:report']
      },
      {
        id: 'litigation',
        name: 'Litigation Management',
        description: 'Handle legal disputes and cases',
        icon: 'Gavel',
        permissions: ['litigation:read', 'litigation:manage']
      }
    ],
    permissions: ['legal:read', 'legal:create', 'legal:update', 'legal:approve']
  },
  {
    id: 'customer_support',
    name: 'Customer Support',
    description: 'Customer service and support',
    icon: 'HeadphonesIcon',
    subModules: [
      {
        id: 'tickets',
        name: 'Support Tickets',
        description: 'Manage customer support tickets',
        icon: 'MessageSquare',
        permissions: ['tickets:read', 'tickets:create', 'tickets:update', 'tickets:resolve']
      },
      {
        id: 'live_chat',
        name: 'Live Chat Support',
        description: 'Real-time customer support',
        icon: 'MessageCircle',
        permissions: ['chat:read', 'chat:respond']
      },
      {
        id: 'feedback',
        name: 'Customer Feedback',
        description: 'Collect and analyze feedback',
        icon: 'Star',
        permissions: ['feedback:read', 'feedback:respond', 'feedback:analyze']
      }
    ],
    permissions: ['support:read', 'support:respond', 'support:escalate']
  },
  {
    id: 'hr_management',
    name: 'Human Resources',
    description: 'Employee management and HR operations',
    icon: 'UserCog',
    subModules: [
      {
        id: 'recruitment',
        name: 'Recruitment',
        description: 'Hiring and onboarding processes',
        icon: 'UserPlus',
        permissions: ['recruitment:read', 'recruitment:create', 'recruitment:approve']
      },
      {
        id: 'payroll',
        name: 'Payroll Management',
        description: 'Salary and benefits administration',
        icon: 'DollarSign',
        permissions: ['payroll:read', 'payroll:process', 'payroll:export']
      },
      {
        id: 'performance',
        name: 'Performance Management',
        description: 'Employee performance tracking',
        icon: 'TrendingUp',
        permissions: ['performance:read', 'performance:evaluate', 'performance:report']
      }
    ],
    permissions: ['hr:read', 'hr:create', 'hr:update', 'hr:approve']
  },
  {
    id: 'system_admin',
    name: 'System Administration',
    description: 'System configuration and management',
    icon: 'Crown',
    subModules: [
      {
        id: 'role_management',
        name: 'Role Management',
        description: 'Create and manage user roles',
        icon: 'Users',
        permissions: ['roles:read', 'roles:create', 'roles:update', 'roles:delete']
      },
      {
        id: 'system_config',
        name: 'System Configuration',
        description: 'Configure system settings',
        icon: 'Settings',
        permissions: ['system:read', 'system:configure', 'system:backup']
      },
      {
        id: 'audit_logs',
        name: 'Audit Logs',
        description: 'View system audit trails',
        icon: 'FileText',
        permissions: ['audit:read', 'audit:export']
      }
    ],
    permissions: ['admin:read', 'admin:create', 'admin:update', 'admin:delete', 'admin:configure']
  }
];

// Define role definitions with their modules and permissions
export const ROLE_DEFINITIONS: RoleDefinition[] = [
  {
    id: 'accounts_department',
    name: 'Accounts Department',
    description: 'Financial accounting and bookkeeping operations',
    icon: 'Calculator',
    color: '#22C55E', // green-500
    modules: ['financial_management'],
    permissions: ['accounts:read', 'accounts:create', 'accounts:update', 'invoices:create', 'payments:read'],
    reportsTo: ['finance_department', 'directors'],
    canManage: ['accounting_staff']
  },
  {
    id: 'marketing_department',
    name: 'Marketing Department',
    description: 'Brand promotion and customer acquisition',
    icon: 'Heart',
    color: '#EC4899', // pink-500
    modules: ['marketing'],
    permissions: ['marketing:read', 'marketing:create', 'marketing:update', 'campaigns:create', 'analytics:read'],
    reportsTo: ['directors'],
    canManage: ['marketing_staff']
  },
  {
    id: 'finance_department',
    name: 'Finance Department',
    description: 'Financial planning and analysis',
    icon: 'DollarSign',
    color: '#3B82F6', // blue-500
    modules: ['financial_management'],
    permissions: ['finance:read', 'finance:create', 'finance:approve', 'budgets:create', 'budgets:approve'],
    reportsTo: ['directors'],
    canManage: ['accounts_department', 'finance_staff']
  },
  {
    id: 'legal_department',
    name: 'Legal Department',
    description: 'Legal affairs and compliance',
    icon: 'Scale',
    color: '#EF4444', // red-500
    modules: ['legal_compliance'],
    permissions: ['legal:read', 'legal:create', 'legal:approve', 'contracts:create', 'compliance:audit'],
    reportsTo: ['directors'],
    canManage: ['advocate', 'legal_staff']
  },
  {
    id: 'customer_care',
    name: 'Customer Care',
    description: 'Customer support and service operations',
    icon: 'HeadphonesIcon',
    color: '#10B981', // emerald-500
    modules: ['customer_support'],
    permissions: ['support:read', 'support:respond', 'tickets:create', 'tickets:resolve', 'feedback:read'],
    reportsTo: ['operations_head'],
    canManage: ['support_staff']
  },
  {
    id: 'staff_department',
    name: 'Staff Department',
    description: 'Staff management and coordination',
    icon: 'UserCheck',
    color: '#F59E0B', // orange-500
    modules: ['hr_management', 'operations'],
    permissions: ['staff:read', 'staff:manage', 'schedules:create', 'schedules:update'],
    reportsTo: ['hr_department'],
    canManage: ['field_staff']
  },
  {
    id: 'vendor_list',
    name: 'Vendor List Management',
    description: 'Vendor database and relationship management',
    icon: 'List',
    color: '#06B6D4', // cyan-500
    modules: ['user_management'],
    permissions: ['vendors:read', 'vendors:create', 'vendors:update', 'vendor_data:export'],
    reportsTo: ['operations_head'],
    canManage: ['vendor_coordinators']
  },
  {
    id: 'customer_data',
    name: 'Customer Data Management',
    description: 'Customer information and analytics',
    icon: 'Database',
    color: '#6366F1', // indigo-500
    modules: ['user_management', 'marketing'],
    permissions: ['customers:read', 'customer_data:export', 'analytics:read', 'reports:generate'],
    reportsTo: ['marketing_department'],
    canManage: ['data_analysts']
  },
  {
    id: 'fo_department',
    name: 'F.O. Department',
    description: 'Front office operations and customer interactions',
    icon: 'Briefcase',
    color: '#FBBF24', // amber-500
    modules: ['operations', 'customer_support'],
    permissions: ['front_office:read', 'front_office:manage', 'bookings:read', 'customers:read'],
    reportsTo: ['operations_head'],
    canManage: ['reception_staff']
  },
  {
    id: 'it_department',
    name: 'IT Department',
    description: 'Technology infrastructure and support',
    icon: 'Monitor',
    color: '#8B5CF6', // purple-500
    modules: ['system_admin'],
    permissions: ['system:read', 'system:configure', 'system:backup', 'audit:read', 'tech_support:manage'],
    reportsTo: ['directors'],
    canManage: ['tech_staff']
  },
  {
    id: 'super_admin',
    name: 'Command Power – Super Admin',
    description: 'Ultimate system control and oversight',
    icon: 'Crown',
    color: '#F59E0B', // orange-500
    modules: ['system_admin', 'user_management', 'financial_management', 'operations', 'marketing', 'legal_compliance', 'customer_support', 'hr_management'],
    permissions: ['*'], // All permissions
    reportsTo: [],
    canManage: ['directors', 'all_departments']
  },
  {
    id: 'ho_details',
    name: 'H.O. Details',
    description: 'Head office administration and management',
    icon: 'Building',
    color: '#6B7280', // gray-500
    modules: ['operations', 'hr_management'],
    permissions: ['ho_admin:read', 'ho_admin:manage', 'office_operations:read'],
    reportsTo: ['directors'],
    canManage: ['ho_staff']
  },
  {
    id: 'corporate_office',
    name: 'Corporate Office Details',
    description: 'Corporate office operations and management',
    icon: 'Building2',
    color: '#4B5563', // gray-600
    modules: ['operations', 'financial_management'],
    permissions: ['corporate:read', 'corporate:manage', 'corporate_reports:read'],
    reportsTo: ['directors'],
    canManage: ['corporate_staff']
  },
  {
    id: 'advocate',
    name: 'Advocate',
    description: 'Legal representation and advisory services',
    icon: 'Gavel',
    color: '#F43F5E', // rose-500
    modules: ['legal_compliance'],
    permissions: ['legal:read', 'litigation:manage', 'legal_advice:provide'],
    reportsTo: ['legal_department'],
    canManage: []
  },
  {
    id: 'ca_cs',
    name: 'CA & CS',
    description: 'Chartered Accountant & Company Secretary services',
    icon: 'Calculator',
    color: '#FCD34D', // amber-300
    modules: ['financial_management', 'legal_compliance'],
    permissions: ['audit:read', 'audit:conduct', 'compliance:read', 'financial_reports:create'],
    reportsTo: ['finance_department', 'legal_department'],
    canManage: []
  },
  {
    id: 'directors',
    name: 'Directors\' Details',
    description: 'Board of directors and executive management',
    icon: 'Users',
    color: '#1F2937', // gray-800
    modules: ['system_admin', 'financial_management', 'operations', 'hr_management'],
    permissions: ['executive:read', 'executive:approve', 'strategic:read', 'all_reports:read'],
    reportsTo: [],
    canManage: ['all_departments']
  },
  {
    id: 'hr_department',
    name: 'HR Department',
    description: 'Human resources and employee management',
    icon: 'UserCog',
    color: '#9333EA', // purple-700
    modules: ['hr_management'],
    permissions: ['hr:read', 'hr:create', 'hr:update', 'employees:manage', 'payroll:process'],
    reportsTo: ['directors'],
    canManage: ['staff_department', 'hr_staff']
  },
  // Existing roles, mapped to the new structure
  {
    id: 'customer',
    name: 'Customer',
    description: 'Standard customer account',
    icon: 'User',
    color: '#8B5CF6',
    modules: [], // Customers don't use modules in this context
    permissions: [],
  },
  {
    id: 'employee',
    name: 'Employee',
    description: 'Internal employee dashboard',
    icon: 'Briefcase',
    color: '#EC4899',
    modules: ['operations', 'hr_management'], // Example modules for an employee
    permissions: [],
  },
  {
    id: 'vendor',
    name: 'Vendor',
    description: 'Service provider dashboard',
    icon: 'Store',
    color: '#2563EB',
    modules: ['operations', 'marketing'], // Example modules for a vendor
    permissions: [],
  },
  {
    id: 'admin',
    name: 'Admin',
    description: 'General administrator access',
    icon: 'Crown',
    color: '#4F46E5',
    modules: ['user_management', 'operations', 'financial_management'], // Example modules for a general admin
    permissions: [],
  },
];

// Define reporting hierarchy
export const REPORTING_HIERARCHY: ReportingHierarchy[] = [
  {
    roleId: 'accounts_department',
    reportsTo: ['finance_department', 'directors'],
    manages: [],
    canViewReports: ['financial_reports', 'accounting_reports'],
    canApprove: ['expense_reports']
  },
  {
    roleId: 'marketing_department',
    reportsTo: ['directors'],
    manages: ['customer_data'],
    canViewReports: ['marketing_reports', 'customer_analytics'],
    canApprove: ['marketing_campaigns', 'promotional_offers']
  },
  {
    roleId: 'finance_department',
    reportsTo: ['directors'],
    manages: ['accounts_department'],
    canViewReports: ['all_financial_reports', 'budget_reports'],
    canApprove: ['budgets', 'major_expenses', 'financial_policies']
  },
  {
    roleId: 'legal_department',
    reportsTo: ['directors'],
    manages: ['advocate'],
    canViewReports: ['legal_reports', 'compliance_reports'],
    canApprove: ['contracts', 'legal_policies']
  },
  {
    roleId: 'hr_department',
    reportsTo: ['directors'],
    manages: ['staff_department'],
    canViewReports: ['hr_reports', 'employee_reports'],
    canApprove: ['hiring', 'promotions', 'hr_policies']
  },
  {
    roleId: 'super_admin',
    reportsTo: [],
    manages: ['all_roles'],
    canViewReports: ['all_reports'],
    canApprove: ['all_actions']
  },
  {
    roleId: 'directors',
    reportsTo: [],
    manages: ['all_departments'],
    canViewReports: ['executive_reports', 'strategic_reports'],
    canApprove: ['strategic_decisions', 'major_policies']
  },
  // Add reporting for other roles if necessary
  {
    roleId: 'customer_care',
    reportsTo: ['operations'], // Assuming an 'operations_head' or similar
    manages: [],
    canViewReports: ['support_tickets_reports', 'customer_satisfaction_reports'],
    canApprove: ['customer_refunds']
  },
  {
    roleId: 'staff_department',
    reportsTo: ['hr_department'],
    manages: [], // Manages staff, but not other roles
    canViewReports: ['staff_attendance_reports', 'staff_performance_reports'],
    canApprove: ['leave_requests']
  },
  {
    roleId: 'vendor_list',
    reportsTo: ['operations'],
    manages: [],
    canViewReports: ['vendor_onboarding_reports', 'vendor_performance_reports'],
    canApprove: ['new_vendor_approvals']
  },
  {
    roleId: 'customer_data',
    reportsTo: ['marketing_department'],
    manages: [],
    canViewReports: ['customer_demographics_reports', 'customer_behavior_reports'],
    canApprove: []
  },
  {
    roleId: 'fo_department',
    reportsTo: ['operations'],
    manages: [],
    canViewReports: ['daily_operations_reports', 'front_office_traffic_reports'],
    canApprove: ['booking_modifications']
  },
  {
    roleId: 'it_department',
    reportsTo: ['directors'],
    manages: [],
    canViewReports: ['system_health_reports', 'security_audit_reports'],
    canApprove: ['software_purchases']
  },
  {
    roleId: 'ho_details',
    reportsTo: ['directors'],
    manages: [],
    canViewReports: ['ho_expense_reports', 'administrative_reports'],
    canApprove: ['office_supplies']
  },
  {
    roleId: 'corporate_office',
    reportsTo: ['directors'],
    manages: [],
    canViewReports: ['corporate_financial_reports', 'corporate_performance_reports'],
    canApprove: ['corporate_initiatives']
  },
  {
    roleId: 'advocate',
    reportsTo: ['legal_department'],
    manages: [],
    canViewReports: ['legal_case_reports'],
    canApprove: []
  },
  {
    roleId: 'ca_cs',
    reportsTo: ['finance_department', 'legal_department'],
    manages: [],
    canViewReports: ['tax_reports', 'compliance_audit_reports'],
    canApprove: []
  },
];
```