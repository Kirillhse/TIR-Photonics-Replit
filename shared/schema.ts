import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(), // 'Waveguides', 'Bragg gratings', etc.
  description: text("description").notNull(),
  specs: jsonb("specs").$type<string[]>().notNull(), // Array of strings
  imageUrl: text("image_url").notNull(),
});

export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  expertise: text("expertise").notNull(),
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
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type TeamMember = typeof teamMembers.$inferSelect;
export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;
export type Publication = typeof publications.$inferSelect;
export type InsertPublication = z.infer<typeof insertPublicationSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
