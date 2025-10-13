import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Star, Shield, Award, Users, TrendingUp, CheckCircle, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { MarketingHeader } from '../components/marketing/MarketingHeader';
import { MarketingFooter } from '../components/marketing/MarketingFooter';

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
      title: 'Spa & Massage',
      description: 'Relaxing spa treatments and therapeutic massage services',
      image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      title: 'Hair & Beauty',
      description: 'Professional hair styling, coloring, and beauty treatments',
      image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      title: 'Salon Services',
      description: 'Complete salon services for your beauty needs',
      image: 'https://images.pexels.com/photos/3992876/pexels-photo-3992876.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      title: 'Wellness Programs',
      description: 'Holistic wellness and lifestyle improvement programs',
      image: 'https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg?auto=compress&cs=tinysrgb&w=600',
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
        <section className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
                  Your Beauty & Wellness Journey Starts Here
                </h1>
                <p className="text-lg md:text-xl text-neutral-600 mb-8 leading-relaxed">
                  Discover and book premium spa, salon, and wellness services near you.
                  Experience luxury and convenience at your fingertips.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/app">
                    <Button size="lg" className="w-full sm:w-auto">
                      Get Started
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Link to="/how-it-works">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Learn More
                    </Button>
                  </Link>
                </div>
                <div className="mt-8 flex items-center space-x-6">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-primary-400 to-secondary-400"
                      />
                    ))}
                  </div>
                  <div>
                    <div className="flex items-center space-x-1 mb-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-sm text-neutral-600">Trusted by 50,000+ customers</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.pexels.com/photos/3997369/pexels-photo-3997369.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Spa services"
                    className="w-full h-auto"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 hidden md:block">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-900">1000+ Services</p>
                      <p className="text-sm text-neutral-600">Available Now</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                    {stat.number}
                  </div>
                  <div className="text-neutral-600">{stat.label}</div>
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
                  <div className="relative rounded-2xl overflow-hidden mb-4 shadow-soft group-hover:shadow-strong transition-shadow">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-xl font-semibold mb-1">{service.title}</h3>
                    </div>
                  </div>
                  <p className="text-neutral-600">{service.description}</p>
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

        <section className="py-20 bg-gradient-to-br from-primary-600 to-secondary-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
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
                    <li key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-white/90 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/app">
                  <Button size="lg" className="bg-white text-primary-600 hover:bg-neutral-100">
                    Become a Partner
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/3865676/pexels-photo-3865676.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Beauty professional"
                  className="rounded-2xl shadow-2xl"
                />
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
                  className="bg-white rounded-2xl p-6 shadow-soft"
                >
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-neutral-600 mb-6">{testimonial.comment}</p>
                  <div className="flex items-center space-x-3">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
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
            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-3xl p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-neutral-600 mb-8">
                Join thousands of customers who have transformed their beauty routine with OMBARO
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/app">
                  <Button size="lg" className="w-full sm:w-auto">
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
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
};
