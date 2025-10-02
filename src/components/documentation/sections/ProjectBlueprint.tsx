import React from 'react';
import { LayoutGrid as Layout, Database, Cloud, Shield, Zap, GitBranch } from 'lucide-react';

export const ProjectBlueprint: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-neutral-200 pb-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
            <Layout className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Architecture Blueprint</h1>
            <p className="text-neutral-600">System architecture and technical design</p>
          </div>
        </div>
      </div>

      {/* Full-Stack Overview */}
      <section>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Full-Stack Overview</h2>
        
        <div className="card p-6 mb-6">
          <p className="text-lg text-neutral-700 leading-relaxed mb-6">
            OMBARO employs a modern full-stack architecture designed for scalability, performance, and maintainability. 
            It separates concerns between frontend clients (web and mobile) and a centralized backend API, with a robust 
            database for data persistence.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Layout className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Frontend</h3>
              <p className="text-neutral-600">React & React Native applications with shared components</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Cloud className="w-8 h-8 text-secondary-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Backend</h3>
              <p className="text-neutral-600">Supabase with edge functions and real-time capabilities</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Database className="w-8 h-8 text-accent-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Database</h3>
              <p className="text-neutral-600">PostgreSQL with real-time subscriptions and RLS</p>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Layers */}
      <section>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Architecture Layers</h2>
        
        <div className="space-y-6">
          {/* Presentation Layer */}
          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <Layout className="w-5 h-5 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900">Presentation Layer</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-3">Web Application</h4>
                <ul className="space-y-2 text-neutral-700">
                  <li>• <strong>React 18:</strong> Component-based UI framework</li>
                  <li>• <strong>TypeScript:</strong> Type-safe development</li>
                  <li>• <strong>Vite:</strong> Fast build tool and dev server</li>
                  <li>• <strong>Tailwind CSS:</strong> Utility-first styling</li>
                  <li>• <strong>Lucide React:</strong> Consistent icon system</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-neutral-900 mb-3">Mobile Application</h4>
                <ul className="space-y-2 text-neutral-700">
                  <li>• <strong>React Native:</strong> Cross-platform mobile framework</li>
                  <li>• <strong>Expo:</strong> Development and deployment platform</li>
                  <li>• <strong>React Navigation:</strong> Navigation library</li>
                  <li>• <strong>Expo Location:</strong> Geolocation services</li>
                  <li>• <strong>StyleSheet:</strong> Platform-optimized styling</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Business Logic Layer */}
          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                <GitBranch className="w-5 h-5 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900">Business Logic Layer</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-neutral-50 rounded-lg p-4">
                <h4 className="font-semibold text-neutral-900 mb-2">Authentication</h4>
                <p className="text-sm text-neutral-600">Multi-portal auth with role-based access control</p>
              </div>
              
              <div className="bg-neutral-50 rounded-lg p-4">
                <h4 className="font-semibold text-neutral-900 mb-2">Booking Engine</h4>
                <p className="text-sm text-neutral-600">Service discovery, scheduling, and payment processing</p>
              </div>
              
              <div className="bg-neutral-50 rounded-lg p-4">
                <h4 className="font-semibold text-neutral-900 mb-2">Location Services</h4>
                <p className="text-sm text-neutral-600">GPS tracking, geofencing, and proximity search</p>
              </div>
            </div>
          </div>

          {/* Data Layer */}
          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
                <Database className="w-5 h-5 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900">Data Layer</h3>
            </div>
            
            <div className="space-y-4">
              <div className="bg-accent-50 rounded-lg p-4">
                <h4 className="font-semibold text-neutral-900 mb-2">Supabase PostgreSQL</h4>
                <p className="text-neutral-700 mb-3">Primary database with real-time capabilities and row-level security</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-neutral-900">Core Tables:</p>
                    <ul className="text-neutral-600 mt-1">
                      <li>• Users & Authentication</li>
                      <li>• Service Providers</li>
                      <li>• Services & Bookings</li>
                      <li>• Reviews & Ratings</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">HR Tables:</p>
                    <ul className="text-neutral-600 mt-1">
                      <li>• Employee Records</li>
                      <li>• Attendance Tracking</li>
                      <li>• Leave Management</li>
                      <li>• Payroll & Documents</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Architecture */}
      <section>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Security Architecture</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-error-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-error-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">Authentication & Authorization</h3>
            </div>
            <ul className="space-y-2 text-neutral-700">
              <li>• Multi-portal authentication with role-based access</li>
              <li>• Secure password hashing (bcrypt)</li>
              <li>• JWT tokens for API authentication</li>
              <li>• Row-level security (RLS) in database</li>
              <li>• Aadhaar OTP verification for identity confirmation</li>
            </ul>
          </div>
          
          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-warning-100 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-warning-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">Data Protection</h3>
            </div>
            <ul className="space-y-2 text-neutral-700">
              <li>• HTTPS/SSL encryption for data in transit</li>
              <li>• Database encryption for sensitive data</li>
              <li>• Regular automated backups</li>
              <li>• GDPR compliance measures</li>
              <li>• Zero-tolerance policy enforcement</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};