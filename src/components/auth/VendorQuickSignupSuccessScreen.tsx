import React from 'react';
import { CheckCircle, ArrowRight, FileText, Home } from 'lucide-react';
import { Button } from '../ui/Button';

interface VendorQuickSignupSuccessScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  selectedCategory?: string;
  mobile?: string;
  userName?: string;
}

export default function VendorQuickSignupSuccessScreen({
  onNavigate,
  selectedCategory,
  mobile,
  userName
}: VendorQuickSignupSuccessScreenProps) {

  function handleGoToDashboard() {
    onNavigate('vendorDashboard');
  }

  function handleCompleteProfile() {
    onNavigate('vendorSignup', {
      selectedCategory,
      signupType: 'detailed',
      isProfileCompletion: true,
      mobile
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Aboard! 🎉
            </h1>
            <p className="text-lg text-gray-600">
              Your quick signup is complete, {userName}!
            </p>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-8">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Account Created</p>
                  <p className="text-sm text-gray-600">Your vendor account is now active</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Mobile Verified</p>
                  <p className="text-sm text-gray-600">{mobile}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Dashboard Access</p>
                  <p className="text-sm text-gray-600">Ready to manage your business</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <Button
              onClick={handleGoToDashboard}
              fullWidth
              size="lg"
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
            >
              <Home className="w-5 h-5" />
              <span>Go to Dashboard</span>
              <ArrowRight className="w-5 h-5" />
            </Button>

            <Button
              onClick={handleCompleteProfile}
              variant="outline"
              fullWidth
              size="lg"
              className="border-2 border-amber-400 text-amber-700 hover:bg-amber-50"
            >
              <FileText className="w-5 h-5" />
              <span>Complete Business Profile</span>
            </Button>
          </div>

          <div className="space-y-3">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2 text-sm">
                Complete Your Profile for Better Results
              </h3>
              <ul className="text-xs text-blue-800 space-y-1">
                <li>• Add business details for faster approvals</li>
                <li>• Upload GST and PAN for verified badge</li>
                <li>• Get priority in search results</li>
                <li>• Access premium features</li>
              </ul>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h3 className="font-semibold text-amber-900 mb-2 text-sm">
                Next Steps
              </h3>
              <ul className="text-xs text-amber-800 space-y-1">
                <li>• Set up your services and pricing</li>
                <li>• Add therapists to your team</li>
                <li>• Configure booking availability</li>
                <li>• Start accepting bookings!</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-xs text-gray-500">
              You can complete your business profile anytime from your dashboard settings
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Need help getting started?{' '}
            <button
              onClick={() => onNavigate('docPortal')}
              className="text-amber-600 hover:text-amber-700 font-medium"
            >
              View Documentation
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
