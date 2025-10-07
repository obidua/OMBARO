import React, { useState } from 'react';
import { ArrowLeft, Monitor, Shield, Database, Settings, Plus, Search } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';

interface ITDepartmentProps {
  onBack: () => void;
}

export const ITDepartment: React.FC<ITDepartmentProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    { label: 'System Uptime', value: '99.9%', icon: Monitor, color: 'bg-green-100 text-green-600', change: 'Last 30 days' },
    { label: 'Active Users', value: '2,847', icon: Shield, color: 'bg-blue-100 text-blue-600', change: 'Online now: 234' },
    { label: 'Open Tickets', value: '3', icon: Settings, color: 'bg-yellow-100 text-yellow-600', change: '1 critical' },
    { label: 'DB Health', value: '98%', icon: Database, color: 'bg-indigo-100 text-indigo-600', change: 'Optimal' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 pt-12 pb-6 px-4 sm:px-6">
        <button onClick={onBack} className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-6"><ArrowLeft className="w-5 h-5 text-white" /></button>
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center"><Monitor className="w-6 h-6 text-white" /></div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">IT Department</h1>
            <p className="text-white/90 text-sm">Technology infrastructure and support</p>
          </div>
        </div>
        <Input placeholder="Search systems, tickets..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} icon={<Search className="w-5 h-5 text-gray-400" />} className="bg-white/95 border-0 shadow-lg" />
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
            <Button className="w-full justify-start h-auto py-4"><Plus className="w-5 h-5 mr-3" /><div className="text-left"><p className="font-semibold">System Config</p><p className="text-xs opacity-90">Configure settings</p></div></Button>
            <Button variant="outline" className="w-full justify-start h-auto py-4"><Shield className="w-5 h-5 mr-3" /><div className="text-left"><p className="font-semibold">Security Scan</p><p className="text-xs opacity-70">Run security audit</p></div></Button>
            <Button variant="outline" className="w-full justify-start h-auto py-4"><Database className="w-5 h-5 mr-3" /><div className="text-left"><p className="font-semibold">Backup Now</p><p className="text-xs opacity-70">Create database backup</p></div></Button>
          </div>
        </div>
      </div>
    </div>
  );
};
