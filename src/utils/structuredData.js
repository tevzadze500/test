/**
 * Builders for schema.org JSON-LD structured data.
 * Output is plain objects; the <Seo> component serializes them into
 * <script type="application/ld+json"> tags that get baked into the
 * prerendered HTML (SSG), so Google can read them on the first crawl.
 */

export const SITE_URL = 'https://reactiontestpro.com';
export const SITE_NAME = 'ReactionTestPro';
export const ORG_LOGO = `${SITE_URL}/favicon-64.png`;
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

const abs = (pathOrUrl) =>
  pathOrUrl.startsWith('http') ? pathOrUrl : `${SITE_URL}${pathOrUrl}`;

// Site-wide identity — used on the homepage.
export const websiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  description:
    'Free online reaction time, cognitive, vision and hearing tests with instant results.',
  publisher: { '@type': 'Organization', name: SITE_NAME, logo: ORG_LOGO },
});

export const organizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: ORG_LOGO,
});

// Interactive test pages → a free web application.
export const webApplicationSchema = ({
  name,
  description,
  path,
  category = 'HealthApplication',
}) => ({
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name,
  description,
  url: abs(path),
  applicationCategory: category,
  operatingSystem: 'Any (web browser)',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: { '@type': 'Organization', name: SITE_NAME, logo: ORG_LOGO },
});

// Breadcrumb: Home › <Test name>
export const breadcrumbSchema = (name, path) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name, item: abs(path) },
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
  author: { '@type': 'Organization', name: SITE_NAME },
  publisher: {
    '@type': 'Organization',
    name: SITE_NAME,
    logo: { '@type': 'ImageObject', url: ORG_LOGO },
  },
});
