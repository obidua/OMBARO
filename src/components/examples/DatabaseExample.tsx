import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { DynamicDashboard } from '../portal/DynamicDashboard';

export const DatabaseExample: React.FC = () => {
  const [tables, setTables] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkDatabaseConnection();
  }, []);

  const checkDatabaseConnection = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('system_settings')
        .select('*')
        .limit(5);

      if (error) {
        setError(`Database error: ${error.message}`);
      } else {
        setTables(data || []);
      }
    } catch (err: any) {
      setError(`Connection error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DynamicDashboard title="Database Connection Test">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Supabase Database Connection
          </h2>

          {loading && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              <p className="font-semibold">Error:</p>
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && (
            <div>
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
                <p className="font-semibold">Database Connected Successfully!</p>
                <p className="text-sm">Found {tables.length} system settings</p>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">
                  Database Statistics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-600 font-medium">Total Tables</p>
                    <p className="text-3xl font-bold text-blue-700">143</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-green-600 font-medium">Categories</p>
                    <p className="text-3xl font-bold text-green-700">17</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-purple-600 font-medium">Status</p>
                    <p className="text-3xl font-bold text-purple-700">Active</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">
                  Available Portals
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow">
                    <h4 className="font-semibold text-gray-800">Customer Portal</h4>
                    <p className="text-sm text-gray-600 mt-1">Browse services, book appointments, track orders</p>
                  </div>
                  <div className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow">
                    <h4 className="font-semibold text-gray-800">Vendor Portal</h4>
                    <p className="text-sm text-gray-600 mt-1">Manage services, therapists, bookings</p>
                  </div>
                  <div className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow">
                    <h4 className="font-semibold text-gray-800">Therapist Portal</h4>
                    <p className="text-sm text-gray-600 mt-1">View assignments, track location, manage schedule</p>
                  </div>
                  <div className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow">
                    <h4 className="font-semibold text-gray-800">Employee Portal</h4>
                    <p className="text-sm text-gray-600 mt-1">HR documents, attendance, leave management</p>
                  </div>
                  <div className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow">
                    <h4 className="font-semibold text-gray-800">Admin Portal</h4>
                    <p className="text-sm text-gray-600 mt-1">User management, analytics, system configuration</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DynamicDashboard>
  );
};
