import React from 'react';
import { MarketingHeader } from '../components/marketing/MarketingHeader';
import { MarketingFooter } from '../components/marketing/MarketingFooter';

export const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <MarketingHeader />

      <main className="pt-16">
        <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Terms of Service
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
                Please read these Terms of Service carefully before using the OMBARO platform.
              </p>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4 mt-8">Acceptance of Terms</h2>
              <p className="text-neutral-600 mb-4">
                By accessing and using OMBARO, you accept and agree to be bound by these Terms of Service.
                If you do not agree to these terms, please do not use our platform.
              </p>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4 mt-8">User Responsibilities</h2>
              <p className="text-neutral-600 mb-4">
                You are responsible for maintaining the confidentiality of your account and for all
                activities that occur under your account.
              </p>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4 mt-8">Booking and Payments</h2>
              <p className="text-neutral-600 mb-4">
                All bookings are subject to availability and confirmation. Payment must be made
                according to the terms agreed upon at the time of booking.
              </p>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4 mt-8">Cancellation Policy</h2>
              <p className="text-neutral-600 mb-4">
                Cancellations must be made within the specified time frame. Late cancellations may
                be subject to fees as determined by the service provider.
              </p>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4 mt-8">Contact Us</h2>
              <p className="text-neutral-600 mb-4">
                If you have questions about these Terms of Service, please contact us at legal@ombaro.com
              </p>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
};
