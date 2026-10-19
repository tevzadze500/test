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
  BookOpen,
  Timer,
  Goal,
  Trophy,
  HelpCircle,
  Dumbbell,
  ExternalLink,
  Zap,
} from 'lucide-react';
import SiteFooter from '../components/SiteFooter';
import { benchmarkSources, sportSources, trainingSources } from '../data/references';

/**
 * /blog/reaction-time-crucial — rewritten 2026-10-18.
 *
 * GSC showed every one of the ~50 queries this URL ranked for was a sport
 * question, mostly school PE phrasing ("why is reaction time important in
 * football / netball", "reaction time is crucial for which of the following
 * sports"). The old driving and cognitive-health sections drew no impressions
 * and made uncited health claims, so the article now answers the sport
 * question properly. URL kept to preserve its ranking.
 *
 * Numbers: reaction-time figures come from benchmarkSources; rule distances
 * and thresholds from sportSources. The penalty flight time is plain
 * arithmetic on the cited 11 m distance and is labelled as such.
 */

const TITLE = 'Why Is Reaction Time Important in Sport? Football, Netball & More';
const PATH = '/blog/reaction-time-crucial';

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

const Section = ({ icon: Icon, tint, title, children }) => (
  <div className="bg-dark-900/50 border border-dark-800 rounded-2xl p-6 sm:p-8 mb-8">
    <div className="flex items-center gap-3 mb-4">
      <div className={`w-12 h-12 rounded-xl ${tint} flex items-center justify-center shrink-0`}>
        <Icon className="w-6 h-6" />
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold text-white m-0">{title}</h2>
    </div>
    {children}
  </div>
);

const otherSports = [
  {
    sport: 'Netball',
    text: 'Possession changes in a flash. Defenders react to a pass leaving the thrower’s hands to intercept it, and attackers react to a defender’s shift of weight to dodge free. Because players cannot run with the ball, the whole game is a sequence of quick reactions and quick releases.',
  },
  {
    sport: 'Basketball',
    text: 'Rebounds, steals and blocks are all reactions: to the ball coming off the rim, to a careless dribble, to a shooter starting their motion. Defenders also react to a drive in one direction and have to recover before the attacker gets past.',
  },
  {
    sport: 'Badminton and tennis',
    text: 'Returning a smash or a serve is a race against the shuttle or ball. Players react to the opponent’s racket and body position, not just the object in flight, because waiting to see the shot leaves too little time to reach it.',
  },
  {
    sport: 'Boxing and martial arts',
    text: 'Slipping, blocking and countering a punch all depend on reacting to the first movement of the opponent’s shoulder or hand. Reaction time is the difference between being hit and landing the counter.',
  },
  {
    sport: 'Sprinting',
    text: 'The race starts with a reaction to the gun. The rules are so strict that a reaction faster than 0.100 second after the gun is flagged as a possible false start, because it is treated as anticipation rather than a genuine reaction.',
    source: sportSources.worldAthletics,
  },
  {
    sport: 'Volleyball and cricket',
    text: 'A dig against a spike and a batter facing fast bowling are pure reaction under time pressure. Like goalkeepers, the best players read the attacker’s approach and arm to buy themselves time.',
  },
];

const faqs = [
  {
    question: 'What is reaction time in sport?',
    answer:
      'Reaction time is the time between a stimulus, such as the ball, the starting gun or an opponent’s movement, and the start of your response to it. It is different from movement time: reaction time plus movement time gives your total response time.',
  },
  {
    question: 'Why is reaction time important in football?',
    answer:
      'Football is full of situations where the ball or an opponent changes direction suddenly: a goalkeeper facing a penalty or a deflected shot, a defender reacting to a dribbler’s feint, a striker reacting to a rebound. The faster you start your response, the more time you have to reach the ball or close the space.',
  },
  {
    question: 'When is reaction time used in football?',
    answer:
      'Goalkeepers use it for penalties, close-range shots and deflections. Defenders use it to react to a change of direction or a through ball. Attackers use it to react to rebounds, loose balls and a defender’s mistake. Every player uses it when the ball deflects unexpectedly.',
  },
  {
    question: 'Why is reaction time important in netball?',
    answer:
      'Netball players cannot run with the ball, so possession is won and lost through quick reactions: intercepting a pass, reacting to an opponent’s dodge, and catching and releasing quickly under pressure.',
  },
  {
    question: 'Why do basketball players need reaction time?',
    answer:
      'To win rebounds, make steals and blocks, and recover on defence when an attacker drives. Each of these starts with a reaction to the ball or to the opponent’s first movement.',
  },
  {
    question: 'Reaction time is crucial for which sport: weightlifting, chess, boxing or golf?',
    answer:
      'Boxing. A boxer must respond instantly to an opponent’s punch, an external stimulus they do not control. Weightlifting and golf are self-paced: the athlete decides when to start. Chess involves decision-making over seconds or minutes, not split-second reactions.',
  },
];

function BlogPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-dark-950">
      <Seo
        title={TITLE}
        description="Why reaction time matters in football, netball, basketball, boxing and sprinting, with real examples, the rules behind them, and how to test and improve yours."
        canonical={PATH}
        type="article"
        jsonLd={[
          articleSchema({
            headline: TITLE,
            description:
              'Why reaction time matters in football, netball, basketball, boxing and sprinting, with real examples, the rules behind them, and how to test and improve yours.',
            path: PATH,
            datePublished: '2026-05-01',
            dateModified: '2026-10-18',
          }),
          breadcrumbSchema('Reaction Time in Sport', PATH, { name: 'Blog', path: '/blog' }),
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
            name="Reaction Time in Sport"
            parent={{ name: 'Blog', to: '/blog' }}
            className="mb-6"
          />

          <article className="prose prose-invert max-w-none">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Why Is Reaction Time Important in Sport? Football, Netball, Sprinting &amp; More
            </h1>

            <p className="text-sm text-dark-400 mb-6">
              Updated <time dateTime="2026-10-18">October 18, 2026</time> · Figures and rules are
              cited to their source.
            </p>

            <p className="text-lg text-dark-300 leading-relaxed mb-8">
              In most sports, the action does not wait for you. A ball deflects, an opponent feints,
              a gun fires, and the player who starts responding first usually wins the moment.
              Reaction time is the part of that response you cannot see: the gap between something
              happening and your body starting to move. Here is what it is, why it matters in
              football and other sports, and what you can actually do about yours.
            </p>

            <Section icon={Timer} tint="bg-blue-500/20 text-blue-400" title="What Is Reaction Time in Sport?">
              <p className="text-dark-300 leading-relaxed mb-4">
                <strong className="text-white">Reaction time</strong> is the time between a stimulus
                and the <em>start</em> of your response. In sport the stimulus can be visual (the
                ball, an opponent’s movement), auditory (the starting gun, a whistle, a teammate’s
                call) or even touch (a push in a scrum or a clinch).
              </p>
              <ul className="text-dark-300 leading-relaxed space-y-2 mb-4 list-disc pl-5">
                <li>
                  <strong className="text-white">Reaction time</strong> — stimulus to first movement.
                </li>
                <li>
                  <strong className="text-white">Movement time</strong> — first movement to completing
                  the action, such as the full dive or the full swing.
                </li>
                <li>
                  <strong className="text-white">Response time</strong> — the two added together. This
                  is what decides whether you get there in time.
                </li>
              </ul>
              <p className="text-dark-300 leading-relaxed mb-4">
                There are also two kinds of reaction. <strong className="text-white">Simple reaction</strong>{' '}
                means one stimulus and one planned response, like a sprinter reacting to the gun.{' '}
                <strong className="text-white">Choice reaction</strong> means picking the right response
                among several, like a defender deciding which way a dribbler will go. Choice reaction
                is slower, and it slows more with age (<SourceLink source={benchmarkSources.der} />).
                Most team sports are full of choice reactions.
              </p>
              <p className="text-dark-300 leading-relaxed">
                For scale: the average adult simple reaction to a light, measured on a screen like a
                browser test, is about <strong className="text-white">231 ms</strong>, or
                roughly a quarter of a second (<SourceLink source={benchmarkSources.woods} />).
              </p>
            </Section>

            <Section icon={Goal} tint="bg-green-500/20 text-green-400" title="Why Is Reaction Time Important in Football?">
              <p className="text-dark-300 leading-relaxed mb-4">
                The clearest example is the <strong className="text-white">penalty kick</strong>. The
                penalty mark is 11 metres (12 yards) from goal (<SourceLink source={sportSources.ifabLaw1} />),
                and the goalkeeper must stay on the goal line until the ball is kicked (
                <SourceLink source={sportSources.ifabLaw14} />). A ball struck at 100 km/h covers those
                11 metres in about <strong className="text-white">0.4 seconds</strong>{' '}
                <span className="text-dark-400">(simple arithmetic: 11 m at 27.8 m/s)</span>.
              </p>
              <p className="text-dark-300 leading-relaxed mb-4">
                Now subtract a typical reaction of about a quarter of a second before the keeper even
                starts to move. More than half the ball’s flight is gone, and the dive itself still has
                to happen. That is why goalkeepers do not wait to see the ball: they read the kicker’s
                run-up, hips and standing foot, and start moving as the ball is struck. Reaction time
                still matters, but <strong className="text-white">anticipation</strong> is what buys the
                time to use it.
              </p>
              <h3 className="text-xl font-bold text-white mt-6 mb-3">When is reaction time used in football?</h3>
              <ul className="text-dark-300 leading-relaxed space-y-2 list-disc pl-5">
                <li>
                  <strong className="text-white">Goalkeepers:</strong> penalties, close-range shots,
                  deflections and crosses that change direction late.
                </li>
                <li>
                  <strong className="text-white">Defenders:</strong> reacting to a dribbler’s feint, a
                  through ball or a sudden change of pace. These are choice reactions, the slower kind.
                </li>
                <li>
                  <strong className="text-white">Attackers:</strong> reacting first to a rebound, a loose
                  ball or a defender’s mistake. Many goals come from being a fraction quicker to a
                  ball nobody expected.
                </li>
                <li>
                  <strong className="text-white">Everyone:</strong> reacting to a deflection, a bad
                  bounce, or a teammate’s shout. Sound helps here, because people react faster to
                  sound than to light (<SourceLink source={benchmarkSources.jain} />).
                </li>
              </ul>
            </Section>

            <Section icon={Trophy} tint="bg-amber-500/20 text-amber-400" title="Why Reaction Time Matters in Other Sports">
              <div className="space-y-4">
                {otherSports.map((s) => (
                  <div key={s.sport} className="bg-dark-800/50 border border-dark-700 rounded-xl p-4">
                    <h3 className="text-lg font-bold text-white mb-2 mt-0">{s.sport}</h3>
                    <p className="text-dark-300 text-sm leading-relaxed m-0">
                      {s.text}
                      {s.source && (
                        <>
                          {' '}(<SourceLink source={s.source} />)
                        </>
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </Section>

            <Section icon={HelpCircle} tint="bg-purple-500/20 text-purple-400" title="Which Sports Need Reaction Time the Most?">
              <p className="text-dark-300 leading-relaxed mb-4">
                A useful way to answer this, and a common exam question, is to ask{' '}
                <strong className="text-white">who starts the action</strong>.
              </p>
              <ul className="text-dark-300 leading-relaxed space-y-2 list-disc pl-5 mb-4">
                <li>
                  <strong className="text-white">Externally paced sports</strong> force you to respond to
                  something you do not control: an opponent, a ball, a gun. Boxing, football, netball,
                  tennis, badminton and sprint starts all depend heavily on reaction time.
                </li>
                <li>
                  <strong className="text-white">Self-paced sports</strong> let the athlete decide when to
                  start. Weightlifting, golf, archery and long-distance running rely far less on reaction
                  time.
                </li>
              </ul>
              <p className="text-dark-300 leading-relaxed">
                So if you are asked whether reaction time is crucial for weightlifting, chess, boxing or
                golf, the answer is <strong className="text-white">boxing</strong>. Chess is about
                decisions over seconds or minutes, not split-second reactions.
              </p>
            </Section>

            <Section icon={Dumbbell} tint="bg-cyan-500/20 text-cyan-400" title="Can You Improve Your Reaction Time for Sport?">
              <p className="text-dark-300 leading-relaxed mb-4">
                Partly, and the most trainable part is not raw speed.
              </p>
              <ul className="text-dark-300 leading-relaxed space-y-3 list-disc pl-5">
                <li>
                  <strong className="text-white">Stay active.</strong> Physically active students reacted
                  faster to both light and sound than inactive ones (<SourceLink source={benchmarkSources.jain} />).
                </li>
                <li>
                  <strong className="text-white">Practise the real situation.</strong> Repeating the same
                  stimulus and response makes it more automatic, which is why sport-specific drills
                  beat generic ones.
                </li>
                <li>
                  <strong className="text-white">Train anticipation.</strong> Learning to read cues, such as
                  a kicker’s hips or a server’s toss, starts your response earlier. This is where elite
                  players gain the most.
                </li>
                <li>
                  <strong className="text-white">Sleep.</strong> Short-term sleep loss hits simple attention
                  and reaction tasks harder than almost anything else it affects (
                  <SourceLink source={trainingSources.lim} />).
                </li>
              </ul>
            </Section>

            {/* CTA */}
            <div className="bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-green-500/10 border-2 border-green-500/30 rounded-2xl p-6 sm:p-8 text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Test the Reactions Your Sport Uses
              </h2>
              <p className="text-dark-200 text-lg mb-6 max-w-2xl mx-auto">
                Simple reaction for starts, choice reaction for team sports, anticipation for
                goalkeepers and returners. Free, in your browser.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  to="/sport-test"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 rounded-xl text-white font-bold shadow-lg shadow-green-500/30 transition-all"
                >
                  <Zap size={18} className="shrink-0" />
                  Sports reaction tests
                  <ArrowRight size={18} className="shrink-0" />
                </Link>
                <Link
                  to="/test/go-no-go"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-dark-800 hover:bg-dark-700 border border-dark-700 rounded-xl text-white font-semibold transition-all"
                >
                  Choice reaction (Go/No-Go)
                </Link>
                <Link
                  to="/test/anticipation"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-dark-800 hover:bg-dark-700 border border-dark-700 rounded-xl text-white font-semibold transition-all"
                >
                  Anticipation test
                </Link>
              </div>
              <p className="text-sm text-dark-400 mt-5">
                Got a number? See{' '}
                <Link to="/blog/good-reaction-time-ms" className="text-green-400 hover:text-green-300 underline">
                  whether your reaction time is good
                </Link>
                .
              </p>
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
                {[...Object.values(benchmarkSources), ...Object.values(sportSources), trainingSources.lim].map((s) => (
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
      </main>
      <SiteFooter className="mt-12" Icon={BookOpen} accent="from-blue-500 to-indigo-600" />
    </div>
  );
}

export default BlogPage;
