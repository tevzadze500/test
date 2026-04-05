import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Users, Clock, ArrowRight, Award, TrendingUp } from 'lucide-react';

const FeaturedTest = ({ test }) => {
  // Get the route for the test
  const getTestRoute = (testId) => {
    if (testId === 'reaction-time') return '/test/reaction-time';
    if (testId === 'go-no-go') return '/test/go-no-go';
    return '#';
  };

  const testRoute = getTestRoute(test.id);

  return (
    <div className="px-1">
      <Link
        to={testRoute}
        className="group relative bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90 border-2 border-green-500/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 cursor-pointer overflow-hidden hover:border-green-500/60 transition-all duration-300 block shadow-2xl shadow-green-500/10 hover:shadow-green-500/20 hover:scale-[1.01] active:scale-[0.99]"
      >
        {/* Background Glow Effect - Subtle & Premium */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-emerald-500/5 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl group-hover:bg-green-500/10 transition-all duration-700" />
        
        {/* Content */}
        <div className="relative z-10">
          {/* Header - Icon + Badge + Title */}
          <div className="flex items-start gap-4 mb-5">
            {/* Icon */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-3xl sm:text-4xl shadow-lg shadow-green-500/30 shrink-0 group-hover:scale-110 transition-transform duration-300">
              {test.icon}
            </div>
            
            {/* Title + Badge */}
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-500/15 text-green-400 text-[10px] sm:text-xs font-bold rounded-full border border-green-500/30 mb-3">
                <Award size={12} />
                <span>FEATURED TEST</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                {test.name}
              </h2>
            </div>
          </div>

          {/* Short Description - Reduced Length */}
          <p className="text-sm sm:text-base text-dark-300 mb-6 leading-relaxed">
            {test.description}. Get instant results and compare with others.
          </p>

          {/* Stats Grid - Compact & Clean */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-dark-900/60 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-dark-700/50">
              <div className="flex items-center gap-1.5 text-dark-400 text-[10px] sm:text-xs mb-1.5">
                <Users size={12} className="shrink-0" />
                <span>Users</span>
              </div>
              <div className="text-base sm:text-xl font-bold text-white">{test.stats.participants}</div>
            </div>
            <div className="bg-dark-900/60 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-dark-700/50">
              <div className="flex items-center gap-1.5 text-dark-400 text-[10px] sm:text-xs mb-1.5">
                <Zap size={12} className="shrink-0" />
                <span>Avg</span>
              </div>
              <div className="text-base sm:text-xl font-bold text-white">{test.stats.avgScore}</div>
            </div>
            <div className="bg-dark-900/60 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-dark-700/50">
              <div className="flex items-center gap-1.5 text-dark-400 text-[10px] sm:text-xs mb-1.5">
                <Clock size={12} className="shrink-0" />
                <span>Time</span>
              </div>
              <div className="text-base sm:text-xl font-bold text-white">{test.duration}</div>
            </div>
          </div>

          {/* CTA - Premium Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <button className="flex items-center justify-center gap-3 px-6 sm:px-8 py-4 sm:py-5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-xl sm:rounded-2xl text-white font-bold transition-all duration-300 shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 group-hover:scale-[1.02] active:scale-[0.98] text-base touch-manipulation min-h-[56px]">
              <Zap size={20} className="shrink-0" />
              <span>Start Test Now</span>
              <ArrowRight size={20} className="shrink-0 group-hover:translate-x-1 transition-transform" />
            </button>
            
            {/* Live Activity Indicator */}
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm text-dark-400 py-2">
              <div className="flex items-center gap-2">
                <div className="relative flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <div className="absolute w-2 h-2 rounded-full bg-green-500 animate-ping opacity-75" />
                </div>
                <span className="text-dark-300">
                  <strong className="text-white font-semibold">1.2K+</strong> tested today
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default FeaturedTest;
