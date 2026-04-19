import React from 'react';
import { Gamepad2, Activity, Car, Brain, CheckCircle2 } from 'lucide-react';

const SeoContent = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 mb-12">
      {/* Why Test Your Reaction Time Section */}
      <div className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-2xl p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
          Why Test Your Reaction Time?
        </h2>
        <p className="text-dark-300 leading-relaxed mb-6">
          Understanding your reaction time can help you improve your performance in various activities. Whether you're a gamer, an athlete, or just someone looking to sharpen your reflexes, knowing your reaction speed is key to tracking improvements and pushing your limits.
        </p>
        
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
          Benefits of Taking a Reaction Time Test
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center shrink-0">
                <Gamepad2 className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2">Gaming Skills</h4>
                <p className="text-sm text-dark-300 leading-relaxed">
                  Improve your reaction time to boost your performance in fast-paced games. Competitive gamers need lightning-fast reflexes to dominate in FPS, MOBA, and racing games.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
                <Activity className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2">Athletic Performance</h4>
                <p className="text-sm text-dark-300 leading-relaxed">
                  Track your reaction speed to optimize your performance in sports. Athletes in tennis, boxing, and track events rely on quick reflexes to gain a competitive edge.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center shrink-0">
                <Car className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2">Driving Safety</h4>
                <p className="text-sm text-dark-300 leading-relaxed">
                  Enhance your reflexes to react more quickly in unexpected driving situations. Faster reaction times can help prevent accidents and save lives on the road.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center shrink-0">
                <Brain className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2">Cognitive Health</h4>
                <p className="text-sm text-dark-300 leading-relaxed">
                  Reaction time testing can provide insights into your cognitive function and mental agility. Regular testing helps monitor brain health and mental sharpness.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-green-500/10 border-2 border-green-500/30 rounded-2xl p-6 sm:p-8 text-center">
        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          Ready to Test Your Reaction Speed?
        </h3>
        <p className="text-dark-200 text-lg mb-6 max-w-2xl mx-auto">
          Click below to take our Reaction Time Test and see how your reflexes measure up against top performers!
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
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
        </div>
      </div>
    </div>
  );
};

export default SeoContent;
