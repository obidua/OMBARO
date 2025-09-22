import React from 'react';
import { Sparkles, MapPin, Clock, Star } from 'lucide-react';
import { Button } from '../ui/Button';

interface WelcomeScreenProps {
  onGetStarted: (userType?: string) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex flex-col">
      {/* Header */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="text-center max-w-md mx-auto">
          {/* Logo */}
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              ZexDream
            </h1>
            <p className="text-gray-600 text-lg mt-2">Beauty & Wellness Hub</p>
          </div>

          {/* Welcome Message */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Welcome to Your Beauty Journey
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Discover and book premium spa, salon, and wellness services near you. 
              Experience luxury at your fingertips.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 gap-4 mb-12">
            <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-sm">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Find Nearby</p>
                <p className="text-sm text-gray-600">Discover salons & spas around you</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-sm">
              <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-pink-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Easy Booking</p>
                <p className="text-sm text-gray-600">Book appointments in seconds</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-sm">
              <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                <Star className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Premium Quality</p>
                <p className="text-sm text-gray-600">Verified professionals only</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="px-6 pb-8">
        <div className="space-y-3">
          <Button 
            onClick={onGetStarted}
            size="lg"
            className="w-full"
          >
            Sign Up
          </Button>
          <Button 
            onClick={onGetStarted}
            variant="outline"
            size="lg"
            className="w-full"
          >
            Login
          </Button>
          
          {/* Portal Access Buttons */}
          <div className="flex justify-center space-x-6 mt-6">
            <button
              onClick={() => onGetStarted('employeeLogin')}
              className="text-xs text-gray-500 hover:text-purple-600 transition-colors duration-200"
            >
              Employee
            </button>
            <button
              onClick={() => onGetStarted('vendorLogin')}
              className="text-xs text-gray-500 hover:text-purple-600 transition-colors duration-200"
            >
              Vendor
            </button>
            <button
              onClick={() => onGetStarted('adminLogin')}
              className="text-xs text-gray-500 hover:text-purple-600 transition-colors duration-200"
            >
              Admin
            </button>
            <button
              onClick={() => onGetStarted('roleSelection')}
              className="text-xs text-gray-500 hover:text-purple-600 transition-colors duration-200"
            >
              Departments
            </button>
          </div>
        </div>
        <p className="text-center text-sm text-gray-500 mt-4">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
};