import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Volume2, Clock, Users, Activity, Ear, HelpCircle, AlertCircle } from 'lucide-react';
import Seo from '../components/Seo';
import { webApplicationSchema, breadcrumbSchema, faqSchema } from '../utils/structuredData';
import AuditoryReactionTestArea from '../components/test/AuditoryReactionTestArea';
import ReactionStatsCard from '../components/test/ReactionStatsCard';
import ConversionFooter from '../components/ConversionFooter';

const faqs = [
  {
    question: 'What is a good auditory reaction time?',
    answer: 'Auditory reaction time is typically faster than visual reaction time. Most people score between 140 and 200 ms to sound, compared to 200–300 ms for visual stimuli, because sound reaches the brain slightly faster than light-based signals are processed.',
  },
  {
    question: 'Why is reaction to sound faster than to light?',
    answer: 'Auditory information takes a shorter neural path to the brain than visual information, so the brain registers a sound a few milliseconds sooner than a visual change. This is why sprint races use a starting gun rather than a light.',
  },
  {
    question: 'Do I need headphones for this test?',
    answer: 'Headphones are recommended for the clearest, most consistent beep, but the test also works with speakers. Just make sure your volume is turned on and high enough to hear the tone clearly.',
  },
  {
    question: 'Can I improve my auditory reaction time?',
    answer: 'Yes. Regular practice, good sleep, staying hydrated, and reducing distractions all help. Rhythm-based games and music training can also sharpen how quickly you respond to sound.',
  },
];

const AuditoryReactionPage = () => {
  const [stats, setStats] = useState({ best: null, average: null, latest: null, attempts: 0, allScores: [] });

  useEffect(() => {
    const saved = localStorage.getItem('auditoryReactionStats');
    if (saved) {
      try { setStats(JSON.parse(saved)); } catch (e) { /* ignore */ }
    }
  }, []);

  useEffect(() => {
    if (stats.attempts > 0) localStorage.setItem('auditoryReactionStats', JSON.stringify(stats));
  }, [stats]);

  const handleResult = (ms) => {
    setStats((prev) => {
      const allScores = [...prev.allScores, ms];
      return {
        best: prev.best ? Math.min(prev.best, ms) : ms,
        average: Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length),
        latest: ms,
        attempts: prev.attempts + 1,
        allScores,
      };
    });
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all your stats?')) {
      setStats({ best: null, average: null, latest: null, attempts: 0, allScores: [] });
      localStorage.removeItem('auditoryReactionStats');
    }
  };

  return (
    <div className="min-h-screen bg-dark-950">
      <Seo
        title="Auditory Reaction Test - Measure Your Response to Sound | ReactionTestPro"
        description="Test your auditory reaction time for free. Click the instant you hear the beep and measure how fast you respond to sound in milliseconds. Instant results, no signup."
        keywords="auditory reaction test, reaction to sound, sound reaction time, audio reflex test, hearing reaction time, reaction speed sound"
        canonical="/test/auditory-reaction"
        jsonLd={[
          webApplicationSchema({
            name: 'Auditory Reaction Test',
            description: 'Measure how fast you react to a sound stimulus, in milliseconds.',
            path: '/test/auditory-reaction',
          }),
          breadcrumbSchema('Auditory Reaction Test', '/test/auditory-reaction'),
          faqSchema(faqs),
        ]}
      />

      <header className="sticky top-0 z-40 bg-dark-900/95 backdrop-blur-sm border-b border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center gap-3 sm:gap-6">
            <Link to="/" aria-label="TestHub home" className="flex items-center gap-2 sm:gap-3 group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                <Volume2 size={20} className="text-white" strokeWidth={2.5} />
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
              <Volume2 size={26} className="text-white" strokeWidth={2.5} />
            </div>
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">Auditory Reaction Test</h1>
              <p className="text-sm sm:text-base text-dark-400 mt-1">Measure how fast you respond to sound</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-dark-800/50 rounded-lg border border-dark-700"><span className="text-dark-400">Category:</span><span className="text-green-400 font-medium">Performance</span></div>
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-dark-800/50 rounded-lg border border-dark-700"><Clock size={12} className="text-blue-400" /><span className="text-white">2 min</span></div>
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-dark-800/50 rounded-lg border border-dark-700"><Volume2 size={12} className="text-pink-400" /><span className="text-white">Audio required</span></div>
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-dark-800/50 rounded-lg border border-dark-700"><Users size={12} className="text-purple-400" /><span className="text-white">55K+ participants</span></div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
          <div className="lg:col-span-2"><AuditoryReactionTestArea onResult={handleResult} /></div>
          <div className="lg:col-span-1"><ReactionStatsCard stats={stats} onReset={handleReset} /></div>
        </div>

        <div className="border-t border-dark-800 pt-8 sm:pt-12 space-y-8">
          <section>
            <h2 className="text-3xl font-bold text-white mb-4">About the Auditory Reaction Test</h2>
            <p className="text-dark-300 text-lg leading-relaxed">
              The Auditory Reaction Test measures how quickly you can respond to a sound. After you start the test, a short beep
              plays following a random delay, and your goal is to click as fast as possible the instant you hear it. Your response
              time is measured in milliseconds (ms), capturing the speed of your auditory processing and motor response.
            </p>
          </section>

          <section className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center"><Activity className="text-white" size={20} /></div>
              <h3 className="text-xl font-bold text-white">How It Works</h3>
            </div>
            <div className="space-y-3 text-dark-300">
              <div className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-sm font-bold">1</span><p>Turn your sound on (headphones give the most reliable result) and click to start.</p></div>
              <div className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-sm font-bold">2</span><p>Wait through a random 1.5–4 second delay — do not click yet.</p></div>
              <div className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-sm font-bold">3</span><p>The instant you hear the beep, click as fast as you can.</p></div>
              <div className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-sm font-bold">4</span><p>Your reaction time appears in milliseconds. Repeat to beat your best score.</p></div>
            </div>
          </section>

          <section className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center"><Ear className="text-white" size={20} /></div>
              <h3 className="text-xl font-bold text-white">Auditory vs. Visual Reaction Time</h3>
            </div>
            <p className="text-dark-300 leading-relaxed">
              Reaction to sound is usually faster than reaction to a visual cue. Sound signals reach the brain through a shorter
              neural pathway, so most people react to a beep in roughly 140–200 ms, versus 200–300 ms for a visual change. This is
              exactly why athletics sprints start with a gun and not a light — the auditory channel shaves precious milliseconds off
              every competitor's launch.
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
                This test is for entertainment and educational purposes. Results depend on your device, audio latency and headphones,
                so they are not a clinical measurement. For hearing concerns, consult a qualified audiologist.
              </p>
            </div>
          </section>
        </div>
      </main>

      <ConversionFooter />
    </div>
  );
};

export default AuditoryReactionPage;
