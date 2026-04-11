import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Home, Zap, Clock, Users } from 'lucide-react';
import ReactionTestArea from '../components/test/ReactionTestArea';
import ReactionStatsCard from '../components/test/ReactionStatsCard';
import ReactionInfoSection from '../components/test/ReactionInfoSection';

const ReactionTimePage = () => {
  const [stats, setStats] = useState({
    best: null,
    average: null,
    latest: null,
    attempts: 0,
    allScores: [],
  });

  // Load stats from localStorage on mount
  useEffect(() => {
    const savedStats = localStorage.getItem('reactionTimeStats');
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
      localStorage.setItem('reactionTimeStats', JSON.stringify(stats));
    }
  }, [stats]);

  const handleResult = (reactionTime) => {
    setStats((prevStats) => {
      const newScores = [...prevStats.allScores, reactionTime];
      const newBest = prevStats.best ? Math.min(prevStats.best, reactionTime) : reactionTime;
      const newAverage = Math.round(
        newScores.reduce((sum, score) => sum + score, 0) / newScores.length
      );

      return {
        best: newBest,
        average: newAverage,
        latest: reactionTime,
        attempts: prevStats.attempts + 1,
        allScores: newScores,
      };
    });
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all your stats?')) {
      setStats({
        best: null,
        average: null,
        latest: null,
        attempts: 0,
        allScores: [],
      });
      localStorage.removeItem('reactionTimeStats');
    }
  };

  return (
    <div className="min-h-screen bg-dark-950">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Reaction Time Test - Free Online Visual Reflex Test | ReactionTestPro</title>
        <meta name="description" content="Test your reaction time online for free. Measure your visual reflex speed in milliseconds with instant results. No signup required. Track your progress and improve your reflexes." />
        <meta name="keywords" content="reaction time test, reflex test online, visual reaction speed, reaction time measurement, online reflex test, measure reaction time, improve reflexes" />
        <meta property="og:title" content="Reaction Time Test - Measure Your Reflexes Online" />
        <meta property="og:description" content="Measure your visual reaction speed in milliseconds. Free online test with instant results." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://reactiontestpro.com/test/reaction-time" />
      </Helmet>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-dark-900/95 backdrop-blur-sm border-b border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Brand + Back */}
            <div className="flex items-center gap-3 sm:gap-6">
              <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-xl sm:text-2xl">
                  ⚡
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-base sm:text-lg font-bold text-white group-hover:text-green-400 transition-colors">
                    TestHub
                  </h1>
                  <p className="text-xs text-dark-400">Testing Platform</p>
                </div>
              </Link>
              
              <div className="hidden sm:block h-8 w-px bg-dark-800" />
              
              <Link
                to="/"
                className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-2 text-dark-400 hover:text-white hover:bg-dark-800 rounded-lg transition-colors"
              >
                <ArrowLeft size={14} className="sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm font-medium">Back</span>
              </Link>
            </div>

            {/* Right: Quick Stats */}
            <div className="hidden md:flex items-center gap-3 lg:gap-4">
              {stats.attempts > 0 && (
                <>
                  <div className="flex items-center gap-2 px-3 lg:px-4 py-2 bg-dark-800 rounded-lg">
                    <Zap size={16} className="text-green-500" />
                    <div className="text-xs">
                      <div className="text-dark-400">Best</div>
                      <div className="text-white font-bold">{stats.best}ms</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-dark-800 rounded-lg">
                    <Clock size={16} className="text-blue-500" />
                    <div className="text-xs">
                      <div className="text-dark-400">Avg</div>
                      <div className="text-white font-bold">{stats.average}ms</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-12">
        {/* Page Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-2xl sm:text-3xl shadow-lg shrink-0">
              ⚡
            </div>
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                Reaction Time Test
              </h1>
              <p className="text-sm sm:text-base text-dark-400 mt-1">
                Measure your visual reaction speed in milliseconds
              </p>
            </div>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 bg-dark-800/50 rounded-lg border border-dark-700">
              <span className="text-dark-400">Category:</span>
              <span className="text-green-400 font-medium">Performance</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 bg-dark-800/50 rounded-lg border border-dark-700">
              <Clock size={12} className="sm:w-3.5 sm:h-3.5 text-blue-400" />
              <span className="text-white">2 min</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 bg-dark-800/50 rounded-lg border border-dark-700">
              <span className="text-dark-400">Difficulty:</span>
              <span className="text-green-400 font-medium">Easy</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 bg-dark-800/50 rounded-lg border border-dark-700">
              <Users size={12} className="sm:w-3.5 sm:h-3.5 text-purple-400" />
              <span className="text-white">150K+ participants</span>
            </div>
          </div>
        </div>

        {/* Test Area + Stats */}
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Test Area (2 columns on large screens) */}
          <div className="lg:col-span-2">
            <ReactionTestArea onResult={handleResult} />
          </div>

          {/* Stats Sidebar (1 column on large screens) */}
          <div className="lg:col-span-1">
            <ReactionStatsCard stats={stats} onReset={handleReset} />
          </div>
        </div>

        {/* Informational Content Section */}
        <div className="border-t border-dark-800 pt-8 sm:pt-12">
          <ReactionInfoSection />
        </div>

        {/* Footer CTA */}
        <div className="mt-8 sm:mt-12 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-dark-800 hover:bg-dark-700 border border-dark-700 hover:border-dark-600 rounded-lg text-white text-sm sm:text-base transition-colors touch-manipulation min-h-[44px]"
          >
            <Home size={16} className="sm:w-[18px] sm:h-[18px]" />
            <span>Explore More Tests</span>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-dark-800 mt-8 sm:mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 text-xs sm:text-sm text-dark-400">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-sm">
                ⚡
              </div>
              <span>© 2026 TestHub. Professional Testing Platform.</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-center">
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

export default ReactionTimePage;
