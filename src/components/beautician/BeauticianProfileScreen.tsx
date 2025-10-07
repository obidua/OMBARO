import React, { useState } from 'react';
import { ArrowLeft, Save, User, Mail, Phone, MapPin, Award, CreditCard as Edit2, Camera } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface BeauticianProfileScreenProps {
  onBack: () => void;
}

export const BeauticianProfileScreen: React.FC<BeauticianProfileScreenProps> = ({ onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '+91 98765 43210',
    address: 'Mumbai, Maharashtra',
    experience: '5 years',
    specializations: ['Hair Styling', 'Makeup', 'Nail Art', 'Bridal Makeup'],
    certifications: ['Certified Beauty Professional', 'Advanced Makeup Artist'],
    bio: 'Passionate beauty professional with 5 years of experience in transforming looks and boosting confidence.'
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-[70px] pb-[70px]">
      <div className="bg-white shadow-sm border-b border-gray-100 fixed top-0 left-0 right-0 z-10">
        <div className="flex items-center justify-between p-4 pt-12">
          <button onClick={onBack} className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Profile Settings</h1>
          <button onClick={() => setIsEditing(!isEditing)} className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center hover:bg-pink-200 transition-colors">
            <Edit2 className="w-5 h-5 text-pink-600" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-6 mt-4">
        <div className="bg-gradient-to-r from-pink-600 to-rose-600 rounded-2xl p-6 text-white shadow-lg text-center">
          <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 relative">
            <User className="w-12 h-12 text-white" />
            {isEditing && (
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                <Camera className="w-4 h-4 text-white" />
              </button>
            )}
          </div>
          <h2 className="text-2xl font-bold">{profile.name}</h2>
          <p className="text-white/90 mt-1">Certified Beauty Professional</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>

          <Input label="Full Name" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} icon={<User className="w-5 h-5 text-gray-400" />} disabled={!isEditing} />
          <Input label="Email" type="email" value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} icon={<Mail className="w-5 h-5 text-gray-400" />} disabled={!isEditing} />
          <Input label="Phone" type="tel" value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} icon={<Phone className="w-5 h-5 text-gray-400" />} disabled={!isEditing} />
          <Input label="Address" value={profile.address} onChange={(e) => setProfile({...profile, address: e.target.value})} icon={<MapPin className="w-5 h-5 text-gray-400" />} disabled={!isEditing} />
          <Input label="Experience" value={profile.experience} onChange={(e) => setProfile({...profile, experience: e.target.value})} icon={<Award className="w-5 h-5 text-gray-400" />} disabled={!isEditing} />
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Specializations</h2>
          <div className="flex flex-wrap gap-2">
            {profile.specializations.map((spec, index) => (
              <span key={index} className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">{spec}</span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Certifications</h2>
          <div className="flex flex-wrap gap-2">
            {profile.certifications.map((cert, index) => (
              <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">{cert}</span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Portfolio</h2>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                <Camera className="w-8 h-8 text-gray-400" />
              </div>
            ))}
          </div>
          {isEditing && (
            <Button variant="outline" className="w-full mt-4">
              <Camera className="w-4 h-4 mr-2" />
              Upload Portfolio Images
            </Button>
          )}
        </div>

        {isEditing && <Button className="w-full"><Save className="w-4 h-4 mr-2" />Save Changes</Button>}
      </div>
    </div>
  );
};
