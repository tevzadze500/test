import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, ArrowRight, Trophy, Clock, Shield } from 'lucide-react';

const ConversionFooter = () => {
  const quickTests = [
    { name: 'Reaction Time', path: '/test/reaction-time', time: '2 min', icon: '⚡' },
    { name: 'F1 Reaction', path: '/test/f1-reaction', time: '1 min', icon: '🏁' },
    { name: 'Vision Test', path: '/test/vision', time: '3 min', icon: '👁️' },
  ];

  return (
    <footer className="border-t border-dark-800 mt-12 sm:mt-16">
      {/* Conversion Block */}
      <div className="bg-gradient-to-br from-green-500/10 via-emerald-600/10 to-green-500/5 border-b border-green-500/20 py-8 sm:py-12">
        <div className="text-center max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-full text-green-400 text-sm font-semibold mb-4">
            <Trophy size={16} />
            <span>Ready to Test Your Abilities?</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            Start Your First Test Now
          </h2>
          
          <p className="text-base sm:text-lg text-dark-300 mb-6 sm:mb-8">
            Choose a quick test below and get instant results. No signup required.
          </p>

          {/* Quick Test Options */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {quickTests.map((test, index) => (
              <Link
                key={index}
                to={test.path}
                className="group bg-dark-800/50 hover:bg-dark-800 border border-dark-700 hover:border-green-500/50 rounded-xl p-4 transition-all duration-300 hover:scale-105"
              >
                <div className="text-3xl mb-2">{test.icon}</div>
                <div className="text-sm font-semibold text-white mb-1">{test.name}</div>
                <div className="flex items-center justify-center gap-1.5 text-xs text-dark-400">
                  <Clock size={12} />
                  <span>{test.time}</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Primary CTA */}
          <Link
            to="#popular"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-xl text-white font-bold transition-all duration-300 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 hover:scale-105 group min-h-[56px]"
          >
            <Zap size={20} />
            <span>View All Tests</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Info Footer */}
      <div className="py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-dark-400 px-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-sm">
              ⚡
            </div>
            <span>© 2026 TestHub. Professional Testing Platform.</span>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            <div className="flex items-center gap-1.5">
              <Shield size={14} className="text-green-500" />
              <span>No signup</span>
            </div>
            <span className="hidden sm:inline text-dark-700">•</span>
            <div className="flex items-center gap-1.5">
              <Zap size={14} className="text-green-500" />
              <span>Instant results</span>
            </div>
            <span className="hidden sm:inline text-dark-700">•</span>
            <div className="flex items-center gap-1.5">
              <Trophy size={14} className="text-green-500" />
              <span>Free forever</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ConversionFooter;
