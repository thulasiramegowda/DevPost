"use client";

import React, { useState } from "react";
import {
  Star,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Filter,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { ReviewItem } from "../types";

interface ReviewsListProps {
  reviews: ReviewItem[];
}

export const ReviewsList: React.FC<ReviewsListProps> = ({ reviews }) => {
  const [filter, setFilter] = useState<"all" | "flagged" | "verified" | "critical">("all");
  const [displayCount, setDisplayCount] = useState<number>(8);

  const filteredReviews = reviews.filter((r) => {
    if (filter === "flagged") {
      return r.flaggedReasons && r.flaggedReasons.length > 0;
    }
    if (filter === "verified") {
      return r.isVerifiedPurchase;
    }
    if (filter === "critical") {
      return r.rating <= 3;
    }
    return true;
  });

  const visibleReviews = filteredReviews.slice(0, displayCount);
  const flaggedCount = reviews.filter((r) => r.flaggedReasons && r.flaggedReasons.length > 0).length;

  return (
    <div className="space-y-4">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-200/80 gap-3">
        <div>
          <h3 className="font-bold text-lg text-slate-900">
            Analyzed Customer Reviews ({reviews.length})
          </h3>
          <p className="text-xs text-slate-500">
            Inspect individual customer feedback and automated risk tags
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <button
            onClick={() => {
              setFilter("all");
              setDisplayCount(8);
            }}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              filter === "all"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-white text-slate-600 border border-border hover:bg-slate-50"
            }`}
          >
            All ({reviews.length})
          </button>

          <button
            onClick={() => {
              setFilter("flagged");
              setDisplayCount(8);
            }}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              filter === "flagged"
                ? "bg-red-600 text-white shadow-sm"
                : "bg-white text-red-700 border border-red-200 hover:bg-red-50"
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            Flagged ({flaggedCount})
          </button>

          <button
            onClick={() => {
              setFilter("verified");
              setDisplayCount(8);
            }}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              filter === "verified"
                ? "bg-emerald-700 text-white shadow-sm"
                : "bg-white text-emerald-800 border border-emerald-200 hover:bg-emerald-50"
            }`}
          >
            Verified Only
          </button>

          <button
            onClick={() => {
              setFilter("critical");
              setDisplayCount(8);
            }}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              filter === "critical"
                ? "bg-amber-600 text-white shadow-sm"
                : "bg-white text-amber-800 border border-amber-200 hover:bg-amber-50"
            }`}
          >
            1–3 Stars
          </button>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {visibleReviews.map((r) => {
          const isFlagged = r.flaggedReasons && r.flaggedReasons.length > 0;

          return (
            <div
              key={r.id}
              className={`rounded-2xl border p-5 flex flex-col justify-between transition-all bg-white shadow-card ${
                isFlagged ? "border-red-200 bg-red-50/10" : "border-border"
              }`}
            >
              <div>
                {/* Reviewer Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-700">
                      {r.reviewerName.charAt(0)}
                    </div>
                    <span className="font-semibold text-xs sm:text-sm text-slate-900">
                      {r.reviewerName}
                    </span>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3.5 h-3.5 ${
                          star <= r.rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Metadata Row: Date & Verified status */}
                <div className="flex flex-wrap items-center gap-2 mb-3 text-[11px]">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(r.reviewDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>

                  {r.isVerifiedPurchase ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-medium bg-emerald-50 text-safe border border-emerald-100">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified Purchase
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-medium bg-amber-50 text-warning border border-amber-100">
                      Unverified
                    </span>
                  )}

                  {/* Subtle Flagged signal badge */}
                  {isFlagged && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-semibold bg-red-50 text-risk border border-red-200">
                      <ShieldAlert className="w-3 h-3" />
                      Flagged signal
                    </span>
                  )}
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  "{r.comment}"
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {filteredReviews.length === 0 && (
        <div className="text-center py-10 bg-white rounded-2xl border border-border">
          <p className="text-sm text-slate-500">No reviews found matching the selected filter.</p>
        </div>
      )}

      {/* Pagination / Expand button */}
      {filteredReviews.length > displayCount && (
        <div className="text-center pt-2">
          <button
            onClick={() => setDisplayCount((prev) => prev + 12)}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-white border border-border hover:border-slate-300 text-xs sm:text-sm font-semibold text-slate-700 shadow-sm transition-all"
          >
            <span>Show more reviews ({filteredReviews.length - displayCount} remaining)</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      )}

      {displayCount > 8 && (
        <div className="text-center">
          <button
            onClick={() => setDisplayCount(8)}
            className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 transition-colors"
          >
            <span>Show fewer</span>
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
