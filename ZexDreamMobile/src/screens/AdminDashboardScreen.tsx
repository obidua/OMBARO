import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';
import DepartmentDashboardScreen from './DepartmentDashboardScreen';

type AdminDashboardScreenNavigationProp = StackNavigationProp<any, 'AdminDashboard'>;

interface Props {
  navigation: AdminDashboardScreenNavigationProp;
}

const AdminDashboardScreen: React.FC<Props> = ({ navigation }) => {
  const { authState } = useAuth();
  return <DepartmentDashboardScreen navigation={navigation} />;
};

export default AdminDashboardScreen;