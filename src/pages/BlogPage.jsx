import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Sidebar from '../components/Sidebar';
import MobileTopBar from '../components/MobileTopBar';
import { ArrowLeft, Zap, Activity, Car, Brain, Target, TrendingUp } from 'lucide-react';

function BlogPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-dark-950">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Why Reaction Time is Crucial in Everyday Life and Performance | ReactionTestPro</title>
        <meta name="description" content="Discover why reaction time matters in sports, driving, cognitive health, and daily life. Learn how to improve your reflexes with our free reaction time test." />
        <meta name="keywords" content="reaction time test, improve reaction time, reaction time for sports, reaction time driving, reaction speed test, reaction time exercises, cognitive health reaction time, measure your reaction time" />
        <meta property="og:title" content="Why Reaction Time is Crucial in Everyday Life and Performance" />
        <meta property="og:description" content="Learn how reaction time affects sports performance, driving safety, cognitive health, and everyday decision-making." />
        <meta property="og:type" content="article" />
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
      />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6 sm:p-8 lg:p-12">
          
          {/* Back Button */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-dark-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>

          {/* Article Header */}
          <article className="prose prose-invert max-w-none">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Why Reaction Time is Crucial in Everyday Life and Performance
            </h1>
            
            <p className="text-lg text-dark-300 leading-relaxed mb-8">
              Reaction time plays a crucial role in many aspects of life, from sports to driving and even in everyday decision-making. Understanding and improving your reaction time can give you a competitive edge and help you perform better in various situations. In this article, we'll explore why reaction time matters and how you can improve it for better performance and safety.
            </p>

            {/* Section 1: Sports Performance */}
            <div className="bg-dark-900/50 border border-dark-800 rounded-2xl p-6 sm:p-8 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-blue-400" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white m-0">
                  1. Reaction Time and Sports Performance
                </h2>
              </div>
              
              <p className="text-dark-300 leading-relaxed mb-4">
                Whether you're a professional athlete or just enjoy recreational sports, quick reflexes are essential. In sports like football, basketball, tennis, and martial arts, the ability to react swiftly to a stimulus can make the difference between success and failure.
              </p>

              <h3 className="text-xl font-bold text-white mt-6 mb-4">
                How Reaction Time Affects Sports Performance
              </h3>

              <div className="space-y-4">
                <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-4">
                  <h4 className="text-lg font-bold text-white mb-2">Team Sports</h4>
                  <p className="text-dark-300 text-sm leading-relaxed">
                    In team sports like basketball and football, players need fast reaction times to catch passes, avoid tackles, or make quick decisions on the field.
                  </p>
                </div>

                <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-4">
                  <h4 className="text-lg font-bold text-white mb-2">Combat Sports</h4>
                  <p className="text-dark-300 text-sm leading-relaxed">
                    Boxing, MMA, and other combat sports require lightning-fast reflexes to block punches, dodge strikes, and react to your opponent's movements.
                  </p>
                </div>

                <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-4">
                  <h4 className="text-lg font-bold text-white mb-2">Athletic Performance</h4>
                  <p className="text-dark-300 text-sm leading-relaxed">
                    In track and field, reaction time is crucial for sprinting, starting the race, and accelerating quickly.
                  </p>
                </div>
              </div>

              <p className="text-dark-300 leading-relaxed mt-6">
                By regularly testing and improving your reaction time, you can track your progress and enhance your performance across all areas of your athletic life.
              </p>
            </div>

            {/* Section 2: Driving Safety */}
            <div className="bg-dark-900/50 border border-dark-800 rounded-2xl p-6 sm:p-8 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                  <Car className="w-6 h-6 text-red-400" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white m-0">
                  2. Reaction Time and Driving Safety
                </h2>
              </div>
              
              <p className="text-dark-300 leading-relaxed mb-4">
                Your reaction time is directly tied to your ability to make quick decisions while driving. In real-life driving scenarios, you need to react instantly to avoid accidents, navigate traffic, and handle unexpected situations. Slow reactions can lead to accidents, which is why it's important to train and test your reflexes.
              </p>

              <h3 className="text-xl font-bold text-white mt-6 mb-4">
                Why Reaction Time Matters When Driving
              </h3>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 font-bold text-xl shrink-0">✓</span>
                  <div>
                    <strong className="text-white">Avoiding Collisions:</strong>
                    <span className="text-dark-300"> Faster reflexes can help you avoid accidents by reacting more quickly to sudden changes in traffic or road conditions.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 font-bold text-xl shrink-0">✓</span>
                  <div>
                    <strong className="text-white">Making Quick Decisions:</strong>
                    <span className="text-dark-300"> Driving in high-speed environments, such as highways or city streets, requires constant decision-making, and faster reactions improve your judgment.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 font-bold text-xl shrink-0">✓</span>
                  <div>
                    <strong className="text-white">Emergency Situations:</strong>
                    <span className="text-dark-300"> In case of an emergency (e.g., a car braking suddenly), a quicker reaction time can mean the difference between preventing a crash and causing one.</span>
                  </div>
                </li>
              </ul>

              <p className="text-dark-300 leading-relaxed mt-6">
                Testing and improving your reaction time can help you become a safer, more confident driver.
              </p>
            </div>

            {/* Section 3: Cognitive Health */}
            <div className="bg-dark-900/50 border border-dark-800 rounded-2xl p-6 sm:p-8 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-purple-400" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white m-0">
                  3. Cognitive Health and Reaction Time
                </h2>
              </div>
              
              <p className="text-dark-300 leading-relaxed mb-4">
                Reaction time isn't just about physical speed; it's also a reflection of your cognitive function. Your brain's ability to process information and respond to it is a key indicator of overall mental agility. By testing your reaction time regularly, you can keep track of changes in your cognitive function, which is especially important as you age.
              </p>

              <h3 className="text-xl font-bold text-white mt-6 mb-4">
                How to Use Reaction Time Tests for Cognitive Health
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-4">
                  <h4 className="text-lg font-bold text-white mb-2">Monitoring Brain Health</h4>
                  <p className="text-dark-300 text-sm leading-relaxed">
                    Regular testing of reaction time can be an indicator of cognitive health, as slower reactions can signify mental decline or fatigue.
                  </p>
                </div>

                <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-4">
                  <h4 className="text-lg font-bold text-white mb-2">Mental Agility</h4>
                  <p className="text-dark-300 text-sm leading-relaxed">
                    People who engage in regular brain exercises, such as reaction time tests, often experience better cognitive performance and mental sharpness.
                  </p>
                </div>
              </div>

              <p className="text-dark-300 leading-relaxed mt-6">
                Testing your reaction time allows you to track your cognitive health and identify any changes that might require further attention.
              </p>
            </div>

            {/* Section 4: Everyday Life */}
            <div className="bg-dark-900/50 border border-dark-800 rounded-2xl p-6 sm:p-8 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <Target className="w-6 h-6 text-green-400" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white m-0">
                  4. Everyday Life and Quick Decision-Making
                </h2>
              </div>
              
              <p className="text-dark-300 leading-relaxed mb-4">
                Everyday activities require quick thinking and immediate decision-making. From catching a falling object to reacting to sudden sounds, your ability to respond quickly affects your daily life. Whether you're in a meeting, crossing the street, or just trying to keep up with fast-paced conversations, fast reaction times are key.
              </p>

              <h3 className="text-xl font-bold text-white mt-6 mb-4">
                The Role of Reaction Time in Daily Life
              </h3>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-green-400 shrink-0 mt-1" />
                  <div>
                    <strong className="text-white">Reaction to Stimuli:</strong>
                    <span className="text-dark-300"> Your ability to react quickly to visual or auditory stimuli can be crucial, whether you're driving, walking, or even reacting to unexpected events.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-green-400 shrink-0 mt-1" />
                  <div>
                    <strong className="text-white">Faster Reflexes = Better Decision-Making:</strong>
                    <span className="text-dark-300"> Improving your reaction time can help you make better, quicker decisions in all areas of life.</span>
                  </div>
                </li>
              </ul>

              <p className="text-dark-300 leading-relaxed mt-6">
                By incorporating reaction time tests into your routine, you can sharpen your reflexes and improve your overall decision-making skills.
              </p>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-green-500/10 border-2 border-green-500/30 rounded-2xl p-8 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Want to Measure How Fast Your Reflexes Are?
              </h2>
              <p className="text-dark-200 text-lg mb-6 max-w-2xl mx-auto">
                Take our free reaction time test and see where you stand! Our test provides instant results so you can track your reaction time and start improving right away.
              </p>
              <Link 
                to="/test/reaction-time"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-xl shadow-2xl hover:shadow-green-500/50 transition-all duration-200 text-lg transform hover:scale-105"
              >
                <Zap className="w-6 h-6" />
                Start the Reaction Time Test Now!
              </Link>
            </div>

          </article>
        </div>
      </main>
    </div>
  );
}

export default BlogPage;
