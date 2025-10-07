import React, { useState, useEffect } from 'react';
import {
  LogOut, Users, MapPin, Shield, Building, Search, Filter, Calculator, Heart, Scale,
  HeadphonesIcon, Monitor, List, Database, Briefcase, Building2, Gavel, UserCog,
  Menu, X, Bell, ChevronRight, DollarSign, UserCheck
} from 'lucide-react';
import { Input } from '../ui/Input';
import { DepartmentCard } from './departments/DepartmentCard';
import { AccountsDepartment } from './departments/AccountsDepartment';
import { MarketingDepartment } from './departments/MarketingDepartment';
import { HRDepartment } from './departments/HRDepartment';
import { FinanceDepartment } from './departments/FinanceDepartment';
import { ITDepartment } from './departments/ITDepartment';
import { CustomerCareDepartment } from './departments/CustomerCareDepartment';
import { StaffDepartment } from './departments/StaffDepartment';
import { FODepartment } from './departments/FODepartment';
import { VendorListDepartment } from './departments/VendorListDepartment';
import { CustomerDataDepartment } from './departments/CustomerDataDepartment';
import { LegalDepartment } from './departments/LegalDepartment';
import { AdvocateDepartment } from './departments/AdvocateDepartment';
import { CACSDepartment } from './departments/CACSDepartment';
import { DirectorsDepartment } from './departments/DirectorsDepartment';
import { HODetailsDepartment } from './departments/HODetailsDepartment';
import { CorporateOfficeDepartment } from './departments/CorporateOfficeDepartment';
import { LocationTrackingScreen } from './LocationTrackingScreen';
import { UserManagementScreen } from './UserManagementScreen';
import { UserFormScreen } from './UserFormScreen';
import { RoleManagementScreen } from './RoleManagementScreen';
import { PermissionMatrixScreen } from './PermissionMatrixScreen';
import VendorApprovalScreen from './VendorApprovalScreen';
import { adminService, PlatformMetrics } from '../../services/admin.service';

interface EnhancedAdminDashboardProps {
  onLogout: () => void;
  user: any;
  onNavigate?: (screen: string) => void;
}

type ScreenType =
  | 'dashboard'
  | 'accounts' | 'marketing' | 'finance' | 'hr' | 'it'
  | 'customerCare' | 'staff' | 'fo'
  | 'vendorList' | 'customerData'
  | 'legal' | 'advocate' | 'caCs'
  | 'directors' | 'ho' | 'corporate'
  | 'locationTracking' | 'userManagement' | 'userForm' | 'roleManagement' | 'permissionMatrix' | 'vendorApproval';

export const EnhancedAdminDashboard: React.FC<EnhancedAdminDashboardProps> = ({ onLogout, user }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('dashboard');
  const [screenData, setScreenData] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [metrics, setMetrics] = useState<PlatformMetrics | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    loadPlatformMetrics();
  }, []);

  const loadPlatformMetrics = async () => {
    try {
      const data = await adminService.getPlatformMetrics();
      setMetrics(data);
    } catch (error) {
      console.error('Error loading metrics:', error);
    }
  };

  const platformStats = [
    { label: 'Total Users', value: metrics?.totalUsers.toLocaleString() || '0', icon: Users, color: 'bg-blue-500', change: '+12% this month' },
    { label: 'Active Vendors', value: metrics?.activeVendors.toString() || '0', icon: Building, color: 'bg-green-500', change: '+5 this week' },
    { label: 'Active Therapists', value: metrics?.activeTherapists.toString() || '0', icon: UserCheck, color: 'bg-orange-500', change: '+8 this month' },
    { label: 'Platform Health', value: '98.5%', icon: Shield, color: 'bg-emerald-500', change: 'All systems operational' }
  ];

  const departmentCategories = [
    {
      id: 'core',
      name: 'Core Departments',
      departments: [
        { id: 'accounts', title: 'Accounts Department', description: 'Financial accounting and bookkeeping', icon: Calculator, color: 'bg-gradient-to-br from-green-500 to-emerald-500', stats: [{ label: 'Revenue', value: '₹8.4L' }, { label: 'Pending', value: '23' }] },
        { id: 'marketing', title: 'Marketing Department', description: 'Brand promotion and customer acquisition', icon: Heart, color: 'bg-gradient-to-br from-pink-500 to-rose-500', stats: [{ label: 'Campaigns', value: '12' }, { label: 'ROI', value: '3.2x' }] },
        { id: 'finance', title: 'Finance Department', description: 'Financial planning and analysis', icon: DollarSign, color: 'bg-gradient-to-br from-blue-500 to-cyan-500', stats: [{ label: 'Budget', value: '₹25L' }, { label: 'Utilization', value: '78%' }] },
        { id: 'hr', title: 'HR Department', description: 'Human resources and employee management', icon: UserCog, color: 'bg-gradient-to-br from-violet-500 to-purple-500', stats: [{ label: 'Employees', value: '145' }, { label: 'Open Positions', value: '7' }] },
        { id: 'it', title: 'IT Department', description: 'Technology infrastructure and support', icon: Monitor, color: 'bg-gradient-to-br from-indigo-500 to-blue-500', stats: [{ label: 'Uptime', value: '99.9%' }, { label: 'Tickets', value: '3' }] }
      ]
    },
    {
      id: 'operations',
      name: 'Operations',
      departments: [
        { id: 'customerCare', title: 'Customer Care', description: 'Customer support and service', icon: HeadphonesIcon, color: 'bg-gradient-to-br from-emerald-500 to-teal-500', stats: [{ label: 'Tickets', value: '45' }, { label: 'Avg Response', value: '2m' }] },
        { id: 'staff', title: 'Staff Department', description: 'Staff management and coordination', icon: UserCheck, color: 'bg-gradient-to-br from-orange-500 to-amber-500', stats: [{ label: 'Active Staff', value: '89' }, { label: 'On Leave', value: '5' }] },
        { id: 'fo', title: 'F.O. Department', description: 'Front office operations', icon: Briefcase, color: 'bg-gradient-to-br from-yellow-500 to-orange-500', stats: [{ label: 'Walk-ins', value: '23' }, { label: 'Appointments', value: '56' }] }
      ]
    },
    {
      id: 'data',
      name: 'Data Management',
      departments: [
        { id: 'vendorList', title: 'Vendor List', description: 'Vendor database management', icon: List, color: 'bg-gradient-to-br from-teal-500 to-cyan-500', stats: [{ label: 'Total Vendors', value: metrics?.activeVendors.toString() || '0' }, { label: 'Pending', value: '8' }], badge: { text: 'New', color: 'bg-green-100 text-green-700' } },
        { id: 'customerData', title: 'Customer Data', description: 'Customer information management', icon: Database, color: 'bg-gradient-to-br from-cyan-500 to-blue-500', stats: [{ label: 'Total Customers', value: metrics?.totalUsers.toLocaleString() || '0' }, { label: 'Active', value: '2.1K' }] }
      ]
    },
    {
      id: 'legal',
      name: 'Legal & Compliance',
      departments: [
        { id: 'legal', title: 'Legal Department', description: 'Legal affairs and compliance', icon: Scale, color: 'bg-gradient-to-br from-red-500 to-pink-500', stats: [{ label: 'Active Cases', value: '4' }, { label: 'Contracts', value: '28' }] },
        { id: 'advocate', title: 'Advocate', description: 'Legal representation and advice', icon: Gavel, color: 'bg-gradient-to-br from-rose-500 to-red-500', stats: [{ label: 'Cases', value: '12' }, { label: 'Hearings', value: '3' }] },
        { id: 'caCs', title: 'CA & CS', description: 'Chartered Accountant & Company Secretary', icon: Calculator, color: 'bg-gradient-to-br from-amber-500 to-yellow-500', stats: [{ label: 'Audits', value: '2' }, { label: 'Filings', value: '5' }] }
      ]
    },
    {
      id: 'leadership',
      name: 'Leadership',
      departments: [
        { id: 'directors', title: "Directors' Details", description: 'Board of directors and executive management', icon: Users, color: 'bg-gradient-to-br from-slate-600 to-gray-600', stats: [{ label: 'Board Members', value: '5' }, { label: 'Meetings', value: '2/m' }] }
      ]
    },
    {
      id: 'office',
      name: 'Office Management',
      departments: [
        { id: 'ho', title: 'H.O. Details', description: 'Head office administration', icon: Building, color: 'bg-gradient-to-br from-gray-600 to-slate-600', stats: [{ label: 'Staff', value: '45' }, { label: 'Assets', value: '₹2.5Cr' }] },
        { id: 'corporate', title: 'Corporate Office Details', description: 'Corporate office management', icon: Building2, color: 'bg-gradient-to-br from-stone-600 to-gray-600', stats: [{ label: 'Locations', value: '3' }, { label: 'Staff', value: '120' }] }
      ]
    },
    {
      id: 'system',
      name: 'System Management',
      departments: [
        { id: 'userManagement', title: 'User & Role Management', description: 'Create users and assign roles', icon: UserCog, color: 'bg-gradient-to-br from-blue-600 to-indigo-600', stats: [{ label: 'Users', value: metrics?.totalUsers.toLocaleString() || '0' }, { label: 'Roles', value: '15' }] },
        { id: 'roleManagement', title: 'Role Management', description: 'Manage system roles', icon: Shield, color: 'bg-gradient-to-br from-purple-600 to-pink-600', stats: [{ label: 'Roles', value: '15' }, { label: 'Permissions', value: '48' }] },
        { id: 'locationTracking', title: 'Location Tracking', description: 'Track employee locations', icon: MapPin, color: 'bg-gradient-to-br from-green-600 to-emerald-600', stats: [{ label: 'Active', value: metrics?.activeTherapists.toString() || '0' }, { label: 'On Duty', value: '45' }] },
        { id: 'vendorApproval', title: 'Vendor Approvals', description: 'Review vendor applications', icon: Building, color: 'bg-gradient-to-br from-amber-600 to-orange-600', stats: [{ label: 'Pending', value: '8' }, { label: 'Approved', value: '156' }], badge: { text: '8 Pending', color: 'bg-amber-100 text-amber-700' } }
      ]
    }
  ];

  const handleDepartmentClick = (departmentId: string) => {
    setCurrentScreen(departmentId as ScreenType);
    setSidebarOpen(false);
  };

  const handleBack = () => {
    setCurrentScreen('dashboard');
    setScreenData(null);
  };

  // Route to department screens
  if (currentScreen === 'accounts') return <AccountsDepartment onBack={handleBack} />;
  if (currentScreen === 'marketing') return <MarketingDepartment onBack={handleBack} />;
  if (currentScreen === 'hr') return <HRDepartment onBack={handleBack} />;
  if (currentScreen === 'finance') return <FinanceDepartment onBack={handleBack} />;
  if (currentScreen === 'it') return <ITDepartment onBack={handleBack} />;
  if (currentScreen === 'customerCare') return <CustomerCareDepartment onBack={handleBack} />;
  if (currentScreen === 'staff') return <StaffDepartment onBack={handleBack} />;
  if (currentScreen === 'fo') return <FODepartment onBack={handleBack} />;
  if (currentScreen === 'vendorList') return <VendorListDepartment onBack={handleBack} />;
  if (currentScreen === 'customerData') return <CustomerDataDepartment onBack={handleBack} />;
  if (currentScreen === 'legal') return <LegalDepartment onBack={handleBack} />;
  if (currentScreen === 'advocate') return <AdvocateDepartment onBack={handleBack} />;
  if (currentScreen === 'caCs') return <CACSDepartment onBack={handleBack} />;
  if (currentScreen === 'directors') return <DirectorsDepartment onBack={handleBack} />;
  if (currentScreen === 'ho') return <HODetailsDepartment onBack={handleBack} />;
  if (currentScreen === 'corporate') return <CorporateOfficeDepartment onBack={handleBack} />;
  if (currentScreen === 'locationTracking') return <LocationTrackingScreen onBack={handleBack} />;
  if (currentScreen === 'userManagement') return <UserManagementScreen onBack={handleBack} onNavigate={(screen, data) => { setScreenData(data); setCurrentScreen(screen as ScreenType); }} />;
  if (currentScreen === 'userForm') return <UserFormScreen mode={screenData?.mode || 'create'} user={screenData?.user} onBack={() => setCurrentScreen('userManagement')} onSave={(userData) => { console.log('User saved:', userData); alert(`User ${screenData?.mode === 'create' ? 'created' : 'updated'} successfully!`); setCurrentScreen('userManagement'); }} />;
  if (currentScreen === 'roleManagement') return <RoleManagementScreen onBack={handleBack} />;
  if (currentScreen === 'permissionMatrix') return <PermissionMatrixScreen onBack={handleBack} />;
  if (currentScreen === 'vendorApproval') return <VendorApprovalScreen onNavigate={handleBack as any} />;

  return (
    <div className="min-h-screen bg-gray-50">
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 pt-12 pb-6 px-4 sm:px-6 sticky top-0 z-30">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors">
              {sidebarOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">Super Admin Portal</h1>
              <p className="text-white/90 text-xs sm:text-sm">Command Power • ID: {user.mobile}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors relative">
              <Bell className="w-5 h-5 text-white" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button onClick={onLogout} className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors">
              <LogOut className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        <div className="relative">
          <Input placeholder="Search departments, users, data..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} icon={<Search className="w-5 h-5 text-gray-400" />} className="bg-white/95 backdrop-blur-sm border-0 shadow-lg" />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Filter className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      <div className="px-4 sm:px-6 py-6 space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {platformStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}><stat.icon className="w-6 h-6 text-white" /></div>
              </div>
              <p className="text-xs text-gray-600 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.change}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          <button onClick={() => setActiveCategory('all')} className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeCategory === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}>
            All Departments
          </button>
          {departmentCategories.map((category) => (
            <button key={category.id} onClick={() => setActiveCategory(category.id)} className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeCategory === category.id ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}>
              {category.name}
            </button>
          ))}
        </div>

        {departmentCategories.filter((category) => activeCategory === 'all' || activeCategory === category.id).map((category) => (
          <div key={category.id} className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">{category.name}</h2>
              <span className="text-sm text-gray-500">{category.departments.length} modules</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {category.departments.map((dept) => (
                <DepartmentCard key={dept.id} title={dept.title} description={dept.description} icon={dept.icon} color={dept.color} stats={dept.stats} onClick={() => handleDepartmentClick(dept.id)} badge={dept.badge} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
