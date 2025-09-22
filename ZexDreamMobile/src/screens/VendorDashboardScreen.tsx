import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';
import DepartmentDashboardScreen from './DepartmentDashboardScreen';

type VendorDashboardScreenNavigationProp = StackNavigationProp<any, 'VendorDashboard'>;

interface Props {
  navigation: VendorDashboardScreenNavigationProp;
}

// This screen now acts as a wrapper to route to the generic DepartmentDashboardScreen
const VendorDashboardScreen: React.FC<Props> = ({ navigation }) => {
  const { authState } = useAuth();
  return <DepartmentDashboardScreen navigation={navigation} />;
};

export default VendorDashboardScreen;