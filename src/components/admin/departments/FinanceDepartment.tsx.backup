import React, { useState } from 'react';
import { ArrowLeft, DollarSign, TrendingUp, PieChart, BarChart3, Plus, Search } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';

interface FinanceDepartmentProps {
  onBack: () => void;
}

export const FinanceDepartment: React.FC<FinanceDepartmentProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    { label: 'Total Budget', value: '₹25L', icon: DollarSign, color: 'bg-blue-100 text-blue-600', change: 'FY 2024-25' },
    { label: 'Utilized', value: '78%', icon: PieChart, color: 'bg-green-100 text-green-600', change: '₹19.5L spent' },
    { label: 'Projected Revenue', value: '₹45L', icon: TrendingUp, color: 'bg-orange-100 text-orange-600', change: '+15% YoY' },
    { label: 'Cash Flow', value: '₹12L', icon: BarChart3, color: 'bg-cyan-100 text-cyan-600', change: 'Positive' }
  ];

  const tabs = [{ id: 'overview', label: 'Overview' }, { id: 'budgets', label: 'Budgets' }, { id: 'forecasting', label: 'Forecasting' }, { id: 'reports', label: 'Reports' }];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 pt-12 pb-6 px-4 sm:px-6">
        <button onClick={onBack} className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-6"><ArrowLeft className="w-5 h-5 text-white" /></button>
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center"><DollarSign className="w-6 h-6 text-white" /></div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Finance Department</h1>
            <p className="text-white/90 text-sm">Financial planning and analysis</p>
          </div>
        </div>
        <Input placeholder="Search budgets, forecasts..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} icon={<Search className="w-5 h-5 text-gray-400" />} className="bg-white/95 border-0 shadow-lg" />
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

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="flex border-b border-gray-100 overflow-x-auto">
            {tabs.map((tab) => (<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`py-4 px-6 text-sm font-medium ${activeTab === tab.id ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}>{tab.label}</button>))}
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Button className="w-full justify-start h-auto py-4"><Plus className="w-5 h-5 mr-3" /><div className="text-left"><p className="font-semibold">Create Budget</p><p className="text-xs opacity-90">Plan department budget</p></div></Button>
              <Button variant="outline" className="w-full justify-start h-auto py-4"><TrendingUp className="w-5 h-5 mr-3" /><div className="text-left"><p className="font-semibold">Financial Forecast</p><p className="text-xs opacity-70">Project future performance</p></div></Button>
              <Button variant="outline" className="w-full justify-start h-auto py-4"><BarChart3 className="w-5 h-5 mr-3" /><div className="text-left"><p className="font-semibold">Generate Reports</p><p className="text-xs opacity-70">Financial analysis</p></div></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
