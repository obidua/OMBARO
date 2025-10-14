import React, { useState } from 'react';
import { ArrowLeft, Facebook, Instagram, Chrome, Mail, Loader } from 'lucide-react';
import { Button } from '../ui/Button';
import { supabase } from '../../lib/supabase';

interface VendorQuickSignupScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  selectedCategory?: string;
}

export default function VendorQuickSignupScreen({
  onNavigate,
  selectedCategory
}: VendorQuickSignupScreenProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSocialSignup(provider: 'google' | 'facebook') {
    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          scopes: provider === 'google' ? 'email profile' : 'email public_profile',
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      });

      if (error) {
        console.error('OAuth error:', error);

        if (error.message.includes('provider is not enabled')) {
          throw new Error(
            `${provider.charAt(0).toUpperCase() + provider.slice(1)} login is currently being configured. Please try the detailed signup option or contact support.`
          );
        }
        throw error;
      }

      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err: any) {
      console.error('Social signup error:', err);
      setError(err.message || 'Failed to sign up with social media. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleInstagramSignup() {
    setError('');
    setError('Instagram login uses Facebook authentication. Please use the "Continue with Facebook" button above.');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => onNavigate('vendorSignupOptions', { selectedCategory })}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              disabled={loading}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <h1 className="text-xl font-bold text-gray-900">Quick Signup</h1>
            <div className="w-20" />
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign up with Social Media</h2>
            <p className="text-gray-600">
              Choose your preferred social media account to get started instantly
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800 font-medium mb-2">Unable to sign up</p>
              <p className="text-sm text-red-700">{error}</p>
              {error.includes('provider is not enabled') && (
                <div className="mt-3 pt-3 border-t border-red-300">
                  <p className="text-xs text-red-600 mb-2">Alternative options:</p>
                  <ul className="text-xs text-red-600 space-y-1">
                    <li>• Use the detailed signup option below</li>
                    <li>• Contact support for assistance</li>
                    <li>• Try again later when social login is available</li>
                  </ul>
                </div>
              )}
            </div>
          )}

          <div className="space-y-4 mb-6">
            <Button
              onClick={() => handleSocialSignup('google')}
              disabled={loading}
              variant="outline"
              fullWidth
              size="lg"
              className="border-2 hover:bg-red-50 hover:border-red-300"
            >
              {loading ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Chrome className="w-5 h-5 text-red-600" />
                  <span className="flex-1 text-center font-semibold">Continue with Google</span>
                </>
              )}
            </Button>

            <Button
              onClick={() => handleSocialSignup('facebook')}
              disabled={loading}
              variant="outline"
              fullWidth
              size="lg"
              className="border-2 hover:bg-blue-50 hover:border-blue-300"
            >
              {loading ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Facebook className="w-5 h-5 text-blue-600" />
                  <span className="flex-1 text-center font-semibold">Continue with Facebook</span>
                </>
              )}
            </Button>

            <Button
              onClick={handleInstagramSignup}
              disabled={loading}
              variant="outline"
              fullWidth
              size="lg"
              className="border-2 hover:bg-pink-50 hover:border-pink-300"
            >
              <Instagram className="w-5 h-5 text-pink-600" />
              <span className="flex-1 text-center font-semibold">Continue with Instagram</span>
            </Button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">What happens next?</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-amber-700">1</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Authorize with Social Account</p>
                <p className="text-xs text-gray-600">We'll get your name and email automatically</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-amber-700">2</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Add Mobile Number</p>
                <p className="text-xs text-gray-600">Enter your mobile for OTP verification</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-amber-700">3</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Verify OTP</p>
                <p className="text-xs text-gray-600">Enter the 4-digit code sent to your mobile</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-green-700">✓</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">You're All Set!</p>
                <p className="text-xs text-gray-600">Access your vendor dashboard immediately</p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-800">
              <strong>Privacy Note:</strong> We only access your name and email.
              Your social media credentials are never stored by us.
            </p>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => onNavigate('vendorSignup', { selectedCategory, signupType: 'detailed' })}
              className="text-sm text-amber-600 hover:text-amber-700 font-medium"
            >
              Prefer detailed signup? Click here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
