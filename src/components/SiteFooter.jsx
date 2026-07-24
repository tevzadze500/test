import React from 'react';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { SITE_NAME } from '../utils/structuredData';

/**
 * The single source of truth for the bottom bar: brand, copyright and the
 * legal links that must be reachable from every page (AdSense and GDPR both
 * require it). Previously this markup was copy-pasted into five pages and
 * absent from four others.
 *
 * Two shapes:
 *  - <SiteFooterBar />  the bar only, for embedding inside an existing <footer>
 *  - <SiteFooter />     the bar wrapped in its own <footer>, for pages that
 *                       have no footer of their own
 */

export const legalLinks = [
  { name: 'Privacy Policy', path: '/privacy' },
  { name: 'Terms of Use', path: '/terms' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export const SiteFooterBar = ({
  Icon = Zap,
  accent = 'from-green-500 to-emerald-600',
}) => (
  <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-dark-400">
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
);

const SiteFooter = ({ className = 'mt-8 sm:mt-12', ...barProps }) => (
  <footer className={`border-t border-dark-800 ${className}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <SiteFooterBar {...barProps} />
    </div>
  </footer>
);

export default SiteFooter;
