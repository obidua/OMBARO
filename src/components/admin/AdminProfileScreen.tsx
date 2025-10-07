import React, { useState } from 'react';
import { ArrowLeft, Save, User, Mail, Phone, Shield, CreditCard as Edit2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface AdminProfileScreenProps {
  onBack: () => void;
}

export const AdminProfileScreen: React.FC<AdminProfileScreenProps> = ({ onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@ombaro.com',
    phone: '+91 98765 43210',
    role: 'Super Admin',
    department: 'Administration',
    accessLevel: 'Full Access'
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <h1 className="text-xl font-bold text-gray-900">Admin Profile</h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center hover:bg-blue-200 transition-colors"
            >
              <Edit2 className="w-5 h-5 text-blue-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg text-center">
          <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold">{profile.name}</h2>
          <p className="text-white/90 mt-1">{profile.role}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>

          <Input
            label="Full Name"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            icon={<User className="w-5 h-5 text-gray-400" />}
            disabled={!isEditing}
          />

          <Input
            label="Email"
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            icon={<Mail className="w-5 h-5 text-gray-400" />}
            disabled={!isEditing}
          />

          <Input
            label="Phone"
            type="tel"
            value={profile.phone}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            icon={<Phone className="w-5 h-5 text-gray-400" />}
            disabled={!isEditing}
          />
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Administrative Details</h2>

          <Input
            label="Role"
            value={profile.role}
            icon={<Shield className="w-5 h-5 text-gray-400" />}
            disabled
          />

          <Input
            label="Department"
            value={profile.department}
            icon={<Shield className="w-5 h-5 text-gray-400" />}
            disabled
          />

          <Input
            label="Access Level"
            value={profile.accessLevel}
            icon={<Shield className="w-5 h-5 text-gray-400" />}
            disabled
          />
        </div>

        {isEditing && (
          <Button className="w-full">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        )}
      </div>
    </div>
  );
};
