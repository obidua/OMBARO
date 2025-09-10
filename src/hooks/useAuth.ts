import { useState } from 'react';
import { AuthState, User } from '../types/auth';

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    currentStep: 'welcome',
    user: {},
    isLoading: false,
    error: null,
  });

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

  const loginUser = async (mobile: string, password: string, userType: 'employee' | 'vendor' | 'admin') => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check password (static implementation)
      if (password === '1234') {
        setUser({ mobile, isVerified: true });
        setAuthState(prev => ({ ...prev, userType }));
        
        // Navigate to appropriate dashboard
        switch (userType) {
          case 'employee':
            setCurrentStep('employeeDashboard');
            break;
          case 'vendor':
            setCurrentStep('vendorDashboard');
            break;
          case 'admin':
            setCurrentStep('adminDashboard');
            break;
        }
      } else {
        setError('Invalid password. Please try again.');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setAuthState({
      currentStep: 'welcome',
      user: {},
      userType: undefined,
      isLoading: false,
      error: null,
    });
  };

  const sendOTP = async (mobile: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In real app, call your OTP API here
      console.log('Sending OTP to:', mobile);
      
      setUser({ mobile });
      setCurrentStep('otp');
    } catch (error) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (otp: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In real app, verify OTP with your API
      if (otp === '1234') { // Mock verification
        setUser({ isVerified: true });
        setCurrentStep('home');
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (error) {
      setError('Failed to verify OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const completeProfile = async (profileData: Partial<User>) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call to save profile
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In real app, call your profile API here
      console.log('Saving profile:', profileData);
      
      setUser(profileData);
      setCurrentStep('complete');
    } catch (error) {
      setError('Failed to save profile. Please try again.');
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
    logout,
    sendOTP,
    verifyOTP,
    completeProfile,
    setError,
  };
};