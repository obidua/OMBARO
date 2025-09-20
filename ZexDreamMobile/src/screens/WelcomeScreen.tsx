import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button } from '../components/ui/Button';

type WelcomeScreenNavigationProp = StackNavigationProp<any, 'Welcome'>;

interface Props {
  navigation: WelcomeScreenNavigationProp;
}

const { width, height } = Dimensions.get('window');

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
    <LinearGradient
      colors={['#F3E8FF', '#FCE7F3', '#EEF2FF']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Logo Section */}
          <View style={styles.logoSection}>
            <View style={styles.logoContainer}>
              <LinearGradient
                colors={['#8B5CF6', '#EC4899']}
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
              <View style={[styles.featureIcon, { backgroundColor: '#F3E8FF' }]}>
                <Text style={styles.featureIconText}>📍</Text>
              </View>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>Find Nearby</Text>
                <Text style={styles.featureDescription}>Discover salons & spas around you</Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <View style={[styles.featureIcon, { backgroundColor: '#FCE7F3' }]}>
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

        {/* Bottom CTA */}
        <View style={styles.bottomSection}>
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
            <Text
              style={styles.portalLink}
              onPress={() => handleGetStarted('employeeLogin')}
            >
              Employee
            </Text>
            <Text style={styles.portalSeparator}>•</Text>
            <Text
              style={styles.portalLink}
              onPress={() => handleGetStarted('vendorLogin')}
            >
              Vendor
            </Text>
            <Text style={styles.portalSeparator}>•</Text>
            <Text
              style={styles.portalLink}
              onPress={() => handleGetStarted('adminLogin')}
            >
              Admin
            </Text>
          </View>
          
          <Text style={styles.disclaimer}>
            By continuing, you agree to our Terms & Privacy Policy
          </Text>
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoContainer: {
    marginBottom: 16,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 16,
  },
  logoIcon: {
    fontSize: 40,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#8B5CF6',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 18,
    color: '#6B7280',
  },
  messageSection: {
    alignItems: 'center',
    marginBottom: 48,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 16,
  },
  welcomeDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  featuresSection: {
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  featureIconText: {
    fontSize: 20,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    gap: 12,
  },
  primaryButton: {
    marginBottom: 8,
  },
  secondaryButton: {
    marginBottom: 24,
  },
  portalAccess: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  portalLink: {
    fontSize: 12,
    color: '#8B5CF6',
    fontWeight: '500',
  },
  portalSeparator: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  disclaimer: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
});

export default WelcomeScreen;