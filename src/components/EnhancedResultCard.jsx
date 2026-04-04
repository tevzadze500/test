import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Trophy, 
  RotateCcw, 
  Share2, 
  Check, 
  ArrowRight,
  TrendingUp,
  Zap
} from 'lucide-react';

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

        {/* Percentile */}
        {percentile !== undefined && (
          <div className="mb-3 sm:mb-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingUp size={18} className="sm:w-5 sm:h-5 text-blue-400" />
              <span className="text-xl sm:text-2xl font-bold text-blue-400">
                Top {100 - percentile}%
              </span>
            </div>
            <p className="text-dark-300 text-sm sm:text-base md:text-lg px-4">
              {comparisonMessage}
            </p>
          </div>
        )}

        {/* Motivational Message */}
        {motivation && (
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gradient-to-r from-green-500/10 to-emerald-600/10 border border-green-500/20 rounded-lg sm:rounded-xl">
            <p className="text-base sm:text-lg text-white font-medium">
              {motivation}
            </p>
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
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {/* Retry Button */}
        <button
          onClick={onRetry}
          className="flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-lg sm:rounded-xl transition-all shadow-lg shadow-green-500/30 text-base sm:text-lg group touch-manipulation min-h-[48px]"
        >
          <RotateCcw size={20} className="sm:w-6 sm:h-6 group-hover:rotate-180 transition-transform duration-500" />
          <span>Beat Your Score</span>
        </button>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-6 py-3 sm:py-4 bg-dark-800 hover:bg-dark-700 border-2 border-dark-700 hover:border-blue-500/50 text-white font-bold rounded-lg sm:rounded-xl transition-all text-base sm:text-lg touch-manipulation min-h-[48px]"
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
                  <div className="text-2xl sm:text-3xl shrink-0">{test.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm sm:text-base text-white group-hover:text-blue-400 transition-colors truncate">
                      {test.name}
                    </div>
                    <div className="text-xs text-dark-400 group-hover:text-dark-300">
                      Test now →
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
        <div className="flex items-start gap-2 sm:gap-3">
          <div className="text-xl sm:text-2xl shrink-0">💡</div>
          <div>
            <div className="text-sm font-semibold text-white mb-1">Pro Tip</div>
            <div className="text-xs sm:text-sm text-dark-300">
              Take short breaks between attempts to maintain peak performance. Consistency is key to improvement!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedResultCard;
