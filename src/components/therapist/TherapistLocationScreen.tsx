import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Navigation, Activity, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Button } from '../ui/Button';

interface TherapistLocationScreenProps {
  onBack: () => void;
}

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: Date;
}

export const TherapistLocationScreen: React.FC<TherapistLocationScreenProps> = ({ onBack }) => {
  const [isTracking, setIsTracking] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null);
  const [locationHistory, setLocationHistory] = useState<LocationData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const startTracking = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setIsTracking(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const locationData: LocationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: new Date()
        };
        setCurrentLocation(locationData);
        setLocationHistory(prev => [locationData, ...prev].slice(0, 10));
      },
      (error) => {
        setError('Failed to get location. Please enable location services.');
        setIsTracking(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const stopTracking = () => {
    setIsTracking(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-[70px] pb-[70px]">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100 fixed top-0 left-0 right-0 z-10">
        <div className="flex items-center justify-between p-4 pt-12">
          <button
            onClick={onBack}
            className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Location Tracking</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="p-4 space-y-6 mt-4">
        {/* Tracking Status */}
        <div className={`rounded-2xl p-6 shadow-sm ${
          isTracking ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-white'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className={`flex items-center space-x-3 ${isTracking ? 'text-white' : 'text-gray-900'}`}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                isTracking ? 'bg-white/20' : 'bg-green-100'
              }`}>
                {isTracking ? (
                  <Activity className="w-6 h-6 animate-pulse" />
                ) : (
                  <MapPin className="w-6 h-6 text-green-600" />
                )}
              </div>
              <div>
                <h2 className="text-lg font-semibold">
                  {isTracking ? 'Location Tracking Active' : 'Location Tracking Inactive'}
                </h2>
                <p className={`text-sm ${isTracking ? 'text-white/90' : 'text-gray-600'}`}>
                  {isTracking ? 'Your location is being tracked' : 'Start tracking when you begin work'}
                </p>
              </div>
            </div>
          </div>

          {isTracking ? (
            <Button
              onClick={stopTracking}
              className="w-full bg-white text-green-600 hover:bg-gray-100"
            >
              Stop Tracking
            </Button>
          ) : (
            <Button
              onClick={startTracking}
              className="w-full"
            >
              <Navigation className="w-4 h-4 mr-2" />
              Start Tracking
            </Button>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-900">Location Error</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Current Location */}
        {currentLocation && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center space-x-2 mb-4">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <h2 className="text-lg font-semibold text-gray-900">Current Location</h2>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-600 mb-1">Latitude</p>
                  <p className="font-mono text-sm font-medium text-gray-900">
                    {currentLocation.latitude.toFixed(6)}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-600 mb-1">Longitude</p>
                  <p className="font-mono text-sm font-medium text-gray-900">
                    {currentLocation.longitude.toFixed(6)}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-600 mb-1">Accuracy</p>
                <p className="text-sm font-medium text-gray-900">
                  ±{currentLocation.accuracy.toFixed(0)} meters
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-600 mb-1">Last Updated</p>
                <p className="text-sm font-medium text-gray-900">
                  {currentLocation.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={() => window.open(`https://www.google.com/maps?q=${currentLocation.latitude},${currentLocation.longitude}`, '_blank')}
            >
              <MapPin className="w-4 h-4 mr-2" />
              View on Map
            </Button>
          </div>
        )}

        {/* Location History */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Location History</h2>
            <Clock className="w-5 h-5 text-purple-600" />
          </div>

          {locationHistory.length === 0 ? (
            <div className="text-center py-8">
              <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600">No location history yet</p>
              <p className="text-sm text-gray-500 mt-1">Start tracking to see your location history</p>
            </div>
          ) : (
            <div className="space-y-3">
              {locationHistory.map((location, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl p-4 hover:border-purple-300 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <MapPin className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-medium text-gray-900">
                          {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-xs text-gray-600">
                        <span>Accuracy: ±{location.accuracy.toFixed(0)}m</span>
                        <span>{location.timestamp.toLocaleTimeString()}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => window.open(`https://www.google.com/maps?q=${location.latitude},${location.longitude}`, '_blank')}
                      className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900">Why track location?</h3>
              <ul className="text-sm text-blue-700 mt-2 space-y-1">
                <li>• Helps us assign nearby service requests</li>
                <li>• Improves customer experience with accurate ETAs</li>
                <li>• Ensures safety and accountability</li>
                <li>• Only tracks when you're actively working</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
