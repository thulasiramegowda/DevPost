---
status: approved
project: ReviewLens
document: Technical Specification
version: 2.0
---

# Technical Specification: ReviewLens

## Database & ORM
- Prisma ORM configured for MySQL (and compatible with PostgreSQL / cloud databases).
- Tables: `products`, `reviews`, `analysisCache`.
- Dual storage architecture: Prisma MySQL queries with zero-downtime in-memory fallback.

## Universal URL Processing
- Route: `POST /api/analyze`
- If product URL exists in database: returns cached/stored product and reviews.
- If product URL is new:
  - Invokes `synthesizeProductAndReviewsFromUrl(productUrl)` in `src/lib/gemini.ts`.
  - Gemini parses product title, store, rating, and generates 30 realistic Indian e-commerce reviews with varied dates and purchase verification statuses.
  - Passes reviews to `analyzeReviewsDeterministically()` in `src/lib/trustEngine.ts`.
  - Passes deterministic results back to Gemini for final shopper synthesis.
  - Automatically persists the new product and reviews in MySQL (`prisma.product.create` and `prisma.review.createMany`).
  - Returns the complete unified `TrustReportPayload`.
