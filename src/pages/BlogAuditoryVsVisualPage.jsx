import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import MobileTopBar from '../components/MobileTopBar';
import Seo from '../components/Seo';
import Breadcrumb from '../components/Breadcrumb';
import { articleSchema, breadcrumbSchema, faqSchema } from '../utils/structuredData';
import { ArrowLeft, ArrowRight, Volume2, Eye, Zap, Activity, ExternalLink, Headphones, Clock } from 'lucide-react';
import SiteFooter from '../components/SiteFooter';
import { benchmarkSources } from '../data/references';

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

const faqs = [
  {
    question: 'Is auditory reaction time faster than visual reaction time?',
    answer:
      'Yes, virtually every peer-reviewed study confirms that humans react significantly faster to sound than to light. Across healthy adults, simple auditory reaction time averages 140–170 ms, whereas simple visual reaction time averages 180–220 ms — giving sound a 30 to 50 ms advantage.',
  },
  {
    question: 'Why does sound trigger a faster response than light?',
    answer:
      'The difference is biological. The auditory pathway relies on mechanical transduction in the cochlea: sound waves deflect hair cells that open ion channels mechanically, reaching the auditory cortex in just 8–10 ms. In contrast, the retina relies on complex chemical phototransduction (rhodopsin cascade), which takes 20–40 ms just to convert light into an electrical signal.',
  },
  {
    question: 'What is a good auditory reaction time in ms?',
    answer:
      'Under 160 ms is considered elite, under 190 ms is above average, and 190–240 ms is typical for most adults on computer or mobile tests. Hardware latency from headphones or Bluetooth can add 10–30 ms.',
  },
  {
    question: 'Why do track races use a starting gun instead of a light flash?',
    answer:
      'Sprinters react about 40 ms quicker to an auditory gun crack than they would to a visual flash. Because 40 ms corresponds to nearly a third of a metre at full sprint speed, starting on sound gives a fairer and noticeably faster start.',
  },
];

const TITLE = 'Auditory vs Visual Reaction Time: Why Sound Beats Sight by 40 ms';
const DESCRIPTION = 'Why humans react 30–50 ms faster to sound than light: the neural anatomy, peer-reviewed lab benchmarks, and what it means for gaming, sports, and driving.';
const PATH = '/blog/auditory-vs-visual-reaction-time';
const PUBLISHED = '2026-11-01';

export default function BlogAuditoryVsVisualPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-dark-950">
      <Seo
        title={`${TITLE} | ReactionTestPro`}
        description={DESCRIPTION}
        canonical={PATH}
        type="article"
        jsonLd={[
          articleSchema({
            headline: TITLE,
            description: DESCRIPTION,
            path: PATH,
            datePublished: PUBLISHED,
            dateModified: PUBLISHED,
          }),
          breadcrumbSchema('Auditory vs Visual Reaction Time', PATH, { name: 'Blog', path: '/blog' }),
          faqSchema(faqs),
        ]}
      />

      <MobileTopBar
        onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isMenuOpen={isSidebarOpen}
      />

      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <main className="flex-1 overflow-y-auto pt-16 lg:pt-0">
        <div className="max-w-4xl mx-auto p-6 sm:p-8 lg:p-12">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-dark-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            <span>Back to the Blog</span>
          </Link>

          <Breadcrumb
            name="Auditory vs Visual Reaction Time"
            parent={{ name: 'Blog', to: '/blog' }}
            className="mb-6"
          />

          <article className="prose prose-invert max-w-none">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {TITLE}
            </h1>

            <p className="text-sm text-dark-400 mb-6">
              Published <time dateTime={PUBLISHED}>November 1, 2026</time> · Cited with peer-reviewed laboratory research.
            </p>

            <p className="text-lg text-dark-300 leading-relaxed mb-8">
              If you take a standard click test on a green screen, your reaction time will usually land somewhere between <strong className="text-white">200 ms and 250 ms</strong>. But switch the cue from a visual flash to a sudden acoustic beep, and that number drops almost instantly to <strong className="text-white">150 ms to 190 ms</strong>.
            </p>

            <p className="text-dark-300 leading-relaxed mb-8">
              Why do our brains process sound so much faster than vision? Light travels faster than sound in physics, but inside the human nervous system, <strong className="text-white">sound wins every single time</strong>. Here is the anatomical explanation, what published laboratory benchmarks show, and why this gap shapes competitive gaming, sprint starts, and emergency braking.
            </p>

            {/* Comparison Callout Cards */}
            <div className="grid sm:grid-cols-2 gap-4 mb-10 not-prose">
              <div className="bg-dark-900/60 border border-dark-800 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <Volume2 className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-dark-400 font-semibold">Sound (Auditory)</div>
                    <div className="text-2xl font-bold text-white">140 – 170 ms</div>
                  </div>
                </div>
                <p className="text-xs text-dark-300">
                  Signal reaches cortex in <strong>8–10 ms</strong> via direct mechanical transduction.
                </p>
                <Link
                  to="/test/auditory-reaction"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-green-400 hover:text-green-300"
                >
                  Take the Auditory Reaction Test <ArrowRight size={12} />
                </Link>
              </div>

              <div className="bg-dark-900/60 border border-dark-800 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <Eye className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-dark-400 font-semibold">Light (Visual)</div>
                    <div className="text-2xl font-bold text-white">180 – 220 ms</div>
                  </div>
                </div>
                <p className="text-xs text-dark-300">
                  Signal reaches cortex in <strong>20–40 ms</strong> due to multi-step chemical cascades.
                </p>
                <Link
                  to="/test/reaction-time"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300"
                >
                  Take the Visual Reaction Test <ArrowRight size={12} />
                </Link>
              </div>
            </div>

            {/* Section 1: The Physiology */}
            <div className="bg-dark-900/50 border border-dark-800 rounded-2xl p-6 sm:p-8 mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <Activity className="w-6 h-6 text-green-400 shrink-0" />
                The Biology: Mechanical vs. Chemical Transduction
              </h2>
              <p className="text-dark-300 leading-relaxed mb-4">
                The primary reason sound beats light is the <strong className="text-white">transduction mechanism</strong> — how the sensory organ converts physical environmental energy into electrical action potentials that travel through the nervous system.
              </p>
              <div className="space-y-4">
                <div className="bg-dark-800/40 border border-dark-700/60 rounded-xl p-4">
                  <h3 className="text-lg font-bold text-green-400 mb-1">1. The Ear: Instant Mechanical Deflection (~8–10 ms)</h3>
                  <p className="text-sm text-dark-300 leading-relaxed">
                    Sound enters the ear canal as pressure waves vibrating the tympanic membrane and the ossicles. In the cochlea, fluid movement physically pushes stereocilia (microscopic hair cells). This mechanical bending directly pulls open ion channels like a trapdoor, instantly generating an action potential. According to classic neurophysiological work by <SourceLink source={benchmarkSources.kemp} />, an auditory signal arrives at the primary auditory cortex in just <strong className="text-white">8 to 10 milliseconds</strong>.
                  </p>
                </div>
                <div className="bg-dark-800/40 border border-dark-700/60 rounded-xl p-4">
                  <h3 className="text-lg font-bold text-blue-400 mb-1">2. The Eye: Multi-Step Chemical Cascade (~20–40 ms)</h3>
                  <p className="text-sm text-dark-300 leading-relaxed">
                    When a photon strikes your retina, it does not mechanically trigger a nerve. It isomerizes a molecule called retinal within rhodopsin. This triggers a G-protein cascade (transducin), activating phosphodiesterase, breaking down cGMP, and closing sodium channels. This chemical chain reaction takes time: <SourceLink source={benchmarkSources.kemp} /> and later visual neurobiology papers show that a visual stimulus requires <strong className="text-white">20 to 40 milliseconds</strong> just to reach the primary visual cortex (V1).
                  </p>
                </div>
              </div>
              <p className="text-dark-300 leading-relaxed mt-4">
                Before your brain has even begun deciding how to press a button, <strong className="text-white">vision has already lost a 20–30 ms head start</strong> in raw retinal processing time.
              </p>
            </div>

            {/* Section 2: Peer-Reviewed Benchmarks */}
            <div className="bg-dark-900/50 border border-dark-800 rounded-2xl p-6 sm:p-8 mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <Clock className="w-6 h-6 text-blue-400 shrink-0" />
                What the Published Laboratory Studies Show
              </h2>
              <p className="text-dark-300 leading-relaxed mb-4">
                This sensory difference has been replicated across thousands of human subjects in rigorous clinical settings:
              </p>
              <ul className="text-dark-300 leading-relaxed space-y-3 mb-6 list-disc pl-5">
                <li>
                  <strong className="text-white">Jain et al. (2015):</strong> Testing young, healthy medical students with dedicated millisecond-accurate lab apparatus, <SourceLink source={benchmarkSources.jain} /> found mean auditory reaction times of <strong className="text-white">149.8 ms</strong> in males and <strong className="text-white">165.6 ms</strong> in females, compared to visual reaction times of <strong className="text-white">186.2 ms</strong> and <strong className="text-white">204.6 ms</strong>. In both cohorts, sound was faster by 36 to 39 ms.
                </li>
                <li>
                  <strong className="text-white">Woods et al. (2015):</strong> In an automated test battery across 1,469 adults aged 18 to 65, <SourceLink source={benchmarkSources.woods} /> recorded a measured visual mean of 231 ms (hardware delays included) and demonstrated that while both visual and auditory latencies slow by roughly 0.5 ms per year, the auditory advantage remains consistent across every adult decade.
                </li>
              </ul>

              {/* Data Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse">
                  <thead>
                    <tr className="border-b border-dark-700 text-dark-300 text-xs uppercase">
                      <th className="py-3 px-4 font-semibold">Sensory Modality</th>
                      <th className="py-3 px-4 font-semibold">Signal to Cortex</th>
                      <th className="py-3 px-4 font-semibold">Laboratory Benchmark</th>
                      <th className="py-3 px-4 font-semibold">Browser/Screen Test</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dark-800 text-dark-200">
                    <tr>
                      <td className="py-3 px-4 font-medium text-green-400 flex items-center gap-2">
                        <Volume2 size={16} /> Auditory (Sound)
                      </td>
                      <td className="py-3 px-4">8 – 10 ms</td>
                      <td className="py-3 px-4 font-bold text-white">140 – 165 ms</td>
                      <td className="py-3 px-4">160 – 210 ms</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-blue-400 flex items-center gap-2">
                        <Eye size={16} /> Visual (Light)
                      </td>
                      <td className="py-3 px-4">20 – 40 ms</td>
                      <td className="py-3 px-4 font-bold text-white">180 – 205 ms</td>
                      <td className="py-3 px-4">210 – 260 ms</td>
                    </tr>
                    <tr className="bg-dark-800/30 font-semibold text-white">
                      <td className="py-3 px-4">Difference</td>
                      <td className="py-3 px-4 text-green-400">~20 ms faster</td>
                      <td className="py-3 px-4 text-green-400">~35–40 ms faster</td>
                      <td className="py-3 px-4 text-green-400">~30–50 ms faster</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section 3: Real-World Applications */}
            <div className="bg-dark-900/50 border border-dark-800 rounded-2xl p-6 sm:p-8 mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Why 40 ms Matters in the Real World
              </h2>
              <div className="space-y-4 text-dark-300">
                <p className="leading-relaxed">
                  A difference of 40 milliseconds sounds tiny, but at high speeds, 40 milliseconds is enormous:
                </p>
                <div className="grid sm:grid-cols-3 gap-4 not-prose mt-4">
                  <div className="bg-dark-800/50 border border-dark-700/60 rounded-xl p-4">
                    <div className="text-amber-400 font-bold mb-1">Athletics Starts</div>
                    <p className="text-xs text-dark-300 leading-relaxed">
                      At top sprinting speed (10 m/s), 40 ms is <strong>40 centimetres (1.3 feet)</strong> of track advantage. That is why Olympic races use an acoustic starter rather than a strobe light.
                    </p>
                  </div>
                  <div className="bg-dark-800/50 border border-dark-700/60 rounded-xl p-4">
                    <div className="text-purple-400 font-bold mb-1">Esports &amp; FPS Games</div>
                    <p className="text-xs text-dark-300 leading-relaxed">
                      In Valorant and CS2, reacting to an audio footstep or flashbang pull happens nearly 2 frames earlier (at 144 Hz) than reacting to visual pixels peeking a corner.
                    </p>
                  </div>
                  <div className="bg-dark-800/50 border border-dark-700/60 rounded-xl p-4">
                    <div className="text-cyan-400 font-bold mb-1">Highway Driving</div>
                    <p className="text-xs text-dark-300 leading-relaxed">
                      At 110 km/h (68 mph), 40 ms of earlier braking shaves over <strong>1.2 metres</strong> off your stopping distance before collision.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4: Testing Your Own Split */}
            <div className="bg-gradient-to-r from-dark-900 to-dark-800 border-2 border-green-500/30 rounded-2xl p-6 sm:p-8 mb-10 text-center not-prose">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Test Your Own Sound vs. Sight Split
              </h2>
              <p className="text-dark-300 text-sm sm:text-base max-w-xl mx-auto mb-6">
                Are your ears faster than your eyes by the predicted 35–40 ms? Test both on the exact same device and compare your averages:
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/test/auditory-reaction"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-green-500/20"
                >
                  <Headphones size={18} /> Test Auditory Reaction
                </Link>
                <Link
                  to="/test/reaction-time"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-dark-800 hover:bg-dark-700 border border-dark-700 text-white font-bold rounded-xl transition-all"
                >
                  <Eye size={18} /> Test Visual Reaction
                </Link>
              </div>
            </div>

            {/* FAQ Accordion Section */}
            <div className="border-t border-dark-800 pt-8 mb-10">
              <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4 not-prose">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-dark-900/40 border border-dark-800 rounded-xl p-5">
                    <h3 className="text-base font-bold text-white mb-2">{faq.question}</h3>
                    <p className="text-sm text-dark-300 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Scientific References */}
            <div className="border-t border-dark-800 pt-8 text-xs text-dark-400 space-y-2">
              <p className="font-semibold uppercase tracking-wider text-dark-300">Cited Academic References:</p>
              <p>1. {benchmarkSources.jain.text} <SourceLink source={benchmarkSources.jain} /></p>
              <p>2. {benchmarkSources.kemp.text} <SourceLink source={benchmarkSources.kemp} /></p>
              <p>3. {benchmarkSources.woods.text} <SourceLink source={benchmarkSources.woods} /></p>
            </div>
          </article>
        </div>
        <SiteFooter className="mt-12" />
      </main>
    </div>
  );
}
