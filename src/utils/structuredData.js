/**
 * Builders for schema.org JSON-LD structured data.
 * Output is plain objects; the <Seo> component serializes them into
 * <script type="application/ld+json"> tags that get baked into the
 * prerendered HTML (SSG), so Google can read them on the first crawl.
 *
 * Entity graph: the Organization and WebSite nodes carry stable @ids
 * (#organization / #website). Every other schema references them through
 * publisherRef()/websiteRef() — self-contained copies that unify by @id —
 * instead of re-declaring anonymous duplicates on each page.
 */

export const SITE_URL = 'https://reactiontestpro.com';
export const SITE_NAME = 'ReactionTestPro';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const abs = (pathOrUrl) =>
  pathOrUrl.startsWith('http') ? pathOrUrl : `${SITE_URL}${pathOrUrl}`;

// Google requires the Organization logo to be an ImageObject of at least
// 112×112 px; the OG image (1200×630) qualifies, the 64px favicon does not.
const logoObject = () => ({
  '@type': 'ImageObject',
  url: DEFAULT_OG_IMAGE,
  width: 1200,
  height: 630,
});

// Reference copies of the two root entities. Each is complete enough to stand
// alone on a page while still merging with the canonical node via @id.
const publisherRef = () => ({
  '@type': 'Organization',
  '@id': ORG_ID,
  name: SITE_NAME,
  logo: logoObject(),
});

const websiteRef = () => ({
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
});

// Site-wide identity — used on the homepage.
export const websiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  inLanguage: 'en',
  description:
    'Free online reaction time, cognitive, vision and hearing tests with instant results.',
  publisher: publisherRef(),
});

export const organizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORG_ID,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: logoObject(),
});

// Interactive test pages → a free web application. The #app suffix keeps the
// application entity distinct from (and linkable to) the page entity that
// medicalWebPageSchema declares at the bare URL.
export const webApplicationSchema = ({
  name,
  description,
  path,
  category = 'HealthApplication',
}) => ({
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  '@id': `${abs(path)}#app`,
  name,
  description,
  url: abs(path),
  applicationCategory: category,
  operatingSystem: 'Any (web browser)',
  browserRequirements: 'Requires JavaScript',
  isAccessibleForFree: true,
  inLanguage: 'en',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: publisherRef(),
});

// Health-adjacent (YMYL) pages: /test/adhd, /test/vision, /test/color-blind,
// /test/hearing. Declares the page as health content, carries the
// non-diagnostic disclaimer, and exposes the same review date the page shows
// visibly so the two cannot drift apart. mainEntity points at the #app node
// emitted by webApplicationSchema for the same URL.
export const medicalWebPageSchema = ({ name, description, path, lastReviewed }) => ({
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  '@id': abs(path),
  name,
  description,
  url: abs(path),
  lastReviewed,
  inLanguage: 'en',
  mainEntity: { '@id': `${abs(path)}#app` },
  isPartOf: websiteRef(),
  publisher: publisherRef(),
});

// Breadcrumb trail. Accepts either (name, path) for the flat Home › Page
// shape, or (name, path, parent) with parent = { name, path } for a
// three-level trail such as Home › Blog › Article.
export const breadcrumbSchema = (name, path, parent) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
    ...(parent
      ? [{ '@type': 'ListItem', position: 2, name: parent.name, item: abs(parent.path) }]
      : []),
    { '@type': 'ListItem', position: parent ? 3 : 2, name, item: abs(path) },
  ],
});

// FAQ rich results. `faqs` = [{ question, answer }, ...]
export const faqSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
});

export const articleSchema = ({
  headline,
  description,
  path,
  datePublished,
  dateModified,
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline,
  description,
  mainEntityOfPage: { '@type': 'WebPage', '@id': abs(path) },
  datePublished,
  dateModified: dateModified || datePublished,
  inLanguage: 'en',
  author: { '@type': 'Organization', '@id': ORG_ID, name: SITE_NAME },
  isPartOf: websiteRef(),
  publisher: publisherRef(),
});

// Static information pages (/privacy, /terms, /about, /contact) and
// collection/hub pages (/gaming-test, /sport-test, /blog).
export const infoPageSchema = ({ name, description, path, type = 'WebPage' }) => ({
  '@context': 'https://schema.org',
  '@type': type,
  '@id': abs(path),
  name,
  description,
  url: abs(path),
  inLanguage: 'en',
  isPartOf: websiteRef(),
  publisher: publisherRef(),
});
