import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Clock, Users, Trophy, Zap, Activity } from 'lucide-react';
import Seo from '../components/Seo';
import { webApplicationSchema, breadcrumbSchema, faqSchema } from '../utils/structuredData';
import GoNoGoTestArea from '../components/test/GoNoGoTestArea';
import GoNoGoStatsCard from '../components/test/GoNoGoStatsCard';
import EnhancedResultCard from '../components/EnhancedResultCard';
import {
  getGoNoGoLevel,
  getGoNoGoMotivation,
  generateShareMessage,
  getSuggestedTests
} from '../utils/scoreUtils';

const faqs = [
  {
    question: 'What does the Go/No-Go test measure?',
    answer:
      'It measures response inhibition and impulse control — your ability to fire off a quick response to "Go" signals while suppressing that same response to "No-Go" signals. Strong performance means high accuracy paired with fast Go reaction times.',
  },
  {
    question: 'What is a commission error in a Go/No-Go task?',
    answer:
      'A commission error is when you respond to a No-Go signal — you clicked when you should have withheld. Commission errors are the key marker of impulsivity: the more you make, the weaker your response inhibition was on that run.',
  },
  {
    question: 'Can you train and improve response inhibition?',
    answer:
      'Yes. Response inhibition responds to practice, mindfulness meditation, quality sleep, and managing fatigue. Repeated Go/No-Go practice in particular builds faster, more reliable stopping over time.',
  },
  {
    question: 'Is the Go/No-Go task related to ADHD?',
    answer:
      'It is widely used in ADHD research because people with ADHD often make more commission errors and show more variable response times. It is a behavioral measure, though — not a diagnostic test on its own.',
  },
];

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
      <Seo
        title="Go/No-Go Test – Measure Your Response Inhibition & Focus"
        description="Take the free Go/No-Go test: react to green 'Go' signals, hold back on red 'No-Go' signals, and measure your response inhibition and impulse control. Instant results, no signup."
        keywords="go no go test, response inhibition test, impulse control task, cognitive control game, go/no-go task, inhibition test, executive function test"
        canonical="/test/go-no-go"
        jsonLd={[
          webApplicationSchema({
            name: 'Go/No-Go Test',
            description:
              'Measure your response inhibition and impulse control — respond to Go signals and withhold on No-Go signals.',
            path: '/test/go-no-go',
            category: 'HealthApplication',
          }),
          breadcrumbSchema('Go/No-Go Test', '/test/go-no-go'),
          faqSchema(faqs),
        ]}
      />
      {/* Header */}
      <header className="sticky top-0 z-40 bg-dark-900/95 backdrop-blur-sm border-b border-dark-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Brand + Back */}
            <div className="flex items-center gap-6">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                  <Zap size={20} className="text-white" strokeWidth={2.5} fill="white" />
                </div>
                <div>
                  <p className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                    TestHub
                  </p>
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
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Activity size={26} className="text-white" strokeWidth={2.4} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Go/No-Go Test: Measure Your Impulse Control & Response Inhibition
              </h1>
              <p className="text-dark-400 mt-1">
                React to "Go", freeze on "No-Go" — how sharp is your cognitive control?
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
                    ? "You're in the top tier of cognitive control. Outstanding."
                    : currentStats.accuracy >= 75
                    ? "Better than most users. Great impulse control."
                    : currentStats.accuracy >= 60
                    ? "Above average performance. Keep training."
                    : "Keep practicing to improve your inhibition skills."
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
            {/* What is a Go/No-Go test */}
            <section>
              <h2 className="text-3xl font-bold text-white mb-4">What Is a Go/No-Go Test?</h2>
              <p className="text-dark-300 text-lg leading-relaxed">
                The Go/No-Go test is a classic paradigm from cognitive psychology and neuropsychology, used for decades in labs and clinics to measure <strong className="text-white">response inhibition</strong> — your ability to stop an action you have already begun to prepare. On each trial you see a signal: most of the time it is a "Go" cue you should respond to, but every so often a "No-Go" cue appears and you must do nothing. Because responding quickly becomes an ingrained habit, holding back on the rare No-Go trial is genuinely hard — which is exactly what makes this such a sensitive probe of impulse control. Researchers use it to study executive function, ADHD, self-regulation, and recovery from brain injury.
              </p>
            </section>

            {/* How this impulse control task works */}
            <section>
              <h2 className="text-3xl font-bold text-white mb-4">How This Impulse Control Task Works</h2>
              <div className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-6">
                <div className="grid md:grid-cols-2 gap-6 text-dark-300">
                  <div>
                    <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-green-500" />
                      GO Signal (Green)
                    </h3>
                    <p className="text-sm">Click as quickly as you can when the green circle appears. This captures your reaction time and processing speed.</p>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-red-500" />
                      NO-GO Signal (Red)
                    </h3>
                    <p className="text-sm">Do NOT click when the red circle appears. Clicking here is a "commission error" — a failure to inhibit a prepotent response.</p>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
                  <p className="text-sm text-dark-300">
                    <strong className="text-blue-400">Test Structure:</strong> 10 trials with roughly 80% GO and 20% NO-GO signals, presented in random order with variable delays of 1.5–4 seconds — enough to build a response habit that the No-Go trials then challenge.
                  </p>
                </div>
              </div>
            </section>

            {/* What is a good score + benchmark table */}
            <section>
              <h2 className="text-3xl font-bold text-white mb-4">What Is a Good Go/No-Go Score?</h2>
              <p className="text-dark-300 leading-relaxed mb-5">
                Two numbers define your performance: <strong className="text-white">accuracy</strong> (did you hold back on the No-Go trials?) and your <strong className="text-white">Go reaction time</strong>. The catch is the <em>speed-accuracy trade-off</em> — race too fast and false alarms climb; play too safe and your reaction time balloons. Elite performers are both fast <em>and</em> controlled.
              </p>
              <div className="overflow-x-auto rounded-xl border border-dark-800">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="bg-dark-900/60 text-dark-400">
                      <th className="py-3 px-4 font-semibold whitespace-nowrap">Level</th>
                      <th className="py-3 px-4 font-semibold whitespace-nowrap">Accuracy</th>
                      <th className="py-3 px-4 font-semibold whitespace-nowrap">Go time</th>
                      <th className="py-3 px-4 font-semibold">What it means</th>
                    </tr>
                  </thead>
                  <tbody className="text-dark-300">
                    <tr className="border-t border-dark-800">
                      <td className="py-3 px-4 font-bold text-green-400 whitespace-nowrap">Elite Control</td>
                      <td className="py-3 px-4 whitespace-nowrap">95%+</td>
                      <td className="py-3 px-4 whitespace-nowrap">&lt; 350 ms</td>
                      <td className="py-3 px-4">Near-perfect inhibition with fast, decisive Go responses</td>
                    </tr>
                    <tr className="border-t border-dark-800">
                      <td className="py-3 px-4 font-bold text-blue-400 whitespace-nowrap">Sharp Reflexes</td>
                      <td className="py-3 px-4 whitespace-nowrap">85–94%</td>
                      <td className="py-3 px-4 whitespace-nowrap">350–420 ms</td>
                      <td className="py-3 px-4">Strong control — quick to go, reliable at stopping</td>
                    </tr>
                    <tr className="border-t border-dark-800">
                      <td className="py-3 px-4 font-bold text-yellow-400 whitespace-nowrap">Average</td>
                      <td className="py-3 px-4 whitespace-nowrap">70–84%</td>
                      <td className="py-3 px-4 whitespace-nowrap">420–500 ms</td>
                      <td className="py-3 px-4">Typical — a few false alarms slip through under speed</td>
                    </tr>
                    <tr className="border-t border-dark-800">
                      <td className="py-3 px-4 font-bold text-orange-400 whitespace-nowrap">Training Needed</td>
                      <td className="py-3 px-4 whitespace-nowrap">&lt; 70%</td>
                      <td className="py-3 px-4 whitespace-nowrap">&gt; 500 ms</td>
                      <td className="py-3 px-4">Impulse control is leaking — slow down and rebuild accuracy</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* The neuroscience of inhibition */}
            <section className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4">The Neuroscience of Inhibition</h2>
              <p className="text-dark-300 leading-relaxed">
                Stopping an action is an active brain process, not just the absence of one. It is driven largely by the <strong className="text-white">right inferior frontal cortex</strong> and connected prefrontal networks — the brain's braking system. When a No-Go signal appears, these regions fire a rapid "stop" command that overrides the motor plan already in motion. This is a core <strong className="text-white">executive function</strong>, from the same family of skills behind planning, focus, and self-control. Fatigue, stress, and poor sleep weaken this braking circuit — which is exactly why your No-Go accuracy tends to drop when you are tired.
              </p>
            </section>

            {/* How to sharpen cognitive control */}
            <section>
              <h2 className="text-3xl font-bold text-white mb-4">How to Sharpen Your Cognitive Control</h2>
              <p className="text-dark-300 leading-relaxed mb-4">Response inhibition is trainable. To strengthen your mental brakes:</p>
              <ul className="space-y-3 text-dark-300">
                <li className="flex items-start gap-3"><span className="text-blue-500 mt-1">•</span><span><strong className="text-white">Practice mindfulness</strong> — even short daily meditation is linked to better inhibitory control and fewer impulsive errors.</span></li>
                <li className="flex items-start gap-3"><span className="text-blue-500 mt-1">•</span><span><strong className="text-white">Manage fatigue</strong> — inhibition is metabolically expensive, so take breaks and avoid decision-heavy tasks when you are exhausted.</span></li>
                <li className="flex items-start gap-3"><span className="text-blue-500 mt-1">•</span><span><strong className="text-white">Train by repetition</strong> — regular Go/No-Go practice builds faster, more reliable stopping over time.</span></li>
                <li className="flex items-start gap-3"><span className="text-blue-500 mt-1">•</span><span><strong className="text-white">Slow down to speed up</strong> — deliberately prioritising accuracy first tends to produce cleaner, quicker responses later.</span></li>
                <li className="flex items-start gap-3"><span className="text-blue-500 mt-1">•</span><span><strong className="text-white">See the bigger picture</strong> — inhibition is one piece of attention. Pair this behavioral task with our <Link to="/test/adhd" className="text-blue-400 hover:text-blue-300 underline font-medium">ADHD Screening Test</Link> to see how your impulse-control performance fits alongside your broader attention and focus tendencies.</span></li>
              </ul>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-5"
                  >
                    <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                    <p className="text-dark-300 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
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
              <div className="w-6 h-6 rounded bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <Zap size={14} className="text-white" strokeWidth={2.5} fill="white" />
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
