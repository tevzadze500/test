import React from 'react';
import Sidebar from '../components/Sidebar';
import Hero from '../components/Hero';
import FeaturedTest from '../components/FeaturedTest';
import TestCard from '../components/TestCard';
import ConversionFooter from '../components/ConversionFooter';
import { tests, getFeaturedTest, getPopularTests, testCategories } from '../data/tests';
import { Sparkles, Zap, Target, TrendingUp } from 'lucide-react';

function HomePage() {
  const featuredTest = getFeaturedTest();
  const popularTests = getPopularTests();

  return (
    <div className="flex min-h-screen bg-dark-950">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          {/* Hero Section */}
          <Hero />

          {/* Featured Test */}
          {featuredTest && (
            <section className="mb-10 sm:mb-14" id="featured">
              <FeaturedTest test={featuredTest} />
            </section>
          )}

          {/* Popular Tests Section */}
          <section className="mb-10 sm:mb-14" id="popular">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5 sm:mb-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1.5">
                  Popular Tests
                </h2>
                <p className="text-sm sm:text-base text-dark-400">
                  Most taken by our community
                </p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl border border-yellow-500/30">
                <Sparkles size={18} className="text-yellow-500 shrink-0" />
                <span className="text-sm font-semibold text-yellow-400">Trending Now</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {popularTests.map((test) => (
                <TestCard key={test.id} test={test} />
              ))}
            </div>
          </section>

          {/* Quick Tests Callout */}
          <section className="mb-10 sm:mb-14">
            <div className="bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-blue-500/5 border border-blue-500/30 rounded-2xl p-6 sm:p-8">
              <div className="flex items-start gap-3 sm:gap-4 mb-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shrink-0 shadow-lg">
                  <Zap size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    Need Something Quick?
                  </h3>
                  <p className="text-sm sm:text-base text-dark-300 leading-relaxed">
                    All our tests are designed to be completed in under 10 minutes. Most take just 2-3 minutes for instant results.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                <div className="bg-dark-800/50 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-1">⚡</div>
                  <div className="text-xs text-dark-400">2 min tests</div>
                </div>
                <div className="bg-dark-800/50 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-1">🎯</div>
                  <div className="text-xs text-dark-400">Easy setup</div>
                </div>
                <div className="bg-dark-800/50 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-1">📊</div>
                  <div className="text-xs text-dark-400">Instant data</div>
                </div>
                <div className="bg-dark-800/50 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-1">🔒</div>
                  <div className="text-xs text-dark-400">No signup</div>
                </div>
              </div>
            </div>
          </section>

          {/* All Tests by Category */}
          <section className="mb-8 sm:mb-12" id="all-tests">
            <div className="mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1.5">
                All Tests
              </h2>
              <p className="text-sm sm:text-base text-dark-400">
                Explore all available assessments organized by category
              </p>
            </div>

            {/* Performance Tests */}
            <div className="mb-10 sm:mb-12">
              <div className="flex items-center gap-2.5 mb-4 sm:mb-5">
                <span className="text-3xl">⚡</span>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    Performance Tests
                  </h3>
                  <p className="text-xs sm:text-sm text-dark-400">
                    Speed, reaction, and timing assessments
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {tests
                  .filter((test) => test.category === testCategories.PERFORMANCE)
                  .map((test) => (
                    <TestCard key={test.id} test={test} />
                  ))}
              </div>
            </div>

            {/* Cognitive Tests */}
            <div className="mb-10 sm:mb-12">
              <div className="flex items-center gap-2.5 mb-4 sm:mb-5">
                <span className="text-3xl">🧠</span>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    Cognitive Tests
                  </h3>
                  <p className="text-xs sm:text-sm text-dark-400">
                    Memory, processing, and mental abilities
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {tests
                  .filter((test) => test.category === testCategories.COGNITIVE)
                  .map((test) => (
                    <TestCard key={test.id} test={test} />
                  ))}
              </div>
            </div>

            {/* Focus Tests */}
            <div className="mb-10 sm:mb-12">
              <div className="flex items-center gap-2.5 mb-4 sm:mb-5">
                <span className="text-3xl">🎯</span>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    Focus Tests
                  </h3>
                  <p className="text-xs sm:text-sm text-dark-400">
                    Attention, concentration, and inhibition
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {tests
                  .filter((test) => test.category === testCategories.FOCUS)
                  .map((test) => (
                    <TestCard key={test.id} test={test} />
                  ))}
              </div>
            </div>

            {/* Vision Tests */}
            <div className="mb-10 sm:mb-12">
              <div className="flex items-center gap-2.5 mb-4 sm:mb-5">
                <span className="text-3xl">👁️</span>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    Vision Tests
                  </h3>
                  <p className="text-xs sm:text-sm text-dark-400">
                    Visual acuity and color perception
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {tests
                  .filter((test) => test.category === testCategories.VISION)
                  .map((test) => (
                    <TestCard key={test.id} test={test} />
                  ))}
              </div>
            </div>

            {/* Hearing Tests */}
            <div className="mb-10 sm:mb-12">
              <div className="flex items-center gap-2.5 mb-4 sm:mb-5">
                <span className="text-3xl">🔊</span>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    Hearing Tests
                  </h3>
                  <p className="text-xs sm:text-sm text-dark-400">
                    Auditory range and frequency detection
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {tests
                  .filter((test) => test.category === testCategories.HEARING)
                  .map((test) => (
                    <TestCard key={test.id} test={test} />
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

export default HomePage;
