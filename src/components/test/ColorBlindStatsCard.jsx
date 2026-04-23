import React from 'react';
import { Eye, Trophy, Target, BarChart3, Hash, RotateCcw } from 'lucide-react';

const ColorBlindStatsCard = ({ stats, onReset }) => {
  const getScoreColor = (score) => {
    if (!score) return 'text-dark-400';
    if (score >= 90) return 'text-green-500';
    if (score >= 75) return 'text-green-400';
    if (score >= 60) return 'text-blue-400';
    if (score >= 40) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const getScoreRating = (score) => {
    if (!score) return 'No data';
    if (score >= 90) return 'Normal Vision';
    if (score >= 75) return 'Mostly Normal';
    if (score >= 60) return 'Mild Deficiency';
    if (score >= 40) return 'Moderate';
    return 'Significant';
  };

  return (
    <div className="space-y-4">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Best Score */}
        <div className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-4 hover:border-green-500/30 transition-colors col-span-2">
          <div className="flex items-center gap-2 text-dark-400 text-xs mb-2">
            <Trophy size={14} className="text-green-500" />
            <span>Best Score</span>
          </div>
          <div className={`text-4xl font-bold ${getScoreColor(stats.bestScore)}`}>
            {stats.bestScore ? `${stats.bestScore}%` : '—'}
          </div>
          {stats.bestScore && (
            <div className="text-xs text-dark-500 mt-1">
              {getScoreRating(stats.bestScore)}
            </div>
          )}
        </div>

        {/* Latest Score */}
        <div className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-4 hover:border-purple-500/30 transition-colors">
          <div className="flex items-center gap-2 text-dark-400 text-xs mb-2">
            <BarChart3 size={14} className="text-purple-500" />
            <span>Latest</span>
          </div>
          <div className={`text-2xl font-bold ${getScoreColor(stats.latestScore)}`}>
            {stats.latestScore ? `${stats.latestScore}%` : '—'}
          </div>
          {stats.latestScore && (
            <div className="text-xs text-dark-500 mt-1">
              {getScoreRating(stats.latestScore)}
            </div>
          )}
        </div>

        {/* Average Score */}
        <div className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-4 hover:border-blue-500/30 transition-colors">
          <div className="flex items-center gap-2 text-dark-400 text-xs mb-2">
            <Target size={14} className="text-blue-500" />
            <span>Average</span>
          </div>
          <div className="text-2xl font-bold text-blue-400">
            {stats.averageScore ? `${stats.averageScore}%` : '—'}
          </div>
        </div>

        {/* Attempts */}
        <div className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-4 hover:border-yellow-500/30 transition-colors col-span-2">
          <div className="flex items-center gap-2 text-dark-400 text-xs mb-2">
            <Hash size={14} className="text-yellow-500" />
            <span>Attempts</span>
          </div>
          <div className="text-2xl font-bold text-yellow-400">
            {stats.attempts || 0}
          </div>
          <div className="text-xs text-dark-500 mt-1">
            {stats.attempts > 5 ? 'Dedicated tester!' : 'Keep going'}
          </div>
        </div>
      </div>

      {/* Performance Insight */}
      {stats.attempts > 0 && (
        <div className="bg-gradient-to-br from-purple-500/10 to-violet-600/10 border border-purple-500/20 rounded-xl p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="text-sm font-semibold text-white mb-1">Vision Analysis</h4>
              <p className="text-sm text-dark-300">
                {stats.bestScore >= 90
                  ? "Excellent color vision! You can distinguish colors very well. 🎨"
                  : stats.bestScore >= 75
                  ? "Good color vision with minor variations. Mostly normal. 👁️"
                  : stats.bestScore >= 60
                  ? "Some difficulty distinguishing certain colors. Consider a professional test."
                  : "Significant color vision differences detected. Consult an eye specialist."}
              </p>
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

      {/* Color Blindness Info */}
      <div className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-4">
        <h4 className="text-sm font-semibold text-white mb-3">About Color Blindness</h4>
        <div className="space-y-2 text-xs text-dark-300">
          <p>Color blindness affects approximately 8% of men and 0.5% of women worldwide:</p>
          <ul className="space-y-1 ml-4">
            <li>• <strong className="text-white">Red-Green</strong> — Most common type</li>
            <li>• <strong className="text-white">Blue-Yellow</strong> — Less common</li>
            <li>• <strong className="text-white">Total</strong> — Very rare (achromatopsia)</li>
          </ul>
          <p className="mt-2 text-dark-400">
            💡 This test is a screening tool only. For a definitive diagnosis, consult an eye care professional.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ColorBlindStatsCard;
