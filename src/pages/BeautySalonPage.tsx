import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Scissors, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { MarketingHeader } from '../components/marketing/MarketingHeader';
import { MarketingFooter } from '../components/marketing/MarketingFooter';

export const BeautySalonPage: React.FC = () => {
  const services = [
    {
      category: 'Hair Services',
      items: [
        { name: 'Haircut & Styling', price: '₹500 - ₹1,500' },
        { name: 'Hair Coloring', price: '₹2,000 - ₹5,000' },
        { name: 'Hair Spa & Treatment', price: '₹1,200 - ₹3,000' },
        { name: 'Keratin Treatment', price: '₹5,000 - ₹12,000' },
        { name: 'Hair Smoothening', price: '₹3,000 - ₹8,000' },
        { name: 'Blow Dry & Styling', price: '₹800 - ₹1,500' }
      ]
    },
    {
      category: 'Skin Services',
      items: [
        { name: 'Classic Facial', price: '₹800 - ₹1,500' },
        { name: 'Anti-Aging Facial', price: '₹2,000 - ₹4,000' },
        { name: 'Brightening Facial', price: '₹1,500 - ₹3,000' },
        { name: 'Acne Treatment', price: '₹1,200 - ₹2,500' },
        { name: 'Clean Up', price: '₹600 - ₹1,000' },
        { name: 'Face Bleach', price: '₹400 - ₹800' }
      ]
    },
    {
      category: 'Nail Services',
      items: [
        { name: 'Manicure', price: '₹500 - ₹1,000' },
        { name: 'Pedicure', price: '₹600 - ₹1,200' },
        { name: 'Gel Nails', price: '₹1,500 - ₹3,000' },
        { name: 'Nail Art', price: '₹800 - ₹2,000' },
        { name: 'Nail Extensions', price: '₹2,000 - ₹4,000' }
      ]
    },
    {
      category: 'Makeup Services',
      items: [
        { name: 'Party Makeup', price: '₹2,000 - ₹4,000' },
        { name: 'Professional Makeup', price: '₹3,000 - ₹6,000' },
        { name: 'HD Makeup', price: '₹5,000 - ₹10,000' },
        { name: 'Airbrush Makeup', price: '₹8,000 - ₹15,000' }
      ]
    }
  ];

  const features = [
    'Expert stylists and beauticians',
    'Premium quality products',
    'Hygienic and safe practices',
    'Personalized consultations',
    'Latest beauty trends',
    'Comfortable ambiance'
  ];

  return (
    <div className="min-h-screen bg-white">
      <MarketingHeader />

      <main className="pt-16">
        <section className="relative py-20 bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center opacity-20" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                <Scissors className="w-4 h-4 text-amber-300" />
                <span className="text-white text-sm font-medium">Premium Beauty Services</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Beauty Salon Services
              </h1>
              <p className="text-xl mb-8 text-white/90 leading-relaxed">
                Transform your look with our comprehensive beauty salon services.
                From haircuts to facials, nails to makeup, we offer everything you need to look and feel fabulous.
              </p>
              <Link to="/app">
                <Button size="lg" className="bg-white text-violet-600 hover:bg-neutral-100">
                  Book Your Appointment
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
                Our Services & Pricing
              </h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                Complete beauty solutions for hair, skin, nails, and makeup
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {services.map((category, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white to-violet-50 rounded-2xl p-6 border-2 border-violet-200 hover:border-violet-400 hover:shadow-xl transition-all duration-300"
                >
                  <h3 className="text-2xl font-bold text-neutral-900 mb-4">{category.category}</h3>
                  <div className="space-y-3">
                    {category.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between py-2 border-b border-violet-100">
                        <span className="text-neutral-700">{item.name}</span>
                        <span className="font-semibold text-violet-600">{item.price}</span>
                      </div>
                    ))}
                  </div>
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
                  Why Choose Our Salons
                </h2>
                <p className="text-lg text-neutral-600 mb-6">
                  Our partner salons are carefully selected to ensure you receive the best quality service.
                  Every salon on our platform maintains high standards of hygiene, professionalism, and customer satisfaction.
                </p>
                <div className="space-y-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-violet-600 flex-shrink-0" />
                      <span className="text-neutral-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Beauty salon"
                  className="rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Sparkles className="w-16 h-16 mx-auto mb-6 text-amber-300" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready for Your Beauty Transformation?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Book your appointment now and experience premium beauty services
            </p>
            <Link to="/app">
              <Button size="lg" className="bg-white text-violet-600 hover:bg-neutral-100">
                Book Salon Services
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
