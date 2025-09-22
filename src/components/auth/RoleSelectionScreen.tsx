import React, { useState } from 'react';
import { ArrowLeft, Users, Building, DollarSign, Scale, HeadphonesIcon, UserCheck, List, Database, Briefcase, Monitor, Crown, MapPin, Building2, Gavel, Calculator, UserCog, Heart } from 'lucide-react';
import { Button } from '../ui/Button';
import { UserRole } from '../../types/auth';

interface RoleSelectionScreenProps {
  onBack: () => void;
  onRoleSelect: (role: UserRole) => void;
  isLoading: boolean;
}

export const RoleSelectionScreen: React.FC<RoleSelectionScreenProps> = ({
  onBack,
  onRoleSelect,
  isLoading
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const roleCategories = [
    {
      title: 'Core Departments',
      roles: [
        { 
          id: 'accounts_department' as UserRole, 
          name: 'Accounts Department', 
          description: 'Financial accounting and bookkeeping',
          icon: Calculator,
          color: 'bg-green-100 text-green-600'
        },
        { 
          id: 'marketing_department' as UserRole, 
          name: 'Marketing Department', 
          description: 'Brand promotion and customer acquisition',
          icon: Heart,
          color: 'bg-pink-100 text-pink-600'
        },
        { 
          id: 'finance_department' as UserRole, 
          name: 'Finance Department', 
          description: 'Financial planning and analysis',
          icon: DollarSign,
          color: 'bg-blue-100 text-blue-600'
        },
        { 
          id: 'hr_department' as UserRole, 
          name: 'HR Department', 
          description: 'Human resources and employee management',
          icon: UserCog,
          color: 'bg-purple-100 text-purple-600'
        },
        { 
          id: 'it_department' as UserRole, 
          name: 'IT Department', 
          description: 'Technology infrastructure and support',
          icon: Monitor,
          color: 'bg-indigo-100 text-indigo-600'
        }
      ]
    },
    {
      title: 'Operations',
      roles: [
        { 
          id: 'customer_care' as UserRole, 
          name: 'Customer Care', 
          description: 'Customer support and service',
          icon: HeadphonesIcon,
          color: 'bg-emerald-100 text-emerald-600'
        },
        { 
          id: 'staff_department' as UserRole, 
          name: 'Staff Department', 
          description: 'Staff management and coordination',
          icon: UserCheck,
          color: 'bg-orange-100 text-orange-600'
        },
        { 
          id: 'fo_department' as UserRole, 
          name: 'F.O. Department', 
          description: 'Front office operations',
          icon: Briefcase,
          color: 'bg-yellow-100 text-yellow-600'
        }
      ]
    },
    {
      title: 'Data Management',
      roles: [
        { 
          id: 'vendor_list' as UserRole, 
          name: 'Vendor List', 
          description: 'Vendor database management',
          icon: List,
          color: 'bg-teal-100 text-teal-600'
        },
        { 
          id: 'customer_data' as UserRole, 
          name: 'Customer Data', 
          description: 'Customer information management',
          icon: Database,
          color: 'bg-cyan-100 text-cyan-600'
        }
      ]
    },
    {
      title: 'Legal & Compliance',
      roles: [
        { 
          id: 'legal_department' as UserRole, 
          name: 'Legal Department', 
          description: 'Legal affairs and compliance',
          icon: Scale,
          color: 'bg-red-100 text-red-600'
        },
        { 
          id: 'advocate' as UserRole, 
          name: 'Advocate', 
          description: 'Legal representation and advice',
          icon: Gavel,
          color: 'bg-rose-100 text-rose-600'
        },
        { 
          id: 'ca_cs' as UserRole, 
          name: 'CA & CS', 
          description: 'Chartered Accountant & Company Secretary',
          icon: Calculator,
          color: 'bg-amber-100 text-amber-600'
        }
      ]
    },
    {
      title: 'Leadership',
      roles: [
        { 
          id: 'super_admin' as UserRole, 
          name: 'Command Power – Super Admin', 
          description: 'Ultimate system control and oversight',
          icon: Crown,
          color: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
        },
        { 
          id: 'directors' as UserRole, 
          name: 'Directors\' Details', 
          description: 'Board of directors and executive management',
          icon: Users,
          color: 'bg-slate-100 text-slate-600'
        }
      ]
    },
    {
      title: 'Office Management',
      roles: [
        { 
          id: 'ho_details' as UserRole, 
          name: 'H.O. Details', 
          description: 'Head office administration',
          icon: Building,
          color: 'bg-gray-100 text-gray-600'
        },
        { 
          id: 'corporate_office' as UserRole, 
          name: 'Corporate Office Details', 
          description: 'Corporate office management',
          icon: Building2,
          color: 'bg-stone-100 text-stone-600'
        }
      ]
    }
  ];

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
        <div className="max-w-4xl mx-auto">
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