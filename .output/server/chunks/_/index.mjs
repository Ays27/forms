import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { pgTable, text, timestamp, serial, integer, boolean, varchar } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

const forms = pgTable("forms", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
  // ✅ FIXED: auto-generate shareable id for public links
  shareId: text("share_id").unique().default(sql`gen_random_uuid()`)
});
const sections = pgTable("sections", {
  id: serial("id").primaryKey(),
  formId: integer("form_id").notNull(),
  title: text("title").notNull()
});
const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  formId: integer("form_id").notNull(),
  sectionId: integer("section_id").notNull(),
  title: text("title").notNull(),
  type: text("type").notNull(),
  required: boolean("required").default(false),
  imageUrl: text("image_url"),
  videoUrl: text("video_url"),
  // 🔥 KEEP ONLY IF YOU REALLY NEED IT (safe now)
  goToSectionId: integer("go_to_section_id"),
  maxLength: integer("max_length")
});
const options = pgTable("options", {
  id: serial("id").primaryKey(),
  questionId: integer("question_id").notNull(),
  text: text("text").notNull(),
  imageUrl: text("image_url")
});
const responses = pgTable("responses", {
  id: serial("id").primaryKey(),
  formId: integer("form_id").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
const responseAnswers = pgTable("response_answers", {
  id: serial("id").primaryKey(),
  responseId: integer("response_id").notNull(),
  questionId: integer("question_id").notNull(),
  value: text("value")
});
const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  ipAddress: varchar("ip_address", { length: 255 }),
  userAgent: text("user_agent"),
  userId: text("user_id").notNull()
});
const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id").notNull(),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

const schema = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  account: account,
  forms: forms,
  options: options,
  questions: questions,
  responseAnswers: responseAnswers,
  responses: responses,
  sections: sections,
  session: session,
  user: user,
  verification: verification
}, Symbol.toStringTag, { value: 'Module' }));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
const db = drizzle(pool, { schema });

export { responseAnswers as a, schema as b, db as d, forms as f, options as o, questions as q, responses as r, sections as s };
//# sourceMappingURL=index.mjs.map
