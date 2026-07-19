import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Zap, Clock, Users, Lightbulb } from 'lucide-react';
import F1LightsTestArea from '../components/test/F1LightsTestArea';
import F1StatsCard from '../components/test/F1StatsCard';
import Seo from '../components/Seo';
import { webApplicationSchema, breadcrumbSchema, faqSchema } from '../utils/structuredData';

const faqs = [
  {
    question: 'What is a good reaction time on the F1 test?',
    answer: 'Under 250 ms is above average, under 200 ms is excellent, and 150–200 ms matches elite F1 driver launches. Below roughly 120 ms usually means you anticipated the lights rather than reacted.',
  },
  {
    question: 'How fast do real F1 drivers react at the start?',
    answer: 'Top drivers typically launch in around 150–200 milliseconds. Reaction alone is not enough, though — clutch control and traction off the line matter just as much.',
  },
  {
    question: 'Why do I keep getting a false start?',
    answer: 'You are moving before the lights actually go out. Do not try to predict the timing — the delay is random on purpose. Watch the lights and react to them, not to a rhythm in your head.',
  },
  {
    question: 'Does this test really measure Formula 1 reflexes?',
    answer: 'It measures the same visual reaction your launch depends on, but your result also depends on your device, screen refresh rate and input lag — so treat it as a fun, repeatable benchmark, not lab-grade telemetry.',
  },
];

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

  return (
    <div className="min-h-screen bg-dark-950">
      {/* SEO Meta Tags */}
      <Seo
        title="F1 Reaction Test – Can You Beat 200ms Like a Pro Driver?"
        description="Take the free F1 start-lights reaction test. React when the 5 red lights go out, get your time in milliseconds, and see how you rank against real F1 drivers."
        keywords="F1 reaction test, formula 1 reaction test, F1 reaction time test, F1 start lights, racing reaction time, F1 reflexes, formula 1 reaction speed"
        canonical="/test/f1-reaction"
        jsonLd={[
          webApplicationSchema({
            name: 'F1 Reaction Test',
            description: 'Recreate the Formula 1 start-lights procedure and measure your visual reaction time in milliseconds — react the instant the five red lights go out.',
            path: '/test/f1-reaction',
            category: 'GameApplication',
          }),
          breadcrumbSchema('F1 Reaction Test', '/test/f1-reaction'),
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
                aria-label="TestHub home"
                className="flex items-center gap-3 group rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
              >
                <img src="/checkered-flag.svg" alt="Checkered Flag Logo" className="w-10 h-10 rounded-lg" />
                <div>
                  <p className="text-lg font-bold text-white group-hover:text-green-400 transition-colors">
                    TestHub
                  </p>
                  <p className="text-xs text-dark-400">F1 Lights Reaction</p>
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
            <img src="/checkered-flag.svg" alt="Checkered Flag Logo" className="w-12 h-12 rounded-xl shadow-lg" />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                F1 Reaction Test: Can You Launch Like a Formula 1 Driver?
              </h1>
              <p className="text-dark-400 mt-1">
                React the instant the five start lights go out — and see how you rank against real F1 drivers
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
          {/* Hook + What Is */}
          <section>
            <p className="text-dark-200 text-lg leading-relaxed mb-8">
              When the five red lights go out at a Grand Prix, the race can be won or lost in a single blink. Elite F1 drivers launch in around <strong className="text-white">150–200 milliseconds</strong> — barely faster than one film frame. This free F1 reaction test drops you onto the starting grid: wait for the lights, fire the instant they vanish, and find out exactly how your reflexes stack up against the fastest drivers on earth.
            </p>
            <h2 className="text-3xl font-bold text-white mb-4">What Is the F1 Reaction Test?</h2>
            <p className="text-dark-300 leading-relaxed">
              The F1 Reaction Test is a free online tool that recreates the Formula 1 starting procedure to measure your visual reaction time in milliseconds. Five red lights illuminate one by one, hold for an unpredictable delay, then switch off all at once — your cue to click or tap as fast as humanly possible. No signup, no download: just you, the lights, and the clock.
            </p>
          </section>

          {/* How the procedure works */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-4">How the Formula 1 Start Lights Procedure Works</h2>
            <div className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-6 grid md:grid-cols-2 gap-6 text-dark-300">
              <div>
                <h3 className="text-white font-semibold mb-2">The Five-Light Sequence</h3>
                <p className="text-sm mb-3">The five red lights come on one by one, building tension exactly like the real gantry above the grid. Every driver stares at them, throttle loaded, waiting.</p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-6 h-6 rounded-full bg-red-500/30 border border-red-500/50" />
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Lights Out: Your Signal to React</h3>
                <p className="text-sm">Once all five are lit, they stay on for a random delay, then extinguish together. There is no countdown — the only trigger is the lights going dark. React too early and it is a false start; react late and you have lost the corner.</p>
              </div>
            </div>
          </section>

          {/* What is a good F1 reaction time + benchmark table */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-4">What Is a Good F1 Reaction Time?</h2>
            <p className="text-dark-300 leading-relaxed mb-5">
              The average human reaction to a visual signal is roughly <strong className="text-white">250 ms</strong>. Trained drivers and top gamers push well below that. Anything under about 120–150 ms usually means you <em>anticipated</em> rather than reacted — in a real race, that is a jump start. Here is how your time stacks up:
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
                    <td className="py-3 px-4 font-bold text-purple-400 whitespace-nowrap">&lt; 150 ms</td>
                    <td className="py-3 px-4 whitespace-nowrap">🏁 Superhuman</td>
                    <td className="py-3 px-4">Near the human limit — in a real race this edges into a jump start</td>
                  </tr>
                  <tr className="border-t border-dark-800">
                    <td className="py-3 px-4 font-bold text-green-400 whitespace-nowrap">150–200 ms</td>
                    <td className="py-3 px-4 whitespace-nowrap">Pro Driver</td>
                    <td className="py-3 px-4">Elite F1 launch range (Hamilton / Verstappen territory)</td>
                  </tr>
                  <tr className="border-t border-dark-800">
                    <td className="py-3 px-4 font-bold text-blue-400 whitespace-nowrap">200–250 ms</td>
                    <td className="py-3 px-4 whitespace-nowrap">Racing Pro</td>
                    <td className="py-3 px-4">Sharp reflexes — competitive sim-racer level</td>
                  </tr>
                  <tr className="border-t border-dark-800">
                    <td className="py-3 px-4 font-bold text-cyan-400 whitespace-nowrap">250–300 ms</td>
                    <td className="py-3 px-4 whitespace-nowrap">Skilled</td>
                    <td className="py-3 px-4">Above average, solid gamer reflexes</td>
                  </tr>
                  <tr className="border-t border-dark-800">
                    <td className="py-3 px-4 font-bold text-yellow-400 whitespace-nowrap">300–350 ms</td>
                    <td className="py-3 px-4 whitespace-nowrap">Amateur</td>
                    <td className="py-3 px-4">Around the typical adult average</td>
                  </tr>
                  <tr className="border-t border-dark-800">
                    <td className="py-3 px-4 font-bold text-orange-400 whitespace-nowrap">&gt; 350 ms</td>
                    <td className="py-3 px-4 whitespace-nowrap">Rookie</td>
                    <td className="py-3 px-4">Warm up and go again — you will drop fast with practice</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* The neuroscience behind reflexes */}
          <section className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">The Neuroscience Behind Your Reflexes</h2>
            <p className="text-dark-300 leading-relaxed">
              Your reaction time is a chain reaction: your eyes detect the lights going out, your visual cortex processes the change, your brain fires a command, and your finger moves. Each link costs milliseconds. That is why pure <strong className="text-white">reaction</strong> has a hard human floor of about 100–120 ms — you cannot beat it, only get closer to it. Fatigue, distraction and screen lag stretch the chain; focus, rest and practice tighten it.
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
              <span>Real F1 starts also involve clutch control, wheelspin management and racecraft — pure reaction time is just one component.</span>
            </p>
          </section>

          {/* False Starts */}
          <section className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">False Starts and the Jump-Start Rule in F1</h2>
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

      {/* Footer */}
      <footer className="border-t border-dark-800 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-dark-400">
            <div className="flex items-center gap-2">
              <img src="/checkered-flag.svg" alt="Checkered Flag Logo" className="w-6 h-6 rounded" />
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
