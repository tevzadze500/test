import React from 'react';
import { Link } from 'react-router-dom';
import LegalLayout, { LegalSection, LegalCallout, Placeholder } from '../components/LegalLayout';
import { SITE_NAME } from '../utils/structuredData';
import { tests } from '../data/tests';

const LAST_UPDATED = '2026-07-24';

const AboutPage = () => (
  <LegalLayout
    title={`About ${SITE_NAME} | Who Builds These Tests`}
    description="Who runs ReactionTestPro, why it exists, and how the tests are built — client-side timing with performance.now(), no server, no accounts, no data collection."
    canonical="/about"
    heading={`About ${SITE_NAME}`}
    intro={`${SITE_NAME} is a small, free collection of ${tests.length} browser-based tests for reaction time, attention, memory, vision and hearing. No accounts, no paywall, no data collection.`}
    lastUpdated={LAST_UPDATED}
  >
    <LegalSection title="Who runs this site">
      <p>
        This site is built and maintained by{' '}
        <Placeholder>your name, or the business name you publish under</Placeholder>.
      </p>
      <p>
        <Placeholder>
          two or three sentences about you: your background, what you do, and why you started
          building reaction tests — real experience only, no invented credentials
        </Placeholder>
      </p>
      <LegalCallout title="A note on expertise">
        <p>
          This site is built by a developer, not a clinician. The screening tests are based on
          published, publicly documented instruments and paradigms, and each one names its source on
          its own page — but none of them is administered, reviewed or validated by a medical
          professional here. Where a page carries a reviewer byline, that person is named
          explicitly; where it does not, none exists.
        </p>
      </LegalCallout>
    </LegalSection>

    <LegalSection title="Why it exists">
      <p>
        Most online reaction tests are either buried in ads, demand an account before showing your
        result, or quietly send your answers somewhere. This site was built as the opposite: open
        the page, take the test, see the number, close the tab. Nothing is stored anywhere except
        your own browser, and only if the test keeps a personal best.
      </p>
      <p>
        The second reason is that reaction time is genuinely interesting. It sits at the boundary
        between perception and movement, it varies with sleep, age, caffeine and attention, and it
        is one of the few cognitive measures you can meaningfully test on a laptop.
      </p>
    </LegalSection>

    <LegalSection title="How the tests are built">
      <p>
        Every test is plain client-side JavaScript. There is no backend, no database and no API
        call — the code that scores your test is the code your browser downloaded.
      </p>
      <ul className="list-disc pl-5 space-y-1.5">
        <li>
          <strong className="text-white">Timing</strong> uses{' '}
          <code className="font-mono text-[0.9em] text-green-300">performance.now()</code>, a
          high-resolution monotonic clock, sampled at the moment the stimulus is painted and again
          on your input. Animations are driven by{' '}
          <code className="font-mono text-[0.9em] text-green-300">requestAnimationFrame</code> so
          they stay aligned with your display's refresh cycle.
        </li>
        <li>
          <strong className="text-white">Delays are randomised</strong> before each trial, so you
          cannot learn the rhythm and anticipate the signal. Reacting before the signal is detected
          and rejected as a false start rather than counted as a fast time.
        </li>
        <li>
          <strong className="text-white">Audio</strong> is generated with the Web Audio API — tones
          are synthesised in the browser rather than downloaded, and no microphone access is ever
          requested.
        </li>
        <li>
          <strong className="text-white">Screening tests</strong> follow the structure of published,
          publicly documented instruments, cited on each test page. They reproduce the format, not a
          clinical calibration.
        </li>
      </ul>
      <LegalCallout title="The honest limitation">
        <p>
          Your measured time always includes your hardware. Display latency, refresh rate, browser
          scheduling and input device all sit between the signal and the number you see, and can
          easily account for 20–50&nbsp;ms of difference between two setups. That is why this site
          shows ranges and tiers rather than claiming precision it cannot deliver, and why comparing
          your own results over time on the same device is more meaningful than comparing against
          anyone else.
        </p>
      </LegalCallout>
    </LegalSection>

    <LegalSection title="What this site will never do">
      <ul className="list-disc pl-5 space-y-1.5">
        <li>Ask you to create an account to see your own result.</li>
        <li>Send your test answers to a server. They are computed and discarded in your browser.</li>
        <li>Publish invented statistics, fabricated leaderboards or made-up user counts.</li>
        <li>Claim a test result is a diagnosis.</li>
      </ul>
      <p>
        The full detail is in the{' '}
        <Link to="/privacy" className="text-green-400 hover:text-green-300 underline">Privacy Policy</Link>{' '}
        and the{' '}
        <Link to="/terms" className="text-green-400 hover:text-green-300 underline">Terms of Use</Link>.
      </p>
    </LegalSection>

    <LegalSection title="Get in touch">
      <p>
        Corrections are welcome — if a source is wrong, a test behaves oddly on your device, or a
        claim looks overstated, please say so on the{' '}
        <Link to="/contact" className="text-green-400 hover:text-green-300 underline">contact page</Link>.
      </p>
    </LegalSection>
  </LegalLayout>
);

export default AboutPage;
