"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroAnalyze } from "@/components/HeroAnalyze";
import { AnalysisLoading } from "@/components/AnalysisLoading";
import { TrustScoreCard } from "@/components/TrustScoreCard";
import { AiReportCard } from "@/components/AiReportCard";
import { RiskSignalsGrid } from "@/components/RiskSignalsGrid";
import { ChartsSection } from "@/components/ChartsSection";
import { ReviewsList } from "@/components/ReviewsList";
import { NotFoundBanner } from "@/components/NotFoundBanner";
import { Footer } from "@/components/Footer";
import { TrustReportPayload } from "@/types";
import { AlertTriangle, ArrowLeft } from "lucide-react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<TrustReportPayload | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [searchedUrl, setSearchedUrl] = useState<string>("");

  const handleAnalyze = async (productUrl: string) => {
    setIsLoading(true);
    setNotFound(false);
    setGeneralError(null);
    setSearchedUrl(productUrl);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productUrl }),
      });

      const data = await response.json();

      if (response.status === 404 || !data.found && data.message) {
        setNotFound(true);
        setReport(null);
      } else if (!response.ok) {
        setGeneralError(data.message || data.error || "Failed to analyze product reviews.");
        setReport(null);
      } else {
        setReport(data);
        setNotFound(false);
        // Smooth scroll to top of report
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (err: any) {
      console.error("Analysis request error:", err);
      setGeneralError("Network error: Could not reach the analysis server. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setReport(null);
    setNotFound(false);
    setGeneralError(null);
    setSearchedUrl("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F8FA] text-slate-900">
      {/* Sticky Navbar */}
      <Navbar onReset={handleReset} hasReport={!!report} />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* State 1: Loading Screen with Progressive Status */}
        {isLoading && <AnalysisLoading />}

        {/* State 2: General Error Alert */}
        {!isLoading && generalError && (
          <div className="w-full max-w-3xl mx-auto my-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-risk flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="flex-1 text-sm">
              <p className="font-bold">Analysis Failed</p>
              <p className="mt-0.5 text-slate-700">{generalError}</p>
              <button
                onClick={handleReset}
                className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-red-200 text-xs font-semibold text-risk hover:bg-red-50 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Return to Search
              </button>
            </div>
          </div>
        )}

        {/* State 3: Friendly Product Not Found Banner */}
        {!isLoading && notFound && (
          <div className="space-y-6">
            <NotFoundBanner
              onSelectProduct={(sampleUrl) => handleAnalyze(sampleUrl)}
              onClose={() => setNotFound(false)}
            />
            {/* Show Hero Search below notice so user can edit or retry */}
            <HeroAnalyze
              onAnalyze={handleAnalyze}
              isLoading={isLoading}
              initialUrl={searchedUrl}
            />
          </div>
        )}

        {/* State 4: Home / Analyze Hero View (when no report and not loading) */}
        {!isLoading && !report && !notFound && !generalError && (
          <HeroAnalyze onAnalyze={handleAnalyze} isLoading={isLoading} />
        )}

        {/* State 5: Trust Report Page (Most important view) */}
        {!isLoading && report && (
          <div className="space-y-8 animate-fadeIn">
            {/* Navigation back bar */}
            <div className="flex items-center justify-between">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-primary transition-colors bg-white px-3.5 py-2 rounded-xl border border-border shadow-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Check Another Product</span>
              </button>

              <span className="text-xs text-slate-400">
                Analysis complete • {report.stats.totalReviews} reviews scanned
              </span>
            </div>

            {/* Top Section: Product Summary & Review Trust Score Ring */}
            <TrustScoreCard
              product={report.product}
              trustScore={report.trustScore}
              trustLevel={report.trustLevel}
              totalReviews={report.stats.totalReviews}
              isCached={report.isCached}
            />

            {/* Middle Section: AI Trust Report Card */}
            <AiReportCard aiReport={report.aiReport} />

            {/* Evidence Section: 6 Deterministic Risk Signal Cards */}
            <RiskSignalsGrid signals={report.deterministicSignals} />

            {/* Charts Section: Rating Bar Chart, Timeline Line Chart, Donut Chart */}
            <ChartsSection stats={report.stats} />

            {/* Review Section: Filterable list of reviews with Flagged badges */}
            <ReviewsList reviews={report.reviews} />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
