import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Brain, Clock, Users, Target, AlertCircle, Trophy, Hash, RotateCcw } from 'lucide-react';
import Seo from '../components/Seo';
import { webApplicationSchema, breadcrumbSchema, faqSchema } from '../utils/structuredData';
import MemoryTestArea from '../components/test/MemoryTestArea';
import ConversionFooter from '../components/ConversionFooter';

const faqs = [
  {
    question: 'What is a good working memory span?',
    answer: 'Reaching 7 or more items is excellent, and most adults land between 5 and 9 — the classic "seven plus or minus two" range. On this visual sequence test, a span of 9 or more is genius-tier.',
  },
  {
    question: 'How many numbers or items can the average person remember?',
    answer: 'About seven, give or take two — so roughly 5 to 9 items in short-term memory. Grouping items into chunks (like a phone number) lets you effectively hold far more.',
  },
  {
    question: 'Can working memory be improved with cognitive training?',
    answer: 'You can meaningfully improve how well you use your capacity. Chunking, quality sleep, aerobic exercise, and cutting distractions all help you reach and sustain a higher span over time.',
  },
  {
    question: 'Is this the same as a digit span task?',
    answer: 'It is a visual-spatial version of the classic digit span task. Instead of recalling spoken numbers, you reproduce a growing sequence of tile positions, which taps your visual working memory.',
  },
];

const WorkingMemoryPage = () => {
  const [stats, setStats] = useState({ best: null, latest: null, attempts: 0 });

  useEffect(() => {
    const saved = localStorage.getItem('workingMemoryStats');
    if (saved) {
      try { setStats(JSON.parse(saved)); } catch (e) { /* ignore */ }
    }
  }, []);

  useEffect(() => {
    if (stats.attempts > 0) localStorage.setItem('workingMemoryStats', JSON.stringify(stats));
  }, [stats]);

  const handleResult = (span) => {
    setStats((prev) => ({
      best: prev.best ? Math.max(prev.best, span) : span,
      latest: span,
      attempts: prev.attempts + 1,
    }));
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all your stats?')) {
      setStats({ best: null, latest: null, attempts: 0 });
      localStorage.removeItem('workingMemoryStats');
    }
  };

  return (
    <div className="min-h-screen bg-dark-950">
      <Seo
        title="Working Memory Test – Can You Remember More Than 7 Digits?"
        description="Take the free working memory test. Memorize a growing sequence, measure your short-term memory span, and see how you rank — most adults manage 5 to 9. No signup."
        keywords="working memory test, working memory capacity, short-term memory test, digit span task, sequence memory, improve working memory, cognitive training, brain health"
        canonical="/test/memory"
        jsonLd={[
          webApplicationSchema({
            name: 'Working Memory Test',
            description: 'Measure your short-term memory span by repeating growing sequences.',
            path: '/test/memory',
          }),
          breadcrumbSchema('Working Memory Test', '/test/memory'),
          faqSchema(faqs),
        ]}
      />

      <header className="sticky top-0 z-40 bg-dark-900/95 backdrop-blur-sm border-b border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center gap-3 sm:gap-6">
            <Link to="/" aria-label="TestHub home" className="flex items-center gap-2 sm:gap-3 group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                <Brain size={20} className="text-white" strokeWidth={2.5} />
              </div>
              <div className="hidden sm:block">
                <p className="text-base sm:text-lg font-bold text-white group-hover:text-green-400 transition-colors">TestHub</p>
                <p className="text-xs text-dark-400">Testing Platform</p>
              </div>
            </Link>
            <div className="hidden sm:block h-8 w-px bg-dark-800" />
            <Link to="/" className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-2 text-dark-400 hover:text-white hover:bg-dark-800 rounded-lg transition-colors">
              <ArrowLeft size={14} /><span className="text-xs sm:text-sm font-medium">Back</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-12">
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30 shrink-0">
              <Brain size={26} className="text-white" strokeWidth={2.5} />
            </div>
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">Working Memory Test: Challenge Your Short-Term Cognitive Capacity</h1>
              <p className="text-sm sm:text-base text-dark-400 mt-1">Repeat the growing sequence — how far can your memory span stretch?</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-dark-800/50 rounded-lg border border-dark-700"><span className="text-dark-400">Category:</span><span className="text-green-400 font-medium">Cognitive</span></div>
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-dark-800/50 rounded-lg border border-dark-700"><Clock size={12} className="text-blue-400" /><span className="text-white">6 min</span></div>
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-dark-800/50 rounded-lg border border-dark-700"><Users size={12} className="text-purple-400" /><span className="text-white">72K+ participants</span></div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
          <div className="lg:col-span-2"><MemoryTestArea onResult={handleResult} /></div>
          <div className="lg:col-span-1">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-dark-900/50 border border-dark-800 rounded-xl p-4">
                <div className="flex items-center gap-2 text-dark-400 text-xs mb-2"><Trophy size={14} className="text-green-500" /><span>Best Span</span></div>
                <div className="text-2xl md:text-3xl font-bold text-green-400">{stats.best ?? '—'}</div>
              </div>
              <div className="bg-dark-900/50 border border-dark-800 rounded-xl p-4">
                <div className="flex items-center gap-2 text-dark-400 text-xs mb-2"><Target size={14} className="text-blue-500" /><span>Latest</span></div>
                <div className="text-2xl md:text-3xl font-bold text-blue-400">{stats.latest ?? '—'}</div>
              </div>
              <div className="bg-dark-900/50 border border-dark-800 rounded-xl p-4">
                <div className="flex items-center gap-2 text-dark-400 text-xs mb-2"><Hash size={14} className="text-yellow-500" /><span>Attempts</span></div>
                <div className="text-2xl md:text-3xl font-bold text-yellow-400">{stats.attempts || 0}</div>
              </div>
            </div>
            {stats.attempts > 0 && (
              <button type="button" onClick={handleReset} className="mt-4 w-full flex items-center justify-center gap-2 px-3 py-2 bg-dark-800 hover:bg-dark-700 border border-dark-700 rounded-lg text-sm text-dark-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400">
                <RotateCcw size={14} /> Reset stats
              </button>
            )}
          </div>
        </div>

        <div className="border-t border-dark-800 pt-8 sm:pt-12 space-y-8">
          {/* Hook + What Is Working Memory */}
          <section>
            <p className="text-dark-200 text-lg leading-relaxed mb-8">
              How much can your mind actually hold at once? Your working memory — the brain's short-term scratchpad — sets the ceiling on your focus, learning and mental speed. This free working memory test pushes that limit: memorize a growing sequence, repeat it back perfectly, and find out exactly where your <strong className="text-white">working memory capacity</strong> ranks.
            </p>
            <h2 className="text-3xl font-bold text-white mb-4">What Is Working Memory?</h2>
            <p className="text-dark-300 leading-relaxed">
              Working memory is your brain's mental workspace — the system that holds and manipulates information for a few seconds while you actively use it. It is what lets you keep a phone number in mind long enough to dial it, follow multi-step instructions, or do mental math. Unlike long-term memory, it is small, fast and easily disrupted by distraction, and your capacity here is one of the strongest predictors of learning, focus and problem-solving ability.
            </p>
          </section>

          {/* How this test works */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-4">How This Working Memory Test Works</h2>
            <p className="text-dark-300 leading-relaxed mb-5">
              This <strong className="text-white">short-term memory test</strong> is a visual sequence challenge on a 3&times;3 grid — a modern, spatial take on the classic <strong className="text-white">digit span task</strong>.
            </p>
            <div className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-6 space-y-3 text-dark-300">
              <div className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-sm font-bold">1</span><p><strong className="text-white">Watch:</strong> tiles light up one after another in a set order.</p></div>
              <div className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-sm font-bold">2</span><p><strong className="text-white">Repeat:</strong> tap them back in the exact same sequence.</p></div>
              <div className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-sm font-bold">3</span><p><strong className="text-white">Level up:</strong> every correct round adds one more tile.</p></div>
              <div className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-sm font-bold">4</span><p><strong className="text-white">Push your limit:</strong> one mistake ends the run — your score is your memory span, the longest sequence you reproduced perfectly.</p></div>
            </div>
          </section>

          {/* Average score + benchmark table */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-4">What Is an Average Working Memory Score?</h2>
            <p className="text-dark-300 leading-relaxed mb-5">
              Most adults land between <strong className="text-white">5 and 9 items</strong>. Because this is a <em>visual-spatial</em> sequence (closer to the Corsi block task than a spoken digit span), typical scores often sit a little lower than the famous "7" for numbers. Here is how to read your result:
            </p>
            <div className="overflow-x-auto rounded-xl border border-dark-800">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-dark-900/60 text-dark-400">
                    <th className="py-3 px-4 font-semibold whitespace-nowrap">Your span</th>
                    <th className="py-3 px-4 font-semibold whitespace-nowrap">Level</th>
                    <th className="py-3 px-4 font-semibold">What it means</th>
                  </tr>
                </thead>
                <tbody className="text-dark-300">
                  <tr className="border-t border-dark-800">
                    <td className="py-3 px-4 font-bold text-purple-400 whitespace-nowrap">9+ items</td>
                    <td className="py-3 px-4 whitespace-nowrap">🧠 Genius</td>
                    <td className="py-3 px-4">Elite working memory — well beyond the average range</td>
                  </tr>
                  <tr className="border-t border-dark-800">
                    <td className="py-3 px-4 font-bold text-green-400 whitespace-nowrap">7–8 items</td>
                    <td className="py-3 px-4 whitespace-nowrap">Above Average</td>
                    <td className="py-3 px-4">Sharp, focused recall — better than most adults</td>
                  </tr>
                  <tr className="border-t border-dark-800">
                    <td className="py-3 px-4 font-bold text-blue-400 whitespace-nowrap">5–6 items</td>
                    <td className="py-3 px-4 whitespace-nowrap">Typical Adult</td>
                    <td className="py-3 px-4">Right in the normal human range for a visual span</td>
                  </tr>
                  <tr className="border-t border-dark-800">
                    <td className="py-3 px-4 font-bold text-yellow-400 whitespace-nowrap">≤ 4 items</td>
                    <td className="py-3 px-4 whitespace-nowrap">Training Needed</td>
                    <td className="py-3 px-4">Likely a warm-up or a distraction — try again refreshed</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* The science / Miller's Law */}
          <section className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">The Science Behind Your Memory Span</h2>
            <p className="text-dark-300 leading-relaxed">
              In 1956, psychologist George Miller published one of the most cited papers in cognitive science: "The Magical Number Seven, Plus or Minus Two." His insight — now known as <strong className="text-white">Miller's Law</strong> — is that the average person can hold about <strong className="text-white">7 items</strong> (give or take two) in short-term memory at once. Later research refined the number downward toward four "chunks," but the core idea holds: your mind has a hard ceiling on raw items. Top performers don't have a bigger brain — they simply encode information more cleverly.
            </p>
          </section>

          {/* How to improve */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-4">How to Improve Your Working Memory and Focus</h2>
            <p className="text-dark-300 leading-relaxed mb-4">Your raw capacity is partly fixed, but how well you <em>use</em> it responds strongly to <strong className="text-white">cognitive training</strong> and healthy habits:</p>
            <ul className="space-y-3 text-dark-300">
              <li className="flex items-start gap-3"><span className="text-green-500 mt-1">•</span><span><strong className="text-white">Chunk it</strong> — group items into meaningful clusters (think "555-0199", not seven loose digits). Chunking is the single biggest lever for <strong className="text-white">improving working memory</strong>.</span></li>
              <li className="flex items-start gap-3"><span className="text-green-500 mt-1">•</span><span><strong className="text-white">Protect your sleep</strong> — memory consolidation happens overnight; even one poor night measurably shrinks your span.</span></li>
              <li className="flex items-start gap-3"><span className="text-green-500 mt-1">•</span><span><strong className="text-white">Kill distractions</strong> — every notification forces a costly mental reload. Single-task when it matters.</span></li>
              <li className="flex items-start gap-3"><span className="text-green-500 mt-1">•</span><span><strong className="text-white">Move your body</strong> — regular aerobic exercise supports <strong className="text-white">brain health</strong> and the prefrontal circuits behind working memory.</span></li>
              <li className="flex items-start gap-3"><span className="text-green-500 mt-1">•</span><span><strong className="text-white">Train your processing speed too</strong> — memory works best when your brain registers information fast. Pair this with our <Link to="/test/f1-reaction" className="text-green-400 hover:text-green-300 underline font-medium">F1 Reaction Test</Link>: sharp visual processing speed is the perfect complement to short-term memory.</span></li>
            </ul>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-5">
                  <h3 className="text-white font-semibold mb-2 flex items-start gap-2"><span className="text-green-500 flex-shrink-0">Q:</span>{faq.question}</h3>
                  <p className="text-dark-300 text-sm pl-6">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-orange-400 flex-shrink-0 mt-1" size={20} />
              <p className="text-dark-300 text-sm">
                This test is for entertainment and educational purposes and is not a clinical assessment. For memory or cognitive
                concerns, please consult a qualified healthcare professional.
              </p>
            </div>
          </section>
        </div>
      </main>

      <ConversionFooter />
    </div>
  );
};

export default WorkingMemoryPage;
