import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, CheckCircle, XCircle, Eye } from 'lucide-react';
import EnhancedResultCard from '../EnhancedResultCard';
import {
  getColorBlindLevel,
  getColorBlindPercentile,
  getColorBlindMotivation,
  getComparisonMessage,
  generateShareMessage,
  getSuggestedTests
} from '../../utils/scoreUtils';

const TEST_STATES = {
  INTRO: 'intro',
  TESTING: 'testing',
  RESULT: 'result',
};

// Ishihara-style color plates data
// Each plate has a background color pattern and a number hidden within
const COLOR_PLATES = [
  {
    id: 1,
    answer: '12',
    type: 'normal', // visible to normal vision
    description: 'What number do you see?',
    dotColors: { bg: ['#e8a87c', '#d4956a', '#c8845a', '#f0b890'], fg: ['#6b8e23', '#556b2f', '#4a7c1f', '#5a8a2a'] },
  },
  {
    id: 2,
    answer: '8',
    type: 'normal',
    description: 'What number do you see?',
    dotColors: { bg: ['#e07b54', '#d4694a', '#c85a3e', '#e88a60'], fg: ['#4169e1', '#3a5fd4', '#2e52c8', '#4a72e8'] },
  },
  {
    id: 3,
    answer: '29',
    type: 'normal',
    description: 'What number do you see?',
    dotColors: { bg: ['#c8a060', '#b89050', '#d4b070', '#bca060'], fg: ['#8b0000', '#a00000', '#7a0000', '#960000'] },
  },
  {
    id: 4,
    answer: '5',
    type: 'normal',
    description: 'What number do you see?',
    dotColors: { bg: ['#9acd32', '#8bc220', '#a0d040', '#90c828'], fg: ['#ff4500', '#e83c00', '#f04000', '#d43500'] },
  },
  {
    id: 5,
    answer: '3',
    type: 'normal',
    description: 'What number do you see?',
    dotColors: { bg: ['#daa520', '#c89510', '#e0b030', '#d0a020'], fg: ['#800080', '#700070', '#8a008a', '#6a006a'] },
  },
  {
    id: 6,
    answer: '15',
    type: 'normal',
    description: 'What number do you see?',
    dotColors: { bg: ['#cd853f', '#b87030', '#d49050', '#c07840'], fg: ['#228b22', '#1a7a1a', '#2a9a2a', '#1e8a1e'] },
  },
  {
    id: 7,
    answer: '74',
    type: 'normal',
    description: 'What number do you see?',
    dotColors: { bg: ['#e9967a', '#d88060', '#f0a080', '#dc8870'], fg: ['#4682b4', '#3a72a0', '#5090c0', '#3c7ab0'] },
  },
  {
    id: 8,
    answer: '6',
    type: 'normal',
    description: 'What number do you see?',
    dotColors: { bg: ['#f4a460', '#e09050', '#f8b070', '#e89a60'], fg: ['#2e8b57', '#228b47', '#3a9b67', '#269a57'] },
  },
];

// Generate pseudo-random dot positions for a plate
const generateDots = (seed, count = 200) => {
  const dots = [];
  let s = seed;
  for (let i = 0; i < count; i++) {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    const x = ((s >>> 0) % 280) + 10;
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    const y = ((s >>> 0) % 280) + 10;
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    const r = ((s >>> 0) % 12) + 6;
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    const colorIdx = (s >>> 0) % 4;
    dots.push({ x, y, r, colorIdx });
  }
  return dots;
};

// Number digit paths (simplified pixel-art style for SVG)
const DIGIT_PIXELS = {
  '0': [[1,0],[2,0],[0,1],[3,1],[0,2],[3,2],[0,3],[3,3],[1,4],[2,4]],
  '1': [[1,0],[1,1],[1,2],[1,3],[1,4]],
  '2': [[0,0],[1,0],[2,0],[3,0],[3,1],[2,2],[1,2],[0,2],[0,3],[0,4],[1,4],[2,4],[3,4]],
  '3': [[0,0],[1,0],[2,0],[3,0],[3,1],[2,2],[3,2],[3,3],[0,4],[1,4],[2,4],[3,4]],
  '4': [[0,0],[3,0],[0,1],[3,1],[0,2],[1,2],[2,2],[3,2],[3,3],[3,4]],
  '5': [[0,0],[1,0],[2,0],[3,0],[0,1],[0,2],[1,2],[2,2],[3,2],[3,3],[0,4],[1,4],[2,4],[3,4]],
  '6': [[1,0],[2,0],[0,1],[0,2],[1,2],[2,2],[3,2],[0,3],[3,3],[1,4],[2,4]],
  '7': [[0,0],[1,0],[2,0],[3,0],[3,1],[2,2],[1,3],[1,4]],
  '8': [[1,0],[2,0],[0,1],[3,1],[1,2],[2,2],[0,3],[3,3],[1,4],[2,4]],
  '9': [[1,0],[2,0],[0,1],[3,1],[1,2],[2,2],[3,2],[3,3],[1,4],[2,4]],
};

const ColorPlateSVG = ({ plate, size = 300 }) => {
  const bgDots = generateDots(plate.id * 1000, 180);
  const fgDots = generateDots(plate.id * 2000, 60);
  
  // Get digit pixels for the answer number
  const digits = plate.answer.split('');
  const digitPixels = [];
  digits.forEach((digit, di) => {
    const pixels = DIGIT_PIXELS[digit] || [];
    pixels.forEach(([px, py]) => {
      digitPixels.push({
        x: 100 + di * 60 + px * 12,
        y: 110 + py * 16,
      });
    });
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 300 300"
      className="rounded-full border-4 border-dark-700"
      style={{ background: '#2a2a2a' }}
    >
      {/* Background dots */}
      {bgDots.map((dot, i) => (
        <circle
          key={`bg-${i}`}
          cx={dot.x}
          cy={dot.y}
          r={dot.r}
          fill={plate.dotColors.bg[dot.colorIdx]}
          opacity={0.85}
        />
      ))}
      
      {/* Foreground dots forming the number */}
      {digitPixels.map((pixel, i) => (
        <circle
          key={`fg-${i}`}
          cx={pixel.x + (Math.sin(i * 2.3) * 3)}
          cy={pixel.y + (Math.cos(i * 1.7) * 3)}
          r={9}
          fill={plate.dotColors.fg[i % 4]}
          opacity={0.9}
        />
      ))}
      
      {/* Additional foreground scatter dots */}
      {fgDots.slice(0, 20).map((dot, i) => (
        <circle
          key={`scatter-${i}`}
          cx={dot.x}
          cy={dot.y}
          r={dot.r * 0.7}
          fill={plate.dotColors.fg[dot.colorIdx]}
          opacity={0.6}
        />
      ))}
    </svg>
  );
};

const ANSWER_OPTIONS = (correct) => {
  const nums = [correct];
  const allNums = ['3', '5', '6', '8', '12', '15', '29', '74'];
  while (nums.length < 4) {
    const n = allNums[Math.floor(Math.random() * allNums.length)];
    if (!nums.includes(n)) nums.push(n);
  }
  return nums.sort(() => Math.random() - 0.5);
};

const ColorBlindTestArea = ({ onResult }) => {
  const [state, setState] = useState(TEST_STATES.INTRO);
  const [currentPlateIndex, setCurrentPlateIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const startTest = () => {
    setState(TEST_STATES.TESTING);
    setCurrentPlateIndex(0);
    setAnswers([]);
    setSelected(null);
    setShowFeedback(false);
    setOptions(ANSWER_OPTIONS(COLOR_PLATES[0].answer));
  };

  const handleAnswer = (answer) => {
    if (selected !== null) return;
    
    const plate = COLOR_PLATES[currentPlateIndex];
    const isCorrect = answer === plate.answer;
    setSelected(answer);
    setShowFeedback(true);

    const newAnswers = [...answers, { plate, answer, isCorrect }];

    timeoutRef.current = setTimeout(() => {
      const nextIndex = currentPlateIndex + 1;
      if (nextIndex >= COLOR_PLATES.length) {
        // Test complete
        const correctCount = newAnswers.filter(a => a.isCorrect).length;
        const score = Math.round((correctCount / COLOR_PLATES.length) * 100);
        setState(TEST_STATES.RESULT);
        setAnswers(newAnswers);
        if (onResult) {
          onResult({ score, correctCount, totalPlates: COLOR_PLATES.length, answers: newAnswers });
        }
      } else {
        setCurrentPlateIndex(nextIndex);
        setSelected(null);
        setShowFeedback(false);
        setOptions(ANSWER_OPTIONS(COLOR_PLATES[nextIndex].answer));
      }
    }, 1000);
  };

  const retry = () => {
    setState(TEST_STATES.INTRO);
    setCurrentPlateIndex(0);
    setAnswers([]);
    setSelected(null);
    setShowFeedback(false);
  };

  const getFinalScore = () => {
    const correctCount = answers.filter(a => a.isCorrect).length;
    return Math.round((correctCount / COLOR_PLATES.length) * 100);
  };

  const getCorrectCount = () => answers.filter(a => a.isCorrect).length;

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-dark-900 to-dark-950 border-2 border-dark-800 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 transition-all duration-200 flex flex-col items-center justify-center min-h-[500px] sm:min-h-[600px] md:min-h-[700px] select-none">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

      <div className="relative z-10 text-center w-full max-w-4xl px-4">
        {/* INTRO STATE */}
        {state === TEST_STATES.INTRO && (
          <div className="space-y-4 sm:space-y-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-2xl">
              <Eye size={32} className="sm:w-10 sm:h-10 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Color Blindness Test
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-dark-300 max-w-2xl mx-auto">
              Detect color vision deficiencies
            </p>

            <div className="bg-dark-800/50 border border-dark-700 rounded-lg sm:rounded-xl p-4 sm:p-6 max-w-md mx-auto">
              <h3 className="text-white font-semibold mb-2 sm:mb-3 text-sm sm:text-base">How It Works</h3>
              <ol className="text-xs sm:text-sm text-dark-300 space-y-1.5 sm:space-y-2 text-left">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 font-bold">1.</span>
                  <span>You'll see {COLOR_PLATES.length} Ishihara-style color plates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 font-bold">2.</span>
                  <span>Identify the number hidden in each colored dot pattern</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">3.</span>
                  <span>Select your answer from the options provided</span>
                </li>
              </ol>
            </div>

            <div className="flex items-center justify-center gap-2 text-sm text-purple-400">
              <Eye size={16} />
              <span>Color Display Required — Use a calibrated screen for best results</span>
            </div>

            <button
              onClick={startTest}
              className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white font-bold rounded-lg sm:rounded-xl transition-all shadow-lg shadow-purple-500/30 text-base sm:text-lg touch-manipulation min-h-[48px]"
            >
              <Play size={20} className="sm:w-6 sm:h-6" />
              <span>Start Test</span>
            </button>
          </div>
        )}

        {/* TESTING STATE */}
        {state === TEST_STATES.TESTING && (
          <div className="space-y-6 sm:space-y-8">
            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-dark-400">
                <span>Plate {currentPlateIndex + 1} of {COLOR_PLATES.length}</span>
                <span>{answers.filter(a => a.isCorrect).length} correct</span>
              </div>
              <div className="w-full bg-dark-800 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-violet-500 rounded-full transition-all duration-500"
                  style={{ width: `${((currentPlateIndex + 1) / COLOR_PLATES.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Color Plate */}
            <div className="flex justify-center">
              <div className="relative">
                <ColorPlateSVG plate={COLOR_PLATES[currentPlateIndex]} size={280} />
                {showFeedback && (
                  <div className={`absolute inset-0 rounded-full flex items-center justify-center bg-black/50 ${selected === COLOR_PLATES[currentPlateIndex].answer ? 'border-4 border-green-500' : 'border-4 border-red-500'}`}>
                    {selected === COLOR_PLATES[currentPlateIndex].answer
                      ? <CheckCircle size={64} className="text-green-400" />
                      : <XCircle size={64} className="text-red-400" />
                    }
                  </div>
                )}
              </div>
            </div>

            {/* Question */}
            <p className="text-white text-lg sm:text-xl font-semibold">
              {COLOR_PLATES[currentPlateIndex].description}
            </p>

            {/* Answer Options */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto">
              {options.map((option) => {
                const plate = COLOR_PLATES[currentPlateIndex];
                let btnClass = 'bg-dark-800 hover:bg-dark-700 border-2 border-dark-700 hover:border-purple-500/50 text-white';
                if (showFeedback) {
                  if (option === plate.answer) {
                    btnClass = 'bg-green-500/20 border-2 border-green-500 text-green-400';
                  } else if (option === selected) {
                    btnClass = 'bg-red-500/20 border-2 border-red-500 text-red-400';
                  } else {
                    btnClass = 'bg-dark-800 border-2 border-dark-700 text-dark-500 opacity-50';
                  }
                }
                return (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    disabled={showFeedback}
                    className={`py-3 sm:py-4 text-xl sm:text-2xl font-bold rounded-xl transition-all touch-manipulation min-h-[56px] ${btnClass}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            <p className="text-dark-400 text-xs sm:text-sm">
              Tap the number you see in the pattern above
            </p>
          </div>
        )}

        {/* RESULT STATE */}
        {state === TEST_STATES.RESULT && (
          <div className="w-full">
            <EnhancedResultCard
              score={getFinalScore()}
              scoreLabel="%"
              level={getColorBlindLevel(getFinalScore())}
              percentile={getColorBlindPercentile(getFinalScore())}
              motivation={getColorBlindMotivation(getFinalScore())}
              comparisonMessage={getComparisonMessage(getColorBlindPercentile(getFinalScore()))}
              onRetry={(e) => {
                if (e) e.stopPropagation();
                retry();
              }}
              testId="color-blind-test"
              suggestedTests={getSuggestedTests('color-blind')}
              shareMessage={generateShareMessage(
                'Color Blindness Test',
                `${getFinalScore()}% (${getCorrectCount()}/${COLOR_PLATES.length} correct)`,
                getColorBlindLevel(getFinalScore()).name
              )}
              additionalStats={[
                { label: 'Correct', value: `${getCorrectCount()}/${COLOR_PLATES.length}` },
                { label: 'Accuracy', value: `${getFinalScore()}%` },
                { label: 'Result', value: getFinalScore() >= 80 ? 'Normal' : getFinalScore() >= 50 ? 'Mild' : 'Deficiency' },
                { label: 'Type', value: getFinalScore() >= 80 ? 'Normal Vision' : 'Check Needed' },
              ]}
            >
              {/* Plate breakdown */}
              <div className="mt-6 text-left">
                <h4 className="text-sm font-semibold text-white mb-3">Plate Results</h4>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {answers.map((result, idx) => (
                    <div
                      key={idx}
                      className={`p-2 rounded-lg text-center text-xs ${
                        result.isCorrect
                          ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                          : 'bg-red-500/10 border border-red-500/30 text-red-400'
                      }`}
                    >
                      <div className="font-bold">#{idx + 1}</div>
                      <div className="text-[10px] mt-0.5">{result.isCorrect ? '✓' : '✗'}</div>
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

export default ColorBlindTestArea;
