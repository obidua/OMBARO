import React, { useState } from 'react';
import { LogOut, Menu, X, Bell, Search, Filter, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { UserRole } from '../../types/auth';
import { ROLE_DEFINITIONS, MODULES, Module, SubModule } from '../../types/roles';

interface DashboardLayoutProps {
  userRole: UserRole;
  user: any;
  onLogout: () => void;
  children: React.ReactNode;
  activeModule?: string;
  onModuleChange?: (moduleId: string) => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  userRole,
  user,
  onLogout,
  children,
  activeModule,
  onModuleChange
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleSubModuleClick = (subModule: SubModule) => {
    if (onModuleChange) {
      onModuleChange(subModule.id);
    }
    setSidebarOpen(false);
  };

  const getIconComponent = (iconName: string) => {
    // This would typically import and return the actual icon component
    // For now, returning a placeholder
    return <div className="w-5 h-5 bg-current rounded opacity-70" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:inset-0`}>
        {/* Sidebar Header */}
        <div className={`bg-gradient-to-r ${roleDefinition?.color || 'from-gray-600 to-slate-600'} p-4`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                {getIconComponent(roleDefinition?.icon || 'Users')}
              </div>
              <div className="text-white">
                <h2 className="font-semibold text-sm">{roleDefinition?.name}</h2>
                <p className="text-white/80 text-xs">ID: {user.mobile}</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-4">
          <nav className="space-y-2">
            {availableModules.map((module) => {
              const isExpanded = expandedModules.includes(module.id);
              const hasSubModules = module.subModules.length > 0;
              
              return (
                <div key={module.id}>
                  <button
                    onClick={() => {
                      if (hasSubModules) {
                        toggleModuleExpansion(module.id);
                      } else if (onModuleChange) {
                        onModuleChange(module.id);
                      }
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors duration-200 ${
                      activeModule === module.id 
                        ? 'bg-purple-100 text-purple-700' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {getIconComponent(module.icon)}
                      <span className="font-medium text-sm">{module.name}</span>
                    </div>
                    {hasSubModules && (
                      <div className="w-4 h-4">
                        {isExpanded ? <ChevronDown /> : <ChevronRight />}
                      </div>
                    )}
                  </button>
                  
                  {hasSubModules && isExpanded && (
                    <div className="ml-6 mt-2 space-y-1">
                      {module.subModules.map((subModule) => (
                        <button
                          key={subModule.id}
                          onClick={() => handleSubModuleClick(subModule)}
                          className={`w-full flex items-center space-x-3 p-2 rounded-lg transition-colors duration-200 ${
                            activeModule === subModule.id
                              ? 'bg-purple-50 text-purple-600'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {getIconComponent(subModule.icon)}
                          <span className="text-sm">{subModule.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-200">
          <Button
            onClick={onLogout}
            variant="outline"
            size="sm"
            className="w-full"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Top Header */}
        <div className="bg-white shadow-sm border-b border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center"
              >
                <Menu className="w-5 h-5 text-gray-700" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {roleDefinition?.name || 'Dashboard'}
                </h1>
                <p className="text-sm text-gray-600">{roleDefinition?.description}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  icon={<Search className="w-4 h-4 text-gray-400" />}
                  className="w-64"
                />
              </div>
              <button className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <button className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                <Filter className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6">
          {children}
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};