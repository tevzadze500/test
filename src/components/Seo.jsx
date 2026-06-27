import React from 'react';
import { Head } from 'vite-react-ssg';
import { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE } from '../utils/structuredData';

/**
 * Centralized SEO head for every page. Uses vite-react-ssg's <Head> so that
 * all tags (title, description, canonical, Open Graph, Twitter Card, JSON-LD)
 * are collected and baked into the prerendered static HTML at build time —
 * which is what Googlebot reads on its first crawl.
 *
 * Props:
 *  - title, description: required strings
 *  - canonical: path ('/test/x') or absolute URL
 *  - image: absolute OG/Twitter image URL (defaults to the site OG image)
 *  - type: Open Graph type ('website' | 'article')
 *  - keywords: optional comma-separated string
 *  - jsonLd: a schema.org object or array of objects
 */
const Seo = ({
  title,
  description,
  canonical,
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  keywords,
  jsonLd,
}) => {
  const url = canonical
    ? canonical.startsWith('http')
      ? canonical
      : `${SITE_URL}${canonical}`
    : undefined;
  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {url && <link rel="canonical" href={url} />}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      {url && <meta property="og:url" content={url} />}
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={title} />

      {/* Structured data (JSON-LD) */}
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Head>
  );
};

export default Seo;
