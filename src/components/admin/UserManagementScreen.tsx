import React, { useState } from 'react';
import { ArrowLeft, Users, Plus, Search, Filter, Edit, Trash2, Eye, UserCheck, UserX, Shield, Calendar, Phone, Mail } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { User, UserRole } from '../../types/auth';
import { ROLE_DEFINITIONS } from '../../types/roles';

interface UserManagementScreenProps {
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

export const UserManagementScreen: React.FC<UserManagementScreenProps> = ({
  onBack,
  onNavigate
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Mock user data - in real app, this would come from API
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@company.com',
      mobile: '9876543210',
      role: 'employee',
      status: 'active',
      isVerified: true,
      createdAt: '2024-01-15',
      lastLogin: '2025-01-10',
      createdBy: 'Super Admin'
    },
    {
      id: '2',
      name: 'Priya Sharma',
      email: 'priya@company.com',
      mobile: '9876543211',
      role: 'accounts_department',
      status: 'active',
      isVerified: true,
      createdAt: '2024-02-01',
      lastLogin: '2025-01-11',
      createdBy: 'Super Admin'
    },
    {
      id: '3',
      name: 'Rahul Kumar',
      email: 'rahul@company.com',
      mobile: '9876543212',
      role: 'marketing_department',
      status: 'active',
      isVerified: true,
      createdAt: '2024-01-20',
      lastLogin: '2025-01-09',
      createdBy: 'Admin'
    },
    {
      id: '4',
      name: 'Anita Desai',
      email: 'anita@company.com',
      mobile: '9876543213',
      role: 'customer_care',
      status: 'inactive',
      isVerified: true,
      createdAt: '2024-03-01',
      lastLogin: '2025-01-05',
      createdBy: 'HR Department'
    },
    {
      id: '5',
      name: 'Vikram Singh',
      email: 'vikram@company.com',
      mobile: '9876543214',
      role: 'vendor',
      status: 'active',
      isVerified: true,
      createdAt: '2024-02-15',
      lastLogin: '2025-01-11',
      createdBy: 'Admin'
    },
    {
      id: '6',
      name: 'Meera Patel',
      email: 'meera@company.com',
      mobile: '9876543215',
      role: 'legal_department',
      status: 'active',
      isVerified: true,
      createdAt: '2024-01-10',
      lastLogin: '2025-01-10',
      createdBy: 'Super Admin'
    },
    {
      id: '7',
      name: 'Amit Sharma',
      email: 'amit@company.com',
      mobile: '9876543216',
      role: 'finance_department',
      status: 'active',
      isVerified: true,
      createdAt: '2024-01-25',
      lastLogin: '2025-01-11',
      createdBy: 'Directors'
    },
    {
      id: '8',
      name: 'Sunita Reddy',
      email: 'sunita@company.com',
      mobile: '9876543217',
      role: 'hr_department',
      status: 'active',
      isVerified: true,
      createdAt: '2024-02-10',
      lastLogin: '2025-01-08',
      createdBy: 'Directors'
    }
  ]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.mobile?.includes(searchQuery);
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'inactive': return 'bg-yellow-100 text-yellow-700';
      case 'suspended': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getRoleDisplayName = (role?: UserRole) => {
    if (!role) return 'No Role';
    const roleDefinition = ROLE_DEFINITIONS.find(r => r.id === role);
    return roleDefinition?.name || role;
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
  };

  const handleToggleStatus = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  const stats = [
    { label: 'Total Users', value: users.length.toString(), icon: Users, color: 'bg-blue-100 text-blue-600' },
    { label: 'Active Users', value: users.filter(u => u.status === 'active').length.toString(), icon: UserCheck, color: 'bg-green-100 text-green-600' },
    { label: 'Departments', value: new Set(users.map(u => u.role)).size.toString(), icon: Shield, color: 'bg-purple-100 text-purple-600' },
    { label: 'New This Month', value: '12', icon: Calendar, color: 'bg-orange-100 text-orange-600' },
  ];

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
            <h1 className="text-xl font-bold text-white">User & Role Management</h1>
            <p className="text-white/90 text-sm">Manage users, roles, and permissions</p>
          </div>
          <div className="w-10" />
        </div>

        {/* Search and Filter */}
        <div className="space-y-3">
          <div className="relative">
            <Input
              placeholder="Search users by name, email, or mobile..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-5 h-5 text-gray-400" />}
              className="bg-white/95 backdrop-blur-sm border-0 shadow-lg"
            />
          </div>
          
          <div className="flex space-x-2">
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-3 py-2 bg-white/95 backdrop-blur-sm border-0 rounded-lg text-sm shadow-lg focus:ring-2 focus:ring-white/50"
            >
              <option value="all">All Roles</option>
              {ROLE_DEFINITIONS.map(role => (
                <option key={role.id} value={role.id}>{role.name}</option>
              ))}
            </select>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-white/95 backdrop-blur-sm border-0 rounded-lg text-sm shadow-lg focus:ring-2 focus:ring-white/50"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
          <div className="flex space-x-3">
            <Button
              onClick={() => onNavigate('userForm', { mode: 'create' })}
              size="md"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New User
            </Button>
            <Button variant="outline" size="md">
              <Filter className="w-4 h-4 mr-2" />
              Advanced Filter
            </Button>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">User</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Role</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Last Login</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Created By</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-purple-600 font-semibold text-sm">
                            {user.name?.charAt(0) || 'U'}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{user.name}</p>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Phone className="w-3 h-3" />
                            <span>{user.mobile}</span>
                            {user.email && (
                              <>
                                <span>•</span>
                                <Mail className="w-3 h-3" />
                                <span>{user.email}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                        {getRoleDisplayName(user.role)}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-lg text-sm font-medium ${getStatusColor(user.status || 'active')}`}>
                        {user.status?.charAt(0).toUpperCase() + user.status?.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm">
                        <p className="text-gray-900">{user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}</p>
                        <p className="text-gray-500">
                          {user.lastLogin ? new Date(user.lastLogin).toLocaleTimeString() : ''}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-600">{user.createdBy}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => onNavigate('userForm', { mode: 'view', user })}
                          className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center hover:bg-blue-200 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4 text-blue-600" />
                        </button>
                        <button
                          onClick={() => onNavigate('userForm', { mode: 'edit', user })}
                          className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                          title="Edit User"
                        >
                          <Edit className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() => handleToggleStatus(user.id!)}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                            user.status === 'active' 
                              ? 'bg-yellow-100 hover:bg-yellow-200' 
                              : 'bg-green-100 hover:bg-green-200'
                          }`}
                          title={user.status === 'active' ? 'Deactivate User' : 'Activate User'}
                        >
                          {user.status === 'active' ? (
                            <UserX className="w-4 h-4 text-yellow-600" />
                          ) : (
                            <UserCheck className="w-4 h-4 text-green-600" />
                          )}
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('Are you sure you want to delete this user?')) {
                              handleDeleteUser(user.id!);
                            }
                          }}
                          className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center hover:bg-red-200 transition-colors"
                          title="Delete User"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || filterRole !== 'all' || filterStatus !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'Get started by adding your first user'
              }
            </p>
            <Button onClick={() => onNavigate('userForm', { mode: 'create' })}>
              <Plus className="w-4 h-4 mr-2" />
              Add First User
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};