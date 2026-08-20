import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import MobileTopBar from '../components/MobileTopBar';
import Seo from '../components/Seo';
import Breadcrumb from '../components/Breadcrumb';
import { articleSchema, breadcrumbSchema } from '../utils/structuredData';
import { ArrowLeft, ArrowRight, BarChart3, TrendingDown, Gauge, Dumbbell, MonitorSmartphone, ExternalLink, Zap } from 'lucide-react';
import SiteFooter from '../components/SiteFooter';
import { benchmarkSources } from '../data/references';

/**
 * Every figure in this article comes from the three peer-reviewed sources in
 * benchmarkSources (Woods 2015, Jain 2015, Der & Deary 2006) — the same rule
 * as ReactionBenchmarks: no number ships without a citation.
 */

const SourceLink = ({ source }) => (
  <a
    href={source.href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1 text-green-400 hover:text-green-300 underline decoration-dotted underline-offset-2"
  >
    {source.label}
    <ExternalLink size={11} className="shrink-0" aria-hidden="true" />
  </a>
);

function BlogAvgReactionTimePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-dark-950">
      <Seo
        title="Average Reaction Time by Age: What Studies Show"
        description="How reaction time changes with age: the cited 213 ms adult mean, the ~0.55 ms lost per year, and what really moves your number. Test yours free."
        canonical="/blog/average-reaction-time-by-age"
        type="article"
        jsonLd={[
          articleSchema({
            headline: 'Average Reaction Time by Age: What Studies Show',
            description:
              'How reaction time changes with age: the cited 213 ms adult mean, the ~0.55 ms lost per year, and what really moves your number.',
            path: '/blog/average-reaction-time-by-age',
            datePublished: '2026-08-20',
            dateModified: '2026-08-20',
          }),
          breadcrumbSchema(
            'Average Reaction Time by Age',
            '/blog/average-reaction-time-by-age',
            { name: 'Blog', path: '/blog' },
          ),
        ]}
      />

      <MobileTopBar
        onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isMenuOpen={isSidebarOpen}
      />

      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6 sm:p-8 lg:p-12">

          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-dark-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            <span>Back to the Blog</span>
          </Link>

          <Breadcrumb
            name="Average Reaction Time by Age"
            parent={{ name: 'Blog', to: '/blog' }}
            className="mb-6"
          />

          <article className="prose prose-invert max-w-none">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Average Reaction Time by Age: What Studies Show
            </h1>

            <p className="text-sm text-dark-400 mb-6">
              Published <time dateTime="2026-08-20">August 20, 2026</time> · Every figure below is
              cited to a peer-reviewed source.
            </p>

            <p className="text-lg text-dark-300 leading-relaxed mb-8">
              Take a reaction test and the first question is always the same: <em>is my number good
              for my age?</em> The honest answer is more interesting than the mythical tables
              floating around the internet. Aging does slow your reactions — but far less than most
              people assume, and far less than the things you can actually control today. Here is
              what the published research says, number by number.
            </p>

            {/* Section 1 */}
            <div className="bg-dark-900/50 border border-dark-800 rounded-2xl p-6 sm:p-8 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center shrink-0">
                  <BarChart3 className="w-6 h-6 text-green-400" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white m-0">
                  The Adult Average: 213 ms — or 231 ms, Depending How You Count
                </h2>
              </div>

              <p className="text-dark-300 leading-relaxed mb-4">
                The largest careful measurement of simple visual reaction time in adults comes from{' '}
                <SourceLink source={benchmarkSources.woods} />, who tested{' '}
                <strong className="text-white">1,469 adults aged 18 to 65</strong>. Two numbers
                matter from that study:
              </p>
              <ul className="text-dark-300 leading-relaxed space-y-2 mb-4 list-disc pl-5">
                <li>
                  <strong className="text-white">231 ms</strong> — the average as actually measured,
                  hardware delays included. This is the closest published equivalent to what a
                  browser test records.
                </li>
                <li>
                  <strong className="text-white">213 ms</strong> — the same average after removing
                  the delay introduced by the display and input device: the best estimate of the
                  purely human reaction.
                </li>
              </ul>
              <p className="text-dark-300 leading-relaxed">
                For comparison, the long-standing laboratory reference for college-age adults
                reacting to a light stimulus sits around{' '}
                <strong className="text-white">190 ms</strong> (
                <SourceLink source={benchmarkSources.jain} />) — younger participants, controlled
                conditions, dedicated equipment. If an online test tells you the "average" is
                250 ms or 284 ms without naming a source, treat it as decoration.
              </p>
            </div>

            {/* Section 2 */}
            <div className="bg-dark-900/50 border border-dark-800 rounded-2xl p-6 sm:p-8 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                  <TrendingDown className="w-6 h-6 text-blue-400" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white m-0">
                  What Age Actually Costs: About Half a Millisecond a Year
                </h2>
              </div>

              <p className="text-dark-300 leading-relaxed mb-4">
                Across the adult range, <SourceLink source={benchmarkSources.woods} /> found that
                simple reaction time lengthens by roughly{' '}
                <strong className="text-white">0.55 ms per year of age</strong>. Their youngest band
                (18–24) averaged <strong className="text-white">217.8 ms</strong>; their oldest
                (59–65) averaged <strong className="text-white">239.1 ms</strong>. Read that again:
                four decades of aging cost about{' '}
                <strong className="text-white">21 milliseconds</strong> — less than the blink of a
                frame at 60 Hz, and less than the difference between a good and a bad night of
                sleep.
              </p>
              <p className="text-dark-300 leading-relaxed mb-4">
                The picture across a wider lifespan comes from{' '}
                <SourceLink source={benchmarkSources.der} />, who analysed reaction times from over
                7,000 UK adults up to their early 80s. Three findings stand out: the slowing is
                gradual through midlife and steepens in the later decades; responses become more{' '}
                <em>variable</em> with age, not just slower on average; and choice reaction time —
                deciding <em>which</em> response to make, not just detecting a signal — ages more
                steeply than simple reaction time.
              </p>
              <p className="text-dark-300 leading-relaxed">
                Two honest caveats. These datasets cover adults: reaction time in children and
                teenagers is still improving as the nervous system matures, and the studies above
                simply do not measure them. And every figure is an average of a wide spread — plenty
                of 60-year-olds outpace plenty of 25-year-olds.
              </p>
            </div>

            {/* Section 3 */}
            <div className="bg-dark-900/50 border border-dark-800 rounded-2xl p-6 sm:p-8 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0">
                  <MonitorSmartphone className="w-6 h-6 text-purple-400" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white m-0">
                  Why "Good for Your Age" Is Blurrier Than It Sounds
                </h2>
              </div>

              <p className="text-dark-300 leading-relaxed mb-4">
                Here is the uncomfortable arithmetic: your screen and input device add{' '}
                <strong className="text-white">20 to 50 ms</strong> to whatever your nervous system
                does — display latency, refresh rate, browser scheduling, mouse or touchscreen lag.
                That hardware spread is <em>larger than the entire aging effect from 18 to 65</em>.
                Comparing your number on a 60 Hz office monitor against someone else's on a 144 Hz
                gaming setup says more about the monitors than the humans.
              </p>
              <p className="text-dark-300 leading-relaxed">
                State matters too. Sleep, alertness, caffeine and time of day all move your times by
                meaningful amounts from one session to the next, and reactions to sound are
                systematically faster than reactions to light (
                <SourceLink source={benchmarkSources.jain} />) — so an{' '}
                <Link to="/test/auditory-reaction" className="text-green-400 hover:text-green-300 underline">auditory test</Link>{' '}
                and a visual one are not comparable numbers. The only clean comparison is you
                against yourself: same test, same device, tracked over time.
              </p>
            </div>

            {/* Section 4 */}
            <div className="bg-dark-900/50 border border-dark-800 rounded-2xl p-6 sm:p-8 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
                  <Dumbbell className="w-6 h-6 text-amber-400" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white m-0">
                  Can You Push Back? Partly — at Any Age
                </h2>
              </div>

              <p className="text-dark-300 leading-relaxed mb-4">
                You cannot train away the biology of aging, but the levers that remain are not
                small. <SourceLink source={benchmarkSources.jain} /> compared physically active and
                inactive students and found the active group reacted faster to both light and sound
                — regular physical activity is the best-documented everyday factor. Practice helps
                too: repeating the same stimulus-response loop makes it more automatic, which is why
                your fifth attempt on any reaction test is usually sharper than your first.
              </p>
              <p className="text-dark-300 leading-relaxed">
                The rest is unglamorous but real: consistent sleep, an alert (not jittery) state,
                and testing when you are fresh rather than at the end of a screen-heavy day. None of
                it turns a 240 ms responder into a 190 ms one — but stacked together, these factors
                are worth more milliseconds than a decade of aging takes away.
              </p>
            </div>

            {/* Section 5 */}
            <div className="bg-dark-900/50 border border-dark-800 rounded-2xl p-6 sm:p-8 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center shrink-0">
                  <Gauge className="w-6 h-6 text-cyan-400" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white m-0">
                  How to Get a Number Worth Trusting
                </h2>
              </div>

              <ol className="text-dark-300 leading-relaxed space-y-3 list-decimal pl-5 mb-4">
                <li>
                  Take the{' '}
                  <Link to="/test/reaction-time" className="text-green-400 hover:text-green-300 underline">reaction time test</Link>{' '}
                  at least five times and look at your <strong className="text-white">average</strong>,
                  not your single best fluke.
                </li>
                <li>
                  Compare against the <em>measured</em> adult mean of 231 ms — your browser number
                  includes hardware lag, just like the study's raw figures did.
                </li>
                <li>
                  Retest on the <strong className="text-white">same device</strong> every few weeks.
                  The trend is the signal; any single session is noise.
                </li>
              </ol>
              <p className="text-dark-300 leading-relaxed">
                The full set of cited reference points — including the age bands — lives on the{' '}
                <Link to="/test/reaction-time" className="text-green-400 hover:text-green-300 underline">reaction time test page</Link>.
              </p>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-green-500/10 border-2 border-green-500/30 rounded-2xl p-6 sm:p-8 text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                So — Where Do You Land?
              </h2>
              <p className="text-dark-200 text-lg mb-6 max-w-2xl mx-auto">
                Five attempts, thirty seconds, no signup. Get your average and put it next to the
                numbers above.
              </p>
              <Link
                to="/test/reaction-time"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 rounded-xl text-white text-base font-bold shadow-lg shadow-green-500/30 transition-all hover:scale-[1.02]"
              >
                <Zap size={18} className="shrink-0" />
                Test Your Reaction Time
                <ArrowRight size={18} className="shrink-0" />
              </Link>
            </div>

            {/* Sources */}
            <section aria-labelledby="sources-heading" className="border-t border-dark-800 pt-6">
              <h2 id="sources-heading" className="text-lg font-bold text-white mb-3">
                Sources
              </h2>
              <ul className="space-y-2 text-sm text-dark-400 leading-relaxed">
                {Object.values(benchmarkSources).map((s) => (
                  <li key={s.id}>
                    {s.text}{' '}
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-400 hover:text-green-300 underline"
                    >
                      (link)
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </article>
        </div>

        <SiteFooter />
      </main>
    </div>
  );
}

export default BlogAvgReactionTimePage;
