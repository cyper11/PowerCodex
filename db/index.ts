import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Initialize lazily so static builds do not require database credentials.
// Reuse the pool across requests and development hot reloads.
const globalForDb = globalThis as typeof globalThis & {
  powerCodexDb?: PostgresJsDatabase<typeof schema>;
};

export function getDb(): PostgresJsDatabase<typeof schema> {
  if (globalForDb.powerCodexDb) return globalForDb.powerCodexDb;
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL is missing. Set your PostgreSQL connection string.');
  }
  const client = postgres(connectionString, {
    // Compatible with transaction-mode connection poolers.
    prepare: false,
    max: 1,
    idle_timeout: 20,
    connect_timeout: 10,
  });
  globalForDb.powerCodexDb = drizzle(client, { schema });
  return globalForDb.powerCodexDb;
}
