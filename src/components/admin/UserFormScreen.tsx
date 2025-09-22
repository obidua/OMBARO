import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, Lock, Shield, Calendar, Save, Eye, EyeOff, RotateCcw } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { RadioGroup } from '../ui/RadioGroup';
import { User as UserType, UserRole } from '../../types/auth';
import { ROLE_DEFINITIONS } from '../../types/roles';

interface UserFormScreenProps {
  mode: 'create' | 'edit' | 'view';
  user?: UserType;
  onBack: () => void;
  onSave: (userData: Partial<UserType>) => void;
}

export const UserFormScreen: React.FC<UserFormScreenProps> = ({
  mode,
  user,
  onBack,
  onSave
}) => {
  const [formData, setFormData] = useState<Partial<UserType>>({
    name: '',
    email: '',
    mobile: '',
    password: '',
    role: 'customer',
    status: 'active',
    gender: '',
    dateOfBirth: '',
    isVerified: false,
    ...user
  });

  const [formErrors, setFormErrors] = useState<any>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isReadOnly = mode === 'view';
  const isEditing = mode === 'edit';
  const isCreating = mode === 'create';

  const statusOptions = [
    { value: 'active', label: 'Active', icon: <Shield className="w-5 h-5 text-green-600" /> },
    { value: 'inactive', label: 'Inactive', icon: <Shield className="w-5 h-5 text-yellow-600" /> },
    { value: 'suspended', label: 'Suspended', icon: <Shield className="w-5 h-5 text-red-600" /> }
  ];

  const genderOptions = [
    { value: 'male', label: 'Male', icon: <User className="w-5 h-5 text-blue-600" /> },
    { value: 'female', label: 'Female', icon: <User className="w-5 h-5 text-pink-600" /> },
    { value: 'other', label: 'Other', icon: <User className="w-5 h-5 text-purple-600" /> }
  ];

  const validateForm = () => {
    const errors: any = {};

    if (!formData.name?.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.mobile?.trim()) {
      errors.mobile = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      errors.mobile = 'Please enter a valid 10-digit mobile number';
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (isCreating && !formData.password?.trim()) {
      errors.password = 'Password is required for new users';
    }

    if (!formData.role) {
      errors.role = 'Please select a role';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev: any) => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const userData = {
        ...formData,
        id: isCreating ? Date.now().toString() : formData.id,
        createdAt: isCreating ? new Date().toISOString() : formData.createdAt,
        updatedAt: new Date().toISOString(),
        createdBy: isCreating ? 'Super Admin' : formData.createdBy,
        isVerified: true
      };

      onSave(userData);
      
    } catch (error) {
      console.error('Failed to save user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    handleInputChange('password', password);
  };

  const selectedRole = ROLE_DEFINITIONS.find(role => role.id === formData.role);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 pt-12 pb-6 px-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            aria-label="Go back to user management"
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="text-center">
            <h1 className="text-xl font-bold text-white">
              {isCreating ? 'Create New User' : isEditing ? 'Edit User' : 'User Details'}
            </h1>
            <p className="text-white/90 text-sm">
              {isCreating ? 'Add a new user to the system' : isEditing ? 'Modify user information' : 'View user information'}
            </p>
          </div>
          <div className="w-10" />
        </div>
      </div>

      <div className="px-6 py-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name *"
                  placeholder="Enter full name"
                  value={formData.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  error={formErrors.name}
                  disabled={isReadOnly}
                  icon={<User className="w-5 h-5 text-gray-400" />}
                />

                <Input
                  label="Mobile Number *"
                  placeholder="Enter 10-digit mobile number"
                  value={formData.mobile || ''}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                    handleInputChange('mobile', value);
                  }}
                  error={formErrors.mobile}
                  disabled={isReadOnly}
                  icon={<Phone className="w-5 h-5 text-gray-400" />}
                />

                <Input
                  label="Email Address"
                  placeholder="Enter email address"
                  value={formData.email || ''}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  error={formErrors.email}
                  disabled={isReadOnly}
                  icon={<Mail className="w-5 h-5 text-gray-400" />}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      value={formData.dateOfBirth || ''}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      disabled={isReadOnly}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>
                </div>
              </div>

              {/* Gender Selection */}
              <div className="mt-4">
                <RadioGroup
                  label="Gender"
                  options={genderOptions}
                  value={formData.gender || ''}
                  onChange={(value) => handleInputChange('gender', value)}
                  error={formErrors.gender}
                />
              </div>
            </div>

            {/* Authentication & Access */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Authentication & Access</h3>
              
              {/* Password Field */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password {isCreating && '*'}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder={isCreating ? "Enter password" : "Leave blank to keep current"}
                      value={formData.password || ''}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      disabled={isReadOnly}
                      className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50 ${
                        formErrors.password ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {!isReadOnly && (
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5 text-gray-400" />
                        ) : (
                          <Eye className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                    )}
                  </div>
                  {formErrors.password && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>
                  )}
                  {!isReadOnly && (
                    <Button
                      onClick={generatePassword}
                      variant="outline"
                      size="sm"
                      className="mt-2"
                    >
                      <RotateCcw className="w-4 h-4 mr-1" />
                      Generate Password
                    </Button>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">User Status</label>
                  <RadioGroup
                    options={statusOptions}
                    value={formData.status || 'active'}
                    onChange={(value) => handleInputChange('status', value)}
                    error={formErrors.status}
                  />
                </div>
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Assigned Role *</label>
                <select
                  value={formData.role || ''}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  disabled={isReadOnly}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50 ${
                    formErrors.role ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select a role</option>
                  {ROLE_DEFINITIONS.map(role => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
                {formErrors.role && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.role}</p>
                )}
              </div>
            </div>

            {/* Role Information */}
            {selectedRole && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Role Information & Access</h3>
                <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Shield className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-purple-900 mb-1">{selectedRole.name}</h4>
                      <p className="text-purple-700 text-sm mb-3">{selectedRole.description}</p>
                      
                      <div className="space-y-3">
                        <div>
                          <p className="text-purple-800 font-medium text-sm">Available Modules:</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {selectedRole.modules.map(moduleId => (
                              <span key={moduleId} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-lg">
                                {moduleId.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        {selectedRole.reportsTo && selectedRole.reportsTo.length > 0 && (
                          <div>
                            <p className="text-purple-800 font-medium text-sm">Reports To:</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {selectedRole.reportsTo.map(roleId => {
                                const reportingRole = ROLE_DEFINITIONS.find(r => r.id === roleId);
                                return (
                                  <span key={roleId} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-lg">
                                    {reportingRole?.name || roleId}
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {selectedRole.canManage && selectedRole.canManage.length > 0 && (
                          <div>
                            <p className="text-purple-800 font-medium text-sm">Can Manage:</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {selectedRole.canManage.map(roleId => (
                                <span key={roleId} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-lg">
                                  {roleId.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        <div>
                          <p className="text-purple-800 font-medium text-sm">Key Permissions:</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {selectedRole.permissions.slice(0, 5).map(permission => (
                              <span key={permission} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg">
                                {permission}
                              </span>
                            ))}
                            {selectedRole.permissions.length > 5 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg">
                                +{selectedRole.permissions.length - 5} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Metadata (for edit/view modes) */}
            {(isEditing || mode === 'view') && user && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">User ID:</span>
                      <span className="font-medium text-gray-900 ml-2">{user.id}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Created:</span>
                      <span className="font-medium text-gray-900 ml-2">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Created By:</span>
                      <span className="font-medium text-gray-900 ml-2">{user.createdBy || 'System'}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Last Login:</span>
                      <span className="font-medium text-gray-900 ml-2">
                        {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Verified:</span>
                      <span className={`font-medium ml-2 ${user.isVerified ? 'text-green-600' : 'text-red-600'}`}>
                        {user.isVerified ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Last Updated:</span>
                      <span className="font-medium text-gray-900 ml-2">
                        {user.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : 'Never'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-6 border-t border-gray-200">
              <Button
                onClick={onBack}
                variant="outline"
                size="lg"
                className="flex-1"
              >
                {isReadOnly ? 'Close' : 'Cancel'}
              </Button>
              
              {!isReadOnly && (
                <Button
                  onClick={handleSubmit}
                  loading={isLoading}
                  size="lg"
                  className="flex-1"
                >
                  <Save className="w-5 h-5 mr-2" />
                  {isCreating ? 'Create User' : 'Save Changes'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};