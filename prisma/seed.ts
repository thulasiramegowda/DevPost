import { PrismaClient } from "@prisma/client";
import { SEED_PRODUCTS } from "../src/data/seedData";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting ReviewLens database seeding...");

  for (const prod of SEED_PRODUCTS) {
    console.log(`- Upserting product: ${prod.name}`);

    // Create or update product
    const product = await prisma.product.upsert({
      where: { url: prod.url },
      update: {
        name: prod.name,
        imageUrl: prod.imageUrl,
        store: prod.store,
        averageRating: prod.averageRating,
        reviewCount: prod.reviews.length,
      },
      create: {
        id: prod.id,
        url: prod.url,
        name: prod.name,
        imageUrl: prod.imageUrl,
        store: prod.store,
        averageRating: prod.averageRating,
        reviewCount: prod.reviews.length,
      },
    });

    // Delete existing reviews for this product to prevent duplicates during re-seeding
    await prisma.review.deleteMany({
      where: { productId: product.id },
    });

    // Bulk insert reviews
    console.log(`  Inserting ${prod.reviews.length} reviews for ${product.name}...`);
    await prisma.review.createMany({
      data: prod.reviews.map((r) => ({
        id: r.id,
        productId: product.id,
        reviewerName: r.reviewerName,
        rating: r.rating,
        comment: r.comment,
        isVerifiedPurchase: r.isVerifiedPurchase,
        reviewDate: new Date(r.reviewDate),
      })),
    });
  }

  console.log("✅ ReviewLens database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error while seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
