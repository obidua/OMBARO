import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, CreditCard, MapPin, User, Shield, CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { TermsAndConditionsModal } from './TermsAndConditionsModal';
import { CartItem } from '../../types/booking';
import { ServiceTypeSelector, ServiceType } from '../booking/ServiceTypeSelector';

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
  const [serviceType, setServiceType] = useState<ServiceType | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [aadhaarVerified, setAadhaarVerified] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showAadhaarVerification, setShowAadhaarVerification] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: ''
  });
  const [homeAddress, setHomeAddress] = useState({
    street: '',
    area: '',
    landmark: '',
    city: '',
    pincode: ''
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
    if (!aadhaarVerified) {
      setShowAadhaarVerification(true);
      return;
    }
    
    const bookingData = {
      cartItems,
      serviceType,
      selectedDate,
      selectedTime,
      customerInfo,
      homeAddress: serviceType === 'at_home' ? homeAddress : null,
      spaAddress: serviceType === 'visit_spa' ? cartItems[0]?.provider?.address : null,
      termsAccepted,
      totalAmount,
      totalDuration
    };
    onNavigate('payment', bookingData);
  };

  const isAddressValid = serviceType === 'at_home'
    ? homeAddress.street && homeAddress.area && homeAddress.city && homeAddress.pincode
    : true;
  const isFormValid = serviceType && selectedDate && selectedTime && customerInfo.name && customerInfo.phone && isAddressValid && termsAccepted;
  const isReadyForPayment = isFormValid && aadhaarVerified;

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
        {/* Service Type Selection */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <ServiceTypeSelector
            selectedType={serviceType}
            onSelect={setServiceType}
            vendorName={cartItems[0]?.provider?.name || 'this location'}
          />
        </div>

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
            
            {serviceType === 'at_home' && (
              <>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-4">
                  <p className="text-sm text-blue-800 font-medium">Service Location: Your Home</p>
                  <p className="text-xs text-blue-700 mt-1">Professional will visit your address</p>
                </div>

                <Input
                  label="Street Address"
                  placeholder="House/Flat No, Street Name"
                  value={homeAddress.street}
                  onChange={(e) => setHomeAddress(prev => ({ ...prev, street: e.target.value }))}
                  icon={<MapPin className="w-5 h-5 text-gray-400" />}
                />

                <Input
                  label="Area/Locality"
                  placeholder="Area or Locality name"
                  value={homeAddress.area}
                  onChange={(e) => setHomeAddress(prev => ({ ...prev, area: e.target.value }))}
                  icon={<MapPin className="w-5 h-5 text-gray-400" />}
                />

                <Input
                  label="Landmark (Optional)"
                  placeholder="Nearby landmark"
                  value={homeAddress.landmark}
                  onChange={(e) => setHomeAddress(prev => ({ ...prev, landmark: e.target.value }))}
                  icon={<MapPin className="w-5 h-5 text-gray-400" />}
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="City"
                    placeholder="City name"
                    value={homeAddress.city}
                    onChange={(e) => setHomeAddress(prev => ({ ...prev, city: e.target.value }))}
                    icon={<MapPin className="w-5 h-5 text-gray-400" />}
                  />

                  <Input
                    label="Pincode"
                    placeholder="6-digit pincode"
                    value={homeAddress.pincode}
                    onChange={(e) => setHomeAddress(prev => ({ ...prev, pincode: e.target.value }))}
                    icon={<MapPin className="w-5 h-5 text-gray-400" />}
                  />
                </div>
              </>
            )}

            {serviceType === 'visit_spa' && (
              <div className="bg-pink-50 border border-pink-200 rounded-xl p-4">
                <p className="text-sm text-pink-800 font-medium mb-2">Service Location: Spa/Salon Visit</p>
                <div className="flex items-start space-x-2">
                  <MapPin className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-pink-900">{cartItems[0]?.provider?.name || 'Spa/Salon'}</p>
                    <p className="text-sm text-pink-700 mt-1">{cartItems[0]?.provider?.address || 'Address will be provided'}</p>
                    <p className="text-xs text-pink-600 mt-2">Please arrive 10 minutes before your appointment time</p>
                  </div>
                </div>
              </div>
            )}
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
                  I confirm I have read and agree to OMBARO's{' '}
                  <button
                    type="button"
                    onClick={() => setShowTermsModal(true)}
                    className="text-purple-600 hover:text-purple-700 font-medium underline"
                  >
                    Terms & Conditions
                  </button>
                  . I understand that OMBARO does not allow or support any sexual activity or human trafficking, 
                  and any violation may result in legal action.
                </label>
              </div>
            </div>
            
            {/* Aadhaar Verification Status */}
            <div className={`border-2 rounded-xl p-4 ${
              aadhaarVerified 
                ? 'border-green-200 bg-green-50' 
                : 'border-blue-200 bg-blue-50'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    aadhaarVerified ? 'bg-green-100' : 'bg-blue-100'
                  }`}>
                    {aadhaarVerified ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <Shield className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <p className={`font-medium ${
                      aadhaarVerified ? 'text-green-900' : 'text-blue-900'
                    }`}>
                      {aadhaarVerified ? 'Identity Verified' : 'Identity Verification Required'}
                    </p>
                    <p className={`text-sm ${
                      aadhaarVerified ? 'text-green-700' : 'text-blue-700'
                    }`}>
                      {aadhaarVerified 
                        ? 'Your identity has been verified with Aadhaar'
                        : 'Verify your identity with Aadhaar OTP for secure booking'
                      }
                    </p>
                  </div>
                </div>
                {!aadhaarVerified && (
                  <Button
                    onClick={() => setShowAadhaarVerification(true)}
                    size="sm"
                    variant="outline"
                  >
                    Verify Now
                  </Button>
                )}
              </div>
            </div>
            
            {(!termsAccepted || !aadhaarVerified) && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
                <p className="text-yellow-800 text-sm">
                  Please accept the Terms & Conditions and complete Aadhaar verification to proceed with your booking.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Book Button */}
        <div className="space-y-3">
          <Button
            onClick={handleBooking}
            disabled={!isReadyForPayment}
            size="lg"
            className="w-full"
          >
            <CreditCard className="w-5 h-5 mr-2" />
            Proceed to Payment
          </Button>
          
          {!isReadyForPayment && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
              <p className="text-yellow-800 text-sm text-center">
                Please complete all required fields, accept the Terms & Conditions, and verify your identity with Aadhaar to proceed with your booking.
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

      {/* Aadhaar Verification Modal */}
      {showAadhaarVerification && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Identity Verification</h3>
                <p className="text-gray-600">
                  For your security and compliance, we need to verify your identity using Aadhaar OTP
                </p>
              </div>

              <div className="space-y-4">
                <Button
                  onClick={() => {
                    setShowAadhaarVerification(false);
                    // In a real implementation, this would navigate to AadhaarVerificationScreen
                    // For demo purposes, we'll simulate verification
                    setTimeout(() => {
                      setAadhaarVerified(true);
                      alert('Aadhaar verification completed successfully!');
                    }, 1000);
                  }}
                  size="lg"
                  className="w-full"
                >
                  <Shield className="w-5 h-5 mr-2" />
                  Verify with Aadhaar
                </Button>
                
                <Button
                  onClick={() => setShowAadhaarVerification(false)}
                  variant="outline"
                  size="lg"
                  className="w-full"
                >
                  Cancel
                </Button>
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-200">
                <p className="text-blue-800 text-sm text-center">
                  <strong>Demo Mode:</strong> Verification will be simulated for testing
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};