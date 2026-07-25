import React from 'react';
import { Link } from 'react-router-dom';
import LegalLayout, { LegalSection, LegalCallout, Placeholder } from '../components/LegalLayout';
import { SITE_NAME, SITE_URL, infoPageSchema } from '../utils/structuredData';

const LAST_UPDATED = '2026-07-24';

const TermsPage = () => (
  <LegalLayout
    title={`Terms of Use | ${SITE_NAME}`}
    description="The terms that govern your use of ReactionTestPro, including the important limitation that none of the tests provide medical advice or a diagnosis."
    canonical="/terms"
    jsonLd={infoPageSchema({ name: 'Terms of Use', description: `${SITE_NAME} — terms of use`, path: '/terms', type: 'WebPage' })}
    heading="Terms of Use"
    intro="By using this site you agree to these terms. They are deliberately short and readable — please read the medical section in particular."
    lastUpdated={LAST_UPDATED}
  >
    <LegalCallout title="Not medical advice">
      <p>
        Nothing on {SITE_NAME} is medical advice, and no test here can diagnose any condition. The
        ADHD screening, vision, colour vision and hearing tests are educational self-assessment
        tools that run on ordinary consumer hardware. They are not calibrated clinical instruments,
        they are not administered by a clinician, and their results have no diagnostic value.
      </p>
      <p>
        Only a qualified healthcare professional can diagnose ADHD, a vision or colour vision
        deficiency, hearing loss, or any other condition. Never disregard professional medical
        advice, delay seeking it, or start or stop any treatment because of a result you saw here.
        If you have a health concern, consult a doctor, optometrist or audiologist.
      </p>
      <p>
        If you think you may be experiencing a medical emergency, contact your local emergency
        services immediately.
      </p>
    </LegalCallout>

    <LegalSection title="1. Who these terms are with">
      <p>
        These terms are an agreement between you and{' '}
        <Placeholder>your full name or registered business entity</Placeholder>, the operator of{' '}
        {SITE_NAME} ({SITE_URL}). If you do not accept them, please do not use the site.
      </p>
    </LegalSection>

    <LegalSection title="2. What the site is">
      <p>
        {SITE_NAME} offers free, browser-based tests of reaction time and related cognitive and
        sensory abilities. No account is required and no payment is taken. The tests are provided
        for personal interest, curiosity and self-comparison.
      </p>
      <p>
        Results depend heavily on factors we do not control: your screen's refresh rate and input
        latency, your browser, your device, your headphones or speakers, ambient light and noise,
        fatigue, caffeine and attention. Two people with identical ability can get different
        numbers on different hardware. Treat every figure as an approximation, not a measurement.
      </p>
    </LegalSection>

    <LegalSection title="3. Acceptable use">
      <p>You agree not to:</p>
      <ul className="list-disc pl-5 space-y-1.5">
        <li>use the site for any unlawful purpose, or in a way that could damage or overload it;</li>
        <li>attempt to gain unauthorised access to the site, its server or any connected system;</li>
        <li>scrape, mirror or systematically extract the site's content for republication;</li>
        <li>present results from this site as clinical, diagnostic or officially certified;</li>
        <li>remove, obscure or misrepresent any disclaimer shown alongside a test.</li>
      </ul>
    </LegalSection>

    <LegalSection title="4. Intellectual property">
      <p>
        The site's design, code, written content and original graphics belong to the operator and
        are protected by copyright. You may link to any page freely, and quote short passages with
        attribution. You may not reproduce substantial portions or republish the tests as your own.
      </p>
      <p>
        Third-party names, standards and instruments referred to on the site — for example
        established screening scales, chart designs or motorsport terminology — remain the property
        of their respective owners. They are named only to describe what a test is based on. Their
        mention does not imply any affiliation with, endorsement by, or licence from those owners,
        and this site is not affiliated with or endorsed by any of them.
      </p>
    </LegalSection>

    <LegalSection title="5. Availability">
      <p>
        The site is provided as-is and as-available. We may change, suspend or discontinue any test
        or the entire site at any time, without notice. We do not guarantee uninterrupted access or
        that any result you have saved locally will remain available.
      </p>
    </LegalSection>

    <LegalSection title="6. Disclaimer of warranties and limitation of liability">
      <p>
        To the fullest extent permitted by law, the site is provided without warranties of any kind,
        express or implied, including any warranty of accuracy, fitness for a particular purpose, or
        non-infringement. We do not warrant that any result is accurate, meaningful, or comparable
        to any clinical or professional measurement.
      </p>
      <p>
        To the fullest extent permitted by law, the operator is not liable for any indirect,
        incidental or consequential loss arising from your use of the site or from any decision you
        take on the basis of a result. Nothing in these terms limits liability that cannot lawfully
        be limited, including liability for death or personal injury caused by negligence, or for
        fraud.
      </p>
    </LegalSection>

    <LegalSection title="7. Privacy">
      <p>
        Your data is covered by our{' '}
        <Link to="/privacy" className="text-green-400 hover:text-green-300 underline">Privacy Policy</Link>.
        In short: tests run in your browser, your answers are never sent to a server, and the site
        sets no cookies and runs no analytics.
      </p>
    </LegalSection>

    <LegalSection title="8. Changes and governing law">
      <p>
        We may update these terms; the date at the top will change when we do, and continued use
        after an update means you accept the revised terms.
      </p>
      <p>
        These terms are governed by the laws of{' '}
        <Placeholder>country / state whose law governs this site</Placeholder>, and any dispute will
        be subject to the courts of that jurisdiction.
      </p>
      <p>
        Questions about these terms: see the{' '}
        <Link to="/contact" className="text-green-400 hover:text-green-300 underline">contact page</Link>.
      </p>
    </LegalSection>
  </LegalLayout>
);

export default TermsPage;
