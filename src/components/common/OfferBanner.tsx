import React from 'react';
import { Gift, ArrowRight } from 'lucide-react';
import { Offer } from '../../types/app';

interface OfferBannerProps {
  offer: Offer;
  onPress: (offer: Offer) => void;
}

export const OfferBanner: React.FC<OfferBannerProps> = ({ offer, onPress }) => {
  return (
    <div
      onClick={() => onPress(offer)}
      role="button"
      tabIndex={0}
      onClick={() => onPress(offer)}
      aria-label={`View offer: ${offer.discount}% off ${offer.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onPress(offer);
        }
      }}
      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden relative cursor-pointer active:scale-[0.98]"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
      </div>

      <div className="relative flex items-center justify-between">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center" aria-hidden="true">
            <Gift className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <h3 className="text-white font-bold text-lg sm:text-xl">{offer.discount}% OFF</h3>
            <p className="text-white/90 text-sm sm:text-base">{offer.title}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-3">
          <span className="text-white/80 text-sm sm:text-base font-medium">View Offer</span>
          <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
};