import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Sidebar from '../components/Sidebar';
import MobileTopBar from '../components/MobileTopBar';
import TestCard from '../components/TestCard';
import ConversionFooter from '../components/ConversionFooter';
import { tests } from '../data/tests';
import { Gamepad2, Zap, Target, ArrowLeft } from 'lucide-react';

function GamingTestPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Get gaming-related tests
  const gamingTests = tests.filter(test => 
    test.id === 'reaction-time' || 
    test.id === 'f1-reaction' || 
    test.id === 'go-no-go' || 
    test.id === 'anticipation-test'
  );

  return (
    <div className="flex min-h-screen bg-dark-950">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Gaming Reaction Test - Improve Your Gaming Reflexes | ReactionTestPro</title>
        <meta name="description" content="Test and improve your gaming reaction time. Perfect for FPS, MOBA, and competitive gaming. Measure your reflexes in milliseconds and boost your gaming performance." />
        <meta name="keywords" content="gaming reaction test, gamer reflex test, FPS reaction time, esports reflexes, gaming performance test, competitive gaming, reaction speed gaming" />
        <meta property="og:title" content="Gaming Reaction Test - Test Your Gaming Reflexes" />
        <meta property="og:description" content="Improve your gaming reaction time with our specialized tests for gamers and esports players." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://reactiontestpro.com/gaming-test" />
      </Helmet>

      {/* Mobile Top Bar */}
      <MobileTopBar 
        onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
        isMenuOpen={isSidebarOpen} 
      />

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-4 pt-0 sm:p-6 lg:p-8 lg:pt-8">
          
          {/* Back Navigation */}
          <div className="pt-6 sm:pt-8 mb-6">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-dark-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={18} />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Hero Section */}
          <section className="mb-12 sm:mb-16 md:mb-20">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-5xl shadow-2xl">
                  🎮
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6">
                Gaming Reaction Test
              </h1>
              <p className="text-lg sm:text-xl text-dark-300 max-w-3xl mx-auto leading-relaxed">
                Optimize your gaming reflexes with specialized reaction tests designed for competitive gamers and esports players. Improve your performance in FPS, MOBA, and fast-paced games.
              </p>
            </div>

            {/* SEO Content - Gaming Reaction Test */}
            <div className="max-w-4xl mx-auto bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-2xl p-6 sm:p-8 mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Why Gaming Reaction Time Matters
              </h2>
              <div className="text-dark-300 space-y-4">
                <p className="leading-relaxed">
                  In competitive gaming, every millisecond counts. Whether you're playing first-person shooters like CS:GO and Valorant, battle royales like Fortnite and Apex Legends, or MOBAs like League of Legends and Dota 2, your reaction time directly impacts your performance and ranking.
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
                    <span className="text-purple-500 font-bold text-xl shrink-0">🎯</span>
                    <div>
                      <strong className="text-white">FPS Games:</strong> Faster reactions help you land the first shot in duels, react to enemy movements, and flick to targets with precision in games like Call of Duty, CS:GO, Valorant, and Overwatch.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pink-500 font-bold text-xl shrink-0">⚡</span>
                    <div>
                      <strong className="text-white">Battle Royales:</strong> Quick reflexes allow you to respond to sudden encounters, react to third-party attacks, and make split-second building or movement decisions in Fortnite, PUBG, and Apex Legends.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 font-bold text-xl shrink-0">🧠</span>
                    <div>
                      <strong className="text-white">MOBA Games:</strong> In League of Legends and Dota 2, reaction time helps you dodge skillshots, execute combos perfectly, and respond to enemy abilities during team fights.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 font-bold text-xl shrink-0">🏎️</span>
                    <div>
                      <strong className="text-white">Racing Games:</strong> In simulators like iRacing, F1, and Gran Turismo, quick reactions help you avoid collisions, take optimal racing lines, and respond to changing track conditions.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 font-bold text-xl shrink-0">🥊</span>
                    <div>
                      <strong className="text-white">Fighting Games:</strong> Street Fighter, Tekken, and Mortal Kombat require frame-perfect reactions to block, counter, and punish opponent moves.
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Training Tips */}
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-purple-500/5 border border-purple-500/30 rounded-2xl p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Tips to Improve Your Gaming Reflexes
              </h2>
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
                  <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center text-2xl shrink-0">
                    🏆
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-white mb-1">Pro Level (150-200ms)</div>
                    <div className="text-sm text-dark-300">Professional esports players and top-tier competitive gamers</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center text-2xl shrink-0">
                    ⭐
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-white mb-1">Competitive (200-250ms)</div>
                    <div className="text-sm text-dark-300">High-ranked players in competitive games</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                  <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center text-2xl shrink-0">
                    ✨
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-white mb-1">Above Average (250-300ms)</div>
                    <div className="text-sm text-dark-300">Dedicated gamers with good reflexes</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-orange-500/10 border border-orange-500/30 rounded-xl">
                  <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center text-2xl shrink-0">
                    👍
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-white mb-1">Average (300-350ms)</div>
                    <div className="text-sm text-dark-300">Casual gamers and average reaction time</div>
                  </div>
                </div>
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
