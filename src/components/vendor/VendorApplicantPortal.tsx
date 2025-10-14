import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, CheckCircle, XCircle, AlertCircle, FileText, RefreshCw, LogOut } from 'lucide-react';
import { Button } from '../ui/Button';
import { VendorApprovalService, VendorApplication, ApprovalHistoryRecord } from '../../services/vendor-approval.service';
import { supabase } from '../../lib/supabase';

interface VendorApplicantPortalProps {
  onLogout: () => void;
  user: any;
}

export const VendorApplicantPortal: React.FC<VendorApplicantPortalProps> = ({ onLogout, user }) => {
  const [applications, setApplications] = useState<VendorApplication[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<VendorApplication | null>(null);
  const [approvalHistory, setApprovalHistory] = useState<ApprovalHistoryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    if (selectedApplication) {
      fetchApprovalHistory(selectedApplication.id);
    }
  }, [selectedApplication]);

  async function fetchApplications() {
    setLoading(true);
    setError(null);
    try {
      const result = await VendorApprovalService.getMyApplications();
      if (result.success && result.data) {
        setApplications(result.data);
        if (result.data.length > 0 && !selectedApplication) {
          setSelectedApplication(result.data[0]);
        }
      } else {
        setError(result.error || 'Failed to fetch applications');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }

  async function fetchApprovalHistory(applicationId: string) {
    try {
      const result = await VendorApprovalService.getApprovalHistory(applicationId);
      if (result.success && result.data) {
        setApprovalHistory(result.data);
      }
    } catch (err) {
      console.error('Error fetching approval history:', err);
    }
  }

  async function handleRefresh() {
    setRefreshing(true);
    await fetchApplications();
    if (selectedApplication) {
      await fetchApprovalHistory(selectedApplication.id);
    }
    setRefreshing(false);
  }

  function getStatusInfo(status: string) {
    const statusMap: Record<string, { label: string; color: string; icon: any; description: string }> = {
      pending: {
        label: 'Pending Review',
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        icon: Clock,
        description: 'Your application is waiting for initial review by our Field Officer team.'
      },
      fo_review: {
        label: 'Field Officer Review',
        color: 'bg-blue-100 text-blue-800 border-blue-200',
        icon: FileText,
        description: 'Your application is being reviewed by our Field Officer.'
      },
      manager_review: {
        label: 'Manager Review',
        color: 'bg-purple-100 text-purple-800 border-purple-200',
        icon: FileText,
        description: 'Your application has been forwarded to our Manager for review.'
      },
      director_review: {
        label: 'Director Review',
        color: 'bg-indigo-100 text-indigo-800 border-indigo-200',
        icon: FileText,
        description: 'Your application is under review by our Director.'
      },
      admin_review: {
        label: 'Final Review',
        color: 'bg-cyan-100 text-cyan-800 border-cyan-200',
        icon: FileText,
        description: 'Your application is in final review stage with our Admin team.'
      },
      approved: {
        label: 'Approved',
        color: 'bg-green-100 text-green-800 border-green-200',
        icon: CheckCircle,
        description: 'Congratulations! Your application has been approved. You now have full vendor portal access.'
      },
      rejected: {
        label: 'Rejected',
        color: 'bg-red-100 text-red-800 border-red-200',
        icon: XCircle,
        description: 'Your application has been rejected. Please see the reason below.'
      },
      additional_info_required: {
        label: 'Additional Information Required',
        color: 'bg-orange-100 text-orange-800 border-orange-200',
        icon: AlertCircle,
        description: 'We need more information from you to process your application.'
      }
    };

    return statusMap[status] || statusMap.pending;
  }

  function getProgressPercentage(stage: number): number {
    return (stage / 5) * 100;
  }

  const approvalStages = [
    { stage: 1, label: 'Submitted', status: 'pending' },
    { stage: 2, label: 'Field Officer', status: 'fo_review' },
    { stage: 3, label: 'Manager', status: 'manager_review' },
    { stage: 4, label: 'Director', status: 'director_review' },
    { stage: 5, label: 'Admin', status: 'admin_review' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your applications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 text-center mb-2">Error Loading Applications</h2>
          <p className="text-gray-600 text-center mb-6">{error}</p>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onLogout} className="flex-1">
              Logout
            </Button>
            <Button onClick={fetchApplications} className="flex-1">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 pt-12 pb-6 px-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-white">Vendor Application Portal</h1>
            <button
              onClick={onLogout}
              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <LogOut className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Applications Found</h2>
            <p className="text-gray-600 mb-8">
              You haven't submitted any vendor applications yet.
            </p>
            <Button onClick={onLogout}>
              Return to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const statusInfo = selectedApplication ? getStatusInfo(selectedApplication.status) : null;
  const StatusIcon = statusInfo?.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 pt-12 pb-6 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white">Vendor Application Portal</h1>
              <p className="text-white/90">Track your application status</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <RefreshCw className={`w-5 h-5 text-white ${refreshing ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={onLogout}
                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <LogOut className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Application Selector */}
          {applications.length > 1 && (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <label className="text-white text-sm font-medium mb-2 block">Select Application</label>
              <select
                value={selectedApplication?.id}
                onChange={(e) => {
                  const app = applications.find(a => a.id === e.target.value);
                  if (app) setSelectedApplication(app);
                }}
                className="w-full px-4 py-2 rounded-lg bg-white text-gray-900"
              >
                {applications.map(app => (
                  <option key={app.id} value={app.id}>
                    {app.business_name} - {app.application_number}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      {selectedApplication && statusInfo && StatusIcon && (
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Status Card */}
          <div className={`rounded-2xl border-2 p-6 mb-6 ${statusInfo.color}`}>
            <div className="flex items-start gap-4">
              <StatusIcon className="w-8 h-8 flex-shrink-0" />
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-2">{statusInfo.label}</h2>
                <p className="text-sm mb-4">{statusInfo.description}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span>Application: <strong>{selectedApplication.application_number}</strong></span>
                  <span>•</span>
                  <span>Submitted: <strong>{new Date(selectedApplication.applied_date).toLocaleDateString()}</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Timeline */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Approval Progress</h3>

            <div className="relative">
              {/* Progress Bar */}
              <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gray-200"></div>
              <div
                className="absolute left-8 top-8 w-0.5 bg-blue-600 transition-all duration-500"
                style={{ height: `${getProgressPercentage(selectedApplication.current_approval_stage)}%` }}
              ></div>

              {/* Stages */}
              <div className="space-y-8">
                {approvalStages.map((stage) => {
                  const isCompleted = selectedApplication.current_approval_stage > stage.stage;
                  const isCurrent = selectedApplication.current_approval_stage === stage.stage;
                  const isPending = selectedApplication.current_approval_stage < stage.stage;

                  return (
                    <div key={stage.stage} className="relative flex items-start gap-4">
                      <div
                        className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isCompleted ? 'bg-green-500' :
                          isCurrent ? 'bg-blue-600' :
                          'bg-gray-200'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle className="w-8 h-8 text-white" />
                        ) : isCurrent ? (
                          <Clock className="w-8 h-8 text-white" />
                        ) : (
                          <span className="text-xl font-bold text-gray-400">{stage.stage}</span>
                        )}
                      </div>
                      <div className="flex-1 pt-3">
                        <h4 className={`font-semibold ${isCurrent ? 'text-blue-600' : 'text-gray-900'}`}>
                          {stage.label}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {isCompleted ? 'Completed' :
                           isCurrent ? 'In Progress' :
                           'Pending'}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Application Details */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Application Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Business Name</p>
                <p className="font-medium">{selectedApplication.business_name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Business Type</p>
                <p className="font-medium capitalize">{selectedApplication.business_type.replace('_', ' ')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Partner Type</p>
                <p className="font-medium">{selectedApplication.partner_type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Contact Person</p>
                <p className="font-medium">{selectedApplication.contact_person}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="font-medium">{selectedApplication.city}, {selectedApplication.state}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Mobile</p>
                <p className="font-medium">{selectedApplication.contact_mobile}</p>
              </div>
            </div>
          </div>

          {/* Approval History */}
          {approvalHistory.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Approval History</h3>
              <div className="space-y-4">
                {approvalHistory.map((record) => (
                  <div key={record.id} className="border-l-4 border-blue-600 pl-4 py-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {record.action === 'approved' ? 'Approved' :
                           record.action === 'rejected' ? 'Rejected' :
                           record.action === 'info_requested' ? 'Information Requested' :
                           'On Hold'}
                        </p>
                        <p className="text-sm text-gray-600">
                          Stage {record.approval_stage} • {new Date(record.created_at).toLocaleString()}
                        </p>
                        {record.comments && (
                          <p className="text-sm text-gray-700 mt-2 italic">"{record.comments}"</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Review Notes */}
          {selectedApplication.review_notes && (
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 mt-6">
              <h3 className="font-semibold text-orange-900 mb-2">Reviewer Notes</h3>
              <p className="text-sm text-orange-800">{selectedApplication.review_notes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
