import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  boolean,
  varchar
} from 'drizzle-orm/pg-core'
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

export const forms = pgTable('forms', {
  id: serial('id').primaryKey(),

  userId: text('user_id').notNull(),

  title: text('title').notNull(),

  description: text('description'),

  createdAt: timestamp('created_at').defaultNow(),

  // ✅ FIXED: auto-generate shareable id for public links
  shareId: text('share_id')
    .unique()
    .default(sql`gen_random_uuid()`)
})

/* =========================
   SECTIONS
========================= */

export const sections = pgTable('sections', {
  id: serial('id').primaryKey(),

  formId: integer('form_id').notNull(),

  title: text('title').notNull()
})

/* =========================
   QUESTIONS
========================= */

export const questions = pgTable('questions', {
  id: serial('id').primaryKey(),

  formId: integer('form_id').notNull(),

  sectionId: integer('section_id').notNull(),

  title: text('title').notNull(),

  type: text('type').notNull(),

  required: boolean('required').default(false),

  imageUrl: text('image_url'),

  videoUrl: text('video_url'),

  // 🔥 KEEP ONLY IF YOU REALLY NEED IT (safe now)
  goToSectionId: integer('go_to_section_id'),

  maxLength: integer('max_length')
})

/* =========================
   OPTIONS
========================= */

export const options = pgTable('options', {
  id: serial('id').primaryKey(),

  questionId: integer('question_id').notNull(),

  text: text('text').notNull(),

  imageUrl: text('image_url')
})

/* =========================
   RESPONSES
========================= */

export const responses = pgTable('responses', {
  id: serial('id').primaryKey(),
  formId: integer('form_id').notNull(),
  createdAt: timestamp('created_at').defaultNow()
})

export const responseAnswers = pgTable('response_answers', {
  id: serial('id').primaryKey(),
  responseId: integer('response_id').notNull(),
  questionId: integer('question_id').notNull(),
  value: text('value')
})
/* =========================
   AUTH TABLES
========================= */

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').default(false).notNull(),
  image: text('image'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  ipAddress: varchar('ip_address', { length: 255 }),
  userAgent: text('user_agent'),
  userId: text('user_id').notNull()
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id').notNull(),
  password: text('password'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})