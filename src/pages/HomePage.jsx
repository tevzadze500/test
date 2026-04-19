import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Sidebar from '../components/Sidebar';
import MobileTopBar from '../components/MobileTopBar';
import TestCard from '../components/TestCard';
import ConversionFooter from '../components/ConversionFooter';
import Leaderboard from '../components/Leaderboard';
import SeoContent from '../components/SeoContent';
import { tests, testCategories } from '../data/tests';
import { Sparkles, Zap, Target, TrendingUp, ArrowRight, Flag, Gamepad2, Activity, Brain, Focus, Eye, Headphones, Timer, CheckCircle2, Users } from 'lucide-react';

function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);

  // Get F1 test
  const f1Test = tests.find(test => test.id === 'f1-reaction');

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
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Formula 1 Reaction Test - Free Online Reflex Test | ReactionTestPro</title>
        <meta name="description" content="Test your reaction time with our online Formula 1 test. Improve your reflexes and compare your results with professional F1 drivers. Free, instant results, no signup required." />
        <meta name="keywords" content="F1 reaction test, formula 1 reaction time, racing reflex test, reaction time test, reflex test online, F1 start lights, racing reaction speed" />
        <meta property="og:title" content="Formula 1 Reaction Test - Test Your Racing Reflexes" />
        <meta property="og:description" content="Test your reaction time with our online Formula 1 test. Improve your reflexes for free." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://reactiontestpro.com/" />
      </Helmet>

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
        {/* Background Image with Overlay */}
        <div 
          className="fixed inset-0 z-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: 'url(/Grille%20de%20d%C3%A9part%20au%20cr%C3%A9puscule.png)',
            filter: 'brightness(0.4)',
          }}
        />
        
        {/* Dark Overlay for Better Text Readability */}
        <div className="fixed inset-0 z-0 bg-gradient-to-b from-dark-950/80 via-dark-950/70 to-dark-950/90" />
        
        {/* Content Container with Higher Z-Index */}
        <div className="relative z-10 max-w-7xl mx-auto p-4 pt-0 sm:p-6 lg:p-8 lg:pt-8">
          
          {/* Hero Section with F1 Focus */}
          <section className="mb-12 sm:mb-16 md:mb-20 pt-6 sm:pt-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-2xl">
                  <Flag className="w-12 h-12 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6">
                Formula 1 Reaction Test
              </h1>
              <p className="text-xl sm:text-2xl text-dark-200 max-w-3xl mx-auto leading-relaxed mb-8 font-medium">
                Test your reaction time with our online Formula 1 test. Experience the thrill of F1 start lights and measure your reflexes like a professional driver!
              </p>
              
              {/* F1 Test Card - Featured */}
              {f1Test && (
                <div className="max-w-4xl mx-auto mb-8">
                  <div className="bg-gradient-to-br from-red-500/20 via-rose-500/10 to-orange-500/10 border-2 border-red-500/50 rounded-2xl p-8 shadow-2xl">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-xl shrink-0">
                        <Flag className="w-14 h-14 text-white" strokeWidth={2.5} />
                      </div>
                      <div className="flex-1 text-left">
                        <h2 className="text-3xl font-bold text-white mb-3">
                          F1 Lights Reaction Test
                        </h2>
                        <p className="text-dark-100 text-lg mb-6 leading-relaxed">
                          React the instant the start lights go out, just like in real Formula 1 races. Test your reflexes against professional F1 drivers and track your improvement!
                        </p>
                        <div className="flex flex-wrap gap-3 mb-6">
                          <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-400/50 rounded-lg text-green-200 text-sm font-semibold">
                            <Zap className="w-4 h-4" />
                            Quick 1-min test
                          </span>
                          <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-400/50 rounded-lg text-blue-200 text-sm font-semibold">
                            <Target className="w-4 h-4" />
                            No signup needed
                          </span>
                          <span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-400/50 rounded-lg text-purple-200 text-sm font-semibold">
                            <TrendingUp className="w-4 h-4" />
                            Instant results
                          </span>
                        </div>
                        <Link 
                          to="/test/f1-reaction" 
                          className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold rounded-xl shadow-2xl hover:shadow-red-500/50 transition-all duration-200 text-xl transform hover:scale-105"
                        >
                          <Flag className="w-6 h-6" />
                          Start your F1 Reflex Test Now!
                          <ArrowRight className="w-6 h-6" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Top 10 Leaderboard */}
            <Leaderboard />

            {/* Explore More Tests - Prominent Section */}
            <div className="max-w-4xl mx-auto mb-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
                Explore More Tests:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link 
                  to="/test/reaction-time" 
                  className="group relative overflow-hidden bg-gradient-to-br from-green-500/20 to-emerald-600/20 hover:from-green-500/30 hover:to-emerald-600/30 border-2 border-green-500/50 hover:border-green-400 rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-500/20"
                >
                  <div className="flex justify-center mb-3">
                    <Zap className="w-12 h-12 text-green-400" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2 text-center group-hover:text-green-300 transition-colors">
                    General Reaction Test
                  </h4>
                  <p className="text-sm text-dark-300 text-center">
                    Simple visual reaction time measurement
                  </p>
                </Link>
                
                <Link 
                  to="/gaming-test" 
                  className="group relative overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-600/20 hover:from-purple-500/30 hover:to-pink-600/30 border-2 border-purple-500/50 hover:border-purple-400 rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20"
                >
                  <div className="flex justify-center mb-3">
                    <Gamepad2 className="w-12 h-12 text-purple-400" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2 text-center group-hover:text-purple-300 transition-colors">
                    Gaming Reaction Test
                  </h4>
                  <p className="text-sm text-dark-300 text-center">
                    Optimize your gaming reflexes
                  </p>
                </Link>
                
                <Link 
                  to="/sport-test" 
                  className="group relative overflow-hidden bg-gradient-to-br from-blue-500/20 to-cyan-600/20 hover:from-blue-500/30 hover:to-cyan-600/30 border-2 border-blue-500/50 hover:border-blue-400 rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20"
                >
                  <div className="flex justify-center mb-3">
                    <Activity className="w-12 h-12 text-blue-400" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2 text-center group-hover:text-blue-300 transition-colors">
                    Sports Reaction Test
                  </h4>
                  <p className="text-sm text-dark-300 text-center">
                    Test your athletic reflexes
                  </p>
                </Link>
              </div>
            </div>

            {/* SEO Content - What is F1 Reaction Test */}
            <div className="max-w-4xl mx-auto bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-2xl p-6 sm:p-8 mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                What is the Formula 1 Reaction Test?
              </h2>
              <div className="text-dark-300 space-y-4">
                <p className="leading-relaxed">
                  The Formula 1 Reaction Test is an online tool that simulates the starting procedure used in real Formula 1 races. This test measures how quickly you can react when the five red start lights go out, which is the signal for drivers to launch their cars at the beginning of a race.
                </p>
                <p className="leading-relaxed">
                  During the test, five red lights illuminate sequentially, building anticipation just like on the actual F1 starting grid. After a random delay of 1-4 seconds, all lights turn off simultaneously, and you must click or tap as quickly as possible. Your reaction time is measured in milliseconds (ms), allowing you to compare your performance with professional F1 drivers.
                </p>
              </div>
            </div>

            {/* SEO Content - Why Test Your Reaction Time */}
            <div className="max-w-4xl mx-auto bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-2xl p-6 sm:p-8 mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Why Test Your Reaction Time?
              </h2>
              <div className="text-dark-300 space-y-4">
                <p className="leading-relaxed">
                  Reaction time is a crucial skill in many aspects of life, from sports and gaming to driving and everyday decision-making. Testing your reflexes with our F1 Reaction Test offers several benefits:
                </p>
                <ul className="space-y-3 ml-4">
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 font-bold text-xl shrink-0">✓</span>
                    <span><strong className="text-white">Athletic Performance:</strong> Athletes, especially in racing, combat sports, and ball games, need quick reflexes to excel. Regular testing helps track improvements.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 font-bold text-xl shrink-0">✓</span>
                    <span><strong className="text-white">Gaming Skills:</strong> Gamers can improve their competitive edge in fast-paced games like FPS, racing simulators, and esports.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 font-bold text-xl shrink-0">✓</span>
                    <span><strong className="text-white">Driving Safety:</strong> Faster reaction times can help prevent accidents by allowing you to respond quickly to unexpected situations on the road.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 font-bold text-xl shrink-0">✓</span>
                    <span><strong className="text-white">Cognitive Health:</strong> Reaction time testing can provide insights into your cognitive function and mental alertness.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* SEO Content Component */}
            <SeoContent />

            {/* SEO Content - How the Test Works */}
            <div className="max-w-4xl mx-auto bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-2xl p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                How Does the F1 Reaction Test Work?
              </h2>
              <div className="text-dark-300 space-y-4">
                <p className="leading-relaxed">
                  Our Formula 1 Reaction Test follows the official FIA starting procedure used in real Formula 1 races:
                </p>
                <ol className="space-y-4 ml-4">
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold text-lg shrink-0">1.</span>
                    <div>
                      <strong className="text-white">Light Sequence:</strong> Five red lights illuminate one by one at 500-millisecond intervals, similar to the actual F1 start lights gantry above the starting grid.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold text-lg shrink-0">2.</span>
                    <div>
                      <strong className="text-white">Random Delay:</strong> After all five lights are illuminated, there's a random delay between 1-4 seconds. This unpredictability prevents you from anticipating the exact moment, just like real F1 drivers experience.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold text-lg shrink-0">3.</span>
                    <div>
                      <strong className="text-white">Lights Out:</strong> All five lights turn off simultaneously - this is your signal to react! Click or tap as quickly as possible.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold text-lg shrink-0">4.</span>
                    <div>
                      <strong className="text-white">Instant Results:</strong> Your reaction time is measured in milliseconds and displayed immediately, along with performance ratings comparing you to professional F1 drivers.
                    </div>
                  </li>
                </ol>
                <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 mt-4">
                  <p className="text-sm">
                    <strong className="text-orange-400">⚠️ False Start Warning:</strong> Just like in real F1, clicking before the lights go out counts as a false start and will be penalized. In Formula 1, false starts result in severe time penalties!
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Browse All Tests Section with Category Sidebar */}
          <section className="mb-12 sm:mb-16" id="all-tests">
            <div className="mb-6 sm:mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                Browse All Tests
              </h2>
              <p className="text-base sm:text-lg text-dark-400">
                Select a category to filter tests or browse all available tests
              </p>
            </div>

            {/* Mobile Category Selector */}
            <div className="lg:hidden mb-6">
              <button
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                className="w-full flex items-center justify-between p-4 bg-dark-800/50 border border-dark-700 rounded-xl text-white font-semibold"
              >
                <span className="flex items-center gap-3">
                  {categories.find(cat => cat.id === selectedCategory)?.icon && 
                    React.createElement(categories.find(cat => cat.id === selectedCategory).icon, { className: "w-5 h-5" })
                  }
                  {categories.find(cat => cat.id === selectedCategory)?.name}
                </span>
                <span>{isCategoryMenuOpen ? '▲' : '▼'}</span>
              </button>
              
              {isCategoryMenuOpen && (
                <div className="mt-2 bg-dark-800 border border-dark-700 rounded-xl overflow-hidden">
                  {categories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => {
                          setSelectedCategory(category.id);
                          setIsCategoryMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 p-4 transition-colors ${
                          selectedCategory === category.id
                            ? 'bg-blue-500/20 border-l-4 border-blue-500'
                            : 'hover:bg-dark-700'
                        }`}
                      >
                        <IconComponent className="w-5 h-5 text-blue-400" />
                        <span className="text-white font-medium">{category.name}</span>
                        {selectedCategory === category.id && (
                          <CheckCircle2 className="w-4 h-4 text-green-400 ml-auto" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Desktop Layout: Sidebar + Tests Grid */}
            <div className="flex gap-6 lg:gap-8">
              {/* Category Sidebar - Desktop Only */}
              <div className="hidden lg:block w-64 shrink-0">
                <div className="bg-dark-800/30 border border-dark-700 rounded-2xl p-4 sticky top-24">
                  <h3 className="text-lg font-bold text-white mb-4 px-2">Categories</h3>
                  <div className="space-y-1">
                    {categories.map((category) => {
                      const IconComponent = category.icon;
                      const isSelected = selectedCategory === category.id;
                      return (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.id)}
                          className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                            isSelected
                              ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/50 text-white shadow-lg'
                              : 'hover:bg-dark-700 text-dark-300 hover:text-white'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg ${isSelected ? 'bg-blue-500/30' : 'bg-dark-700'} flex items-center justify-center shrink-0`}>
                            <IconComponent className={`w-5 h-5 ${isSelected ? 'text-blue-400' : 'text-dark-400'}`} />
                          </div>
                          <span className="font-medium">{category.name}</span>
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-green-400 ml-auto" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                  
                  {/* Test Count */}
                  <div className="mt-4 pt-4 border-t border-dark-700">
                    <div className="text-sm text-dark-400 px-2">
                      Showing <span className="text-white font-semibold">{filteredTests.length}</span> test{filteredTests.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tests Grid */}
              <div className="flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
                  {filteredTests.map((test) => (
                    <TestCard key={test.id} test={test} />
                  ))}
                </div>
                
                {/* No Results Message */}
                {filteredTests.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-dark-800 flex items-center justify-center mx-auto mb-4">
                      <Target className="w-8 h-8 text-dark-600" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">No tests found</h3>
                    <p className="text-dark-400">Try selecting a different category</p>
                  </div>
                )}
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

export default HomePage;
