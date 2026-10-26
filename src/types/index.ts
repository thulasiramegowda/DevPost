import { z } from "zod";

export interface ReviewItem {
  id: string;
  reviewerName: string;
  rating: number;
  comment: string;
  isVerifiedPurchase: boolean;
  reviewDate: string; // ISO string
  flaggedReasons?: string[];
}

export interface ProductItem {
  id: string;
  url: string;
  name: string;
  imageUrl?: string | null;
  store: string;
  averageRating: number;
  reviewCount: number;
  reviews?: ReviewItem[];
}

export type RiskSeverity = "low" | "medium" | "high";

export interface RiskSignal {
  id: string;
  title: string;
  severity: RiskSeverity;
  evidence: string;
  pointsDeducted: number;
  explanation: string;
}

export type TrustLevel =
  | "High Trust"
  | "Moderate Trust"
  | "Low Trust"
  | "Very Low Trust";

export interface DeterministicResult {
  trustScore: number;
  trustLevel: TrustLevel;
  totalDeductions: number;
  riskSignals: RiskSignal[];
  flaggedReviewIds: string[];
  stats: {
    totalReviews: number;
    averageRating: number;
    verifiedCount: number;
    unverifiedCount: number;
    verifiedPercentage: number;
    ratingDistribution: {
      star5: number;
      star4: number;
      star3: number;
      star2: number;
      star1: number;
    };
    timeline: Array<{
      date: string;
      count: number;
      averageRating: number;
    }>;
  };
}

export const GeminiResponseSchema = z.object({
  trustLevel: z.enum([
    "High Trust",
    "Moderate Trust",
    "Low Trust",
    "Very Low Trust",
  ]),
  summary: z.string(),
  positiveThemes: z.array(z.string()),
  complaints: z.array(z.string()),
  suspiciousPatterns: z.array(
    z.object({
      title: z.string(),
      explanation: z.string(),
      severity: z.enum(["low", "medium", "high"]),
    })
  ),
  recommendation: z.string(),
});

export type GeminiAnalysisResponse = z.infer<typeof GeminiResponseSchema>;

export interface TrustReportPayload {
  product: ProductItem;
  trustScore: number;
  trustLevel: TrustLevel;
  deterministicSignals: RiskSignal[];
  aiReport: GeminiAnalysisResponse;
  stats: DeterministicResult["stats"];
  reviews: ReviewItem[];
  isCached?: boolean;
  source: "database" | "demo_seed" | "live_gemini_analysis";
}

export const AnalyzeRequestSchema = z.object({
  productUrl: z.string().min(1, "Product URL is required"),
});
