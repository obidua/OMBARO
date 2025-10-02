import React, { useState, useEffect } from 'react';
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
import { colors, spacing, typography, borderRadius, shadows } from '../constants/theme';

type OrderTrackingScreenNavigationProp = StackNavigationProp<any, 'OrderTracking'>;
type OrderTrackingScreenRouteProp = RouteProp<{ OrderTracking: { orderData: any } }, 'OrderTracking'>;

interface Props {
  navigation: OrderTrackingScreenNavigationProp;
  route: OrderTrackingScreenRouteProp;
}

const OrderTrackingScreen: React.FC<Props> = ({ navigation, route }) => {
  const { orderData } = route.params;
  const [orderStatus, setOrderStatus] = useState<'confirmed' | 'therapist-assigned' | 'en-route' | 'arrived' | 'in-progress' | 'completed'>('confirmed');
  const [estimatedArrival, setEstimatedArrival] = useState('25 mins');

  const therapistInfo = {
    name: 'Priya Sharma',
    photo: '👩‍⚕️',
    phone: '+91 98765 43210',
    rating: 4.9,
    experience: '5 years'
  };

  useEffect(() => {
    const statusUpdates = [
      { status: 'therapist-assigned', delay: 2000 },
      { status: 'en-route', delay: 5000 },
      { status: 'arrived', delay: 15000 }
    ];

    statusUpdates.forEach(({ status, delay }) => {
      setTimeout(() => {
        setOrderStatus(status as any);
        if (status === 'en-route') {
          setEstimatedArrival('15 mins');
        } else if (status === 'arrived') {
          setEstimatedArrival('Arrived');
        }
      }, delay);
    });
  }, []);

  const getStatusInfo = () => {
    switch (orderStatus) {
      case 'confirmed':
        return {
          title: 'Booking Confirmed',
          description: 'We are assigning a therapist for your appointment',
          icon: '✅',
          color: colors.primary[600]
        };
      case 'therapist-assigned':
        return {
          title: 'Therapist Assigned',
          description: 'Your therapist is preparing to come to your location',
          icon: '👩‍⚕️',
          color: colors.purple[600]
        };
      case 'en-route':
        return {
          title: 'On the Way',
          description: 'Your therapist is traveling to your location',
          icon: '🚗',
          color: colors.warning[600]
        };
      case 'arrived':
        return {
          title: 'Therapist Arrived',
          description: 'Your therapist has reached your location',
          icon: '📍',
          color: colors.success[600]
        };
      case 'in-progress':
        return {
          title: 'Service in Progress',
          description: 'Your spa session is currently ongoing',
          icon: '💆‍♀️',
          color: colors.primary[600]
        };
      case 'completed':
        return {
          title: 'Service Completed',
          description: 'Thank you for choosing our service!',
          icon: '🎉',
          color: colors.success[600]
        };
      default:
        return {
          title: 'Processing',
          description: 'Please wait...',
          icon: '⏳',
          color: colors.gray[600]
        };
    }
  };

  const statusInfo = getStatusInfo();

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
        <Text style={styles.headerTitle}>Order Tracking</Text>
        <View style={styles.spacer} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Order Status */}
        <View style={styles.section}>
          <View style={styles.statusCard}>
            <View style={styles.statusHeader}>
              <View style={[styles.statusIcon, { backgroundColor: `${statusInfo.color}20` }]}>
                <Text style={styles.statusIconText}>{statusInfo.icon}</Text>
              </View>
              <View style={styles.statusInfo}>
                <Text style={styles.statusTitle}>{statusInfo.title}</Text>
                <Text style={styles.statusDescription}>{statusInfo.description}</Text>
              </View>
            </View>
            
            <View style={styles.estimatedArrival}>
              <Text style={styles.arrivalLabel}>Estimated arrival:</Text>
              <Text style={styles.arrivalTime}>{estimatedArrival}</Text>
            </View>
          </View>
        </View>

        {/* Therapist Info */}
        {orderStatus !== 'confirmed' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Therapist</Text>
            <View style={styles.therapistCard}>
              <View style={styles.therapistHeader}>
                <View style={styles.therapistAvatar}>
                  <Text style={styles.therapistAvatarText}>{therapistInfo.photo}</Text>
                </View>
                <View style={styles.therapistInfo}>
                  <Text style={styles.therapistName}>{therapistInfo.name}</Text>
                  <Text style={styles.therapistExperience}>{therapistInfo.experience} experience</Text>
                  <Text style={styles.therapistRating}>⭐ {therapistInfo.rating} • Certified Professional</Text>
                </View>
              </View>

              <View style={styles.therapistActions}>
                <Button
                  title="📞 Call"
                  onPress={() => console.log('Call therapist')}
                  variant="outline"
                  style={styles.therapistActionButton}
                />
                <Button
                  title="💬 Message"
                  onPress={() => navigation.navigate('Chat', { therapistInfo })}
                  variant="outline"
                  style={styles.therapistActionButton}
                />
              </View>
            </View>
          </View>
        )}

        {/* Order Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Details</Text>
          <View style={styles.orderCard}>
            <View style={styles.orderRow}>
              <Text style={styles.orderLabel}>Order ID:</Text>
              <Text style={styles.orderValue}>{orderData.orderId}</Text>
            </View>
            <View style={styles.orderRow}>
              <Text style={styles.orderLabel}>Date & Time:</Text>
              <Text style={styles.orderValue}>{orderData.selectedDate} at {orderData.selectedTime}</Text>
            </View>
            <View style={styles.orderRow}>
              <Text style={styles.orderLabel}>Service Address:</Text>
              <Text style={styles.orderValue}>{orderData.customerInfo?.address}</Text>
            </View>
            <View style={[styles.orderRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total Paid:</Text>
              <Text style={styles.totalAmount}>₹{Math.round((orderData.totalAmount + 50) * 1.18)}</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          {orderStatus === 'completed' ? (
            <>
              <Button
                title="Book Another Service"
                onPress={() => navigation.navigate('Home')}
                size="lg"
                style={styles.actionButton}
              />
              <Button
                title="Rate Your Experience"
                onPress={() => console.log('Rate experience')}
                variant="outline"
                size="lg"
                style={styles.actionButton}
              />
            </>
          ) : (
            <Button
              title="Need Help?"
              onPress={() => console.log('Support')}
              variant="outline"
              size="lg"
              style={styles.actionButton}
            />
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
  statusCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    ...shadows.sm,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  statusIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  statusIconText: {
    fontSize: typography['2xl'],
  },
  statusInfo: {
    flex: 1,
  },
  statusTitle: {
    fontSize: typography.lg,
    fontWeight: '600',
    color: colors.gray[900],
    marginBottom: spacing.xs,
  },
  statusDescription: {
    fontSize: typography.base,
    color: colors.gray[600],
  },
  estimatedArrival: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrivalLabel: {
    fontSize: typography.sm,
    color: colors.gray[600],
  },
  arrivalTime: {
    fontSize: typography.base,
    fontWeight: '600',
    color: colors.primary[600],
  },
  therapistCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    ...shadows.sm,
  },
  therapistHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  therapistAvatar: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.lg,
  },
  therapistAvatarText: {
    fontSize: typography['3xl'],
  },
  therapistInfo: {
    flex: 1,
  },
  therapistName: {
    fontSize: typography.lg,
    fontWeight: '600',
    color: colors.gray[900],
    marginBottom: spacing.xs,
  },
  therapistExperience: {
    fontSize: typography.sm,
    color: colors.gray[600],
    marginBottom: spacing.xs,
  },
  therapistRating: {
    fontSize: typography.sm,
    color: colors.gray[500],
  },
  therapistActions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  therapistActionButton: {
    flex: 1,
  },
  orderCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    ...shadows.sm,
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  orderLabel: {
    fontSize: typography.base,
    color: colors.gray[600],
  },
  orderValue: {
    fontSize: typography.base,
    fontWeight: '500',
    color: colors.gray[900],
    flex: 1,
    textAlign: 'right',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: colors.gray[100],
    paddingTop: spacing.md,
    marginBottom: 0,
  },
  totalLabel: {
    fontSize: typography.lg,
    fontWeight: 'bold',
    color: colors.gray[900],
  },
  totalAmount: {
    fontSize: typography.xl,
    fontWeight: 'bold',
    color: colors.primary[600],
  },
  actionSection: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing['4xl'],
    gap: spacing.md,
  },
  actionButton: {
    width: '100%',
  },
});

export default OrderTrackingScreen;