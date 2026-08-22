# Akka Q3 Tracker

Single-page dashboard tracking Q3 2026 new bookings against the €1,475,089 target: cumulative pace, weekly leads, and a per-channel breakdown (paid + organic) with a clickable 14-week detail view.

This is a static snapshot, not a live BigQuery connection. Numbers get baked into `index.html` as plain JS and need to be updated by hand (or by a future scheduled refresh) as new weeks close out and the plan evolves.

## Password gate

The whole site sits behind HTTP Basic Auth via Vercel Edge Middleware (`middleware.js`), since the numbers are real spend and bookings figures. Set `SITE_PASSWORD` as an environment variable in the Vercel project (Production) — do not hardcode it.

## Data sources

- Windsor.ai: Meta/Google/TikTok spend
- BigQuery `akka-analytics.marts.fct_lead_acquisition`: leads by channel
- Metabase MEMBER ANALYSIS dashboard: new members and bookings (actuals confirmed by screenshot through Aug 20, 2026)
- Internal Q3 planning sheet (Google Sheets, "Q3" tab): full July actuals plus the September forecast by channel/platform
