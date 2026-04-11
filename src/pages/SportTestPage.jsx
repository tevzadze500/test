import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Sidebar from '../components/Sidebar';
import MobileTopBar from '../components/MobileTopBar';
import TestCard from '../components/TestCard';
import ConversionFooter from '../components/ConversionFooter';
import { tests } from '../data/tests';
import { Trophy, Zap, Target, ArrowLeft } from 'lucide-react';

function SportTestPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Get sports-related tests
  const sportsTests = tests.filter(test => 
    test.id === 'reaction-time' || 
    test.id === 'f1-reaction' || 
    test.id === 'anticipation-test' || 
    test.id === 'auditory-reaction'
  );

  return (
    <div className="flex min-h-screen bg-dark-950">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Sports Reaction Test - Improve Athletic Reflexes | ReactionTestPro</title>
        <meta name="description" content="Test your sports reaction time and improve your athletic performance. Perfect for athletes in boxing, tennis, baseball, soccer, and all competitive sports. Measure your reflexes like a pro." />
        <meta name="keywords" content="sports reaction test, athletic reflex test, athlete reaction time, sports performance test, boxing reflexes, tennis reaction speed, baseball reaction time" />
        <meta property="og:title" content="Sports Reaction Test - Test Your Athletic Reflexes" />
        <meta property="og:description" content="Improve your sports reaction time with tests designed for athletes and competitive sports." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://reactiontestpro.com/sport-test" />
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
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-5xl shadow-2xl">
                  ⚽
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6">
                Sports Reaction Test
              </h1>
              <p className="text-lg sm:text-xl text-dark-300 max-w-3xl mx-auto leading-relaxed">
                Test your athletic reflexes and improve your sports performance. Designed for athletes across all sports - from combat sports to ball games, racing to track and field.
              </p>
            </div>

            {/* SEO Content - Sports Reaction Test */}
            <div className="max-w-4xl mx-auto bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-2xl p-6 sm:p-8 mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Why Reaction Time is Critical in Sports
              </h2>
              <div className="text-dark-300 space-y-4">
                <p className="leading-relaxed">
                  In competitive sports, the difference between victory and defeat often comes down to milliseconds. A boxer who can react 50ms faster can dodge a punch or land a counter before their opponent. A tennis player with superior reflexes can return a serve that others would miss. A soccer goalkeeper with quick reactions can make impossible saves.
                </p>
                <p className="leading-relaxed">
                  Professional athletes across all sports regularly test and train their reaction times to maintain peak performance. Our sports reaction tests help you measure your current baseline, identify areas for improvement, and track your progress as you train to become faster and more responsive.
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
                    <span className="text-red-500 font-bold text-xl shrink-0">🥊</span>
                    <div>
                      <strong className="text-white">Combat Sports:</strong> In boxing, MMA, and martial arts, quick reflexes help you dodge strikes, block punches, and counter-attack. Elite fighters have reaction times under 200ms.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 font-bold text-xl shrink-0">🎾</span>
                    <div>
                      <strong className="text-white">Racquet Sports:</strong> Tennis, badminton, and squash require split-second reactions to return serves and volleys. Professional tennis players can react to 140mph serves in under 200ms.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 font-bold text-xl shrink-0">⚽</span>
                    <div>
                      <strong className="text-white">Ball Sports:</strong> Soccer, basketball, baseball, and cricket all demand quick reactions for catching, blocking, hitting, or saving. Goalkeepers and catchers especially benefit from superior reflexes.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 font-bold text-xl shrink-0">🏎️</span>
                    <div>
                      <strong className="text-white">Racing Sports:</strong> Formula 1, MotoGP, and track cycling require lightning-fast reactions to maintain control, avoid collisions, and respond to changing conditions.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-500 font-bold text-xl shrink-0">🏃</span>
                    <div>
                      <strong className="text-white">Track & Field:</strong> Sprinters need explosive reaction times off the starting blocks. Olympic sprinters typically react to the gun in 120-160ms.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-500 font-bold text-xl shrink-0">🏐</span>
                    <div>
                      <strong className="text-white">Net Sports:</strong> Volleyball and table tennis players need quick reflexes to react to spikes, blocks, and fast-paced rallies.
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
                <div className="flex items-center gap-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                  <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center text-2xl shrink-0">
                    🥇
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-white mb-1">Elite Athletes (120-180ms)</div>
                    <div className="text-sm text-dark-300">Olympic athletes, professional fighters, F1 drivers</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                  <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center text-2xl shrink-0">
                    🥈
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-white mb-1">Professional Level (180-220ms)</div>
                    <div className="text-sm text-dark-300">Professional athletes and competitive sports players</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center text-2xl shrink-0">
                    🥉
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-white mb-1">Competitive Amateur (220-270ms)</div>
                    <div className="text-sm text-dark-300">College athletes and serious amateur competitors</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl">
                  <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center text-2xl shrink-0">
                    ⭐
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-white mb-1">Active Individual (270-320ms)</div>
                    <div className="text-sm text-dark-300">Recreational athletes and fitness enthusiasts</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                <p className="text-sm text-dark-300">
                  <strong className="text-blue-400">💡 Pro Tip:</strong> Elite sprinters like Usain Bolt have reaction times around 155ms. However, anything under 100ms is considered a false start in track and field because it's deemed humanly impossible to react that quickly to the starting gun.
                </p>
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
