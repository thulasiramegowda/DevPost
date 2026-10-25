---
status: complete
project: ReviewLens
document: Hackathon Checklist
---

# Devpost "Build With AI: Basics" Checklist

- [x] Initialized Git repository
- [x] Project scaffolded with Next.js 14 App Router, TypeScript, and Tailwind CSS
- [x] Prisma ORM schema configured for PostgreSQL (`products`, `reviews`, `analysisCache`)
- [x] Seed data created for 5 realistic products with 30–50 Indian e-commerce reviews each
- [x] Deterministic trust engine implemented with 6 weighted checks
- [x] Google Gemini API integration built with Zod schema validation and graceful fallback
- [x] 24-hour analysis caching implemented
- [x] API routes created: `/api/analyze`, `/api/products`, `/api/products/[id]`, `/api/health`
- [x] Minimalist light-mode UI implemented (Linear/Stripe/Notion inspired)
- [x] Circular SVG Trust Score ring with color-coding
- [x] Progressive 4-step loading state with skeleton loaders
- [x] Recharts integration (Rating distribution, timeline velocity, verified donut)
- [x] Review feed with "Flagged signal" badges and filters
- [x] Friendly 404 state with clickable sample products
- [x] Production build passes with `npm run build`
- [x] Seed script runnable with `npm run db:seed`
- [x] Documentation complete (`README.md`, `.env.example`, `devpost/`)
