import React, { useState } from 'react';
import { ArrowLeft, Shield, Users, Settings, Eye, Edit, Plus, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { UserRole } from '../../types/auth';
import { ROLE_DEFINITIONS, MODULES, RoleDefinition } from '../../types/roles';

interface RoleManagementScreenProps {
  onBack: () => void;
}

export const RoleManagementScreen: React.FC<RoleManagementScreenProps> = ({
  onBack
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<RoleDefinition | null>(null);
  const [showRoleModal, setShowRoleModal] = useState(false);

  const filteredRoles = ROLE_DEFINITIONS.filter(role =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    role.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRoleClick = (role: RoleDefinition) => {
    setSelectedRole(role);
    setShowRoleModal(true);
  };

  const getModuleName = (moduleId: string) => {
    const module = MODULES.find(m => m.id === moduleId);
    return module?.name || moduleId.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const getRoleStats = () => {
    return {
      totalRoles: ROLE_DEFINITIONS.length,
      activeRoles: ROLE_DEFINITIONS.filter(r => !['customer', 'employee', 'vendor', 'admin'].includes(r.id)).length,
      systemRoles: ROLE_DEFINITIONS.filter(r => ['customer', 'employee', 'vendor', 'admin'].includes(r.id)).length,
      departmentalRoles: ROLE_DEFINITIONS.filter(r => r.id.includes('_department')).length
    };
  };

  const stats = getRoleStats();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 pt-12 pb-6 px-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            aria-label="Go back to admin dashboard"
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="text-center">
            <h1 className="text-xl font-bold text-white">Role Management</h1>
            <p className="text-white/90 text-sm">Manage system roles and permissions</p>
          </div>
          <div className="w-10" />
        </div>

        {/* Search */}
        <div className="relative">
          <Input
            placeholder="Search roles by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Shield className="w-5 h-5 text-gray-400" />}
            className="bg-white/95 backdrop-blur-sm border-0 shadow-lg"
          />
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.totalRoles}</p>
                <p className="text-sm text-gray-600">Total Roles</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.departmentalRoles}</p>
                <p className="text-sm text-gray-600">Departmental</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.systemRoles}</p>
                <p className="text-sm text-gray-600">System Roles</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Settings className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{MODULES.length}</p>
                <p className="text-sm text-gray-600">Modules</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Settings className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Roles Grid */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">System Roles</h2>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Create Role
              </Button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredRoles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => handleRoleClick(role)}
                  className="text-left p-4 border-2 border-gray-200 rounded-xl hover:border-purple-300 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Shield className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{role.name}</h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{role.description}</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded">
                          {role.modules.length} modules
                        </span>
                        <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                          {role.permissions.length} permissions
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Role Detail Modal */}
      {showRoleModal && selectedRole && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">{selectedRole.name}</h2>
              <button
                onClick={() => setShowRoleModal(false)}
                className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center"
              >
                ×
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="space-y-6">
                {/* Role Description */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600">{selectedRole.description}</p>
                </div>

                {/* Modules */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Available Modules</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedRole.modules.map(moduleId => {
                      const module = MODULES.find(m => m.id === moduleId);
                      return (
                        <div key={moduleId} className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                          <h4 className="font-medium text-blue-900">{getModuleName(moduleId)}</h4>
                          <p className="text-sm text-blue-700">{module?.description}</p>
                          {module?.subModules && module.subModules.length > 0 && (
                            <div className="mt-2">
                              <p className="text-xs text-blue-600 font-medium">Sub-modules:</p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {module.subModules.map(subModule => (
                                  <span key={subModule.id} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                    {subModule.name}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Permissions */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Permissions</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    {selectedRole.permissions.includes('*') ? (
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-green-700">All Permissions (Super Admin)</span>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {selectedRole.permissions.map(permission => (
                          <div key={permission} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-gray-700">{permission}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Reporting Structure */}
                {(selectedRole.reportsTo?.length || selectedRole.canManage?.length) && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Reporting Structure</h3>
                    <div className="space-y-3">
                      {selectedRole.reportsTo && selectedRole.reportsTo.length > 0 && (
                        <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
                          <h4 className="font-medium text-yellow-900 mb-2">Reports To:</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedRole.reportsTo.map(roleId => {
                              const reportingRole = ROLE_DEFINITIONS.find(r => r.id === roleId);
                              return (
                                <span key={roleId} className="px-2 py-1 bg-yellow-100 text-yellow-700 text-sm rounded">
                                  {reportingRole?.name || roleId}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {selectedRole.canManage && selectedRole.canManage.length > 0 && (
                        <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                          <h4 className="font-medium text-green-900 mb-2">Can Manage:</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedRole.canManage.map(roleId => (
                              <span key={roleId} className="px-2 py-1 bg-green-100 text-green-700 text-sm rounded">
                                {roleId.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-gray-100 p-6">
              <div className="flex space-x-3">
                <Button variant="outline" className="flex-1">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Role
                </Button>
                <Button
                  onClick={() => setShowRoleModal(false)}
                  className="flex-1"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};