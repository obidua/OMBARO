import React from 'react';
import { ArrowLeft, Star, TrendingUp, Award, Users, CheckCircle } from 'lucide-react';

interface TherapistPerformanceScreenProps {
  onBack: () => void;
}

export const TherapistPerformanceScreen: React.FC<TherapistPerformanceScreenProps> = ({ onBack }) => {
  const metrics = [
    { label: 'Total Bookings', value: '145', icon: Users, color: 'bg-blue-100 text-blue-600' },
    { label: 'Completed', value: '142', icon: CheckCircle, color: 'bg-green-100 text-green-600' },
    { label: 'Average Rating', value: '4.8', icon: Star, color: 'bg-yellow-100 text-yellow-600' },
    { label: 'Customer Satisfaction', value: '96%', icon: Award, color: 'bg-purple-100 text-purple-600' },
  ];

  const reviews = [
    { id: '1', customer: 'Sarah Johnson', rating: 5, comment: 'Excellent service! Very professional and skilled.', date: '2025-01-25' },
    { id: '2', customer: 'Mike Brown', rating: 5, comment: 'Best massage I have ever had. Highly recommended!', date: '2025-01-23' },
    { id: '3', customer: 'Emily Davis', rating: 4, comment: 'Great experience, very relaxing session.', date: '2025-01-20' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-[70px] pb-[70px]">
      <div className="bg-white shadow-sm border-b border-gray-100 fixed top-0 left-0 right-0 z-10">
        <div className="flex items-center justify-between p-4 pt-12">
          <button onClick={onBack} className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Performance & Reviews</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="p-4 space-y-6 mt-4">
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="bg-white rounded-2xl p-4 shadow-sm">
              <div className={`w-10 h-10 ${metric.color} rounded-xl flex items-center justify-center mb-3`}>
                <metric.icon className="w-5 h-5" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
              <p className="text-sm text-gray-600">{metric.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer Reviews</h2>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{review.customer}</h3>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{review.comment}</p>
                <p className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
