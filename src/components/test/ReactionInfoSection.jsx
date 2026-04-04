import React from 'react';
import { Brain, Target, Activity, AlertCircle, HelpCircle } from 'lucide-react';

const ReactionInfoSection = () => {
  const faqs = [
    {
      question: 'What is a good reaction time?',
      answer: 'The average human reaction time is around 250-300ms for visual stimuli. Professional gamers and athletes often achieve times below 200ms. Anything under 250ms is considered excellent.',
    },
    {
      question: 'How can I improve my reaction time?',
      answer: 'Regular practice, adequate sleep, physical exercise, and staying focused can help improve reaction times. Video games and specific training exercises are also effective methods.',
    },
    {
      question: 'Why do my results vary?',
      answer: "Reaction time varies based on factors like focus, fatigue, practice, and even the time of day. It's normal to see variation between attempts.",
    },
    {
      question: 'Is this test accurate?',
      answer: 'While this test provides a good indication of your reaction time, results can be affected by your device performance, display latency, and internet connection. For precise measurements, professional equipment is recommended.',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Main Description */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-4">About the Reaction Time Test</h2>
        <p className="text-dark-300 text-lg leading-relaxed">
          The Reaction Time Test measures how quickly you can respond to a visual stimulus. 
          This assessment evaluates the time between when a signal appears and when you react to it, 
          measuring your visual processing speed and motor response in milliseconds.
        </p>
      </section>

      {/* How It Works */}
      <section className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
            <Activity className="text-white" size={20} />
          </div>
          <h3 className="text-xl font-bold text-white">How It Works</h3>
        </div>
        <div className="space-y-3 text-dark-300">
          <div className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-sm font-bold">1</span>
            <p>Click the start button and prepare to react</p>
          </div>
          <div className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-sm font-bold">2</span>
            <p>Wait for the screen to turn green (random delay between 1.5-4 seconds)</p>
          </div>
          <div className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-sm font-bold">3</span>
            <p>Click as soon as you see the green signal</p>
          </div>
          <div className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-sm font-bold">4</span>
            <p>Your reaction time will be displayed in milliseconds</p>
          </div>
          <div className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-sm font-bold">5</span>
            <p>Take multiple attempts to get your best score</p>
          </div>
        </div>
      </section>

      {/* What It Measures */}
      <section className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
            <Brain className="text-white" size={20} />
          </div>
          <h3 className="text-xl font-bold text-white">What This Test Measures</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4 text-dark-300">
          <div>
            <h4 className="text-white font-semibold mb-2">Visual Processing Speed</h4>
            <p className="text-sm">How quickly your eyes and brain process visual information and identify the color change.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">Motor Response Time</h4>
            <p className="text-sm">The speed at which your brain sends signals to your muscles to execute the clicking action.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">Attention & Focus</h4>
            <p className="text-sm">Your ability to maintain concentration and respond quickly when the stimulus appears.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">Hand-Eye Coordination</h4>
            <p className="text-sm">The efficiency of coordination between your visual system and motor control.</p>
          </div>
        </div>
      </section>

      {/* Performance Benchmarks */}
      <section className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center">
            <Target className="text-white" size={20} />
          </div>
          <h3 className="text-xl font-bold text-white">Performance Benchmarks</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-dark-800/50 rounded-lg">
            <div>
              <span className="text-green-500 font-semibold">Elite (&lt;200ms)</span>
              <p className="text-xs text-dark-400 mt-1">Professional esports players, athletes in prime condition</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-dark-800/50 rounded-lg">
            <div>
              <span className="text-green-400 font-semibold">Excellent (200-250ms)</span>
              <p className="text-xs text-dark-400 mt-1">Competitive gamers, young adults with good reflexes</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-dark-800/50 rounded-lg">
            <div>
              <span className="text-blue-400 font-semibold">Good (250-300ms)</span>
              <p className="text-xs text-dark-400 mt-1">Average for regular gamers and active individuals</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-dark-800/50 rounded-lg">
            <div>
              <span className="text-yellow-400 font-semibold">Average (300-350ms)</span>
              <p className="text-xs text-dark-400 mt-1">Typical adult reaction time range</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
            <HelpCircle className="text-white" size={20} />
          </div>
          <h3 className="text-xl font-bold text-white">Frequently Asked Questions</h3>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-5">
              <h4 className="text-white font-semibold mb-2 flex items-start gap-2">
                <span className="text-green-500 flex-shrink-0">Q:</span>
                {faq.question}
              </h4>
              <p className="text-dark-300 text-sm pl-6">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-orange-400 flex-shrink-0 mt-1" size={20} />
          <div>
            <h4 className="text-white font-semibold mb-2">Important Notice</h4>
            <p className="text-dark-300 text-sm">
              This test is designed for entertainment and educational purposes. Results may be affected by 
              device performance, display latency, browser performance, and input lag. For professional 
              assessment or medical purposes, please consult with qualified professionals using calibrated 
              equipment. This test should not be used for diagnostic purposes or as a substitute for 
              professional medical advice.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReactionInfoSection;
