import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: jsonb("name").$type<{ en: string; ru: string }>().notNull(),
  category: jsonb("category").$type<{ en: string; ru: string }>().notNull(),
  description: jsonb("description").$type<{ en: string; ru: string }>().notNull(),
  specs: jsonb("specs").$type<{ en: string[]; ru: string[] }>().notNull(),
  imageUrl: text("image_url").notNull(),
});

export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  name: jsonb("name").$type<{ en: string; ru: string }>().notNull(),
  role: jsonb("role").$type<{ en: string; ru: string }>().notNull(),
  expertise: jsonb("expertise").$type<{ en: string; ru: string }>().notNull(),
  imageUrl: text("image_url").notNull(),
});

export const publications = pgTable("publications", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  authors: text("authors").notNull(),
  journal: text("journal").notNull(),
  year: integer("year").notNull(),
  doiUrl: text("doi_url").notNull(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertProductSchema = createInsertSchema(products).omit({ id: true });
export const insertTeamMemberSchema = createInsertSchema(teamMembers).omit({ id: true });
export const insertPublicationSchema = createInsertSchema(publications).omit({ id: true });
export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({ id: true, createdAt: true });

export type Product = typeof products.$inferSelect;
export type TeamMember = typeof teamMembers.$inferSelect;
export type Publication = typeof publications.$inferSelect;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
