import React, { useState } from 'react';
import { Building, Phone, Mail, MapPin, FileText, CreditCard, CheckCircle, Lock, Eye, EyeOff } from 'lucide-react';
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
    password: '',
    confirmPassword: '',
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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong' | null>(null);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  const partnerTypes = [
    { value: 'FRANCHISE', label: 'Franchise Partner', desc: 'Full franchise model - ₹5L fee, 15% commission' },
    { value: 'ASSOCIATION', label: 'Association Partner', desc: 'Partner with existing business - 20% commission' },
    { value: 'AGGREGATOR', label: 'Aggregator', desc: 'Multi-vendor platform - 25% commission' },
    { value: 'INDEPENDENT', label: 'Independent Vendor', desc: 'Individual service provider - 30% commission' }
  ];

  function validatePassword(password: string): { isValid: boolean; errors: string[]; strength: 'weak' | 'medium' | 'strong' } {
    const errors: string[] = [];
    let strength: 'weak' | 'medium' | 'strong' = 'weak';

    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    if (!/[0-9]/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }

    const isValid = errors.length === 0;

    if (isValid) {
      if (password.length >= 12 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        strength = 'strong';
      } else if (password.length >= 8) {
        strength = 'medium';
      }
    }

    return { isValid, errors, strength };
  }

  function handlePasswordChange(password: string) {
    setFormData({ ...formData, password });
    const validation = validatePassword(password);
    setPasswordErrors(validation.errors);
    setPasswordStrength(validation.strength);
  }

  async function handleSubmit() {
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Validate password strength
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      alert('Please fix password errors before submitting:\n' + passwordValidation.errors.join('\n'));
      return;
    }

    setLoading(true);
    try {
      // Step 1: Create user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        phone: formData.contactMobile,
        password: formData.password,
        options: {
          data: {
            name: formData.contactPerson,
            email: formData.contactEmail,
            role: 'vendor_applicant'
          }
        }
      });

      if (authError) throw authError;

      const userId = authData.user?.id;
      if (!userId) throw new Error('Failed to create user account');

      // Step 2: Create user profile
      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert({
          id: userId,
          name: formData.contactPerson,
          email: formData.contactEmail,
          mobile: formData.contactMobile,
          role: 'vendor_applicant',
          status: 'active'
        });

      if (profileError) {
        console.error('Error creating profile:', profileError);
        // Continue even if profile creation fails - can be fixed later
      }

      // Step 3: Submit vendor application
      const appNumber = 'APP' + Date.now().toString().slice(-8);

      const { data, error } = await supabase
        .from('vendor_applications')
        .insert({
          user_id: userId,
          business_name: formData.businessName,
          business_type: formData.businessType,
          contact_person: formData.contactPerson,
          contact_mobile: formData.contactMobile,
          contact_email: formData.contactEmail,
          business_address: {
            line1: formData.addressLine1,
            line2: formData.addressLine2,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode
          },
          application_data: {
            application_number: appNumber,
            partner_type: formData.partnerType,
            gst_number: formData.gstNumber,
            pan_number: formData.panNumber,
            years_in_business: parseInt(formData.yearsInBusiness) || null,
            number_of_staff: parseInt(formData.numberOfStaff) || null,
            description: formData.description,
            franchise_fee_paid: formData.franchiseFeePaid,
            franchise_payment_reference: formData.franchisePaymentReference,
            is_self_registered: true
          },
          application_status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;

      alert(`Application submitted successfully!\n\nYour application number is: ${appNumber}\n\nYou can now login with your mobile number and password to track your application status.`);
      onSuccess?.();
    } catch (error: any) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application: ' + (error.message || 'Please try again.'));
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

            <div className="col-span-2 bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Set Your Login Password
              </h3>
              <p className="text-sm text-blue-700 mb-4">
                You'll use your mobile number and this password to login and track your application status.
              </p>

              <div className="space-y-4">
                <div className="relative">
                  <Input
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    required
                    placeholder="Enter a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {formData.password && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all ${
                            passwordStrength === 'strong' ? 'w-full bg-green-500' :
                            passwordStrength === 'medium' ? 'w-2/3 bg-yellow-500' :
                            'w-1/3 bg-red-500'
                          }`}
                        />
                      </div>
                      <span className={`text-xs font-medium ${
                        passwordStrength === 'strong' ? 'text-green-600' :
                        passwordStrength === 'medium' ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {passwordStrength === 'strong' ? 'Strong' :
                         passwordStrength === 'medium' ? 'Medium' :
                         'Weak'}
                      </span>
                    </div>

                    {passwordErrors.length > 0 && (
                      <div className="text-xs text-red-600 space-y-1">
                        {passwordErrors.map((error, index) => (
                          <p key={index}>• {error}</p>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div className="relative">
                  <Input
                    label="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                    placeholder="Re-enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-xs text-red-600">Passwords do not match</p>
                )}
              </div>
            </div>

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
              <h3 className="font-semibold text-blue-900 mb-2">What Happens Next?</h3>
              <ul className="text-sm text-blue-800 space-y-2">
                <li>• You can login with your mobile number ({formData.contactMobile}) and password to track application status</li>
                <li>• Field Officer will review your application within 24-48 hours</li>
                <li>• Application will go through Manager and Director approval</li>
                <li>• Admin will do final verification</li>
                <li>• Once approved, you'll get full vendor portal access to add services and manage bookings</li>
              </ul>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={loading || !formData.password || formData.password !== formData.confirmPassword || passwordErrors.length > 0}
                className="flex-1"
              >
                {loading ? 'Submitting...' : 'Submit Application'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
