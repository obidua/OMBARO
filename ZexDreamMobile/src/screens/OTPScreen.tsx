import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

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
      Alert.alert('Error', 'Invalid OTP. Please try again.');
    }
  };

  const handleResend = async () => {
    setTimer(30);
    setCanResend(false);
    setOtp(['', '', '', '']);
    
    try {
      await sendOTP(authState.user.mobile || '');
    } catch (error) {
      Alert.alert('Error', 'Failed to resend OTP. Please try again.');
    }
  };

  const maskedMobile = authState.user.mobile?.replace(/(\d{2})(\d{4})(\d{4})/, '$1****$3') || '';

  return (
    <LinearGradient
      colors={['#F3E8FF', '#FCE7F3', '#EEF2FF']}
      style={styles.container}
    >
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

        {/* Content */}
        <View style={styles.content}>
          {/* Icon */}
          <View style={styles.iconSection}>
            <LinearGradient
              colors={['#8B5CF6', '#EC4899']}
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
                <TouchableOpacity onPress={handleResend}>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  backButtonText: {
    fontSize: 20,
    color: '#374151',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  spacer: {
    width: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  iconSection: {
    alignItems: 'center',
    marginBottom: 48,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 16,
  },
  iconText: {
    fontSize: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  otpSection: {
    marginBottom: 32,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 24,
  },
  otpInput: {
    width: 56,
    height: 56,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#FFFFFF',
  },
  otpInputFilled: {
    borderColor: '#8B5CF6',
    backgroundColor: '#F3E8FF',
  },
  otpInputError: {
    borderColor: '#EF4444',
  },
  errorText: {
    fontSize: 14,
    color: '#EF4444',
    textAlign: 'center',
    marginBottom: 16,
  },
  resendSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  resendButton: {
    fontSize: 16,
    color: '#8B5CF6',
    fontWeight: '600',
  },
  timerText: {
    fontSize: 16,
    color: '#6B7280',
  },
  timerHighlight: {
    color: '#8B5CF6',
    fontWeight: '600',
  },
  verifyButton: {
    width: '100%',
  },
  helpText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});

export default OTPScreen;