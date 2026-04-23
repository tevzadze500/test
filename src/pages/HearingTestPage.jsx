import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Headphones, Clock, Users, Volume2, Heart } from 'lucide-react';
import HearingTestArea from '../components/test/HearingTestArea';
import HearingStatsCard from '../components/test/HearingStatsCard';

const HearingTestPage = () => {
  const [stats, setStats] = useState({
    bestScore: null,
    latestScore: null,
    averageScore: null,
    highestFrequency: null,
    attempts: 0,
    allScores: [],
  });

  // Load stats from localStorage on mount
  useEffect(() => {
    const savedStats = localStorage.getItem('hearingTestStats');
    if (savedStats) {
      try {
        setStats(JSON.parse(savedStats));
      } catch (e) {
        console.error('Failed to parse stats:', e);
      }
    }
  }, []);

  // Save stats to localStorage whenever they change
  useEffect(() => {
    if (stats.attempts > 0) {
      localStorage.setItem('hearingTestStats', JSON.stringify(stats));
    }
  }, [stats]);

  const handleResult = ({ highestFrequency, totalHeard, totalFrequencies }) => {
    const score = Math.round((totalHeard / totalFrequencies) * 100);

    setStats((prevStats) => {
      const newScores = [...prevStats.allScores, score];
      const newBest = prevStats.bestScore ? Math.max(prevStats.bestScore, score) : score;
      const newAverage = Math.round(
        newScores.reduce((sum, s) => sum + s, 0) / newScores.length
      );
      const newHighestFreq = prevStats.highestFrequency
        ? Math.max(prevStats.highestFrequency, highestFrequency)
        : highestFrequency;

      return {
        bestScore: newBest,
        latestScore: score,
        averageScore: newAverage,
        highestFrequency: newHighestFreq,
        attempts: prevStats.attempts + 1,
        allScores: newScores,
      };
    });
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all your hearing test stats?')) {
      setStats({
        bestScore: null,
        latestScore: null,
        averageScore: null,
        highestFrequency: null,
        attempts: 0,
        allScores: [],
      });
      localStorage.removeItem('hearingTestStats');
    }
  };

  const closeWindow = () => {
    window.close();
  };

  return (
    <div className="min-h-screen bg-dark-950">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Hearing Frequency Test - Audio Health Check | TestHub</title>
        <meta name="description" content="Test your hearing range and sensitivity with our free online hearing frequency test. Discover which frequencies you can hear from 250 Hz to 20 kHz. Instant results, no signup required." />
        <meta name="keywords" content="hearing test, frequency test, hearing range, audio test, hearing health, frequency hearing test, online hearing test, audiometry" />
        <meta property="og:title" content="Hearing Frequency Test - Audio Health Check" />
        <meta property="og:description" content="Test your auditory range and sensitivity. Discover which frequencies you can hear." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://reactiontestpro.com/test/hearing" />
      </Helmet>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-dark-900/95 backdrop-blur-sm border-b border-dark-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Brand */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                  <Headphones size={20} className="text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-white">
                    TestHub
                  </h1>
                  <p className="text-xs text-dark-400">Hearing health check</p>
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

            {/* Right: Quick Stats */}
            <div className="hidden md:flex items-center gap-4">
              {stats.attempts > 0 && (
                <>
                  <div className="flex items-center gap-2 px-4 py-2 bg-dark-800 rounded-lg">
                    <Headphones size={16} className="text-blue-500" />
                    <div className="text-xs">
                      <div className="text-dark-400">Best</div>
                      <div className="text-white font-bold">{stats.bestScore}%</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-dark-800 rounded-lg">
                    <Volume2 size={16} className="text-cyan-500" />
                    <div className="text-xs">
                      <div className="text-dark-400">Highest</div>
                      <div className="text-white font-bold">
                        {stats.highestFrequency >= 1000
                          ? `${(stats.highestFrequency / 1000).toFixed(0)} kHz`
                          : `${stats.highestFrequency} Hz`}
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
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg">
              <Headphones size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Hearing Frequency Test
              </h1>
              <p className="text-dark-400 mt-1">
                Test your auditory range and sensitivity
              </p>
            </div>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-dark-800/50 rounded-lg border border-dark-700">
              <Clock size={14} className="text-blue-400" />
              <span className="text-white">4 min</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-dark-800/50 rounded-lg border border-dark-700">
              <Users size={14} className="text-purple-400" />
              <span className="text-white">65K+ participants</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-dark-800/50 rounded-lg border border-dark-700">
              <Volume2 size={14} className="text-yellow-400" />
              <span className="text-yellow-400 font-medium">Audio Required</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-dark-800/50 rounded-lg border border-dark-700">
              <Heart size={14} className="text-red-400" />
              <span className="text-white font-medium">Health</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-dark-800/50 rounded-lg border border-dark-700">
              <span className="text-dark-400">Difficulty:</span>
              <span className="text-green-400 font-medium">Easy</span>
            </div>
          </div>
        </div>

        {/* Test Area + Stats */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Test Area (2 columns on large screens) */}
          <div className="lg:col-span-2">
            <HearingTestArea onResult={handleResult} />
          </div>

          {/* Stats Sidebar (1 column on large screens) */}
          <div className="lg:col-span-1">
            <HearingStatsCard stats={stats} onReset={handleReset} />
          </div>
        </div>

        {/* Informational Content Section */}
        <div className="border-t border-dark-800 pt-12 space-y-8">
          {/* About Section */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-4">About the Hearing Frequency Test</h2>
            <p className="text-dark-300 text-lg leading-relaxed">
              This test evaluates your ability to hear pure tones across a wide range of frequencies, from deep bass (250 Hz) to ultra-high (20 kHz). It provides insight into your hearing health and identifies any frequency ranges where your hearing may be reduced.
            </p>
          </section>

          {/* How it Works */}
          <section className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">How the Test Works</h3>
            <div className="grid md:grid-cols-2 gap-6 text-dark-300">
              <div>
                <h4 className="text-white font-semibold mb-2">Pure Tone Testing</h4>
                <p className="text-sm mb-3">The test plays sine waves at 15 different frequencies. Each tone lasts about 2 seconds, giving you enough time to determine if you can hear it.</p>
                <div className="flex gap-1 items-end h-8">
                  {[3, 5, 7, 9, 11, 10, 8, 6, 4, 2].map((h, i) => (
                    <div key={i} className="w-3 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-full" style={{ height: `${h * 10}%` }} />
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">Frequency Range</h4>
                <p className="text-sm">Starting from low frequencies that almost everyone can hear, the test progressively increases to higher frequencies that become harder to detect, especially as we age.</p>
              </div>
            </div>
          </section>

          {/* Age & Hearing */}
          <section className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Hearing & Age</h3>
            <div className="space-y-3 text-dark-300">
              <p>
                High-frequency hearing naturally declines as we age, a condition known as presbycusis. This is completely normal and affects virtually everyone.
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span><strong className="text-white">Under 20:</strong> Can typically hear up to 20 kHz</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span><strong className="text-white">20-30 years:</strong> Usually hear up to 17-18 kHz</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-1">•</span>
                  <span><strong className="text-white">30-50 years:</strong> Typically hear up to 14-16 kHz</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span><strong className="text-white">50+ years:</strong> Often limited to 12 kHz or below</span>
                </li>
              </ul>
              <p className="text-sm text-dark-400 mt-4">
                💡 Note: This test is not a medical diagnosis. If you have concerns about your hearing, please consult a qualified audiologist.
              </p>
            </div>
          </section>

          {/* Tips */}
          <section className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Tips for Accurate Results</h3>
            <ul className="space-y-2 text-dark-300 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                <span>Use quality headphones for the most accurate results</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                <span>Take the test in a quiet environment to minimize background noise</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                <span>Set your volume to a comfortable level — not too loud, not too soft</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                <span>Be honest with your responses — only say "yes" if you truly heard the tone</span>
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
              <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                <Headphones size={12} className="text-white" />
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

export default HearingTestPage;
