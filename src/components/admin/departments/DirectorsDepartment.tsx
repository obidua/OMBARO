import React, { useState } from 'react';
import { ArrowLeft, Users, Calendar, FileText, TrendingUp, Plus, Search } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';

interface DirectorsDepartmentProps {
  onBack: () => void;
}

export const DirectorsDepartment: React.FC<DirectorsDepartmentProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    { label: 'Board Members', value: '5', icon: Users, color: 'bg-slate-100 text-slate-600', change: 'Active directors' },
    { label: 'Meetings/Month', value: '2', icon: Calendar, color: 'bg-blue-100 text-blue-600', change: 'Regular schedule' },
    { label: 'Resolutions', value: '18', icon: FileText, color: 'bg-green-100 text-green-600', change: 'This quarter' },
    { label: 'Growth', value: '+24%', icon: TrendingUp, color: 'bg-orange-100 text-orange-600', change: 'YoY revenue' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-slate-600 to-gray-600 pt-12 pb-6 px-4 sm:px-6">
        <button onClick={onBack} className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-6"><ArrowLeft className="w-5 h-5 text-white" /></button>
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center"><Users className="w-6 h-6 text-white" /></div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Directors' Details</h1>
            <p className="text-white/90 text-sm">Board of directors and executive management</p>
          </div>
        </div>
        <Input placeholder="Search directors, meetings..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} icon={<Search className="w-5 h-5 text-gray-400" />} className="bg-white/95 border-0 shadow-lg" />
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
            <Button className="w-full justify-start h-auto py-4"><Plus className="w-5 h-5 mr-3" /><div className="text-left"><p className="font-semibold">Schedule Meeting</p><p className="text-xs opacity-90">Board meeting</p></div></Button>
            <Button variant="outline" className="w-full justify-start h-auto py-4"><FileText className="w-5 h-5 mr-3" /><div className="text-left"><p className="font-semibold">Minutes of Meeting</p><p className="text-xs opacity-70">View MoM</p></div></Button>
            <Button variant="outline" className="w-full justify-start h-auto py-4"><TrendingUp className="w-5 h-5 mr-3" /><div className="text-left"><p className="font-semibold">Reports</p><p className="text-xs opacity-70">Executive summary</p></div></Button>
          </div>
        </div>
      </div>
    </div>
  );
};
