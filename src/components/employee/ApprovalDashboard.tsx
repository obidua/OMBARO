import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, AlertCircle, Eye } from 'lucide-react';
import { Button } from '../ui/Button';
import { supabase } from '../../lib/supabase';

interface Application {
  id: string;
  application_number: string;
  business_name: string;
  contact_person: string;
  contact_mobile: string;
  partner_type: string;
  city: string;
  state: string;
  status: string;
  current_approval_stage: number;
  applied_date: string;
}

export const ApprovalDashboard: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    loadApplications();
  }, []);

  async function loadApplications() {
    try {
      const { data, error } = await supabase
        .from('vendor_applications')
        .select('*')
        .in('status', ['pending', 'fo_review', 'manager_review', 'director_review', 'admin_review'])
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error('Error loading applications:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAction(applicationId: string, action: 'approve' | 'reject', comments: string) {
    setActionLoading(true);
    try {
      if (action === 'approve') {
        const { error } = await supabase
          .from('vendor_applications')
          .update({
            status: 'approved',
            current_approval_stage: 4,
            updated_at: new Date().toISOString()
          })
          .eq('id', applicationId);

        if (error) throw error;

        await supabase
          .from('vendors')
          .insert({
            application_id: applicationId,
            partner_type: selectedApp?.partner_type,
            business_name: selectedApp?.business_name,
            business_type: 'spa',
            contact_person: selectedApp?.contact_person,
            contact_mobile: selectedApp?.contact_mobile,
            contact_email: '',
            address_line1: '',
            city: selectedApp?.city || '',
            state: selectedApp?.state || '',
            pincode: '',
            is_active: true,
            verification_status: 'verified'
          });

        alert('Application approved successfully!');
      } else {
        const { error } = await supabase
          .from('vendor_applications')
          .update({
            status: 'rejected',
            review_notes: comments,
            updated_at: new Date().toISOString()
          })
          .eq('id', applicationId);

        if (error) throw error;
        alert('Application rejected');
      }

      setSelectedApp(null);
      loadApplications();
    } catch (error) {
      console.error('Error processing action:', error);
      alert('Failed to process action');
    } finally {
      setActionLoading(false);
    }
  }

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { bg: string; text: string; icon: any }> = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock },
      fo_review: { bg: 'bg-blue-100', text: 'text-blue-800', icon: Eye },
      manager_review: { bg: 'bg-purple-100', text: 'text-purple-800', icon: Eye },
      director_review: { bg: 'bg-indigo-100', text: 'text-indigo-800', icon: Eye },
      admin_review: { bg: 'bg-pink-100', text: 'text-pink-800', icon: Eye },
      approved: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
      rejected: { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle }
    };

    const badge = badges[status] || badges.pending;
    const Icon = badge.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
        <Icon className="w-4 h-4" />
        {status.replace('_', ' ').toUpperCase()}
      </span>
    );
  };

  if (loading) {
    return <div className="p-8 text-center">Loading applications...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Vendor Approval Dashboard</h1>
        <p className="text-gray-600 mb-8">Review and approve vendor applications</p>

        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-yellow-50 p-4 rounded-xl">
            <p className="text-sm text-gray-600">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">
              {applications.filter(a => a.status === 'pending').length}
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-xl">
            <p className="text-sm text-gray-600">In Review</p>
            <p className="text-2xl font-bold text-blue-600">
              {applications.filter(a => a.status.includes('review')).length}
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-xl">
            <p className="text-sm text-gray-600">Approved</p>
            <p className="text-2xl font-bold text-green-600">
              {applications.filter(a => a.status === 'approved').length}
            </p>
          </div>
          <div className="bg-red-50 p-4 rounded-xl">
            <p className="text-sm text-gray-600">Rejected</p>
            <p className="text-2xl font-bold text-red-600">
              {applications.filter(a => a.status === 'rejected').length}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{app.business_name}</h3>
                    {getStatusBadge(app.status)}
                    <span className="text-xs text-gray-500">{app.application_number}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Contact Person</p>
                      <p className="font-medium">{app.contact_person}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Mobile</p>
                      <p className="font-medium">{app.contact_mobile}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Location</p>
                      <p className="font-medium">{app.city}, {app.state}</p>
                    </div>
                  </div>
                  <div className="mt-3 text-sm">
                    <span className="px-2 py-1 bg-gray-100 rounded-lg text-gray-700">
                      {app.partner_type}
                    </span>
                    <span className="ml-3 text-gray-500">
                      Applied: {new Date(app.applied_date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedApp(app)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Review
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {applications.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p>No pending applications</p>
            </div>
          )}
        </div>
      </div>

      {selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Application</h2>

            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Business Name</p>
                  <p className="font-semibold">{selectedApp.business_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Partner Type</p>
                  <p className="font-semibold">{selectedApp.partner_type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Contact Person</p>
                  <p className="font-semibold">{selectedApp.contact_person}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Mobile</p>
                  <p className="font-semibold">{selectedApp.contact_mobile}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="font-semibold">{selectedApp.city}, {selectedApp.state}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  {getStatusBadge(selectedApp.status)}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => handleAction(selectedApp.id, 'approve', '')}
                disabled={actionLoading}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                {actionLoading ? 'Processing...' : 'Approve'}
              </Button>
              <Button
                onClick={() => handleAction(selectedApp.id, 'reject', 'Not meeting criteria')}
                disabled={actionLoading}
                variant="outline"
                className="flex-1 text-red-600 border-red-600 hover:bg-red-50"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Reject
              </Button>
              <Button
                onClick={() => setSelectedApp(null)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
