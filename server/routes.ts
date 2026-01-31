import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { db } from "./db";
import { products, teamMembers, publications } from "@shared/schema";

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
        name: "Silicon Nitride Waveguides",
        category: "Waveguides",
        description: "Ultra-low loss waveguides for photonic integrated circuits in the visible and near-infrared range.",
        specs: ["Loss: < 0.1 dB/m", "Material: Si3N4", "Range: 400-2500 nm"],
        imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070",
      },
      {
        name: "Bragg Gratings",
        category: "Bragg Gratings",
        description: "High-precision integrated filters for signal processing and sensing applications.",
        specs: ["Reflectivity: > 99%", "Bandwidth: < 0.1 nm", "Tunable: Thermal"],
        imageUrl: "https://images.unsplash.com/photo-1628126235206-5260b9ea6441?auto=format&fit=crop&q=80&w=2070",
      },
      {
        name: "Microring Resonators",
        category: "Microring Resonators",
        description: "Compact resonators with high Q-factors for nonlinear optics and quantum photonics.",
        specs: ["Q-factor: > 10^6", "FSR: 50-200 GHz", "Radius: 10-100 μm"],
        imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=2070",
      },
      {
        name: "Integrated Modulators",
        category: "Modulators",
        description: "High-speed electro-optic modulators for data communications and signal processing.",
        specs: ["Bandwidth: > 50 GHz", "Vpi: < 3 V", "Loss: < 2 dB"],
        imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2070",
      }
    ]);

    // Seed Team
    await db.insert(teamMembers).values([
      {
        name: "Dr. Alexey Volkov",
        role: "Chief Photonics Engineer",
        expertise: "Silicon Photonics, Nanofabrication",
        imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800",
      },
      {
        name: "Elena Petrova",
        role: "Lead Researcher",
        expertise: "Quantum Optics, Nonlinear Dynamics",
        imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
      },
      {
        name: "Dr. Dmitri Sokolov",
        role: "Head of R&D",
        expertise: "Integrated Circuits, Optoelectronics",
        imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800",
      },
      {
        name: "Maria Ivanova",
        role: "Senior Process Engineer",
        expertise: "Lithography, Etching Processes",
        imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800",
      }
    ]);

    // Seed Publications
    await db.insert(publications).values([
      {
        title: "High-Q silicon nitride microring resonators for nonlinear applications",
        authors: "A. Volkov, E. Petrova, et al.",
        journal: "Nature Photonics",
        year: 2025,
        doiUrl: "https://doi.org/10.1038/s41566-025-01234-x",
      },
      {
        title: "Integrated quantum photonic circuits for secure communication",
        authors: "D. Sokolov, M. Ivanova, et al.",
        journal: "Physical Review Letters",
        year: 2024,
        doiUrl: "https://doi.org/10.1103/PhysRevLett.132.012345",
      },
      {
        title: "Advancements in terahertz on-chip spectrometers",
        authors: "TIR Photonics Team",
        journal: "IEEE Journal of Selected Topics in Quantum Electronics",
        year: 2024,
        doiUrl: "https://doi.org/10.1109/JSTQE.2024.1234567",
      }
    ]);

    console.log("Seeding complete!");
  }
}
