import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Users, Award, Heart, TrendingUp, Shield } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { MarketingHeader } from '../components/marketing/MarketingHeader';
import { MarketingFooter } from '../components/marketing/MarketingFooter';

export const AboutPage: React.FC = () => {
  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To make premium beauty and wellness services accessible to everyone through technology and innovation.',
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'We prioritize customer satisfaction and ensure every experience meets the highest quality standards.',
    },
    {
      icon: Shield,
      title: 'Trust & Safety',
      description: 'All professionals are thoroughly verified and vetted to ensure your safety and peace of mind.',
    },
    {
      icon: TrendingUp,
      title: 'Growth Together',
      description: 'We help our partner businesses grow while providing customers with exceptional services.',
    },
  ];

  const team = [
    {
      name: 'Rajesh Kumar',
      role: 'Founder & CEO',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
    {
      name: 'Priya Singh',
      role: 'Head of Operations',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
    {
      name: 'Amit Sharma',
      role: 'Chief Technology Officer',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
    {
      name: 'Neha Patel',
      role: 'Head of Customer Success',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <MarketingHeader />

      <main className="pt-16">
        <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              About OMBARO
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Revolutionizing the beauty and wellness industry by connecting customers with verified professionals
            </p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-lg text-neutral-600">
                  <p>
                    OMBARO was founded with a simple yet powerful vision: to make beauty and wellness services
                    accessible, convenient, and reliable for everyone.
                  </p>
                  <p>
                    We recognized that booking salon and spa appointments was often a hassle, with limited
                    information about service quality and pricing. We set out to change that by creating
                    a platform that brings transparency, convenience, and trust to the beauty industry.
                  </p>
                  <p>
                    Today, we serve thousands of happy customers across multiple cities, partnering with
                    hundreds of verified beauty professionals who share our commitment to excellence.
                  </p>
                </div>
              </div>
              <div>
                <img
                  src="https://images.pexels.com/photos/3992874/pexels-photo-3992874.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Our story"
                  className="rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Our Values
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 text-center shadow-soft"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-neutral-600">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
              {[
                { number: '50,000+', label: 'Happy Customers' },
                { number: '500+', label: 'Partner Vendors' },
                { number: '25+', label: 'Cities' },
                { number: '98%', label: 'Satisfaction Rate' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                    {stat.number}
                  </div>
                  <div className="text-neutral-600">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Meet Our Team
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Passionate professionals dedicated to transforming your beauty experience
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="relative mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-48 h-48 rounded-2xl object-cover mx-auto shadow-soft"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-neutral-600">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-primary-600 to-secondary-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Our Growing Community
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Experience the future of beauty and wellness services
            </p>
            <Link to="/app">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-neutral-100">
                Get Started Today
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
};
