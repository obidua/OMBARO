import React from 'react';
import Slider from 'react-slick';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface SlideContent {
  image: string;
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  ctaLink: string;
}

export const HeroSlider: React.FC = () => {
  const slides: SlideContent[] = [
    {
      image: 'https://images.pexels.com/photos/3997392/pexels-photo-3997392.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'Luxury Spa & Massage',
      subtitle: 'Rejuvenate Your Body & Mind',
      description: 'Experience premium spa treatments and therapeutic massages from certified professionals',
      cta: 'Book Spa Session',
      ctaLink: '/app'
    },
    {
      image: 'https://images.pexels.com/photos/3992860/pexels-photo-3992860.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'Bridal Makeup & Styling',
      subtitle: 'Your Dream Wedding Look',
      description: 'Expert bridal makeup artists to make your special day unforgettable',
      cta: 'Book Bridal Package',
      ctaLink: '/app'
    },
    {
      image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'Premium Beauty Salon',
      subtitle: 'Hair, Skin & Nails',
      description: 'Complete beauty services including haircuts, styling, facials, and manicures',
      cta: 'Explore Services',
      ctaLink: '/app'
    },
    {
      image: 'https://images.pexels.com/photos/3997986/pexels-photo-3997986.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'Wellness & Skincare',
      subtitle: 'Radiant Skin Solutions',
      description: 'Professional skincare treatments and wellness programs tailored for you',
      cta: 'Start Your Journey',
      ctaLink: '/app'
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    pauseOnHover: true,
    arrows: true,
    cssEase: 'ease-in-out',
    dotsClass: 'slick-dots custom-dots',
  };

  return (
    <div className="hero-slider-container relative">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="slider-slide">
            <div className="relative h-[600px] md:h-[700px] lg:h-[750px]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
              </div>

              <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span className="text-white text-sm font-medium">{slide.subtitle}</span>
                  </div>

                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in">
                    {slide.title}
                  </h1>

                  <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-xl">
                    {slide.description}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link to={slide.ctaLink}>
                      <Button size="lg" className="w-full sm:w-auto bg-white text-neutral-900 hover:bg-neutral-100">
                        {slide.cta}
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                    <Link to="/services">
                      <Button
                        size="lg"
                        variant="outline"
                        className="w-full sm:w-auto border-white text-white hover:bg-white/10"
                      >
                        View All Services
                      </Button>
                    </Link>
                  </div>

                  <div className="mt-8 flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <div className="flex -space-x-2">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-amber-400 to-rose-400"
                          />
                        ))}
                      </div>
                      <span className="text-white text-sm font-medium">50,000+ Happy Customers</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      <style>{`
        .hero-slider-container .slick-dots {
          bottom: 30px;
          z-index: 20;
        }

        .hero-slider-container .slick-dots li button:before {
          color: white;
          opacity: 0.5;
          font-size: 10px;
        }

        .hero-slider-container .slick-dots li.slick-active button:before {
          opacity: 1;
          color: white;
        }

        .hero-slider-container .slick-prev,
        .hero-slider-container .slick-next {
          z-index: 20;
          width: 50px;
          height: 50px;
        }

        .hero-slider-container .slick-prev {
          left: 25px;
        }

        .hero-slider-container .slick-next {
          right: 25px;
        }

        .hero-slider-container .slick-prev:before,
        .hero-slider-container .slick-next:before {
          font-size: 50px;
          opacity: 0.75;
        }

        .hero-slider-container .slick-prev:hover:before,
        .hero-slider-container .slick-next:hover:before {
          opacity: 1;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        @media (max-width: 640px) {
          .hero-slider-container .slick-prev,
          .hero-slider-container .slick-next {
            width: 40px;
            height: 40px;
          }

          .hero-slider-container .slick-prev {
            left: 10px;
          }

          .hero-slider-container .slick-next {
            right: 10px;
          }

          .hero-slider-container .slick-prev:before,
          .hero-slider-container .slick-next:before {
            font-size: 40px;
          }
        }
      `}</style>
    </div>
  );
};
