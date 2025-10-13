import React from 'react';
import { Sparkles, MapPin, Clock, Star, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';

interface WelcomeScreenProps {
  onGetStarted: (userType?: string) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onGetStarted }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex flex-col">
      {/* Back to Website Button */}
      <div className="absolute top-4 left-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm hover:bg-white transition-colors"
          aria-label="Back to website"
        >
          <ArrowLeft className="w-4 h-4 text-neutral-700" />
          <span className="text-sm font-medium text-neutral-700">Back to Website</span>
        </button>
      </div>

      {/* Header */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="text-center max-w-md mx-auto">
          {/* Logo */}
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-strong">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gradient">
              OMBARO
            </h1>
            <p className="text-neutral-600 text-lg mt-2">Beauty & Wellness Hub</p>
          </div>

          {/* Welcome Message */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              Welcome to Your Beauty Journey
            </h2>
            <p className="text-neutral-600 text-lg leading-relaxed">
              Discover and book premium spa, salon, and wellness services near you. 
              Experience luxury at your fingertips.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 gap-4 mb-12">
            <div className="flex items-center space-x-3 glass rounded-2xl p-4 shadow-soft">
              <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-neutral-900">Find Nearby</p>
                <p className="text-sm text-neutral-600">Discover salons & spas around you</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 glass rounded-2xl p-4 shadow-soft">
              <div className="w-10 h-10 bg-secondary-100 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-secondary-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-neutral-900">Easy Booking</p>
                <p className="text-sm text-neutral-600">Book appointments in seconds</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 glass rounded-2xl p-4 shadow-soft">
              <div className="w-10 h-10 bg-accent-100 rounded-xl flex items-center justify-center">
                <Star className="w-5 h-5 text-accent-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-neutral-900">Premium Quality</p>
                <p className="text-sm text-neutral-600">Verified professionals only</p>
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

          {/* Vendor Signup Button */}
          <button
            onClick={() => onGetStarted('vendorCategorySelection')}
            className="w-full text-center text-sm text-amber-600 hover:text-amber-700 font-medium py-3 px-4 border-2 border-dashed border-amber-300 rounded-lg hover:border-amber-400 transition-all duration-200"
          >
            🏪 Become a Vendor Partner
          </button>

          {/* Portal Access Buttons */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            <button
              onClick={() => onGetStarted('employeeLogin')}
              className="text-xs text-neutral-500 hover:text-primary-600 transition-colors duration-200 font-medium text-center"
            >
              Employee
            </button>
            <button
              onClick={() => onGetStarted('vendorLogin')}
              className="text-xs text-neutral-500 hover:text-primary-600 transition-colors duration-200 font-medium text-center"
            >
              Vendor
            </button>
            <button
              onClick={() => onGetStarted('therapistLogin')}
              className="text-xs text-neutral-500 hover:text-primary-600 transition-colors duration-200 font-medium text-center"
            >
              Therapist
            </button>
            <button
              onClick={() => onGetStarted('beauticianLogin')}
              className="text-xs text-neutral-500 hover:text-primary-600 transition-colors duration-200 font-medium text-center"
            >
              Beautician
            </button>
            <button
              onClick={() => onGetStarted('adminLogin')}
              className="text-xs text-neutral-500 hover:text-primary-600 transition-colors duration-200 font-medium text-center"
            >
              Admin
            </button>
            <button
              onClick={() => onGetStarted('roleSelection')}
              className="text-xs text-neutral-500 hover:text-primary-600 transition-colors duration-200 font-medium text-center"
            >
              Departments
            </button>
            <button
              onClick={() => onGetStarted('docPortal')}
              className="text-xs text-neutral-500 hover:text-primary-600 transition-colors duration-200 font-medium text-center"
            >
              Doc
            </button>
          </div>
        </div>
        <p className="text-center text-sm text-neutral-500 mt-4">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
};