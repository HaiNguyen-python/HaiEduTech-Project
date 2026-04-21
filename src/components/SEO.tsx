/**
 * @file SEO.tsx
 * @description Reusable SEO component using react-helmet-async to inject per-page
 *   title, meta description, canonical URL, OpenGraph/Twitter tags, and optional
 *   JSON-LD structured data. Critical for ranking individual program pages on Google.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { Helmet } from "react-helmet-async";

const SITE_URL = "https://haiedutech.com";
const DEFAULT_OG = `${SITE_URL}/og-image.webp?v=2`;

interface SEOProps {
  /** Page title — keep under 60 chars, include primary keyword. */
  title: string;
  /** Meta description — keep under 160 chars, compelling summary. */
  description: string;
  /** Path only, e.g. "/english/ielts" — used to build canonical URL. */
  path?: string;
  /** Optional OG image (full URL). Defaults to site og-image.webp. */
  image?: string;
  /** Optional JSON-LD structured data object — e.g. Course, FAQPage, BreadcrumbList. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  /** Default "website"; set to "article" for blog/lessons. */
  type?: "website" | "article" | "course";
  /** Locale code, default vi_VN. */
  locale?: "vi_VN" | "en_US";
  /** Set true to discourage indexing (e.g. /login, /dashboard). */
  noindex?: boolean;
}

const SEO = ({
  title,
  description,
  path,
  image = DEFAULT_OG,
  jsonLd,
  type = "website",
  locale = "vi_VN",
  noindex = false,
}: SEOProps) => {
  const canonical = path ? `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}` : SITE_URL;
  const fullTitle = title.includes("HaiEduTech") ? title : `${title} | HaiEduTech`;
  const ldArray = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={type === "course" ? "website" : type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={locale} />
      <meta property="og:site_name" content="HaiEduTech" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {ldArray.map((ld, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(ld)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
