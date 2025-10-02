import React, { useState } from 'react';
import { ArrowLeft, Gift, Users, Copy, Share2, Trophy, Star } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface ReferralScreenProps {
  user: any;
  onBack: () => void;
}

export const ReferralScreen: React.FC<ReferralScreenProps> = ({
  user,
  onBack
}) => {
  const [referralCode] = useState(`ZEX${user.mobile?.slice(-4) || '1234'}`);
  const [referrals, setReferrals] = useState([
    { name: 'Priya Sharma', joinDate: '2025-01-10', status: 'Active', discount: '₹250' },
    { name: 'Rahul Kumar', joinDate: '2025-01-08', status: 'Active', discount: '₹250' },
    { name: 'Anita Desai', joinDate: '2025-01-05', status: 'Pending', discount: '₹0' }
  ]);

  const totalEarnings = referrals
    .filter(ref => ref.status === 'Active')
    .reduce((sum, ref) => sum + parseInt(ref.discount.replace('₹', '')), 0);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    alert('Referral code copied to clipboard!');
  };

  const handleShare = () => {
    const shareText = `Join OMBARO using my referral code ${referralCode} and get 10% off your first booking! Download the app now.`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Join OMBARO',
        text: shareText,
        url: window.location.origin
      });
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Referral message copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-[70px] pb-[70px]">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={onBack}
            aria-label="Go back to profile screen"
            className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Refer & Earn</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Referral Stats */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Refer Friends & Earn</h2>
            <p className="text-white/90">Share OMBARO and earn rewards together!</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold">{referrals.filter(r => r.status === 'Active').length}</p>
              <p className="text-white/80 text-sm">Successful Referrals</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">₹{totalEarnings}</p>
              <p className="text-white/80 text-sm">Total Earnings</p>
            </div>
          </div>
        </div>

        {/* Your Referral Code */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Referral Code</h3>
          
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between">
              <div className="text-center flex-1">
                <p className="text-3xl font-bold text-purple-600 tracking-wider">{referralCode}</p>
                <p className="text-sm text-gray-600 mt-1">Share this code with friends</p>
              </div>
              <button
                onClick={handleCopyCode}
                className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center hover:bg-purple-200 transition-colors"
                aria-label="Copy referral code"
              >
                <Copy className="w-5 h-5 text-purple-600" />
              </button>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button onClick={handleShare} className="flex-1">
              <Share2 className="w-4 h-4 mr-2" />
              Share Code
            </Button>
            <Button onClick={handleCopyCode} variant="outline" className="flex-1">
              <Copy className="w-4 h-4 mr-2" />
              Copy Code
            </Button>
          </div>
        </div>

        {/* How it Works */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">How it Works</h3>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-purple-600 font-bold text-sm">1</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Share Your Code</h4>
                <p className="text-gray-600 text-sm">Send your referral code to friends and family</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-pink-600 font-bold text-sm">2</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Friend Signs Up</h4>
                <p className="text-gray-600 text-sm">They enter your code during registration</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 font-bold text-sm">3</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Both Get Rewards</h4>
                <p className="text-gray-600 text-sm">You both get 10% off your next booking!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Referral History */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Referrals</h3>
          
          {referrals.length > 0 ? (
            <div className="space-y-3">
              {referrals.map((referral, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{referral.name}</h4>
                      <p className="text-sm text-gray-600">Joined {referral.joinDate}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                      referral.status === 'Active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {referral.status}
                    </span>
                    <p className="text-sm font-semibold text-purple-600 mt-1">
                      {referral.discount}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-gray-400" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">No referrals yet</h4>
              <p className="text-gray-600 text-sm">Start sharing your code to earn rewards!</p>
            </div>
          )}
        </div>

        {/* Terms */}
        <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-2">Referral Terms</h4>
          <ul className="text-blue-800 text-sm space-y-1">
            <li>• Both you and your friend get 10% off your next booking</li>
            <li>• Discount is valid for 30 days from registration</li>
            <li>• Maximum discount amount is ₹500 per referral</li>
            <li>• Referral rewards are credited after friend's first booking</li>
          </ul>
        </div>
      </div>
    </div>
  );
};