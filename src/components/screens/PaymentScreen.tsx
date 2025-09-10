import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Smartphone, Wallet, CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { RadioGroup } from '../ui/RadioGroup';

interface PaymentScreenProps {
  bookingData: any;
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

export const PaymentScreen: React.FC<PaymentScreenProps> = ({
  bookingData,
  onBack,
  onNavigate
}) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentOptions = [
    {
      value: 'card',
      label: 'Credit/Debit Card',
      icon: <CreditCard className="w-5 h-5 text-blue-600" />
    },
    {
      value: 'upi',
      label: 'UPI Payment',
      icon: <Smartphone className="w-5 h-5 text-green-600" />
    },
    {
      value: 'wallet',
      label: 'Digital Wallet',
      icon: <Wallet className="w-5 h-5 text-purple-600" />
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
    onNavigate('orderTracking', orderData);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-[70px] pb-[70px]">
      {/* Header with Back Button */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={onBack}
            aria-label="Go back to booking screen"
            className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Payment</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Payment Summary */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Summary</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium">₹{bookingData.totalAmount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Service Charge:</span>
              <span className="font-medium">₹50</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">GST (18%):</span>
              <span className="font-medium">₹{Math.round((bookingData.totalAmount + 50) * 0.18)}</span>
            </div>
            <div className="border-t border-gray-100 pt-3">
              <div className="flex justify-between">
                <span className="text-lg font-bold text-gray-900">Total Amount:</span>
                <span className="text-xl font-bold text-purple-600">
                  ₹{Math.round((bookingData.totalAmount + 50) * 1.18)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Payment Method</h2>
          
          <RadioGroup
            options={paymentOptions}
            value={paymentMethod}
            onChange={setPaymentMethod}
          />
        </div>

        {/* Security Note */}
        <div className="bg-green-50 rounded-2xl p-4 border border-green-200">
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-green-900 mb-1">Secure Payment</h3>
              <p className="text-sm text-green-700">
                Your payment information is encrypted and secure. We use industry-standard security measures.
              </p>
            </div>
          </div>
        </div>

        {/* Pay Button */}
        <Button
          onClick={handlePayment}
          disabled={!paymentMethod}
          loading={isProcessing}
          size="lg"
          className="w-full"
        >
          {isProcessing ? 'Processing Payment...' : `Pay ₹${Math.round((bookingData.totalAmount + 50) * 1.18)}`}
        </Button>
      </div>
    </div>
  );
};