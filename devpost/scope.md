---
status: approved
project: ReviewLens
document: Scope Document
version: 2.0
---

# Scope Document: ReviewLens

## The Problem
Online shoppers are frequently misled by manipulated e-commerce reviews (review bursts, unverified review flooding, copy-pasted bot comments). Shoppers need a fast, transparent trust check for any product they consider buying.

## The Unique Kernel
ReviewLens takes ANY e-commerce product URL, extracts review signals, executes 6 deterministic mathematical risk checks (0–100 score), and leverages Google Gemini AI to synthesize shopper-friendly summaries, positive themes, customer complaints, and buying advice.

## What's In Scope
1. **Universal URL Support:** Users can paste ANY product link (Amazon, Flipkart, Meesho, or other e-commerce sites).
2. **Gemini Dynamic Product & Review Extraction:** For any new URL, Gemini analyzes the product, synthesizes representative customer review profiles, and runs deterministic risk scoring.
3. **5 Curated Benchmark Demo Products:** High Trust, Moderate Trust, Low Trust, Very Low Trust, and Mixed for instant 1-click demonstrations.
4. **Transparent 0–100 Trust Score:** 6 weighted algorithmic checks (bursts, duplicate wording, unverified ratio, rating imbalance, reviewer repetition, rating divergence).
5. **Interactive Light-Mode SaaS UI:** Circular progress ring, Recharts charts, filterable review list with "Flagged signal" badges.
6. **Persistence & Caching:** Stores all analyzed products and reviews in MySQL / PostgreSQL with 24-hour cache.
7. **Vercel Cloud Ready:** Complete single-repo architecture deployable directly to Vercel.

## Explicitly Cut
- No shopping carts or checkout
- No merchant administration or seller moderation panels
- No user authentication / passwords
