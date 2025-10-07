import React, { useState, useEffect } from 'react';
import { ArrowLeft, Sparkles, Scissors, Heart, Home, Building, Dumbbell, Flame, Leaf, CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { supabase } from '../../lib/supabase';

interface VendorCategory {
  id: string;
  category_code: string;
  category_name: string;
  description: string;
  icon_name: string;
  display_order: number;
}

interface VendorCategorySelectionScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

const iconMap: Record<string, any> = {
  Sparkles,
  Scissors,
  Heart,
  Home,
  Building,
  Dumbbell,
  Flame,
  Leaf
};

export default function VendorCategorySelectionScreen({ onNavigate }: VendorCategorySelectionScreenProps) {
  const [categories, setCategories] = useState<VendorCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      setError('');
      const { data, error } = await supabase
        .from('vendor_categories')
        .select('*')
        .eq('is_active', true)
        .order('display_order');

      if (error) {
        console.error('Supabase error loading categories:', error);
        setError('Failed to load business categories. Please try again.');
        throw error;
      }

      if (!data || data.length === 0) {
        console.warn('No vendor categories found in database');
        setError('No business categories available at the moment. Please contact support.');
      } else {
        console.log('Loaded vendor categories:', data.length);
      }

      setCategories(data || []);
    } catch (err) {
      console.error('Error loading categories:', err);
      if (!error) {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }

  function handleContinue() {
    if (selectedCategory) {
      onNavigate('vendorSignupOptions', { selectedCategory });
    }
  }

  function getCategoryIcon(iconName: string) {
    const Icon = iconMap[iconName] || Sparkles;
    return Icon;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => onNavigate('welcome')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <h1 className="text-xl font-bold text-gray-900">Select Your Business Category</h1>
            <div className="w-20" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">What type of business do you operate?</h2>
            <p className="text-gray-600">Choose the category that best describes your services</p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                <p className="text-red-800 mb-4">{error}</p>
                <Button onClick={loadCategories} variant="outline">
                  Try Again
                </Button>
              </div>
              <p className="text-sm text-gray-600">
                If the problem persists, please contact our support team.
              </p>
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
                <p className="text-yellow-800 mb-4">No business categories are currently available.</p>
                <Button onClick={loadCategories} variant="outline">
                  Refresh
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {categories.map((category) => {
                  const Icon = getCategoryIcon(category.icon_name);
                  const isSelected = selectedCategory === category.category_code;

                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.category_code)}
                      className={`relative p-6 rounded-xl border-2 text-left transition-all duration-200 ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50 shadow-lg'
                          : 'border-gray-200 hover:border-amber-300 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          isSelected ? 'bg-amber-500' : 'bg-gray-100'
                        }`}>
                          <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                        </div>
                        {isSelected && (
                          <CheckCircle className="w-6 h-6 text-amber-500" />
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {category.category_name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {category.description}
                      </p>
                    </button>
                  );
                })}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> You can offer services across multiple categories.
                  Select the primary category that best represents your business.
                </p>
              </div>

              <Button
                onClick={handleContinue}
                disabled={!selectedCategory}
                fullWidth
                size="lg"
              >
                {selectedCategory ? 'Continue to Signup' : 'Select a Category to Continue'}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
