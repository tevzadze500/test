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
  IDLE: 'idle', // step 0 — everything off
  CASCADE: 'cascade', // steps 1-3 — red rows light up one by one, top to bottom
  TENSION: 'tension', // step 4 — three reds lit, random hold running
  GO: 'go', // step 5 — reds out, green on, timer running
  RESULT: 'result',
  FALSE_START: 'falseStart',
};

const COLUMNS = [0, 1, 2, 3, 4]; // 5 columns
const ROWS = [0, 1, 2, 3]; // 4 lights stacked per column
const RED_ROWS = 3; // top three rows are the red staging lights
const GREEN_ROW = 3; // bottom row is the green GO light
const CASCADE_MS = 500; // exactly 500ms between each red row
const MIN_HOLD_MS = 500; // shortest tension hold
const MAX_HOLD_MS = 2500; // longest tension hold

/**
 * Drag-racing style light tower: 5 columns x 4 stacked lights (20 total).
 * `redRows` (0-3) says how many red rows are lit — they cascade downward —
 * and `greenOn` lights the bottom row, which is the GO signal.
 */
const LightTower = ({ redRows, greenOn }) => (
  <div className="w-full max-w-3xl mx-auto select-none" aria-hidden="true">
    {/* Mounting rail */}
    <div className="mx-auto h-3 w-2/3 rounded-t-md border-x-2 border-t-2 border-dark-600 bg-gradient-to-b from-dark-600 to-dark-700" />

    {/* Metal housing */}
    <div className="rounded-2xl border-4 border-dark-600 bg-gradient-to-b from-dark-700 via-dark-800 to-dark-900 p-3 sm:p-5 shadow-2xl shadow-black/60">
      <div className="flex items-start justify-center gap-2 sm:gap-4 md:gap-6">
        {COLUMNS.map((col) => (
          <div
            key={col}
            className="flex flex-col gap-2 sm:gap-3 rounded-xl border-2 border-dark-600 bg-black/60 p-1.5 sm:p-2.5 shadow-inner"
          >
            {ROWS.map((row) => {
              const isGreenRow = row === GREEN_ROW;
              const lit = isGreenRow ? greenOn : row < redRows;
              let tone = 'bg-dark-950 border-dark-700';
              if (lit && isGreenRow) {
                tone = 'bg-green-500 border-green-400 shadow-[0_0_35px_rgba(34,197,94,0.9)]';
              } else if (lit) {
                tone = 'bg-red-500 border-red-400 shadow-[0_0_30px_rgba(239,68,68,0.8)]';
              }
              return (
                <div
                  key={row}
                  className={`h-7 w-7 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full border-2 transition-all duration-100 ${tone}`}
                />
              );
            })}
          </div>
        ))}
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
  const [redRows, setRedRows] = useState(0); // 0-3 red rows currently lit
  const [reactionTime, setReactionTime] = useState(null);

  const goAtRef = useRef(0);

  /**
   * Drives the whole sequence. Every branch returns its own cleanup, so changing
   * phase (retry, false start) or unmounting always cancels the pending timer —
   * no stale callback can fire into the next run.
   */
  useEffect(() => {
    if (phase === PHASES.CASCADE) {
      // Steps 1-3: light the next red row every 500ms, then move to the tension hold
      if (redRows >= RED_ROWS) {
        setPhase(PHASES.TENSION);
        return undefined;
      }
      const t = setTimeout(() => setRedRows((r) => r + 1), CASCADE_MS);
      return () => clearTimeout(t);
    }

    if (phase === PHASES.TENSION) {
      // Step 4: random hold, then GO
      const hold = MIN_HOLD_MS + Math.random() * (MAX_HOLD_MS - MIN_HOLD_MS);
      const t = setTimeout(() => {
        goAtRef.current = performance.now();
        setPhase(PHASES.GO); // Step 5: reds out, green on
      }, hold);
      return () => clearTimeout(t);
    }

    return undefined;
  }, [phase, redRows]);

  const isPlayable =
    phase === PHASES.CASCADE || phase === PHASES.TENSION || phase === PHASES.GO;

  const startTest = () => {
    setReactionTime(null);
    setRedRows(1); // Step 1: the top row lights immediately
    setPhase(PHASES.CASCADE);
  };

  const retry = () => {
    setPhase(PHASES.IDLE);
    setRedRows(0);
    setReactionTime(null);
  };

  const handlePress = () => {
    if (phase === PHASES.CASCADE || phase === PHASES.TENSION) {
      // Steps 1-4: went before the green light appeared
      setPhase(PHASES.FALSE_START);
      if (onResult) onResult({ falseStart: true, reactionTime: null });
    } else if (phase === PHASES.GO) {
      const reaction = Math.round(performance.now() - goAtRef.current);
      setReactionTime(reaction);
      setPhase(PHASES.RESULT);
      if (onResult) onResult({ falseStart: false, reactionTime: reaction });
    }
  };

  // Space/Enter anywhere while a run is live — keeps the test keyboard-playable
  // even though the Start button unmounts once the run begins.
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

  const greenOn = phase === PHASES.GO;
  // Reds show during the cascade/tension and stay frozen on a false start
  const litRedRows =
    phase === PHASES.CASCADE || phase === PHASES.TENSION || phase === PHASES.FALSE_START
      ? redRows
      : 0;

  return (
    <div
      role={isPlayable ? 'button' : undefined}
      tabIndex={isPlayable ? 0 : undefined}
      aria-label={
        isPlayable
          ? 'Reaction light tower. Press anywhere the instant the green lights come on.'
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
            <LightTower redRows={0} greenOn={false} />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              Reaction Light Tower
            </h2>
            <p className="text-base sm:text-lg text-dark-300 max-w-2xl mx-auto">
              Three red lights drop one by one. The instant they switch to{' '}
              <span className="text-green-400 font-semibold">green</span> — react.
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

        {/* ---------- CASCADE + TENSION ---------- */}
        {(phase === PHASES.CASCADE || phase === PHASES.TENSION) && (
          <div className="space-y-6 sm:space-y-8">
            <LightTower redRows={litRedRows} greenOn={false} />
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-red-400 animate-pulse">
              {phase === PHASES.CASCADE ? 'Staging…' : 'Wait for green…'}
            </div>
            <p className="text-dark-400 text-xs sm:text-sm">
              Don&apos;t go yet — reacting while the lights are red is a false start
            </p>
          </div>
        )}

        {/* ---------- GO ---------- */}
        {phase === PHASES.GO && (
          <div className="space-y-6 sm:space-y-8">
            <LightTower redRows={0} greenOn />
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
            {/* Reds stay frozen where they were, so the mistake is obvious */}
            <LightTower redRows={litRedRows} greenOn={false} />
            <AlertCircle size={56} className="sm:w-16 sm:h-16 mx-auto text-orange-500" />
            <div className="space-y-2">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-500">
                False Start!
              </div>
              <p className="text-base sm:text-lg text-dark-300">
                You went while the lights were still red.
              </p>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg sm:rounded-xl p-3 sm:p-4 max-w-md mx-auto">
              <p className="text-sm text-dark-300">
                Wait for the green lights before you react — anticipating the start is penalised in
                real racing.
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
