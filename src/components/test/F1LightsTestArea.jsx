import React, { useState, useEffect, useRef } from 'react';
import { Play, Zap, AlertCircle, RotateCcw } from 'lucide-react';
import EnhancedResultCard from '../EnhancedResultCard';
import {
  getF1ReactionLevel,
  getReactionTimePercentile,
  getF1Motivation,
  getComparisonMessage,
  generateShareMessage,
  getSuggestedTests,
} from '../../utils/scoreUtils';

const PHASES = {
  IDLE: 'idle',
  SEQUENCE: 'sequence', // columns lighting up, one per second
  ARMED: 'armed', // all five lit — waiting for lights out
  GO: 'go', // lights out — react now
  RESULT: 'result',
  FALSE_START: 'falseStart',
};

const COLUMNS = [0, 1, 2, 3, 4]; // 5 light columns on the gantry
const ROWS = [0, 1]; // 2 stacked bulbs per column (real F1 layout)
const STEP_MS = 1000; // one column lights per second
const MIN_HOLD_MS = 200; // shortest hold before lights out
const MAX_HOLD_MS = 3000; // longest hold before lights out

/**
 * The Formula 1 start gantry. `lightsStep` (0-5) drives how many columns are lit;
 * each lit column shows both of its bulbs in glowing red, exactly like the real
 * five-light gantry above the grid.
 */
const LightGantry = ({ lightsStep }) => (
  <div className="w-full max-w-3xl mx-auto select-none" aria-hidden="true">
    {/* Mounting rail on top of the gantry */}
    <div className="mx-auto h-3 w-2/3 rounded-t-md border-x-2 border-t-2 border-dark-600 bg-gradient-to-b from-dark-600 to-dark-700" />

    {/* Metal housing */}
    <div className="rounded-2xl border-4 border-dark-600 bg-gradient-to-b from-dark-700 via-dark-800 to-dark-900 p-3 sm:p-5 shadow-2xl shadow-black/60">
      <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6">
        {COLUMNS.map((col) => {
          const lit = col < lightsStep;
          return (
            <div
              key={col}
              className="flex flex-col gap-2 sm:gap-3 rounded-xl border-2 border-dark-600 bg-black/60 p-1.5 sm:p-2.5 shadow-inner"
            >
              {ROWS.map((row) => (
                <div
                  key={row}
                  className={`h-8 w-8 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-full border-2 transition-all duration-150 ${
                    lit
                      ? 'bg-red-500 border-red-400 shadow-[0_0_30px_rgba(239,68,68,0.8)]'
                      : 'bg-dark-950 border-dark-700'
                  }`}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>

    {/* Support legs */}
    <div className="flex justify-between px-8 sm:px-14">
      <div className="h-5 w-2 sm:w-3 rounded-b bg-gradient-to-b from-dark-600 to-dark-800" />
      <div className="h-5 w-2 sm:w-3 rounded-b bg-gradient-to-b from-dark-600 to-dark-800" />
    </div>
  </div>
);

const F1LightsTestArea = ({ onResult }) => {
  const [phase, setPhase] = useState(PHASES.IDLE);
  const [lightsStep, setLightsStep] = useState(0); // 0-5 columns lit
  const [reactionTime, setReactionTime] = useState(null);

  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
  const lightsOutAtRef = useRef(0);

  const clearTimers = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  // Cleanup any pending interval/timeout on unmount
  useEffect(() => clearTimers, []);

  const isPlayable =
    phase === PHASES.SEQUENCE || phase === PHASES.ARMED || phase === PHASES.GO;

  const startTest = () => {
    clearTimers();
    setReactionTime(null);
    setLightsStep(0);
    setPhase(PHASES.SEQUENCE);

    let step = 0;
    intervalRef.current = setInterval(() => {
      step += 1;
      setLightsStep(step);

      if (step >= COLUMNS.length) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setPhase(PHASES.ARMED);

        // Random hold between 200ms and 3000ms, then LIGHTS OUT
        const hold = MIN_HOLD_MS + Math.random() * (MAX_HOLD_MS - MIN_HOLD_MS);
        timeoutRef.current = setTimeout(() => {
          setLightsStep(0);
          lightsOutAtRef.current = performance.now();
          setPhase(PHASES.GO);
        }, hold);
      }
    }, STEP_MS);
  };

  const retry = () => {
    clearTimers();
    setPhase(PHASES.IDLE);
    setLightsStep(0);
    setReactionTime(null);
  };

  const handlePress = () => {
    if (phase === PHASES.SEQUENCE || phase === PHASES.ARMED) {
      // Jumped the start while at least one red light was still on
      clearTimers();
      setPhase(PHASES.FALSE_START);
      if (onResult) onResult({ falseStart: true, reactionTime: null });
    } else if (phase === PHASES.GO) {
      const reaction = Math.round(performance.now() - lightsOutAtRef.current);
      setReactionTime(reaction);
      setPhase(PHASES.RESULT);
      if (onResult) onResult({ falseStart: false, reactionTime: reaction });
    }
  };

  // Space/Enter anywhere while the run is live — keeps the test keyboard-playable
  // even though the Start button unmounts once the sequence begins.
  useEffect(() => {
    if (!isPlayable) return undefined;
    const onKey = (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handlePress();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isPlayable, phase]);

  return (
    <div
      role={isPlayable ? 'button' : undefined}
      tabIndex={isPlayable ? 0 : undefined}
      aria-label={
        isPlayable
          ? 'F1 start gantry. Press anywhere the instant all five red lights go out.'
          : undefined
      }
      aria-live="polite"
      onClick={handlePress}
      className={`
        relative overflow-hidden
        border-2 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12
        transition-colors duration-200
        flex flex-col items-center justify-center
        min-h-[500px] sm:min-h-[600px] md:min-h-[700px]
        select-none touch-manipulation
        focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-500/50
        ${isPlayable ? 'cursor-pointer' : ''}
        ${
          phase === PHASES.GO
            ? 'bg-gradient-to-br from-green-900/40 to-dark-950 border-green-500/40'
            : 'bg-gradient-to-br from-dark-900 to-dark-950 border-dark-800'
        }
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl px-2 text-center">
        {/* ---------- IDLE ---------- */}
        {phase === PHASES.IDLE && (
          <div className="space-y-6">
            <LightGantry lightsStep={0} />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              F1 Start Gantry
            </h2>
            <p className="text-base sm:text-lg text-dark-300 max-w-2xl mx-auto">
              Five red lights come on, one per second. When they all go out — react.
            </p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                startTest();
              }}
              className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-bold rounded-lg sm:rounded-xl transition-all shadow-lg shadow-red-500/30 text-base sm:text-lg touch-manipulation min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
            >
              <Play size={20} className="sm:w-6 sm:h-6" />
              <span>Start Engine</span>
            </button>
          </div>
        )}

        {/* ---------- LIGHTS COMING ON / ALL LIT ---------- */}
        {(phase === PHASES.SEQUENCE || phase === PHASES.ARMED) && (
          <div className="space-y-6 sm:space-y-8">
            <LightGantry lightsStep={lightsStep} />
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-red-400 animate-pulse">
              {phase === PHASES.SEQUENCE ? 'Lights coming on…' : 'Wait for it…'}
            </div>
            <p className="text-dark-400 text-xs sm:text-sm">
              Don&apos;t go yet — reacting while a light is on is a false start
            </p>
          </div>
        )}

        {/* ---------- LIGHTS OUT — GO! ---------- */}
        {phase === PHASES.GO && (
          <div className="space-y-6 sm:space-y-8">
            <LightGantry lightsStep={0} />
            <Zap size={56} className="sm:w-16 sm:h-16 mx-auto text-green-400 animate-pulse" />
            <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-green-400 animate-pulse">
              GO!
            </div>
            <p className="text-green-300 text-base sm:text-lg font-semibold">
              Tap anywhere — now!
            </p>
          </div>
        )}

        {/* ---------- RESULT ---------- */}
        {phase === PHASES.RESULT && (
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
              shareMessage={generateShareMessage(
                'F1 Lights Reaction Test',
                `${reactionTime}ms`,
                getF1ReactionLevel(reactionTime).name
              )}
            />
          </div>
        )}

        {/* ---------- FALSE START ---------- */}
        {phase === PHASES.FALSE_START && (
          <div className="space-y-5 sm:space-y-6">
            {/* Lights stay frozen where they were, so the mistake is obvious */}
            <LightGantry lightsStep={lightsStep} />
            <AlertCircle size={56} className="sm:w-16 sm:h-16 mx-auto text-orange-500" />
            <div className="space-y-2">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-500">
                False Start!
              </div>
              <p className="text-base sm:text-lg text-dark-300">
                You went while the lights were still on.
              </p>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg sm:rounded-xl p-3 sm:p-4 max-w-md mx-auto">
              <p className="text-sm text-dark-300">
                In Formula 1 this triggers the jump-start sensors and a time penalty. Wait for all
                five lights to go out before you react.
              </p>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                retry();
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-colors touch-manipulation min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
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
