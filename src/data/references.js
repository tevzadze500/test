/**
 * Reference lists for the health-adjacent (YMYL) test pages.
 *
 * Every URL here was fetched and its content checked against the claim made
 * before it was added. One candidate — MedlinePlus article 003318, proposed as
 * an audiometry reference — turned out to be about coloboma of the iris and was
 * dropped. Do not add an entry you have not opened.
 */

export const LAST_UPDATED = '2026-07-24';

export const adhdReferences = [
  {
    title:
      'Kessler RC, et al. The World Health Organization Adult ADHD Self-Report Scale (ASRS): a short screening scale for use in the general population',
    href: 'https://pubmed.ncbi.nlm.nih.gov/15841682/',
    publisher: 'Psychological Medicine, 2005;35(2):245–256',
    note: 'The peer-reviewed basis of the ASRS-v1.1, the instrument this questionnaire is modelled on',
  },
  {
    title: 'Attention-Deficit/Hyperactivity Disorder (ADHD)',
    href: 'https://www.nimh.nih.gov/health/topics/attention-deficit-hyperactivity-disorder-adhd',
    publisher: 'National Institute of Mental Health (NIH)',
    note: 'Symptoms, evaluation and treatment overview',
  },
];

export const visionReferences = [
  {
    title: 'Visual acuity test (Snellen test)',
    href: 'https://medlineplus.gov/ency/article/003396.htm',
    publisher: 'MedlinePlus, U.S. National Library of Medicine (NIH)',
    note: 'Describes the standardised Snellen chart procedure read at 20 feet (6 metres)',
  },
];

export const colorBlindReferences = [
  {
    title: 'Color Blindness',
    href: 'https://www.nei.nih.gov/learn-about-eye-health/eye-conditions-and-diseases/color-blindness',
    publisher: 'National Eye Institute (NIH)',
    note: 'Describes the standard coloured-dot plate test used to screen colour vision',
  },
];

export const hearingReferences = [
  {
    title: 'Audiometry',
    href: 'https://medlineplus.gov/ency/article/003341.htm',
    publisher: 'MedlinePlus, U.S. National Library of Medicine (NIH)',
    note: 'Pure-tone audiometry; normal hearing is detection of 250–8,000 Hz tones at 25 dB or lower',
  },
  {
    title: 'Deafness and hearing loss',
    href: 'https://www.who.int/news-room/fact-sheets/detail/deafness-and-hearing-loss',
    publisher: 'World Health Organization',
    note: 'Defines normal hearing as thresholds of 20 dB or better in both ears',
  },
];
