import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Phone, Shield, Loader, CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { supabase } from '../../lib/supabase';

interface VendorMobileVerificationScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  selectedCategory?: string;
  signupType?: string;
  provider?: string;
}

export default function VendorMobileVerificationScreen({
  onNavigate,
  selectedCategory,
  signupType,
  provider
}: VendorMobileVerificationScreenProps) {
  const [step, setStep] = useState<'mobile' | 'otp'>('mobile');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(0);

  const otpInputs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ];

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  function validateMobile() {
    if (!mobile.trim()) {
      setError('Mobile number is required');
      return false;
    }
    if (!/^[0-9]{10}$/.test(mobile)) {
      setError('Please enter a valid 10-digit mobile number');
      return false;
    }
    return true;
  }

  async function handleSendOTP() {
    if (!validateMobile()) return;

    setLoading(true);
    setError('');

    try {
      const { data: user } = await supabase.auth.getUser();

      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + 10);

      const { error: otpError } = await supabase
        .from('otp_verifications')
        .insert({
          mobile: mobile,
          otp_code: '1234',
          expires_at: expiresAt.toISOString()
        });

      if (otpError) throw otpError;

      setStep('otp');
      setResendTimer(60);
      setTimeout(() => otpInputs[0].current?.focus(), 100);

    } catch (err: any) {
      console.error('Error sending OTP:', err);
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function handleOtpChange(index: number, value: string) {
    if (value.length > 1) {
      value = value[value.length - 1];
    }

    if (!/^[0-9]*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      otpInputs[index + 1].current?.focus();
    }

    if (newOtp.every(digit => digit !== '')) {
      handleVerifyOTP(newOtp.join(''));
    }
  }

  function handleOtpKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputs[index - 1].current?.focus();
    }
  }

  async function handleVerifyOTP(otpCode: string) {
    setLoading(true);
    setError('');

    try {
      if (otpCode !== '1234') {
        setError('Invalid OTP. Please try again.');
        setOtp(['', '', '', '']);
        otpInputs[0].current?.focus();
        setLoading(false);
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('No authenticated user found');
      }

      const { error: updateError } = await supabase
        .from('user_profiles')
        .update({
          mobile: mobile,
          mobile_verified: true,
          signup_method: 'quick',
          social_provider: provider,
          role: 'vendor',
          profile_completed: false
        })
        .eq('id', user.id);

      if (updateError) throw updateError;

      const { error: quickSignupError } = await supabase
        .from('quick_signup_profiles')
        .insert({
          user_id: user.id,
          vendor_category: selectedCategory,
          partner_type: 'INDEPENDENT',
          mobile: mobile,
          mobile_verified: true
        });

      if (quickSignupError) throw quickSignupError;

      onNavigate('vendorQuickSignupSuccess', {
        selectedCategory,
        mobile,
        userName: user.user_metadata?.full_name || user.email
      });

    } catch (err: any) {
      console.error('Error verifying OTP:', err);
      setError(err.message || 'Failed to verify OTP. Please try again.');
      setOtp(['', '', '', '']);
      otpInputs[0].current?.focus();
    } finally {
      setLoading(false);
    }
  }

  async function handleResendOTP() {
    if (resendTimer > 0) return;

    setError('');
    setResendTimer(60);
    setOtp(['', '', '', '']);

    try {
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + 10);

      await supabase
        .from('otp_verifications')
        .insert({
          mobile: mobile,
          otp_code: '1234',
          expires_at: expiresAt.toISOString()
        });

      otpInputs[0].current?.focus();
    } catch (err) {
      console.error('Error resending OTP:', err);
      setError('Failed to resend OTP. Please try again.');
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => step === 'mobile'
                ? onNavigate('vendorQuickSignup', { selectedCategory })
                : setStep('mobile')
              }
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              disabled={loading}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <h1 className="text-xl font-bold text-gray-900">Mobile Verification</h1>
            <div className="w-20" />
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {step === 'mobile' ? (
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Add Mobile Number</h2>
                <p className="text-gray-600">
                  We'll send you a verification code to confirm your number
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <div className="mb-6">
                <Input
                  label="Mobile Number"
                  type="tel"
                  value={mobile}
                  onChange={(e) => {
                    setMobile(e.target.value);
                    setError('');
                  }}
                  placeholder="Enter 10-digit mobile number"
                  maxLength={10}
                  icon={<Phone className="w-5 h-5" />}
                  disabled={loading}
                />
              </div>

              <Button
                onClick={handleSendOTP}
                disabled={loading}
                fullWidth
                size="lg"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Sending OTP...</span>
                  </>
                ) : (
                  'Send OTP'
                )}
              </Button>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-800">
                  <strong>Test Mode:</strong> For testing purposes, the OTP code is <strong>1234</strong>.
                  In production, you will receive a real OTP via SMS.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter OTP</h2>
                <p className="text-gray-600 mb-1">
                  We've sent a 4-digit code to
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  +91 {mobile}
                </p>
                <button
                  onClick={() => {
                    setStep('mobile');
                    setOtp(['', '', '', '']);
                    setError('');
                  }}
                  className="text-sm text-amber-600 hover:text-amber-700 mt-2"
                >
                  Change number?
                </button>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <div className="mb-6">
                <div className="flex justify-center gap-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={otpInputs[index]}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      disabled={loading}
                      className="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                    />
                  ))}
                </div>
              </div>

              {loading && (
                <div className="flex items-center justify-center gap-2 text-gray-600 mb-4">
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Verifying OTP...</span>
                </div>
              )}

              <div className="text-center mb-6">
                {resendTimer > 0 ? (
                  <p className="text-sm text-gray-600">
                    Resend OTP in <span className="font-semibold text-amber-600">{resendTimer}s</span>
                  </p>
                ) : (
                  <button
                    onClick={handleResendOTP}
                    className="text-sm text-amber-600 hover:text-amber-700 font-medium"
                  >
                    Resend OTP
                  </button>
                )}
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-xs text-amber-800">
                  <strong>Test OTP:</strong> Enter <strong>1234</strong> to verify.
                  In production, you'll receive a real SMS code.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
