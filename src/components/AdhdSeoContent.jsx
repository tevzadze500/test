import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, CheckCircle2, AlertCircle, Target, TrendingUp, Users } from 'lucide-react';

const AdhdSeoContent = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 mb-12 px-6">
      {/* Main Article Section */}
      <article className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-2xl p-6 sm:p-8">
        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
          🧠 100‑Question Reaction Test & ADHD Quiz: What It Measures and Why It Matters
        </h1>
        
        <p className="text-dark-300 leading-relaxed mb-6 text-lg">
          Welcome to the <strong className="text-white">100‑question reaction and ADHD quiz</strong>, a detailed online tool designed to help you reflect on your attention, focus, and everyday behavior patterns. This type of interactive <strong className="text-white">reaction test & ADHD self‑assessment</strong> isn't a medical diagnosis, but it can be a helpful first step in recognizing common signs associated with Attention Deficit Hyperactivity Disorder (ADHD).
        </p>

        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-5 mb-6">
          <p className="text-dark-200 leading-relaxed">
            📝 This quiz combines reaction‑type tasks and questionnaire items to give you a broad perspective on how your cognitive and attentional patterns compare with everyday expectations.
          </p>
        </div>

        {/* What Is ADHD Section */}
        <section className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 flex items-center gap-3">
            <Brain className="text-blue-400" size={32} />
            📌 What Is ADHD?
          </h2>
          
          <p className="text-dark-300 leading-relaxed mb-4">
            ADHD is a neurodevelopmental condition that involves patterns of inattention, hyperactivity, and impulsivity. It can affect many areas of life including academic performance, work success, and relationships. ADHD symptoms can show up as:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <div className="flex items-start gap-3 bg-dark-800/50 border border-dark-700 rounded-lg p-4">
              <CheckCircle2 className="text-blue-400 flex-shrink-0 mt-0.5" size={20} />
              <span className="text-dark-300">Difficulty staying focused on tasks</span>
            </div>
            <div className="flex items-start gap-3 bg-dark-800/50 border border-dark-700 rounded-lg p-4">
              <CheckCircle2 className="text-blue-400 flex-shrink-0 mt-0.5" size={20} />
              <span className="text-dark-300">Problems organizing activities</span>
            </div>
            <div className="flex items-start gap-3 bg-dark-800/50 border border-dark-700 rounded-lg p-4">
              <CheckCircle2 className="text-blue-400 flex-shrink-0 mt-0.5" size={20} />
              <span className="text-dark-300">Forgetfulness or losing track of things</span>
            </div>
            <div className="flex items-start gap-3 bg-dark-800/50 border border-dark-700 rounded-lg p-4">
              <CheckCircle2 className="text-blue-400 flex-shrink-0 mt-0.5" size={20} />
              <span className="text-dark-300">Restlessness or impulsive behavior</span>
            </div>
          </div>

          <p className="text-dark-300 leading-relaxed">
            These symptoms are used by clinicians in diagnostic tools like the <strong className="text-white">Adult ADHD Self‑Report Scale (ASRS‑v1.1)</strong>, which includes questions about attention and behavior frequency over time.
          </p>

          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-5 mt-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-yellow-400 flex-shrink-0 mt-0.5" size={24} />
              <p className="text-dark-200 leading-relaxed">
                It's important to understand that <strong className="text-white">only a trained healthcare professional can diagnose ADHD</strong>, but online self‑screeners are commonly used to help identify patterns that might be worth exploring further.
              </p>
            </div>
          </div>
        </section>

        {/* Why 100-Question Test Section */}
        <section className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 flex items-center gap-3">
            <TrendingUp className="text-green-400" size={32} />
            📊 Why a 100‑Question ADHD & Reaction Test Can Be Helpful
          </h2>
          
          <p className="text-dark-300 leading-relaxed mb-4">
            While short screening tools (like the 18‑item ASRS) are commonly used in research and clinical settings, longer questionnaires can:
          </p>

          <div className="space-y-3 mb-4">
            <div className="flex items-start gap-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-4">
              <CheckCircle2 className="text-green-400 flex-shrink-0 mt-0.5" size={20} />
              <span className="text-dark-200">Give you more depth and nuance about attention, restlessness, impulsivity, and executive function</span>
            </div>
            <div className="flex items-start gap-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-4">
              <CheckCircle2 className="text-green-400 flex-shrink-0 mt-0.5" size={20} />
              <span className="text-dark-200">Help you see patterns you may not notice with a shorter quiz</span>
            </div>
            <div className="flex items-start gap-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-4">
              <CheckCircle2 className="text-green-400 flex-shrink-0 mt-0.5" size={20} />
              <span className="text-dark-200">Serve as a starting point for further evaluation if results suggest possible concerns</span>
            </div>
          </div>

          <p className="text-dark-300 leading-relaxed italic">
            Longer quizzes aren't diagnostic by themselves, but they can help you reflect on your typical behaviors and attention styles in more situations and contexts.
          </p>
        </section>

        {/* What This Test Measures Section */}
        <section className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 flex items-center gap-3">
            <Target className="text-purple-400" size={32} />
            🧠 What This Reaction Test Measures
          </h2>
          
          <p className="text-dark-300 leading-relaxed mb-6">
            Your 100‑question ADHD reaction test is designed to assess multiple areas:
          </p>

          <div className="space-y-4">
            {/* Attention & Focus */}
            <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-2xl">🔹</span> Attention & Focus
              </h3>
              <p className="text-dark-300 leading-relaxed">
                Questions explore how often you feel distracted, have trouble completing tasks, or lose track of details — behaviors that are commonly seen in ADHD symptoms.
              </p>
            </div>

            {/* Impulsivity & Executive Control */}
            <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-2xl">🔹</span> Impulsivity & Executive Control
              </h3>
              <p className="text-dark-300 leading-relaxed">
                Some questions help evaluate whether you tend to act without thinking, interrupt others, or have trouble waiting — traits related to impulsivity.
              </p>
            </div>

            {/* Consistency and Reactions */}
            <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-2xl">🔹</span> Consistency and Reactions
              </h3>
              <p className="text-dark-300 leading-relaxed">
                Parts of this quiz may also look at how consistently you react to prompts or questions over time — similar in concept to a <strong className="text-white">reaction time test</strong> — though in a questionnaire format rather than milliseconds. Together, they help give you a broad snapshot of your cognitive patterns.
              </p>
            </div>
          </div>
        </section>

        {/* Important Disclaimer Section */}
        <section className="mb-8">
          <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border-2 border-red-500/30 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <AlertCircle className="text-red-400" size={28} />
              ⚠️ Important: What This Test Is – and Isn't
            </h2>
            
            <div className="space-y-3 mb-4">
              <p className="text-dark-200 leading-relaxed">
                <strong className="text-white">This quiz is NOT a diagnosis.</strong> A true ADHD diagnosis must come from a health professional based on structured interviews and clinical criteria. Online tests and quizzes — even detailed ones like this — are only screening tools designed to help you explore patterns in your behavior.
              </p>
            </div>

            <p className="text-dark-200 leading-relaxed mb-3">
              However, completing a thorough 100‑question reaction & ADHD quiz can:
            </p>

            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-green-400 flex-shrink-0 mt-0.5" size={18} />
                <span className="text-dark-200">Increase your self‑awareness</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-green-400 flex-shrink-0 mt-0.5" size={18} />
                <span className="text-dark-200">Highlight areas you might discuss with a clinician</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-green-400 flex-shrink-0 mt-0.5" size={18} />
                <span className="text-dark-200">Give you a baseline to track your patterns over time</span>
              </div>
            </div>
          </div>
        </section>

        {/* What to Do After Section */}
        <section className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 flex items-center gap-3">
            <Users className="text-cyan-400" size={32} />
            📌 What to Do After Taking the Quiz
          </h2>
          
          <p className="text-dark-300 leading-relaxed mb-4">
            If your results show a pattern of frequent symptoms such as:
          </p>

          <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5 mb-4">
            <ul className="space-y-2 text-dark-300">
              <li className="flex items-start gap-3">
                <span className="text-blue-400 font-bold">•</span>
                <span>Trouble focusing most of the time</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 font-bold">•</span>
                <span>Impulsivity or restlessness</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 font-bold">•</span>
                <span>Persistent difficulties in organization or memory</span>
              </li>
            </ul>
          </div>

          <p className="text-dark-300 leading-relaxed">
            It may be a good idea to <strong className="text-white">talk to a doctor or mental health provider</strong>. They can help interpret your results and guide you through a full clinical evaluation.
          </p>
        </section>

        {/* Summary Section */}
        <section className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">📝 Summary</h2>
          <ul className="space-y-3 text-dark-200">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="text-blue-400 flex-shrink-0 mt-0.5" size={20} />
              <span>A <strong className="text-white">reaction test + ADHD quiz</strong> provides insight into attention and behavior patterns, but cannot diagnose ADHD.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="text-blue-400 flex-shrink-0 mt-0.5" size={20} />
              <span><strong className="text-white">ADHD symptoms</strong> include challenges with focus, impulsivity, and activity levels.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="text-blue-400 flex-shrink-0 mt-0.5" size={20} />
              <span>Your <strong className="text-white">100‑question assessment</strong> offers a detailed way to reflect on daily experiences and cognitive style.</span>
            </li>
          </ul>
        </section>
      </article>

      {/* Call to Action - Take the Quiz */}
      <div className="bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-blue-500/10 border-2 border-blue-500/30 rounded-2xl p-6 sm:p-8 text-center">
        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          Ready to Take the ADHD & Reaction Test?
        </h3>
        <p className="text-dark-200 text-lg mb-6 max-w-2xl mx-auto">
          Scroll up to start the 100-question assessment and gain insights into your attention patterns, focus, and cognitive style.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-dark-800/40 border border-dark-700/50 rounded-full">
            <CheckCircle2 size={16} className="text-green-400" />
            <span className="text-sm text-dark-300 font-medium">100% Free</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-dark-800/40 border border-dark-700/50 rounded-full">
            <CheckCircle2 size={16} className="text-green-400" />
            <span className="text-sm text-dark-300 font-medium">No Signup Required</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-dark-800/40 border border-dark-700/50 rounded-full">
            <CheckCircle2 size={16} className="text-green-400" />
            <span className="text-sm text-dark-300 font-medium">Instant Results</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-dark-800/40 border border-dark-700/50 rounded-full">
            <CheckCircle2 size={16} className="text-green-400" />
            <span className="text-sm text-dark-300 font-medium">25 Questions</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="#top" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-bold text-lg rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <Brain size={24} />
            Take the Quiz Now
          </a>
          <Link 
            to="/test/reaction-time"
            className="inline-flex items-center gap-2 px-8 py-4 bg-dark-800 hover:bg-dark-700 border border-dark-700 hover:border-dark-600 text-white font-bold text-lg rounded-xl transition-all duration-300"
          >
            <Target size={24} />
            Try Reaction Time Test
          </Link>
        </div>
      </div>

      {/* Related Tests Section */}
      <div className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-2xl p-6 sm:p-8">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">
          Explore More Cognitive Tests
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link 
            to="/test/reaction-time"
            className="bg-dark-800/50 border border-dark-700 hover:border-blue-500/50 rounded-xl p-5 transition-all duration-300 hover:scale-105 group"
          >
            <div className="text-3xl mb-3">⚡</div>
            <h4 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
              Reaction Time Test
            </h4>
            <p className="text-sm text-dark-400">
              Measure your reflexes in milliseconds
            </p>
          </Link>

          <Link 
            to="/test/go-no-go"
            className="bg-dark-800/50 border border-dark-700 hover:border-green-500/50 rounded-xl p-5 transition-all duration-300 hover:scale-105 group"
          >
            <div className="text-3xl mb-3">🎯</div>
            <h4 className="text-lg font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
              Go/No-Go Test
            </h4>
            <p className="text-sm text-dark-400">
              Test your impulse control
            </p>
          </Link>

          <Link 
            to="/test/vision"
            className="bg-dark-800/50 border border-dark-700 hover:border-purple-500/50 rounded-xl p-5 transition-all duration-300 hover:scale-105 group"
          >
            <div className="text-3xl mb-3">👁️</div>
            <h4 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
              Vision Test
            </h4>
            <p className="text-sm text-dark-400">
              Check your visual acuity
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdhdSeoContent;
