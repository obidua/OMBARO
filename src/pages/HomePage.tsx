import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Star, Shield, Award, Users, TrendingUp, CheckCircle, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { MarketingHeader } from '../components/marketing/MarketingHeader';
import { MarketingFooter } from '../components/marketing/MarketingFooter';
import { HeroSlider } from '../components/common/HeroSlider';

export const HomePage: React.FC = () => {
  const features = [
    {
      icon: MapPin,
      title: 'Find Nearby Services',
      description: 'Discover premium salons, spas, and wellness centers in your area with our smart location-based search.',
    },
    {
      icon: Clock,
      title: 'Easy Booking',
      description: 'Book appointments in seconds with our intuitive booking system. No phone calls needed.',
    },
    {
      icon: Star,
      title: 'Verified Professionals',
      description: 'All our partner professionals are verified, certified, and highly rated by customers.',
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Safe and secure payment options with multiple payment methods for your convenience.',
    },
  ];

  const services = [
    {
      title: 'Spa & Massage Therapy',
      description: 'Relaxing spa treatments, deep tissue massage, aromatherapy, and rejuvenation packages',
      image: 'https://images.pexels.com/photos/3997392/pexels-photo-3997392.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: '💆‍♀️'
    },
    {
      title: 'Bridal Makeup & Styling',
      description: 'Complete bridal makeup, hair styling, pre-wedding packages, and special occasion looks',
      image: 'https://images.pexels.com/photos/1070968/pexels-photo-1070968.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: '👰'
    },
    {
      title: 'Hair Salon Services',
      description: 'Professional haircuts, styling, coloring, keratin treatments, and hair spa',
      image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: '💇‍♀️'
    },
    {
      title: 'Skincare & Facials',
      description: 'Advanced facial treatments, skin analysis, anti-aging solutions, and beauty routines',
      image: 'https://images.pexels.com/photos/3997986/pexels-photo-3997986.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: '✨'
    },
    {
      title: 'Nail Art & Manicure',
      description: 'Professional manicure, pedicure, nail extensions, and creative nail art designs',
      image: 'https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: '💅'
    },
    {
      title: 'Makeup & Cosmetics',
      description: 'Party makeup, professional makeup services, and personalized beauty consultations',
      image: 'https://images.pexels.com/photos/1535244/pexels-photo-1535244.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: '💄'
    },
    {
      title: 'Body Treatments',
      description: 'Body scrubs, wraps, waxing services, and complete body care solutions',
      image: 'https://images.pexels.com/photos/3865676/pexels-photo-3865676.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: '🌿'
    },
    {
      title: 'Wellness Programs',
      description: 'Holistic wellness, yoga, meditation, and lifestyle improvement programs',
      image: 'https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: '🧘‍♀️'
    },
  ];

  const stats = [
    { number: '50,000+', label: 'Happy Customers' },
    { number: '500+', label: 'Partner Vendors' },
    { number: '1,000+', label: 'Services Available' },
    { number: '25+', label: 'Cities Covered' },
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Regular Customer',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      comment: 'OMBARO has made booking spa appointments so easy! The therapists are professional and the service is always top-notch.',
    },
    {
      name: 'Rahul Verma',
      role: 'Business Professional',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      comment: 'As a busy professional, I love how convenient it is to book wellness services on the go. Highly recommended!',
    },
    {
      name: 'Anjali Reddy',
      role: 'Wellness Enthusiast',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      comment: 'The quality of service providers on OMBARO is exceptional. I have found my go-to spa and salon through this platform.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <MarketingHeader />

      <main className="pt-16">
        <HeroSlider />

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-neutral-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Why Choose OMBARO?
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                We make beauty and wellness services accessible, convenient, and reliable.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-strong transition-shadow"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-neutral-600">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Our Services
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Explore our wide range of beauty and wellness services
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="group cursor-pointer"
                >
                  <div className="relative rounded-2xl overflow-hidden mb-4 shadow-soft group-hover:shadow-strong transition-all duration-300">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl">
                      {service.icon}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform group-hover:translate-y-0 transition-transform">
                      <h3 className="text-xl font-semibold mb-1">{service.title}</h3>
                    </div>
                  </div>
                  <p className="text-neutral-600 text-sm leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link to="/services">
                <Button size="lg">
                  View All Services
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-rose-600 via-pink-600 to-orange-500 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3865676/pexels-photo-3865676.jpeg?auto=compress&cs=tinysrgb&w=1200')] bg-cover bg-center opacity-10" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span className="text-white text-sm font-medium">Join Our Network</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Are You a Beauty Professional?
                </h2>
                <p className="text-lg mb-8 text-white/90">
                  Join our network of verified professionals and grow your business.
                  Reach thousands of customers looking for quality services.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    'Get more bookings and increase revenue',
                    'Manage your schedule efficiently',
                    'Build your professional reputation',
                    'Access to business analytics and insights',
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-center space-x-3 group">
                      <CheckCircle className="w-5 h-5 text-white/90 flex-shrink-0 group-hover:scale-110 transition-transform" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/app">
                  <Button size="lg" className="bg-white text-rose-600 hover:bg-neutral-100 shadow-lg hover:shadow-xl transition-shadow">
                    Become a Partner
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                  <img
                    src="https://images.pexels.com/photos/3865676/pexels-photo-3865676.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Beauty professional"
                    className="rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                What Our Customers Say
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Join thousands of satisfied customers who trust OMBARO for their beauty needs
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-strong transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-neutral-600 mb-6 italic leading-relaxed">"{testimonial.comment}"</p>
                  <div className="flex items-center space-x-3">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-primary-200"
                    />
                    <div>
                      <p className="font-semibold text-neutral-900">{testimonial.name}</p>
                      <p className="text-sm text-neutral-600">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="relative bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 rounded-3xl p-12 overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-rose-200/30 to-pink-200/30 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-orange-200/30 to-amber-200/30 rounded-full blur-3xl" />
              <div className="relative z-10">
                <Sparkles className="w-12 h-12 text-rose-600 mx-auto mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                  Ready to Get Started?
                </h2>
                <p className="text-lg text-neutral-600 mb-8">
                  Join thousands of customers who have transformed their beauty routine with OMBARO
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/app">
                    <Button size="lg" className="w-full sm:w-auto shadow-lg hover:shadow-xl transition-shadow">
                      Sign Up Now
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
};
