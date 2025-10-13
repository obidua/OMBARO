import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles, ArrowRight, CheckCircle, TrendingUp, Users,
  Calendar, Wallet, BarChart3, Shield, Clock, Star,
  Building2, Scissors, Crown, HeartPulse, Briefcase,
  MapPin, Phone, Mail, Award, Target, Zap, Globe,
  ChevronDown, ChevronUp
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { MarketingHeader } from '../components/marketing/MarketingHeader';
import { MarketingFooter } from '../components/marketing/MarketingFooter';

export const BecomePartnerPage: React.FC = () => {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Increase Your Revenue',
      description: 'Get access to thousands of customers actively searching for beauty and wellness services. Our partners see an average 40% increase in monthly bookings.'
    },
    {
      icon: Calendar,
      title: 'Smart Booking Management',
      description: 'Automated scheduling, real-time availability updates, and instant booking confirmations. Never miss an appointment or double-book again.'
    },
    {
      icon: Wallet,
      title: 'Secure Payment Processing',
      description: 'Get paid instantly with our secure payment gateway. Track all transactions, generate invoices, and manage your finances effortlessly.'
    },
    {
      icon: BarChart3,
      title: 'Business Analytics',
      description: 'Powerful insights into your business performance. Track revenue, customer preferences, peak hours, and growth trends to make data-driven decisions.'
    },
    {
      icon: Users,
      title: 'Customer Relationship Management',
      description: 'Build lasting relationships with integrated CRM tools. Track customer history, preferences, and send personalized offers to increase retention.'
    },
    {
      icon: Shield,
      title: 'Trust & Safety',
      description: 'Verified customer reviews, secure transactions, and platform protection. We handle disputes and ensure a safe environment for your business.'
    },
    {
      icon: Zap,
      title: 'Marketing & Promotions',
      description: 'Get featured in our app, run promotional campaigns, and reach new customers. Our marketing team helps you grow your brand visibility.'
    },
    {
      icon: Globe,
      title: 'Multi-Location Management',
      description: 'Manage multiple branches or locations from a single dashboard. Perfect for growing businesses with multiple outlets or franchises.'
    }
  ];

  const businessTypes = [
    {
      icon: HeartPulse,
      title: 'Spa & Massage Centers',
      description: 'Expand your spa business with professional booking management, therapist scheduling, and service packages.',
      features: ['Therapist assignment', 'Service packages', 'Membership management', 'Product sales tracking'],
      image: 'https://images.pexels.com/photos/3997392/pexels-photo-3997392.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      icon: Scissors,
      title: 'Beauty Salons',
      description: 'Streamline your salon operations with appointment booking, stylist management, and inventory tracking.',
      features: ['Stylist scheduling', 'Service catalog', 'Product inventory', 'Customer loyalty programs'],
      image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      icon: Crown,
      title: 'Bridal Makeup Artists',
      description: 'Showcase your portfolio, manage bridal bookings, and offer complete wedding packages with ease.',
      features: ['Portfolio gallery', 'Package management', 'Trial bookings', 'Wedding calendar'],
      image: 'https://images.pexels.com/photos/1585325/pexels-photo-1585325.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      icon: Building2,
      title: 'Wellness Centers',
      description: 'Offer holistic wellness programs, yoga classes, and therapeutic services through our platform.',
      features: ['Class scheduling', 'Membership plans', 'Instructor management', 'Health assessments'],
      image: 'https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  const howItWorks = [
    {
      step: '01',
      title: 'Register Your Business',
      description: 'Fill out a simple online form with your business details, contact information, and services offered. Takes just 10 minutes to complete.',
      details: ['Business information', 'Contact details', 'Service offerings', 'Business documents']
    },
    {
      step: '02',
      title: 'Verification & Approval',
      description: 'Our team reviews your application within 24-48 hours. We verify your credentials, documents, and business authenticity.',
      details: ['Document verification', 'Quality standards check', 'Background verification', 'Approval notification']
    },
    {
      step: '03',
      title: 'Setup Your Profile',
      description: 'Complete your vendor profile with photos, services, pricing, and availability. Our team helps you create an attractive listing.',
      details: ['Upload photos', 'Add services & pricing', 'Set availability', 'Configure settings']
    },
    {
      step: '04',
      title: 'Start Receiving Bookings',
      description: 'Go live and start accepting bookings instantly. Manage appointments, track earnings, and grow your business with our tools.',
      details: ['Accept bookings', 'Manage calendar', 'Track revenue', 'Analyze performance']
    }
  ];

  const partnershipModels = [
    {
      type: 'Franchise Partner',
      commission: '15%',
      investment: '₹5,00,000',
      best: 'New business ventures',
      features: [
        'Full OMBARO branding rights',
        'Complete business setup support',
        'Marketing and promotional materials',
        'Training for staff and management',
        'Exclusive territory rights',
        'Dedicated account manager'
      ],
      recommended: true
    },
    {
      type: 'Association Partner',
      commission: '20%',
      investment: 'No upfront fee',
      best: 'Established businesses',
      features: [
        'Keep your existing brand',
        'Additional revenue stream',
        'Business growth support',
        'Marketing assistance',
        'CRM and analytics tools',
        'Payment processing'
      ],
      recommended: false
    },
    {
      type: 'Aggregator',
      commission: '25%',
      investment: 'No upfront fee',
      best: 'Multi-vendor platforms',
      features: [
        'Manage multiple vendors',
        'Centralized dashboard',
        'Revenue sharing model',
        'White-label options available',
        'API integration support',
        'Custom reporting'
      ],
      recommended: false
    },
    {
      type: 'Independent Vendor',
      commission: '30%',
      investment: 'No upfront fee',
      best: 'Individual professionals',
      features: [
        'Quick signup process',
        'Flexible working hours',
        'No long-term commitment',
        'Instant payments',
        'Customer base access',
        'Marketing support'
      ],
      recommended: false
    }
  ];

  const testimonials = [
    {
      name: 'Meera Kapoor',
      business: 'Serenity Spa, Mumbai',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      comment: 'OMBARO transformed our spa business completely. We have seen a 45% increase in bookings and our revenue has doubled in just 6 months. The platform is easy to use and customer support is excellent.',
      metrics: { bookings: '+45%', revenue: '2x', rating: '4.8/5' }
    },
    {
      name: 'Rajesh Sharma',
      business: 'Glamour Salon, Delhi',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      comment: 'As a salon owner, managing appointments was always a headache. OMBARO made everything so simple. Now I can focus on providing great service while the platform handles all bookings and payments.',
      metrics: { bookings: '+60%', revenue: '1.8x', rating: '4.9/5' }
    },
    {
      name: 'Priya Deshmukh',
      business: 'Bridal Makeup Artist, Pune',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      comment: 'Being a freelance bridal makeup artist, I was struggling to get consistent bookings. OMBARO gave me access to hundreds of brides looking for professional makeup services. My calendar is now fully booked!',
      metrics: { bookings: '+80%', revenue: '2.5x', rating: '5.0/5' }
    }
  ];

  const requirements = [
    {
      title: 'Business Registration',
      items: ['Valid business license or registration', 'GST registration (for applicable businesses)', 'PAN card of business/proprietor', 'Address proof of business location']
    },
    {
      title: 'Professional Credentials',
      items: ['Minimum 1 year experience in beauty/wellness industry', 'Relevant certifications or training certificates', 'Portfolio of previous work (if applicable)', 'Professional liability insurance (recommended)']
    },
    {
      title: 'Infrastructure & Facilities',
      items: ['Clean and hygienic workspace', 'Quality equipment and products', 'Adequate staff for service delivery', 'Safety and sanitation protocols in place']
    },
    {
      title: 'Quality Standards',
      items: ['Commitment to service excellence', 'Professional conduct and ethics', 'Customer satisfaction focus', 'Compliance with health and safety regulations']
    }
  ];

  const faqs = [
    {
      question: 'How long does the registration process take?',
      answer: 'The entire registration process is quick and straightforward. It takes about 10-15 minutes to fill out the application form. Once submitted, our team reviews your application within 24-48 hours. After approval, you can set up your profile and go live immediately.'
    },
    {
      question: 'What commission does OMBARO charge?',
      answer: 'Commission rates vary based on the partnership model you choose. Franchise Partners pay 15%, Association Partners 20%, Aggregators 25%, and Independent Vendors 30%. There are no hidden fees, and you only pay commission on completed bookings.'
    },
    {
      question: 'When do I receive payments?',
      answer: 'Payments are processed instantly after service completion and customer confirmation. Funds are transferred to your registered bank account within 24-48 hours. You can track all transactions in real-time through your vendor dashboard.'
    },
    {
      question: 'Can I manage multiple locations?',
      answer: 'Yes, absolutely! Our platform supports multi-location management. You can manage multiple branches or outlets from a single dashboard, with separate calendars, staff assignments, and performance tracking for each location.'
    },
    {
      question: 'What kind of support do partners receive?',
      answer: 'We provide comprehensive support including onboarding assistance, training materials, technical support, marketing guidance, and a dedicated account manager for franchise partners. Our support team is available via phone, email, and in-app chat.'
    },
    {
      question: 'Can I set my own service prices?',
      answer: 'Yes, you have complete control over your service pricing. While we provide market insights and pricing recommendations, you decide the final prices for all your services. You can update prices anytime through your dashboard.'
    },
    {
      question: 'How do I handle cancellations?',
      answer: 'Our platform has a clear cancellation policy. Customers can cancel up to 4 hours before the appointment for a full refund. Last-minute cancellations are subject to a cancellation fee, which is credited to your account as compensation.'
    },
    {
      question: 'What if there is a dispute with a customer?',
      answer: 'We have a dedicated dispute resolution team to handle any issues between vendors and customers. We review evidence from both sides and make fair decisions. In cases of genuine disputes, we protect vendors from unfair claims.'
    },
    {
      question: 'Do I need technical knowledge to use the platform?',
      answer: 'Not at all! Our platform is designed to be user-friendly and intuitive. We provide comprehensive training during onboarding, and our support team is always available to help. If you can use a smartphone, you can use OMBARO.'
    },
    {
      question: 'Can I offer special promotions and discounts?',
      answer: 'Yes, you can create and manage your own promotional offers, discounts, and loyalty programs through the vendor dashboard. We also run platform-wide campaigns where you can participate to increase visibility.'
    }
  ];

  const stats = [
    { number: '500+', label: 'Partner Vendors', sublabel: 'Growing every day' },
    { number: '50,000+', label: 'Happy Customers', sublabel: 'Monthly bookings' },
    { number: '25+', label: 'Cities Covered', sublabel: 'Expanding nationwide' },
    { number: '4.8/5', label: 'Average Rating', sublabel: 'Vendor satisfaction' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <MarketingHeader />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-rose-600 via-pink-600 to-orange-500 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3865676/pexels-photo-3865676.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span className="text-white text-sm font-medium">Join India's Leading Beauty Platform</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Grow Your Beauty Business with OMBARO
                </h1>

                <p className="text-xl mb-8 text-white/90 leading-relaxed">
                  Partner with us to reach thousands of customers, manage bookings effortlessly,
                  and scale your spa, salon, or beauty business to new heights.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Link to="/app">
                    <Button size="lg" className="w-full sm:w-auto bg-white text-rose-600 hover:bg-neutral-100 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                      Register Now
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <a href="#how-it-works">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-white text-white hover:bg-white/10">
                      Learn How It Works
                    </Button>
                  </a>
                </div>

                <div className="flex items-center space-x-8">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-300" />
                    <span className="text-sm">No setup fees</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-300" />
                    <span className="text-sm">Quick approval</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-300" />
                    <span className="text-sm">Instant payouts</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                  <img
                    src="https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Beauty professional"
                    className="rounded-2xl"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl">
                  <div className="text-3xl font-bold text-rose-600 mb-1">40%</div>
                  <div className="text-sm text-neutral-600">Average Revenue Increase</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-neutral-900 font-semibold mb-1">{stat.label}</div>
                  <div className="text-sm text-neutral-500">{stat.sublabel}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Business Types Section */}
        <section className="py-20 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-rose-100 rounded-full px-4 py-2 mb-4">
                <Briefcase className="w-4 h-4 text-rose-600" />
                <span className="text-rose-600 text-sm font-medium">Perfect For All Business Types</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Built for Every Beauty Professional
              </h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                Whether you run a spa center, beauty salon, bridal makeup studio, or wellness center,
                OMBARO has the perfect solution for your business growth.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {businessTypes.map((type, index) => {
                const Icon = type.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-strong transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={type.image}
                        alt={type.title}
                        className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-4 left-4 flex items-center space-x-3">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white">{type.title}</h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-neutral-600 mb-4">{type.description}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {type.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span className="text-sm text-neutral-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-12">
              <Link to="/app">
                <Button size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
                  Register Your Business Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-orange-100 rounded-full px-4 py-2 mb-4">
                <Target className="w-4 h-4 text-orange-600" />
                <span className="text-orange-600 text-sm font-medium">Platform Benefits</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Everything You Need to Succeed
              </h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                Our comprehensive platform provides all the tools and support you need to manage
                and grow your beauty business successfully.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-neutral-50 to-white rounded-2xl p-6 border border-neutral-200 hover:border-rose-300 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-rose-100 to-orange-100 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-rose-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-neutral-600 text-sm leading-relaxed">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-gradient-to-br from-neutral-50 to-rose-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-rose-100 rounded-full px-4 py-2 mb-4">
                <Clock className="w-4 h-4 text-rose-600" />
                <span className="text-rose-600 text-sm font-medium">Simple 4-Step Process</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                How to Get Started
              </h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                Join OMBARO in just 4 simple steps and start growing your business today.
                The entire process takes less than 48 hours from registration to going live.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {/* Connection Line */}
              <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-rose-200 via-pink-200 to-orange-200" style={{ top: '6rem' }} />

              {howItWorks.map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-strong transition-all duration-300 hover:-translate-y-2">
                    <div className="w-16 h-16 bg-gradient-to-br from-rose-600 to-orange-500 rounded-2xl flex items-center justify-center mb-4 text-white text-2xl font-bold shadow-lg mx-auto">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-3 text-center">
                      {step.title}
                    </h3>
                    <p className="text-neutral-600 text-sm mb-4 text-center leading-relaxed">
                      {step.description}
                    </p>
                    <div className="space-y-2">
                      {step.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span className="text-xs text-neutral-700">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/app">
                <Button size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
                  Start Your Registration
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <p className="text-sm text-neutral-600 mt-4">
                Get approved in 24-48 hours • No hidden fees • Free to join
              </p>
            </div>
          </div>
        </section>

        {/* Partnership Models Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-green-100 rounded-full px-4 py-2 mb-4">
                <Award className="w-4 h-4 text-green-600" />
                <span className="text-green-600 text-sm font-medium">Flexible Partnership Options</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Choose Your Partnership Model
              </h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                We offer multiple partnership models to suit your business needs and goals.
                Pick the one that works best for you.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {partnershipModels.map((model, index) => (
                <div
                  key={index}
                  className={`relative bg-white rounded-2xl p-6 border-2 transition-all duration-300 hover:-translate-y-2 ${
                    model.recommended
                      ? 'border-rose-500 shadow-strong'
                      : 'border-neutral-200 hover:border-neutral-300 shadow-soft hover:shadow-strong'
                  }`}
                >
                  {model.recommended && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-rose-600 to-orange-500 text-white px-4 py-1 rounded-full text-xs font-semibold">
                        RECOMMENDED
                      </div>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">{model.type}</h3>
                    <div className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-orange-500 bg-clip-text text-transparent mb-1">
                      {model.commission}
                    </div>
                    <p className="text-sm text-neutral-600 mb-2">Commission</p>
                    <div className="text-sm font-semibold text-neutral-900">{model.investment}</div>
                    <p className="text-xs text-neutral-500 mt-1">Investment</p>
                  </div>

                  <div className="bg-neutral-50 rounded-xl p-3 mb-4">
                    <p className="text-xs text-neutral-600 text-center">
                      <span className="font-semibold">Best for:</span> {model.best}
                    </p>
                  </div>

                  <div className="space-y-2 mb-6">
                    {model.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-neutral-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link to="/app">
                    <Button
                      className={`w-full ${
                        model.recommended
                          ? 'bg-gradient-to-r from-rose-600 to-orange-500 hover:from-rose-700 hover:to-orange-600'
                          : ''
                      }`}
                      variant={model.recommended ? 'default' : 'outline'}
                    >
                      Select Plan
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories Section */}
        <section className="py-20 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-yellow-100 rounded-full px-4 py-2 mb-4">
                <Star className="w-4 h-4 text-yellow-600" />
                <span className="text-yellow-600 text-sm font-medium">Success Stories</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Real Results from Real Partners
              </h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                See how OMBARO has helped beauty businesses grow their revenue, increase bookings,
                and achieve their business goals.
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
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <p className="text-neutral-700 mb-6 italic leading-relaxed">
                    "{testimonial.comment}"
                  </p>

                  <div className="grid grid-cols-3 gap-2 mb-6 pb-6 border-b border-neutral-200">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">{testimonial.metrics.bookings}</div>
                      <div className="text-xs text-neutral-600">Bookings</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">{testimonial.metrics.revenue}</div>
                      <div className="text-xs text-neutral-600">Revenue</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-amber-600">{testimonial.metrics.rating}</div>
                      <div className="text-xs text-neutral-600">Rating</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-rose-200"
                    />
                    <div>
                      <p className="font-semibold text-neutral-900">{testimonial.name}</p>
                      <p className="text-sm text-neutral-600">{testimonial.business}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/app">
                <Button size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
                  Join Our Success Stories
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Requirements Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-blue-100 rounded-full px-4 py-2 mb-4">
                <Shield className="w-4 h-4 text-blue-600" />
                <span className="text-blue-600 text-sm font-medium">Requirements & Eligibility</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                What You Need to Get Started
              </h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                Simple requirements to ensure quality and trust for all our customers.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {requirements.map((req, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-neutral-50 to-white rounded-2xl p-6 border border-neutral-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                >
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">{req.title}</h3>
                  <ul className="space-y-2">
                    {req.items.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-neutral-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-neutral-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-neutral-600">
                Everything you need to know about partnering with OMBARO
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-soft hover:shadow-strong transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-neutral-50 transition-colors"
                  >
                    <span className="font-semibold text-neutral-900 pr-4">{faq.question}</span>
                    {openFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-rose-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-neutral-400 flex-shrink-0" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-4">
                      <p className="text-neutral-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-br from-rose-600 via-pink-600 to-orange-500 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3865676/pexels-photo-3865676.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center opacity-10" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Sparkles className="w-16 h-16 text-amber-300 mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl mb-8 text-white/90 leading-relaxed max-w-2xl mx-auto">
              Join thousands of successful beauty professionals who have already grown their business with OMBARO.
              Start your journey today and unlock unlimited potential.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link to="/app">
                <Button size="lg" className="w-full sm:w-auto bg-white text-rose-600 hover:bg-neutral-100 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                  Register Your Business Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-white/90">
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5" />
                <span>+91 123 456 7890</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5" />
                <span>partners@ombaro.com</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
};
