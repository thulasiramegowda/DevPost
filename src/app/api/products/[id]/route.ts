import { NextRequest, NextResponse } from "next/server";
import { getProductById, getCachedAnalysis } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const found = await getProductById(id);

    if (!found) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    const cached = await getCachedAnalysis(id);

    return NextResponse.json({
      product: found.product,
      reviews: found.reviews,
      cachedAnalysis: cached || null,
    });
  } catch (error: any) {
    console.error("GET /api/products/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to fetch product details" },
      { status: 500 }
    );
  }
}
