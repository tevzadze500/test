import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, CheckCircle2, AlertCircle, Target, Zap, Eye } from 'lucide-react';

export const adhdFaqs = [
  {
    question: 'Is an online ADHD screening test accurate?',
    answer: 'An online screening test can reliably flag patterns of inattention and impulsivity that are worth exploring, but it cannot diagnose ADHD. Its usefulness depends on answering honestly, and it is never a substitute for a professional clinical evaluation.',
  },
  {
    question: 'Can this test tell me if I have ADHD?',
    answer: 'No. It highlights tendencies in attention and impulse control — nothing more. Only a licensed clinician can diagnose ADHD, using structured interviews, personal history, and evidence that symptoms affect more than one area of your life.',
  },
  {
    question: 'What is the difference between an attention span check and an ADHD diagnosis?',
    answer: 'An attention span check is a quick, private self-reflection on how you focus day to day. A diagnosis is a formal clinical process that weighs your symptoms, developmental history, and their real-world impact across settings such as work, school, and home.',
  },
  {
    question: 'Are my answers private?',
    answer: 'Yes. The screening runs entirely in your browser, requires no signup, and your answers are never sent to a server — so your responses stay on your device.',
  },
];

const AdhdSeoContent = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 mb-12 px-6">
      {/* Main Article Section */}
      <article className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-2xl p-6 sm:p-8">
        {/* Prominent Medical Disclaimer (YMYL) */}
        <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border-2 border-red-500/40 rounded-xl p-5 sm:p-6 mb-8">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-red-300 flex-shrink-0 mt-0.5" size={24} strokeWidth={2.4} />
            <div>
              <h2 className="text-lg font-bold text-white mb-2">Medical Disclaimer</h2>
              <p className="text-dark-200 leading-relaxed">
                This ADHD screening test is a <strong className="text-white">self-assessment tool for educational and informational purposes only</strong>. It is not a diagnostic instrument and does not replace a professional medical evaluation, diagnosis, or treatment. Only a qualified healthcare provider can diagnose ADHD. If you have concerns about your attention, focus, or mental health, please consult a licensed clinician.
              </p>
            </div>
          </div>
        </div>

        {/* What Is an ADHD Screening Test */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">What Is an ADHD Screening Test?</h2>
          <p className="text-dark-300 leading-relaxed">
            An <strong className="text-white">ADHD screening test</strong> is a structured self-assessment that helps you reflect on everyday patterns of attention, focus, impulsivity, and restlessness. Rather than diagnosing anything, it mirrors the kinds of questions clinicians use in validated tools like the <strong className="text-white">Adult ADHD Self-Report Scale (ASRS-v1.1)</strong> and turns them into a private, on-screen questionnaire. Think of it as a mirror, not a verdict: it can surface tendencies worth paying attention to and give you clearer language to describe your experience — to yourself or to a doctor.
          </p>
        </section>

        {/* Reaction time and attention */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">The Link Between Reaction Time and Attention</h2>
          <p className="text-dark-300 leading-relaxed">
            Attention is not only about focus — it is about <em>consistency</em>. Cognitive research consistently finds that people with ADHD tend to show higher <strong className="text-white">reaction-time variability</strong>: their responses swing between fast and slow far more than average, even when their average speed looks normal. This moment-to-moment inconsistency is one of the most studied behavioral markers of attention, usually measured with continuous performance tasks. That is why a modern <strong className="text-white">attention span check</strong> pairs self-report questions with response-based tasks — how <em>steadily</em> you respond can reveal lapses in sustained attention that a questionnaire alone might miss.
          </p>
        </section>

        {/* Impulse control / Go-No-Go */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Understanding Impulse Control: The Go/No-Go Concept</h2>
          <p className="text-dark-300 leading-relaxed">
            Impulsivity — acting before thinking — is a core feature of ADHD. Scientists measure it with a paradigm called the <strong className="text-white">Go/No-Go task</strong>: you respond quickly to a "Go" signal but must <em>withhold</em> your response when a "No-Go" signal appears. The ability to hit the brakes on an automatic reaction is called <strong className="text-white">response inhibition</strong>, and it is governed largely by the prefrontal cortex. Weaker inhibition tends to show up as more "false alarms" — responding when you should have stopped. This screening reflects on impulse-control tendencies through self-report; if you want to measure behavioral inhibition directly, try our dedicated <Link to="/test/go-no-go" className="text-blue-400 hover:text-blue-300 underline font-medium">Go/No-Go Test</Link>.
          </p>
        </section>

        {/* How to interpret results + table */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">How to Interpret Your Self-Assessment Results</h2>
          <p className="text-dark-300 leading-relaxed mb-5">
            Your result is a snapshot of <em>tendencies</em>, not a fixed clinical label. It can shift with sleep, stress, mood, and context. Here is how to read it responsibly:
          </p>
          <div className="overflow-x-auto rounded-xl border border-dark-800">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-dark-900/60 text-dark-400">
                  <th className="py-3 px-4 font-semibold whitespace-nowrap">Pattern in your answers</th>
                  <th className="py-3 px-4 font-semibold">What it may indicate</th>
                  <th className="py-3 px-4 font-semibold">A sensible next step</th>
                </tr>
              </thead>
              <tbody className="text-dark-300">
                <tr className="border-t border-dark-800">
                  <td className="py-3 px-4 font-bold text-green-400 whitespace-nowrap">Few indicators</td>
                  <td className="py-3 px-4">Attention and impulse control look typical for you right now</td>
                  <td className="py-3 px-4">No action needed — retake if things change</td>
                </tr>
                <tr className="border-t border-dark-800">
                  <td className="py-3 px-4 font-bold text-yellow-400 whitespace-nowrap">Some indicators</td>
                  <td className="py-3 px-4">Occasional lapses in focus or self-control</td>
                  <td className="py-3 px-4">Try the focus strategies below and track patterns over time</td>
                </tr>
                <tr className="border-t border-dark-800">
                  <td className="py-3 px-4 font-bold text-orange-400 whitespace-nowrap">Many indicators</td>
                  <td className="py-3 px-4">Frequent, wide-ranging attention or impulsivity patterns</td>
                  <td className="py-3 px-4">Consider a conversation with a doctor or mental-health professional</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-dark-400 mt-3 flex items-start gap-2">
            <AlertCircle size={16} className="text-red-300 shrink-0 mt-0.5" />
            <span>None of these bands is a diagnosis. They describe tendencies in your responses — not a medical conclusion about you.</span>
          </p>
        </section>

        {/* Strategies to improve focus */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Actionable Strategies to Improve Focus and Cognitive Control</h2>
          <p className="text-dark-300 leading-relaxed mb-4">
            Whatever your result, focus and self-control are trainable skills. These evidence-informed habits help almost everyone:
          </p>
          <ul className="space-y-3 text-dark-300">
            <li className="flex items-start gap-3"><CheckCircle2 className="text-blue-400 flex-shrink-0 mt-0.5" size={18} /><span><strong className="text-white">Work in Pomodoro sprints</strong> — 25 minutes of single-tasking, then a 5-minute break. Short, timed blocks fit the attention system&apos;s natural rhythm.</span></li>
            <li className="flex items-start gap-3"><CheckCircle2 className="text-blue-400 flex-shrink-0 mt-0.5" size={18} /><span><strong className="text-white">Engineer your environment</strong> — put your phone out of sight and silence notifications. A distraction you cannot see is one you do not have to resist.</span></li>
            <li className="flex items-start gap-3"><CheckCircle2 className="text-blue-400 flex-shrink-0 mt-0.5" size={18} /><span><strong className="text-white">Take real movement breaks</strong> — brief physical activity resets attention and supports prefrontal function.</span></li>
            <li className="flex items-start gap-3"><CheckCircle2 className="text-blue-400 flex-shrink-0 mt-0.5" size={18} /><span><strong className="text-white">Protect your sleep</strong> — poor sleep mimics and worsens inattention and impulsivity, so consistent sleep is one of the highest-leverage fixes.</span></li>
            <li className="flex items-start gap-3"><CheckCircle2 className="text-blue-400 flex-shrink-0 mt-0.5" size={18} /><span><strong className="text-white">Train the systems underneath focus</strong> — attention leans heavily on working memory. Strengthen it with our <Link to="/test/memory" className="text-blue-400 hover:text-blue-300 underline font-medium">Working Memory Test</Link>: the more you can hold in mind, the easier it is to stay on task and resist distraction.</span></li>
          </ul>
        </section>

        {/* FAQ Section */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {adhdFaqs.map((faq, i) => (
              <div key={i} className="bg-dark-800/40 border border-dark-700/50 rounded-xl p-5">
                <h3 className="text-white font-semibold mb-2 flex items-start gap-2">
                  <span className="text-blue-400 flex-shrink-0">Q:</span>
                  {faq.question}
                </h3>
                <p className="text-dark-300 text-sm pl-6">{faq.answer}</p>
              </div>
            ))}
          </div>
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
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform">
              <Zap size={22} className="text-white" strokeWidth={2.5} fill="white" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
              Reaction Time Test
            </h4>
            <p className="text-sm text-dark-400">
              Measure your reflexes in milliseconds
            </p>
          </Link>

          <Link
            to="/test/go-no-go"
            className="bg-dark-800/50 border border-dark-700 hover:border-blue-500/50 rounded-xl p-5 transition-all duration-300 hover:scale-105 group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform">
              <Target size={22} className="text-white" strokeWidth={2.5} />
            </div>
            <h4 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
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
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform">
              <Eye size={22} className="text-white" strokeWidth={2.5} />
            </div>
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
