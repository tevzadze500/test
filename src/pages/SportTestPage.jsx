import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { webApplicationSchema, breadcrumbSchema, faqSchema } from '../utils/structuredData';
import Sidebar from '../components/Sidebar';
import MobileTopBar from '../components/MobileTopBar';
import TestCard from '../components/TestCard';
import ConversionFooter from '../components/ConversionFooter';
import { tests } from '../data/tests';
import { Trophy, Zap, Target, ArrowLeft, Lightbulb, Swords, Activity, Circle, Footprints } from 'lucide-react';
import F1LightsIcon from '../components/icons/F1LightsIcon';

function SportTestPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    }
  ];

  return (
    <div className="flex min-h-screen bg-dark-950">
      {/* SEO Meta Tags */}
      <Seo
        title="Sports Reaction Test - Improve Athletic Reflexes | ReactionTestPro"
        description="Test your sports reaction time and improve your athletic performance. Perfect for athletes in boxing, tennis, baseball, soccer, and all competitive sports. Measure your reflexes like a pro."
        keywords="sports reaction test, athletic reflex test, athlete reaction time, sports performance test, boxing reflexes, tennis reaction speed, baseball reaction time"
        canonical="/sport-test"
        jsonLd={[
          webApplicationSchema({
            name: 'Sports Reaction Test',
            description: 'Test your sports reaction time and improve your athletic performance across boxing, tennis, baseball, soccer, and all competitive sports.',
            path: '/sport-test',
            category: 'HealthApplication'
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
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-2xl shadow-blue-500/30">
                  <Trophy size={44} className="text-white" strokeWidth={2.4} />
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
                    <Swords size={20} className="text-red-400 shrink-0 mt-1" strokeWidth={2.4} />
                    <div>
                      <strong className="text-white">Combat Sports:</strong> In boxing, MMA, and martial arts, quick reflexes help you dodge strikes, block punches, and counter-attack. Elite fighters have reaction times under 200ms.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Activity size={20} className="text-green-400 shrink-0 mt-1" strokeWidth={2.4} />
                    <div>
                      <strong className="text-white">Racquet Sports:</strong> Tennis, badminton, and squash require split-second reactions to return serves and volleys. Professional tennis players can react to 140mph serves in under 200ms.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Circle size={20} className="text-blue-400 shrink-0 mt-1" strokeWidth={2.4} fill="currentColor" />
                    <div>
                      <strong className="text-white">Ball Sports:</strong> Soccer, basketball, baseball, and cricket all demand quick reactions for catching, blocking, hitting, or saving. Goalkeepers and catchers especially benefit from superior reflexes.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <F1LightsIcon size={20} className="text-orange-400 shrink-0 mt-1" />
                    <div>
                      <strong className="text-white">Racing Sports:</strong> Formula 1, MotoGP, and track cycling require lightning-fast reactions to maintain control, avoid collisions, and respond to changing conditions.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Footprints size={20} className="text-yellow-400 shrink-0 mt-1" strokeWidth={2.4} />
                    <div>
                      <strong className="text-white">Track & Field:</strong> Sprinters need explosive reaction times off the starting blocks. Olympic sprinters typically react to the gun in 120-160ms.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Target size={20} className="text-purple-400 shrink-0 mt-1" strokeWidth={2.4} />
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
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-lg shrink-0">
                    <Trophy size={22} className="text-white" strokeWidth={2.4} />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-white mb-1">Elite Athletes (120-180ms)</div>
                    <div className="text-sm text-dark-300">Olympic athletes, professional fighters, F1 drivers</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center shadow-lg shrink-0">
                    <Trophy size={22} className="text-white" strokeWidth={2.4} />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-white mb-1">Professional Level (180-220ms)</div>
                    <div className="text-sm text-dark-300">Professional athletes and competitive sports players</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-700 to-orange-700 flex items-center justify-center shadow-lg shrink-0">
                    <Trophy size={22} className="text-white" strokeWidth={2.4} />
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
              
              <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl flex items-start gap-3">
                <Lightbulb size={20} className="text-blue-300 shrink-0 mt-0.5" />
                <p className="text-sm text-dark-300">
                  <strong className="text-blue-400">Pro Tip:</strong> Elite sprinters like Usain Bolt have reaction times around 155ms. However, anything under 100ms is considered a false start in track and field because it's deemed humanly impossible to react that quickly to the starting gun.
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
