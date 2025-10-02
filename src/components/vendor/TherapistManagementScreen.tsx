import React, { useState } from 'react';
import { ArrowLeft, Plus, Search, Filter, User, Star, MapPin, Clock, CreditCard as Edit, Trash2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Therapist } from '../../types/therapist';

interface TherapistManagementScreenProps {
  vendorId: string;
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

export const TherapistManagementScreen: React.FC<TherapistManagementScreenProps> = ({
  vendorId,
  onBack,
  onNavigate
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'on_leave'>('all');
  const [therapists] = useState<Therapist[]>([
    {
      id: '1',
      vendor_id: vendorId,
      name: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      mobile: '9876543210',
      specialization: ['Swedish Massage', 'Deep Tissue', 'Aromatherapy'],
      experience_years: 5,
      certification: ['Certified Massage Therapist', 'Aromatherapy Specialist'],
      rating: 4.8,
      total_reviews: 156,
      status: 'active',
      availability_status: 'available',
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '2',
      vendor_id: vendorId,
      name: 'Rahul Verma',
      email: 'rahul.verma@example.com',
      mobile: '9876543211',
      specialization: ['Thai Massage', 'Sports Massage'],
      experience_years: 3,
      certification: ['Certified Sports Therapist'],
      rating: 4.6,
      total_reviews: 89,
      status: 'active',
      availability_status: 'busy',
      created_at: '2024-02-20T10:00:00Z',
      updated_at: '2024-02-20T10:00:00Z'
    }
  ]);

  const filteredTherapists = therapists.filter(therapist => {
    const matchesSearch = therapist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          therapist.specialization.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = filterStatus === 'all' || therapist.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-700';
      case 'busy': return 'bg-yellow-100 text-yellow-700';
      case 'offline': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'inactive': return 'bg-red-100 text-red-700';
      case 'on_leave': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-[70px] pb-[70px]">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBack}
              aria-label="Go back"
              className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Therapist Management</h1>
          </div>
          <Button
            onClick={() => onNavigate('addTherapist')}
            size="sm"
            className="flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="p-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search therapists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            {['all', 'active', 'inactive', 'on_leave'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status as typeof filterStatus)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  filterStatus === status
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status.replace('_', ' ').charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Therapists List */}
      <div className="p-4 space-y-4">
        {filteredTherapists.length === 0 ? (
          <div className="text-center py-12">
            <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No therapists found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery ? 'Try adjusting your search' : 'Add your first therapist to get started'}
            </p>
            {!searchQuery && (
              <Button onClick={() => onNavigate('addTherapist')}>
                <Plus className="w-4 h-4 mr-2" />
                Add Therapist
              </Button>
            )}
          </div>
        ) : (
          filteredTherapists.map((therapist) => (
            <div
              key={therapist.id}
              className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  <div className="w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {therapist.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{therapist.name}</h3>
                    <p className="text-sm text-gray-600">{therapist.mobile}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(therapist.status)}`}>
                        {therapist.status.replace('_', ' ')}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getAvailabilityColor(therapist.availability_status)}`}>
                        {therapist.availability_status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onNavigate('editTherapist', therapist)}
                    className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center hover:bg-blue-200 transition-colors"
                    aria-label="Edit therapist"
                  >
                    <Edit className="w-4 h-4 text-blue-600" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete ${therapist.name}?`)) {
                        console.log('Delete therapist:', therapist.id);
                      }
                    }}
                    className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center hover:bg-red-200 transition-colors"
                    aria-label="Delete therapist"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm text-gray-700">
                    {therapist.rating.toFixed(1)} ({therapist.total_reviews} reviews)
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{therapist.experience_years} years experience</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {therapist.specialization.map((spec) => (
                    <span
                      key={spec}
                      className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center space-x-2">
                <Button
                  onClick={() => onNavigate('therapistAssignments', therapist)}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  View Assignments
                </Button>
                <Button
                  onClick={() => onNavigate('assignTask', therapist)}
                  size="sm"
                  className="flex-1"
                >
                  Assign Task
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
