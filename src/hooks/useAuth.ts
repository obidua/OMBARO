import { useState } from 'react';
import { AuthState, User, UserRole } from '../types/auth';
import { AuthService } from '../services/auth.service';

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

  const loginUser = async (mobile: string, password: string, userType: UserRole) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await AuthService.login({
        username: mobile,
        password: password,
        userType: userType,
      });

      if (result.success && result.user) {
        setUser({
          id: result.user.id,
          name: result.user.name,
          email: result.user.email,
          mobile: result.user.mobile,
          role: result.user.role,
          isVerified: true
        });
        setAuthState(prev => ({ ...prev, userType }));
        
        switch (userType) {
          case 'employee':
            setCurrentStep('employeeDashboard');
            break;
          case 'vendor':
          case 'vendor_applicant':
            setCurrentStep('vendorDashboard');
            break;
          case 'admin':
            setCurrentStep('adminDashboard');
            break;
          case 'super_admin':
            setCurrentStep('adminDashboard');
            break;
          default:
            setCurrentStep('departmentDashboard');
            break;
        }
      } else {
        setError(result.error || 'Login failed. Please try again.');
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
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setAuthState(prev => ({ ...prev, userType: role }));
      
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
      await AuthService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
    
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
      await new Promise(resolve => setTimeout(resolve, 1500));
      
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
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (otp === '1234') {
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
      await new Promise(resolve => setTimeout(resolve, 1500));
      
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
    selectRole,
    logout,
    sendOTP,
    verifyOTP,
    completeProfile,
    setError,
  };
};
