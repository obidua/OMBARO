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
import { RouteProp } from '@react-navigation/native';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';
import { colors, spacing, typography, borderRadius, shadows } from '../constants/theme';

type AuthLoginScreenNavigationProp = StackNavigationProp<any, 'AuthLogin'>;
type AuthLoginScreenRouteProp = RouteProp<{ AuthLogin: { userType: string } }, 'AuthLogin'>;

interface Props {
  navigation: AuthLoginScreenNavigationProp;
  route: AuthLoginScreenRouteProp;
}

const AuthLoginScreen: React.FC<Props> = ({ navigation, route }) => {
  const { userType } = route.params;
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState({
    mobile: '',
    password: ''
  });

  const { loginUser, authState } = useAuth();

  const validateForm = () => {
    const errors = { mobile: '', password: '' };
    
    if (!mobile.trim()) {
      errors.mobile = 'Mobile number is required';
    } else if (mobile.length !== 10) {
      errors.mobile = 'Please enter a valid 10-digit mobile number';
    }
    
    if (!password.trim()) {
      errors.password = 'Password is required';
    }
    
    setFormErrors(errors);
    return Object.values(errors).every(error => !error);
  };

  const handleLogin = async () => {
    if (validateForm()) {
      try {
        const userTypeKey = userType.toLowerCase() as 'employee' | 'vendor' | 'admin';
        await loginUser(mobile, password, userTypeKey);
        
        // Navigate to appropriate dashboard
        switch (userTypeKey) {
          case 'employee':
            navigation.navigate('EmployeeDashboard');
            break;
          case 'vendor':
            navigation.navigate('VendorDashboard');
            break;
          case 'admin':
            navigation.navigate('AdminDashboard');
            break;
        }
      } catch (error) {
        console.error('Login failed:', error);
      }
    }
  };

  const getIcon = () => {
    switch (userType) {
      case 'Employee': return '👨‍💼';
      case 'Vendor': return '🏪';
      case 'Admin': return '👑';
      default: return '🔐';
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
          <Text style={styles.headerTitle}>{userType} Login</Text>
          <View style={styles.spacer} />
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          {/* Content */}
          <View style={styles.content}>
            {/* Icon */}
            <View style={styles.iconSection}>
              <LinearGradient
                colors={[colors.primary[600], colors.secondary[500]]}
                style={styles.iconContainer}
              >
                <Text style={styles.iconText}>{getIcon()}</Text>
              </LinearGradient>
              <Text style={styles.title}>{userType} Portal</Text>
              <Text style={styles.description}>
                Enter your credentials to access the {userType.toLowerCase()} dashboard
              </Text>
            </View>

            {/* Login Form */}
            <View style={styles.formSection}>
              <Input
                label="Mobile Number"
                placeholder="Enter 10-digit mobile number"
                value={mobile}
                onChangeText={(value) => {
                  const numericValue = value.replace(/\D/g, '').slice(0, 10);
                  setMobile(numericValue);
                  if (formErrors.mobile) {
                    setFormErrors(prev => ({ ...prev, mobile: '' }));
                  }
                }}
                keyboardType="numeric"
                maxLength={10}
                error={formErrors.mobile}
              />

              <Input
                label="Password"
                placeholder="Enter password"
                value={password}
                onChangeText={(value) => {
                  setPassword(value);
                  if (formErrors.password) {
                    setFormErrors(prev => ({ ...prev, password: '' }));
                  }
                }}
                secureTextEntry
                error={formErrors.password}
              />

              {authState.error && (
                <View style={styles.globalError}>
                  <Text style={styles.globalErrorText}>{authState.error}</Text>
                </View>
              )}

              <Button
                title={`Login to ${userType} Portal`}
                onPress={handleLogin}
                loading={authState.isLoading}
                disabled={!mobile || !password}
                size="lg"
                style={styles.loginButton}
              />
            </View>

            {/* Demo Credentials */}
            <View style={styles.demoCredentials}>
              <Text style={styles.demoTitle}>Demo Credentials</Text>
              <Text style={styles.demoText}>
                <Text style={styles.demoBold}>Mobile:</Text> Any 10-digit number{'\n'}
                <Text style={styles.demoBold}>Password:</Text> 1234
              </Text>
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
    paddingVertical: spacing['2xl'],
  },
  iconSection: {
    alignItems: 'center',
    marginBottom: spacing['3xl'],
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
  formSection: {
    marginBottom: spacing['3xl'],
  },
  globalError: {
    backgroundColor: colors.error[50],
    borderWidth: 1,
    borderColor: colors.error[200],
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  globalErrorText: {
    fontSize: typography.sm,
    color: colors.error[600],
  },
  loginButton: {
    width: '100%',
  },
  demoCredentials: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    ...shadows.sm,
  },
  demoTitle: {
    fontSize: typography.base,
    fontWeight: '600',
    color: '#1E40AF',
    marginBottom: spacing.sm,
  },
  demoText: {
    fontSize: typography.sm,
    color: '#1D4ED8',
    lineHeight: typography.xl,
  },
  demoBold: {
    fontWeight: '600',
  },
});

export default AuthLoginScreen;