import React from 'react';
import { Headphones, Trophy, Target, BarChart3, Hash, RotateCcw } from 'lucide-react';

const HearingStatsCard = ({ stats, onReset }) => {
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
    if (score >= 90) return 'Excellent';
    if (score >= 75) return 'Very Good';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Limited';
  };

  const getFreqLabel = (hz) => {
    if (!hz) return '—';
    if (hz >= 1000) return `${(hz / 1000).toFixed(0)} kHz`;
    return `${hz} Hz`;
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

        {/* Highest Frequency */}
        <div className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-4 hover:border-blue-500/30 transition-colors">
          <div className="flex items-center gap-2 text-dark-400 text-xs mb-2">
            <Headphones size={14} className="text-blue-500" />
            <span>Highest Freq</span>
          </div>
          <div className="text-2xl font-bold text-blue-400">
            {getFreqLabel(stats.highestFrequency)}
          </div>
          {stats.highestFrequency && (
            <div className="text-xs text-dark-500 mt-1">
              {stats.highestFrequency >= 16000 ? 'Excellent range' : stats.highestFrequency >= 12000 ? 'Good range' : 'Limited range'}
            </div>
          )}
        </div>

        {/* Average Score */}
        <div className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-4 hover:border-cyan-500/30 transition-colors">
          <div className="flex items-center gap-2 text-dark-400 text-xs mb-2">
            <Target size={14} className="text-cyan-500" />
            <span>Average</span>
          </div>
          <div className="text-2xl font-bold text-cyan-400">
            {stats.averageScore ? `${stats.averageScore}%` : '—'}
          </div>
        </div>

        {/* Attempts */}
        <div className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-4 hover:border-yellow-500/30 transition-colors">
          <div className="flex items-center gap-2 text-dark-400 text-xs mb-2">
            <Hash size={14} className="text-yellow-500" />
            <span>Attempts</span>
          </div>
          <div className="text-2xl font-bold text-yellow-400">
            {stats.attempts || 0}
          </div>
          <div className="text-xs text-dark-500 mt-1">
            {stats.attempts > 5 ? 'Dedicated!' : 'Keep going'}
          </div>
        </div>
      </div>

      {/* Performance Insight */}
      {stats.attempts > 0 && (
        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-600/10 border border-blue-500/20 rounded-xl p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="text-sm font-semibold text-white mb-1">Hearing Analysis</h4>
              <p className="text-sm text-dark-300">
                {stats.highestFrequency >= 18000
                  ? "Exceptional hearing! You can detect frequencies near the human limit! 🎵"
                  : stats.highestFrequency >= 16000
                  ? "Excellent hearing range! Your ears are in great shape. 🎶"
                  : stats.highestFrequency >= 12000
                  ? "Good hearing! Most everyday sounds are well within your range."
                  : stats.highestFrequency >= 8000
                  ? "Your hearing covers essential speech frequencies. Consider a checkup for higher ranges."
                  : "Your hearing range appears limited. Consider consulting an audiologist."}
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

      {/* Hearing Context */}
      <div className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-4">
        <h4 className="text-sm font-semibold text-white mb-3">About Hearing Frequencies</h4>
        <div className="space-y-2 text-xs text-dark-300">
          <p>The human ear can typically detect sounds from 20 Hz to 20,000 Hz (20 kHz):</p>
          <ul className="space-y-1 ml-4">
            <li>• <strong className="text-white">250–2000 Hz</strong> — Speech range (most important)</li>
            <li>• <strong className="text-white">2000–8000 Hz</strong> — Music clarity & consonants</li>
            <li>• <strong className="text-white">8000–16000 Hz</strong> — High-frequency detail</li>
            <li>• <strong className="text-white">16000–20000 Hz</strong> — Near human limit (declines with age)</li>
          </ul>
          <p className="mt-2 text-dark-400">
            💡 High-frequency hearing naturally declines with age. Most adults over 25 lose some ability above 16 kHz.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HearingStatsCard;
