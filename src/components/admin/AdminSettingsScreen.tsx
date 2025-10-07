import React, { useState } from 'react';
import { ArrowLeft, Settings, Shield, Database, Users, Bell, LogOut } from 'lucide-react';
import { Button } from '../ui/Button';

interface AdminSettingsScreenProps {
  onBack: () => void;
  onLogout: () => void;
}

export const AdminSettingsScreen: React.FC<AdminSettingsScreenProps> = ({ onBack, onLogout }) => {
  const [activeTab, setActiveTab] = useState('system');

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
            <h1 className="text-xl font-bold text-gray-900">System Settings</h1>
            <div className="w-20" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex border-b border-gray-100 overflow-x-auto">
            {[
              { id: 'system', label: 'System', icon: Settings },
              { id: 'security', label: 'Security', icon: Shield },
              { id: 'database', label: 'Database', icon: Database },
              { id: 'users', label: 'User Management', icon: Users },
              { id: 'notifications', label: 'Notifications', icon: Bell }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-6 text-sm font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-600'
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
            {activeTab === 'system' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">System Configuration</h3>

                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="font-medium text-gray-900 mb-2">Platform Name</p>
                    <input
                      type="text"
                      defaultValue="OMBARO"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="font-medium text-gray-900 mb-2">Default Commission Rate (%)</p>
                    <input
                      type="number"
                      defaultValue="15"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="font-medium text-gray-900 mb-2">Booking Timeout (minutes)</p>
                    <input
                      type="number"
                      defaultValue="30"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <Button className="w-full">Save System Settings</Button>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900">Enforce Two-Factor Authentication</p>
                      <p className="text-sm text-gray-500">Require 2FA for all admin accounts</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="font-medium text-gray-900 mb-2">Session Timeout (minutes)</p>
                    <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="60">1 hour</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900">Login Attempt Limit</p>
                      <p className="text-sm text-gray-500">Max failed login attempts before lockout</p>
                    </div>
                    <input
                      type="number"
                      defaultValue="5"
                      className="w-24 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'database' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Database Management</h3>

                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <p className="font-medium text-blue-900 mb-1">Database Status</p>
                    <p className="text-sm text-blue-700">Connected - Supabase PostgreSQL</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline">Backup Database</Button>
                    <Button variant="outline">View Migrations</Button>
                    <Button variant="outline">Database Health</Button>
                    <Button variant="outline">Optimize Tables</Button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">User Management Settings</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900">Auto-Approve Vendors</p>
                      <p className="text-sm text-gray-500">Automatically approve new vendor registrations</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900">Email Verification Required</p>
                      <p className="text-sm text-gray-500">Require email verification for new accounts</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">System Notifications</h3>

                <div className="space-y-4">
                  {[
                    { label: 'New User Registrations', desc: 'Notify admins of new user signups' },
                    { label: 'Critical Errors', desc: 'Alert on system errors and failures' },
                    { label: 'Payment Failures', desc: 'Notify on failed payment transactions' },
                    { label: 'High-Value Transactions', desc: 'Alert on transactions above threshold' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-medium text-gray-900">{item.label}</p>
                        <p className="text-sm text-gray-500">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <Button
            variant="outline"
            className="w-full text-red-600 hover:bg-red-50"
            onClick={onLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout from Admin Portal
          </Button>
        </div>
      </div>
    </div>
  );
};
