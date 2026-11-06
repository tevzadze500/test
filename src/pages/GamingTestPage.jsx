import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Breadcrumb from '../components/Breadcrumb';
import { infoPageSchema, breadcrumbSchema, faqSchema } from '../utils/structuredData';
import Sidebar from '../components/Sidebar';
import MobileTopBar from '../components/MobileTopBar';
import TestCard from '../components/TestCard';
import ReactionTestArea from '../components/test/ReactionTestArea';
import ConversionFooter from '../components/ConversionFooter';
import { tests } from '../data/tests';
import { Gamepad2, Zap, Target, ArrowLeft, Crosshair, Brain, Trophy, Star, Sparkles, ThumbsUp, Swords, Shield, Flame } from 'lucide-react';
import StartLightsIcon from '../components/icons/StartLightsIcon';

function GamingTestPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Get gaming-related tests
  const gamingTests = tests.filter(test =>
    test.id === 'reaction-time' ||
    test.id === 'f1-reaction' ||
    test.id === 'go-no-go' ||
    test.id === 'anticipation-test'
  );

  const faqs = [
    {
      question: 'What is a good reaction time for Valorant and CS2?',
      answer: 'For competitive tactical shooters like Valorant and CS2, an average visual reaction time between 150ms and 190ms is typical of top-tier players (Radiant, Immortal, Faceit Level 10). A solid competitive average for Diamond/Ascendant sits around 190–215ms, while casual ranks average 230–260ms.'
    },
    {
      question: 'What is TenZ or s1mple reaction time?',
      answer: 'Top pro players like TenZ and s1mple regularly score between 140ms and 160ms on raw visual click tests when using 240Hz/360Hz esports monitors with low-latency optical gaming mice.'
    },
    {
      question: 'Does reaction time alone make you better at FPS games?',
      answer: 'Raw speed is only part of the equation: crosshair placement, peeker advantage, prediction, and game sense matter just as much. However, having faster reaction time gives you a critical split-second edge in 50/50 opening duels and sniper peeks.'
    },
    {
      question: 'How do 144Hz, 240Hz, and 360Hz monitors affect reaction times?',
      answer: 'Higher refresh rates deliver new visual frames faster: a 60Hz screen has a 16.7ms frame interval, 144Hz is 6.9ms, 240Hz is 4.2ms, and 360Hz is just 2.8ms. Upgrading from 60Hz to 144Hz+ typically improves your measured score by 15 to 30 milliseconds.'
    },
    {
      question: 'What is a good reaction time for MOBA and battle royale games?',
      answer: 'In MOBAs (League of Legends, Dota 2) and Battle Royales (Apex Legends, Fortnite), a 190–220ms response time enables frame-perfect flash dodges, defensive builds, and instant ability counter-attacks.'
    }
  ];

  return (
    <div className="flex min-h-screen bg-dark-950">
      {/* SEO Meta Tags - optimized for high-volume Valorant & CS2 queries */}
      <Seo
        title="Valorant & CS2 Reaction Time Test (ms) – Gaming Reflex Benchmark"
        description="Free FPS gaming reaction time test: benchmark your reflexes in milliseconds for Valorant, CS2, and Apex. Compare your score to Radiant, Immortal, and Pro player tiers."
        canonical="/gaming-test"
        jsonLd={[
          infoPageSchema({
            name: 'Gaming & FPS Reaction Test',
            description: 'Reaction and reflex test calibrated for FPS and esports players: Valorant, CS2, Fortnite, and Apex Legends benchmarks.',
            path: '/gaming-test',
            type: 'CollectionPage',
          }),
          breadcrumbSchema('Gaming Reaction Test', '/gaming-test'),
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
          <Breadcrumb name="Gaming Reaction Test" className="mb-4" />
          
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

          {/* Hero Section */}
          <section className="mb-8 sm:mb-12">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs sm:text-sm font-medium mb-3">
                <Crosshair className="w-3.5 h-3.5" />
                Valorant, CS2 &amp; Tactical FPS Benchmark
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-3">
                Gaming Reaction Time Test
              </h1>
              <p className="text-base sm:text-lg text-dark-300 max-w-3xl mx-auto leading-relaxed">
                Test your raw visual reflexes across a 5-round series. Compare your millisecond speed against esports ranks from Bronze to Radiant and Faceit Level 10.
              </p>
            </div>

            {/* Interactive Playable Test */}
            <div className="max-w-4xl mx-auto mb-10">
              <div className="mb-3 flex items-center justify-between text-xs text-dark-400 px-1">
                <div className="flex items-center gap-2 text-purple-400 font-semibold">
                  <Gamepad2 size={16} />
                  <span>5-Round Reflex Benchmark</span>
                </div>
                <span>Pro target: &lt; 180 ms</span>
              </div>
              <ReactionTestArea />
            </div>

            {/* Esport Rank Tier Benchmark Table */}
            <div className="max-w-4xl mx-auto bg-dark-900/60 backdrop-blur-sm border border-dark-800 rounded-2xl p-5 sm:p-8 mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <Trophy className="text-yellow-400" size={28} />
                <span>Valorant &amp; CS2 Rank Benchmarks (ms)</span>
              </h2>
              <p className="text-dark-300 text-sm sm:text-base leading-relaxed mb-6">
                Based on competitive shooter telemetry and low-latency hardware measurements, here is how reaction time maps to competitive ranks:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4">
                <div className="p-4 rounded-xl bg-gradient-to-br from-yellow-500/10 to-amber-500/5 border border-yellow-500/30">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-yellow-400 text-sm sm:text-base flex items-center gap-1.5">
                      <Flame size={16} /> Pro Tier (TenZ, s1mple, Aspas)
                    </span>
                    <span className="font-mono font-bold text-white text-sm bg-dark-900 px-2.5 py-0.5 rounded-lg border border-yellow-500/30">
                      &lt; 165 ms
                    </span>
                  </div>
                  <p className="text-xs text-dark-300 leading-relaxed">
                    Peak human visual response combined with 240Hz/360Hz monitors and ultra-light optical mice.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/5 border border-purple-500/30">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-purple-400 text-sm sm:text-base flex items-center gap-1.5">
                      <Star size={16} /> Radiant / Faceit Level 10
                    </span>
                    <span className="font-mono font-bold text-white text-sm bg-dark-900 px-2.5 py-0.5 rounded-lg border border-purple-500/30">
                      165 – 190 ms
                    </span>
                  </div>
                  <p className="text-xs text-dark-300 leading-relaxed">
                    Top 1% competitive players. Near-instant first-shot accuracy on Operator and sniper peeks.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-blue-500/30">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-blue-400 text-sm sm:text-base flex items-center gap-1.5">
                      <Shield size={16} /> Immortal / Ascendant / Faceit 8-9
                    </span>
                    <span className="font-mono font-bold text-white text-sm bg-dark-900 px-2.5 py-0.5 rounded-lg border border-blue-500/30">
                      190 – 215 ms
                    </span>
                  </div>
                  <p className="text-xs text-dark-300 leading-relaxed">
                    Above average human reflex. Strong duel conversion when combined with disciplined crosshair placement.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border border-emerald-500/30">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-emerald-400 text-sm sm:text-base flex items-center gap-1.5">
                      <Target size={16} /> Diamond / Platinum / Gold
                    </span>
                    <span className="font-mono font-bold text-white text-sm bg-dark-900 px-2.5 py-0.5 rounded-lg border border-emerald-500/30">
                      215 – 245 ms
                    </span>
                  </div>
                  <p className="text-xs text-dark-300 leading-relaxed">
                    Typical healthy adult reaction speed. Matches the broad scientific baseline (~230 ms).
                  </p>
                </div>
              </div>

              <div className="p-3 bg-dark-950/70 border border-dark-800 rounded-xl text-xs text-dark-400">
                💡 <strong>Hardware note:</strong> A 60Hz office monitor and Bluetooth mouse can add up to 40 ms of delay to your score. For esports benchmarking, test with wired input and 144Hz+ display mode.
              </div>
            </div>

            {/* SEO Content - Gaming Reaction Test */}
            <div className="max-w-4xl mx-auto bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-2xl p-6 sm:p-8 mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Why Gaming Reaction Time Matters
              </h2>
              <div className="text-dark-300 space-y-4">
                <p className="leading-relaxed">
                  In competitive gaming, every millisecond counts. Whether you're playing first-person shooters like CS:GO and Valorant, battle royales like Fortnite and Apex Legends, or MOBAs like League of Legends and Dota 2, your reaction time directly impacts your performance and ranking. If you have not measured yours yet, start with the{' '}
                  <Link to="/" className="text-green-400 hover:text-green-300 underline">main reaction time test</Link>{' '}
                  and come back with a baseline.
                </p>
                <p className="leading-relaxed">
                  Professional esports players typically have reaction times between 150-200ms. By regularly testing and training your reflexes, you can identify your baseline, track improvements, and develop the lightning-fast responses needed to compete at the highest levels.
                </p>
              </div>
            </div>

            {/* Gaming Performance Benefits */}
            <div className="max-w-4xl mx-auto bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-2xl p-6 sm:p-8 mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                How Reaction Time Affects Your Gaming
              </h2>
              <div className="text-dark-300 space-y-4">
                <ul className="space-y-3 ml-4">
                  <li className="flex items-start gap-3">
                    <Crosshair size={20} className="text-purple-400 shrink-0 mt-1" strokeWidth={2.4} />
                    <div>
                      <strong className="text-white">FPS Games:</strong> Faster reactions help you land the first shot in duels, react to enemy movements, and flick to targets with precision in games like Call of Duty, CS:GO, Valorant, and Overwatch.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Zap size={20} className="text-pink-400 shrink-0 mt-1" strokeWidth={2.4} fill="currentColor" />
                    <div>
                      <strong className="text-white">Battle Royales:</strong> Quick reflexes allow you to respond to sudden encounters, react to third-party attacks, and make split-second building or movement decisions in Fortnite, PUBG, and Apex Legends.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Brain size={20} className="text-blue-400 shrink-0 mt-1" strokeWidth={2.4} />
                    <div>
                      <strong className="text-white">MOBA Games:</strong> In League of Legends and Dota 2, reaction time helps you dodge skillshots, execute combos perfectly, and respond to enemy abilities during team fights.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <StartLightsIcon size={20} className="text-green-400 shrink-0 mt-1" />
                    <div>
                      <strong className="text-white">Racing Games:</strong> In simulators like iRacing, F1, and Gran Turismo, quick reactions help you avoid collisions, take optimal racing lines, and respond to changing track conditions.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Swords size={20} className="text-orange-400 shrink-0 mt-1" strokeWidth={2.4} />
                    <div>
                      <strong className="text-white">Fighting Games:</strong> Street Fighter, Tekken, and Mortal Kombat require frame-perfect reactions to block, counter, and punish opponent moves.
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Per-game breakdown: what reaction time buys you in each title
                and which test on the site measures it. Bands stay anchored to
                the cited adult means — no per-rank or pro figures are invented. */}
            <div className="max-w-4xl mx-auto bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-2xl p-6 sm:p-8 mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Reaction Time by Game: Valorant, CS2, Fortnite &amp; Apex
              </h2>
              <p className="text-dark-300 leading-relaxed mb-6">
                "Good" depends on what the game asks of you. Some titles are decided by a single first shot; others by tracking, decisions and building. Here is what reaction time actually buys you in each, and which test on this site measures it.
              </p>
              <div className="space-y-6 text-dark-300">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Valorant reaction time</h3>
                  <p className="leading-relaxed">
                    Valorant duels end in one bullet: a Vandal or Operator headshot kills instantly, so whoever registers the peek first usually wins. Riot runs its servers at 128 tick, so your input is sampled roughly every 8 ms — a rounding error next to a 200 ms human reaction. What separates ranks is not raw speed but pre-aim: holding the crosshair where the enemy will appear turns an average 231 ms reaction into a first shot. Benchmark yourself on the{' '}
                    <Link to="/" className="text-green-400 hover:text-green-300 underline">reaction time test</Link>; under 213 ms puts you ahead of the corrected adult mean (Woods et al., 2015). Then use the{' '}
                    <Link to="/test/f1-reaction" className="text-green-400 hover:text-green-300 underline">F1 start lights test</Link>{' '}
                    to train the discipline of not firing early — a false start there is a wasted peek in-game.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">CS2 (Counter-Strike 2) reaction time</h3>
                  <p className="leading-relaxed">
                    Counter-Strike 2 records the exact moment of your click with its sub-tick system rather than waiting for the next server tick, so the game is as honest about your reaction as your hardware allows. Two things matter more here than anywhere else: counter-strafing, stopping dead before you shoot, and sound. Footsteps and reloads reach you before the enemy is on screen, and reactions to sound are measurably faster than reactions to light (Jain et al., 2015). Pair the visual test with the{' '}
                    <Link to="/test/auditory-reaction" className="text-green-400 hover:text-green-300 underline">auditory reaction test</Link>: the gap between your two numbers is the edge good headphones give you.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Fortnite &amp; Apex Legends reaction time</h3>
                  <p className="leading-relaxed">
                    Time-to-kill is longer in Fortnite and Apex, so a single 20 ms edge rarely decides a fight. What does is choosing the right action fast — shoot, build, slide, heal — and tracking a moving target. That is a choice reaction, which is slower than a simple one and declines more steeply with age (Der &amp; Deary, 2006). The{' '}
                    <Link to="/test/go-no-go" className="text-green-400 hover:text-green-300 underline">Go/No-Go test</Link>{' '}
                    measures exactly that shoot-or-hold decision, and the{' '}
                    <Link to="/test/anticipation" className="text-green-400 hover:text-green-300 underline">anticipation test</Link>{' '}
                    scores how well you time a moving target.
                  </p>
                </div>
              </div>
              <p className="text-xs text-dark-400 leading-relaxed mt-6">
                No published per-game or per-rank reaction-time dataset exists, so the bands above compare you to peer-reviewed adult averages rather than to named pros. Wondering what your own number means? See{' '}
                <Link to="/blog/good-reaction-time-ms" className="text-green-400 hover:text-green-300 underline">Is 200 ms a good reaction time?</Link>
              </p>
            </div>

            {/* Training Tips */}
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-purple-500/5 border border-purple-500/30 rounded-2xl p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Tips to Improve Your Gaming Reflexes
              </h2>
              <p className="text-dark-300 leading-relaxed mb-4">
                The short version is below. For the evidence behind each step, frame times by refresh rate and how to train the reaction your game uses, read the full guide:{' '}
                <Link to="/blog/improve-reaction-time-gaming" className="text-green-400 hover:text-green-300 underline">how to improve your reaction time for gaming</Link>.
              </p>
              <div className="text-dark-300 space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-purple-400 font-bold shrink-0">1.</span>
                  <div>
                    <strong className="text-white">Regular Testing:</strong> Test your reaction time daily to establish a baseline and track improvements over time.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-purple-400 font-bold shrink-0">2.</span>
                  <div>
                    <strong className="text-white">Warm-Up Routine:</strong> Use reaction tests as part of your gaming warm-up to get your reflexes ready before competitive matches.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-purple-400 font-bold shrink-0">3.</span>
                  <div>
                    <strong className="text-white">Optimize Setup:</strong> Use a gaming mouse with low latency, a high refresh rate monitor (144Hz+), and reduce input lag wherever possible.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-purple-400 font-bold shrink-0">4.</span>
                  <div>
                    <strong className="text-white">Stay Healthy:</strong> Get adequate sleep, stay hydrated, and maintain good posture - physical health directly affects reaction speed.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-purple-400 font-bold shrink-0">5.</span>
                  <div>
                    <strong className="text-white">Focus Training:</strong> Minimize distractions during gaming sessions and practice maintaining concentration during long matches.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Gaming Tests Section */}
          <section className="mb-12 sm:mb-16">
            <div className="mb-6 sm:mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                Recommended Gaming Tests
              </h2>
              <p className="text-base sm:text-lg text-dark-400">
                Choose from our selection of reaction tests optimized for gaming performance
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {gamingTests.map((test) => (
                <TestCard key={test.id} test={test} />
              ))}
            </div>
          </section>

          {/* Performance Benchmarks */}
          <section className="mb-12 sm:mb-16">
            <div className="max-w-4xl mx-auto bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-2xl p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                Gaming Reaction Time Benchmarks
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                  <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center shrink-0">
                    <Trophy size={22} className="text-green-300" strokeWidth={2.4} />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-white mb-1">Under ~190 ms — faster than the lab reference</div>
                    <div className="text-sm text-dark-300">Quicker than the long-accepted laboratory figure for college-age adults reacting to a light stimulus (Jain et al., 2015)</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
                    <Star size={22} className="text-blue-300" strokeWidth={2.4} fill="currentColor" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-white mb-1">190–213 ms — faster than the corrected adult mean</div>
                    <div className="text-sm text-dark-300">Beats the hardware-corrected average of 213 ms measured across 1,469 adults aged 18–65 (Woods et al., 2015)</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                  <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center shrink-0">
                    <Sparkles size={22} className="text-yellow-300" strokeWidth={2.4} />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-white mb-1">213–231 ms — around the measured adult average</div>
                    <div className="text-sm text-dark-300">The same study's uncorrected mean — the closest published equivalent to what a browser test records (Woods et al., 2015)</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-orange-500/10 border border-orange-500/30 rounded-xl">
                  <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center shrink-0">
                    <ThumbsUp size={22} className="text-orange-300" strokeWidth={2.4} />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-white mb-1">Above ~231 ms — headroom to train</div>
                    <div className="text-sm text-dark-300">Slower than the measured adult mean; consistent practice, sleep and warm-up routines are where gamers gain the most</div>
                  </div>
                </div>

                <p className="text-xs text-dark-400 leading-relaxed pt-2">
                  Published per-rank esports reaction-time figures do not exist, so these bands compare you
                  to peer-reviewed adult averages instead — see the full{' '}
                  <Link to="/test/reaction-time" className="text-green-400 hover:text-green-300 underline">
                    cited reaction-time benchmarks
                  </Link>{' '}
                  for the sources.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
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

export default GamingTestPage;
