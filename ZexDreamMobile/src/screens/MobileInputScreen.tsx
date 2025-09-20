import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';

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
      Alert.alert('Error', 'Failed to send OTP. Please try again.');
    }
  };

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
          <Text style={styles.headerTitle}>Phone Verification</Text>
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
  inputSection: {
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 24,
  },
  sendButton: {
    width: '100%',
  },
  securityNote: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'flex-start',
  },
  securityIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  securityIconText: {
    fontSize: 16,
  },
  securityText: {
    flex: 1,
  },
  securityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  securityDescription: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 18,
  },
});

export default MobileInputScreen;