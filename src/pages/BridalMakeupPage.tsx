import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Star, Clock, Crown, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { MarketingHeader } from '../components/marketing/MarketingHeader';
import { MarketingFooter } from '../components/marketing/MarketingFooter';

export const BridalMakeupPage: React.FC = () => {
  const packages = [
    {
      name: 'Bridal Trial Package',
      price: '₹3,000',
      features: [
        'Makeup trial session',
        'Hairstyle consultation',
        'Product recommendations',
        'Style suggestions'
      ]
    },
    {
      name: 'Basic Bridal Package',
      price: '₹15,000',
      features: [
        'Wedding day makeup',
        'Bridal hairstyling',
        'Draping assistance',
        'Touch-up kit',
        'Pre-wedding consultation'
      ]
    },
    {
      name: 'Premium Bridal Package',
      price: '₹25,000',
      features: [
        'HD bridal makeup',
        'Premium hairstyling',
        'False lashes application',
        'Draping service',
        'Pre-bridal skincare',
        'Photography makeup',
        'Touch-up artist on standby'
      ],
      popular: true
    },
    {
      name: 'Luxury Bridal Package',
      price: '₹40,000',
      features: [
        'Airbrush HD makeup',
        'Designer hairstyling',
        'Premium false lashes',
        'Professional draping',
        'Complete pre-bridal package',
        'Family makeup (2 persons)',
        'On-location service',
        'Full day touch-up support'
      ]
    }
  ];

  const services = [
    'Bridal makeup and hairstyling',
    'Pre-bridal skincare treatments',
    'Mehndi ceremony makeup',
    'Sangeet function makeup',
    'Reception makeup',
    'Engagement makeup',
    'Bridal party makeup',
    'Destination wedding services'
  ];

  return (
    <div className="min-h-screen bg-white">
      <MarketingHeader />

      <main className="pt-16">
        <section className="relative py-20 bg-gradient-to-br from-pink-600 via-rose-600 to-red-600 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1585325/pexels-photo-1585325.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center opacity-20" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                <Crown className="w-4 h-4 text-amber-300" />
                <span className="text-white text-sm font-medium">Your Dream Wedding Look</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Bridal Makeup & Styling
              </h1>
              <p className="text-xl mb-8 text-white/90 leading-relaxed">
                Look absolutely stunning on your special day with our expert bridal makeup artists.
                From traditional to contemporary looks, we create the perfect bridal appearance you've always dreamed of.
              </p>
              <Link to="/app">
                <Button size="lg" className="bg-white text-pink-600 hover:bg-neutral-100">
                  Book Your Bridal Package
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Bridal Packages
              </h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                Choose from our comprehensive bridal packages designed for every bride's needs
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {packages.map((pkg, index) => (
                <div
                  key={index}
                  className={`relative bg-white rounded-2xl p-6 border-2 transition-all duration-300 hover:shadow-xl ${
                    pkg.popular
                      ? 'border-pink-500 shadow-strong'
                      : 'border-neutral-200 hover:border-pink-300'
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-pink-600 to-rose-600 text-white px-4 py-1 rounded-full text-xs font-semibold">
                        MOST POPULAR
                      </div>
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-bold text-pink-600 mb-4">{pkg.price}</div>
                  <ul className="space-y-2 mb-6">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-pink-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-neutral-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/app">
                    <Button className="w-full" variant={pkg.popular ? 'default' : 'outline'}>
                      Select Package
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-pink-50 to-rose-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/1587937/pexels-photo-1587937.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Bridal makeup"
                  className="rounded-2xl shadow-xl"
                />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                  Complete Wedding Services
                </h2>
                <p className="text-lg text-neutral-600 mb-6">
                  Our expert bridal makeup artists provide comprehensive services for all your wedding events.
                  From engagement to reception, we ensure you look perfect at every celebration.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {services.map((service, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-pink-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-neutral-700">{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-pink-600 to-rose-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Crown className="w-16 h-16 mx-auto mb-6 text-amber-300" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Book Your Bridal Consultation
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Start your bridal journey with a personalized consultation and makeup trial
            </p>
            <Link to="/app">
              <Button size="lg" className="bg-white text-pink-600 hover:bg-neutral-100">
                Schedule Consultation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
};
