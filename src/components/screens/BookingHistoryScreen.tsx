import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, MapPin, Star, Phone, MessageCircle, RotateCcw } from 'lucide-react';
import { Button } from '../ui/Button';
import { Tabs } from '../ui/Tabs';

interface BookingHistoryScreenProps {
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

interface Booking {
  id: string;
  salonName: string;
  serviceName: string;
  date: string;
  time: string;
  duration: number;
  price: number;
  status: 'upcoming' | 'completed' | 'cancelled' | 'in-progress';
  therapistName?: string;
  therapistPhoto?: string;
  salonImage: string;
  address: string;
  rating?: number;
  canReschedule: boolean;
  canCancel: boolean;
}

export const BookingHistoryScreen: React.FC<BookingHistoryScreenProps> = ({
  onBack,
  onNavigate
}) => {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([
    {
      id: 'BK001',
      salonName: 'Serenity Spa & Wellness',
      serviceName: 'Swedish Full Body Massage',
      date: '2025-01-15',
      time: '14:30',
      duration: 90,
      price: 2500,
      status: 'upcoming',
      therapistName: 'Priya Sharma',
      therapistPhoto: 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=150',
      salonImage: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=300',
      address: 'MG Road, Bangalore',
      canReschedule: true,
      canCancel: true
    },
    {
      id: 'BK002',
      salonName: 'Bliss Body Spa',
      serviceName: 'Aromatherapy Spa Treatment',
      date: '2025-01-18',
      time: '16:00',
      duration: 150,
      price: 4500,
      status: 'upcoming',
      therapistName: 'Anita Desai',
      therapistPhoto: 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=150',
      salonImage: 'https://images.pexels.com/photos/3738673/pexels-photo-3738673.jpeg?auto=compress&cs=tinysrgb&w=300',
      address: 'Koramangala, Bangalore',
      canReschedule: true,
      canCancel: true
    }
  ]);

  // Mock past booking data

  const pastBookings: Booking[] = [
    {
      id: 'BK003',
      salonName: 'Ayurvedic Wellness Center',
      serviceName: 'Deep Tissue Massage',
      date: '2025-01-08',
      time: '11:00',
      duration: 120,
      price: 3200,
      status: 'completed',
      therapistName: 'Rahul Kumar',
      therapistPhoto: 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=150',
      salonImage: 'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=300',
      address: 'Indiranagar, Bangalore',
      rating: 5,
      canReschedule: false,
      canCancel: false
    },
    {
      id: 'BK004',
      salonName: 'Serenity Spa & Wellness',
      serviceName: 'Hot Stone Massage',
      date: '2025-01-02',
      time: '15:30',
      duration: 100,
      price: 2800,
      status: 'completed',
      therapistName: 'Meera Patel',
      therapistPhoto: 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=150',
      salonImage: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=300',
      address: 'MG Road, Bangalore',
      rating: 4,
      canReschedule: false,
      canCancel: false
    },
    {
      id: 'BK005',
      salonName: 'Bliss Body Spa',
      serviceName: 'Reflexology Treatment',
      date: '2024-12-28',
      time: '10:00',
      duration: 60,
      price: 1800,
      status: 'cancelled',
      salonImage: 'https://images.pexels.com/photos/3738673/pexels-photo-3738673.jpeg?auto=compress&cs=tinysrgb&w=300',
      address: 'Koramangala, Bangalore',
      canReschedule: false,
      canCancel: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      case 'in-progress': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short' 
    });
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };

  const handleBookingPress = (booking: Booking) => {
    setSelectedBooking(booking);
  };

  const handleReschedule = (booking: Booking) => {
    onNavigate('rescheduleBooking', booking);
  };

  const handleCancel = (booking: Booking) => {
    console.log('Cancel booking:', booking.id);
    // TODO: Implement cancellation functionality
    // This would typically:
    // 1. Show cancellation policy and fees
    // 2. Confirm cancellation with user
    // 3. Call API to cancel booking
    // 4. Process any refunds
    const confirmed = window.confirm('Are you sure you want to cancel this booking?');
    if (confirmed) {
      alert('Booking cancelled successfully!');
      // In real app, update the booking status and refresh the list
    }
  };

  const handleRebook = (booking: Booking) => {
    console.log('Rebook service:', booking.id);
    // Navigate to map view to find similar services
    onNavigate('mapView', { searchQuery: booking.serviceName });
  };

  const handleRate = (booking: Booking) => {
    console.log('Rate booking:', booking.id);
    onNavigate('reviewScreen', {
      id: booking.id,
      serviceName: booking.serviceName,
      salonName: booking.salonName,
      therapistName: booking.therapistName,
      date: booking.date,
      time: booking.time,
      salonImage: booking.salonImage
    });
  };

  const updateBooking = (bookingId: string, newDate: string, newTime: string) => {
    setUpcomingBookings(prev => 
      prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, date: newDate, time: newTime }
          : booking
      )
    );
  };

  const BookingCard: React.FC<{ booking: Booking; onPress: (booking: Booking) => void }> = ({ 
    booking, 
    onPress 
  }) => (
    <button
      onClick={() => onPress(booking)}
      aria-label={`View details for ${booking.serviceName} at ${booking.salonName} on ${formatDate(booking.date)}`}
      className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 w-full"
    >
      <div className="flex space-x-4">
        {/* Salon Image */}
        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
          <img
            src={booking.salonImage}
            alt={booking.salonName}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Booking Details */}
        <div className="flex-1 text-left">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-gray-900">{booking.serviceName}</h3>
              <p className="text-sm text-gray-600">{booking.salonName}</p>
            </div>
            <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(booking.status)}`}>
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </span>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(booking.date)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{booking.time}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <MapPin className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-600">{booking.address}</span>
            </div>
            <span className="font-semibold text-purple-600">₹{booking.price}</span>
          </div>

          {booking.rating && (
            <div className="flex items-center space-x-1 mt-2">
              <span className="text-xs text-gray-500">Your rating:</span>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${i < booking.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </button>
  );

  const BookingDetailModal: React.FC<{ booking: Booking; onClose: () => void }> = ({ 
    booking, 
    onClose 
  }) => (
    <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
      <div className="bg-white rounded-t-3xl w-full max-w-md max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Booking Details</h2>
            <button
              onClick={onClose}
              aria-label="Close booking details"
              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6">
          {/* Service Info */}
          <div className="flex space-x-4">
            <div className="w-20 h-20 rounded-xl overflow-hidden">
              <img src={booking.salonImage} alt={booking.salonName} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-lg">{booking.serviceName}</h3>
              <p className="text-gray-600">{booking.salonName}</p>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(booking.status)}`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
                <span className="text-sm font-semibold text-purple-600">₹{booking.price}</span>
              </div>
            </div>
          </div>

          {/* Booking Details */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Booking ID:</span>
              <span className="font-medium">{booking.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date & Time:</span>
              <span className="font-medium">{formatDate(booking.date)} at {booking.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Duration:</span>
              <span className="font-medium">{formatDuration(booking.duration)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Location:</span>
              <span className="font-medium text-right">{booking.address}</span>
            </div>
          </div>

          {/* Therapist Info */}
          {booking.therapistName && (
            <div className="bg-purple-50 rounded-xl p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Your Therapist</h4>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img src={booking.therapistPhoto} alt={booking.therapistName} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{booking.therapistName}</p>
                  <p className="text-sm text-gray-600">Certified Professional</p>
                </div>
                <div className="flex space-x-2">
                  <button 
                    className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center hover:bg-blue-200 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Call therapist');
                    }}
                  >
                    <Phone className="w-4 h-4 text-blue-600" />
                  </button>
                  <button 
                    className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate('chat', { therapistInfo: {
                        id: booking.therapistName || 'therapist1',
                        name: booking.therapistName || 'Therapist',
                        photo: booking.therapistPhoto || 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=150',
                        isOnline: true,
                        specialties: ['Massage Therapy']
                      }});
                    }}
                  >
                    <MessageCircle className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            {booking.status === 'upcoming' && (
              <>
                {booking.canReschedule && (
                  <Button
                    onClick={() => handleReschedule(booking)}
                    variant="outline"
                    size="lg"
                    className="w-full"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Reschedule
                  </Button>
                )}
                {booking.canCancel && (
                  <Button
                    onClick={() => handleCancel(booking)}
                    variant="outline"
                    size="lg"
                    className="w-full text-red-600 border-red-200 hover:bg-red-50"
                  >
                    Cancel Booking
                  </Button>
                )}
              </>
            )}

            {booking.status === 'completed' && (
              <>
                {!booking.rating && (
                  <Button
                    onClick={() => handleRate(booking)}
                    size="lg"
                    className="w-full"
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Rate Experience
                  </Button>
                )}
                <Button
                  onClick={() => handleRebook(booking)}
                  variant="outline"
                  size="lg"
                  className="w-full"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Book Again
                </Button>
              </>
            )}

            {booking.status === 'cancelled' && (
              <Button
                onClick={() => handleRebook(booking)}
                size="lg"
                className="w-full"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Book Similar Service
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const upcomingTab = {
    id: 'upcoming',
    label: `Upcoming (${upcomingBookings.length})`,
    content: (
      <div className="space-y-4">
        {upcomingBookings.length > 0 ? (
          upcomingBookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onPress={handleBookingPress}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Upcoming Bookings</h3>
            <p className="text-gray-600 mb-6">Book your next spa session to relax and rejuvenate</p>
            <Button onClick={() => onNavigate('mapView')}>
              Book Now
            </Button>
          </div>
        )}
      </div>
    )
  };

  const pastTab = {
    id: 'past',
    label: `Past (${pastBookings.length})`,
    content: (
      <div className="space-y-4">
        {pastBookings.map((booking) => (
          <BookingCard
            key={booking.id}
            booking={booking}
            onPress={handleBookingPress}
          />
        ))}
      </div>
    )
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-[70px] pb-[70px]">
      {/* Header with Back Button */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={onBack}
            aria-label="Go back to home screen"
            className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">My Bookings</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="p-4">
        <Tabs
          tabs={[upcomingTab, pastTab]}
          defaultTab="upcoming"
        />
      </div>

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <BookingDetailModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}
    </div>
  );
};