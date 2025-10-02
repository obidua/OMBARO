import React from 'react';
import { Book, Target, Users, Zap } from 'lucide-react';

export const ProjectOverview: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-neutral-200 pb-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
            <Book className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Project Overview</h1>
            <p className="text-neutral-600">Comprehensive beauty and wellness platform</p>
          </div>
        </div>
      </div>

      {/* Project Summary */}
      <section>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Project Summary</h2>
        <div className="prose prose-neutral max-w-none">
          <p className="text-lg text-neutral-700 leading-relaxed mb-6">
            OMBARO is a comprehensive beauty and wellness platform designed to connect customers with spa, salon,
            and wellness service providers. It features multi-portal authentication for various user roles including
            customers, employees, vendors, therapists, and administrators, ensuring a tailored experience for each user type.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="card p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900">Mission</h3>
              </div>
              <p className="text-neutral-700">
                To provide seamless service discovery, booking, payment, and tracking functionalities 
                for the beauty and wellness industry.
              </p>
            </div>
            
            <div className="card p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-secondary-600" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900">Target Users</h3>
              </div>
              <p className="text-neutral-700">
                Customers seeking wellness services, service providers, employees managing operations, 
                and administrators overseeing the platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Key Features</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Customer Portal */}
          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900">Customer Portal</h3>
            </div>
            <ul className="space-y-3 text-neutral-700">
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-accent-500 rounded-full mt-2 flex-shrink-0"></div>
                <span><strong>Service Discovery:</strong> Find nearby spas and wellness centers</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-accent-500 rounded-full mt-2 flex-shrink-0"></div>
                <span><strong>Booking System:</strong> Schedule appointments with real-time availability</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-accent-500 rounded-full mt-2 flex-shrink-0"></div>
                <span><strong>Payment Integration:</strong> Secure payment processing</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-accent-500 rounded-full mt-2 flex-shrink-0"></div>
                <span><strong>Order Tracking:</strong> Real-time tracking of service providers</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-accent-500 rounded-full mt-2 flex-shrink-0"></div>
                <span><strong>Review System:</strong> Rate and review completed services</span>
              </li>
            </ul>
          </div>

          {/* Employee Portal */}
          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900">Employee Portal</h3>
            </div>
            <ul className="space-y-3 text-neutral-700">
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                <span><strong>Spa Onboarding:</strong> Add new spas to the platform</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                <span><strong>Vendor Management:</strong> Manage spa partnerships</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                <span><strong>Attendance Tracking:</strong> Self-attendance with location tagging</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                <span><strong>Leave Management:</strong> Apply for and track leave requests</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                <span><strong>HR Documents:</strong> Access salary slips and official documents</span>
              </li>
            </ul>
          </div>

          {/* Vendor Portal */}
          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900">Vendor Portal</h3>
            </div>
            <ul className="space-y-3 text-neutral-700">
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-secondary-500 rounded-full mt-2 flex-shrink-0"></div>
                <span><strong>Service Management:</strong> Add and manage offered services</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-secondary-500 rounded-full mt-2 flex-shrink-0"></div>
                <span><strong>Booking Management:</strong> View and manage customer bookings</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-secondary-500 rounded-full mt-2 flex-shrink-0"></div>
                <span><strong>Analytics Dashboard:</strong> Track performance and revenue</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-secondary-500 rounded-full mt-2 flex-shrink-0"></div>
                <span><strong>Customer Reviews:</strong> Monitor and respond to feedback</span>
              </li>
            </ul>
          </div>

          {/* Admin Portal */}
          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-warning-100 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-warning-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900">Admin Portal</h3>
            </div>
            <ul className="space-y-3 text-neutral-700">
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-warning-500 rounded-full mt-2 flex-shrink-0"></div>
                <span><strong>User Management:</strong> Manage all platform users</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-warning-500 rounded-full mt-2 flex-shrink-0"></div>
                <span><strong>Spa Approval:</strong> Review and approve new spa registrations</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-warning-500 rounded-full mt-2 flex-shrink-0"></div>
                <span><strong>System Analytics:</strong> Platform-wide performance metrics</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-warning-500 rounded-full mt-2 flex-shrink-0"></div>
                <span><strong>Security Monitoring:</strong> Track system security and alerts</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-warning-500 rounded-full mt-2 flex-shrink-0"></div>
                <span><strong>Location Tracking:</strong> Monitor employee locations in real-time</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Technology Stack</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Web Application</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span className="text-neutral-700"><strong>Frontend:</strong> React 18, TypeScript, Vite</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span className="text-neutral-700"><strong>Styling:</strong> Tailwind CSS</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span className="text-neutral-700"><strong>Icons:</strong> Lucide React</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span className="text-neutral-700"><strong>State Management:</strong> React Hooks + Context</span>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Mobile Application</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
                <span className="text-neutral-700"><strong>Framework:</strong> React Native with Expo</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
                <span className="text-neutral-700"><strong>Navigation:</strong> React Navigation 6</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
                <span className="text-neutral-700"><strong>Location:</strong> Expo Location</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
                <span className="text-neutral-700"><strong>Notifications:</strong> Expo Notifications</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Structure */}
      <section>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Project Structure</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Web Application Structure</h3>
            <div className="bg-neutral-50 rounded-lg p-4 font-mono text-sm">
              <pre className="text-neutral-700 whitespace-pre-wrap">{`src/
├── components/
│   ├── auth/          # Authentication screens
│   ├── common/        # Shared components
│   ├── layout/        # Layout components
│   ├── screens/       # Main application screens
│   └── ui/            # Reusable UI components
├── hooks/             # Custom React hooks
├── types/             # TypeScript type definitions
└── main.tsx           # Application entry point`}</pre>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Mobile Application Structure</h3>
            <div className="bg-neutral-50 rounded-lg p-4 font-mono text-sm">
              <pre className="text-neutral-700 whitespace-pre-wrap">{`OmbaroMobile/
├── src/
│   ├── components/
│   │   └── ui/        # Reusable UI components
│   ├── context/       # React Context for state
│   ├── screens/       # Screen components
│   ├── types/         # TypeScript definitions
│   └── constants/     # Theme and constants
├── assets/            # Images and assets
├── app.json          # Expo configuration
└── App.tsx           # Main app component`}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* Shared Components */}
      <section>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Shared Components</h2>
        
        <div className="card p-6">
          <p className="text-neutral-700 mb-6">
            To ensure consistency and reduce redundancy, both the web and mobile applications share several key components:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                  <span className="text-primary-600 font-bold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900">Type Definitions</h4>
                  <p className="text-sm text-neutral-600">Common TypeScript interfaces for data models</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-secondary-100 rounded-lg flex items-center justify-center">
                  <span className="text-secondary-600 font-bold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900">Business Logic</h4>
                  <p className="text-sm text-neutral-600">Authentication, booking, and data management</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center">
                  <span className="text-accent-600 font-bold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900">API Integration</h4>
                  <p className="text-sm text-neutral-600">Shared service layer for backend communication</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-warning-100 rounded-lg flex items-center justify-center">
                  <span className="text-warning-600 font-bold text-sm">4</span>
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900">Design System</h4>
                  <p className="text-sm text-neutral-600">Consistent colors, spacing, and typography</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};