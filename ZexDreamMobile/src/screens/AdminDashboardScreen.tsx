import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';

type AdminDashboardScreenNavigationProp = StackNavigationProp<any, 'AdminDashboard'>;

interface Props {
  navigation: AdminDashboardScreenNavigationProp;
}

const AdminDashboardScreen: React.FC<Props> = ({ navigation }) => {
  const { authState, logout } = useAuth();

  const stats = [
    { label: 'Total Users', value: '2,847', icon: '👥', color: '#DBEAFE' },
    { label: 'Active Spas', value: '156', icon: '🏢', color: '#D1FAE5' },
    { label: 'Platform Revenue', value: '₹8.4L', icon: '💰', color: '#F3E8FF' },
    { label: 'Pending Reviews', value: '23', icon: '⚠️', color: '#FEF3C7' },
  ];

  const systemActions = [
    { id: 'users', title: 'User Management', subtitle: 'Manage all platform users', icon: '👥' },
    { id: 'spas', title: 'Spa Management', subtitle: 'Approve and manage spas', icon: '🏢' },
    { id: 'approvals', title: 'Pending Approvals', subtitle: '23 items need review', icon: '⚠️' },
    { id: 'analytics', title: 'Analytics', subtitle: 'Platform performance', icon: '📊' },
    { id: 'security', title: 'Security Center', subtitle: 'Monitor system security', icon: '🛡️' },
    { id: 'settings', title: 'System Settings', subtitle: 'Configure platform', icon: '⚙️' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#4F46E5', '#8B5CF6']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>Admin Portal</Text>
            <Text style={styles.headerSubtitle}>
              System Administrator • ID: {authState.user.mobile}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={logout}
          >
            <Text style={styles.logoutText}>↗</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Stats Cards */}
        <View style={styles.statsSection}>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <View style={styles.statHeader}>
                  <View style={[styles.statIcon, { backgroundColor: stat.color }]}>
                    <Text style={styles.statIconText}>{stat.icon}</Text>
                  </View>
                  <View style={styles.statNumbers}>
                    <Text style={styles.statValue}>{stat.value}</Text>
                    <Text style={styles.statLabel}>{stat.label}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* System Management */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>System Management</Text>
          <View style={styles.actionsGrid}>
            {systemActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={styles.actionCard}
                onPress={() => console.log(`Navigate to ${action.id}`)}
              >
                <View style={styles.actionIcon}>
                  <Text style={styles.actionIconText}>{action.icon}</Text>
                </View>
                <View style={styles.actionContent}>
                  <Text style={styles.actionTitle}>{action.title}</Text>
                  <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
                </View>
                <Text style={styles.actionArrow}>→</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* System Alerts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>System Alerts</Text>
          <View style={styles.alertsList}>
            <View style={styles.alertItem}>
              <View style={[styles.alertIcon, { backgroundColor: '#FEF2F2' }]}>
                <Text style={styles.alertIconText}>🔒</Text>
              </View>
              <View style={styles.alertContent}>
                <Text style={styles.alertTitle}>Multiple failed login attempts detected</Text>
                <View style={styles.alertMeta}>
                  <View style={styles.alertBadge}>
                    <Text style={styles.alertBadgeText}>Security</Text>
                  </View>
                  <Text style={styles.alertTime}>5 min ago</Text>
                </View>
              </View>
            </View>

            <View style={styles.alertItem}>
              <View style={[styles.alertIcon, { backgroundColor: '#F0FDF4' }]}>
                <Text style={styles.alertIconText}>💰</Text>
              </View>
              <View style={styles.alertContent}>
                <Text style={styles.alertTitle}>Monthly revenue target achieved</Text>
                <View style={styles.alertMeta}>
                  <View style={styles.alertBadge}>
                    <Text style={styles.alertBadgeText}>Revenue</Text>
                  </View>
                  <Text style={styles.alertTime}>2 hours ago</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingTop: 16,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 4,
  },
  logoutButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  statsSection: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statIconText: {
    fontSize: 24,
  },
  statNumbers: {
    alignItems: 'flex-end',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  actionCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row',
  },
  actionIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 12,
    color: '#6B7280',
  },
  actionArrow: {
    fontSize: 20,
    color: '#9CA3AF',
  },
  alertsList: {
    gap: 12,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  alertIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  alertIconText: {
    fontSize: 20,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 8,
  },
  alertMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  alertBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  alertBadgeText: {
    fontSize: 10,
    color: '#374151',
    fontWeight: '500',
  },
  alertTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});

export default AdminDashboardScreen;