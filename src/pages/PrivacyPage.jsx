import React from 'react';
import { Link } from 'react-router-dom';
import LegalLayout, { LegalSection, LegalCallout } from '../components/LegalLayout';
import { SITE_NAME, SITE_URL, infoPageSchema } from '../utils/structuredData';
import { OWNER_DESCRIPTOR, JURISDICTION } from '../data/site';

const LAST_UPDATED = '2026-08-09';

/**
 * Every claim on this page was verified against the source before being
 * written: there are no analytics scripts, no cookies and no outbound network
 * requests anywhere in the app, and the localStorage keys below are the
 * complete list. If that ever changes, this page must change with it.
 */
const STORAGE_KEYS = [
  { key: 'reactionTimeStats', label: 'Reaction Time Test' },
  { key: 'f1ReactionStats', label: 'Start Lights Reaction Test' },
  { key: 'hearingTestStats', label: 'Hearing Test' },
  { key: 'colorBlindTestStats', label: 'Color Blindness Test' },
  { key: 'workingMemoryStats', label: 'Working Memory Test' },
  { key: 'anticipationStats', label: 'Anticipation Test' },
  { key: 'auditoryReactionStats', label: 'Auditory Reaction Test' },
];

const PrivacyPage = () => (
  <LegalLayout
    title={`Privacy Policy | ${SITE_NAME}`}
    description="How ReactionTestPro handles data: every test runs in your browser, with no accounts, cookies or analytics. Read the full privacy policy for details."
    canonical="/privacy"
    jsonLd={infoPageSchema({ name: 'Privacy Policy', description: `${SITE_NAME} — privacy policy`, path: '/privacy', type: 'WebPage' })}
    heading="Privacy Policy"
    intro="This policy describes exactly what happens to your data when you use this site. It is written to match how the site actually works, not to cover every hypothetical."
    lastUpdated={LAST_UPDATED}
  >
    <LegalCallout title="The short version" tone="green">
      <p>
        Every test runs entirely inside your browser. Your answers, scores and reaction times are
        never transmitted to us or to anyone else. We do not use cookies, we do not run analytics,
        and there is nothing to sign up for.
      </p>
    </LegalCallout>

    <LegalSection title="1. Who is responsible for this site">
      <p>
        {SITE_NAME} ({SITE_URL}) is operated as {OWNER_DESCRIPTOR}. For any privacy
        question you can reach us via the <Link to="/contact" className="text-green-400 hover:text-green-300 underline">contact page</Link>.
      </p>
    </LegalSection>

    <LegalSection title="2. What we do not collect">
      <p>We want to be specific rather than reassuring, so here is what is genuinely absent:</p>
      <ul className="list-disc pl-5 space-y-1.5">
        <li><strong className="text-white">No accounts.</strong> There is no sign-up, no login, and no email collection anywhere on the site.</li>
        <li><strong className="text-white">No cookies.</strong> The site sets no cookies of any kind, first-party or third-party. This is why you never see a cookie banner.</li>
        <li><strong className="text-white">No analytics.</strong> There is no Google Analytics, no Tag Manager, no Plausible, no Meta pixel and no other tracking or session-recording script.</li>
        <li><strong className="text-white">No advertising.</strong> The site currently displays no ads and contains no advertising or ad-personalisation code.</li>
        <li><strong className="text-white">No third-party requests.</strong> The site loads no external fonts, scripts, or embeds. Your browser talks to our server and to nobody else.</li>
        <li><strong className="text-white">No microphone or camera access.</strong> The hearing tests generate tones through the Web Audio API; they never request microphone permission. No test requests camera access.</li>
      </ul>
    </LegalSection>

    <LegalSection title="3. Your test answers never leave your browser">
      <p>
        All tests — including the ADHD screening questionnaire, the vision, hearing and colour
        vision screenings — are computed locally in JavaScript. The application contains no code
        that sends answers, scores or results anywhere. When you close or reload the page, your
        in-progress answers are simply discarded.
      </p>
      <p>
        This matters most for the health-adjacent tests: your ADHD questionnaire responses are held
        only in your browser's memory while you take the test, are never written to storage, and are
        gone the moment you leave the page.
      </p>
    </LegalSection>

    <LegalSection title="4. What is stored on your own device">
      <p>
        Some tests keep your personal best and attempt count so you can see progress between visits.
        This uses your browser's <strong className="text-white">localStorage</strong>: the data stays
        on your device, is readable only by this site, and is never transmitted to us.
      </p>
      <p>The complete list of what is stored:</p>
      <div className="overflow-x-auto rounded-xl border border-dark-700">
        <table className="w-full text-sm">
          <thead className="bg-dark-800/60 text-dark-200">
            <tr>
              <th scope="col" className="text-left font-semibold px-4 py-2.5">Storage key</th>
              <th scope="col" className="text-left font-semibold px-4 py-2.5">Set by</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-800">
            {STORAGE_KEYS.map(({ key, label }) => (
              <tr key={key}>
                <td className="px-4 py-2.5 font-mono text-[13px] text-green-300">{key}</td>
                <td className="px-4 py-2.5 text-dark-300">{label}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Each entry contains only numbers — attempts, best score, average and last score. It contains
        no name, no email, no IP address and no device identifier.
      </p>
      <p>
        <strong className="text-white">How to erase it:</strong> every test page with saved stats has
        a reset control that deletes its entry immediately. You can also clear site data for this
        domain in your browser settings, which removes all of it at once.
      </p>
    </LegalSection>

    <LegalSection title="5. Server logs">
      <p>
        The site is hosted on Vercel. Like any web host, Vercel's infrastructure automatically
        records standard request information — IP address, timestamp, requested URL, user agent —
        for delivery, security and abuse prevention. We do not use these logs to build profiles and
        we do not combine them with anything else. This processing is carried out by our hosting
        provider under its own terms; see{' '}
        <a
          href="https://vercel.com/legal/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-400 hover:text-green-300 underline"
        >
          Vercel's privacy policy
        </a>.
      </p>
      <p>
        The site also serves a static Google Search Console verification file. It is an inert HTML
        file that proves ownership of the domain; it sets nothing and collects nothing.
      </p>
    </LegalSection>

    <LegalSection title="6. Sharing your result">
      <p>
        Result screens include a share button. It copies a short summary of your own score to your
        clipboard so you can paste it wherever you like. Nothing is posted anywhere on your behalf
        and nothing is sent to us.
      </p>
    </LegalSection>

    <LegalSection title="7. Your rights">
      <p>
        Data-protection law (including the GDPR and the CCPA) gives you rights of access, correction,
        deletion, portability and objection over personal data held about you. Because we hold no
        personal data about you on any server, there is nothing for us to look up, export or delete
        in response to such a request — the only data that exists is the local score history on your
        own device, which you can erase yourself at any time as described in section 4.
      </p>
      <p>
        If you believe we hold data about you regardless, contact us and we will investigate.
        Governing law and supervisory authority: {JURISDICTION}.
      </p>
    </LegalSection>

    <LegalSection title="8. Children">
      <p>
        The site is not directed at children under 13 and collects no personal information from
        anyone, including children. The screening tests are written for adults; a young person
        should use them only with a parent or guardian, and results should never be read as a
        diagnosis.
      </p>
    </LegalSection>

    <LegalSection title="9. If this ever changes">
      <LegalCallout title="Not currently active">
        <p>
          We may in future introduce advertising (for example Google AdSense) or privacy-friendly
          analytics. Neither is running today. If either is added, this page will be updated
          <em> before</em> the change goes live, the &ldquo;last updated&rdquo; date will change, and
          any consent mechanism required in your region will be presented to you at that point.
        </p>
      </LegalCallout>
      <p>
        Material changes will always be reflected here. Continued use of the site after an update
        means you accept the revised policy.
      </p>
    </LegalSection>
  </LegalLayout>
);

export default PrivacyPage;
