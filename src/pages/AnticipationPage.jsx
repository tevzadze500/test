import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Target, Clock, Users, Activity, Crosshair, HelpCircle, AlertCircle, Trophy, Hash, RotateCcw } from 'lucide-react';
import Seo from '../components/Seo';
import { webApplicationSchema, breadcrumbSchema, faqSchema } from '../utils/structuredData';
import AnticipationTestArea from '../components/test/AnticipationTestArea';
import ConversionFooter from '../components/ConversionFooter';

const faqs = [
  {
    question: 'What is an anticipation (coincidence-timing) test?',
    answer: 'It measures how accurately you can predict when a moving object will reach a target — even when it disappears from view. Instead of simply reacting to a signal, you must anticipate timing, a skill central to sports like baseball, tennis, and cricket.',
  },
  {
    question: 'How is this different from a reaction time test?',
    answer: 'A reaction test measures how fast you respond after a stimulus appears. An anticipation test measures how precisely your timing matches a predictable event — you act before the cue, based on a learned rhythm, not after it.',
  },
  {
    question: 'What is a good anticipation score?',
    answer: 'Scores above 80% indicate excellent timing, with an average error under about 100 ms. Most people land in the 60–80% range. Elite athletes in interceptive sports often score very high because their sport trains exactly this skill.',
  },
  {
    question: 'How can I improve my anticipation timing?',
    answer: 'Practice builds an internal clock. Repetition, rhythm and music training, and interceptive sports (hitting, catching, returning serves) all sharpen coincidence-timing. Consistent focus and good sleep also help.',
  },
];

const AnticipationPage = () => {
  const [stats, setStats] = useState({ best: null, latest: null, attempts: 0 });

  useEffect(() => {
    const saved = localStorage.getItem('anticipationStats');
    if (saved) {
      try { setStats(JSON.parse(saved)); } catch (e) { /* ignore */ }
    }
  }, []);

  useEffect(() => {
    if (stats.attempts > 0) localStorage.setItem('anticipationStats', JSON.stringify(stats));
  }, [stats]);

  const handleResult = (score) => {
    setStats((prev) => ({
      best: prev.best ? Math.max(prev.best, score) : score,
      latest: score,
      attempts: prev.attempts + 1,
    }));
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all your stats?')) {
      setStats({ best: null, latest: null, attempts: 0 });
      localStorage.removeItem('anticipationStats');
    }
  };

  return (
    <div className="min-h-screen bg-dark-950">
      <Seo
        title="Anticipation Test - Coincidence Timing & Prediction | ReactionTestPro"
        description="Test your anticipation and timing for free. Predict when a moving marker reaches the target — even after it vanishes — and measure your coincidence-timing accuracy."
        keywords="anticipation test, timing test, coincidence anticipation, prediction test, timing accuracy, interceptive timing, sports timing test"
        canonical="/test/anticipation"
        jsonLd={[
          webApplicationSchema({
            name: 'Anticipation Test',
            description: 'Measure your coincidence-timing accuracy by predicting when a moving marker reaches a target.',
            path: '/test/anticipation',
            category: 'GameApplication',
          }),
          breadcrumbSchema('Anticipation Test', '/test/anticipation'),
          faqSchema(faqs),
        ]}
      />

      <header className="sticky top-0 z-40 bg-dark-900/95 backdrop-blur-sm border-b border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center gap-3 sm:gap-6">
            <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                <Target size={20} className="text-white" strokeWidth={2.5} />
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
              <Target size={26} className="text-white" strokeWidth={2.5} />
            </div>
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">Anticipation Test</h1>
              <p className="text-sm sm:text-base text-dark-400 mt-1">Predict the timing — act at the perfect moment</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-dark-800/50 rounded-lg border border-dark-700"><span className="text-dark-400">Category:</span><span className="text-green-400 font-medium">Performance</span></div>
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-dark-800/50 rounded-lg border border-dark-700"><Clock size={12} className="text-blue-400" /><span className="text-white">2 min</span></div>
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-dark-800/50 rounded-lg border border-dark-700"><Users size={12} className="text-purple-400" /><span className="text-white">45K+ participants</span></div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
          <div className="lg:col-span-2"><AnticipationTestArea onResult={handleResult} /></div>
          <div className="lg:col-span-1">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-dark-900/50 border border-dark-800 rounded-xl p-4">
                <div className="flex items-center gap-2 text-dark-400 text-xs mb-2"><Trophy size={14} className="text-green-500" /><span>Best</span></div>
                <div className="text-2xl md:text-3xl font-bold text-green-400">{stats.best != null ? `${stats.best}%` : '—'}</div>
              </div>
              <div className="bg-dark-900/50 border border-dark-800 rounded-xl p-4">
                <div className="flex items-center gap-2 text-dark-400 text-xs mb-2"><Crosshair size={14} className="text-blue-500" /><span>Latest</span></div>
                <div className="text-2xl md:text-3xl font-bold text-blue-400">{stats.latest != null ? `${stats.latest}%` : '—'}</div>
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
            <h2 className="text-3xl font-bold text-white mb-4">About the Anticipation Test</h2>
            <p className="text-dark-300 text-lg leading-relaxed">
              The Anticipation Test measures coincidence-timing — your ability to predict exactly when a moving object will reach a
              target. A marker travels toward a line at a steady speed, then disappears before it arrives. You must press at the precise
              moment it would cross the line. Unlike a pure reaction test, this rewards prediction and an accurate internal sense of timing.
            </p>
          </section>

          <section className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center"><Activity className="text-white" size={20} /></div>
              <h3 className="text-xl font-bold text-white">How It Works</h3>
            </div>
            <div className="space-y-3 text-dark-300">
              <div className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-sm font-bold">1</span><p>Press Start. A red marker begins moving toward the green target line.</p></div>
              <div className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-sm font-bold">2</span><p>Partway across, the marker vanishes — keep tracking its speed in your mind.</p></div>
              <div className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-sm font-bold">3</span><p>Click (or press Space) at the exact moment it would reach the line.</p></div>
              <div className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-sm font-bold">4</span><p>After 5 trials, you get an accuracy score based on your average timing error.</p></div>
            </div>
          </section>

          <section className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center"><Crosshair className="text-white" size={20} /></div>
              <h3 className="text-xl font-bold text-white">Why Anticipation Matters</h3>
            </div>
            <p className="text-dark-300 leading-relaxed">
              Coincidence-anticipation timing is one of the most important skills in interceptive sports. A baseball batter must start
              the swing before the ball arrives; a tennis player commits to a return as the serve is struck; a goalkeeper dives based on
              predicted ball flight. Training this internal clock improves performance far more than raw reaction speed alone.
            </p>
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
                This test is for entertainment and educational purposes. Results depend on your device and display latency and are not a
                clinical measurement.
              </p>
            </div>
          </section>
        </div>
      </main>

      <ConversionFooter />
    </div>
  );
};

export default AnticipationPage;
