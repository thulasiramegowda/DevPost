<div align="center">

![ReviewLens Banner](./assets/banner.png)

# ReviewLens 🔍

### AI-Powered Review Trust Checker for Online Shoppers
**Know if the reviews can be trusted.**

[![Demo Video](https://img.shields.io/badge/Vimeo-Watch%202--Min%20Demo%20Video-1AB7EA?style=for-the-badge&logo=vimeo&logoColor=white)](https://vimeo.com/1239530905?share=copy&fl=sv&fe=ci)
[![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Gemini 2.5 Flash](https://img.shields.io/badge/Google%20Gemini-2.5%20Flash-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://aistudio.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-MySQL-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

*Proof of Concept built for the Devpost **"Build With AI: Basics"** Hackathon*

---

</div>

## 📺 2-Minute Demo Video

> 🎬 **Watch the full demonstration on Vimeo:**  
> **[https://vimeo.com/1239530905](https://vimeo.com/1239530905?share=copy&fl=sv&fe=ci)**
>
> *Watch ReviewLens analyze live e-commerce product links in real time: dynamic OpenGraph image extraction, 6 deterministic mathematical risk checks, and Google Gemini 2.5 Flash review synthesis.*

---

## 👥 The Team

ReviewLens was created collaboratively by a **two-member team**:

- **Thulasi G T** — [@thulasiramegowda](https://github.com/thulasiramegowda)
- **Bhoomika G J** — [@bhoomikagj29-ux](https://github.com/bhoomikagj29-ux)

---

## 💡 What ReviewLens Does

When shopping online, star ratings can be deceiving. A product rated **4.6 stars** on Amazon, Flipkart, or Myntra might look like an immediate buy, but its rating could be artificially inflated by coordinated review velocity bursts, copy-pasted bot reviews, or unverified purchase flooding.

**ReviewLens** solves this problem. A shopper simply pastes any e-commerce product URL, and ReviewLens evaluates the product's review profile using a **dual-engine architecture**:

1. **Deterministic Risk Algorithms:** Runs 6 transparent, reproducible statistical checks to detect velocity bursts (48-hour surges), duplicate wording, unverified purchaser ratios, rating distribution imbalance, reviewer repetition, and extreme rating divergence.
2. **Gemini AI Synthesis:** Uses Google Gemini 2.5 Flash to generate a concise plain-language summary, highlight verified positive themes, extract authentic customer complaints, and provide practical buyer advice.

The result is a clear **Review Trust Score (0–100)**, an explainable breakdown of detected risk signals, interactive charts, and transparent buyer guidance.

---

## 🎯 Target Persona: Riya the Online Shopper

**Riya** is browsing an e-commerce site and finds a product with a 4.6-star rating. Before spending her hard-earned money, she wonders:
- *Are these reviews genuine or incentivized?*
- *Why were dozens of 5-star reviews posted in the same 48 hours?*
- *What are real paying customers actually complaining about?*

ReviewLens gives Riya the clarity she needs in seconds.

---

## ✨ Key Features

- 🔗 **Universal URL Analysis:** Paste links from **Amazon India, Flipkart, Myntra, Meesho**, or any standard e-commerce store.
- 🖼️ **Real Product Image Scraping:** Dynamically retrieves high-resolution product photography directly from page metadata (`og:image`, `twitter:image`, JSON-LD) with category-based smart fallbacks.
- 🔢 **Deterministic Trust Score (0–100):** Transparent mathematical scoring with explainable point deductions mapped directly to visible evidence cards.
- 🤖 **Google Gemini 2.5 Flash AI Report:** Grounded, hallucination-resistant shopper summaries, positive themes, complaints, and buying advice.
- 📜 **Recent Analyses History:** Automatically saves evaluated products with thumbnails, store tags, and trust badges for instant 1-click re-inspection.
- 📊 **Interactive Visualizations:** Recharts bar charts (rating distribution), line charts (review timeline), and donut charts (verified buyer ratio).
- 🚩 **Flagged Review Feed:** Browse reviews with distinct badges highlighting comments that triggered risk deductions.
- 🛡️ **Dual-Storage Persistence:** MySQL database via Prisma ORM with automatic zero-downtime in-memory fallback.

---

## 🏗️ Architecture & Data Flow

```mermaid
graph TD
    Client["Client Browser (Next.js 14 React 18 UI)"]
    API["API Route: /api/analyze (Next.js App Router)"]
    DB[("MySQL Database (Prisma ORM) / In-Memory Store")]
    ImgFetch["Image Fetcher (OpenGraph / JSON-LD Scraper)"]
    Engine["Deterministic Trust Score Engine (6 Checks)"]
    Gemini["Google Gemini 2.5 Flash API"]

    Client -->|"POST { productUrl }"| API
    API -->|"1. Lookup URL"| DB
    API -->|"2. Scrape live image"| ImgFetch
    API -->|"3. Synthesize & extract reviews"| Gemini
    API -->|"4. Calculate 0-100 score"| Engine
    API -->|"5. Generate grounded report"| Gemini
    API -->|"6. Cache product & reviews"| DB
    API -->|"JSON TrustReportPayload"| Client
```

---

## 📊 Transparent Review Trust Score Algorithm

ReviewLens calculates a transparent, explainable trust score from **0 to 100**. Every point deduction is mapped directly to a visible risk signal:

$$\text{Trust Score} = 100 - \sum_{i=1}^{6} D_i$$

| Check | Max Deduction | Trigger Criteria |
| :--- | :--- | :--- |
| **1. Review Burst** | up to 25 pts | > 35% of reviews or ≥ 14 reviews posted within a single 48-hour window |
| **2. Duplicate Wording** | up to 20 pts | Clustering of near-identical or templated review comments (≥ 70% similarity) |
| **3. Unverified Ratio** | up to 20 pts | Proportion of unverified purchaser accounts exceeds 40% (high risk at ≥ 70%) |
| **4. Rating Imbalance** | up to 20 pts | Extreme 5-star concentration (≥ 85%) or severe bimodal U-shape polarization |
| **5. Reviewer Repetition** | up to 10 pts | Identical reviewer names submitting multiple reviews for the same product |
| **6. Extreme Deviation** | up to 5 pts | Massive divergence (≥ 1.8★) between unverified reviews and verified buyer reviews |

### Trust Levels:
- **80 – 100:** **High Trust** (Green `#16A34A`) — Organic distribution, verified buyers, authentic sentiment.
- **60 – 79:** **Moderate Trust** (Blue `#2563EB`) — Minor repetitive wording or clustering; dependable with awareness.
- **40 – 59:** **Low Trust** (Amber `#F59E0B`) — Significant unverified reviews or velocity spikes; caution advised.
- **0 – 39:** **Very Low Trust** (Red `#DC2626`) — Critical astroturfing, copy-pasted templates, manufactured ratings.

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js 18+ (tested on Node v20/v24)
- npm or yarn
- MySQL (optional; in-memory storage fallback works out of the box)

### 1. Clone the repository and install dependencies
```bash
git clone https://github.com/thulasiramegowda/DevPost.git
cd DevPost
npm install
```

### 2. Configure environment variables
Copy the example environment file:
```bash
cp .env.example .env
```
Edit `.env` (Never commit this file; your keys and credentials stay 100% private):
```env
DATABASE_URL="mysql://root:your_mysql_password@localhost:3306/reviewlens"
GEMINI_API_KEY="your_gemini_api_key_here"
```
*(Note: If you run without a live database or Gemini API key, ReviewLens gracefully operates in demo mode using its high-fidelity in-memory seed dataset and rule-based synthesis).*

### 3. Generate Prisma client & seed the database (if using MySQL)
```bash
# Push schema to database
npm run db:push

# Seed realistic benchmark products & reviews
npm run db:seed
```

### 4. Start the development server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🌐 How to Deploy to Vercel

1. Push your repository to **GitHub**.
2. Go to [vercel.com](https://vercel.com) and import the repository.
3. In Vercel Project Settings, add the Environment Variables:
   - `DATABASE_URL`: Your connection string from [Aiven](https://aiven.io), [TiDB Cloud](https://tidbcloud.com), or Neon.
   - `GEMINI_API_KEY`: Your Google AI Studio API key from [aistudio.google.com](https://aistudio.google.com).
4. Click **Deploy**. Vercel will build the Next.js App Router app and provision the serverless API routes automatically.

---

## ⚠️ Limitations & Transparent Product Positioning

- **Decision Support, Not Proof:** ReviewLens is an advisory decision-support tool. It flags statistical anomalies and suspicious language patterns; it does **not** assert legal proof that a review is fraudulent.
- **Proof-of-Concept Boundary:** In this hackathon POC, review profiles are synthesized and analyzed via Gemini and local seeds to showcase the end-to-end user experience without unauthorized backend scraping.
- **E-Commerce Scope:** ReviewLens intentionally does not feature shopping carts, merchant administration, or account log-in to maintain a razor-sharp focus on buyer trust.

---

## 🛡️ AI Safety & Responsible Use Statement

- **Fact Fidelity:** Gemini AI is prompted with strict grounding rules preventing hallucination. All generated summaries and themes reference only verified reviews and deterministic calculations provided in the prompt context.
- **Explainability:** AI outputs are always presented alongside deterministic mathematical proofs and direct evidence quotes so users never have to take the model's word blindly.
- **Disclaimers:** Every AI report is prominently marked with: *"AI-generated summary based on available review signals."*

---

## 📄 License

This project is open-source software licensed under the [MIT License](LICENSE).
