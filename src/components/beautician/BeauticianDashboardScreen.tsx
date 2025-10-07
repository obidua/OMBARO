import React, { useState } from 'react';
import { Calendar, MapPin, Clock, CheckCircle, User, Star, TrendingUp, LogOut, DollarSign, BarChart3, Home, Building2 } from 'lucide-react';
import { Button } from '../ui/Button';

interface Beautician {
  id: string;
  vendor_id: string;
  name: string;
  email: string;
  mobile: string;
  specializations: string[];
  experience_years: number;
  certifications: string[];
  rating: number;
  total_reviews: number;
  status: string;
  availability_status: string;
}

interface BeauticianDashboardScreenProps {
  beautician: Beautician;
  onNavigate: (screen: string, data?: any) => void;
  onLogout: () => void;
}

export const BeauticianDashboardScreen: React.FC<BeauticianDashboardScreenProps> = ({
  beautician,
  onNavigate,
  onLogout
}) => {
  const [todayAssignments] = useState<any[]>([
    {
      id: '1',
      assignment_date: new Date().toISOString().split('T')[0],
      assignment_time: '11:00 AM',
      status: 'assigned',
      location: {
        address: 'Indiranagar, Bangalore - 560038',
        latitude: 12.9716,
        longitude: 77.5946
      },
      service_type: 'at_home',
      customer_name: 'Sneha Reddy',
      service_name: 'Bridal Makeup',
      estimated_duration: 120,
      notes: 'Traditional bridal look requested'
    },
    {
      id: '2',
      assignment_date: new Date().toISOString().split('T')[0],
      assignment_time: '3:00 PM',
      status: 'assigned',
      location: {
        address: 'Serenity Beauty Salon',
        latitude: 12.9716,
        longitude: 77.5946
      },
      service_type: 'visit_spa',
      customer_name: 'Meera Kapoor',
      service_name: 'Hair Styling & Blow Dry',
      estimated_duration: 60,
      notes: 'Customer prefers curls'
    }
  ]);
  const [performance] = useState({
    beautician_id: beautician.id,
    total_assignments: 38,
    completed_assignments: 36,
    cancelled_assignments: 2,
    average_rating: 4.8,
    total_earnings: 95000,
    completion_rate: 94.7,
    customer_satisfaction: 96
  });

  const stats = [
    {
      label: 'Today\'s Appointments',
      value: todayAssignments.length.toString(),
      icon: Calendar,
      color: 'bg-blue-100 text-blue-600',
      change: '3 pending'
    },
    {
      label: 'Completion Rate',
      value: `${performance.completion_rate}%`,
      icon: CheckCircle,
      color: 'bg-green-100 text-green-600',
      change: '+6% this month'
    },
    {
      label: 'Average Rating',
      value: performance.average_rating.toFixed(1),
      icon: Star,
      color: 'bg-yellow-100 text-yellow-600',
      change: `${beautician.total_reviews} reviews`
    },
    {
      label: 'Total Earnings',
      value: `₹${(performance.total_earnings / 1000).toFixed(0)}k`,
      icon: TrendingUp,
      color: 'bg-purple-100 text-purple-600',
      change: '+15% growth'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-pink-600 to-rose-600 pt-12 pb-4 sm:pb-6 px-3 sm:px-4 md:px-6">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">{beautician.name}</h1>
            <p className="text-sm sm:text-base text-white/90">{beautician.specializations.join(', ')}</p>
            <div className="flex items-center space-x-4 text-sm mt-2">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  beautician.availability_status === 'available' ? 'bg-green-400' :
                  beautician.availability_status === 'busy' ? 'bg-yellow-400' : 'bg-gray-400'
                }`}></div>
                <span className="text-white/90 capitalize">{beautician.availability_status}</span>
              </div>
              <div className="text-white/70">•</div>
              <div className="flex items-center space-x-1 text-white/90">
                <Star className="w-4 h-4 fill-current" />
                <span>{beautician.rating.toFixed(1)}</span>
              </div>
              <div className="text-white/70">•</div>
              <div className="text-white/90">{beautician.experience_years} years exp</div>
            </div>
          </div>
          <button
            onClick={onLogout}
            aria-label="Logout from beautician portal"
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <LogOut className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <div className="px-3 sm:px-4 md:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className={`w-10 sm:w-12 h-10 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-5 sm:w-6 h-5 sm:h-6" />
                </div>
                <div className="text-right">
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-gray-500">{stat.change}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            <button
              onClick={() => onNavigate('beauticianAssignments')}
              className="flex flex-col items-center space-y-2 p-4 rounded-xl border-2 border-gray-200 hover:border-pink-300 hover:bg-pink-50 transition-all"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-900">Appointments</span>
            </button>
            <button
              onClick={() => onNavigate('beauticianSchedule')}
              className="flex flex-col items-center space-y-2 p-4 rounded-xl border-2 border-gray-200 hover:border-pink-300 hover:bg-pink-50 transition-all"
            >
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-900">Schedule</span>
            </button>
            <button
              onClick={() => onNavigate('beauticianLocation')}
              className="flex flex-col items-center space-y-2 p-4 rounded-xl border-2 border-gray-200 hover:border-pink-300 hover:bg-pink-50 transition-all"
            >
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-sm font-medium text-gray-900">Location</span>
            </button>
            <button
              onClick={() => onNavigate('beauticianLeaves')}
              className="flex flex-col items-center space-y-2 p-4 rounded-xl border-2 border-gray-200 hover:border-pink-300 hover:bg-pink-50 transition-all"
            >
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-red-600" />
              </div>
              <span className="text-sm font-medium text-gray-900">Leaves</span>
            </button>
            <button
              onClick={() => onNavigate('beauticianEarnings')}
              className="flex flex-col items-center space-y-2 p-4 rounded-xl border-2 border-gray-200 hover:border-pink-300 hover:bg-pink-50 transition-all"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-gray-900">Earnings</span>
            </button>
            <button
              onClick={() => onNavigate('beauticianPerformance')}
              className="flex flex-col items-center space-y-2 p-4 rounded-xl border-2 border-gray-200 hover:border-pink-300 hover:bg-pink-50 transition-all"
            >
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-yellow-600" />
              </div>
              <span className="text-sm font-medium text-gray-900">Performance</span>
            </button>
            <button
              onClick={() => onNavigate('beauticianProfile')}
              className="flex flex-col items-center space-y-2 p-4 rounded-xl border-2 border-gray-200 hover:border-pink-300 hover:bg-pink-50 transition-all"
            >
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-teal-600" />
              </div>
              <span className="text-sm font-medium text-gray-900">Profile</span>
            </button>
            <button
              onClick={() => onNavigate('beauticianSettings')}
              className="flex flex-col items-center space-y-2 p-4 rounded-xl border-2 border-gray-200 hover:border-pink-300 hover:bg-pink-50 transition-all"
            >
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-gray-600" />
              </div>
              <span className="text-sm font-medium text-gray-900">Settings</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Today's Appointments</h2>
            <span className="text-sm text-gray-600">{todayAssignments.length} appointments</span>
          </div>
          {todayAssignments.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-600 font-medium">No appointments for today</p>
              <p className="text-sm text-gray-500 mt-1">You're all caught up!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {todayAssignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className="border border-gray-200 rounded-xl p-4 hover:border-pink-300 hover:shadow-sm transition-all cursor-pointer"
                  onClick={() => onNavigate('appointmentDetail', assignment)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{assignment.customer_name || 'Customer Name'}</h3>
                        <span className={`px-2 py-0.5 rounded-md text-xs font-medium flex items-center space-x-1 ${
                          assignment.service_type === 'at_home'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-pink-100 text-pink-700'
                        }`}>
                          {assignment.service_type === 'at_home' ? (
                            <><Home className="w-3 h-3" /><span>At Home</span></>
                          ) : (
                            <><Building2 className="w-3 h-3" /><span>Salon Visit</span></>
                          )}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{assignment.service_name || 'Service'}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        <Clock className="w-3.5 h-3.5 inline mr-1" />
                        {assignment.assignment_time} • {assignment.estimated_duration} min
                      </p>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium whitespace-nowrap ${
                      assignment.status === 'assigned' ? 'bg-blue-100 text-blue-700' :
                      assignment.status === 'in_progress' ? 'bg-yellow-100 text-yellow-700' :
                      assignment.status === 'completed' ? 'bg-green-100 text-green-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {assignment.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex items-start space-x-2 text-sm text-gray-600 bg-gray-50 rounded-lg p-2">
                    <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{assignment.location.address}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
