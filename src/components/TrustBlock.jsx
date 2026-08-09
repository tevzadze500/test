import React from 'react';
import { Link } from 'react-router-dom';
import { UserRound, CalendarDays, BookOpen, ExternalLink, ShieldAlert } from 'lucide-react';
import { AUTHOR_NAME } from '../data/site';

/**
 * Expertise / authorship signals for the health-adjacent (YMYL) test pages:
 * /test/adhd, /test/vision, /test/color-blind, /test/hearing.
 *
 * Two rules this component exists to enforce:
 *  1. No invented people. The byline defaults to the site's publishing name
 *     from src/data/site.js (falling back to a visible [PLACEHOLDER] if that
 *     is ever nulled), and the reviewer line is omitted entirely rather than
 *     fabricated — an absent reviewer is honest, a made-up one is not.
 *  2. No invented sources. Every entry in `references` was opened and checked
 *     before being added; anything unverifiable was left out.
 */

/** Short medical disclaimer, meant to sit above the fold on every YMYL page. */
export const MedicalDisclaimerBanner = ({ children }) => (
  <div className="flex items-start gap-3 bg-amber-500/10 border border-amber-500/30 rounded-xl p-3.5 sm:p-4 mb-6">
    <ShieldAlert size={18} className="text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
    <p className="text-sm text-amber-100/90 leading-relaxed">
      <strong className="text-white">Not a medical diagnosis.</strong> {children}{' '}
      See our{' '}
      <Link to="/terms" className="underline hover:text-white">Terms of Use</Link>.
    </p>
  </div>
);

const TrustBlock = ({
  author = AUTHOR_NAME,
  reviewer = null,
  lastUpdated,
  references = [],
  methodology,
}) => (
  <section
    className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-5 sm:p-6 space-y-5"
    aria-labelledby="about-this-test"
  >
    <h2 id="about-this-test" className="text-xl font-bold text-white">
      About this test
    </h2>

    {/* Byline + last updated */}
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm">
      <div className="flex items-center gap-2 text-dark-300">
        <UserRound size={16} className="text-dark-400 shrink-0" aria-hidden="true" />
        <span>
          Written by{' '}
          {author ? (
            <span className="text-white font-medium">{author}</span>
          ) : (
            <mark className="bg-amber-400/20 text-amber-200 px-1.5 py-0.5 rounded font-mono text-[0.9em]">
              [PLACEHOLDER: author name]
            </mark>
          )}
        </span>
      </div>

      {reviewer && (
        <div className="flex items-center gap-2 text-dark-300">
          <UserRound size={16} className="text-dark-400 shrink-0" aria-hidden="true" />
          <span>
            Reviewed by <span className="text-white font-medium">{reviewer}</span>
          </span>
        </div>
      )}

      {lastUpdated && (
        <div className="flex items-center gap-2 text-dark-300">
          <CalendarDays size={16} className="text-dark-400 shrink-0" aria-hidden="true" />
          <span>
            Last updated:{' '}
            <time dateTime={lastUpdated} className="text-white font-medium">{lastUpdated}</time>
          </span>
        </div>
      )}
    </div>

    {!reviewer && (
      <p className="text-xs text-dark-400 leading-relaxed border-l-2 border-dark-700 pl-3">
        This page has not been reviewed by a clinician. It is written by the site author, who is a
        developer, not a medical professional. Where a reviewer exists they are named here; no
        credentials are claimed that we do not have.
      </p>
    )}

    {methodology && (
      <div>
        <h3 className="text-sm font-semibold text-white mb-2">How this test works</h3>
        <p className="text-sm text-dark-300 leading-relaxed">{methodology}</p>
      </div>
    )}

    {references.length > 0 && (
      <div>
        <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
          <BookOpen size={15} className="text-dark-400" aria-hidden="true" />
          References
        </h3>
        <ul className="space-y-2 text-sm">
          {references.map((ref) => (
            <li key={ref.href} className="text-dark-300 leading-relaxed">
              <a
                href={ref.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 hover:text-green-300 underline inline-flex items-baseline gap-1"
              >
                {ref.title}
                <ExternalLink size={11} className="shrink-0 self-center" aria-hidden="true" />
              </a>
              {ref.publisher && <span className="text-dark-400"> — {ref.publisher}</span>}
              {ref.note && <span className="text-dark-400">. {ref.note}</span>}
            </li>
          ))}
        </ul>
      </div>
    )}
  </section>
);

export default TrustBlock;
