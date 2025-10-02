import React, { useState } from 'react';
import { LogOut, Users, MapPin, BarChart3, Settings, Shield, AlertTriangle, TrendingUp, DollarSign, UserCheck, Building, Search, Filter, Eye, CreditCard as Edit, Ban, CheckCircle, XCircle, Navigation, UserCog, Lock } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { LocationTrackingScreen } from '../admin/LocationTrackingScreen';
import { UserManagementScreen } from '../admin/UserManagementScreen';
import { UserFormScreen } from '../admin/UserFormScreen';
import { RoleManagementScreen } from '../admin/RoleManagementScreen';
import { PermissionMatrixScreen } from '../admin/PermissionMatrixScreen';
import { User } from '../../types/auth';

interface AdminDashboardScreenProps {
  onLogout: () => void;
  user: any;
  onNavigate?: (screen: string) => void;
}

export const AdminDashboardScreen: React.FC<AdminDashboardScreenProps> = ({
  onLogout,
  user,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentScreen, setCurrentScreen] = useState<'dashboard' | 'locationTracking' | 'userManagement' | 'userForm' | 'roleManagement' | 'permissionMatrix'>('dashboard');
  const [screenData, setScreenData] = useState<any>(null);

  const stats = [
    { label: 'Total Users', value: '2,847', icon: Users, color: 'bg-blue-100 text-blue-600', change: '+234 this month' },
    { label: 'Active Spas', value: '156', icon: MapPin, color: 'bg-green-100 text-green-600', change: '+12 this week' },
    { label: 'Platform Revenue', value: '₹8.4L', icon: DollarSign, color: 'bg-purple-100 text-purple-600', change: '+24% growth' },
    { label: 'Pending Reviews', value: '23', icon: AlertTriangle, color: 'bg-yellow-100 text-yellow-600', change: '8 urgent' },
  ];

  const users = [
    { id: 1, name: 'Priya Sharma', email: 'priya@email.com', type: 'Customer', status: 'Active', joinDate: '2024-01-15', bookings: 12 },
    { id: 2, name: 'Rahul Kumar', email: 'rahul@email.com', type: 'Vendor', status: 'Active', joinDate: '2024-02-20', bookings: 0 },
    { id: 3, name: 'Anita Desai', email: 'anita@email.com', type: 'Customer', status: 'Suspended', joinDate: '2024-01-08', bookings: 8 },
    { id: 4, name: 'Vikram Singh', email: 'vikram@email.com', type: 'Employee', status: 'Active', joinDate: '2024-03-01', bookings: 0 },
  ];

  const spas = [
    { id: 1, name: 'Serenity Wellness Spa', owner: 'Meera Patel', location: 'Koramangala', status: 'Active', rating: 4.8, services: 15, revenue: '₹2.4L' },
    { id: 2, name: 'Bliss Beauty Center', owner: 'Rajesh Kumar', location: 'Indiranagar', status: 'Pending', rating: 0, services: 8, revenue: '₹0' },
    { id: 3, name: 'Ayurvedic Healing', owner: 'Dr. Sunita', location: 'Whitefield', status: 'Active', rating: 4.9, services: 22, revenue: '₹3.1L' },
    { id: 4, name: 'Urban Spa Lounge', owner: 'Amit Sharma', location: 'MG Road', status: 'Review', rating: 4.2, services: 12, revenue: '₹1.8L' },
  ];

  const systemAlerts = [
    { id: 1, type: 'Security', message: 'Multiple failed login attempts detected', priority: 'High', time: '5 min ago' },
    { id: 2, type: 'Revenue', message: 'Monthly revenue target achieved', priority: 'Medium', time: '2 hours ago' },
    { id: 3, type: 'System', message: 'Database backup completed successfully', priority: 'Low', time: '1 day ago' },
    { id: 4, type: 'User', message: 'New vendor registration requires approval', priority: 'Medium', time: '3 hours ago' },
  ];

  const pendingApprovals = [
    { id: 1, type: 'Spa Registration', item: 'Luxury Wellness Center', submitter: 'Vendor', priority: 'High', date: '2 days ago' },
    { id: 2, type: 'Service Update', item: 'New massage therapy', submitter: 'Serenity Spa', priority: 'Medium', date: '1 day ago' },
    { id: 3, type: 'User Report', item: 'Inappropriate behavior', submitter: 'Customer', priority: 'High', date: '4 hours ago' },
    { id: 4, type: 'Price Change', item: 'Service pricing update', submitter: 'Bliss Center', priority: 'Low', date: '1 week ago' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700';
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      case 'Suspended': return 'bg-red-100 text-red-700';
      case 'Review': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getAlertTypeColor = (type: string) => {
    switch (type) {
      case 'Security': return 'bg-red-100 text-red-700';
      case 'Revenue': return 'bg-green-100 text-green-700';
      case 'System': return 'bg-blue-100 text-blue-700';
      case 'User': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // Handle screen navigation
  if (currentScreen === 'locationTracking') {
    return (
      <LocationTrackingScreen
        onBack={() => setCurrentScreen('dashboard')}
      />
    );
  }

  if (currentScreen === 'userManagement') {
    return (
      <UserManagementScreen
        onBack={() => setCurrentScreen('dashboard')}
        onNavigate={(screen, data) => {
          setScreenData(data);
          setCurrentScreen(screen as any);
        }}
      />
    );
  }

  if (currentScreen === 'userForm') {
    return (
      <UserFormScreen
        mode={screenData?.mode || 'create'}
        user={screenData?.user}
        onBack={() => setCurrentScreen('userManagement')}
        onSave={(userData) => {
          console.log('User saved:', userData);
          alert(`User ${screenData?.mode === 'create' ? 'created' : 'updated'} successfully!`);
          setCurrentScreen('userManagement');
        }}
      />
    );
  }

  if (currentScreen === 'roleManagement') {
    return (
      <RoleManagementScreen
        onBack={() => setCurrentScreen('dashboard')}
      />
    );
  }

  if (currentScreen === 'permissionMatrix') {
    return (
      <PermissionMatrixScreen
        onBack={() => setCurrentScreen('dashboard')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 pt-12 pb-6 px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
            <p className="text-white/90">System Administrator • ID: {user.mobile}</p>
          </div>
          <button
            onClick={onLogout}
            aria-label="Logout from admin portal"
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <LogOut className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Input
            placeholder="Search users, spas, or system data..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search className="w-5 h-5 text-gray-400" />}
            className="bg-white/95 backdrop-blur-sm border-0 shadow-lg"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Filter className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
              <p className="text-xs text-gray-500">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="flex border-b border-gray-100 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'users', label: 'User Management' },
              { id: 'spas', label: 'Spa Management' },
              { id: 'approvals', label: 'Approvals' },
              { id: 'analytics', label: 'Analytics' },
              { id: 'security', label: 'Security' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 py-4 px-6 text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Quick Actions */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">System Management</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Button
                      onClick={() => setActiveTab('users')}
                      size="lg"
                      className="w-full justify-start h-16"
                    >
                      <Users className="w-6 h-6 mr-3" />
                      <div className="text-left">
                        <p className="font-semibold">User Management</p>
                        <p className="text-sm opacity-90">Manage all platform users</p>
                      </div>
                    </Button>

                    <Button
                      onClick={() => setCurrentScreen('userManagement')}
                      variant="outline"
                      size="lg"
                      className="w-full justify-start h-16"
                    >
                      <UserCog className="w-6 h-6 mr-3" />
                      <div className="text-left">
                        <p className="font-semibold">User & Role Management</p>
                        <p className="text-sm opacity-70">Create users and assign roles</p>
                      </div>
                    </Button>

                    <Button
                      onClick={() => setCurrentScreen('roleManagement')}
                      variant="outline"
                      size="lg"
                      className="w-full justify-start h-16"
                    >
                      <Shield className="w-6 h-6 mr-3" />
                      <div className="text-left">
                        <p className="font-semibold">Role Management</p>
                        <p className="text-sm opacity-70">Manage system roles</p>
                      </div>
                    </Button>

                    <Button
                      onClick={() => setCurrentScreen('permissionMatrix')}
                      variant="outline"
                      size="lg"
                      className="w-full justify-start h-16"
                    >
                      <Lock className="w-6 h-6 mr-3" />
                      <div className="text-left">
                        <p className="font-semibold">Permission Matrix</p>
                        <p className="text-sm opacity-70">Configure role permissions</p>
                      </div>
                    </Button>

                    <Button
                      onClick={() => setActiveTab('spas')}
                      variant="outline"
                      size="lg"
                      className="w-full justify-start h-16"
                    >
                      <MapPin className="w-6 h-6 mr-3" />
                      <div className="text-left">
                        <p className="font-semibold">Spa Management</p>
                        <p className="text-sm opacity-70">Approve and manage spas</p>
                      </div>
                    </Button>

                    <Button
                      onClick={() => setActiveTab('approvals')}
                      variant="outline"
                      size="lg"
                      className="w-full justify-start h-16"
                    >
                      <AlertTriangle className="w-6 h-6 mr-3" />
                      <div className="text-left">
                        <p className="font-semibold">Pending Approvals</p>
                        <p className="text-sm opacity-70">23 items need review</p>
                      </div>
                    </Button>

                    <Button
                      onClick={() => setActiveTab('analytics')}
                      variant="outline"
                      size="lg"
                      className="w-full justify-start h-16"
                    >
                      <BarChart3 className="w-6 h-6 mr-3" />
                      <div className="text-left">
                        <p className="font-semibold">Analytics</p>
                        <p className="text-sm opacity-70">Platform performance</p>
                      </div>
                    </Button>

                    <Button
                      onClick={() => setActiveTab('security')}
                      variant="outline"
                      size="lg"
                      className="w-full justify-start h-16"
                    >
                      <Shield className="w-6 h-6 mr-3" />
                      <div className="text-left">
                        <p className="font-semibold">Security Center</p>
                        <p className="text-sm opacity-70">Monitor system security</p>
                      </div>
                    </Button>

                    <Button
                      onClick={() => console.log('Settings')}
                      variant="outline"
                      size="lg"
                      className="w-full justify-start h-16"
                    >
                      <Settings className="w-6 h-6 mr-3" />
                      <div className="text-left">
                        <p className="font-semibold">System Settings</p>
                        <p className="text-sm opacity-70">Configure platform</p>
                      </div>
                    </Button>

                    <Button
                      onClick={() => setCurrentScreen('docPortal')} // Assuming 'docPortal' is a valid screen name in your navigation
                      variant="outline"
                      size="lg"
                      className="w-full justify-start h-16"
                    >
                      <Building className="w-6 h-6 mr-3" />
                      <div className="text-left">
                        <p className="font-semibold">Doc Portal</p>
                        <p className="text-sm opacity-70">Access project documentation</p>
                      </div>
                    </Button>


                    <Button
                      onClick={() => setCurrentScreen('locationTracking')}
                      variant="outline"
                      size="lg"
                      className="w-full justify-start h-16"
                    >
                      <Navigation className="w-6 h-6 mr-3" />
                      <div className="text-left">
                        <p className="font-semibold">Location Tracking</p>
                        <p className="text-sm opacity-70">Track employee locations</p>
                      </div>
                    </Button>

                    <Button
                      onClick={() => onNavigate && onNavigate('vendorApproval')}
                      variant="outline"
                      size="lg"
                      className="w-full justify-start h-16 border-amber-300 hover:border-amber-400 hover:bg-amber-50"
                    >
                      <Building className="w-6 h-6 mr-3 text-amber-600" />
                      <div className="text-left">
                        <p className="font-semibold text-amber-900">Vendor Approvals</p>
                        <p className="text-sm opacity-70 text-amber-700">Review vendor applications</p>
                      </div>
                    </Button>
                  </div>
                </div>

                {/* System Alerts */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">System Alerts</h3>
                  <div className="space-y-3">
                    {systemAlerts.map((alert) => (
                      <div key={alert.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getAlertTypeColor(alert.type)}`}>
                            <AlertTriangle className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{alert.message}</h4>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getAlertTypeColor(alert.type)}`}>
                                {alert.type}
                              </span>
                              <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getPriorityColor(alert.priority)}`}>
                                {alert.priority}
                              </span>
                              <span className="text-xs text-gray-500">{alert.time}</span>
                            </div>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Review
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">Export</Button>
                    <Button size="sm" variant="outline">Filter</Button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                          <Users className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{user.name}</h4>
                          <p className="text-sm text-gray-600">{user.email} • {user.type}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(user.status)}`}>
                              {user.status}
                            </span>
                            <span className="text-xs text-gray-500">Joined {user.joinDate}</span>
                            {user.bookings > 0 && (
                              <span className="text-xs text-gray-500">• {user.bookings} bookings</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center hover:bg-blue-200 transition-colors">
                          <Eye className="w-4 h-4 text-blue-600" />
                        </button>
                        <button className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors">
                          <Edit className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center hover:bg-red-200 transition-colors">
                          <Ban className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'spas' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Spa Management</h3>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">Export</Button>
                    <Button size="sm" variant="outline">Filter</Button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {spas.map((spa) => (
                    <div key={spa.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                          <MapPin className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{spa.name}</h4>
                          <p className="text-sm text-gray-600">{spa.owner} • {spa.location}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(spa.status)}`}>
                              {spa.status}
                            </span>
                            {spa.rating > 0 && (
                              <span className="text-xs text-gray-500">⭐ {spa.rating}</span>
                            )}
                            <span className="text-xs text-gray-500">{spa.services} services</span>
                            <span className="text-xs text-gray-500">• {spa.revenue}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center hover:bg-blue-200 transition-colors">
                          <Eye className="w-4 h-4 text-blue-600" />
                        </button>
                        <button className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center hover:bg-green-200 transition-colors">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </button>
                        <button className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center hover:bg-red-200 transition-colors">
                          <XCircle className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'approvals' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Pending Approvals</h3>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">Bulk Approve</Button>
                    <Button size="sm" variant="outline">Filter</Button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {pendingApprovals.map((approval) => (
                    <div key={approval.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                          <AlertTriangle className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{approval.type}</h4>
                          <p className="text-sm text-gray-600">{approval.item} • by {approval.submitter}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getPriorityColor(approval.priority)}`}>
                              {approval.priority} Priority
                            </span>
                            <span className="text-xs text-gray-500">{approval.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          Review
                        </Button>
                        <Button size="sm">
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Platform Analytics</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">User Growth</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Users</span>
                        <span className="font-semibold">2,847</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">New This Month</span>
                        <span className="font-semibold text-green-600">+234</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Growth Rate</span>
                        <span className="font-semibold text-green-600">+8.9%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Revenue Metrics</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Revenue</span>
                        <span className="font-semibold">₹8.4L</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">This Month</span>
                        <span className="font-semibold text-green-600">₹2.1L</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Growth</span>
                        <span className="font-semibold text-green-600">+24%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Platform Health</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Active Spas</span>
                        <span className="font-semibold">156</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Success Rate</span>
                        <span className="font-semibold text-green-600">96.2%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Avg. Rating</span>
                        <span className="font-semibold text-yellow-600">4.7 ⭐</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Booking Analytics</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Bookings</span>
                        <span className="font-semibold">1,234</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">This Month</span>
                        <span className="font-semibold">342</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Completion Rate</span>
                        <span className="font-semibold text-green-600">94%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">System Performance</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Uptime</span>
                        <span className="font-semibold text-green-600">99.9%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Response Time</span>
                        <span className="font-semibold">&lt; 200ms</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Error Rate</span>
                        <span className="font-semibold text-green-600">0.1%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Geographic Data</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Top City</span>
                        <span className="font-semibold">Bangalore</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Coverage</span>
                        <span className="font-semibold">12 Cities</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Expansion</span>
                        <span className="font-semibold text-green-600">+3 Cities</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button variant="outline">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Export Analytics
                  </Button>
                  <Button variant="outline">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Detailed Reports
                  </Button>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Security Center</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Security Alerts</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Failed Logins</span>
                        <span className="font-semibold text-red-600">23</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Blocked IPs</span>
                        <span className="font-semibold">5</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Suspicious Activity</span>
                        <span className="font-semibold text-yellow-600">2</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">System Security</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">SSL Status</span>
                        <span className="font-semibold text-green-600">Active</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Firewall</span>
                        <span className="font-semibold text-green-600">Protected</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Scan</span>
                        <span className="font-semibold">2 hours ago</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Data Protection</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Backup Status</span>
                        <span className="font-semibold text-green-600">Up to date</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Encryption</span>
                        <span className="font-semibold text-green-600">AES-256</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Compliance</span>
                        <span className="font-semibold text-green-600">GDPR</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Access Control</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Admin Users</span>
                        <span className="font-semibold">3</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">2FA Enabled</span>
                        <span className="font-semibold text-green-600">100%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Session Timeout</span>
                        <span className="font-semibold">30 min</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button variant="outline">
                    <Shield className="w-4 h-4 mr-2" />
                    Run Security Scan
                  </Button>
                  <Button variant="outline">
                    <Settings className="w-4 h-4 mr-2" />
                    Security Settings
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};