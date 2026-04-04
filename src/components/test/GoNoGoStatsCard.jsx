import React from 'react';
import { Trophy, Target, XCircle, ShieldCheck, BarChart3, RotateCcw } from 'lucide-react';

const GoNoGoStatsCard = ({ stats, onRetry }) => {
  const getAccuracyColor = (accuracy) => {
    if (!accuracy && accuracy !== 0) return 'text-dark-400';
    if (accuracy >= 90) return 'text-green-500';
    if (accuracy >= 75) return 'text-blue-400';
    if (accuracy >= 60) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const getInhibitionRating = (score) => {
    if (!score && score !== 0) return 'No data';
    if (score === 100) return 'Perfect';
    if (score >= 50) return 'Good';
    return 'Needs Work';
  };

  const getPerformanceRating = (accuracy) => {
    if (!accuracy && accuracy !== 0) return 'No data';
    if (accuracy >= 90) return 'Excellent';
    if (accuracy >= 75) return 'Good';
    if (accuracy >= 60) return 'Fair';
    return 'Practice More';
  };

  return (
    <div className="space-y-4">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Accuracy */}
        <div className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-4 hover:border-blue-500/30 transition-colors col-span-2">
          <div className="flex items-center gap-2 text-dark-400 text-xs mb-2">
            <Trophy size={14} className="text-blue-500" />
            <span>Overall Accuracy</span>
          </div>
          <div className={`text-4xl font-bold ${getAccuracyColor(stats.accuracy)}`}>
            {stats.accuracy !== null && stats.accuracy !== undefined ? `${stats.accuracy}%` : '—'}
          </div>
          {stats.accuracy !== null && stats.accuracy !== undefined && (
            <div className="text-xs text-dark-500 mt-1">
              {getPerformanceRating(stats.accuracy)}
            </div>
          )}
        </div>

        {/* Average Reaction Time */}
        <div className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-4 hover:border-green-500/30 transition-colors">
          <div className="flex items-center gap-2 text-dark-400 text-xs mb-2">
            <Target size={14} className="text-green-500" />
            <span>Avg Speed</span>
          </div>
          <div className="text-2xl font-bold text-green-400">
            {stats.avgReactionTime ? `${stats.avgReactionTime} ms` : '—'}
          </div>
          {stats.avgReactionTime && (
            <div className="text-xs text-dark-500 mt-1">
              {stats.avgReactionTime < 300 ? 'Fast' : 'Good'}
            </div>
          )}
        </div>

        {/* Inhibition Score */}
        <div className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-4 hover:border-purple-500/30 transition-colors">
          <div className="flex items-center gap-2 text-dark-400 text-xs mb-2">
            <ShieldCheck size={14} className="text-purple-500" />
            <span>Inhibition</span>
          </div>
          <div className="text-2xl font-bold text-purple-400">
            {stats.inhibitionScore !== null && stats.inhibitionScore !== undefined ? `${stats.inhibitionScore}%` : '—'}
          </div>
          {stats.inhibitionScore !== null && stats.inhibitionScore !== undefined && (
            <div className="text-xs text-dark-500 mt-1">
              {getInhibitionRating(stats.inhibitionScore)}
            </div>
          )}
        </div>

        {/* Errors */}
        <div className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-4 hover:border-red-500/30 transition-colors">
          <div className="flex items-center gap-2 text-dark-400 text-xs mb-2">
            <XCircle size={14} className="text-red-500" />
            <span>Errors</span>
          </div>
          <div className="text-2xl font-bold text-red-400">
            {stats.errors !== null && stats.errors !== undefined ? stats.errors : '—'}
          </div>
          <div className="text-xs text-dark-500 mt-1">
            Clicked on red
          </div>
        </div>

        {/* False Starts */}
        <div className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-4 hover:border-orange-500/30 transition-colors">
          <div className="flex items-center gap-2 text-dark-400 text-xs mb-2">
            <BarChart3 size={14} className="text-orange-500" />
            <span>False Starts</span>
          </div>
          <div className="text-2xl font-bold text-orange-400">
            {stats.falseStarts !== null && stats.falseStarts !== undefined ? stats.falseStarts : '—'}
          </div>
          <div className="text-xs text-dark-500 mt-1">
            Too early clicks
          </div>
        </div>
      </div>

      {/* Performance Insight */}
      {stats.accuracy !== null && stats.accuracy !== undefined && (
        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-600/10 border border-blue-500/20 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-white mb-2">Performance Analysis</h4>
          <p className="text-sm text-dark-300">
            {stats.accuracy >= 90
              ? "Outstanding performance! Your impulse control and reaction speed are excellent."
              : stats.accuracy >= 75
              ? "Good job! You're showing solid cognitive control and quick responses."
              : stats.inhibitionScore === 100
              ? "Perfect inhibition! You successfully resisted all NO-GO signals."
              : stats.errors > 0
              ? `You had ${stats.errors} false ${stats.errors === 1 ? 'alarm' : 'alarms'}. Try to resist clicking on red signals.`
              : "Keep practicing to improve your accuracy and impulse control."}
          </p>
          {stats.falseStarts > 0 && (
            <p className="text-xs text-dark-400 mt-2">
              💡 Tip: Wait for the signal before clicking to avoid false starts
            </p>
          )}
        </div>
      )}

      {/* What This Measures */}
      <div className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-4">
        <h4 className="text-sm font-semibold text-white mb-3">What This Test Measures</h4>
        <div className="space-y-2 text-xs text-dark-300">
          <div>
            <span className="text-blue-400 font-semibold">Response Inhibition:</span> Ability to stop a prepotent response
          </div>
          <div>
            <span className="text-green-400 font-semibold">Impulse Control:</span> Capacity to resist automatic reactions
          </div>
          <div>
            <span className="text-purple-400 font-semibold">Sustained Attention:</span> Maintaining focus across trials
          </div>
          <div>
            <span className="text-yellow-400 font-semibold">Reaction Time:</span> Speed of motor response to GO signals
          </div>
        </div>
      </div>

      {/* Retry Button */}
      {onRetry && (
        <button
          onClick={onRetry}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-colors"
        >
          <RotateCcw size={18} />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
};

export default GoNoGoStatsCard;
