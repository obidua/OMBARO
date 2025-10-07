import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Building, Phone, Mail, MapPin, Globe, Clock, CreditCard, FileText, User, Camera } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { supabase } from '../../lib/supabase';

interface VendorProfileSettingsScreenProps {
  vendorId: string;
  onBack: () => void;
}

export const VendorProfileSettingsScreen: React.FC<VendorProfileSettingsScreenProps> = ({ vendorId, onBack }) => {
  const [activeTab, setActiveTab] = useState('business');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [vendorData, setVendorData] = useState<any>(null);

  useEffect(() => {
    loadVendorData();
  }, [vendorId]);

  async function loadVendorData() {
    try {
      const { data, error } = await supabase
        .from('vendors')
        .select('*')
        .eq('id', vendorId)
        .single();

      if (error) throw error;
      setVendorData(data);
    } catch (error) {
      console.error('Error loading vendor data:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('vendors')
        .update(vendorData)
        .eq('id', vendorId);

      if (error) throw error;
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating vendor data:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <h1 className="text-xl font-bold text-gray-900">Profile Settings</h1>
            <Button onClick={handleSave} disabled={saving} size="sm">
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex border-b border-gray-100 overflow-x-auto">
            {[
              { id: 'business', label: 'Business Info', icon: Building },
              { id: 'contact', label: 'Contact Details', icon: Phone },
              { id: 'location', label: 'Location', icon: MapPin },
              { id: 'hours', label: 'Operating Hours', icon: Clock },
              { id: 'banking', label: 'Banking Details', icon: CreditCard },
              { id: 'documents', label: 'Documents', icon: FileText }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-6 text-sm font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="p-6">
            {activeTab === 'business' && (
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 bg-gray-100 rounded-xl flex items-center justify-center">
                    <Camera className="w-8 h-8 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-1">Business Logo</h3>
                    <p className="text-sm text-gray-500 mb-2">Upload your business logo</p>
                    <Button size="sm" variant="outline">Upload Logo</Button>
                  </div>
                </div>

                <Input
                  label="Business Name"
                  value={vendorData?.business_name || ''}
                  onChange={(e) => setVendorData({ ...vendorData, business_name: e.target.value })}
                  icon={<Building className="w-5 h-5 text-gray-400" />}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
                  <select
                    value={vendorData?.business_type || ''}
                    onChange={(e) => setVendorData({ ...vendorData, business_type: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select type</option>
                    <option value="spa">Spa & Massage</option>
                    <option value="salon">Beauty Salon</option>
                    <option value="wellness">Wellness Center</option>
                    <option value="beautician">Beauty Services</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Partner Type</label>
                  <select
                    value={vendorData?.partner_type || ''}
                    onChange={(e) => setVendorData({ ...vendorData, partner_type: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="franchise">Franchise</option>
                    <option value="independent">Independent</option>
                    <option value="chain">Chain</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Description</label>
                  <textarea
                    value={vendorData?.description || ''}
                    onChange={(e) => setVendorData({ ...vendorData, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe your business..."
                  />
                </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="space-y-6">
                <Input
                  label="Contact Person Name"
                  value={vendorData?.contact_person || ''}
                  onChange={(e) => setVendorData({ ...vendorData, contact_person: e.target.value })}
                  icon={<User className="w-5 h-5 text-gray-400" />}
                />

                <Input
                  label="Contact Mobile"
                  type="tel"
                  value={vendorData?.contact_mobile || ''}
                  onChange={(e) => setVendorData({ ...vendorData, contact_mobile: e.target.value })}
                  icon={<Phone className="w-5 h-5 text-gray-400" />}
                />

                <Input
                  label="Contact Email"
                  type="email"
                  value={vendorData?.contact_email || ''}
                  onChange={(e) => setVendorData({ ...vendorData, contact_email: e.target.value })}
                  icon={<Mail className="w-5 h-5 text-gray-400" />}
                />

                <Input
                  label="Alternate Phone"
                  type="tel"
                  value={vendorData?.alternate_phone || ''}
                  onChange={(e) => setVendorData({ ...vendorData, alternate_phone: e.target.value })}
                  icon={<Phone className="w-5 h-5 text-gray-400" />}
                />

                <Input
                  label="Website"
                  type="url"
                  value={vendorData?.website || ''}
                  onChange={(e) => setVendorData({ ...vendorData, website: e.target.value })}
                  icon={<Globe className="w-5 h-5 text-gray-400" />}
                />
              </div>
            )}

            {activeTab === 'location' && (
              <div className="space-y-6">
                <Input
                  label="Address Line 1"
                  value={vendorData?.address_line1 || ''}
                  onChange={(e) => setVendorData({ ...vendorData, address_line1: e.target.value })}
                  icon={<MapPin className="w-5 h-5 text-gray-400" />}
                />

                <Input
                  label="Address Line 2"
                  value={vendorData?.address_line2 || ''}
                  onChange={(e) => setVendorData({ ...vendorData, address_line2: e.target.value })}
                  icon={<MapPin className="w-5 h-5 text-gray-400" />}
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="City"
                    value={vendorData?.city || ''}
                    onChange={(e) => setVendorData({ ...vendorData, city: e.target.value })}
                  />

                  <Input
                    label="State"
                    value={vendorData?.state || ''}
                    onChange={(e) => setVendorData({ ...vendorData, state: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="PIN Code"
                    value={vendorData?.pincode || ''}
                    onChange={(e) => setVendorData({ ...vendorData, pincode: e.target.value })}
                  />

                  <Input
                    label="Country"
                    value={vendorData?.country || 'India'}
                    onChange={(e) => setVendorData({ ...vendorData, country: e.target.value })}
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Accurate location information helps customers find your business easily.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'hours' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Operating Hours</h3>

                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                  <div key={day} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-32">
                      <p className="font-medium text-gray-900">{day}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-1">
                      <input
                        type="time"
                        className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-gray-500">to</span>
                      <input
                        type="time"
                        className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-sm text-gray-600">Open</span>
                    </label>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'banking' && (
              <div className="space-y-6">
                <Input
                  label="Bank Name"
                  value={vendorData?.bank_name || ''}
                  onChange={(e) => setVendorData({ ...vendorData, bank_name: e.target.value })}
                  icon={<Building className="w-5 h-5 text-gray-400" />}
                />

                <Input
                  label="Account Holder Name"
                  value={vendorData?.account_holder_name || ''}
                  onChange={(e) => setVendorData({ ...vendorData, account_holder_name: e.target.value })}
                  icon={<User className="w-5 h-5 text-gray-400" />}
                />

                <Input
                  label="Account Number"
                  value={vendorData?.account_number || ''}
                  onChange={(e) => setVendorData({ ...vendorData, account_number: e.target.value })}
                  icon={<CreditCard className="w-5 h-5 text-gray-400" />}
                />

                <Input
                  label="IFSC Code"
                  value={vendorData?.ifsc_code || ''}
                  onChange={(e) => setVendorData({ ...vendorData, ifsc_code: e.target.value })}
                />

                <Input
                  label="GST Number"
                  value={vendorData?.gst_number || ''}
                  onChange={(e) => setVendorData({ ...vendorData, gst_number: e.target.value })}
                />

                <Input
                  label="PAN Number"
                  value={vendorData?.pan_number || ''}
                  onChange={(e) => setVendorData({ ...vendorData, pan_number: e.target.value })}
                />
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="space-y-6">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium text-gray-900">Business Registration Certificate</p>
                      <p className="text-sm text-gray-500">PDF, DOC (Max 5MB)</p>
                    </div>
                    <Button size="sm" variant="outline">Upload</Button>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium text-gray-900">GST Certificate</p>
                      <p className="text-sm text-gray-500">PDF, DOC (Max 5MB)</p>
                    </div>
                    <Button size="sm" variant="outline">Upload</Button>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium text-gray-900">Trade License</p>
                      <p className="text-sm text-gray-500">PDF, DOC (Max 5MB)</p>
                    </div>
                    <Button size="sm" variant="outline">Upload</Button>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium text-gray-900">PAN Card</p>
                      <p className="text-sm text-gray-500">PDF, JPG, PNG (Max 2MB)</p>
                    </div>
                    <Button size="sm" variant="outline">Upload</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
