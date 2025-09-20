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

type EmployeeDashboardScreenNavigationProp = StackNavigationProp<any, 'EmployeeDashboard'>;

interface Props {
  navigation: EmployeeDashboardScreenNavigationProp;
}

const EmployeeDashboardScreen: React.FC<Props> = ({ navigation }) => {
  const { authState, logout } = useAuth();

  const stats = [
    { label: 'Total Spas', value: '47', icon: '🏢', color: '#F3E8FF' },
    { label: 'Active Vendors', value: '32', icon: '👥', color: '#D1FAE5' },
    { label: 'Pending Approvals', value: '8', icon: '⚠️', color: '#FEF3C7' },
    { label: 'Monthly Revenue', value: '₹2.4L', icon: '📈', color: '#DBEAFE' },
  ];

  const quickActions = [
    { id: 'onboard', title: 'Onboard New Spa', subtitle: 'Add a new spa to platform', icon: '➕' },
    { id: 'manage', title: 'Manage Spas', subtitle: 'View and edit existing spas', icon: '🏢' },
    { id: 'approvals', title: 'Review Approvals', subtitle: '8 items need attention', icon: '✅' },
    { id: 'vendors', title: 'Vendor Relations', subtitle: 'Manage vendor partnerships', icon: '🤝' },
    { id: 'analytics', title: 'Analytics', subtitle: 'View performance metrics', icon: '📊' },
    { id: 'settings', title: 'System Settings', subtitle: 'Configure preferences', icon: '⚙️' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#8B5CF6', '#EC4899']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>Employee Dashboard</Text>
            <Text style={styles.headerSubtitle}>
              Welcome back, Employee ID: {authState.user.mobile}
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

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action) => (
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

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityList}>
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Text style={styles.activityIconText}>✅</Text>
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Serenity Spa successfully onboarded</Text>
                <Text style={styles.activitySubtitle}>Added 12 services, verified documentation</Text>
              </View>
              <Text style={styles.activityTime}>2h ago</Text>
            </View>

            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Text style={styles.activityIconText}>✏️</Text>
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Bliss Spa details updated</Text>
                <Text style={styles.activitySubtitle}>Contact information and operating hours modified</Text>
              </View>
              <Text style={styles.activityTime}>1d ago</Text>
            </View>

            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Text style={styles.activityIconText}>🤝</Text>
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>New vendor partnership approved</Text>
                <Text style={styles.activitySubtitle}>Ayurvedic Wellness Center joined the platform</Text>
              </View>
              <Text style={styles.activityTime}>3d ago</Text>
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
    gap: 12,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  actionIconText: {
    fontSize: 24,
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
    fontSize: 14,
    color: '#6B7280',
  },
  actionArrow: {
    fontSize: 20,
    color: '#9CA3AF',
  },
  activityList: {
    gap: 12,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 12,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityIconText: {
    fontSize: 16,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 4,
  },
  activitySubtitle: {
    fontSize: 12,
    color: '#6B7280',
  },
  activityTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});

export default EmployeeDashboardScreen;