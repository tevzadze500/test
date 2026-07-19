import React, { useState, useEffect, useRef } from 'react';
import { Brain, Play, RotateCcw } from 'lucide-react';

const TILES = Array.from({ length: 9 }, (_, i) => i);
const START_LEN = 3; // first sequence length

/**
 * Working-memory / sequence-recall test (Simon-style) on a 3x3 grid.
 * The grid flashes a growing sequence; the player repeats it. Score is the
 * longest sequence correctly reproduced ("memory span").
 * All timers live in refs/handlers, so this is safe to server-render (SSG).
 */
const MemoryTestArea = ({ onResult }) => {
  const [phase, setPhase] = useState('idle'); // idle | showing | input | gameover
  const [sequence, setSequence] = useState([]);
  const [active, setActive] = useState(null);
  const [inputPos, setInputPos] = useState(0);
  const [level, setLevel] = useState(0); // completed rounds
  const [finalSpan, setFinalSpan] = useState(0);
  const timers = useRef([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  useEffect(() => () => clearTimers(), []);

  const randSeq = (len) => Array.from({ length: len }, () => Math.floor(Math.random() * 9));

  const playSequence = (seq) => {
    setPhase('showing');
    setActive(null);
    clearTimers();
    let t = 600;
    seq.forEach((tile) => {
      timers.current.push(setTimeout(() => setActive(tile), t));
      timers.current.push(setTimeout(() => setActive(null), t + 430));
      t += 630;
    });
    timers.current.push(setTimeout(() => { setPhase('input'); setInputPos(0); }, t));
  };

  const startGame = () => {
    const seq = randSeq(START_LEN);
    setLevel(0);
    setFinalSpan(0);
    setSequence(seq);
    playSequence(seq);
  };

  const handleTile = (tile) => {
    if (phase !== 'input') return;
    if (tile === sequence[inputPos]) {
      // brief positive flash
      setActive(tile);
      timers.current.push(setTimeout(() => setActive(null), 150));
      const next = inputPos + 1;
      if (next === sequence.length) {
        const newLevel = level + 1;
        setLevel(newLevel);
        const nextSeq = randSeq(sequence.length + 1);
        setSequence(nextSeq);
        setPhase('showing'); // lock input during the pause
        timers.current.push(setTimeout(() => playSequence(nextSeq), 750));
      } else {
        setInputPos(next);
      }
    } else {
      // wrong → game over. Best fully-recalled length = START_LEN + level - 1.
      const span = level === 0 ? START_LEN - 1 : START_LEN + level - 1;
      setFinalSpan(span);
      setPhase('gameover');
      clearTimers();
      if (onResult) onResult(span);
    }
  };

  const currentLen = sequence.length;

  if (phase === 'gameover') {
    const rating =
      finalSpan >= 9 ? { name: 'Exceptional memory', color: 'text-purple-400' }
      : finalSpan >= 7 ? { name: 'Excellent', color: 'text-green-400' }
      : finalSpan >= 5 ? { name: 'Good', color: 'text-blue-400' }
      : finalSpan >= 4 ? { name: 'Average', color: 'text-yellow-400' }
      : { name: 'Keep practicing', color: 'text-orange-400' };
    return (
      <div className="bg-gradient-to-br from-dark-800 to-dark-900 border-2 border-green-500/40 rounded-xl sm:rounded-2xl p-8 sm:p-12 min-h-[400px] sm:min-h-[520px] flex flex-col items-center justify-center text-center">
        <Brain size={56} className="text-green-500 mb-4" />
        <p className="text-dark-400 text-sm mb-2">Your memory span</p>
        <div className="text-6xl sm:text-7xl font-bold text-white mb-2">{finalSpan}<span className="text-2xl text-dark-400 ml-2">items</span></div>
        <div className={`text-lg font-semibold mb-8 ${rating.color}`}>{rating.name}</div>
        <button type="button" onClick={startGame} className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-lg text-white font-bold transition-colors min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400">
          <RotateCcw size={18} /> Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-dark-800 to-dark-900 border-2 border-dark-700 rounded-xl sm:rounded-2xl p-6 sm:p-10 min-h-[400px] sm:min-h-[520px] flex flex-col items-center justify-center">
      {/* Status line */}
      <div className="mb-6 text-center h-12">
        {phase === 'idle' && <p className="text-dark-300 text-lg">Watch the sequence, then repeat it</p>}
        {phase === 'showing' && <p className="text-green-400 text-xl font-semibold animate-pulse">Watch carefully…</p>}
        {phase === 'input' && (
          <>
            <p className="text-white text-xl font-semibold">Your turn — repeat the sequence</p>
            <p className="text-dark-400 text-sm mt-1">Length: {currentLen} &middot; {inputPos}/{currentLen}</p>
          </>
        )}
      </div>

      {/* 3x3 grid */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {TILES.map((tile) => {
          const lit = active === tile;
          return (
            <button
              key={tile}
              type="button"
              aria-label={`Tile ${tile + 1}`}
              onClick={() => handleTile(tile)}
              disabled={phase !== 'input'}
              className={`w-20 h-20 sm:w-24 sm:h-24 rounded-xl border-2 transition-all duration-150 touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400
                ${lit
                  ? 'bg-gradient-to-br from-green-400 to-emerald-500 border-green-300 scale-105 shadow-lg shadow-green-500/40'
                  : 'bg-dark-800 border-dark-700'}
                ${phase === 'input' ? 'cursor-pointer hover:border-green-500/60 hover:bg-dark-700' : 'cursor-default'}`}
            />
          );
        })}
      </div>

      {phase === 'idle' && (
        <button type="button" onClick={startGame} className="mt-8 inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-xl text-white font-bold transition-colors min-h-[52px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400">
          <Play size={20} /> Start Test
        </button>
      )}
      {phase !== 'idle' && (
        <div className="mt-8 text-sm text-dark-400">Round {level + 1}</div>
      )}
    </div>
  );
};

export default MemoryTestArea;
