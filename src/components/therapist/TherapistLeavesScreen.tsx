import React, { useState } from 'react';
import { ArrowLeft, Calendar, Plus, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface LeaveRequest {
  id: string;
  leave_type: string;
  start_date: string;
  end_date: string;
  total_days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  applied_date: string;
  reviewed_by?: string;
  reviewed_date?: string;
  rejection_reason?: string;
}

interface TherapistLeavesScreenProps {
  onBack: () => void;
}

export const TherapistLeavesScreen: React.FC<TherapistLeavesScreenProps> = ({ onBack }) => {
  const [showNewLeaveForm, setShowNewLeaveForm] = useState(false);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    {
      id: '1',
      leave_type: 'Sick Leave',
      start_date: '2025-01-15',
      end_date: '2025-01-17',
      total_days: 3,
      reason: 'Flu and fever',
      status: 'approved',
      applied_date: '2025-01-10',
      reviewed_by: 'Manager',
      reviewed_date: '2025-01-11'
    },
    {
      id: '2',
      leave_type: 'Casual Leave',
      start_date: '2025-02-05',
      end_date: '2025-02-06',
      total_days: 2,
      reason: 'Personal work',
      status: 'pending',
      applied_date: '2025-01-30'
    }
  ]);

  const [newLeave, setNewLeave] = useState({
    leave_type: 'casual',
    start_date: '',
    end_date: '',
    reason: ''
  });

  const leaveTypes = [
    { value: 'casual', label: 'Casual Leave', available: 8 },
    { value: 'sick', label: 'Sick Leave', available: 12 },
    { value: 'earned', label: 'Earned Leave', available: 15 },
    { value: 'unpaid', label: 'Unpaid Leave', available: 0 }
  ];

  const calculateDays = (start: string, end: string): number => {
    if (!start || !end) return 0;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const handleSubmitLeave = () => {
    const days = calculateDays(newLeave.start_date, newLeave.end_date);
    const newRequest: LeaveRequest = {
      id: (leaveRequests.length + 1).toString(),
      leave_type: leaveTypes.find(t => t.value === newLeave.leave_type)?.label || 'Casual Leave',
      start_date: newLeave.start_date,
      end_date: newLeave.end_date,
      total_days: days,
      reason: newLeave.reason,
      status: 'pending',
      applied_date: new Date().toISOString().split('T')[0]
    };

    setLeaveRequests([newRequest, ...leaveRequests]);
    setShowNewLeaveForm(false);
    setNewLeave({
      leave_type: 'casual',
      start_date: '',
      end_date: '',
      reason: ''
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-[70px] pb-[70px]">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100 fixed top-0 left-0 right-0 z-10">
        <div className="flex items-center justify-between p-4 pt-12">
          <button
            onClick={onBack}
            className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Leave Requests</h1>
          <button
            onClick={() => setShowNewLeaveForm(true)}
            className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center hover:bg-purple-700 transition-colors"
          >
            <Plus className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-6 mt-4">
        {/* Leave Balance */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Leave Balance</h2>
          <div className="grid grid-cols-2 gap-4">
            {leaveTypes.map((type) => (
              <div key={type.value} className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                <p className="text-sm text-white/90 mb-1">{type.label}</p>
                <p className="text-2xl font-bold">{type.available}</p>
                <p className="text-xs text-white/80 mt-1">days available</p>
              </div>
            ))}
          </div>
        </div>

        {/* New Leave Form */}
        {showNewLeaveForm && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-purple-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Request New Leave</h2>
              <button
                onClick={() => setShowNewLeaveForm(false)}
                className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <XCircle className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Leave Type
                </label>
                <select
                  value={newLeave.leave_type}
                  onChange={(e) => setNewLeave({ ...newLeave, leave_type: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {leaveTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label} ({type.available} days available)
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Start Date"
                  type="date"
                  value={newLeave.start_date}
                  onChange={(e) => setNewLeave({ ...newLeave, start_date: e.target.value })}
                />
                <Input
                  label="End Date"
                  type="date"
                  value={newLeave.end_date}
                  onChange={(e) => setNewLeave({ ...newLeave, end_date: e.target.value })}
                />
              </div>

              {newLeave.start_date && newLeave.end_date && (
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-3">
                  <p className="text-sm text-purple-900">
                    Total Days: <span className="font-bold">{calculateDays(newLeave.start_date, newLeave.end_date)}</span>
                  </p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason
                </label>
                <textarea
                  value={newLeave.reason}
                  onChange={(e) => setNewLeave({ ...newLeave, reason: e.target.value })}
                  rows={4}
                  placeholder="Enter reason for leave..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <Button
                onClick={handleSubmitLeave}
                className="w-full"
                disabled={!newLeave.start_date || !newLeave.end_date || !newLeave.reason}
              >
                Submit Leave Request
              </Button>
            </div>
          </div>
        )}

        {/* Leave Requests List */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">My Leave Requests</h2>

          {leaveRequests.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600">No leave requests yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {leaveRequests.map((request) => (
                <div
                  key={request.id}
                  className="border border-gray-200 rounded-xl p-4 hover:border-purple-300 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{request.leave_type}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {new Date(request.start_date).toLocaleDateString()} - {new Date(request.end_date).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(request.status)}`}>
                      {getStatusIcon(request.status)}
                      <span className="capitalize">{request.status}</span>
                    </span>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3 mb-3">
                    <p className="text-sm text-gray-700">{request.reason}</p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>Applied: {new Date(request.applied_date).toLocaleDateString()}</span>
                    <span>{request.total_days} days</span>
                  </div>

                  {request.status === 'approved' && request.reviewed_date && (
                    <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-3">
                      <p className="text-sm text-green-800">
                        Approved by {request.reviewed_by} on {new Date(request.reviewed_date).toLocaleDateString()}
                      </p>
                    </div>
                  )}

                  {request.status === 'rejected' && request.rejection_reason && (
                    <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-sm font-medium text-red-900">Rejection Reason:</p>
                      <p className="text-sm text-red-700 mt-1">{request.rejection_reason}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
