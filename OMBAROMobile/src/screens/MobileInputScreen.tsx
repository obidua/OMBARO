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
import { Input } from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';
import { colors, spacing, typography, borderRadius, shadows } from '../constants/theme';

type MobileInputScreenNavigationProp = StackNavigationProp<any, 'MobileInput'>;

interface Props {
  navigation: MobileInputScreenNavigationProp;
}

const MobileInputScreen: React.FC<Props> = ({ navigation }) => {
  const [mobile, setMobile] = useState('');
  const [mobileError, setMobileError] = useState('');
  const { sendOTP, authState } = useAuth();

  const validateMobile = (value: string) => {
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!value) {
      return 'Mobile number is required';
    }
    if (!mobileRegex.test(value)) {
      return 'Please enter a valid 10-digit mobile number';
    }
    return '';
  };

  const handleMobileChange = (value: string) => {
    const numericValue = value.replace(/\D/g, '').slice(0, 10);
    setMobile(numericValue);
    if (mobileError) {
      setMobileError('');
    }
  };

  const handleSendOTP = async () => {
    const error = validateMobile(mobile);
    if (error) {
      setMobileError(error);
      return;
    }
    
    try {
      await sendOTP(mobile);
      navigation.navigate('OTP');
    } catch (error) {
      console.error('Failed to send OTP:', error);
    }
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
          <Text style={styles.headerTitle}>Phone Verification</Text>
          <View style={styles.spacer} />
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Content */}
          <View style={styles.content}>
            {/* Icon */}
            <View style={styles.iconSection}>
              <LinearGradient
                colors={[colors.primary[600], colors.secondary[500]]}
                style={styles.iconContainer}
              >
                <Text style={styles.iconText}>📱</Text>
              </LinearGradient>
              <Text style={styles.title}>Enter Your Mobile Number</Text>
              <Text style={styles.description}>
                We'll send you a verification code to confirm your number
              </Text>
            </View>

            {/* Mobile Input */}
            <View style={styles.inputSection}>
              <Input
                label="Mobile Number"
                placeholder="Enter 10-digit mobile number"
                value={mobile}
                onChangeText={handleMobileChange}
                keyboardType="numeric"
                maxLength={10}
                error={mobileError || authState.error || undefined}
                containerStyle={styles.inputContainer}
              />

              <Button
                title="Send OTP"
                onPress={handleSendOTP}
                loading={authState.isLoading}
                disabled={!mobile || mobile.length !== 10}
                size="lg"
                style={styles.sendButton}
              />
            </View>

            {/* Security Note */}
            <View style={styles.securityNote}>
              <View style={styles.securityIcon}>
                <Text style={styles.securityIconText}>🛡️</Text>
              </View>
              <View style={styles.securityText}>
                <Text style={styles.securityTitle}>Your Privacy is Protected</Text>
                <Text style={styles.securityDescription}>
                  We use your mobile number only for account verification and booking confirmations. 
                  Your data is encrypted and never shared with third parties.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
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
    justifyContent: 'center',
    paddingHorizontal: spacing['2xl'],
    minHeight: 600,
  },
  iconSection: {
    alignItems: 'center',
    marginBottom: spacing['4xl'],
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    ...shadows.xl,
  },
  iconText: {
    fontSize: typography['3xl'],
  },
  title: {
    fontSize: typography['2xl'],
    fontWeight: 'bold',
    color: colors.gray[900],
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: typography.base,
    color: colors.gray[600],
    textAlign: 'center',
  },
  inputSection: {
    marginBottom: spacing['3xl'],
  },
  inputContainer: {
    marginBottom: spacing['2xl'],
  },
  sendButton: {
    width: '100%',
  },
  securityNote: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    alignItems: 'flex-start',
    ...shadows.sm,
  },
  securityIcon: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.md,
    backgroundColor: colors.success[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  securityIconText: {
    fontSize: typography.base,
  },
  securityText: {
    flex: 1,
  },
  securityTitle: {
    fontSize: typography.sm,
    fontWeight: '600',
    color: colors.gray[900],
    marginBottom: spacing.xs,
  },
  securityDescription: {
    fontSize: typography.xs,
    color: colors.gray[600],
    lineHeight: typography.lg,
  },
  bottomSection: {
    paddingHorizontal: spacing['2xl'],
    paddingBottom: spacing['3xl'],
  },
});

export default MobileInputScreen;