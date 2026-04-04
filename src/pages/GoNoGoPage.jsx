import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Clock, Users, Trophy } from 'lucide-react';
import GoNoGoTestArea from '../components/test/GoNoGoTestArea';
import GoNoGoStatsCard from '../components/test/GoNoGoStatsCard';
import EnhancedResultCard from '../components/EnhancedResultCard';
import { 
  getGoNoGoLevel, 
  getGoNoGoMotivation,
  generateShareMessage,
  getSuggestedTests
} from '../utils/scoreUtils';

const GoNoGoPage = () => {
  const [testComplete, setTestComplete] = useState(false);
  const [currentStats, setCurrentStats] = useState({
    accuracy: null,
    avgReactionTime: null,
    errors: null,
    inhibitionScore: null,
    falseStarts: null,
    totalTrials: null,
  });

  const handleTestComplete = (stats) => {
    setCurrentStats(stats);
    setTestComplete(true);
  };

  const handleRetry = () => {
    setTestComplete(false);
    setCurrentStats({
      accuracy: null,
      avgReactionTime: null,
      errors: null,
      inhibitionScore: null,
      falseStarts: null,
      totalTrials: null,
    });
  };

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-dark-900/95 backdrop-blur-sm border-b border-dark-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Brand + Back */}
            <div className="flex items-center gap-6">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-2xl">
                  🚦
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

            {/* Right: Quick Stats */}
            <div className="hidden md:flex items-center gap-4">
              {testComplete && (
                <>
                  <div className="flex items-center gap-2 px-4 py-2 bg-dark-800 rounded-lg">
                    <Trophy size={16} className="text-blue-500" />
                    <div className="text-xs">
                      <div className="text-dark-400">Accuracy</div>
                      <div className="text-white font-bold">{currentStats.accuracy}%</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-dark-800 rounded-lg">
                    <Clock size={16} className="text-green-500" />
                    <div className="text-xs">
                      <div className="text-dark-400">Avg Time</div>
                      <div className="text-white font-bold">
                        {currentStats.avgReactionTime ? `${currentStats.avgReactionTime}ms` : '—'}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 lg:py-12">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-3xl shadow-lg">
              🚦
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Go/No-Go Reaction Test
              </h1>
              <p className="text-dark-400 mt-1">
                Measure your cognitive inhibition and impulse control
              </p>
            </div>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-dark-800/50 rounded-lg border border-dark-700">
              <span className="text-dark-400">Category:</span>
              <span className="text-blue-400 font-medium">Cognitive</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-dark-800/50 rounded-lg border border-dark-700">
              <Clock size={14} className="text-blue-400" />
              <span className="text-white">2 min</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-dark-800/50 rounded-lg border border-dark-700">
              <span className="text-dark-400">Difficulty:</span>
              <span className="text-yellow-400 font-medium">Medium</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-dark-800/50 rounded-lg border border-dark-700">
              <Users size={14} className="text-purple-400" />
              <span className="text-white">38K+ participants</span>
            </div>
          </div>
        </div>

        {/* Test Area + Stats */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Test Area (2 columns on large screens) */}
          <div className="lg:col-span-2">
            {!testComplete ? (
              <GoNoGoTestArea onComplete={handleTestComplete} />
            ) : (
              <EnhancedResultCard
                score={currentStats.accuracy}
                scoreLabel="%"
                level={getGoNoGoLevel(currentStats.accuracy)}
                percentile={currentStats.accuracy >= 90 ? 95 : currentStats.accuracy >= 75 ? 80 : currentStats.accuracy >= 60 ? 60 : 40}
                motivation={getGoNoGoMotivation(currentStats.accuracy)}
                comparisonMessage={
                  currentStats.accuracy >= 90 
                    ? "You're in the top tier of cognitive control! Outstanding! 🌟"
                    : currentStats.accuracy >= 75
                    ? "Better than most users! Great impulse control! 🎯"
                    : currentStats.accuracy >= 60
                    ? "Above average performance! Keep training! 💪"
                    : "Keep practicing to improve your inhibition skills! 🚀"
                }
                onRetry={handleRetry}
                testId="go-no-go"
                suggestedTests={getSuggestedTests('go-no-go')}
                shareMessage={generateShareMessage('Go/No-Go Test', `${currentStats.accuracy}% accuracy`, getGoNoGoLevel(currentStats.accuracy).name)}
                additionalStats={[
                  { label: 'Avg Speed', value: currentStats.avgReactionTime ? `${currentStats.avgReactionTime}ms` : '—' },
                  { label: 'Inhibition', value: `${currentStats.inhibitionScore}%` },
                  { label: 'Errors', value: currentStats.errors },
                  { label: 'False Starts', value: currentStats.falseStarts },
                ]}
              />
            )}
          </div>

          {/* Stats Sidebar (1 column on large screens) */}
          <div className="lg:col-span-1">
            <GoNoGoStatsCard stats={currentStats} onRetry={testComplete ? handleRetry : null} />
          </div>
        </div>

        {/* Informational Content Section */}
        <div className="border-t border-dark-800 pt-12">
          <div className="space-y-8">
            {/* About Section */}
            <section>
              <h2 className="text-3xl font-bold text-white mb-4">About the Go/No-Go Test</h2>
              <p className="text-dark-300 text-lg leading-relaxed">
                The Go/No-Go test is a cognitive assessment that measures response inhibition and impulse control. 
                It evaluates your ability to execute a response when appropriate (GO signal) and withhold a response 
                when necessary (NO-GO signal). This test is commonly used in neuropsychological assessments and 
                research on executive function.
              </p>
            </section>

            {/* How It Works */}
            <section className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">How It Works</h3>
              <div className="grid md:grid-cols-2 gap-6 text-dark-300">
                <div>
                  <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-green-500" />
                    GO Signal (Green)
                  </h4>
                  <p className="text-sm">Click as quickly as possible when you see the green circle. This measures your reaction time and processing speed.</p>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-red-500" />
                    NO-GO Signal (Red)
                  </h4>
                  <p className="text-sm">Do NOT click when you see the red circle. This measures your ability to inhibit prepotent responses.</p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
                <p className="text-sm text-dark-300">
                  <strong className="text-blue-400">Test Structure:</strong> 10 trials total with 80% GO signals and 20% NO-GO signals, 
                  presented in random order with variable delays between 1.5-4 seconds.
                </p>
              </div>
            </section>

            {/* What It Measures */}
            <section className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Clinical Applications</h3>
              <p className="text-dark-300 mb-4">
                The Go/No-Go test is widely used in research and clinical settings to assess:
              </p>
              <ul className="space-y-2 text-dark-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span><strong className="text-white">ADHD:</strong> Individuals with ADHD often show impaired performance on inhibition tasks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span><strong className="text-white">Executive Function:</strong> Measures frontal lobe function and cognitive control</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span><strong className="text-white">Neurological Conditions:</strong> Useful for assessing brain injury, Parkinson's, and other disorders</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-1">•</span>
                  <span><strong className="text-white">Impulse Control Disorders:</strong> Helps evaluate self-regulation abilities</span>
                </li>
              </ul>
            </section>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-dark-800 hover:bg-dark-700 border border-dark-700 hover:border-dark-600 rounded-lg text-white transition-colors"
          >
            <Home size={18} />
            <span>Explore More Tests</span>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-dark-800 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-dark-400">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-sm">
                🚦
              </div>
              <span>© 2026 TestHub. Professional Testing Platform.</span>
            </div>
            <div className="flex items-center gap-6">
              <span>No signup required</span>
              <span>•</span>
              <span>Instant results</span>
              <span>•</span>
              <span>Free to use</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GoNoGoPage;
