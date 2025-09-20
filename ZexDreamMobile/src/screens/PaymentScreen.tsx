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
import { RadioGroup } from '../components/ui/RadioGroup';
import { colors, spacing, typography, borderRadius, shadows } from '../constants/theme';

type PaymentScreenNavigationProp = StackNavigationProp<any, 'Payment'>;
type PaymentScreenRouteProp = RouteProp<{ Payment: { bookingData: any } }, 'Payment'>;

interface Props {
  navigation: PaymentScreenNavigationProp;
  route: PaymentScreenRouteProp;
}

const PaymentScreen: React.FC<Props> = ({ navigation, route }) => {
  const { bookingData } = route.params;
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentOptions = [
    {
      value: 'card',
      label: 'Credit/Debit Card',
      icon: <Text style={styles.paymentIcon}>💳</Text>
    },
    {
      value: 'upi',
      label: 'UPI Payment',
      icon: <Text style={styles.paymentIcon}>📱</Text>
    },
    {
      value: 'wallet',
      label: 'Digital Wallet',
      icon: <Text style={styles.paymentIcon}>👛</Text>
    }
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const orderId = `ORD${Date.now()}`;
    const orderData = {
      ...bookingData,
      orderId,
      paymentMethod,
      status: 'confirmed',
      paymentStatus: 'paid'
    };
    
    setIsProcessing(false);
    navigation.navigate('OrderTracking', { orderData });
  };

  const subtotal = bookingData.totalAmount || 2500;
  const serviceCharge = 50;
  const gst = Math.round((subtotal + serviceCharge) * 0.18);
  const finalTotal = subtotal + serviceCharge + gst;

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
        <Text style={styles.headerTitle}>Payment</Text>
        <View style={styles.spacer} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Payment Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Summary</Text>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal:</Text>
              <Text style={styles.summaryValue}>₹{subtotal}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Service Charge:</Text>
              <Text style={styles.summaryValue}>₹{serviceCharge}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>GST (18%):</Text>
              <Text style={styles.summaryValue}>₹{gst}</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total Amount:</Text>
              <Text style={styles.totalAmount}>₹{finalTotal}</Text>
            </View>
          </View>
        </View>

        {/* Payment Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Payment Method</Text>
          <View style={styles.paymentCard}>
            <RadioGroup
              options={paymentOptions}
              value={paymentMethod}
              onChange={setPaymentMethod}
            />
          </View>
        </View>

        {/* Security Note */}
        <View style={styles.section}>
          <View style={styles.securityCard}>
            <View style={styles.securityHeader}>
              <Text style={styles.securityIcon}>🔒</Text>
              <Text style={styles.securityTitle}>Secure Payment</Text>
            </View>
            <Text style={styles.securityText}>
              Your payment information is encrypted and secure. We use industry-standard security measures.
            </Text>
          </View>
        </View>

        {/* Pay Button */}
        <View style={styles.paymentSection}>
          <Button
            title={isProcessing ? 'Processing Payment...' : `Pay ₹${finalTotal}`}
            onPress={handlePayment}
            disabled={!paymentMethod}
            loading={isProcessing}
            size="lg"
            style={styles.payButton}
          />
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
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  summaryLabel: {
    fontSize: typography.base,
    color: colors.gray[600],
  },
  summaryValue: {
    fontSize: typography.base,
    fontWeight: '500',
    color: colors.gray[900],
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
  paymentCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    ...shadows.sm,
  },
  paymentIcon: {
    fontSize: typography.xl,
  },
  securityCard: {
    backgroundColor: colors.success[50],
    borderWidth: 1,
    borderColor: colors.success[200],
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
  },
  securityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  securityIcon: {
    fontSize: typography.xl,
    marginRight: spacing.sm,
  },
  securityTitle: {
    fontSize: typography.base,
    fontWeight: '600',
    color: colors.success[900],
  },
  securityText: {
    fontSize: typography.sm,
    color: colors.success[700],
    lineHeight: typography.xl,
  },
  paymentSection: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing['4xl'],
  },
  payButton: {
    width: '100%',
  },
});

export default PaymentScreen;