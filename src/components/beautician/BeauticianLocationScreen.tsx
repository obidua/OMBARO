import React, { useState } from 'react';
import { ArrowLeft, MapPin, Navigation, Clock, CheckCircle, Radio } from 'lucide-react';
import { Button } from '../ui/Button';

interface BeauticianLocationScreenProps {
  beauticianId: string;
  onBack: () => void;
}

export const BeauticianLocationScreen: React.FC<BeauticianLocationScreenProps> = ({
  beauticianId,
  onBack
}) => {
  const [locationSharing, setLocationSharing] = useState(true);
  const [currentLocation] = useState({
    latitude: 12.9716,
    longitude: 77.5946,
    address: 'Indiranagar, Bangalore',
    lastUpdated: new Date().toLocaleTimeString()
  });

  const [upcomingAtHomeAppointments] = useState([
    {
      id: '1',
      customer_name: 'Sneha Reddy',
      service_name: 'Bridal Makeup',
      time: '10:00 AM',
      address: '123, Indiranagar, Bangalore - 560038',
      latitude: 12.9716,
      longitude: 77.5946,
      distance: '2.5 km',
      eta: '15 mins'
    },
    {
      id: '2',
      customer_name: 'Priya Sharma',
      service_name: 'Facial & Cleanup',
      time: '5:00 PM',
      address: '456, Koramangala, Bangalore - 560034',
      latitude: 12.9352,
      longitude: 77.6245,
      distance: '5.2 km',
      eta: '25 mins'
    }
  ]);

  const [locationHistory] = useState([
    {
      id: '1',
      date: new Date(Date.now() - 86400000).toLocaleDateString(),
      appointments: 3,
      totalDistance: '15.5 km',
      areas: ['Indiranagar', 'Koramangala', 'Whitefield']
    },
    {
      id: '2',
      date: new Date(Date.now() - 172800000).toLocaleDateString(),
      appointments: 2,
      totalDistance: '8.2 km',
      areas: ['MG Road', 'Indiranagar']
    }
  ]);

  const handleNavigate = (appointment: any) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${appointment.latitude},${appointment.longitude}`;
    window.open(url, '_blank');
  };

  const toggleLocationSharing = () => {
    setLocationSharing(!locationSharing);
    if (!locationSharing) {
      alert('Location sharing enabled. Your location will be visible to customers during active appointments.');
    } else {
      alert('Location sharing disabled. Customers will not be able to track your location.');
    }
  };

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
          <h1 className="text-lg font-semibold text-gray-900">Location Tracking</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold text-gray-900">Location Sharing</h2>
              <p className="text-sm text-gray-600">Share location during appointments</p>
            </div>
            <button
              onClick={toggleLocationSharing}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                locationSharing ? 'bg-pink-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  locationSharing ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {locationSharing && (
            <div className="bg-pink-50 border border-pink-200 rounded-xl p-3">
              <div className="flex items-start space-x-3">
                <Radio className="w-5 h-5 text-pink-600 mt-0.5 animate-pulse" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-pink-900">Location Sharing Active</p>
                  <p className="text-xs text-pink-700 mt-1">
                    Your location is being shared with customers during active appointments
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-start space-x-3 mb-4">
            <MapPin className="w-5 h-5 text-pink-600 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-base font-semibold text-gray-900 mb-1">Current Location</h3>
              <p className="text-sm text-gray-600">{currentLocation.address}</p>
              <p className="text-xs text-gray-500 mt-1">
                Last updated: {currentLocation.lastUpdated}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl h-48 flex items-center justify-center border border-gray-200">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Map View</p>
              <p className="text-xs text-gray-500">Location: {currentLocation.address}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Upcoming At-Home Appointments</h3>

          {upcomingAtHomeAppointments.length === 0 ? (
            <div className="text-center py-8">
              <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-600">No upcoming at-home appointments</p>
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingAtHomeAppointments.map(appointment => (
                <div
                  key={appointment.id}
                  className="border border-gray-200 rounded-xl p-4"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{appointment.customer_name}</h4>
                      <p className="text-sm text-gray-600">{appointment.service_name}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{appointment.time}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-pink-600">{appointment.distance}</div>
                      <div className="text-xs text-gray-600">{appointment.eta}</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 bg-gray-50 rounded-lg p-3 mb-3">
                    <MapPin className="w-4 h-4 text-gray-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700 flex-1">{appointment.address}</p>
                  </div>

                  <Button
                    onClick={() => handleNavigate(appointment)}
                    size="sm"
                    className="w-full"
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Navigate to Location
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Location History</h3>

          <div className="space-y-3">
            {locationHistory.map(history => (
              <div
                key={history.id}
                className="border border-gray-200 rounded-xl p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-gray-900">{history.date}</span>
                  </div>
                  <span className="text-sm text-gray-600">{history.appointments} appointments</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Total Distance</span>
                    <span className="font-medium text-gray-900">{history.totalDistance}</span>
                  </div>
                  <div className="flex items-start justify-between text-sm">
                    <span className="text-gray-600">Areas Covered</span>
                    <span className="font-medium text-gray-900 text-right">{history.areas.join(', ')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h4 className="font-medium text-blue-900 mb-2">Location Privacy</h4>
          <p className="text-sm text-blue-800">
            Your location is only shared with customers during active appointments.
            We respect your privacy and never share your location outside of service hours.
          </p>
        </div>
      </div>
    </div>
  );
};
