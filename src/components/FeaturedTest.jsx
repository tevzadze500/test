import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Users, Clock, ArrowRight, Award } from 'lucide-react';

const FeaturedTest = ({ test }) => {
  // Get the route for the test
  const getTestRoute = (testId) => {
    if (testId === 'reaction-time') return '/test/reaction-time';
    if (testId === 'go-no-go') return '/test/go-no-go';
    return '#';
  };

  const testRoute = getTestRoute(test.id);

  return (
    <Link
      to={testRoute}
      className="group relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-2 border-green-500/40 rounded-2xl p-6 sm:p-8 cursor-pointer overflow-hidden hover:border-green-500/70 transition-all duration-300 block shadow-xl shadow-green-500/10 hover:shadow-2xl hover:shadow-green-500/20 hover:scale-[1.01]"
    >
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute inset-0 bg-gradient-radial from-green-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Mobile-Optimized Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-5 sm:mb-6">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-4xl sm:text-5xl shadow-lg shadow-green-500/30 shrink-0">
              {test.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full border border-green-500/30">
                  <Award size={12} />
                  FEATURED
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                {test.name}
              </h2>
            </div>
          </div>
        </div>

        <p className="text-sm sm:text-base text-dark-300 mb-5 sm:mb-6 leading-relaxed">
          {test.description}. Our most popular test with over {test.stats.participants} users. Get instant results.
        </p>

        {/* Stats Grid - Mobile Optimized */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-5 sm:mb-6">
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/5 shadow-md">
            <div className="flex items-center gap-1.5 text-dark-400 text-xs mb-1">
              <Users size={14} className="shrink-0" />
              <span className="hidden sm:inline">Participants</span>
              <span className="sm:hidden">Users</span>
            </div>
            <div className="text-lg sm:text-2xl font-bold text-white">{test.stats.participants}</div>
          </div>
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/5 shadow-md">
            <div className="flex items-center gap-1.5 text-dark-400 text-xs mb-1">
              <Zap size={14} className="shrink-0" />
              <span className="hidden sm:inline">Avg Score</span>
              <span className="sm:hidden">Avg</span>
            </div>
            <div className="text-lg sm:text-2xl font-bold text-white">{test.stats.avgScore}</div>
          </div>
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/5 shadow-md">
            <div className="flex items-center gap-1.5 text-dark-400 text-xs mb-1">
              <Clock size={14} className="shrink-0" />
              <span>Time</span>
            </div>
            <div className="text-lg sm:text-2xl font-bold text-white">{test.duration}</div>
          </div>
        </div>

        {/* CTA - Mobile First */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
          <button className="flex items-center justify-center gap-3 px-6 sm:px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-xl text-white font-bold transition-all duration-300 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 group-hover:scale-105 text-base touch-manipulation min-h-[56px]">
            <Zap size={20} className="shrink-0" />
            <span>Start Test Now</span>
            <ArrowRight size={20} className="shrink-0 group-hover:translate-x-1 transition-transform" />
          </button>
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm text-dark-400">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 border-2 border-dark-900" />
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 border-2 border-dark-900" />
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 border-2 border-dark-900" />
            </div>
            <span className="text-dark-300">
              <strong className="text-white">1.2K+</strong> tested today
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedTest;
