import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
} from 'lucide-react';
import * as Icons from 'lucide-react';
import { cn } from '@/lib/utils';

export interface HeroSlide {
  id: number | string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta: { text: string; href: string };
  accent: string;
}

export interface HeroFeature {
  icon: string;
  title: string;
  desc: string;
}

interface HeroSectionProps {
  slides?: HeroSlide[];
  features?: HeroFeature[];
}

export function HeroSection({ slides = [], features = [] }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const heroSlides = slides;

  const heroFeatures =  [
    { icon: 'ShieldCheck', title: 'Warranty', desc: '30-Day Guarantee' },
    { icon: 'Wrench', title: 'Expert Techs', desc: 'Certified Team' },
    { icon: 'Zap', title: 'Fast Service', desc: 'Same Day Repair' },
    { icon: 'Headphones', title: 'Support', desc: '24/7 Assistance' },
  ];

  // Auto-advance logic
  useEffect(() => {
    if (!isAutoPlaying || heroSlides.length <= 1) return;

    const next = () =>
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    const interval = setInterval(next, 6000); // 6 Seconds per slide

    return () => clearInterval(interval);
  }, [isAutoPlaying, heroSlides.length]);

  // Reset auto-play timer on interaction
  const handleManualSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () =>
    handleManualSlide((currentSlide + 1) % heroSlides.length);
  const prevSlide = () =>
    handleManualSlide(
      (currentSlide - 1 + heroSlides.length) % heroSlides.length
    );

  return (
    <section className="relative bg-slate-900 pb-16 lg:pb-0">
      {/* 1. Main Slider Container */}
      <div className="relative h-[450px] sm:h-[550px] lg:h-[600px] w-full overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              'absolute inset-0 transition-opacity duration-1000 ease-in-out',
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            )}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                className={cn(
                  'w-full h-full object-cover object-center transition-transform duration-[8000ms] ease-linear',
                  index === currentSlide ? 'scale-110' : 'scale-100' // Subtle Ken Burns effect
                )}
              />
              {/* Professional Gradient Overlay - Improves text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            </div>

            {/* Content Container */}
            <div className="relative mx-auto px-4 flex items-start pt-32 sm:pt-28 md:pt-36 lg:pt-36">
              <div className="max-w-2xl pl-4 sm:pl-8 md:pl-12 lg:pl-16">
                {/* Animated Text Wrapper */}
                <div key={index} className="space-y-6">

                  {/* Main Title */}
                  <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] sm:leading-[1.1] animate-fade-in-up [animation-delay:200ms] opacity-0 fill-mode-forwards mb-4">
                    {slide.title}
                  </h1>

                  {/* Description */}
                  <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed animate-fade-in-up [animation-delay:400ms] opacity-0 fill-mode-forwards line-clamp-3 sm:line-clamp-none mb-8">
                    {slide.description || slide.subtitle}
                  </p>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4 animate-fade-in-up [animation-delay:600ms] opacity-0 fill-mode-forwards mb-20 sm:mb-28">
                    {slide.cta && slide.cta.href && (
                      <Button
                        asChild
                        size="lg"
                        className="h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base font-medium bg-white text-slate-950 hover:bg-slate-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] rounded-[12px]"
                      >
                        <Link to={slide.cta.href}>
                          {slide.cta.text || 'View Details'}
                          <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5" />
                        </Link>
                      </Button>
                    )}

                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base font-medium border-white/20 text-white bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/40 rounded-[12px]"
                    >
                      <Link to="/support">Contact Support</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Side Navigation Arrows - Professional Light Style */}
        <div className="absolute inset-y-0 left-0 right-0 z-20 pointer-events-none flex items-center justify-between px-2 md:px-4 lg:px-8">
          <Button
            onClick={prevSlide}
            size="icon"
            variant="ghost"
            className="pointer-events-auto h-10 w-10 md:h-12 md:w-12 rounded-full text-white/30 hover:text-white hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all duration-300 backdrop-blur-[2px]"
          >
            <ChevronLeft className="h-6 w-6 md:h-8 md:w-8 text-white/60 group-hover:text-white" />
          </Button>
          <Button
            onClick={nextSlide}
            size="icon"
            variant="ghost"
            className="pointer-events-auto h-10 w-10 md:h-12 md:w-12 rounded-full text-white/30 hover:text-white hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all duration-300 backdrop-blur-[2px]"
          >
            <ChevronRight className="h-6 w-6 md:h-8 md:w-8 text-white/60 group-hover:text-white" />
          </Button>
        </div>
        {/* 2. Navigation Controls */}
        <div className="absolute bottom-12 left-0 w-full z-20">
          <div className="container mx-auto px-4 flex items-center justify-center">
            {/* Dots / Progress */}
            <div className="flex gap-3">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleManualSlide(idx)}
                  className="group relative h-1.5 rounded-full overflow-hidden bg-white/20 transition-all duration-300 w-12 hover:w-20 hover:bg-white/40"
                >
                  {/* Fill animation for active slide */}
                  <div
                    className={cn(
                      'absolute top-0 left-0 h-full w-full bg-white origin-left transition-transform duration-[6000ms] ease-linear',
                      idx === currentSlide && isAutoPlaying
                        ? 'scale-x-100'
                        : 'scale-x-0',
                      idx === currentSlide &&
                      !isAutoPlaying &&
                      'scale-x-100 transition-none'
                    )}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Floating Features Card */}
      <div className="relative z-30 container mx-auto px-4 lg:px-8 -mt-10 sm:-mt-12 md:-mt-16">
        <div className="bg-white rounded-[16px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/60 overflow-hidden translate-y-[50%]">
          <div className="flex flex-col md:flex-row md:divide-x divide-y md:divide-y-0 divide-slate-100/80">
            {heroFeatures.map((feature, i) => {
              const IconComponent = (Icons as any)[feature.icon] || HelpCircle;
              
              return (
                <div
                  key={i}
                  className="flex-1 flex items-center md:justify-center lg:justify-start gap-4 px-6 py-5 md:py-6 lg:px-10"
                >
                  <div className="h-12 w-12 rounded-[14px] bg-[#EEF2FC] flex items-center justify-center shrink-0">
                    <IconComponent className="h-[22px] w-[22px] text-[#2563EB]" strokeWidth={2} />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-semibold text-slate-800 text-[15px] leading-tight mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-slate-400 text-[13px] leading-tight font-medium">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section >
  );
}
