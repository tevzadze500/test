import React from 'react';
import { Trophy, Target, BarChart3, Hash, XCircle, RotateCcw } from 'lucide-react';

const F1StatsCard = ({ stats, onReset }) => {
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
    return 'Slow';
  };

  return (
    <div className="space-y-4">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Best Score */}
        <div className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-4 hover:border-green-500/30 transition-colors col-span-2">
          <div className="flex items-center gap-2 text-dark-400 text-xs mb-2">
            <Trophy size={14} className="text-green-500" />
            <span>Best Time</span>
          </div>
          <div className={`text-4xl font-bold ${getScoreColor(stats.best)}`}>
            {stats.best ? `${stats.best} ms` : '—'}
          </div>
          {stats.best && (
            <div className="text-xs text-dark-500 mt-1">
              {getScoreRating(stats.best)}
            </div>
          )}
        </div>

        {/* Latest Score */}
        <div className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-4 hover:border-purple-500/30 transition-colors">
          <div className="flex items-center gap-2 text-dark-400 text-xs mb-2">
            <BarChart3 size={14} className="text-purple-500" />
            <span>Latest</span>
          </div>
          <div className={`text-2xl font-bold ${getScoreColor(stats.latest)}`}>
            {stats.latest ? `${stats.latest} ms` : '—'}
          </div>
          {stats.latest && (
            <div className="text-xs text-dark-500 mt-1">
              {getScoreRating(stats.latest)}
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
            {stats.average ? `${stats.average} ms` : '—'}
          </div>
          {stats.average && (
            <div className="text-xs text-dark-500 mt-1">
              {getScoreRating(stats.average)}
            </div>
          )}
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
            {stats.attempts > 10 ? 'Dedicated!' : 'Keep going'}
          </div>
        </div>

        {/* False Starts */}
        <div className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-4 hover:border-red-500/30 transition-colors">
          <div className="flex items-center gap-2 text-dark-400 text-xs mb-2">
            <XCircle size={14} className="text-red-500" />
            <span>False Starts</span>
          </div>
          <div className="text-2xl font-bold text-red-400">
            {stats.falseStarts || 0}
          </div>
          <div className="text-xs text-dark-500 mt-1">
            Early clicks
          </div>
        </div>
      </div>

      {/* Performance Insight */}
      {stats.attempts > 0 && (
        <div className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 border border-green-500/20 rounded-xl p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="text-sm font-semibold text-white mb-1">Performance Analysis</h4>
              <p className="text-sm text-dark-300">
                {stats.best < 200 
                  ? "Elite F1 reflexes! You could compete with professional drivers! 🏎️"
                  : stats.best < 250
                  ? "Outstanding reaction time! You're in the top tier of performers."
                  : stats.best < 300
                  ? "Great performance! Above average reaction speed."
                  : "Keep practicing to improve your start reaction time."}
              </p>
              {stats.falseStarts > 0 && (
                <div className="mt-2 text-xs text-dark-400">
                  💡 Tip: {stats.falseStarts === 1 ? '1 false start' : `${stats.falseStarts} false starts`} - wait for all lights to go out
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

      {/* F1 Context */}
      <div className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-4">
        <h4 className="text-sm font-semibold text-white mb-3">F1 Start Procedure</h4>
        <div className="space-y-2 text-xs text-dark-300">
          <p>In Formula 1, the starting lights follow a precise sequence:</p>
          <ul className="space-y-1 ml-4">
            <li>• Five red lights illuminate one by one</li>
            <li>• After a random delay (1-4 seconds)</li>
            <li>• All lights go out simultaneously</li>
            <li>• Drivers must react instantly to avoid losing positions</li>
          </ul>
          <p className="mt-2 text-dark-400">
            Professional F1 drivers typically achieve reaction times under 200ms!
          </p>
        </div>
      </div>
    </div>
  );
};

export default F1StatsCard;
