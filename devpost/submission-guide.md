---
status: draft-for-review
project: ReviewLens
document: Devpost Submission Preparation Guide
hackathon: Build With AI: Basics
team_size: 2
---

# Devpost Submission Preparation Guide: ReviewLens

> [!IMPORTANT]
> **Author Guidance:** In accordance with the Devpost Learn guidelines, your final submission answers should be reviewed, edited, and approved in your own words. Use this document as your verified technical baseline and structured field-by-field template.

---

## 1. Basic Information Fields

- **Project Name:** ReviewLens
- **Tagline / Short Description (under 200 characters):**  
  *AI-powered review trust checker for online shoppers: paste any product link for an explainable 0–100 trust score, risk signals, and plain-language buying advice.*
- **Public GitHub Repository URL:**  
  `https://github.com/thulasiramegowda/DevPost`
- **Demo Video URL:**  
  `[Pending: Upload your 1–3 minute unlisted YouTube or Loom link here]`
- **Optional Live Deployment URL:**  
  `[Optional: Add Vercel deployment URL if deployed]`

---

## 2. Devpost Story Prompts (Verified Baseline Content)

### Prompt 1: Inspiration
*Why did you build ReviewLens?*
> When shopping online, star ratings are often deceiving. A gadget rated 4.6 stars looks trustworthy at first glance, but beneath the surface it may be flooded with copy-pasted bot reviews, unverified buyer bursts, or sudden 5-star surges right before sales. Our persona, **Riya**, represents millions of shoppers who don't have the time to read hundreds of reviews to spot manipulation. We built ReviewLens to give shoppers instant, objective clarity before spending their hard-earned money.

### Prompt 2: What It Does
*What does the application do and how does it work?*
> ReviewLens is an AI-powered decision-support tool for online shoppers:
> 1. **Universal URL Analysis:** Shoppers paste any product link from Amazon, Flipkart, Myntra, Meesho, or other e-commerce sites.
> 2. **Real Product Image Fetching:** The system scrapes live page metadata (`og:image`, `twitter:image`, JSON-LD) to display actual product photos.
> 3. **Deterministic Review Integrity Engine (0–100):** Calculates an objective, explainable trust score based on 6 mathematical rules:
>    - Review velocity bursts (48h/72h spikes)
>    - Duplicate or templated wording clustering (≥ 70% similarity)
>    - Unverified purchaser account ratio
>    - Rating distribution imbalance (excessive 5-star concentration or bimodal polarization)
>    - Reviewer identity repetition
>    - Rating divergence between verified and unverified buyers
> 4. **Google Gemini 2.5 Flash Synthesis:** Generates a structured, grounded trust report featuring a 3-sentence shopper summary, verified positive themes, authentic customer complaints, and actionable buying advice.
> 5. **Interactive Light-Mode Dashboard:** Features a color-coded circular SVG trust ring, Recharts data charts (rating distribution, review timeline, buyer ratio donut), a flagged review feed, and persistent recent analyses history.

### Prompt 3: How We Built It
*What tools, frameworks, and architecture did you use?*
> We built ReviewLens as a single, full-stack Next.js 14 application:
> - **Frontend:** React 18, TypeScript, Tailwind CSS (minimalist light-mode palette inspired by Linear and Stripe), and Recharts.
> - **Backend:** Next.js App Router API routes (`/api/analyze`, `/api/health`, `/api/products`).
> - **AI Integration:** Google Generative AI SDK (`@google/generative-ai`) utilizing `gemini-2.5-flash` with strict JSON schema validation via Zod and rule-based offline fallbacks.
> - **Metadata Scraper:** Custom server-side HTML parser extracting live OpenGraph and JSON-LD images.
> - **Database & Persistence:** Prisma ORM connected to MySQL with schema optimizations (`@db.VarChar(191)` indexes for `utf8mb4` compatibility) and automatic in-memory fallback.

### Prompt 4: Two-Member Team Collaboration
*How did you collaborate as a team?*
> ReviewLens was developed through an intensive two-person collaboration between **Thulasiram Egowda** and **`[Teammate Full Name]`**:
> - **Joint Ideation & Scoping:** We paired to define the product boundary, focus on consumer trust rather than full e-commerce bloat, and formulate the 6 mathematical risk indicators.
> - **Architecture & AI Engineering:** We collaborated on the Next.js API architecture, calibrated the Gemini 2.5 Flash grounding prompt to prevent hallucinations, and built the OpenGraph scraper for real product imagery.
> - **Frontend & Data Visualization:** We designed the clean light-mode user experience, SVG circular trust score gauge, and interactive Recharts components.
> - **Testing & Quality Assurance:** We tested the system across multiple e-commerce platforms (Amazon India, Flipkart, Myntra, Meesho) and validated security to ensure zero credentials exist in Git.
> *(Note: Commits were pushed through the primary repository account `thulasiramegowda` during pair-programming sessions).*

### Prompt 5: Challenges We Ran Into
*What technical hurdles did you overcome?*
> 1. **MySQL utf8mb4 Index Limits:** MySQL restricts unique indexes to 767 bytes. In `utf8mb4`, each character consumes 4 bytes, causing standard 255-character strings to fail. We resolved this by explicitly typing index columns to `@db.VarChar(191)`.
> 2. **Varied E-Commerce HTML Structures:** Major shopping platforms format OpenGraph and image tags differently. We engineered a resilient fallback cascade (`og:image` $\rightarrow$ `twitter:image` $\rightarrow$ JSON-LD $\rightarrow$ Amazon high-res tags $\rightarrow$ category illustrations).
> 3. **AI Grounding & Hallucination Prevention:** Pure LLM outputs can hallucinate review statistics. We decoupled the architecture: deterministic algorithms compute mathematical facts first, and Gemini 2.5 Flash is strictly grounded to synthesize only those calculated signals.
> 4. **Concurrent Webpack Bundling:** Running development servers alongside production builds caused temporary chunk cache collisions (`Cannot find module './682.js'`). We identified the root cause, implemented clean cache purging, and established build isolation.

### Prompt 6: Accomplishments That We're Proud Of
- A working, production-quality full-stack application completed from scratch within the hackathon timeline.
- A dual-engine scoring architecture that provides 100% explainable deductions rather than an ungrounded "black box" AI score.
- Real-time product photo scraping and universal URL compatibility across Amazon, Flipkart, Myntra, and Meesho.
- High visual polish with zero dark-mode clutter, intuitive SVG score rings, and smooth progressive loading states.

### Prompt 7: What We Learned
- How to structure grounded AI applications by pairing deterministic mathematical checks with generative LLM synthesis.
- How to effectively use the **Devpost Learn Skill Pack** (`1-start` through `6-ship`) to scope tightly, avoid scope creep, and build slice by slice.
- Full-stack TypeScript type safety connecting Next.js server actions, Prisma ORM, and Google AI Studio APIs.

### Prompt 8: What's Next for ReviewLens
- Chrome / Firefox browser extension for instant 1-click review checking while browsing Amazon or Flipkart.
- Direct seller API integrations and historical review drift tracking over time.
- Multilingual review sentiment analysis supporting regional Indian languages (Hindi, Tamil, Kannada, etc.).

---

## 3. Devpost Learn Skill Pack Reflection
*How did you use the skill pack during the hackathon?*
- **`1-start`:** Initialized a clean workspace, established our two-member team profile, and aligned on flipped-interaction pair programming.
- **`2-scope`:** Conducted a rigorous scoping interview. We resisted the temptation to build an entire e-commerce platform and cut user authentication, admin panels, and shopping carts to focus 100% on review trust.
- **`3-prd`:** Outlined Riya's core journey, defined the 4 loading states, and established the 6 risk signal definitions before writing code.
- **`4-spec`:** Architected the Next.js App Router layout, Prisma MySQL schema, Zod validation schemas, and Gemini 2.5 Flash API contracts.
- **`5-build`:** Executed the build slice by slice, verifying each component with working code and end-to-end integration tests.
- **`6-ship`:** Audited documentation, verified zero secrets in version control, prepared the demo video script, and finalized submission materials.

---

## 4. Short Demo Video Recording Script (1–3 Minutes)

### Recommended Video Flow:

| Time | Screen / Action | Narration Focus |
| :--- | :--- | :--- |
| **0:00 – 0:30** | **Homepage (`http://localhost:3000`)** | Introduce yourself and your teammate. State the problem: *"Shoppers often get tricked by deceptive 4.6★ ratings on e-commerce sites. We built ReviewLens to check if reviews can truly be trusted."* |
| **0:30 – 1:00** | **Live Link Analysis** | Paste a real product link (e.g. an Amazon earbud or Myntra footwear link). Click **Analyze Reviews**. Highlight the 4 progressive loading messages reflecting live metadata extraction and AI synthesis. |
| **1:00 – 2:00** | **Trust Report Dashboard** | Walk through the generated report: <br>1. Point out the real product photo and store tag.<br>2. Explain the **Review Trust Score circular ring** (e.g. 100/100 High Trust).<br>3. Highlight the **Gemini 2.5 Flash AI summary**, verified positive themes, customer complaints, and buying advice.<br>4. Show the **6 deterministic risk-signal cards** with concrete evidence.<br>5. Scroll through the **Recharts charts** (rating distribution, review timeline, verified buyer ratio). |
| **2:00 – 2:30** | **Recent Analyses & Wrap-up** | Scroll down to the **Recent Analyses History** panel showing past evaluations with real thumbnails and instant 1-click reload. Mention that all code is open-source on GitHub, built with Next.js, MySQL, and Gemini 2.5 Flash. |

### Video Safety Checklist Before Recording:
- [ ] Ensure browser address bar does not show personal bookmarks or private tabs.
- [ ] Never display `.env` file or API keys on screen.
- [ ] Keep video duration strictly under 3 minutes (recommended 1:30 to 2:30).
- [ ] Upload to YouTube as **Unlisted** or **Public**, or to Loom/Vimeo with public viewing enabled.
