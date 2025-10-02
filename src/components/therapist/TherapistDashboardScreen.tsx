import React, { useState } from 'react';
import { Calendar, MapPin, Clock, CheckCircle, XCircle, User, Star, TrendingUp } from 'lucide-react';
import { Button } from '../ui/Button';
import { Therapist, TherapistAssignment, TherapistPerformance } from '../../types/therapist';

interface TherapistDashboardScreenProps {
  therapist: Therapist;
  onNavigate: (screen: string, data?: any) => void;
  onLogout: () => void;
}

export const TherapistDashboardScreen: React.FC<TherapistDashboardScreenProps> = ({
  therapist,
  onNavigate,
  onLogout
}) => {
  const [todayAssignments] = useState<TherapistAssignment[]>([]);
  const [performance] = useState<TherapistPerformance>({
    therapist_id: therapist.id,
    total_assignments: 45,
    completed_assignments: 42,
    cancelled_assignments: 3,
    average_rating: 4.7,
    total_earnings: 125000,
    completion_rate: 93.3,
    customer_satisfaction: 95
  });

  const stats = [
    {
      label: 'Today\'s Tasks',
      value: todayAssignments.length.toString(),
      icon: Calendar,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      label: 'Completion Rate',
      value: `${performance.completion_rate}%`,
      icon: CheckCircle,
      color: 'bg-green-100 text-green-600'
    },
    {
      label: 'Average Rating',
      value: performance.average_rating.toFixed(1),
      icon: Star,
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      label: 'Total Earnings',
      value: `₹${(performance.total_earnings / 1000).toFixed(0)}k`,
      icon: TrendingUp,
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-[70px] pb-[70px]">
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{therapist.name}</h1>
                <p className="text-white/90">{therapist.specialization.join(', ')}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <div className={`w-2 h-2 rounded-full ${
                    therapist.availability_status === 'available' ? 'bg-green-400' :
                    therapist.availability_status === 'busy' ? 'bg-yellow-400' : 'bg-gray-400'
                  }`}></div>
                  <span className="text-sm capitalize">{therapist.availability_status}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-current" />
              <span>{therapist.rating.toFixed(1)}</span>
            </div>
            <div>•</div>
            <div>{therapist.total_reviews} reviews</div>
            <div>•</div>
            <div>{therapist.experience_years} years exp</div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-4 shadow-sm">
              <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center mb-3`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={() => onNavigate('assignments')}
              variant="outline"
              className="flex flex-col items-center space-y-2 h-auto py-4"
            >
              <Calendar className="w-6 h-6" />
              <span>My Assignments</span>
            </Button>
            <Button
              onClick={() => onNavigate('schedule')}
              variant="outline"
              className="flex flex-col items-center space-y-2 h-auto py-4"
            >
              <Clock className="w-6 h-6" />
              <span>Schedule</span>
            </Button>
            <Button
              onClick={() => onNavigate('location')}
              variant="outline"
              className="flex flex-col items-center space-y-2 h-auto py-4"
            >
              <MapPin className="w-6 h-6" />
              <span>Location</span>
            </Button>
            <Button
              onClick={() => onNavigate('leaves')}
              variant="outline"
              className="flex flex-col items-center space-y-2 h-auto py-4"
            >
              <XCircle className="w-6 h-6" />
              <span>Leave Requests</span>
            </Button>
          </div>
        </div>

        {/* Today's Assignments */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Assignments</h2>
          {todayAssignments.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600">No assignments for today</p>
            </div>
          ) : (
            <div className="space-y-3">
              {todayAssignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className="border border-gray-200 rounded-xl p-4 hover:border-purple-300 transition-colors cursor-pointer"
                  onClick={() => onNavigate('assignmentDetail', assignment)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">Customer Name</h3>
                      <p className="text-sm text-gray-600">{assignment.assignment_time}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      assignment.status === 'assigned' ? 'bg-blue-100 text-blue-700' :
                      assignment.status === 'in_progress' ? 'bg-yellow-100 text-yellow-700' :
                      assignment.status === 'completed' ? 'bg-green-100 text-green-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {assignment.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="line-clamp-1">{assignment.location.address}</span>
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
