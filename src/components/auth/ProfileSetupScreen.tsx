import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Users, Calendar, CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { RadioGroup } from '../ui/RadioGroup';
import { DatePicker } from '../ui/DatePicker';
import { User as UserType } from '../../types/auth';

interface ProfileSetupScreenProps {
  onBack: () => void;
  onCompleteProfile: (profileData: Partial<UserType>) => void;
  isLoading: boolean;
  error: string | null;
}

export const ProfileSetupScreen: React.FC<ProfileSetupScreenProps> = ({
  onBack,
  onCompleteProfile,
  isLoading,
  error
}) => {
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

  const genderOptions = [
    {
      value: 'male',
      label: 'Male',
      icon: <Users className="w-5 h-5 text-blue-600" />
    },
    {
      value: 'female',
      label: 'Female',
      icon: <Users className="w-5 h-5 text-pink-600" />
    },
    {
      value: 'other',
      label: 'Other',
      icon: <Users className="w-5 h-5 text-purple-600" />
    }
  ];

  const validateForm = () => {
    const errors = {
      name: '',
      email: '',
      gender: '',
      dateOfBirth: ''
    };

    // Name validation
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = 'Please enter a valid email address';
      }
    }

    // Gender validation
    if (!formData.gender) {
      errors.gender = 'Please select your gender';
    }

    // Date of birth validation
    if (!formData.dateOfBirth) {
      errors.dateOfBirth = 'Date of birth is required';
    } else {
      const birthDate = new Date(formData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        // Adjust age if birthday hasn't occurred this year
      }
      
      if (age < 18) {
        errors.dateOfBirth = 'You must be at least 18 years old';
      }
    }

    setFormErrors(errors);
    return Object.values(errors).every(error => !error);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (formErrors[field as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onCompleteProfile(formData);
    }
  };

  const isFormValid = formData.name && formData.email && formData.gender && formData.dateOfBirth;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <button
          onClick={onBack}
          aria-label="Go back to OTP verification screen"
          className="w-10 h-10 rounded-xl bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <div className="text-center">
          <h1 className="text-lg font-semibold text-gray-900">Complete Profile</h1>
        </div>
        <div className="w-10" />
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pb-8">
        <div className="max-w-md mx-auto w-full">
          {/* Icon */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <User className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Tell Us About Yourself
            </h2>
            <p className="text-gray-600">
              Help us personalize your beauty and wellness experience
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Name Input */}
            <Input
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              error={formErrors.name}
              icon={<User className="w-5 h-5 text-gray-400" />}
            />

            {/* Email Input */}
            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              error={formErrors.email}
              icon={<Mail className="w-5 h-5 text-gray-400" />}
            />

            {/* Gender Selection */}
            <RadioGroup
              label="Gender"
              options={genderOptions}
              value={formData.gender}
              onChange={(value) => handleInputChange('gender', value)}
              error={formErrors.gender}
            />

            {/* Date of Birth */}
            <DatePicker
              label="Date of Birth"
              value={formData.dateOfBirth}
              onChange={(value) => handleInputChange('dateOfBirth', value)}
              error={formErrors.dateOfBirth}
            />

            {/* Global Error */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              loading={isLoading}
              disabled={!isFormValid}
              size="lg"
              className="w-full"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Complete Profile
            </Button>
          </div>

          {/* Privacy Note */}
          <div className="mt-8 p-4 bg-white/60 backdrop-blur-sm rounded-2xl">
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              By completing your profile, you agree to our{' '}
              <span className="text-purple-600 font-medium">Terms of Service</span> and{' '}
              <span className="text-purple-600 font-medium">Privacy Policy</span>. 
              Your information is secure and will only be used to enhance your experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};