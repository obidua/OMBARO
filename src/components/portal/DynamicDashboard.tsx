import React, { useState } from 'react';
import {
  Home,
  Calendar,
  Users,
  Settings,
  BarChart,
  FileText,
  MapPin,
  Bell,
  Menu,
  X,
  LogOut,
  User
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

export interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  path: string;
  roles: string[];
}

const menuItems: MenuItem[] = [
  { id: 'home', label: 'Dashboard', icon: Home, path: '/dashboard', roles: ['all'] },
  { id: 'bookings', label: 'Bookings', icon: Calendar, path: '/bookings', roles: ['customer', 'vendor', 'admin'] },
  { id: 'therapists', label: 'Therapists', icon: Users, path: '/therapists', roles: ['vendor', 'admin'] },
  { id: 'assignments', label: 'My Assignments', icon: Calendar, path: '/assignments', roles: ['therapist'] },
  { id: 'users', label: 'User Management', icon: Users, path: '/users', roles: ['admin'] },
  { id: 'vendors', label: 'Vendor Management', icon: Users, path: '/vendors', roles: ['admin', 'employee'] },
  { id: 'analytics', label: 'Analytics', icon: BarChart, path: '/analytics', roles: ['vendor', 'admin'] },
  { id: 'reports', label: 'Reports', icon: FileText, path: '/reports', roles: ['admin', 'employee'] },
  { id: 'tracking', label: 'Location Tracking', icon: MapPin, path: '/tracking', roles: ['admin', 'vendor'] },
  { id: 'notifications', label: 'Notifications', icon: Bell, path: '/notifications', roles: ['all'] },
  { id: 'profile', label: 'Profile', icon: User, path: '/profile', roles: ['all'] },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/settings', roles: ['all'] },
];

interface DynamicDashboardProps {
  children: React.ReactNode;
  title?: string;
  onMenuItemClick?: (itemId: string) => void;
}

export const DynamicDashboard: React.FC<DynamicDashboardProps> = ({
  children,
  title = 'Dashboard',
  onMenuItemClick
}) => {
  const { currentPortal, userProfile, logout } = usePortal();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState('home');

  const filteredMenuItems = menuItems.filter(item => {
    if (item.roles.includes('all')) return true;
    if (!currentPortal) return false;
    return item.roles.includes(currentPortal);
  });

  const handleMenuItemClick = (itemId: string) => {
    setActiveMenuItem(itemId);
    setIsSidebarOpen(false);
    onMenuItemClick?.(itemId);
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
          lg:relative lg:translate-x-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b">
            <h1 className="text-2xl font-bold text-blue-600">OMBARO</h1>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* User Info */}
          <div className="px-6 py-4 border-b">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {userProfile?.name || 'User'}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {currentPortal || 'Guest'}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            <ul className="space-y-2">
              {filteredMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeMenuItem === item.id;

                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleMenuItemClick(item.id)}
                      className={`
                        w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                        ${
                          isActive
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-gray-700 hover:bg-gray-100'
                        }
                      `}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Logout */}
          <div className="px-4 py-4 border-t">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b shadow-sm">
          <div className="flex items-center justify-between h-full px-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-700"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-600">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};
