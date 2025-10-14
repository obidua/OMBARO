import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, Clock, XCircle, AlertCircle, FileText, Calendar, User, TrendingUp, MessageCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { VendorApprovalService, VendorApplication, ApprovalHistoryRecord } from '../../services/vendor-approval.service';

interface VendorApplicationStatusProps {
  onBack: () => void;
}

export const VendorApplicationStatus: React.FC<VendorApplicationStatusProps> = ({ onBack }) => {
  const [applications, setApplications] = useState<VendorApplication[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<VendorApplication | null>(null);
  const [approvalHistory, setApprovalHistory] = useState<ApprovalHistoryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    loadApplications();
  }, []);

  async function loadApplications() {
    setLoading(true);
    try {
      const result = await VendorApprovalService.getMyApplications();
      if (result.success && result.data) {
        setApplications(result.data);
        if (result.data.length > 0) {
          setSelectedApplication(result.data[0]);
          loadApprovalHistory(result.data[0].id);
        }
      }
    } catch (error) {
      console.error('Error loading applications:', error);
    } finally {
      setLoading(false);
    }
  }

  async function loadApprovalHistory(applicationId: string) {
    try {
      const result = await VendorApprovalService.getApprovalHistory(applicationId);
      if (result.success && result.data) {
        setApprovalHistory(result.data);
      }
    } catch (error) {
      console.error('Error loading approval history:', error);
    }
  }

  function getStatusInfo(status: string) {
    const statusMap: Record<string, { title: string; description: string; color: string; icon: any }> = {
      pending: {
        title: 'Pending Review',
        description: 'Your application has been submitted and is waiting for initial review by our Field Officer team.',
        color: 'yellow',
        icon: Clock
      },
      fo_review: {
        title: 'Field Officer Review',
        description: 'Your application is currently being reviewed by our Field Officer team.',
        color: 'blue',
        icon: User
      },
      manager_review: {
        title: 'Manager Review',
        description: 'Your application has been forwarded to the Manager level for approval.',
        color: 'purple',
        icon: User
      },
      director_review: {
        title: 'Director Review',
        description: 'Your application is under review by the Director team.',
        color: 'indigo',
        icon: User
      },
      admin_review: {
        title: 'Final Admin Review',
        description: 'Your application is in the final stage of review by our Admin team.',
        color: 'pink',
        icon: User
      },
      approved: {
        title: 'Approved!',
        description: 'Congratulations! Your vendor application has been approved. You can now access your vendor dashboard.',
        color: 'green',
        icon: CheckCircle
      },
      rejected: {
        title: 'Application Rejected',
        description: 'Unfortunately, your application has been rejected. Please review the feedback and consider reapplying.',
        color: 'red',
        icon: XCircle
      },
      additional_info_required: {
        title: 'Additional Information Required',
        description: 'We need more information to process your application. Please provide the requested details.',
        color: 'orange',
        icon: AlertCircle
      },
      on_hold: {
        title: 'Application On Hold',
        description: 'Your application has been temporarily put on hold. We will contact you soon with further details.',
        color: 'gray',
        icon: AlertCircle
      }
    };

    return statusMap[status] || statusMap.pending;
  }

  function getStageProgress(currentStage: number, status: string) {
    if (status === 'approved') return 100;
    if (status === 'rejected' || status === 'on_hold') return 0;
    return (currentStage / 5) * 100;
  }

  const stages = [
    { level: 1, title: 'Field Officer', status: 'pending' },
    { level: 2, title: 'Manager', status: 'manager_review' },
    { level: 3, title: 'Director', status: 'director_review' },
    { level: 4, title: 'Admin', status: 'admin_review' },
    { level: 5, title: 'Approved', status: 'approved' }
  ];

  function isStageCompleted(stageLevel: number, currentStage: number, status: string): boolean {
    if (status === 'approved') return true;
    if (status === 'rejected') return false;
    return stageLevel < currentStage;
  }

  function isStageActive(stageLevel: number, currentStage: number): boolean {
    return stageLevel === currentStage;
  }

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

  if (applications.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Applications Found</h2>
          <p className="text-gray-600 mb-6">You haven't submitted any vendor applications yet.</p>
          <Button onClick={onBack}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Application Status</h1>
          <p className="text-sm text-gray-600 mt-1">Track your vendor application progress</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Application Selector */}
        {applications.length > 1 && (
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Application</label>
            <select
              value={selectedApplication?.id}
              onChange={(e) => {
                const app = applications.find(a => a.id === e.target.value);
                if (app) {
                  setSelectedApplication(app);
                  loadApprovalHistory(app.id);
                }
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {applications.map((app) => (
                <option key={app.id} value={app.id}>
                  {app.application_number} - {app.business_name} ({app.status.replace('_', ' ')})
                </option>
              ))}
            </select>
          </div>
        )}

        {selectedApplication && (
          <>
            {/* Status Card */}
            <div className={`bg-gradient-to-r from-${getStatusInfo(selectedApplication.status).color}-500 to-${getStatusInfo(selectedApplication.status).color}-600 rounded-xl shadow-lg p-6 mb-6 text-white`}>
              <div className="flex items-start gap-4">
                {React.createElement(getStatusInfo(selectedApplication.status).icon, { className: 'w-12 h-12' })}
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">{getStatusInfo(selectedApplication.status).title}</h2>
                  <p className="text-white/90 mb-4">{getStatusInfo(selectedApplication.status).description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <span>{selectedApplication.application_number}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Applied: {new Date(selectedApplication.applied_date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Timeline */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Approval Progress</h3>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Stage {selectedApplication.current_approval_stage} of 5</span>
                  <span className="text-sm text-gray-600">{getStageProgress(selectedApplication.current_approval_stage, selectedApplication.status).toFixed(0)}%</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r from-${getStatusInfo(selectedApplication.status).color}-500 to-${getStatusInfo(selectedApplication.status).color}-600 transition-all duration-500`}
                    style={{ width: `${getStageProgress(selectedApplication.current_approval_stage, selectedApplication.status)}%` }}
                  />
                </div>
              </div>

              {/* Timeline Steps */}
              <div className="space-y-4">
                {stages.map((stage, index) => {
                  const completed = isStageCompleted(stage.level, selectedApplication.current_approval_stage, selectedApplication.status);
                  const active = isStageActive(stage.level, selectedApplication.current_approval_stage);

                  return (
                    <div key={stage.level} className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          completed ? 'bg-green-500 text-white' :
                          active ? 'bg-blue-500 text-white' :
                          'bg-gray-200 text-gray-500'
                        }`}>
                          {completed ? <CheckCircle className="w-6 h-6" /> : stage.level}
                        </div>
                        {index < stages.length - 1 && (
                          <div className={`w-0.5 h-12 ${completed ? 'bg-green-500' : 'bg-gray-200'}`} />
                        )}
                      </div>
                      <div className="flex-1 pt-1">
                        <h4 className={`font-semibold ${active ? 'text-blue-600' : completed ? 'text-green-600' : 'text-gray-600'}`}>
                          {stage.title}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {completed ? 'Completed' : active ? 'In Progress' : 'Pending'}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Application Details */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Business Name</p>
                  <p className="font-medium text-gray-900">{selectedApplication.business_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Business Type</p>
                  <p className="font-medium text-gray-900 capitalize">{selectedApplication.business_type.replace('_', ' ')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Partner Type</p>
                  <p className="font-medium text-gray-900">{selectedApplication.partner_type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="font-medium text-gray-900">{selectedApplication.city}, {selectedApplication.state}</p>
                </div>
              </div>

              {selectedApplication.status !== 'approved' && selectedApplication.status !== 'rejected' && (
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => setShowDetails(!showDetails)}
                >
                  {showDetails ? 'Hide' : 'View'} Full Details
                </Button>
              )}

              {showDetails && (
                <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Contact Person</p>
                    <p className="font-medium text-gray-900">{selectedApplication.contact_person}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Contact Mobile</p>
                    <p className="font-medium text-gray-900">{selectedApplication.contact_mobile}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium text-gray-900">{selectedApplication.contact_email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Address</p>
                    <p className="font-medium text-gray-900">
                      {selectedApplication.address_line1}
                      {selectedApplication.address_line2 && <>, {selectedApplication.address_line2}</>}
                      <br />
                      {selectedApplication.city}, {selectedApplication.state} - {selectedApplication.pincode}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Review Notes */}
            {selectedApplication.review_notes && (
              <div className={`bg-${selectedApplication.status === 'rejected' ? 'red' : selectedApplication.status === 'additional_info_required' ? 'orange' : 'blue'}-50 border border-${selectedApplication.status === 'rejected' ? 'red' : selectedApplication.status === 'additional_info_required' ? 'orange' : 'blue'}-200 rounded-xl p-4 mb-6`}>
                <div className="flex items-start gap-3">
                  <MessageCircle className={`w-5 h-5 text-${selectedApplication.status === 'rejected' ? 'red' : selectedApplication.status === 'additional_info_required' ? 'orange' : 'blue'}-600 flex-shrink-0 mt-0.5`} />
                  <div>
                    <h4 className={`font-semibold text-${selectedApplication.status === 'rejected' ? 'red' : selectedApplication.status === 'additional_info_required' ? 'orange' : 'blue'}-900 mb-1`}>
                      {selectedApplication.status === 'rejected' ? 'Rejection Reason' :
                       selectedApplication.status === 'additional_info_required' ? 'Information Required' :
                       'Reviewer Comments'}
                    </h4>
                    <p className={`text-sm text-${selectedApplication.status === 'rejected' ? 'red' : selectedApplication.status === 'additional_info_required' ? 'orange' : 'blue'}-800`}>
                      {selectedApplication.review_notes}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Approval History */}
            {approvalHistory.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  Approval History
                </h3>
                <div className="space-y-4">
                  {approvalHistory.map((record) => (
                    <div key={record.id} className="flex items-start gap-4 pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        record.action === 'approved' ? 'bg-green-100 text-green-600' :
                        record.action === 'rejected' ? 'bg-red-100 text-red-600' :
                        record.action === 'info_requested' ? 'bg-orange-100 text-orange-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {record.action === 'approved' ? <CheckCircle className="w-5 h-5" /> :
                         record.action === 'rejected' ? <XCircle className="w-5 h-5" /> :
                         <AlertCircle className="w-5 h-5" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <div>
                            <p className="font-medium text-gray-900">
                              {(record as any).approver?.name || 'System'}
                            </p>
                            <p className="text-sm text-gray-600">
                              {(record as any).approver?.designation} - Stage {record.approval_stage}
                            </p>
                          </div>
                          <p className="text-xs text-gray-500">{new Date(record.created_at).toLocaleDateString()}</p>
                        </div>
                        <p className={`text-sm ${
                          record.action === 'approved' ? 'text-green-700' :
                          record.action === 'rejected' ? 'text-red-700' :
                          'text-orange-700'
                        }`}>
                          {record.action === 'approved' ? 'Approved and forwarded to next level' :
                           record.action === 'rejected' ? 'Application rejected' :
                           record.action === 'info_requested' ? 'Additional information requested' :
                           record.action}
                        </p>
                        {record.comments && (
                          <p className="text-sm text-gray-700 mt-2 bg-gray-50 p-2 rounded">{record.comments}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
