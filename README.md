# The Power Codex

A private study companion inspired by Robert Greene’s The 48 Laws of Power, built from the supplied visual reference and PDF.

## Features

- 48-law archive with search, category filters, original summaries, examples, and personal notes.
- Rule-based strategy analyzer with topic matches and practical next steps.
- Ten original scenario questions in two sessions, including answer-specific feedback and saved practice results.
- Six-question reflection profile with transparent counts.
- Private journal with create, edit, delete, and data export.
- Responsive dark interface with original classical artwork and a larger-text setting.

## Development

Requires Node 22.13 or later and npm. Run npm ci, then npm run dev. The preview uses the portable Sites profile on port 5173.

Saved data uses D1. Generate migrations with npm run db:generate. Build before applying new local migrations with Wrangler using dist/server/wrangler.json and .wrangler/state. Hosted migrations are applied during publication.

The local sign-in route supplies a development-only identity. Production identity comes from Sites; every personal-data endpoint requires authenticated identity and scopes queries by user.

npm run build creates the production Worker. The .openai/hosting.json file identifies this Site and declares its DB binding. Never commit local .sites-runtime data or credentials.

## Content

Law titles follow the supplied edition. Summaries, examples, applications, and simulation questions are original commentary. The PDF itself is not bundled. The analyzer is a thematic reading guide, and the profile is an informal self-reflection.
