import React, { useState } from 'react';
import { ArrowLeft, List, Building, MapPin, Star, Plus, Search } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';

interface VendorListDepartmentProps {
  onBack: () => void;
}

export const VendorListDepartment: React.FC<VendorListDepartmentProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    { label: 'Total Vendors', value: '156', icon: Building, color: 'bg-teal-100 text-teal-600', change: '+12 this month' },
    { label: 'Active', value: '142', icon: Star, color: 'bg-green-100 text-green-600', change: '91% active rate' },
    { label: 'Pending', value: '8', icon: List, color: 'bg-yellow-100 text-yellow-600', change: 'Need approval' },
    { label: 'Locations', value: '12', icon: MapPin, color: 'bg-cyan-100 text-cyan-600', change: 'Cities covered' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 pt-12 pb-6 px-4 sm:px-6">
        <button onClick={onBack} className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-6"><ArrowLeft className="w-5 h-5 text-white" /></button>
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center"><List className="w-6 h-6 text-white" /></div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Vendor List</h1>
            <p className="text-white/90 text-sm">Vendor database management</p>
          </div>
        </div>
        <Input placeholder="Search vendors..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} icon={<Search className="w-5 h-5 text-gray-400" />} className="bg-white/95 border-0 shadow-lg" />
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
            <Button className="w-full justify-start h-auto py-4"><Plus className="w-5 h-5 mr-3" /><div className="text-left"><p className="font-semibold">Add Vendor</p><p className="text-xs opacity-90">Register new vendor</p></div></Button>
            <Button variant="outline" className="w-full justify-start h-auto py-4"><Building className="w-5 h-5 mr-3" /><div className="text-left"><p className="font-semibold">View All</p><p className="text-xs opacity-70">Browse vendor list</p></div></Button>
            <Button variant="outline" className="w-full justify-start h-auto py-4"><Star className="w-5 h-5 mr-3" /><div className="text-left"><p className="font-semibold">Performance</p><p className="text-xs opacity-70">Vendor analytics</p></div></Button>
          </div>
        </div>
      </div>
    </div>
  );
};
