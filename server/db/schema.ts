import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  boolean,
  varchar
} from 'drizzle-orm/pg-core'

/* =========================
   FORMS
========================= */

export const forms = pgTable('forms', {
  id: serial('id').primaryKey(),

  title: text('title').notNull(),

  description: text('description'),

  createdAt: timestamp('created_at')
    .defaultNow()
})

export const sections = pgTable('sections', {
  id: serial('id').primaryKey(),

  formId: integer('form_id')
    .notNull(),

  title: text('title')
    .notNull()
})

export const questions = pgTable('questions', {
  id: serial('id').primaryKey(),

  formId: integer('form_id')
    .notNull(),

  sectionId: integer('section_id')
    .notNull(),

  title: text('title')
    .notNull(),

  type: text('type')
    .notNull(),

  required: boolean('required')
    .default(false),

  imageUrl: text('image_url'),

  videoUrl: text('video_url')
})

export const options = pgTable('options', {
  id: serial('id').primaryKey(),

  questionId: integer('question_id')
    .notNull(),

  text: text('text')
    .notNull(),

  imageUrl: text('image_url')
})

/* =========================
   BETTER AUTH TABLES
========================= */

export const user = pgTable('user', {
  id: text('id').primaryKey(),

  name: text('name')
    .notNull(),

  email: text('email')
    .notNull()
    .unique(),

  emailVerified: boolean('email_verified')
    .default(false)
    .notNull(),

  image: text('image'),

  createdAt: timestamp('created_at')
    .defaultNow()
    .notNull(),

  updatedAt: timestamp('updated_at')
    .defaultNow()
    .notNull()
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),

  expiresAt: timestamp('expires_at')
    .notNull(),

  token: text('token')
    .notNull()
    .unique(),

  createdAt: timestamp('created_at')
    .defaultNow()
    .notNull(),

  updatedAt: timestamp('updated_at')
    .defaultNow()
    .notNull(),

  ipAddress: varchar('ip_address', {
    length: 255
  }),

  userAgent: text('user_agent'),

  userId: text('user_id')
    .notNull()
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),

  accountId: text('account_id')
    .notNull(),

  providerId: text('provider_id')
    .notNull(),

  userId: text('user_id')
    .notNull(),

  password: text('password'),

  createdAt: timestamp('created_at')
    .defaultNow()
    .notNull(),

  updatedAt: timestamp('updated_at')
    .defaultNow()
    .notNull()
})

export const verification = pgTable(
  'verification',
  {
    id: text('id').primaryKey(),

    identifier: text('identifier')
      .notNull(),

    value: text('value')
      .notNull(),

    expiresAt: timestamp('expires_at')
      .notNull(),

    createdAt: timestamp('created_at')
      .defaultNow()
      .notNull(),

    updatedAt: timestamp('updated_at')
      .defaultNow()
      .notNull()
  }
)