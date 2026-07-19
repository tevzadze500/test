import React, { useState, useRef, useEffect } from 'react';
import { Target, Play, RotateCcw } from 'lucide-react';

const TRIALS = 5;
const TARGET = 0.85; // target line position (fraction of track)
const OCCLUDE = 0.55; // marker becomes hidden after this fraction — you must anticipate
const MISS_PENALTY = 500; // ms error applied if you never click

/**
 * Coincidence-anticipation timing test. A marker travels at constant speed
 * toward a target line, then disappears partway — you must press exactly when
 * it would reach the line. Score is timing accuracy across several trials.
 * rAF + timers live in refs/handlers, so this is safe to server-render (SSG).
 */
const AnticipationTestArea = ({ onResult }) => {
  const [phase, setPhase] = useState('idle'); // idle | running | feedback | done
  const [pos, setPos] = useState(0);
  const [trial, setTrial] = useState(0);
  const [lastError, setLastError] = useState(null); // signed ms (+late / -early)
  const [finalScore, setFinalScore] = useState(null);
  const [avgError, setAvgError] = useState(null);

  const rafRef = useRef(null);
  const startRef = useRef(0);
  const durRef = useRef(2000);
  const clickedRef = useRef(false);
  const errorsRef = useRef([]);
  const feedbackTimer = useRef(null);

  const stopRaf = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  };
  useEffect(() => () => { stopRaf(); if (feedbackTimer.current) clearTimeout(feedbackTimer.current); }, []);

  const finish = () => {
    const errs = errorsRef.current.map((e) => Math.abs(e));
    const avg = Math.round(errs.reduce((a, b) => a + b, 0) / errs.length);
    const score = Math.max(0, Math.min(100, Math.round(100 - avg / 5)));
    setAvgError(avg);
    setFinalScore(score);
    setPhase('done');
    if (onResult) onResult(score);
  };

  const registerError = (signedErr) => {
    stopRaf();
    errorsRef.current.push(signedErr);
    setLastError(signedErr);
    setPhase('feedback');
    feedbackTimer.current = setTimeout(() => {
      if (errorsRef.current.length >= TRIALS) {
        finish();
      } else {
        setTrial((t) => t + 1);
        startTrial();
      }
    }, 1200);
  };

  const startTrial = () => {
    stopRaf(); if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    clickedRef.current = false;
    durRef.current = 1600 + Math.random() * 900;
    startRef.current = performance.now();
    setPos(0);
    setLastError(null);
    setPhase('running');
    const tick = (now) => {
      const elapsed = now - startRef.current;
      const p = elapsed / durRef.current;
      if (p >= 1) {
        setPos(1);
        if (!clickedRef.current) registerError(MISS_PENALTY);
        return;
      }
      setPos(p);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const startGame = () => {
    errorsRef.current = [];
    setTrial(0);
    setFinalScore(null);
    setAvgError(null);
    startTrial();
  };

  const handlePress = () => {
    if (phase !== 'running' || clickedRef.current) return;
    clickedRef.current = true;
    const elapsed = performance.now() - startRef.current;
    const targetTime = TARGET * durRef.current;
    registerError(Math.round(elapsed - targetTime));
  };

  const handleKeyDown = (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      if (phase === 'running') handlePress();
    }
  };

  // ----- DONE screen -----
  if (phase === 'done') {
    const rating =
      finalScore >= 90 ? { name: 'Elite timing', color: 'text-purple-400' }
      : finalScore >= 80 ? { name: 'Excellent', color: 'text-green-400' }
      : finalScore >= 65 ? { name: 'Good', color: 'text-blue-400' }
      : finalScore >= 50 ? { name: 'Average', color: 'text-yellow-400' }
      : { name: 'Keep practicing', color: 'text-orange-400' };
    return (
      <div className="bg-gradient-to-br from-dark-800 to-dark-900 border-2 border-green-500/40 rounded-xl sm:rounded-2xl p-8 sm:p-12 min-h-[400px] sm:min-h-[520px] flex flex-col items-center justify-center text-center">
        <Target size={56} className="text-green-500 mb-4" />
        <p className="text-dark-400 text-sm mb-2">Your anticipation accuracy</p>
        <div className="text-6xl sm:text-7xl font-bold text-white mb-2">{finalScore}<span className="text-2xl text-dark-400 ml-1">%</span></div>
        <div className={`text-lg font-semibold mb-1 ${rating.color}`}>{rating.name}</div>
        <p className="text-dark-400 text-sm mb-8">Avg. timing error: {avgError} ms over {TRIALS} trials</p>
        <button type="button" onClick={startGame} className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-lg text-white font-bold transition-colors min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400">
          <RotateCcw size={18} /> Try Again
        </button>
      </div>
    );
  }

  const markerHidden = phase === 'running' && pos > OCCLUDE;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Anticipation test. Press the moment the marker reaches the target line."
      aria-live="polite"
      onClick={handlePress}
      onKeyDown={handleKeyDown}
      className="relative overflow-hidden bg-gradient-to-br from-dark-800 to-dark-900 border-2 border-dark-700 rounded-xl sm:rounded-2xl p-6 sm:p-10 min-h-[400px] sm:min-h-[520px] flex flex-col items-center justify-center select-none touch-manipulation focus:outline-none focus-visible:ring-4 focus-visible:ring-green-500/50 cursor-pointer"
    >
      {/* Status line */}
      <div className="mb-8 text-center h-14">
        {phase === 'idle' && <p className="text-dark-300 text-lg">Press when the marker reaches the line — even after it vanishes</p>}
        {phase === 'running' && <p className="text-green-400 text-xl font-semibold">Trial {trial + 1} / {TRIALS} — get ready…</p>}
        {phase === 'feedback' && lastError != null && (
          <p className={`text-2xl font-bold ${Math.abs(lastError) < 40 ? 'text-green-400' : 'text-yellow-400'}`}>
            {Math.abs(lastError) < 40 ? 'Perfect!' : lastError > 0 ? `Too late by ${Math.abs(lastError)} ms` : `Too early by ${Math.abs(lastError)} ms`}
          </p>
        )}
      </div>

      {/* Track */}
      <div className="relative w-full max-w-xl h-16 bg-dark-950/60 border border-dark-700 rounded-full">
        {/* Occlusion shade after the hide point */}
        <div className="absolute top-0 bottom-0 rounded-r-full bg-dark-900/70" style={{ left: `${OCCLUDE * 100}%`, right: 0 }} />
        {/* Target line */}
        <div className="absolute top-[-8px] bottom-[-8px] w-1.5 bg-green-500 rounded-full" style={{ left: `${TARGET * 100}%` }} />
        <div className="absolute -top-7 text-xs text-green-400 font-semibold" style={{ left: `calc(${TARGET * 100}% - 14px)` }}>HERE</div>
        {/* Marker */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-rose-600 shadow-lg shadow-red-500/40 transition-opacity duration-150 ${markerHidden ? 'opacity-0' : 'opacity-100'}`}
          style={{ left: `${pos * 100}%` }}
        />
      </div>

      {phase === 'idle' && (
        <button type="button" onClick={(e) => { e.stopPropagation(); startGame(); }} className="mt-10 inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-xl text-white font-bold transition-colors min-h-[52px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400">
          <Play size={20} /> Start Test
        </button>
      )}
      {(phase === 'running' || phase === 'feedback') && (
        <p className="mt-10 text-sm text-dark-400">Click anywhere (or press Space) at the right moment</p>
      )}
    </div>
  );
};

export default AnticipationTestArea;
