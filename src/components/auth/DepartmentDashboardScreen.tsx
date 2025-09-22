import React, { useState } from 'react';
import { DashboardLayout } from '../dashboard/DashboardLayout';
import { ModuleContent } from '../dashboard/ModuleContent';
import { ReportingSystem } from '../dashboard/ReportingSystem';
import { UserRole } from '../../types/auth';
import { ROLE_DEFINITIONS } from '../../types/roles';

interface DepartmentDashboardScreenProps {
  userRole: UserRole;
  user: any;
  onLogout: () => void;
  onBack: () => void;
}

export const DepartmentDashboardScreen: React.FC<DepartmentDashboardScreenProps> = ({
  userRole,
  user,
  onLogout
}) => {
  const [activeModule, setActiveModule] = useState('overview');
  const [activeView, setActiveView] = useState<'dashboard' | 'reports'>('dashboard');

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

  const roleDefinition = ROLE_DEFINITIONS.find(role => role.id === userRole);

  return (
    <DashboardLayout
      userRole={userRole}
      user={user}
      onLogout={onLogout}
      activeModule={activeModule}
      onModuleChange={setActiveModule}
    >
      {/* View Toggle */}
      <div className="mb-6">
        <div className="flex bg-gray-100 rounded-xl p-1 w-fit">
          <button
            onClick={() => setActiveView('dashboard')}
            className={`py-2 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
              activeView === 'dashboard' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-600'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveView('reports')}
            className={`py-2 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
              activeView === 'reports' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-600'
            }`}
          >
            Reports
          </button>
        </div>
      </div>

      {/* Content */}
      {activeView === 'dashboard' ? (
        <ModuleContent
          userRole={userRole}
          activeModule={activeModule}
          user={user}
        />
      ) : (
        <ReportingSystem
          userRole={userRole}
          user={user}
        />
      )}
    </DashboardLayout>
  );
};

export { DepartmentDashboardScreen as DepartmentDashboard };