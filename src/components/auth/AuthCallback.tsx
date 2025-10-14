import React, { useEffect, useState } from 'react';
import { Loader } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';

interface AuthCallbackProps {
  onNavigate?: (screen: string, data?: any) => void;
}

export default function AuthCallback({ onNavigate }: AuthCallbackProps) {
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    handleAuthCallback();
  }, []);

  async function handleAuthCallback() {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError) {
        console.error('Auth callback error:', sessionError);
        setError(sessionError.message);
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

        try {
          const { data: existingProfile, error: profileCheckError } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('id', session.user.id)
            .maybeSingle();

          if (profileCheckError && profileCheckError.code !== 'PGRST116') {
            throw profileCheckError;
          }

          if (!existingProfile) {
            const { error: profileError } = await supabase
              .from('user_profiles')
              .insert({
                id: session.user.id,
                email: session.user.email,
                full_name: userData.name,
                role: 'vendor',
                signup_method: 'social',
                social_provider: provider,
                profile_completed: false
              });

            if (profileError) {
              console.error('Error creating user profile:', profileError);
            }
          }

          const oauthData = {
            signupType: 'quick',
            provider: provider,
            userData: userData,
            selectedCategory: sessionStorage.getItem('vendorCategory') || undefined
          };

          sessionStorage.setItem('oauthData', JSON.stringify(oauthData));

          if (onNavigate) {
            onNavigate('vendorMobileVerification', oauthData);
          } else {
            window.location.href = '/app?screen=vendorMobileVerification&oauth=true';
          }
        } catch (dbError: any) {
          console.error('Database error in auth callback:', dbError);
          setError('Failed to set up your account. Please try again or contact support.');
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
