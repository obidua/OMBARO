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
import { Button } from '../components/ui/Button';
import { colors, spacing, typography, borderRadius, shadows } from '../constants/theme';

type WelcomeScreenNavigationProp = StackNavigationProp<any, 'Welcome'>;

interface Props {
  navigation: WelcomeScreenNavigationProp;
}

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  const handleGetStarted = (userType?: string) => {
    if (userType === 'employeeLogin') {
      navigation.navigate('AuthLogin', { userType: 'Employee' });
    } else if (userType === 'vendorLogin') {
      navigation.navigate('AuthLogin', { userType: 'Vendor' });
    } else if (userType === 'adminLogin') {
      navigation.navigate('AuthLogin', { userType: 'Admin' });
    } else {
      navigation.navigate('MobileInput');
    }
  };

  return (
    <LinearGradient colors={[colors.primary[50], colors.secondary[50], '#EEF2FF']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {/* Logo Section */}
            <View style={styles.logoSection}>
              <View style={styles.logoContainer}>
                <LinearGradient
                  colors={[colors.primary[600], colors.secondary[500]]}
                  style={styles.logo}
                >
                  <Text style={styles.logoIcon}>✨</Text>
                </LinearGradient>
              </View>
              <Text style={styles.appName}>ZexDream</Text>
              <Text style={styles.tagline}>Beauty & Wellness Hub</Text>
            </View>

            {/* Welcome Message */}
            <View style={styles.messageSection}>
              <Text style={styles.welcomeTitle}>
                Welcome to Your Beauty Journey
              </Text>
              <Text style={styles.welcomeDescription}>
                Discover and book premium spa, salon, and wellness services near you. 
                Experience luxury at your fingertips.
              </Text>
            </View>

            {/* Features */}
            <View style={styles.featuresSection}>
              <View style={styles.featureItem}>
                <View style={[styles.featureIcon, { backgroundColor: colors.primary[100] }]}>
                  <Text style={styles.featureIconText}>📍</Text>
                </View>
                <View style={styles.featureText}>
                  <Text style={styles.featureTitle}>Find Nearby</Text>
                  <Text style={styles.featureDescription}>Discover salons & spas around you</Text>
                </View>
              </View>

              <View style={styles.featureItem}>
                <View style={[styles.featureIcon, { backgroundColor: colors.secondary[100] }]}>
                  <Text style={styles.featureIconText}>⏰</Text>
                </View>
                <View style={styles.featureText}>
                  <Text style={styles.featureTitle}>Easy Booking</Text>
                  <Text style={styles.featureDescription}>Book appointments in seconds</Text>
                </View>
              </View>

              <View style={styles.featureItem}>
                <View style={[styles.featureIcon, { backgroundColor: '#EEF2FF' }]}>
                  <Text style={styles.featureIconText}>⭐</Text>
                </View>
                <View style={styles.featureText}>
                  <Text style={styles.featureTitle}>Premium Quality</Text>
                  <Text style={styles.featureDescription}>Verified professionals only</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Bottom CTA */}
        <View style={styles.bottomSection}>
          <View style={styles.buttonContainer}>
            <Button
              title="Sign Up"
              onPress={() => handleGetStarted()}
              size="lg"
              style={styles.primaryButton}
            />
            <Button
              title="Login"
              onPress={() => handleGetStarted()}
              variant="outline"
              size="lg"
              style={styles.secondaryButton}
            />
            
            {/* Portal Access */}
            <View style={styles.portalAccess}>
              <TouchableOpacity onPress={() => handleGetStarted('employeeLogin')}>
                <Text style={styles.portalLink}>Employee</Text>
              </TouchableOpacity>
              <Text style={styles.portalSeparator}>•</Text>
              <TouchableOpacity onPress={() => handleGetStarted('vendorLogin')}>
                <Text style={styles.portalLink}>Vendor</Text>
              </TouchableOpacity>
              <Text style={styles.portalSeparator}>•</Text>
              <TouchableOpacity onPress={() => handleGetStarted('adminLogin')}>
                <Text style={styles.portalLink}>Admin</Text>
              </TouchableOpacity>
            </View>
            
            <Text style={styles.disclaimer}>
              By continuing, you agree to our Terms & Privacy Policy
            </Text>
          </View>
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
  content: {
    paddingHorizontal: spacing['2xl'],
    paddingTop: spacing['4xl'],
    paddingBottom: spacing['2xl'],
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: spacing['4xl'],
  },
  logoContainer: {
    marginBottom: spacing.lg,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: borderRadius['3xl'],
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.xl,
  },
  logoIcon: {
    fontSize: typography['4xl'],
  },
  appName: {
    fontSize: typography['4xl'],
    fontWeight: 'bold',
    color: colors.primary[600],
    marginBottom: spacing.sm,
  },
  tagline: {
    fontSize: typography.lg,
    color: colors.gray[600],
  },
  messageSection: {
    alignItems: 'center',
    marginBottom: spacing['4xl'],
  },
  welcomeTitle: {
    fontSize: typography['2xl'],
    fontWeight: 'bold',
    color: colors.gray[900],
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  welcomeDescription: {
    fontSize: typography.base,
    color: colors.gray[600],
    textAlign: 'center',
    lineHeight: typography['2xl'],
  },
  featuresSection: {
    gap: spacing.lg,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    ...shadows.md,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  featureIconText: {
    fontSize: typography.xl,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: typography.base,
    fontWeight: '600',
    color: colors.gray[900],
    marginBottom: spacing.xs,
  },
  featureDescription: {
    fontSize: typography.sm,
    color: colors.gray[600],
  },
  bottomSection: {
    paddingHorizontal: spacing['2xl'],
    paddingBottom: spacing['3xl'],
  },
  buttonContainer: {
    gap: spacing.md,
  },
  primaryButton: {
    width: '100%',
  },
  secondaryButton: {
    width: '100%',
    marginBottom: spacing['2xl'],
  },
  portalAccess: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  portalLink: {
    fontSize: typography.xs,
    color: colors.primary[600],
    fontWeight: '500',
  },
  portalSeparator: {
    fontSize: typography.xs,
    color: colors.gray[400],
  },
  disclaimer: {
    fontSize: typography.xs,
    color: colors.gray[600],
    textAlign: 'center',
  },
});

export default WelcomeScreen;