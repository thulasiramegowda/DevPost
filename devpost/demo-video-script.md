# ReviewLens — 2-Minute Demo Video Script

> **Target Duration:** ~2:00 minutes (120 seconds)  
> **Platform:** Loom, OBS, or Windows Game Bar (`Win + Alt + R`)  
> **Screen to Record:** Browser window at `http://localhost:3000` (clean, full-screen)

---

## 🎬 Video Recording Plan

### [0:00 – 0:25] The Problem & The Solution
- **On Screen:** Start on the ReviewLens homepage (`http://localhost:3000`). Clean light-mode UI, headline visible: *"Know if the reviews can be trusted."*
- **What to Say:**
  > *"Hi everyone! We are a two-member team, and this is **ReviewLens** — an AI-powered review trust checker for online shoppers, built for the Devpost Build With AI Basics hackathon.*  
  >  
  > *When shopping on sites like Amazon, Flipkart, or Myntra, high star ratings can be deceiving. A 4.6-star product might look great, but it could be flooded with copy-pasted bot reviews, sudden 5-star surges, or unverified buyer accounts.*  
  >  
  > *Shoppers don't have time to read hundreds of reviews. ReviewLens gives them the real truth in seconds."*

---

### [0:25 – 0:50] Live Analysis & Progressive Loading
- **On Screen:** Paste an e-commerce link (e.g. an Amazon earbud link) into the search bar, then click the blue **"Analyze Reviews"** button.
- **What to Say:**
  > *"All a shopper has to do is paste any product link and click 'Analyze Reviews'.*  
  >  
  > *Watch the progressive loading screen. In the background, ReviewLens does two things at once: first, it extracts product metadata and scrapes the real product photo directly from the page's OpenGraph tags. Second, it sends the customer feedback through our dual-engine pipeline: running 6 deterministic mathematical risk checks, and synthesizing insights with Google Gemini 2.5 Flash."*

---

### [0:50 – 1:30] The Trust Report: Dual-Engine Magic
- **On Screen:** The report loads. Point your cursor to the product thumbnail, then to the circular score ring, AI report, and risk cards.
- **What to Say:**
  > *"And here is the complete Review Trust Report!*  
  >  
  > *At the top, you see the real product photo, store origin, and our prominent **Review Trust Score circular ring** — color-coded from High Trust down to Very Low Trust.*  
  >  
  > *In the middle is our **AI Trust Report** powered by Gemini 2.5 Flash. It translates complex review data into plain English: giving shoppers a 3-sentence summary, genuine positive highlights, real customer complaints, and practical buying guidance.*  
  >  
  > *Down here are our **6 Deterministic Risk Signals**. We never guess. We mathematically check for review velocity bursts, duplicate copy-paste text, unverified buyer ratios, rating imbalance, reviewer repetition, and rating divergence. Every point deduction is 100% explainable."*

---

### [1:30 – 1:45] Data Visualizations & Recent History
- **On Screen:** Scroll down smoothly to show the Recharts bar chart, line chart timeline, and the **Recent Analyses** section.
- **What to Say:**
  > *"Shoppers can visually inspect the rating distribution, review timeline over time, and verified purchase ratio with interactive charts.*  
  >  
  > *Plus, past evaluations are saved in the **Recent Analyses** panel with live thumbnails and trust badges for instant 1-click re-inspection."*

---

### [1:45 – 2:00] Tech Stack & Closing
- **On Screen:** Scroll back up to the hero section or show the GitHub repository tab.
- **What to Say:**
  > *"ReviewLens is built full-stack with Next.js 14, Tailwind CSS, Prisma ORM with MySQL, and Google Gemini 2.5 Flash. All our code and documentation are fully open-source on GitHub.*  
  >  
  > *Thank you for watching, and happy, confident shopping with ReviewLens!"*

---

## 💡 Quick Checklist Before You Record:
1. **Resolution:** Record at 1080p full screen.
2. **Zoom:** Press `Ctrl + Plus` once or twice in your browser so the fonts and score ring look nice and big on video.
3. **No Secrets:** Ensure no `.env` files or API keys are open on screen.
4. **Practice Run:** Do one quick 2-minute trial run with your microphone before the final take!
