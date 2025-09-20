import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { colors, spacing, typography, borderRadius, shadows } from '../constants/theme';

type OTPScreenNavigationProp = StackNavigationProp<any, 'OTP'>;

interface Props {
  navigation: OTPScreenNavigationProp;
}

const OTPScreen: React.FC<Props> = ({ navigation }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const { verifyOTP, sendOTP, authState } = useAuth();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify when all fields are filled
    if (newOtp.every(digit => digit !== '') && newOtp.join('').length === 4) {
      handleVerifyOTP(newOtp.join(''));
    }
  };

  const handleKeyPress = (index: number, key: string) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = async (otpCode: string) => {
    try {
      await verifyOTP(otpCode);
      navigation.navigate('ProfileSetup');
    } catch (error) {
      console.error('Invalid OTP:', error);
    }
  };

  const handleResend = async () => {
    setTimer(30);
    setCanResend(false);
    setOtp(['', '', '', '']);
    
    try {
      await sendOTP(authState.user.mobile || '');
    } catch (error) {
      console.error('Failed to resend OTP:', error);
    }
  };

  const maskedMobile = authState.user.mobile?.replace(/(\d{2})(\d{4})(\d{4})/, '$1****$3') || '';

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
          <Text style={styles.headerTitle}>Verify OTP</Text>
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
                <Text style={styles.iconText}>💬</Text>
              </LinearGradient>
              <Text style={styles.title}>Enter Verification Code</Text>
              <Text style={styles.description}>
                We've sent a 4-digit code to +91 {maskedMobile}
              </Text>
            </View>

            {/* OTP Input */}
            <View style={styles.otpSection}>
              <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={el => inputRefs.current[index] = el}
                    style={[
                      styles.otpInput,
                      digit && styles.otpInputFilled,
                      authState.error && styles.otpInputError,
                    ]}
                    value={digit}
                    onChangeText={value => handleOtpChange(index, value.replace(/\D/g, ''))}
                    onKeyPress={({ nativeEvent }) => handleKeyPress(index, nativeEvent.key)}
                    keyboardType="numeric"
                    maxLength={1}
                    textAlign="center"
                  />
                ))}
              </View>

              {authState.error && (
                <Text style={styles.errorText}>{authState.error}</Text>
              )}

              {/* Resend Timer */}
              <View style={styles.resendSection}>
                {canResend ? (
                  <TouchableOpacity onPress={handleResend} activeOpacity={0.7}>
                    <Text style={styles.resendButton}>🔄 Resend OTP</Text>
                  </TouchableOpacity>
                ) : (
                  <Text style={styles.timerText}>
                    Resend OTP in <Text style={styles.timerHighlight}>{timer}s</Text>
                  </Text>
                )}
              </View>

              <Button
                title="Verify & Continue"
                onPress={() => handleVerifyOTP(otp.join(''))}
                loading={authState.isLoading}
                disabled={otp.some(digit => !digit)}
                size="lg"
                style={styles.verifyButton}
              />
            </View>

            {/* Help Text */}
            <Text style={styles.helpText}>
              Didn't receive the code? Check your SMS or try resending
            </Text>
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
  otpSection: {
    marginBottom: spacing['3xl'],
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.lg,
    marginBottom: spacing['2xl'],
  },
  otpInput: {
    width: 56,
    height: 56,
    borderWidth: 2,
    borderColor: colors.gray[300],
    borderRadius: borderRadius.lg,
    fontSize: typography['2xl'],
    fontWeight: 'bold',
    backgroundColor: colors.white,
  },
  otpInputFilled: {
    borderColor: colors.primary[500],
    backgroundColor: colors.primary[50],
  },
  otpInputError: {
    borderColor: colors.error[500],
  },
  errorText: {
    fontSize: typography.sm,
    color: colors.error[600],
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  resendSection: {
    alignItems: 'center',
    marginBottom: spacing['2xl'],
  },
  resendButton: {
    fontSize: typography.base,
    color: colors.primary[600],
    fontWeight: '600',
  },
  timerText: {
    fontSize: typography.base,
    color: colors.gray[600],
  },
  timerHighlight: {
    color: colors.primary[600],
    fontWeight: '600',
  },
  verifyButton: {
    width: '100%',
  },
  helpText: {
    fontSize: typography.sm,
    color: colors.gray[600],
    textAlign: 'center',
  },
});

export default OTPScreen;