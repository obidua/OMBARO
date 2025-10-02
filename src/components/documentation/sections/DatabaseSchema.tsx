import React from 'react';
import { Database, Table, Key, Shield, Users, Calendar } from 'lucide-react';

export const DatabaseSchema: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-neutral-200 pb-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
            <Database className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Database Schema</h1>
            <p className="text-neutral-600">PostgreSQL database structure and relationships</p>
          </div>
        </div>
      </div>

      {/* Database Overview */}
      <section>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Database Overview</h2>
        
        <div className="card p-6 mb-6">
          <p className="text-lg text-neutral-700 leading-relaxed mb-6">
            OMBARO uses PostgreSQL as the primary database, managed through Supabase. The schema is designed 
            to support multi-tenant operations with proper data isolation and security through Row Level Security (RLS).
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">User Management</h3>
              <p className="text-neutral-600">Authentication, profiles, and role-based access</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-secondary-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Booking System</h3>
              <p className="text-neutral-600">Services, appointments, and payment tracking</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-accent-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">HR Management</h3>
              <p className="text-neutral-600">Employee records, attendance, and payroll</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Tables */}
      <section>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Core Tables</h2>
        
        <div className="space-y-6">
          {/* Users Table */}
          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <Table className="w-5 h-5 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900">users</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left py-2 font-semibold text-neutral-900">Column</th>
                    <th className="text-left py-2 font-semibold text-neutral-900">Type</th>
                    <th className="text-left py-2 font-semibold text-neutral-900">Constraints</th>
                    <th className="text-left py-2 font-semibold text-neutral-900">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  <tr>
                    <td className="py-2 font-mono text-primary-600">id</td>
                    <td className="py-2 text-neutral-700">uuid</td>
                    <td className="py-2 text-neutral-600">PRIMARY KEY</td>
                    <td className="py-2 text-neutral-600">Unique user identifier</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono text-primary-600">name</td>
                    <td className="py-2 text-neutral-700">text</td>
                    <td className="py-2 text-neutral-600">NOT NULL</td>
                    <td className="py-2 text-neutral-600">Full name</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono text-primary-600">email</td>
                    <td className="py-2 text-neutral-700">text</td>
                    <td className="py-2 text-neutral-600">UNIQUE</td>
                    <td className="py-2 text-neutral-600">Email address</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono text-primary-600">mobile</td>
                    <td className="py-2 text-neutral-700">text</td>
                    <td className="py-2 text-neutral-600">UNIQUE, NOT NULL</td>
                    <td className="py-2 text-neutral-600">Mobile number</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono text-primary-600">role</td>
                    <td className="py-2 text-neutral-700">user_role</td>
                    <td className="py-2 text-neutral-600">NOT NULL</td>
                    <td className="py-2 text-neutral-600">User role/department</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono text-primary-600">is_verified</td>
                    <td className="py-2 text-neutral-700">boolean</td>
                    <td className="py-2 text-neutral-600">DEFAULT false</td>
                    <td className="py-2 text-neutral-600">Verification status</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Service Providers Table */}
          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                <Table className="w-5 h-5 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900">service_providers</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left py-2 font-semibold text-neutral-900">Column</th>
                    <th className="text-left py-2 font-semibold text-neutral-900">Type</th>
                    <th className="text-left py-2 font-semibold text-neutral-900">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  <tr>
                    <td className="py-2 font-mono text-secondary-600">id</td>
                    <td className="py-2 text-neutral-700">uuid</td>
                    <td className="py-2 text-neutral-600">Unique provider identifier</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono text-secondary-600">name</td>
                    <td className="py-2 text-neutral-700">text</td>
                    <td className="py-2 text-neutral-600">Spa/salon name</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono text-secondary-600">address</td>
                    <td className="py-2 text-neutral-700">text</td>
                    <td className="py-2 text-neutral-600">Physical address</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono text-secondary-600">latitude</td>
                    <td className="py-2 text-neutral-700">decimal</td>
                    <td className="py-2 text-neutral-600">GPS latitude</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono text-secondary-600">longitude</td>
                    <td className="py-2 text-neutral-700">decimal</td>
                    <td className="py-2 text-neutral-600">GPS longitude</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono text-secondary-600">rating</td>
                    <td className="py-2 text-neutral-700">decimal</td>
                    <td className="py-2 text-neutral-600">Average rating (1-5)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Bookings Table */}
          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
                <Table className="w-5 h-5 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900">bookings</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left py-2 font-semibold text-neutral-900">Column</th>
                    <th className="text-left py-2 font-semibold text-neutral-900">Type</th>
                    <th className="text-left py-2 font-semibold text-neutral-900">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  <tr>
                    <td className="py-2 font-mono text-accent-600">id</td>
                    <td className="py-2 text-neutral-700">uuid</td>
                    <td className="py-2 text-neutral-600">Unique booking identifier</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono text-accent-600">user_id</td>
                    <td className="py-2 text-neutral-700">uuid</td>
                    <td className="py-2 text-neutral-600">Customer reference</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono text-accent-600">provider_id</td>
                    <td className="py-2 text-neutral-700">uuid</td>
                    <td className="py-2 text-neutral-600">Service provider reference</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono text-accent-600">scheduled_at</td>
                    <td className="py-2 text-neutral-700">timestamptz</td>
                    <td className="py-2 text-neutral-600">Appointment date/time</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono text-accent-600">total_amount</td>
                    <td className="py-2 text-neutral-700">decimal</td>
                    <td className="py-2 text-neutral-600">Total booking cost</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono text-accent-600">status</td>
                    <td className="py-2 text-neutral-700">booking_status</td>
                    <td className="py-2 text-neutral-600">Current booking status</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Employee Records Table */}
          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-warning-100 rounded-lg flex items-center justify-center">
                <Table className="w-5 h-5 text-warning-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900">employees</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left py-2 font-semibold text-neutral-900">Column</th>
                    <th className="text-left py-2 font-semibold text-neutral-900">Type</th>
                    <th className="text-left py-2 font-semibold text-neutral-900">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  <tr>
                    <td className="py-2 font-mono text-warning-600">id</td>
                    <td className="py-2 text-neutral-700">uuid</td>
                    <td className="py-2 text-neutral-600">Unique employee identifier</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono text-warning-600">employee_id</td>
                    <td className="py-2 text-neutral-700">text</td>
                    <td className="py-2 text-neutral-600">Internal employee ID</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono text-warning-600">department</td>
                    <td className="py-2 text-neutral-700">text</td>
                    <td className="py-2 text-neutral-600">Employee department</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono text-warning-600">designation</td>
                    <td className="py-2 text-neutral-700">text</td>
                    <td className="py-2 text-neutral-600">Job title/position</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono text-warning-600">joining_date</td>
                    <td className="py-2 text-neutral-700">date</td>
                    <td className="py-2 text-neutral-600">Date of joining</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono text-warning-600">status</td>
                    <td className="py-2 text-neutral-700">employee_status</td>
                    <td className="py-2 text-neutral-600">Employment status</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Relationships */}
      <section>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Table Relationships</h2>
        
        <div className="card p-6">
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mt-1">
                <Key className="w-4 h-4 text-primary-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-neutral-900 mb-2">User → Bookings (One-to-Many)</h4>
                <p className="text-neutral-700 mb-3">Each user can have multiple bookings. Foreign key: <code className="bg-neutral-100 px-2 py-1 rounded text-sm">bookings.user_id → users.id</code></p>
                <div className="bg-neutral-50 rounded-lg p-3">
                  <code className="text-neutral-700 font-mono text-sm">
                    ALTER TABLE bookings ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id);
                  </code>
                </div>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-secondary-100 rounded-lg flex items-center justify-center mt-1">
                <Key className="w-4 h-4 text-secondary-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-neutral-900 mb-2">Provider → Services (One-to-Many)</h4>
                <p className="text-neutral-700 mb-3">Each provider offers multiple services. Foreign key: <code className="bg-neutral-100 px-2 py-1 rounded text-sm">services.provider_id → service_providers.id</code></p>
                <div className="bg-neutral-50 rounded-lg p-3">
                  <code className="text-neutral-700 font-mono text-sm">
                    ALTER TABLE services ADD CONSTRAINT fk_provider FOREIGN KEY (provider_id) REFERENCES service_providers(id);
                  </code>
                </div>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center mt-1">
                <Key className="w-4 h-4 text-accent-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-neutral-900 mb-2">Booking → Services (Many-to-Many)</h4>
                <p className="text-neutral-700 mb-3">Bookings can include multiple services. Junction table: <code className="bg-neutral-100 px-2 py-1 rounded text-sm">booking_services</code></p>
                <div className="bg-neutral-50 rounded-lg p-3">
                  <code className="text-neutral-700 font-mono text-sm">
                    CREATE TABLE booking_services (booking_id uuid, service_id uuid, quantity int);
                  </code>
                </div>
              </div>
            </div>
          </div>

          {/* Therapist Tables */}
          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900">Therapist Management</h3>
            </div>

            <p className="text-neutral-600 mb-4">
              Complete therapist management system with 5 related tables for assignments, schedules, leaves, and tracking
            </p>

            <div className="space-y-3 text-sm text-neutral-700">
              <div className="bg-purple-50 rounded p-3">
                <strong>therapists:</strong> Profiles, specializations, certifications, ratings
              </div>
              <div className="bg-blue-50 rounded p-3">
                <strong>therapist_assignments:</strong> Task assignments with scheduling and location
              </div>
              <div className="bg-green-50 rounded p-3">
                <strong>therapist_schedules:</strong> Weekly availability management
              </div>
              <div className="bg-yellow-50 rounded p-3">
                <strong>therapist_leaves:</strong> Leave requests with approval workflow
              </div>
              <div className="bg-red-50 rounded p-3">
                <strong>therapist_locations:</strong> Real-time GPS tracking
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Policies */}
      <section>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Row Level Security (RLS)</h2>
        
        <div className="card p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-error-100 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-error-600" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900">Security Policies</h3>
          </div>
          
          <p className="text-neutral-700 mb-6">
            All tables implement Row Level Security to ensure users can only access data they're authorized to see.
          </p>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-neutral-900 mb-2">Users Table Policy</h4>
              <div className="bg-neutral-900 rounded-lg p-4">
                <pre className="text-accent-400 font-mono text-sm">{`-- Users can only read/update their own data
CREATE POLICY "Users can manage own data" ON users
  FOR ALL TO authenticated
  USING (auth.uid() = id);

-- Admins can manage all users
CREATE POLICY "Admins can manage all users" ON users
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'super_admin')
    )
  );`}</pre>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-neutral-900 mb-2">Bookings Table Policy</h4>
              <div className="bg-neutral-900 rounded-lg p-4">
                <pre className="text-accent-400 font-mono text-sm">{`-- Customers can see their own bookings
CREATE POLICY "Customers can view own bookings" ON bookings
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- Providers can see bookings for their services
CREATE POLICY "Providers can view their bookings" ON bookings
  FOR SELECT TO authenticated
  USING (
    provider_id IN (
      SELECT id FROM service_providers 
      WHERE owner_id = auth.uid()
    )
  );`}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Indexes and Performance */}
      <section>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Indexes & Performance</h2>
        
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Database Indexes</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-neutral-900 mb-3">Spatial Indexes</h4>
              <div className="bg-neutral-900 rounded-lg p-4">
                <pre className="text-accent-400 font-mono text-sm">{`-- Geospatial index for location queries
CREATE INDEX idx_providers_location 
ON service_providers 
USING GIST (
  ST_Point(longitude, latitude)
);`}</pre>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-neutral-900 mb-3">Query Optimization</h4>
              <div className="bg-neutral-900 rounded-lg p-4">
                <pre className="text-accent-400 font-mono text-sm">{`-- Composite index for booking queries
CREATE INDEX idx_bookings_user_status 
ON bookings (user_id, status, created_at);

-- Index for mobile number lookups
CREATE INDEX idx_users_mobile 
ON users (mobile);`}</pre>
              </div>
            </div>
          </div>
          
          <div className="mt-6 bg-accent-50 rounded-lg p-4 border border-accent-200">
            <h4 className="font-semibold text-accent-900 mb-2">Performance Tips</h4>
            <ul className="text-accent-800 text-sm space-y-1">
              <li>• Use appropriate indexes for frequently queried columns</li>
              <li>• Implement pagination for large result sets</li>
              <li>• Use database functions for complex calculations</li>
              <li>• Monitor query performance with EXPLAIN ANALYZE</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};