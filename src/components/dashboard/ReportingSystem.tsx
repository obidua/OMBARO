import React, { useState } from 'react';
import { BarChart3, Download, Eye, Calendar, Filter, TrendingUp, Users, DollarSign, FileText, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/Button';
import { UserRole } from '../../types/auth';
import { REPORTING_HIERARCHY, ROLE_DEFINITIONS } from '../../types/roles';

interface ReportingSystemProps {
  userRole: UserRole;
  user: any;
}

interface Report {
  id: string;
  title: string;
  description: string;
  type: 'financial' | 'operational' | 'hr' | 'marketing' | 'legal' | 'system';
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  lastGenerated: string;
  status: 'current' | 'pending' | 'overdue';
  accessLevel: string[];
  generatedBy: string;
}

export const ReportingSystem: React.FC<ReportingSystemProps> = ({
  userRole,
  user
}) => {
  const [selectedReportType, setSelectedReportType] = useState<string>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('monthly');

  const roleDefinition = ROLE_DEFINITIONS.find(role => role.id === userRole);
  const reportingHierarchy = REPORTING_HIERARCHY.find(hierarchy => hierarchy.roleId === userRole);

  // Mock reports data based on role
  const getAvailableReports = (role: UserRole): Report[] => {
    const baseReports: Report[] = [
      {
        id: 'financial_summary',
        title: 'Financial Summary Report',
        description: 'Comprehensive financial overview with revenue, expenses, and profit analysis',
        type: 'financial',
        frequency: 'monthly',
        lastGenerated: '2025-01-10',
        status: 'current',
        accessLevel: ['finance_department', 'accounts_department', 'directors', 'super_admin'],
        generatedBy: 'Finance Department'
      },
      {
        id: 'customer_analytics',
        title: 'Customer Analytics Report',
        description: 'Customer behavior, acquisition, and retention metrics',
        type: 'marketing',
        frequency: 'weekly',
        lastGenerated: '2025-01-08',
        status: 'current',
        accessLevel: ['marketing_department', 'customer_data', 'directors', 'super_admin'],
        generatedBy: 'Marketing Department'
      },
      {
        id: 'operational_performance',
        title: 'Operational Performance Report',
        description: 'Spa operations, booking rates, and service quality metrics',
        type: 'operational',
        frequency: 'weekly',
        lastGenerated: '2025-01-09',
        status: 'current',
        accessLevel: ['fo_department', 'staff_department', 'directors', 'super_admin'],
        generatedBy: 'Operations Team'
      },
      {
        id: 'hr_dashboard',
        title: 'HR Dashboard Report',
        description: 'Employee metrics, attendance, performance, and satisfaction',
        type: 'hr',
        frequency: 'monthly',
        lastGenerated: '2025-01-05',
        status: 'current',
        accessLevel: ['hr_department', 'staff_department', 'directors', 'super_admin'],
        generatedBy: 'HR Department'
      },
      {
        id: 'legal_compliance',
        title: 'Legal Compliance Report',
        description: 'Regulatory compliance status and legal risk assessment',
        type: 'legal',
        frequency: 'quarterly',
        lastGenerated: '2024-12-31',
        status: 'current',
        accessLevel: ['legal_department', 'advocate', 'ca_cs', 'directors', 'super_admin'],
        generatedBy: 'Legal Department'
      },
      {
        id: 'system_health',
        title: 'System Health Report',
        description: 'IT infrastructure, security, and performance monitoring',
        type: 'system',
        frequency: 'daily',
        lastGenerated: '2025-01-11',
        status: 'current',
        accessLevel: ['it_department', 'super_admin'],
        generatedBy: 'IT Department'
      },
      {
        id: 'vendor_performance',
        title: 'Vendor Performance Report',
        description: 'Vendor ratings, service quality, and partnership metrics',
        type: 'operational',
        frequency: 'monthly',
        lastGenerated: '2025-01-07',
        status: 'current',
        accessLevel: ['vendor_list', 'fo_department', 'directors', 'super_admin'],
        generatedBy: 'Vendor Management'
      },
      {
        id: 'customer_support_metrics',
        title: 'Customer Support Metrics',
        description: 'Support ticket resolution, response times, and satisfaction',
        type: 'operational',
        frequency: 'weekly',
        lastGenerated: '2025-01-09',
        status: 'current',
        accessLevel: ['customer_care', 'fo_department', 'directors', 'super_admin'],
        generatedBy: 'Customer Care'
      }
    ];

    // Filter reports based on role access
    return baseReports.filter(report => 
      report.accessLevel.includes(role) || 
      role === 'super_admin' ||
      (role === 'directors' && report.accessLevel.includes('directors'))
    );
  };

  const availableReports = getAvailableReports(userRole);
  
  const filteredReports = availableReports.filter(report => 
    selectedReportType === 'all' || report.type === selectedReportType
  );

  const getReportTypeColor = (type: string) => {
    switch (type) {
      case 'financial': return 'bg-green-100 text-green-700';
      case 'operational': return 'bg-blue-100 text-blue-700';
      case 'hr': return 'bg-purple-100 text-purple-700';
      case 'marketing': return 'bg-pink-100 text-pink-700';
      case 'legal': return 'bg-red-100 text-red-700';
      case 'system': return 'bg-indigo-100 text-indigo-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'overdue': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Reporting Dashboard</h2>
            <p className="text-gray-600">Access reports and analytics for your role</p>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={selectedReportType}
              onChange={(e) => setSelectedReportType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Reports</option>
              <option value="financial">Financial</option>
              <option value="operational">Operational</option>
              <option value="hr">HR</option>
              <option value="marketing">Marketing</option>
              <option value="legal">Legal</option>
              <option value="system">System</option>
            </select>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Reporting Hierarchy Info */}
        {reportingHierarchy && (
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">Your Reporting Structure</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              {reportingHierarchy.reportsTo.length > 0 && (
                <div>
                  <p className="text-blue-700 font-medium">Reports To:</p>
                  <ul className="text-blue-600">
                    {reportingHierarchy.reportsTo.map(role => (
                      <li key={role}>• {ROLE_DEFINITIONS.find(r => r.id === role)?.name}</li>
                    ))}
                  </ul>
                </div>
              )}
              {reportingHierarchy.manages.length > 0 && (
                <div>
                  <p className="text-blue-700 font-medium">Manages:</p>
                  <ul className="text-blue-600">
                    {reportingHierarchy.manages.map(role => (
                      <li key={role}>• {ROLE_DEFINITIONS.find(r => r.id === role)?.name}</li>
                    ))}
                  </ul>
                </div>
              )}
              {reportingHierarchy.canApprove.length > 0 && (
                <div>
                  <p className="text-blue-700 font-medium">Can Approve:</p>
                  <ul className="text-blue-600">
                    {reportingHierarchy.canApprove.map(item => (
                      <li key={item}>• {item.replace('_', ' ')}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredReports.map((report) => (
          <div key={report.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getReportTypeColor(report.type)}`}>
                    {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                  </span>
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(report.status)}`}>
                    {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-1">{report.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{report.description}</p>
                <div className="text-xs text-gray-500">
                  <p>Generated by: {report.generatedBy}</p>
                  <p>Last updated: {new Date(report.lastGenerated).toLocaleDateString()}</p>
                  <p>Frequency: {report.frequency}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Eye className="w-4 h-4 mr-2" />
                View
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Generate New Report */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Generate Custom Report</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
            <option>Select Report Type</option>
            <option value="financial">Financial Report</option>
            <option value="operational">Operational Report</option>
            <option value="hr">HR Report</option>
            <option value="marketing">Marketing Report</option>
          </select>
          <input
            type="date"
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="date"
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <Button>
          <BarChart3 className="w-4 h-4 mr-2" />
          Generate Report
        </Button>
      </div>
    </div>
  );
};