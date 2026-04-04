import React from 'react';
import { Trophy, Target, BarChart3, Hash, RotateCcw } from 'lucide-react';

const ReactionStatsCard = ({ stats, onReset }) => {
  const getScoreColor = (score) => {
    if (!score) return 'text-dark-400';
    if (score < 200) return 'text-green-500';
    if (score < 250) return 'text-green-400';
    if (score < 300) return 'text-blue-400';
    if (score < 350) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const getScoreRating = (score) => {
    if (!score) return 'No data';
    if (score < 200) return 'Elite';
    if (score < 250) return 'Excellent';
    if (score < 300) return 'Good';
    if (score < 350) return 'Average';
    return 'Below Average';
  };

  return (
    <div className="space-y-4">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Best Score */}
        <div className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-4 hover:border-green-500/30 transition-colors">
          <div className="flex items-center gap-2 text-dark-400 text-xs mb-2">
            <Trophy size={14} className="text-green-500" />
            <span>Best Score</span>
          </div>
          <div className={`text-2xl md:text-3xl font-bold ${getScoreColor(stats.best)}`}>
            {stats.best ? `${stats.best} ms` : '—'}
          </div>
          {stats.best && (
            <div className="text-xs text-dark-500 mt-1">
              {getScoreRating(stats.best)}
            </div>
          )}
        </div>

        {/* Average Score */}
        <div className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-4 hover:border-blue-500/30 transition-colors">
          <div className="flex items-center gap-2 text-dark-400 text-xs mb-2">
            <Target size={14} className="text-blue-500" />
            <span>Average</span>
          </div>
          <div className="text-2xl md:text-3xl font-bold text-blue-400">
            {stats.average ? `${stats.average} ms` : '—'}
          </div>
          {stats.average && (
            <div className="text-xs text-dark-500 mt-1">
              {getScoreRating(stats.average)}
            </div>
          )}
        </div>

        {/* Latest Score */}
        <div className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-4 hover:border-purple-500/30 transition-colors">
          <div className="flex items-center gap-2 text-dark-400 text-xs mb-2">
            <BarChart3 size={14} className="text-purple-500" />
            <span>Latest</span>
          </div>
          <div className={`text-2xl md:text-3xl font-bold ${getScoreColor(stats.latest)}`}>
            {stats.latest ? `${stats.latest} ms` : '—'}
          </div>
          {stats.latest && (
            <div className="text-xs text-dark-500 mt-1">
              {getScoreRating(stats.latest)}
            </div>
          )}
        </div>

        {/* Attempts */}
        <div className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-4 hover:border-yellow-500/30 transition-colors">
          <div className="flex items-center gap-2 text-dark-400 text-xs mb-2">
            <Hash size={14} className="text-yellow-500" />
            <span>Attempts</span>
          </div>
          <div className="text-2xl md:text-3xl font-bold text-yellow-400">
            {stats.attempts || 0}
          </div>
          <div className="text-xs text-dark-500 mt-1">
            {stats.attempts > 10 ? 'Dedicated!' : 'Keep going'}
          </div>
        </div>
      </div>

      {/* Performance Insight */}
      {stats.attempts > 0 && (
        <div className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 border border-green-500/20 rounded-xl p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="text-sm font-semibold text-white mb-1">Performance Insight</h4>
              <p className="text-sm text-dark-300">
                {stats.best < 250 
                  ? "Outstanding reflexes! You're in the top tier of reaction times."
                  : stats.best < 300
                  ? "Great performance! Keep practicing to reach elite levels."
                  : stats.average < 350
                  ? "Good work! With more practice, you can improve your times."
                  : "Keep training! Consistency is key to improving reaction time."}
              </p>
              {stats.attempts >= 5 && (
                <div className="mt-2 text-xs text-dark-400">
                  💡 Tip: Take short breaks between attempts for best results
                </div>
              )}
            </div>
            {onReset && stats.attempts > 0 && (
              <button
                onClick={onReset}
                className="flex items-center gap-2 px-3 py-2 bg-dark-800 hover:bg-dark-700 border border-dark-700 hover:border-dark-600 rounded-lg text-sm text-dark-300 hover:text-white transition-colors whitespace-nowrap"
              >
                <RotateCcw size={14} />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Reaction Time Scale */}
      {stats.attempts > 0 && (
        <div className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-white mb-3">Reaction Time Scale</h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-green-500">Elite (&lt;200ms)</span>
              <span className="text-dark-400">Professional level</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-green-400">Excellent (200-250ms)</span>
              <span className="text-dark-400">Above average</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-blue-400">Good (250-300ms)</span>
              <span className="text-dark-400">Average gamer</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-yellow-400">Average (300-350ms)</span>
              <span className="text-dark-400">Typical adult</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-orange-400">Below Average (&gt;350ms)</span>
              <span className="text-dark-400">Room for improvement</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReactionStatsCard;
