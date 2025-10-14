import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, Clock, XCircle, AlertCircle, FileText, Calendar, User, Shield, Eye, EyeOff } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { supabase } from '../../lib/supabase';

interface VendorApplicationTrackingProps {
  onBack: () => void;
}

interface ApplicationData {
  id: string;
  application_number: string;
  business_name: string;
  contact_person: string;
  contact_mobile: string;
  contact_email: string;
  status: string;
  current_approval_stage: number;
  applied_date: string;
  review_notes?: string;
  business_type: string;
  partner_type: string;
  city: string;
  state: string;
}

export const VendorApplicationTracking: React.FC<VendorApplicationTrackingProps> = ({ onBack }) => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [application, setApplication] = useState<ApplicationData | null>(null);

  async function handleTrackApplication(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate inputs
      if (!mobile || !password) {
        setError('Please enter both mobile number and password');
        setLoading(false);
        return;
      }

      // Query the database for the application
      const { data, error: queryError } = await supabase
        .from('vendor_applications')
        .select('*')
        .eq('contact_mobile', mobile)
        .eq('application_password', password)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (queryError) {
        console.error('Query error:', queryError);
        setError('Error checking application status. Please try again.');
        setLoading(false);
        return;
      }

      if (!data) {
        setError('No application found with this mobile number and password. Please check your credentials.');
        setLoading(false);
        return;
      }

      setApplication(data);
    } catch (err) {
      console.error('Error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function getStatusInfo(status: string) {
    const statusMap: Record<string, { title: string; description: string; color: string; icon: any }> = {
      pending: {
        title: 'Pending Review',
        description: 'Your application has been submitted and is waiting for initial review.',
        color: 'yellow',
        icon: Clock
      },
      fo_review: {
        title: 'Field Officer Review',
        description: 'Your application is currently being reviewed by our Field Officer team.',
        color: 'blue',
        icon: User
      },
      manager_review: {
        title: 'Manager Review',
        description: 'Your application has been forwarded to the Manager level for approval.',
        color: 'purple',
        icon: User
      },
      director_review: {
        title: 'Director Review',
        description: 'Your application is under review by the Director team.',
        color: 'indigo',
        icon: User
      },
      admin_review: {
        title: 'Final Admin Review',
        description: 'Your application is in the final stage of review by our Admin team.',
        color: 'pink',
        icon: User
      },
      approved: {
        title: 'Approved!',
        description: 'Congratulations! Your vendor application has been approved.',
        color: 'green',
        icon: CheckCircle
      },
      rejected: {
        title: 'Application Rejected',
        description: 'Unfortunately, your application has been rejected.',
        color: 'red',
        icon: XCircle
      },
      additional_info_required: {
        title: 'Additional Information Required',
        description: 'We need more information to process your application.',
        color: 'orange',
        icon: AlertCircle
      }
    };

    return statusMap[status] || statusMap.pending;
  }

  function getStageProgress(currentStage: number, status: string) {
    if (status === 'approved') return 100;
    if (status === 'rejected') return 0;
    return Math.min((currentStage / 5) * 100, 100);
  }

  const stages = [
    { level: 1, title: 'Submitted' },
    { level: 2, title: 'Field Officer Review' },
    { level: 3, title: 'Manager Review' },
    { level: 4, title: 'Director Review' },
    { level: 5, title: 'Final Approval' }
  ];

  if (application) {
    const statusInfo = getStatusInfo(application.status);
    const progress = getStageProgress(application.current_approval_stage, application.status);
    const StatusIcon = statusInfo.icon;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <button
              onClick={() => {
                setApplication(null);
                setMobile('');
                setPassword('');
              }}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Check Another Application</span>
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Application Status</h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
          {/* Status Card */}
          <div className={`bg-gradient-to-r from-${statusInfo.color}-500 to-${statusInfo.color}-600 rounded-2xl shadow-lg p-6 text-white`}>
            <div className="flex items-start gap-4">
              <StatusIcon className="w-12 h-12 flex-shrink-0" />
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">{statusInfo.title}</h2>
                <p className="text-white/90 mb-4">{statusInfo.description}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span>{application.application_number}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Applied: {new Date(application.applied_date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Approval Progress</h3>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Stage {application.current_approval_stage} of 5
                </span>
                <span className="text-sm text-gray-600">{progress.toFixed(0)}%</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r from-${statusInfo.color}-500 to-${statusInfo.color}-600 transition-all duration-500`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Timeline Steps */}
            <div className="space-y-4">
              {stages.map((stage, index) => {
                const completed = stage.level < application.current_approval_stage || application.status === 'approved';
                const active = stage.level === application.current_approval_stage && application.status !== 'approved' && application.status !== 'rejected';

                return (
                  <div key={stage.level} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        completed ? 'bg-green-500 text-white' :
                        active ? 'bg-blue-500 text-white' :
                        'bg-gray-200 text-gray-500'
                      }`}>
                        {completed ? <CheckCircle className="w-6 h-6" /> : stage.level}
                      </div>
                      {index < stages.length - 1 && (
                        <div className={`w-0.5 h-12 ${completed ? 'bg-green-500' : 'bg-gray-200'}`} />
                      )}
                    </div>
                    <div className="flex-1 pt-2">
                      <h4 className={`font-semibold ${
                        active ? 'text-blue-600' :
                        completed ? 'text-green-600' :
                        'text-gray-600'
                      }`}>
                        {stage.title}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {completed ? 'Completed' : active ? 'In Progress' : 'Pending'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Application Details */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Business Name</p>
                <p className="font-medium text-gray-900">{application.business_name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Contact Person</p>
                <p className="font-medium text-gray-900">{application.contact_person}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Business Type</p>
                <p className="font-medium text-gray-900 capitalize">{application.business_type.replace('_', ' ')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Partner Type</p>
                <p className="font-medium text-gray-900">{application.partner_type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="font-medium text-gray-900">{application.city}, {application.state}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Contact Mobile</p>
                <p className="font-medium text-gray-900">{application.contact_mobile}</p>
              </div>
            </div>
          </div>

          {/* Review Notes */}
          {application.review_notes && (
            <div className={`bg-${application.status === 'rejected' ? 'red' : application.status === 'additional_info_required' ? 'orange' : 'blue'}-50 border border-${application.status === 'rejected' ? 'red' : application.status === 'additional_info_required' ? 'orange' : 'blue'}-200 rounded-2xl p-6`}>
              <div className="flex items-start gap-3">
                <AlertCircle className={`w-5 h-5 text-${application.status === 'rejected' ? 'red' : application.status === 'additional_info_required' ? 'orange' : 'blue'}-600 flex-shrink-0 mt-0.5`} />
                <div>
                  <h4 className={`font-semibold text-${application.status === 'rejected' ? 'red' : application.status === 'additional_info_required' ? 'orange' : 'blue'}-900 mb-1`}>
                    {application.status === 'rejected' ? 'Rejection Reason' :
                     application.status === 'additional_info_required' ? 'Information Required' :
                     'Reviewer Comments'}
                  </h4>
                  <p className={`text-sm text-${application.status === 'rejected' ? 'red' : application.status === 'additional_info_required' ? 'orange' : 'blue'}-800`}>
                    {application.review_notes}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Help Section */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
            <p className="text-white/90 text-sm mb-4">
              If you have any questions about your application status, please contact our support team.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="tel:+911234567890"
                className="px-4 py-2 bg-white text-blue-600 rounded-lg font-medium text-sm hover:bg-blue-50 transition-colors"
              >
                Call Support
              </a>
              <a
                href="mailto:support@ombaro.com"
                className="px-4 py-2 bg-white/20 text-white rounded-lg font-medium text-sm hover:bg-white/30 transition-colors"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-md mx-auto px-4 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Icon */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Track Your Application
            </h1>
            <p className="text-gray-600">
              Enter your mobile number and password to check your vendor application status
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleTrackApplication} className="bg-white rounded-2xl shadow-xl p-6 space-y-6">
            <Input
              label="Mobile Number"
              type="tel"
              placeholder="Enter your registered mobile number"
              value={mobile}
              onChange={(e) => {
                setMobile(e.target.value);
                setError('');
              }}
              required
              icon={<User className="w-5 h-5 text-gray-400" />}
            />

            <div className="relative">
              <Input
                label="Application Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter the password you set during application"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                required
                icon={<Shield className="w-5 h-5 text-gray-400" />}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              loading={loading}
              disabled={!mobile || !password}
              size="lg"
              className="w-full"
            >
              Track Application Status
            </Button>
          </form>

          {/* Info Card */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">Important Note</h3>
                <p className="text-sm text-blue-700">
                  Use the same mobile number and password that you provided during the application submission.
                  If you've forgotten your password, please contact our support team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
