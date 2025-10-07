import React, { useState } from 'react';
import { ArrowLeft, Bell, Lock, Globe, Moon, Volume2, HelpCircle, Info, Shield, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';

interface BeauticianSettingsScreenProps {
  beauticianId: string;
  onBack: () => void;
}

export const BeauticianSettingsScreen: React.FC<BeauticianSettingsScreenProps> = ({
  beauticianId,
  onBack
}) => {
  const [settings, setSettings] = useState({
    notifications: {
      push: true,
      email: true,
      sms: false,
      bookingAlerts: true,
      paymentAlerts: true,
      reviewAlerts: true
    },
    preferences: {
      language: 'en',
      theme: 'light',
      soundEffects: true
    },
    privacy: {
      showProfile: true,
      showRating: true,
      shareLocation: true
    }
  });

  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const toggleSetting = (category: string, setting: string) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: !prev[category as keyof typeof prev][setting as keyof typeof prev.notifications]
      }
    }));
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    alert('Password changed successfully!');
    setShowChangePassword(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const settingSections = [
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        { key: 'push', label: 'Push Notifications', value: settings.notifications.push },
        { key: 'email', label: 'Email Notifications', value: settings.notifications.email },
        { key: 'sms', label: 'SMS Notifications', value: settings.notifications.sms },
        { key: 'bookingAlerts', label: 'Booking Alerts', value: settings.notifications.bookingAlerts },
        { key: 'paymentAlerts', label: 'Payment Alerts', value: settings.notifications.paymentAlerts },
        { key: 'reviewAlerts', label: 'Review Alerts', value: settings.notifications.reviewAlerts }
      ]
    },
    {
      title: 'Privacy',
      icon: Shield,
      items: [
        { key: 'showProfile', label: 'Show Profile to Customers', value: settings.privacy.showProfile },
        { key: 'showRating', label: 'Show Rating Publicly', value: settings.privacy.showRating },
        { key: 'shareLocation', label: 'Share Location During Service', value: settings.privacy.shareLocation }
      ]
    },
    {
      title: 'Preferences',
      icon: Globe,
      items: [
        { key: 'soundEffects', label: 'Sound Effects', value: settings.preferences.soundEffects }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-[70px] pb-[70px]">
      <div className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={onBack}
            aria-label="Go back"
            className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Settings</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
              <Lock className="w-5 h-5 text-pink-600" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">Account Security</h3>
              <p className="text-sm text-gray-600">Manage your password and security</p>
            </div>
          </div>

          {!showChangePassword ? (
            <Button
              onClick={() => setShowChangePassword(true)}
              variant="outline"
              className="w-full"
            >
              Change Password
            </Button>
          ) : (
            <form onSubmit={handleChangePassword} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                  minLength={8}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="flex space-x-2">
                <Button type="submit" size="sm" className="flex-1">
                  Update Password
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowChangePassword(false);
                    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </div>

        {settingSections.map(section => (
          <div key={section.title} className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <section.icon className="w-5 h-5 text-gray-600" />
              </div>
              <h3 className="text-base font-semibold text-gray-900">{section.title}</h3>
            </div>

            <div className="space-y-3">
              {section.items.map(item => (
                <div key={item.key} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{item.label}</span>
                  <button
                    onClick={() => toggleSetting(section.title.toLowerCase(), item.key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      item.value ? 'bg-pink-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        item.value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-gray-600" />
            </div>
            <h3 className="text-base font-semibold text-gray-900">Language & Region</h3>
          </div>

          <select
            value={settings.preferences.language}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              preferences: { ...prev.preferences, language: e.target.value }
            }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी (Hindi)</option>
            <option value="kn">ಕನ್ನಡ (Kannada)</option>
            <option value="ta">தமிழ் (Tamil)</option>
            <option value="te">తెలుగు (Telugu)</option>
          </select>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <Moon className="w-5 h-5 text-gray-600" />
            </div>
            <h3 className="text-base font-semibold text-gray-900">Appearance</h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setSettings(prev => ({
                ...prev,
                preferences: { ...prev.preferences, theme: 'light' }
              }))}
              className={`p-3 rounded-lg border-2 transition-colors ${
                settings.preferences.theme === 'light'
                  ? 'border-pink-500 bg-pink-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-white border border-gray-200 rounded-lg mx-auto mb-2"></div>
                <p className="text-sm font-medium text-gray-900">Light</p>
              </div>
            </button>

            <button
              onClick={() => setSettings(prev => ({
                ...prev,
                preferences: { ...prev.preferences, theme: 'dark' }
              }))}
              className={`p-3 rounded-lg border-2 transition-colors ${
                settings.preferences.theme === 'dark'
                  ? 'border-pink-500 bg-pink-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-800 border border-gray-700 rounded-lg mx-auto mb-2"></div>
                <p className="text-sm font-medium text-gray-900">Dark</p>
              </div>
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => alert('Opening help center...')}
            className="w-full bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <HelpCircle className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-900">Help & Support</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button
            onClick={() => alert('Opening about page...')}
            className="w-full bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <Info className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-900">About OMBARO</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="bg-gray-100 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-600">Version 1.0.0</p>
          <p className="text-xs text-gray-500 mt-1">© 2025 OMBARO. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};
