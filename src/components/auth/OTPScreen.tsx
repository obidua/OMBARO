import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, MessageSquare, RotateCcw } from 'lucide-react';
import { Button } from '../ui/Button';

interface OTPScreenProps {
  onBack: () => void;
  onVerifyOTP: (otp: string) => void;
  onResendOTP: () => void;
  mobile: string;
  isLoading: boolean;
  error: string | null;
}

export const OTPScreen: React.FC<OTPScreenProps> = ({
  onBack,
  onVerifyOTP,
  onResendOTP,
  mobile,
  isLoading,
  error
}) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify when all fields are filled
    if (newOtp.every(digit => digit !== '') && newOtp.join('').length === 4) {
      onVerifyOTP(newOtp.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    setTimer(30);
    setCanResend(false);
    setOtp(['', '', '', '']);
    onResendOTP();
  };

  const maskedMobile = mobile.replace(/(\d{2})(\d{4})(\d{4})/, '$1****$3');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <button
          onClick={onBack}
          aria-label="Go back to mobile input screen"
          className="w-10 h-10 rounded-xl bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <div className="text-center">
          <h1 className="text-lg font-semibold text-gray-900">Verify OTP</h1>
        </div>
        <div className="w-10" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-6">
        <div className="max-w-md mx-auto w-full">
          {/* Icon */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Enter Verification Code
            </h2>
            <p className="text-gray-600">
              We've sent a 4-digit code to <span className="font-semibold">+91 {maskedMobile}</span>
            </p>
          </div>

          {/* OTP Input */}
          <div className="space-y-6">
            <div className="flex justify-center space-x-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={el => inputRefs.current[index] = el}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleOtpChange(index, e.target.value.replace(/\D/g, ''))}
                  onKeyDown={e => handleKeyDown(index, e)}
                  className={`
                    w-14 h-14 text-center text-2xl font-bold border-2 rounded-xl transition-all duration-200
                    ${digit ? 'border-purple-500 bg-purple-50' : 'border-gray-300'}
                    ${error ? 'border-red-500' : ''}
                    focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none
                  `}
                />
              ))}
            </div>

            {error && (
              <p className="text-center text-sm text-red-600">{error}</p>
            )}

            {/* Resend Timer */}
            <div className="text-center">
              {canResend ? (
                <button
                  onClick={handleResend}
                  className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Resend OTP</span>
                </button>
              ) : (
                <p className="text-gray-500">
                  Resend OTP in <span className="font-semibold text-purple-600">{timer}s</span>
                </p>
              )}
            </div>

            <Button
              onClick={() => onVerifyOTP(otp.join(''))}
              loading={isLoading}
              disabled={otp.some(digit => !digit)}
              size="lg"
              className="w-full"
            >
              Verify & Continue
            </Button>
          </div>

          {/* Help Text */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Didn't receive the code? Check your SMS or try resending
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};