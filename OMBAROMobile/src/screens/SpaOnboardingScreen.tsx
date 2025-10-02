import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { colors, spacing, typography, borderRadius, shadows } from '../constants/theme';

type SpaOnboardingScreenNavigationProp = StackNavigationProp<any, 'SpaOnboarding'>;

interface Props {
  navigation: SpaOnboardingScreenNavigationProp;
}

const SpaOnboardingScreen: React.FC<Props> = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    contactNumber: '',
    email: '',
    website: '',
    description: '',
    openingHours: '',
    closingHours: '',
    priceRange: 'mid',
    category: 'full-service',
    amenities: [] as string[],
    specialties: [''],
    services: [{ name: '', price: '', duration: '', description: '', category: 'massage' }]
  });

  const categories = [
    { value: 'full-service', label: 'Full Service Spa' },
    { value: 'day-spa', label: 'Day Spa' },
    { value: 'medical-spa', label: 'Medical Spa' },
    { value: 'wellness-center', label: 'Wellness Center' },
    { value: 'beauty-salon', label: 'Beauty Salon' },
    { value: 'massage-center', label: 'Massage Center' }
  ];

  const availableAmenities = [
    { id: 'wifi', label: 'Free WiFi', icon: '📶' },
    { id: 'parking', label: 'Parking', icon: '🚗' },
    { id: 'card-payment', label: 'Card Payment', icon: '💳' },
    { id: 'refreshments', label: 'Refreshments', icon: '☕' },
    { id: 'security', label: '24/7 Security', icon: '🛡️' },
    { id: 'ac', label: 'Air Conditioning', icon: '❄️' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAmenityToggle = (amenityId: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter(id => id !== amenityId)
        : [...prev.amenities, amenityId]
    }));
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    console.log('Spa onboarding data:', formData);
    navigation.goBack();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Basic Information</Text>
            <Input
              label="Spa Name *"
              placeholder="Enter spa name"
              value={formData.name}
              onChangeText={(value) => handleInputChange('name', value)}
            />
            <Input
              label="Complete Address *"
              placeholder="Enter complete address with pincode"
              value={formData.address}
              onChangeText={(value) => handleInputChange('address', value)}
            />
            <Input
              label="Contact Number *"
              placeholder="Enter contact number"
              value={formData.contactNumber}
              onChangeText={(value) => handleInputChange('contactNumber', value)}
              keyboardType="phone-pad"
            />
            <Input
              label="Email Address *"
              placeholder="Enter email address"
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input
              label="Website (Optional)"
              placeholder="https://www.example.com"
              value={formData.website}
              onChangeText={(value) => handleInputChange('website', value)}
              autoCapitalize="none"
            />
            
            <View style={styles.textAreaContainer}>
              <Text style={styles.textAreaLabel}>Description</Text>
              <TextInput
                style={styles.textArea}
                placeholder="Describe the spa, its ambiance, and unique features..."
                value={formData.description}
                onChangeText={(value) => handleInputChange('description', value)}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </View>
        );
      case 2:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Operating Details</Text>
            <View style={styles.timeRow}>
              <Input
                label="Opening Time"
                placeholder="09:00"
                value={formData.openingHours}
                onChangeText={(value) => handleInputChange('openingHours', value)}
                style={styles.timeInput}
              />
              <Input
                label="Closing Time"
                placeholder="21:00"
                value={formData.closingHours}
                onChangeText={(value) => handleInputChange('closingHours', value)}
                style={styles.timeInput}
              />
            </View>

            <View style={styles.selectContainer}>
              <Text style={styles.selectLabel}>Spa Category</Text>
              <View style={styles.categoryGrid}>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category.value}
                    style={[
                      styles.categoryOption,
                      formData.category === category.value && styles.categoryOptionSelected
                    ]}
                    onPress={() => handleInputChange('category', category.value)}
                    activeOpacity={0.7}
                  >
                    <Text style={[
                      styles.categoryText,
                      formData.category === category.value && styles.categoryTextSelected
                    ]}>
                      {category.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        );
      case 3:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Amenities & Services</Text>
            
            <View style={styles.amenitiesContainer}>
              <Text style={styles.amenitiesTitle}>Available Amenities</Text>
              <View style={styles.amenitiesGrid}>
                {availableAmenities.map((amenity) => (
                  <TouchableOpacity
                    key={amenity.id}
                    style={[
                      styles.amenityOption,
                      formData.amenities.includes(amenity.id) && styles.amenityOptionSelected
                    ]}
                    onPress={() => handleAmenityToggle(amenity.id)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.amenityIcon}>{amenity.icon}</Text>
                    <Text style={[
                      styles.amenityText,
                      formData.amenities.includes(amenity.id) && styles.amenityTextSelected
                    ]}>
                      {amenity.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.photoUpload}>
              <Text style={styles.photoTitle}>Photo Upload</Text>
              <View style={styles.photoPlaceholder}>
                <Text style={styles.photoIcon}>📷</Text>
                <Text style={styles.photoText}>Upload spa photos</Text>
                <Text style={styles.photoSubtext}>Tap to browse photos</Text>
              </View>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Onboard New Spa</Text>
        <View style={styles.spacer} />
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          {[1, 2, 3].map((step) => (
            <View key={step} style={styles.progressStep}>
              <View style={[
                styles.progressDot,
                step <= currentStep && styles.progressDotActive
              ]}>
                <Text style={[
                  styles.progressNumber,
                  step <= currentStep && styles.progressNumberActive
                ]}>
                  {step}
                </Text>
              </View>
              {step < 3 && (
                <View style={[
                  styles.progressLine,
                  step < currentStep && styles.progressLineActive
                ]} />
              )}
            </View>
          ))}
        </View>
        <View style={styles.progressLabels}>
          <Text style={styles.progressLabel}>Basic Info</Text>
          <Text style={styles.progressLabel}>Operating</Text>
          <Text style={styles.progressLabel}>Amenities</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderStepContent()}
      </ScrollView>

      {/* Navigation Buttons */}
      <View style={styles.navigationContainer}>
        <Button
          title="Previous"
          onPress={prevStep}
          variant="outline"
          disabled={currentStep === 1}
          style={styles.navButton}
        />
        
        {currentStep < 3 ? (
          <Button
            title="Next Step"
            onPress={nextStep}
            style={styles.navButton}
          />
        ) : (
          <Button
            title="⭐ Complete Onboarding"
            onPress={handleSubmit}
            style={styles.navButton}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
    ...shadows.sm,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
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
  progressContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  progressStep: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressDot: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.full,
    backgroundColor: colors.gray[200],
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressDotActive: {
    backgroundColor: colors.primary[600],
  },
  progressNumber: {
    fontSize: typography.sm,
    fontWeight: '500',
    color: colors.gray[600],
  },
  progressNumberActive: {
    color: colors.white,
  },
  progressLine: {
    flex: 1,
    height: 2,
    backgroundColor: colors.gray[200],
    marginHorizontal: spacing.sm,
  },
  progressLineActive: {
    backgroundColor: colors.primary[600],
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabel: {
    fontSize: typography.xs,
    color: colors.gray[600],
    flex: 1,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  stepContent: {
    padding: spacing.lg,
  },
  stepTitle: {
    fontSize: typography.xl,
    fontWeight: '600',
    color: colors.gray[900],
    marginBottom: spacing['2xl'],
    textAlign: 'center',
  },
  timeRow: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  timeInput: {
    flex: 1,
  },
  textAreaContainer: {
    marginBottom: spacing.lg,
  },
  textAreaLabel: {
    fontSize: typography.sm,
    fontWeight: '500',
    color: colors.gray[700],
    marginBottom: spacing.sm,
  },
  textArea: {
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    fontSize: typography.base,
    color: colors.gray[900],
    backgroundColor: colors.white,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  selectContainer: {
    marginBottom: spacing.lg,
  },
  selectLabel: {
    fontSize: typography.sm,
    fontWeight: '500',
    color: colors.gray[700],
    marginBottom: spacing.sm,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  categoryOption: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: borderRadius.lg,
    backgroundColor: colors.white,
    minWidth: '48%',
  },
  categoryOptionSelected: {
    borderColor: colors.primary[500],
    backgroundColor: colors.primary[50],
  },
  categoryText: {
    fontSize: typography.sm,
    fontWeight: '500',
    color: colors.gray[700],
    textAlign: 'center',
  },
  categoryTextSelected: {
    color: colors.primary[700],
  },
  amenitiesContainer: {
    marginBottom: spacing['2xl'],
  },
  amenitiesTitle: {
    fontSize: typography.base,
    fontWeight: '600',
    color: colors.gray[900],
    marginBottom: spacing.lg,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  amenityOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderWidth: 2,
    borderColor: colors.gray[200],
    borderRadius: borderRadius.xl,
    backgroundColor: colors.white,
    minWidth: '45%',
  },
  amenityOptionSelected: {
    borderColor: colors.primary[500],
    backgroundColor: colors.primary[50],
  },
  amenityIcon: {
    fontSize: typography.xl,
    marginRight: spacing.sm,
  },
  amenityText: {
    fontSize: typography.sm,
    fontWeight: '500',
    color: colors.gray[700],
  },
  amenityTextSelected: {
    color: colors.primary[700],
  },
  photoUpload: {
    marginBottom: spacing['2xl'],
  },
  photoTitle: {
    fontSize: typography.base,
    fontWeight: '600',
    color: colors.gray[900],
    marginBottom: spacing.lg,
  },
  photoPlaceholder: {
    borderWidth: 2,
    borderColor: colors.gray[300],
    borderStyle: 'dashed',
    borderRadius: borderRadius.xl,
    padding: spacing['3xl'],
    alignItems: 'center',
    backgroundColor: colors.gray[50],
  },
  photoIcon: {
    fontSize: 48,
    marginBottom: spacing.lg,
  },
  photoText: {
    fontSize: typography.base,
    color: colors.gray[600],
    marginBottom: spacing.sm,
  },
  photoSubtext: {
    fontSize: typography.sm,
    color: colors.gray[500],
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.gray[100],
    gap: spacing.lg,
  },
  navButton: {
    flex: 1,
  },
});

export default SpaOnboardingScreen;