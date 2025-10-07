import React, { useState, useEffect } from 'react';
import { LucideIcon, DollarSign, TrendingUp, PieChart, BarChart3, FileText, Download, Calendar, Plus } from 'lucide-react';
import { DepartmentDashboardLayout } from './DepartmentDashboardLayout';
import { DashboardStatsGrid, StatCard } from './DashboardStatsGrid';
import { QuickActionsPanel, QuickAction } from './QuickActionsPanel';
import { departmentService } from '../../services/department.service';

export interface ModuleContentConfig {
  moduleKey: string;
  title: string;
  content: React.ReactNode;
}

interface EnhancedDepartmentPortalProps {
  departmentCode: string;
  stats: StatCard[];
  quickActions: QuickAction[];
  moduleContents?: ModuleContentConfig[];
  defaultModule?: string;
  user?: any;
  onBack?: () => void;
  onLogout?: () => void;
  headerGradient?: string;
}

export const EnhancedDepartmentPortal: React.FC<EnhancedDepartmentPortalProps> = ({
  departmentCode,
  stats,
  quickActions,
  moduleContents = [],
  defaultModule = 'overview',
  user,
  onBack,
  onLogout,
  headerGradient
}) => {
  const [activeModule, setActiveModule] = useState(defaultModule);
  const [department, setDepartment] = useState<any>(null);
  const [modules, setModules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    loadDepartmentData();
  }, [departmentCode]);

  const loadDepartmentData = async () => {
    try {
      const dept = await departmentService.getDepartmentByCode(departmentCode);
      if (dept) {
        setDepartment(dept);
        const mods = await departmentService.getDepartmentModules(dept.id);
        setModules(mods);

        const logs = await departmentService.getDepartmentActivityLogs(dept.id, 10);
        setActivities(logs);
      }
    } catch (error) {
      console.error('Error loading department data:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderOverviewContent = () => (
    <>
      <DashboardStatsGrid stats={stats} columns={4} />
      <QuickActionsPanel actions={quickActions} title="Quick Actions" columns={3} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {activities.length > 0 ? (
              activities.slice(0, 5).map((activity, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-600">{activity.description || 'Department activity'}</p>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(activity.created_at).toLocaleDateString()}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm text-center py-4">No recent activity</p>
            )}
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Department Info</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Status</span>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                {department?.status || 'Active'}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Type</span>
              <span className="text-sm text-gray-900 capitalize">
                {department?.department_type || 'Operational'}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Team Size</span>
              <span className="text-sm text-gray-900">
                {department?.employee_count || 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderModuleContent = () => {
    if (activeModule === 'overview') {
      return renderOverviewContent();
    }

    const customContent = moduleContents.find(m => m.moduleKey === activeModule);
    if (customContent) {
      return customContent.content;
    }

    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          {modules.find(m => m.module_key === activeModule)?.module_name || 'Module Content'}
        </h3>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-xl">
          <p className="text-gray-500">Content for this module is under development</p>
        </div>
      </div>
    );
  };

  if (loading || !department) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading department...</p>
        </div>
      </div>
    );
  }

  return (
    <DepartmentDashboardLayout
      department={department}
      modules={modules}
      user={user || {}}
      onLogout={onLogout || onBack || (() => {})}
      activeModule={activeModule}
      onModuleChange={setActiveModule}
      headerGradient={headerGradient}
    >
      {renderModuleContent()}
    </DepartmentDashboardLayout>
  );
};
