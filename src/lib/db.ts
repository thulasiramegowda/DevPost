import { PrismaClient } from "@prisma/client";
import { SEED_PRODUCTS, SeedProduct } from "../data/seedData";
import { ProductItem, ReviewItem } from "../types";

// Global Prisma Singleton
const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// In-memory cache fallback for demo/offline usage
interface InMemoryCacheItem {
  trustScore: number;
  trustLevel: string;
  geminiResponse: any;
  riskSignals: any;
  createdAt: Date;
}
const memoryAnalysisCache = new Map<string, InMemoryCacheItem>();

/**
 * Normalizes input URL or slug to find matches across common patterns.
 */
export function normalizeProductKey(input: string): string {
  const trimmed = input.trim().toLowerCase();
  // Strip protocol and query params for flexible matching
  try {
    const url = new URL(trimmed.startsWith("http") ? trimmed : `https://${trimmed}`);
    return url.pathname.replace(/\/+$/, "");
  } catch {
    return trimmed;
  }
}

/**
 * Checks if a live PostgreSQL connection is active and responsive.
 */
let isDbHealthy: boolean | null = null;
let lastDbCheck = 0;

async function checkDatabaseAvailable(): Promise<boolean> {
  const now = Date.now();
  if (isDbHealthy !== null && now - lastDbCheck < 30000) {
    return isDbHealthy;
  }
  try {
    if (
      !process.env.DATABASE_URL ||
      process.env.DATABASE_URL.includes("your_mysql_password") ||
      process.env.DATABASE_URL.includes("your_postgres")
    ) {
      isDbHealthy = false;
      lastDbCheck = now;
      return false;
    }
    // Ping with quick timeout
    await prisma.$queryRaw`SELECT 1`;
    isDbHealthy = true;
    lastDbCheck = now;
    return true;
  } catch (err) {
    isDbHealthy = false;
    lastDbCheck = now;
    return false;
  }
}

/**
 * Retrieves all products for demo dropdown or sample buttons.
 */
export async function getAllProducts(): Promise<ProductItem[]> {
  const useDb = await checkDatabaseAvailable();
  if (useDb) {
    try {
      const dbProducts = await prisma.product.findMany({
        orderBy: { createdAt: "desc" },
      });
      if (dbProducts.length > 0) {
        return dbProducts.map((p) => ({
          id: p.id,
          url: p.url,
          name: p.name,
          imageUrl: p.imageUrl,
          store: p.store,
          averageRating: p.averageRating,
          reviewCount: p.reviewCount,
        }));
      }
    } catch (e) {
      console.warn("Falling back to seed products list due to DB read error:", e);
    }
  }

  // Fallback to seeded products
  return SEED_PRODUCTS.map((p) => ({
    id: p.id,
    url: p.url,
    name: p.name,
    imageUrl: p.imageUrl,
    store: p.store,
    averageRating: p.averageRating,
    reviewCount: p.reviews.length,
  }));
}

/**
 * Finds a product by its URL or slug.
 */
export async function findProductByUrl(
  inputUrl: string
): Promise<{ product: ProductItem; reviews: ReviewItem[]; source: "database" | "demo_seed" } | null> {
  const normalizedInput = normalizeProductKey(inputUrl);
  const cleanInput = inputUrl.trim().toLowerCase();

  const useDb = await checkDatabaseAvailable();
  if (useDb) {
    try {
      // Find in Postgres
      const products = await prisma.product.findMany({
        include: { reviews: true },
      });

      const matched = products.find((p) => {
        const normP = normalizeProductKey(p.url);
        return (
          normP === normalizedInput ||
          p.url.toLowerCase() === cleanInput ||
          p.id.toLowerCase() === cleanInput ||
          normalizedInput.includes(p.id.toLowerCase()) ||
          cleanInput.includes(normP)
        );
      });

      if (matched) {
        return {
          product: {
            id: matched.id,
            url: matched.url,
            name: matched.name,
            imageUrl: matched.imageUrl,
            store: matched.store,
            averageRating: matched.averageRating,
            reviewCount: matched.reviewCount,
          },
          reviews: matched.reviews.map((r) => ({
            id: r.id,
            reviewerName: r.reviewerName,
            rating: r.rating,
            comment: r.comment,
            isVerifiedPurchase: r.isVerifiedPurchase,
            reviewDate: r.reviewDate.toISOString(),
          })),
          source: "database",
        };
      }
    } catch (e) {
      console.warn("DB query error in findProductByUrl, falling back to seed data:", e);
    }
  }

  // In-memory seed matching
  const seedMatched = SEED_PRODUCTS.find((p) => {
    const normP = normalizeProductKey(p.url);
    return (
      normP === normalizedInput ||
      p.url.toLowerCase() === cleanInput ||
      p.id.toLowerCase() === cleanInput ||
      cleanInput.includes(normP) ||
      cleanInput.includes(p.id.toLowerCase())
    );
  });

  if (seedMatched) {
    return {
      product: {
        id: seedMatched.id,
        url: seedMatched.url,
        name: seedMatched.name,
        imageUrl: seedMatched.imageUrl,
        store: seedMatched.store,
        averageRating: seedMatched.averageRating,
        reviewCount: seedMatched.reviews.length,
      },
      reviews: seedMatched.reviews.map((r) => ({
        id: r.id,
        reviewerName: r.reviewerName,
        rating: r.rating,
        comment: r.comment,
        isVerifiedPurchase: r.isVerifiedPurchase,
        reviewDate: r.reviewDate,
      })),
      source: "demo_seed",
    };
  }

  return null;
}

/**
 * Finds a product by its ID.
 */
export async function getProductById(id: string): Promise<{ product: ProductItem; reviews: ReviewItem[] } | null> {
  const useDb = await checkDatabaseAvailable();
  if (useDb) {
    try {
      const matched = await prisma.product.findUnique({
        where: { id },
        include: { reviews: true },
      });
      if (matched) {
        return {
          product: {
            id: matched.id,
            url: matched.url,
            name: matched.name,
            imageUrl: matched.imageUrl,
            store: matched.store,
            averageRating: matched.averageRating,
            reviewCount: matched.reviewCount,
          },
          reviews: matched.reviews.map((r) => ({
            id: r.id,
            reviewerName: r.reviewerName,
            rating: r.rating,
            comment: r.comment,
            isVerifiedPurchase: r.isVerifiedPurchase,
            reviewDate: r.reviewDate.toISOString(),
          })),
        };
      }
    } catch (e) {
      console.warn("DB query error in getProductById:", e);
    }
  }

  const seed = SEED_PRODUCTS.find((p) => p.id === id);
  if (!seed) return null;

  return {
    product: {
      id: seed.id,
      url: seed.url,
      name: seed.name,
      imageUrl: seed.imageUrl,
      store: seed.store,
      averageRating: seed.averageRating,
      reviewCount: seed.reviews.length,
    },
    reviews: seed.reviews.map((r) => ({
      id: r.id,
      reviewerName: r.reviewerName,
      rating: r.rating,
      comment: r.comment,
      isVerifiedPurchase: r.isVerifiedPurchase,
      reviewDate: r.reviewDate,
    })),
  };
}

/**
 * Retrieves cached analysis if performed within 24 hours.
 */
export async function getCachedAnalysis(productId: string): Promise<any | null> {
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const useDb = await checkDatabaseAvailable();
  if (useDb) {
    try {
      const cached = await prisma.analysisCache.findFirst({
        where: {
          productId,
          createdAt: { gte: twentyFourHoursAgo },
        },
        orderBy: { createdAt: "desc" },
      });

      if (cached) {
        return {
          trustScore: cached.trustScore,
          trustLevel: cached.trustLevel,
          geminiResponse: cached.geminiResponse,
          riskSignals: cached.riskSignals,
          createdAt: cached.createdAt,
        };
      }
    } catch (e) {
      console.warn("DB cache read failed:", e);
    }
  }

  // Memory cache fallback
  const mem = memoryAnalysisCache.get(productId);
  if (mem && mem.createdAt >= twentyFourHoursAgo) {
    return mem;
  }

  return null;
}

/**
 * Saves analysis to cache (Postgres and Memory).
 */
export async function saveAnalysisCache(
  productId: string,
  trustScore: number,
  trustLevel: string,
  geminiResponse: any,
  riskSignals: any
): Promise<void> {
  // Always update in-memory cache
  memoryAnalysisCache.set(productId, {
    trustScore,
    trustLevel,
    geminiResponse,
    riskSignals,
    createdAt: new Date(),
  });

  const useDb = await checkDatabaseAvailable();
  if (useDb) {
    try {
      await prisma.analysisCache.create({
        data: {
          productId,
          trustScore,
          trustLevel,
          geminiResponse,
          riskSignals,
        },
      });
    } catch (e) {
      console.warn("Failed to save analysis cache to DB:", e);
    }
  }
}
