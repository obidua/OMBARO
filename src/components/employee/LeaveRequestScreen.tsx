import React, { useState } from 'react';
import { ArrowLeft, Calendar, FileText, Clock, CheckCircle, XCircle, AlertCircle, Upload } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { LeaveRequest } from '../../types/hr';

interface LeaveRequestScreenProps {
  employeeId: string;
  onBack: () => void;
}

export const LeaveRequestScreen: React.FC<LeaveRequestScreenProps> = ({
  employeeId,
  onBack
}) => {
  const [activeTab, setActiveTab] = useState<'apply' | 'history'>('apply');
  const [formData, setFormData] = useState({
    leaveType: 'casual',
    fromDate: '',
    toDate: '',
    reason: '',
    documents: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock leave history data
  const leaveHistory: LeaveRequest[] = [
    {
      id: '1',
      employeeId,
      leaveType: 'casual',
      fromDate: '2025-01-10',
      toDate: '2025-01-12',
      days: 3,
      reason: 'Family function',
      status: 'approved',
      appliedDate: '2025-01-05',
      approvedBy: 'Manager',
      approvedDate: '2025-01-06'
    },
    {
      id: '2',
      employeeId,
      leaveType: 'sick',
      fromDate: '2024-12-20',
      toDate: '2024-12-22',
      days: 3,
      reason: 'Fever and cold',
      status: 'approved',
      appliedDate: '2024-12-19',
      approvedBy: 'Manager',
      approvedDate: '2024-12-19'
    },
    {
      id: '3',
      employeeId,
      leaveType: 'earned',
      fromDate: '2025-02-15',
      toDate: '2025-02-20',
      days: 6,
      reason: 'Vacation with family',
      status: 'pending',
      appliedDate: '2025-01-10'
    }
  ];

  const leaveTypes = [
    { value: 'casual', label: 'Casual Leave', balance: 8 },
    { value: 'sick', label: 'Sick Leave', balance: 5 },
    { value: 'earned', label: 'Earned Leave', balance: 15 },
    { value: 'maternity', label: 'Maternity Leave', balance: 180 },
    { value: 'paternity', label: 'Paternity Leave', balance: 15 },
    { value: 'emergency', label: 'Emergency Leave', balance: 3 }
  ];

  const calculateDays = () => {
    if (!formData.fromDate || !formData.toDate) return 0;
    const from = new Date(formData.fromDate);
    const to = new Date(formData.toDate);
    const diffTime = Math.abs(to.getTime() - from.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newLeaveRequest: LeaveRequest = {
        id: Date.now().toString(),
        employeeId,
        leaveType: formData.leaveType as any,
        fromDate: formData.fromDate,
        toDate: formData.toDate,
        days: calculateDays(),
        reason: formData.reason,
        status: 'pending',
        appliedDate: new Date().toISOString().split('T')[0]
      };
      
      console.log('Leave request submitted:', newLeaveRequest);
      
      // Reset form
      setFormData({
        leaveType: 'casual',
        fromDate: '',
        toDate: '',
        reason: '',
        documents: []
      });
      
      // Switch to history tab
      setActiveTab('history');
      
    } catch (error) {
      console.error('Failed to submit leave request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 pt-12 pb-6 px-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            aria-label="Go back to employee dashboard"
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="text-center">
            <h1 className="text-xl font-bold text-white">Leave Management</h1>
            <p className="text-white/90 text-sm">Apply for leave or view history</p>
          </div>
          <div className="w-10" />
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-white/10 backdrop-blur-sm rounded-xl p-1">
          <button
            onClick={() => setActiveTab('apply')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
              activeTab === 'apply'
                ? 'bg-white text-purple-600 shadow-sm'
                : 'text-white/80 hover:text-white'
            }`}
          >
            Apply Leave
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
              activeTab === 'history'
                ? 'bg-white text-purple-600 shadow-sm'
                : 'text-white/80 hover:text-white'
            }`}
          >
            Leave History
          </button>
        </div>
      </div>

      <div className="px-6 py-6">
        {activeTab === 'apply' ? (
          <div className="space-y-6">
            {/* Leave Balance */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Leave Balance</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {leaveTypes.map((type) => (
                  <div key={type.value} className="text-center p-3 bg-gray-50 rounded-xl">
                    <p className="text-2xl font-bold text-purple-600">{type.balance}</p>
                    <p className="text-sm text-gray-600">{type.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Leave Application Form */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Apply for Leave</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Leave Type</label>
                  <select
                    value={formData.leaveType}
                    onChange={(e) => setFormData(prev => ({ ...prev, leaveType: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {leaveTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label} (Balance: {type.balance})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="From Date"
                    type="date"
                    value={formData.fromDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, fromDate: e.target.value }))}
                    min={today}
                    icon={<Calendar className="w-5 h-5 text-gray-400" />}
                  />
                  
                  <Input
                    label="To Date"
                    type="date"
                    value={formData.toDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, toDate: e.target.value }))}
                    min={formData.fromDate || today}
                    icon={<Calendar className="w-5 h-5 text-gray-400" />}
                  />
                </div>

                {formData.fromDate && formData.toDate && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <p className="text-blue-800 font-medium">
                      Total Days: {calculateDays()} days
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
                  <textarea
                    value={formData.reason}
                    onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
                    placeholder="Please provide reason for leave..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Supporting Documents (Optional)</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 mb-2">Upload medical certificate or other documents</p>
                    <Button variant="outline" size="sm">
                      Choose Files
                    </Button>
                  </div>
                </div>

                <Button
                  onClick={handleSubmit}
                  loading={isSubmitting}
                  disabled={!formData.fromDate || !formData.toDate || !formData.reason}
                  size="lg"
                  className="w-full"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Submit Leave Request
                </Button>
              </div>
            </div>
          </div>
        ) : (
          /* Leave History */
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Leave History</h3>
              
              <div className="space-y-4">
                {leaveHistory.map((leave) => (
                  <div key={leave.id} className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900 capitalize">
                          {leave.leaveType.replace('_', ' ')} Leave
                        </h4>
                        <p className="text-sm text-gray-600">
                          {new Date(leave.fromDate).toLocaleDateString()} - {new Date(leave.toDate).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-600">{leave.days} days</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-sm font-medium ${getStatusColor(leave.status)}`}>
                          {getStatusIcon(leave.status)}
                          <span className="capitalize">{leave.status}</span>
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-3">{leave.reason}</p>
                    
                    <div className="text-sm text-gray-500">
                      <p>Applied: {new Date(leave.appliedDate).toLocaleDateString()}</p>
                      {leave.approvedDate && (
                        <p>Approved: {new Date(leave.approvedDate).toLocaleDateString()} by {leave.approvedBy}</p>
                      )}
                      {leave.rejectionReason && (
                        <p className="text-red-600">Reason: {leave.rejectionReason}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};