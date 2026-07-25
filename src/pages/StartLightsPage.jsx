import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Zap, Clock, Users, Lightbulb } from 'lucide-react';
import StartLightsTestArea from '../components/test/StartLightsTestArea';
import StartLightsStatsCard from '../components/test/StartLightsStatsCard';
import StartLightsIcon from '../components/icons/StartLightsIcon';
import Seo from '../components/Seo';
import { webApplicationSchema, breadcrumbSchema, faqSchema } from '../utils/structuredData';
import SiteFooter from '../components/SiteFooter';

const faqs = [
  {
    question: 'What is a good reaction time on this test?',
    answer: 'Anything under 280 ms is elite territory on this test, and under 230 ms earns the top Lightning Launch tier. Because you have to track a cascading light sequence and hold through a random delay before the green appears, times here naturally run a little higher than a bare click test.',
  },
  {
    question: 'How does a real race start actually work?',
    answer: 'Under the FIA Formula 1 Sporting Regulations (Article B5.7.1), five red lights are illuminated one at a time at one-second intervals. The interval between the fifth light and all lights being extinguished — the actual start signal — is at the sole discretion of the starter, which is why it cannot be anticipated. Individual drivers\' start reaction times are not published as a ranking, so this test does not claim to compare you against any of them.',
  },
  {
    question: 'Why do I keep getting a false start?',
    answer: 'You are pressing while the red lights are still on. The hold before the green is random on purpose, so do not try to predict it — watch the bottom row and react only once it turns green.',
  },
  {
    question: 'Does this test really measure racing reflexes?',
    answer: 'It measures the same visual reaction your launch depends on, but your result also depends on your device, screen refresh rate and input lag — so treat it as a fun, repeatable benchmark, not lab-grade telemetry.',
  },
];

const StartLightsPage = () => {
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

  return (
    <div className="min-h-screen bg-dark-950">
      {/* SEO Meta Tags */}
      <Seo
        title="Start Lights Reaction Test – How Fast Is Your Launch?"
        description="Free start lights reaction test: rows of red lights cascade, then react the instant the bottom row turns green. Get your time in milliseconds and find your tier."
        keywords="start lights reaction test, racing reaction time, reaction time test, start lights reflex test, launch reaction time"
        canonical="/test/f1-reaction"
        jsonLd={[
          webApplicationSchema({
            name: 'Start Lights Reaction Test',
            description: 'Recreate a race-start light sequence and measure your visual reaction time in milliseconds — react the instant the bottom row of lights turns green.',
            path: '/test/f1-reaction',
            category: 'GameApplication',
          }),
          breadcrumbSchema('Start Lights Reaction Test', '/test/f1-reaction'),
          faqSchema(faqs),
        ]}
      />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-dark-900/95 backdrop-blur-sm border-b border-dark-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Brand */}
            <div className="flex items-center gap-6">
              <Link
                to="/"
                aria-label="ReactionTestPro home"
                className="flex items-center gap-3 group rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
              >
                <img src="/checkered-flag.svg" alt="" aria-hidden="true" className="w-10 h-10 rounded-lg" />
                <div>
                  <p className="text-lg font-bold text-white group-hover:text-green-400 transition-colors">
                    ReactionTestPro
                  </p>
                  <p className="text-xs text-dark-400">Start Lights Reaction</p>
                </div>
              </Link>

              <div className="h-8 w-px bg-dark-800" />

              <Link
                to="/"
                className="flex items-center gap-2 px-4 py-2 text-dark-400 hover:text-white hover:bg-dark-800 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
              >
                <ArrowLeft size={16} />
                <span className="text-sm font-medium">Back to Home</span>
              </Link>
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
            <img src="/checkered-flag.svg" alt="" aria-hidden="true" className="w-12 h-12 rounded-xl shadow-lg" />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Start Lights Reaction Test: How Fast Is Your Launch?
              </h1>
              <p className="text-dark-400 mt-1">
                React the instant the bottom row turns green, and measure your launch in milliseconds
              </p>
            </div>
          </div>

          {/* Nominative descriptive use: names the real-world procedure the test
              recreates, without borrowing anyone's branding. */}
          <p className="text-sm text-dark-400 border-l-2 border-dark-700 pl-3 mb-4 max-w-3xl">
            This test is inspired by the light-gantry starting procedure used in Formula 1 racing; it is
            not an exact reproduction of it. It is an independent fan-made tool and is not affiliated
            with, endorsed by, or associated with Formula One World Championship Limited or any
            racing series.
          </p>

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
            <StartLightsTestArea onResult={handleResult} />
          </div>

          {/* Stats Sidebar (1 column on large screens) */}
          <div className="lg:col-span-1">
            <StartLightsStatsCard stats={stats} onReset={handleReset} />
          </div>
        </div>

        {/* Informational Content Section */}
        <div className="border-t border-dark-800 pt-12 space-y-8">
          {/* Hook + What Is */}
          <section>
            <p className="text-dark-200 text-lg leading-relaxed mb-8">
              At a race start, everything is decided in a single blink. Elite drivers launch in around <strong className="text-white">150–200 milliseconds</strong> — barely longer than one film frame. This free reaction test drops you onto the starting grid: watch the three rows of red lights cascade down, hold your nerve through the random delay, then fire the instant the bottom row flashes <strong className="text-green-400">green</strong>.
            </p>
            <h2 className="text-3xl font-bold text-white mb-4">What Is the Start Lights Reaction Test?</h2>
            <p className="text-dark-300 leading-relaxed">
              The Start Lights Reaction Test is a free online tool that recreates a race-start light sequence to measure your visual reaction time in milliseconds. Three rows of red lights come on in a downward cascade across five columns, hold for an unpredictable delay, then cut out as the bottom row turns green — your cue to click or tap as fast as humanly possible. No signup, no download: just you, the lights, and the clock.
            </p>
          </section>

          {/* How the procedure works */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-4">How the Start Light Sequence Works</h2>
            <div className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-6 grid md:grid-cols-2 gap-6 text-dark-300">
              <div>
                <h3 className="text-white font-semibold mb-2">The Red Cascade</h3>
                <p className="text-sm mb-3">
                  Three rows of red lights come on in sequence across all five columns, top to bottom, half a second apart. Tension builds with every row — throttle loaded, waiting.
                </p>
                {/* Miniature of the tower: 3 red rows + the green row */}
                <div className="inline-flex gap-1.5 rounded-lg border border-dark-700 bg-black/50 p-2">
                  {[0, 1, 2, 3, 4].map((col) => (
                    <div key={col} className="flex flex-col gap-1.5">
                      {[0, 1, 2, 3].map((row) => (
                        <div
                          key={row}
                          className={`w-3.5 h-3.5 rounded-full border ${
                            row === 3
                              ? 'bg-green-500/30 border-green-500/50'
                              : 'bg-red-500/30 border-red-500/50'
                          }`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">The Green Light: Your Signal to React</h3>
                <p className="text-sm">
                  Once the three red rows are lit, they hold for a random tension delay — anywhere from a split second to a few seconds. Then the reds cut out and the bottom row flashes <strong className="text-green-400">green</strong>. That green is the only trigger. Go before it appears and it is a false start; go late and you have lost the corner.
                </p>
              </div>
            </div>
          </section>

          {/* What is a good start lights reaction time + benchmark table */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-4">What Is a Good Start Lights Reaction Time?</h2>
            <p className="text-dark-300 leading-relaxed mb-5">
              A bare click reaction averages around <strong className="text-white">250 ms</strong> — but this is not a bare click test. Here you have to track a three-row cascade, hold through a random tension delay, and then react to a <em>colour change</em>. That extra processing adds real cognitive load, which is why scoring <strong className="text-white">under 280 ms on this test</strong> proves genuinely elite racing reflexes — faster than most everyday drivers. Here is how your time stacks up:
            </p>
            <div className="overflow-x-auto rounded-xl border border-dark-800">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-dark-900/60 text-dark-400">
                    <th className="py-3 px-4 font-semibold whitespace-nowrap">Your time</th>
                    <th className="py-3 px-4 font-semibold whitespace-nowrap">Level</th>
                    <th className="py-3 px-4 font-semibold">What it means</th>
                  </tr>
                </thead>
                <tbody className="text-dark-300">
                  <tr className="border-t border-dark-800">
                    <td className="py-3 px-4 font-bold text-purple-400 whitespace-nowrap">&lt; 230 ms</td>
                    <td className="py-3 px-4 whitespace-nowrap">🏆 Lightning Launch</td>
                    <td className="py-3 px-4">The very top of the board — an exceptional launch</td>
                  </tr>
                  <tr className="border-t border-dark-800">
                    <td className="py-3 px-4 font-bold text-green-400 whitespace-nowrap">230–280 ms</td>
                    <td className="py-3 px-4 whitespace-nowrap">Race Ready</td>
                    <td className="py-3 px-4">Elite range — sharper than most everyday drivers</td>
                  </tr>
                  <tr className="border-t border-dark-800">
                    <td className="py-3 px-4 font-bold text-blue-400 whitespace-nowrap">281–350 ms</td>
                    <td className="py-3 px-4 whitespace-nowrap">Quick Off the Line</td>
                    <td className="py-3 px-4">Genuinely quick — a little practice and you are in the big leagues</td>
                  </tr>
                  <tr className="border-t border-dark-800">
                    <td className="py-3 px-4 font-bold text-cyan-400 whitespace-nowrap">351–450 ms</td>
                    <td className="py-3 px-4 whitespace-nowrap">Steady Starter</td>
                    <td className="py-3 px-4">Solid launch — your tyres were just a little cold</td>
                  </tr>
                  <tr className="border-t border-dark-800">
                    <td className="py-3 px-4 font-bold text-orange-400 whitespace-nowrap">&gt; 450 ms</td>
                    <td className="py-3 px-4 whitespace-nowrap">Slow Getaway</td>
                    <td className="py-3 px-4">Stalled on the grid — go again and take your revenge</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* The neuroscience behind reflexes */}
          <section className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">The Neuroscience Behind Your Reflexes</h2>
            <p className="text-dark-300 leading-relaxed">
              Your reaction time is a chain reaction: your eyes detect the lights turning green, your visual cortex processes the change, your brain fires a command, and your finger moves. Each link costs milliseconds. That is why pure <strong className="text-white">reaction</strong> has a hard human floor of about 100–120 ms — you cannot beat it, only get closer to it. Fatigue, distraction and screen lag stretch the chain; focus, rest and practice tighten it.
            </p>
          </section>

          {/* How to improve */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-4">How to Improve Your Reaction Time for Racing &amp; Gaming</h2>
            <p className="text-dark-300 leading-relaxed mb-4">Reaction speed is trainable. To sharpen your launch:</p>
            <ul className="space-y-3 text-dark-300">
              <li className="flex items-start gap-3"><span className="text-green-500 mt-1">•</span><span><strong className="text-white">Practice daily</strong> — repeated reps build the neural pathway; even 5 minutes helps.</span></li>
              <li className="flex items-start gap-3"><span className="text-green-500 mt-1">•</span><span><strong className="text-white">Prime your focus</strong> — fix your eyes on the lights, relax your hand, and do not guess the timing.</span></li>
              <li className="flex items-start gap-3"><span className="text-green-500 mt-1">•</span><span><strong className="text-white">Sleep and hydrate</strong> — a tired brain adds 30–50 ms instantly.</span></li>
              <li className="flex items-start gap-3"><span className="text-green-500 mt-1">•</span><span><strong className="text-white">Cross-train your brain</strong> — pair this with our <Link to="/test/memory" className="text-green-400 hover:text-green-300 underline font-medium">Working Memory Test</Link> and fast-paced games to sharpen the same visual-motor loop.</span></li>
              <li className="flex items-start gap-3"><span className="text-green-500 mt-1">•</span><span><strong className="text-white">Warm up first</strong> — your first few attempts are always your slowest.</span></li>
            </ul>
            <p className="text-sm text-dark-400 mt-4 flex items-start gap-2">
              <Lightbulb size={16} className="text-amber-400 shrink-0 mt-0.5" />
              <span>Real racing starts also involve clutch control, wheelspin management and racecraft — pure reaction time is just one component.</span>
            </p>
          </section>

          {/* False Starts */}
          <section className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">False Starts and the Jump-Start Rule in Racing</h2>
            <p className="text-dark-300 mb-3">
              In this test, going before the green light appears is a false start. In real Formula 1, jumping the start triggers the same kind of sanction — and the penalties are severe:
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
              This is why drivers must balance aggression with precision - reacting instantly to the green without anticipating it.
            </p>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-5"
                >
                  <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                  <p className="text-dark-300 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <SiteFooter className="mt-12" Icon={StartLightsIcon} accent="from-red-500 to-rose-600" />
    </div>
  );
};

export default StartLightsPage;
