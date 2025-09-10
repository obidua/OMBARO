import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';

interface Booking {
  id: string;
  salonName: string;
  serviceName: string;
  date: string;
  time: string;
  duration: number;
  price: number;
  status: string;
  therapistName?: string;
  therapistPhoto?: string;
  salonImage: string;
  address: string;
}

interface RescheduleBookingScreenProps {
  bookingData: Booking;
  onConfirm: (newDate: string, newTime: string) => void;
  onCancel: () => void;
}

export const RescheduleBookingScreen: React.FC<RescheduleBookingScreenProps> = ({
  bookingData,
  onConfirm,
  onCancel
}) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Generate available time slots
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'
  ];

  // Get today's date for min date
  const today = new Date().toISOString().split('T')[0];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long',
      year: 'numeric'
    });
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };

  const handleConfirmReschedule = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onConfirm(selectedDate, selectedTime);
    setIsLoading(false);
  };

  const isFormValid = selectedDate && selectedTime;

  return (
    <div className="min-h-screen bg-gray-50 pt-[120px] pb-[70px]">
      <div className="p-4 space-y-6">
        {/* Current Booking Details */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Booking</h2>
          
          <div className="flex space-x-4 mb-4">
            <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
              <img
                src={bookingData.salonImage}
                alt={bookingData.salonName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{bookingData.serviceName}</h3>
              <p className="text-gray-600">{bookingData.salonName}</p>
              <p className="text-sm text-gray-500">{bookingData.address}</p>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span className="font-medium text-blue-900">Current Schedule</span>
            </div>
            <p className="text-blue-800">
              <strong>{formatDate(bookingData.date)}</strong> at <strong>{bookingData.time}</strong>
            </p>
            <p className="text-sm text-blue-700 mt-1">
              Duration: {formatDuration(bookingData.duration)} • Amount: ₹{bookingData.price}
            </p>
          </div>
        </div>

        {/* Reschedule Policy */}
        <div className="bg-yellow-50 rounded-2xl p-4 border border-yellow-200">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-yellow-900 mb-2">Reschedule Policy</h3>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• Free reschedule up to 24 hours before appointment</li>
                <li>• Reschedule within 24 hours may incur a ₹200 fee</li>
                <li>• Subject to therapist availability</li>
                <li>• Maximum 2 reschedules per booking</li>
              </ul>
            </div>
          </div>
        </div>

        {/* New Date & Time Selection */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Select New Date & Time</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={today}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Time</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedTime === time
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* New Schedule Preview */}
        {selectedDate && selectedTime && (
          <div className="bg-green-50 rounded-2xl p-4 border border-green-200">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="font-medium text-green-900">New Schedule</span>
            </div>
            <p className="text-green-800">
              <strong>{formatDate(selectedDate)}</strong> at <strong>{selectedTime}</strong>
            </p>
            <p className="text-sm text-green-700 mt-1">
              Please confirm this new schedule for your appointment
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleConfirmReschedule}
            disabled={!isFormValid}
            loading={isLoading}
            size="lg"
            className="w-full"
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Confirm Reschedule
          </Button>
          
          <Button
            onClick={onCancel}
            variant="outline"
            size="lg"
            className="w-full"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Cancel & Go Back
          </Button>
          
          {!isFormValid && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
              <p className="text-yellow-800 text-sm text-center">
                Please select both a new date and time to proceed with rescheduling.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};