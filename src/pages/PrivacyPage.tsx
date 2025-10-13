import React from 'react';
import { MarketingHeader } from '../components/marketing/MarketingHeader';
import { MarketingFooter } from '../components/marketing/MarketingFooter';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <MarketingHeader />

      <main className="pt-16">
        <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Last updated: January 2025
            </p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-neutral-600 mb-8">
                At OMBARO, we take your privacy seriously. This Privacy Policy explains how we collect,
                use, disclose, and safeguard your information when you use our platform.
              </p>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4 mt-8">Information We Collect</h2>
              <p className="text-neutral-600 mb-4">
                We collect information that you provide directly to us, including name, email address,
                phone number, and payment information when you book services through our platform.
              </p>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4 mt-8">How We Use Your Information</h2>
              <p className="text-neutral-600 mb-4">
                We use the information we collect to provide, maintain, and improve our services,
                process your bookings, send you updates, and respond to your requests.
              </p>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4 mt-8">Data Security</h2>
              <p className="text-neutral-600 mb-4">
                We implement appropriate security measures to protect your personal information.
                However, no method of transmission over the internet is 100% secure.
              </p>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4 mt-8">Contact Us</h2>
              <p className="text-neutral-600 mb-4">
                If you have questions about this Privacy Policy, please contact us at privacy@ombaro.com
              </p>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
};
