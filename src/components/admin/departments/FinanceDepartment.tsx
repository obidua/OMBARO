import React from 'react';
import { DollarSign, TrendingUp, PieChart, BarChart3, Plus, FileText, Download, Calendar } from 'lucide-react';
import { EnhancedDepartmentPortal, ModuleContentConfig } from '../../department/EnhancedDepartmentPortal';
import { StatCard } from '../../department/DashboardStatsGrid';
import { QuickAction } from '../../department/QuickActionsPanel';

interface FinanceDepartmentProps {
  onBack: () => void;
  user?: any;
  onLogout?: () => void;
}

export const FinanceDepartment: React.FC<FinanceDepartmentProps> = ({ onBack, user, onLogout }) => {
  const stats: StatCard[] = [
    { label: 'Total Budget', value: '₹25L', icon: DollarSign, color: 'bg-blue-500', change: 'FY 2024-25', trend: 'up', changeValue: '+12%' },
    { label: 'Utilized', value: '78%', icon: PieChart, color: 'bg-green-500', change: '₹19.5L spent', trend: 'up', changeValue: '+5%' },
    { label: 'Projected Revenue', value: '₹45L', icon: TrendingUp, color: 'bg-orange-500', change: '+15% YoY', trend: 'up', changeValue: '+15%' },
    { label: 'Cash Flow', value: '₹12L', icon: BarChart3, color: 'bg-cyan-500', change: 'Positive', trend: 'up', changeValue: '+8%' }
  ];

  const quickActions: QuickAction[] = [
    {
      title: 'Create Budget',
      description: 'Plan new department budget',
      icon: Plus,
      onClick: () => alert('Create Budget clicked'),
      variant: 'primary'
    },
    {
      title: 'Financial Forecast',
      description: 'Project future performance',
      icon: TrendingUp,
      onClick: () => alert('Financial Forecast clicked')
    },
    {
      title: 'Generate Reports',
      description: 'Create financial analysis',
      icon: FileText,
      onClick: () => alert('Generate Reports clicked')
    }
  ];

  const moduleContents: ModuleContentConfig[] = [
    {
      moduleKey: 'budgets',
      title: 'Budget Management',
      content: (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Budget Overview</h3>
            <div className="space-y-4">
              {[
                { name: 'Operations Budget', period: 'Q4 2024', amount: '₹15L', utilization: '85%', status: 'green' },
                { name: 'Marketing Budget', period: 'Q4 2024', amount: '₹10L', utilization: '65%', status: 'yellow' }
              ].map((budget, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div>
                    <p className="font-semibold text-gray-900">{budget.name}</p>
                    <p className="text-sm text-gray-600">{budget.period}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{budget.amount}</p>
                    <p className={`text-sm ${budget.status === 'green' ? 'text-green-600' : 'text-yellow-600'}`}>
                      {budget.utilization} utilized
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      moduleKey: 'forecasting',
      title: 'Financial Forecasting',
      content: (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Revenue Projections</h3>
            <div className="h-64 flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
              <p className="text-gray-500">Chart visualization would display here</p>
            </div>
          </div>
        </div>
      )
    },
    {
      moduleKey: 'reports',
      title: 'Financial Reports',
      content: (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Available Reports</h3>
            <div className="space-y-3">
              {['Monthly P&L Statement', 'Cash Flow Report', 'Balance Sheet', 'Budget vs Actual'].map((report, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 cursor-pointer transition-colors">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-gray-900">{report}</span>
                  </div>
                  <Download className="w-5 h-5 text-gray-400 hover:text-blue-600 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      moduleKey: 'analytics',
      title: 'Financial Analytics',
      content: (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Financial Analytics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Expense Breakdown', 'Revenue Trend', 'Cost Analysis', 'ROI Metrics'].map((chart, idx) => (
                <div key={idx} className="h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center border border-gray-200">
                  <p className="text-gray-500 font-medium">{chart} Chart</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <EnhancedDepartmentPortal
      departmentCode="FINANCE"
      stats={stats}
      quickActions={quickActions}
      moduleContents={moduleContents}
      user={user}
      onBack={onBack}
      onLogout={onLogout}
      headerGradient="from-blue-600 to-cyan-600"
    />
  );
};
