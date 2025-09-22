import React, { useState } from 'react';
import { DashboardLayout } from '../dashboard/DashboardLayout';
import { ModuleContent } from '../dashboard/ModuleContent';
import { ReportingSystem } from '../dashboard/ReportingSystem';
import { UserRole } from '../../types/auth';
import { ROLE_DEFINITIONS } from '../../types/roles';
import { 
  ArrowLeft, 
  Calculator, 
  Heart, 
  DollarSign, 
  Scale, 
  Headphones as HeadphonesIcon, 
  UserCheck, 
  List, 
  Database, 
  Briefcase, 
  Monitor, 
  Crown, 
  Building, 
  Building2, 
  Gavel, 
  Users, 
  UserCog 
} from 'lucide-react';
import { Button } from '../ui/Button';

interface DepartmentDashboardScreenProps {
  userRole: UserRole;
  user: any;
  onLogout: () => void;
  onBack: () => void;
}

export const DepartmentDashboardScreen: React.FC<DepartmentDashboardScreenProps> = ({
  userRole,
  user,
  onLogout,
  onBack
}) => {
  const [activeModule, setActiveModule] = useState('overview');
  const [activeView, setActiveView] = useState<'dashboard' | 'reports'>('dashboard');

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

// Export as DepartmentDashboard for compatibility
export { DepartmentDashboardScreen as DepartmentDashboard };