import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, MapPin, User, FileText, Save, Home, Building2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Therapist, TherapistAssignment } from '../../types/therapist';

interface AssignTaskScreenProps {
  therapist: Therapist;
  vendorId: string;
  onBack: () => void;
  onAssign: (assignment: Partial<TherapistAssignment>) => void;
}

export const AssignTaskScreen: React.FC<AssignTaskScreenProps> = ({
  therapist,
  vendorId,
  onBack,
  onAssign
}) => {
  const [serviceType, setServiceType] = useState<'at_home' | 'visit_spa'>('at_home');
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_phone: '',
    service_name: '',
    assignment_date: '',
    assignment_time: '',
    location_address: '',
    estimated_duration: 60,
    notes: ''
  });

  const today = new Date().toISOString().split('T')[0];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const assignment: Partial<TherapistAssignment> = {
      therapist_id: therapist.id,
      vendor_id: vendorId,
      customer_id: 'customer_id_placeholder',
      service_id: 'service_id_placeholder',
      assignment_date: formData.assignment_date,
      assignment_time: formData.assignment_time,
      status: 'assigned',
      location: {
        address: formData.location_address,
        latitude: 0,
        longitude: 0
      },
      estimated_duration: formData.estimated_duration,
      notes: formData.notes
    };

    onAssign(assignment);
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
            <h1 className="text-lg font-semibold text-gray-900">Assign Task</h1>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        {/* Therapist Info */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-4 text-white shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-semibold">{therapist.name}</h2>
              <p className="text-sm text-white/90">{therapist.specialization.join(', ')}</p>
            </div>
          </div>
        </div>

        {/* Service Type Selection */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Service Type</h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setServiceType('at_home')}
              className={`p-4 rounded-xl border-2 transition-all ${
                serviceType === 'at_home'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  serviceType === 'at_home' ? 'bg-blue-500' : 'bg-blue-100'
                }`}>
                  <Home className={`w-6 h-6 ${
                    serviceType === 'at_home' ? 'text-white' : 'text-blue-600'
                  }`} />
                </div>
                <span className={`text-sm font-medium ${
                  serviceType === 'at_home' ? 'text-blue-700' : 'text-gray-700'
                }`}>
                  At Home Service
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setServiceType('visit_spa')}
              className={`p-4 rounded-xl border-2 transition-all ${
                serviceType === 'visit_spa'
                  ? 'border-pink-500 bg-pink-50'
                  : 'border-gray-200 hover:border-pink-300'
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  serviceType === 'visit_spa' ? 'bg-pink-500' : 'bg-pink-100'
                }`}>
                  <Building2 className={`w-6 h-6 ${
                    serviceType === 'visit_spa' ? 'text-white' : 'text-pink-600'
                  }`} />
                </div>
                <span className={`text-sm font-medium ${
                  serviceType === 'visit_spa' ? 'text-pink-700' : 'text-gray-700'
                }`}>
                  Spa Visit
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Customer Information */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h2>

          <div className="space-y-4">
            <Input
              label="Customer Name"
              placeholder="Enter customer name"
              value={formData.customer_name}
              onChange={(e) => setFormData(prev => ({ ...prev, customer_name: e.target.value }))}
              icon={<User className="w-5 h-5 text-gray-400" />}
              required
            />

            <Input
              label="Customer Phone"
              type="tel"
              placeholder="Enter customer phone"
              value={formData.customer_phone}
              onChange={(e) => setFormData(prev => ({ ...prev, customer_phone: e.target.value }))}
              icon={<User className="w-5 h-5 text-gray-400" />}
              required
            />
          </div>
        </div>

        {/* Service Details */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Service Details</h2>

          <div className="space-y-4">
            <Input
              label="Service Name"
              placeholder="e.g., Swedish Massage"
              value={formData.service_name}
              onChange={(e) => setFormData(prev => ({ ...prev, service_name: e.target.value }))}
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estimated Duration (minutes)
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  min="15"
                  step="15"
                  value={formData.estimated_duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, estimated_duration: parseInt(e.target.value) || 60 }))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Schedule */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Schedule</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assignment Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={formData.assignment_date}
                  onChange={(e) => setFormData(prev => ({ ...prev, assignment_date: e.target.value }))}
                  min={today}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assignment Time
              </label>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, assignment_time: time }))}
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      formData.assignment_time === time
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

        {/* Location */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Service Location</h2>

          <Input
            label="Full Address"
            placeholder="Enter complete service address"
            value={formData.location_address}
            onChange={(e) => setFormData(prev => ({ ...prev, location_address: e.target.value }))}
            icon={<MapPin className="w-5 h-5 text-gray-400" />}
            required
          />
        </div>

        {/* Additional Notes */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Additional Notes</h2>

          <div className="relative">
            <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <textarea
              placeholder="Any special instructions or notes..."
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              rows={4}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button type="submit" size="lg" className="w-full">
          <Save className="w-5 h-5 mr-2" />
          Assign Task to {therapist.name}
        </Button>
      </form>
    </div>
  );
};
