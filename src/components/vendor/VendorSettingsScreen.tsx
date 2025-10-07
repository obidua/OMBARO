import React, { useState } from 'react';
import { ArrowLeft, Bell, Shield, Lock, Globe, Smartphone, Mail, CreditCard, HelpCircle, LogOut } from 'lucide-react';
import { Button } from '../ui/Button';

interface VendorSettingsScreenProps {
  onBack: () => void;
  onLogout: () => void;
}

export const VendorSettingsScreen: React.FC<VendorSettingsScreenProps> = ({ onBack, onLogout }) => {
  const [activeTab, setActiveTab] = useState('notifications');
  const [settings, setSettings] = useState({
    notifications: {
      newBookings: true,
      bookingCancellations: true,
      paymentReceived: true,
      customerReviews: true,
      systemUpdates: false,
      marketingEmails: false,
      smsNotifications: true,
      emailNotifications: true,
      pushNotifications: true
    },
    privacy: {
      profileVisibility: 'public',
      showLocation: true,
      showContact: true,
      showReviews: true
    },
    security: {
      twoFactorAuth: false,
      loginAlerts: true,
      sessionTimeout: '30'
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
              { id: 'security', label: 'Security', icon: Lock },
              { id: 'payment', label: 'Payment', icon: CreditCard },
              { id: 'help', label: 'Help & Support', icon: HelpCircle }
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
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-medium text-gray-900">New Bookings</p>
                        <p className="text-sm text-gray-500">Get notified when you receive a new booking</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.notifications.newBookings}
                          onChange={() => toggleSetting('notifications', 'newBookings')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-medium text-gray-900">Booking Cancellations</p>
                        <p className="text-sm text-gray-500">Get notified when a booking is cancelled</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.notifications.bookingCancellations}
                          onChange={() => toggleSetting('notifications', 'bookingCancellations')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-medium text-gray-900">Payment Received</p>
                        <p className="text-sm text-gray-500">Get notified when you receive a payment</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.notifications.paymentReceived}
                          onChange={() => toggleSetting('notifications', 'paymentReceived')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-medium text-gray-900">Customer Reviews</p>
                        <p className="text-sm text-gray-500">Get notified when customers leave reviews</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.notifications.customerReviews}
                          onChange={() => toggleSetting('notifications', 'customerReviews')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Channels</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="font-medium text-gray-900">Push Notifications</p>
                          <p className="text-sm text-gray-500">Receive notifications on your device</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.notifications.pushNotifications}
                          onChange={() => toggleSetting('notifications', 'pushNotifications')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="font-medium text-gray-900">Email Notifications</p>
                          <p className="text-sm text-gray-500">Receive notifications via email</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.notifications.emailNotifications}
                          onChange={() => toggleSetting('notifications', 'emailNotifications')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="font-medium text-gray-900">SMS Notifications</p>
                          <p className="text-sm text-gray-500">Receive notifications via SMS</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.notifications.smsNotifications}
                          onChange={() => toggleSetting('notifications', 'smsNotifications')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Settings</h3>

                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <label className="block mb-2">
                      <p className="font-medium text-gray-900 mb-1">Profile Visibility</p>
                      <p className="text-sm text-gray-500 mb-3">Control who can see your business profile</p>
                    </label>
                    <select
                      value={settings.privacy.profileVisibility}
                      onChange={(e) => setSettings({
                        ...settings,
                        privacy: { ...settings.privacy, profileVisibility: e.target.value }
                      })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="public">Public - Anyone can view</option>
                      <option value="customers">Customers Only</option>
                      <option value="private">Private - Hidden from search</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900">Show Location</p>
                      <p className="text-sm text-gray-500">Display your business location on the map</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.privacy.showLocation}
                        onChange={() => toggleSetting('privacy', 'showLocation')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900">Show Contact Information</p>
                      <p className="text-sm text-gray-500">Display phone and email on your profile</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.privacy.showContact}
                        onChange={() => toggleSetting('privacy', 'showContact')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900">Show Reviews and Ratings</p>
                      <p className="text-sm text-gray-500">Display customer reviews publicly</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.privacy.showReviews}
                        onChange={() => toggleSetting('privacy', 'showReviews')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
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
                      <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
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
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl">
                    <label className="block mb-2">
                      <p className="font-medium text-gray-900 mb-1">Session Timeout</p>
                      <p className="text-sm text-gray-500 mb-3">Automatically log out after inactivity</p>
                    </label>
                    <select
                      value={settings.security.sessionTimeout}
                      onChange={(e) => setSettings({
                        ...settings,
                        security: { ...settings.security, sessionTimeout: e.target.value }
                      })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="never">Never</option>
                    </select>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl">
                    <Button variant="outline" className="w-full mb-2">
                      Change Password
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'payment' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Settings</h3>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Payment settings are managed through your Profile Settings under Banking Details.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="font-medium text-gray-900 mb-2">Commission Rate</p>
                    <p className="text-2xl font-bold text-blue-600">15%</p>
                    <p className="text-sm text-gray-500 mt-1">Platform commission on bookings</p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="font-medium text-gray-900 mb-2">Payment Cycle</p>
                    <p className="text-lg font-semibold text-gray-900">Weekly</p>
                    <p className="text-sm text-gray-500 mt-1">Settlements every Monday</p>
                  </div>

                  <Button variant="outline" className="w-full">
                    View Payment History
                  </Button>
                </div>
              </div>
            )}

            {activeTab === 'help' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Help & Support</h3>

                <div className="space-y-4">
                  <button className="w-full p-4 bg-gray-50 rounded-xl text-left hover:bg-gray-100 transition-colors">
                    <p className="font-medium text-gray-900">FAQs</p>
                    <p className="text-sm text-gray-500">Find answers to common questions</p>
                  </button>

                  <button className="w-full p-4 bg-gray-50 rounded-xl text-left hover:bg-gray-100 transition-colors">
                    <p className="font-medium text-gray-900">Contact Support</p>
                    <p className="text-sm text-gray-500">Get help from our support team</p>
                  </button>

                  <button className="w-full p-4 bg-gray-50 rounded-xl text-left hover:bg-gray-100 transition-colors">
                    <p className="font-medium text-gray-900">Terms of Service</p>
                    <p className="text-sm text-gray-500">Read our terms and conditions</p>
                  </button>

                  <button className="w-full p-4 bg-gray-50 rounded-xl text-left hover:bg-gray-100 transition-colors">
                    <p className="font-medium text-gray-900">Privacy Policy</p>
                    <p className="text-sm text-gray-500">Learn how we protect your data</p>
                  </button>

                  <button className="w-full p-4 bg-gray-50 rounded-xl text-left hover:bg-gray-100 transition-colors">
                    <p className="font-medium text-gray-900">About OMBARO</p>
                    <p className="text-sm text-gray-500">Learn more about our platform</p>
                  </button>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <p className="text-sm text-gray-500 mb-2">App Version: 1.0.0</p>
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
