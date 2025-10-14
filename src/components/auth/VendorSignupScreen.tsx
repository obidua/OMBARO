import React, { useState } from 'react';
import { ArrowLeft, Store, Mail, Phone, User, MapPin, CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { supabase } from '../../lib/supabase';

interface VendorSignupScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  selectedCategory?: string;
  signupType?: string;
  isProfileCompletion?: boolean;
  mobile?: string;
}

export default function VendorSignupScreen({
  onNavigate,
  selectedCategory,
  signupType = 'detailed',
  isProfileCompletion = false,
  mobile: preMobile
}: VendorSignupScreenProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    name: '',
    email: '',
    mobile: preMobile || '',
    password: '',
    confirmPassword: '',
    // Business Info
    businessName: '',
    businessType: selectedCategory || 'spa',
    contactPerson: '',
    contactMobile: '',
    contactEmail: '',
    // Address
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    // Additional Info
    gstNumber: '',
    panNumber: '',
    yearsInBusiness: '',
    numberOfStaff: '',
    description: '',
    website: ''
  });

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  function handleChange(field: string, value: string) {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: '' }));
    }
  }

  function validateStep1() {
    const newErrors: any = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.mobile.trim()) newErrors.mobile = 'Mobile is required';
    else if (!/^[0-9]{10}$/.test(formData.mobile)) newErrors.mobile = 'Mobile must be 10 digits';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function validateStep2() {
    const newErrors: any = {};

    if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
    if (!formData.contactPerson.trim()) newErrors.contactPerson = 'Contact person is required';
    if (!formData.contactMobile.trim()) newErrors.contactMobile = 'Contact mobile is required';
    else if (!/^[0-9]{10}$/.test(formData.contactMobile)) {
      newErrors.contactMobile = 'Mobile must be 10 digits';
    }
    if (!formData.contactEmail.trim()) newErrors.contactEmail = 'Contact email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Email is invalid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function validateStep3() {
    const newErrors: any = {};

    if (!formData.addressLine1.trim()) newErrors.addressLine1 = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
    else if (!/^[0-9]{6}$/.test(formData.pincode)) newErrors.pincode = 'Pincode must be 6 digits';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleNext() {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    } else if (step === 3 && validateStep3()) {
      setStep(4);
    }
  }

  function handleBack() {
    if (step > 1) {
      setStep(step - 1);
    } else {
      if (isProfileCompletion) {
        onNavigate('vendorDashboard');
      } else {
        onNavigate('vendorSignupOptions', { selectedCategory });
      }
    }
  }

  async function handleSubmit() {
    setLoading(true);
    try {
      console.log('Starting vendor application submission...');

      // Step 1: Create user account with Supabase Auth using email
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            mobile: formData.mobile,
            role: 'vendor_applicant'
          }
        }
      });

      if (authError) {
        console.error('Auth error:', authError);
        if (authError.message.includes('already registered') || authError.message.includes('already been registered')) {
          alert('This email is already registered. Please try logging in instead.');
        } else {
          alert('Failed to create account: ' + authError.message);
        }
        return;
      }

      const userId = authData.user?.id;
      if (!userId) {
        alert('Failed to create user account. Please try again.');
        return;
      }

      console.log('User created with ID:', userId);

      // Step 2: Create user profile
      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert({
          id: userId,
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          role: 'vendor_applicant',
          status: 'active'
        });

      if (profileError) {
        console.error('Profile creation error:', profileError);
        // Continue even if profile creation fails - can be fixed later
      } else {
        console.log('User profile created successfully');
      }

      // Step 3: Generate application number
      const appNumber = 'APP' + Date.now().toString().slice(-8);
      console.log('Generated application number:', appNumber);

      // Step 4: Submit vendor application with proper JSONB structure
      const { data: applicationData, error: applicationError } = await supabase
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
            line2: formData.addressLine2 || null,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode
          },
          application_data: {
            application_number: appNumber,
            partner_type: 'INDEPENDENT',
            gst_number: formData.gstNumber || null,
            pan_number: formData.panNumber || null,
            years_in_business: formData.yearsInBusiness ? parseInt(formData.yearsInBusiness) : null,
            number_of_staff: formData.numberOfStaff ? parseInt(formData.numberOfStaff) : null,
            description: formData.description || null,
            website: formData.website || null,
            is_self_registered: true
          },
          application_status: 'pending'
        })
        .select()
        .single();

      if (applicationError) {
        console.error('Application submission error:', applicationError);
        alert('Failed to submit application: ' + applicationError.message + '. Please contact support with your mobile number: ' + formData.mobile);
        return;
      }

      console.log('Application submitted successfully:', applicationData);

      // Navigate to success screen with application details
      onNavigate('vendorSignupSuccess', {
        businessName: formData.businessName,
        email: formData.contactEmail,
        applicationNumber: appNumber,
        mobile: formData.mobile
      });
    } catch (error: any) {
      console.error('Unexpected error submitting application:', error);
      alert('An unexpected error occurred: ' + (error?.message || 'Please try again.'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <div className="flex items-center gap-2">
              <Store className="w-6 h-6 text-amber-600" />
              <h1 className="text-xl font-bold text-gray-900">Vendor Registration</h1>
            </div>
            <div className="w-20" />
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                step >= s
                  ? 'bg-amber-500 border-amber-500 text-white'
                  : 'bg-white border-gray-300 text-gray-400'
              }`}>
                {step > s ? <CheckCircle className="w-6 h-6" /> : s}
              </div>
              {s < 4 && (
                <div className={`flex-1 h-1 mx-2 ${
                  step > s ? 'bg-amber-500' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {isProfileCompletion ? 'Complete Your Profile' : 'Personal Information'}
                </h2>
                <p className="text-gray-600">
                  {isProfileCompletion
                    ? 'Add your details to complete your vendor profile'
                    : 'Create your account to get started'}
                </p>
                {selectedCategory && (
                  <div className="mt-3 inline-block px-4 py-2 bg-amber-100 text-amber-800 rounded-lg text-sm font-medium">
                    Category: {selectedCategory.replace('_', ' ').toUpperCase()}
                  </div>
                )}
              </div>

              <Input
                label="Full Name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                error={errors.name}
                icon={<User className="w-5 h-5" />}
                placeholder="Enter your full name"
              />

              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                error={errors.email}
                icon={<Mail className="w-5 h-5" />}
                placeholder="Enter your email"
              />

              <Input
                label="Mobile Number"
                type="tel"
                value={formData.mobile}
                onChange={(e) => handleChange('mobile', e.target.value)}
                error={errors.mobile}
                icon={<Phone className="w-5 h-5" />}
                placeholder="Enter 10-digit mobile number"
                maxLength={10}
              />

              <Input
                label="Password"
                type="password"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                error={errors.password}
                placeholder="Create a strong password (min 8 characters)"
              />

              <Input
                label="Confirm Password"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                error={errors.confirmPassword}
                placeholder="Re-enter your password"
              />

              <Button onClick={handleNext} fullWidth>
                Next: Business Information
              </Button>
            </div>
          )}

          {/* Step 2: Business Information */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Business Information</h2>
                <p className="text-gray-600">Tell us about your business</p>
              </div>

              <Input
                label="Business Name"
                value={formData.businessName}
                onChange={(e) => handleChange('businessName', e.target.value)}
                error={errors.businessName}
                icon={<Store className="w-5 h-5" />}
                placeholder="Enter your business name"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Type
                </label>
                <select
                  value={formData.businessType}
                  onChange={(e) => handleChange('businessType', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="spa">Spa</option>
                  <option value="salon">Salon</option>
                  <option value="home_service">Home Service</option>
                  <option value="hotel_spa">Hotel Spa</option>
                  <option value="wellness_center">Wellness Center</option>
                </select>
              </div>

              <Input
                label="Contact Person Name"
                value={formData.contactPerson}
                onChange={(e) => handleChange('contactPerson', e.target.value)}
                error={errors.contactPerson}
                icon={<User className="w-5 h-5" />}
                placeholder="Primary contact person"
              />

              <Input
                label="Contact Mobile"
                type="tel"
                value={formData.contactMobile}
                onChange={(e) => handleChange('contactMobile', e.target.value)}
                error={errors.contactMobile}
                icon={<Phone className="w-5 h-5" />}
                placeholder="Business contact number"
                maxLength={10}
              />

              <Input
                label="Contact Email"
                type="email"
                value={formData.contactEmail}
                onChange={(e) => handleChange('contactEmail', e.target.value)}
                error={errors.contactEmail}
                icon={<Mail className="w-5 h-5" />}
                placeholder="Business email address"
              />

              <div className="flex gap-4">
                <Button variant="secondary" onClick={handleBack} fullWidth>
                  Back
                </Button>
                <Button onClick={handleNext} fullWidth>
                  Next: Business Address
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Business Address */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Business Address</h2>
                <p className="text-gray-600">Where is your business located?</p>
              </div>

              <Input
                label="Address Line 1"
                value={formData.addressLine1}
                onChange={(e) => handleChange('addressLine1', e.target.value)}
                error={errors.addressLine1}
                icon={<MapPin className="w-5 h-5" />}
                placeholder="Street address, building number"
              />

              <Input
                label="Address Line 2 (Optional)"
                value={formData.addressLine2}
                onChange={(e) => handleChange('addressLine2', e.target.value)}
                placeholder="Landmark, area"
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="City"
                  value={formData.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  error={errors.city}
                  placeholder="City"
                />

                <Input
                  label="State"
                  value={formData.state}
                  onChange={(e) => handleChange('state', e.target.value)}
                  error={errors.state}
                  placeholder="State"
                />
              </div>

              <Input
                label="Pincode"
                type="tel"
                value={formData.pincode}
                onChange={(e) => handleChange('pincode', e.target.value)}
                error={errors.pincode}
                placeholder="6-digit pincode"
                maxLength={6}
              />

              <div className="flex gap-4">
                <Button variant="secondary" onClick={handleBack} fullWidth>
                  Back
                </Button>
                <Button onClick={handleNext} fullWidth>
                  Next: Additional Details
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Additional Details */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Additional Details</h2>
                <p className="text-gray-600">Help us know more about your business</p>
              </div>

              <Input
                label="GST Number (Optional)"
                value={formData.gstNumber}
                onChange={(e) => handleChange('gstNumber', e.target.value.toUpperCase())}
                placeholder="15-character GST number"
                maxLength={15}
              />

              <Input
                label="PAN Number (Optional)"
                value={formData.panNumber}
                onChange={(e) => handleChange('panNumber', e.target.value.toUpperCase())}
                placeholder="10-character PAN number"
                maxLength={10}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Years in Business"
                  type="number"
                  value={formData.yearsInBusiness}
                  onChange={(e) => handleChange('yearsInBusiness', e.target.value)}
                  placeholder="Years"
                  min="0"
                />

                <Input
                  label="Number of Staff"
                  type="number"
                  value={formData.numberOfStaff}
                  onChange={(e) => handleChange('numberOfStaff', e.target.value)}
                  placeholder="Staff count"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Description (Optional)
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Brief description of your services and specialties"
                />
              </div>

              <Input
                label="Website (Optional)"
                type="url"
                value={formData.website}
                onChange={(e) => handleChange('website', e.target.value)}
                placeholder="https://yourwebsite.com"
              />

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> Your application will be reviewed by our team within 24-48 hours.
                  You will receive an email notification once approved.
                </p>
              </div>

              <div className="flex gap-4">
                <Button variant="secondary" onClick={handleBack} fullWidth>
                  Back
                </Button>
                <Button onClick={handleSubmit} fullWidth loading={loading}>
                  Submit Application
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
