import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Head } from 'vite-react-ssg';
import Seo from '../components/Seo';
import { websiteSchema, organizationSchema } from '../utils/structuredData';
import Sidebar from '../components/Sidebar';
import MobileTopBar from '../components/MobileTopBar';
import TestCard from '../components/TestCard';
import StartLightsTestArea from '../components/test/StartLightsTestArea';
import useStartLightsStats from '../hooks/useStartLightsStats';
import ConversionFooter from '../components/ConversionFooter';
import SeoContent from '../components/SeoContent';
import StartLightsIcon from '../components/icons/StartLightsIcon';
import { tests, testCategories, testFamilies, getTestsByFamily } from '../data/tests';
import { Sparkles, Zap, Target, TrendingUp, ArrowRight, Gamepad2, Activity, Brain, Focus, Eye, Headphones, Timer, CheckCircle2, Users } from 'lucide-react';

function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const { hash } = useLocation();

  useEffect(() => {
    if (hash === "#all-tests") {
      const el = document.getElementById("all-tests");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [hash]);

  // The Start Lights test is played directly on this page; stats are shared
  // with /test/f1-reaction through the same hook.
  const { stats, handleResult } = useStartLightsStats();

  // Two-level catalogue: reaction tests first, then the broader screenings.
  const reactionTests = getTestsByFamily(testFamilies.REACTION);
  const cognitiveTests = getTestsByFamily(testFamilies.COGNITIVE);

  // Filter tests based on selected category
  const filteredTests = selectedCategory === 'ALL' 
    ? tests 
    : tests.filter(test => test.category === selectedCategory);

  // Category configuration
  const categories = [
    { id: 'ALL', name: 'All Tests', icon: Target, color: 'blue' },
    { id: testCategories.PERFORMANCE, name: 'Performance', icon: Zap, color: 'green' },
    { id: testCategories.COGNITIVE, name: 'Cognitive', icon: Brain, color: 'purple' },
    { id: testCategories.FOCUS, name: 'Focus', icon: Focus, color: 'blue' },
    { id: testCategories.VISION, name: 'Vision', icon: Eye, color: 'cyan' },
    { id: testCategories.HEARING, name: 'Hearing', icon: Headphones, color: 'pink' },
  ];

  return (
    <div className="flex min-h-screen bg-dark-950">
      {/* Hero preloads: only the homepage renders the hero, so only it pays
          the high-priority fetch (previously in index.html on every route). */}
      <Head>
        <link rel="preload" as="image" href="/hero-1280.webp" type="image/webp" media="(min-width: 768px) and (max-width: 1279px)" />
        <link rel="preload" as="image" href="/hero-1920.webp" type="image/webp" media="(min-width: 1280px)" />
        <link rel="preload" as="image" href="/hero-768.webp" type="image/webp" media="(max-width: 767px)" />
      </Head>

      {/* SEO Meta Tags */}
      <Seo
        title="Reaction Time Test – Test Your Reflexes Online"
        description="Take our free online reaction time test. Wait for the lights to turn on, react as fast as you can, and measure your reaction speed in milliseconds."
        canonical="/"
        jsonLd={[websiteSchema(), organizationSchema()]}
      />

      {/* Mobile Top Bar */}
      <MobileTopBar 
        onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
        isMenuOpen={isSidebarOpen} 
      />

      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        {/* Background Image - responsive WebP with JPEG fallback. No bg-fixed (causes mobile scroll jank) */}
        <picture>
          <source media="(min-width: 1280px)" srcSet="/hero-1920.webp" type="image/webp" />
          <source media="(min-width: 768px)" srcSet="/hero-1280.webp" type="image/webp" />
          <source srcSet="/hero-768.webp" type="image/webp" />
          <img
            src="/hero-1280.jpg"
            alt=""
            aria-hidden="true"
            className="fixed inset-0 z-0 w-full h-full object-cover pointer-events-none"
            style={{ filter: 'brightness(0.4)' }}
            fetchPriority="high"
            decoding="async"
          />
        </picture>

        {/* Dark Overlay for Better Text Readability */}
        <div className="fixed inset-0 z-0 bg-gradient-to-b from-dark-950/80 via-dark-950/70 to-dark-950/90 pointer-events-none" />
        
        {/* Content Container with Higher Z-Index */}
        <div className="relative z-10 max-w-7xl mx-auto p-4 pt-0 sm:p-6 lg:p-8 lg:pt-8">
          
          {/* Hero Section */}
          <section className="mb-12 sm:mb-16 md:mb-20 pt-20 sm:pt-24 md:pt-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-6 pt-4">
                <div className="w-24 h-24 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-2xl">
                  <Zap className="w-14 h-14 sm:w-12 sm:h-12 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6">
                Reaction Time Test &ndash; Test Your Reflexes Online
              </h1>
              <p className="text-xl sm:text-2xl text-dark-200 max-w-3xl mx-auto leading-relaxed font-medium">
                Test your reaction time with our free online reaction time test. Wait for the lights to turn on, then react as quickly as possible. Measure your reaction speed in milliseconds and see how fast your reflexes really are.
              </p>
            </div>

            {/* PRIMARY INTERACTIVE TEST — the Start Lights game, playable here */}
            <section aria-labelledby="reaction-time-test-heading" className="max-w-5xl mx-auto mb-12">
              <h2
                id="reaction-time-test-heading"
                className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center"
              >
                Test Your Reaction Time with the Start Lights Test
              </h2>

              <StartLightsTestArea onResult={handleResult} />

              {stats.attempts > 0 && (
                <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-sm">
                  <span className="px-4 py-2 rounded-lg bg-dark-900/70 border border-dark-800 text-dark-300">
                    Best <strong className="text-green-400 tabular-nums">{stats.best} ms</strong>
                  </span>
                  <span className="px-4 py-2 rounded-lg bg-dark-900/70 border border-dark-800 text-dark-300">
                    Average <strong className="text-white tabular-nums">{stats.average} ms</strong>
                  </span>
                  <span className="px-4 py-2 rounded-lg bg-dark-900/70 border border-dark-800 text-dark-300">
                    Attempts <strong className="text-white tabular-nums">{stats.attempts}</strong>
                  </span>
                </div>
              )}

              <p className="mt-5 text-center">
                <Link
                  to="/test/f1-reaction"
                  className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 font-semibold underline underline-offset-4"
                >
                  <StartLightsIcon size={18} className="shrink-0" />
                  Open the full Start Lights test &mdash; scoring tiers, stats and tips
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </p>
            </section>

            {/* How the primary test works */}
            <div className="max-w-4xl mx-auto bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-2xl p-6 sm:p-8 mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                How Does This Reaction Time Test Work?
              </h2>
              <ol className="space-y-5">
                <li className="flex items-start gap-4">
                  <span className="shrink-0 w-9 h-9 rounded-full bg-red-500/20 text-red-300 font-bold flex items-center justify-center">1</span>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Wait for the lights to turn on</h3>
                    <p className="text-dark-300 leading-relaxed">
                      Start the test and watch the tower. The red lights come on row by row, then hold for an unpredictable moment &mdash; so you cannot guess the signal.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="shrink-0 w-9 h-9 rounded-full bg-green-500/20 text-green-300 font-bold flex items-center justify-center">2</span>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">React as quickly as possible</h3>
                    <p className="text-dark-300 leading-relaxed">
                      The instant the lights switch to green, click or tap. Reacting before the signal is caught as a false start rather than counted as a fast time.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="shrink-0 w-9 h-9 rounded-full bg-blue-500/20 text-blue-300 font-bold flex items-center justify-center">3</span>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Get your reaction time in milliseconds</h3>
                    <p className="text-dark-300 leading-relaxed">
                      Your result appears immediately. Repeat a few times to build a reliable average &mdash; a single attempt is noise, and your times include your screen and input lag.
                    </p>
                  </div>
                </li>
              </ol>
            </div>

            {/* Explore More Tests - Enhanced Mobile-First Section */}
            <div className="max-w-4xl mx-auto mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 text-center">
                Reaction Time Tests by Activity
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-4">
                <Link 
                  to="/test/reaction-time" 
                  className="group relative overflow-hidden bg-gradient-to-br from-green-500/20 to-emerald-600/20 hover:from-green-500/30 hover:to-emerald-600/30 border-2 border-green-500/50 hover:border-green-400 rounded-2xl p-8 sm:p-6 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] hover:shadow-2xl hover:shadow-green-500/30"
                >
                  <div className="flex justify-center mb-4">
                    <Zap className="w-16 h-16 sm:w-12 sm:h-12 text-green-400" />
                  </div>
                  <h3 className="text-2xl sm:text-xl font-bold text-white mb-3 sm:mb-2 text-center group-hover:text-green-300 transition-colors">
                    General Reaction Test
                  </h3>
                  <p className="text-base sm:text-sm text-dark-200 text-center mb-5 sm:mb-4 leading-relaxed">
                    Simple visual reaction time measurement
                  </p>
                  <div className="flex justify-center">
                    <span className="inline-flex items-center gap-2 px-5 py-3 sm:px-4 sm:py-2 bg-green-500 hover:bg-green-600 text-white font-bold text-base sm:text-sm rounded-xl transition-all duration-200 group-hover:scale-105 shadow-lg">
                      Start Test Now
                      <ArrowRight className="w-5 h-5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
                
                <Link 
                  to="/gaming-test" 
                  className="group relative overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-600/20 hover:from-purple-500/30 hover:to-pink-600/30 border-2 border-purple-500/50 hover:border-purple-400 rounded-2xl p-8 sm:p-6 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] hover:shadow-2xl hover:shadow-purple-500/30"
                >
                  <div className="flex justify-center mb-4">
                    <Gamepad2 className="w-16 h-16 sm:w-12 sm:h-12 text-purple-400" />
                  </div>
                  <h3 className="text-2xl sm:text-xl font-bold text-white mb-3 sm:mb-2 text-center group-hover:text-purple-300 transition-colors">
                    Gaming Reaction Test
                  </h3>
                  <p className="text-base sm:text-sm text-dark-200 text-center mb-5 sm:mb-4 leading-relaxed">
                    Optimize your gaming reflexes
                  </p>
                  <div className="flex justify-center">
                    <span className="inline-flex items-center gap-2 px-5 py-3 sm:px-4 sm:py-2 bg-purple-500 hover:bg-purple-600 text-white font-bold text-base sm:text-sm rounded-xl transition-all duration-200 group-hover:scale-105 shadow-lg">
                      Try It Now
                      <ArrowRight className="w-5 h-5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
                
                <Link 
                  to="/sport-test" 
                  className="group relative overflow-hidden bg-gradient-to-br from-blue-500/20 to-cyan-600/20 hover:from-blue-500/30 hover:to-cyan-600/30 border-2 border-blue-500/50 hover:border-blue-400 rounded-2xl p-8 sm:p-6 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] hover:shadow-2xl hover:shadow-blue-500/30"
                >
                  <div className="flex justify-center mb-4">
                    <Activity className="w-16 h-16 sm:w-12 sm:h-12 text-blue-400" />
                  </div>
                  <h3 className="text-2xl sm:text-xl font-bold text-white mb-3 sm:mb-2 text-center group-hover:text-blue-300 transition-colors">
                    Sports Reaction Test
                  </h3>
                  <p className="text-base sm:text-sm text-dark-200 text-center mb-5 sm:mb-4 leading-relaxed">
                    Test your athletic reflexes
                  </p>
                  <div className="flex justify-center">
                    <span className="inline-flex items-center gap-2 px-5 py-3 sm:px-4 sm:py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold text-base sm:text-sm rounded-xl transition-all duration-200 group-hover:scale-105 shadow-lg">
                      Test Your Reflexes
                      <ArrowRight className="w-5 h-5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </div>
            </div>

            {/* Hub guidance - which test to take first */}
            <div className="max-w-4xl mx-auto bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-2xl p-6 sm:p-8 mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Which Test Should You Start With?
              </h2>
              <div className="text-dark-300 space-y-4">
                <p className="leading-relaxed">
                  Every test here runs free in your browser and takes between one and fifteen minutes, so the right starting point depends on what you want to know about yourself.
                </p>
                <ul className="space-y-3">
                  <li className="leading-relaxed">
                    <strong className="text-white">Want a quick thrill?</strong> The{' '}
                    <Link to="/test/f1-reaction" className="text-red-400 hover:text-red-300 underline">Start Lights Reaction Test</Link>{' '}
                    takes under a minute: red lights cascade, hold, then go green — and your launch time is on the clock.
                  </li>
                  <li className="leading-relaxed">
                    <strong className="text-white">Want a proper baseline?</strong> The{' '}
                    <Link to="/test/reaction-time" className="text-green-400 hover:text-green-300 underline">average reaction time test</Link>{' '}
                    measures your average over several attempts and compares it to published adult benchmarks.
                  </li>
                  <li className="leading-relaxed">
                    <strong className="text-white">Curious about self-control?</strong> The{' '}
                    <Link to="/test/go-no-go" className="text-blue-400 hover:text-blue-300 underline">Go/No-Go Test</Link>{' '}
                    adds a twist: reacting fast is only half the job — you also have to hold back on the wrong signal.
                  </li>
                  <li className="leading-relaxed">
                    <strong className="text-white">Checking in on your senses?</strong> The{' '}
                    <Link to="/test/vision" className="text-cyan-400 hover:text-cyan-300 underline">visual acuity</Link>,{' '}
                    <Link to="/test/color-blind" className="text-purple-400 hover:text-purple-300 underline">color vision</Link>{' '}
                    and{' '}
                    <Link to="/test/hearing" className="text-pink-400 hover:text-pink-300 underline">hearing frequency</Link>{' '}
                    screenings give you a quick, educational read — not a diagnosis — in a few minutes each.
                  </li>
                </ul>
              </div>
            </div>

            {/* SEO Content Component */}
            <SeoContent />

            {/* Hub guidance - how the test types differ */}
            <div className="max-w-4xl mx-auto bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-2xl p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                How Our Tests Differ
              </h2>
              <div className="text-dark-300 space-y-4">
                <p className="leading-relaxed">
                  The tests look similar on the surface — a signal appears, you respond — but they measure different things:
                </p>
                <ul className="space-y-3">
                  <li className="leading-relaxed">
                    <strong className="text-white">Simple reaction</strong> — one signal, one response. The{' '}
                    <Link to="/test/reaction-time" className="text-green-400 hover:text-green-300 underline">visual</Link>,{' '}
                    <Link to="/test/auditory-reaction" className="text-green-400 hover:text-green-300 underline">auditory</Link>{' '}
                    and{' '}
                    <Link to="/test/f1-reaction" className="text-red-400 hover:text-red-300 underline">start lights</Link>{' '}
                    tests time the raw perception-to-movement loop.
                  </li>
                  <li className="leading-relaxed">
                    <strong className="text-white">Choice and inhibition</strong> — some signals must be answered, others ignored. The{' '}
                    <Link to="/test/go-no-go" className="text-blue-400 hover:text-blue-300 underline">Go/No-Go Test</Link>{' '}
                    measures how well your brain vetoes an action it has already primed.
                  </li>
                  <li className="leading-relaxed">
                    <strong className="text-white">Anticipation</strong> — nothing to react to, everything to predict. The{' '}
                    <Link to="/test/anticipation" className="text-blue-400 hover:text-blue-300 underline">Anticipation Test</Link>{' '}
                    scores how precisely you time a moving target's arrival.
                  </li>
                  <li className="leading-relaxed">
                    <strong className="text-white">Capacity</strong> — no clock pressure at all. The{' '}
                    <Link to="/test/memory" className="text-purple-400 hover:text-purple-300 underline">Working Memory Test</Link>{' '}
                    stretches how many digits you can hold and recall.
                  </li>
                </ul>
                <p className="leading-relaxed">
                  Whichever you pick, your time always includes your hardware — display and input latency can add 20–50 ms — so trends on the same device matter more than one-off numbers. For the published adult averages we benchmark against, see the{' '}
                  <Link to="/test/reaction-time" className="text-green-400 hover:text-green-300 underline">cited reaction-time benchmarks</Link>{' '}
                  on the main test page.
                </p>
              </div>
            </div>
          </section>

          {/* Test catalogue, two levels: reaction tests first (the site's
              primary subject), then the broader cognitive / vision / hearing
              screenings. Picking a sidebar category collapses it to one grid. */}
          <section className="mb-12 sm:mb-16" id="all-tests">
            {selectedCategory === 'ALL' ? (
              <>
                <div className="mb-6 sm:mb-8">
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                    More Reaction Time Tests
                  </h2>
                  <p className="text-base sm:text-lg text-dark-400">
                    Other ways to measure how fast you react &mdash; to light, to sound, and when you have to hold back.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 mb-12 sm:mb-16">
                  {reactionTests.map((test) => (
                    <TestCard key={test.id} test={test} />
                  ))}
                </div>

                <div className="mb-6 sm:mb-8">
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                    Explore More Cognitive Tests
                  </h2>
                  <p className="text-base sm:text-lg text-dark-400">
                    Memory, attention, vision and hearing screenings &mdash; free, instant, and private to your browser.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                  {cognitiveTests.map((test) => (
                    <TestCard key={test.id} test={test} />
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="mb-6 sm:mb-8">
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                    Browse All Tests
                  </h2>
                  <p className="text-base sm:text-lg text-dark-400">
                    Select a category to filter tests or browse all available tests
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                  {filteredTests.map((test) => (
                    <TestCard key={test.id} test={test} />
                  ))}
                </div>

                {filteredTests.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-dark-800 flex items-center justify-center mx-auto mb-4">
                      <Target className="w-8 h-8 text-dark-600" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">No tests found</h3>
                    <p className="text-dark-400">Try selecting a different category</p>
                  </div>
                )}
              </>
            )}
          </section>

          {/* Conversion Footer */}
          <ConversionFooter />
        </div>
      </main>
    </div>
  );
}

export default HomePage;
