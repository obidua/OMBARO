import React, { useState } from 'react';
import { ArrowLeft, Phone, Shield, Gift } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface MobileInputScreenProps {
  onBack: () => void;
  onSendOTP: (mobile: string) => void;
  isLoading: boolean;
  error: string | null;
}

export const MobileInputScreen: React.FC<MobileInputScreenProps> = ({
  onBack,
  onSendOTP,
  isLoading,
  error
}) => {
  const [mobile, setMobile] = useState('');
  const [mobileError, setMobileError] = useState('');

  const validateMobile = (value: string) => {
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!value) {
      return 'Mobile number is required';
    }
    if (!mobileRegex.test(value)) {
      return 'Please enter a valid 10-digit mobile number';
    }
    return '';
  };

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setMobile(value);
    if (mobileError) {
      setMobileError('');
    }
  };

  const handleSendOTP = () => {
    const error = validateMobile(mobile);
    if (error) {
      setMobileError(error);
      return;
    }
    onSendOTP(mobile);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendOTP();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <button
          onClick={onBack}
          aria-label="Go back to welcome screen"
          className="w-10 h-10 rounded-xl bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <div className="text-center">
          <h1 className="text-lg font-semibold text-gray-900">Phone Verification</h1>
        </div>
        <div className="w-10" /> {/* Spacer */}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-6">
        <div className="max-w-md mx-auto w-full">
          {/* Icon */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Enter Your Mobile Number
            </h2>
            <p className="text-gray-600">
              We'll send you a verification code to confirm your number
            </p>
          </div>

          {/* Mobile Input */}
          <div className="space-y-6">
            {/* Referral Code Input */}
            <div>
              <Input
                type="text"
                placeholder="Enter referral code (optional)"
                icon={<Gift className="w-5 h-5 text-gray-400" />}
                className="text-center tracking-wider"
              />
              <p className="text-xs text-center text-purple-600 mt-2">
                Have a referral code? Get 10% off your first booking!
              </p>
            </div>

            <div>
              <Input
                type="tel"
                placeholder="Enter 10-digit mobile number"
                value={mobile}
                onChange={handleMobileChange}
                onKeyPress={handleKeyPress}
                error={mobileError || error || undefined}
                icon={<Phone className="w-5 h-5 text-gray-400" />}
                className="text-lg text-center tracking-wider"
                maxLength={10}
              />
            </div>

            <Button
              onClick={handleSendOTP}
              loading={isLoading}
              disabled={!mobile || mobile.length !== 10}
              size="lg"
              className="w-full"
            >
              Send OTP
            </Button>
          </div>

          {/* Security Note */}
          <div className="mt-8 p-4 bg-white/60 backdrop-blur-sm rounded-2xl">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Shield className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 mb-1">
                  Your Privacy is Protected
                </p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  We use your mobile number only for account verification and booking confirmations. 
                  Your data is encrypted and never shared with third parties.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};