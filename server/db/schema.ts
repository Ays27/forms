import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  boolean
} from 'drizzle-orm/pg-core'

export const forms = pgTable('forms', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow()
})

export const sections = pgTable('sections', {
  id: serial('id').primaryKey(),
  formId: integer('form_id').notNull(),
  title: text('title').notNull()
})

export const questions = pgTable('questions', {
  id: serial('id').primaryKey(),
  formId: integer('form_id').notNull(),
  sectionId: integer('section_id').notNull(),

  title: text('title').notNull(),
  type: text('type').notNull(),

  required: boolean('required').default(false),

  imageUrl: text('image_url'),
  videoUrl: text('video_url')
})

export const options = pgTable('options', {
  id: serial('id').primaryKey(),
  questionId: integer('question_id').notNull(),

  text: text('text').notNull(),
  imageUrl: text('image_url')
})