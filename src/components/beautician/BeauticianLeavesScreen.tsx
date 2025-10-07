import React, { useState } from 'react';
import { ArrowLeft, Calendar, Plus, Check, X, Clock, FileText } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface BeauticianLeavesScreenProps {
  beauticianId: string;
  onBack: () => void;
}

export const BeauticianLeavesScreen: React.FC<BeauticianLeavesScreenProps> = ({
  beauticianId,
  onBack
}) => {
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [leaveData, setLeaveData] = useState({
    startDate: '',
    endDate: '',
    reason: '',
    leaveType: 'casual'
  });

  const [leaves] = useState([
    {
      id: '1',
      startDate: '2025-10-15',
      endDate: '2025-10-17',
      reason: 'Family function',
      leaveType: 'casual',
      status: 'pending',
      appliedAt: '2025-10-07',
      days: 3
    },
    {
      id: '2',
      startDate: '2025-09-20',
      endDate: '2025-09-22',
      reason: 'Medical emergency',
      leaveType: 'sick',
      status: 'approved',
      appliedAt: '2025-09-15',
      approvedAt: '2025-09-16',
      days: 3
    },
    {
      id: '3',
      startDate: '2025-08-10',
      endDate: '2025-08-10',
      reason: 'Personal work',
      leaveType: 'casual',
      status: 'rejected',
      appliedAt: '2025-08-05',
      rejectedAt: '2025-08-06',
      rejectionReason: 'Peak season, too many pending appointments',
      days: 1
    }
  ]);

  const [leaveBalance] = useState({
    casual: { total: 12, used: 4, remaining: 8 },
    sick: { total: 10, used: 3, remaining: 7 },
    earned: { total: 5, used: 0, remaining: 5 }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-700 border-green-300';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'rejected': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <Check className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'rejected': return <X className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const handleSubmitLeave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Leave application submitted successfully! You will be notified once it is reviewed.');
    setShowApplyForm(false);
    setLeaveData({ startDate: '', endDate: '', reason: '', leaveType: 'casual' });
  };

  const handleCancelLeave = (leaveId: string) => {
    if (confirm('Are you sure you want to cancel this leave request?')) {
      alert('Leave request cancelled successfully.');
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gray-50 pt-[70px] pb-[70px]">
      <div className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={onBack}
            aria-label="Go back"
            className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Leave Management</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Leave Balance</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
              <p className="text-sm text-blue-700 font-medium mb-2">Casual Leave</p>
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-bold text-blue-900">{leaveBalance.casual.remaining}</span>
                <span className="text-sm text-blue-600">/ {leaveBalance.casual.total} days</span>
              </div>
              <p className="text-xs text-blue-600 mt-1">{leaveBalance.casual.used} used</p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-3">
              <p className="text-sm text-green-700 font-medium mb-2">Sick Leave</p>
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-bold text-green-900">{leaveBalance.sick.remaining}</span>
                <span className="text-sm text-green-600">/ {leaveBalance.sick.total} days</span>
              </div>
              <p className="text-xs text-green-600 mt-1">{leaveBalance.sick.used} used</p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-xl p-3">
              <p className="text-sm text-purple-700 font-medium mb-2">Earned Leave</p>
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-bold text-purple-900">{leaveBalance.earned.remaining}</span>
                <span className="text-sm text-purple-600">/ {leaveBalance.earned.total} days</span>
              </div>
              <p className="text-xs text-purple-600 mt-1">{leaveBalance.earned.used} used</p>
            </div>
          </div>
        </div>

        {!showApplyForm ? (
          <Button
            onClick={() => setShowApplyForm(true)}
            className="w-full"
          >
            <Plus className="w-5 h-5 mr-2" />
            Apply for Leave
          </Button>
        ) : (
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Apply for Leave</h3>

            <form onSubmit={handleSubmitLeave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Leave Type</label>
                <select
                  value={leaveData.leaveType}
                  onChange={(e) => setLeaveData({ ...leaveData, leaveType: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                >
                  <option value="casual">Casual Leave</option>
                  <option value="sick">Sick Leave</option>
                  <option value="earned">Earned Leave</option>
                </select>
              </div>

              <Input
                label="Start Date"
                type="date"
                value={leaveData.startDate}
                onChange={(e) => setLeaveData({ ...leaveData, startDate: e.target.value })}
                min={today}
                required
              />

              <Input
                label="End Date"
                type="date"
                value={leaveData.endDate}
                onChange={(e) => setLeaveData({ ...leaveData, endDate: e.target.value })}
                min={leaveData.startDate || today}
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
                <textarea
                  value={leaveData.reason}
                  onChange={(e) => setLeaveData({ ...leaveData, reason: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  rows={3}
                  placeholder="Please provide reason for leave"
                  required
                />
              </div>

              <div className="flex space-x-3">
                <Button type="submit" className="flex-1">
                  Submit Application
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowApplyForm(false);
                    setLeaveData({ startDate: '', endDate: '', reason: '', leaveType: 'casual' });
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Leave History</h3>

          <div className="space-y-3">
            {leaves.map(leave => (
              <div
                key={leave.id}
                className="border border-gray-200 rounded-xl p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(leave.status)}`}>
                        {getStatusIcon(leave.status)}
                        <span className="capitalize">{leave.status}</span>
                      </span>
                      <span className="text-xs text-gray-600 capitalize">
                        {leave.leaveType} Leave
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-900">
                          {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                        </span>
                        <span className="text-xs text-gray-600">({leave.days} {leave.days === 1 ? 'day' : 'days'})</span>
                      </div>

                      <div className="flex items-start space-x-2">
                        <FileText className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{leave.reason}</span>
                      </div>

                      <p className="text-xs text-gray-500 mt-2">
                        Applied on {new Date(leave.appliedAt).toLocaleDateString()}
                      </p>

                      {leave.status === 'approved' && leave.approvedAt && (
                        <p className="text-xs text-green-600">
                          Approved on {new Date(leave.approvedAt).toLocaleDateString()}
                        </p>
                      )}

                      {leave.status === 'rejected' && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-2 mt-2">
                          <p className="text-xs text-red-800">
                            <strong>Rejection Reason:</strong> {leave.rejectionReason}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {leave.status === 'pending' && (
                  <Button
                    onClick={() => handleCancelLeave(leave.id)}
                    variant="outline"
                    size="sm"
                    className="w-full text-red-600 border-red-300 hover:bg-red-50"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel Request
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <h4 className="font-medium text-yellow-900 mb-2">Leave Policy</h4>
          <ul className="text-sm text-yellow-800 space-y-1">
            <li>• Leave requests should be submitted at least 3 days in advance</li>
            <li>• Emergency leaves can be applied on the same day with valid reason</li>
            <li>• Unused leaves cannot be carried forward to next year</li>
            <li>• Medical certificate required for sick leave exceeding 2 days</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
