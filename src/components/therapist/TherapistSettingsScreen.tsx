import React, { useState } from 'react';
import { ArrowLeft, Bell, Shield, Clock, LogOut } from 'lucide-react';
import { Button } from '../ui/Button';

interface TherapistSettingsScreenProps {
  onBack: () => void;
  onLogout: () => void;
}

export const TherapistSettingsScreen: React.FC<TherapistSettingsScreenProps> = ({ onBack, onLogout }) => {
  const [activeTab, setActiveTab] = useState('notifications');
  const [settings, setSettings] = useState({
    notifications: {
      newAssignments: true,
      scheduleChanges: true,
      customerMessages: true,
      paymentUpdates: true,
      pushNotifications: true,
      smsNotifications: true
    },
    availability: {
      autoAcceptBookings: false,
      maxDailyBookings: 8,
      bufferTime: 30
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
              { id: 'availability', label: 'Availability', icon: Clock },
              { id: 'privacy', label: 'Privacy', icon: Shield }
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
                    { key: 'newAssignments', label: 'New Assignments', desc: 'Get notified when you receive a new booking' },
                    { key: 'scheduleChanges', label: 'Schedule Changes', desc: 'Get notified of schedule updates' },
                    { key: 'customerMessages', label: 'Customer Messages', desc: 'Get notified of customer messages' },
                    { key: 'paymentUpdates', label: 'Payment Updates', desc: 'Get notified when payments are processed' },
                    { key: 'pushNotifications', label: 'Push Notifications', desc: 'Receive notifications on your device' },
                    { key: 'smsNotifications', label: 'SMS Notifications', desc: 'Receive notifications via SMS' }
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

            {activeTab === 'availability' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Availability Settings</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900">Auto-Accept Bookings</p>
                      <p className="text-sm text-gray-500">Automatically accept new bookings without confirmation</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.availability.autoAcceptBookings}
                        onChange={() => toggleSetting('availability', 'autoAcceptBookings')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl">
                    <label className="block mb-2">
                      <p className="font-medium text-gray-900 mb-1">Maximum Daily Bookings</p>
                      <p className="text-sm text-gray-500 mb-3">Limit the number of bookings per day</p>
                    </label>
                    <input
                      type="number"
                      value={settings.availability.maxDailyBookings}
                      onChange={(e) => setSettings({
                        ...settings,
                        availability: { ...settings.availability, maxDailyBookings: parseInt(e.target.value) }
                      })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl">
                    <label className="block mb-2">
                      <p className="font-medium text-gray-900 mb-1">Buffer Time Between Bookings (minutes)</p>
                      <p className="text-sm text-gray-500 mb-3">Time between appointments for preparation</p>
                    </label>
                    <select
                      value={settings.availability.bufferTime}
                      onChange={(e) => setSettings({
                        ...settings,
                        availability: { ...settings.availability, bufferTime: parseInt(e.target.value) }
                      })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="45">45 minutes</option>
                      <option value="60">60 minutes</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Settings</h3>

                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="font-medium text-gray-900 mb-2">Profile Visibility</p>
                    <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500">
                      <option value="public">Public - Visible to all customers</option>
                      <option value="vendor">Vendor Only - Visible to your employer</option>
                    </select>
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
