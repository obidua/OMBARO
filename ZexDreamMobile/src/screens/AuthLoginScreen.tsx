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
import { RouteProp } from '@react-navigation/native';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';

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
        Alert.alert('Login Failed', 'Please check your credentials and try again.');
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
          <Text style={styles.headerTitle}>{userType} Login</Text>
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
    marginBottom: 32,
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
  formSection: {
    marginBottom: 32,
  },
  globalError: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  globalErrorText: {
    fontSize: 14,
    color: '#DC2626',
  },
  loginButton: {
    width: '100%',
  },
  demoCredentials: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    borderRadius: 16,
    padding: 16,
  },
  demoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E40AF',
    marginBottom: 8,
  },
  demoText: {
    fontSize: 14,
    color: '#1D4ED8',
    lineHeight: 20,
  },
  demoBold: {
    fontWeight: '600',
  },
});

export default AuthLoginScreen;