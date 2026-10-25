# ReviewLens 🔍

**AI-Powered Review Trust Checker for Online Shoppers**  
*Proof of Concept for the Devpost "Build With AI: Basics" Hackathon*

---

## 💡 What ReviewLens Does

When shopping online, star ratings can be deceiving. A product rated 4.6 stars might look like an easy buy, but its rating might be artificially inflated by coordinated review bursts, copy-pasted bot reviews, or unverified purchase flooding.

**ReviewLens** solves this problem. A shopper simply pastes an e-commerce product URL (from Amazon, Flipkart, or Meesho), and ReviewLens evaluates the product's review profile using a dual-engine architecture:
1. **Deterministic Risk Algorithms:** Runs reproducible statistical checks to detect velocity bursts (48-hour surges), duplicate wording, unverified purchaser ratios, rating distribution imbalance, reviewer repetition, and extreme rating divergence.
2. **Gemini AI Synthesis:** Generates a concise plain-language summary, highlights verified positive themes, extracts authentic customer complaints, and provides practical buyer advice.

The result is a clear **Review Trust Score (0–100)**, an explainable breakdown of detected risk signals, interactive charts, and transparent buyer guidance.

---

## 🎯 Target Persona: Riya the Online Shopper

**Riya** is browsing an e-commerce site and finds a fast charger with a 4.6-star rating. Before spending her hard-earned money, she wonders:
- *Are these reviews genuine or incentivized?*
- *Why were dozens of 5-star reviews posted in the same 48 hours?*
- *What are real paying customers actually complaining about?*

ReviewLens gives Riya the clarity she needs in 3 seconds.

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

## 🧪 Demo Product Links

ReviewLens comes seeded with 5 realistic Indian e-commerce products (Amazon, Flipkart, Meesho):

1. **High Trust Product (Score: 88–92 / High Trust)**  
   *boAt Rockerz 450 Bluetooth On-Ear Headphones with Mic*  
   `https://www.amazon.in/dp/B07PR1CL3S`  
   *(Healthy timeline, 92% verified buyers, balanced review mix)*

2. **Moderate Trust Product (Score: 70–75 / Moderate Trust)**  
   *Prestige Iris 750W Mixer Grinder with 3 Stainless Steel Jars*  
   `https://www.flipkart.com/prestige-iris-750-w-mixer-grinder/p/itm1234567`  
   *(Good motor, consistent recurring complaints about initial burning smell and jar gaskets)*

3. **Low Trust Product (Score: 45–50 / Low Trust)**  
   *TurboPower 65W GaN Dual-Port Fast Charger*  
   `https://www.amazon.in/dp/B09XYZ65W1`  
   *(4.6★ headline rating, but 18 reviews posted in a 48h burst, high unverified ratio)*

4. **Very Low Trust Product (Score: 0–25 / Very Low Trust)**  
   *SlimGlow Herbal Ayurvedic Detox Slimming Green Tea (28-Day Pack)*  
   `https://www.meesho.com/slimglow-herbal-detox-tea/p/sg9981`  
   *(4.9★ rating, 95% 5-star reviews, identical copy-paste wording, duplicate reviewer names)*

5. **Mixed Reviews Product (Score: 60–65 / Moderate Trust)**  
   *Amazon Brand - Solimo Ergonomic High-Back Mesh Office Chair*  
   `https://www.amazon.in/dp/B08SOLIMO8`  
   *(Genuine feedback on lumbar support & assembly delay, mixed with occasional clustered reviews)*

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js 18+ (tested on Node v20/v24)
- npm or yarn

### 1. Clone the repository and install dependencies
```bash
git clone <repository-url>
cd Build_With_AI_Project
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

### 3. Generate Prisma client & seed the database
```bash
# Push schema to database (if PostgreSQL is configured)
npm run db:push

# Seed the 5 realistic products & 180+ reviews
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
   - `DATABASE_URL`: Your connection string from [Neon.tech](https://neon.tech) or Vercel Postgres.
   - `GEMINI_API_KEY`: Your Google AI Studio API key from [aistudio.google.com](https://aistudio.google.com).
4. Click **Deploy**. Vercel will build the Next.js App Router app and provision the serverless API routes automatically.
5. In your local terminal or via Vercel CLI, run the seed script once to populate Neon/Vercel Postgres:
   ```bash
   DATABASE_URL="your_remote_neon_url" npm run db:seed
   ```

---

## ⚠️ Limitations & Transparent Product Positioning

- **Decision Support, Not Proof:** ReviewLens is an advisory decision-support tool. It flags statistical anomalies and suspicious language patterns; it does **not** assert legal proof that a review is fraudulent.
- **Proof-of-Concept Boundary:** In this hackathon POC, review data is served from a curated seed database representing realistic marketplace conditions rather than unauthorized live scraping.
- **E-Commerce Scope:** ReviewLens intentionally does not feature shopping carts, merchant administration, or account log-in to maintain a razor-sharp focus on buyer trust.

---

## 🛡️ AI Safety & Responsible Use Statement

- **Fact Fidelity:** Gemini AI is prompted with strict grounding rules preventing hallucination. All generated summaries and themes reference only verified reviews and deterministic calculations provided in the prompt context.
- **Explainability:** AI outputs are always presented alongside deterministic mathematical proofs and direct evidence quotes so users never have to take the model's word blindly.
- **Disclaimers:** Every AI report is prominently marked with: *"AI-generated summary based on available review signals."*
