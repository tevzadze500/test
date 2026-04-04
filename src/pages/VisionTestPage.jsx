import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, AlertCircle, Eye, RotateCcw, Home, CheckCircle2 } from 'lucide-react';

// Letters commonly used in vision tests
const TEST_LETTERS = ['C', 'D', 'E', 'F', 'H', 'K', 'N', 'O', 'P', 'R', 'S', 'V', 'Z'];

// 10 levels with decreasing font sizes
const LEVELS = [
  { level: 1, fontSize: 200, label: '20/200' },
  { level: 2, fontSize: 160, label: '20/160' },
  { level: 3, fontSize: 130, label: '20/130' },
  { level: 4, fontSize: 100, label: '20/100' },
  { level: 5, fontSize: 80, label: '20/80' },
  { level: 6, fontSize: 60, label: '20/60' },
  { level: 7, fontSize: 45, label: '20/40' },
  { level: 8, fontSize: 35, label: '20/30' },
  { level: 9, fontSize: 28, label: '20/25' },
  { level: 10, fontSize: 22, label: '20/20' },
];

const MAX_MISTAKES = 2; // Allow 2 mistakes per level before failing

const VisionTestPage = () => {
  const [testState, setTestState] = useState('intro'); // 'intro', 'testing', 'results'
  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentLetter, setCurrentLetter] = useState('');
  const [options, setOptions] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [levelMistakes, setLevelMistakes] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastCompletedLevel, setLastCompletedLevel] = useState(0);

  // Generate a new question
  const generateQuestion = () => {
    const letter = TEST_LETTERS[Math.floor(Math.random() * TEST_LETTERS.length)];
    
    // Generate 3 wrong options
    const wrongOptions = [];
    while (wrongOptions.length < 3) {
      const randomLetter = TEST_LETTERS[Math.floor(Math.random() * TEST_LETTERS.length)];
      if (randomLetter !== letter && !wrongOptions.includes(randomLetter)) {
        wrongOptions.push(randomLetter);
      }
    }
    
    // Mix correct answer with wrong ones
    const allOptions = [letter, ...wrongOptions].sort(() => Math.random() - 0.5);
    
    setCurrentLetter(letter);
    setOptions(allOptions);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const handleStart = () => {
    setTestState('testing');
    setCurrentLevel(0);
    setCorrectAnswers(0);
    setMistakes(0);
    setLevelMistakes(0);
    setLastCompletedLevel(0);
    generateQuestion();
  };

  const handleAnswerSelect = (answer) => {
    if (showFeedback) return; // Prevent selecting while showing feedback
    
    setSelectedAnswer(answer);
    setShowFeedback(true);

    if (answer === currentLetter) {
      // Correct answer
      setCorrectAnswers(correctAnswers + 1);
      
      // Wait a bit then move to next question or level
      setTimeout(() => {
        if (currentLevel < LEVELS.length - 1) {
          // Move to next level
          setCurrentLevel(currentLevel + 1);
          setLastCompletedLevel(currentLevel + 1);
          setLevelMistakes(0);
          generateQuestion();
        } else {
          // Test complete - perfect score!
          setTestState('results');
        }
      }, 1000);
    } else {
      // Wrong answer
      const newMistakes = mistakes + 1;
      const newLevelMistakes = levelMistakes + 1;
      setMistakes(newMistakes);
      setLevelMistakes(newLevelMistakes);
      
      setTimeout(() => {
        if (newLevelMistakes >= MAX_MISTAKES) {
          // Failed this level - end test
          setTestState('results');
        } else {
          // Try again with a new letter
          generateQuestion();
        }
      }, 1000);
    }
  };

  const getVisionResult = () => {
    const level = lastCompletedLevel;
    
    if (level >= 9) {
      return {
        category: 'Excellent Vision',
        acuity: '20/20',
        color: 'green',
        description: 'Outstanding! Your visual acuity appears to be at the standard level. You successfully identified letters at the smallest size.',
        icon: '🎯'
      };
    } else if (level >= 7) {
      return {
        category: 'Good Vision',
        acuity: '20/30',
        color: 'blue',
        description: 'Great job! Your visual acuity is quite good. You performed well with small letters.',
        icon: '👁️'
      };
    } else if (level >= 4) {
      return {
        category: 'Average Vision',
        acuity: '20/50',
        color: 'yellow',
        description: 'Your visual acuity is in the average range. You may benefit from an eye examination.',
        icon: '👓'
      };
    } else {
      return {
        category: 'Below Average Vision',
        acuity: '20/100',
        color: 'orange',
        description: 'You had difficulty with smaller letters. Consider scheduling an eye examination.',
        icon: '🔍'
      };
    }
  };

  const handleRetry = () => {
    setTestState('intro');
  };

  // INTRO SCREEN
  if (testState === 'intro') {
    return (
      <div className="min-h-screen bg-dark-950">
        <header className="sticky top-0 z-40 bg-dark-900/95 backdrop-blur-sm border-b border-dark-800">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <Link to="/" className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-2xl">
                    👁️
                  </div>
                  <div>
                    <h1 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                      TestHub
                    </h1>
                    <p className="text-xs text-dark-400">Testing Platform</p>
                  </div>
                </Link>
                
                <div className="h-8 w-px bg-dark-800" />
                
                <Link
                  to="/"
                  className="flex items-center gap-2 px-4 py-2 text-dark-400 hover:text-white hover:bg-dark-800 rounded-lg transition-colors"
                >
                  <ArrowLeft size={16} />
                  <span className="text-sm font-medium">Back to Dashboard</span>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-6 py-12">
          <div className="text-center mb-8">
            <div className="inline-flex w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 items-center justify-center text-5xl mb-6 shadow-xl">
              👁️
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Visual Acuity Test
            </h1>
            <p className="text-lg text-dark-300 max-w-2xl mx-auto">
              Check your eyesight and visual clarity with this interactive screening simulation.
            </p>
          </div>

          {/* Disclaimer */}
          <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <AlertCircle className="text-yellow-500 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Important Disclaimer</h3>
                <p className="text-dark-300 leading-relaxed">
                  This is <strong className="text-white">not a medical test</strong>. It is an interactive simulation for educational purposes only. For accurate vision assessment, please consult with a qualified eye care professional.
                </p>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-dark-900/50 border border-dark-800 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold text-white mb-4">How It Works</h3>
            <div className="space-y-3 text-dark-300">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-purple-500 flex-shrink-0 mt-0.5" size={20} />
                <p><strong className="text-white">Sit comfortably</strong> at arm's length from your screen</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-purple-500 flex-shrink-0 mt-0.5" size={20} />
                <p><strong className="text-white">Optional:</strong> Cover one eye to test each eye separately</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-purple-500 flex-shrink-0 mt-0.5" size={20} />
                <p><strong className="text-white">Identify letters</strong> that appear on screen</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-purple-500 flex-shrink-0 mt-0.5" size={20} />
                <p><strong className="text-white">10 levels</strong> - letters get progressively smaller</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-purple-500 flex-shrink-0 mt-0.5" size={20} />
                <p><strong className="text-white">Choose correctly</strong> from 4 options</p>
              </div>
            </div>
          </div>

          {/* Start Button */}
          <button
            onClick={handleStart}
            className="w-full py-4 bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white font-bold text-lg rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
          >
            <div className="flex items-center justify-center gap-2">
              <Eye size={24} />
              <span>Start Test</span>
            </div>
          </button>
        </main>
      </div>
    );
  }

  // RESULTS SCREEN
  if (testState === 'results') {
    const result = getVisionResult();
    
    return (
      <div className="min-h-screen bg-dark-950">
        <header className="sticky top-0 z-40 bg-dark-900/95 backdrop-blur-sm border-b border-dark-800">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-2xl">
                  👁️
                </div>
                <div>
                  <h1 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                    TestHub
                  </h1>
                  <p className="text-xs text-dark-400">Testing Platform</p>
                </div>
              </Link>
            </div>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-6 py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Your Results
            </h1>
            <p className="text-dark-400">Based on your performance</p>
          </div>

          {/* Result Card */}
          <div className="bg-gradient-to-br from-dark-900 to-dark-800 border border-dark-700 rounded-2xl p-8 mb-6 text-center">
            <div className="text-6xl mb-4">{result.icon}</div>
            <div className="text-5xl font-bold text-white mb-2">{result.acuity}</div>
            <div className={`inline-block px-6 py-3 rounded-xl text-lg font-bold ${
              result.color === 'green' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
              result.color === 'blue' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
              result.color === 'yellow' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
              'bg-orange-500/20 text-orange-400 border border-orange-500/30'
            }`}>
              {result.category}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-dark-900/50 border border-dark-800 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-white mb-1">{lastCompletedLevel + 1}</div>
              <div className="text-sm text-dark-400">Levels Completed</div>
            </div>
            <div className="bg-dark-900/50 border border-dark-800 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-white mb-1">{correctAnswers}</div>
              <div className="text-sm text-dark-400">Correct Answers</div>
            </div>
          </div>

          {/* Explanation */}
          <div className="bg-dark-900/50 border border-dark-800 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold text-white mb-3">What This Means</h3>
            <p className="text-dark-300 leading-relaxed mb-4">
              {result.description}
            </p>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <p className="text-dark-200 text-sm">
                <strong className="text-white">Recommendation:</strong> If you have concerns about your vision, consult an eye care specialist for a comprehensive examination.
              </p>
            </div>
          </div>

          {/* Visual Acuity Reference */}
          <div className="bg-dark-900/50 border border-dark-800 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold text-white mb-4">Understanding Visual Acuity</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-dark-300">20/20</span>
                <span className="text-green-400 font-medium">Normal Vision</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-dark-300">20/30</span>
                <span className="text-blue-400 font-medium">Slight Impairment</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-dark-300">20/50</span>
                <span className="text-yellow-400 font-medium">Moderate Impairment</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-dark-300">20/100+</span>
                <span className="text-orange-400 font-medium">Significant Impairment</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleRetry}
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-dark-800 hover:bg-dark-700 border border-dark-700 hover:border-dark-600 text-white font-bold rounded-xl transition-all"
            >
              <RotateCcw size={20} />
              Retry Test
            </button>
            <Link
              to="/"
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white font-bold rounded-xl transition-all"
            >
              <Home size={20} />
              Back to Home
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // TESTING SCREEN
  const currentLevelData = LEVELS[currentLevel];
  
  return (
    <div className="min-h-screen bg-dark-950">
      <header className="sticky top-0 z-40 bg-dark-900/95 backdrop-blur-sm border-b border-dark-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-2xl">
                👁️
              </div>
              <div>
                <h1 className="text-sm font-bold text-white">Visual Acuity Test</h1>
                <p className="text-xs text-dark-400">
                  Level {currentLevel + 1} / {LEVELS.length} - {currentLevelData.label}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-dark-400">
                Mistakes: <span className="text-white font-bold">{levelMistakes}/{MAX_MISTAKES}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-dark-900 h-2">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-violet-600 transition-all duration-500"
            style={{ width: `${((currentLevel + 1) / LEVELS.length) * 100}%` }}
          />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Letter Display */}
        <div className="bg-gradient-to-br from-dark-900 to-dark-800 border border-dark-700 rounded-2xl p-12 mb-8 text-center min-h-[400px] flex items-center justify-center">
          <div 
            className={`font-bold text-white transition-all duration-300 ${
              showFeedback && selectedAnswer === currentLetter ? 'text-green-400' :
              showFeedback && selectedAnswer !== currentLetter ? 'text-red-400' : ''
            }`}
            style={{ 
              fontSize: `${currentLevelData.fontSize}px`,
              fontFamily: 'monospace',
              letterSpacing: '0.1em'
            }}
          >
            {currentLetter}
          </div>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswerSelect(option)}
              disabled={showFeedback}
              className={`py-6 text-3xl font-bold rounded-xl border-2 transition-all duration-200 ${
                showFeedback && option === currentLetter
                  ? 'bg-green-500/20 border-green-500 text-green-400'
                  : showFeedback && option === selectedAnswer && option !== currentLetter
                  ? 'bg-red-500/20 border-red-500 text-red-400'
                  : !showFeedback && selectedAnswer === option
                  ? 'bg-purple-500/20 border-purple-500 text-white'
                  : 'bg-dark-800/50 border-dark-700 text-dark-300 hover:border-dark-600 hover:bg-dark-800'
              } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Feedback Message */}
        {showFeedback && (
          <div className={`mt-6 text-center text-lg font-medium ${
            selectedAnswer === currentLetter ? 'text-green-400' : 'text-red-400'
          }`}>
            {selectedAnswer === currentLetter ? '✓ Correct!' : '✗ Incorrect'}
          </div>
        )}

        {/* Progress Info */}
        <div className="mt-8 text-center text-sm text-dark-500">
          Correct Answers: {correctAnswers}
        </div>
      </main>
    </div>
  );
};

export default VisionTestPage;
