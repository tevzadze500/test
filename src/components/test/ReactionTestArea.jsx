import React, { useState, useEffect, useRef } from 'react';
import { Zap, Clock, AlertCircle, Target, Monitor, RotateCcw, ArrowRight } from 'lucide-react';
import EnhancedResultCard from '../EnhancedResultCard';
import useScreenRefreshRate from '../../hooks/useScreenRefreshRate';
import ScoreDistributionGraph from './ScoreDistributionGraph';
import { 
  getReactionTimeLevel, 
  getReactionTimePercentile, 
  getReactionTimeMotivation,
  getComparisonMessage,
  generateShareMessage,
  getSuggestedTests
} from '../../utils/scoreUtils';

const TEST_STATES = {
  IDLE: 'idle',
  WAITING: 'waiting',
  READY: 'ready',
  TRIAL_RESULT: 'trialResult',
  FINAL_RESULT: 'finalResult',
  FALSE_START: 'falseStart',
};

const TOTAL_ROUNDS = 5;

const ReactionTestArea = ({ onResult }) => {
  const [state, setState] = useState(TEST_STATES.IDLE);
  const [currentScore, setCurrentScore] = useState(null);
  const [scores, setScores] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [challengeTarget, setChallengeTarget] = useState(null);
  const timeoutRef = useRef(null);
  const startTimeRef = useRef(null);
  const refreshRate = useScreenRefreshRate();

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const beatVal = parseInt(params.get('beat') || params.get('challenge'), 10);
        if (!isNaN(beatVal) && beatVal >= 50 && beatVal <= 999) {
          setChallengeTarget(beatVal);
        }
      }
    } catch (e) {
      /* ignore */
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const startTest = () => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    setState(TEST_STATES.WAITING);
    setCurrentScore(null);

    // Random delay between 1.5 and 4.0 seconds
    const delay = 1500 + Math.random() * 2500;

    timeoutRef.current = setTimeout(() => {
      setState(TEST_STATES.READY);
      startTimeRef.current = performance.now();
      setIsProcessing(false);
    }, delay);
  };

  const handleClick = () => {
    if (state === TEST_STATES.IDLE) {
      startTest();
    } else if (state === TEST_STATES.WAITING) {
      // False start
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setState(TEST_STATES.FALSE_START);
      setIsProcessing(false);
    } else if (state === TEST_STATES.READY) {
      const reaction = Math.round(performance.now() - startTimeRef.current);
      const newScores = [...scores, reaction];
      setScores(newScores);
      setCurrentScore(reaction);

      // Notify parent component
      if (onResult) {
        onResult(reaction);
      }

      if (newScores.length >= TOTAL_ROUNDS) {
        setState(TEST_STATES.FINAL_RESULT);
      } else {
        setState(TEST_STATES.TRIAL_RESULT);
      }
    } else if (state === TEST_STATES.TRIAL_RESULT) {
      // Advance to next round
      startTest();
    } else if (state === TEST_STATES.FALSE_START) {
      // Retry current round
      startTest();
    }
  };

  const handleFullReset = () => {
    setState(TEST_STATES.IDLE);
    setScores([]);
    setCurrentScore(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleClick();
    }
  };

  const finalAverage = scores.length > 0
    ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
    : currentScore;

  const bestScore = scores.length > 0 ? Math.min(...scores) : currentScore;

  // Render Final 5-Attempt Benchmark Card
  if (state === TEST_STATES.FINAL_RESULT && finalAverage) {
    const level = getReactionTimeLevel(finalAverage);
    const percentile = getReactionTimePercentile(finalAverage);
    const motivation = getReactionTimeMotivation(finalAverage, bestScore);
    const comparisonMessage = getComparisonMessage(percentile);
    const shareMessage = generateShareMessage(
      'Reaction Time Test (5-round average)',
      `${finalAverage}ms`,
      level.name,
      '/test/reaction-time'
    );
    const suggestedTests = getSuggestedTests('reaction-time');
    const isBeaten = challengeTarget && finalAverage < challengeTarget;

    return (
      <div className="space-y-4">
        {challengeTarget && (
          <div className={`p-4 rounded-xl border flex items-center justify-center gap-3 text-center ${
            isBeaten 
              ? 'bg-green-500/15 border-green-500/30 text-green-300' 
              : 'bg-yellow-500/15 border-yellow-500/30 text-yellow-300'
          }`}>
            <Target size={20} className={isBeaten ? 'text-green-400' : 'text-yellow-400'} />
            <span className="font-semibold text-sm sm:text-base">
              {isBeaten 
                ? `🏆 Challenge beaten! Your 5-round average is ${finalAverage} ms, beating the target of ${challengeTarget} ms by ${challengeTarget - finalAverage} ms!`
                : `Target was ${challengeTarget} ms. Your 5-round average was ${finalAverage} ms (${finalAverage - challengeTarget} ms away). Try again!`}
            </span>
          </div>
        )}

        <EnhancedResultCard
          score={finalAverage}
          scoreLabel="ms avg"
          level={level}
          percentile={percentile}
          motivation={motivation}
          comparisonMessage={comparisonMessage}
          onRetry={handleFullReset}
          testId="reaction-time"
          suggestedTests={suggestedTests}
          shareMessage={shareMessage}
          additionalStats={[
            { label: '5-Try Average', value: `${finalAverage} ms` },
            { label: 'Fastest Try', value: `${bestScore} ms` },
            { label: 'Consistency', value: `±${Math.round(Math.max(...scores) - Math.min(...scores))} ms` },
            { label: 'Attempts', value: '5 of 5' },
          ]}
        >
          {/* Individual attempts badge strip */}
          <div className="mt-4 pt-4 border-t border-dark-800">
            <div className="text-xs text-dark-400 mb-2 font-semibold uppercase tracking-wider">
              5-Round Breakdown
            </div>
            <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
              {scores.map((s, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-lg text-center border ${
                    s === bestScore
                      ? 'bg-green-500/15 border-green-500/40 text-green-300'
                      : 'bg-dark-800/60 border-dark-700/60 text-dark-200'
                  }`}
                >
                  <div className="text-[10px] text-dark-400 uppercase font-bold">#{idx + 1}</div>
                  <div className="text-xs sm:text-sm font-bold tabular-nums">{s} ms</div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Bell Curve / Distribution Graph */}
          <ScoreDistributionGraph score={finalAverage} />
        </EnhancedResultCard>
      </div>
    );
  }

  // Interactive Test Box States
  const getStateConfig = () => {
    switch (state) {
      case TEST_STATES.IDLE:
        return {
          bg: 'bg-gradient-to-br from-dark-800 to-dark-900',
          border: 'border-dark-700 hover:border-green-500/50',
          icon: <Zap size={56} className="text-green-500 mb-3" />,
          title: 'Click Anywhere to Start',
          message: 'When the red box turns green, click as fast as you can.',
          submessage: '5 rounds • Instant millisecond reflex benchmark',
          textColor: 'text-white',
          cursor: 'cursor-pointer',
        };
      case TEST_STATES.WAITING:
        return {
          bg: 'bg-gradient-to-br from-red-600 to-rose-700',
          border: 'border-red-400',
          icon: <Clock size={56} className="text-white mb-3 animate-pulse" />,
          title: 'Wait for green...',
          message: 'Hold your finger or mouse steady.',
          submessage: `Round ${scores.length + 1} of ${TOTAL_ROUNDS}`,
          textColor: 'text-white',
          cursor: 'cursor-pointer',
        };
      case TEST_STATES.READY:
        return {
          bg: 'bg-gradient-to-br from-green-500 to-emerald-600',
          border: 'border-green-300',
          icon: <Zap size={64} className="text-white mb-3 animate-pulse" />,
          title: 'CLICK NOW!',
          message: '',
          submessage: '',
          textColor: 'text-white',
          cursor: 'cursor-pointer',
          glow: 'shadow-2xl shadow-green-500/60',
        };
      case TEST_STATES.TRIAL_RESULT:
        return {
          bg: 'bg-gradient-to-br from-dark-850 to-dark-900',
          border: 'border-green-500/40',
          icon: <Zap size={48} className="text-green-400 mb-2" />,
          title: `${currentScore} ms`,
          message: `Attempt ${scores.length} of ${TOTAL_ROUNDS} complete`,
          submessage: 'Click or press Space to continue to the next round →',
          textColor: 'text-green-400',
          cursor: 'cursor-pointer',
        };
      case TEST_STATES.FALSE_START:
        return {
          bg: 'bg-gradient-to-br from-orange-600/90 to-red-700/90',
          border: 'border-orange-400',
          icon: <AlertCircle size={56} className="text-white mb-3" />,
          title: 'Too Early!',
          message: 'You clicked while the screen was still red.',
          submessage: 'Click or press Space to try this round again',
          textColor: 'text-white',
          cursor: 'cursor-pointer',
        };
      default:
        return {};
    }
  };

  const config = getStateConfig();

  const ariaLabel = {
    [TEST_STATES.IDLE]: 'Start reaction time test. Press space or enter, then react when the screen turns green.',
    [TEST_STATES.WAITING]: 'Wait for the green signal, then press space or enter as fast as you can.',
    [TEST_STATES.READY]: 'React now! Press space or enter immediately.',
    [TEST_STATES.TRIAL_RESULT]: `Score ${currentScore} milliseconds. Press space or click to continue.`,
    [TEST_STATES.FALSE_START]: 'False start. Press space or click to try again.',
  }[state];

  return (
    <div className="w-full">
      {/* Progress header pills */}
      <div className="flex items-center justify-between mb-3 px-1 text-xs text-dark-400">
        <div className="flex items-center gap-1.5 sm:gap-2">
          {Array.from({ length: TOTAL_ROUNDS }).map((_, i) => (
            <span
              key={i}
              className={`inline-flex items-center justify-center w-6 h-6 rounded-md font-bold text-[11px] transition-all ${
                i < scores.length
                  ? 'bg-green-500/20 border border-green-500/40 text-green-400'
                  : i === scores.length && state !== TEST_STATES.IDLE
                  ? 'bg-blue-500/20 border border-blue-500/50 text-blue-300 animate-pulse'
                  : 'bg-dark-800 border border-dark-700 text-dark-500'
              }`}
            >
              {i + 1}
            </span>
          ))}
          <span className="ml-1 font-semibold text-dark-300">
            {scores.length === 0 ? '5-Attempt Benchmark' : `Attempt ${Math.min(scores.length + 1, TOTAL_ROUNDS)} of ${TOTAL_ROUNDS}`}
          </span>
        </div>

        {refreshRate && (
          <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-dark-900 border border-dark-800 text-[11px] text-dark-400">
            <Monitor size={12} className="text-green-400" />
            <span>{refreshRate.label}</span>
          </div>
        )}
      </div>

      {/* Main Interactive Touch Area */}
      <div
        role="button"
        tabIndex={0}
        aria-label={ariaLabel}
        aria-live="polite"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={`
          relative overflow-hidden
          ${config.bg} ${config.border} ${config.cursor}
          border-2 rounded-xl sm:rounded-2xl p-6 sm:p-10 md:p-16
          transition-all duration-150
          flex flex-col items-center justify-center
          min-h-[300px] sm:min-h-[380px] md:min-h-[440px]
          ${config.glow || ''}
          select-none touch-manipulation
          focus:outline-none focus-visible:ring-4 focus-visible:ring-green-500/50
        `}
      >
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 text-center px-2 sm:px-4">
          {challengeTarget && state === TEST_STATES.IDLE && (
            <div className="mb-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-300 text-xs sm:text-sm font-semibold">
              <Target size={14} /> Challenge: Beat {challengeTarget} ms!
            </div>
          )}

          <div className="flex justify-center">{config.icon}</div>

          <p className={`text-3xl sm:text-4xl md:text-5xl font-bold ${config.textColor} mb-2 leading-tight`}>
            {config.title}
          </p>

          {config.message && (
            <p className="text-base sm:text-lg md:text-xl text-dark-200 mb-2 max-w-lg mx-auto">
              {config.message}
            </p>
          )}

          {config.submessage && (
            <p className="text-xs sm:text-sm text-dark-300 mt-2">
              {config.submessage}
            </p>
          )}

          {state === TEST_STATES.TRIAL_RESULT && (
            <div className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 bg-green-500 text-dark-950 font-bold rounded-lg shadow-lg hover:bg-green-400 transition-all text-sm">
              <span>Next Attempt</span>
              <ArrowRight size={16} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReactionTestArea;
