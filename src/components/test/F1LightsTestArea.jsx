import React, { useState, useEffect, useRef } from 'react';
import { Play, Zap, AlertCircle, RotateCcw } from 'lucide-react';
import EnhancedResultCard from '../EnhancedResultCard';
import { 
  getF1ReactionLevel, 
  getReactionTimePercentile, 
  getF1Motivation,
  getComparisonMessage,
  generateShareMessage,
  getSuggestedTests
} from '../../utils/scoreUtils';

const TEST_STATES = {
  INTRO: 'intro',
  LIGHTING_SEQUENCE: 'lightingSequence',
  ALL_LIT: 'allLit',
  LIGHTS_OUT: 'lightsOut',
  RESULT: 'result',
  FALSE_START: 'falseStart',
};

const F1LightsTestArea = ({ onResult }) => {
  const [state, setState] = useState(TEST_STATES.INTRO);
  const [activeLights, setActiveLights] = useState(0);
  const [reactionTime, setReactionTime] = useState(null);
  const [lightsOutTime, setLightsOutTime] = useState(null);
  
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const startTest = () => {
    setState(TEST_STATES.LIGHTING_SEQUENCE);
    setActiveLights(0);
    setReactionTime(null);
    
    // Light up sequence: 1 light every 500ms
    let lightCount = 0;
    intervalRef.current = setInterval(() => {
      lightCount++;
      setActiveLights(lightCount);
      
      if (lightCount >= 5) {
        clearInterval(intervalRef.current);
        setState(TEST_STATES.ALL_LIT);
        
        // Random delay before lights out (1-4 seconds)
        const delay = 1000 + Math.random() * 3000;
        
        timeoutRef.current = setTimeout(() => {
          setState(TEST_STATES.LIGHTS_OUT);
          setActiveLights(0);
          setLightsOutTime(performance.now());
        }, delay);
      }
    }, 500);
  };

  const handleClick = () => {
    if (state === TEST_STATES.INTRO) {
      // Start button will handle this
      return;
    }
    
    if (state === TEST_STATES.LIGHTING_SEQUENCE || state === TEST_STATES.ALL_LIT) {
      // False start - clicked before lights went out
      clearInterval(intervalRef.current);
      clearTimeout(timeoutRef.current);
      setState(TEST_STATES.FALSE_START);
      
      if (onResult) {
        onResult({ falseStart: true, reactionTime: null });
      }
    } else if (state === TEST_STATES.LIGHTS_OUT) {
      // Valid click - calculate reaction time
      const endTime = performance.now();
      const reaction = Math.round(endTime - lightsOutTime);
      setReactionTime(reaction);
      setState(TEST_STATES.RESULT);
      
      if (onResult) {
        onResult({ falseStart: false, reactionTime: reaction });
      }
    }
  };

  const retry = () => {
    setState(TEST_STATES.INTRO);
    setActiveLights(0);
    setReactionTime(null);
  };


  return (
    <div
      onClick={handleClick}
      className={`
        relative overflow-hidden
        bg-gradient-to-br from-dark-900 to-dark-950
        border-2 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12
        transition-all duration-200
        flex flex-col items-center justify-center
        min-h-[500px] sm:min-h-[600px] md:min-h-[700px]
        ${state !== TEST_STATES.INTRO && state !== TEST_STATES.RESULT && state !== TEST_STATES.FALSE_START ? 'cursor-pointer' : ''}
        select-none touch-manipulation
        ${state === TEST_STATES.LIGHTS_OUT ? 'bg-dark-950 border-dark-700' : 'border-dark-800'}
      `}
    >
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center w-full max-w-4xl px-4">
        {state === TEST_STATES.INTRO && (
          <div className="space-y-4 sm:space-y-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-2xl">
              <Play size={32} className="sm:w-10 sm:h-10 text-white ml-1" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              F1 Lights Reaction Test
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-dark-300 max-w-2xl mx-auto">
              Watch the red lights illuminate, then click the instant they go out
            </p>
            
            <div className="bg-dark-800/50 border border-dark-700 rounded-lg sm:rounded-xl p-4 sm:p-6 max-w-md mx-auto">
              <h3 className="text-white font-semibold mb-2 sm:mb-3 text-sm sm:text-base">How It Works</h3>
              <ol className="text-xs sm:text-sm text-dark-300 space-y-1.5 sm:space-y-2 text-left">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">1.</span>
                  <span>Five red lights will illuminate one by one</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">2.</span>
                  <span>Wait for all lights to go out</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">3.</span>
                  <span>Click immediately when they turn off</span>
                </li>
              </ol>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                startTest();
              }}
              className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-bold rounded-lg sm:rounded-xl transition-all shadow-lg shadow-red-500/30 text-base sm:text-lg touch-manipulation min-h-[48px]"
            >
              <Play size={20} className="sm:w-6 sm:h-6" />
              <span>Start Test</span>
            </button>
          </div>
        )}

        {(state === TEST_STATES.LIGHTING_SEQUENCE || state === TEST_STATES.ALL_LIT) && (
          <div className="space-y-6 sm:space-y-8">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-red-400 animate-pulse">
              {state === TEST_STATES.LIGHTING_SEQUENCE ? 'Get Ready...' : 'Wait for it...'}
            </div>
            
            {/* F1 Style Lights Panel */}
            <div className="flex justify-center gap-3 sm:gap-4 md:gap-6">
              {[1, 2, 3, 4, 5].map((light) => (
                <div
                  key={light}
                  className={`
                    w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full
                    transition-all duration-300
                    ${light <= activeLights
                      ? 'bg-red-500 shadow-[0_0_30px_rgba(239,68,68,0.8)] border-4 border-red-400'
                      : 'bg-dark-800 border-4 border-dark-700 opacity-40'
                    }
                  `}
                />
              ))}
            </div>

            <p className="text-dark-400 text-xs sm:text-sm">
              Don't click yet! Wait for the lights to go out
            </p>
          </div>
        )}

        {state === TEST_STATES.LIGHTS_OUT && (
          <div className="space-y-6 sm:space-y-8">
            <Zap size={64} className="sm:w-20 sm:h-20 mx-auto text-green-500 animate-pulse" />
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-green-500 animate-pulse">
              GO!
            </div>
            
            {/* Dark Lights Panel */}
            <div className="flex justify-center gap-3 sm:gap-4 md:gap-6">
              {[1, 2, 3, 4, 5].map((light) => (
                <div
                  key={light}
                  className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-dark-900 border-4 border-dark-800"
                />
              ))}
            </div>

            <p className="text-green-400 text-base sm:text-lg font-semibold">
              Click NOW!
            </p>
          </div>
        )}

        {state === TEST_STATES.RESULT && (
          <div className="w-full">
            <EnhancedResultCard
              score={reactionTime}
              scoreLabel="ms"
              level={getF1ReactionLevel(reactionTime)}
              percentile={getReactionTimePercentile(reactionTime)}
              motivation={getF1Motivation(reactionTime)}
              comparisonMessage={getComparisonMessage(getReactionTimePercentile(reactionTime))}
              onRetry={(e) => {
                if (e) e.stopPropagation();
                retry();
              }}
              testId="f1-reaction"
              suggestedTests={getSuggestedTests('f1-reaction')}
              shareMessage={generateShareMessage('F1 Lights Reaction Test', `${reactionTime}ms`, getF1ReactionLevel(reactionTime).name)}
            />
          </div>
        )}

        {state === TEST_STATES.FALSE_START && (
          <div className="space-y-4 sm:space-y-6">
            <AlertCircle size={64} className="sm:w-20 sm:h-20 mx-auto text-orange-500" />
            <div className="space-y-2">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-orange-500">
                False Start!
              </div>
              <p className="text-base sm:text-lg md:text-xl text-dark-300">
                You clicked too early! Wait for the lights to go out.
              </p>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg sm:rounded-xl p-3 sm:p-4 max-w-md mx-auto">
              <p className="text-sm text-dark-300">
                In F1, a false start results in a penalty. Wait for all five red lights to turn off before reacting!
              </p>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                retry();
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-colors touch-manipulation min-h-[48px]"
            >
              <RotateCcw size={20} />
              <span>Try Again</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default F1LightsTestArea;
