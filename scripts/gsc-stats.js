import fs from 'fs';
import path from 'path';
import { google } from 'googleapis';

const KEY_FILE = path.resolve('reactiontestpro-seo-service-account.json');

async function main() {
  if (!fs.existsSync(KEY_FILE)) {
    console.error(`❌ Credentials file not found at ${KEY_FILE}`);
    process.exit(1);
  }

  const credentials = JSON.parse(fs.readFileSync(KEY_FILE, 'utf8'));

  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE,
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });

  const searchconsole = google.searchconsole({ version: 'v1', auth });

  console.log('🔍 Connecting to Google Search Console API...');
  console.log(`📧 Service Account: ${credentials.client_email}`);

  // 1. List sites the service account has access to
  let siteUrl = null;
  try {
    const sitesRes = await searchconsole.sites.list();
    const siteEntries = sitesRes.data.siteEntry || [];
    console.log(`\n📋 Verified properties found (${siteEntries.length}):`);
    siteEntries.forEach((s) => {
      console.log(`   - ${s.siteUrl} (permission: ${s.permissionLevel})`);
    });

    if (siteEntries.length > 0) {
      siteUrl = siteEntries[0].siteUrl;
    }
  } catch (err) {
    console.warn(`⚠️ Could not list sites: ${err.message}`);
  }

  // Fallback candidate URLs to test if list was empty or restricted
  const candidates = siteUrl 
    ? [siteUrl] 
    : [
        'https://reactiontestpro.com/', 
        'https://reactiontestpro.com', 
        'sc-domain:reactiontestpro.com'
      ];

  let activeSite = null;
  let summaryData = null;

  // Calculate dates: last 28 days up to 3 days ago (GSC data latency)
  const endDate = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  for (const candidate of candidates) {
    try {
      const res = await searchconsole.searchanalytics.query({
        siteUrl: candidate,
        requestBody: {
          startDate,
          endDate,
          dimensions: [],
        },
      });
      activeSite = candidate;
      summaryData = res.data.rows && res.data.rows.length > 0 ? res.data.rows[0] : null;
      break;
    } catch (e) {
      // continue testing next candidate
    }
  }

  if (!activeSite) {
    console.error('\n❌ Could not query Search Console data for reactiontestpro.com.');
    console.error('Possible causes:');
    console.error('1. The service account email was not added to the exact property in Search Console.');
    console.error(`   Make sure ${credentials.client_email} is added with 'Read' permission.`);
    console.error('2. Google Search Console needs 1-2 minutes to propagate permissions.');
    process.exit(1);
  }

  console.log(`\n✅ Connected to property: ${activeSite}`);
  console.log(`📅 Date range: ${startDate} to ${endDate}`);

  // Summary Metrics
  console.log('\n=========================================');
  console.log('📊 REACTIONTESTPRO.COM - PERFORMANCE GSC');
  console.log('=========================================');
  if (summaryData) {
    console.log(`Total Clicks:      ${summaryData.clicks}`);
    console.log(`Total Impressions: ${summaryData.impressions}`);
    console.log(`Average CTR:       ${(summaryData.ctr * 100).toFixed(2)}%`);
    console.log(`Average Position:  ${summaryData.position.toFixed(1)}`);
  } else {
    console.log('No aggregated rows returned yet for this date range.');
  }

  // Top Queries
  try {
    const queriesRes = await searchconsole.searchanalytics.query({
      siteUrl: activeSite,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['query'],
        rowLimit: 15,
      },
    });

    console.log('\n-----------------------------------------');
    console.log('🏆 TOP REQUÊTES / MOTS-CLÉS (Top 15)');
    console.log('-----------------------------------------');
    const rows = queriesRes.data.rows || [];
    if (rows.length === 0) {
      console.log('Aucune requête enregistrée sur cette période.');
    } else {
      console.log('Mot-clé'.padEnd(35) + 'Clics'.padEnd(8) + 'Impressions'.padEnd(14) + 'CTR'.padEnd(8) + 'Position');
      console.log('-'.repeat(75));
      rows.forEach((r) => {
        const query = (r.keys[0] || '').slice(0, 33).padEnd(35);
        const clicks = String(r.clicks).padEnd(8);
        const imp = String(r.impressions).padEnd(14);
        const ctr = `${(r.ctr * 100).toFixed(1)}%`.padEnd(8);
        const pos = r.position.toFixed(1);
        console.log(`${query}${clicks}${imp}${ctr}${pos}`);
      });
    }
  } catch (err) {
    console.warn(`Could not fetch top queries: ${err.message}`);
  }

  // Top Pages
  try {
    const pagesRes = await searchconsole.searchanalytics.query({
      siteUrl: activeSite,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['page'],
        rowLimit: 10,
      },
    });

    console.log('\n-----------------------------------------');
    console.log('📄 TOP PAGES');
    console.log('-----------------------------------------');
    const pageRows = pagesRes.data.rows || [];
    if (pageRows.length === 0) {
      console.log('Aucune page enregistrée sur cette période.');
    } else {
      console.log('Page'.padEnd(45) + 'Clics'.padEnd(8) + 'Impressions'.padEnd(14) + 'CTR'.padEnd(8) + 'Position');
      console.log('-'.repeat(85));
      pageRows.forEach((r) => {
        const pageUrl = (r.keys[0] || '').replace('https://reactiontestpro.com', '').slice(0, 43) || '/';
        const pageCol = pageUrl.padEnd(45);
        const clicks = String(r.clicks).padEnd(8);
        const imp = String(r.impressions).padEnd(14);
        const ctr = `${(r.ctr * 100).toFixed(1)}%`.padEnd(8);
        const pos = r.position.toFixed(1);
        console.log(`${pageCol}${clicks}${imp}${ctr}${pos}`);
      });
    }
  } catch (err) {
    console.warn(`Could not fetch top pages: ${err.message}`);
  }

  console.log('\n=========================================\n');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
