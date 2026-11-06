import fs from 'fs';
import path from 'path';
import { google } from 'googleapis';

export default async function handler(req, res) {
  // Allow simple GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    let auth;
    const clientEmail = process.env.GSC_CLIENT_EMAIL;
    const privateKey = process.env.GSC_PRIVATE_KEY 
      ? process.env.GSC_PRIVATE_KEY.replace(/\\n/g, '\n')
      : null;

    if (clientEmail && privateKey) {
      auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: clientEmail,
          private_key: privateKey,
        },
        scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
      });
    } else {
      // Local fallback to service-account file
      const keyFile = path.resolve('reactiontestpro-seo-service-account.json');
      if (fs.existsSync(keyFile)) {
        auth = new google.auth.GoogleAuth({
          keyFile,
          scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
        });
      } else {
        // Fallback to static snapshot if no API keys are present
        const snapshotFile = path.resolve('src/data/gscSnapshot.json');
        if (fs.existsSync(snapshotFile)) {
          const snapshot = JSON.parse(fs.readFileSync(snapshotFile, 'utf8'));
          return res.status(200).json({ ...snapshot, isCachedSnapshot: true });
        }
        return res.status(500).json({ error: 'No GSC credentials found on server' });
      }
    }

    const searchconsole = google.searchconsole({ version: 'v1', auth });
    const siteUrl = process.env.GSC_SITE_URL || 'https://reactiontestpro.com/';

    const endDate = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const [summaryRes, dailyRes, queriesRes, pagesRes] = await Promise.all([
      searchconsole.searchanalytics.query({
        siteUrl,
        requestBody: { startDate, endDate, dimensions: [] },
      }),
      searchconsole.searchanalytics.query({
        siteUrl,
        requestBody: { startDate: '2026-10-25', endDate, dimensions: ['date'] },
      }),
      searchconsole.searchanalytics.query({
        siteUrl,
        requestBody: { startDate, endDate, dimensions: ['query'], rowLimit: 30 },
      }),
      searchconsole.searchanalytics.query({
        siteUrl,
        requestBody: { startDate, endDate, dimensions: ['page'], rowLimit: 15 },
      }),
    ]);

    const data = {
      updatedAt: new Date().toISOString(),
      siteUrl,
      startDate,
      endDate,
      summary: summaryRes.data.rows && summaryRes.data.rows[0] ? summaryRes.data.rows[0] : null,
      daily: (dailyRes.data.rows || []).map((r) => ({
        date: r.keys[0],
        clicks: r.clicks,
        impressions: r.impressions,
        ctr: r.ctr,
        position: r.position,
      })),
      queries: (queriesRes.data.rows || []).map((r) => ({
        query: r.keys[0],
        clicks: r.clicks,
        impressions: r.impressions,
        ctr: r.ctr,
        position: r.position,
      })),
      pages: (pagesRes.data.rows || []).map((r) => ({
        page: r.keys[0].replace('https://reactiontestpro.com', '') || '/',
        clicks: r.clicks,
        impressions: r.impressions,
        ctr: r.ctr,
        position: r.position,
      })),
    };

    return res.status(200).json(data);
  } catch (error) {
    console.error('GSC API Error:', error);
    // Graceful fallback to snapshot if live fetch throws
    try {
      const snapshotFile = path.resolve('src/data/gscSnapshot.json');
      if (fs.existsSync(snapshotFile)) {
        const snapshot = JSON.parse(fs.readFileSync(snapshotFile, 'utf8'));
        return res.status(200).json({ ...snapshot, isCachedSnapshot: true, error: error.message });
      }
    } catch (_) {}
    return res.status(500).json({ error: error.message });
  }
}
