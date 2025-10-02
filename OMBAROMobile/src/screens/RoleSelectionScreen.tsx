```typescript
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { colors, spacing, typography, borderRadius, shadows } from '../constants/theme';
import { UserRole } from '../types/auth';
import { ROLE_DEFINITIONS } from '../types/roles';

// Import icons (using emojis for simplicity, replace with actual icon components if available)
import {
  Users, Building, DollarSign, Scale, HeadphonesIcon, UserCheck, List, Database, Briefcase, Monitor, Crown, MapPin, Gavel, Calculator, UserCog, Heart,
} from 'lucide-react-native'; // Assuming lucide-react-native is installed

type RoleSelectionScreenNavigationProp = StackNavigationProp<any, 'RoleSelection'>;

interface Props {
  navigation: RoleSelectionScreenNavigationProp;
}

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'Users': return <Users size={24} color={colors.gray[700]} />;
    case 'Building': return <Building size={24} color={colors.gray[700]} />;
    case 'DollarSign': return <DollarSign size={24} color={colors.gray[700]} />;
    case 'Scale': return <Scale size={24} color={colors.gray[700]} />;
    case 'HeadphonesIcon': return <HeadphonesIcon size={24} color={colors.gray[700]} />;
    case 'UserCheck': return <UserCheck size={24} color={colors.gray[700]} />;
    case 'List': return <List size={24} color={colors.gray[700]} />;
    case 'Database': return <Database size={24} color={colors.gray[700]} />;
    case 'Briefcase': return <Briefcase size={24} color={colors.gray[700]} />;
    case 'Monitor': return <Monitor size={24} color={colors.gray[700]} />;
    case 'Crown': return <Crown size={24} color={colors.gray[700]} />;
    case 'MapPin': return <MapPin size={24} color={colors.gray[700]} />;
    case 'Gavel': return <Gavel size={24} color={colors.gray[700]} />;
    case 'Calculator': return <Calculator size={24} color={colors.gray[700]} />;
    case 'UserCog': return <UserCog size={24} color={colors.gray[700]} />;
    case 'Heart': return <Heart size={24} color={colors.gray[700]} />;
    default: return <Users size={24} color={colors.gray[700]} />; // Default icon
  }
};

const RoleSelectionScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const { selectRole, authState } = useAuth();

  const roleCategories = [
    {
      title: 'Core Departments',
      roles: [
        ROLE_DEFINITIONS.find(r => r.id === 'accounts_department')!,
        ROLE_DEFINITIONS.find(r => r.id === 'marketing_department')!,
        ROLE_DEFINITIONS.find(r => r.id === 'finance_department')!,
        ROLE_DEFINITIONS.find(r => r.id === 'hr_department')!,
        ROLE_DEFINITIONS.find(r => r.id === 'it_department')!,
      ].filter(Boolean), // Filter out undefined if not found
    },
    {
      title: 'Operations',
      roles: [
        ROLE_DEFINITIONS.find(r => r.id === 'customer_care')!,
        ROLE_DEFINITIONS.find(r => r.id === 'staff_department')!,
        ROLE_DEFINITIONS.find(r => r.id === 'fo_department')!,
      ].filter(Boolean),
    },
    {
      title: 'Data Management',
      roles: [
        ROLE_DEFINITIONS.find(r => r.id === 'vendor_list')!,
        ROLE_DEFINITIONS.find(r => r.id === 'customer_data')!,
      ].filter(Boolean),
    },
    {
      title: 'Legal & Compliance',
      roles: [
        ROLE_DEFINITIONS.find(r => r.id === 'legal_department')!,
        ROLE_DEFINITIONS.find(r => r.id === 'advocate')!,
        ROLE_DEFINITIONS.find(r => r.id === 'ca_cs')!,
      ].filter(Boolean),
    },
    {
      title: 'Leadership',
      roles: [
        ROLE_DEFINITIONS.find(r => r.id === 'super_admin')!,
        ROLE_DEFINITIONS.find(r => r.id === 'directors')!,
      ].filter(Boolean),
    },
    {
      title: 'Office Management',
      roles: [
        ROLE_DEFINITIONS.find(r => r.id === 'ho_details')!,
        ROLE_DEFINITIONS.find(r => r.id === 'corporate_office')!,
      ].filter(Boolean),
    },
  ].filter(category => category.roles.length > 0); // Filter out empty categories

  const handleRoleSelect = async () => {
    if (selectedRole) {
      await selectRole(selectedRole);
      // Navigation is handled by AuthContext after role selection
    }
  };

  const getRoleColorStyle = (color: string) => {
    // Assuming color is a hex code like '#RRGGBB'
    // For gradients, you might need to parse and use LinearGradient component
    return { backgroundColor: color };
  };

  return (
    <LinearGradient colors={[colors.primary[50], colors.secondary[50], '#EEF2FF']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Select Your Role</Text>
          <View style={styles.spacer} />
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {roleCategories.map((category, categoryIndex) => (
              <View key={categoryIndex} style={styles.categorySection}>
                <Text style={styles.categoryTitle}>{category.title}</Text>
                <View style={styles.rolesGrid}>
                  {category.roles.map((role) => (
                    <TouchableOpacity
                      key={role.id}
                      style={[
                        styles.roleCard,
                        selectedRole === role.id && styles.roleCardSelected,
                      ]}
                      onPress={() => setSelectedRole(role.id as UserRole)}
                      activeOpacity={0.7}
                    >
                      <View style={[styles.roleIconContainer, getRoleColorStyle(role.color)]}>
                        {getIconComponent(role.icon)}
                      </View>
                      <Text style={styles.roleName}>{role.name}</Text>
                      <Text style={styles.roleDescription}>{role.description}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Bottom Action */}
        <View style={styles.bottomSection}>
          <Button
            title={`Continue as ${selectedRole ? ROLE_DEFINITIONS.find(r => r.id === selectedRole)?.name : 'Selected Role'}`}
            onPress={handleRoleSelect}
            disabled={!selectedRole || authState.isLoading}
            loading={authState.isLoading}
            size="lg"
            style={styles.continueButton}
          />
          {selectedRole && (
            <View style={styles.demoCredentials}>
              <Text style={styles.demoTitle}>Demo Mode</Text>
              <Text style={styles.demoText}>
                <Text style={styles.demoBold}>Password:</Text> 1234 for all roles
              </Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing['2xl'],
    paddingVertical: spacing.lg,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.md,
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
  content: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  categorySection: {
    marginBottom: spacing['3xl'],
  },
  categoryTitle: {
    fontSize: typography.xl,
    fontWeight: 'bold',
    color: colors.gray[900],
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.sm,
  },
  rolesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: spacing.md, // Gap between items
  },
  roleCard: {
    width: '48%', // Roughly half minus gap
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    ...shadows.sm,
    borderWidth: 2,
    borderColor: colors.gray[200],
    alignItems: 'center',
  },
  roleCardSelected: {
    borderColor: colors.primary[500],
    backgroundColor: colors.primary[50],
  },
  roleIconContainer: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    // Dynamic background color will be applied via getRoleColorStyle
  },
  roleName: {
    fontSize: typography.base,
    fontWeight: '600',
    color: colors.gray[900],
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  roleDescription: {
    fontSize: typography.sm,
    color: colors.gray[600],
    textAlign: 'center',
  },
  bottomSection: {
    paddingHorizontal: spacing['2xl'],
    paddingBottom: spacing['3xl'],
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.gray[100],
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  continueButton: {
    width: '100%',
  },
  demoCredentials: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginTop: spacing.md,
    ...shadows.sm,
  },
  demoTitle: {
    fontSize: typography.base,
    fontWeight: '600',
    color: '#1E40AF',
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  demoText: {
    fontSize: typography.sm,
    color: '#1D4ED8',
    lineHeight: typography.xl,
    textAlign: 'center',
  },
  demoBold: {
    fontWeight: '600',
  },
});

export default RoleSelectionScreen;
```