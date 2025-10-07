import React, { useState } from 'react';
import { ArrowLeft, Star, TrendingUp, Award, Target, Users, ThumbsUp, Clock, CheckCircle } from 'lucide-react';

interface BeauticianPerformanceScreenProps {
  beauticianId: string;
  onBack: () => void;
}

export const BeauticianPerformanceScreen: React.FC<BeauticianPerformanceScreenProps> = ({
  beauticianId,
  onBack
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');

  const [performance] = useState({
    averageRating: 4.8,
    totalReviews: 156,
    completionRate: 97.5,
    customerSatisfaction: 96,
    totalAppointments: 168,
    completedAppointments: 164,
    cancelledAppointments: 4,
    onTimePercentage: 94,
    repeatCustomers: 68,
    monthlyGrowth: 15
  });

  const [reviews] = useState([
    {
      id: '1',
      customer: 'Sneha Reddy',
      rating: 5,
      comment: 'Absolutely stunning bridal makeup! Very professional and skilled. Highly recommended!',
      service: 'Bridal Makeup',
      date: '2025-10-06',
      photos: true
    },
    {
      id: '2',
      customer: 'Meera Kapoor',
      rating: 5,
      comment: 'Perfect hair styling! Exactly what I wanted. Will definitely book again.',
      service: 'Hair Styling',
      date: '2025-10-05',
      photos: false
    },
    {
      id: '3',
      customer: 'Priya Sharma',
      rating: 4,
      comment: 'Good service and very gentle. The facial was relaxing and my skin feels great.',
      service: 'Facial & Cleanup',
      date: '2025-10-05',
      photos: false
    },
    {
      id: '4',
      customer: 'Anita Desai',
      rating: 5,
      comment: 'Beautiful nail art! Very creative and professional work.',
      service: 'Nail Art',
      date: '2025-10-04',
      photos: true
    }
  ]);

  const [serviceBreakdown] = useState([
    { service: 'Bridal Makeup', count: 45, rating: 4.9, revenue: 225000 },
    { service: 'Party Makeup', count: 38, rating: 4.8, revenue: 152000 },
    { service: 'Hair Styling', count: 32, rating: 4.7, revenue: 96000 },
    { service: 'Facial & Cleanup', count: 28, rating: 4.8, revenue: 84000 },
    { service: 'Nail Services', count: 25, rating: 4.6, revenue: 45000 }
  ]);

  const [achievements] = useState([
    { id: '1', title: 'Top Performer', icon: Award, color: 'text-yellow-600', bgColor: 'bg-yellow-100', description: 'Top 10% beautician this month' },
    { id: '2', title: '100 Happy Customers', icon: Users, color: 'text-blue-600', bgColor: 'bg-blue-100', description: 'Served 100+ satisfied customers' },
    { id: '3', title: '5 Star Expert', icon: Star, color: 'text-pink-600', bgColor: 'bg-pink-100', description: 'Maintained 4.8+ rating' },
    { id: '4', title: 'Punctual Pro', icon: Clock, color: 'text-green-600', bgColor: 'bg-green-100', description: '95%+ on-time arrival' }
  ]);

  const stats = [
    { label: 'Average Rating', value: performance.averageRating.toFixed(1), icon: Star, color: 'bg-yellow-100 text-yellow-600', change: '+0.2 this month' },
    { label: 'Completion Rate', value: `${performance.completionRate}%`, icon: CheckCircle, color: 'bg-green-100 text-green-600', change: '+2.5% this month' },
    { label: 'Customer Satisfaction', value: `${performance.customerSatisfaction}%`, icon: ThumbsUp, color: 'bg-blue-100 text-blue-600', change: '+4% this month' },
    { label: 'On-Time Rate', value: `${performance.onTimePercentage}%`, icon: Clock, color: 'bg-purple-100 text-purple-600', change: 'Excellent' }
  ];

  const maxCount = Math.max(...serviceBreakdown.map(s => s.count));

  return (
    <div className="min-h-screen bg-gray-50 pt-[70px] pb-[70px]">
      <div className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={onBack}
            aria-label="Go back"
            className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Performance</h1>
          <div className="w-10" />
        </div>

        <div className="flex space-x-2 px-4 pb-4 overflow-x-auto">
          {['week', 'month', 'year'].map(period => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors capitalize ${
                selectedPeriod === period
                  ? 'bg-pink-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-600">{stat.label}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500">{stat.change}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Achievements</h3>

          <div className="grid grid-cols-2 gap-3">
            {achievements.map(achievement => (
              <div
                key={achievement.id}
                className={`${achievement.bgColor} border-2 border-gray-200 rounded-xl p-3 text-center`}
              >
                <div className={`w-12 h-12 ${achievement.bgColor} rounded-full flex items-center justify-center mx-auto mb-2`}>
                  <achievement.icon className={`w-6 h-6 ${achievement.color}`} />
                </div>
                <p className={`text-sm font-semibold ${achievement.color}`}>{achievement.title}</p>
                <p className="text-xs text-gray-600 mt-1">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Service Performance</h3>

          <div className="space-y-4">
            {serviceBreakdown.map((service, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{service.service}</p>
                    <p className="text-xs text-gray-600">{service.count} bookings • ₹{(service.revenue / 1000).toFixed(0)}k revenue</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold text-gray-900">{service.rating}</span>
                  </div>
                </div>
                <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-pink-500 to-rose-500 h-full rounded-full"
                    style={{ width: `${(service.count / maxCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-900">Recent Reviews</h3>
            <div className="flex items-center space-x-1">
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              <span className="font-semibold text-gray-900">{performance.averageRating}</span>
              <span className="text-sm text-gray-600">({performance.totalReviews})</span>
            </div>
          </div>

          <div className="space-y-3">
            {reviews.map(review => (
              <div
                key={review.id}
                className="border border-gray-200 rounded-xl p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{review.customer}</h4>
                    <p className="text-xs text-gray-600">{review.service}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                </div>

                <p className="text-sm text-gray-700 mb-2">{review.comment}</p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                  {review.photos && (
                    <span className="text-xs text-pink-600 font-medium">
                      📸 With photos
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center justify-center mb-2">
              <Target className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-center text-2xl font-bold text-blue-900">{performance.repeatCustomers}</p>
            <p className="text-center text-xs text-blue-700 mt-1">Repeat Customers</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-4">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-center text-2xl font-bold text-green-900">+{performance.monthlyGrowth}%</p>
            <p className="text-center text-xs text-green-700 mt-1">Monthly Growth</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200 rounded-xl p-4">
          <h4 className="font-medium text-pink-900 mb-2">Performance Tips</h4>
          <ul className="text-sm text-pink-800 space-y-1">
            <li>• Maintain consistent quality to increase repeat customers</li>
            <li>• Respond promptly to customer messages and queries</li>
            <li>• Arrive on time for all appointments</li>
            <li>• Keep your portfolio updated with latest work</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
