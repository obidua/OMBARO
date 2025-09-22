import React, { useState } from 'react';
import { ArrowLeft, Shield, CheckCircle, XCircle, Save, RotateCcw } from 'lucide-react';
import { Button } from '../ui/Button';
import { UserRole } from '../../types/auth';
import { ROLE_DEFINITIONS, MODULES, RoleDefinition } from '../../types/roles';

interface PermissionMatrixScreenProps {
  onBack: () => void;
}

export const PermissionMatrixScreen: React.FC<PermissionMatrixScreenProps> = ({
  onBack
}) => {
  const [permissionMatrix, setPermissionMatrix] = useState<{[roleId: string]: {[permission: string]: boolean}}>(() => {
    const matrix: {[roleId: string]: {[permission: string]: boolean}} = {};
    
    // Initialize matrix with current role permissions
    ROLE_DEFINITIONS.forEach(role => {
      matrix[role.id] = {};
      
      // Get all possible permissions from modules
      const allPermissions = new Set<string>();
      MODULES.forEach(module => {
        module.permissions.forEach(permission => allPermissions.add(permission));
        module.subModules.forEach(subModule => {
          subModule.permissions.forEach(permission => allPermissions.add(permission));
        });
      });

      // Set current permissions
      allPermissions.forEach(permission => {
        matrix[role.id][permission] = role.permissions.includes(permission) || role.permissions.includes('*');
      });
    });

    return matrix;
  });

  const [hasChanges, setHasChanges] = useState(false);

  // Get all unique permissions
  const allPermissions = Array.from(new Set(
    MODULES.flatMap(module => [
      ...module.permissions,
      ...module.subModules.flatMap(sub => sub.permissions)
    ])
  )).sort();

  const togglePermission = (roleId: string, permission: string) => {
    setPermissionMatrix(prev => ({
      ...prev,
      [roleId]: {
        ...prev[roleId],
        [permission]: !prev[roleId][permission]
      }
    }));
    setHasChanges(true);
  };

  const handleSaveChanges = async () => {
    // In real app, this would call API to update role permissions
    console.log('Saving permission changes:', permissionMatrix);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setHasChanges(false);
    alert('Permission changes saved successfully!');
  };

  const handleResetChanges = () => {
    // Reset to original state
    window.location.reload();
  };

  const getPermissionCategory = (permission: string) => {
    const [category] = permission.split(':');
    return category;
  };

  const groupedPermissions = allPermissions.reduce((groups, permission) => {
    const category = getPermissionCategory(permission);
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(permission);
    return groups;
  }, {} as {[category: string]: string[]});

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 pt-12 pb-6 px-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            aria-label="Go back to admin dashboard"
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="text-center">
            <h1 className="text-xl font-bold text-white">Permission Matrix</h1>
            <p className="text-white/90 text-sm">Configure role permissions</p>
          </div>
          <div className="w-10" />
        </div>

        {hasChanges && (
          <div className="bg-yellow-100 border border-yellow-300 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-yellow-600" />
                <span className="text-yellow-800 font-medium">You have unsaved changes</span>
              </div>
              <div className="flex space-x-2">
                <Button
                  onClick={handleResetChanges}
                  variant="outline"
                  size="sm"
                  className="bg-white"
                >
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Reset
                </Button>
                <Button
                  onClick={handleSaveChanges}
                  size="sm"
                  className="bg-yellow-600 hover:bg-yellow-700"
                >
                  <Save className="w-4 h-4 mr-1" />
                  Save
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="px-6 py-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 sticky left-0 bg-gray-50 z-10">
                    Role / Permission
                  </th>
                  {Object.keys(groupedPermissions).map(category => (
                    <th key={category} className="text-center py-4 px-3 font-semibold text-gray-900 min-w-[120px]">
                      <div className="transform -rotate-45 origin-center">
                        {category.replace('_', ' ').toUpperCase()}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {ROLE_DEFINITIONS.map((role) => (
                  <tr key={role.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6 sticky left-0 bg-white z-10 border-r border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Shield className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{role.name}</p>
                          <p className="text-xs text-gray-500">{role.id}</p>
                        </div>
                      </div>
                    </td>
                    {Object.entries(groupedPermissions).map(([category, permissions]) => (
                      <td key={category} className="py-4 px-3 text-center">
                        <div className="space-y-1">
                          {permissions.map(permission => (
                            <button
                              key={permission}
                              onClick={() => togglePermission(role.id, permission)}
                              className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                                permissionMatrix[role.id]?.[permission]
                                  ? 'bg-green-100 hover:bg-green-200'
                                  : 'bg-red-100 hover:bg-red-200'
                              }`}
                              title={`${permission} for ${role.name}`}
                            >
                              {permissionMatrix[role.id]?.[permission] ? (
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              ) : (
                                <XCircle className="w-4 h-4 text-red-600" />
                              )}
                            </button>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};