---
status: complete
project: ReviewLens
document: Product Requirements Document (PRD)
---

# Product Requirements Document (PRD): ReviewLens

## 1. Problem Statement
Online shoppers frequently encounter 4.5+ star products on e-commerce marketplaces whose reviews have been manipulated through bot-generated text, unverified review flooding, or concentrated review bursts. Shoppers have no fast, transparent way to audit reviews before purchase.

## 2. Core User Journey
1. User lands on ReviewLens Home page.
2. User pastes a product URL or clicks one of the sample product buttons.
3. User clicks "Analyze Reviews".
4. App transitions to a progressive 4-step loading state.
5. Backend resolves product details and runs 6 deterministic risk algorithms.
6. Backend invokes Gemini API for structured synthesis and caches results for 24 hours.
7. Frontend renders the Trust Report view:
   - Product summary & circular Review Trust Score ring (0–100)
   - Gemini AI plain-language summary, themes, complaints, and advice
   - Evidence-based risk signal cards with severity tags
   - Rating distribution, timeline, and purchase verification charts
   - Filterable customer review list with "Flagged signal" tags
8. If an unknown URL is entered, a friendly notice is shown with 1-click sample links.

## 3. Design System & UI Specifications
- Light-mode only (Linear / Stripe / Notion aesthetic)
- Colors: White (`#FFFFFF`), Slate canvas (`#F7F8FA`), Primary blue (`#2563EB`), Warning amber (`#F59E0B`), Risk red (`#DC2626`), Safe green (`#16A34A`), Border (`#E5E7EB`)
- 16px rounded card radius, soft elevation shadows, responsive layout
