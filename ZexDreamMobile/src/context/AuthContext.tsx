import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserRole } from '../types/auth';
import { ROLE_DEFINITIONS } from '../types/roles';
import { supabase } from '../lib/supabase';
import { authService } from '../services';
export interface User {
  id?: string;
  name?: string;
  email?: string;
  mobile?: string;
  gender?: 'male' | 'female' | 'other';
  dateOfBirth?: string;
  isVerified?: boolean;
}

export interface AuthState {
  user: Partial<User>;
  userType?: 'customer' | 'employee' | 'vendor' | 'admin';
  isLoading: boolean;
  error: string | null;
  selectedEntity?: any;
  currentStep?: string;
}

interface AuthContextType {
  authState: AuthState;
  setUser: (userData: Partial<User>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSelectedEntity: (entity: any) => void;
  setCurrentStep: (step: string) => void;
  loginUser: (mobile: string, password: string, userType: 'employee' | 'vendor' | 'admin') => Promise<void>;
  selectRole: (role: UserRole) => Promise<void>;
  logout: () => void;
  sendOTP: (mobile: string) => Promise<void>;
  verifyOTP: (otp: string) => Promise<void>;
  completeProfile: (profileData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: {},
    isLoading: false,
    error: null,
    currentStep: 'welcome',
  });

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

  const setCurrentStep = (step: string) => {
    setAuthState(prev => ({ ...prev, currentStep: step, error: null }));
  };

  const loginUser = async (mobile: string, password: string, userType: UserRole) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (password === '1234') {
        const roleDef = ROLE_DEFINITIONS.find(role => role.id === userType);
        if (roleDef) {
          setUser({ mobile, isVerified: true });
          setAuthState(prev => ({ ...prev, userType }));

          // Navigate to appropriate dashboard based on role type
          if (userType === 'customer') {
            setCurrentStep('home');
          } else if (userType === 'employee') {
            setCurrentStep('EmployeeDashboard');
          } else if (userType === 'vendor') {
            setCurrentStep('VendorDashboard');
          } else if (userType === 'admin' || userType === 'super_admin') {
            setCurrentStep('AdminDashboard');
          } else {
            // All other departmental roles go to DepartmentDashboard
            setCurrentStep('DepartmentDashboard');
          }
        } else {
          setError('Invalid user type selected.');
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

  const selectRole = async (role: UserRole) => {
    setLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setAuthState(prev => ({ ...prev, userType: role }));
      setCurrentStep('DepartmentDashboard'); // All selected roles go to the generic dashboard
    } catch (error) {
      setError('Role selection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setAuthState({
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
        // Don't navigate here - let the screen handle navigation
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
      // Don't navigate here - let the screen handle navigation
    } catch (error) {
      setError('Failed to save profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      authState,
      setUser,
      setLoading,
      setError,
      setSelectedEntity,
      setCurrentStep,
      loginUser,
      selectRole,
      logout,
      sendOTP,
      verifyOTP,
      completeProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};