import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Ear, AlertCircle, RotateCcw } from 'lucide-react';

const STATES = {
  IDLE: 'idle',
  WAITING: 'waiting',
  READY: 'ready',
  RESULT: 'result',
  FALSE_START: 'falseStart',
};

const getRating = (ms) => {
  if (ms < 180) return { name: 'Elite', color: 'text-green-400' };
  if (ms < 220) return { name: 'Excellent', color: 'text-green-400' };
  if (ms < 270) return { name: 'Good', color: 'text-blue-400' };
  if (ms < 330) return { name: 'Average', color: 'text-yellow-400' };
  return { name: 'Keep practicing', color: 'text-orange-400' };
};

/**
 * Auditory reaction test: react as soon as you HEAR the beep.
 * The Web Audio AudioContext is created only inside user-triggered handlers,
 * so this component is safe to server-render (SSG).
 */
const AuditoryReactionTestArea = ({ onResult }) => {
  const [state, setState] = useState(STATES.IDLE);
  const [reaction, setReaction] = useState(null);
  const timeoutRef = useRef(null);
  const startRef = useRef(null);
  const audioCtxRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const beep = () => {
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
        audioCtxRef.current = new Ctx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.4, ctx.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch (e) {
      /* audio not available — test still works visually */
    }
  };

  const start = () => {
    setState(STATES.WAITING);
    setReaction(null);
    // Prime the AudioContext within the user gesture so the later beep can play.
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (Ctx && (!audioCtxRef.current || audioCtxRef.current.state === 'closed')) {
        audioCtxRef.current = new Ctx();
      }
    } catch (e) {
      /* ignore */
    }
    const delay = 1500 + Math.random() * 2500;
    timeoutRef.current = setTimeout(() => {
      beep();
      startRef.current = performance.now();
      setState(STATES.READY);
    }, delay);
  };

  const handleClick = () => {
    if (state === STATES.IDLE || state === STATES.RESULT || state === STATES.FALSE_START) {
      start();
    } else if (state === STATES.WAITING) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setState(STATES.FALSE_START);
    } else if (state === STATES.READY) {
      const ms = Math.round(performance.now() - startRef.current);
      setReaction(ms);
      setState(STATES.RESULT);
      if (onResult) onResult(ms);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleClick();
    }
  };

  const config = {
    [STATES.IDLE]: {
      bg: 'bg-gradient-to-br from-dark-800 to-dark-900',
      border: 'border-dark-700 hover:border-green-500/50',
      icon: <Ear size={64} className="text-green-500 mb-4" />,
      title: 'Auditory Reaction Test',
      message: 'Click anywhere to start',
      sub: 'Turn your sound ON. Click the instant you HEAR the beep.',
      color: 'text-white',
    },
    [STATES.WAITING]: {
      bg: 'bg-gradient-to-br from-red-500/10 to-red-600/10',
      border: 'border-red-500/30',
      icon: <Volume2 size={64} className="text-red-500 mb-4 animate-pulse" />,
      title: 'Listen…',
      message: 'Stay focused',
      sub: 'Click the moment you hear the sound',
      color: 'text-red-400',
    },
    [STATES.READY]: {
      bg: 'bg-gradient-to-br from-green-500 to-emerald-600',
      border: 'border-green-400',
      icon: <Volume2 size={64} className="text-white mb-4 animate-pulse" />,
      title: 'CLICK NOW!',
      message: '',
      sub: '',
      color: 'text-white',
    },
    [STATES.FALSE_START]: {
      bg: 'bg-gradient-to-br from-orange-500/10 to-red-600/10',
      border: 'border-orange-500/30',
      icon: <AlertCircle size={64} className="text-orange-500 mb-4" />,
      title: 'Too Early!',
      message: 'You clicked before the beep',
      sub: 'Click to try again',
      color: 'text-orange-400',
    },
  }[state];

  if (state === STATES.RESULT && reaction != null) {
    const rating = getRating(reaction);
    return (
      <div className="bg-gradient-to-br from-dark-800 to-dark-900 border-2 border-green-500/40 rounded-xl sm:rounded-2xl p-8 sm:p-12 min-h-[400px] sm:min-h-[500px] flex flex-col items-center justify-center text-center">
        <Volume2 size={56} className="text-green-500 mb-4" />
        <p className="text-dark-400 text-sm mb-2">Your auditory reaction time</p>
        <div className="text-6xl sm:text-7xl font-bold text-white mb-2">{reaction}<span className="text-2xl text-dark-400 ml-1">ms</span></div>
        <div className={`text-lg font-semibold mb-8 ${rating.color}`}>{rating.name}</div>
        <button
          type="button"
          onClick={handleClick}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-lg text-white font-bold transition-colors min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
        >
          <RotateCcw size={18} /> Try Again
        </button>
      </div>
    );
  }

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Auditory reaction test. Click to start, then click the moment you hear the beep."
      aria-live="polite"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`relative overflow-hidden ${config.bg} ${config.border} cursor-pointer border-2 rounded-xl sm:rounded-2xl p-8 sm:p-12 md:p-20 transition-all duration-200 flex flex-col items-center justify-center min-h-[400px] sm:min-h-[500px] md:min-h-[600px] select-none touch-manipulation focus:outline-none focus-visible:ring-4 focus-visible:ring-green-500/50`}
    >
      <div className="relative z-10 text-center px-4">
        {config.icon}
        <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold ${config.color} mb-2 sm:mb-3`}>{config.title}</h2>
        {config.message && <p className="text-lg sm:text-xl md:text-2xl text-dark-300 mb-2">{config.message}</p>}
        {config.sub && <p className="text-sm md:text-base text-dark-400 mt-3 sm:mt-4">{config.sub}</p>}
      </div>
    </div>
  );
};

export default AuditoryReactionTestArea;
