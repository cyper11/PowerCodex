# The Power Codex

A private study companion inspired by Robert Greene’s The 48 Laws of Power, built from the supplied visual reference and PDF.

## Features

- 48-law archive with search, category filters, original summaries, examples, and personal notes.
- Rule-based strategy analyzer with topic matches and practical next steps.
- Thirty original scenario questions with randomized five-question sessions, answer-specific feedback, and saved practice results.
- Six-question reflection profile with transparent counts.
- Private journal with create, edit, delete, and data export.
- Responsive dark interface with original classical artwork and a larger-text setting.

## Development

Requires Node 22.13 or later and npm. This is a standard Next.js 16 App Router application.

1. Run `npm install`.
2. Copy `.env.example` to `.env.local` and set `DATABASE_URL` to your PostgreSQL connection string.
3. Run `npm run db:migrate` to initialize a new database.
4. Run `npm run dev`, then open http://localhost:3000.

Saved data and PowerCodex-owned email accounts use PostgreSQL through Drizzle ORM and the `postgres` driver. Passwords are stored as salted PBKDF2 hashes, and browser sessions use hashed opaque tokens in secure HTTP-only cookies.

The app has its own email/password account flow. Every personal-data endpoint requires a valid PowerCodex session and scopes queries by the app-owned user ID.

## Production and Vercel

Run `npm run build` to produce the standard Next.js build, then `npm start` to serve it locally. Static builds do not require database credentials; authentication and saved-data requests require a configured, migrated database.

Import this repository into Vercel and select the Next.js framework preset. Keep the default output directory and use `npm install` / `npm run build`. Set the server-only `DATABASE_URL` environment variable for each deployment environment. Use your PostgreSQL provider's pooled connection URL and required SSL settings; prepared statements are disabled for transaction-pooler compatibility. Never prefix database credentials with `NEXT_PUBLIC_` or commit `.env.local`.

Apply migrations explicitly with `npm run db:migrate` before serving database-backed requests. Migrations are not run automatically during a build. If your provider requires a direct connection for schema changes, set `DATABASE_DIRECT_URL`; otherwise migrations use `DATABASE_URL`. Local migration commands load `.env.local` using Next.js environment loading.

## Database schema changes and existing data

The PostgreSQL baseline in `drizzle/` preserves the six existing tables, column names, indexes, string IDs, ISO timestamp strings, and JSON-encoded answer strings. After editing `db/schema.ts`, run `npm run db:generate`, review the generated SQL, then run `npm run db:migrate` against the intended database.

The baseline initializes a fresh PostgreSQL database; it does not transfer data from the previous database. Back up and import existing rows separately before switching an existing installation. Preserve account IDs and password hashes so personal-data ownership and passwords remain intact. Existing local database files are not modified by this conversion.

## Content

Law titles follow the supplied edition. Summaries, examples, applications, and simulation questions are original commentary. The PDF itself is not bundled. The analyzer is a thematic reading guide, and the profile is an informal self-reflection.
