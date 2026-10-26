"use client";

import React from "react";
import {
  Star,
  ExternalLink,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  ShoppingBag,
  CheckCircle,
} from "lucide-react";
import { ProductItem, TrustLevel } from "../types";

interface TrustScoreCardProps {
  product: ProductItem;
  trustScore: number;
  trustLevel: TrustLevel;
  totalReviews: number;
  isCached?: boolean;
  source?: string;
}

export const TrustScoreCard: React.FC<TrustScoreCardProps> = ({
  product,
  trustScore,
  trustLevel,
  totalReviews,
  isCached,
  source,
}) => {
  // Color configuration based on Trust Level & Score
  let strokeColor = "#16A34A"; // Safe green
  let badgeBg = "bg-emerald-50 text-emerald-700 border-emerald-200";
  let ringBg = "stroke-emerald-100";
  let scoreTextClass = "text-emerald-700";
  let description = "Reviews show natural variation and genuine customer feedback.";

  if (trustScore >= 80) {
    strokeColor = "#16A34A"; // 80-100 green
    badgeBg = "bg-emerald-50 text-emerald-700 border-emerald-200";
    ringBg = "stroke-emerald-100";
    scoreTextClass = "text-emerald-700";
    description = "Authentic customer sentiment with strong verified buyer representation.";
  } else if (trustScore >= 60) {
    strokeColor = "#2563EB"; // 60-79 blue
    badgeBg = "bg-blue-50 text-blue-700 border-blue-200";
    ringBg = "stroke-blue-100";
    scoreTextClass = "text-blue-700";
    description = "Generally dependable reviews with minor repetitive patterns or complaints.";
  } else if (trustScore >= 40) {
    strokeColor = "#F59E0B"; // 40-59 amber
    badgeBg = "bg-amber-50 text-amber-700 border-amber-200";
    ringBg = "stroke-amber-100";
    scoreTextClass = "text-amber-700";
    description = "High concentration of unverified purchases or sudden review velocity spikes.";
  } else {
    strokeColor = "#DC2626"; // 0-39 red
    badgeBg = "bg-red-50 text-red-700 border-red-200";
    ringBg = "stroke-red-100";
    scoreTextClass = "text-red-700";
    description = "Severe indicators of astroturfing, copy-paste templates, and rating manipulation.";
  }

  // Circular progress calculations
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (trustScore / 100) * circumference;

  return (
    <div className="bg-white rounded-2xl border border-border shadow-card overflow-hidden">
      <div className="p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left: Product Info */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 flex-1 text-center sm:text-left">
          {/* Product Image / Placeholder */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-slate-50 border border-slate-200 p-2 shrink-0 flex items-center justify-center overflow-hidden shadow-inner">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-contain rounded-xl"
              />
            ) : (
              <ShoppingBag className="w-10 h-10 text-slate-400" />
            )}
          </div>

          <div className="space-y-2 max-w-xl">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                {product.store}
              </span>
              {source === "live_gemini_analysis" && (
                <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-blue-50 text-primary border border-blue-200">
                  ✨ Live Gemini Analysis
                </span>
              )}
              {isCached && (
                <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-50 text-slate-500 border border-slate-200">
                  ⚡ Cached 24h
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 line-clamp-2 leading-snug">
              {product.name}
            </h2>

            {/* Rating Stars & Count */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-sm">
              <div className="flex items-center gap-1 font-bold text-slate-900 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{product.averageRating.toFixed(1)}</span>
                <span className="text-xs text-slate-500 font-normal">/ 5</span>
              </div>
              <span className="text-slate-400">•</span>
              <span className="text-slate-600 font-medium">
                {totalReviews} customer reviews analyzed
              </span>
            </div>

            {/* Product Link */}
            <div className="pt-1">
              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary-hover hover:underline break-all"
              >
                <span className="truncate max-w-xs sm:max-w-md">{product.url}</span>
                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
              </a>
            </div>
          </div>
        </div>

        {/* Right: Review Trust Score Circular Ring */}
        <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-[#F7F8FA] border border-slate-200/80 min-w-[240px] text-center shrink-0">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
            Review Trust Score
          </span>

          <div className="relative w-36 h-36 flex items-center justify-center my-1">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 130 130">
              {/* Background ring */}
              <circle
                cx="65"
                cy="65"
                r={radius}
                className={ringBg}
                strokeWidth="10"
                fill="transparent"
              />
              {/* Active progress ring */}
              <circle
                cx="65"
                cy="65"
                r={radius}
                stroke={strokeColor}
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            {/* Score inside circle */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className={`text-4xl font-extrabold tracking-tight ${scoreTextClass}`}>
                {trustScore}
              </span>
              <span className="text-xs font-semibold text-slate-400">out of 100</span>
            </div>
          </div>

          {/* Trust Level Badge */}
          <div
            className={`mt-3 px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${badgeBg}`}
          >
            {trustScore >= 80 ? (
              <ShieldCheck className="w-4 h-4" />
            ) : trustScore >= 60 ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <ShieldAlert className="w-4 h-4" />
            )}
            <span>{trustLevel}</span>
          </div>

          <p className="mt-2 text-[11px] text-slate-500 max-w-[200px] leading-tight">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
