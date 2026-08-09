import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Bug, BookOpen, Shield } from 'lucide-react';
import LegalLayout, { LegalSection, Placeholder } from '../components/LegalLayout';
import { SITE_NAME, infoPageSchema } from '../utils/structuredData';
import { CONTACT_EMAIL } from '../data/site';

const LAST_UPDATED = '2026-08-09';

const REASONS = [
  {
    Icon: Bug,
    title: 'Something is broken',
    body: 'A test misbehaves, a score looks wrong, or a page fails on your device. Tell us your browser and device — timing bugs are usually specific to one setup.',
  },
  {
    Icon: BookOpen,
    title: 'A correction',
    body: 'A cited source is wrong, out of date, or does not say what we claim it says. Corrections to factual content are the most useful message you can send.',
  },
  {
    Icon: Shield,
    title: 'Privacy or legal',
    body: 'Questions about the Privacy Policy or Terms of Use, or a rights request. Note that no personal data is held on any server.',
  },
];

const ContactPage = () => (
  <LegalLayout
    title={`Contact | ${SITE_NAME}`}
    description="Get in touch with ReactionTestPro about a bug, a correction to a cited source, or a privacy question."
    canonical="/contact"
    jsonLd={infoPageSchema({ name: 'Contact', description: `${SITE_NAME} — contact`, path: '/contact', type: 'ContactPage' })}
    heading="Contact"
    intro="This is a small site with no support team, but every message is read. Bug reports and factual corrections are especially welcome."
    lastUpdated={LAST_UPDATED}
  >
    <LegalSection title="Email">
      <div className="rounded-xl border border-dark-700 bg-dark-900/60 p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/20">
            <Mail size={20} className="text-white" strokeWidth={2.2} />
          </div>
          <div className="min-w-0">
            {CONTACT_EMAIL ? (
              <>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-lg font-bold text-green-400 hover:text-green-300 underline break-all"
                >
                  {CONTACT_EMAIL}
                </a>
                <p className="text-sm text-dark-400 mt-1">
                  We aim to reply within a few days.
                </p>
              </>
            ) : (
              <p className="text-base font-semibold text-white mb-1">
                <Placeholder>your contact email address</Placeholder>
              </p>
            )}
          </div>
        </div>
      </div>
    </LegalSection>

    <LegalSection title="What to write about">
      <div className="grid sm:grid-cols-1 gap-3">
        {REASONS.map(({ Icon, title, body }) => (
          <div
            key={title}
            className="flex items-start gap-3 rounded-xl border border-dark-800 bg-dark-900/40 p-4"
          >
            <Icon size={18} className="text-green-400 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-white text-sm mb-1">{title}</p>
              <p className="text-sm text-dark-300 leading-relaxed">{body}</p>
            </div>
          </div>
        ))}
      </div>
    </LegalSection>

    <LegalSection title="What we cannot help with">
      <p>
        We cannot interpret your results, tell you whether you have ADHD, a vision or colour vision
        deficiency, or hearing loss, or offer any medical opinion. The tests here are educational
        screening tools and nothing more — for anything health-related, please speak to a qualified
        professional. See the{' '}
        <Link to="/terms" className="text-green-400 hover:text-green-300 underline">Terms of Use</Link>{' '}
        for the full position.
      </p>
    </LegalSection>
  </LegalLayout>
);

export default ContactPage;
