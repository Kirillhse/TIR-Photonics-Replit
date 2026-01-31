import { z } from 'zod';
import { insertProductSchema, insertTeamMemberSchema, insertPublicationSchema, insertContactMessageSchema, products, teamMembers, publications, contactMessages } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  products: {
    list: {
      method: 'GET' as const,
      path: '/api/products',
      responses: {
        200: z.array(z.custom<typeof products.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/products/:id',
      responses: {
        200: z.custom<typeof products.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
  team: {
    list: {
      method: 'GET' as const,
      path: '/api/team',
      responses: {
        200: z.array(z.custom<typeof teamMembers.$inferSelect>()),
      },
    },
  },
  publications: {
    list: {
      method: 'GET' as const,
      path: '/api/publications',
      responses: {
        200: z.array(z.custom<typeof publications.$inferSelect>()),
      },
    },
  },
  contact: {
    submit: {
      method: 'POST' as const,
      path: '/api/contact',
      input: insertContactMessageSchema,
      responses: {
        201: z.custom<typeof contactMessages.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
