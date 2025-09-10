import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Users, Clock, Navigation, Filter, Search, Eye, Phone, MessageCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Map } from '../ui/Map';
import { LocationTracking, Employee } from '../../types/hr';
import { Location, ServiceProvider } from '../../types/booking';

interface LocationTrackingScreenProps {
  onBack: () => void;
}

export const LocationTrackingScreen: React.FC<LocationTrackingScreenProps> = ({
  onBack
}) => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');

  // Mock employee data with current locations
  const employees: Employee[] = [
    {
      id: '1',
      employeeId: 'EMP001',
      name: 'John Doe',
      email: 'john@company.com',
      mobile: '9876543210',
      department: 'Operations',
      designation: 'Spa Manager',
      joiningDate: '2024-01-15',
      status: 'active',
      reportingManager: 'Manager',
      profilePhoto: 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=150',
      address: 'Bangalore, Karnataka',
      emergencyContact: {
        name: 'Jane Doe',
        phone: '9876543211',
        relation: 'Spouse'
      }
    },
    {
      id: '2',
      employeeId: 'EMP002',
      name: 'Priya Sharma',
      email: 'priya@company.com',
      mobile: '9876543212',
      department: 'Operations',
      designation: 'Field Executive',
      joiningDate: '2024-02-01',
      status: 'active',
      reportingManager: 'Manager',
      profilePhoto: 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=150',
      address: 'Bangalore, Karnataka',
      emergencyContact: {
        name: 'Raj Sharma',
        phone: '9876543213',
        relation: 'Father'
      }
    },
    {
      id: '3',
      employeeId: 'EMP003',
      name: 'Rahul Kumar',
      email: 'rahul@company.com',
      mobile: '9876543214',
      department: 'Operations',
      designation: 'Spa Coordinator',
      joiningDate: '2024-01-20',
      status: 'active',
      reportingManager: 'Manager',
      profilePhoto: 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=150',
      address: 'Bangalore, Karnataka',
      emergencyContact: {
        name: 'Sunita Kumar',
        phone: '9876543215',
        relation: 'Mother'
      }
    }
  ];

  // Mock location tracking data
  const locationData: LocationTracking[] = [
    {
      id: '1',
      employeeId: 'EMP001',
      latitude: 12.9716,
      longitude: 77.5946,
      address: 'MG Road, Bangalore',
      timestamp: new Date().toISOString(),
      activity: 'check_in'
    },
    {
      id: '2',
      employeeId: 'EMP002',
      latitude: 12.9352,
      longitude: 77.6245,
      address: 'Koramangala, Bangalore',
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      activity: 'client_visit'
    },
    {
      id: '3',
      employeeId: 'EMP003',
      latitude: 12.9719,
      longitude: 77.6412,
      address: 'Indiranagar, Bangalore',
      timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      activity: 'field_work'
    }
  ];

  // Convert employees to service providers for map display
  const employeeProviders: ServiceProvider[] = employees.map((employee) => {
    const location = locationData.find(loc => loc.employeeId === employee.employeeId);
    return {
      id: employee.id,
      name: employee.name,
      rating: 0,
      reviewCount: 0,
      distance: 0,
      location: location ? {
        latitude: location.latitude,
        longitude: location.longitude,
        address: location.address
      } : {
        latitude: 12.9716,
        longitude: 77.5946,
        address: 'Location not available'
      },
      image: employee.profilePhoto || 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=150',
      isAvailable: employee.status === 'active',
      specialties: [employee.designation],
      priceRange: 'mid' as const,
      services: []
    };
  });

  const userLocation: Location = {
    latitude: 12.9716,
    longitude: 77.5946,
    address: 'Admin Location'
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         employee.employeeId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || employee.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getActivityColor = (activity: string) => {
    switch (activity) {
      case 'check_in': return 'bg-green-100 text-green-700';
      case 'check_out': return 'bg-blue-100 text-blue-700';
      case 'break': return 'bg-yellow-100 text-yellow-700';
      case 'field_work': return 'bg-purple-100 text-purple-700';
      case 'client_visit': return 'bg-indigo-100 text-indigo-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getActivityIcon = (activity: string) => {
    switch (activity) {
      case 'check_in':
      case 'check_out':
        return <Clock className="w-4 h-4" />;
      case 'field_work':
      case 'client_visit':
        return <MapPin className="w-4 h-4" />;
      default:
        return <Navigation className="w-4 h-4" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes} min ago`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)} hours ago`;
    return date.toLocaleDateString();
  };

  const handleEmployeeSelect = (provider: ServiceProvider) => {
    const employee = employees.find(emp => emp.id === provider.id);
    setSelectedEmployee(employee || null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 pt-12 pb-6 px-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            aria-label="Go back to admin dashboard"
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="text-center">
            <h1 className="text-xl font-bold text-white">Employee Location Tracking</h1>
            <p className="text-white/90 text-sm">Real-time employee location monitoring</p>
          </div>
          <div className="w-10" />
        </div>

        {/* Search and Filter */}
        <div className="space-y-3">
          <div className="relative">
            <Input
              placeholder="Search employees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-5 h-5 text-gray-400" />}
              className="bg-white/95 backdrop-blur-sm border-0 shadow-lg"
            />
          </div>
          
          <div className="flex space-x-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-3 py-2 bg-white/95 backdrop-blur-sm border-0 rounded-lg text-sm shadow-lg focus:ring-2 focus:ring-white/50"
            >
              <option value="all">All Employees</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-200px)]">
        {/* Employee List */}
        <div className="w-full lg:w-96 bg-white border-r border-gray-100 overflow-y-auto">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                Employees ({filteredEmployees.length})
              </h2>
            </div>
          </div>
          
          <div className="p-4 space-y-3">
            {filteredEmployees.map((employee) => {
              const location = locationData.find(loc => loc.employeeId === employee.employeeId);
              const isSelected = selectedEmployee?.id === employee.id;
              
              return (
                <button
                  key={employee.id}
                  onClick={() => setSelectedEmployee(employee)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-100 hover:border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img
                          src={employee.profilePhoto}
                          alt={employee.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                        employee.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                      }`} />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{employee.name}</h3>
                      <p className="text-sm text-gray-600">{employee.employeeId} • {employee.designation}</p>
                      
                      {location && (
                        <div className="mt-2">
                          <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-lg text-xs font-medium ${getActivityColor(location.activity)}`}>
                            {getActivityIcon(location.activity)}
                            <span className="capitalize">{location.activity.replace('_', ' ')}</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatTimestamp(location.timestamp)}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col space-y-1">
                      <button className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center hover:bg-blue-200 transition-colors">
                        <Phone className="w-4 h-4 text-blue-600" />
                      </button>
                      <button className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center hover:bg-green-200 transition-colors">
                        <MessageCircle className="w-4 h-4 text-green-600" />
                      </button>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Map View */}
        <div className="flex-1 p-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 h-full">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Live Location Map</h2>
              <p className="text-sm text-gray-600">Real-time employee locations</p>
            </div>
            
            <div className="p-4 h-[calc(100%-80px)]">
              <Map
                userLocation={userLocation}
                providers={employeeProviders}
                selectedProvider={selectedEmployee ? employeeProviders.find(p => p.id === selectedEmployee.id) || null : null}
                onProviderSelect={handleEmployeeSelect}
                className="h-full rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Employee Details Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 bg-black/50 flex items-end lg:items-center justify-center z-50 p-4">
          <div className="bg-white rounded-t-3xl lg:rounded-2xl w-full max-w-md max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Employee Details</h2>
                <button
                  onClick={() => setSelectedEmployee(null)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-4 space-y-4">
              {/* Employee Info */}
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <img
                    src={selectedEmployee.profilePhoto}
                    alt={selectedEmployee.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedEmployee.name}</h3>
                  <p className="text-gray-600">{selectedEmployee.employeeId}</p>
                  <p className="text-sm text-gray-500">{selectedEmployee.designation}</p>
                </div>
              </div>

              {/* Current Location */}
              {(() => {
                const location = locationData.find(loc => loc.employeeId === selectedEmployee.employeeId);
                return location ? (
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Current Location</h4>
                    <div className="space-y-2">
                      <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-lg text-sm font-medium ${getActivityColor(location.activity)}`}>
                        {getActivityIcon(location.activity)}
                        <span className="capitalize">{location.activity.replace('_', ' ')}</span>
                      </div>
                      <p className="text-sm text-gray-600">{location.address}</p>
                      <p className="text-xs text-gray-500">
                        Last updated: {formatTimestamp(location.timestamp)}
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-gray-500">Lat:</span>
                          <span className="font-mono ml-1">{location.latitude.toFixed(6)}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Lng:</span>
                          <span className="font-mono ml-1">{location.longitude.toFixed(6)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                    <p className="text-yellow-800">Location not available</p>
                  </div>
                );
              })()}

              {/* Contact Info */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Contact Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mobile:</span>
                    <span className="font-medium">{selectedEmployee.mobile}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{selectedEmployee.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Department:</span>
                    <span className="font-medium">{selectedEmployee.department}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <Button className="flex-1">
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
                <Button variant="outline" className="flex-1">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};