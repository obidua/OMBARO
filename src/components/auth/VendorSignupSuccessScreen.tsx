import React from 'react';
import { CheckCircle, Mail, Clock, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

interface VendorSignupSuccessScreenProps {
  onNavigate: (screen: string) => void;
  data?: {
    businessName: string;
    email: string;
    applicationNumber?: string;
    mobile?: string;
  };
}

export default function VendorSignupSuccessScreen({ onNavigate, data }: VendorSignupSuccessScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Application Submitted Successfully!
          </h1>

          <p className="text-lg text-gray-600 mb-8">
            Thank you for applying to join OMBARO, <strong>{data?.businessName}</strong>
          </p>

          {/* What's Next Section */}
          <div className="bg-blue-50 rounded-xl p-6 mb-8 text-left">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-6 h-6 text-blue-600" />
              What Happens Next?
            </h2>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Application Review</h3>
                  <p className="text-sm text-gray-600">
                    Our team will review your application within 24-48 hours
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email Notification</h3>
                  <p className="text-sm text-gray-600">
                    You'll receive an email at <strong>{data?.email}</strong> with the status
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Get Started</h3>
                  <p className="text-sm text-gray-600">
                    Once approved, you can log in and start managing your business on OMBARO
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8">
            <div className="flex items-start gap-3">
              <Mail className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 mb-1">
                  Check Your Email
                </h3>
                <p className="text-sm text-gray-600">
                  We've sent a confirmation email to <strong>{data?.email}</strong>.
                  Please verify your email address by clicking the link in the email.
                </p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="space-y-3 mb-8">
            {data?.applicationNumber && (
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-600 mb-1">Application Reference Number</p>
                <p className="text-2xl font-bold text-gray-900">{data.applicationNumber}</p>
                <p className="text-xs text-gray-500 mt-1">Save this number for tracking your application</p>
              </div>
            )}
            {data?.mobile && (
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-blue-800">
                  <strong>Login Credentials:</strong> Use your mobile number ({data.mobile}) and password to login and track your application status.
                </p>
              </div>
            )}
            <p className="text-sm text-gray-600">
              If you have any questions, contact us at{' '}
              <a href="mailto:vendor-support@ombaro.com" className="text-amber-600 hover:underline">
                vendor-support@ombaro.com
              </a>
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button
              onClick={() => onNavigate('welcome')}
              fullWidth
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
            >
              <span>Back to Home</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <button
              onClick={() => onNavigate('vendorApplicationStatus')}
              className="w-full text-amber-600 hover:text-amber-700 font-medium"
            >
              Check Application Status
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-6 text-sm text-gray-600">
          <p>
            Already have an account?{' '}
            <button
              onClick={() => onNavigate('vendorLogin')}
              className="text-amber-600 hover:underline font-medium"
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
