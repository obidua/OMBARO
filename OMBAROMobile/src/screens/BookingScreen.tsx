import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { colors, spacing, typography, borderRadius, shadows } from '../constants/theme';

type BookingScreenNavigationProp = StackNavigationProp<any, 'Booking'>;
type BookingScreenRouteProp = RouteProp<{ Booking: { salon: any; cartItems?: any[] } }, 'Booking'>;

interface Props {
  navigation: BookingScreenNavigationProp;
  route: BookingScreenRouteProp;
}

const BookingScreen: React.FC<Props> = ({ navigation, route }) => {
  const { salon, cartItems = [] } = route.params;
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: ''
  });
  const [termsAccepted, setTermsAccepted] = useState(false);

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'
  ];

  const totalAmount = cartItems.reduce((sum: number, item: any) => sum + (item.service?.price || 2500), 0) || 2500;

  const handleBooking = () => {
    const bookingData = {
      salon,
      cartItems,
      selectedDate,
      selectedTime,
      customerInfo,
      totalAmount
    };
    navigation.navigate('Payment', { bookingData });
  };

  const isFormValid = selectedDate && selectedTime && customerInfo.name && customerInfo.phone && customerInfo.address && termsAccepted;

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
        <Text style={styles.headerTitle}>Complete Booking</Text>
        <View style={styles.spacer} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Booking Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Booking Summary</Text>
          <View style={styles.summaryCard}>
            <Text style={styles.serviceName}>Swedish Full Body Massage</Text>
            <Text style={styles.salonName}>{salon.name}</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Duration:</Text>
              <Text style={styles.summaryValue}>90 minutes</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Amount:</Text>
              <Text style={styles.totalAmount}>₹{totalAmount}</Text>
            </View>
          </View>
        </View>

        {/* Date & Time Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Date & Time</Text>
          <View style={styles.dateTimeCard}>
            <Input
              label="Preferred Date"
              placeholder="Select date"
              value={selectedDate}
              onChangeText={setSelectedDate}
            />
            
            <Text style={styles.timeLabel}>Preferred Time</Text>
            <View style={styles.timeSlots}>
              {timeSlots.map((time) => (
                <TouchableOpacity
                  key={time}
                  style={[
                    styles.timeSlot,
                    selectedTime === time && styles.timeSlotSelected
                  ]}
                  onPress={() => setSelectedTime(time)}
                  activeOpacity={0.7}
                >
                  <Text style={[
                    styles.timeSlotText,
                    selectedTime === time && styles.timeSlotTextSelected
                  ]}>
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Customer Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Information</Text>
          <View style={styles.customerCard}>
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              value={customerInfo.name}
              onChangeText={(value) => setCustomerInfo(prev => ({ ...prev, name: value }))}
            />
            <Input
              label="Phone Number"
              placeholder="Enter your phone number"
              value={customerInfo.phone}
              onChangeText={(value) => setCustomerInfo(prev => ({ ...prev, phone: value }))}
              keyboardType="phone-pad"
            />
            <Input
              label="Service Address"
              placeholder="Enter your complete address"
              value={customerInfo.address}
              onChangeText={(value) => setCustomerInfo(prev => ({ ...prev, address: value }))}
            />
          </View>
        </View>

        {/* Terms & Conditions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Terms & Conditions</Text>
          <View style={styles.termsCard}>
            <TouchableOpacity
              style={styles.termsCheckbox}
              onPress={() => setTermsAccepted(!termsAccepted)}
              activeOpacity={0.7}
            >
              <View style={[
                styles.checkbox,
                termsAccepted && styles.checkboxChecked
              ]}>
                {termsAccepted && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.termsText}>
                I agree to OMBARO's Terms & Conditions and understand that the platform
                does not allow any inappropriate activities.
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Book Button */}
        <View style={styles.bookingSection}>
          <Button
            title="Proceed to Payment"
            onPress={handleBooking}
            disabled={!isFormValid}
            size="lg"
            style={styles.bookButton}
          />
          
          {!isFormValid && (
            <View style={styles.warningCard}>
              <Text style={styles.warningText}>
                Please complete all required fields and accept the Terms & Conditions.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing['2xl'],
  },
  sectionTitle: {
    fontSize: typography.lg,
    fontWeight: '600',
    color: colors.gray[900],
    marginBottom: spacing.lg,
  },
  summaryCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    ...shadows.sm,
  },
  serviceName: {
    fontSize: typography.lg,
    fontWeight: '600',
    color: colors.gray[900],
    marginBottom: spacing.xs,
  },
  salonName: {
    fontSize: typography.base,
    color: colors.gray[600],
    marginBottom: spacing.lg,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  summaryLabel: {
    fontSize: typography.sm,
    color: colors.gray[600],
  },
  summaryValue: {
    fontSize: typography.sm,
    fontWeight: '500',
    color: colors.gray[900],
  },
  totalAmount: {
    fontSize: typography.xl,
    fontWeight: 'bold',
    color: colors.primary[600],
  },
  dateTimeCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    ...shadows.sm,
  },
  timeLabel: {
    fontSize: typography.sm,
    fontWeight: '500',
    color: colors.gray[700],
    marginBottom: spacing.sm,
    marginTop: spacing.lg,
  },
  timeSlots: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  timeSlot: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.gray[100],
    minWidth: '30%',
    alignItems: 'center',
  },
  timeSlotSelected: {
    backgroundColor: colors.primary[600],
  },
  timeSlotText: {
    fontSize: typography.sm,
    fontWeight: '500',
    color: colors.gray[700],
  },
  timeSlotTextSelected: {
    color: colors.white,
  },
  customerCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    ...shadows.sm,
  },
  termsCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    ...shadows.sm,
  },
  termsCheckbox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: colors.gray[300],
    borderRadius: borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: colors.primary[600],
    borderColor: colors.primary[600],
  },
  checkmark: {
    fontSize: typography.sm,
    color: colors.white,
    fontWeight: 'bold',
  },
  termsText: {
    fontSize: typography.sm,
    color: colors.gray[700],
    lineHeight: typography.xl,
    flex: 1,
  },
  bookingSection: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing['4xl'],
  },
  bookButton: {
    width: '100%',
    marginBottom: spacing.lg,
  },
  warningCard: {
    backgroundColor: colors.warning[50],
    borderWidth: 1,
    borderColor: colors.warning[200],
    borderRadius: borderRadius.xl,
    padding: spacing.md,
  },
  warningText: {
    fontSize: typography.sm,
    color: colors.warning[800],
    textAlign: 'center',
  },
});

export default BookingScreen;