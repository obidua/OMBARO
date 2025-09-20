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

type RescheduleBookingScreenNavigationProp = StackNavigationProp<any, 'RescheduleBooking'>;
type RescheduleBookingScreenRouteProp = RouteProp<{ RescheduleBooking: { booking: any } }, 'RescheduleBooking'>;

interface Props {
  navigation: RescheduleBookingScreenNavigationProp;
  route: RescheduleBookingScreenRouteProp;
}

const RescheduleBookingScreen: React.FC<Props> = ({ navigation, route }) => {
  const { booking } = route.params;
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long',
      year: 'numeric'
    });
  };

  const handleConfirmReschedule = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Reschedule confirmed:', { selectedDate, selectedTime });
    setIsLoading(false);
    navigation.goBack();
  };

  const isFormValid = selectedDate && selectedTime;

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
        <Text style={styles.headerTitle}>Reschedule Booking</Text>
        <View style={styles.spacer} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Current Booking */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Booking</Text>
          <View style={styles.currentBookingCard}>
            <View style={styles.bookingHeader}>
              <View style={styles.bookingImage}>
                <Text style={styles.bookingImageText}>🏢</Text>
              </View>
              <View style={styles.bookingInfo}>
                <Text style={styles.serviceName}>{booking.serviceName}</Text>
                <Text style={styles.salonName}>{booking.salonName}</Text>
                <Text style={styles.salonAddress}>{booking.address}</Text>
              </View>
            </View>

            <View style={styles.currentSchedule}>
              <View style={styles.scheduleHeader}>
                <Text style={styles.scheduleIcon}>📅</Text>
                <Text style={styles.scheduleTitle}>Current Schedule</Text>
              </View>
              <Text style={styles.scheduleDate}>
                {formatDate(booking.date)} at {booking.time}
              </Text>
              <Text style={styles.scheduleDetails}>
                Duration: 90 min • Amount: ₹{booking.price}
              </Text>
            </View>
          </View>
        </View>

        {/* Reschedule Policy */}
        <View style={styles.section}>
          <View style={styles.policyCard}>
            <View style={styles.policyHeader}>
              <Text style={styles.policyIcon}>⚠️</Text>
              <Text style={styles.policyTitle}>Reschedule Policy</Text>
            </View>
            <View style={styles.policyList}>
              <Text style={styles.policyItem}>• Free reschedule up to 24 hours before appointment</Text>
              <Text style={styles.policyItem}>• Reschedule within 24 hours may incur a ₹200 fee</Text>
              <Text style={styles.policyItem}>• Subject to therapist availability</Text>
              <Text style={styles.policyItem}>• Maximum 2 reschedules per booking</Text>
            </View>
          </View>
        </View>

        {/* New Date & Time Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select New Date & Time</Text>
          <View style={styles.selectionCard}>
            <Input
              label="New Date"
              placeholder="Select new date"
              value={selectedDate}
              onChangeText={setSelectedDate}
            />
            
            <Text style={styles.timeLabel}>New Time</Text>
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

        {/* New Schedule Preview */}
        {selectedDate && selectedTime && (
          <View style={styles.section}>
            <View style={styles.newScheduleCard}>
              <View style={styles.newScheduleHeader}>
                <Text style={styles.newScheduleIcon}>✅</Text>
                <Text style={styles.newScheduleTitle}>New Schedule</Text>
              </View>
              <Text style={styles.newScheduleDate}>
                {formatDate(selectedDate)} at {selectedTime}
              </Text>
              <Text style={styles.newScheduleNote}>
                Please confirm this new schedule for your appointment
              </Text>
            </View>
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          <Button
            title="✅ Confirm Reschedule"
            onPress={handleConfirmReschedule}
            disabled={!isFormValid}
            loading={isLoading}
            size="lg"
            style={styles.confirmButton}
          />
          
          <Button
            title="← Cancel & Go Back"
            onPress={() => navigation.goBack()}
            variant="outline"
            size="lg"
            style={styles.cancelButton}
          />
          
          {!isFormValid && (
            <View style={styles.warningCard}>
              <Text style={styles.warningText}>
                Please select both a new date and time to proceed with rescheduling.
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
  currentBookingCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    ...shadows.sm,
  },
  bookingHeader: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
  },
  bookingImage: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.lg,
  },
  bookingImageText: {
    fontSize: 32,
  },
  bookingInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: typography.base,
    fontWeight: '600',
    color: colors.gray[900],
    marginBottom: spacing.xs,
  },
  salonName: {
    fontSize: typography.sm,
    color: colors.gray[600],
    marginBottom: spacing.xs,
  },
  salonAddress: {
    fontSize: typography.sm,
    color: colors.gray[500],
  },
  currentSchedule: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
  },
  scheduleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  scheduleIcon: {
    fontSize: typography.base,
    marginRight: spacing.sm,
  },
  scheduleTitle: {
    fontSize: typography.base,
    fontWeight: '500',
    color: '#1E40AF',
  },
  scheduleDate: {
    fontSize: typography.base,
    fontWeight: 'bold',
    color: '#1E40AF',
    marginBottom: spacing.xs,
  },
  scheduleDetails: {
    fontSize: typography.sm,
    color: '#1D4ED8',
  },
  policyCard: {
    backgroundColor: colors.warning[50],
    borderWidth: 1,
    borderColor: colors.warning[200],
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
  },
  policyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  policyIcon: {
    fontSize: typography.xl,
    marginRight: spacing.sm,
  },
  policyTitle: {
    fontSize: typography.base,
    fontWeight: '600',
    color: colors.warning[900],
  },
  policyList: {
    gap: spacing.sm,
  },
  policyItem: {
    fontSize: typography.sm,
    color: colors.warning[800],
    lineHeight: typography.xl,
  },
  selectionCard: {
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
  newScheduleCard: {
    backgroundColor: colors.success[50],
    borderWidth: 1,
    borderColor: colors.success[200],
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
  },
  newScheduleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  newScheduleIcon: {
    fontSize: typography.base,
    marginRight: spacing.sm,
  },
  newScheduleTitle: {
    fontSize: typography.base,
    fontWeight: '500',
    color: colors.success[900],
  },
  newScheduleDate: {
    fontSize: typography.base,
    fontWeight: 'bold',
    color: colors.success[800],
    marginBottom: spacing.xs,
  },
  newScheduleNote: {
    fontSize: typography.sm,
    color: colors.success[700],
  },
  actionSection: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing['4xl'],
    gap: spacing.md,
  },
  confirmButton: {
    width: '100%',
  },
  cancelButton: {
    width: '100%',
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

export default RescheduleBookingScreen;