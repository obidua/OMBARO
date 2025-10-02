import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService, UserProfile } from '../services';

export type PortalType = 'customer' | 'vendor' | 'therapist' | 'employee' | 'admin';

export interface PortalContextType {
  currentPortal: PortalType | null;
  userProfile: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setPortal: (portal: PortalType) => void;
  logout: () => void;
}

const PortalContext = createContext<PortalContextType | undefined>(undefined);

export const PortalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPortal, setCurrentPortal] = useState<PortalType | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUserProfile();

    const { data: subscription } = authService.onAuthStateChange(async (user) => {
      if (user) {
        await loadUserProfile();
      } else {
        setUserProfile(null);
        setCurrentPortal(null);
        setIsAuthenticated(false);
      }
    });

    return () => {
      subscription?.subscription?.unsubscribe();
    };
  }, []);

  const loadUserProfile = async () => {
    try {
      setIsLoading(true);
      const user = await authService.getCurrentUser();

      if (user) {
        const profile = await authService.getUserProfile(user.id);

        if (profile) {
          setUserProfile(profile);
          setIsAuthenticated(true);

          const portalFromRole = mapRoleToPortal(profile.role);
          setCurrentPortal(portalFromRole);
        }
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const mapRoleToPortal = (role: string): PortalType => {
    if (role === 'customer') return 'customer';
    if (role === 'vendor') return 'vendor';
    if (role === 'therapist') return 'therapist';
    if (role === 'admin' || role === 'super_admin') return 'admin';
    return 'employee';
  };

  const setPortal = (portal: PortalType) => {
    setCurrentPortal(portal);
  };

  const logout = async () => {
    try {
      await authService.signOut();
      setUserProfile(null);
      setCurrentPortal(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <PortalContext.Provider
      value={{
        currentPortal,
        userProfile,
        isAuthenticated,
        isLoading,
        setPortal,
        logout
      }}
    >
      {children}
    </PortalContext.Provider>
  );
};

export const usePortal = () => {
  const context = useContext(PortalContext);
  if (context === undefined) {
    throw new Error('usePortal must be used within a PortalProvider');
  }
  return context;
};
