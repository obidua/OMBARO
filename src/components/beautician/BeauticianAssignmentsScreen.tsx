import React, { useState } from 'react';
import { ArrowLeft, Calendar, MapPin, Clock, User, Phone, Navigation, PlayCircle, CheckCircle, XCircle, Home, Building2 } from 'lucide-react';
import { Button } from '../ui/Button';

interface BeauticianAssignmentsScreenProps {
  beauticianId: string;
  onBack: () => void;
}

export const BeauticianAssignmentsScreen: React.FC<BeauticianAssignmentsScreenProps> = ({
  beauticianId,
  onBack
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'today' | 'upcoming' | 'completed'>('today');
  const [appointments] = useState<any[]>([
    {
      id: '1',
      assignment_date: new Date().toISOString().split('T')[0],
      assignment_time: '10:00 AM',
      status: 'assigned',
      location: {
        address: '123, Indiranagar, Bangalore - 560038',
        latitude: 12.9716,
        longitude: 77.5946
      },
      service_type: 'at_home',
      customer_name: 'Sneha Reddy',
      customer_phone: '+91 98765 43210',
      service_name: 'Bridal Makeup',
      estimated_duration: 120,
      notes: 'Traditional bridal look requested'
    },
    {
      id: '2',
      assignment_date: new Date().toISOString().split('T')[0],
      assignment_time: '2:30 PM',
      status: 'assigned',
      location: {
        address: 'Serenity Beauty Salon',
        latitude: 12.9716,
        longitude: 77.5946
      },
      service_type: 'visit_spa',
      customer_name: 'Meera Kapoor',
      customer_phone: '+91 98765 43211',
      service_name: 'Hair Styling & Blow Dry',
      estimated_duration: 60,
      notes: 'Customer prefers curls'
    },
    {
      id: '3',
      assignment_date: new Date().toISOString().split('T')[0],
      assignment_time: '5:00 PM',
      status: 'in_progress',
      location: {
        address: '456, Koramangala, Bangalore - 560034',
        latitude: 12.9352,
        longitude: 77.6245
      },
      service_type: 'at_home',
      customer_name: 'Priya Sharma',
      customer_phone: '+91 98765 43212',
      service_name: 'Facial & Cleanup',
      estimated_duration: 90,
      notes: 'Sensitive skin'
    },
    {
      id: '4',
      assignment_date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
      assignment_time: '11:00 AM',
      status: 'completed',
      location: {
        address: '789, Whitefield, Bangalore - 560066',
        latitude: 12.9698,
        longitude: 77.7500
      },
      service_type: 'at_home',
      customer_name: 'Anita Desai',
      customer_phone: '+91 98765 43213',
      service_name: 'Nail Art & Manicure',
      estimated_duration: 60,
      notes: 'French manicure requested'
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

  const handleStartService = (appointmentId: string) => {
    alert(`Starting service for appointment ${appointmentId}. Location sharing will begin.`);
  };

  const handleCompleteService = (appointmentId: string) => {
    alert(`Service completed for appointment ${appointmentId}. Customer will be notified.`);
  };

  const handleNavigate = (location: any) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}`;
    window.open(url, '_blank');
  };

  const filteredAppointments = appointments.filter(appointment => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'today') return appointment.assignment_date === new Date().toISOString().split('T')[0];
    if (activeFilter === 'completed') return appointment.status === 'completed';
    if (activeFilter === 'upcoming') return appointment.status === 'assigned';
    return true;
  });

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
          <h1 className="text-lg font-semibold text-gray-900">My Appointments</h1>
          <div className="w-10" />
        </div>

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
                  ? 'bg-pink-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-4">
        {filteredAppointments.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No appointments found</h3>
            <p className="text-gray-600">You don't have any appointments for this filter</p>
          </div>
        ) : (
          filteredAppointments.map(appointment => {
            const StatusIcon = getStatusIcon(appointment.status);

            return (
              <div
                key={appointment.id}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                      <StatusIcon className="w-4 h-4" />
                      <span className="capitalize">{appointment.status.replace('_', ' ')}</span>
                    </span>
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-md text-xs font-medium ${
                      appointment.service_type === 'at_home' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'
                    }`}>
                      {appointment.service_type === 'at_home' ? (
                        <><Home className="w-3 h-3" /><span>At Home</span></>
                      ) : (
                        <><Building2 className="w-3 h-3" /><span>Salon Visit</span></>
                      )}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-600">
                    {appointment.assignment_time}
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-start space-x-3">
                    <User className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{appointment.customer_name}</p>
                      <p className="text-sm text-gray-600">{appointment.service_name}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Duration</p>
                      <p className="text-sm text-gray-600">{appointment.estimated_duration} minutes</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Service Location</p>
                      <p className="text-sm text-gray-600">{appointment.location.address}</p>
                    </div>
                  </div>

                  {appointment.notes && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <p className="text-sm text-yellow-800">
                        <strong>Note:</strong> {appointment.notes}
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  {appointment.status === 'assigned' && (
                    <>
                      <Button
                        onClick={() => handleStartService(appointment.id)}
                        size="sm"
                        className="w-full"
                      >
                        <PlayCircle className="w-4 h-4 mr-2" />
                        Start Service
                      </Button>
                      <div className="grid grid-cols-2 gap-2">
                        {appointment.service_type === 'at_home' && (
                          <Button
                            onClick={() => handleNavigate(appointment.location)}
                            variant="outline"
                            size="sm"
                          >
                            <Navigation className="w-4 h-4 mr-2" />
                            Navigate
                          </Button>
                        )}
                        <Button
                          onClick={() => alert(`Calling ${appointment.customer_name}...`)}
                          variant="outline"
                          size="sm"
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Call
                        </Button>
                      </div>
                    </>
                  )}

                  {appointment.status === 'in_progress' && (
                    <>
                      <Button
                        onClick={() => handleCompleteService(appointment.id)}
                        size="sm"
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Complete Service
                      </Button>
                      <Button
                        onClick={() => alert(`Calling ${appointment.customer_name}...`)}
                        variant="outline"
                        size="sm"
                        className="w-full"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call Customer
                      </Button>
                    </>
                  )}

                  {appointment.status === 'completed' && (
                    <div className="bg-green-50 rounded-xl p-3 text-center">
                      <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                      <p className="text-sm font-medium text-green-900">Service Completed</p>
                      <p className="text-xs text-green-700 mt-1">Thank you for your excellent service!</p>
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
