import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Breadcrumb from '../components/Breadcrumb';
import { webApplicationSchema, infoPageSchema, breadcrumbSchema, faqSchema } from '../utils/structuredData';
import Sidebar from '../components/Sidebar';
import MobileTopBar from '../components/MobileTopBar';
import TestCard from '../components/TestCard';
import ReactionTestArea from '../components/test/ReactionTestArea';
import AuditoryReactionTestArea from '../components/test/AuditoryReactionTestArea';
import ConversionFooter from '../components/ConversionFooter';
import { tests } from '../data/tests';
import { Trophy, Zap, Target, ArrowLeft, Lightbulb, Swords, Activity, Circle, Footprints, Volume2 } from 'lucide-react';
import StartLightsIcon from '../components/icons/StartLightsIcon';

function SportTestPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sportTestMode, setSportTestMode] = useState('visual'); // 'visual' | 'gun'

  // Get sports-related tests
  const sportsTests = tests.filter(test =>
    test.id === 'reaction-time' ||
    test.id === 'f1-reaction' ||
    test.id === 'anticipation-test' ||
    test.id === 'auditory-reaction'
  );

  const faqs = [
    {
      question: 'What is a good reaction time for athletes?',
      answer: 'Elite athletes typically have reaction times between 120 and 180 milliseconds, while competitive amateurs usually fall in the 220 to 270ms range. The average healthy adult reacts to a visual stimulus in roughly 200 to 270ms.'
    },
    {
      question: 'Which sports demand the fastest reaction times?',
      answer: 'Combat sports, racquet sports like tennis and table tennis, and sprint starts in track and field demand the fastest reactions. Elite fighters and tennis players often react in under 200ms, and sprinters respond to the starting gun in about 120 to 160ms.'
    },
    {
      question: 'Can you train and improve your sports reaction time?',
      answer: 'Yes. Sport-specific drills, plyometric training, vision and anticipation exercises, and regular testing can all improve reaction speed. Adequate sleep, hydration, and nutrition also help you maintain fast reactions during competition.'
    },
    {
      question: 'Why is a reaction under 100ms a false start in sprinting?',
      answer: 'In track and field, any reaction faster than 100ms to the starting gun is ruled a false start because it is considered humanly impossible to process the sound and respond that quickly. A genuine reaction means the athlete anticipated rather than reacted.'
    },
    {
      question: 'How do badminton, baseball, cricket, and goalkeeper reaction tests work?',
      answer: 'Badminton smashes, baseball fastballs, cricket pace bowling, and football penalty saves all rely on visual reaction speed plus cue anticipation. Use the Visual Reflex mode above to benchmark your 5-click average against the 231ms measured adult visual mean (Woods et al., 2015), or switch to Starting Gun Audio for sprint start practice.'
    }
  ];

  return (
    <div className="flex min-h-screen bg-dark-950">
      {/* SEO Meta Tags */}
      <Seo
        title="Sports Reaction Time Test (ms) – Sprint Gun, Ball & Reflexes"
        description="Free sports reaction time test: measure visual reflexes (badminton, baseball, cricket, goalkeeper) or track & field starting gun sound reaction in milliseconds."
        canonical="/sport-test"
        jsonLd={[
          webApplicationSchema({
            name: 'Sports Reaction Time Test',
            description: 'Interactive visual reflex and starting-gun auditory reaction time test for athletes across track and field, badminton, baseball, cricket, football, and combat sports.',
            path: '/sport-test',
            category: 'SportsApplication',
          }),
          infoPageSchema({
            name: 'Sports Reaction Test',
            description: 'Curated reaction and timing tests for athletes, with cited adult reaction-time benchmarks.',
            path: '/sport-test',
            type: 'CollectionPage',
          }),
          breadcrumbSchema('Sports Reaction Test', '/sport-test'),
          faqSchema(faqs)
        ]}
      />

      {/* Mobile Top Bar */}
      <MobileTopBar 
        onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
        isMenuOpen={isSidebarOpen} 
      />

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pt-16 lg:pt-0">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <Breadcrumb name="Sports Reaction Test" className="mb-4" />
          
          {/* Back Navigation */}
          <div className="pt-2 sm:pt-4 mb-4">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-dark-400 hover:text-white transition-colors text-sm"
            >
              <ArrowLeft size={16} />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Hero Section + Live Athlete Test */}
          <section className="mb-12 sm:mb-16 md:mb-20">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs sm:text-sm font-medium mb-3">
                <Trophy className="w-3.5 h-3.5" />
                Athlete Reflex &amp; Starting Gun Benchmark
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-3">
                Sports Reaction Time Test
              </h1>
              <p className="text-base sm:text-lg text-dark-300 max-w-3xl mx-auto leading-relaxed">
                Benchmark your visual reflexes for badminton, baseball, cricket, goalkeeper saves, and combat sports — or switch to Starting Gun Audio for track &amp; field sprint starts.
              </p>
            </div>

            {/* Dual-Mode Athlete Switcher */}
            <div className="max-w-xl mx-auto flex items-center justify-center gap-2 p-1.5 bg-dark-900/80 backdrop-blur border border-dark-800 rounded-2xl mb-5">
              <button
                type="button"
                onClick={() => setSportTestMode('visual')}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 sm:px-4 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 ${
                  sportTestMode === 'visual'
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                    : 'text-dark-400 hover:text-white hover:bg-dark-800/60'
                }`}
              >
                <Zap className="w-4 h-4 shrink-0" />
                <span>Visual Reflex (Ball &amp; Racquet)</span>
              </button>
              <button
                type="button"
                onClick={() => setSportTestMode('gun')}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 sm:px-4 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 ${
                  sportTestMode === 'gun'
                    ? 'bg-amber-500 text-dark-950 font-bold shadow-lg shadow-amber-500/25'
                    : 'text-dark-400 hover:text-white hover:bg-dark-800/60'
                }`}
              >
                <Volume2 className="w-4 h-4 shrink-0" />
                <span>Starting Gun Audio (Sprint)</span>
              </button>
            </div>

            {/* Interactive Playable Test */}
            <div className="max-w-4xl mx-auto mb-10">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-xs text-dark-400 px-1">
                <div className="flex items-center gap-2 text-blue-400 font-semibold">
                  {sportTestMode === 'visual' ? <Activity size={16} /> : <Footprints size={16} className="text-amber-400" />}
                  <span>
                    {sportTestMode === 'visual'
                      ? '5-Round Visual Reflex Benchmark (Goalkeeper, Badminton, Baseball, Cricket)'
                      : 'Track & Field Starting Gun Sound Test (Turn Sound ON)'}
                  </span>
                </div>
                <span>
                  {sportTestMode === 'visual'
                    ? 'Lab reference: ~190 ms'
                    : 'World Athletics false-start rule: < 100 ms'}
                </span>
              </div>

              {sportTestMode === 'visual' ? (
                <ReactionTestArea />
              ) : (
                <AuditoryReactionTestArea />
              )}
            </div>

            {/* SEO Content - Sports Reaction Test */}
            <div className="max-w-4xl mx-auto bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-2xl p-6 sm:p-8 mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Why Reaction Time is Critical in Sports
              </h2>
              <div className="text-dark-300 space-y-4">
                <p className="leading-relaxed">
                  In competitive sports, the difference between victory and defeat often comes down to milliseconds. A boxer who can react 50ms faster can dodge a punch or land a counter before their opponent. A tennis or badminton player with superior reflexes can return a serve or smash that others would miss. A soccer goalkeeper with quick reactions can make close-range penalty saves. Before you train it, though, you need a reliable baseline &mdash;{' '}
                  <Link to="/" className="text-green-400 hover:text-green-300 underline">compare your full 5-round bell curve</Link>{' '}
                  anytime.
                </p>
                <p className="leading-relaxed">
                  Professional athletes across all sports regularly test and train their reaction times to maintain peak performance. Our sports reaction tests help you measure your current baseline, compare visual and starting-gun auditory speed, and track your progress week over week.
                </p>
                <p className="leading-relaxed">
                  Want the full explanation, sport by sport? Read{' '}
                  <Link to="/blog/reaction-time-crucial" className="text-green-400 hover:text-green-300 underline">why reaction time is important in football, netball and other sports</Link>.
                </p>
              </div>
            </div>

            {/* Sports Performance Benefits */}
            <div className="max-w-4xl mx-auto bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-2xl p-6 sm:p-8 mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                How Reaction Time Affects Different Sports
              </h2>
              <div className="text-dark-300 space-y-4">
                <ul className="space-y-3 ml-4">
                  <li className="flex items-start gap-3">
                    <Footprints size={20} className="text-yellow-400 shrink-0 mt-1" strokeWidth={2.4} />
                    <div>
                      <strong className="text-white">Track &amp; Field &amp; Starting Gun:</strong> Sprinters need explosive acoustic reaction times off the starting blocks. World Athletics flags any reaction under 100ms (0.100s) to the gun as a false start, while elite sprinters typically clear the blocks in 120–160ms.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Activity size={20} className="text-green-400 shrink-0 mt-1" strokeWidth={2.4} />
                    <div>
                      <strong className="text-white">Badminton, Tennis &amp; Squash:</strong> Badminton smashes and 140mph tennis serves demand split-second visual reactions under 200ms combined with early racquet-head reading to intercept the shuttle or ball.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Circle size={20} className="text-blue-400 shrink-0 mt-1" strokeWidth={2.4} fill="currentColor" />
                    <div>
                      <strong className="text-white">Baseball &amp; Cricket Batting:</strong> A 95mph baseball fastball or 90mph cricket delivery reaches the plate or crease in roughly 400–450ms, leaving batters around 150–200ms to read release cues and trigger their swing.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Target size={20} className="text-cyan-400 shrink-0 mt-1" strokeWidth={2.4} />
                    <div>
                      <strong className="text-white">Football Goalkeeper &amp; Net Sports:</strong> An 11-metre penalty kick struck at 100 km/h reaches the goal in ~400ms. Goalkeepers, volleyball diggers, and table tennis players rely on sharp visual reaction speed paired with hip and shoulder anticipation.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Swords size={20} className="text-red-400 shrink-0 mt-1" strokeWidth={2.4} />
                    <div>
                      <strong className="text-white">Boxing, MMA &amp; Combat Sports:</strong> Quick reflexes let fighters slip jabs, parry strikes, and land counters on the first shoulder twitch. Competitive fighters routinely train sub-200ms visual reactions.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <StartLightsIcon size={20} className="text-orange-400 shrink-0 mt-1" />
                    <div>
                      <strong className="text-white">Motorsport &amp; Racing Starts:</strong> Formula 1, MotoGP, and track cycling require instant visual launch reactions when the start lights go out — try our dedicated{' '}
                      <Link to="/test/f1-reaction" className="text-orange-400 hover:text-orange-300 underline">F1 Start Lights reaction test</Link>.
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Training Tips for Athletes */}
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-blue-500/5 border border-blue-500/30 rounded-2xl p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                How Athletes Can Improve Reaction Time
              </h2>
              <div className="text-dark-300 space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-blue-400 font-bold shrink-0">1.</span>
                  <div>
                    <strong className="text-white">Sport-Specific Drills:</strong> Practice reaction drills that mimic your sport - tennis players should do ball drop drills, boxers should work with reaction balls, etc.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-400 font-bold shrink-0">2.</span>
                  <div>
                    <strong className="text-white">Plyometric Training:</strong> Exercises like box jumps and medicine ball throws improve neuromuscular response time and explosive power.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-400 font-bold shrink-0">3.</span>
                  <div>
                    <strong className="text-white">Vision Training:</strong> Improve peripheral vision and visual tracking to spot and react to stimuli faster during competition.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-400 font-bold shrink-0">4.</span>
                  <div>
                    <strong className="text-white">Regular Testing:</strong> Measure your reaction time weekly to track improvements and ensure you're maintaining peak performance levels.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-400 font-bold shrink-0">5.</span>
                  <div>
                    <strong className="text-white">Mental Training:</strong> Practice visualization and mental rehearsal to improve anticipation and decision-making speed during competition.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-400 font-bold shrink-0">6.</span>
                  <div>
                    <strong className="text-white">Recovery & Nutrition:</strong> Adequate sleep, proper hydration, and balanced nutrition are essential for maintaining fast reaction times.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Sports Tests Section */}
          <section className="mb-12 sm:mb-16">
            <div className="mb-6 sm:mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                Recommended Sports Reaction Tests
              </h2>
              <p className="text-base sm:text-lg text-dark-400">
                Choose from our selection of tests designed for athletic performance
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {sportsTests.map((test) => (
                <TestCard key={test.id} test={test} />
              ))}
            </div>
          </section>

          {/* Athletic Performance Benchmarks */}
          <section className="mb-12 sm:mb-16">
            <div className="max-w-4xl mx-auto bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-2xl p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                Athletic Reaction Time Benchmarks
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center shadow-lg shrink-0">
                    <Trophy size={22} className="text-white" strokeWidth={2.4} />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-white mb-1">Under ~190 ms — faster than the lab reference</div>
                    <div className="text-sm text-dark-300">Quicker than the long-accepted laboratory figure for college-age adults reacting to a light stimulus (Jain et al., 2015)</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-700 to-orange-700 flex items-center justify-center shadow-lg shrink-0">
                    <Trophy size={22} className="text-white" strokeWidth={2.4} />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-white mb-1">190–213 ms — faster than the corrected adult mean</div>
                    <div className="text-sm text-dark-300">Beats the hardware-corrected average of 213 ms measured across 1,469 adults aged 18–65 (Woods et al., 2015)</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl">
                  <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center text-2xl shrink-0">
                    ⭐
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-white mb-1">213–231 ms and above — the measured adult range</div>
                    <div className="text-sm text-dark-300">The same study's uncorrected mean is 231 ms — the closest published equivalent to a browser test — and times lengthen naturally with age (Woods et al., 2015)</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl flex items-start gap-3">
                <Lightbulb size={20} className="text-blue-300 shrink-0 mt-0.5" />
                <p className="text-sm text-dark-300">
                  <strong className="text-blue-400">Did you know?</strong> World Athletics rules a sprint start a false start if the athlete reacts within 100 ms of the gun (Technical Rule 16.8) — reacting faster than that is treated as anticipation, not reaction. See the{' '}
                  <a href="https://worldathletics.org/about-iaaf/documents/book-of-rules" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200 underline">official rulebook</a>.
                </p>
              </div>
            </div>
          </section>

          {/* Frequently Asked Questions */}
          <section className="mb-12 sm:mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-5"
                  >
                    <h3 className="text-lg font-bold text-white mb-2">{faq.question}</h3>
                    <p className="text-dark-300 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Conversion Footer */}
          <ConversionFooter />
        </div>
      </main>
    </div>
  );
}

export default SportTestPage;
