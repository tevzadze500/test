import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Zap, Lightbulb, ExternalLink } from 'lucide-react';
import { benchmarkSources as SOURCES } from '../data/references';

/**
 * Replaces the old "Top 10 Fastest Reaction Times" table, which listed six real
 * Formula 1 drivers against invented millisecond times under a heading that
 * claimed ten rows.
 *
 * No such ranking exists: start reaction times vary from race to race and are
 * not published as a standing leaderboard. Every figure below comes from a
 * peer-reviewed source that is cited inline and linked. Tiers we could not
 * source — "elite motorsport", "professional esports" — are deliberately
 * absent rather than estimated.
 */


// Every row must carry a source. A row without one does not ship.
const BENCHMARKS = [
  {
    value: '~190 ms',
    label: 'Laboratory reference, college-age adults',
    detail: 'The long-accepted figure for simple reaction time to a light stimulus under controlled conditions.',
    source: SOURCES.jain,
    accent: 'text-purple-400',
  },
  {
    value: '213 ms',
    label: 'Mean for adults 18–65, hardware lag removed',
    detail: 'Measured across 1,469 participants, then corrected for the delay introduced by the display and input device.',
    source: SOURCES.woods,
    accent: 'text-green-400',
  },
  {
    value: '231 ms',
    label: 'Mean for adults 18–65, as actually measured',
    detail: 'The same 1,469 participants before hardware correction — the closest published equivalent to what a browser test like this one records.',
    source: SOURCES.woods,
    accent: 'text-cyan-400',
  },
  {
    value: '217.8 → 239.1 ms',
    label: 'Mean by age, 18–24 up to 59–65',
    detail: 'Simple reaction time lengthens by roughly 0.55 ms per year of age across adulthood.',
    source: SOURCES.woods,
    accent: 'text-blue-400',
  },
];

const SourceLink = ({ source }) => (
  <a
    href={source.href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1 text-dark-400 hover:text-green-400 underline decoration-dotted underline-offset-2 transition-colors"
  >
    {source.label}
    <ExternalLink size={11} className="shrink-0" aria-hidden="true" />
  </a>
);

const ReactionBenchmarks = () => (
  <section className="max-w-6xl mx-auto mb-12 sm:mb-16" aria-labelledby="benchmarks-heading">
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-4">
        <BarChart3 className="w-8 h-8 sm:w-10 sm:h-10 text-green-500" />
        <h2 id="benchmarks-heading" className="text-3xl sm:text-4xl font-bold text-white">
          What Counts as a Fast Reaction Time?
        </h2>
      </div>
      <p className="text-base sm:text-lg text-dark-400 max-w-2xl mx-auto">
        Published reference points for simple visual reaction time, so you can put your own
        result in context. Every figure is cited.
      </p>
    </div>

    <div className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-2xl p-4 sm:p-6">
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left">
          <caption className="sr-only">
            Published simple visual reaction time reference values with sources
          </caption>
          <thead>
            <tr className="border-b border-dark-700 text-sm font-semibold text-dark-300 uppercase tracking-wider">
              <th scope="col" className="py-4 px-4">Reaction time</th>
              <th scope="col" className="py-4 px-4">What it represents</th>
              <th scope="col" className="py-4 px-4">Source</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-800">
            {BENCHMARKS.map((row) => (
              <tr key={row.label} className="hover:bg-dark-800/40 transition-colors">
                <td className="py-4 px-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Zap className={`w-4 h-4 shrink-0 ${row.accent}`} />
                    <span className={`text-lg font-bold ${row.accent}`}>{row.value}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="font-semibold text-white mb-1">{row.label}</div>
                  <p className="text-sm text-dark-400 leading-relaxed">{row.detail}</p>
                </td>
                <td className="py-4 px-4 text-sm whitespace-nowrap align-top">
                  <SourceLink source={row.source} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {BENCHMARKS.map((row) => (
          <div key={row.label} className="bg-dark-800/50 border border-dark-700 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className={`w-4 h-4 shrink-0 ${row.accent}`} />
              <span className={`text-xl font-bold ${row.accent}`}>{row.value}</span>
            </div>
            <div className="font-semibold text-white text-sm mb-1">{row.label}</div>
            <p className="text-sm text-dark-400 leading-relaxed mb-3">{row.detail}</p>
            <div className="text-xs">
              <SourceLink source={row.source} />
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Why there is no driver ranking here */}
    <div className="mt-6 bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <Lightbulb size={18} className="text-blue-300 shrink-0 mt-0.5" />
        <div className="text-sm text-dark-300 leading-relaxed space-y-2">
          <p>
            <strong className="text-blue-400">Why no ranking of famous drivers?</strong> Because no
            such ranking exists. Race-start reaction times vary from start to start and are not
            published as a standing leaderboard, so any fixed table of names and millisecond values
            would be invented. We could not source dependable figures for elite motorsport or
            professional esports reaction times either, so no rows claim to represent them.
          </p>
          <p>
            One caveat that applies to your own result: a browser measures your reaction{' '}
            <em>plus</em> your screen and input lag. In the study above that hardware cost about
            18&nbsp;ms — the gap between the 213&nbsp;ms corrected mean and the 231&nbsp;ms measured
            mean. Compare your results against yourself on the same device, not against someone
            else's setup.
          </p>
          <p>
            Age matters less than people expect. Across 7,130 UK adults, simple reaction time showed
            little slowing until around age 50, while choice reaction time slowed throughout
            adulthood (<SourceLink source={SOURCES.der} />).
          </p>
        </div>
      </div>
    </div>

    {/* Full citations */}
    <div className="mt-4 border-t border-dark-800 pt-4">
      <h3 className="text-sm font-semibold text-white mb-2">References</h3>
      <ol className="space-y-1.5 text-xs text-dark-400 list-decimal list-inside">
        {Object.values(SOURCES).map((s) => (
          <li key={s.id}>
            {s.text}{' '}
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400/80 hover:text-green-300 underline break-all"
            >
              {s.href}
            </a>
          </li>
        ))}
      </ol>
    </div>

    <div className="mt-6 text-center">
      <Link
        to="/test/reaction-time"
        className="inline-flex items-center gap-2 px-6 py-3 bg-green-500/15 hover:bg-green-500/25 border border-green-500/40 hover:border-green-400 rounded-xl text-green-200 hover:text-white font-semibold transition-all"
      >
        <Zap size={18} />
        Measure your own reaction time
      </Link>
    </div>
  </section>
);

export default ReactionBenchmarks;
