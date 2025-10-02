import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { colors, spacing, typography, borderRadius, shadows } from '../constants/theme';

type ProfileScreenNavigationProp = StackNavigationProp<any, 'Profile'>;

interface Props {
  navigation: ProfileScreenNavigationProp;
}

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const { authState, logout } = useAuth();

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not provided';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const menuItems = [
    { id: 'favorites', label: 'My Favorites', icon: '❤️', description: 'Saved spas and services' },
    { id: 'offers', label: 'Offers & Rewards', icon: '🎁', description: 'Special deals and loyalty points' },
    { id: 'notifications', label: 'Notifications', icon: '🔔', description: 'Manage notification preferences' },
    { id: 'settings', label: 'Settings', icon: '⚙️', description: 'App preferences and privacy' },
    { id: 'help', label: 'Help & Support', icon: '❓', description: 'Get help and contact support' },
    { id: 'privacy', label: 'Privacy Policy', icon: '🛡️', description: 'Terms and privacy information' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.spacer} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{getInitials(authState.user.name)}</Text>
          </View>
          <Text style={styles.userName}>{authState.user.name || 'User'}</Text>
          <Text style={styles.userSubtitle}>OMBARO Member</Text>
          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedIcon}>✓</Text>
            <Text style={styles.verifiedText}>Verified Account</Text>
          </View>
          <Button
            title="✏️ Edit Profile"
            onPress={() => console.log('Edit profile')}
            variant="outline"
            size="sm"
            style={styles.editButton}
          />
        </View>

        {/* User Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <Text style={styles.infoIconText}>📱</Text>
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Mobile Number</Text>
                <Text style={styles.infoValue}>+91 {authState.user.mobile || 'Not provided'}</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <Text style={styles.infoIconText}>📧</Text>
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Email Address</Text>
                <Text style={styles.infoValue}>{authState.user.email || 'Not provided'}</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <Text style={styles.infoIconText}>👤</Text>
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Gender</Text>
                <Text style={[styles.infoValue, styles.capitalize]}>{authState.user.gender || 'Not provided'}</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <Text style={styles.infoIconText}>📅</Text>
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Date of Birth</Text>
                <Text style={styles.infoValue}>{formatDate(authState.user.dateOfBirth)}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account & Settings</Text>
          <View style={styles.menuCard}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.menuItem,
                  index < menuItems.length - 1 && styles.menuItemBorder
                ]}
                onPress={() => console.log('Navigate to:', item.id)}
                activeOpacity={0.7}
              >
                <View style={styles.menuIcon}>
                  <Text style={styles.menuIconText}>{item.icon}</Text>
                </View>
                <View style={styles.menuContent}>
                  <Text style={styles.menuLabel}>{item.label}</Text>
                  <Text style={styles.menuDescription}>{item.description}</Text>
                </View>
                <Text style={styles.menuArrow}>→</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* App Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Information</Text>
          <View style={styles.appInfoCard}>
            <View style={styles.appInfoRow}>
              <Text style={styles.appInfoLabel}>Version:</Text>
              <Text style={styles.appInfoValue}>1.0.0</Text>
            </View>
            <View style={styles.appInfoRow}>
              <Text style={styles.appInfoLabel}>Last Updated:</Text>
              <Text style={styles.appInfoValue}>Jan 2025</Text>
            </View>
            <View style={styles.appInfoRow}>
              <Text style={styles.appInfoLabel}>Build:</Text>
              <Text style={styles.appInfoValue}>2025.01.001</Text>
            </View>
          </View>
        </View>

        {/* Logout Button */}
        <View style={styles.logoutSection}>
          <Button
            title="🚪 Logout"
            onPress={logout}
            variant="outline"
            size="lg"
            style={styles.logoutButton}
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Made with ❤️ by OMBARO Team</Text>
          <Text style={styles.footerCopyright}>© 2025 OMBARO. All rights reserved.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
    ...shadows.sm,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: typography.xl,
    color: colors.gray[700],
  },
  headerTitle: {
    fontSize: typography.lg,
    fontWeight: '600',
    color: colors.gray[900],
  },
  spacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    backgroundColor: colors.white,
    alignItems: 'center',
    paddingVertical: spacing['3xl'],
    paddingHorizontal: spacing['2xl'],
    marginBottom: spacing['2xl'],
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary[600],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    ...shadows.lg,
  },
  avatarText: {
    fontSize: typography['2xl'],
    fontWeight: 'bold',
    color: colors.white,
  },
  userName: {
    fontSize: typography['2xl'],
    fontWeight: 'bold',
    color: colors.gray[900],
    marginBottom: spacing.xs,
  },
  userSubtitle: {
    fontSize: typography.base,
    color: colors.gray[600],
    marginBottom: spacing.md,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.success[50],
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.lg,
  },
  verifiedIcon: {
    fontSize: typography.sm,
    color: colors.success[600],
    marginRight: spacing.xs,
  },
  verifiedText: {
    fontSize: typography.sm,
    color: colors.success[600],
    fontWeight: '500',
  },
  editButton: {
    paddingHorizontal: spacing['2xl'],
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing['2xl'],
  },
  sectionTitle: {
    fontSize: typography.lg,
    fontWeight: '600',
    color: colors.gray[900],
    marginBottom: spacing.lg,
  },
  infoCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    ...shadows.sm,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  infoIconText: {
    fontSize: typography.xl,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: typography.sm,
    color: colors.gray[600],
    marginBottom: spacing.xs,
  },
  infoValue: {
    fontSize: typography.base,
    fontWeight: '500',
    color: colors.gray[900],
  },
  capitalize: {
    textTransform: 'capitalize',
  },
  menuCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.sm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.lg,
  },
  menuIconText: {
    fontSize: typography.xl,
  },
  menuContent: {
    flex: 1,
  },
  menuLabel: {
    fontSize: typography.base,
    fontWeight: '500',
    color: colors.gray[900],
    marginBottom: spacing.xs,
  },
  menuDescription: {
    fontSize: typography.sm,
    color: colors.gray[600],
  },
  menuArrow: {
    fontSize: typography.xl,
    color: colors.gray[400],
  },
  appInfoCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    ...shadows.sm,
  },
  appInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  appInfoLabel: {
    fontSize: typography.sm,
    color: colors.gray[600],
  },
  appInfoValue: {
    fontSize: typography.sm,
    fontWeight: '500',
    color: colors.gray[900],
  },
  logoutSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing['3xl'],
  },
  logoutButton: {
    width: '100%',
    borderColor: colors.error[200],
  },
  footer: {
    alignItems: 'center',
    paddingVertical: spacing['2xl'],
    paddingHorizontal: spacing.lg,
  },
  footerText: {
    fontSize: typography.sm,
    color: colors.gray[500],
    marginBottom: spacing.xs,
  },
  footerCopyright: {
    fontSize: typography.xs,
    color: colors.gray[400],
  },
});

export default ProfileScreen;