import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Zap, Clock, Users } from 'lucide-react';
import F1LightsTestArea from '../components/test/F1LightsTestArea';
import F1StatsCard from '../components/test/F1StatsCard';

const F1ReactionPage = () => {
  const [stats, setStats] = useState({
    best: null,
    average: null,
    latest: null,
    attempts: 0,
    falseStarts: 0,
    allScores: [],
  });

  // Load stats from localStorage on mount
  useEffect(() => {
    const savedStats = localStorage.getItem('f1ReactionStats');
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
    if (stats.attempts > 0 || stats.falseStarts > 0) {
      localStorage.setItem('f1ReactionStats', JSON.stringify(stats));
    }
  }, [stats]);

  const handleResult = ({ falseStart, reactionTime }) => {
    setStats((prevStats) => {
      if (falseStart) {
        return {
          ...prevStats,
          falseStarts: prevStats.falseStarts + 1,
        };
      }

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
        falseStarts: prevStats.falseStarts,
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
        falseStarts: 0,
        allScores: [],
      });
      localStorage.removeItem('f1ReactionStats');
    }
  };

  const closeWindow = () => {
    window.close();
  };

  return (
    <div className="min-h-screen bg-dark-950">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>F1 Lights Reaction Test - Formula 1 Racing Reflexes | ReactionTestPro</title>
        <meta name="description" content="Test your reaction time with the official F1 start lights procedure. React when the lights go out and measure your reflexes like a Formula 1 driver. Free online test with instant results." />
        <meta name="keywords" content="F1 reaction test, formula 1 lights test, F1 start lights, racing reaction time, F1 reflexes, formula 1 reaction speed, racing lights test" />
        <meta property="og:title" content="F1 Lights Reaction Test - Formula 1 Racing Reflexes" />
        <meta property="og:description" content="Test your reaction time specific to Formula 1 and improve your reflexes for racing." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://reactiontestpro.com/test/f1-reaction" />
      </Helmet>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-dark-900/95 backdrop-blur-sm border-b border-dark-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Brand */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center text-2xl">
                  🏁
                </div>
                <div>
                  <h1 className="text-lg font-bold text-white">
                    TestHub
                  </h1>
                  <p className="text-xs text-dark-400">F1 Lights Reaction</p>
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
      <main className="max-w-7xl mx-auto px-6 py-8 lg:py-12">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center text-3xl shadow-lg">
              🏁
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                F1 Lights Reaction Test
              </h1>
              <p className="text-dark-400 mt-1">
                React the instant the start lights go out
              </p>
            </div>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-dark-800/50 rounded-lg border border-dark-700">
              <span className="text-dark-400">Category:</span>
              <span className="text-green-400 font-medium">Performance</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-dark-800/50 rounded-lg border border-dark-700">
              <Clock size={14} className="text-blue-400" />
              <span className="text-white">1 min</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-dark-800/50 rounded-lg border border-dark-700">
              <span className="text-dark-400">Difficulty:</span>
              <span className="text-yellow-400 font-medium">Medium</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-dark-800/50 rounded-lg border border-dark-700">
              <Users size={14} className="text-purple-400" />
              <span className="text-white">42K+ participants</span>
            </div>
          </div>
        </div>

        {/* Test Area + Stats */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Test Area (2 columns on large screens) */}
          <div className="lg:col-span-2">
            <F1LightsTestArea onResult={handleResult} />
          </div>

          {/* Stats Sidebar (1 column on large screens) */}
          <div className="lg:col-span-1">
            <F1StatsCard stats={stats} onReset={handleReset} />
          </div>
        </div>

        {/* Informational Content Section */}
        <div className="border-t border-dark-800 pt-12 space-y-8">
          {/* About Section */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-4">About the F1 Lights Test</h2>
            <p className="text-dark-300 text-lg leading-relaxed">
              This test replicates the starting procedure used in Formula 1 racing. The five red lights illuminate sequentially, building anticipation. After all lights are on, they turn off after a random delay, signaling the start of the race. Drivers must react instantly to gain the best position off the line.
            </p>
          </section>

          {/* How it Works */}
          <section className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">The F1 Start Procedure</h3>
            <div className="grid md:grid-cols-2 gap-6 text-dark-300">
              <div>
                <h4 className="text-white font-semibold mb-2">Light Sequence</h4>
                <p className="text-sm mb-3">Five red lights illuminate one by one at 500ms intervals, similar to the actual F1 start lights on the gantry above the starting grid.</p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-6 h-6 rounded-full bg-red-500/30 border border-red-500/50" />
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">Random Timing</h4>
                <p className="text-sm">After all five lights are on, there's a random delay of 1-4 seconds before they all turn off simultaneously. This unpredictability prevents drivers from anticipating the exact moment.</p>
              </div>
            </div>
          </section>

          {/* Performance Context */}
          <section className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Real F1 Performance</h3>
            <div className="space-y-3 text-dark-300">
              <p>
                In Formula 1, reaction time at the start can make or break a race. The difference between a good and great start is measured in hundredths of a second.
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span><strong className="text-white">Elite (under 200ms):</strong> Professional F1 driver level - Lewis Hamilton, Max Verstappen typically achieve this</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span><strong className="text-white">Excellent (200-250ms):</strong> Competitive racing driver level</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-1">•</span>
                  <span><strong className="text-white">Good (250-300ms):</strong> Above average human reaction time</span>
                </li>
              </ul>
              <p className="text-sm text-dark-400 mt-4">
                💡 Note: Real F1 starts also involve clutch control, wheelspin management, and racecraft - pure reaction time is just one component!
              </p>
            </div>
          </section>

          {/* False Starts */}
          <section className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">False Starts in F1</h3>
            <p className="text-dark-300 mb-3">
              In Formula 1, jumping the start before the lights go out results in severe penalties:
            </p>
            <ul className="space-y-2 text-dark-300 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-orange-500">•</span>
                <span>5-10 second time penalty added to race time</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500">•</span>
                <span>Drive-through penalty in severe cases</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500">•</span>
                <span>Can ruin an entire race strategy</span>
              </li>
            </ul>
            <p className="text-sm text-dark-400 mt-3">
              This is why drivers must balance aggression with precision - reacting instantly while not anticipating the lights going out.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-dark-800 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-dark-400">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center text-sm">
                🏁
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

export default F1ReactionPage;
