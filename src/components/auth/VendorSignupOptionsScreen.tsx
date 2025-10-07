import React from 'react';
import { ArrowLeft, Zap, FileText, Facebook, Instagram, Chrome, CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';

interface VendorSignupOptionsScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  selectedCategory?: string;
}

export default function VendorSignupOptionsScreen({
  onNavigate,
  selectedCategory
}: VendorSignupOptionsScreenProps) {

  function handleQuickSignup() {
    onNavigate('vendorQuickSignup', { selectedCategory });
  }

  function handleDetailedSignup() {
    onNavigate('vendorSignup', { selectedCategory, signupType: 'detailed' });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => onNavigate('vendorCategorySelection')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <h1 className="text-xl font-bold text-gray-900">Choose Signup Method</h1>
            <div className="w-20" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">How would you like to sign up?</h2>
            <p className="text-gray-600">Choose the signup method that works best for you</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <button
              onClick={handleQuickSignup}
              className="relative p-8 rounded-xl border-2 border-gray-200 hover:border-amber-400 hover:shadow-xl text-left transition-all duration-200 group"
            >
              <div className="absolute top-4 right-4">
                <div className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                  FASTEST
                </div>
              </div>

              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">Quick Signup</h3>

              <p className="text-gray-600 mb-4">
                Get started in under 2 minutes using your social media account
              </p>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Sign up with Google, Facebook, or Instagram</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Verify mobile number with OTP</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Start receiving bookings immediately</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Complete profile details later</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                <Facebook className="w-5 h-5 text-blue-600" />
                <Instagram className="w-5 h-5 text-pink-600" />
                <Chrome className="w-5 h-5 text-red-600" />
                <span className="text-xs text-gray-500">Social Login</span>
              </div>
            </button>

            <button
              onClick={handleDetailedSignup}
              className="relative p-8 rounded-xl border-2 border-gray-200 hover:border-amber-400 hover:shadow-xl text-left transition-all duration-200 group"
            >
              <div className="absolute top-4 right-4">
                <div className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
                  RECOMMENDED
                </div>
              </div>

              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileText className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">Detailed Signup</h3>

              <p className="text-gray-600 mb-4">
                Complete your business profile with all details for faster approval
              </p>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <span>Provide complete business information</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <span>Add GST, PAN, and business details</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <span>Choose partnership type</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <span>Faster approval process</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                <div className="flex-1 bg-blue-50 rounded-lg px-3 py-2">
                  <p className="text-xs text-blue-800 font-medium">Takes 5-10 minutes</p>
                </div>
              </div>
            </button>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-800">
              <strong>Note:</strong> Quick signup vendors can complete their detailed profile anytime
              from the dashboard. Both methods lead to the same vendor portal access.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
