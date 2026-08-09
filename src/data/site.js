/**
 * Single source of truth for the site's publishing identity. Every page that
 * names the operator, the contact address or the governing law imports from
 * here — no page hardcodes these values.
 *
 * The site publishes under its brand name rather than a personal byline. The
 * "developer, not a clinician" disclosure that accompanies the name on YMYL
 * pages lives in TrustBlock and AboutPage; keep it intact wherever AUTHOR_NAME
 * is rendered.
 */

export const OWNER_NAME = 'ReactionTestPro';

/** Byline shown on YMYL test pages ("Written by …"). */
export const AUTHOR_NAME = OWNER_NAME;

/** How the operator is described in legal copy, avoiding "X is operated by X". */
export const OWNER_DESCRIPTOR =
  'an independent, developer-run project published under the ReactionTestPro name';

/**
 * Published contact address. The mailbox is a forwarding alias configured at
 * the domain registrar — if it is ever decommissioned, null this out so the
 * contact page falls back to its placeholder state instead of a dead mailto.
 */
export const CONTACT_EMAIL = 'contact@reactiontestpro.com';

/** Governing law named in /privacy and /terms. */
export const JURISDICTION = 'the United States';
