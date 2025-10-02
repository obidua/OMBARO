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
import { RadioGroup } from '../components/ui/RadioGroup';
import { DatePicker } from '../components/ui/DatePicker';
import { useAuth } from '../context/AuthContext';
import { colors, spacing, typography, borderRadius, shadows } from '../constants/theme';

type ProfileSetupScreenNavigationProp = StackNavigationProp<any, 'ProfileSetup'>;

interface Props {
  navigation: ProfileSetupScreenNavigationProp;
}

const ProfileSetupScreen: React.FC<Props> = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    dateOfBirth: ''
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    gender: '',
    dateOfBirth: ''
  });

  const { completeProfile, authState } = useAuth();

  const genderOptions = [
    { value: 'male', label: 'Male', emoji: '👨' },
    { value: 'female', label: 'Female', emoji: '👩' },
    { value: 'other', label: 'Other', emoji: '👤' }
  ].map(option => ({
    value: option.value,
    label: option.label,
    icon: <Text style={styles.genderEmoji}>{option.emoji}</Text>
  }));

  const validateForm = () => {
    const errors = {
      name: '',
      email: '',
      gender: '',
      dateOfBirth: ''
    };

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = 'Please enter a valid email address';
      }
    }

    if (!formData.gender) {
      errors.gender = 'Please select your gender';
    }

    if (!formData.dateOfBirth) {
      errors.dateOfBirth = 'Date of birth is required';
    }

    setFormErrors(errors);
    return Object.values(errors).every(error => !error);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (formErrors[field as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        await completeProfile(formData);
        navigation.navigate('Completion');
      } catch (error) {
        Alert.alert('Error', 'Failed to complete profile. Please try again.');
      }
      console.error('Failed to complete profile:', error);
    }
  };

  const isFormValid = formData.name && formData.email && formData.gender && formData.dateOfBirth;

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
          <Text style={styles.headerTitle}>Complete Profile</Text>
          <View style={styles.spacer} />
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          {/* Icon */}
          <View style={styles.iconSection}>
            <LinearGradient
              colors={[colors.primary[600], colors.secondary[500]]}
              style={styles.iconContainer}
            >
              <Text style={styles.iconText}>👤</Text>
            </LinearGradient>
            <Text style={styles.title}>Tell Us About Yourself</Text>
            <Text style={styles.description}>
              Help us personalize your beauty and wellness experience
            </Text>
          </View>

          {/* Form */}
          <View style={styles.formSection}>
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              value={formData.name}
              onChangeText={(value) => handleInputChange('name', value)}
              error={formErrors.name}
            />

            <Input
              label="Email Address"
              placeholder="Enter your email"
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
              error={formErrors.email}
            />

            <RadioGroup
              label="Gender"
              options={genderOptions}
              value={formData.gender}
              onChange={(value) => handleInputChange('gender', value)}
              error={formErrors.gender}
            />

            <DatePicker
              label="Date of Birth"
              value={formData.dateOfBirth}
              onChange={(value) => handleInputChange('dateOfBirth', value)}
              error={formErrors.dateOfBirth}
            />

            {authState.error && (
              <View style={styles.globalError}>
                <Text style={styles.globalErrorText}>{authState.error}</Text>
              </View>
            )}

            <Button
              title="Complete Profile"
              onPress={handleSubmit}
              loading={authState.isLoading}
              disabled={!isFormValid}
              size="lg"
              style={styles.submitButton}
            />
          </View>

          {/* Privacy Note */}
          <View style={styles.privacyNote}>
            <Text style={styles.privacyText}>
              By completing your profile, you agree to our{' '}
              <Text style={styles.privacyLink}>Terms of Service</Text> and{' '}
              <Text style={styles.privacyLink}>Privacy Policy</Text>. 
              Your information is secure and will only be used to enhance your experience.
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
  scrollView: {
    flex: 1,
    paddingHorizontal: spacing['2xl'],
  },
  iconSection: {
    alignItems: 'center',
    marginBottom: spacing['3xl'],
    marginTop: spacing['3xl'],
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
  genderEmoji: {
    fontSize: typography.xl,
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
  submitButton: {
    width: '100%',
  },
  privacyNote: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing['3xl'],
    ...shadows.sm,
  },
  privacyText: {
    fontSize: typography.xs,
    color: colors.gray[600],
    textAlign: 'center',
    lineHeight: typography.lg,
  },
  privacyLink: {
    color: colors.primary[600],
    fontWeight: '500',
  },
});

export default ProfileSetupScreen;