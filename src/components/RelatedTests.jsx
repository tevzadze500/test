import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { tests } from '../data/tests';

/**
 * Crawlable "keep exploring" strip for pages that would otherwise be dead
 * ends (no outbound links to any other test). Pass the ids of 2-3 related
 * tests; name, route and description come from the canonical test data.
 */
const RelatedTests = ({ ids = [], heading = 'Related tests' }) => {
  const related = ids
    .map((id) => tests.find((t) => t.id === id))
    .filter(Boolean);

  if (related.length === 0) return null;

  return (
    <section aria-labelledby="related-tests" className="max-w-4xl mx-auto mt-10 sm:mt-12">
      <h2 id="related-tests" className="text-xl sm:text-2xl font-bold text-white mb-4">
        {heading}
      </h2>
      <div className="grid sm:grid-cols-3 gap-3">
        {related.map((test) => (
          <Link
            key={test.id}
            to={test.route}
            className="group flex flex-col justify-between bg-dark-900/50 border border-dark-800 hover:border-green-500/50 rounded-xl p-4 transition-all"
          >
            <div>
              <p className="font-semibold text-white text-sm mb-1">{test.name}</p>
              <p className="text-xs text-dark-300 leading-relaxed line-clamp-2">{test.description}</p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-400 group-hover:text-green-300 mt-3">
              Take the test
              <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedTests;
