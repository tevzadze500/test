import React, { useState, useEffect, useRef } from 'react';
import { Zap, Clock, AlertCircle } from 'lucide-react';
import EnhancedResultCard from '../EnhancedResultCard';
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
  RESULT: 'result',
  FALSE_START: 'falseStart',
};

const ReactionTestArea = ({ onResult }) => {
  const [state, setState] = useState(TEST_STATES.IDLE);
  const [reactionTime, setReactionTime] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const timeoutRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
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
    setReactionTime(null);

    // Random delay between 1.5 and 4 seconds
    const delay = 1500 + Math.random() * 2500;

    timeoutRef.current = setTimeout(() => {
      setState(TEST_STATES.READY);
      startTimeRef.current = Date.now();
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
      // Calculate reaction time
      const endTime = Date.now();
      const reaction = endTime - startTimeRef.current;
      setReactionTime(reaction);
      setState(TEST_STATES.RESULT);
      
      // Notify parent component
      if (onResult) {
        onResult(reaction);
      }
    } else if (state === TEST_STATES.RESULT || state === TEST_STATES.FALSE_START) {
      // Reset for next attempt
      setState(TEST_STATES.IDLE);
      setReactionTime(null);
    }
  };

  const getStateConfig = () => {
    switch (state) {
      case TEST_STATES.IDLE:
        return {
          bg: 'bg-gradient-to-br from-dark-800 to-dark-900',
          border: 'border-dark-700',
          icon: <Zap size={64} className="text-green-500 mb-4" />,
          title: 'Reaction Time Test',
          message: 'Click anywhere to start',
          submessage: 'Wait for the green signal, then click as fast as you can',
          textColor: 'text-white',
          cursor: 'cursor-pointer',
          hover: 'hover:border-green-500/50 hover:bg-gradient-to-br hover:from-dark-800 hover:to-dark-850',
        };
      case TEST_STATES.WAITING:
        return {
          bg: 'bg-gradient-to-br from-red-500/10 to-red-600/10',
          border: 'border-red-500/30',
          icon: <Clock size={64} className="text-red-500 mb-4 animate-pulse" />,
          title: 'Wait for it...',
          message: 'Stay focused',
          submessage: 'Click when the color changes to green',
          textColor: 'text-red-400',
          cursor: 'cursor-pointer',
          hover: '',
        };
      case TEST_STATES.READY:
        return {
          bg: 'bg-gradient-to-br from-green-500 to-emerald-600',
          border: 'border-green-400',
          icon: <Zap size={64} className="text-white mb-4 animate-pulse" />,
          title: 'CLICK NOW!',
          message: '',
          submessage: '',
          textColor: 'text-white',
          cursor: 'cursor-pointer',
          hover: '',
          glow: 'shadow-2xl shadow-green-500/50',
        };
      case TEST_STATES.RESULT:
        // Enhanced result will be rendered separately
        return null;
      case TEST_STATES.FALSE_START:
        return {
          bg: 'bg-gradient-to-br from-orange-500/10 to-red-600/10',
          border: 'border-orange-500/30',
          icon: <AlertCircle size={64} className="text-orange-500 mb-4" />,
          title: 'Too Early!',
          message: 'Wait for the green signal',
          submessage: 'Click to try again',
          textColor: 'text-orange-400',
          cursor: 'cursor-pointer',
          hover: 'hover:border-orange-500/50',
        };
      default:
        return {};
    }
  };

  const handleRetry = () => {
    setState(TEST_STATES.IDLE);
    setReactionTime(null);
  };

  const config = getStateConfig();

  // Show enhanced result card for result state
  if (state === TEST_STATES.RESULT && reactionTime) {
    const level = getReactionTimeLevel(reactionTime);
    const percentile = getReactionTimePercentile(reactionTime);
    const motivation = getReactionTimeMotivation(reactionTime, null);
    const comparisonMessage = getComparisonMessage(percentile);
    const shareMessage = generateShareMessage('Reaction Time Test', `${reactionTime}ms`, level.name);
    const suggestedTests = getSuggestedTests('reaction-time');

    return (
      <EnhancedResultCard
        score={reactionTime}
        scoreLabel="ms"
        level={level}
        percentile={percentile}
        motivation={motivation}
        comparisonMessage={comparisonMessage}
        onRetry={handleRetry}
        testId="reaction-time"
        suggestedTests={suggestedTests}
        shareMessage={shareMessage}
      />
    );
  }

  // Don't render anything if config is null (result state handled above)
  if (!config) return null;

  return (
    <div
      onClick={handleClick}
      className={`
        relative overflow-hidden
        ${config.bg} ${config.border} ${config.cursor} ${config.hover}
        border-2 rounded-xl sm:rounded-2xl p-8 sm:p-12 md:p-20
        transition-all duration-200
        flex flex-col items-center justify-center
        min-h-[400px] sm:min-h-[500px] md:min-h-[600px]
        ${config.glow || ''}
        select-none touch-manipulation
      `}
    >
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        {config.icon}
        <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold ${config.textColor} mb-2 sm:mb-3`}>
          {config.title}
        </h2>
        {config.message && (
          <p className="text-lg sm:text-xl md:text-2xl text-dark-300 mb-2">
            {config.message}
          </p>
        )}
        {config.submessage && (
          <p className="text-sm md:text-base text-dark-400 mt-3 sm:mt-4">
            {config.submessage}
          </p>
        )}
      </div>

      {/* State Indicator (bottom) */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
        {Object.values(TEST_STATES).slice(0, 4).map((s, i) => (
          <div
            key={s}
            className={`
              w-2 h-2 rounded-full transition-all duration-300
              ${state === s ? 'bg-green-500 w-8' : 'bg-dark-700'}
            `}
          />
        ))}
      </div>
    </div>
  );
};

export default ReactionTestArea;
