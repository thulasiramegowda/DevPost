---
status: complete
project: ReviewLens
document: Technical Specification
---

# Technical Specification: ReviewLens

## Tech Stack
- **Framework:** Next.js 14+ (App Router)
- **Database:** Prisma ORM with PostgreSQL (Vercel Postgres / Neon Postgres) + In-memory fallback
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **AI Model:** Google Gemini API (`@google/generative-ai` / `gemini-1.5-flash`)
- **Charts:** Recharts
- **Validation:** Zod

## API Endpoints
- `POST /api/analyze`: Accepts `{ productUrl }`, runs deterministic checks, calls Gemini, caches result, returns report.
- `GET /api/products`: Lists demo products with metadata.
- `GET /api/products/[id]`: Returns single product details and cached analysis.
- `GET /api/health`: System health ping.

## Deterministic Scoring Engine
- Total starting score: 100
- Maximum deductions:
  - Review Burst: up to 25 pts
  - Duplicate / Similar text: up to 20 pts
  - Unverified purchase ratio: up to 20 pts
  - Rating distribution imbalance: up to 20 pts
  - Reviewer repetition: up to 10 pts
  - Extreme rating divergence: up to 5 pts
