import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Trophy,
  RotateCcw,
  Share2,
  Check,
  ArrowRight,
  TrendingUp,
  Zap,
  Lightbulb,
} from 'lucide-react';
import TestIcon from './icons/TestIcon';

/**
 * Enhanced Result Card Component
 * Displays engaging post-test results with percentile, level, actions, and suggestions
 */
const EnhancedResultCard = ({
  score,
  scoreLabel = 'ms',
  level,
  percentile,
  motivation,
  comparisonMessage,
  onRetry,
  testId,
  suggestedTests,
  shareMessage,
  additionalStats,
  leaderboard, // optional: [{ position, name, time, isPlayer }] — opt-in per test
  children
}) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      if (navigator.clipboard && shareMessage) {
        await navigator.clipboard.writeText(shareMessage);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-500">
      {/* Main Score Display */}
      <div className="bg-gradient-to-br from-dark-900 to-dark-950 border-2 border-dark-800 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center">
        {/* Trophy Icon */}
        <div className="mb-4 sm:mb-6">
          <div className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full ${level?.bg} ${level?.border} border-2`}>
            <Trophy size={32} className={`sm:w-10 sm:h-10 ${level?.color || 'text-green-500'}`} />
          </div>
        </div>

        {/* Score */}
        <div className="mb-4 sm:mb-6">
          <div className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold ${level?.color || 'text-green-500'} mb-2`}>
            {score} {scoreLabel}
          </div>
          
          {/* Level Badge */}
          <div className={`inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full ${level?.bg} ${level?.border} border-2 mb-3 sm:mb-4`}>
            <Zap size={16} className={`sm:w-5 sm:h-5 ${level?.color}`} />
            <span className={`text-lg sm:text-xl font-bold ${level?.color}`}>
              {level?.name || 'Great Job'}
            </span>
          </div>
        </div>

        {/* Mini leaderboard — the player always sits in the middle */}
        {leaderboard && leaderboard.length > 0 && (
          <div className="mb-4 sm:mb-6 rounded-xl border border-dark-800 bg-dark-950/70 p-2 sm:p-3">
            <ul className="space-y-1.5">
              {leaderboard.map((row) => (
                <li
                  key={row.position}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 sm:py-2.5 ${
                    row.isPlayer
                      ? `${level?.bg || 'bg-green-500/10'} ${level?.border || 'border-green-500/30'} border-2`
                      : 'border border-transparent bg-dark-900/60'
                  }`}
                >
                  <span
                    className={`w-6 shrink-0 text-center text-sm font-bold ${
                      row.isPlayer ? level?.color || 'text-green-400' : 'text-dark-500'
                    }`}
                  >
                    {row.position}
                  </span>
                  <span
                    className={`flex-1 truncate text-left text-sm sm:text-base ${
                      row.isPlayer
                        ? `font-bold ${level?.color || 'text-green-400'}`
                        : 'text-dark-300'
                    }`}
                  >
                    {row.name}
                  </span>
                  <span
                    className={`shrink-0 tabular-nums text-sm sm:text-base ${
                      row.isPlayer
                        ? `font-bold ${level?.color || 'text-green-400'}`
                        : 'text-dark-400'
                    }`}
                  >
                    {row.time} {scoreLabel}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Additional Stats */}
        {additionalStats && (
          <div className="mt-4 sm:mt-6 grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
            {additionalStats.map((stat, index) => (
              <div key={index} className="bg-dark-800/50 rounded-lg p-2 sm:p-3">
                <div className="text-xs text-dark-400 mb-0.5 sm:mb-1">{stat.label}</div>
                <div className="text-base sm:text-lg font-bold text-white">{stat.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* Custom Children Content */}
        {children}

        {/* Compact footer: percentile + motivation, right above the action buttons */}
        {(percentile !== undefined || motivation) && (
          <div className="mt-4 sm:mt-6 space-y-1.5 border-t border-dark-800 pt-3 sm:pt-4">
            {percentile !== undefined && (
              <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm">
                <span className="inline-flex items-center gap-1.5 font-semibold text-blue-400">
                  <TrendingUp size={14} />
                  Top {100 - percentile}%
                </span>
                {comparisonMessage && (
                  <span className="text-dark-400">{comparisonMessage}</span>
                )}
              </div>
            )}
            {motivation && (
              <p className="text-xs sm:text-sm text-dark-300 px-2">{motivation}</p>
            )}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {/* Retry Button */}
        <button
          type="button"
          onClick={onRetry}
          className="flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-lg sm:rounded-xl transition-all shadow-lg shadow-green-500/30 text-base sm:text-lg group touch-manipulation min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
        >
          <RotateCcw size={20} className="sm:w-6 sm:h-6 group-hover:rotate-180 transition-transform duration-500" />
          <span>Try Again</span>
        </button>

        {/* Share Button */}
        <button
          type="button"
          onClick={handleShare}
          className="flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-6 py-3 sm:py-4 bg-dark-800 hover:bg-dark-700 border-2 border-dark-700 hover:border-blue-500/50 text-white font-bold rounded-lg sm:rounded-xl transition-all text-base sm:text-lg touch-manipulation min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        >
          {copied ? (
            <>
              <Check size={20} className="sm:w-6 sm:h-6 text-green-400" />
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <Share2 size={20} className="sm:w-6 sm:h-6" />
              <span>Share Score</span>
            </>
          )}
        </button>
      </div>

      {/* Suggested Tests */}
      {suggestedTests && suggestedTests.length > 0 && (
        <div className="bg-gradient-to-br from-dark-900 to-dark-950 border border-dark-800 rounded-xl sm:rounded-2xl p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
              <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px] text-blue-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white">Try These Next</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {suggestedTests.map((test) => (
              <Link
                key={test.id}
                to={test.path}
                className="group relative bg-dark-800/50 hover:bg-dark-800 border border-dark-700 hover:border-blue-500/50 rounded-lg sm:rounded-xl p-3 sm:p-4 transition-all touch-manipulation min-h-[60px]"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 flex items-center justify-center shrink-0 group-hover:from-blue-500/30 group-hover:to-purple-500/30 group-hover:scale-110 transition-all">
                    <TestIcon testId={test.iconId || test.id} size={20} className="text-blue-300" strokeWidth={2.4} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm sm:text-base text-white group-hover:text-blue-400 transition-colors truncate">
                      {test.name}
                    </div>
                    <div className="text-xs text-dark-400 group-hover:text-dark-300 flex items-center gap-1">
                      Test now <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 rounded-xl transition-all pointer-events-none" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Quick Tip */}
      <div className="bg-dark-800/30 border border-dark-800 rounded-lg sm:rounded-xl p-3 sm:p-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
            <Lightbulb size={16} className="text-amber-300" strokeWidth={2.4} />
          </div>
          <div>
            <div className="text-sm font-semibold text-white mb-1">Pro Tip</div>
            <div className="text-xs sm:text-sm text-dark-300">
              Take short breaks between attempts to maintain peak performance. Consistency is key to improvement.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedResultCard;
