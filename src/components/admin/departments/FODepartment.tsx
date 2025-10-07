import React, { useState } from 'react';
import { ArrowLeft, Briefcase, Users, Calendar, TrendingUp, Plus, Search } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';

interface FODepartmentProps {
  onBack: () => void;
}

export const FODepartment: React.FC<FODepartmentProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    { label: 'Walk-ins Today', value: '23', icon: Users, color: 'bg-yellow-100 text-yellow-600', change: '+8 vs yesterday' },
    { label: 'Appointments', value: '56', icon: Calendar, color: 'bg-blue-100 text-blue-600', change: '12 pending' },
    { label: 'Daily Revenue', value: '₹45K', icon: TrendingUp, color: 'bg-green-100 text-green-600', change: '+15%' },
    { label: 'Desk Staff', value: '8', icon: Briefcase, color: 'bg-orange-100 text-orange-600', change: 'All active' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-yellow-600 to-orange-600 pt-12 pb-6 px-4 sm:px-6">
        <button onClick={onBack} className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-6"><ArrowLeft className="w-5 h-5 text-white" /></button>
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center"><Briefcase className="w-6 h-6 text-white" /></div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">F.O. Department</h1>
            <p className="text-white/90 text-sm">Front office operations</p>
          </div>
        </div>
        <Input placeholder="Search appointments, walk-ins..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} icon={<Search className="w-5 h-5 text-gray-400" />} className="bg-white/95 border-0 shadow-lg" />
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
            <Button className="w-full justify-start h-auto py-4"><Plus className="w-5 h-5 mr-3" /><div className="text-left"><p className="font-semibold">New Appointment</p><p className="text-xs opacity-90">Book appointment</p></div></Button>
            <Button variant="outline" className="w-full justify-start h-auto py-4"><Users className="w-5 h-5 mr-3" /><div className="text-left"><p className="font-semibold">Walk-in Check-in</p><p className="text-xs opacity-70">Register walk-in</p></div></Button>
            <Button variant="outline" className="w-full justify-start h-auto py-4"><TrendingUp className="w-5 h-5 mr-3" /><div className="text-left"><p className="font-semibold">Daily Report</p><p className="text-xs opacity-70">View FO metrics</p></div></Button>
          </div>
        </div>
      </div>
    </div>
  );
};
