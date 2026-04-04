import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, ArrowRight, Users, Shield, CheckCircle2 } from 'lucide-react';

const Hero = () => {
  return (
    <div className="mb-12 sm:mb-16">
      {/* Premium Hero - Mobile First */}
      <div className="text-center lg:text-left max-w-3xl mx-auto lg:mx-0">
        
        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 sm:mb-8 leading-[1.1] tracking-tight">
          Test Your{' '}
          <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent">
            Abilities
          </span>
        </h1>
        
        {/* Shorter Description - Clear Separation */}
        <p className="text-lg sm:text-xl text-dark-300 mb-8 sm:mb-10 font-light leading-relaxed">
          Professional testing platform. Instant results.
        </p>

        {/* Primary CTA - Standalone & Dominant */}
        <div className="mb-8 sm:mb-10">
          <Link
            to="#popular"
            className="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-xl sm:rounded-2xl text-white font-bold transition-all duration-300 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 hover:shadow-2xl hover:scale-[1.02] group text-base sm:text-lg w-full sm:w-auto"
          >
            <Zap size={22} className="shrink-0" />
            <span>Start Testing Now</span>
            <ArrowRight size={22} className="shrink-0 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Premium Social Proof Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* User Avatars + Count */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 border-3 border-dark-950 shadow-lg flex items-center justify-center">
                <Users size={16} className="text-white" />
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 border-3 border-dark-950 shadow-lg flex items-center justify-center">
                <Users size={16} className="text-white" />
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 border-3 border-dark-950 shadow-lg flex items-center justify-center">
                <Users size={16} className="text-white" />
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 border-3 border-dark-950 shadow-lg flex items-center justify-center">
                <Users size={16} className="text-white" />
              </div>
            </div>
            <div className="text-left">
              <div className="text-white font-bold text-lg">500K+</div>
              <div className="text-dark-400 text-xs font-medium">tests completed</div>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-8 bg-dark-800" />

          {/* Trust Badge */}
          <div className="flex items-center gap-2 px-4 py-2 bg-dark-800/50 rounded-lg border border-dark-700">
            <Shield size={16} className="text-green-500 shrink-0" />
            <span className="text-dark-300 text-sm font-medium">No signup required</span>
          </div>
        </div>

        {/* Simplified Benefits - Inline Text */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-2 text-sm text-dark-400">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={14} className="text-green-500 shrink-0" />
            <span>Instant results</span>
          </div>
          <span className="text-dark-700">•</span>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={14} className="text-green-500 shrink-0" />
            <span>Mobile optimized</span>
          </div>
          <span className="text-dark-700">•</span>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={14} className="text-green-500 shrink-0" />
            <span>Always free</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;
