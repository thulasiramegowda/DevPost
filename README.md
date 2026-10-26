# ReviewLens 🔍

**AI-Powered Review Trust Checker for Online Shoppers**  
*Proof of Concept for the Devpost "Build With AI: Basics" Hackathon*

---

## 👥 The Team & Collaboration

ReviewLens was created collaboratively by a **two-member team**:

| Team Member | GitHub Profile | Primary Areas of Contribution |
| :--- | :--- | :--- |
| **Thulasiram Egowda** | [@thulasiramegowda](https://github.com/thulasiramegowda) | Full-stack architecture, Next.js App Router, Gemini API prompt engineering, MySQL Prisma integration, Git repository management |
| **`[Teammate Full Name]`** | `@[teammate-github-username]` | `[To be confirmed: e.g. Product design, review-risk algorithm research, UI/UX implementation, cross-platform URL testing & validation]` |

> [!NOTE]
> **Collaboration Model:** ReviewLens was developed as an intensive pair-programming collaboration between both team members. While Git commits were pushed through the primary repository account (`thulasiramegowda`), the project reflects shared conceptualization, algorithm design, interface refinement, and multi-store testing. Both team members contributed to bringing ReviewLens from idea to working proof of concept.

---

## 💡 What ReviewLens Does

When shopping online, star ratings can be deceiving. A product rated 4.6 stars might look like an easy buy, but its rating might be artificially inflated by coordinated review bursts, copy-pasted bot reviews, or unverified purchase flooding.

**ReviewLens** solves this problem. A shopper simply pastes an e-commerce product URL (from Amazon, Flipkart, Myntra, Meesho, etc.), and ReviewLens evaluates the product's review profile using a dual-engine architecture:
1. **Deterministic Risk Algorithms:** Runs reproducible statistical checks to detect velocity bursts (48-hour surges), duplicate wording, unverified purchaser ratios, rating distribution imbalance, reviewer repetition, and extreme rating divergence.
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

1. **Universal URL Analysis:** Paste links from Amazon, Flipkart, Myntra, Meesho, or any e-commerce site.
2. **Real Product Image Scraping:** Dynamically retrieves high-resolution product photography via page metadata (`og:image`, `twitter:image`, JSON-LD) with smart category fallbacks.
3. **Deterministic Trust Score (0–100):** Transparent mathematical scoring with explainable point deductions mapped directly to visible evidence cards.
4. **Google Gemini 2.5 Flash AI Report:** Grounded, hallucination-resistant shopper summaries, positive themes, complaints, and buying advice.
5. **Recent Analyses History:** Automatically saves evaluated products with thumbnails, store tags, and trust badges for instant 1-click re-inspection.
6. **Interactive Visualizations:** Recharts bar charts (rating distribution), line charts (review timeline), and donut charts (verified buyer ratio).
7. **Flagged Review Feed:** Browse reviews with distinct badges highlighting comments that triggered risk deductions.
8. **Dual-Storage Persistence:** MySQL database via Prisma ORM with automatic zero-downtime in-memory fallback.

---

## 🏗️ Architecture & Tech Stack

ReviewLens is built as a single full-stack Next.js project designed for deployment directly to Vercel:

- **Framework:** Next.js 14+ (App Router, Server-side API routes, React 18)
- **Language:** TypeScript (Strict typing across client, server, and algorithms)
- **Styling:** Tailwind CSS (Custom design system: Linear/Stripe/Notion minimalist light-mode aesthetic)
- **Database & ORM:** Prisma ORM with MySQL & PostgreSQL compatibility + Zero-downtime offline memory fallback
- **AI Integration:** Google Generative AI (`gemini-2.5-flash`) with structured JSON schema validation and rule-based fallback
- **Image Intelligence:** Live product image extraction engine from metadata (`og:image`, `twitter:image`, JSON-LD)
- **Data Visualization:** Recharts (Rating distribution, Review timeline, Verified purchase donut)
- **Validation:** Zod (Request payload and AI output schema validation)
- **Icons:** Lucide React

---

## 📊 Transparent Review Trust Score Algorithm

ReviewLens calculates a transparent, explainable trust score from **0 to 100**. Every point deduction is mapped directly to a visible risk signal:

| Check | Max Deduction | Trigger Criteria |
| :--- | :--- | :--- |
| **1. Review Burst** | up to 25 pts | > 35% of reviews or ≥ 14 reviews posted within a single 48-hour window |
| **2. Duplicate Wording** | up to 20 pts | Clustering of near-identical or templated review comments (≥ 70% similarity) |
| **3. Unverified Ratio** | up to 20 pts | Proportion of unverified purchaser accounts exceeds 40% (high risk at ≥ 70%) |
| **4. Rating Imbalance** | up to 20 pts | Extreme 5-star concentration (≥ 85%) or severe bimodal U-shape polarization |
| **5. Reviewer Repetition** | up to 10 pts | Identical reviewer names submitting multiple reviews for the same product |
| **6. Extreme Deviation** | up to 5 pts | Massive divergence (≥ 1.8★) between unverified reviews and verified buyer reviews |

### Trust Levels:
- **80 – 100:** **High Trust** (Green) — Organic distribution, verified buyers, authentic sentiment.
- **60 – 79:** **Moderate Trust** (Blue) — Minor repetitive wording or clustering; dependable with awareness.
- **40 – 59:** **Low Trust** (Amber) — Significant unverified reviews or velocity spikes; caution advised.
- **0 – 39:** **Very Low Trust** (Red) — Critical astroturfing, copy-pasted templates, manufactured ratings.

---

## 🤖 Role of Gemini AI

Gemini AI acts as the **intelligent synthesizer**:
- Reads the capped set of customer reviews alongside backend deterministic risk signals.
- Generates a 3-sentence shopper-friendly summary explaining the trust rating.
- Distills authentic positive themes (e.g. "Punchy bass response", "Fast charging turnaround").
- Extracts recurring customer complaints (e.g. "Heating concerns", "Fragile headband hinge").
- Gives actionable buyer advice (e.g. "Safe to purchase" vs "Strongly advise against purchasing").

**Fail-safe guarantee:** If `GEMINI_API_KEY` is not provided or quota limits are exceeded, ReviewLens seamlessly generates a high-quality rule-based report from the deterministic signals. The user experience never fails.

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
Open [http://localhost:3000](http://localhost:3000) in your browser.

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
