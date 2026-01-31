import { db } from "./db";
import {
  products, teamMembers, publications, contactMessages,
  type Product, type TeamMember, type Publication, type ContactMessage, type InsertContactMessage
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getTeamMembers(): Promise<TeamMember[]>;
  getPublications(): Promise<Publication[]>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class DatabaseStorage implements IStorage {
  async getProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async getTeamMembers(): Promise<TeamMember[]> {
    return await db.select().from(teamMembers);
  }

  async getPublications(): Promise<Publication[]> {
    return await db.select().from(publications);
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const [message] = await db.insert(contactMessages).values(insertMessage).returning();
    return message;
  }
}

export const storage = new DatabaseStorage();
