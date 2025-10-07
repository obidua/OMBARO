import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Phone, MessageCircle, Navigation, Clock, CheckCircle, User, Home, Building2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Map } from '../ui/Map';
import { Location } from '../../types/booking';

interface OrderTrackingScreenProps {
  orderData: any;
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

export const OrderTrackingScreen: React.FC<OrderTrackingScreenProps> = ({
  orderData,
  onBack,
  onNavigate
}) => {
  const [therapistLocation, setTherapistLocation] = useState<Location>({
    latitude: 12.9700,
    longitude: 77.5900,
    address: 'En route to your location'
  });
  
  const [orderStatus, setOrderStatus] = useState<'confirmed' | 'therapist-assigned' | 'en-route' | 'arrived' | 'in-progress' | 'completed'>('confirmed');
  const [estimatedArrival, setEstimatedArrival] = useState('25 mins');

  // Mock therapist info
  const therapistInfo = {
    name: 'Priya Sharma',
    photo: 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=150',
    phone: '+91 98765 43210',
    rating: 4.9,
    experience: '5 years'
  };

  // Simulate order status updates
  useEffect(() => {
    const statusUpdates = [
      { status: 'therapist-assigned', delay: 2000 },
      { status: 'en-route', delay: 5000 },
      { status: 'arrived', delay: 15000 }
    ];

    statusUpdates.forEach(({ status, delay }) => {
      setTimeout(() => {
        setOrderStatus(status as any);
        if (status === 'en-route') {
          setEstimatedArrival('15 mins');
        } else if (status === 'arrived') {
          setEstimatedArrival('Arrived');
        }
      }, delay);
    });
  }, []);

  const serviceType = orderData?.serviceType || 'at_home';
  const isAtHome = serviceType === 'at_home';

  const getStatusInfo = () => {
    switch (orderStatus) {
      case 'confirmed':
        return {
          title: 'Booking Confirmed',
          description: isAtHome
            ? 'We are assigning a professional for your at-home appointment'
            : 'Your spa appointment has been confirmed',
          color: 'text-blue-600',
          bgColor: 'bg-blue-100'
        };
      case 'therapist-assigned':
        return {
          title: `${isAtHome ? 'Professional' : 'Therapist'} Assigned`,
          description: isAtHome
            ? 'Your professional is preparing to come to your location'
            : 'Your therapist is ready for your spa visit',
          color: 'text-purple-600',
          bgColor: 'bg-purple-100'
        };
      case 'en-route':
        return {
          title: 'On the Way',
          description: 'Your professional is traveling to your location',
          color: 'text-orange-600',
          bgColor: 'bg-orange-100'
        };
      case 'arrived':
        return {
          title: `${isAtHome ? 'Professional' : 'Therapist'} ${isAtHome ? 'Arrived' : 'Ready'}`,
          description: isAtHome
            ? 'Your professional has reached your location'
            : 'Your therapist is ready at the spa',
          color: 'text-green-600',
          bgColor: 'bg-green-100'
        };
      case 'in-progress':
        return {
          title: 'Service in Progress',
          description: isAtHome
            ? 'Your at-home service session is currently ongoing'
            : 'Your spa session is currently ongoing',
          color: 'text-indigo-600',
          bgColor: 'bg-indigo-100'
        };
      case 'completed':
        return {
          title: 'Service Completed',
          description: 'Thank you for choosing our service!',
          color: 'text-green-600',
          bgColor: 'bg-green-100'
        };
      default:
        return {
          title: 'Processing',
          description: 'Please wait...',
          color: 'text-gray-600',
          bgColor: 'bg-gray-100'
        };
    }
  };

  const statusInfo = getStatusInfo();

  const userLocation: Location = {
    latitude: 12.9716,
    longitude: 77.5946,
    address: orderData.customerInfo.address
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-[70px] pb-[70px]">
      {/* Header with Back Button */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={onBack}
            aria-label="Go back to previous screen"
            className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibent text-gray-900">Order Tracking</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Service Type Badge */}
        <div className={`rounded-xl p-4 ${isAtHome ? 'bg-blue-50 border border-blue-200' : 'bg-pink-50 border border-pink-200'}`}>
          <div className="flex items-center space-x-2">
            {isAtHome ? (
              <><Home className="w-5 h-5 text-blue-600" /><span className="font-medium text-blue-900">At Home Service</span></>
            ) : (
              <><Building2 className="w-5 h-5 text-pink-600" /><span className="font-medium text-pink-900">Spa Visit Service</span></>
            )}
          </div>
          <p className="text-sm text-gray-700 mt-1">
            {isAtHome
              ? 'Professional will arrive at your location'
              : 'Please arrive at the spa on time'
            }
          </p>
        </div>

        {/* Order Status */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${statusInfo.bgColor}`}>
              <CheckCircle className={`w-6 h-6 ${statusInfo.color}`} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{statusInfo.title}</h2>
              <p className="text-gray-600">{statusInfo.description}</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Estimated arrival:</span>
            </div>
            <span className="font-semibold text-purple-600">{estimatedArrival}</span>
          </div>
        </div>

        {/* Therapist Info */}
        {orderStatus !== 'confirmed' && (
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Therapist</h3>
            
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <img
                  src={therapistInfo.photo}
                  alt={therapistInfo.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{therapistInfo.name}</h4>
                <p className="text-sm text-gray-600">{therapistInfo.experience} experience</p>
                <div className="flex items-center space-x-1 mt-1">
                  <span className="text-sm text-yellow-600">★ {therapistInfo.rating}</span>
                  <span className="text-sm text-gray-500">• Certified Professional</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button variant="outline" className="flex-1">
                <Phone 
                  className="w-4 h-4 mr-2"
                  onClick={() => console.log('Call therapist')}
                />
                Call
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => onNavigate('chat', { therapistInfo: {
                  id: 'therapist1',
                  name: therapistInfo.name,
                  photo: therapistInfo.photo,
                  isOnline: true,
                  specialties: ['Massage Therapy']
                }})}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Message
              </Button>
            </div>
          </div>
        )}

        {/* Live Tracking Map - Only show for at-home services */}
        {isAtHome && orderStatus === 'en-route' && (
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Tracking</h3>
            <Map
              userLocation={userLocation}
              providers={[{
                id: 'therapist',
                name: therapistInfo.name,
                rating: therapistInfo.rating,
                reviewCount: 0,
                distance: 1.5,
                location: therapistLocation,
                image: therapistInfo.photo,
                isAvailable: true,
                specialties: [],
                priceRange: 'premium' as const,
                services: []
              }]}
              selectedProvider={null}
              onProviderSelect={() => {}}
              className="h-64"
            />
          </div>
        )}

        {/* Spa Location Info - Only show for spa visit services */}
        {!isAtHome && (
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Spa Location</h3>
            <div className="flex items-start space-x-3 bg-pink-50 border border-pink-200 rounded-xl p-4">
              <MapPin className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">{orderData?.spaAddress || 'Serenity Spa & Wellness'}</p>
                <p className="text-sm text-gray-600 mt-1">Please arrive 10 minutes before your appointment</p>
              </div>
            </div>
          </div>
        )}

        {/* Order Details */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Details</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Order ID:</span>
              <span className="font-medium">{orderData.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date & Time:</span>
              <span className="font-medium">{orderData.selectedDate} at {orderData.selectedTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Service Address:</span>
              <span className="font-medium text-right">{orderData.customerInfo.address}</span>
            </div>
            <div className="border-t border-gray-100 pt-3">
              <div className="flex justify-between">
                <span className="text-lg font-bold text-gray-900">Total Paid:</span>
                <span className="text-xl font-bold text-purple-600">₹{Math.round((orderData.totalAmount + 50) * 1.18)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Services Booked */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Services Booked</h3>
          
          <div className="space-y-3">
            {orderData.cartItems.map((item: any) => (
              <div key={`${item.service.id}-${item.provider.id}`} className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">{item.service.name}</p>
                  <p className="text-sm text-gray-600">{item.provider.name} • Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold text-purple-600">₹{item.service.price * item.quantity}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        {orderStatus === 'completed' ? (
          <div className="space-y-3">
            <Button
              onClick={() => onNavigate('home')}
              size="lg"
              className="w-full"
            >
              Book Another Service
            </Button>
            <Button
              onClick={() => onNavigate('review', orderData)}
              variant="outline"
              size="lg"
              className="w-full"
            >
              Rate Your Experience
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => onNavigate('support', orderData)}
            variant="outline"
            size="lg"
            className="w-full"
          >
            Need Help?
          </Button>
        )}
      </div>
    </div>
  );
};