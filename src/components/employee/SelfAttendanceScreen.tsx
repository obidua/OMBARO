import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Clock, Calendar, CheckCircle, XCircle, Coffee, Home, Navigation, Loader2, AlertCircle, User } from 'lucide-react';
import { Button } from '../ui/Button';
import { AttendanceRecord, AttendanceStatus, LocationTracking } from '../../types/hr';

interface SelfAttendanceScreenProps {
  employeeId: string;
  onBack: () => void;
}

export const SelfAttendanceScreen: React.FC<SelfAttendanceScreenProps> = ({
  employeeId,
  onBack
}) => {
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
    address: string;
  } | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [todayAttendance, setTodayAttendance] = useState<AttendanceRecord | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const today = new Date().toISOString().split('T')[0];
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });

  // Mock employee data
  const employee = {
    id: employeeId,
    name: 'John Doe',
    employeeId: 'EMP001',
    department: 'Operations',
    designation: 'Spa Manager',
    profilePhoto: 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=150'
  };

  // Get current location
  const getCurrentLocation = async () => {
    setLocationLoading(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser');
      setLocationLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Reverse geocoding (mock implementation)
          const address = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
          
          setCurrentLocation({
            latitude,
            longitude,
            address: `Location: ${address}`
          });
          setLocationLoading(false);
        } catch (error) {
          setLocationError('Failed to get address');
          setLocationLoading(false);
        }
      },
      (error) => {
        let errorMessage = 'Failed to get location';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied by user';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out';
            break;
        }
        setLocationError(errorMessage);
        setLocationLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  // Load current location on component mount
  useEffect(() => {
    getCurrentLocation();
    
    // Mock today's attendance data
    const mockAttendance: AttendanceRecord = {
      id: '1',
      employeeId,
      date: today,
      checkInTime: '09:15 AM',
      status: 'present',
      location: {
        latitude: 12.9716,
        longitude: 77.5946,
        address: 'MG Road, Bangalore'
      },
      workingHours: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Simulate existing attendance for today
    // setTodayAttendance(mockAttendance);
  }, [employeeId, today]);

  const handleCheckIn = async () => {
    if (!currentLocation) {
      setLocationError('Please enable location to check in');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newAttendance: AttendanceRecord = {
        id: Date.now().toString(),
        employeeId,
        date: today,
        checkInTime: currentTime,
        status: 'present',
        location: currentLocation,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setTodayAttendance(newAttendance);
      
      // Track location
      const locationTrack: LocationTracking = {
        id: Date.now().toString(),
        employeeId,
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        address: currentLocation.address,
        timestamp: new Date().toISOString(),
        activity: 'check_in'
      };
      
      console.log('Check-in successful:', newAttendance);
      console.log('Location tracked:', locationTrack);
      
    } catch (error) {
      console.error('Check-in failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCheckOut = async () => {
    if (!currentLocation || !todayAttendance) return;

    setIsProcessing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const checkInTime = new Date(`${today} ${todayAttendance.checkInTime}`);
      const checkOutTime = new Date();
      const workingHours = (checkOutTime.getTime() - checkInTime.getTime()) / (1000 * 60 * 60);
      
      const updatedAttendance: AttendanceRecord = {
        ...todayAttendance,
        checkOutTime: currentTime,
        workingHours: Math.round(workingHours * 100) / 100,
        updatedAt: new Date().toISOString()
      };
      
      setTodayAttendance(updatedAttendance);
      
      // Track location
      const locationTrack: LocationTracking = {
        id: Date.now().toString(),
        employeeId,
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        address: currentLocation.address,
        timestamp: new Date().toISOString(),
        activity: 'check_out'
      };
      
      console.log('Check-out successful:', updatedAttendance);
      console.log('Location tracked:', locationTrack);
      
    } catch (error) {
      console.error('Check-out failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleMarkStatus = async (status: AttendanceStatus) => {
    if (!currentLocation) {
      setLocationError('Please enable location to mark attendance');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newAttendance: AttendanceRecord = {
        id: Date.now().toString(),
        employeeId,
        date: today,
        status,
        location: currentLocation,
        notes: `Marked as ${status} by employee`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setTodayAttendance(newAttendance);
      console.log('Attendance marked:', newAttendance);
      
    } catch (error) {
      console.error('Failed to mark attendance:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getStatusColor = (status: AttendanceStatus) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-700 border-green-200';
      case 'late': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'absent': return 'bg-red-100 text-red-700 border-red-200';
      case 'half_day': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'leave': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'work_from_home': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: AttendanceStatus) => {
    switch (status) {
      case 'present': return <CheckCircle className="w-5 h-5" />;
      case 'late': return <Clock className="w-5 h-5" />;
      case 'absent': return <XCircle className="w-5 h-5" />;
      case 'half_day': return <Coffee className="w-5 h-5" />;
      case 'leave': return <Calendar className="w-5 h-5" />;
      case 'work_from_home': return <Home className="w-5 h-5" />;
      default: return <User className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 pt-12 pb-6 px-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            aria-label="Go back to employee dashboard"
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="text-center">
            <h1 className="text-xl font-bold text-white">Self Attendance</h1>
            <p className="text-white/90 text-sm">{new Date().toLocaleDateString('en-IN', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
          </div>
          <div className="w-10" />
        </div>

        {/* Employee Info */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <img
                src={employee.profilePhoto}
                alt={employee.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-white">
              <h2 className="text-lg font-semibold">{employee.name}</h2>
              <p className="text-white/80 text-sm">{employee.employeeId} • {employee.designation}</p>
              <p className="text-white/70 text-sm">{employee.department}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Current Location */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Current Location</h3>
            <button
              onClick={getCurrentLocation}
              disabled={locationLoading}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              {locationLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Navigation className="w-4 h-4" />
              )}
              <span>{locationLoading ? 'Getting...' : 'Refresh'}</span>
            </button>
          </div>

          {locationError ? (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <p className="text-red-800 font-medium">Location Error</p>
              </div>
              <p className="text-red-700 text-sm mt-1">{locationError}</p>
            </div>
          ) : currentLocation ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <MapPin className="w-5 h-5 text-green-600" />
                <p className="text-green-800 font-medium">Location Tagged</p>
              </div>
              <p className="text-green-700 text-sm">{currentLocation.address}</p>
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div>
                  <p className="text-xs text-green-600">Latitude</p>
                  <p className="font-mono text-sm text-green-800">{currentLocation.latitude.toFixed(6)}</p>
                </div>
                <div>
                  <p className="text-xs text-green-600">Longitude</p>
                  <p className="font-mono text-sm text-green-800">{currentLocation.longitude.toFixed(6)}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <p className="text-gray-600">Location not available</p>
            </div>
          )}
        </div>

        {/* Today's Attendance Status */}
        {todayAttendance ? (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Attendance</h3>
            
            <div className={`border-2 rounded-xl p-4 ${getStatusColor(todayAttendance.status)}`}>
              <div className="flex items-center space-x-3 mb-3">
                {getStatusIcon(todayAttendance.status)}
                <span className="font-semibold capitalize">{todayAttendance.status.replace('_', ' ')}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                {todayAttendance.checkInTime && (
                  <div>
                    <p className="font-medium">Check In</p>
                    <p>{todayAttendance.checkInTime}</p>
                  </div>
                )}
                {todayAttendance.checkOutTime && (
                  <div>
                    <p className="font-medium">Check Out</p>
                    <p>{todayAttendance.checkOutTime}</p>
                  </div>
                )}
                {todayAttendance.workingHours && (
                  <div>
                    <p className="font-medium">Working Hours</p>
                    <p>{todayAttendance.workingHours} hours</p>
                  </div>
                )}
                {todayAttendance.location && (
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-xs">{todayAttendance.location.address}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Check Out Button */}
            {todayAttendance.status === 'present' && !todayAttendance.checkOutTime && (
              <Button
                onClick={handleCheckOut}
                loading={isProcessing}
                disabled={!currentLocation}
                size="lg"
                className="w-full mt-4"
              >
                <XCircle className="w-5 h-5 mr-2" />
                Check Out
              </Button>
            )}
          </div>
        ) : (
          /* Attendance Actions */
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Mark Attendance</h3>
            
            {/* Check In Button */}
            <Button
              onClick={handleCheckIn}
              loading={isProcessing}
              disabled={!currentLocation}
              size="lg"
              className="w-full mb-4"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Check In
            </Button>

            {/* Quick Status Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => handleMarkStatus('half_day')}
                loading={isProcessing}
                disabled={!currentLocation}
                variant="outline"
                size="sm"
              >
                <Coffee className="w-4 h-4 mr-2" />
                Half Day
              </Button>
              
              <Button
                onClick={() => handleMarkStatus('work_from_home')}
                loading={isProcessing}
                disabled={!currentLocation}
                variant="outline"
                size="sm"
              >
                <Home className="w-4 h-4 mr-2" />
                Work From Home
              </Button>
            </div>

            {!currentLocation && (
              <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-xl p-3">
                <p className="text-yellow-800 text-sm">
                  Please enable location access to mark attendance
                </p>
              </div>
            )}
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">22</p>
              <p className="text-sm text-gray-600">Days Present</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">8.5</p>
              <p className="text-sm text-gray-600">Avg Hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};