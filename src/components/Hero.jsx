import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Shield, Clock, Smartphone, ArrowRight } from 'lucide-react';

const Hero = () => {
  const features = [
    { icon: Shield, text: 'No Signup' },
    { icon: Clock, text: 'Instant Results' },
    { icon: Smartphone, text: 'Mobile Ready' },
  ];

  return (
    <div className="mb-8 sm:mb-12">
      {/* Simplified Hero - Mobile First */}
      <div className="mb-6 sm:mb-8 text-center lg:text-left">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 leading-tight">
          Test Your{' '}
          <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent">
            Abilities
          </span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-dark-300 max-w-2xl mx-auto lg:mx-0 mb-6 sm:mb-8">
          Professional cognitive and performance testing. Get instant results. No registration.
        </p>

        {/* Primary CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 sm:mb-8">
          <Link
            to="#popular"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-xl text-white font-bold transition-all duration-300 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 hover:scale-105 group min-h-[56px] text-base sm:text-lg"
          >
            <Zap size={20} />
            <span>Start Testing Now</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <div className="text-sm text-dark-400 flex items-center gap-2">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 border-2 border-dark-950" />
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 border-2 border-dark-950" />
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 border-2 border-dark-950" />
            </div>
            <span className="text-dark-300">
              <strong className="text-white">500K+</strong> tests completed
            </span>
          </div>
        </div>

        {/* Feature Pills - Compact on mobile */}
        <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-full text-dark-300 text-sm font-medium"
              >
                <Icon size={14} className="text-green-500 shrink-0" />
                <span>{feature.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Hero;
