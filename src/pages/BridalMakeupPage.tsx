import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Star, Crown, Sparkles, MapPin, Users, Shield, Award, TrendingUp, Heart } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { MarketingHeader } from '../components/marketing/MarketingHeader';
import { MarketingFooter } from '../components/marketing/MarketingFooter';

export const BridalMakeupPage: React.FC = () => {
  const services = [
    {
      name: 'Bridal Makeup',
      description: 'Complete bridal makeup application including base makeup, eye makeup, lip color, and contouring. Our partner artists specialize in traditional, contemporary, and fusion bridal looks tailored to your preferences and wedding theme.'
    },
    {
      name: 'HD & Airbrush Makeup',
      description: 'High-definition and airbrush makeup techniques for a flawless, camera-ready look. Perfect for photography and videography, ensuring you look stunning in every wedding photo and video.'
    },
    {
      name: 'Bridal Hair Styling',
      description: 'Professional bridal hairstyling including buns, braids, curls, and contemporary styles. Complement your bridal outfit with perfect hair styling that lasts throughout your celebrations.'
    },
    {
      name: 'Pre-Bridal Treatments',
      description: 'Comprehensive beauty treatments before your wedding day including facials, hair spa, skin brightening, and grooming services. Start your bridal journey weeks before your big day.'
    },
    {
      name: 'Engagement & Mehendi Makeup',
      description: 'Elegant and sophisticated makeup looks for your engagement ceremony, mehendi function, and other pre-wedding events. Each occasion deserves a unique and memorable look.'
    },
    {
      name: 'Reception & Party Makeup',
      description: 'Glamorous makeup for your wedding reception, sangeet, and post-wedding parties. Bold, beautiful looks that make you the star of every celebration.'
    },
    {
      name: 'Saree & Dupatta Draping',
      description: 'Professional saree and dupatta draping services by expert dressers. Perfect pleats and elegant styling to complement your bridal attire and ensure comfort throughout your event.'
    },
    {
      name: 'Bridal Trial Sessions',
      description: 'Pre-wedding makeup and hair trials to finalize your bridal look. Work with your artist to perfect every detail before your wedding day, ensuring complete confidence and satisfaction.'
    },
    {
      name: 'Bridal Party Makeup',
      description: 'Makeup services for bridesmaids, mothers, and family members. Coordinate beautiful looks for your entire bridal party, ensuring everyone looks their best for your special day.'
    }
  ];

  const platformFeatures = [
    {
      icon: MapPin,
      title: 'Nationwide Coverage',
      description: 'Access to thousands of professional bridal makeup artists and beauty parlours across India. Find the perfect artist in your city or book destination wedding services.'
    },
    {
      icon: Shield,
      title: 'Verified Artists',
      description: 'All makeup artists on our platform are thoroughly verified with portfolio reviews, certification checks, and customer feedback. Only the best artists make it to OMBARO.'
    },
    {
      icon: Award,
      title: 'Expert Professionals',
      description: 'Connect with award-winning makeup artists, celebrity MUAs, and specialized bridal experts. Each artist brings years of experience and expertise to your special day.'
    },
    {
      icon: Users,
      title: 'Portfolio Viewing',
      description: 'Browse detailed portfolios, real bridal photos, and previous work samples. See the artist\'s style and expertise before making your booking decision.'
    },
    {
      icon: TrendingUp,
      title: 'Competitive Pricing',
      description: 'Compare packages and pricing from multiple artists. Get transparent quotes with no hidden charges. Find services that match your budget and requirements.'
    },
    {
      icon: Heart,
      title: 'Customer Reviews',
      description: 'Read genuine reviews and ratings from real brides. Make informed decisions based on authentic experiences and detailed feedback from previous customers.'
    }
  ];

  const artistTypes = [
    {
      title: 'Professional Bridal Artists',
      description: 'Experienced makeup artists specializing exclusively in bridal makeup. Experts in traditional Indian bridal looks, modern styles, and custom designs for your perfect day.'
    },
    {
      title: 'Celebrity Makeup Artists',
      description: 'Work with makeup artists who have styled celebrities, models, and high-profile personalities. Bring celebrity glamour to your wedding with expert techniques.'
    },
    {
      title: 'HD & Airbrush Specialists',
      description: 'Artists specialized in HD and airbrush makeup techniques. Perfect for brides who want flawless, camera-ready looks that photograph beautifully.'
    },
    {
      title: 'Traditional Bridal Experts',
      description: 'Masters of traditional bridal makeup styles specific to different Indian cultures. From South Indian to North Indian, Bengali to Gujarati bridal looks.'
    },
    {
      title: 'Destination Wedding Artists',
      description: 'Mobile makeup artists who travel to your wedding destination. Perfect for out station weddings, destination venues, and multi-city celebrations.'
    },
    {
      title: 'Beauty Parlour Packages',
      description: 'Complete bridal packages at established beauty parlours. Includes pre-bridal treatments, wedding day services, and post-wedding care in professional settings.'
    }
  ];

  const benefits = [
    'Browse thousands of verified bridal makeup artists nationwide',
    'View detailed portfolios with real bridal work samples',
    'Compare packages, services, and pricing side by side',
    'Read authentic reviews from real brides',
    'Book trial sessions before your wedding day',
    'Flexible booking for all wedding functions',
    'Secure payment with transparent pricing',
    'Direct communication with artists before booking'
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
                <span className="text-white text-sm font-medium">India's Largest Bridal Network</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Bridal Makeup & Styling Services
              </h1>
              <p className="text-xl mb-8 text-white/90 leading-relaxed">
                Connect with thousands of professional bridal makeup artists and beauty parlours across India.
                From engagement to reception, find the perfect makeup artist for every wedding celebration.
                Browse portfolios, compare services, read reviews, and book your dream bridal look with confidence.
              </p>
              <Link to="/app">
                <Button size="lg" className="bg-white text-pink-600 hover:bg-neutral-100">
                  Find Your Bridal Artist
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
                Bridal Beauty Services Available
              </h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                Comprehensive bridal makeup and beauty services offered by our network of verified professional artists and beauty parlours across India.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 border-2 border-neutral-200 hover:border-pink-500 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-pink-600" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900">{service.name}</h3>
                  </div>
                  <p className="text-neutral-600 text-sm leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-pink-50 to-rose-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Why Choose OMBARO for Bridal Makeup?
              </h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                India's most trusted platform connecting brides with professional makeup artists and beauty parlours nationwide.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {platformFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-strong transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-pink-600" />
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
                Types of Bridal Artists on Our Platform
              </h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                From celebrity artists to traditional experts, find every type of bridal makeup professional through our extensive network.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {artistTypes.map((type, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white to-pink-50 rounded-2xl p-6 border-2 border-pink-200 hover:border-pink-400 hover:shadow-xl transition-all duration-300"
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
                  Your Perfect Bridal Look Awaits
                </h2>
                <p className="text-lg text-neutral-600 mb-6">
                  OMBARO makes it simple to find and book the perfect bridal makeup artist for your special day.
                  Our platform connects you with thousands of verified professionals across India, ensuring you have access to the best talent for your wedding celebrations.
                </p>
                <div className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
                      <span className="text-neutral-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/1587937/pexels-photo-1587937.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Bridal makeup services"
                  className="rounded-2xl shadow-xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-strong">
                  <div className="text-4xl font-bold text-pink-600 mb-1">10,000+</div>
                  <div className="text-sm text-neutral-600">Bridal Artists<br />Nationwide</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-pink-600 to-rose-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Crown className="w-16 h-16 mx-auto mb-6 text-amber-300" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Your Bridal Beauty Journey
            </h2>
            <p className="text-xl mb-8 text-white/90 leading-relaxed">
              Discover thousands of professional bridal makeup artists near you. View portfolios, compare services, read reviews from real brides, and book your perfect bridal look today.
              Make your wedding day truly unforgettable with OMBARO.
            </p>
            <Link to="/app">
              <Button size="lg" className="bg-white text-pink-600 hover:bg-neutral-100">
                Explore Bridal Artists
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
