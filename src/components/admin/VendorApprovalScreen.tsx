import React, { useState } from 'react';
import { ArrowLeft, Search, Filter, CheckCircle, XCircle, Clock, AlertCircle, Eye, FileText, Phone, Mail, MapPin, Building, Calendar, Users } from 'lucide-react';
import { Button } from '../ui/Button';

interface VendorApprovalScreenProps {
  onNavigate: (screen: string) => void;
}

interface VendorApplication {
  id: string;
  businessName: string;
  businessType: string;
  contactPerson: string;
  contactMobile: string;
  contactEmail: string;
  address: {
    addressLine1: string;
    city: string;
    state: string;
    pincode: string;
  };
  gstNumber?: string;
  panNumber?: string;
  yearsInBusiness?: number;
  numberOfStaff?: number;
  description?: string;
  status: 'pending' | 'under_review' | 'approved' | 'rejected' | 'additional_info_required';
  appliedDate: string;
  applicantName: string;
  applicantEmail: string;
}

export default function VendorApprovalScreen({ onNavigate }: VendorApprovalScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedApplication, setSelectedApplication] = useState<VendorApplication | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState<'approve' | 'reject' | 'info_required' | null>(null);
  const [actionNote, setActionNote] = useState('');
  const [loading, setLoading] = useState(false);

  // Mock data - In real implementation, fetch from Supabase
  const applications: VendorApplication[] = [
    {
      id: '1',
      businessName: 'Serenity Spa & Wellness',
      businessType: 'spa',
      contactPerson: 'Rajesh Kumar',
      contactMobile: '9876543210',
      contactEmail: 'rajesh@serenityspa.com',
      address: {
        addressLine1: '123 MG Road',
        city: 'Bangalore',
        state: 'Karnataka',
        pincode: '560001'
      },
      gstNumber: '29ABCDE1234F1Z5',
      panNumber: 'ABCDE1234F',
      yearsInBusiness: 5,
      numberOfStaff: 15,
      description: 'Premium spa offering Swedish, Thai, and Ayurvedic treatments',
      status: 'pending',
      appliedDate: '2025-01-02',
      applicantName: 'Rajesh Kumar',
      applicantEmail: 'rajesh@serenityspa.com'
    },
    {
      id: '2',
      businessName: 'Glamour Beauty Salon',
      businessType: 'salon',
      contactPerson: 'Priya Sharma',
      contactMobile: '9876543211',
      contactEmail: 'priya@glamoursalon.com',
      address: {
        addressLine1: '45 Brigade Road',
        city: 'Bangalore',
        state: 'Karnataka',
        pincode: '560025'
      },
      yearsInBusiness: 3,
      numberOfStaff: 8,
      description: 'Modern salon specializing in hair and beauty treatments',
      status: 'under_review',
      appliedDate: '2025-01-01',
      applicantName: 'Priya Sharma',
      applicantEmail: 'priya@glamoursalon.com'
    },
    {
      id: '3',
      businessName: 'Wellness Home Services',
      businessType: 'home_service',
      contactPerson: 'Amit Patel',
      contactMobile: '9876543212',
      contactEmail: 'amit@wellnesshome.com',
      address: {
        addressLine1: '789 Koramangala',
        city: 'Bangalore',
        state: 'Karnataka',
        pincode: '560034'
      },
      yearsInBusiness: 2,
      numberOfStaff: 20,
      description: 'Professional home spa and massage services',
      status: 'approved',
      appliedDate: '2024-12-28',
      applicantName: 'Amit Patel',
      applicantEmail: 'amit@wellnesshome.com'
    }
  ];

  const filteredApplications = applications.filter(app => {
    const matchesSearch =
      app.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.contactEmail.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const stats = {
    pending: applications.filter(a => a.status === 'pending').length,
    underReview: applications.filter(a => a.status === 'under_review').length,
    approved: applications.filter(a => a.status === 'approved').length,
    rejected: applications.filter(a => a.status === 'rejected').length
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
      // Simulate API call - In real implementation, update Supabase
      await new Promise(resolve => setTimeout(resolve, 1500));

      alert(`Application ${actionType === 'approve' ? 'approved' : actionType === 'reject' ? 'rejected' : 'marked for additional info'}!`);

      setShowModal(false);
      setActionType(null);
      setActionNote('');
      setSelectedApplication(null);
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
                        <p className="font-medium text-gray-900">{app.businessName}</p>
                        <p className="text-sm text-gray-500 capitalize">{app.businessType.replace('_', ' ')}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm text-gray-900">{app.contactPerson}</p>
                        <p className="text-sm text-gray-500">{app.contactMobile}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900">{app.address.city}</p>
                      <p className="text-sm text-gray-500">{app.address.state}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {new Date(app.appliedDate).toLocaleDateString()}
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
                    <p className="font-medium text-gray-900">{selectedApplication.businessName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Business Type</p>
                    <p className="font-medium text-gray-900 capitalize">
                      {selectedApplication.businessType.replace('_', ' ')}
                    </p>
                  </div>
                  {selectedApplication.gstNumber && (
                    <div>
                      <p className="text-sm text-gray-600">GST Number</p>
                      <p className="font-medium text-gray-900">{selectedApplication.gstNumber}</p>
                    </div>
                  )}
                  {selectedApplication.panNumber && (
                    <div>
                      <p className="text-sm text-gray-600">PAN Number</p>
                      <p className="font-medium text-gray-900">{selectedApplication.panNumber}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-600">Years in Business</p>
                    <p className="font-medium text-gray-900">{selectedApplication.yearsInBusiness || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Number of Staff</p>
                    <p className="font-medium text-gray-900">{selectedApplication.numberOfStaff || 'N/A'}</p>
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
                    <p className="font-medium text-gray-900">{selectedApplication.contactPerson}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Mobile</p>
                    <p className="font-medium text-gray-900">{selectedApplication.contactMobile}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium text-gray-900">{selectedApplication.contactEmail}</p>
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
                    {selectedApplication.address.addressLine1}<br />
                    {selectedApplication.address.city}, {selectedApplication.address.state}<br />
                    PIN: {selectedApplication.address.pincode}
                  </p>
                </div>
              </div>

              {/* Description */}
              {selectedApplication.description && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-900">{selectedApplication.description}</p>
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
