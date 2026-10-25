import { NextRequest, NextResponse } from "next/server";
import { AnalyzeRequestSchema, TrustReportPayload } from "@/types";
import { findProductByUrl, getCachedAnalysis, saveAnalysisCache, getAllProducts } from "@/lib/db";
import { analyzeReviewsDeterministically } from "@/lib/trustEngine";
import { generateGeminiTrustReport } from "@/lib/gemini";

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

    // 1. Look up the product in database or seeded storage
    const found = await findProductByUrl(productUrl);

    if (!found) {
      const sampleProducts = await getAllProducts();
      return NextResponse.json(
        {
          found: false,
          error: "Product not found",
          message:
            "Live product reviews are not available in this demo. Try one of the sample product links below.",
          sampleProducts: sampleProducts.map((p) => ({
            id: p.id,
            name: p.name,
            url: p.url,
            store: p.store,
            averageRating: p.averageRating,
            reviewCount: p.reviewCount,
          })),
        },
        { status: 404 }
      );
    }

    const { product, reviews, source } = found;

    // 2. Run deterministic review-risk checks
    const deterministic = analyzeReviewsDeterministically(
      reviews,
      product.averageRating
    );

    // 3. Mark flagged reasons on individual review items
    const flaggedSet = new Set(deterministic.flaggedReviewIds);
    const enrichedReviews = reviews.map((r) => ({
      ...r,
      flaggedReasons: flaggedSet.has(r.id)
        ? ["Flagged by ReviewLens risk checks"]
        : [],
    }));

    // 4. Check cache for recent analysis (within 24 hours)
    let aiReport = null;
    let isCached = false;
    const cached = await getCachedAnalysis(product.id);

    if (cached && cached.geminiResponse) {
      aiReport = cached.geminiResponse;
      isCached = true;
    } else {
      // 5. Invoke Gemini API
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
      source,
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
