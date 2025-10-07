import React, { useState } from 'react';
import { ArrowLeft, UserCheck, Calendar, MapPin, Users, Plus, Search } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';

interface StaffDepartmentProps {
  onBack: () => void;
}

export const StaffDepartment: React.FC<StaffDepartmentProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    { label: 'Active Staff', value: '89', icon: Users, color: 'bg-orange-100 text-orange-600', change: '+5 this month' },
    { label: 'On Duty', value: '67', icon: MapPin, color: 'bg-green-100 text-green-600', change: '75% attendance' },
    { label: 'On Leave', value: '5', icon: Calendar, color: 'bg-blue-100 text-blue-600', change: '2 approved today' },
    { label: 'Performance', value: '4.6/5', icon: UserCheck, color: 'bg-amber-100 text-amber-600', change: 'Avg rating' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 pt-12 pb-6 px-4 sm:px-6">
        <button onClick={onBack} className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-6"><ArrowLeft className="w-5 h-5 text-white" /></button>
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center"><UserCheck className="w-6 h-6 text-white" /></div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Staff Department</h1>
            <p className="text-white/90 text-sm">Staff management and coordination</p>
          </div>
        </div>
        <Input placeholder="Search staff, schedules..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} icon={<Search className="w-5 h-5 text-gray-400" />} className="bg-white/95 border-0 shadow-lg" />
      </div>

      <div className="px-4 sm:px-6 py-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color} mb-4`}><stat.icon className="w-6 h-6" /></div>
              <p className="text-xs text-gray-600 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.change}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button className="w-full justify-start h-auto py-4"><Plus className="w-5 h-5 mr-3" /><div className="text-left"><p className="font-semibold">Add Staff</p><p className="text-xs opacity-90">Register new staff</p></div></Button>
            <Button variant="outline" className="w-full justify-start h-auto py-4"><Calendar className="w-5 h-5 mr-3" /><div className="text-left"><p className="font-semibold">Manage Schedule</p><p className="text-xs opacity-70">Staff scheduling</p></div></Button>
            <Button variant="outline" className="w-full justify-start h-auto py-4"><MapPin className="w-5 h-5 mr-3" /><div className="text-left"><p className="font-semibold">Track Location</p><p className="text-xs opacity-70">Field staff tracking</p></div></Button>
          </div>
        </div>
      </div>
    </div>
  );
};
