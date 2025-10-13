import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Star, Clock, MapPin, Phone, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { MarketingHeader } from '../components/marketing/MarketingHeader';
import { MarketingFooter } from '../components/marketing/MarketingFooter';

export const SpaMassagePage: React.FC = () => {
  const services = [
    {
      name: 'Swedish Massage',
      duration: '60 mins',
      price: '₹1,500',
      description: 'Gentle, relaxing full-body massage using long strokes and kneading techniques'
    },
    {
      name: 'Deep Tissue Massage',
      duration: '75 mins',
      price: '₹2,000',
      description: 'Intense pressure massage targeting deep muscle layers and connective tissue'
    },
    {
      name: 'Thai Massage',
      duration: '90 mins',
      price: '₹2,500',
      description: 'Traditional Thai bodywork combining stretching and acupressure'
    },
    {
      name: 'Aromatherapy Massage',
      duration: '60 mins',
      price: '₹1,800',
      description: 'Therapeutic massage using essential oils for relaxation and healing'
    },
    {
      name: 'Hot Stone Massage',
      duration: '75 mins',
      price: '₹2,200',
      description: 'Warm stones placed on body to ease muscle tension and promote relaxation'
    },
    {
      name: 'Couples Massage',
      duration: '60 mins',
      price: '₹3,500',
      description: 'Side-by-side massage experience for two in a private room'
    }
  ];

  const benefits = [
    'Reduces stress and anxiety',
    'Relieves muscle tension and pain',
    'Improves blood circulation',
    'Promotes better sleep quality',
    'Boosts immune system',
    'Enhances mental clarity'
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
                <span className="text-white text-sm font-medium">Premium Wellness Services</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Spa & Massage Therapy
              </h1>
              <p className="text-xl mb-8 text-white/90 leading-relaxed">
                Experience the ultimate relaxation with our professional massage and spa services.
                Expert therapists, serene ambiance, and therapeutic treatments for your complete wellness.
              </p>
              <Link to="/app">
                <Button size="lg" className="bg-white text-emerald-600 hover:bg-neutral-100">
                  Book Your Session Now
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
                Our Massage Services
              </h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                Choose from our wide range of professional massage therapies tailored to your needs
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 border-2 border-neutral-200 hover:border-emerald-500 hover:shadow-xl transition-all duration-300"
                >
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">{service.name}</h3>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2 text-neutral-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{service.duration}</span>
                    </div>
                    <div className="text-2xl font-bold text-emerald-600">{service.price}</div>
                  </div>
                  <p className="text-neutral-600 text-sm mb-4">{service.description}</p>
                  <Link to="/app">
                    <Button className="w-full">Book Now</Button>
                  </Link>
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
                  Benefits of Massage Therapy
                </h2>
                <p className="text-lg text-neutral-600 mb-6">
                  Regular massage therapy offers numerous physical and mental health benefits.
                  Our certified therapists ensure you receive the maximum therapeutic value from each session.
                </p>
                <div className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      <span className="text-neutral-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/3865676/pexels-photo-3865676.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Massage therapy"
                  className="rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-emerald-600 to-teal-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Experience Ultimate Relaxation?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Book your spa and massage session now and let our expert therapists take care of you
            </p>
            <Link to="/app">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-neutral-100">
                Book Your Appointment
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
