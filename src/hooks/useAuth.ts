import { useState, useEffect } from 'react';
import { AuthState, User, UserRole } from '../types/auth';
import { supabase } from '../lib/supabase';

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    currentStep: 'welcome',
    user: {},
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          const { data: profile } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('id', session.user.id)
            .maybeSingle();

          if (profile) {
            setUser({
              id: session.user.id,
              mobile: session.user.phone,
              email: session.user.email,
              isVerified: true,
              ...profile
            });
          }
        } else if (event === 'SIGNED_OUT') {
          setAuthState({
            currentStep: 'welcome',
            user: {},
            userType: undefined,
            isLoading: false,
            error: null,
          });
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const setCurrentStep = (step: AuthState['currentStep']) => {
    setAuthState(prev => ({ ...prev, currentStep: step, error: null }));
  };

  const setUser = (userData: Partial<User>) => {
    setAuthState(prev => ({
      ...prev,
      user: { ...prev.user, ...userData }
    }));
  };

  const setLoading = (loading: boolean) => {
    setAuthState(prev => ({ ...prev, isLoading: loading }));
  };

  const setError = (error: string | null) => {
    setAuthState(prev => ({ ...prev, error }));
  };

  const setSelectedEntity = (entity: any) => {
    setAuthState(prev => ({ ...prev, selectedEntity: entity }));
  };

  const loginUser = async (mobile: string, password: string, userType: UserRole) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        phone: mobile,
        password: password,
      });

      if (error) throw error;

      if (data.user) {
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', data.user.id)
          .maybeSingle();

        if (profile) {
          setUser({
            id: data.user.id,
            mobile: data.user.phone,
            email: data.user.email,
            isVerified: true,
            ...profile
          });
          setAuthState(prev => ({ ...prev, userType: profile.role || userType }));

          switch (profile.role || userType) {
            case 'employee':
              setCurrentStep('employeeDashboard');
              break;
            case 'vendor':
              setCurrentStep('vendorDashboard');
              break;
            case 'admin':
            case 'super_admin':
              setCurrentStep('adminDashboard');
              break;
            default:
              setCurrentStep('departmentDashboard');
              break;
          }
        }
      }
    } catch (error: any) {
      setError(error.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const selectRole = async (role: UserRole) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate role selection
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setAuthState(prev => ({ ...prev, userType: role }));
      
      // Navigate based on role
      if (role === 'super_admin') {
        setCurrentStep('adminDashboard');
      } else {
        setCurrentStep('departmentDashboard');
      }
    } catch (error) {
      setError('Role selection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setAuthState({
        currentStep: 'welcome',
        user: {},
        userType: undefined,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      setError(error.message || 'Logout failed');
    }
  };

  const sendOTP = async (mobile: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        phone: mobile,
      });

      if (error) throw error;

      console.log('OTP sent to:', mobile);
      setUser({ mobile });
      setCurrentStep('otp');
    } catch (error: any) {
      setError(error.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (otp: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone: authState.user.mobile || '',
        token: otp,
        type: 'sms',
      });

      if (error) throw error;

      if (data.user) {
        setUser({ isVerified: true });
        setCurrentStep('home');
      }
    } catch (error: any) {
      setError(error.message || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const completeProfile = async (profileData: Partial<User>) => {
    setLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user');

      const { data, error } = await supabase
        .from('user_profiles')
        .upsert({
          id: user.id,
          full_name: profileData.name,
          role: profileData.role || 'customer',
          phone: user.phone,
          email: user.email,
          ...profileData
        })
        .select()
        .single();

      if (error) throw error;

      console.log('Profile saved:', data);
      setUser(profileData);
      setCurrentStep('complete');
    } catch (error: any) {
      setError(error.message || 'Failed to save profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return {
    authState,
    setCurrentStep,
    setUser,
    setSelectedEntity,
    loginUser,
    selectRole,
    logout,
    sendOTP,
    verifyOTP,
    completeProfile,
    setError,
  };
};