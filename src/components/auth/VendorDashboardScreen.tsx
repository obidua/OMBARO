import React, { useState } from 'react';
import { LogOut, Package, BarChart3, Settings, Users, Calendar, Star, TrendingUp, Clock, CreditCard as Edit, Plus, Eye, DollarSign, MessageSquare, Home, Building2 } from 'lucide-react';
import { Button } from '../ui/Button';

interface VendorDashboardScreenProps {
  onLogout: () => void;
  user: any;
  onNavigate?: (screen: string, data?: any) => void;
}

export const VendorDashboardScreen: React.FC<VendorDashboardScreenProps> = ({
  onLogout,
  user,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Active Services', value: '24', icon: Package, color: 'bg-blue-100 text-blue-600', change: '+3 this month' },
    { label: 'Monthly Revenue', value: '₹45,280', icon: DollarSign, color: 'bg-green-100 text-green-600', change: '+18% growth' },
    { label: 'Total Bookings', value: '156', icon: Calendar, color: 'bg-purple-100 text-purple-600', change: '+12 this week' },
    { label: 'Customer Rating', value: '4.8', icon: Star, color: 'bg-yellow-100 text-yellow-600', change: '98% positive' },
  ];

  const services = [
    { id: 1, name: 'Swedish Full Body Massage', price: 2500, duration: 90, bookings: 45, rating: 4.9, status: 'Active' },
    { id: 2, name: 'Deep Tissue Massage', price: 3200, duration: 120, bookings: 38, rating: 4.8, status: 'Active' },
    { id: 3, name: 'Aromatherapy Session', price: 4500, duration: 150, bookings: 22, rating: 4.7, status: 'Active' },
    { id: 4, name: 'Hot Stone Therapy', price: 2800, duration: 100, bookings: 31, rating: 4.6, status: 'Paused' },
    { id: 5, name: 'Couples Massage', price: 6500, duration: 120, bookings: 18, rating: 4.9, status: 'Active' },
  ];

  const upcomingBookings = [
    { id: 1, service: 'Swedish Massage', customer: 'Priya S.', time: '10:00 AM', date: 'Today', status: 'Confirmed', type: 'at_home', address: 'MG Road, Bangalore' },
    { id: 2, service: 'Deep Tissue', customer: 'Rahul K.', time: '2:30 PM', date: 'Today', status: 'Confirmed', type: 'visit_spa', address: 'In-house' },
    { id: 3, service: 'Aromatherapy', customer: 'Anita D.', time: '4:00 PM', date: 'Tomorrow', status: 'Pending', type: 'at_home', address: 'Koramangala, Bangalore' },
    { id: 4, service: 'Hot Stone', customer: 'Vikram M.', time: '11:00 AM', date: 'Tomorrow', status: 'Confirmed', type: 'visit_spa', address: 'In-house' },
  ];

  const recentReviews = [
    { id: 1, customer: 'Priya Sharma', service: 'Swedish Massage', rating: 5, comment: 'Absolutely amazing experience! Very professional and relaxing.', date: '2 days ago' },
    { id: 2, customer: 'Rahul Kumar', service: 'Deep Tissue', rating: 4, comment: 'Great service, helped with my back pain significantly.', date: '1 week ago' },
    { id: 3, customer: 'Anita Desai', service: 'Aromatherapy', rating: 5, comment: 'Perfect ambiance and very skilled therapist. Highly recommended!', date: '2 weeks ago' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700';
      case 'Paused': return 'bg-yellow-100 text-yellow-700';
      case 'Inactive': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getBookingStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-100 text-green-700';
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      case 'Cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 pt-12 pb-6 px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Vendor Portal</h1>
            <p className="text-white/90">Serenity Spa & Wellness • ID: {user.mobile}</p>
          </div>
          <button
            onClick={onLogout}
            aria-label="Logout from vendor portal"
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <LogOut className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="flex border-b border-gray-100 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'services', label: 'My Services' },
              { id: 'therapists', label: 'Therapists' },
              { id: 'bookings', label: 'Bookings' },
              { id: 'reviews', label: 'Reviews' },
              { id: 'analytics', label: 'Analytics' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 py-4 px-6 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Quick Actions */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Button
                      onClick={() => setActiveTab('services')}
                      size="lg"
                      className="w-full justify-start h-16"
                    >
                      <Plus className="w-6 h-6 mr-3" />
                      <div className="text-left">
                        <p className="font-semibold">Add New Service</p>
                        <p className="text-sm opacity-90">Expand your offerings</p>
                      </div>
                    </Button>

                    <Button
                      onClick={() => setActiveTab('bookings')}
                      variant="outline"
                      size="lg"
                      className="w-full justify-start h-16"
                    >
                      <Calendar className="w-6 h-6 mr-3" />
                      <div className="text-left">
                        <p className="font-semibold">View Bookings</p>
                        <p className="text-sm opacity-70">4 appointments today</p>
                      </div>
                    </Button>

                    <Button
                      onClick={() => setActiveTab('analytics')}
                      variant="outline"
                      size="lg"
                      className="w-full justify-start h-16"
                    >
                      <BarChart3 className="w-6 h-6 mr-3" />
                      <div className="text-left">
                        <p className="font-semibold">View Analytics</p>
                        <p className="text-sm opacity-70">Performance insights</p>
                      </div>
                    </Button>

                    <Button
                      onClick={() => setActiveTab('reviews')}
                      variant="outline"
                      size="lg"
                      className="w-full justify-start h-16"
                    >
                      <MessageSquare className="w-6 h-6 mr-3" />
                      <div className="text-left">
                        <p className="font-semibold">Customer Feedback</p>
                        <p className="text-sm opacity-70">3 new reviews</p>
                      </div>
                    </Button>

                    <Button
                      onClick={() => onNavigate?.('vendorProfile')}
                      variant="outline"
                      size="lg"
                      className="w-full justify-start h-16"
                    >
                      <Settings className="w-6 h-6 mr-3" />
                      <div className="text-left">
                        <p className="font-semibold">Profile Settings</p>
                        <p className="text-sm opacity-70">Update business information</p>
                      </div>
                    </Button>

                    <Button
                      onClick={() => onNavigate?.('therapistManagement')}
                      variant="outline"
                      size="lg"
                      className="w-full justify-start h-16"
                    >
                      <Users className="w-6 h-6 mr-3" />
                      <div className="text-left">
                        <p className="font-semibold">Manage Staff</p>
                        <p className="text-sm opacity-70">Add and assign service providers</p>
                      </div>
                    </Button>

                    <Button
                      onClick={() => onNavigate?.('vendorSettings')}
                      variant="outline"
                      size="lg"
                      className="w-full justify-start h-16"
                    >
                      <Settings className="w-6 h-6 mr-3" />
                      <div className="text-left">
                        <p className="font-semibold">Settings</p>
                        <p className="text-sm opacity-70">Configure preferences</p>
                      </div>
                    </Button>
                  </div>
                </div>

                {/* Today's Schedule */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h3>
                  <div className="space-y-3">
                    {upcomingBookings.filter(booking => booking.date === 'Today').map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border-l-4 border-l-transparent hover:border-l-blue-500 transition-all">
                        <div className="flex items-center space-x-4 flex-1">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            booking.type === 'at_home' ? 'bg-blue-100' : 'bg-pink-100'
                          }`}>
                            {booking.type === 'at_home' ? (
                              <Home className="w-6 h-6 text-blue-600" />
                            ) : (
                              <Building2 className="w-6 h-6 text-pink-600" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h4 className="font-semibold text-gray-900">{booking.service}</h4>
                              <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${
                                booking.type === 'at_home'
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-pink-100 text-pink-700'
                              }`}>
                                {booking.type === 'at_home' ? 'At Home' : 'Spa Visit'}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{booking.customer} • {booking.time}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{booking.address}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 rounded-lg text-xs font-medium ${getBookingStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onNavigate?.('assignTherapist', booking)}
                          >
                            {booking.type === 'at_home' ? 'Assign Professional' : 'View Details'}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'services' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">My Services</h3>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Service
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {services.map((service) => (
                    <div key={service.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                          <Package className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{service.name}</h4>
                          <p className="text-sm text-gray-600">₹{service.price} • {service.duration} min • {service.bookings} bookings</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(service.status)}`}>
                              {service.status}
                            </span>
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              <span className="text-xs text-gray-600">{service.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center hover:bg-blue-200 transition-colors">
                          <Eye className="w-4 h-4 text-blue-600" />
                        </button>
                        <button className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors">
                          <Edit className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center hover:bg-yellow-200 transition-colors">
                          <Settings className="w-4 h-4 text-yellow-600" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'therapists' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">My Therapists</h3>
                  <Button
                    size="sm"
                    onClick={() => onNavigate?.('therapistManagement')}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Manage Therapists
                  </Button>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 text-center">
                  <Users className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Complete Therapist Management
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Add therapists to your team, manage their profiles, assign bookings, and track their performance all in one place.
                  </p>
                  <Button onClick={() => onNavigate?.('therapistManagement')}>
                    Go to Therapist Management
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                      <p className="text-2xl font-bold text-gray-900">5</p>
                      <p className="text-sm text-gray-600">Active Therapists</p>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Calendar className="w-6 h-6 text-green-600" />
                      </div>
                      <p className="text-2xl font-bold text-gray-900">12</p>
                      <p className="text-sm text-gray-600">Assignments Today</p>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Star className="w-6 h-6 text-yellow-600" />
                      </div>
                      <p className="text-2xl font-bold text-gray-900">4.7</p>
                      <p className="text-sm text-gray-600">Avg. Rating</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Upcoming Bookings</h3>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">Today</Button>
                    <Button size="sm" variant="outline">This Week</Button>
                    <Button size="sm" variant="outline">All</Button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {upcomingBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{booking.service}</h4>
                          <p className="text-sm text-gray-600">{booking.customer}</p>
                          <p className="text-sm text-gray-500">{booking.date} at {booking.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-lg text-xs font-medium ${getBookingStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onNavigate?.('assignTherapist', booking)}
                        >
                          <Users className="w-4 h-4 mr-1" />
                          Assign
                        </Button>
                        <Button size="sm" variant="outline">
                          Manage
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Customer Reviews</h3>
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-semibold text-gray-900">4.8 Average Rating</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {recentReviews.map((review) => (
                    <div key={review.id} className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{review.customer}</h4>
                          <p className="text-sm text-gray-600">{review.service}</p>
                        </div>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 mb-2">{review.comment}</p>
                      <p className="text-xs text-gray-500">{review.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Performance Analytics</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Revenue Trends</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">This Month</span>
                        <span className="font-semibold text-green-600">₹45,280</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Month</span>
                        <span className="font-semibold">₹38,420</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Growth</span>
                        <span className="font-semibold text-green-600">+18%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Service Performance</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Most Popular</span>
                        <span className="font-semibold">Swedish Massage</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Highest Rated</span>
                        <span className="font-semibold">Couples Massage</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Avg. Rating</span>
                        <span className="font-semibold text-yellow-600">4.8 ⭐</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Customer Insights</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Customers</span>
                        <span className="font-semibold">89</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Repeat Customers</span>
                        <span className="font-semibold">67%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Avg. Booking Value</span>
                        <span className="font-semibold">₹3,200</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Operational Metrics</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Booking Rate</span>
                        <span className="font-semibold text-green-600">92%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Cancellation Rate</span>
                        <span className="font-semibold">3%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Response Time</span>
                        <span className="font-semibold">&lt; 2 hours</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button variant="outline">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Export Report
                  </Button>
                  <Button variant="outline">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Detailed Analytics
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};