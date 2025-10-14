import React, { useState } from 'react';
import { ArrowLeft, User, Lock, Eye, EyeOff, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface BeauticianLoginScreenProps {
  onBack: () => void;
  onLogin: (credentials: { email: string; password: string }) => void;
}

export const BeauticianLoginScreen: React.FC<BeauticianLoginScreenProps> = ({
  onBack,
  onLogin
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await onLogin({ email, password });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 flex flex-col">
      <div className="p-4">
        <button
          onClick={onBack}
          aria-label="Go back"
          className="w-10 h-10 bg-white/70 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white transition-colors shadow-sm"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="max-w-md mx-auto w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-rose-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Beautician Portal
            </h1>
            <p className="text-gray-600">
              Login to manage your appointments and services
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="space-y-4">
                <Input
                  label="Username or Email"
                  type="text"
                  placeholder="Enter username (e.g., beautician321) or email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={<User className="w-5 h-5 text-gray-400" />}
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login as Beautician'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <span className="text-pink-600 font-medium">
                Contact your vendor to get registered
              </span>
            </p>
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">Login Information</h3>
            <div className="space-y-1 text-xs text-blue-800">
              <p>Use your registered username or email address.</p>
              <p className="mt-2"><strong>System user format:</strong> beautician321 / Password: 1234</p>
            </div>
            <p className="text-xs text-blue-700 mt-2 italic">
              * Note: Beautician accounts are created by vendors
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
