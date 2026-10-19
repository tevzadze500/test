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
  Monitor,
  Moon,
  Flame,
  Crosshair,
  Ear,
  Gauge,
  Brain,
  ExternalLink,
  Zap,
} from 'lucide-react';
import SiteFooter from '../components/SiteFooter';
import { benchmarkSources, trainingSources } from '../data/references';

/**
 * "How to improve reaction time for gaming" ranked at position ~6.8 in GSC
 * (Sept–Oct 2026) with no page dedicated to it. Same rule as the rest of the
 * site: every figure is cited, or is arithmetic shown on the page (frame
 * times from refresh rates). No claims about caffeine, supplements or
 * "brain training" apps, for which we have no source we would stand behind.
 */

const TITLE = 'How to Improve Reaction Time for Gaming: What Actually Works';
const PATH = '/blog/improve-reaction-time-gaming';
const PUBLISHED = '2026-10-18';

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

const Step = ({ n, icon: Icon, tint, title, children }) => (
  <div className="bg-dark-900/50 border border-dark-800 rounded-2xl p-6 sm:p-8 mb-6">
    <div className="flex items-center gap-3 mb-4">
      <div className={`w-12 h-12 rounded-xl ${tint} flex items-center justify-center shrink-0`}>
        <Icon className="w-6 h-6" />
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold text-white m-0">{`${n}. ${title}`}</h2>
    </div>
    {children}
  </div>
);

// Frame time = 1000 ms / refresh rate. Shown so readers can check it.
const refreshRows = [
  { hz: 60, ms: '16.7' },
  { hz: 144, ms: '6.9' },
  { hz: 240, ms: '4.2' },
  { hz: 360, ms: '2.8' },
];

const faqs = [
  {
    question: 'How can I improve my reaction time for gaming?',
    answer:
      'Start with what is fastest to fix: reduce hardware latency (high refresh rate, wired mouse, low-latency display settings) and get enough sleep. Then warm up before playing, train the type of reaction your game uses, and work on anticipation such as crosshair placement, which turns an average reaction into a first shot.',
  },
  {
    question: 'Does a 144 Hz monitor improve reaction time?',
    answer:
      'It does not change your biology, but it shortens how long you wait to see a change on screen. A new frame arrives every 16.7 ms at 60 Hz and every 6.9 ms at 144 Hz, so in the worst case you see the enemy about 10 ms sooner. That delay counts in every duel.',
  },
  {
    question: 'What is a good reaction time for gaming?',
    answer:
      'On a simple visual browser test, under 231 ms beats the measured adult average and under 213 ms beats the hardware-corrected average (Woods et al., 2015). Under about 190 ms is faster than the laboratory reference for young adults (Jain et al., 2015).',
  },
  {
    question: 'Can you train reaction time, or is it genetic?',
    answer:
      'Both. Your baseline has biological limits and lengthens slowly with age, about half a millisecond a year in adults (Woods et al., 2015). But practice, physical activity and sleep move your everyday number, and anticipation can make your in-game response earlier even when raw reaction time stays the same.',
  },
];

function BlogImproveGamingReactionPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-dark-950">
      <Seo
        title={TITLE}
        description="Cut input lag, sleep, warm up, train anticipation: what really improves your reaction time for Valorant, CS2 and other games, with the evidence behind each step."
        canonical={PATH}
        type="article"
        jsonLd={[
          articleSchema({
            headline: TITLE,
            description:
              'What really improves your reaction time for Valorant, CS2 and other games, with the evidence behind each step.',
            path: PATH,
            datePublished: PUBLISHED,
            dateModified: PUBLISHED,
          }),
          breadcrumbSchema('Improve Reaction Time for Gaming', PATH, { name: 'Blog', path: '/blog' }),
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
            name="Improve Reaction Time for Gaming"
            parent={{ name: 'Blog', to: '/blog' }}
            className="mb-6"
          />

          <article className="prose prose-invert max-w-none">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              How to Improve Your Reaction Time for Gaming: What Actually Works
            </h1>

            <p className="text-sm text-dark-400 mb-6">
              Published <time dateTime={PUBLISHED}>October 18, 2026</time> · Every figure is cited or
              shown as arithmetic.
            </p>

            <p className="text-lg text-dark-300 leading-relaxed mb-8">
              Most advice on gaming reflexes is either obvious or invented. Here is the honest
              version: what you can change, what you cannot, and the order to tackle it in. The quick
              wins are not in your hands at all. They are in your setup.
            </p>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-6 mb-8">
              <h2 className="text-xl font-bold text-white mt-0 mb-3">First, what you can’t change</h2>
              <p className="text-dark-300 leading-relaxed m-0">
                The average adult reacts to a light in about <strong className="text-white">231 ms</strong>{' '}
                on a screen, or 213 ms once hardware delay is removed, and that slows by roughly half a
                millisecond a year (<SourceLink source={benchmarkSources.woods} />). No routine turns a
                240 ms player into a 150 ms one. What you <em>can</em> change is everything around that
                number: the delay your hardware adds, the state you play in, and how early you start
                reacting.
              </p>
            </div>

            <Step n={1} icon={Monitor} tint="bg-purple-500/20 text-purple-400" title="Cut Your Hardware Latency">
              <p className="text-dark-300 leading-relaxed mb-4">
                Your screen and input devices add delay before you even see what you are reacting to. In
                the largest study on the subject, hardware accounted for about{' '}
                <strong className="text-white">18 ms</strong>: the gap between the 231 ms measured mean and
                the 213 ms corrected one (<SourceLink source={benchmarkSources.woods} />). Refresh rate is
                the easiest part to see. A new frame arrives every:
              </p>
              <div className="overflow-x-auto rounded-xl border border-dark-800 mb-4">
                <table className="w-full text-left text-sm">
                  <caption className="sr-only">Time between frames at common refresh rates</caption>
                  <thead>
                    <tr className="bg-dark-900/60 text-dark-400">
                      <th scope="col" className="py-3 px-4 font-semibold">Refresh rate</th>
                      <th scope="col" className="py-3 px-4 font-semibold">Time between frames</th>
                    </tr>
                  </thead>
                  <tbody className="text-dark-300">
                    {refreshRows.map((r) => (
                      <tr key={r.hz} className="border-t border-dark-800">
                        <td className="py-3 px-4 font-bold text-white">{r.hz} Hz</td>
                        <td className="py-3 px-4">{r.ms} ms</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-dark-300 leading-relaxed mb-3">
                Going from 60 Hz to 144 Hz can show you an enemy up to about 10 ms sooner. Simple
                arithmetic: 1,000 ms divided by the refresh rate. Then:
              </p>
              <ul className="text-dark-300 leading-relaxed space-y-2 list-disc pl-5">
                <li>Run the game at a frame rate at or above your refresh rate.</li>
                <li>Use a wired mouse, or a wireless one designed for gaming.</li>
                <li>Turn on your TV’s game mode, and your GPU’s or game’s low-latency mode if it has one.</li>
                <li>Play in exclusive fullscreen where the game allows it.</li>
              </ul>
            </Step>

            <Step n={2} icon={Moon} tint="bg-indigo-500/20 text-indigo-300" title="Sleep Before Ranked">
              <p className="text-dark-300 leading-relaxed">
                A meta-analysis of short-term sleep deprivation found that simple attention and reaction
                tasks were the <em>most</em> affected of every mental ability measured, ahead of working
                memory and reasoning (<SourceLink source={trainingSources.lim} />). In practice that means
                more slow reactions and more moments where you simply miss the cue. If you are tired,
                play unranked.
              </p>
            </Step>

            <Step n={3} icon={Flame} tint="bg-orange-500/20 text-orange-400" title="Warm Up Every Session">
              <p className="text-dark-300 leading-relaxed">
                Your first attempts on any reaction test are usually your slowest, because repeating
                the same stimulus and response makes it more automatic. Use that: five minutes of a{' '}
                <Link to="/" className="text-green-400 hover:text-green-300 underline">reaction time test</Link>{' '}
                and a few aim drills before your first match, rather than warming up in the match itself.
              </p>
            </Step>

            <Step n={4} icon={Crosshair} tint="bg-red-500/20 text-red-400" title="Train Anticipation, Not Just Speed">
              <p className="text-dark-300 leading-relaxed mb-4">
                In tactical shooters, the player who wins a duel is often not the one with the faster
                reaction, but the one who needed less movement after reacting. Crosshair placement at
                head height, pre-aiming common angles and knowing where enemies usually appear all
                shrink the work left to do once you see someone.
              </p>
              <p className="text-dark-300 leading-relaxed">
                The same idea applies everywhere: reading cues starts your response earlier. The{' '}
                <Link to="/test/anticipation" className="text-green-400 hover:text-green-300 underline">anticipation test</Link>{' '}
                trains exactly that, timing a moving target rather than waiting for it.
              </p>
            </Step>

            <Step n={5} icon={Brain} tint="bg-blue-500/20 text-blue-400" title="Train the Reaction Your Game Uses">
              <p className="text-dark-300 leading-relaxed mb-4">
                Not every in-game reaction is the same.
              </p>
              <ul className="text-dark-300 leading-relaxed space-y-2 list-disc pl-5">
                <li>
                  <strong className="text-white">Simple reaction</strong>: something appears, you click.
                  Holding an angle in Valorant or CS2. Train it with the{' '}
                  <Link to="/" className="text-green-400 hover:text-green-300 underline">reaction time test</Link>.
                </li>
                <li>
                  <strong className="text-white">Choice reaction</strong>: deciding before acting, such as
                  shoot or hold, enemy or teammate, build or heal. Slower by nature, and it ages faster (
                  <SourceLink source={benchmarkSources.der} />). Train it with{' '}
                  <Link to="/test/go-no-go" className="text-green-400 hover:text-green-300 underline">Go/No-Go</Link>.
                </li>
                <li>
                  <strong className="text-white">Timing</strong>: hitting a moving target at the right
                  moment, for skillshots or rhythm. Train it with the{' '}
                  <Link to="/test/anticipation" className="text-green-400 hover:text-green-300 underline">anticipation test</Link>.
                </li>
              </ul>
            </Step>

            <Step n={6} icon={Ear} tint="bg-pink-500/20 text-pink-400" title="Use Sound">
              <p className="text-dark-300 leading-relaxed">
                People react faster to sound than to light (<SourceLink source={benchmarkSources.jain} />).
                Footsteps, reloads and ability cues often reach you before the enemy is on screen, so good
                headphones and clear audio settings are a real advantage, not a luxury. Compare your two
                numbers with the{' '}
                <Link to="/test/auditory-reaction" className="text-green-400 hover:text-green-300 underline">auditory reaction test</Link>.
              </p>
            </Step>

            <Step n={7} icon={Zap} tint="bg-green-500/20 text-green-400" title="Move Your Body">
              <p className="text-dark-300 leading-relaxed">
                Physically active students reacted faster to both light and sound than inactive ones (
                <SourceLink source={benchmarkSources.jain} />). Regular exercise is the best-documented
                everyday factor, and short breaks between long sessions help you stay alert.
              </p>
            </Step>

            <Step n={8} icon={Gauge} tint="bg-cyan-500/20 text-cyan-400" title="Measure Properly">
              <p className="text-dark-300 leading-relaxed mb-4">
                Take five attempts, use the average, and always test on the same setup. Comparing your
                number on a 60 Hz laptop with a friend’s on a 240 Hz monitor tells you about the screens,
                not the players. Retest every week or two and watch the trend.
              </p>
              <p className="text-dark-300 leading-relaxed">
                Wondering where you stand? See{' '}
                <Link to="/blog/good-reaction-time-ms" className="text-green-400 hover:text-green-300 underline">
                  is 200 ms a good reaction time?
                </Link>{' '}
                for every bracket, and the{' '}
                <Link to="/gaming-test" className="text-green-400 hover:text-green-300 underline">gaming reaction test</Link>{' '}
                page for Valorant, CS2 and Fortnite.
              </p>
            </Step>

            {/* CTA */}
            <div className="bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-purple-500/5 border-2 border-purple-500/30 rounded-2xl p-6 sm:p-8 text-center my-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Get Your Baseline</h2>
              <p className="text-dark-200 text-lg mb-6 max-w-2xl mx-auto">
                Measure now, change one thing, measure again. That is the whole method.
              </p>
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 rounded-xl text-white text-base font-bold shadow-lg shadow-purple-500/30 transition-all hover:scale-[1.02]"
              >
                <Zap size={18} className="shrink-0" />
                Take the Reaction Time Test
                <ArrowRight size={18} className="shrink-0" />
              </Link>
            </div>

            {/* FAQ */}
            <section aria-labelledby="faq-heading" className="mb-10">
              <h2 id="faq-heading" className="text-2xl sm:text-3xl font-bold text-white mb-6">
                Quick Answers
              </h2>
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <div key={faq.question} className="bg-dark-900/50 border border-dark-800 rounded-xl p-5">
                    <h3 className="text-lg font-semibold text-white mb-2 mt-0">{faq.question}</h3>
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
                {[...Object.values(benchmarkSources), trainingSources.lim].map((s) => (
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

export default BlogImproveGamingReactionPage;
