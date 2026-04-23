import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Volume2, VolumeX, RotateCcw, Headphones, CheckCircle, XCircle } from 'lucide-react';
import EnhancedResultCard from '../EnhancedResultCard';
import {
  getHearingLevel,
  getHearingPercentile,
  getHearingMotivation,
  getComparisonMessage,
  generateShareMessage,
  getSuggestedTests
} from '../../utils/scoreUtils';

const TEST_STATES = {
  INTRO: 'intro',
  PERMISSION: 'permission',
  PLAYING: 'playing',
  WAITING: 'waiting',
  RESULT: 'result',
};

// Frequency test sequence (Hz) - from easily audible to hard-to-hear
const FREQUENCIES = [
  { hz: 250, label: '250 Hz', category: 'Low Bass' },
  { hz: 500, label: '500 Hz', category: 'Bass' },
  { hz: 1000, label: '1 kHz', category: 'Mid' },
  { hz: 2000, label: '2 kHz', category: 'Mid-High' },
  { hz: 4000, label: '4 kHz', category: 'High' },
  { hz: 6000, label: '6 kHz', category: 'High' },
  { hz: 8000, label: '8 kHz', category: 'Very High' },
  { hz: 10000, label: '10 kHz', category: 'Very High' },
  { hz: 12000, label: '12 kHz', category: 'Ultra High' },
  { hz: 14000, label: '14 kHz', category: 'Ultra High' },
  { hz: 16000, label: '16 kHz', category: 'Near Limit' },
  { hz: 17000, label: '17 kHz', category: 'Near Limit' },
  { hz: 18000, label: '18 kHz', category: 'Edge' },
  { hz: 19000, label: '19 kHz', category: 'Edge' },
  { hz: 20000, label: '20 kHz', category: 'Human Limit' },
];

const HearingTestArea = ({ onResult }) => {
  const [state, setState] = useState(TEST_STATES.INTRO);
  const [currentFreqIndex, setCurrentFreqIndex] = useState(0);
  const [results, setResults] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioPermission, setAudioPermission] = useState(false);
  const [highestHeard, setHighestHeard] = useState(0);
  const [totalHeard, setTotalHeard] = useState(0);

  const audioContextRef = useRef(null);
  const oscillatorRef = useRef(null);
  const gainNodeRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      stopTone();
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const initAudio = async () => {
    try {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      await audioContextRef.current.resume();
      setAudioPermission(true);
      setState(TEST_STATES.PLAYING);
      setCurrentFreqIndex(0);
      setResults([]);
      setHighestHeard(0);
      setTotalHeard(0);
      // Start playing the first frequency after a short delay
      setTimeout(() => playTone(0), 500);
    } catch (err) {
      console.error('Audio initialization failed:', err);
      alert('Could not initialize audio. Please ensure your browser supports the Web Audio API and try again.');
    }
  };

  const playTone = useCallback((index) => {
    if (!audioContextRef.current || index >= FREQUENCIES.length) return;

    stopTone();

    const freq = FREQUENCIES[index];
    const ctx = audioContextRef.current;

    try {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(freq.hz, ctx.currentTime);

      // Adjust volume based on frequency (higher frequencies need more gain to be perceived equally)
      let volume = 0.15;
      if (freq.hz >= 10000) volume = 0.25;
      if (freq.hz >= 14000) volume = 0.35;
      if (freq.hz >= 17000) volume = 0.45;

      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.05);
      gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 1.5);
      gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 2.0);

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 2.0);

      oscillatorRef.current = oscillator;
      gainNodeRef.current = gainNode;

      setIsPlaying(true);
      setState(TEST_STATES.PLAYING);

      // Auto-stop after tone duration and switch to waiting
      timeoutRef.current = setTimeout(() => {
        setIsPlaying(false);
        setState(TEST_STATES.WAITING);
      }, 2100);
    } catch (err) {
      console.error('Error playing tone:', err);
    }
  }, []);

  const stopTone = () => {
    try {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
        oscillatorRef.current = null;
      }
      if (gainNodeRef.current) {
        gainNodeRef.current.disconnect();
        gainNodeRef.current = null;
      }
    } catch (e) {
      // Ignore errors from already-stopped oscillators
    }
    setIsPlaying(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleResponse = (heard) => {
    const freq = FREQUENCIES[currentFreqIndex];
    const newResult = { ...freq, heard };
    const newResults = [...results, newResult];
    setResults(newResults);

    if (heard) {
      setHighestHeard(freq.hz);
      setTotalHeard((prev) => prev + 1);
    }

    const nextIndex = currentFreqIndex + 1;

    if (nextIndex >= FREQUENCIES.length) {
      // Test complete
      stopTone();
      setState(TEST_STATES.RESULT);
      
      const heardCount = newResults.filter(r => r.heard).length;
      const maxHeard = heard ? freq.hz : highestHeard;
      
      if (onResult) {
        onResult({
          highestFrequency: maxHeard,
          totalHeard: heardCount,
          totalFrequencies: FREQUENCIES.length,
          results: newResults,
        });
      }
    } else {
      setCurrentFreqIndex(nextIndex);
      setState(TEST_STATES.PLAYING);
      setTimeout(() => playTone(nextIndex), 800);
    }
  };

  const replayTone = () => {
    playTone(currentFreqIndex);
  };

  const retry = () => {
    stopTone();
    setState(TEST_STATES.INTRO);
    setCurrentFreqIndex(0);
    setResults([]);
    setHighestHeard(0);
    setTotalHeard(0);
  };

  const getProgressPercent = () => {
    return Math.round((currentFreqIndex / FREQUENCIES.length) * 100);
  };

  const getFinalScore = () => {
    const heardCount = results.filter(r => r.heard).length;
    return Math.round((heardCount / FREQUENCIES.length) * 100);
  };

  const getHighestFreqHeard = () => {
    const heardFreqs = results.filter(r => r.heard);
    if (heardFreqs.length === 0) return 0;
    return Math.max(...heardFreqs.map(r => r.hz));
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-dark-900 to-dark-950 border-2 border-dark-800 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 transition-all duration-200 flex flex-col items-center justify-center min-h-[500px] sm:min-h-[600px] md:min-h-[700px] select-none">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center w-full max-w-4xl px-4">
        {/* INTRO STATE */}
        {state === TEST_STATES.INTRO && (
          <div className="space-y-4 sm:space-y-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-2xl">
              <Headphones size={32} className="sm:w-10 sm:h-10 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Hearing Frequency Test
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-dark-300 max-w-2xl mx-auto">
              Test your auditory range and sensitivity
            </p>

            <div className="bg-dark-800/50 border border-dark-700 rounded-lg sm:rounded-xl p-4 sm:p-6 max-w-md mx-auto">
              <h3 className="text-white font-semibold mb-2 sm:mb-3 text-sm sm:text-base">How It Works</h3>
              <ol className="text-xs sm:text-sm text-dark-300 space-y-1.5 sm:space-y-2 text-left">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">1.</span>
                  <span>You'll hear tones at different frequencies (250 Hz – 20 kHz)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">2.</span>
                  <span>After each tone, indicate if you could hear it</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">3.</span>
                  <span>Use headphones for the most accurate results</span>
                </li>
              </ol>
            </div>

            {/* Audio Required Notice */}
            <div className="flex items-center justify-center gap-2 text-sm text-yellow-400">
              <Volume2 size={16} />
              <span>Audio Required — Use headphones for best results</span>
            </div>

            <button
              onClick={initAudio}
              className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-bold rounded-lg sm:rounded-xl transition-all shadow-lg shadow-blue-500/30 text-base sm:text-lg touch-manipulation min-h-[48px]"
            >
              <Play size={20} className="sm:w-6 sm:h-6" />
              <span>Start Test</span>
            </button>
          </div>
        )}

        {/* PLAYING / WAITING STATE */}
        {(state === TEST_STATES.PLAYING || state === TEST_STATES.WAITING) && (
          <div className="space-y-6 sm:space-y-8">
            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-dark-400">
                <span>Progress</span>
                <span>{currentFreqIndex + 1} / {FREQUENCIES.length}</span>
              </div>
              <div className="w-full bg-dark-800 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-500"
                  style={{ width: `${((currentFreqIndex + 1) / FREQUENCIES.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Current Frequency Display */}
            <div className="space-y-3">
              <div className="text-lg sm:text-xl text-dark-400">
                {FREQUENCIES[currentFreqIndex]?.category}
              </div>
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
                {FREQUENCIES[currentFreqIndex]?.label}
              </div>
            </div>

            {/* Audio Indicator */}
            <div className="flex justify-center">
              {isPlaying ? (
                <div className="flex items-center gap-3 px-6 py-3 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                  <div className="relative">
                    <Volume2 size={28} className="text-blue-400 animate-pulse" />
                    <div className="absolute -inset-2 bg-blue-500/20 rounded-full animate-ping" />
                  </div>
                  <span className="text-blue-400 font-semibold text-lg">Playing tone...</span>
                </div>
              ) : (
                <div className="flex items-center gap-3 px-6 py-3 bg-dark-800/50 border border-dark-700 rounded-xl">
                  <VolumeX size={28} className="text-dark-400" />
                  <span className="text-dark-400 font-semibold text-lg">Tone ended</span>
                </div>
              )}
            </div>

            {/* Frequency Visualization */}
            <div className="flex justify-center items-end gap-1 h-16 sm:h-20">
              {[...Array(20)].map((_, i) => {
                const height = isPlaying
                  ? Math.random() * 60 + 20
                  : 10;
                return (
                  <div
                    key={i}
                    className={`w-2 sm:w-3 rounded-full transition-all duration-150 ${
                      isPlaying ? 'bg-gradient-to-t from-blue-500 to-cyan-400' : 'bg-dark-700'
                    }`}
                    style={{ height: `${height}%` }}
                  />
                );
              })}
            </div>

            {/* Response Buttons */}
            <div className="space-y-3">
              <p className="text-dark-300 text-sm sm:text-base">
                {isPlaying ? 'Listen carefully...' : 'Could you hear that tone?'}
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => handleResponse(true)}
                  disabled={isPlaying}
                  className={`flex items-center gap-2 px-8 sm:px-10 py-3 sm:py-4 font-bold rounded-xl transition-all touch-manipulation min-h-[48px] text-base sm:text-lg ${
                    isPlaying
                      ? 'bg-dark-800 text-dark-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg shadow-green-500/30'
                  }`}
                >
                  <CheckCircle size={20} />
                  <span>Yes, I heard it</span>
                </button>
                <button
                  onClick={() => handleResponse(false)}
                  disabled={isPlaying}
                  className={`flex items-center gap-2 px-8 sm:px-10 py-3 sm:py-4 font-bold rounded-xl transition-all touch-manipulation min-h-[48px] text-base sm:text-lg ${
                    isPlaying
                      ? 'bg-dark-800 text-dark-500 cursor-not-allowed'
                      : 'bg-dark-800 hover:bg-dark-700 border-2 border-dark-700 hover:border-red-500/50 text-white'
                  }`}
                >
                  <XCircle size={20} />
                  <span>No</span>
                </button>
              </div>

              {/* Replay Button */}
              {!isPlaying && (
                <button
                  onClick={replayTone}
                  className="inline-flex items-center gap-2 px-4 py-2 text-dark-400 hover:text-blue-400 transition-colors text-sm touch-manipulation"
                >
                  <RotateCcw size={14} />
                  <span>Replay tone</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* RESULT STATE */}
        {state === TEST_STATES.RESULT && (
          <div className="w-full">
            <EnhancedResultCard
              score={getFinalScore()}
              scoreLabel="%"
              level={getHearingLevel(getFinalScore())}
              percentile={getHearingPercentile(getHighestFreqHeard())}
              motivation={getHearingMotivation(getFinalScore(), getHighestFreqHeard())}
              comparisonMessage={getComparisonMessage(getHearingPercentile(getHighestFreqHeard()))}
              onRetry={(e) => {
                if (e) e.stopPropagation();
                retry();
              }}
              testId="hearing"
              suggestedTests={getSuggestedTests('hearing')}
              shareMessage={generateShareMessage(
                'Hearing Frequency Test',
                `${getFinalScore()}% (up to ${getHighestFreqHeard()} Hz)`,
                getHearingLevel(getFinalScore()).name
              )}
              additionalStats={[
                { label: 'Frequencies Heard', value: `${results.filter(r => r.heard).length}/${FREQUENCIES.length}` },
                { label: 'Highest Heard', value: getHighestFreqHeard() >= 1000 ? `${(getHighestFreqHeard() / 1000).toFixed(0)} kHz` : `${getHighestFreqHeard()} Hz` },
                { label: 'Score', value: `${getFinalScore()}%` },
                { label: 'Range', value: getHighestFreqHeard() >= 16000 ? 'Excellent' : getHighestFreqHeard() >= 12000 ? 'Good' : 'Limited' },
              ]}
            >
              {/* Frequency breakdown */}
              <div className="mt-6 text-left">
                <h4 className="text-sm font-semibold text-white mb-3">Frequency Breakdown</h4>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {results.map((result, idx) => (
                    <div
                      key={idx}
                      className={`p-2 rounded-lg text-center text-xs ${
                        result.heard
                          ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                          : 'bg-red-500/10 border border-red-500/30 text-red-400'
                      }`}
                    >
                      <div className="font-bold">{result.label}</div>
                      <div className="text-[10px] mt-0.5">{result.heard ? '✓ Heard' : '✗ Not heard'}</div>
                    </div>
                  ))}
                </div>
              </div>
            </EnhancedResultCard>
          </div>
        )}
      </div>
    </div>
  );
};

export default HearingTestArea;
