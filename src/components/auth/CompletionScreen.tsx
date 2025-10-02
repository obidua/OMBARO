import React from 'react';
import { CheckCircle, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { User } from '../../types/auth';

interface CompletionScreenProps {
  user: Partial<User>;
  onContinue: () => void;
}

export const CompletionScreen: React.FC<CompletionScreenProps> = ({
  user,
  onContinue
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex flex-col items-center justify-center px-6">
      <div className="max-w-md mx-auto w-full text-center">
        {/* Success Animation */}
        <div className="mb-8">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl animate-pulse">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
              <Sparkles className="w-4 h-4 text-yellow-800" />
            </div>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to OMBARO, {user.name}! 🎉
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Your profile has been successfully created. You're all set to discover 
            amazing beauty and wellness services near you.
          </p>
          
          {/* User Info Summary */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <h3 className="font-semibold text-gray-900 mb-4">Your Profile</h3>
            <div className="space-y-3 text-left">
              <div className="flex justify-between">
                <span className="text-gray-600">Name:</span>
                <span className="font-medium text-gray-900">{user.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="font-medium text-gray-900">{user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Mobile:</span>
                <span className="font-medium text-gray-900">+91 {user.mobile}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Gender:</span>
                <span className="font-medium text-gray-900 capitalize">{user.gender}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Next?</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-left">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 font-bold text-sm">1</span>
              </div>
              <p className="text-gray-600">Explore salons and spas near you</p>
            </div>
            <div className="flex items-center space-x-3 text-left">
              <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                <span className="text-pink-600 font-bold text-sm">2</span>
              </div>
              <p className="text-gray-600">Book your first appointment</p>
            </div>
            <div className="flex items-center space-x-3 text-left">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                <span className="text-indigo-600 font-bold text-sm">3</span>
              </div>
              <p className="text-gray-600">Enjoy premium beauty services</p>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <Button
          onClick={onContinue}
          size="lg"
          className="w-full"
        >
          Start Exploring
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};