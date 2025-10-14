import React, { useState } from 'react';
import { ArrowLeft, User, Lock } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { UserRole } from '../../types/auth';

interface AuthLoginScreenProps {
  userType: string;
  onBack: () => void;
  onLogin: (mobile: string, password: string, userType: UserRole) => void;
  isLoading: boolean;
  error: string | null;
}

export const AuthLoginScreen: React.FC<AuthLoginScreenProps> = ({
  userType,
  onBack,
  onLogin,
  isLoading,
  error
}) => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState({
    mobile: '',
    password: ''
  });

  const validateForm = () => {
    const errors = { mobile: '', password: '' };

    if (!mobile.trim()) {
      errors.mobile = 'Username or mobile number is required';
    }

    if (!password.trim()) {
      errors.password = 'Password is required';
    }

    setFormErrors(errors);
    return Object.values(errors).every(error => !error);
  };

  const handleLogin = () => {
    if (validateForm()) {
      const userTypeKey = userType.toLowerCase().replace(/\s+/g, '_').replace(/[^\w]/g, '') as UserRole;
      onLogin(mobile, password, userTypeKey);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const getIcon = () => {
    const lowerType = userType.toLowerCase();
    if (lowerType.includes('admin')) return '👑';
    if (lowerType.includes('vendor')) return '🏪';
    if (lowerType.includes('employee')) return '👨‍💼';
    if (lowerType.includes('accounts')) return '💰';
    if (lowerType.includes('marketing')) return '📈';
    if (lowerType.includes('finance')) return '💼';
    if (lowerType.includes('legal')) return '⚖️';
    if (lowerType.includes('customer')) return '🎧';
    if (lowerType.includes('hr')) return '👥';
    if (lowerType.includes('it')) return '💻';
    return '🔐';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <button
          onClick={onBack}
          aria-label="Go back to welcome screen"
          className="w-10 h-10 rounded-xl bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <div className="text-center">
          <h1 className="text-lg font-semibold text-gray-900">{userType} Login</h1>
        </div>
        <div className="w-10" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-6">
        <div className="max-w-md mx-auto w-full">
          {/* Icon */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-2xl">{getIcon()}</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {userType} Portal
            </h2>
            <p className="text-gray-600">
              Enter your credentials to access the {userType} dashboard
            </p>
          </div>

          {/* Login Form */}
          <div className="space-y-6">
            <Input
              label="Username or Mobile"
              type="text"
              placeholder="Enter username (e.g., admin321) or mobile number"
              value={mobile}
              onChange={(e) => {
                setMobile(e.target.value);
                if (formErrors.mobile) {
                  setFormErrors(prev => ({ ...prev, mobile: '' }));
                }
              }}
              onKeyPress={handleKeyPress}
              error={formErrors.mobile}
              icon={<User className="w-5 h-5 text-gray-400" />}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (formErrors.password) {
                  setFormErrors(prev => ({ ...prev, password: '' }));
                }
              }}
              onKeyPress={handleKeyPress}
              error={formErrors.password}
              icon={<Lock className="w-5 h-5 text-gray-400" />}
            />

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <Button
              onClick={handleLogin}
              loading={isLoading}
              disabled={!mobile || !password}
              size="lg"
              className="w-full"
            >
              Login to {userType} Portal
            </Button>
          </div>

          {/* Login Info */}
          <div className="mt-8 p-4 bg-blue-50 rounded-2xl border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">Login Information</h3>
            <p className="text-sm text-blue-700">
              Use your registered mobile number or username to login.<br />
              For system users: username format is <strong>{userType.toLowerCase()}321</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};