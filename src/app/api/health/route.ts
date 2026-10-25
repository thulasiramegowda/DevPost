import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const hasGemini = Boolean(
    process.env.GEMINI_API_KEY &&
      process.env.GEMINI_API_KEY.length > 10 &&
      !process.env.GEMINI_API_KEY.includes("your_gemini")
  );

  return NextResponse.json({
    status: "ok",
    app: "ReviewLens",
    geminiConfigured: hasGemini,
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
}
