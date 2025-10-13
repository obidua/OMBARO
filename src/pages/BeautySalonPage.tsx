import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Scissors, MapPin, Users, Shield, Award, TrendingUp, Star } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { MarketingHeader } from '../components/marketing/MarketingHeader';
import { MarketingFooter } from '../components/marketing/MarketingFooter';

export const BeautySalonPage: React.FC = () => {
  const services = [
    {
      name: 'Hair Cut & Styling',
      description: 'Professional haircuts, styling, and blowouts from expert hairstylists. Whether you want a trendy new look or a classic style, our partner salons offer personalized consultations and precision cuts.'
    },
    {
      name: 'Hair Coloring & Highlights',
      description: 'Expert hair coloring services including full color, highlights, lowlights, balayage, and ombre. Our salon partners use premium quality products for vibrant, long-lasting results.'
    },
    {
      name: 'Hair Spa & Treatment',
      description: 'Nourishing hair spa treatments for all hair types. Deep conditioning, protein treatments, and scalp therapy to restore health and shine to damaged hair.'
    },
    {
      name: 'Keratin Treatment',
      description: 'Smoothing and straightening treatments that eliminate frizz and add shine. Professional keratin treatments available at top-rated salon partners for long-lasting results.'
    },
    {
      name: 'Facial & Skin Care',
      description: 'Complete facial treatments including classic facials, anti-aging treatments, acne care, skin brightening, and deep cleansing. Customized skincare solutions for all skin types.'
    },
    {
      name: 'Manicure & Pedicure',
      description: 'Professional nail care services including classic manicure, pedicure, gel nails, nail art, and nail extensions. Relaxing hand and feet treatments with premium products.'
    },
    {
      name: 'Makeup Services',
      description: 'Professional makeup application for all occasions. Party makeup, HD makeup, airbrush makeup, and natural looks created by experienced makeup artists.'
    },
    {
      name: 'Threading & Waxing',
      description: 'Expert hair removal services including threading, waxing, and body grooming. Safe, hygienic practices ensuring smooth skin and minimal discomfort.'
    },
    {
      name: 'Body Treatments',
      description: 'Complete body care services including body scrubs, wraps, bleaching, tan removal, and skin polishing. Rejuvenating treatments for glowing, healthy skin.'
    }
  ];

  const platformFeatures = [
    {
      icon: MapPin,
      title: 'Nationwide Coverage',
      description: 'Access to thousands of beauty salons and parlours across India. Find the perfect salon in your neighborhood or book services while traveling to any city.'
    },
    {
      icon: Shield,
      title: 'Verified Salons',
      description: 'All salons on our platform are thoroughly verified for hygiene standards, professional certifications, and service quality. Only the best salons join OMBARO.'
    },
    {
      icon: Award,
      title: 'Expert Professionals',
      description: 'Connect with certified beauticians, hairstylists, and makeup artists. Each professional brings years of experience and expertise to deliver exceptional results.'
    },
    {
      icon: Users,
      title: 'Compare & Choose',
      description: 'Browse multiple salons, compare services, view portfolios, and read customer reviews. Make informed decisions based on real experiences and ratings.'
    },
    {
      icon: TrendingUp,
      title: 'Best Deals',
      description: 'Get competitive pricing from multiple salons. Compare packages and find services that match your budget with transparent pricing and no hidden charges.'
    },
    {
      icon: Star,
      title: 'Quality Assurance',
      description: 'Regular quality checks and customer feedback ensure consistent service excellence. We maintain strict standards across all partner salons.'
    }
  ];

  const salonTypes = [
    {
      title: 'Unisex Salons',
      description: 'Modern unisex salons offering services for men and women. Complete beauty solutions for the entire family under one roof.'
    },
    {
      title: 'Premium Beauty Parlours',
      description: 'Luxury beauty parlours with high-end services and products. Experience premium treatments in elegant, comfortable settings.'
    },
    {
      title: 'Quick Service Salons',
      description: 'Express beauty services for busy schedules. Fast, efficient services without compromising on quality for time-conscious customers.'
    },
    {
      title: 'Specialty Hair Studios',
      description: 'Hair-focused salons specializing in cuts, colors, and treatments. Expert hair care from stylists trained in the latest techniques.'
    },
    {
      title: 'Bridal Beauty Centres',
      description: 'Specialized salons offering complete bridal packages. Pre-wedding services, bridal makeup, and beauty treatments for your special day.'
    },
    {
      title: 'Nail & Spa Studios',
      description: 'Dedicated nail care and spa facilities. Expert nail artists and relaxing spa treatments in specialized environments.'
    }
  ];

  const benefits = [
    'Browse thousands of verified beauty salons nationwide',
    'View detailed service menus and salon portfolios',
    'Compare prices and packages from multiple salons',
    'Read authentic reviews from real customers',
    'Book appointments instantly with real-time availability',
    'Flexible scheduling with easy rescheduling options',
    'Secure payment with multiple payment methods',
    'Exclusive discounts and special offers'
  ];

  return (
    <div className="min-h-screen bg-white">
      <MarketingHeader />

      <main className="pt-16">
        <section className="relative py-20 bg-gradient-to-br from-rose-600 via-pink-600 to-fuchsia-600 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center opacity-20" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                <Scissors className="w-4 h-4 text-amber-300" />
                <span className="text-white text-sm font-medium">India's Largest Salon Network</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Beauty Salon Services
              </h1>
              <p className="text-xl mb-8 text-white/90 leading-relaxed">
                Connect with thousands of professional beauty salons and parlours across India.
                From haircuts to facials, makeup to nail art, discover and book premium beauty services at verified salons near you.
                Compare services, read reviews, and transform your look with confidence.
              </p>
              <Link to="/app">
                <Button size="lg" className="bg-white text-rose-600 hover:bg-neutral-100">
                  Find Salons Near You
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
                Beauty Services Available
              </h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                Comprehensive beauty services offered by our network of verified professional salons and parlours across India.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 border-2 border-neutral-200 hover:border-rose-500 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-rose-600" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900">{service.name}</h3>
                  </div>
                  <p className="text-neutral-600 text-sm leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-rose-50 to-pink-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Why Choose OMBARO for Beauty Services?
              </h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                India's most trusted platform connecting customers with professional beauty salons and parlours nationwide.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {platformFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-strong transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-rose-600" />
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
                Types of Salons on Our Platform
              </h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                From premium parlours to quick-service salons, find every type of beauty facility through our extensive network.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {salonTypes.map((type, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white to-rose-50 rounded-2xl p-6 border-2 border-rose-200 hover:border-rose-400 hover:shadow-xl transition-all duration-300"
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
                  Your Perfect Beauty Experience Awaits
                </h2>
                <p className="text-lg text-neutral-600 mb-6">
                  OMBARO makes it simple to find and book the perfect beauty salon for your needs.
                  Our platform connects you with thousands of verified professionals across India, ensuring you have access to the best beauty services wherever you are.
                </p>
                <div className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                      <span className="text-neutral-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Beauty salon services"
                  className="rounded-2xl shadow-xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-strong">
                  <div className="text-4xl font-bold text-rose-600 mb-1">5,000+</div>
                  <div className="text-sm text-neutral-600">Beauty Salons<br />Nationwide</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-rose-600 to-pink-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Scissors className="w-16 h-16 mx-auto mb-6 text-amber-300" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready for Your Beauty Transformation?
            </h2>
            <p className="text-xl mb-8 text-white/90 leading-relaxed">
              Discover thousands of professional beauty salons near you. Compare services, read reviews from real customers, and book your perfect beauty treatment today.
              Experience the convenience of India's largest beauty salon network.
            </p>
            <Link to="/app">
              <Button size="lg" className="bg-white text-rose-600 hover:bg-neutral-100">
                Explore Beauty Salons
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
