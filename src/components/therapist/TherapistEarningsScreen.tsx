import React, { useState } from 'react';
import { ArrowLeft, DollarSign, TrendingUp, Calendar, Download, CreditCard } from 'lucide-react';
import { Button } from '../ui/Button';

interface Earning {
  id: string;
  date: string;
  booking_id: string;
  customer_name: string;
  service_name: string;
  amount: number;
  commission: number;
  net_amount: number;
  status: 'paid' | 'pending';
}

interface TherapistEarningsScreenProps {
  onBack: () => void;
}

export const TherapistEarningsScreen: React.FC<TherapistEarningsScreenProps> = ({ onBack }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');

  const earnings: Earning[] = [
    {
      id: '1',
      date: '2025-01-28',
      booking_id: 'BK12345',
      customer_name: 'John Doe',
      service_name: 'Swedish Massage (60 min)',
      amount: 2000,
      commission: 200,
      net_amount: 1800,
      status: 'paid'
    },
    {
      id: '2',
      date: '2025-01-27',
      booking_id: 'BK12344',
      customer_name: 'Jane Smith',
      service_name: 'Deep Tissue Massage (90 min)',
      amount: 3000,
      commission: 300,
      net_amount: 2700,
      status: 'paid'
    },
    {
      id: '3',
      date: '2025-01-26',
      booking_id: 'BK12343',
      customer_name: 'Mike Johnson',
      service_name: 'Aromatherapy (60 min)',
      amount: 2500,
      commission: 250,
      net_amount: 2250,
      status: 'pending'
    }
  ];

  const totalEarnings = earnings.reduce((sum, e) => sum + e.net_amount, 0);
  const pendingEarnings = earnings.filter(e => e.status === 'pending').reduce((sum, e) => sum + e.net_amount, 0);
  const paidEarnings = earnings.filter(e => e.status === 'paid').reduce((sum, e) => sum + e.net_amount, 0);

  return (
    <div className="min-h-screen bg-gray-50 pt-[70px] pb-[70px]">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100 fixed top-0 left-0 right-0 z-10">
        <div className="flex items-center justify-between p-4 pt-12">
          <button
            onClick={onBack}
            className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Earnings & Payments</h1>
          <button className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center hover:bg-purple-200 transition-colors">
            <Download className="w-5 h-5 text-purple-600" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-6 mt-4">
        {/* Period Selector */}
        <div className="flex items-center space-x-2 bg-white rounded-2xl p-1 shadow-sm">
          {(['week', 'month', 'year'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-colors ${
                selectedPeriod === period
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/90">Total Earnings</span>
              <TrendingUp className="w-5 h-5" />
            </div>
            <p className="text-3xl font-bold">₹{totalEarnings.toLocaleString()}</p>
            <p className="text-sm text-white/80 mt-1">This {selectedPeriod}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Paid</span>
                <DollarSign className="w-4 h-4 text-green-600" />
              </div>
              <p className="text-xl font-bold text-gray-900">₹{paidEarnings.toLocaleString()}</p>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Pending</span>
                <Clock className="w-4 h-4 text-yellow-600" />
              </div>
              <p className="text-xl font-bold text-gray-900">₹{pendingEarnings.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Bank Details */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Payment Method</h2>
            <Button size="sm" variant="outline">Edit</Button>
          </div>

          <div className="bg-gradient-to-r from-gray-900 to-gray-700 rounded-xl p-4 text-white">
            <div className="flex items-center justify-between mb-6">
              <CreditCard className="w-8 h-8" />
              <span className="text-sm font-medium">Primary Account</span>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-white/80">Account Number</p>
              <p className="text-lg font-mono">**** **** **** 4567</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-xs text-white/60">Bank Name</p>
                <p className="text-sm font-medium mt-1">HDFC Bank</p>
              </div>
              <div>
                <p className="text-xs text-white/60">IFSC Code</p>
                <p className="text-sm font-medium mt-1">HDFC0001234</p>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Transaction History</h2>

          <div className="space-y-3">
            {earnings.map((earning) => (
              <div
                key={earning.id}
                className="border border-gray-200 rounded-xl p-4 hover:border-purple-300 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{earning.service_name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{earning.customer_name}</p>
                    <p className="text-xs text-gray-500 mt-1">Booking #{earning.booking_id}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    earning.status === 'paid'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {earning.status}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-3 pt-3 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-600">Amount</p>
                    <p className="text-sm font-semibold text-gray-900">₹{earning.amount}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Commission</p>
                    <p className="text-sm font-semibold text-red-600">-₹{earning.commission}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Net Earning</p>
                    <p className="text-sm font-semibold text-green-600">₹{earning.net_amount}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-500">
                    {new Date(earning.date).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Download Statement */}
        <Button variant="outline" className="w-full">
          <Download className="w-4 h-4 mr-2" />
          Download Statement
        </Button>
      </div>
    </div>
  );
};
