import React, { useState } from 'react';
import { ArrowLeft, Bell, CheckCircle, Clock, Gift, MapPin, Star, Trash2, Settings } from 'lucide-react';
import { Button } from '../ui/Button';

interface Notification {
  id: string;
  type: 'booking' | 'offer' | 'reminder' | 'review' | 'system';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
  icon?: React.ReactNode;
}

interface NotificationScreenProps {
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

export const NotificationScreen: React.FC<NotificationScreenProps> = ({
  onBack,
  onNavigate
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'booking',
      title: 'Booking Confirmed',
      message: 'Your Swedish massage appointment at Serenity Spa is confirmed for Jan 15, 2:30 PM',
      timestamp: '2 hours ago',
      isRead: false,
      icon: <CheckCircle className="w-5 h-5 text-green-600" />
    },
    {
      id: '2',
      type: 'reminder',
      title: 'Appointment Reminder',
      message: 'Your appointment is tomorrow at 2:30 PM. Therapist Priya will arrive 15 minutes early.',
      timestamp: '1 day ago',
      isRead: false,
      icon: <Clock className="w-5 h-5 text-blue-600" />
    },
    {
      id: '3',
      type: 'offer',
      title: 'Special Offer',
      message: '20% off on all spa services this weekend. Use code WEEKEND20',
      timestamp: '2 days ago',
      isRead: true,
      icon: <Gift className="w-5 h-5 text-purple-600" />
    },
    {
      id: '4',
      type: 'review',
      title: 'Rate Your Experience',
      message: 'How was your massage session with Priya? Share your feedback.',
      timestamp: '3 days ago',
      isRead: true,
      icon: <Star className="w-5 h-5 text-yellow-600" />
    },
    {
      id: '5',
      type: 'system',
      title: 'New Spa Added',
      message: 'Luxury Wellness Center is now available in your area. Check it out!',
      timestamp: '1 week ago',
      isRead: true,
      icon: <MapPin className="w-5 h-5 text-indigo-600" />
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filteredNotifications = notifications.filter(notification => 
    filter === 'all' || !notification.isRead
  );

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const handleDeleteNotification = (notificationId: string) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== notificationId)
    );
  };

  const handleNotificationPress = (notification: Notification) => {
    if (!notification.isRead) {
      handleMarkAsRead(notification.id);
    }

    // Navigate based on notification type
    switch (notification.type) {
      case 'booking':
        onNavigate('bookings');
        break;
      case 'offer':
        onNavigate('home'); // Navigate to offers section
        break;
      case 'reminder':
        onNavigate('bookings');
        break;
      case 'review':
        onNavigate('reviewScreen', { /* booking data */ });
        break;
      case 'system':
        onNavigate('home');
        break;
      default:
        console.log('Notification pressed:', notification.id);
    }
  };

  const getNotificationTypeColor = (type: string) => {
    switch (type) {
      case 'booking': return 'bg-green-100';
      case 'offer': return 'bg-purple-100';
      case 'reminder': return 'bg-blue-100';
      case 'review': return 'bg-yellow-100';
      case 'system': return 'bg-indigo-100';
      default: return 'bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-[70px] pb-[70px]">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={onBack}
            aria-label="Go back to profile screen"
            className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div className="text-center">
            <h1 className="text-lg font-semibold text-gray-900">Notifications</h1>
            {unreadCount > 0 && (
              <p className="text-sm text-purple-600">{unreadCount} unread</p>
            )}
          </div>
          <button
            onClick={() => console.log('Notification settings')}
            aria-label="Notification settings"
            className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <Settings className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Filter and Actions */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setFilter('all')}
                className={`py-2 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
                  filter === 'all' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-600'
                }`}
              >
                All ({notifications.length})
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`py-2 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
                  filter === 'unread' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-600'
                }`}
              >
                Unread ({unreadCount})
              </button>
            </div>
            
            {unreadCount > 0 && (
              <Button
                onClick={handleMarkAllAsRead}
                variant="outline"
                size="sm"
              >
                Mark All Read
              </Button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <button
                key={notification.id}
                onClick={() => handleNotificationPress(notification)}
                className={`w-full bg-white rounded-2xl p-4 shadow-sm border-2 transition-all duration-200 text-left ${
                  notification.isRead 
                    ? 'border-gray-100 hover:border-gray-200' 
                    : 'border-purple-200 bg-purple-50/30'
                }`}
              >
                <div className="flex space-x-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${getNotificationTypeColor(notification.type)}`}>
                    {notification.icon || <Bell className="w-5 h-5 text-gray-600" />}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className={`font-semibold ${notification.isRead ? 'text-gray-900' : 'text-gray-900'}`}>
                        {notification.title}
                      </h3>
                      <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteNotification(notification.id);
                          }}
                          className="w-6 h-6 bg-red-100 rounded-lg flex items-center justify-center hover:bg-red-200 transition-colors"
                          aria-label="Delete notification"
                        >
                          <Trash2 className="w-3 h-3 text-red-600" />
                        </button>
                      </div>
                    </div>
                    <p className={`text-sm mb-2 ${notification.isRead ? 'text-gray-600' : 'text-gray-700'}`}>
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500">{notification.timestamp}</p>
                  </div>
                </div>
              </button>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {filter === 'unread' ? 'No unread notifications' : 'No notifications'}
              </h3>
              <p className="text-gray-600">
                {filter === 'unread' 
                  ? 'All caught up! Check back later for updates.'
                  : 'We\'ll notify you about bookings, offers, and updates here.'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};