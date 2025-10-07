import React, { useState, useEffect } from 'react';
import { LogOut, Menu, X, Bell, Search, ChevronDown, ChevronRight, Home, Settings, BarChart3 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export interface DepartmentModule {
  id: string;
  module_key: string;
  module_name: string;
  description: string;
  icon: string;
  display_order: number;
  is_enabled: boolean;
  parent_module_id?: string;
  subModules?: DepartmentModule[];
}

export interface DepartmentInfo {
  id: string;
  name: string;
  code: string;
  description: string;
  status: string;
}

interface DepartmentDashboardLayoutProps {
  department: DepartmentInfo;
  modules: DepartmentModule[];
  children: React.ReactNode;
  user: any;
  onLogout: () => void;
  activeModule?: string;
  onModuleChange?: (moduleKey: string) => void;
  headerColor?: string;
  headerGradient?: string;
}

export const DepartmentDashboardLayout: React.FC<DepartmentDashboardLayoutProps> = ({
  department,
  modules,
  children,
  user,
  onLogout,
  activeModule = 'overview',
  onModuleChange,
  headerColor = 'from-blue-600 to-indigo-600',
  headerGradient
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedModules, setExpandedModules] = useState<string[]>(['overview']);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState(3);

  const gradientClass = headerGradient || headerColor;

  const toggleModuleExpansion = (moduleKey: string) => {
    setExpandedModules(prev =>
      prev.includes(moduleKey)
        ? prev.filter(key => key !== moduleKey)
        : [...prev, moduleKey]
    );
  };

  const handleModuleClick = (moduleKey: string, hasSubModules: boolean) => {
    if (hasSubModules) {
      toggleModuleExpansion(moduleKey);
    } else {
      onModuleChange?.(moduleKey);
      setSidebarOpen(false);
    }
  };

  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      Home,
      LayoutDashboard: Home,
      BarChart3,
      Settings,
      PieChart: BarChart3,
      TrendingUp: BarChart3,
      FileText: BarChart3,
      Calculator: BarChart3,
      CreditCard: BarChart3,
      CheckCircle: BarChart3,
      Book: BarChart3,
      Megaphone: BarChart3,
      Image: BarChart3,
      Share2: BarChart3,
      Users: BarChart3,
      UserPlus: BarChart3,
      DollarSign: BarChart3,
      Calendar: BarChart3,
      Activity: BarChart3,
      MessageSquare: BarChart3,
      Server: BarChart3,
      Shield: BarChart3,
      Package: BarChart3,
      Briefcase: BarChart3,
      FolderOpen: BarChart3,
      MessageCircle: BarChart3,
      Star: BarChart3,
      BookOpen: BarChart3,
      Clock: BarChart3,
    };

    const IconComponent = iconMap[iconName] || Home;
    return <IconComponent className="w-5 h-5" />;
  };

  const organizedModules = modules.reduce((acc, module) => {
    if (!module.parent_module_id) {
      acc.push({
        ...module,
        subModules: modules.filter(m => m.parent_module_id === module.id)
      });
    }
    return acc;
  }, [] as DepartmentModule[]);

  const sortedModules = organizedModules.sort((a, b) => a.display_order - b.display_order);

  const filteredModules = searchQuery
    ? sortedModules.filter(module =>
        module.module_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        module.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : sortedModules;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className={`bg-gradient-to-r ${gradientClass} p-6`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div className="text-white">
                <h2 className="font-bold text-lg">{department.name}</h2>
                <p className="text-white/80 text-xs">{department.code}</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="relative">
            <Input
              placeholder="Search modules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-4 h-4 text-gray-400" />}
              className="bg-white/95 backdrop-blur-sm border-0 text-sm"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <nav className="space-y-1">
            {filteredModules.map((module) => {
              const hasSubModules = module.subModules && module.subModules.length > 0;
              const isExpanded = expandedModules.includes(module.module_key);
              const isActive = activeModule === module.module_key;

              return (
                <div key={module.id}>
                  <button
                    onClick={() => handleModuleClick(module.module_key, hasSubModules)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-50 text-blue-600 shadow-sm'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                        {getIconComponent(module.icon)}
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium">{module.module_name}</p>
                        {module.description && (
                          <p className="text-xs text-gray-500 truncate max-w-[150px]">
                            {module.description}
                          </p>
                        )}
                      </div>
                    </div>
                    {hasSubModules && (
                      <ChevronRight
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isExpanded ? 'rotate-90' : ''
                        }`}
                      />
                    )}
                  </button>

                  {hasSubModules && isExpanded && (
                    <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-4">
                      {module.subModules?.map((subModule) => (
                        <button
                          key={subModule.id}
                          onClick={() => {
                            onModuleChange?.(subModule.module_key);
                            setSidebarOpen(false);
                          }}
                          className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-left ${
                            activeModule === subModule.module_key
                              ? 'bg-blue-50 text-blue-600'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <div className={activeModule === subModule.module_key ? 'text-blue-600' : 'text-gray-400'}>
                            {getIconComponent(subModule.icon)}
                          </div>
                          <span className="text-sm font-medium">{subModule.module_name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center space-x-3 mb-3 px-3 py-2 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold text-sm">
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.name || 'User'}
              </p>
              <p className="text-xs text-gray-500 truncate">{user?.mobile || user?.email}</p>
            </div>
          </div>
          <Button
            onClick={onLogout}
            variant="outline"
            className="w-full justify-center text-red-600 hover:bg-red-50 border-red-200"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className={`bg-gradient-to-r ${gradientClass} shadow-lg`}>
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Menu className="w-5 h-5 text-white" />
              </button>
              <div className="text-white">
                <h1 className="text-xl font-bold">{department.name}</h1>
                <p className="text-white/80 text-xs">
                  {modules.find(m => m.module_key === activeModule)?.module_name || 'Dashboard'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button className="relative w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors">
                <Bell className="w-5 h-5 text-white" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {notifications}
                  </span>
                )}
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
