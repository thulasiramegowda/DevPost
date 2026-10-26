---
status: approved
project: ReviewLens
document: Scope Document
version: 2.1
team_size: 2
---

# Scope Document: ReviewLens

## 1. Project Overview & Problem Statement
Online shoppers frequently encounter products with glowing 4.5+ star ratings that mask serious quality defects, incentivized reviews, or coordinated astroturfing. E-commerce platforms display aggregate ratings that treat verified and unverified feedback identically, obscuring sudden review bursts, bot-templated comments, and recurring buyer complaints.

**ReviewLens** is an AI-powered review trust checker designed for everyday online shoppers (represented by our primary user persona, **Riya**). By pasting any e-commerce product URL, shoppers receive an instant, transparent, and explainable **Review Trust Score (0–100)**, evidence-based risk flags, an AI-synthesized trust summary, and practical buying guidance.

ReviewLens is built as an end-to-end working proof of concept (PoC) for the Devpost **"Build With AI: Basics"** hackathon.

---

## 2. The Unique Kernel
ReviewLens combines **deterministic mathematical risk algorithms** with **Google Gemini 2.5 Flash artificial intelligence** in a dual-engine architecture:
1. **Mathematical Grounding:** 6 transparent, reproducible algorithmic checks calculate objective risk deductions (0–100 score). No review is flagged without mathematical evidence.
2. **AI Synthesis:** Google Gemini 2.5 Flash ingests the reviews alongside the deterministic findings to synthesize a plain-language summary, distill positive themes, extract genuine customer complaints, and deliver practical buyer advice.

---

## 3. In-Scope Features (Verified & Implemented)

### Feature 1: Universal URL Analysis
- Users can paste product links from any e-commerce platform (Amazon, Flipkart, Myntra, Meesho, Shopify, etc.).
- The system extracts product identifiers, store names, and fetches live product imagery directly from web page metadata (`og:image`, `twitter:image`, JSON-LD) with category-based fallbacks.

### Feature 2: 6 Deterministic Risk Checks
- **Review Velocity Burst Check (up to 25 pts):** Detects unnatural spikes within 48-hour or 72-hour windows.
- **Duplicate & Templated Text Check (up to 20 pts):** Identifies near-identical or copy-pasted review wording via tokenized text similarity clustering (≥ 70% match).
- **Unverified Purchaser Ratio (up to 20 pts):** Evaluates the percentage of reviews originating from unverified accounts.
- **Rating Distribution Imbalance (up to 20 pts):** Detects abnormal 5-star clustering (≥ 85%) or polarized bimodal distributions.
- **Reviewer Repetition Check (up to 10 pts):** Flags duplicate reviewer accounts submitting multiple reviews for the same product.
- **Rating Divergence Check (up to 5 pts):** Measures significant star rating gaps between verified purchasers and unverified accounts.

### Feature 3: Gemini 2.5 Flash AI Trust Report
- Produces a structured JSON report grounded strictly in the provided reviews and mathematical evidence.
- Highlights authentic positive highlights, recurring customer pain points, and practical purchase guidance.
- Gracefully falls back to a deterministic rule-based report if the Gemini API is unreachable or rate-limited.

### Feature 4: Interactive Light-Mode SaaS UI
- Built with a clean, high-contrast light-mode aesthetic inspired by Linear, Stripe, and Notion (#FFFFFF and #F7F8FA backgrounds, #2563EB primary).
- Prominent SVG circular progress ring color-coded by trust tier:
  - **High Trust (80–100):** Green (`#16A34A`)
  - **Moderate Trust (60–79):** Blue (`#2563EB`)
  - **Low Trust (40–59):** Amber (`#F59E0B`)
  - **Very Low Trust (0–39):** Red (`#DC2626`)
- Interactive charts powered by Recharts (Rating distribution bar chart, Review timeline line chart, Verified purchase donut chart).
- Filterable customer review list with "Flagged signal" badges.

### Feature 5: Recent Analyses History
- Automatically captures evaluated products in browser `localStorage` and persists records to the backend database.
- Displays interactive history cards with live product thumbnails, store tags, trust level badges, and relative timestamps for instant one-click re-inspection.

### Feature 6: Dual Storage Architecture
- Primary persistence via Prisma ORM connected to MySQL (compatible with PostgreSQL/Neon).
- Zero-downtime offline memory fallback ensuring the application functions even when an external database is disconnected.

---

## 4. Explicitly Out of Scope (PoC Boundary)
To maintain a focused, high-quality hackathon proof of concept:
- **No User Authentication / Accounts:** ReviewLens is an open decision-support utility.
- **No Shopping Cart or Checkout:** The app does not facilitate direct purchases.
- **No Seller / Merchant Dashboards:** The platform is consumer-facing only.
- **No Unauthorized Live Backend Scraping:** The app extracts public OpenGraph metadata for images and synthesizes/loads review profiles safely without violating terms of service.
- **No Legal Fraud Claims:** The product positions itself strictly as an advisory decision-support tool. It flags statistical risk signals; it does not claim to legally prove a review is fake.

---

## 5. Two-Member Team Collaboration Context
ReviewLens was created collaboratively by a **two-member team**:
- **Member 1:** Thulasiram Egowda ([@thulasiramegowda](https://github.com/thulasiramegowda))
- **Member 2:** `[Teammate Name]` (`@[teammate-github-username]`)

Both members collaborated on project scoping, algorithmic design, UI/UX workflow, testing across e-commerce platforms, and documentation. Exact individual ownership areas are subject to final mutual confirmation by both team members.
