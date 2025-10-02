import React from 'react';
import { X, Shield, AlertTriangle, Users, Scale } from 'lucide-react';
import { Button } from '../ui/Button';

interface TermsAndConditionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsAndConditionsModal: React.FC<TermsAndConditionsModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <Scale className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Terms & Conditions</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close terms and conditions"
            className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-6">
            {/* Introduction */}
            <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
              <p className="text-purple-800 font-medium">
                By proceeding with a booking on the <strong>OMBARO App</strong>, you (the "Customer") acknowledge, 
                confirm, and agree to the following terms and conditions:
              </p>
            </div>

            {/* Section 1: Scope of Service */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">1</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Scope of Service</h3>
              </div>
              <div className="ml-8 space-y-2 text-gray-700">
                <p>• OMBARO provides a platform to connect customers with independent, verified wellness professionals and service vendors ("Vendors").</p>
                <p>• Services include massage, spa, wellness, beauty, and related non-medical, non-sexual therapies only.</p>
                <p>• Services are strictly for <strong>wellness, relaxation, and therapeutic purposes</strong>.</p>
              </div>
            </div>

            {/* Section 2: Zero Tolerance Policy */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 font-bold text-sm">2</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                  <span>Zero Tolerance Policy</span>
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                </h3>
              </div>
              <div className="ml-8 space-y-2">
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-800 font-medium mb-2">OMBARO <strong>does not engage in, promote, or support</strong> any form of:</p>
                  <ul className="text-red-700 space-y-1 ml-4">
                    <li>• Human trafficking, forced labor, or exploitation</li>
                    <li>• Sexual activity, sexual services, or any illegal conduct</li>
                  </ul>
                </div>
                <p className="text-gray-700">Customers are strictly prohibited from soliciting or attempting to engage Vendors in any activity of this nature.</p>
              </div>
            </div>

            {/* Section 3: Customer Conduct */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold text-sm">3</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                  <span>Customer Conduct</span>
                  <Users className="w-5 h-5 text-green-500" />
                </h3>
              </div>
              <div className="ml-8 space-y-2 text-gray-700">
                <p>• Customers must treat Vendors with respect and professionalism at all times.</p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-yellow-800 font-medium mb-2">Any attempt to:</p>
                  <ul className="text-yellow-700 space-y-1 ml-4">
                    <li>• Force, coerce, harass, or exploit a Vendor, or</li>
                    <li>• Engage in inappropriate or unlawful behavior</li>
                  </ul>
                  <p className="text-yellow-800 font-semibold mt-2">
                    will result in <strong>immediate service termination, account suspension, and possible legal action</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 4: Vendor Safety & Legal Rights */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-bold text-sm">4</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                  <span>Vendor Safety & Legal Rights</span>
                  <Shield className="w-5 h-5 text-purple-500" />
                </h3>
              </div>
              <div className="ml-8 space-y-2 text-gray-700">
                <p>• Vendors have the <strong>right to refuse service</strong> if they feel unsafe, disrespected, or pressured to perform outside the agreed scope.</p>
                <p>• OMBARO reserves the right to fully cooperate with law enforcement in cases of misconduct or violation of these Terms.</p>
              </div>
            </div>

            {/* Section 5: Indemnity & Liability */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 font-bold text-sm">5</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Indemnity & Liability</h3>
              </div>
              <div className="ml-8 space-y-2 text-gray-700">
                <p>• Customers agree to indemnify and hold harmless OMBARO and its Vendors from any liability arising from misconduct, breach of these Terms, or unlawful actions by the Customer.</p>
                <p>• OMBARO is not liable for services outside the officially listed scope.</p>
              </div>
            </div>

            {/* Section 6: Acceptance */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-indigo-600 font-bold text-sm">6</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Acceptance</h3>
              </div>
              <div className="ml-8 space-y-2">
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3">
                  <p className="text-indigo-800">• By confirming a booking, the Customer confirms they have read, understood, and agreed to abide by these Terms & Conditions.</p>
                  <p className="text-indigo-800 font-semibold">• Violation of these Terms may result in permanent ban, reporting to authorities, and civil or criminal proceedings as applicable.</p>
                </div>
              </div>
            </div>

            {/* Important Notice */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-6 h-6 text-red-600 mt-0.5" />
                <div>
                  <h4 className="font-bold text-red-800 mb-2">Important Legal Notice</h4>
                  <p className="text-red-700 text-sm leading-relaxed">
                    OMBARO has a zero-tolerance policy for any form of exploitation, trafficking, or inappropriate conduct. 
                    We work closely with law enforcement and will prosecute violations to the full extent of the law. 
                    Our platform is designed to provide safe, professional wellness services only.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 p-6">
          <Button
            onClick={onClose}
            size="lg"
            className="w-full"
          >
            I Understand These Terms
          </Button>
        </div>
      </div>
    </div>
  );
};