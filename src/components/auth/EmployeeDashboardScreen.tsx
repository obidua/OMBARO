import React, { useState } from 'react';
import { LogOut, Plus, MapPin, Users, BarChart3, Settings, Search, Filter, Eye, Edit, Trash2, Calendar, Star, TrendingUp, AlertCircle, Clock, FileText, User } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { AttendanceTracker } from '../ui/AttendanceTracker';
import { SelfAttendanceScreen } from '../employee/SelfAttendanceScreen';
import { LeaveRequestScreen } from '../employee/LeaveRequestScreen';
import { HRDocumentsScreen } from '../employee/HRDocumentsScreen';
import { EmployeeProfileScreen } from '../employee/EmployeeProfileScreen';
import { EmployeeSettingsScreen } from '../employee/EmployeeSettingsScreen';
import { AttendanceStatus } from '../../types/services';

interface EmployeeDashboardScreenProps {
  onLogout: () => void;
  onNavigate: (screen: string) => void;
  user: any;
}

export const EmployeeDashboardScreen: React.FC<EmployeeDashboardScreenProps> = ({
  onLogout,
  onNavigate,
  user
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [currentScreen, setCurrentScreen] = useState<'dashboard' | 'selfAttendance' | 'leaveRequest' | 'hrDocuments' | 'employeeProfile' | 'employeeSettings'>('dashboard');

  const stats = [
    { label: 'Total Spas', value: '47', icon: MapPin, color: 'bg-purple-100 text-purple-600', change: '+5 this month' },
    { label: 'Active Vendors', value: '32', icon: Users, color: 'bg-green-100 text-green-600', change: '+3 this week' },
    { label: 'Pending Approvals', value: '8', icon: AlertCircle, color: 'bg-orange-100 text-orange-600', change: '2 urgent' },
    { label: 'Monthly Revenue', value: '₹2.4L', icon: TrendingUp, color: 'bg-blue-100 text-blue-600', change: '+12% growth' },
  ];

  const recentSpas = [
    { id: 1, name: 'Serenity Wellness Spa', location: 'Koramangala', status: 'Active', rating: 4.8, onboardedBy: 'You', date: '2 days ago' },
    { id: 2, name: 'Bliss Beauty Center', location: 'Indiranagar', status: 'Pending', rating: 0, onboardedBy: 'Rahul K.', date: '1 week ago' },
    { id: 3, name: 'Ayurvedic Healing', location: 'Whitefield', status: 'Active', rating: 4.9, onboardedBy: 'You', date: '2 weeks ago' },
    { id: 4, name: 'Urban Spa Lounge', location: 'MG Road', status: 'Review', rating: 0, onboardedBy: 'Priya S.', date: '3 days ago' },
  ];

  const pendingApprovals = [
    { id: 1, type: 'Spa Registration', name: 'Luxury Spa & Wellness', priority: 'High', submittedBy: 'Vendor', date: '1 day ago' },
    { id: 2, type: 'Service Update', name: 'Bliss Beauty Center', priority: 'Medium', submittedBy: 'Vendor', date: '3 days ago' },
    { id: 3, type: 'Price Change', name: 'Serenity Wellness', priority: 'Low', submittedBy: 'Vendor', date: '1 week ago' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700';
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
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

  // Handle screen navigation
  if (currentScreen === 'selfAttendance') {
    return (
      <SelfAttendanceScreen
        employeeId={user.mobile || 'EMP001'}
        onBack={() => setCurrentScreen('dashboard')}
      />
    );
  }

  if (currentScreen === 'leaveRequest') {
    return (
      <LeaveRequestScreen
        employeeId={user.mobile || 'EMP001'}
        onBack={() => setCurrentScreen('dashboard')}
      />
    );
  }

  if (currentScreen === 'hrDocuments') {
    return (
      <HRDocumentsScreen
        employeeId={user.mobile || 'EMP001'}
        onBack={() => setCurrentScreen('dashboard')}
      />
    );
  }

  if (currentScreen === 'employeeProfile') {
    return (
      <EmployeeProfileScreen
        employeeId={user.mobile || 'EMP001'}
        onBack={() => setCurrentScreen('dashboard')}
      />
    );
  }

  if (currentScreen === 'employeeSettings') {
    return (
      <EmployeeSettingsScreen
        onBack={() => setCurrentScreen('dashboard')}
        onLogout={onLogout}
      />
    );
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 pt-12 pb-4 sm:pb-6 px-3 sm:px-4 md:px-6">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">Employee Dashboard</h1>
            <p className="text-sm sm:text-base text-white/90">Welcome back, Employee ID: {user.mobile}</p>
          </div>
          <button
            onClick={onLogout}
            aria-label="Logout from employee portal"
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <LogOut className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Input
            placeholder="Search spas, vendors, or services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search className="w-5 h-5 text-gray-400" />}
            className="bg-white/95 backdrop-blur-sm border-0 shadow-lg"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <Filter className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-3 sm:px-4 md:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className={`w-10 sm:w-12 h-10 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-5 sm:w-6 h-5 sm:h-6" />
                </div>
                <div className="text-right">
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-gray-500">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="flex border-b border-gray-100 overflow-x-auto scrollbar-hide">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'spas', label: 'Spa Management' },
              { id: 'approvals', label: 'Pending Approvals' },
              { id: 'reports', label: 'Reports' },
              { id: 'attendance', label: 'Attendance' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 py-3 sm:py-4 px-4 sm:px-6 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-4 sm:p-6">
            {activeTab === 'overview' && (
              <div className="space-y-4 sm:space-y-6">
                {/* Quick Actions */}
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    <Button
                      onClick={() => onNavigate('spaOnboarding')}
                      size="lg"
                      className="w-full justify-start h-14 sm:h-16 text-left"
                    >
                      <Plus className="w-5 sm:w-6 h-5 sm:h-6 mr-2 sm:mr-3 flex-shrink-0" />
                      <div className="text-left">
                        <p className="text-sm sm:text-base font-semibold">Onboard New Spa</p>
                        <p className="text-xs sm:text-sm opacity-90">Add a new spa to platform</p>
                      </div>
                    </Button>

                    <Button
                      onClick={() => setActiveTab('spas')}
                      variant="outline"
                      size="lg"
                      className="w-full justify-start h-14 sm:h-16 text-left"
                    >
                      <MapPin className="w-5 sm:w-6 h-5 sm:h-6 mr-2 sm:mr-3 flex-shrink-0" />
                      <div className="text-left">
                        <p className="text-sm sm:text-base font-semibold">Manage Spas</p>
                        <p className="text-xs sm:text-sm opacity-70">View and edit existing spas</p>
                      </div>
                    </Button>

                    <Button
                      onClick={() => setActiveTab('approvals')}
                      variant="outline"
                      size="lg"
                      className="w-full justify-start h-14 sm:h-16 text-left"
                    >
                      <AlertCircle className="w-5 sm:w-6 h-5 sm:h-6 mr-2 sm:mr-3 flex-shrink-0" />
                      <div className="text-left">
                        <p className="text-sm sm:text-base font-semibold">Review Approvals</p>
                        <p className="text-xs sm:text-sm opacity-70">8 items need attention</p>
                      </div>
                    </Button>

                    <Button
                      onClick={() => console.log('Vendor management')}
                      variant="outline"
                      size="lg"
                      className="w-full justify-start h-14 sm:h-16 text-left"
                    >
                      <Users className="w-5 sm:w-6 h-5 sm:h-6 mr-2 sm:mr-3 flex-shrink-0" />
                      <div className="text-left">
                        <p className="text-sm sm:text-base font-semibold">Vendor Relations</p>
                        <p className="text-xs sm:text-sm opacity-70">Manage vendor partnerships</p>
                      </div>
                    </Button>

                    <Button
                      onClick={() => setActiveTab('reports')}
                      variant="outline"
                      size="lg"
                      className="w-full justify-start h-14 sm:h-16 text-left"
                    >
                      <BarChart3 className="w-5 sm:w-6 h-5 sm:h-6 mr-2 sm:mr-3 flex-shrink-0" />
                      <div className="text-left">
                        <p className="text-sm sm:text-base font-semibold">Analytics</p>
                        <p className="text-xs sm:text-sm opacity-70">View performance metrics</p>
                      </div>
                    </Button>

                    <Button
                      onClick={() => setCurrentScreen('employeeSettings')}
                      variant="outline"
                      size="lg"
                      className="w-full justify-start h-14 sm:h-16 text-left"
                    >
                      <Settings className="w-5 sm:w-6 h-5 sm:h-6 mr-2 sm:mr-3 flex-shrink-0" />
                      <div className="text-left">
                        <p className="text-sm sm:text-base font-semibold">Settings</p>
                        <p className="text-xs sm:text-sm opacity-70">Configure preferences</p>
                      </div>
                    </Button>

                    <Button
                      onClick={() => setCurrentScreen('employeeProfile')}
                      variant="outline"
                      size="lg"
                      className="w-full justify-start h-14 sm:h-16 text-left"
                    >
                      <User className="w-5 sm:w-6 h-5 sm:h-6 mr-2 sm:mr-3 flex-shrink-0" />
                      <div className="text-left">
                        <p className="text-sm sm:text-base font-semibold">My Profile</p>
                        <p className="text-xs sm:text-sm opacity-70">View and edit profile</p>
                      </div>
                    </Button>

                    <Button
                      onClick={() => setCurrentScreen('selfAttendance')}
                      variant="outline"
                      size="lg"
                      className="w-full justify-start h-14 sm:h-16 text-left"
                    >
                      <Clock className="w-5 sm:w-6 h-5 sm:h-6 mr-2 sm:mr-3 flex-shrink-0" />
                      <div className="text-left">
                        <p className="text-sm sm:text-base font-semibold">Self Attendance</p>
                        <p className="text-xs sm:text-sm opacity-70">Mark attendance with location</p>
                      </div>
                    </Button>

                    <Button
                      onClick={() => setCurrentScreen('leaveRequest')}
                      variant="outline"
                      size="lg"
                      className="w-full justify-start h-14 sm:h-16 text-left"
                    >
                      <FileText className="w-5 sm:w-6 h-5 sm:h-6 mr-2 sm:mr-3 flex-shrink-0" />
                      <div className="text-left">
                        <p className="text-sm sm:text-base font-semibold">Leave Management</p>
                        <p className="text-xs sm:text-sm opacity-70">Apply for leave or view history</p>
                      </div>
                    </Button>

                    <Button
                      onClick={() => setCurrentScreen('hrDocuments')}
                      variant="outline"
                      size="lg"
                      className="w-full justify-start h-14 sm:h-16 text-left"
                    >
                      <User className="w-5 sm:w-6 h-5 sm:h-6 mr-2 sm:mr-3 flex-shrink-0" />
                      <div className="text-left">
                        <p className="text-sm sm:text-base font-semibold">HR Documents</p>
                        <p className="text-xs sm:text-sm opacity-70">Salary, documents & performance</p>
                      </div>
                    </Button>
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 sm:space-x-4 p-3 bg-gray-50 rounded-xl">
                      <div className="w-8 sm:w-10 h-8 sm:h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Plus className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm sm:text-base font-medium text-gray-900">Serenity Spa successfully onboarded</p>
                        <p className="text-xs sm:text-sm text-gray-600">Added 12 services, verified documentation</p>
                      </div>
                      <span className="text-xs text-gray-500 flex-shrink-0">2 hours ago</span>
                    </div>
                    
                    <div className="flex items-center space-x-3 sm:space-x-4 p-3 bg-gray-50 rounded-xl">
                      <div className="w-8 sm:w-10 h-8 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Edit className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm sm:text-base font-medium text-gray-900">Bliss Spa details updated</p>
                        <p className="text-xs sm:text-sm text-gray-600">Contact information and operating hours modified</p>
                      </div>
                      <span className="text-xs text-gray-500 flex-shrink-0">1 day ago</span>
                    </div>

                    <div className="flex items-center space-x-3 sm:space-x-4 p-3 bg-gray-50 rounded-xl">
                      <div className="w-8 sm:w-10 h-8 sm:h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Users className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm sm:text-base font-medium text-gray-900">New vendor partnership approved</p>
                        <p className="text-xs sm:text-sm text-gray-600">Ayurvedic Wellness Center joined the platform</p>
                      </div>
                      <span className="text-xs text-gray-500 flex-shrink-0">3 days ago</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'spas' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Spa Management</h3>
                  <Button onClick={() => onNavigate('spaOnboarding')} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Spa
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {recentSpas.map((spa) => (
                    <div key={spa.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                          <MapPin className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{spa.name}</h4>
                          <p className="text-sm text-gray-600">{spa.location} • Onboarded by {spa.onboardedBy}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(spa.status)}`}>
                              {spa.status}
                            </span>
                            {spa.rating > 0 && (
                              <div className="flex items-center space-x-1">
                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                <span className="text-xs text-gray-600">{spa.rating}</span>
                              </div>
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
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'approvals' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Pending Approvals</h3>
                
                <div className="space-y-3">
                  {pendingApprovals.map((approval) => (
                    <div key={approval.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                          <AlertCircle className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{approval.type}</h4>
                          <p className="text-sm text-gray-600">{approval.name} • {approval.submittedBy}</p>
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
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reports' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Analytics & Reports</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Monthly Performance</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Spas Onboarded</span>
                        <span className="font-semibold">12</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Success Rate</span>
                        <span className="font-semibold text-green-600">94%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Avg. Processing Time</span>
                        <span className="font-semibold">2.3 days</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Team Performance</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Your Onboardings</span>
                        <span className="font-semibold">8</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Team Average</span>
                        <span className="font-semibold">6.2</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Ranking</span>
                        <span className="font-semibold text-purple-600">#2</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button variant="outline">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Export Report
                  </Button>
                  <Button variant="outline">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Report
                  </Button>
                </div>
              </div>
            )}

            {activeTab === 'attendance' && (
              <div className="space-y-6">
                <AttendanceTracker
                  onMarkAttendance={(employeeId: string, status: AttendanceStatus, notes?: string) => {
                    console.log('Attendance marked:', { employeeId, status, notes });
                    // In real app, this would call an API to save attendance
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};