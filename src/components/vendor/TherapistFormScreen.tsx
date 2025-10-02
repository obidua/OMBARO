import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, Briefcase, Award, Save } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Therapist } from '../../types/therapist';

interface TherapistFormScreenProps {
  therapist?: Therapist;
  vendorId: string;
  onBack: () => void;
  onSave: (therapist: Partial<Therapist>) => void;
}

export const TherapistFormScreen: React.FC<TherapistFormScreenProps> = ({
  therapist,
  vendorId,
  onBack,
  onSave
}) => {
  const [formData, setFormData] = useState({
    name: therapist?.name || '',
    email: therapist?.email || '',
    mobile: therapist?.mobile || '',
    experience_years: therapist?.experience_years || 0,
    specialization: therapist?.specialization || [],
    certification: therapist?.certification || [],
    status: therapist?.status || 'active'
  });

  const [currentSpec, setCurrentSpec] = useState('');
  const [currentCert, setCurrentCert] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      vendor_id: vendorId
    });
  };

  const addSpecialization = () => {
    if (currentSpec.trim()) {
      setFormData(prev => ({
        ...prev,
        specialization: [...prev.specialization, currentSpec.trim()]
      }));
      setCurrentSpec('');
    }
  };

  const removeSpecialization = (index: number) => {
    setFormData(prev => ({
      ...prev,
      specialization: prev.specialization.filter((_, i) => i !== index)
    }));
  };

  const addCertification = () => {
    if (currentCert.trim()) {
      setFormData(prev => ({
        ...prev,
        certification: [...prev.certification, currentCert.trim()]
      }));
      setCurrentCert('');
    }
  };

  const removeCertification = (index: number) => {
    setFormData(prev => ({
      ...prev,
      certification: prev.certification.filter((_, i) => i !== index)
    }));
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
            <h1 className="text-lg font-semibold text-gray-900">
              {therapist ? 'Edit Therapist' : 'Add New Therapist'}
            </h1>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>

          <div className="space-y-4">
            <Input
              label="Full Name"
              placeholder="Enter therapist name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              icon={<User className="w-5 h-5 text-gray-400" />}
              required
            />

            <Input
              label="Email"
              type="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              icon={<Mail className="w-5 h-5 text-gray-400" />}
              required
            />

            <Input
              label="Mobile Number"
              type="tel"
              placeholder="Enter mobile number"
              value={formData.mobile}
              onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
              icon={<Phone className="w-5 h-5 text-gray-400" />}
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Years of Experience
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  min="0"
                  value={formData.experience_years}
                  onChange={(e) => setFormData(prev => ({ ...prev, experience_years: parseInt(e.target.value) || 0 }))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="on_leave">On Leave</option>
              </select>
            </div>
          </div>
        </div>

        {/* Specializations */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Specializations</h2>

          <div className="flex space-x-2 mb-3">
            <input
              type="text"
              placeholder="Add specialization"
              value={currentSpec}
              onChange={(e) => setCurrentSpec(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSpecialization())}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <Button type="button" onClick={addSpecialization} size="sm">
              Add
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {formData.specialization.map((spec, index) => (
              <span
                key={index}
                className="inline-flex items-center space-x-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
              >
                <span>{spec}</span>
                <button
                  type="button"
                  onClick={() => removeSpecialization(index)}
                  className="text-purple-600 hover:text-purple-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Certifications</h2>

          <div className="flex space-x-2 mb-3">
            <input
              type="text"
              placeholder="Add certification"
              value={currentCert}
              onChange={(e) => setCurrentCert(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCertification())}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <Button type="button" onClick={addCertification} size="sm">
              Add
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {formData.certification.map((cert, index) => (
              <span
                key={index}
                className="inline-flex items-center space-x-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
              >
                <Award className="w-3 h-3" />
                <span>{cert}</span>
                <button
                  type="button"
                  onClick={() => removeCertification(index)}
                  className="text-green-600 hover:text-green-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <Button type="submit" size="lg" className="w-full">
          <Save className="w-5 h-5 mr-2" />
          {therapist ? 'Update Therapist' : 'Add Therapist'}
        </Button>
      </form>
    </div>
  );
};
