import React, { useState } from 'react';
import { ArrowLeft, Bell, Shield, Lock, LogOut } from 'lucide-react';
import { Button } from '../ui/Button';

interface EmployeeSettingsScreenProps {
  onBack: () => void;
  onLogout: () => void;
}

export const EmployeeSettingsScreen: React.FC<EmployeeSettingsScreenProps> = ({ onBack, onLogout }) => {
  const [activeTab, setActiveTab] = useState('notifications');
  const [settings, setSettings] = useState({
    notifications: {
      newAssignments: true,
      approvalRequests: true,
      systemAlerts: true,
      emailNotifications: true,
      pushNotifications: true
    },
    privacy: {
      profileVisibility: 'organization'
    },
    security: {
      twoFactorAuth: false,
      loginAlerts: true
    }
  });

  const toggleSetting = (category: string, key: string) => {
    setSettings({
      ...settings,
      [category]: {
        ...settings[category],
        [key]: !settings[category][key]
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <h1 className="text-xl font-bold text-gray-900">Settings</h1>
            <div className="w-20" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex border-b border-gray-100 overflow-x-auto">
            {[
              { id: 'notifications', label: 'Notifications', icon: Bell },
              { id: 'privacy', label: 'Privacy', icon: Shield },
              { id: 'security', label: 'Security', icon: Lock }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-6 text-sm font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-purple-600 border-b-2 border-purple-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="p-6">
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>

                <div className="space-y-4">
                  {[
                    { key: 'newAssignments', label: 'New Assignments', desc: 'Get notified when you receive new tasks' },
                    { key: 'approvalRequests', label: 'Approval Requests', desc: 'Get notified of pending approvals' },
                    { key: 'systemAlerts', label: 'System Alerts', desc: 'Receive important system notifications' },
                    { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive notifications via email' },
                    { key: 'pushNotifications', label: 'Push Notifications', desc: 'Receive notifications on your device' }
                  ].map(({ key, label, desc }) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-medium text-gray-900">{label}</p>
                        <p className="text-sm text-gray-500">{desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.notifications[key]}
                          onChange={() => toggleSetting('notifications', key)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Settings</h3>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <label className="block mb-2">
                    <p className="font-medium text-gray-900 mb-1">Profile Visibility</p>
                    <p className="text-sm text-gray-500 mb-3">Control who can see your profile</p>
                  </label>
                  <select
                    value={settings.privacy.profileVisibility}
                    onChange={(e) => setSettings({
                      ...settings,
                      privacy: { ...settings.privacy, profileVisibility: e.target.value }
                    })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="organization">Organization Only</option>
                    <option value="team">My Team Only</option>
                    <option value="private">Private</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-500">Add an extra layer of security</p>
                    </div>
                    <Button size="sm" variant="outline">Enable</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900">Login Alerts</p>
                      <p className="text-sm text-gray-500">Get notified of new login attempts</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.security.loginAlerts}
                        onChange={() => toggleSetting('security', 'loginAlerts')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl">
                    <Button variant="outline" className="w-full">
                      Change Password
                    </Button>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <Button
                    variant="outline"
                    className="w-full text-red-600 hover:bg-red-50"
                    onClick={onLogout}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
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
