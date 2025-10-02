import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Phone, Star, Navigation, Clock, CheckCircle, User } from 'lucide-react';
import { Button } from '../ui/Button';

interface TherapistTrackingScreenProps {
  assignment: any;
  onBack: () => void;
}

export const TherapistTrackingScreen: React.FC<TherapistTrackingScreenProps> = ({
  assignment,
  onBack
}) => {
  const [therapistLocation, setTherapistLocation] = useState({
    latitude: 12.9716,
    longitude: 77.5946,
    address: 'En route to your location'
  });

  const [estimatedArrival, setEstimatedArrival] = useState('15 mins');
  const [status, setStatus] = useState<'on_way' | 'arrived' | 'in_progress' | 'completed'>('on_way');

  // Simulate real-time location updates
  useEffect(() => {
    const interval = setInterval(() => {
      // In real app, this would fetch from Supabase therapist_locations table
      setTherapistLocation(prev => ({
        ...prev,
        latitude: prev.latitude + 0.001,
        longitude: prev.longitude + 0.001
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusInfo = () => {
    switch (status) {
      case 'on_way':
        return {
          icon: Navigation,
          color: 'bg-blue-100 text-blue-700',
          label: 'On the way',
          message: 'Your therapist is heading to your location'
        };
      case 'arrived':
        return {
          icon: MapPin,
          color: 'bg-green-100 text-green-700',
          label: 'Arrived',
          message: 'Your therapist has arrived at your location'
        };
      case 'in_progress':
        return {
          icon: Clock,
          color: 'bg-yellow-100 text-yellow-700',
          label: 'Service in progress',
          message: 'Your session is currently underway'
        };
      case 'completed':
        return {
          icon: CheckCircle,
          color: 'bg-green-100 text-green-700',
          label: 'Completed',
          message: 'Service has been completed successfully'
        };
    }
  };

  const statusInfo = getStatusInfo();
  const StatusIcon = statusInfo.icon;

  return (
    <div className="min-h-screen bg-gray-50">
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
          <h1 className="text-lg font-semibold text-gray-900">Track Therapist</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Status Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center space-x-4 mb-4">
            <div className={`w-14 h-14 ${statusInfo.color} rounded-full flex items-center justify-center`}>
              <StatusIcon className="w-7 h-7" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900">{statusInfo.label}</h2>
              <p className="text-gray-600">{statusInfo.message}</p>
            </div>
          </div>

          {status === 'on_way' && (
            <div className="bg-blue-50 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="text-blue-900 font-medium">Estimated arrival</span>
              </div>
              <span className="text-blue-900 font-bold text-lg">{estimatedArrival}</span>
            </div>
          )}
        </div>

        {/* Map Placeholder */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="relative h-64 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-purple-600 mx-auto mb-3" />
              <p className="text-gray-700 font-medium">Live Map View</p>
              <p className="text-sm text-gray-600">Real-time location tracking</p>
            </div>
            {/* In real app, integrate Google Maps or Mapbox here */}
          </div>
          <div className="p-4 bg-gray-50">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-gray-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Current Location</p>
                <p className="text-sm text-gray-600">{therapistLocation.address}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Lat: {therapistLocation.latitude.toFixed(4)}, Long: {therapistLocation.longitude.toFixed(4)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Therapist Info */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Therapist</h3>
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">PS</span>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 text-lg">Priya Sharma</h4>
              <div className="flex items-center space-x-2 mt-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm text-gray-600">4.8 (156 reviews)</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">5 years experience</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs px-3 py-1 bg-purple-100 text-purple-700 rounded-full">
              Swedish Massage
            </span>
            <span className="text-xs px-3 py-1 bg-purple-100 text-purple-700 rounded-full">
              Deep Tissue
            </span>
            <span className="text-xs px-3 py-1 bg-purple-100 text-purple-700 rounded-full">
              Aromatherapy
            </span>
          </div>

          <Button
            onClick={() => alert('Calling therapist...')}
            variant="outline"
            className="w-full"
          >
            <Phone className="w-4 h-4 mr-2" />
            Call Therapist
          </Button>
        </div>

        {/* Service Details */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Service</span>
              <span className="font-medium text-gray-900">Swedish Full Body Massage</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Duration</span>
              <span className="font-medium text-gray-900">90 minutes</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Scheduled Time</span>
              <span className="font-medium text-gray-900">Today, 2:30 PM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Amount</span>
              <span className="font-medium text-green-600">₹2,500</span>
            </div>
          </div>
        </div>

        {/* Your Location */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Location</h3>
          <div className="flex items-start space-x-3">
            <MapPin className="w-5 h-5 text-gray-600 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">Your Address</p>
              <p className="text-sm text-gray-600 mt-1">
                123, MG Road, Koramangala,<br />
                Bangalore - 560034, Karnataka
              </p>
            </div>
          </div>
        </div>

        {/* Demo Status Change Buttons */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-blue-900 mb-3">Demo Controls (For Testing)</h4>
          <div className="grid grid-cols-2 gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setStatus('on_way')}
            >
              On the way
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setStatus('arrived')}
            >
              Arrived
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setStatus('in_progress')}
            >
              In Progress
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setStatus('completed')}
            >
              Completed
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
