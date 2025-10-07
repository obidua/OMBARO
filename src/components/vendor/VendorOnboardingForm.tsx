import React, { useState } from 'react';
import { Building, Phone, Mail, MapPin, FileText, CreditCard, CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { supabase } from '../../lib/supabase';

interface VendorOnboardingFormProps {
  onSuccess?: () => void;
}

export const VendorOnboardingForm: React.FC<VendorOnboardingFormProps> = ({ onSuccess }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    partnerType: 'INDEPENDENT',
    businessName: '',
    businessType: 'spa',
    contactPerson: '',
    contactMobile: '',
    contactEmail: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    gstNumber: '',
    panNumber: '',
    yearsInBusiness: '',
    numberOfStaff: '',
    description: '',
    franchiseFeePaid: false,
    franchisePaymentReference: ''
  });

  const partnerTypes = [
    { value: 'FRANCHISE', label: 'Franchise Partner', desc: 'Full franchise model - ₹5L fee, 15% commission' },
    { value: 'ASSOCIATION', label: 'Association Partner', desc: 'Partner with existing business - 20% commission' },
    { value: 'AGGREGATOR', label: 'Aggregator', desc: 'Multi-vendor platform - 25% commission' },
    { value: 'INDEPENDENT', label: 'Independent Vendor', desc: 'Individual service provider - 30% commission' }
  ];

  async function handleSubmit() {
    setLoading(true);
    try {
      const appNumber = 'APP' + Date.now().toString().slice(-6);

      const { data, error } = await supabase
        .from('vendor_applications')
        .insert({
          application_number: appNumber,
          partner_type: formData.partnerType,
          business_name: formData.businessName,
          business_type: formData.businessType,
          contact_person: formData.contactPerson,
          contact_mobile: formData.contactMobile,
          contact_email: formData.contactEmail,
          address_line1: formData.addressLine1,
          address_line2: formData.addressLine2,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          gst_number: formData.gstNumber,
          pan_number: formData.panNumber,
          years_in_business: parseInt(formData.yearsInBusiness) || null,
          number_of_staff: parseInt(formData.numberOfStaff) || null,
          description: formData.description,
          franchise_fee_paid: formData.franchiseFeePaid,
          franchise_payment_reference: formData.franchisePaymentReference,
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;

      alert(`Application submitted successfully! Your application number is: ${appNumber}`);
      onSuccess?.();
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Vendor Onboarding</h1>
        <p className="text-gray-600 mb-8">Join OMBARO platform as a partner</p>

        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= s ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  {s}
                </div>
                {s < 3 && <div className={`w-32 h-1 ${step > s ? 'bg-blue-600' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span>Partner Type</span>
            <span>Business Info</span>
            <span>Review</span>
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Select Partner Type</h2>
            {partnerTypes.map((type) => (
              <div
                key={type.value}
                onClick={() => setFormData({ ...formData, partnerType: type.value })}
                className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${formData.partnerType === type.value ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{type.label}</h3>
                    <p className="text-sm text-gray-600 mt-1">{type.desc}</p>
                  </div>
                  {formData.partnerType === type.value && (
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                  )}
                </div>
              </div>
            ))}
            <Button onClick={() => setStep(2)} className="w-full">
              Continue to Business Information
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Business Information</h2>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Business Name"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                required
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Type</label>
                <select
                  value={formData.businessType}
                  onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                >
                  <option value="spa">Spa</option>
                  <option value="salon">Salon</option>
                  <option value="wellness">Wellness Center</option>
                  <option value="home_service">Home Service</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Contact Person"
                value={formData.contactPerson}
                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                required
              />
              <Input
                label="Contact Mobile"
                value={formData.contactMobile}
                onChange={(e) => setFormData({ ...formData, contactMobile: e.target.value })}
                required
              />
            </div>

            <Input
              label="Contact Email"
              type="email"
              value={formData.contactEmail}
              onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
              required
            />

            <Input
              label="Address Line 1"
              value={formData.addressLine1}
              onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
              required
            />

            <Input
              label="Address Line 2"
              value={formData.addressLine2}
              onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
            />

            <div className="grid grid-cols-3 gap-4">
              <Input
                label="City"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                required
              />
              <Input
                label="State"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                required
              />
              <Input
                label="Pincode"
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="GST Number (Optional)"
                value={formData.gstNumber}
                onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
              />
              <Input
                label="PAN Number (Optional)"
                value={formData.panNumber}
                onChange={(e) => setFormData({ ...formData, panNumber: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Years in Business"
                type="number"
                value={formData.yearsInBusiness}
                onChange={(e) => setFormData({ ...formData, yearsInBusiness: e.target.value })}
              />
              <Input
                label="Number of Staff"
                type="number"
                value={formData.numberOfStaff}
                onChange={(e) => setFormData({ ...formData, numberOfStaff: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Business Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
            </div>

            {formData.partnerType === 'FRANCHISE' && (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                <h3 className="font-semibold text-yellow-900 mb-2">Franchise Fee Required</h3>
                <p className="text-sm text-yellow-800 mb-3">Please pay ₹5,00,000 franchise fee to proceed.</p>
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={formData.franchiseFeePaid}
                    onChange={(e) => setFormData({ ...formData, franchiseFeePaid: e.target.checked })}
                    className="mr-2"
                  />
                  <label className="text-sm">I have paid the franchise fee</label>
                </div>
                {formData.franchiseFeePaid && (
                  <Input
                    label="Payment Reference Number"
                    value={formData.franchisePaymentReference}
                    onChange={(e) => setFormData({ ...formData, franchisePaymentReference: e.target.value })}
                  />
                )}
              </div>
            )}

            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                Back
              </Button>
              <Button onClick={() => setStep(3)} className="flex-1">
                Review Application
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Review Your Application</h2>

            <div className="bg-gray-50 p-6 rounded-xl space-y-4">
              <div>
                <p className="text-sm text-gray-600">Partner Type</p>
                <p className="font-semibold">{partnerTypes.find(t => t.value === formData.partnerType)?.label}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Business Name</p>
                <p className="font-semibold">{formData.businessName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Contact Person</p>
                <p className="font-semibold">{formData.contactPerson} - {formData.contactMobile}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="font-semibold">{formData.city}, {formData.state}</p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl">
              <h3 className="font-semibold text-blue-900 mb-2">Next Steps</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Field Officer will review your application</li>
                <li>• Manager approval required</li>
                <li>• Director final approval</li>
                <li>• Admin verification and onboarding</li>
              </ul>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                Back
              </Button>
              <Button onClick={handleSubmit} disabled={loading} className="flex-1">
                {loading ? 'Submitting...' : 'Submit Application'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
