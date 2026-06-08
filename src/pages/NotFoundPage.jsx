import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { Home, Zap, ArrowRight } from 'lucide-react';
import F1LightsIcon from '../components/icons/F1LightsIcon';

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-dark-950 px-4 py-16 text-center">
      <Seo
        title="Page Not Found (404) | ReactionTestPro"
        description="The page you are looking for does not exist. Explore our free online reaction time and cognitive tests."
      />

      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-2xl">
            <Zap className="w-12 h-12 text-white" strokeWidth={2.5} />
          </div>
        </div>

        <p className="text-green-400 font-bold tracking-widest uppercase text-sm mb-3">
          Error 404
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
          404 — Page Not Found
        </h1>

        <p className="text-lg sm:text-xl text-dark-200 leading-relaxed mb-10 max-w-xl mx-auto">
          The page you are looking for does not exist or has been moved. But your
          reflexes are still sharp — jump back in and put them to the test.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold rounded-xl shadow-2xl hover:shadow-green-500/50 transition-all duration-200 transform hover:scale-105"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>

          <Link
            to="/test/reaction-time"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-dark-800 hover:bg-dark-700 border border-dark-700 hover:border-green-500/60 text-white font-bold rounded-xl transition-all duration-200 transform hover:scale-105"
          >
            <Zap className="w-5 h-5 text-green-400" />
            Reaction Time Test
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/test/f1-reaction"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-dark-800 hover:bg-dark-700 border border-dark-700 hover:border-red-500/60 text-white font-bold rounded-xl transition-all duration-200 transform hover:scale-105"
          >
            <F1LightsIcon size={20} className="text-white" />
            F1 Reaction
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
