import React, { useEffect, useState } from 'react';
import { Loader } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface AuthCallbackProps {
  onNavigate?: (screen: string, data?: any) => void;
}

export default function AuthCallback({ onNavigate }: AuthCallbackProps) {
  const [error, setError] = useState<string>('');

  useEffect(() => {
    handleAuthCallback();
  }, []);

  async function handleAuthCallback() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Auth callback error:', error);
        setError(error.message);
        return;
      }

      if (session) {
        const provider = session.user.app_metadata?.provider;
        const userData = {
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.full_name || session.user.user_metadata?.name,
          provider: provider,
          avatar_url: session.user.user_metadata?.avatar_url || session.user.user_metadata?.picture
        };

        console.log('OAuth success:', userData);

        if (onNavigate) {
          onNavigate('vendorMobileVerification', {
            signupType: 'quick',
            provider: provider,
            userData: userData
          });
        } else {
          window.location.href = '/app';
        }
      } else {
        setError('No session found. Please try again.');
      }
    } catch (err: any) {
      console.error('Unexpected error in auth callback:', err);
      setError(err.message || 'An unexpected error occurred');
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4">
        {error ? (
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">✕</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Authentication Failed</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.href = '/'}
              className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
            >
              Return to Home
            </button>
          </div>
        ) : (
          <div className="text-center">
            <Loader className="w-16 h-16 animate-spin text-amber-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Completing Authentication</h2>
            <p className="text-gray-600">Please wait while we set up your account...</p>
          </div>
        )}
      </div>
    </div>
  );
}
