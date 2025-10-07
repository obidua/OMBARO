import React from 'react';
import { Calculator, FileText, CreditCard, CheckCircle, Book, Plus, TrendingUp } from 'lucide-react';
import { EnhancedDepartmentPortal, ModuleContentConfig } from '../../department/EnhancedDepartmentPortal';
import { StatCard } from '../../department/DashboardStatsGrid';
import { QuickAction } from '../../department/QuickActionsPanel';

interface AccountsDepartmentProps {
  onBack: () => void;
  user?: any;
  onLogout?: () => void;
}

export const AccountsDepartment: React.FC<AccountsDepartmentProps> = ({ onBack, user, onLogout }) => {
  const stats: StatCard[] = [
    { label: 'Monthly Revenue', value: '₹8.4L', icon: TrendingUp, color: 'bg-green-500', change: 'This month', trend: 'up', changeValue: '+12%' },
    { label: 'Pending Invoices', value: '23', icon: FileText, color: 'bg-yellow-500', change: '5 overdue', trend: 'neutral' },
    { label: 'Processed Payments', value: '156', icon: CreditCard, color: 'bg-blue-500', change: '+8 today', trend: 'up', changeValue: '+5%' },
    { label: 'Account Balance', value: '₹2.1L', icon: Calculator, color: 'bg-emerald-500', change: '+5% growth', trend: 'up', changeValue: '+5%' }
  ];

  const quickActions: QuickAction[] = [
    {
      title: 'Create Invoice',
      description: 'Generate new invoice',
      icon: Plus,
      onClick: () => alert('Create Invoice'),
      variant: 'primary'
    },
    {
      title: 'Process Payment',
      description: 'Record payment received',
      icon: CreditCard,
      onClick: () => alert('Process Payment')
    },
    {
      title: 'Reconcile Accounts',
      description: 'Match bank transactions',
      icon: CheckCircle,
      onClick: () => alert('Reconcile Accounts')
    }
  ];

  const moduleContents: ModuleContentConfig[] = [
    {
      moduleKey: 'invoices',
      title: 'Invoice Management',
      content: (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Invoices</h3>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-semibold text-gray-900">INV-2024-{1000 + i}</p>
                  <p className="text-sm text-gray-600">Customer #{i}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">₹{(i * 5000).toLocaleString()}</p>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">Paid</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
  ];

  return (
    <EnhancedDepartmentPortal
      departmentCode="ACCOUNTS"
      stats={stats}
      quickActions={quickActions}
      moduleContents={moduleContents}
      user={user}
      onBack={onBack}
      onLogout={onLogout}
      headerGradient="from-green-600 to-emerald-600"
    />
  );
};
