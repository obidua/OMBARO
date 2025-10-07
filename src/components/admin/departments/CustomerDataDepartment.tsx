import React, { useState } from 'react';
import { ArrowLeft, Database, Users, TrendingUp, Target, Plus, Search } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';

interface CustomerDataDepartmentProps {
  onBack: () => void;
}

export const CustomerDataDepartment: React.FC<CustomerDataDepartmentProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    { label: 'Total Customers', value: '2,847', icon: Users, color: 'bg-cyan-100 text-cyan-600', change: '+234 this month' },
    { label: 'Active Users', value: '2,156', icon: TrendingUp, color: 'bg-green-100 text-green-600', change: '76% active rate' },
    { label: 'Avg LTV', value: '₹8,450', icon: Target, color: 'bg-blue-100 text-blue-600', change: '+12% growth' },
    { label: 'Retention', value: '84%', icon: Database, color: 'bg-orange-100 text-orange-600', change: '+3% this quarter' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 pt-12 pb-6 px-4 sm:px-6">
        <button onClick={onBack} className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-6"><ArrowLeft className="w-5 h-5 text-white" /></button>
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center"><Database className="w-6 h-6 text-white" /></div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Customer Data</h1>
            <p className="text-white/90 text-sm">Customer information management</p>
          </div>
        </div>
        <Input placeholder="Search customers..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} icon={<Search className="w-5 h-5 text-gray-400" />} className="bg-white/95 border-0 shadow-lg" />
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
            <Button className="w-full justify-start h-auto py-4"><Users className="w-5 h-5 mr-3" /><div className="text-left"><p className="font-semibold">View Customers</p><p className="text-xs opacity-90">Browse database</p></div></Button>
            <Button variant="outline" className="w-full justify-start h-auto py-4"><Target className="w-5 h-5 mr-3" /><div className="text-left"><p className="font-semibold">Segmentation</p><p className="text-xs opacity-70">Customer groups</p></div></Button>
            <Button variant="outline" className="w-full justify-start h-auto py-4"><TrendingUp className="w-5 h-5 mr-3" /><div className="text-left"><p className="font-semibold">Analytics</p><p className="text-xs opacity-70">Behavior insights</p></div></Button>
          </div>
        </div>
      </div>
    </div>
  );
};
