import React, { useState } from 'react';
import { ArrowLeft, Calendar, MapPin, Clock, User, Phone, Navigation, PlayCircle, CheckCircle, XCircle, Home, Building2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { TherapistAssignment } from '../../types/therapist';

interface MyAssignmentsScreenProps {
  therapistId: string;
  onBack: () => void;
}

export const MyAssignmentsScreen: React.FC<MyAssignmentsScreenProps> = ({
  therapistId,
  onBack
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'today' | 'upcoming' | 'completed'>('today');
  const [assignments] = useState<Partial<TherapistAssignment>[]>([
    {
      id: '1',
      customer_id: 'c1',
      service_id: 's1',
      assignment_date: new Date().toISOString().split('T')[0],
      assignment_time: '10:00',
      status: 'assigned',
      location: {
        address: '123, MG Road, Koramangala, Bangalore',
        latitude: 12.9716,
        longitude: 77.5946
      },
      service_type: 'at_home',
      customer_name: 'Priya Sharma',
      service_name: 'Swedish Full Body Massage',
      estimated_duration: 90
    },
    {
      id: '2',
      customer_id: 'c2',
      service_id: 's2',
      assignment_date: new Date().toISOString().split('T')[0],
      assignment_time: '14:30',
      status: 'in_progress',
      location: {
        address: '456, Indiranagar, Bangalore',
        latitude: 12.9784,
        longitude: 77.6408
      },
      service_type: 'at_home',
      customer_name: 'Rahul Kumar',
      service_name: 'Deep Tissue Massage',
      estimated_duration: 120
    },
    {
      id: '3',
      customer_id: 'c3',
      service_id: 's3',
      assignment_date: new Date().toISOString().split('T')[0],
      assignment_time: '16:00',
      status: 'completed',
      location: {
        address: '789, Whitefield, Bangalore',
        latitude: 12.9698,
        longitude: 77.7500
      },
      service_type: 'at_home',
      customer_name: 'Anita Desai',
      service_name: 'Aromatherapy Session',
      estimated_duration: 60
    },
    {
      id: '4',
      customer_id: 'c4',
      service_id: 's4',
      assignment_date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      assignment_time: '11:00',
      status: 'assigned',
      location: {
        address: 'Serenity Spa & Wellness Center',
        latitude: 12.9716,
        longitude: 77.5946
      },
      service_type: 'visit_spa',
      customer_name: 'Vikram Mehta',
      service_name: 'Hot Stone Therapy',
      estimated_duration: 90
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'assigned': return 'bg-blue-100 text-blue-700';
      case 'in_progress': return 'bg-yellow-100 text-yellow-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'assigned': return Calendar;
      case 'in_progress': return PlayCircle;
      case 'completed': return CheckCircle;
      case 'cancelled': return XCircle;
      default: return Calendar;
    }
  };

  const handleStartService = (assignmentId: string) => {
    alert(`Starting service for assignment ${assignmentId}. Location sharing will begin.`);
    // In real app: Update assignment status to 'in_progress' and start location tracking
  };

  const handleCompleteService = (assignmentId: string) => {
    alert(`Service completed for assignment ${assignmentId}. Customer will be notified.`);
    // In real app: Update assignment status to 'completed' and stop location tracking
  };

  const handleNavigate = (location: any) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}`;
    window.open(url, '_blank');
  };

  const filteredAssignments = assignments.filter(assignment => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'today') return assignment.assignment_date === new Date().toISOString().split('T')[0];
    if (activeFilter === 'completed') return assignment.status === 'completed';
    if (activeFilter === 'upcoming') return assignment.status === 'assigned';
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-[70px] pb-[70px]">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={onBack}
            aria-label="Go back"
            className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">My Assignments</h1>
          <div className="w-10" />
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-2 px-4 pb-4 overflow-x-auto">
          {[
            { id: 'today', label: 'Today' },
            { id: 'upcoming', label: 'Upcoming' },
            { id: 'completed', label: 'Completed' },
            { id: 'all', label: 'All' }
          ].map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeFilter === filter.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Assignments List */}
      <div className="p-4 space-y-4">
        {filteredAssignments.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No assignments found</h3>
            <p className="text-gray-600">You don't have any assignments for this filter</p>
          </div>
        ) : (
          filteredAssignments.map(assignment => {
            const StatusIcon = getStatusIcon(assignment.status!);

            return (
              <div
                key={assignment.id}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200"
              >
                {/* Status and Service Type */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(assignment.status!)}`}>
                      <StatusIcon className="w-4 h-4" />
                      <span className="capitalize">{assignment.status?.replace('_', ' ')}</span>
                    </span>
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-md text-xs font-medium ${(assignment as any).service_type === 'at_home' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'}`}>
                      {(assignment as any).service_type === 'at_home' ? (
                        <><Home className="w-3 h-3" /><span>At Home</span></>
                      ) : (
                        <><Building2 className="w-3 h-3" /><span>Spa Visit</span></>
                      )}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-600">
                    {assignment.assignment_time}
                  </span>
                </div>

                {/* Service Info */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-start space-x-3">
                    <User className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{(assignment as any).customer_name || 'Customer Name'}</p>
                      <p className="text-sm text-gray-600">{(assignment as any).service_name || 'Service'}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Duration</p>
                      <p className="text-sm text-gray-600">{assignment.estimated_duration} minutes</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Service Location</p>
                      <p className="text-sm text-gray-600">{assignment.location?.address}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  {assignment.status === 'assigned' && (
                    <>
                      <Button
                        onClick={() => handleStartService(assignment.id!)}
                        size="sm"
                        className="w-full"
                      >
                        <PlayCircle className="w-4 h-4 mr-2" />
                        Start Service
                      </Button>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          onClick={() => handleNavigate(assignment.location)}
                          variant="outline"
                          size="sm"
                        >
                          <Navigation className="w-4 h-4 mr-2" />
                          Navigate
                        </Button>
                        <Button
                          onClick={() => alert('Calling customer...')}
                          variant="outline"
                          size="sm"
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Call
                        </Button>
                      </div>
                    </>
                  )}

                  {assignment.status === 'in_progress' && (
                    <>
                      <Button
                        onClick={() => handleCompleteService(assignment.id!)}
                        size="sm"
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Complete Service
                      </Button>
                      <Button
                        onClick={() => alert('Calling customer...')}
                        variant="outline"
                        size="sm"
                        className="w-full"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call Customer
                      </Button>
                    </>
                  )}

                  {assignment.status === 'completed' && (
                    <div className="bg-green-50 rounded-xl p-3 text-center">
                      <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                      <p className="text-sm font-medium text-green-900">Service Completed</p>
                      <p className="text-xs text-green-700 mt-1">Thank you for your service!</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
