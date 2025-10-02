import React from 'react';
import { GitBranch, Server, Database, Key, Shield, Zap, Smartphone } from 'lucide-react';

export const APIIntegration: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-neutral-200 pb-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
            <GitBranch className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">API Integration</h1>
            <p className="text-neutral-600">Backend communication and data management</p>
          </div>
        </div>
      </div>

      {/* API Overview */}
      <section>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">API Overview</h2>
        
        <div className="card p-6 mb-6">
          <p className="text-lg text-neutral-700 leading-relaxed mb-6">
            The OMBARO platform communicates with a centralized backend API built on Supabase for all data operations. 
            A shared service layer handles API requests, responses, and error handling across both web and mobile applications.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Server className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Supabase Backend</h3>
              <p className="text-neutral-600">PostgreSQL database with real-time capabilities and edge functions</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-secondary-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Authentication</h3>
              <p className="text-neutral-600">JWT-based auth with row-level security and role-based access</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-accent-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Real-time</h3>
              <p className="text-neutral-600">Live updates for bookings, location tracking, and notifications</p>
            </div>
          </div>
        </div>
      </section>

      {/* API Endpoints */}
      <section>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Core API Endpoints</h2>
        
        <div className="space-y-6">
          {/* Authentication Endpoints */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Authentication</h3>
            
            <div className="space-y-4">
              <div className="border-l-4 border-primary-500 pl-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-sm font-mono">POST</span>
                  <code className="text-neutral-700 font-mono">/auth/signup</code>
                </div>
                <p className="text-neutral-600 text-sm">Register new user with mobile verification</p>
              </div>
              
              <div className="border-l-4 border-accent-500 pl-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="bg-accent-100 text-accent-700 px-2 py-1 rounded text-sm font-mono">POST</span>
                  <code className="text-neutral-700 font-mono">/auth/login</code>
                </div>
                <p className="text-neutral-600 text-sm">Authenticate user with mobile/email and password</p>
              </div>
              
              <div className="border-l-4 border-secondary-500 pl-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="bg-secondary-100 text-secondary-700 px-2 py-1 rounded text-sm font-mono">POST</span>
                  <code className="text-neutral-700 font-mono">/auth/verify-otp</code>
                </div>
                <p className="text-neutral-600 text-sm">Verify mobile number with OTP</p>
              </div>
            </div>
          </div>

          {/* Service Provider Endpoints */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Service Providers</h3>
            
            <div className="space-y-4">
              <div className="border-l-4 border-accent-500 pl-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="bg-accent-100 text-accent-700 px-2 py-1 rounded text-sm font-mono">GET</span>
                  <code className="text-neutral-700 font-mono">/providers/nearby</code>
                </div>
                <p className="text-neutral-600 text-sm">Get service providers within specified radius</p>
              </div>
              
              <div className="border-l-4 border-primary-500 pl-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-sm font-mono">POST</span>
                  <code className="text-neutral-700 font-mono">/providers</code>
                </div>
                <p className="text-neutral-600 text-sm">Create new service provider (spa/salon)</p>
              </div>
              
              <div className="border-l-4 border-warning-500 pl-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="bg-warning-100 text-warning-700 px-2 py-1 rounded text-sm font-mono">PUT</span>
                  <code className="text-neutral-700 font-mono">/providers/:id</code>
                </div>
                <p className="text-neutral-600 text-sm">Update provider information and services</p>
              </div>
            </div>
          </div>

          {/* Booking Endpoints */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Bookings</h3>
            
            <div className="space-y-4">
              <div className="border-l-4 border-primary-500 pl-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-sm font-mono">POST</span>
                  <code className="text-neutral-700 font-mono">/bookings</code>
                </div>
                <p className="text-neutral-600 text-sm">Create new booking with payment processing</p>
              </div>
              
              <div className="border-l-4 border-accent-500 pl-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="bg-accent-100 text-accent-700 px-2 py-1 rounded text-sm font-mono">GET</span>
                  <code className="text-neutral-700 font-mono">/bookings/user/:userId</code>
                </div>
                <p className="text-neutral-600 text-sm">Get user's booking history and upcoming appointments</p>
              </div>
              
              <div className="border-l-4 border-warning-500 pl-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="bg-warning-100 text-warning-700 px-2 py-1 rounded text-sm font-mono">PUT</span>
                  <code className="text-neutral-700 font-mono">/bookings/:id/status</code>
                </div>
                <p className="text-neutral-600 text-sm">Update booking status (confirm, cancel, complete)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Error Handling */}
      <section>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Error Handling</h2>
        
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Error Response Format</h3>
          
          <div className="bg-neutral-900 rounded-lg p-4 mb-6">
            <pre className="text-accent-400 font-mono text-sm">{`{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "field": "mobile",
      "reason": "Invalid mobile number format"
    },
    "timestamp": "2025-01-11T10:30:00Z"
  }
}`}</pre>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-neutral-900 mb-3">Common Error Codes</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <code className="text-error-600">VALIDATION_ERROR</code>
                  <span className="text-neutral-600">400</span>
                </div>
                <div className="flex justify-between">
                  <code className="text-error-600">UNAUTHORIZED</code>
                  <span className="text-neutral-600">401</span>
                </div>
                <div className="flex justify-between">
                  <code className="text-error-600">FORBIDDEN</code>
                  <span className="text-neutral-600">403</span>
                </div>
                <div className="flex justify-between">
                  <code className="text-error-600">NOT_FOUND</code>
                  <span className="text-neutral-600">404</span>
                </div>
                <div className="flex justify-between">
                  <code className="text-error-600">RATE_LIMITED</code>
                  <span className="text-neutral-600">429</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-neutral-900 mb-3">Error Handling Best Practices</h4>
              <ul className="space-y-2 text-neutral-700 text-sm">
                <li>• Always provide user-friendly error messages</li>
                <li>• Log detailed errors for debugging</li>
                <li>• Implement retry logic for network failures</li>
                <li>• Show loading states during API calls</li>
                <li>• Handle offline scenarios gracefully</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Real-time Features */}
      <section>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Real-time Features</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-accent-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">Live Tracking</h3>
            </div>
            <ul className="space-y-2 text-neutral-700">
              <li>• Real-time therapist location updates</li>
              <li>• Live booking status changes</li>
              <li>• Instant notification delivery</li>
              <li>• Employee location monitoring</li>
            </ul>
          </div>
          
          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                <Database className="w-5 h-5 text-secondary-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">Data Synchronization</h3>
            </div>
            <ul className="space-y-2 text-neutral-700">
              <li>• Cross-device data sync</li>
              <li>• Offline-first architecture</li>
              <li>• Conflict resolution strategies</li>
              <li>• Optimistic UI updates</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Authentication Flow */}
      <section>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Authentication Flow</h2>
        
        <div className="card p-6">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                <span className="text-primary-600 font-bold text-sm">1</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-neutral-900">Mobile Verification</h4>
                <p className="text-neutral-600 text-sm">User enters mobile number and receives OTP</p>
              </div>
              <div className="bg-neutral-900 rounded p-2">
                <code className="text-accent-400 font-mono text-xs">POST /auth/send-otp</code>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-secondary-100 rounded-lg flex items-center justify-center">
                <span className="text-secondary-600 font-bold text-sm">2</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-neutral-900">OTP Verification</h4>
                <p className="text-neutral-600 text-sm">Verify OTP and create user session</p>
              </div>
              <div className="bg-neutral-900 rounded p-2">
                <code className="text-accent-400 font-mono text-xs">POST /auth/verify-otp</code>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center">
                <span className="text-accent-600 font-bold text-sm">3</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-neutral-900">Profile Setup</h4>
                <p className="text-neutral-600 text-sm">Complete user profile with personal information</p>
              </div>
              <div className="bg-neutral-900 rounded p-2">
                <code className="text-accent-400 font-mono text-xs">PUT /users/profile</code>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-warning-100 rounded-lg flex items-center justify-center">
                <span className="text-warning-600 font-bold text-sm">4</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-neutral-900">Session Management</h4>
                <p className="text-neutral-600 text-sm">Maintain authenticated session with JWT tokens</p>
              </div>
              <div className="bg-neutral-900 rounded p-2">
                <code className="text-accent-400 font-mono text-xs">GET /auth/session</code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Models */}
      <section>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Core Data Models</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">User Model</h3>
            <div className="bg-neutral-900 rounded-lg p-4">
              <pre className="text-accent-400 font-mono text-sm">{`interface User {
  id: string;
  name: string;
  email?: string;
  mobile: string;
  gender?: 'male' | 'female' | 'other';
  dateOfBirth?: string;
  isVerified: boolean;
  role: UserRole;
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
}`}</pre>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Booking Model</h3>
            <div className="bg-neutral-900 rounded-lg p-4">
              <pre className="text-accent-400 font-mono text-sm">{`interface Booking {
  id: string;
  userId: string;
  providerId: string;
  serviceIds: string[];
  scheduledDateTime: string;
  totalAmount: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  customerAddress: string;
  therapistId?: string;
  createdAt: string;
  updatedAt: string;
}`}</pre>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Service Provider Model</h3>
            <div className="bg-neutral-900 rounded-lg p-4">
              <pre className="text-accent-400 font-mono text-sm">{`interface ServiceProvider {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  rating: number;
  reviewCount: number;
  image: string;
  isOpen: boolean;
  specialties: string[];
  priceRange: PriceRange;
  services: Service[];
}`}</pre>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Service Model</h3>
            <div className="bg-neutral-900 rounded-lg p-4">
              <pre className="text-accent-400 font-mono text-sm">{`interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: ServiceCategory;
  image: string;
  rating: number;
  providerId: string;
}`}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* Environment Configuration */}
      <section>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Environment Configuration</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <Key className="w-5 h-5 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">Web Environment</h3>
            </div>
            
            <div className="bg-neutral-900 rounded-lg p-4 mb-4">
              <pre className="text-accent-400 font-mono text-sm">{`# .env
VITE_API_URL=https://api.ombaro.com
VITE_MAPS_API_KEY=your_google_maps_key
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_STRIPE_PUBLIC_KEY=your_stripe_key`}</pre>
            </div>
            
            <div className="bg-primary-50 rounded-lg p-3 border border-primary-200">
              <p className="text-primary-800 text-sm">
                <strong>Note:</strong> All environment variables for Vite must be prefixed with <code>VITE_</code>
              </p>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-secondary-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">Mobile Environment</h3>
            </div>
            
            <div className="bg-neutral-900 rounded-lg p-4 mb-4">
              <pre className="text-accent-400 font-mono text-sm">{`# .env
EXPO_PUBLIC_API_URL=https://api.ombaro.com
EXPO_PUBLIC_MAPS_API_KEY=your_google_maps_key
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
EXPO_PUBLIC_STRIPE_PUBLIC_KEY=your_stripe_key`}</pre>
            </div>
            
            <div className="bg-secondary-50 rounded-lg p-3 border border-secondary-200">
              <p className="text-secondary-800 text-sm">
                <strong>Note:</strong> Expo environment variables must be prefixed with <code>EXPO_PUBLIC_</code>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};