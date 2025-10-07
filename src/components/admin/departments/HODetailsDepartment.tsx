import React, { useState } from 'react';
import { ArrowLeft, Building, Users, Package, DollarSign, Plus, Search } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';

interface HODetailsDepartmentProps {
  onBack: () => void;
}

export const HODetailsDepartment: React.FC<HODetailsDepartmentProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    { label: 'Staff Count', value: '45', icon: Users, color: 'bg-gray-100 text-gray-600', change: 'HO employees' },
    { label: 'Asset Value', value: '₹2.5Cr', icon: DollarSign, color: 'bg-green-100 text-green-600', change: 'Total assets' },
    { label: 'Facilities', value: '8', icon: Building, color: 'bg-blue-100 text-blue-600', change: 'Amenities' },
    { label: 'Inventory', value: '156', icon: Package, color: 'bg-orange-100 text-orange-600', change: 'Items tracked' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-gray-600 to-slate-600 pt-12 pb-6 px-4 sm:px-6">
        <button onClick={onBack} className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-6"><ArrowLeft className="w-5 h-5 text-white" /></button>
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center"><Building className="w-6 h-6 text-white" /></div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">H.O. Details</h1>
            <p className="text-white/90 text-sm">Head office administration</p>
          </div>
        </div>
        <Input placeholder="Search facilities, assets..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} icon={<Search className="w-5 h-5 text-gray-400" />} className="bg-white/95 border-0 shadow-lg" />
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
            <Button className="w-full justify-start h-auto py-4"><Plus className="w-5 h-5 mr-3" /><div className="text-left"><p className="font-semibold">Manage Facilities</p><p className="text-xs opacity-90">Facility management</p></div></Button>
            <Button variant="outline" className="w-full justify-start h-auto py-4"><Package className="w-5 h-5 mr-3" /><div className="text-left"><p className="font-semibold">Asset Tracking</p><p className="text-xs opacity-70">Track HO assets</p></div></Button>
            <Button variant="outline" className="w-full justify-start h-auto py-4"><Users className="w-5 h-5 mr-3" /><div className="text-left"><p className="font-semibold">Staff Details</p><p className="text-xs opacity-70">HO employees</p></div></Button>
          </div>
        </div>
      </div>
    </div>
  );
};
