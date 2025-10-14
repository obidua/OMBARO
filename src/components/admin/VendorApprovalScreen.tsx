import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Filter, CheckCircle, XCircle, Clock, AlertCircle, Eye, FileText, Phone, Mail, MapPin, Building, Calendar, Users } from 'lucide-react';
import { Button } from '../ui/Button';
import { VendorApprovalService, VendorApplication } from '../../services/vendor-approval.service';
import { supabase } from '../../lib/supabase';

interface VendorApprovalScreenProps {
  onNavigate: (screen: string) => void;
}

export default function VendorApprovalScreen({ onNavigate }: VendorApprovalScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedApplication, setSelectedApplication] = useState<VendorApplication | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState<'approve' | 'reject' | 'info_required' | null>(null);
  const [actionNote, setActionNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [applications, setApplications] = useState<VendorApplication[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Fetch applications from database
  useEffect(() => {
    fetchApplications();
  }, []);

  async function fetchApplications() {
    setFetchLoading(true);
    setFetchError(null);
    try {
      const result = await VendorApprovalService.getAllApplications();
      if (result.success && result.data) {
        setApplications(result.data);
        console.log('Fetched applications:', result.data);
      } else {
        setFetchError(result.error || 'Failed to fetch applications');
        console.error('Error fetching applications:', result.error);
      }
    } catch (error) {
      console.error('Exception fetching applications:', error);
      setFetchError('An unexpected error occurred');
    } finally {
      setFetchLoading(false);
    }
  }

  const filteredApplications = applications.filter(app => {
    const matchesSearch =
      app.business_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.contact_person.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.contact_email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || app.application_status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const stats = {
    pending: applications.filter(a => a.application_status === 'pending').length,
    underReview: applications.filter(a => a.application_status === 'under_review').length,
    approved: applications.filter(a => a.application_status === 'approved').length,
    rejected: applications.filter(a => a.application_status === 'rejected').length
  };

  function getStatusBadge(status: string) {
    const badges = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock },
      under_review: { bg: 'bg-blue-100', text: 'text-blue-800', icon: Eye },
      approved: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
      rejected: { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle },
      additional_info_required: { bg: 'bg-orange-100', text: 'text-orange-800', icon: AlertCircle }
    };

    const badge = badges[status as keyof typeof badges];
    const Icon = badge.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
        <Icon className="w-4 h-4" />
        {status.replace('_', ' ').toUpperCase()}
      </span>
    );
  }

  function handleViewDetails(application: VendorApplication) {
    setSelectedApplication(application);
    setShowModal(true);
  }

  function handleAction(type: 'approve' | 'reject' | 'info_required') {
    setActionType(type);
  }

  async function confirmAction() {
    if (!selectedApplication || !actionType) return;

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert('Not authenticated');
        return;
      }

      let result;
      if (actionType === 'approve') {
        result = await VendorApprovalService.approveApplication(
          selectedApplication.id,
          user.id,
          actionNote
        );
      } else if (actionType === 'reject') {
        result = await VendorApprovalService.rejectApplication(
          selectedApplication.id,
          user.id,
          actionNote || 'No reason provided'
        );
      }

      if (result?.success) {
        alert(`Application ${actionType === 'approve' ? 'approved' : 'rejected'}!`);
        await fetchApplications();
        setShowModal(false);
        setActionType(null);
        setActionNote('');
        setSelectedApplication(null);
      } else {
        alert(`Failed: ${result?.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error processing action:', error);
      alert('Failed to process action. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => onNavigate('adminDashboard')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Vendor Applications</h1>
            <div className="w-20" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Loading State */}
        {fetchLoading && (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading applications...</p>
          </div>
        )}

        {/* Error State */}
        {fetchError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-red-600" />
              <div>
                <h3 className="font-semibold text-red-900">Error Loading Applications</h3>
                <p className="text-sm text-red-700 mt-1">{fetchError}</p>
                <button
                  onClick={fetchApplications}
                  className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}

        {!fetchLoading && !fetchError && (
        <>
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Under Review</p>
                <p className="text-2xl font-bold text-blue-600">{stats.underReview}</p>
              </div>
              <Eye className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
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
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by business name, contact person, or email..."
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
                <option value="under_review">Under Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="additional_info_required">Info Required</option>
              </select>
            </div>
          </div>
        </div>

        {/* Applications List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Business</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applied Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50">
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
                      <p className="text-sm text-gray-900">{app.city || app.business_address?.city || 'N/A'}</p>
                      <p className="text-sm text-gray-500">{app.state || app.business_address?.state || 'N/A'}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {new Date(app.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(app.application_status)}
                    </td>
                    <td className="px-6 py-4">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleViewDetails(app)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredApplications.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No applications found</p>
            </div>
          )}
        </div>
        </>
        )}
      </div>

      {/* Details Modal */}
      {showModal && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Application Details</h2>
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
                    <p className="text-sm text-gray-600">Application Number</p>
                    <p className="font-medium text-gray-900">{selectedApplication.application_number || selectedApplication.application_data?.application_number || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Partner Type</p>
                    <p className="font-medium text-gray-900">{selectedApplication.partner_type || selectedApplication.application_data?.partner_type || 'N/A'}</p>
                  </div>
                  {(selectedApplication.gst_number || selectedApplication.application_data?.gst_number) && (
                    <div>
                      <p className="text-sm text-gray-600">GST Number</p>
                      <p className="font-medium text-gray-900">{selectedApplication.gst_number || selectedApplication.application_data?.gst_number}</p>
                    </div>
                  )}
                  {(selectedApplication.pan_number || selectedApplication.application_data?.pan_number) && (
                    <div>
                      <p className="text-sm text-gray-600">PAN Number</p>
                      <p className="font-medium text-gray-900">{selectedApplication.pan_number || selectedApplication.application_data?.pan_number}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-600">Years in Business</p>
                    <p className="font-medium text-gray-900">{selectedApplication.years_in_business || selectedApplication.application_data?.years_in_business || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Number of Staff</p>
                    <p className="font-medium text-gray-900">{selectedApplication.number_of_staff || selectedApplication.application_data?.number_of_staff || 'N/A'}</p>
                  </div>
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
                    {selectedApplication.address_line1 || selectedApplication.business_address?.line1}<br />
                    {(selectedApplication.address_line2 || selectedApplication.business_address?.line2) && <>{selectedApplication.address_line2 || selectedApplication.business_address?.line2}<br /></>}
                    {selectedApplication.city || selectedApplication.business_address?.city}, {selectedApplication.state || selectedApplication.business_address?.state}<br />
                    PIN: {selectedApplication.pincode || selectedApplication.business_address?.pincode}
                  </p>
                </div>
              </div>

              {/* Description */}
              {(selectedApplication.description || selectedApplication.application_data?.description) && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-900">{selectedApplication.description || selectedApplication.application_data?.description}</p>
                  </div>
                </div>
              )}

              {/* Action Section */}
              {!actionType ? (
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={() => handleAction('approve')}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Approve
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
              ) : (
                <div className="pt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {actionType === 'approve' ? 'Approval Note (Optional)' :
                       actionType === 'reject' ? 'Rejection Reason' :
                       'Information Required'}
                    </label>
                    <textarea
                      value={actionNote}
                      onChange={(e) => setActionNote(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={
                        actionType === 'approve' ? 'Add any notes for approval...' :
                        actionType === 'reject' ? 'Please provide a reason for rejection...' :
                        'Specify what additional information is needed...'
                      }
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={confirmAction}
                      loading={loading}
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
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
