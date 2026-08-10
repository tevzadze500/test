import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Eye, Clock, Palette, AlertTriangle, Info } from 'lucide-react';
import ColorBlindTestArea from '../components/test/ColorBlindTestArea';
import ColorBlindStatsCard from '../components/test/ColorBlindStatsCard';
import Seo from '../components/Seo';
import Breadcrumb from '../components/Breadcrumb';
import { webApplicationSchema, breadcrumbSchema, faqSchema, medicalWebPageSchema } from '../utils/structuredData';
import SiteFooter from '../components/SiteFooter';
import TrustBlock, { MedicalDisclaimerBanner } from '../components/TrustBlock';
import RelatedTests from '../components/RelatedTests';
import { colorBlindReferences, LAST_UPDATED } from '../data/references';

const ColorBlindTestPage = () => {
  const [stats, setStats] = useState({
    bestScore: null,
    latestScore: null,
    averageScore: null,
    attempts: 0,
    allScores: [],
  });

  useEffect(() => {
    const savedStats = localStorage.getItem('colorBlindTestStats');
    if (savedStats) {
      try {
        setStats(JSON.parse(savedStats));
      } catch (e) {
        console.error('Failed to parse stats:', e);
      }
    }
  }, []);

  useEffect(() => {
    if (stats.attempts > 0) {
      localStorage.setItem('colorBlindTestStats', JSON.stringify(stats));
    }
  }, [stats]);

  const handleResult = ({ score }) => {
    setStats((prevStats) => {
      const newScores = [...prevStats.allScores, score];
      const newBest = prevStats.bestScore ? Math.max(prevStats.bestScore, score) : score;
      const newAverage = Math.round(newScores.reduce((sum, s) => sum + s, 0) / newScores.length);
      return {
        bestScore: newBest,
        latestScore: score,
        averageScore: newAverage,
        attempts: prevStats.attempts + 1,
        allScores: newScores,
      };
    });
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all your color blindness test stats?')) {
      setStats({ bestScore: null, latestScore: null, averageScore: null, attempts: 0, allScores: [] });
      localStorage.removeItem('colorBlindTestStats');
    }
  };

  const faqs = [
    {
      question: 'What is an Ishihara-style color blindness test?',
      answer:
        'It is a screening test made of plates filled with colored dots, each hiding a number or shape. People with normal color vision can read the figure easily, while those with a color vision deficiency see a different number or none at all.',
    },
    {
      question: 'What are the main types of color blindness?',
      answer:
        'The most common is red-green deficiency (protanopia/protanomaly and deuteranopia/deuteranomaly). Blue-yellow deficiency (tritanopia/tritanomaly) is rarer, and total color blindness (achromatopsia), where the world appears in shades of gray, is very rare.',
    },
    {
      question: 'Who is most likely to be color blind?',
      answer:
        'Red-green color blindness is largely inherited and X-linked, so it affects roughly 8% of males but under 1% of females. Blue-yellow deficiency affects males and females about equally.',
    },
    {
      question: 'Can an online test diagnose color blindness?',
      answer:
        'No. This is a quick screening tool, not a medical diagnosis. Screen brightness, ambient lighting, and display calibration can affect your results, so see an eye care professional for a definitive assessment.',
    },
  ];

  return (
    <div className="min-h-screen bg-dark-950">
      <Seo
        title="Color Blind Test – Ishihara-Style Plates | ReactionTestPro"
        description="Screen for red-green color vision deficiency with Ishihara-style plates. Free three-minute test with instant results — check your color vision now."
        canonical="/test/color-blind"
        jsonLd={[
          webApplicationSchema({
            name: 'Color Blindness Test',
            description:
              'Free online color blindness test that detects color vision deficiencies with Ishihara-style plates.',
            path: '/test/color-blind',
            category: 'HealthApplication',
          }),
          breadcrumbSchema('Color Blindness Test', '/test/color-blind'),
          medicalWebPageSchema({
            name: 'Color Blindness Test',
            description: 'A colour vision screening using coloured-dot plates. Educational only: display calibration and ambient lighting affect the result, so this is not a clinical colour vision assessment.',
            path: '/test/color-blind',
            lastReviewed: LAST_UPDATED,
          }),
          faqSchema(faqs),
        ]}
      />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-dark-900/95 backdrop-blur-sm border-b border-dark-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link
                to="/"
                aria-label="ReactionTestPro home"
                className="flex items-center gap-3 group rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center">
                  <Palette size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">ReactionTestPro</p>
                  <p className="text-xs text-dark-400">Quick screening</p>
                </div>
              </Link>
              <div className="h-8 w-px bg-dark-800" />
              <Link
                to="/"
                className="flex items-center gap-2 px-4 py-2 text-dark-400 hover:text-white hover:bg-dark-800 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
              >
                <ArrowLeft size={16} />
                <span className="text-sm font-medium">Back to Home</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center gap-4">
              {stats.attempts > 0 && (
                <div className="flex items-center gap-2 px-4 py-2 bg-dark-800 rounded-lg">
                  <Eye size={16} className="text-purple-500" />
                  <div className="text-xs">
                    <div className="text-dark-400">Best</div>
                    <div className="text-white font-bold">{stats.bestScore}%</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 lg:py-12">
        <Breadcrumb name="Color Blindness Test" className="mb-4" />
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-lg">
              <Palette size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">Color Blindness Test</h1>
              <p className="text-dark-400 mt-1">Detect color vision deficiencies</p>
            </div>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-dark-800/50 rounded-lg border border-dark-700">
              <Clock size={14} className="text-blue-400" />
              <span className="text-white">3 min</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-dark-800/50 rounded-lg border border-dark-700">
              <Info size={14} className="text-dark-400" />
              <span className="text-white">Colour display required</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-dark-800/50 rounded-lg border border-dark-700">
              <Palette size={14} className="text-purple-400" />
              <span className="text-purple-400 font-medium">Color Display</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-dark-800/50 rounded-lg border border-dark-700">
              <span className="text-white font-medium">Quick</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-dark-800/50 rounded-lg border border-dark-700">
              <span className="text-dark-400">Difficulty:</span>
              <span className="text-green-400 font-medium">Easy</span>
            </div>
          </div>
        </div>

        <MedicalDisclaimerBanner>
          This is a screening tool, not a clinical colour vision assessment. Screen brightness,
          ambient lighting and display calibration all affect the result — only an eye care
          professional can assess your colour vision properly.
        </MedicalDisclaimerBanner>

        {/* Test Area + Stats */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <ColorBlindTestArea onResult={handleResult} />
          </div>
          <div className="lg:col-span-1">
            <ColorBlindStatsCard stats={stats} onReset={handleReset} />
          </div>
        </div>

        {/* Informational Content */}
        <div className="border-t border-dark-800 pt-12 space-y-8">
          <section>
            <h2 className="text-3xl font-bold text-white mb-4">About the Color Blindness Test</h2>
            <p className="text-dark-300 text-lg leading-relaxed">
              This test uses Ishihara-style color plates to screen for color vision deficiencies. Each plate contains a pattern of colored dots with a number hidden within. People with normal color vision can easily identify the numbers, while those with color blindness may struggle with certain plates.
            </p>
          </section>

          <section className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Types of Color Blindness</h3>
            <div className="grid md:grid-cols-3 gap-6 text-dark-300">
              <div className="bg-dark-800/50 rounded-xl p-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 mb-3" />
                <h4 className="text-white font-semibold mb-2">Red-Green</h4>
                <p className="text-sm">The most common type, affecting ~8% of males. Difficulty distinguishing red and green hues.</p>
              </div>
              <div className="bg-dark-800/50 rounded-xl p-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-yellow-500 mb-3" />
                <h4 className="text-white font-semibold mb-2">Blue-Yellow</h4>
                <p className="text-sm">Less common, affects both males and females equally. Difficulty with blue and yellow tones.</p>
              </div>
              <div className="bg-dark-800/50 rounded-xl p-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-400 to-gray-600 mb-3" />
                <h4 className="text-white font-semibold mb-2">Total (Achromatopsia)</h4>
                <p className="text-sm">Very rare. Complete inability to see color — the world appears in shades of gray.</p>
              </div>
            </div>
          </section>

          <section className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Understanding Your Results</h3>
            <div className="space-y-3 text-dark-300">
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span><strong className="text-white">90-100%:</strong> Normal color vision — you can distinguish colors well</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span><strong className="text-white">75-89%:</strong> Mostly normal — minor variations, likely not clinically significant</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-1">•</span>
                  <span><strong className="text-white">50-74%:</strong> Mild deficiency — consider a professional eye exam</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span><strong className="text-white">Below 50%:</strong> Significant deficiency — consult an eye care specialist</span>
                </li>
              </ul>
              <p className="text-sm text-dark-400 mt-4 flex items-start gap-2">
                <AlertTriangle size={16} className="text-orange-400 shrink-0 mt-0.5" />
                <span>This is a screening tool only and not a medical diagnosis. Screen brightness, ambient lighting, and display calibration can affect results.</span>
              </p>
            </div>
          </section>

          <section className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Tips for Accurate Results</h3>
            <ul className="space-y-2 text-dark-300 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-purple-500">•</span>
                <span>Use a well-calibrated color display (not a low-quality screen)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500">•</span>
                <span>Take the test in good lighting — avoid glare on your screen</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500">•</span>
                <span>Don't wear tinted glasses or sunglasses during the test</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500">•</span>
                <span>Answer quickly based on your first impression</span>
              </li>
            </ul>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-5"
                >
                  <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                  <p className="text-dark-300 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <div className="max-w-7xl mx-auto px-6 pb-12">
        <TrustBlock
          lastUpdated={LAST_UPDATED}
          references={colorBlindReferences}
          methodology="The screening shows coloured-dot plates in which a digit is formed from dots that differ from the background only in hue. This is the same format as the plate tests used in clinical screening, rendered on your own uncalibrated display — which is why it can suggest a possible deficiency but cannot measure one."
        />
        <RelatedTests ids={['vision-test', 'hearing-test', 'reaction-time']} />
      </div>
      <SiteFooter className="mt-12" Icon={Palette} accent="from-purple-500 to-violet-600" />
    </div>
  );
};

export default ColorBlindTestPage;
