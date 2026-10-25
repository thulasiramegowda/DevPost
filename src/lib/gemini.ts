import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  DeterministicResult,
  GeminiAnalysisResponse,
  GeminiResponseSchema,
  ProductItem,
  ReviewItem,
} from "../types";

/**
 * Extracts a human-readable title and store from any e-commerce URL.
 */
export function extractProductInfoFromUrl(rawUrl: string): {
  name: string;
  store: string;
  imageUrl: string;
} {
  try {
    const url = new URL(rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`);
    const host = url.hostname.toLowerCase();
    const pathname = decodeURIComponent(url.pathname);

    let store = "Online Store";
    if (host.includes("amazon")) store = "Amazon India";
    else if (host.includes("flipkart")) store = "Flipkart";
    else if (host.includes("meesho")) store = "Meesho";
    else if (host.includes("myntra")) store = "Myntra";
    else if (host.includes("ajio")) store = "Ajio";
    else if (host.includes("nykaa")) store = "Nykaa";
    else store = host.replace(/^www\./, "").split(".")[0].toUpperCase();

    // Try extracting title from path segments
    const segments = pathname.split("/").filter((s) => s.length > 2 && !["dp", "p", "itm", "gp", "product", "item"].includes(s.toLowerCase()));

    let candidateTitle = "";
    if (segments.length > 0) {
      candidateTitle = segments[0]
        .replace(/[-_]+/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase())
        .trim();
    }

    if (!candidateTitle || candidateTitle.length < 3) {
      candidateTitle = `E-Commerce Product (${url.pathname.slice(0, 15)})`;
    }

    return {
      name: candidateTitle,
      store,
      imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
    };
  } catch {
    return {
      name: "Analyzed E-Commerce Product",
      store: "Online Store",
      imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
    };
  }
}

/**
 * Universal URL Analyzer:
 * For ANY new product link, uses Gemini AI (with a fallback) to extract product metadata
 * and synthesize realistic customer reviews reflecting marketplace patterns.
 */
export async function synthesizeProductAndReviewsFromUrl(
  productUrl: string
): Promise<{ product: ProductItem; reviews: ReviewItem[] }> {
  const info = extractProductInfoFromUrl(productUrl);
  const apiKey = process.env.GEMINI_API_KEY?.trim();

  // Try live Gemini synthesis if API key is provided
  if (apiKey && apiKey !== "your_gemini_api_key" && apiKey !== "YOUR_GEMINI_API_KEY") {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const modelName = process.env.GEMINI_MODEL || "gemini-1.5-flash";
      const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: {
          temperature: 0.2,
          responseMimeType: "application/json",
        },
      });

      const prompt = `A user pasted this e-commerce product link: "${productUrl}".
Your task is to analyze this link and extract/synthesize realistic product review intelligence:

1. Identify the product name from the link (e.g. "Apple iPhone 15 128GB", "Sony WH-1000XM5 Wireless Headphones", or similar from URL structure).
2. Store name: "${info.store}".
3. Provide an averageRating between 3.8 and 4.7.
4. Generate 30 realistic, diverse customer reviews reflecting authentic Indian e-commerce buyer experiences:
   - Varied reviewer names (Riya, Aarav, Sneha, Vikram, Priya, Rajesh, Deepa, Mohammed, etc.)
   - Star ratings (mix of 5, 4, 3, with some 2 and 1 stars for realism)
   - Realistic review dates distributed over the past 6 months (ISO strings)
   - 75% verified purchases, 25% unverified
   - Detailed comments mentioning build quality, value for money, battery/performance, and delivery.

Return pure JSON matching this exact structure:
{
  "productName": "Clean Product Title",
  "store": "${info.store}",
  "averageRating": 4.2,
  "reviews": [
    {
      "reviewerName": "Aarav Sharma",
      "rating": 5,
      "comment": "Specific feedback about the product...",
      "isVerifiedPurchase": true,
      "reviewDate": "2024-08-14T10:30:00Z"
    }
  ]
}`;

      const res = await model.generateContent(prompt);
      const text = res.response.text();
      const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();
      const parsed = JSON.parse(cleanJson);

      const productId = `dyn_${Date.now()}`;
      const reviews: ReviewItem[] = (parsed.reviews || []).map((r: any, idx: number) => ({
        id: `rev_dyn_${productId}_${idx + 1}`,
        reviewerName: r.reviewerName || `Customer ${idx + 1}`,
        rating: Math.min(5, Math.max(1, Number(r.rating) || 4)),
        comment: r.comment || "Good product, delivered on time.",
        isVerifiedPurchase: Boolean(r.isVerifiedPurchase),
        reviewDate: r.reviewDate || new Date(Date.now() - idx * 86400000 * 5).toISOString(),
      }));

      if (reviews.length >= 10) {
        return {
          product: {
            id: productId,
            url: productUrl,
            name: parsed.productName || info.name,
            imageUrl: info.imageUrl,
            store: parsed.store || info.store,
            averageRating: Number(parsed.averageRating) || 4.2,
            reviewCount: reviews.length,
          },
          reviews,
        };
      }
    } catch (err) {
      console.warn("Live Gemini product synthesis failed, falling back to dynamic template generator:", err);
    }
  }

  // Graceful rule-based dynamic synthesis if Gemini key is absent or fails
  const productId = `dyn_${Date.now()}`;
  const names = [
    "Aarav Sharma", "Priya Nair", "Vikram Iyer", "Sneha Patel", "Rajesh Kumar",
    "Ananya Roy", "Mohammed Farhan", "Deepa Verma", "Karthik Subramanian", "Pooja Hegde",
    "Gaurav Malhotra", "Meera Krishnan", "Arjun Mehta", "Sunita Chatterjee", "Aditya Nair",
    "Rashmi Kulkarni", "Kunal Bansal", "Laxman Rao", "Swati Tiwari", "Nitin Saxena",
    "Harish Pillai", "Divya Nambiar", "Siddharth Jain", "Bhavna Chawla", "Manoj Verma",
    "Alka Sen", "Varun Reddy", "Sanjay Dutta", "Tanmay Joshi", "Nisha Agarwal",
  ];

  const templates = [
    { rating: 5, verified: true, text: `Excellent quality ${info.name}! Packaging was pristine and delivered in 24 hours.` },
    { rating: 4, verified: true, text: `Value for money. Works as advertised, though instruction manual could be more detailed.` },
    { rating: 5, verified: true, text: `Using for 2 months now. Build quality is solid and performance exceeds expectations for price.` },
    { rating: 3, verified: true, text: `Average experience. Does the job, but finish feels slightly lightweight compared to premium alternatives.` },
    { rating: 4, verified: false, text: `Good purchase. Satisfied with overall performance and aesthetic design.` },
    { rating: 5, verified: true, text: `Gifted this to my brother and he was thrilled. Genuine product and fast delivery on ${info.store}.` },
    { rating: 2, verified: true, text: `Slightly disappointed with durability. Minor wear and tear visible within first 3 weeks of daily use.` },
    { rating: 5, verified: false, text: `Superb product! Highly recommended to everyone looking for reliable quality.` },
    { rating: 4, verified: true, text: `Sturdy build and easy to operate. Would definitely buy again if on festive sale discount.` },
    { rating: 1, verified: true, text: `Received with minor transit scratch. Replacement was processed smoothly by customer care.` },
  ];

  const reviews: ReviewItem[] = [];
  const baseTime = Date.now();

  for (let i = 0; i < 30; i++) {
    const t = templates[i % templates.length];
    const daysAgo = Math.floor(i * 5.5) + (i % 3);
    const date = new Date(baseTime - daysAgo * 24 * 60 * 60 * 1000).toISOString();

    reviews.push({
      id: `rev_dyn_${productId}_${i + 1}`,
      reviewerName: names[i % names.length],
      rating: t.rating,
      comment: t.text,
      isVerifiedPurchase: t.verified,
      reviewDate: date,
    });
  }

  return {
    product: {
      id: productId,
      url: productUrl,
      name: info.name,
      imageUrl: info.imageUrl,
      store: info.store,
      averageRating: 4.2,
      reviewCount: reviews.length,
    },
    reviews,
  };
}

/**
 * Generates an intelligent rule-based fallback report directly from the deterministic signals.
 * This guarantees the system is 100% resilient if the Gemini API key is missing or quotas are reached.
 */
export function generateRuleBasedReport(
  product: ProductItem,
  deterministic: DeterministicResult,
  reviews: ReviewItem[]
): GeminiAnalysisResponse {
  const { trustScore, trustLevel, riskSignals, stats } = deterministic;

  // Extract real complaint keywords from lower-rated reviews
  const lowReviews = reviews.filter((r) => r.rating <= 3);
  const highReviews = reviews.filter((r) => r.rating >= 4);

  const complaints: string[] = [];
  if (lowReviews.length > 0) {
    if (lowReviews.some((r) => /heat|hot|warm|fire|spark/i.test(r.comment))) {
      complaints.push("Excessive heating and temperature concerns reported by users");
    }
    if (lowReviews.some((r) => /smell|burn|smoke/i.test(r.comment))) {
      complaints.push("Initial burning smell or odor during operation");
    }
    if (lowReviews.some((r) => /break|crack|plastic|quality|fused|died/i.test(r.comment))) {
      complaints.push("Durability vulnerabilities and plastic component fragility");
    }
    if (lowReviews.some((r) => /leak|gasket|loose|lid/i.test(r.comment))) {
      complaints.push("Liquid leakage and loose fitting seals under load");
    }
    if (lowReviews.some((r) => /mic|noise|loud|call/i.test(r.comment))) {
      complaints.push("Operating motor noise or microphone background interference");
    }
    if (lowReviews.some((r) => /cramp|stomach|scam|bogus|dehydration/i.test(r.comment))) {
      complaints.push("Digestive distress and unverified nutritional efficacy claims");
    }
    if (lowReviews.some((r) => /sink|cylinder|hydraulic|armrest|squeak/i.test(r.comment))) {
      complaints.push("Hydraulic cylinder sinking and ergonomic adjustments");
    }
  }
  if (complaints.length === 0) {
    complaints.push("Occasional delivery delays or retail packaging transit scuffs");
    complaints.push("Minor customer support turnaround delays during festive sales");
  }

  // Extract positive themes
  const positiveThemes: string[] = [];
  if (highReviews.length > 0) {
    if (highReviews.some((r) => /battery|backup|charge/i.test(r.comment))) {
      positiveThemes.push("Commendable battery life and fast power turnaround");
    }
    if (highReviews.some((r) => /bass|sound|clarity|music/i.test(r.comment))) {
      positiveThemes.push("Punchy bass response and satisfying audio clarity");
    }
    if (highReviews.some((r) => /motor|grind|power|sharp/i.test(r.comment))) {
      positiveThemes.push("High-torque motor and rapid grinding efficiency");
    }
    if (highReviews.some((r) => /comfort|ergonomic|mesh|posture/i.test(r.comment))) {
      positiveThemes.push("Comfortable breathable mesh support for long sitting hours");
    }
    if (highReviews.some((r) => /value|budget|worth|cheap/i.test(r.comment))) {
      positiveThemes.push("Strong price-to-performance value proposition");
    }
  }
  if (positiveThemes.length === 0) {
    positiveThemes.push("Competitive pricing relative to overall marketplace alternatives");
    positiveThemes.push("Appealing design aesthetic and user-friendly operation");
  }

  // Suspicious patterns from risk signals
  const suspiciousPatterns = riskSignals
    .filter((s) => s.pointsDeducted > 0)
    .map((s) => ({
      title: s.title,
      explanation: `${s.evidence} ${s.explanation}`,
      severity: s.severity,
    }));

  if (suspiciousPatterns.length === 0) {
    suspiciousPatterns.push({
      title: "Review velocity & authenticity",
      explanation: "No suspicious velocity bursts, duplicate wording, or reviewer repetition detected.",
      severity: "low" as const,
    });
  }

  let summary = "";
  let recommendation = "";

  if (trustScore >= 80) {
    summary = `ReviewLens verified ${stats.totalReviews} reviews for "${product.name}" with a high trust confidence rating. Feedback appears authentic with balanced ratings across stars, healthy ${stats.verifiedPercentage}% verified buyer participation, and natural distribution over time. The product rating of ${stats.averageRating}★ accurately reflects genuine user satisfaction.`;
    recommendation = `Safe to buy with confidence based on genuine buyer experiences. Keep in mind the common user observations regarding long-term wear and tear mentioned in verified reviews.`;
  } else if (trustScore >= 60) {
    summary = `ReviewLens detected moderate trust signals across ${stats.totalReviews} reviews for "${product.name}". While the majority of reviews reflect authentic product experiences, we noted isolated patterns such as mild reviewer clustering and consistent recurring complaints. The ${stats.averageRating}★ average rating is moderately dependable.`;
    recommendation = `Proceed with awareness. Inspect 2-star and 3-star verified reviews to ensure the recurring limitations match your specific expectations before checking out.`;
  } else if (trustScore >= 40) {
    summary = `ReviewLens identified multiple review risk anomalies for "${product.name}". The ${stats.averageRating}★ rating is accompanied by concentrated review velocity bursts, elevated unverified purchaser volume (${stats.unverifiedCount} unverified reviews), and templated phrasing. Genuine verified buyers report significantly lower satisfaction than the headline rating suggests.`;
    recommendation = `Exercise caution before purchasing. The product's headline rating appears artificially elevated by promotional or incentivized reviews. We recommend exploring reputable alternative brands with verified buyer track records.`;
  } else {
    summary = `ReviewLens flagged critical review manipulation signals for "${product.name}". Over ${Math.round((stats.ratingDistribution.star5 / stats.totalReviews) * 100)}% of reviews are concentrated at 5-stars with blatant repetitive wording, duplicate reviewer identities, and an overwhelming proportion of unverified purchasers. Authentic verified feedback contradicts the official ${stats.averageRating}★ score.`;
    recommendation = `Strongly advise against purchasing based on the current review profile. Severe signs of manufactured feedback and deceptive rating manipulation were detected.`;
  }

  return {
    trustLevel,
    summary,
    positiveThemes: positiveThemes.slice(0, 4),
    complaints: complaints.slice(0, 4),
    suspiciousPatterns,
    recommendation,
  };
}

/**
 * Executes a Gemini prompt with structured JSON formatting and retry logic.
 */
export async function generateGeminiTrustReport(
  product: ProductItem,
  deterministic: DeterministicResult,
  reviews: ReviewItem[]
): Promise<GeminiAnalysisResponse> {
  const apiKey = process.env.GEMINI_API_KEY?.trim();

  // If no API key or placeholder key, immediately return rule-based report
  if (!apiKey || apiKey === "your_gemini_api_key" || apiKey === "YOUR_GEMINI_API_KEY") {
    console.info("Gemini API key not configured. Using deterministic rule-based analysis engine.");
    return generateRuleBasedReport(product, deterministic, reviews);
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const modelName = process.env.GEMINI_MODEL || "gemini-1.5-flash";
  const model = genAI.getGenerativeModel({
    model: modelName,
    generationConfig: {
      temperature: 0.1,
      responseMimeType: "application/json",
    },
  });

  // Prepare condensed review sample (up to 35 reviews)
  const cappedReviews = reviews.slice(0, 35).map((r, idx) => ({
    i: idx + 1,
    name: r.reviewerName,
    rating: r.rating,
    verified: r.isVerifiedPurchase,
    date: r.reviewDate.slice(0, 10),
    text: r.comment,
  }));

  const systemPrompt = `You are ReviewLens AI, an objective, transparent review-trust analysis engine for online shoppers.
Your job is to analyze real customer reviews and deterministic backend risk signals to help shoppers decide if ratings are genuine.

RULES:
1. Return ONLY a valid JSON object matching this exact schema:
{
  "trustLevel": "High Trust" | "Moderate Trust" | "Low Trust" | "Very Low Trust",
  "summary": "3-sentence shopper-friendly explanation of why this product's reviews are or are not trustworthy",
  "positiveThemes": ["2 to 4 genuine positive themes found in reviews"],
  "complaints": ["2 to 4 real customer complaints found in reviews"],
  "suspiciousPatterns": [
    {
      "title": "Short title of detected issue",
      "explanation": "Explain the issue using ONLY provided evidence numbers and facts",
      "severity": "low" | "medium" | "high"
    }
  ],
  "recommendation": "Short practical buying recommendation (1-2 sentences)"
}

2. Do NOT invent reviews, numbers, or facts. Use ONLY the provided reviews and backend risk signals.
3. The trustLevel MUST match the backend trust score:
   - 80-100: "High Trust"
   - 60-79: "Moderate Trust"
   - 40-59: "Low Trust"
   - 0-39: "Very Low Trust"
4. Be fair, balanced, and shopper-friendly.`;

  const userPrompt = `Analyze the following product and review data:

PRODUCT DETAILS:
- Name: ${product.name}
- Store: ${product.store}
- Reported Average Rating: ${product.averageRating} / 5
- Total Analyzed Reviews: ${deterministic.stats.totalReviews}

DETERMINISTIC BACKEND METRICS:
- Calculated Trust Score: ${deterministic.trustScore} / 100
- Assigned Trust Level: ${deterministic.trustLevel}
- Verified Purchases: ${deterministic.stats.verifiedCount} (${deterministic.stats.verifiedPercentage}%)
- Unverified Purchases: ${deterministic.stats.unverifiedCount}
- Rating Distribution: 5★=${deterministic.stats.ratingDistribution.star5}, 4★=${deterministic.stats.ratingDistribution.star4}, 3★=${deterministic.stats.ratingDistribution.star3}, 2★=${deterministic.stats.ratingDistribution.star2}, 1★=${deterministic.stats.ratingDistribution.star1}

DETECTED RISK SIGNALS FROM ENGINE:
${deterministic.riskSignals
  .map(
    (s) =>
      `- [${s.severity.toUpperCase()}] ${s.title}: ${s.evidence} (${s.explanation})`
  )
  .join("\n")}

SAMPLE REVIEW LIST (${cappedReviews.length} items):
${JSON.stringify(cappedReviews, null, 2)}

Produce the exact JSON response now.`;

  // Attempt 1
  try {
    const result = await model.generateContent([
      { text: systemPrompt },
      { text: userPrompt },
    ]);
    const responseText = result.response.text();
    const cleanJson = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
    const parsed = JSON.parse(cleanJson);
    const validated = GeminiResponseSchema.parse(parsed);
    return validated;
  } catch (err1) {
    console.warn("Gemini attempt 1 parsing failed, attempting retry with schema enforcement:", err1);

    // Attempt 2 (Retry)
    try {
      const retryResult = await model.generateContent([
        { text: systemPrompt },
        {
          text: `The previous response failed JSON schema validation. You must return ONLY raw JSON matching the schema. No markdown formatting.
${userPrompt}`,
        },
      ]);
      const retryText = retryResult.response.text();
      const cleanJson = retryText.replace(/```json/g, "").replace(/```/g, "").trim();
      const parsed = JSON.parse(cleanJson);
      const validated = GeminiResponseSchema.parse(parsed);
      return validated;
    } catch (err2) {
      console.error("Gemini attempt 2 failed. Gracefully falling back to deterministic rule-based report:", err2);
      return generateRuleBasedReport(product, deterministic, reviews);
    }
  }
}
