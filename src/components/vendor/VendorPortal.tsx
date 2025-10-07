import React, { useState, useEffect } from 'react';
import { Building, Users, Calendar, TrendingUp, DollarSign, Bell, Settings, LogOut } from 'lucide-react';
import { Button } from '../ui/Button';
import { supabase } from '../../lib/supabase';

interface VendorPortalProps {
  vendorId: string;
  onLogout: () => void;
}

export const VendorPortal: React.FC<VendorPortalProps> = ({ vendorId, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [vendor, setVendor] = useState<any>(null);
  const [stats, setStats] = useState({
    totalBookings: 0,
    revenue: 0,
    activeTherapists: 0,
    pendingBookings: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVendorData();
    loadStats();
  }, [vendorId]);

  async function loadVendorData() {
    try {
      const { data, error } = await supabase
        .from('vendors')
        .select('*')
        .eq('id', vendorId)
        .single();

      if (error) throw error;
      setVendor(data);
    } catch (error) {
      console.error('Error loading vendor:', error);
    }
  }

  async function loadStats() {
    try {
      const { count: totalBookings } = await supabase
        .from('bookings')
        .select('*', { count: 'exact', head: true })
        .eq('vendor_id', vendorId);

      const { data: payments } = await supabase
        .from('payments')
        .select('total_amount')
        .in('booking_id',
          (await supabase.from('bookings').select('id').eq('vendor_id', vendorId)).data?.map(b => b.id) || []
        )
        .eq('payment_status', 'completed');

      const { count: activeTherapists } = await supabase
        .from('therapists')
        .select('*', { count: 'exact', head: true })
        .eq('vendor_id', vendorId)
        .eq('is_active', true);

      const { count: pendingBookings } = await supabase
        .from('bookings')
        .select('*', { count: 'exact', head: true })
        .eq('vendor_id', vendorId)
        .eq('booking_status', 'pending');

      const revenue = payments?.reduce((sum, p) => sum + (p.total_amount || 0), 0) || 0;

      setStats({
        totalBookings: totalBookings || 0,
        revenue,
        activeTherapists: activeTherapists || 0,
        pendingBookings: pendingBookings || 0
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Building className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">{vendor?.business_name}</h1>
                <p className="text-sm text-gray-600">{vendor?.partner_type} Partner</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-6">
            {['dashboard', 'bookings', 'therapists', 'analytics', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 border-b-2 font-medium capitalize ${
                  activeTab === tab
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Total Bookings</p>
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{stats.totalBookings}</p>
                <p className="text-xs text-gray-500 mt-1">All time</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Revenue</p>
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">₹{stats.revenue.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">Total earned</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Active Therapists</p>
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{stats.activeTherapists}</p>
                <p className="text-xs text-gray-500 mt-1">Team members</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Pending Bookings</p>
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{stats.pendingBookings}</p>
                <p className="text-xs text-gray-500 mt-1">Awaiting action</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-3 gap-4">
                <Button className="flex items-center justify-center gap-2">
                  <Users className="w-4 h-4" />
                  Add Therapist
                </Button>
                <Button variant="outline" className="flex items-center justify-center gap-2">
                  <Calendar className="w-4 h-4" />
                  View Schedule
                </Button>
                <Button variant="outline" className="flex items-center justify-center gap-2">
                  <Settings className="w-4 h-4" />
                  Manage Services
                </Button>
              </div>
            </div>

            {/* Business Information */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Business Information</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Business Name</p>
                  <p className="font-medium text-gray-900">{vendor?.business_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Business Type</p>
                  <p className="font-medium text-gray-900 capitalize">{vendor?.business_type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Contact Person</p>
                  <p className="font-medium text-gray-900">{vendor?.contact_person}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Mobile</p>
                  <p className="font-medium text-gray-900">{vendor?.contact_mobile}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Location</p>
                  <p className="font-medium text-gray-900">{vendor?.city}, {vendor?.state}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Partner Type</p>
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {vendor?.partner_type}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Commission Rate</p>
                  <p className="font-medium text-gray-900">{vendor?.commission_rate}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    vendor?.is_active
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {vendor?.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Bookings Management</h2>
            <p className="text-gray-600">View and manage your bookings here.</p>
          </div>
        )}

        {activeTab === 'therapists' && (
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Therapist Management</h2>
            <p className="text-gray-600">Manage your team members and their schedules.</p>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Analytics & Reports</h2>
            <p className="text-gray-600">View performance metrics and insights.</p>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Settings</h2>
            <p className="text-gray-600">Configure your business settings and preferences.</p>
          </div>
        )}
      </div>
    </div>
  );
};
