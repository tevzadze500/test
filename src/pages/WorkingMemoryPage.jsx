import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Brain, Clock, Users, Activity, Target, HelpCircle, AlertCircle, Trophy, Hash, RotateCcw } from 'lucide-react';
import Seo from '../components/Seo';
import { webApplicationSchema, breadcrumbSchema, faqSchema } from '../utils/structuredData';
import MemoryTestArea from '../components/test/MemoryTestArea';
import ConversionFooter from '../components/ConversionFooter';

const faqs = [
  {
    question: 'What is working memory?',
    answer: 'Working memory is your brain’s short-term workspace for holding and manipulating information over a few seconds — like remembering a phone number long enough to dial it. It underpins reasoning, learning, and following instructions.',
  },
  {
    question: 'What is a good memory span?',
    answer: 'The classic estimate is "seven plus or minus two" items for adults, so reaching a span of 5–9 is typical. Reproducing sequences of 7 or more is excellent, and 9+ is exceptional for this visual sequence test.',
  },
  {
    question: 'How can I improve my working memory?',
    answer: 'Practice, quality sleep, regular aerobic exercise, and reducing multitasking all help. Chunking (grouping items into meaningful patterns) and rehearsal strategies can noticeably increase how many items you can hold.',
  },
  {
    question: 'Is this a clinical memory assessment?',
    answer: 'No. This is an educational, entertainment-oriented test. It gives a rough indication of short-term visual-spatial memory but is not a diagnostic tool. For memory concerns, consult a qualified healthcare professional.',
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
        title="Working Memory Test - Sequence Recall & Memory Span | ReactionTestPro"
        description="Test your working memory for free. Repeat growing sequences and measure your short-term memory span. Instant results, no signup required."
        keywords="working memory test, memory span test, sequence memory, short-term memory test, digit span, visual memory test, cognitive memory test"
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
            <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                <Brain size={20} className="text-white" strokeWidth={2.5} />
              </div>
              <div className="hidden sm:block">
                <h2 className="text-base sm:text-lg font-bold text-white group-hover:text-green-400 transition-colors">TestHub</h2>
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
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">Working Memory Test</h1>
              <p className="text-sm sm:text-base text-dark-400 mt-1">Repeat the sequence — how far can you go?</p>
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
              <button onClick={handleReset} className="mt-4 w-full flex items-center justify-center gap-2 px-3 py-2 bg-dark-800 hover:bg-dark-700 border border-dark-700 rounded-lg text-sm text-dark-300 hover:text-white transition-colors">
                <RotateCcw size={14} /> Reset stats
              </button>
            )}
          </div>
        </div>

        <div className="border-t border-dark-800 pt-8 sm:pt-12 space-y-8">
          <section>
            <h2 className="text-3xl font-bold text-white mb-4">About the Working Memory Test</h2>
            <p className="text-dark-300 text-lg leading-relaxed">
              The Working Memory Test challenges your short-term memory by showing a sequence of tiles that light up on a 3&times;3 grid.
              You then reproduce the sequence in the exact order. Each time you succeed, the sequence grows by one. The test ends when
              you make a mistake, and your score is your memory span — the longest sequence you reproduced correctly.
            </p>
          </section>

          <section className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center"><Activity className="text-white" size={20} /></div>
              <h3 className="text-xl font-bold text-white">How It Works</h3>
            </div>
            <div className="space-y-3 text-dark-300">
              <div className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-sm font-bold">1</span><p>Press Start and watch the tiles flash in sequence.</p></div>
              <div className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-sm font-bold">2</span><p>Click the tiles in the same order to repeat the sequence.</p></div>
              <div className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-sm font-bold">3</span><p>Each correct round adds one more tile, increasing the challenge.</p></div>
              <div className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-sm font-bold">4</span><p>One mistake ends the test — your memory span is the longest sequence you nailed.</p></div>
            </div>
          </section>

          <section className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center"><Target className="text-white" size={20} /></div>
              <h3 className="text-xl font-bold text-white">Memory Span Benchmarks</h3>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-dark-800/50 rounded-lg"><span className="text-purple-400 font-semibold">9+ items</span><p className="text-xs text-dark-400 mt-1">Exceptional — well above the typical adult range</p></div>
              <div className="p-3 bg-dark-800/50 rounded-lg"><span className="text-green-400 font-semibold">7–8 items</span><p className="text-xs text-dark-400 mt-1">Excellent working memory</p></div>
              <div className="p-3 bg-dark-800/50 rounded-lg"><span className="text-blue-400 font-semibold">5–6 items</span><p className="text-xs text-dark-400 mt-1">Average adult range ("seven plus or minus two")</p></div>
              <div className="p-3 bg-dark-800/50 rounded-lg"><span className="text-yellow-400 font-semibold">3–4 items</span><p className="text-xs text-dark-400 mt-1">Room to grow — try again after a short break</p></div>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center"><HelpCircle className="text-white" size={20} /></div>
              <h3 className="text-xl font-bold text-white">Frequently Asked Questions</h3>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-5">
                  <h4 className="text-white font-semibold mb-2 flex items-start gap-2"><span className="text-green-500 flex-shrink-0">Q:</span>{faq.question}</h4>
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
