import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from './hooks/useAuth';
import { FixedHeader } from './components/layout/FixedHeader';
import { FixedFooter } from './components/layout/FixedFooter';
import { WelcomeScreen } from './components/auth/WelcomeScreen';
import { AuthLoginScreen } from './components/auth/AuthLoginScreen';
import { RoleSelectionScreen } from './components/auth/RoleSelectionScreen';
import { DepartmentDashboard } from './components/auth/DepartmentDashboardScreen';
import { EmployeeDashboardScreen } from './components/auth/EmployeeDashboardScreen';
import { SpaOnboardingScreen } from './components/auth/SpaOnboardingScreen';
import { VendorDashboardScreen } from './components/auth/VendorDashboardScreen';
import { AdminDashboardScreen } from './components/auth/AdminDashboardScreen';
import { TherapistLoginScreen } from './components/auth/TherapistLoginScreen';
import { BeauticianLoginScreen } from './components/auth/BeauticianLoginScreen';
import { TherapistDashboardScreen } from './components/therapist/TherapistDashboardScreen';
import { TherapistManagementScreen } from './components/vendor/TherapistManagementScreen';
import { TherapistFormScreen } from './components/vendor/TherapistFormScreen';
import { AssignTaskScreen } from './components/vendor/AssignTaskScreen';
import { MyAssignmentsScreen } from './components/therapist/MyAssignmentsScreen';
import { TherapistTrackingScreen } from './components/screens/TherapistTrackingScreen';
import { TherapistScheduleScreen } from './components/therapist/TherapistScheduleScreen';
import { TherapistLocationScreen } from './components/therapist/TherapistLocationScreen';
import { TherapistLeavesScreen } from './components/therapist/TherapistLeavesScreen';
import { TherapistEarningsScreen } from './components/therapist/TherapistEarningsScreen';
import { TherapistPerformanceScreen } from './components/therapist/TherapistPerformanceScreen';
import { TherapistProfileScreen } from './components/therapist/TherapistProfileScreen';
import { TherapistSettingsScreen } from './components/therapist/TherapistSettingsScreen';
import { VendorProfileSettingsScreen } from './components/vendor/VendorProfileSettingsScreen';
import { VendorSettingsScreen } from './components/vendor/VendorSettingsScreen';
import { BeauticianManagementScreen } from './components/vendor/BeauticianManagementScreen';
import { BeauticianDashboardScreen } from './components/beautician/BeauticianDashboardScreen';
import { BeauticianProfileScreen } from './components/beautician/BeauticianProfileScreen';
import { BeauticianAssignmentsScreen } from './components/beautician/BeauticianAssignmentsScreen';
import { BeauticianScheduleScreen } from './components/beautician/BeauticianScheduleScreen';
import { BeauticianLocationScreen } from './components/beautician/BeauticianLocationScreen';
import { BeauticianLeavesScreen } from './components/beautician/BeauticianLeavesScreen';
import { BeauticianEarningsScreen } from './components/beautician/BeauticianEarningsScreen';
import { BeauticianPerformanceScreen } from './components/beautician/BeauticianPerformanceScreen';
import { BeauticianSettingsScreen } from './components/beautician/BeauticianSettingsScreen';
import { AdminProfileScreen } from './components/admin/AdminProfileScreen';
import { AdminSettingsScreen } from './components/admin/AdminSettingsScreen';
import { MobileInputScreen } from './components/auth/MobileInputScreen';
import { OTPScreen } from './components/auth/OTPScreen';
import { ProfileSetupScreen } from './components/auth/ProfileSetupScreen';
import { CompletionScreen } from './components/auth/CompletionScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { SalonDetailScreen } from './components/screens/SalonDetailScreen';
import { MapViewScreen } from './components/screens/MapViewScreen';
import { BookingScreen } from './components/screens/BookingScreen';
import { PaymentScreen } from './components/screens/PaymentScreen';
import { OrderTrackingScreen } from './components/screens/OrderTrackingScreen';
import { BookingHistoryScreen } from './components/screens/BookingHistoryScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { RescheduleBookingScreen } from './components/screens/RescheduleBookingScreen';
import { ChatScreen } from './components/screens/ChatScreen';
import { ReviewScreen } from './components/screens/ReviewScreen';
import { ReferralScreen } from './components/screens/ReferralScreen';
import { NotificationScreen } from './components/screens/NotificationScreen';
import { DocPortalScreen } from './components/screens/DocPortalScreen';
import VendorCategorySelectionScreen from './components/auth/VendorCategorySelectionScreen';
import VendorSignupOptionsScreen from './components/auth/VendorSignupOptionsScreen';
import VendorQuickSignupScreen from './components/auth/VendorQuickSignupScreen';
import VendorMobileVerificationScreen from './components/auth/VendorMobileVerificationScreen';
import VendorQuickSignupSuccessScreen from './components/auth/VendorQuickSignupSuccessScreen';
import VendorSignupScreen from './components/auth/VendorSignupScreen';
import VendorSignupSuccessScreen from './components/auth/VendorSignupSuccessScreen';
import VendorApprovalScreen from './components/admin/VendorApprovalScreen';
import { VendorApplicantPortal } from './components/vendor/VendorApplicantPortal';
import { VendorApplicationTracking } from './components/vendor/VendorApplicationTracking';
import { Button } from './components/ui/Button';
import { UserRole } from './types/auth';

function App() {
  const { authState, setCurrentStep, setSelectedEntity, loginUser, selectRole, logout, sendOTP, verifyOTP, completeProfile } = useAuth();
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = () => {
    console.log('Search query:', searchQuery);
    // Navigate to search results or filter current view
  };

  const mainScreens = ['home', 'mapView', 'bookings', 'booking', 'payment', 'orderTracking', 'profile'];
  const showFixedHeader = mainScreens.includes(authState.currentStep);
  const showFixedFooter = mainScreens.includes(authState.currentStep);

  const handleWelcomeNavigation = (userType?: string) => {
    if (userType === 'employeeLogin') {
      setCurrentStep('employeeLogin');
    } else if (userType === 'vendorLogin') {
      setCurrentStep('vendorLogin');
    } else if (userType === 'vendorSignup') {
      setCurrentStep('vendorSignup');
    } else if (userType === 'vendorCategorySelection') {
      setCurrentStep('vendorCategorySelection');
    } else if (userType === 'vendorSignupOld') {
      setCurrentStep('vendorSignup');
    } else if (userType === 'therapistLogin') {
      setCurrentStep('therapistLogin');
    } else if (userType === 'beauticianLogin') {
      setCurrentStep('beauticianLogin');
    } else if (userType === 'adminLogin') {
      setCurrentStep('adminLogin');
    } else if (userType === 'roleSelection') {
      setCurrentStep('roleSelection');
    } else if (userType === 'docPortal') {
      setCurrentStep('docPortal');
    } else {
      setCurrentStep('mobile');
    }
  };

  const handleSpaOnboardingSubmit = (spaData: any) => {
    console.log('Spa onboarding data:', spaData);
    // In real app, this would call an API to save the spa data
    alert('Spa onboarded successfully!');
    setCurrentStep('employeeDashboard');
  };

  const renderCurrentScreen = () => {
    switch (authState.currentStep) {
      case 'welcome':
        return (
          <WelcomeScreen 
            onGetStarted={handleWelcomeNavigation}
          />
        );
      
      case 'roleSelection':
        return (
          <RoleSelectionScreen
            onBack={() => setCurrentStep('welcome')}
            onRoleSelect={selectRole}
            isLoading={authState.isLoading}
          />
        );
      
      case 'departmentDashboard':
        return (
          <DepartmentDashboard
            userRole={authState.userType!}
            user={authState.user}
            onLogout={logout}
            onBack={() => setCurrentStep('welcome')}
          />
        );
      
      case 'employeeLogin':
        return (
          <AuthLoginScreen
            userType="Employee"
            onBack={() => setCurrentStep('welcome')}
            onLogin={loginUser}
            isLoading={authState.isLoading}
            error={authState.error}
          />
        );
      
      case 'vendorLogin':
        return (
          <AuthLoginScreen
            userType="Vendor"
            onBack={() => setCurrentStep('welcome')}
            onLogin={loginUser}
            isLoading={authState.isLoading}
            error={authState.error}
          />
        );

      case 'therapistLogin':
        return (
          <TherapistLoginScreen
            onBack={() => setCurrentStep('welcome')}
            onLogin={(credentials) => {
              // Mock therapist login
              const mockTherapist = {
                id: '1',
                vendor_id: 'vendor_1',
                name: 'Priya Sharma',
                email: credentials.email,
                mobile: '9876543210',
                specialization: ['Swedish Massage', 'Deep Tissue', 'Aromatherapy'],
                experience_years: 5,
                certification: ['Certified Massage Therapist'],
                rating: 4.8,
                total_reviews: 156,
                status: 'active' as const,
                availability_status: 'available' as const,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              };
              // In real app, this would validate credentials against therapists table
              console.log('Therapist login:', credentials);
              setCurrentStep('therapistDashboard');
              // Store therapist data in auth state
            }}
          />
        );

      case 'beauticianLogin':
        return (
          <BeauticianLoginScreen
            onBack={() => setCurrentStep('welcome')}
            onLogin={(credentials) => {
              // Mock beautician login
              const mockBeautician = {
                id: '1',
                vendor_id: 'vendor_1',
                name: 'Priya Sharma',
                email: credentials.email,
                mobile: '9876543210',
                specializations: ['Hair Styling', 'Makeup', 'Nail Art'],
                experience_years: 5,
                certifications: ['Certified Beauty Professional'],
                rating: 4.8,
                total_reviews: 145,
                status: 'active' as const,
                availability_status: 'available' as const
              };
              // In real app, this would validate credentials against beauticians table
              console.log('Beautician login:', credentials);
              setCurrentStep('beauticianDashboard');
              // Store beautician data in auth state
            }}
          />
        );

      case 'therapistDashboard':
        return (
          <TherapistDashboardScreen
            therapist={{
              id: '1',
              vendor_id: 'vendor_1',
              name: 'Priya Sharma',
              email: 'priya.sharma@example.com',
              mobile: '9876543210',
              specialization: ['Swedish Massage', 'Deep Tissue', 'Aromatherapy'],
              experience_years: 5,
              certification: ['Certified Massage Therapist'],
              rating: 4.8,
              total_reviews: 156,
              status: 'active',
              availability_status: 'available',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }}
            onNavigate={(screen) => setCurrentStep(screen)}
            onLogout={logout}
          />
        );

      case 'myAssignments':
        return (
          <MyAssignmentsScreen
            therapistId="therapist_1"
            onBack={() => setCurrentStep('therapistDashboard')}
          />
        );

      case 'schedule':
        return (
          <TherapistScheduleScreen
            onBack={() => setCurrentStep('therapistDashboard')}
          />
        );

      case 'location':
        return (
          <TherapistLocationScreen
            onBack={() => setCurrentStep('therapistDashboard')}
          />
        );

      case 'leaves':
        return (
          <TherapistLeavesScreen
            onBack={() => setCurrentStep('therapistDashboard')}
          />
        );

      case 'earnings':
        return (
          <TherapistEarningsScreen
            onBack={() => setCurrentStep('therapistDashboard')}
          />
        );

      case 'performance':
        return (
          <TherapistPerformanceScreen
            onBack={() => setCurrentStep('therapistDashboard')}
          />
        );

      case 'therapistProfile':
        return (
          <TherapistProfileScreen
            onBack={() => setCurrentStep('therapistDashboard')}
          />
        );

      case 'therapistSettings':
        return (
          <TherapistSettingsScreen
            onBack={() => setCurrentStep('therapistDashboard')}
            onLogout={logout}
          />
        );

      case 'vendorProfile':
        return (
          <VendorProfileSettingsScreen
            vendorId={authState.user?.mobile || 'vendor_1'}
            onBack={() => setCurrentStep('vendorDashboard')}
          />
        );

      case 'vendorSettings':
        return (
          <VendorSettingsScreen
            onBack={() => setCurrentStep('vendorDashboard')}
            onLogout={logout}
          />
        );

      case 'beauticianManagement':
        return (
          <BeauticianManagementScreen
            vendorId={authState.user?.mobile || 'vendor_1'}
            onBack={() => setCurrentStep('vendorDashboard')}
            onNavigate={(screen, data) => {
              if (data) {
                setSelectedEntity(data);
              }
              setCurrentStep(screen);
            }}
          />
        );

      case 'beauticianDashboard':
        return (
          <BeauticianDashboardScreen
            beautician={{
              id: '1',
              vendor_id: 'vendor_1',
              name: 'Priya Sharma',
              email: 'priya.sharma@example.com',
              mobile: '9876543210',
              specializations: ['Hair Styling', 'Makeup', 'Nail Art'],
              experience_years: 5,
              certifications: ['Certified Beauty Professional'],
              rating: 4.8,
              total_reviews: 145,
              status: 'active',
              availability_status: 'available'
            }}
            onNavigate={(screen) => setCurrentStep(screen)}
            onLogout={logout}
          />
        );

      case 'beauticianProfile':
        return (
          <BeauticianProfileScreen
            onBack={() => setCurrentStep('beauticianDashboard')}
          />
        );

      case 'beauticianAssignments':
        return (
          <BeauticianAssignmentsScreen
            beauticianId="1"
            onBack={() => setCurrentStep('beauticianDashboard')}
          />
        );

      case 'beauticianSchedule':
        return (
          <BeauticianScheduleScreen
            beauticianId="1"
            onBack={() => setCurrentStep('beauticianDashboard')}
          />
        );

      case 'beauticianLocation':
        return (
          <BeauticianLocationScreen
            beauticianId="1"
            onBack={() => setCurrentStep('beauticianDashboard')}
          />
        );

      case 'beauticianLeaves':
        return (
          <BeauticianLeavesScreen
            beauticianId="1"
            onBack={() => setCurrentStep('beauticianDashboard')}
          />
        );

      case 'beauticianEarnings':
        return (
          <BeauticianEarningsScreen
            beauticianId="1"
            onBack={() => setCurrentStep('beauticianDashboard')}
          />
        );

      case 'beauticianPerformance':
        return (
          <BeauticianPerformanceScreen
            beauticianId="1"
            onBack={() => setCurrentStep('beauticianDashboard')}
          />
        );

      case 'beauticianSettings':
        return (
          <BeauticianSettingsScreen
            beauticianId="1"
            onBack={() => setCurrentStep('beauticianDashboard')}
          />
        );

      case 'adminProfile':
        return (
          <AdminProfileScreen
            onBack={() => setCurrentStep('adminDashboard')}
          />
        );

      case 'adminSettings':
        return (
          <AdminSettingsScreen
            onBack={() => setCurrentStep('adminDashboard')}
            onLogout={logout}
          />
        );

      case 'therapistTracking':
        return (
          <TherapistTrackingScreen
            assignment={authState.selectedEntity}
            onBack={() => setCurrentStep('bookings')}
          />
        );

      case 'adminLogin':
        return (
          <AuthLoginScreen
            userType="Admin"
            onBack={() => setCurrentStep('welcome')}
            onLogin={loginUser}
            isLoading={authState.isLoading}
            error={authState.error}
          />
        );
      
      case 'employeeDashboard':
        return (
          <EmployeeDashboardScreen
            onLogout={logout}
            onNavigate={setCurrentStep}
            user={authState.user}
          />
        );
      
      case 'spaOnboarding':
        return (
          <SpaOnboardingScreen
            onBack={() => setCurrentStep('employeeDashboard')}
            onSubmit={handleSpaOnboardingSubmit}
          />
        );
      
      case 'vendorDashboard':
        // Check if user is vendor_applicant (pre-approval) or vendor (approved)
        if (authState.user?.role === 'vendor_applicant') {
          return (
            <VendorApplicantPortal
              onLogout={logout}
              user={authState.user}
            />
          );
        }
        return (
          <VendorDashboardScreen
            onLogout={logout}
            user={authState.user}
            onNavigate={(screen, data) => {
              if (data) {
                setSelectedEntity(data);
              }
              setCurrentStep(screen);
            }}
          />
        );
      
      case 'therapistManagement':
        return (
          <TherapistManagementScreen
            vendorId={authState.user?.mobile || 'vendor_1'}
            onBack={() => setCurrentStep('vendorDashboard')}
            onNavigate={(screen, data) => {
              if (data) {
                setSelectedEntity(data);
              }
              setCurrentStep(screen);
            }}
          />
        );

      case 'addTherapist':
        return (
          <TherapistFormScreen
            vendorId={authState.user?.mobile || 'vendor_1'}
            onBack={() => setCurrentStep('therapistManagement')}
            onSave={(therapistData) => {
              console.log('Save therapist:', therapistData);
              // In real app, this would call Supabase to insert therapist
              alert('Therapist added successfully!');
              setCurrentStep('therapistManagement');
            }}
          />
        );

      case 'editTherapist':
        return (
          <TherapistFormScreen
            therapist={authState.selectedEntity}
            vendorId={authState.user?.mobile || 'vendor_1'}
            onBack={() => setCurrentStep('therapistManagement')}
            onSave={(therapistData) => {
              console.log('Update therapist:', therapistData);
              // In real app, this would call Supabase to update therapist
              alert('Therapist updated successfully!');
              setCurrentStep('therapistManagement');
            }}
          />
        );

      case 'assignTask':
      case 'assignTherapist':
        return (
          <AssignTaskScreen
            therapist={authState.selectedEntity}
            vendorId={authState.user?.mobile || 'vendor_1'}
            onBack={() => setCurrentStep(authState.currentStep === 'assignTherapist' ? 'vendorDashboard' : 'therapistManagement')}
            onAssign={(assignmentData) => {
              console.log('Assign task:', assignmentData);
              // In real app, this would call Supabase to create assignment
              alert('Task assigned successfully! Customer will be able to track therapist location.');
              setCurrentStep('vendorDashboard');
            }}
          />
        );

      case 'adminDashboard':
        return (
          <AdminDashboardScreen
            onLogout={logout}
            user={authState.user}
            onNavigate={setCurrentStep}
          />
        );

      case 'mobile':
        return (
          <MobileInputScreen
            onBack={() => setCurrentStep('welcome')}
            onSendOTP={sendOTP}
            isLoading={authState.isLoading}
            error={authState.error}
          />
        );
      
      case 'otp':
        return (
          <OTPScreen
            onBack={() => setCurrentStep('mobile')}
            onVerifyOTP={verifyOTP}
            onResendOTP={() => sendOTP(authState.user.mobile || '')}
            mobile={authState.user.mobile || ''}
            isLoading={authState.isLoading}
            error={authState.error}
          />
        );

      case 'profileSetup':
        return (
          <ProfileSetupScreen
            onBack={() => setCurrentStep('otp')}
            onCompleteProfile={completeProfile}
            isLoading={authState.isLoading}
            error={authState.error}
          />
        );
      
      case 'complete':
        return (
          <CompletionScreen
            user={authState.user}
            onContinue={() => setCurrentStep('home')}
          />
        );
      
      case 'home':
        return (
          <HomeScreen
            user={authState.user}
            onNavigate={(screen, data?) => {
              console.log('Navigate to:', screen, data);
              if (screen === 'salonDetail' && data) {
                setSelectedEntity(data);
                setCurrentStep('salonDetail' as any);
              } else if (screen === 'mapView') {
                if (data?.initialSelectedProviderId) {
                  setSelectedEntity(data);
                }
                setCurrentStep('mapView' as any);
              } else if (screen === 'bookings') {
                setCurrentStep('bookings' as any);
              }
            }}
          />
        );
      
      case 'mapView':
        return (
          <MapViewScreen
            initialSelectedProviderId={authState.selectedEntity?.initialSelectedProviderId}
            onNavigate={(screen, data?) => {
              console.log('Navigate to:', screen, data);
              if (screen === 'booking' && data) {
                setSelectedEntity(data);
                setCurrentStep('booking' as any);
              }
            }}
          />
        );
      
      case 'bookings':
        return (
          <BookingHistoryScreen
            onNavigate={(screen, data?) => {
              console.log('Navigate to:', screen, data);
              if (screen === 'mapView') {
                setCurrentStep('mapView' as any);
              } else if (screen === 'rescheduleBooking' && data) {
                setSelectedEntity(data);
                setCurrentStep('rescheduleBooking' as any);
              }
            }}
          />
        );
      
      case 'rescheduleBooking':
        return (
          <RescheduleBookingScreen
            bookingData={authState.selectedEntity}
            onConfirm={(newDate: string, newTime: string) => {
              // In a real app, this would call an API to update the booking
              console.log('Reschedule confirmed:', { newDate, newTime });
              alert(`Booking rescheduled successfully!\nNew date: ${newDate}\nNew time: ${newTime}`);
              setCurrentStep('bookings' as any);
            }}
            onCancel={() => setCurrentStep('bookings' as any)}
          />
        );
      
      case 'booking':
        return (
          <BookingScreen
            cartItems={authState.selectedEntity?.cartItems || []}
            onBack={() => {
              // Navigate back to the previous screen (could be mapView or salonDetail)
              setCurrentStep('mapView' as any);
            }}
            onNavigate={(screen, data?) => {
              console.log('Navigate to:', screen, data);
              if (screen === 'payment' && data) {
                setSelectedEntity(data);
                setCurrentStep('payment' as any);
              }
            }}
          />
        );
      
      case 'payment':
        return (
          <PaymentScreen
            bookingData={authState.selectedEntity}
            onNavigate={(screen, data?) => {
              console.log('Navigate to:', screen, data);
              if (screen === 'orderTracking' && data) {
                setSelectedEntity(data);
                setCurrentStep('orderTracking' as any);
              }
            }}
          />
        );
      
      case 'orderTracking':
        return (
          <OrderTrackingScreen
            orderData={authState.selectedEntity}
            onNavigate={(screen, data?) => {
              console.log('Navigate to:', screen, data);
              if (screen === 'home') {
                setCurrentStep('home');
              } else if (screen === 'chat' && data) {
                setSelectedEntity(data);
                setCurrentStep('chat' as any);
              }
            }}
          />
        );
      
      case 'salonDetail':
        return (
          <SalonDetailScreen
            salon={authState.selectedEntity}
            onBack={() => setCurrentStep('home')}
            onNavigate={(screen, data?) => {
              console.log('Navigate to:', screen, data);
              if (screen === 'booking' && data) {
                setSelectedEntity(data);
                setCurrentStep('booking' as any);
              } else if (screen === 'mapView') {
                setCurrentStep('mapView' as any);
              }
            }}
          />
        );
      
      case 'categoryServices':
        return (
          <div className="min-h-screen bg-gray-50 pt-[70px] pb-[70px]">
            {/* Header with Back Button */}
            <div className="bg-white shadow-sm border-b border-gray-100">
              <div className="flex items-center justify-between p-4">
                <button
                  onClick={() => setCurrentStep('home')}
                  aria-label="Go back to home screen"
                  className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-700" />
                </button>
                <h1 className="text-lg font-semibold text-gray-900">Category Services</h1>
                <div className="w-10" />
              </div>
            </div>
            
            <div className="flex items-center justify-center flex-1 p-6">
              <div className="text-center">
                <p className="text-gray-600 mb-6">
                  {authState.selectedEntity?.name ? 
                    `Showing services for ${authState.selectedEntity.name}` : 
                    'Browse all service categories'
                  }
                </p>
              </div>
            </div>
          </div>
        );
      
      case 'offerDetail':
        return (
          <div className="min-h-screen bg-gray-50 pt-[70px] pb-[70px]">
            {/* Header with Back Button */}
            <div className="bg-white shadow-sm border-b border-gray-100">
              <div className="flex items-center justify-between p-4">
                <button
                  onClick={() => setCurrentStep('home')}
                  aria-label="Go back to home screen"
                  className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-700" />
                </button>
                <h1 className="text-lg font-semibold text-gray-900">Special Offer</h1>
                <div className="w-10" />
              </div>
            </div>
            
            <div className="flex items-center justify-center flex-1 p-6">
              <div className="text-center max-w-md mx-auto">
                {authState.selectedEntity && (
                  <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
                    <h2 className="text-xl font-semibold text-purple-600 mb-2">
                      {authState.selectedEntity.discount}% OFF
                    </h2>
                    <p className="text-gray-900 font-medium mb-2">{authState.selectedEntity.title}</p>
                    <p className="text-gray-600 mb-4">{authState.selectedEntity.description}</p>
                    <p className="text-sm text-gray-500">Valid until: {authState.selectedEntity.validUntil}</p>
                  </div>
                )}
                <div className="space-y-3">
                  <Button onClick={() => setCurrentStep('mapView')} className="w-full">
                    Find Spas Near You
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <ProfileScreen
            user={authState.user}
            onLogout={logout}
            onNavigate={(screen, data?) => {
              if (screen === 'referral') {
                setCurrentStep('referral' as any);
              } else {
                setCurrentStep(screen as any);
              }
            }}
          />
        );
      
      case 'referral':
        return (
          <ReferralScreen
            user={authState.user}
            onBack={() => setCurrentStep('profile' as any)}
          />
        );
      
      case 'notifications':
        return (
          <NotificationScreen
            onBack={() => setCurrentStep('profile' as any)}
            onNavigate={(screen, data?) => {
              if (screen === 'reviewScreen' && data) {
                setSelectedEntity(data);
                setCurrentStep('reviewScreen' as any);
              } else {
                setCurrentStep(screen as any);
              }
            }}
          />
        );
      
      case 'vendorCategorySelection':
        return (
          <VendorCategorySelectionScreen
            onNavigate={(screen, data?) => {
              if (data) setSelectedEntity(data);
              setCurrentStep(screen as any);
            }}
          />
        );

      case 'vendorSignupOptions':
        return (
          <VendorSignupOptionsScreen
            onNavigate={(screen, data?) => {
              if (data) setSelectedEntity(data);
              setCurrentStep(screen as any);
            }}
            selectedCategory={authState.selectedEntity?.selectedCategory}
          />
        );

      case 'vendorQuickSignup':
        return (
          <VendorQuickSignupScreen
            onNavigate={(screen, data?) => {
              if (data) setSelectedEntity(data);
              setCurrentStep(screen as any);
            }}
            selectedCategory={authState.selectedEntity?.selectedCategory}
          />
        );

      case 'vendorMobileVerification':
        return (
          <VendorMobileVerificationScreen
            onNavigate={(screen, data?) => {
              if (data) setSelectedEntity(data);
              setCurrentStep(screen as any);
            }}
            selectedCategory={authState.selectedEntity?.selectedCategory}
            signupType={authState.selectedEntity?.signupType}
            provider={authState.selectedEntity?.provider}
          />
        );

      case 'vendorQuickSignupSuccess':
        return (
          <VendorQuickSignupSuccessScreen
            onNavigate={(screen, data?) => {
              if (data) setSelectedEntity(data);
              setCurrentStep(screen as any);
            }}
            selectedCategory={authState.selectedEntity?.selectedCategory}
            mobile={authState.selectedEntity?.mobile}
            userName={authState.selectedEntity?.userName}
          />
        );

      case 'vendorSignup':
        return (
          <VendorSignupScreen
            onNavigate={(screen, data?) => {
              if (data) setSelectedEntity(data);
              setCurrentStep(screen as any);
            }}
            selectedCategory={authState.selectedEntity?.selectedCategory}
            signupType={authState.selectedEntity?.signupType}
            isProfileCompletion={authState.selectedEntity?.isProfileCompletion}
            mobile={authState.selectedEntity?.mobile}
          />
        );

      case 'vendorSignupSuccess':
        return (
          <VendorSignupSuccessScreen
            onNavigate={setCurrentStep}
            data={authState.selectedEntity}
          />
        );

      case 'vendorApproval':
        return (
          <VendorApprovalScreen
            onNavigate={setCurrentStep}
          />
        );

      case 'vendorApplicationStatus':
        return (
          <VendorApplicationTracking
            onBack={() => setCurrentStep('welcome')}
          />
        );

      case 'docPortal':
        return (
          <DocPortalScreen
            onBack={() => setCurrentStep('welcome')}
          />
        );

      case 'reviewScreen':
        return (
          <ReviewScreen
            bookingData={authState.selectedEntity}
            onBack={() => setCurrentStep('bookings' as any)}
            onSubmitReview={(reviewData) => {
              console.log('Review submitted:', reviewData);
              // In real app, this would call an API to save the review
              setCurrentStep('bookings' as any);
            }}
          />
        );
      
      case 'chat':
        return (
          <ChatScreen
            therapistInfo={authState.selectedEntity?.therapistInfo || {
              id: 'therapist1',
              name: 'Therapist',
              photo: 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=150',
              isOnline: true,
              specialties: ['Massage Therapy']
            }}
            onBack={() => {
              // Go back to the previous screen based on context
              if (authState.currentStep === 'chat') {
                setCurrentStep('orderTracking');
              }
            }}
            onCall={() => {
              console.log('Starting voice call with therapist');
              // In real app, this would initiate a voice call
            }}
            onVideoCall={() => {
              console.log('Starting video call with therapist');
              // In real app, this would initiate a video call
            }}
          />
        );
      
      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex items-center justify-center">
            <p className="text-gray-600">Loading...</p>
          </div>
        );
    }
  };

  return (
    <div className="font-sans antialiased">
      {showFixedHeader && (
        <FixedHeader
          user={authState.user}
          onLogout={logout}
          onSearch={(query) => {
            console.log('Search from header:', query);
            // Handle search functionality here
          }}
        />
      )}
      {renderCurrentScreen()}
      {showFixedFooter && (
        <FixedFooter
          onNavigate={(screen, data?) => {
            if (screen === 'bookings') {
              setCurrentStep('bookings' as any);
            } else if (screen === 'home') {
              setCurrentStep('home');
            } else if (screen === 'mapView') {
              setCurrentStep('mapView' as any);
            } else {
              setCurrentStep('profile' as any);
              setCurrentStep(screen as any);
            }
          }}
        />
      )}
    </div>
  );
}

export default App;
