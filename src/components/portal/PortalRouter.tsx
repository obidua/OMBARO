import React from 'react';
import { usePortal } from '../../context/PortalContext';
import { HomeScreen } from '../screens/HomeScreen';
import { AdminDashboardScreen } from '../auth/AdminDashboardScreen';
import { VendorDashboardScreen } from '../auth/VendorDashboardScreen';
import { EmployeeDashboardScreen } from '../auth/EmployeeDashboardScreen';
import { TherapistDashboardScreen } from '../therapist/TherapistDashboardScreen';

export const PortalRouter: React.FC = () => {
  const { currentPortal, isLoading } = usePortal();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!currentPortal) {
    return <HomeScreen />;
  }

  switch (currentPortal) {
    case 'customer':
      return <HomeScreen />;

    case 'admin':
      return <AdminDashboardScreen />;

    case 'vendor':
      return <VendorDashboardScreen />;

    case 'employee':
      return <EmployeeDashboardScreen />;

    case 'therapist':
      return <TherapistDashboardScreen />;

    default:
      return <HomeScreen />;
  }
};
