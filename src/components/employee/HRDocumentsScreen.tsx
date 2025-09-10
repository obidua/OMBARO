import React, { useState } from 'react';
import { ArrowLeft, FileText, Download, Eye, Upload, Calendar, User, Award, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/Button';
import { HRDocument, SalaryRecord } from '../../types/hr';

interface HRDocumentsScreenProps {
  employeeId: string;
  onBack: () => void;
}

export const HRDocumentsScreen: React.FC<HRDocumentsScreenProps> = ({
  employeeId,
  onBack
}) => {
  const [activeTab, setActiveTab] = useState<'documents' | 'salary' | 'performance'>('documents');

  // Mock HR documents data
  const hrDocuments: HRDocument[] = [
    {
      id: '1',
      employeeId,
      type: 'offer_letter',
      title: 'Offer Letter',
      description: 'Initial job offer letter with terms and conditions',
      fileUrl: '/documents/offer_letter.pdf',
      uploadedDate: '2024-01-15',
      uploadedBy: 'HR Manager'
    },
    {
      id: '2',
      employeeId,
      type: 'appointment_letter',
      title: 'Appointment Letter',
      description: 'Official appointment confirmation letter',
      fileUrl: '/documents/appointment_letter.pdf',
      uploadedDate: '2024-01-20',
      uploadedBy: 'HR Manager'
    },
    {
      id: '3',
      employeeId,
      type: 'contract',
      title: 'Employment Contract',
      description: 'Detailed employment contract with all terms',
      fileUrl: '/documents/contract.pdf',
      uploadedDate: '2024-01-20',
      uploadedBy: 'HR Manager'
    },
    {
      id: '4',
      employeeId,
      type: 'increment_letter',
      title: 'Salary Increment Letter',
      description: 'Annual salary increment notification',
      fileUrl: '/documents/increment_2024.pdf',
      uploadedDate: '2024-04-01',
      uploadedBy: 'HR Manager'
    },
    {
      id: '5',
      employeeId,
      type: 'appreciation',
      title: 'Employee of the Month',
      description: 'Recognition for outstanding performance in March 2024',
      fileUrl: '/documents/appreciation_march.pdf',
      uploadedDate: '2024-04-05',
      uploadedBy: 'Department Head'
    }
  ];

  // Mock salary records
  const salaryRecords: SalaryRecord[] = [
    {
      id: '1',
      employeeId,
      month: 'December',
      year: 2024,
      basicSalary: 50000,
      allowances: {
        hra: 15000,
        transport: 3000,
        medical: 2000,
        other: 1000
      },
      deductions: {
        pf: 6000,
        esi: 750,
        tax: 8000,
        other: 500
      },
      grossSalary: 71000,
      netSalary: 55750,
      paymentDate: '2024-12-30',
      status: 'paid'
    },
    {
      id: '2',
      employeeId,
      month: 'November',
      year: 2024,
      basicSalary: 50000,
      allowances: {
        hra: 15000,
        transport: 3000,
        medical: 2000,
        other: 1000
      },
      deductions: {
        pf: 6000,
        esi: 750,
        tax: 8000,
        other: 500
      },
      grossSalary: 71000,
      netSalary: 55750,
      paymentDate: '2024-11-30',
      status: 'paid'
    },
    {
      id: '3',
      employeeId,
      month: 'January',
      year: 2025,
      basicSalary: 50000,
      allowances: {
        hra: 15000,
        transport: 3000,
        medical: 2000,
        other: 1000
      },
      deductions: {
        pf: 6000,
        esi: 750,
        tax: 8000,
        other: 500
      },
      grossSalary: 71000,
      netSalary: 55750,
      status: 'pending'
    }
  ];

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'offer_letter':
      case 'appointment_letter':
        return <FileText className="w-5 h-5 text-blue-600" />;
      case 'contract':
        return <FileText className="w-5 h-5 text-purple-600" />;
      case 'increment_letter':
        return <Award className="w-5 h-5 text-green-600" />;
      case 'appreciation':
        return <Award className="w-5 h-5 text-yellow-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      default:
        return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'hold': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 pt-12 pb-6 px-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            aria-label="Go back to employee dashboard"
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="text-center">
            <h1 className="text-xl font-bold text-white">HR Documents</h1>
            <p className="text-white/90 text-sm">Documents, salary & performance</p>
          </div>
          <div className="w-10" />
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-white/10 backdrop-blur-sm rounded-xl p-1">
          <button
            onClick={() => setActiveTab('documents')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
              activeTab === 'documents'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-white/80 hover:text-white'
            }`}
          >
            Documents
          </button>
          <button
            onClick={() => setActiveTab('salary')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
              activeTab === 'salary'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-white/80 hover:text-white'
            }`}
          >
            Salary
          </button>
          <button
            onClick={() => setActiveTab('performance')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
              activeTab === 'performance'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-white/80 hover:text-white'
            }`}
          >
            Performance
          </button>
        </div>
      </div>

      <div className="px-6 py-6">
        {activeTab === 'documents' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Official Documents</h3>
                <Button variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </Button>
              </div>
              
              <div className="space-y-4">
                {hrDocuments.map((doc) => (
                  <div key={doc.id} className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {getDocumentIcon(doc.type)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{doc.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{doc.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Uploaded: {new Date(doc.uploadedDate).toLocaleDateString()}</span>
                          <span>By: {doc.uploadedBy}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center hover:bg-blue-200 transition-colors">
                          <Eye className="w-4 h-4 text-blue-600" />
                        </button>
                        <button className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center hover:bg-green-200 transition-colors">
                          <Download className="w-4 h-4 text-green-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'salary' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Salary Records</h3>
              
              <div className="space-y-4">
                {salaryRecords.map((salary) => (
                  <div key={salary.id} className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {salary.month} {salary.year}
                        </h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-3 py-1 rounded-lg text-sm font-medium ${getStatusColor(salary.status)}`}>
                            {salary.status.charAt(0).toUpperCase() + salary.status.slice(1)}
                          </span>
                          {salary.paymentDate && (
                            <span className="text-sm text-gray-500">
                              Paid: {new Date(salary.paymentDate).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">₹{salary.netSalary.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">Net Salary</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Basic Salary</p>
                        <p className="font-semibold">₹{salary.basicSalary.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Gross Salary</p>
                        <p className="font-semibold">₹{salary.grossSalary.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Total Allowances</p>
                        <p className="font-semibold text-green-600">
                          +₹{Object.values(salary.allowances).reduce((a, b) => a + b, 0).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Total Deductions</p>
                        <p className="font-semibold text-red-600">
                          -₹{Object.values(salary.deductions).reduce((a, b) => a + b, 0).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 mt-4">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download Slip
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Reviews</h3>
              
              {/* Performance Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <p className="text-3xl font-bold text-blue-600">4.2</p>
                  <p className="text-sm text-gray-600">Overall Rating</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <p className="text-3xl font-bold text-green-600">95%</p>
                  <p className="text-sm text-gray-600">Goal Achievement</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <p className="text-3xl font-bold text-purple-600">3</p>
                  <p className="text-sm text-gray-600">Reviews Completed</p>
                </div>
              </div>

              {/* Recent Reviews */}
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-xl p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">Annual Review 2024</h4>
                      <p className="text-sm text-gray-600">January 2024 - December 2024</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-4 h-4 rounded-full ${
                              i < 4 ? 'bg-yellow-400' : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">4.0/5.0</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="font-medium text-gray-700">Key Achievements:</p>
                      <ul className="list-disc list-inside text-gray-600 ml-2">
                        <li>Successfully onboarded 15 new spas</li>
                        <li>Improved customer satisfaction by 20%</li>
                        <li>Led team training initiatives</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Areas for Improvement:</p>
                      <ul className="list-disc list-inside text-gray-600 ml-2">
                        <li>Time management skills</li>
                        <li>Technical documentation</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-4">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View Full Review
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-xl p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">Mid-Year Review 2024</h4>
                      <p className="text-sm text-gray-600">January 2024 - June 2024</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-4 h-4 rounded-full ${
                              i < 4 ? 'bg-yellow-400' : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">4.2/5.0</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">
                    Excellent performance in the first half of the year. Consistently meeting targets and showing leadership qualities.
                  </p>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View Full Review
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};