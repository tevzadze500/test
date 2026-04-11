import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, ArrowRight, Zap, Star, Info, Flag, Focus, Eye, Headphones, Palette, Brain, Activity, Target, Volume2 } from 'lucide-react';

// Icon mapping for test icons
const iconMap = {
  Zap: Zap,
  Flag: Flag,
  Focus: Focus,
  Eye: Eye,
  Headphones: Headphones,
  Palette: Palette,
  Brain: Brain,
  Activity: Activity,
  Target: Target,
  Volume2: Volume2,
};

const TestCard = ({ test }) => {
  // Get the icon component from the mapping
  const IconComponent = iconMap[test.icon] || Zap;
  const colorClasses = {
    green: 'border-green-500/30 hover:border-green-500 hover:shadow-green-500/20',
    blue: 'border-blue-500/30 hover:border-blue-500 hover:shadow-blue-500/20',
    purple: 'border-purple-500/30 hover:border-purple-500 hover:shadow-purple-500/20',
  };

  const iconBgClasses = {
    green: 'bg-gradient-to-br from-green-500 to-emerald-600',
    blue: 'bg-gradient-to-br from-blue-500 to-cyan-600',
    purple: 'bg-gradient-to-br from-purple-500 to-violet-600',
  };

  const accentColors = {
    green: 'text-green-400',
    blue: 'text-blue-400',
    purple: 'text-purple-400',
  };

  // Get the route for the test
  const getTestRoute = (testId) => {
    if (testId === 'reaction-time') return '/test/reaction-time';
    if (testId === 'go-no-go') return '/test/go-no-go';
    if (testId === 'f1-reaction') return '/test/f1-reaction';
    if (testId === 'adhd-test') return '/test/adhd';
    if (testId === 'vision-test') return '/test/vision';
    return '#';
  };

  const testRoute = getTestRoute(test.id);
  const shouldOpenInNewTab = test.id === 'f1-reaction' || test.id === 'adhd-test';

  return (
    <Link
      to={testRoute}
      target={shouldOpenInNewTab ? '_blank' : undefined}
      rel={shouldOpenInNewTab ? 'noopener noreferrer' : undefined}
      className={`
        group relative bg-gradient-to-br from-slate-900 to-slate-800
        ${colorClasses[test.color]}
        border rounded-2xl p-5 sm:p-6 cursor-pointer
        transition-all duration-300 hover:scale-[1.03]
        shadow-lg shadow-black/20 hover:shadow-2xl
        backdrop-blur-sm flex flex-col
      `}
    >
      {/* Top Section: Icon + Name */}
      <div className="flex items-start gap-3 mb-3">
        <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl ${iconBgClasses[test.color]} flex items-center justify-center shadow-lg shrink-0 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
          <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 text-white" strokeWidth={2.5} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-bold text-white mb-1 leading-tight">
            {test.name}
          </h3>
          {test.recommendation && (
            <div className="flex items-center gap-1.5 text-xs sm:text-sm">
              <Star size={12} className={`shrink-0 ${accentColors[test.color]}`} />
              <span className={`${accentColors[test.color]} font-medium`}>
                {test.recommendation}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-dark-300 mb-4 line-clamp-2 leading-relaxed">
        {test.description}
      </p>

      {/* Key Info Grid - Better Readability */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <Clock size={14} className="text-dark-400 shrink-0" />
          <span className="text-white font-medium">{test.duration}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Users size={14} className="text-dark-400 shrink-0" />
          <span className="text-white font-medium">{test.stats.participants}</span>
        </div>
      </div>

      {/* Requirements & Difficulty */}
      {test.requirements && (
        <div className="flex items-start gap-1.5 mb-3 text-xs text-dark-300">
          <Info size={12} className="shrink-0 mt-0.5" />
          <span>{test.requirements}</span>
        </div>
      )}

      {/* Badges - Improved Visibility */}
      {test.badges && test.badges.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {test.badges.slice(0, 2).map((badge, index) => (
            <span
              key={index}
              className="px-2.5 py-1 text-xs font-semibold bg-dark-800/90 backdrop-blur-sm text-dark-200 rounded-md border border-dark-700"
            >
              {badge}
            </span>
          ))}
          <span className="px-2.5 py-1 text-xs font-semibold bg-dark-800/50 text-dark-400 rounded-md">
            {test.difficulty}
          </span>
        </div>
      )}

      {/* CTA Button - Spacer to push to bottom */}
      <div className="mt-auto pt-2">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg text-white text-sm font-semibold transition-all group-hover:gap-3 touch-manipulation min-h-[48px]">
          <Zap size={16} className="shrink-0" />
          <span>Start Test</span>
          <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
        </button>
      </div>
    </Link>
  );
};

export default TestCard;
