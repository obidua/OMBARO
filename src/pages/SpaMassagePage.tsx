import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Star, MapPin, Users, Shield, Sparkles, Award, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { MarketingHeader } from '../components/marketing/MarketingHeader';
import { MarketingFooter } from '../components/marketing/MarketingFooter';

export const SpaMassagePage: React.FC = () => {
  const services = [
    {
      name: 'Swedish Massage',
      description: 'Gentle, relaxing full-body massage using long strokes and kneading techniques. Perfect for stress relief and overall relaxation. Our partner spas offer this classic therapy with trained professionals.'
    },
    {
      name: 'Deep Tissue Massage',
      description: 'Intense pressure massage targeting deep muscle layers and connective tissue. Ideal for chronic pain, sports injuries, and muscle recovery. Available at premium spa centers across India.'
    },
    {
      name: 'Thai Massage',
      description: 'Traditional Thai bodywork combining stretching and acupressure techniques. Improves flexibility, relieves tension, and promotes energy flow. Experience authentic Thai massage at our partner wellness centers.'
    },
    {
      name: 'Aromatherapy Massage',
      description: 'Therapeutic massage using essential oils for relaxation and healing. Combines the benefits of touch therapy with aromatic plant extracts. Our spas use premium quality essential oils for maximum benefits.'
    },
    {
      name: 'Hot Stone Massage',
      description: 'Warm stones placed on body to ease muscle tension and promote deep relaxation. The heat helps increase blood flow and reduces stress. Experience this ancient healing technique at top-rated spa centers.'
    },
    {
      name: 'Couples Massage',
      description: 'Side-by-side massage experience for two in a private room. Perfect for couples, friends, or family members looking to share a relaxing experience. Available at luxury spa centers nationwide.'
    },
    {
      name: 'Prenatal Massage',
      description: 'Specialized massage for expectant mothers, focusing on comfort and safety. Helps reduce pregnancy discomfort, improves circulation, and promotes relaxation. Only performed by certified prenatal massage therapists.'
    },
    {
      name: 'Sports Massage',
      description: 'Targeted therapy for athletes and active individuals. Helps prevent injuries, improves performance, and speeds up recovery. Available at sports wellness centers and specialized clinics.'
    },
    {
      name: 'Reflexology',
      description: 'Pressure point therapy focusing on feet, hands, and ears. Based on the principle that these areas correspond to different body organs. Experience traditional reflexology at certified wellness centers.'
    }
  ];

  const benefits = [
    'Access to thousands of verified spa centers across India',
    'Compare services and read genuine customer reviews',
    'Book appointments instantly at your convenience',
    'Flexible scheduling with real-time availability',
    'Secure payment options and transparent pricing',
    'Quality assurance with certified therapists',
    'Special offers and exclusive member discounts',
    'Cancel or reschedule easily through the app'
  ];

  const platformFeatures = [
    {
      icon: MapPin,
      title: 'Pan-India Network',
      description: 'Access to lakhs of spa centers and wellness facilities across all major cities and towns in India. Find the perfect spa near your location.'
    },
    {
      icon: Shield,
      title: 'Verified Partners',
      description: 'All spa centers on our platform are thoroughly verified for hygiene standards, therapist certifications, and service quality. Your safety is our priority.'
    },
    {
      icon: Users,
      title: 'Expert Therapists',
      description: 'Our partner spas employ only trained and certified massage therapists. Each professional undergoes rigorous background checks and skill assessments.'
    },
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'We partner only with spas that meet our strict quality standards. Regular audits ensure consistent service excellence across all locations.'
    },
    {
      icon: TrendingUp,
      title: 'Best Prices',
      description: 'Compare prices across multiple spa centers and choose what fits your budget. Get exclusive discounts and offers only available through our platform.'
    },
    {
      icon: Star,
      title: 'Trusted Reviews',
      description: 'Read authentic reviews from real customers. Make informed decisions based on ratings, feedback, and detailed service experiences.'
    }
  ];

  const spaTypes = [
    {
      title: 'Day Spas',
      description: 'Perfect for quick relaxation sessions during the day. Offers a range of massage therapies, facials, and body treatments without overnight stays.'
    },
    {
      title: 'Destination Spas',
      description: 'Luxury wellness resorts offering comprehensive spa experiences. Ideal for weekend getaways and extended wellness retreats with accommodation.'
    },
    {
      title: 'Medical Spas',
      description: 'Combines traditional spa services with medical procedures. Supervised by licensed healthcare professionals for therapeutic treatments.'
    },
    {
      title: 'Ayurvedic Wellness Centers',
      description: 'Traditional Indian healing systems using herbal treatments, oils, and ancient massage techniques. Experience authentic Ayurvedic therapies.'
    },
    {
      title: 'Hotel & Resort Spas',
      description: 'Premium spa facilities within hotels and resorts. Perfect for travelers and guests seeking luxury wellness experiences.'
    },
    {
      title: 'Mobile Spa Services',
      description: 'Bring the spa experience to your home or office. Professional therapists provide quality massage services at your preferred location.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <MarketingHeader />

      <main className="pt-16">
        <section className="relative py-20 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3997392/pexels-photo-3997392.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center opacity-20" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span className="text-white text-sm font-medium">India's Largest Spa Network</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Spa & Massage Therapy Services
              </h1>
              <p className="text-xl mb-8 text-white/90 leading-relaxed">
                Connect with thousands of verified spa centers and wellness facilities across India.
                Experience professional massage therapies, holistic treatments, and complete relaxation at our partner locations nationwide.
                Compare, book, and enjoy premium spa services at the best prices.
              </p>
              <Link to="/app">
                <Button size="lg" className="bg-white text-emerald-600 hover:bg-neutral-100">
                  Find Spas Near You
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
                Massage & Spa Services Available
              </h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                Explore a comprehensive range of professional massage and spa therapies offered by our partner wellness centers.
                Each service is performed by certified therapists using premium products and techniques.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 border-2 border-neutral-200 hover:border-emerald-500 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900">{service.name}</h3>
                  </div>
                  <p className="text-neutral-600 text-sm leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Why Choose OMBARO for Spa Services?
              </h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                As India's leading spa and wellness aggregator platform, we connect you with the best spa centers and wellness facilities across the country.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {platformFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-strong transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">{feature.title}</h3>
                  <p className="text-neutral-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Types of Spa Centers on Our Platform
              </h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                From day spas to destination wellness resorts, find every type of spa facility through our comprehensive network.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {spaTypes.map((type, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white to-emerald-50 rounded-2xl p-6 border-2 border-emerald-200 hover:border-emerald-400 hover:shadow-xl transition-all duration-300"
                >
                  <h3 className="text-xl font-bold text-neutral-900 mb-3">{type.title}</h3>
                  <p className="text-neutral-600 leading-relaxed">{type.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                  Benefits of Using OMBARO Platform
                </h2>
                <p className="text-lg text-neutral-600 mb-6">
                  Experience the convenience of India's most comprehensive spa and wellness aggregator.
                  We make it simple to find, compare, and book spa services across thousands of verified locations nationwide.
                </p>
                <div className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-neutral-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/3865676/pexels-photo-3865676.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Spa and massage therapy"
                  className="rounded-2xl shadow-xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-strong">
                  <div className="text-4xl font-bold text-emerald-600 mb-1">1 Lakh+</div>
                  <div className="text-sm text-neutral-600">Spa Centers<br />Across India</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-emerald-600 to-teal-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Experience Ultimate Relaxation?
            </h2>
            <p className="text-xl mb-8 text-white/90 leading-relaxed">
              Discover thousands of verified spa centers near you. Compare services, read reviews, and book your perfect wellness experience today.
              Join millions of satisfied customers who trust OMBARO for their spa and massage needs.
            </p>
            <Link to="/app">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-neutral-100">
                Explore Spa Centers Near You
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
