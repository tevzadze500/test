import React from 'react';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { SITE_NAME } from '../utils/structuredData';
import { tests } from '../data/tests';

/**
 * The single source of truth for the bottom of every page: the full test
 * directory (the site's only crawlable navigation covering all tests and
 * guides) plus the brand/copyright bar and the legal links that must be
 * reachable from every page (AdSense and GDPR both require it).
 *
 * Two shapes:
 *  - <SiteFooterBar />  nav + bar, for embedding inside an existing <footer>
 *  - <SiteFooter />     the same wrapped in its own <footer>, for pages that
 *                       have no footer of their own
 */

export const legalLinks = [
  { name: 'Privacy Policy', path: '/privacy' },
  { name: 'Terms of Use', path: '/terms' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

/** Look a test up by id so footer anchors always match the canonical name/route. */
const testLink = (id) => {
  const test = tests.find((t) => t.id === id);
  return { name: test.name, path: test.route };
};

const navColumns = [
  {
    heading: 'Speed & timing',
    links: ['reaction-time', 'f1-reaction', 'auditory-reaction', 'anticipation-test'].map(testLink),
  },
  {
    heading: 'Focus & memory',
    links: ['go-no-go', 'memory-test', 'adhd-test'].map(testLink),
  },
  {
    heading: 'Vision & hearing',
    links: ['vision-test', 'color-blind-test', 'hearing-test'].map(testLink),
  },
  {
    heading: 'Guides & more',
    links: [
      { name: 'Gaming Reaction Test', path: '/gaming-test' },
      { name: 'Sports Reaction Test', path: '/sport-test' },
      { name: 'Blog', path: '/blog' },
      { name: 'Why Reaction Time Matters', path: '/blog/reaction-time-crucial' },
    ],
  },
];

const SiteFooterNav = () => (
  <nav aria-label="All tests and guides" className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
    {navColumns.map((column) => (
      <div key={column.heading}>
        <p className="text-xs font-semibold uppercase tracking-wider text-dark-400 mb-3">
          {column.heading}
        </p>
        <ul className="space-y-2 text-sm">
          {column.links.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className="text-dark-300 hover:text-white transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </nav>
);

export const SiteFooterBar = ({
  Icon = Zap,
  accent = 'from-green-500 to-emerald-600',
}) => (
  <div className="space-y-6 sm:space-y-8">
    <SiteFooterNav />

    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-dark-400 border-t border-dark-800 pt-6">
      <div className="flex items-center gap-2">
        <div className={`w-6 h-6 rounded bg-gradient-to-br ${accent} flex items-center justify-center shrink-0`}>
          <Icon size={14} className="text-white" strokeWidth={2.5} />
        </div>
        <span>
          © {new Date().getFullYear()} {SITE_NAME}. Free online reaction time and cognitive tests.
        </span>
      </div>

      <nav aria-label="Legal and site information">
        <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:gap-x-6">
          {legalLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className="hover:text-white transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  </div>
);

const SiteFooter = ({ className = 'mt-8 sm:mt-12', ...barProps }) => (
  <footer className={`border-t border-dark-800 ${className}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <SiteFooterBar {...barProps} />
    </div>
  </footer>
);

export default SiteFooter;
