import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Filter, CheckCircle, XCircle, Clock, AlertCircle, Eye, FileText, Phone, Mail, MapPin, Building, Calendar, Users, TrendingUp } from 'lucide-react';
import { Button } from '../ui/Button';
import { VendorApprovalService, VendorApplication, ApprovalHistoryRecord, Employee } from '../../services/vendor-approval.service';

interface VendorApprovalDashboardProps {
  employee: Employee;
  onBack: () => void;
}

export const VendorApprovalDashboard: React.FC<VendorApprovalDashboardProps> = ({ employee, onBack }) => {
  const [applications, setApplications] = useState<VendorApplication[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<VendorApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedApplication, setSelectedApplication] = useState<VendorApplication | null>(null);
  const [approvalHistory, setApprovalHistory] = useState<ApprovalHistoryRecord[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState<'approve' | 'reject' | 'info_required' | null>(null);
  const [actionNote, setActionNote] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    loadApplications();
  }, [employee]);

  useEffect(() => {
    filterApplications();
  }, [searchQuery, statusFilter, applications]);

  async function loadApplications() {
    setLoading(true);
    try {
      let result;

      // Admins can see all applications
      if (employee.hierarchy_level >= 4) {
        result = await VendorApprovalService.getAllApplications();
      } else {
        // Other levels see applications at their stage
        result = await VendorApprovalService.getApplicationsForLevel(employee.hierarchy_level);
      }

      if (result.success && result.data) {
        setApplications(result.data);
      } else {
        console.error('Error loading applications:', result.error);
      }
    } catch (error) {
      console.error('Error in loadApplications:', error);
    } finally {
      setLoading(false);
    }
  }

  function filterApplications() {
    let filtered = [...applications];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(app =>
        app.business_name.toLowerCase().includes(query) ||
        app.contact_person.toLowerCase().includes(query) ||
        app.contact_email.toLowerCase().includes(query) ||
        app.application_number.toLowerCase().includes(query)
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    setFilteredApplications(filtered);
  }

  async function handleViewDetails(application: VendorApplication) {
    setSelectedApplication(application);

    // Load approval history
    const result = await VendorApprovalService.getApprovalHistory(application.id);
    if (result.success && result.data) {
      setApprovalHistory(result.data);
    }

    setShowModal(true);
  }

  function handleAction(type: 'approve' | 'reject' | 'info_required') {
    setActionType(type);
    setActionNote('');
  }

  async function confirmAction() {
    if (!selectedApplication || !actionType) return;

    setActionLoading(true);
    try {
      let result;

      switch (actionType) {
        case 'approve':
          result = await VendorApprovalService.approveApplication(
            selectedApplication.id,
            employee.id,
            actionNote
          );
          break;
        case 'reject':
          result = await VendorApprovalService.rejectApplication(
            selectedApplication.id,
            employee.id,
            actionNote || 'Application rejected'
          );
          break;
        case 'info_required':
          result = await VendorApprovalService.requestAdditionalInfo(
            selectedApplication.id,
            employee.id,
            actionNote || 'Additional information required'
          );
          break;
      }

      if (result.success) {
        alert(
          actionType === 'approve' ? 'Application approved and forwarded to next level!' :
          actionType === 'reject' ? 'Application rejected' :
          'Additional information requested from applicant'
        );
        setShowModal(false);
        setActionType(null);
        setActionNote('');
        setSelectedApplication(null);
        loadApplications();
      } else {
        alert('Error: ' + result.error);
      }
    } catch (error: any) {
      console.error('Error processing action:', error);
      alert('Failed to process action: ' + error.message);
    } finally {
      setActionLoading(false);
    }
  }

  function getStatusBadge(status: string) {
    const badges: Record<string, { bg: string; text: string; icon: any }> = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock },
      fo_review: { bg: 'bg-blue-100', text: 'text-blue-800', icon: Eye },
      manager_review: { bg: 'bg-purple-100', text: 'text-purple-800', icon: Eye },
      director_review: { bg: 'bg-indigo-100', text: 'text-indigo-800', icon: Eye },
      admin_review: { bg: 'bg-pink-100', text: 'text-pink-800', icon: Eye },
      approved: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
      rejected: { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle },
      on_hold: { bg: 'bg-gray-100', text: 'text-gray-800', icon: AlertCircle },
      additional_info_required: { bg: 'bg-orange-100', text: 'text-orange-800', icon: AlertCircle }
    };

    const badge = badges[status] || badges.pending;
    const Icon = badge.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
        <Icon className="w-4 h-4" />
        {status.replace(/_/g, ' ').toUpperCase()}
      </span>
    );
  }

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    underReview: applications.filter(a => a.status.includes('review')).length,
    approved: applications.filter(a => a.status === 'approved').length,
    rejected: applications.filter(a => a.status === 'rejected').length
  };

  const canApprove = (app: VendorApplication): boolean => {
    const levelMap: Record<number, string[]> = {
      1: ['pending', 'fo_review'],
      2: ['manager_review'],
      3: ['director_review'],
      4: ['admin_review'],
      5: ['admin_review']
    };

    return levelMap[employee.hierarchy_level]?.includes(app.status) || false;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">Vendor Applications</h1>
              <p className="text-sm text-gray-600">{employee.designation} - Level {employee.hierarchy_level}</p>
            </div>
            <div className="w-20" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">In Review</p>
                <p className="text-2xl font-bold text-blue-600">{stats.underReview}</p>
              </div>
              <Eye className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by business name, contact, email, or application number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="fo_review">FO Review</option>
                <option value="manager_review">Manager Review</option>
                <option value="director_review">Director Review</option>
                <option value="admin_review">Admin Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="additional_info_required">Info Required</option>
              </select>
            </div>
          </div>
        </div>

        {/* Applications List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {filteredApplications.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Application</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Business</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Partner Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applied Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="font-medium text-gray-900">{app.application_number}</p>
                            <p className="text-xs text-gray-500">Stage {app.current_approval_stage}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{app.business_name}</p>
                          <p className="text-sm text-gray-500 capitalize">{app.business_type.replace('_', ' ')}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm text-gray-900">{app.contact_person}</p>
                          <p className="text-sm text-gray-500">{app.contact_mobile}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm text-gray-900">{app.city}</p>
                          <p className="text-sm text-gray-500">{app.state}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-lg text-xs font-medium">
                          {app.partner_type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {new Date(app.applied_date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(app.status)}
                      </td>
                      <td className="px-6 py-4">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleViewDetails(app)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Review
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No applications found</p>
              {searchQuery || statusFilter !== 'all' ? (
                <p className="text-sm text-gray-400 mt-2">Try adjusting your search or filters</p>
              ) : null}
            </div>
          )}
        </div>
      </div>

      {/* Details Modal */}
      {showModal && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto my-8">
            <div className="sticky top-0 bg-white p-6 border-b border-gray-200 z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Application Details</h2>
                  <p className="text-sm text-gray-600 mt-1">{selectedApplication.application_number}</p>
                </div>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setActionType(null);
                    setActionNote('');
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Current Status */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  Current Status
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      {getStatusBadge(selectedApplication.status)}
                      <p className="text-sm text-gray-600 mt-2">Approval Stage: {selectedApplication.current_approval_stage} of 5</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Applied on</p>
                      <p className="font-medium text-gray-900">{new Date(selectedApplication.applied_date).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Building className="w-5 h-5 text-blue-600" />
                  Business Information
                </h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Business Name</p>
                    <p className="font-medium text-gray-900">{selectedApplication.business_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Business Type</p>
                    <p className="font-medium text-gray-900 capitalize">
                      {selectedApplication.business_type.replace('_', ' ')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Partner Type</p>
                    <p className="font-medium text-gray-900">{selectedApplication.partner_type}</p>
                  </div>
                  {selectedApplication.years_in_business && (
                    <div>
                      <p className="text-sm text-gray-600">Years in Business</p>
                      <p className="font-medium text-gray-900">{selectedApplication.years_in_business} years</p>
                    </div>
                  )}
                  {selectedApplication.number_of_staff && (
                    <div>
                      <p className="text-sm text-gray-600">Number of Staff</p>
                      <p className="font-medium text-gray-900">{selectedApplication.number_of_staff}</p>
                    </div>
                  )}
                  {selectedApplication.gst_number && (
                    <div>
                      <p className="text-sm text-gray-600">GST Number</p>
                      <p className="font-medium text-gray-900">{selectedApplication.gst_number}</p>
                    </div>
                  )}
                  {selectedApplication.pan_number && (
                    <div>
                      <p className="text-sm text-gray-600">PAN Number</p>
                      <p className="font-medium text-gray-900">{selectedApplication.pan_number}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-green-600" />
                  Contact Information
                </h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Contact Person</p>
                    <p className="font-medium text-gray-900">{selectedApplication.contact_person}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Mobile</p>
                    <p className="font-medium text-gray-900">{selectedApplication.contact_mobile}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium text-gray-900">{selectedApplication.contact_email}</p>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-red-600" />
                  Business Address
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-900">
                    {selectedApplication.address_line1}
                    {selectedApplication.address_line2 && <>, {selectedApplication.address_line2}</>}
                    <br />
                    {selectedApplication.city}, {selectedApplication.state} - {selectedApplication.pincode}
                  </p>
                  {selectedApplication.latitude && selectedApplication.longitude && (
                    <p className="text-sm text-gray-600 mt-2">
                      Coordinates: {selectedApplication.latitude.toFixed(6)}, {selectedApplication.longitude.toFixed(6)}
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}
              {selectedApplication.description && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Description</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-900">{selectedApplication.description}</p>
                  </div>
                </div>
              )}

              {/* Approval History */}
              {approvalHistory.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-purple-600" />
                    Approval History
                  </h3>
                  <div className="space-y-3">
                    {approvalHistory.map((record, index) => (
                      <div key={record.id} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                record.action === 'approved' ? 'bg-green-100 text-green-800' :
                                record.action === 'rejected' ? 'bg-red-100 text-red-800' :
                                record.action === 'info_requested' ? 'bg-orange-100 text-orange-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {record.action.toUpperCase()}
                              </span>
                              <span className="text-sm text-gray-600">Stage {record.approval_stage}</span>
                            </div>
                            <p className="text-sm text-gray-900 mb-1">
                              <span className="font-medium">{(record as any).approver?.name}</span>
                              {' - '}
                              <span className="text-gray-600">{(record as any).approver?.designation}</span>
                            </p>
                            {record.comments && (
                              <p className="text-sm text-gray-700 mt-2">{record.comments}</p>
                            )}
                          </div>
                          <p className="text-xs text-gray-500">{new Date(record.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Review Notes */}
              {selectedApplication.review_notes && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Review Notes</h3>
                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                    <p className="text-gray-900">{selectedApplication.review_notes}</p>
                  </div>
                </div>
              )}

              {/* Action Section */}
              {canApprove(selectedApplication) && !actionType ? (
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <Button
                    onClick={() => handleAction('approve')}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Approve & Forward
                  </Button>
                  <Button
                    onClick={() => handleAction('info_required')}
                    variant="secondary"
                    className="flex-1"
                  >
                    <AlertCircle className="w-5 h-5 mr-2" />
                    Request Info
                  </Button>
                  <Button
                    onClick={() => handleAction('reject')}
                    className="flex-1 bg-red-600 hover:bg-red-700"
                  >
                    <XCircle className="w-5 h-5 mr-2" />
                    Reject
                  </Button>
                </div>
              ) : actionType ? (
                <div className="pt-4 space-y-4 border-t border-gray-200">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {actionType === 'approve' ? 'Approval Comments (Optional)' :
                       actionType === 'reject' ? 'Rejection Reason *' :
                       'Information Required *'}
                    </label>
                    <textarea
                      value={actionNote}
                      onChange={(e) => setActionNote(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={
                        actionType === 'approve' ? 'Add any notes or observations...' :
                        actionType === 'reject' ? 'Please provide a clear reason for rejection...' :
                        'Specify what additional information or documents are needed...'
                      }
                      required={actionType !== 'approve'}
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={confirmAction}
                      loading={actionLoading}
                      disabled={actionType !== 'approve' && !actionNote.trim()}
                      className={`flex-1 ${
                        actionType === 'approve' ? 'bg-green-600 hover:bg-green-700' :
                        actionType === 'reject' ? 'bg-red-600 hover:bg-red-700' :
                        'bg-orange-600 hover:bg-orange-700'
                      }`}
                    >
                      Confirm {actionType === 'approve' ? 'Approval' : actionType === 'reject' ? 'Rejection' : 'Request'}
                    </Button>
                    <Button
                      onClick={() => {
                        setActionType(null);
                        setActionNote('');
                      }}
                      variant="secondary"
                      className="flex-1"
                      disabled={actionLoading}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : !canApprove(selectedApplication) ? (
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    This application is not at your approval level. Current status: {selectedApplication.status.replace('_', ' ')}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
