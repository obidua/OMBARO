import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, CreditCard as Edit, LogOut, Settings, Heart, Gift, HelpCircle, Shield, Bell } from 'lucide-react';
import { Button } from '../ui/Button';
import { User as UserType } from '../../types/auth';

interface ProfileScreenProps {
  user: Partial<UserType>;
  onLogout: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  user,
  onLogout,
  onNavigate
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not provided';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const menuItems = [
    {
      id: 'favorites',
      label: 'My Favorites',
      icon: Heart,
      description: 'Saved spas and services',
      action: () => console.log('Navigate to favorites')
    },
    {
      id: 'referral',
      label: 'Refer & Earn',
      icon: Gift,
      description: 'Invite friends and earn rewards',
      action: () => onNavigate('referral')
    },
    {
      id: 'offers',
      label: 'Offers & Rewards',
      icon: Gift,
      description: 'Special deals and loyalty points',
      action: () => console.log('Navigate to offers')
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      description: 'Manage your notification preferences',
      action: () => onNavigate('notifications')
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      description: 'App preferences and privacy',
      action: () => console.log('Navigate to settings')
    },
    {
      id: 'help',
      label: 'Help & Support',
      icon: HelpCircle,
      description: 'Get help and contact support',
      action: () => console.log('Navigate to help')
    },
    {
      id: 'privacy',
      label: 'Privacy Policy',
      icon: Shield,
      description: 'Terms and privacy information',
      action: () => console.log('Navigate to privacy')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-[120px] pb-[70px]">
      <div className="px-4 py-6 space-y-6">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl">{getInitials(user.name)}</span>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{user.name || 'User'}</h1>
              <p className="text-gray-600">OMBARO Member</p>
              <div className="flex items-center space-x-2 mt-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600 font-medium">Verified Account</span>
              </div>
            </div>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant="outline"
              size="sm"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </div>

          {/* User Information */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600">Mobile Number</p>
                <p className="font-medium text-gray-900">+91 {user.mobile || 'Not provided'}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600">Email Address</p>
                <p className="font-medium text-gray-900">{user.email || 'Not provided'}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600">Gender</p>
                <p className="font-medium text-gray-900 capitalize">{user.gender || 'Not provided'}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600">Date of Birth</p>
                <p className="font-medium text-gray-900">{formatDate(user.dateOfBirth)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Account & Settings</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={item.action}
                className="w-full flex items-center space-x-4 p-4 hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-900">{item.label}</p>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
                <div className="w-5 h-5 text-gray-400">
                  →
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* App Info */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">App Information</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Version:</span>
              <span className="font-medium text-gray-900">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Last Updated:</span>
              <span className="font-medium text-gray-900">Jan 2025</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Build:</span>
              <span className="font-medium text-gray-900">2025.01.001</span>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <Button
            onClick={onLogout}
            variant="outline"
            size="lg"
            className="w-full text-red-600 border-red-200 hover:bg-red-50"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </Button>
        </div>

        {/* Footer Info */}
        <div className="text-center py-4">
          <p className="text-sm text-gray-500">
            Made with ❤️ by OMBARO Team
          </p>
          <p className="text-xs text-gray-400 mt-1">
            © 2025 OMBARO. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};