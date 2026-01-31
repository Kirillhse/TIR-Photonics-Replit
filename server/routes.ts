import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { db } from "./db";
import { products, teamMembers, publications } from "@shared/schema";
import { sql } from "drizzle-orm";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get(api.products.list.path, async (req, res) => {
    const products = await storage.getProducts();
    res.json(products);
  });

  app.get(api.products.get.path, async (req, res) => {
    const product = await storage.getProduct(Number(req.params.id));
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  });

  app.get(api.team.list.path, async (req, res) => {
    const team = await storage.getTeamMembers();
    res.json(team);
  });

  app.get(api.publications.list.path, async (req, res) => {
    const pubs = await storage.getPublications();
    res.json(pubs);
  });

  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      const message = await storage.createContactMessage(input);
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Seed Data
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingProducts = await storage.getProducts();
  if (existingProducts.length === 0) {
    console.log("Seeding database...");
    
    // Seed Products
    await db.insert(products).values([
      {
        name: { en: "Silicon Nitride Waveguides", ru: "Нитрид-кремниевые волноводы" },
        category: { en: "Waveguides", ru: "Волноводы" },
        description: { 
          en: "Ultra-low loss waveguides for photonic integrated circuits.", 
          ru: "Волноводы с ультранизкими потерями для фотонных интегральных схем." 
        },
        specs: { 
          en: ["Loss: < 0.1 dB/m", "Material: Si3N4"], 
          ru: ["Потери: < 0.1 дБ/м", "Материал: Si3N4"] 
        },
        imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070",
      },
      {
        name: { en: "Bragg Gratings", ru: "Решетки Брэгга" },
        category: { en: "Bragg Gratings", ru: "Решетки Брэгга" },
        description: { 
          en: "High-precision integrated filters.", 
          ru: "Высокоточные интегрированные фильтры." 
        },
        specs: { 
          en: ["Reflectivity: > 99%", "Bandwidth: < 0.1 nm"], 
          ru: ["Отражательная способность: > 99%", "Ширина полосы: < 0.1 нм"] 
        },
        imageUrl: "https://images.unsplash.com/photo-1628126235206-5260b9ea6441?auto=format&fit=crop&q=80&w=2070",
      }
    ]);

    // Seed Team
    await db.insert(teamMembers).values([
      {
        name: { en: "Dr. Alexey Volkov", ru: "Д-р Алексей Волков" },
        role: { en: "Chief Photonics Engineer", ru: "Главный инженер по фотонике" },
        expertise: { en: "Silicon Photonics, Nanofabrication", ru: "Кремниевая фотоника, нанофабрикация" },
        imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800",
      }
    ]);

    // Seed Publications
    await db.insert(publications).values([
      {
        title: "High-Q silicon nitride microring resonators",
        authors: "A. Volkov, E. Petrova, et al.",
        journal: "Nature Photonics",
        year: 2025,
        doiUrl: "https://doi.org/10.1038/s41566-025-01234-x",
      }
    ]);

    console.log("Seeding complete!");
  }
}
