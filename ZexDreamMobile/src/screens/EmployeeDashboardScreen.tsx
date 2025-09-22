import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';
import DepartmentDashboardScreen from './DepartmentDashboardScreen';

type EmployeeDashboardScreenNavigationProp = StackNavigationProp<any, 'EmployeeDashboard'>;

interface Props {
  navigation: EmployeeDashboardScreenNavigationProp;
}

// This screen now acts as a wrapper to route to the generic DepartmentDashboardScreen
const EmployeeDashboardScreen: React.FC<Props> = ({ navigation }) => {
  const { authState } = useAuth();
  return <DepartmentDashboardScreen navigation={navigation} />;
};

export default EmployeeDashboardScreen;