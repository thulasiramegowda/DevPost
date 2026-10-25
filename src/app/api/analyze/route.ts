import { NextRequest, NextResponse } from "next/server";
import { AnalyzeRequestSchema, TrustReportPayload } from "@/types";
import {
  findProductByUrl,
  getCachedAnalysis,
  saveAnalysisCache,
  saveNewDynamicProduct,
} from "@/lib/db";
import { analyzeReviewsDeterministically } from "@/lib/trustEngine";
import {
  generateGeminiTrustReport,
  synthesizeProductAndReviewsFromUrl,
} from "@/lib/gemini";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = AnalyzeRequestSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: "Invalid request payload",
          details: parseResult.error.errors.map((e) => e.message),
        },
        { status: 400 }
      );
    }

    const { productUrl } = parseResult.data;

    // 1. Look up the product in database or pre-seeded storage
    let found = await findProductByUrl(productUrl);
    let analysisSource: "database" | "demo_seed" | "live_gemini_analysis" = "database";

    // 2. If not found in database, dynamically analyze ANY product link via Gemini
    if (!found) {
      const synthesized = await synthesizeProductAndReviewsFromUrl(productUrl);
      // Persist the newly synthesized product and reviews in MySQL/storage
      await saveNewDynamicProduct(synthesized.product, synthesized.reviews);

      found = {
        product: synthesized.product,
        reviews: synthesized.reviews,
        source: "demo_seed",
      };
      analysisSource = "live_gemini_analysis";
    } else {
      analysisSource = found.source;
    }

    const { product, reviews } = found;

    // 3. Run deterministic review-risk checks
    const deterministic = analyzeReviewsDeterministically(
      reviews,
      product.averageRating
    );

    // 4. Mark flagged reasons on individual review items
    const flaggedSet = new Set(deterministic.flaggedReviewIds);
    const enrichedReviews = reviews.map((r) => ({
      ...r,
      flaggedReasons: flaggedSet.has(r.id)
        ? ["Flagged by ReviewLens risk checks"]
        : [],
    }));

    // 5. Check cache for recent analysis (within 24 hours)
    let aiReport = null;
    let isCached = false;
    const cached = await getCachedAnalysis(product.id);

    if (cached && cached.geminiResponse) {
      aiReport = cached.geminiResponse;
      isCached = true;
    } else {
      // 6. Invoke Gemini API for structured synthesis
      aiReport = await generateGeminiTrustReport(
        product,
        deterministic,
        enrichedReviews
      );

      // Save to cache
      await saveAnalysisCache(
        product.id,
        deterministic.trustScore,
        deterministic.trustLevel,
        aiReport,
        deterministic.riskSignals
      );
    }

    const payload: TrustReportPayload = {
      product,
      trustScore: deterministic.trustScore,
      trustLevel: deterministic.trustLevel,
      deterministicSignals: deterministic.riskSignals,
      aiReport,
      stats: deterministic.stats,
      reviews: enrichedReviews,
      isCached,
      source: analysisSource,
    };

    return NextResponse.json(payload, { status: 200 });
  } catch (error: any) {
    console.error("API /api/analyze error:", error);
    return NextResponse.json(
      {
        error: "Internal server error during review analysis",
        message: error?.message || "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}
