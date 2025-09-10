import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, CreditCard, MapPin, User } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { TermsAndConditionsModal } from './TermsAndConditionsModal';
import { CartItem } from '../../types/booking';

interface BookingScreenProps {
  cartItems: CartItem[];
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

export const BookingScreen: React.FC<BookingScreenProps> = ({
  cartItems,
  onBack,
  onNavigate
}) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.service.price * item.quantity), 0);
  const totalDuration = cartItems.reduce((sum, item) => sum + (item.service.duration * item.quantity), 0);

  // Generate available time slots
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'
  ];

  // Get today's date for min date
  const today = new Date().toISOString().split('T')[0];

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };

  const handleBooking = () => {
    const bookingData = {
      cartItems,
      selectedDate,
      selectedTime,
      customerInfo,
      termsAccepted,
      totalAmount,
      totalDuration
    };
    onNavigate('payment', bookingData);
  };

  const isFormValid = selectedDate && selectedTime && customerInfo.name && customerInfo.phone && customerInfo.address && termsAccepted;

  return (
    <div className="min-h-screen bg-gray-50 pt-[120px] pb-[70px]">
      {/* Header with Back Button */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={onBack}
            aria-label="Go back to previous screen"
            className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Complete Booking</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Booking Summary */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h2>
          <div className="space-y-3">
            {cartItems.map((item) => (
              <div key={`${item.service.id}-${item.provider.id}`} className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">{item.service.name}</p>
                  <p className="text-sm text-gray-600">{item.provider.name} • Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold text-purple-600">₹{item.service.price * item.quantity}</p>
              </div>
            ))}
            <div className="border-t border-gray-100 pt-3 mt-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-900">Total Duration:</span>
                <span className="font-medium text-gray-700">{formatDuration(totalDuration)}</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-lg font-bold text-gray-900">Total Amount:</span>
                <span className="text-xl font-bold text-purple-600">₹{totalAmount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Date & Time Selection */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Date & Time</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={today}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedTime === time
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h2>
          
          <div className="space-y-4">
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              value={customerInfo.name}
              onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
              icon={<User className="w-5 h-5 text-gray-400" />}
            />
            
            <Input
              label="Phone Number"
              type="tel"
              placeholder="Enter your phone number"
              value={customerInfo.phone}
              onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
              icon={<Clock className="w-5 h-5 text-gray-400" />}
            />
            
            <Input
              label="Service Address"
              placeholder="Enter your complete address"
              value={customerInfo.address}
              onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
              icon={<MapPin className="w-5 h-5 text-gray-400" />}
            />
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Terms & Conditions</h2>
          
          <div className="space-y-4">
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="terms-checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <label htmlFor="terms-checkbox" className="text-sm text-gray-700 leading-relaxed">
                  I confirm I have read and agree to ZexDream's{' '}
                  <button
                    type="button"
                    onClick={() => setShowTermsModal(true)}
                    className="text-purple-600 hover:text-purple-700 font-medium underline"
                  >
                    Terms & Conditions
                  </button>
                  . I understand that ZexDream does not allow or support any sexual activity or human trafficking, 
                  and any violation may result in legal action.
                </label>
              </div>
            </div>
            
            {!termsAccepted && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
                <p className="text-yellow-800 text-sm">
                  Please accept the Terms & Conditions to proceed with your booking.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Book Button */}
        <div className="space-y-3">
          <Button
            onClick={handleBooking}
            disabled={!isFormValid}
            size="lg"
            className="w-full"
          >
            <CreditCard className="w-5 h-5 mr-2" />
            Proceed to Payment
          </Button>
          
          {!isFormValid && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
              <p className="text-yellow-800 text-sm text-center">
                Please complete all required fields and accept the Terms & Conditions to proceed with your booking.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Terms & Conditions Modal */}
      <TermsAndConditionsModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
      />
    </div>
  );
};