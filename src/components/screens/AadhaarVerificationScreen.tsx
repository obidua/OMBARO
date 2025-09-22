import React, { useState } from 'react';
import { ArrowLeft, Shield, AlertTriangle, CheckCircle, RotateCcw } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface AadhaarVerificationScreenProps {
  onBack: () => void;
  onVerificationComplete: () => void;
  onSkip?: () => void;
}

export const AadhaarVerificationScreen: React.FC<AadhaarVerificationScreenProps> = ({
  onBack,
  onVerificationComplete,
  onSkip
}) => {
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [step, setStep] = useState<'aadhaar' | 'otp'>('aadhaar');
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    if (step === 'otp' && timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setCanResend(true);
    }
  }, [step, timer]);

  const validateAadhaar = (number: string) => {
    // Basic Aadhaar validation (12 digits)
    const aadhaarRegex = /^\d{12}$/;
    return aadhaarRegex.test(number);
  };

  const handleAadhaarSubmit = async () => {
    if (!validateAadhaar(aadhaarNumber)) {
      setError('Please enter a valid 12-digit Aadhaar number');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Simulate Aadhaar OTP API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Aadhaar OTP sent to registered mobile number');
      setStep('otp');
      setTimer(30);
      setCanResend(false);
    } catch (error) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }

    // Auto-verify when all fields are filled
    if (newOtp.every(digit => digit !== '') && newOtp.join('').length === 6) {
      handleOtpVerify(newOtp.join(''));
    }
  };

  const handleOtpVerify = async (otpCode: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (otpCode === '123456') { // Mock verification
        onVerificationComplete();
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (error) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setTimer(30);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('OTP resent');
    } catch (error) {
      setError('Failed to resend OTP');
    }
  };

  const maskedAadhaar = aadhaarNumber.replace(/(\d{4})(\d{4})(\d{4})/, 'XXXX XXXX $3');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <button
          onClick={onBack}
          aria-label="Go back to previous screen"
          className="w-10 h-10 rounded-xl bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <div className="text-center">
          <h1 className="text-lg font-semibold text-gray-900">Aadhaar Verification</h1>
        </div>
        <div className="w-10" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-6">
        <div className="max-w-md mx-auto w-full">
          {/* Icon */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {step === 'aadhaar' ? 'Verify Your Identity' : 'Enter Verification Code'}
            </h2>
            <p className="text-gray-600">
              {step === 'aadhaar' 
                ? 'Enter your Aadhaar number to verify your identity for secure bookings'
                : `We've sent a 6-digit code to your Aadhaar registered mobile number ending with ${maskedAadhaar.slice(-4)}`
              }
            </p>
          </div>

          {step === 'aadhaar' ? (
            /* Aadhaar Input */
            <div className="space-y-6">
              <Input
                label="Aadhaar Number"
                type="text"
                placeholder="Enter 12-digit Aadhaar number"
                value={aadhaarNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 12);
                  setAadhaarNumber(value);
                  if (error) setError(null);
                }}
                error={error || undefined}
                icon={<Shield className="w-5 h-5 text-gray-400" />}
                className="text-center tracking-wider"
                maxLength={12}
              />

              <Button
                onClick={handleAadhaarSubmit}
                loading={isLoading}
                disabled={!validateAadhaar(aadhaarNumber)}
                size="lg"
                className="w-full"
              >
                Send OTP
              </Button>

              {onSkip && (
                <Button
                  onClick={onSkip}
                  variant="outline"
                  size="lg"
                  className="w-full"
                >
                  Skip for Now
                </Button>
              )}
            </div>
          ) : (
            /* OTP Input */
            <div className="space-y-6">
              <div className="flex justify-center space-x-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleOtpChange(index, e.target.value.replace(/\D/g, ''))}
                    onKeyDown={e => {
                      if (e.key === 'Backspace' && !otp[index] && index > 0) {
                        const prevInput = document.getElementById(`otp-${index - 1}`);
                        prevInput?.focus();
                      }
                    }}
                    className={`
                      w-12 h-12 text-center text-xl font-bold border-2 rounded-xl transition-all duration-200
                      ${digit ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
                      ${error ? 'border-red-500' : ''}
                      focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none
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
                    onClick={handleResendOtp}
                    className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Resend OTP</span>
                  </button>
                ) : (
                  <p className="text-gray-500">
                    Resend OTP in <span className="font-semibold text-blue-600">{timer}s</span>
                  </p>
                )}
              </div>

              <Button
                onClick={() => handleOtpVerify(otp.join(''))}
                loading={isLoading}
                disabled={otp.some(digit => !digit)}
                size="lg"
                className="w-full"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Verify & Continue
              </Button>
            </div>
          )}

          {/* Security Note */}
          <div className="mt-8 p-4 bg-white/60 backdrop-blur-sm rounded-2xl">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Shield className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 mb-1">
                  Your Data is Secure
                </p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  We use Aadhaar verification only for identity confirmation and compliance with regulations. 
                  Your Aadhaar data is encrypted and never stored on our servers.
                </p>
              </div>
            </div>
          </div>

          {/* Demo Note */}
          <div className="mt-4 p-3 bg-yellow-50 rounded-xl border border-yellow-200">
            <p className="text-yellow-800 text-sm text-center">
              <strong>Demo Mode:</strong> Use any 12-digit number and OTP: 123456
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};