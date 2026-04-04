import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, AlertCircle, CheckCircle2, RotateCcw, Share2, Home } from 'lucide-react';

const questions = [
  // Attention / Focus (10 questions)
  "How often do you have difficulty staying focused on tasks or activities?",
  "How often do you make careless mistakes in work or daily activities?",
  "How often do you have trouble sustaining attention while reading or listening?",
  "How often do you feel easily distracted by external stimuli?",
  "How often do you find your mind wandering during conversations?",
  "How often do you forget what you were doing in the middle of a task?",
  "How often do you struggle to complete tasks that require concentration?",
  "How often do you overlook details in important tasks?",
  "How often do you need to re-read information multiple times to understand it?",
  "How often do you lose focus during long or repetitive tasks?",

  // Organization / Execution (8 questions)
  "How often do you have difficulty organizing tasks or responsibilities?",
  "How often do you procrastinate on important tasks?",
  "How often do you feel overwhelmed by your daily workload?",
  "How often do you fail to finish tasks once they become challenging?",
  "How often do you misplace important items (keys, phone, documents)?",
  "How often do you struggle to manage your time effectively?",
  "How often do you forget appointments or deadlines?",
  "How often do you start tasks but fail to complete them?",

  // Impulsivity / Hyperactivity (7 questions)
  "How often do you feel restless or unable to stay still?",
  "How often do you feel the need to constantly move or fidget?",
  "How often do you interrupt others while they are speaking?",
  "How often do you find it difficult to wait your turn?",
  "How often do you act without thinking about consequences?",
  "How often do you feel impatient in everyday situations?",
  "How often do you speak excessively in conversations?"
];

const answerOptions = [
  { label: 'Never', value: 0 },
  { label: 'Rarely', value: 1 },
  { label: 'Sometimes', value: 2 },
  { label: 'Often', value: 3 },
  { label: 'Very Often', value: 4 },
];

const AdhdTestPage = () => {
  const [testState, setTestState] = useState('intro'); // 'intro', 'testing', 'section-break', 'results'
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [sectionBreakType, setSectionBreakType] = useState('');

  const totalQuestions = questions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleStart = () => {
    setTestState('testing');
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedAnswer(null);
  };

  const handleAnswerSelect = (value) => {
    setSelectedAnswer(value);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);
    setSelectedAnswer(null);

    // Check for section breaks
    if (currentQuestion === 9) {
      // After question 10 (index 9)
      setSectionBreakType('focus');
      setTestState('section-break');
    } else if (currentQuestion === 17) {
      // After question 18 (index 17)
      setSectionBreakType('organization');
      setTestState('section-break');
    } else if (currentQuestion === totalQuestions - 1) {
      // Test complete
      setTestState('results');
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleContinueFromBreak = () => {
    setTestState('testing');
    setCurrentQuestion(currentQuestion + 1);
  };

  const calculateScore = () => {
    const totalScore = answers.reduce((sum, answer) => sum + answer, 0);
    return totalScore;
  };

  const getScoreCategory = (score) => {
    if (score <= 25) return { label: 'Low Likelihood', color: 'green', description: 'Your responses suggest minimal signs of ADHD-related behaviors.' };
    if (score <= 50) return { label: 'Mild Signs', color: 'yellow', description: 'Your responses indicate some behaviors that may be associated with attention challenges.' };
    if (score <= 75) return { label: 'Moderate Signs', color: 'orange', description: 'Your responses show moderate patterns that are commonly associated with ADHD.' };
    return { label: 'High Likelihood', color: 'red', description: 'Your responses indicate significant patterns that are commonly associated with ADHD.' };
  };

  const handleRetry = () => {
    setTestState('intro');
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedAnswer(null);
  };

  const handleShare = () => {
    alert('Share functionality (UI only)');
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
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-2xl">
                    🎯
                  </div>
                  <div>
                    <h1 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
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
            <div className="inline-flex w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 items-center justify-center text-5xl mb-6 shadow-xl">
              🎯
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              ADHD Self-Assessment Test
            </h1>
            <p className="text-lg text-dark-300 max-w-2xl mx-auto">
              A behavioral self-assessment to help you understand patterns related to attention, focus, and impulse control.
            </p>
          </div>

          {/* Disclaimer */}
          <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <AlertCircle className="text-yellow-500 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Important Disclaimer</h3>
                <p className="text-dark-300 leading-relaxed">
                  This test is <strong className="text-white">not a medical diagnosis</strong>. It is designed for educational and self-awareness purposes only. If you have concerns about ADHD or related symptoms, please consult with a qualified healthcare professional for a comprehensive evaluation.
                </p>
              </div>
            </div>
          </div>

          {/* Test Info */}
          <div className="bg-dark-900/50 border border-dark-800 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold text-white mb-4">What to Expect</h3>
            <div className="space-y-3 text-dark-300">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-blue-500 flex-shrink-0 mt-0.5" size={20} />
                <p><strong className="text-white">25 Questions</strong> covering attention, organization, and impulse control</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-blue-500 flex-shrink-0 mt-0.5" size={20} />
                <p><strong className="text-white">5 minutes</strong> to complete</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-blue-500 flex-shrink-0 mt-0.5" size={20} />
                <p><strong className="text-white">Instant results</strong> with detailed insights</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-blue-500 flex-shrink-0 mt-0.5" size={20} />
                <p><strong className="text-white">Anonymous</strong> - no personal data collected</p>
              </div>
            </div>
          </div>

          {/* Start Button */}
          <button
            onClick={handleStart}
            className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-bold text-lg rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
          >
            Start Test
          </button>
        </main>
      </div>
    );
  }

  // SECTION BREAK
  if (testState === 'section-break') {
    const breakTitle = sectionBreakType === 'focus' 
      ? 'Focus Section Completed' 
      : 'Organization Section Completed';
    const breakIcon = sectionBreakType === 'focus' ? '✓' : '✓';

    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center animate-fade-in">
          <div className="inline-flex w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 items-center justify-center text-5xl mb-6 shadow-xl">
            {breakIcon}
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">{breakTitle}</h2>
          <p className="text-dark-300 mb-8">
            You're doing great! Let's continue to the next section.
          </p>
          <button
            onClick={handleContinueFromBreak}
            className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-bold text-lg rounded-xl transition-all duration-300 hover:scale-[1.02]"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  // RESULTS SCREEN
  if (testState === 'results') {
    const score = calculateScore();
    const category = getScoreCategory(score);
    
    return (
      <div className="min-h-screen bg-dark-950">
        <header className="sticky top-0 z-40 bg-dark-900/95 backdrop-blur-sm border-b border-dark-800">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-2xl">
                  🎯
                </div>
                <div>
                  <h1 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
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
            <p className="text-dark-400">Based on your responses</p>
          </div>

          {/* Score Card */}
          <div className="bg-gradient-to-br from-dark-900 to-dark-800 border border-dark-700 rounded-2xl p-8 mb-6 text-center">
            <div className="mb-6">
              <div className="text-7xl font-bold text-white mb-2">{score}</div>
              <div className="text-dark-400 text-sm">out of 100</div>
            </div>
            
            <div className={`inline-block px-6 py-3 rounded-xl text-lg font-bold ${
              category.color === 'green' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
              category.color === 'yellow' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
              category.color === 'orange' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
              'bg-red-500/20 text-red-400 border border-red-500/30'
            }`}>
              {category.label}
            </div>
          </div>

          {/* Explanation */}
          <div className="bg-dark-900/50 border border-dark-800 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold text-white mb-3">What This Means</h3>
            <p className="text-dark-300 leading-relaxed mb-4">
              {category.description}
            </p>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <p className="text-dark-200 text-sm">
                <strong className="text-white">Recommendation:</strong> Consider speaking with a qualified healthcare professional for a comprehensive evaluation and personalized guidance.
              </p>
            </div>
          </div>

          {/* Score Breakdown */}
          <div className="bg-dark-900/50 border border-dark-800 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold text-white mb-4">Understanding Your Score</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-dark-300">0 - 25</span>
                <span className="text-green-400 font-medium">Low Likelihood</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-dark-300">26 - 50</span>
                <span className="text-yellow-400 font-medium">Mild Signs</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-dark-300">51 - 75</span>
                <span className="text-orange-400 font-medium">Moderate Signs</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-dark-300">76 - 100</span>
                <span className="text-red-400 font-medium">High Likelihood</span>
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
            <button
              onClick={handleShare}
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-bold rounded-xl transition-all"
            >
              <Share2 size={20} />
              Share Result
            </button>
          </div>

          {/* Back to Home */}
          <div className="mt-8 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 text-dark-400 hover:text-white hover:bg-dark-800 rounded-lg transition-colors"
            >
              <Home size={18} />
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // TESTING SCREEN (Questions)
  return (
    <div className="min-h-screen bg-dark-950">
      <header className="sticky top-0 z-40 bg-dark-900/95 backdrop-blur-sm border-b border-dark-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-2xl">
                🎯
              </div>
              <div>
                <h1 className="text-sm font-bold text-white">ADHD Self-Assessment</h1>
                <p className="text-xs text-dark-400">
                  Question {currentQuestion + 1} of {totalQuestions}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-dark-900 h-2">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-600 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="bg-gradient-to-br from-dark-900 to-dark-800 border border-dark-700 rounded-2xl p-8 mb-8">
          {/* Question Number */}
          <div className="text-blue-400 text-sm font-medium mb-4">
            Question {currentQuestion + 1} / {totalQuestions}
          </div>

          {/* Question Text */}
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-relaxed">
            {questions[currentQuestion]}
          </h2>

          {/* Answer Options */}
          <div className="space-y-3">
            {answerOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswerSelect(option.value)}
                className={`w-full text-left px-6 py-4 rounded-xl border-2 transition-all duration-200 ${
                  selectedAnswer === option.value
                    ? 'bg-blue-500/20 border-blue-500 text-white shadow-lg scale-[1.02]'
                    : 'bg-dark-800/50 border-dark-700 text-dark-300 hover:border-dark-600 hover:bg-dark-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-lg">{option.label}</span>
                  {selectedAnswer === option.value && (
                    <CheckCircle2 className="text-blue-400" size={24} />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={selectedAnswer === null}
          className={`w-full py-4 font-bold text-lg rounded-xl transition-all duration-300 ${
            selectedAnswer !== null
              ? 'bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white hover:scale-[1.02] hover:shadow-xl cursor-pointer'
              : 'bg-dark-800 text-dark-500 cursor-not-allowed'
          }`}
        >
          {currentQuestion === totalQuestions - 1 ? 'See Results' : 'Next Question'}
        </button>

        {/* Progress Indicator */}
        <div className="mt-6 text-center text-sm text-dark-500">
          {Math.round(progress)}% Complete
        </div>
      </main>
    </div>
  );
};

export default AdhdTestPage;
