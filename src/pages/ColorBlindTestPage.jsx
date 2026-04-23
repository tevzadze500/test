import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Eye, Clock, Users, Palette } from 'lucide-react';
import ColorBlindTestArea from '../components/test/ColorBlindTestArea';
import ColorBlindStatsCard from '../components/test/ColorBlindStatsCard';

const ColorBlindTestPage = () => {
  const [stats, setStats] = useState({
    bestScore: null,
    latestScore: null,
    averageScore: null,
    attempts: 0,
    allScores: [],
  });

  useEffect(() => {
    const savedStats = localStorage.getItem('colorBlindTestStats');
    if (savedStats) {
      try {
        setStats(JSON.parse(savedStats));
      } catch (e) {
        console.error('Failed to parse stats:', e);
      }
    }
  }, []);

  useEffect(() => {
    if (stats.attempts > 0) {
      localStorage.setItem('colorBlindTestStats', JSON.stringify(stats));
    }
  }, [stats]);

  const handleResult = ({ score }) => {
    setStats((prevStats) => {
      const newScores = [...prevStats.allScores, score];
      const newBest = prevStats.bestScore ? Math.max(prevStats.bestScore, score) : score;
      const newAverage = Math.round(newScores.reduce((sum, s) => sum + s, 0) / newScores.length);
      return {
        bestScore: newBest,
        latestScore: score,
        averageScore: newAverage,
        attempts: prevStats.attempts + 1,
        allScores: newScores,
      };
    });
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all your color blindness test stats?')) {
      setStats({ bestScore: null, latestScore: null, averageScore: null, attempts: 0, allScores: [] });
      localStorage.removeItem('colorBlindTestStats');
    }
  };

  const closeWindow = () => window.close();

  return (
    <div className="min-h-screen bg-dark-950">
      <Helmet>
        <title>Color Blindness Test - Quick Screening | TestHub</title>
        <meta name="description" content="Free online color blindness test. Detect color vision deficiencies with Ishihara-style plates. Quick 3-minute screening, instant results, no signup required." />
        <meta name="keywords" content="color blindness test, color vision test, Ishihara test, color deficiency, red green color blind, color vision screening" />
        <meta property="og:title" content="Color Blindness Test - Quick Screening" />
        <meta property="og:description" content="Detect color vision deficiencies with our free online color blindness test." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://reactiontestpro.com/test/color-blind" />
      </Helmet>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-dark-900/95 backdrop-blur-sm border-b border-dark-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center">
                  <Palette size={20} className="text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-white">TestHub</h1>
                  <p className="text-xs text-dark-400">Quick screening</p>
                </div>
              </div>
              <div className="h-8 w-px bg-dark-800" />
              <button
                onClick={closeWindow}
                className="flex items-center gap-2 px-4 py-2 text-dark-400 hover:text-white hover:bg-dark-800 rounded-lg transition-colors"
              >
                <ArrowLeft size={16} />
                <span className="text-sm font-medium">Close</span>
              </button>
            </div>
            <div className="hidden md:flex items-center gap-4">
              {stats.attempts > 0 && (
                <div className="flex items-center gap-2 px-4 py-2 bg-dark-800 rounded-lg">
                  <Eye size={16} className="text-purple-500" />
                  <div className="text-xs">
                    <div className="text-dark-400">Best</div>
                    <div className="text-white font-bold">{stats.bestScore}%</div>
                  </div>
                </div>
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
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-lg">
              <Palette size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">Color Blindness Test</h1>
              <p className="text-dark-400 mt-1">Detect color vision deficiencies</p>
            </div>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-dark-800/50 rounded-lg border border-dark-700">
              <Clock size={14} className="text-blue-400" />
              <span className="text-white">3 min</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-dark-800/50 rounded-lg border border-dark-700">
              <Users size={14} className="text-purple-400" />
              <span className="text-white">95K+ participants</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-dark-800/50 rounded-lg border border-dark-700">
              <Palette size={14} className="text-purple-400" />
              <span className="text-purple-400 font-medium">Color Display</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-dark-800/50 rounded-lg border border-dark-700">
              <span className="text-white font-medium">Quick</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-dark-800/50 rounded-lg border border-dark-700">
              <span className="text-dark-400">Difficulty:</span>
              <span className="text-green-400 font-medium">Easy</span>
            </div>
          </div>
        </div>

        {/* Test Area + Stats */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <ColorBlindTestArea onResult={handleResult} />
          </div>
          <div className="lg:col-span-1">
            <ColorBlindStatsCard stats={stats} onReset={handleReset} />
          </div>
        </div>

        {/* Informational Content */}
        <div className="border-t border-dark-800 pt-12 space-y-8">
          <section>
            <h2 className="text-3xl font-bold text-white mb-4">About the Color Blindness Test</h2>
            <p className="text-dark-300 text-lg leading-relaxed">
              This test uses Ishihara-style color plates to screen for color vision deficiencies. Each plate contains a pattern of colored dots with a number hidden within. People with normal color vision can easily identify the numbers, while those with color blindness may struggle with certain plates.
            </p>
          </section>

          <section className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Types of Color Blindness</h3>
            <div className="grid md:grid-cols-3 gap-6 text-dark-300">
              <div className="bg-dark-800/50 rounded-xl p-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 mb-3" />
                <h4 className="text-white font-semibold mb-2">Red-Green</h4>
                <p className="text-sm">The most common type, affecting ~8% of males. Difficulty distinguishing red and green hues.</p>
              </div>
              <div className="bg-dark-800/50 rounded-xl p-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-yellow-500 mb-3" />
                <h4 className="text-white font-semibold mb-2">Blue-Yellow</h4>
                <p className="text-sm">Less common, affects both males and females equally. Difficulty with blue and yellow tones.</p>
              </div>
              <div className="bg-dark-800/50 rounded-xl p-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-400 to-gray-600 mb-3" />
                <h4 className="text-white font-semibold mb-2">Total (Achromatopsia)</h4>
                <p className="text-sm">Very rare. Complete inability to see color — the world appears in shades of gray.</p>
              </div>
            </div>
          </section>

          <section className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Understanding Your Results</h3>
            <div className="space-y-3 text-dark-300">
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span><strong className="text-white">90-100%:</strong> Normal color vision — you can distinguish colors well</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span><strong className="text-white">75-89%:</strong> Mostly normal — minor variations, likely not clinically significant</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-1">•</span>
                  <span><strong className="text-white">50-74%:</strong> Mild deficiency — consider a professional eye exam</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span><strong className="text-white">Below 50%:</strong> Significant deficiency — consult an eye care specialist</span>
                </li>
              </ul>
              <p className="text-sm text-dark-400 mt-4">
                ⚠️ This is a screening tool only and not a medical diagnosis. Screen brightness, ambient lighting, and display calibration can affect results.
              </p>
            </div>
          </section>

          <section className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Tips for Accurate Results</h3>
            <ul className="space-y-2 text-dark-300 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-purple-500">•</span>
                <span>Use a well-calibrated color display (not a low-quality screen)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500">•</span>
                <span>Take the test in good lighting — avoid glare on your screen</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500">•</span>
                <span>Don't wear tinted glasses or sunglasses during the test</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500">•</span>
                <span>Answer quickly based on your first impression</span>
              </li>
            </ul>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-dark-800 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-dark-400">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center">
                <Palette size={12} className="text-white" />
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

export default ColorBlindTestPage;
