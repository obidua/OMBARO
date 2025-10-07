import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Search, Filter, Eye, Edit, Trash2, Star, MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { supabase } from '../../lib/supabase';

interface BeauticianManagementScreenProps {
  vendorId: string;
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

export const BeauticianManagementScreen: React.FC<BeauticianManagementScreenProps> = ({
  vendorId,
  onBack,
  onNavigate
}) => {
  const [beauticians, setBeauticians] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadBeauticians();
  }, [vendorId]);

  async function loadBeauticians() {
    try {
      const { data, error } = await supabase
        .from('beauticians')
        .select('*')
        .eq('vendor_id', vendorId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBeauticians(data || []);
    } catch (error) {
      console.error('Error loading beauticians:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteBeautician(beauticianId: string) {
    if (!confirm('Are you sure you want to delete this beautician?')) return;

    try {
      const { error } = await supabase
        .from('beauticians')
        .delete()
        .eq('id', beauticianId);

      if (error) throw error;
      await loadBeauticians();
    } catch (error) {
      console.error('Error deleting beautician:', error);
      alert('Failed to delete beautician');
    }
  }

  const filteredBeauticians = beauticians.filter(b =>
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.mobile.includes(searchQuery) ||
    b.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <h1 className="text-xl font-bold text-gray-900">Beautician Management</h1>
            <Button onClick={() => onNavigate('addBeautician')} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Beautician
            </Button>
          </div>

          <div className="relative">
            <Input
              placeholder="Search beauticians..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-5 h-5 text-gray-400" />}
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-pink-600 rounded-lg flex items-center justify-center">
              <Filter className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
          </div>
        ) : filteredBeauticians.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl">
            <p className="text-gray-600 mb-4">No beauticians found</p>
            <Button onClick={() => onNavigate('addBeautician')}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Beautician
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBeauticians.map((beautician) => (
              <div key={beautician.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                    {beautician.name.charAt(0)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-900">{beautician.rating.toFixed(1)}</span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-1">{beautician.name}</h3>
                <p className="text-sm text-gray-600 mb-3">
                  {beautician.specializations.slice(0, 2).join(', ')}
                  {beautician.specializations.length > 2 && ` +${beautician.specializations.length - 2}`}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{beautician.mobile}</span>
                  </div>
                  {beautician.email && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span className="truncate">{beautician.email}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    beautician.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {beautician.status}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onNavigate('beauticianDetail', beautician)}
                      className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center hover:bg-blue-200 transition-colors"
                    >
                      <Eye className="w-4 h-4 text-blue-600" />
                    </button>
                    <button
                      onClick={() => onNavigate('editBeautician', beautician)}
                      className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                    >
                      <Edit className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleDeleteBeautician(beautician.id)}
                      className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center hover:bg-red-200 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
