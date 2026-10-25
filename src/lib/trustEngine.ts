import {
  DeterministicResult,
  ReviewItem,
  RiskSignal,
  TrustLevel,
} from "../types";

/**
 * Text normalization for similarity checks.
 */
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Simple Jaccard similarity between two texts based on word tokens.
 */
function calculateTextSimilarity(text1: string, text2: string): number {
  const words1 = new Set(text1.split(" ").filter((w) => w.length > 2));
  const words2 = new Set(text2.split(" ").filter((w) => w.length > 2));

  if (words1.size === 0 || words2.size === 0) return 0;

  let intersection = 0;
  words1.forEach((word) => {
    if (words2.has(word)) intersection++;
  });

  const union = new Set([...words1, ...words2]).size;
  return union === 0 ? 0 : intersection / union;
}

/**
 * Runs the deterministic risk assessment engine across all product reviews.
 */
export function analyzeReviewsDeterministically(
  reviews: ReviewItem[],
  averageRating: number
): DeterministicResult {
  const total = reviews.length;
  if (total === 0) {
    return {
      trustScore: 50,
      trustLevel: "Moderate Trust",
      totalDeductions: 50,
      riskSignals: [
        {
          id: "no_reviews",
          title: "Insufficient review volume",
          severity: "high",
          pointsDeducted: 50,
          evidence: "No reviews found for this product to analyze.",
          explanation: "Cannot establish trust without customer review history.",
        },
      ],
      flaggedReviewIds: [],
      stats: {
        totalReviews: 0,
        averageRating: 0,
        verifiedCount: 0,
        unverifiedCount: 0,
        verifiedPercentage: 0,
        ratingDistribution: { star5: 0, star4: 0, star3: 0, star2: 0, star1: 0 },
        timeline: [],
      },
    };
  }

  const flaggedReviewIdsSet = new Set<string>();
  const riskSignals: RiskSignal[] = [];
  let totalDeductions = 0;

  // 1. Review Burst Detection (Max deduction: 25)
  // Window: 48 hours (48 * 3600 * 1000 ms)
  const sortedReviews = [...reviews].sort(
    (a, b) => new Date(a.reviewDate).getTime() - new Date(b.reviewDate).getTime()
  );

  let maxBurstCount = 0;
  let burstWindowReviews: ReviewItem[] = [];
  const WINDOW_MS = 48 * 60 * 60 * 1000;

  for (let i = 0; i < sortedReviews.length; i++) {
    const windowStart = new Date(sortedReviews[i].reviewDate).getTime();
    const currentWindow = sortedReviews.filter((r) => {
      const t = new Date(r.reviewDate).getTime();
      return t >= windowStart && t <= windowStart + WINDOW_MS;
    });

    if (currentWindow.length > maxBurstCount) {
      maxBurstCount = currentWindow.length;
      burstWindowReviews = currentWindow;
    }
  }

  const burstRatio = maxBurstCount / total;
  if (maxBurstCount >= 14 || (maxBurstCount >= 8 && burstRatio >= 0.35)) {
    const deduction = 25;
    totalDeductions += deduction;
    burstWindowReviews.forEach((r) => flaggedReviewIdsSet.add(r.id));
    riskSignals.push({
      id: "review_burst",
      title: "Review burst anomaly",
      severity: "high",
      pointsDeducted: deduction,
      evidence: `${maxBurstCount} reviews (${Math.round(burstRatio * 100)}% of total) were posted in a single 48-hour window.`,
      explanation:
        "Organic reviews typically accrue gradually. Sudden surges frequently indicate seller-incentivized campaigns or coordinated promotion.",
    });
  } else if (maxBurstCount >= 7 || burstRatio >= 0.25) {
    const deduction = 12;
    totalDeductions += deduction;
    burstWindowReviews.forEach((r) => flaggedReviewIdsSet.add(r.id));
    riskSignals.push({
      id: "review_burst",
      title: "Elevated review velocity",
      severity: "medium",
      pointsDeducted: deduction,
      evidence: `${maxBurstCount} reviews occurred within 48 hours, showing higher than average review velocity.`,
      explanation:
        "A modest clustering of reviews was detected. This may correlate with marketing pushes or discounts.",
    });
  } else {
    riskSignals.push({
      id: "review_burst",
      title: "Review submission timeline",
      severity: "low",
      pointsDeducted: 0,
      evidence: `Reviews are distributed evenly over time; maximum 48-hour velocity is ${maxBurstCount} reviews.`,
      explanation: "No suspicious velocity spikes detected across the historical timeline.",
    });
  }

  // 2. Duplicate or Similar Review Wording (Max deduction: 20)
  const normalizedReviews = reviews.map((r) => ({
    id: r.id,
    norm: normalizeText(r.comment),
  }));

  const similarPairs = new Set<string>();
  const similarReviewIds = new Set<string>();

  for (let i = 0; i < normalizedReviews.length; i++) {
    for (let j = i + 1; j < normalizedReviews.length; j++) {
      const textA = normalizedReviews[i].norm;
      const textB = normalizedReviews[j].norm;
      if (textA.length < 15 || textB.length < 15) continue;

      const sim = calculateTextSimilarity(textA, textB);
      if (sim >= 0.70 || textA === textB) {
        similarPairs.add(`${i}-${j}`);
        similarReviewIds.add(normalizedReviews[i].id);
        similarReviewIds.add(normalizedReviews[j].id);
      }
    }
  }

  const similarCount = similarReviewIds.size;
  if (similarCount >= 12) {
    const deduction = 20;
    totalDeductions += deduction;
    similarReviewIds.forEach((id) => flaggedReviewIdsSet.add(id));
    riskSignals.push({
      id: "duplicate_wording",
      title: "Duplicate & templated phrasing",
      severity: "high",
      pointsDeducted: deduction,
      evidence: `${similarCount} reviews contain near-identical or copy-pasted phrasing.`,
      explanation:
        "High degree of text similarity strongly indicates coordinated review generation, bot scripts, or shared templates.",
    });
  } else if (similarCount >= 5) {
    const deduction = 12;
    totalDeductions += deduction;
    similarReviewIds.forEach((id) => flaggedReviewIdsSet.add(id));
    riskSignals.push({
      id: "duplicate_wording",
      title: "Repetitive wording detected",
      severity: "medium",
      pointsDeducted: deduction,
      evidence: `${similarCount} reviews share suspiciously similar sentence structures.`,
      explanation: "Repeated phrasing observed across multiple independent reviews.",
    });
  } else {
    riskSignals.push({
      id: "duplicate_wording",
      title: "Text variation & originality",
      severity: "low",
      pointsDeducted: 0,
      evidence: "Analyzed reviews show unique vocabulary, varied sentence lengths, and natural linguistic variation.",
      explanation: "Customer feedback appears written independently with minimal phrase overlap.",
    });
  }

  // 3. Verified Purchase Ratio (Max deduction: 20)
  const verifiedCount = reviews.filter((r) => r.isVerifiedPurchase).length;
  const unverifiedCount = total - verifiedCount;
  const unverifiedRatio = unverifiedCount / total;

  if (unverifiedRatio >= 0.70) {
    const deduction = 20;
    totalDeductions += deduction;
    reviews.filter((r) => !r.isVerifiedPurchase).forEach((r) => flaggedReviewIdsSet.add(r.id));
    riskSignals.push({
      id: "unverified_ratio",
      title: "Excessive unverified purchases",
      severity: "high",
      pointsDeducted: deduction,
      evidence: `${Math.round(unverifiedRatio * 100)}% of analyzed reviews (${unverifiedCount}/${total}) are unverified purchases.`,
      explanation:
        "Unverified reviews carry significantly higher risk of manipulation since anyone can post without buying the item.",
    });
  } else if (unverifiedRatio >= 0.40) {
    const deduction = 12;
    totalDeductions += deduction;
    reviews.filter((r) => !r.isVerifiedPurchase).forEach((r) => flaggedReviewIdsSet.add(r.id));
    riskSignals.push({
      id: "unverified_ratio",
      title: "Elevated unverified purchase ratio",
      severity: "medium",
      pointsDeducted: deduction,
      evidence: `${Math.round(unverifiedRatio * 100)}% of reviews are from unverified buyers.`,
      explanation:
        "A notable portion of customer feedback is from accounts without order verification.",
    });
  } else {
    riskSignals.push({
      id: "unverified_ratio",
      title: "Verified purchaser integrity",
      severity: "low",
      pointsDeducted: 0,
      evidence: `${Math.round((verifiedCount / total) * 100)}% of reviews are confirmed verified purchases.`,
      explanation: "Healthy ratio of verified customer transactions.",
    });
  }

  // 4. Rating Imbalance (Max deduction: 20)
  const starCounts = {
    star5: reviews.filter((r) => r.rating === 5).length,
    star4: reviews.filter((r) => r.rating === 4).length,
    star3: reviews.filter((r) => r.rating === 3).length,
    star2: reviews.filter((r) => r.rating === 2).length,
    star1: reviews.filter((r) => r.rating === 1).length,
  };

  const fiveStarRatio = starCounts.star5 / total;
  const oneStarRatio = starCounts.star1 / total;
  const polarizedRatio = (starCounts.star5 + starCounts.star1) / total;

  if (fiveStarRatio >= 0.85) {
    const deduction = 20;
    totalDeductions += deduction;
    riskSignals.push({
      id: "rating_imbalance",
      title: "Extreme 5-star concentration",
      severity: "high",
      pointsDeducted: deduction,
      evidence: `${Math.round(fiveStarRatio * 100)}% of all ratings (${starCounts.star5}/${total}) are 5-star ratings.`,
      explanation:
        "Natural consumer ratings almost always include mixed experiences (3-4 stars). Excessive 5-star concentration is a common footprint of astroturfing.",
    });
  } else if (polarizedRatio >= 0.80 && starCounts.star5 >= 5 && starCounts.star1 >= 5) {
    const deduction = 16;
    totalDeductions += deduction;
    riskSignals.push({
      id: "rating_imbalance",
      title: "Severe bimodal rating polarization",
      severity: "high",
      pointsDeducted: deduction,
      evidence: `${Math.round(polarizedRatio * 100)}% of ratings are strictly 5-star or 1-star, with near zero moderate ratings.`,
      explanation:
        "Polarized 'U-shaped' distributions often occur when authentic dissatisfied buyers clash with artificially inflated positive ratings.",
    });
  } else if (fiveStarRatio >= 0.70) {
    const deduction = 8;
    totalDeductions += deduction;
    riskSignals.push({
      id: "rating_imbalance",
      title: "Noticeable positive rating skew",
      severity: "medium",
      pointsDeducted: deduction,
      evidence: `${Math.round(fiveStarRatio * 100)}% of reviews are 5-star ratings.`,
      explanation: "Slightly elevated top-rating concentration.",
    });
  } else {
    riskSignals.push({
      id: "rating_imbalance",
      title: "Balanced rating distribution",
      severity: "low",
      pointsDeducted: 0,
      evidence: `Ratings are normally distributed across 1 to 5 stars (5★: ${starCounts.star5}, 4★: ${starCounts.star4}, 3★: ${starCounts.star3}, 2★: ${starCounts.star2}, 1★: ${starCounts.star1}).`,
      explanation: "Reflects genuine varied buyer satisfaction and realistic expectations.",
    });
  }

  // 5. Reviewer Repetition (Max deduction: 10)
  const reviewerMap = new Map<string, ReviewItem[]>();
  reviews.forEach((r) => {
    const name = r.reviewerName.trim().toLowerCase();
    const list = reviewerMap.get(name) || [];
    list.push(r);
    reviewerMap.set(name, list);
  });

  const repeatedReviewers = Array.from(reviewerMap.entries()).filter(
    ([, list]) => list.length > 1
  );
  const totalRepeatedPosts = repeatedReviewers.reduce(
    (acc, [, list]) => acc + list.length,
    0
  );

  if (totalRepeatedPosts >= 6) {
    const deduction = 10;
    totalDeductions += deduction;
    repeatedReviewers.forEach(([, list]) => {
      list.forEach((r) => flaggedReviewIdsSet.add(r.id));
    });
    riskSignals.push({
      id: "reviewer_repetition",
      title: "Repeated reviewer activity",
      severity: "high",
      pointsDeducted: deduction,
      evidence: `${repeatedReviewers.length} reviewer accounts contributed ${totalRepeatedPosts} reviews for this same single product.`,
      explanation:
        "Legitimate platforms expect one review per customer. Multiple submissions from identical usernames indicate account manipulation or bot loops.",
    });
  } else if (totalRepeatedPosts >= 2) {
    const deduction = 5;
    totalDeductions += deduction;
    repeatedReviewers.forEach(([, list]) => {
      list.forEach((r) => flaggedReviewIdsSet.add(r.id));
    });
    riskSignals.push({
      id: "reviewer_repetition",
      title: "Duplicate reviewer entries",
      severity: "medium",
      pointsDeducted: deduction,
      evidence: `Found ${repeatedReviewers.length} reviewer name(s) appearing more than once.`,
      explanation: "Minor repeated submissions detected from the same reviewer name.",
    });
  } else {
    riskSignals.push({
      id: "reviewer_repetition",
      title: "Unique reviewer identities",
      severity: "low",
      pointsDeducted: 0,
      evidence: "All analyzed reviews originate from distinct reviewer names with no repeat submissions.",
      explanation: "No reviewer identity duplication detected.",
    });
  }

  // 6. Extreme Rating Deviation (Max deduction: 5)
  // Contrast average rating of verified purchasers vs unverified reviewers
  const verifiedRatings = reviews.filter((r) => r.isVerifiedPurchase).map((r) => r.rating);
  const unverifiedRatings = reviews.filter((r) => !r.isVerifiedPurchase).map((r) => r.rating);

  const avgVerified =
    verifiedRatings.length > 0
      ? verifiedRatings.reduce((a, b) => a + b, 0) / verifiedRatings.length
      : averageRating;

  const avgUnverified =
    unverifiedRatings.length > 0
      ? unverifiedRatings.reduce((a, b) => a + b, 0) / unverifiedRatings.length
      : averageRating;

  const ratingDivergence = Math.abs(avgUnverified - avgVerified);

  if (unverifiedRatings.length >= 5 && verifiedRatings.length >= 3 && ratingDivergence >= 1.8) {
    const deduction = 5;
    totalDeductions += deduction;
    riskSignals.push({
      id: "extreme_deviation",
      title: "Verified vs Unverified rating divergence",
      severity: "high",
      pointsDeducted: deduction,
      evidence: `Unverified reviews average ${avgUnverified.toFixed(1)}★ while verified buyers average ${avgVerified.toFixed(1)}★ (delta: ${ratingDivergence.toFixed(1)}★).`,
      explanation:
        "When unverified reviewers award stellar ratings while confirmed paying buyers report major issues, rating manipulation is highly probable.",
    });
  } else if (unverifiedRatings.length >= 3 && ratingDivergence >= 1.0) {
    const deduction = 3;
    totalDeductions += deduction;
    riskSignals.push({
      id: "extreme_deviation",
      title: "Mild rating divergence",
      severity: "medium",
      pointsDeducted: deduction,
      evidence: `Verified ratings average ${avgVerified.toFixed(1)}★ vs unverified ratings at ${avgUnverified.toFixed(1)}★.`,
      explanation: "Moderate divergence observed between verified and unverified ratings.",
    });
  } else {
    riskSignals.push({
      id: "extreme_deviation",
      title: "Consistent rating baseline",
      severity: "low",
      pointsDeducted: 0,
      evidence: `Verified (${avgVerified.toFixed(1)}★) and unverified (${avgUnverified.toFixed(1)}★) ratings follow consistent feedback patterns.`,
      explanation: "No jarring divergence between buyer tiers.",
    });
  }

  // Final Trust Score Calculation (0 - 100)
  const trustScore = Math.max(0, Math.min(100, Math.round(100 - totalDeductions)));

  // Trust Levels based on spec:
  // 80–100: High Trust
  // 60–79: Moderate Trust
  // 40–59: Low Trust
  // 0–39: Very Low Trust
  let trustLevel: TrustLevel = "High Trust";
  if (trustScore >= 80) trustLevel = "High Trust";
  else if (trustScore >= 60) trustLevel = "Moderate Trust";
  else if (trustScore >= 40) trustLevel = "Low Trust";
  else trustLevel = "Very Low Trust";

  // Build timeline aggregated by month/date for Recharts line chart
  const timelineMap = new Map<string, { count: number; totalRating: number }>();
  sortedReviews.forEach((r) => {
    const dateKey = new Date(r.reviewDate).toISOString().slice(0, 10);
    const existing = timelineMap.get(dateKey) || { count: 0, totalRating: 0 };
    existing.count += 1;
    existing.totalRating += r.rating;
    timelineMap.set(dateKey, existing);
  });

  const timeline = Array.from(timelineMap.entries()).map(([date, data]) => ({
    date,
    count: data.count,
    averageRating: Number((data.totalRating / data.count).toFixed(1)),
  }));

  return {
    trustScore,
    trustLevel,
    totalDeductions,
    riskSignals,
    flaggedReviewIds: Array.from(flaggedReviewIdsSet),
    stats: {
      totalReviews: total,
      averageRating: Number(averageRating.toFixed(1)),
      verifiedCount,
      unverifiedCount,
      verifiedPercentage: Math.round((verifiedCount / total) * 100),
      ratingDistribution: starCounts,
      timeline,
    },
  };
}
