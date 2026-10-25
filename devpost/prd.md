---
status: approved
project: ReviewLens
document: Product Requirements Document (PRD)
version: 2.0
---

# Product Requirements Document (PRD): ReviewLens

## 1. Universal Product Analysis Journey
1. The user visits ReviewLens.
2. The user pastes ANY e-commerce product link (or selects a sample link).
3. The user clicks "Analyze Reviews".
4. The system:
   - Checks if the URL exists in the database.
   - If found, loads its verified reviews and cached analysis.
   - If not previously analyzed, Gemini extracts product metadata and representative customer feedback based on the link.
   - Evaluates the 6 deterministic review risk algorithms.
   - Gemini synthesizes the structured plain-language AI Trust Report.
   - Saves the new product, reviews, and analysis to MySQL / storage.
5. The UI renders the complete trust report:
   - Product header & Review Trust Score circle (0–100)
   - AI Trust Report (summary, positive themes, complaints, recommendation)
   - Evidence-based risk signals with severity badges
   - Interactive charts (Rating distribution bar chart, timeline line chart, verified purchase donut chart)
   - Detailed review feed with "Flagged signal" tags

## 2. Universal vs Benchmark Coverage
- **Benchmark URLs:** 5 pre-calibrated products (boAt headphones, Prestige mixer, TurboPower charger, SlimGlow tea, Solimo chair) illustrating specific risk states (High Trust, Low Trust, Astroturfing, etc.).
- **Universal URLs:** Any link pasted from Amazon, Flipkart, Meesho, or other platforms is analyzed live by Gemini.
