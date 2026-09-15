import { pgTable, text, integer, primaryKey, index, uniqueIndex } from 'drizzle-orm/pg-core';

// Preserve existing column names and ISO timestamp / serialized-answer formats.
export const accounts = pgTable('accounts', {
  id: text('id').primaryKey(),
  email: text('email').notNull(),
  passwordHash: text('password_hash').notNull(),
  createdAt: text('created_at').notNull(),
}, table => [uniqueIndex('accounts_email_unique').on(table.email)]);

export const sessions = pgTable('sessions', {
  id: text('id').primaryKey(),
  owner: text('owner').notNull(),
  expiresAt: text('expires_at').notNull(),
  createdAt: text('created_at').notNull(),
}, table => [
  index('sessions_owner').on(table.owner),
  index('sessions_expires').on(table.expiresAt),
]);

export const journal = pgTable('journal', {
  id: text('id').primaryKey(),
  owner: text('owner').notNull(),
  situation: text('situation').notNull(),
  lesson: text('lesson').notNull(),
  law: integer('law'),
  createdAt: text('created_at').notNull(),
}, table => [index('journal_owner_created').on(table.owner, table.createdAt)]);

export const notes = pgTable('notes', {
  owner: text('owner').notNull(),
  law: integer('law').notNull(),
  body: text('body').notNull(),
  updatedAt: text('updated_at').notNull(),
}, table => [primaryKey({ columns: [table.owner, table.law] })]);

export const profiles = pgTable('profiles', {
  owner: text('owner').primaryKey(),
  answers: text('answers').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const attempts = pgTable('attempts', {
  id: text('id').primaryKey(),
  owner: text('owner').notNull(),
  answers: text('answers').notNull(),
  score: integer('score').notNull(),
  createdAt: text('created_at').notNull(),
}, table => [index('attempts_owner_created').on(table.owner, table.createdAt)]);
