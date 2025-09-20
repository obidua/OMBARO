import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';

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
  ];

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
    }
  };

  const isFormValid = formData.name && formData.email && formData.gender && formData.dateOfBirth;

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
          <Text style={styles.headerTitle}>Complete Profile</Text>
          <View style={styles.spacer} />
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Icon */}
          <View style={styles.iconSection}>
            <LinearGradient
              colors={['#8B5CF6', '#EC4899']}
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

            {/* Gender Selection */}
            <View style={styles.genderSection}>
              <Text style={styles.genderLabel}>Gender</Text>
              <View style={styles.genderOptions}>
                {genderOptions.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.genderOption,
                      formData.gender === option.value && styles.genderOptionSelected,
                    ]}
                    onPress={() => handleInputChange('gender', option.value)}
                  >
                    <Text style={styles.genderEmoji}>{option.emoji}</Text>
                    <Text style={[
                      styles.genderText,
                      formData.gender === option.value && styles.genderTextSelected,
                    ]}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              {formErrors.gender && (
                <Text style={styles.errorText}>{formErrors.gender}</Text>
              )}
            </View>

            <Input
              label="Date of Birth"
              placeholder="YYYY-MM-DD"
              value={formData.dateOfBirth}
              onChangeText={(value) => handleInputChange('dateOfBirth', value)}
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
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
  },
  iconSection: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 32,
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
  genderSection: {
    marginBottom: 16,
  },
  genderLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  genderOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  genderOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  genderOptionSelected: {
    borderColor: '#8B5CF6',
    backgroundColor: '#F3E8FF',
  },
  genderEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  genderText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  genderTextSelected: {
    color: '#7C3AED',
  },
  errorText: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 4,
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
  submitButton: {
    width: '100%',
  },
  privacyNote: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 32,
  },
  privacyText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 18,
  },
  privacyLink: {
    color: '#8B5CF6',
    fontWeight: '500',
  },
});

export default ProfileSetupScreen;