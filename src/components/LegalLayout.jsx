import React, { useState } from 'react';
import Seo from './Seo';
import Sidebar from './Sidebar';
import MobileTopBar from './MobileTopBar';
import SiteFooter from './SiteFooter';

/**
 * Shared shell for the four information pages (/privacy, /terms, /about,
 * /contact). Same chrome as the test pages — sidebar, mobile bar, footer —
 * with a readable single-column body.
 */
const LegalLayout = ({
  title,
  description,
  canonical,
  heading,
  intro,
  lastUpdated,
  jsonLd,
  children,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-dark-950">
      <Seo title={title} description={description} canonical={canonical} jsonLd={jsonLd} />

      <MobileTopBar
        onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isMenuOpen={isSidebarOpen}
      />

      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <main className="flex-1 overflow-y-auto pt-16 lg:pt-0">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <header className="mb-8 pb-8 border-b border-dark-800">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{heading}</h1>
            {intro && <p className="text-base sm:text-lg text-dark-300 leading-relaxed">{intro}</p>}
            {lastUpdated && (
              <p className="mt-4 text-sm text-dark-400">
                Last updated: <time dateTime={lastUpdated}>{lastUpdated}</time>
              </p>
            )}
          </header>

          <div className="space-y-8">{children}</div>
        </div>

        <SiteFooter />
      </main>
    </div>
  );
};

/** A titled section inside a legal page. */
export const LegalSection = ({ title, children }) => (
  <section>
    <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">{title}</h2>
    <div className="space-y-3 text-dark-300 leading-relaxed text-sm sm:text-base">{children}</div>
  </section>
);

/** Highlighted callout for the things a reader must not miss. */
export const LegalCallout = ({ title, children, tone = 'amber' }) => {
  const tones = {
    amber: 'bg-amber-500/10 border-amber-500/30 text-amber-200',
    green: 'bg-green-500/10 border-green-500/30 text-green-200',
  };
  return (
    <div className={`rounded-xl border p-4 sm:p-5 ${tones[tone]}`}>
      {title && <p className="font-bold text-white mb-2">{title}</p>}
      <div className="text-sm leading-relaxed space-y-2">{children}</div>
    </div>
  );
};

/** Marks information the site owner still has to supply. */
export const Placeholder = ({ children }) => (
  <mark className="bg-amber-400/20 text-amber-200 px-1.5 py-0.5 rounded font-mono text-[0.9em] not-italic">
    [PLACEHOLDER: {children}]
  </mark>
);

export default LegalLayout;
