import React, { useState } from 'react';
import { ArrowLeft, DollarSign, TrendingUp, Calendar, Download, Clock, CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';

interface BeauticianEarningsScreenProps {
  beauticianId: string;
  onBack: () => void;
}

export const BeauticianEarningsScreen: React.FC<BeauticianEarningsScreenProps> = ({
  beauticianId,
  onBack
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');

  const [earnings] = useState({
    total: 125000,
    paid: 100000,
    pending: 25000,
    thisMonth: 45000,
    lastMonth: 38000,
    completedBookings: 42,
    avgPerBooking: 2976
  });

  const [transactions] = useState([
    {
      id: '1',
      date: '2025-10-06',
      customer: 'Sneha Reddy',
      service: 'Bridal Makeup',
      amount: 5000,
      status: 'paid',
      paymentDate: '2025-10-07'
    },
    {
      id: '2',
      date: '2025-10-05',
      customer: 'Meera Kapoor',
      service: 'Hair Styling & Blow Dry',
      amount: 2500,
      status: 'paid',
      paymentDate: '2025-10-06'
    },
    {
      id: '3',
      date: '2025-10-05',
      customer: 'Priya Sharma',
      service: 'Facial & Cleanup',
      amount: 3500,
      status: 'pending',
      paymentDate: null
    },
    {
      id: '4',
      date: '2025-10-04',
      customer: 'Anita Desai',
      service: 'Nail Art & Manicure',
      amount: 1800,
      status: 'paid',
      paymentDate: '2025-10-05'
    },
    {
      id: '5',
      date: '2025-10-03',
      customer: 'Riya Patel',
      service: 'Party Makeup',
      amount: 4200,
      status: 'pending',
      paymentDate: null
    }
  ]);

  const [monthlyData] = useState([
    { month: 'Apr', earnings: 32000 },
    { month: 'May', earnings: 38000 },
    { month: 'Jun', earnings: 42000 },
    { month: 'Jul', earnings: 35000 },
    { month: 'Aug', earnings: 48000 },
    { month: 'Sep', earnings: 38000 },
    { month: 'Oct', earnings: 45000 }
  ]);

  const growthPercentage = ((earnings.thisMonth - earnings.lastMonth) / earnings.lastMonth * 100).toFixed(1);

  const handleDownloadReport = () => {
    alert('Earnings report will be downloaded as PDF');
  };

  const maxEarning = Math.max(...monthlyData.map(d => d.earnings));

  return (
    <div className="min-h-screen bg-gray-50 pt-[70px] pb-[70px]">
      <div className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={onBack}
            aria-label="Go back"
            className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Earnings</h1>
          <div className="w-10" />
        </div>

        <div className="flex space-x-2 px-4 pb-4 overflow-x-auto">
          {['week', 'month', 'year'].map(period => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors capitalize ${
                selectedPeriod === period
                  ? 'bg-pink-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-gradient-to-r from-pink-600 to-rose-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/80 text-sm mb-1">Total Earnings</p>
              <h2 className="text-3xl font-bold">₹{earnings.total.toLocaleString()}</h2>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <DollarSign className="w-7 h-7" />
            </div>
          </div>

          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <CheckCircle className="w-4 h-4" />
              <span>{earnings.completedBookings} bookings</span>
            </div>
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-4 h-4" />
              <span>₹{earnings.avgPerBooking} avg/booking</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Paid Amount</p>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">₹{earnings.paid.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-1">Received in account</p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Pending</p>
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <p className="text-2xl font-bold text-yellow-600">₹{earnings.pending.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-1">To be processed</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-gray-900">This Month</h3>
              <p className="text-sm text-gray-600">October 2025</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">₹{earnings.thisMonth.toLocaleString()}</p>
              <div className="flex items-center justify-end space-x-1 text-sm">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-green-600 font-medium">+{growthPercentage}%</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {monthlyData.slice(-7).map((data, index) => (
              <div key={index} className="flex items-center space-x-3">
                <span className="text-sm text-gray-600 w-10">{data.month}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-8 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-pink-500 to-rose-500 h-full rounded-full flex items-center justify-end pr-3"
                    style={{ width: `${(data.earnings / maxEarning) * 100}%` }}
                  >
                    <span className="text-xs font-medium text-white">
                      ₹{(data.earnings / 1000).toFixed(0)}k
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-900">Recent Transactions</h3>
            <Button size="sm" variant="outline" onClick={handleDownloadReport}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>

          <div className="space-y-3">
            {transactions.map(transaction => (
              <div
                key={transaction.id}
                className="border border-gray-200 rounded-xl p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{transaction.customer}</h4>
                    <p className="text-sm text-gray-600">{transaction.service}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Calendar className="w-3.5 h-3.5 text-gray-500" />
                      <span className="text-xs text-gray-600">
                        {new Date(transaction.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">₹{transaction.amount}</p>
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                      transaction.status === 'paid'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {transaction.status === 'paid' ? (
                        <><CheckCircle className="w-3 h-3" /><span>Paid</span></>
                      ) : (
                        <><Clock className="w-3 h-3" /><span>Pending</span></>
                      )}
                    </span>
                  </div>
                </div>

                {transaction.status === 'paid' && transaction.paymentDate && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-2 mt-2">
                    <p className="text-xs text-green-800">
                      Paid on {new Date(transaction.paymentDate).toLocaleDateString()}
                    </p>
                  </div>
                )}

                {transaction.status === 'pending' && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 mt-2">
                    <p className="text-xs text-yellow-800">
                      Payment will be processed within 2-3 business days
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h4 className="font-medium text-blue-900 mb-2">Payment Schedule</h4>
          <p className="text-sm text-blue-800">
            Earnings are processed twice a week (Tuesday & Friday). Payments are directly credited to your registered bank account within 1-2 business days.
          </p>
        </div>
      </div>
    </div>
  );
};
