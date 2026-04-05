import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <div className="pt-16 pb-12 sm:pt-12 sm:pb-16 md:pt-16 md:pb-20 px-1 lg:pt-8">
      {/* Premium Hero - Mobile First with Generous Spacing */}
      <div className="text-center max-w-2xl mx-auto">
        
        {/* Top Badge - Attention Grabber */}
        <div className="mb-6 sm:mb-8 flex justify-center animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-green-500/10 border border-green-500/30 rounded-full">
            <Sparkles size={14} className="text-green-400" />
            <span className="text-xs sm:text-sm font-semibold text-green-400 tracking-wide">
              FREE ONLINE TEST
            </span>
          </div>
        </div>
        
        {/* Hero Title - Ultra Clear & Dominant */}
        <h1 className="text-[2.5rem] leading-[1.1] sm:text-5xl md:text-6xl font-bold text-white mb-5 sm:mb-6 tracking-tight px-4">
          Test Your{' '}
          <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 bg-clip-text text-transparent">
            Reaction Time
          </span>
        </h1>
        
        {/* Ultra-Short Description */}
        <p className="text-base sm:text-lg text-dark-300 mb-8 sm:mb-10 font-normal leading-relaxed px-4">
          See how fast you react in milliseconds.
        </p>

        {/* Premium CTA - Standalone & Highly Visible */}
        <div className="mb-10 sm:mb-12 px-4">
          <Link
            to="#featured"
            className="group inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-5 sm:px-10 sm:py-5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-2xl text-white font-bold text-base sm:text-lg transition-all duration-300 shadow-xl shadow-green-500/25 hover:shadow-2xl hover:shadow-green-500/40 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Zap size={22} className="shrink-0 group-hover:rotate-12 transition-transform" />
            <span>Start Free Test</span>
            <ArrowRight size={22} className="shrink-0 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Social Proof - Clean & Impactful */}
        <div className="mb-8 sm:mb-10 px-4">
          <div className="flex flex-col items-center gap-3">
            {/* User Avatars Stack */}
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 border-[3px] border-dark-950 shadow-lg" />
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 border-[3px] border-dark-950 shadow-lg" />
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 border-[3px] border-dark-950 shadow-lg" />
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 border-[3px] border-dark-950 shadow-lg" />
            </div>
            {/* Count - Big & Bold */}
            <div className="text-center">
              <span className="text-2xl sm:text-3xl font-bold text-white">500K+</span>
              <span className="text-dark-400 text-sm ml-2">users tested their reflexes</span>
            </div>
          </div>
        </div>

        {/* Trust Badges - Clean Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 px-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-dark-800/40 border border-dark-700/50 rounded-full">
            <CheckCircle2 size={14} className="text-green-400" />
            <span className="text-xs sm:text-sm text-dark-300 font-medium">No signup</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-dark-800/40 border border-dark-700/50 rounded-full">
            <CheckCircle2 size={14} className="text-green-400" />
            <span className="text-xs sm:text-sm text-dark-300 font-medium">Instant results</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-dark-800/40 border border-dark-700/50 rounded-full">
            <CheckCircle2 size={14} className="text-green-400" />
            <span className="text-xs sm:text-sm text-dark-300 font-medium">100% free</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;
