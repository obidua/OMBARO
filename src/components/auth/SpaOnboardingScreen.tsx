import React, { useState } from 'react';
import { ArrowLeft, MapPin, Phone, Mail, Clock, Star, Camera, Plus, Trash2, Globe, Instagram, Facebook, Twitter, Wifi, Car, CreditCard, Coffee, Shield, Navigation, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { ServiceCatalog } from '../ui/ServiceCatalog';
import { MASSAGE_CATALOG } from '../../types/services';

interface SpaOnboardingScreenProps {
  onBack: () => void;
  onSubmit: (spaData: any) => void;
  isLoading?: boolean;
}

export const SpaOnboardingScreen: React.FC<SpaOnboardingScreenProps> = ({
  onBack,
  onSubmit,
  isLoading = false
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Information
    name: '',
    address: '',
    latitude: null as number | null,
    longitude: null as number | null,
    contactNumber: '',
    email: '',
    website: '',
    description: '',
    
    // Operating Details
    openingHours: '',
    closingHours: '',
    priceRange: 'mid',
    category: 'full-service',
    
    // Social Media
    socialMediaLinks: {
      instagram: '',
      facebook: '',
      twitter: ''
    },
    
    // Amenities
    amenities: [],
    
    // Specialties
    specialties: [''],
    
    // Services
    services: [{ name: '', price: '', duration: '', description: '', category: 'massage' }],
    
    // Staff
    staffCount: '',
    
    // Images
    images: []
  });
  
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const [formErrors, setFormErrors] = useState<any>({});
  const [locationState, setLocationState] = useState<{
    isLoading: boolean;
    isSuccess: boolean;
    error: string | null;
  }>({
    isLoading: false,
    isSuccess: false,
    error: null
  });

  const categories = [
    { value: 'full-service', label: 'Full Service Spa' },
    { value: 'day-spa', label: 'Day Spa' },
    { value: 'medical-spa', label: 'Medical Spa' },
    { value: 'wellness-center', label: 'Wellness Center' },
    { value: 'beauty-salon', label: 'Beauty Salon' },
    { value: 'massage-center', label: 'Massage Center' }
  ];

  const availableAmenities = [
    { id: 'wifi', label: 'Free WiFi', icon: Wifi },
    { id: 'parking', label: 'Parking', icon: Car },
    { id: 'card-payment', label: 'Card Payment', icon: CreditCard },
    { id: 'refreshments', label: 'Refreshments', icon: Coffee },
    { id: 'security', label: '24/7 Security', icon: Shield },
    { id: 'ac', label: 'Air Conditioning', icon: Star },
    { id: 'locker', label: 'Lockers', icon: Shield },
    { id: 'shower', label: 'Shower Facilities', icon: Star }
  ];

  const serviceCategories = [
    { value: 'massage', label: 'Massage' },
    { value: 'facial', label: 'Facial' },
    { value: 'body-treatment', label: 'Body Treatment' },
    { value: 'hair', label: 'Hair Services' },
    { value: 'nail', label: 'Nail Services' },
    { value: 'wellness', label: 'Wellness' }
  ];

  const validateStep = (step: number) => {
    const errors: any = {};
    
    if (step === 1) {
      if (!formData.name.trim()) errors.name = 'Spa name is required';
      if (!formData.address.trim()) errors.address = 'Address is required';
      if (!formData.contactNumber.trim()) errors.contactNumber = 'Contact number is required';
      if (!formData.email.trim()) errors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Invalid email format';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev: any) => ({ ...prev, [field]: '' }));
    }
  };

  const handleGetLiveLocation = async () => {
    setLocationState({ isLoading: true, isSuccess: false, error: null });

    if (!navigator.geolocation) {
      setLocationState({
        isLoading: false,
        isSuccess: false,
        error: 'Geolocation is not supported by this browser'
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Update form data with coordinates
          setFormData(prev => ({
            ...prev,
            latitude,
            longitude
          }));
          
          setLocationState({
            isLoading: false,
            isSuccess: true,
            error: null
          });
        } catch (error) {
          setLocationState({
            isLoading: false,
            isSuccess: false,
            error: 'Failed to get location details'
          });
        }
      },
      (error) => {
        let errorMessage = 'Failed to get location';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied by user';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out';
            break;
        }
        setLocationState({
          isLoading: false,
          isSuccess: false,
          error: errorMessage
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  const handleSocialMediaChange = (platform: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      socialMediaLinks: { ...prev.socialMediaLinks, [platform]: value }
    }));
  };

  const handleAmenityToggle = (amenityId: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter(id => id !== amenityId)
        : [...prev.amenities, amenityId]
    }));
  };

  const handleSpecialtyChange = (index: number, value: string) => {
    const newSpecialties = [...formData.specialties];
    newSpecialties[index] = value;
    setFormData(prev => ({ ...prev, specialties: newSpecialties }));
  };

  const addSpecialty = () => {
    setFormData(prev => ({ ...prev, specialties: [...prev.specialties, ''] }));
  };

  const removeSpecialty = (index: number) => {
    const newSpecialties = formData.specialties.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, specialties: newSpecialties }));
  };

  const handleServiceChange = (index: number, field: string, value: string) => {
    const newServices = [...formData.services];
    newServices[index] = { ...newServices[index], [field]: value };
    setFormData(prev => ({ ...prev, services: newServices }));
  };

  const addService = () => {
    setFormData(prev => ({
      ...prev,
      services: [...prev.services, { name: '', price: '', duration: '', description: '', category: 'massage' }]
    }));
  };

  const removeService = (index: number) => {
    const newServices = formData.services.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, services: newServices }));
  };
  
  const handleServiceToggle = (serviceCode: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceCode)
        ? prev.filter(code => code !== serviceCode)
        : [...prev, serviceCode]
    );
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      const submissionData = {
        ...formData,
        selectedServices,
        locationTagged: locationState.isSuccess,
        coordinates: {
          latitude: formData.latitude,
          longitude: formData.longitude
        }
      };
      onSubmit(submissionData);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
              <div className="space-y-4">
                <Input
                  label="Spa Name *"
                  placeholder="Enter spa name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  error={formErrors.name}
                  icon={<MapPin className="w-5 h-5 text-gray-400" />}
                />

                <Input
                  label="Complete Address *"
                  placeholder="Enter complete address with pincode"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  error={formErrors.address}
                  icon={<MapPin className="w-5 h-5 text-gray-400" />}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Contact Number *"
                    type="tel"
                    placeholder="Enter contact number"
                    value={formData.contactNumber}
                    onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                    error={formErrors.contactNumber}
                    icon={<Phone className="w-5 h-5 text-gray-400" />}
                  />

                  <Input
                    label="Email Address *"
                    type="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    error={formErrors.email}
                    icon={<Mail className="w-5 h-5 text-gray-400" />}
                  />
                </div>

                <Input
                  label="Website (Optional)"
                  placeholder="https://www.example.com"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  icon={<Globe className="w-5 h-5 text-gray-400" />}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    placeholder="Describe the spa, its ambiance, and unique features..."
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Spa Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  >
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Operating Details</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Opening Time"
                    type="time"
                    value={formData.openingHours}
                    onChange={(e) => handleInputChange('openingHours', e.target.value)}
                    icon={<Clock className="w-5 h-5 text-gray-400" />}
                  />

                  <Input
                    label="Closing Time"
                    type="time"
                    value={formData.closingHours}
                    onChange={(e) => handleInputChange('closingHours', e.target.value)}
                    icon={<Clock className="w-5 h-5 text-gray-400" />}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                    <select
                      value={formData.priceRange}
                      onChange={(e) => handleInputChange('priceRange', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="budget">Budget (₹₹) - Under ₹2000</option>
                      <option value="mid">Mid-range (₹₹₹) - ₹2000-5000</option>
                      <option value="premium">Premium (₹₹₹₹) - Above ₹5000</option>
                    </select>
                  </div>

                  <Input
                    label="Staff Count"
                    type="number"
                    placeholder="Number of staff members"
                    value={formData.staffCount}
                    onChange={(e) => handleInputChange('staffCount', e.target.value)}
                  />
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Social Media Links</h3>
                  <div className="space-y-3">
                    <Input
                      label="Instagram"
                      placeholder="https://instagram.com/yourhandle"
                      value={formData.socialMediaLinks.instagram}
                      onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
                      icon={<Instagram className="w-5 h-5 text-gray-400" />}
                    />
                    <Input
                      label="Facebook"
                      placeholder="https://facebook.com/yourpage"
                      value={formData.socialMediaLinks.facebook}
                      onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
                      icon={<Facebook className="w-5 h-5 text-gray-400" />}
                    />
                    <Input
                      label="Twitter"
                      placeholder="https://twitter.com/yourhandle"
                      value={formData.socialMediaLinks.twitter}
                      onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
                      icon={<Twitter className="w-5 h-5 text-gray-400" />}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Amenities & Specialties</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Available Amenities</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {availableAmenities.map((amenity) => (
                      <button
                        key={amenity.id}
                        onClick={() => handleAmenityToggle(amenity.id)}
                        className={`flex items-center space-x-3 p-3 rounded-xl border-2 transition-all duration-200 ${
                          formData.amenities.includes(amenity.id)
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <amenity.icon className={`w-5 h-5 ${
                          formData.amenities.includes(amenity.id) ? 'text-purple-600' : 'text-gray-400'
                        }`} />
                        <span className={`text-sm font-medium ${
                          formData.amenities.includes(amenity.id) ? 'text-purple-700' : 'text-gray-700'
                        }`}>
                          {amenity.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">Specialties</h3>
                    <Button onClick={addSpecialty} size="sm" variant="outline">
                      <Plus className="w-4 h-4 mr-1" />
                      Add
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {formData.specialties.map((specialty, index) => (
                      <div key={index} className="flex space-x-2">
                        <Input
                          placeholder="e.g., Deep Tissue Massage, Aromatherapy"
                          value={specialty}
                          onChange={(e) => handleSpecialtyChange(index, e.target.value)}
                          className="flex-1"
                        />
                        {formData.specialties.length > 1 && (
                          <button
                            onClick={() => removeSpecialty(index)}
                            className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center hover:bg-red-200 transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Photo Upload</h3>
                  
                  {/* Location Tagging */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">Location Tagging</h4>
                      <Button
                        onClick={handleGetLiveLocation}
                        variant="outline"
                        size="sm"
                        loading={locationState.isLoading}
                      >
                        {locationState.isSuccess ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                            Location Tagged
                          </>
                        ) : (
                          <>
                            <Navigation className="w-4 h-4 mr-2" />
                            Get Live Location
                          </>
                        )}
                      </Button>
                    </div>
                    
                    {locationState.error && (
                      <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-3">
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="w-4 h-4 text-red-600" />
                          <p className="text-red-800 text-sm">{locationState.error}</p>
                        </div>
                      </div>
                    )}
                    
                    {locationState.isSuccess && formData.latitude && formData.longitude && (
                      <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-3">
                        <div className="flex items-center space-x-2 mb-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <p className="text-green-800 font-medium">Location Successfully Tagged</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-green-600">Latitude:</span>
                            <span className="font-mono ml-1 text-green-800">{formData.latitude.toFixed(6)}</span>
                          </div>
                          <div>
                            <span className="text-green-600">Longitude:</span>
                            <span className="font-mono ml-1 text-green-800">{formData.longitude.toFixed(6)}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                    <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Upload spa photos</p>
                    <p className="text-sm text-gray-500">Drag and drop or click to browse</p>
                    <Button variant="outline" size="sm" className="mt-4">
                      Choose Files
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Select Services from Catalog</h2>
              
              <div className="mb-6">
                <p className="text-gray-600 mb-4">
                  Select from our comprehensive massage catalog. You can also add custom services below.
                </p>
                
                <ServiceCatalog
                  selectedServices={selectedServices}
                  onServiceToggle={handleServiceToggle}
                  mode="selection"
                  showPricing={true}
                />
              </div>
              
              {/* Custom Services Section */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">Custom Services (Optional)</h3>
                  <Button onClick={addService} size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-1" />
                    Add Custom Service
                  </Button>
                </div>
                
                <div className="space-y-6">
                  {formData.services.map((service, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-4 sm:p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium text-gray-900">Custom Service {index + 1}</h4>
                        {formData.services.length > 1 && (
                          <button
                            onClick={() => removeService(index)}
                            className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center hover:bg-red-200 transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <Input
                          placeholder="Service name"
                          value={service.name}
                          onChange={(e) => handleServiceChange(index, 'name', e.target.value)}
                        />
                        <div>
                          <select
                            value={service.category}
                            onChange={(e) => handleServiceChange(index, 'category', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                          >
                            {serviceCategories.map((category) => (
                              <option key={category.value} value={category.value}>
                                {category.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <Input
                          placeholder="Price (₹)"
                          type="number"
                          value={service.price}
                          onChange={(e) => handleServiceChange(index, 'price', e.target.value)}
                        />
                        <Input
                          placeholder="Duration (minutes)"
                          type="number"
                          value={service.duration}
                          onChange={(e) => handleServiceChange(index, 'duration', e.target.value)}
                        />
                      </div>
                      
                      <textarea
                        placeholder="Service description and benefits..."
                        value={service.description}
                        onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="flex items-center justify-between p-4 pt-12">
          <button
            onClick={onBack}
            aria-label="Go back to employee dashboard"
            className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-lg sm:text-xl font-semibold text-gray-900">Onboard New Spa</h1>
          <div className="w-10" />
        </div>

        {/* Progress Bar */}
        <div className="px-4 pb-4">
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 4 && (
                  <div className={`flex-1 h-1 mx-2 rounded ${
                    step < currentStep ? 'bg-purple-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-600">
            <span className="flex-1 text-center">Basic Information</span>
            <span className="flex-1 text-center">Operating Details</span>
            <span className="flex-1 text-center">Amenities & Specialties</span>
            <span className="flex-1 text-center">Services</span>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              onClick={prevStep}
              variant="outline"
              size="md"
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            
            {currentStep < 4 ? (
              <Button onClick={nextStep} size="md">
                Next Step
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                size="md"
                loading={isLoading}
                disabled={selectedServices.length === 0 && formData.services.every(s => !s.name)}
              >
                <Star className="w-5 h-5 mr-2" />
                Complete Onboarding
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};