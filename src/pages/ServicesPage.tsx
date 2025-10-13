import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Scissors, Heart, Flower2, Wind, Droplet, Star, Clock } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { MarketingHeader } from '../components/marketing/MarketingHeader';
import { MarketingFooter } from '../components/marketing/MarketingFooter';

export const ServicesPage: React.FC = () => {
  const serviceCategories = [
    {
      icon: Sparkles,
      title: 'Spa & Massage',
      description: 'Relax and rejuvenate with our premium spa and massage services',
      services: [
        'Swedish Massage',
        'Deep Tissue Massage',
        'Hot Stone Therapy',
        'Aromatherapy',
        'Thai Massage',
        'Reflexology',
      ],
      image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      icon: Scissors,
      title: 'Hair Services',
      description: 'Professional hair care from cutting to coloring and styling',
      services: [
        'Hair Cut & Styling',
        'Hair Coloring',
        'Hair Treatment',
        'Keratin Treatment',
        'Hair Spa',
        'Highlights & Lowlights',
      ],
      image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      icon: Sparkles,
      title: 'Facial & Skin Care',
      description: 'Advanced facial treatments for glowing, healthy skin',
      services: [
        'Classic Facial',
        'Anti-Aging Facial',
        'Acne Treatment',
        'Hydrafacial',
        'Chemical Peel',
        'Skin Brightening',
      ],
      image: 'https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      icon: Flower2,
      title: 'Bridal Services',
      description: 'Complete bridal packages for your special day',
      services: [
        'Bridal Makeup',
        'Bridal Hair Styling',
        'Pre-Bridal Packages',
        'Mehendi Services',
        'Saree Draping',
        'Engagement Makeup',
      ],
      image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      icon: Wind,
      title: 'Makeup Services',
      description: 'Professional makeup for every occasion',
      services: [
        'Party Makeup',
        'HD Makeup',
        'Airbrush Makeup',
        'Natural Makeup',
        'Engagement Makeup',
        'Fashion Makeup',
      ],
      image: 'https://images.pexels.com/photos/3992876/pexels-photo-3992876.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      icon: Droplet,
      title: 'Nail Services',
      description: 'Beautiful nails with our manicure and pedicure services',
      services: [
        'Classic Manicure',
        'Classic Pedicure',
        'Gel Nails',
        'Nail Art',
        'Nail Extensions',
        'Spa Manicure & Pedicure',
      ],
      image: 'https://images.pexels.com/photos/3997989/pexels-photo-3997989.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      icon: Heart,
      title: 'Body Treatments',
      description: 'Comprehensive body care and beauty treatments',
      services: [
        'Waxing Services',
        'Body Scrub',
        'Body Wrap',
        'Threading',
        'Bleach',
        'Tan Removal',
      ],
      image: 'https://images.pexels.com/photos/3865676/pexels-photo-3865676.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      icon: Star,
      title: 'Wellness Programs',
      description: 'Holistic wellness and lifestyle improvement programs',
      services: [
        'Yoga Sessions',
        'Meditation Classes',
        'Nutrition Counseling',
        'Stress Management',
        'Weight Management',
        'Lifestyle Coaching',
      ],
      image: 'https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
  ];

  const benefits = [
    {
      icon: Star,
      title: 'Verified Professionals',
      description: 'All service providers are certified and verified',
    },
    {
      icon: Clock,
      title: 'Flexible Scheduling',
      description: 'Book appointments at your convenience',
    },
    {
      icon: Sparkles,
      title: 'Premium Quality',
      description: 'Only the best products and techniques',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <MarketingHeader />

      <main className="pt-16">
        <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Our Services
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Explore our comprehensive range of beauty and wellness services designed to make you look and feel your best
            </p>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-neutral-600">{benefit.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-16">
              {serviceCategories.map((category, index) => {
                const Icon = category.icon;
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={index}
                    className={`grid md:grid-cols-2 gap-8 items-center ${
                      isEven ? '' : 'md:grid-flow-dense'
                    }`}
                  >
                    <div className={isEven ? '' : 'md:col-start-2'}>
                      <div className="mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl flex items-center justify-center mb-4">
                          <Icon className="w-6 h-6 text-primary-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-neutral-900 mb-3">
                          {category.title}
                        </h2>
                        <p className="text-lg text-neutral-600 mb-6">
                          {category.description}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {category.services.map((service, serviceIndex) => (
                          <div
                            key={serviceIndex}
                            className="flex items-center space-x-2 text-neutral-700"
                          >
                            <div className="w-1.5 h-1.5 bg-primary-600 rounded-full" />
                            <span>{service}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className={isEven ? '' : 'md:col-start-1 md:row-start-1'}>
                      <img
                        src={category.image}
                        alt={category.title}
                        className="rounded-2xl shadow-xl w-full h-80 object-cover"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-3xl p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Ready to Book Your Service?
              </h2>
              <p className="text-lg text-neutral-600 mb-8">
                Experience premium beauty and wellness services at your doorstep
              </p>
              <Link to="/app">
                <Button size="lg">
                  Book Now
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
};
