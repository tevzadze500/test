import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Zap, Clock } from 'lucide-react';
import Seo from '../components/Seo';
import Breadcrumb from '../components/Breadcrumb';
import { webApplicationSchema, breadcrumbSchema, faqSchema } from '../utils/structuredData';
import ReactionTestArea from '../components/test/ReactionTestArea';
import ReactionStatsCard from '../components/test/ReactionStatsCard';
import ReactionInfoSection, { reactionFaqs } from '../components/test/ReactionInfoSection';
import ReactionBenchmarks from '../components/ReactionBenchmarks';
import SiteFooter from '../components/SiteFooter';

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
    setStats({
      best: null,
      average: null,
      latest: null,
      attempts: 0,
      allScores: [],
    });
    localStorage.removeItem('reactionTimeStats');
  };

  return (
    <div className="min-h-screen bg-dark-950">
      {/* SEO Meta Tags */}
      <Seo
        title="Average Human Reaction Time (213–250 ms) – Live Test & Chart"
        description="What is the average human reaction time? Peer-reviewed studies measure 213–231 ms for light (~190 ms lab). Take the 5-click test to compare your ms score."
        canonical="/test/reaction-time"
        jsonLd={[
          webApplicationSchema({
            name: 'Average Human Reaction Time Test & Benchmark',
            description: 'Measure your visual reaction speed over 5 attempts and compare your millisecond average against published human reaction time benchmarks.',
            path: '/test/reaction-time',
          }),
          breadcrumbSchema('Average Human Reaction Time', '/test/reaction-time'),
          faqSchema(reactionFaqs),
        ]}
      />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-dark-900/95 backdrop-blur-sm border-b border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Brand + Back */}
            <div className="flex items-center gap-3 sm:gap-6">
              <Link to="/" aria-label="ReactionTestPro home" className="flex items-center gap-2 sm:gap-3 group">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                  <Zap size={20} className="text-white" strokeWidth={2.5} fill="white" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-base sm:text-lg font-bold text-white group-hover:text-green-400 transition-colors">
                    ReactionTestPro
                  </p>
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 lg:py-8">
        <Breadcrumb name="Average Human Reaction Time" className="mb-3" />
        {/* Page Header */}
        <div className="mb-5 sm:mb-6">
          <div className="flex items-center gap-2 sm:gap-3 mb-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30 shrink-0">
              <Zap size={26} className="text-white" strokeWidth={2.5} fill="white" />
            </div>
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                Average Human Reaction Time: How Fast Are You?
              </h1>
              <p className="text-sm sm:text-base text-dark-300 mt-1">
                Peer-reviewed adult visual average: <strong className="text-green-400">213 ms</strong> (lag-corrected) to <strong className="text-cyan-400">231 ms</strong> (measured on screen). Compare your 5-click average below.
              </p>
            </div>
          </div>

          {/* Quick Cited Reference Bands */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 text-xs">
            <div className="px-3 py-2 bg-dark-900/70 rounded-lg border border-purple-500/30">
              <div className="font-mono font-bold text-purple-400">&lt; 150 ms</div>
              <div className="text-dark-400">Usually anticipated</div>
            </div>
            <div className="px-3 py-2 bg-dark-900/70 rounded-lg border border-green-500/30">
              <div className="font-mono font-bold text-green-400">150–189 ms</div>
              <div className="text-dark-400">Beats ~190 ms lab ref (Jain 2015)</div>
            </div>
            <div className="px-3 py-2 bg-dark-900/70 rounded-lg border border-cyan-500/30">
              <div className="font-mono font-bold text-cyan-400">213–231 ms</div>
              <div className="text-dark-400">Adult mean (Woods 2015)</div>
            </div>
            <div className="px-3 py-2 bg-dark-900/70 rounded-lg border border-amber-500/30">
              <div className="font-mono font-bold text-amber-400">250+ ms</div>
              <div className="text-dark-400">60Hz / touch lag or fatigue</div>
            </div>
          </div>
        </div>

        {/* Test Area + Stats */}
        <h2 className="sr-only">
          Measure Your Average Reaction Time
        </h2>
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

          {/* Published reaction-time reference points (cited) */}
          <ReactionBenchmarks />
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

      <SiteFooter className="mt-8 sm:mt-12" />
    </div>
  );
};

export default ReactionTimePage;
