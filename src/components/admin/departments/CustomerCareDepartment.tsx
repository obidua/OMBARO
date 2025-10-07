import React, { useState } from 'react';
import { ArrowLeft, HeadphonesIcon, MessageSquare, Clock, CheckCircle, Plus, Search } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';

interface CustomerCareDepartmentProps {
  onBack: () => void;
}

export const CustomerCareDepartment: React.FC<CustomerCareDepartmentProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    { label: 'Open Tickets', value: '45', icon: MessageSquare, color: 'bg-yellow-100 text-yellow-600', change: '12 urgent' },
    { label: 'Avg Response', value: '2m', icon: Clock, color: 'bg-blue-100 text-blue-600', change: '-30s this week' },
    { label: 'Resolved Today', value: '89', icon: CheckCircle, color: 'bg-green-100 text-green-600', change: '+12 vs yesterday' },
    { label: 'Satisfaction', value: '4.8/5', icon: HeadphonesIcon, color: 'bg-emerald-100 text-emerald-600', change: '98% positive' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 pt-12 pb-6 px-4 sm:px-6">
        <button onClick={onBack} className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-6"><ArrowLeft className="w-5 h-5 text-white" /></button>
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center"><HeadphonesIcon className="w-6 h-6 text-white" /></div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Customer Care</h1>
            <p className="text-white/90 text-sm">Customer support and service</p>
          </div>
        </div>
        <Input placeholder="Search tickets, customers..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} icon={<Search className="w-5 h-5 text-gray-400" />} className="bg-white/95 border-0 shadow-lg" />
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
            <Button className="w-full justify-start h-auto py-4"><Plus className="w-5 h-5 mr-3" /><div className="text-left"><p className="font-semibold">Create Ticket</p><p className="text-xs opacity-90">New support ticket</p></div></Button>
            <Button variant="outline" className="w-full justify-start h-auto py-4"><MessageSquare className="w-5 h-5 mr-3" /><div className="text-left"><p className="font-semibold">Live Chat</p><p className="text-xs opacity-70">Start chat session</p></div></Button>
            <Button variant="outline" className="w-full justify-start h-auto py-4"><CheckCircle className="w-5 h-5 mr-3" /><div className="text-left"><p className="font-semibold">View Reports</p><p className="text-xs opacity-70">Support analytics</p></div></Button>
          </div>
        </div>
      </div>
    </div>
  );
};
