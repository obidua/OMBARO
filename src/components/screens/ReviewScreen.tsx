import React, { useState } from 'react';
import { ArrowLeft, Star, Send, Camera, MessageCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface ReviewScreenProps {
  bookingData: {
    id: string;
    serviceName: string;
    salonName: string;
    therapistName?: string;
    date: string;
    time: string;
    salonImage: string;
  };
  onBack: () => void;
  onSubmitReview: (reviewData: {
    bookingId: string;
    rating: number;
    comment: string;
    photos?: string[];
  }) => void;
}

export const ReviewScreen: React.FC<ReviewScreenProps> = ({
  bookingData,
  onBack,
  onSubmitReview
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStarClick = (starRating: number) => {
    setRating(starRating);
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const reviewData = {
        bookingId: bookingData.id,
        rating,
        comment,
        photos
      };
      
      onSubmitReview(reviewData);
      
      // Show success message
      alert('Thank you for your review! Your feedback helps us improve our services.');
      onBack();
      
    } catch (error) {
      console.error('Failed to submit review:', error);
      alert('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRatingText = (rating: number) => {
    switch (rating) {
      case 1: return 'Poor';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Very Good';
      case 5: return 'Excellent';
      default: return 'Rate your experience';
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating <= 2) return 'text-red-600';
    if (rating === 3) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-[70px] pb-[70px]">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={onBack}
            aria-label="Go back to previous screen"
            className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Rate Your Experience</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Service Details */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex space-x-4">
            <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
              <img
                src={bookingData.salonImage}
                alt={bookingData.salonName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-gray-900 text-lg">{bookingData.serviceName}</h2>
              <p className="text-gray-600">{bookingData.salonName}</p>
              {bookingData.therapistName && (
                <p className="text-sm text-gray-500">Therapist: {bookingData.therapistName}</p>
              )}
              <p className="text-sm text-gray-500">{bookingData.date} at {bookingData.time}</p>
            </div>
          </div>
        </div>

        {/* Rating Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            How was your experience?
          </h3>
          
          {/* Star Rating */}
          <div className="flex justify-center space-x-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleStarClick(star)}
                className="transition-transform duration-200 hover:scale-110"
                aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
              >
                <Star
                  className={`w-12 h-12 ${
                    star <= rating
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300 hover:text-yellow-300'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Rating Text */}
          <div className="text-center mb-6">
            <p className={`text-xl font-semibold ${getRatingColor(rating)}`}>
              {getRatingText(rating)}
            </p>
          </div>

          {/* Comment Section */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Share your experience (optional)
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell us about your experience. What did you like? Any suggestions for improvement?"
                rows={4}
                maxLength={500}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              />
              <p className="text-xs text-gray-500 mt-1 text-right">
                {comment.length}/500 characters
              </p>
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add photos (optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 mb-2">Share photos of your experience</p>
                <Button variant="outline" size="sm">
                  Choose Photos
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Review Options */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h4 className="font-semibold text-gray-900 mb-3">Quick feedback</h4>
          <div className="grid grid-cols-2 gap-3">
            {[
              'Professional service',
              'Clean environment',
              'On-time arrival',
              'Skilled therapist',
              'Good value for money',
              'Would recommend'
            ].map((feedback) => (
              <button
                key={feedback}
                onClick={() => {
                  if (comment.includes(feedback)) {
                    setComment(prev => prev.replace(feedback + '. ', '').replace(feedback, ''));
                  } else {
                    setComment(prev => prev ? `${prev}. ${feedback}` : feedback);
                  }
                }}
                className={`p-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                  comment.includes(feedback)
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
              >
                {feedback}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="space-y-3">
          <Button
            onClick={handleSubmit}
            disabled={rating === 0}
            loading={isSubmitting}
            size="lg"
            className="w-full"
          >
            <Send className="w-5 h-5 mr-2" />
            Submit Review
          </Button>
          
          {rating === 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
              <p className="text-yellow-800 text-sm text-center">
                Please select a star rating to submit your review
              </p>
            </div>
          )}
        </div>

        {/* Incentive Message */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-200">
          <div className="text-center">
            <h4 className="font-semibold text-purple-900 mb-2">Thank you for your feedback!</h4>
            <p className="text-purple-700 text-sm">
              Your review helps other customers make informed decisions and helps us maintain quality standards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};