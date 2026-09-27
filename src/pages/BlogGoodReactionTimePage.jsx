import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import MobileTopBar from '../components/MobileTopBar';
import Seo from '../components/Seo';
import Breadcrumb from '../components/Breadcrumb';
import { articleSchema, breadcrumbSchema, faqSchema } from '../utils/structuredData';
import {
  ArrowLeft,
  ArrowRight,
  Gauge,
  CheckCircle2,
  HelpCircle,
  MonitorSmartphone,
  BarChart3,
  ExternalLink,
  Zap,
} from 'lucide-react';
import SiteFooter from '../components/SiteFooter';
import { benchmarkSources } from '../data/references';

/**
 * "Is X ms a good reaction time?" — the question every result screen raises,
 * and the one people type into Google with their own number in it.
 *
 * Same rule as the rest of the site: every figure is cited to Woods 2015,
 * Jain 2015 or Der & Deary 2006. Verdicts are stated relative to those
 * published means, never as invented percentiles.
 */

const TITLE = 'Is 200 ms a Good Reaction Time? Benchmarks 100–400 ms';
const PATH = '/blog/good-reaction-time-ms';
const PUBLISHED = '2026-09-27';

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

// One row per bracket. `source` names the benchmarkSources entry the verdict
// leans on; a row without one only restates what the cited rows establish.
const brackets = [
  {
    range: 'Under 150 ms',
    verdict: 'Suspiciously fast',
    accent: 'text-purple-400',
    why: 'Below what adults produce even under laboratory conditions (~190 ms). A browser test adds 20–50 ms of hardware lag on top, so a single sub-150 ms click almost always means you anticipated the signal. Repeat five times and trust the average.',
    source: 'jain',
  },
  {
    range: '150–189 ms',
    verdict: 'Excellent',
    accent: 'text-green-400',
    why: 'Faster than the ~190 ms laboratory reference for college-age adults reacting to a light stimulus.',
    source: 'jain',
  },
  {
    range: '190–212 ms',
    verdict: 'Very good',
    accent: 'text-green-400',
    why: 'Faster than the 213 ms hardware-corrected mean measured across 1,469 adults aged 18–65.',
    source: 'woods',
  },
  {
    range: '213–230 ms',
    verdict: 'Good',
    accent: 'text-cyan-400',
    why: 'Between the corrected mean (213 ms) and the mean as actually measured (231 ms) — and a browser records the measured kind.',
    source: 'woods',
  },
  {
    range: '231–260 ms',
    verdict: 'Average',
    accent: 'text-blue-400',
    why: 'At or just above the 231 ms measured adult mean. The oldest band in the same study, 59–65, averaged 239 ms.',
    source: 'woods',
  },
  {
    range: '261–300 ms',
    verdict: 'A little slow — check the setup',
    accent: 'text-yellow-400',
    why: 'Further above the mean than the entire 18-to-65 age effect (about 21 ms). The usual culprits are a laggy display, a touchscreen, fatigue, or a first attempt.',
    source: 'woods',
  },
  {
    range: '301–400 ms',
    verdict: 'Slow for a simple test, normal for a choice test',
    accent: 'text-orange-400',
    why: 'Tests that make you decide before you respond, like Go/No-Go, run slower by design: choice reaction time is longer than simple reaction time and slows more with age. On a plain click test, retest when fresh.',
    source: 'der',
  },
  {
    range: 'Over 400 ms',
    verdict: 'Something else is going on',
    accent: 'text-red-400',
    why: 'Distraction, heavy input lag, or a test that requires a decision. Not a verdict on your reflexes until you have five clean attempts on the same device.',
    source: null,
  },
];

const faqs = [
  {
    question: 'Is 200 ms a good reaction time?',
    answer:
      'Yes. 200 ms is faster than the 213 ms hardware-corrected adult mean and the 231 ms measured mean reported by Woods et al. (2015) across 1,469 adults aged 18–65, and faster than the 217.8 ms average of their youngest band (18–24). On a browser test it is a very good result.',
  },
  {
    question: 'Is 231 ms a good reaction time?',
    answer:
      '231 ms is exactly the average adult reaction time as actually measured, hardware lag included, in Woods et al. (2015). A browser test records the same kind of number, so 231 ms is average: neither slow nor fast.',
  },
  {
    question: 'Is 170 ms a good reaction time?',
    answer:
      'Excellent. 170 ms beats the ~190 ms laboratory reference for college-age adults (Jain et al., 2015). If you got it on a browser test, confirm it over five attempts: single sub-180 ms clicks are often anticipation rather than reaction.',
  },
  {
    question: 'Is 250 ms a good reaction time?',
    answer:
      'Roughly average. 250 ms is 19 ms above the 231 ms measured adult mean, about the difference a 60 Hz monitor, a touchscreen or a poor night of sleep makes. Retest on a fast device when fresh before reading anything into it.',
  },
  {
    question: 'Is 300 ms or 350 ms a good reaction time?',
    answer:
      'On a simple visual click test, 300–350 ms is slow for an adult: more than 60 ms above the measured mean. It is common on phones, when tired, on a first attempt, or on choice tests such as Go/No-Go, which are slower by design. Check your setup and take five attempts.',
  },
  {
    question: 'What is the average reaction time in ms?',
    answer:
      'For simple visual reaction time in adults: 213 ms after removing hardware delay, 231 ms as actually measured (Woods et al., 2015, 1,469 participants). The classic laboratory reference for young adults is about 190 ms (Jain et al., 2015).',
  },
];

function BlogGoodReactionTimePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-dark-950">
      <Seo
        title={TITLE}
        description="Is 200 ms good? Is 250? Is 300? What every reaction time from 100 to 400 ms means against the cited adult averages of 213 and 231 ms, and why your device shifts the verdict."
        canonical={PATH}
        type="article"
        jsonLd={[
          articleSchema({
            headline: TITLE,
            description:
              'What every reaction time from 100 to 400 ms means against the cited adult averages of 213 and 231 ms, and why your device shifts the verdict.',
            path: PATH,
            datePublished: PUBLISHED,
            dateModified: PUBLISHED,
          }),
          breadcrumbSchema('Is 200 ms a Good Reaction Time?', PATH, { name: 'Blog', path: '/blog' }),
          faqSchema(faqs),
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
            name="Is 200 ms a Good Reaction Time?"
            parent={{ name: 'Blog', to: '/blog' }}
            className="mb-6"
          />

          <article className="prose prose-invert max-w-none">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Is 200 ms a Good Reaction Time? What Every Number From 100 to 400 ms Means
            </h1>

            <p className="text-sm text-dark-400 mb-6">
              Published <time dateTime={PUBLISHED}>September 27, 2026</time> · Every figure below is
              cited to a peer-reviewed source.
            </p>

            <p className="text-lg text-dark-300 leading-relaxed mb-8">
              Short answer: <strong className="text-white">yes, 200 ms is a good reaction time.</strong>{' '}
              It beats both published adult averages — 213 ms with hardware lag removed, 231 ms as
              actually measured — and even the average of the youngest adults in the largest study
              on the subject. But you probably did not land on exactly 200. Here is the verdict for
              every bracket, and why the same number can be excellent on one device and merely
              average on another.
            </p>

            {/* Verdict table */}
            <div className="bg-dark-900/50 border border-dark-800 rounded-2xl p-6 sm:p-8 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center shrink-0">
                  <Gauge className="w-6 h-6 text-green-400" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white m-0">
                  The Verdict, Bracket by Bracket
                </h2>
              </div>
              <p className="text-dark-300 leading-relaxed mb-5">
                These bands apply to a <em>simple visual</em> reaction test — one signal, one click —
                taken in a browser. Each verdict is anchored to a cited study; none of them is a
                made-up percentile.
              </p>
              <div className="overflow-x-auto rounded-xl border border-dark-800">
                <table className="w-full text-left text-sm">
                  <caption className="sr-only">
                    Reaction time brackets in milliseconds with a verdict and the cited reason
                  </caption>
                  <thead>
                    <tr className="bg-dark-900/60 text-dark-400">
                      <th scope="col" className="py-3 px-4 font-semibold whitespace-nowrap">Your time</th>
                      <th scope="col" className="py-3 px-4 font-semibold whitespace-nowrap">Verdict</th>
                      <th scope="col" className="py-3 px-4 font-semibold">Why</th>
                    </tr>
                  </thead>
                  <tbody className="text-dark-300">
                    {brackets.map((row) => (
                      <tr key={row.range} className="border-t border-dark-800 align-top">
                        <td className={`py-3 px-4 font-bold whitespace-nowrap ${row.accent}`}>{row.range}</td>
                        <td className="py-3 px-4 font-semibold text-white">{row.verdict}</td>
                        <td className="py-3 px-4 leading-relaxed">
                          {row.why}
                          {row.source && (
                            <>
                              {' '}
                              (<SourceLink source={benchmarkSources[row.source]} />)
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 200 ms */}
            <div className="bg-dark-900/50 border border-dark-800 rounded-2xl p-6 sm:p-8 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-blue-400" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white m-0">
                  Is 200 ms a Good Reaction Time?
                </h2>
              </div>
              <p className="text-dark-300 leading-relaxed mb-4">
                Yes, and comfortably so. <SourceLink source={benchmarkSources.woods} /> measured
                simple visual reaction time in{' '}
                <strong className="text-white">1,469 adults aged 18 to 65</strong> and reported two
                averages: <strong className="text-white">231 ms</strong> as recorded, and{' '}
                <strong className="text-white">213 ms</strong> once the delay of the display and input
                device was removed. Their youngest band, 18 to 24, averaged{' '}
                <strong className="text-white">217.8 ms</strong>. A genuine 200 ms is faster than all
                three.
              </p>
              <p className="text-dark-300 leading-relaxed">
                The one figure it does not beat is the classic laboratory reference for college-age
                adults, around <strong className="text-white">190 ms</strong> (
                <SourceLink source={benchmarkSources.jain} />) — measured with dedicated equipment
                and none of the lag a browser adds. Which brings us to the catch.
              </p>
            </div>

            {/* 250 / 300 */}
            <div className="bg-dark-900/50 border border-dark-800 rounded-2xl p-6 sm:p-8 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
                  <HelpCircle className="w-6 h-6 text-amber-400" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white m-0">
                  Is 250 ms Good? Is 300 ms?
                </h2>
              </div>
              <p className="text-dark-300 leading-relaxed mb-4">
                <strong className="text-white">250 ms is roughly average.</strong> It sits 19 ms
                above the measured adult mean of 231 ms — about what a 60 Hz office monitor, a
                touchscreen, or a poor night of sleep costs. In the same study, four decades of aging
                cost only about 21 ms (<SourceLink source={benchmarkSources.woods} />), so a 250 ms
                result on a slow setup and a 230 ms result on a fast one may well be the same person.
              </p>
              <p className="text-dark-300 leading-relaxed">
                <strong className="text-white">300 ms is slow for a simple visual test</strong> —
                nearly 70 ms above the measured mean — but it is not automatically a verdict on your
                reflexes. It is common on phones, on a first attempt, and at the end of a
                screen-heavy day. It is also perfectly normal on tests that make you{' '}
                <em>decide</em> before you respond: across more than 7,000 UK adults,{' '}
                <SourceLink source={benchmarkSources.der} /> found choice reaction time both longer
                than simple reaction time and steeper in its decline with age. If your 300 ms came
                from the{' '}
                <Link to="/test/go-no-go" className="text-green-400 hover:text-green-300 underline">Go/No-Go test</Link>,
                compare it with other Go/No-Go results, not with this table.
              </p>
            </div>

            {/* 213 vs 231 */}
            <div className="bg-dark-900/50 border border-dark-800 rounded-2xl p-6 sm:p-8 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0">
                  <BarChart3 className="w-6 h-6 text-purple-400" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white m-0">
                  Why 213 ms and 231 ms Are Both Called "the Average"
                </h2>
              </div>
              <p className="text-dark-300 leading-relaxed mb-4">
                They come from the same participants. <SourceLink source={benchmarkSources.woods} />{' '}
                recorded 231 ms on their apparatus, then estimated how much of that was the screen
                and the button rather than the human, and subtracted it: 213 ms. When a site quotes
                an "average" without saying which one, or quotes 250 or 284 ms with no source at all,
                it is decoration, not data.
              </p>
              <p className="text-dark-300 leading-relaxed">
                For your own result the rule is simple: a browser test measures you <em>plus</em>{' '}
                your hardware, exactly as the study's raw figure did. So compare against{' '}
                <strong className="text-white">231 ms</strong>, not 213.
              </p>
            </div>

            {/* Device */}
            <div className="bg-dark-900/50 border border-dark-800 rounded-2xl p-6 sm:p-8 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center shrink-0">
                  <MonitorSmartphone className="w-6 h-6 text-cyan-400" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white m-0">
                  Why Your Device Changes the Verdict
                </h2>
              </div>
              <p className="text-dark-300 leading-relaxed mb-4">
                Display latency, refresh rate, browser scheduling and mouse or touchscreen lag add
                roughly <strong className="text-white">20 to 50 ms</strong> to whatever your nervous
                system does. That spread is larger than the whole 18-to-65 age effect, and it is why
                the brackets above are wide rather than exact. A 144 Hz monitor with a wired mouse
                will read 20 ms or more faster than a laptop trackpad — for the same reflexes.
              </p>
              <p className="text-dark-300 leading-relaxed">
                State matters too. Sleep, alertness, caffeine and time of day all shift results
                between sessions, and reactions to sound are systematically faster than reactions
                to light (<SourceLink source={benchmarkSources.jain} />), so an{' '}
                <Link to="/test/auditory-reaction" className="text-green-400 hover:text-green-300 underline">auditory result</Link>{' '}
                belongs on a different scale from a visual one.
              </p>
            </div>

            {/* Trustworthy number */}
            <div className="bg-dark-900/50 border border-dark-800 rounded-2xl p-6 sm:p-8 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center shrink-0">
                  <Zap className="w-6 h-6 text-green-400" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white m-0">
                  How to Get a Number Worth Judging
                </h2>
              </div>
              <ol className="text-dark-300 leading-relaxed space-y-3 list-decimal pl-5 mb-4">
                <li>
                  Take the{' '}
                  <Link to="/test/reaction-time" className="text-green-400 hover:text-green-300 underline">average reaction time test</Link>{' '}
                  at least <strong className="text-white">five times</strong> and use the average.
                  One fast click is often anticipation; one slow click is often distraction.
                </li>
                <li>
                  Read the verdict against <strong className="text-white">231 ms</strong>, the
                  measured mean, because your browser number includes hardware lag just as the
                  study's raw figure did.
                </li>
                <li>
                  Retest on the <strong className="text-white">same device</strong> every few weeks.
                  Your trend is the signal; the difference between your setup and someone else's is
                  noise.
                </li>
              </ol>
              <p className="text-dark-300 leading-relaxed">
                Curious how much age really moves the number? Less than you think —{' '}
                <Link to="/blog/average-reaction-time-by-age" className="text-green-400 hover:text-green-300 underline">the cited figures by age</Link>{' '}
                are in their own guide.
              </p>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-green-500/10 border-2 border-green-500/30 rounded-2xl p-6 sm:p-8 text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Get Your Own Number
              </h2>
              <p className="text-dark-200 text-lg mb-6 max-w-2xl mx-auto">
                Thirty seconds, five attempts, no signup. Then come back to the table above.
              </p>
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 rounded-xl text-white text-base font-bold shadow-lg shadow-green-500/30 transition-all hover:scale-[1.02]"
              >
                <Zap size={18} className="shrink-0" />
                Take the Reaction Time Test
                <ArrowRight size={18} className="shrink-0" />
              </Link>
            </div>

            {/* FAQ */}
            <section aria-labelledby="faq-heading" className="mb-10">
              <h2 id="faq-heading" className="text-2xl sm:text-3xl font-bold text-white mb-6">
                Quick Answers by Number
              </h2>
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <div
                    key={faq.question}
                    className="bg-dark-900/50 border border-dark-800 rounded-xl p-5"
                  >
                    <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                    <p className="text-dark-300 leading-relaxed m-0">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>

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

export default BlogGoodReactionTimePage;
