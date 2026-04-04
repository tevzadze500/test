import React, { useState, useEffect, useRef } from 'react';
import { Play, CheckCircle2, XCircle, AlertCircle, RotateCcw } from 'lucide-react';

const TEST_STATES = {
  INTRO: 'intro',
  WAITING: 'waiting',
  GO: 'go',
  NO_GO: 'noGo',
  PROCESSING: 'processing',
  COMPLETE: 'complete',
};

const GoNoGoTestArea = ({ onComplete }) => {
  const [state, setState] = useState(TEST_STATES.INTRO);
  const [currentTrial, setCurrentTrial] = useState(0);
  const [trials, setTrials] = useState([]);
  const [results, setResults] = useState([]);
  const [signalStartTime, setSignalStartTime] = useState(null);
  
  const timeoutRef = useRef(null);
  const signalTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (signalTimeoutRef.current) clearTimeout(signalTimeoutRef.current);
    };
  }, []);

  // Generate 10 trials: 8 GO (green), 2 NO-GO (red)
  const generateTrials = () => {
    const trialTypes = [
      ...Array(8).fill('go'),
      ...Array(2).fill('noGo'),
    ];
    
    // Shuffle array
    for (let i = trialTypes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [trialTypes[i], trialTypes[j]] = [trialTypes[j], trialTypes[i]];
    }
    
    return trialTypes;
  };

  const startTest = () => {
    const newTrials = generateTrials();
    setTrials(newTrials);
    setResults([]);
    setCurrentTrial(0);
    setState(TEST_STATES.WAITING);
    startTrial(newTrials[0]);
  };

  const startTrial = (trialType) => {
    setState(TEST_STATES.WAITING);
    
    // Random delay between 1.5 and 4 seconds
    const delay = 1500 + Math.random() * 2500;
    
    timeoutRef.current = setTimeout(() => {
      showSignal(trialType);
    }, delay);
  };

  const showSignal = (trialType) => {
    setState(trialType === 'go' ? TEST_STATES.GO : TEST_STATES.NO_GO);
    setSignalStartTime(performance.now());
    
    // Auto-advance if NO-GO signal (should NOT click)
    if (trialType === 'noGo') {
      signalTimeoutRef.current = setTimeout(() => {
        handleNoGoSuccess();
      }, 1000); // 1 second window
    } else {
      // For GO signals, give 1 second to respond
      signalTimeoutRef.current = setTimeout(() => {
        handleMissedClick();
      }, 1000);
    }
  };

  const handleClick = () => {
    if (state === TEST_STATES.WAITING) {
      // False start - clicked before signal
      recordResult({
        type: trials[currentTrial],
        outcome: 'falseStart',
        reactionTime: null,
      });
    } else if (state === TEST_STATES.GO) {
      // Correct click on GO signal
      clearTimeout(signalTimeoutRef.current);
      const reactionTime = Math.round(performance.now() - signalStartTime);
      recordResult({
        type: 'go',
        outcome: 'correct',
        reactionTime,
      });
    } else if (state === TEST_STATES.NO_GO) {
      // Error - clicked on NO-GO signal
      clearTimeout(signalTimeoutRef.current);
      const reactionTime = Math.round(performance.now() - signalStartTime);
      recordResult({
        type: 'noGo',
        outcome: 'error',
        reactionTime,
      });
    }
  };

  const handleNoGoSuccess = () => {
    // Successfully inhibited click on NO-GO
    recordResult({
      type: 'noGo',
      outcome: 'correct',
      reactionTime: null,
    });
  };

  const handleMissedClick = () => {
    // Missed GO signal
    recordResult({
      type: 'go',
      outcome: 'missed',
      reactionTime: null,
    });
  };

  const recordResult = (result) => {
    const newResults = [...results, result];
    setResults(newResults);
    
    setState(TEST_STATES.PROCESSING);
    
    // Move to next trial or complete
    setTimeout(() => {
      if (currentTrial + 1 < trials.length) {
        setCurrentTrial(currentTrial + 1);
        startTrial(trials[currentTrial + 1]);
      } else {
        // Test complete
        setState(TEST_STATES.COMPLETE);
        if (onComplete) {
          onComplete(calculateStats(newResults));
        }
      }
    }, 500);
  };

  const calculateStats = (resultsList) => {
    const goTrials = resultsList.filter(r => r.type === 'go');
    const noGoTrials = resultsList.filter(r => r.type === 'noGo');
    
    const goCorrect = goTrials.filter(r => r.outcome === 'correct').length;
    const noGoCorrect = noGoTrials.filter(r => r.outcome === 'correct').length;
    
    const totalCorrect = goCorrect + noGoCorrect;
    const accuracy = (totalCorrect / resultsList.length) * 100;
    
    const validReactions = goTrials
      .filter(r => r.outcome === 'correct' && r.reactionTime)
      .map(r => r.reactionTime);
    
    const avgReactionTime = validReactions.length > 0
      ? Math.round(validReactions.reduce((a, b) => a + b, 0) / validReactions.length)
      : null;
    
    const errors = resultsList.filter(r => r.outcome === 'error').length;
    const inhibitionScore = ((noGoTrials.length - errors) / noGoTrials.length) * 100;
    
    return {
      accuracy: Math.round(accuracy),
      avgReactionTime,
      errors,
      inhibitionScore: Math.round(inhibitionScore),
      falseStarts: resultsList.filter(r => r.outcome === 'falseStart').length,
      totalTrials: resultsList.length,
    };
  };

  const restart = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (signalTimeoutRef.current) clearTimeout(signalTimeoutRef.current);
    setState(TEST_STATES.INTRO);
    setCurrentTrial(0);
    setResults([]);
    setTrials([]);
  };

  const getStateDisplay = () => {
    switch (state) {
      case TEST_STATES.INTRO:
        return {
          bg: 'bg-gradient-to-br from-dark-800 to-dark-900',
          border: 'border-dark-700',
          icon: <Play size={64} className="text-blue-500 mb-4" />,
          title: 'Go/No-Go Reaction Test',
          message: 'Test your impulse control and inhibition',
          instructions: (
            <div className="mt-4 space-y-2 text-sm text-dark-300">
              <div className="flex items-center gap-3 p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                <div className="w-8 h-8 rounded-full bg-green-500 flex-shrink-0" />
                <span><strong className="text-green-400">GREEN</strong> = Click as fast as you can</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-red-500/10 rounded-lg border border-red-500/30">
                <div className="w-8 h-8 rounded-full bg-red-500 flex-shrink-0" />
                <span><strong className="text-red-400">RED</strong> = Do NOT click! Resist the urge</span>
              </div>
              <p className="text-center mt-4 text-dark-400">10 trials • 80% GO • 20% NO-GO</p>
            </div>
          ),
          action: (
            <button
              onClick={startTest}
              className="mt-6 flex items-center gap-2 px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-colors mx-auto text-lg"
            >
              <Play size={20} />
              <span>Start Test</span>
            </button>
          ),
        };
      
      case TEST_STATES.WAITING:
        return {
          bg: 'bg-gradient-to-br from-dark-800 to-dark-900',
          border: 'border-yellow-500/30',
          icon: <div className="w-16 h-16 rounded-full bg-yellow-500/20 border-4 border-yellow-500/50 animate-pulse mb-4" />,
          title: 'Get Ready...',
          message: 'Wait for the signal',
          progress: `Trial ${currentTrial + 1} of ${trials.length}`,
        };
      
      case TEST_STATES.GO:
        return {
          bg: 'bg-gradient-to-br from-green-500 to-emerald-600',
          border: 'border-green-400',
          icon: <CheckCircle2 size={80} className="text-white mb-4" />,
          title: 'GO!',
          message: 'Click NOW!',
          glow: 'shadow-2xl shadow-green-500/50',
          progress: `Trial ${currentTrial + 1} of ${trials.length}`,
        };
      
      case TEST_STATES.NO_GO:
        return {
          bg: 'bg-gradient-to-br from-red-500 to-rose-600',
          border: 'border-red-400',
          icon: <XCircle size={80} className="text-white mb-4" />,
          title: 'NO-GO!',
          message: "DON'T CLICK!",
          glow: 'shadow-2xl shadow-red-500/50',
          progress: `Trial ${currentTrial + 1} of ${trials.length}`,
        };
      
      case TEST_STATES.PROCESSING:
        return {
          bg: 'bg-gradient-to-br from-dark-800 to-dark-900',
          border: 'border-dark-700',
          message: '',
        };
      
      default:
        return {};
    }
  };

  if (state === TEST_STATES.COMPLETE) {
    return null; // Stats will be shown in parent component
  }

  const config = getStateDisplay();

  return (
    <div
      onClick={handleClick}
      className={`
        relative overflow-hidden
        ${config.bg} ${config.border}
        border-2 rounded-2xl p-12 md:p-20
        transition-all duration-200
        flex flex-col items-center justify-center
        min-h-[500px] md:min-h-[600px]
        ${config.glow || ''}
        ${state !== TEST_STATES.INTRO ? 'cursor-pointer' : ''}
        select-none
      `}
    >
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl">
        {config.icon}
        
        {config.title && (
          <h2 className={`text-4xl md:text-6xl font-bold ${state === TEST_STATES.GO || state === TEST_STATES.NO_GO ? 'text-white' : 'text-white'} mb-3`}>
            {config.title}
          </h2>
        )}
        
        {config.message && (
          <p className={`text-xl md:text-2xl ${state === TEST_STATES.GO || state === TEST_STATES.NO_GO ? 'text-white' : 'text-dark-300'} mb-2`}>
            {config.message}
          </p>
        )}
        
        {config.instructions}
        {config.action}
        
        {config.progress && (
          <div className="mt-6">
            <p className={`text-sm ${state === TEST_STATES.GO || state === TEST_STATES.NO_GO ? 'text-white/80' : 'text-dark-400'}`}>
              {config.progress}
            </p>
            {/* Progress bar */}
            <div className="w-full max-w-md mx-auto mt-2 h-2 bg-dark-800/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ width: `${((currentTrial + 1) / trials.length) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoNoGoTestArea;
